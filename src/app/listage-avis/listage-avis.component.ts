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

  // Charge la liste des facs pour afficher leur nom
  loadUnivs() {
    this.http.get<any[]>(`${this.apiUrl}/api/users`).subscribe({
      next: (data) => (this.universites = data || []),
      error: (err) => console.error('Erreur univ:', err),
    });
  }

  // Charge tous les avis - CORRIGÉ POUR LE NOUVEAU BACKEND
  loadAvis() {
    this.isLoading = true;
    // On met admin=true et limit=1000 pour voir TOUT en mode admin
    // Pour le public, tu mettras admin=false plus tard
    const url = `${this.apiUrl}/api/all-reviews?admin=true&limit=1000`;

    this.http.get<any>(url).subscribe({
      next: (res) => {
        console.log('DATA BRUTE BACKEND:', res);

        // FIX PRINCIPAL : Le nouveau serveur renvoie { data: [...], total, ... }
        // L'ancien renvoyait directement [...]
        // On gère les 2 cas pour être sûr
        let raw: any[] = [];
        if (Array.isArray(res)) {
          raw = res; // ancien format
        } else if (res && Array.isArray(res.data)) {
          raw = res.data; // nouveau format V3
        }

        // Dédoublonnage par ID pour éviter les doublons
        const map = new Map<string, any>();
        raw.forEach((item) => {
          const key = item.id || item._id;
          if (key && !map.has(key)) {
            map.set(key, item);
          }
        });

        this.avisList = Array.from(map.values());
        console.log(
          `Avis reçus: ${raw.length} -> Après dédoublonnage: ${this.avisList.length}`,
        );
        this.isLoading = false;
      },
      error: (err) => {
        console.error('ERREUR all-reviews:', err);
        this.isLoading = false;
      },
    });
  }

  // Filtre côté front par université
  get avisFiltres() {
    if (!this.filtreUniv || this.filtreUniv === '') {
      return this.avisList;
    }
    return this.avisList.filter((a) => a.universityId === this.filtreUniv);
  }

  // Pour afficher les étoiles
  getStars(note: any) {
    let n = parseInt(note) || 0;
    if (n > 5) n = 5;
    if (n < 0) n = 0;
    return Array(n).fill(0);
  }

  // Trouve le nom de la fac à partir de son ID
  getNomUniv(id: string) {
    const uni = this.universites.find((u) => u.id === id);
    return uni ? uni.nom : id;
  }

  // Optimise le *ngFor pour ne pas re-rendre tout
  trackById(index: number, item: any): string {
    return item.id || item._id || index.toString();
  }

  // NOUVEAU: Pour le futur dashboard - Dépublier
  togglePublish(avis: any) {
    this.http
      .patch<any>(`${this.apiUrl}/api/reviews/${avis.id}/toggle`, {})
      .subscribe({
        next: (res) => {
          avis.isPublished = res.isPublished;
        },
        error: (err) => console.error(err),
      });
  }
}
