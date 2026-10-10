import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listage-avis',
  templateUrl: './listage-avis.component.html',
  styleUrls: ['./listage-avis.component.css'],
})
export class ListageAvisComponent implements OnInit {
  avisList: any[] = [];
  universites: any[] = []; // <-- pour le filtre dynamique
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
      next: (data) => (this.universites = data),
      error: (err) => console.error('ERREUR univs:', err),
    });
  }

  loadAvis() {
    this.isLoading = true;
    this.http.get<any[]>(`${this.apiUrl}/api/all-reviews`).subscribe({
      next: (data) => {
        this.avisList = data.filter(
          (a) => a.commentaire && a.commentaire.trim() !== '' && a.nom,
        );
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  get avisFiltres() {
    if (!this.filtreUniv) return this.avisList;
    return this.avisList.filter((a) => a.universityId === this.filtreUniv);
  }

  getStars(note: number) {
    return Array(Math.round(note || 0)).fill(0);
  }
}
