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
    this.http.get<any[]>(`${this.apiUrl}/api/users`).subscribe({
      next: (data) => (this.universites = data || []),
      error: (err) => console.error(err),
    });
  }

  loadAvis() {
    this.isLoading = true;
    this.http.get<any[]>(`${this.apiUrl}/api/all-reviews`).subscribe({
      next: (data) => {
        console.log('DATA BRUTE BACKEND:', data);
        // ON NE FILTRE PLUS - on affiche tout même si commentaire vide
        this.avisList = Array.isArray(data) ? data : [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('ERREUR all-reviews:', err);
        this.isLoading = false;
      },
    });
  }

  get avisFiltres() {
    if (!this.filtreUniv || this.filtreUniv === '') {
      return this.avisList;
    }
    return this.avisList.filter((a) => a.universityId === this.filtreUniv);
  }

  getStars(note: any) {
    let n = parseInt(note) || 0;
    if (n > 5) n = 5;
    if (n < 0) n = 0;
    return Array(n).fill(0);
  }

  getNomUniv(id: string) {
    const uni = this.universites.find((u) => u.id === id);
    return uni ? uni.nom : id;
  }
}
