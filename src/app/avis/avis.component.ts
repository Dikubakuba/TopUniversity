import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-avis',
  templateUrl: './avis.component.html',
  styleUrls: ['./avis.component.css'], // <--- CORRIGE ICI : styleUrls avec S
})
export class AvisComponent implements OnInit {
  universites: any[] = [];
  alerte: boolean = false;
  isLoading: boolean = false;
  valueravisForm: any = null;

  avisForm = new FormGroup({
    universityId: new FormControl('UNIKIN', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    filiere: new FormControl('', [Validators.required]),
    niveau: new FormControl('', [Validators.required]),
    statut: new FormControl('Etudiant actuel', [Validators.required]),
    noteGenerale: new FormControl('5', [Validators.required]),
    enseignement: new FormControl('5'),
    enseignants: new FormControl('5'),
    infrastructures: new FormControl('5'),
    vieEtudiante: new FormControl('5'),
    commentaire: new FormControl('', [Validators.required]),
  });

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:3000/api/users').subscribe({
      next: (data: any) => {
        this.universites = data;
      },
      error: (err) => console.error(err),
    });
  }

  get nom() {
    return this.avisForm.get('nom');
  }
  get email() {
    return this.avisForm.get('email');
  }
  get filiere() {
    return this.avisForm.get('filiere');
  }
  get niveau() {
    return this.avisForm.get('niveau');
  }
  get statut() {
    return this.avisForm.get('statut');
  }
  get commentaire() {
    return this.avisForm.get('commentaire');
  }
  get radio() {
    return this.avisForm.get('statut');
  }

  onsubmit() {
    if (this.avisForm.valid) {
      this.isLoading = true;
      this.http
        .post('http://localhost:3000/api/reviews', this.avisForm.value)
        .subscribe({
          next: (res: any) => {
            this.isLoading = false;
            alert('Votre avis a été envoyé avec succès!');
            this.avisForm.reset();
          },
          error: (err) => {
            this.isLoading = false;
            console.error(err);
            alert('Erreur sauvegarde');
          },
        });
    } else {
      this.alerte = true;
      this.avisForm.markAllAsTouched();
    }
  }
}
