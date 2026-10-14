import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-avis',
  templateUrl: './avis.component.html',
  styleUrls: ['./avis.component.css'],
})
export class AvisComponent implements OnInit {
  universites: any[] = [];
  alerte: boolean = false;
  isLoading: boolean = false;
  SuccesAlerte: string = 'Votre avis a été envoyé avec succès!';

  private apiUrl = 'https://backend-unirank-universite.onrender.com';

  avisForm = new FormGroup({
    universityId: new FormControl('', [Validators.required]),
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
    this.http.get(`${this.apiUrl}/api/users`).subscribe({
      next: (data: any) => {
        this.universites = data;
        if (
          this.universites.length > 0 &&
          !this.avisForm.get('universityId')?.value
        ) {
          this.avisForm.get('universityId')?.setValue(this.universites[0].id);
        }
      },
      error: (err) => {
        console.error('ERREUR API /api/users:', err);
      },
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

      const dataToSend = {
        ...this.avisForm.value,
        noteGenerale: Number(this.avisForm.value.noteGenerale),
        enseignement: Number(this.avisForm.value.enseignement),
        enseignants: Number(this.avisForm.value.enseignants),
        infrastructures: Number(this.avisForm.value.infrastructures),
        vieEtudiante: Number(this.avisForm.value.vieEtudiante),
      };

      this.http.post(`${this.apiUrl}/api/reviews`, dataToSend).subscribe({
        next: (res: any) => {
          this.isLoading = false;
          alert(this.SuccesAlerte);
          const currentUniv = this.avisForm.get('universityId')?.value;
          this.avisForm.reset({
            universityId: currentUniv,
            statut: 'Etudiant actuel',
            noteGenerale: '5',
            enseignement: '5',
            enseignants: '5',
            infrastructures: '5',
            vieEtudiante: '5',
          });
        },
        error: (err) => {
          this.isLoading = false;
          console.error('ERREUR POST /api/reviews:', err);
          alert('Erreur sauvegarde: ' + (err.error?.error || err.message));
        },
      });
    } else {
      this.alerte = true;
      this.avisForm.markAllAsTouched();
      // alert('Erreur');
    }
  }
  //
  alertes() {
    this.alerte = true;
  }
}
