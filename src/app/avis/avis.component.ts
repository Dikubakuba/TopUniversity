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
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  fileError: string = '';
  private apiUrl = 'https://backend-unirank-universite.onrender.com';

  avisForm = new FormGroup({
    universityId: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    filiere: new FormControl('', [Validators.required]),
    niveau: new FormControl('', [Validators.required]),
    statut: new FormControl('Etudiant actuel', [Validators.required]),
    noteGenerale: new FormControl('5', [Validators.required]),
    enseignement: new FormControl('5'),
    enseignants: new FormControl('5'),
    infrastructures: new FormControl('5'),
    vieEtudiante: new FormControl('5'),
    commentaire: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get(`${this.apiUrl}/api/users`).subscribe({
      next: (data: any) => {
        this.universites = Array.isArray(data) ? data : data.data || [];
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
  get commentaire() {
    return this.avisForm.get('commentaire');
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.fileError = '';
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      this.fileError = 'Image trop grande (max 5 Mo)';
      return;
    }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      this.fileError = 'Format non supporté';
      return;
    }
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = () => (this.previewUrl = reader.result as string);
    reader.readAsDataURL(file);
  }
  removeImage() {
    this.selectedFile = null;
    this.previewUrl = null;
  }

  onsubmit() {
    if (this.avisForm.valid) {
      this.isLoading = true;
      this.alerte = false;
      const formData = new FormData();
      Object.entries(this.avisForm.value).forEach(([k, v]) =>
        formData.append(k, v as string),
      );
      if (this.selectedFile) formData.append('image', this.selectedFile);
      this.http.post(`${this.apiUrl}/api/reviews`, formData).subscribe({
        next: () => {
          this.isLoading = false;
          alert('Votre avis a été envoyé avec succès!');
          this.avisForm.reset({
            statut: 'Etudiant actuel',
            noteGenerale: '5',
            enseignement: '5',
            enseignants: '5',
            infrastructures: '5',
            vieEtudiante: '5',
          });
          this.removeImage();
        },
        error: (err) => {
          this.isLoading = false;
          alert('Erreur: ' + (err.error?.error || err.message));
        },
      });
    } else {
      this.alerte = true;
      this.avisForm.markAllAsTouched();
    }
  }
  alertes() {
    this.alerte = true;
  }
}
