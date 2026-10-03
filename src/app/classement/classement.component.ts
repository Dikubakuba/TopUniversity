import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Pour *ngFor
import { UniversiteService } from '../services/universite.service'; // Vérifie le chemin

@Component({
  selector: 'app-classement',
  standalone: true, // Si tu es en Angular 17/18, mets ça
  imports: [CommonModule], // Important pour afficher la liste
  templateUrl: './classement.component.html',
  styleUrl: './classement.component.css',
})
export class ClassementComponent {
  // 1. TU DOIS DÉCLARER tes variables ici
  classement: any[] = []; // C'est ça qui enlève le trait rouge de la ligne 20
  isLoading = false;

  // 2. TU DOIS INJECTER ton service ici dans le constructor
  // C'est ça qui enlève le trait rouge de la ligne 16
  constructor(private universiteService: UniversiteService) {}

  // 3. Maintenant ta fonction va marcher
  onSpecialiteChange(specialite: string) {
    this.isLoading = true;

    this.universiteService.getClassementParSpecialite(specialite).subscribe({
      next: (data) => {
        // on met next: pour enlever le trait rouge de data
        this.classement = data;
        console.log('Classement reçu du backend:', data);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur backend', err);
        this.isLoading = false;
      },
    });
  }
}
