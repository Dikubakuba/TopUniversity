import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listage-avis',
  templateUrl: './listage-avis.component.html',
  styleUrls: ['./listage-avis.component.css']
})
export class ListageAvisComponent implements OnInit {
  avisList: any[] = [];
  filtreUniv: string = '';
  isLoading = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadAvis();
  }

  loadAvis() {
    this.isLoading = true;
    // Change le port si toi c'est 5000
    this.http.get<any[]>('http://localhost:3000/api/all-reviews').subscribe({
      next: (data) => {
        // IMPORTANT : on enlève les avis vides qui créent la 2ème carte blanche
        this.avisList = data.filter(a => a.commentaire && a.commentaire.trim() !== '' && a.nom);
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  // Pour le filtre
  get avisFiltres() {
    if (!this.filtreUniv) return this.avisList;
    return this.avisList.filter(a => a.universityId === this.filtreUniv);
  }

  getStars(note: number) {
    return Array(Math.round(note || 0)).fill(0);
  }
}