import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listage-avis',
  templateUrl: './listage-avis.component.html',
  styleUrls: ['./listage-avis.component.css'],
})
export class ListageAvisComponent implements OnInit {
  avisList: any[] = [];
  universites: any[] = [];
  filtreUniv: string = '';
  isLoading = true;

  private apiUrl = 'https://backend-unirank-universite.onrender.com';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUnivs();
    this.loadAvis();
  }

  loadUnivs() {
    this.http.get<any>(`${this.apiUrl}/api/users`).subscribe({
      next: (data) => {
        this.universites = Array.isArray(data) ? data : data.data || [];
      },
      error: (err) => console.error('Erreur univ:', err),
    });
  }

  loadAvis() {
    this.isLoading = true;
    // Route publique, plus besoin de ?admin=true
    const url = `${this.apiUrl}/api/reviews`;

    this.http.get<any>(url).subscribe({
      next: (res) => {
        let raw: any[] = [];
        if (Array.isArray(res)) {
          raw = res;
        } else if (res && Array.isArray(res.data)) {
          raw = res.data;
        }

        const map = new Map<string, any>();
        raw.forEach((item) => {
          const key = item.id || item._id;
          if (key && !map.has(key)) map.set(key, item);
        });

        this.avisList = Array.from(map.values());
        this.isLoading = false;
      },
      error: (err) => {
        console.error('ERREUR reviews:', err);
        // Fallback sur all-reviews
        this.http
          .get<any>(`${this.apiUrl}/api/all-reviews?limit=1000`)
          .subscribe({
            next: (res2) => {
              const raw2 = Array.isArray(res2) ? res2 : res2.data || [];
              this.avisList = raw2;
              this.isLoading = false;
            },
            error: () => {
              this.isLoading = false;
            },
          });
      },
    });
  }

  get avisFiltres() {
    if (!this.filtreUniv || this.filtreUniv === '') {
      return this.avisList;
    }
    return this.avisList.filter((a) => {
      const id = a.universityId || a.univId;
      return id === this.filtreUniv;
    });
  }

  getStars(note: any) {
    let n = parseInt(note) || 0;
    if (n > 5) n = 5;
    if (n < 0) n = 0;
    return Array(n).fill(0);
  }

  getNomUniv(id: string) {
    if (!id) return 'Université inconnue';
    const uni = this.universites.find((u) => u.id === id);
    return uni ? uni.nom : id;
  }

  trackById(index: number, item: any): string {
    return item.id || item._id || index.toString();
  }

  // Pour ouvrir l'image en grand
  openImage(url: string) {
    if (!url) return;
    window.open(url, '_blank');
  }

  // Gère tous les noms possibles d'image
  getImageUrl(avis: any): string | null {
    return avis.imageUrl || avis.image || avis.photoUrl || null;
  }
}
