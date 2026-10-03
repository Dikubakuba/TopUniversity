import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-avis',
  templateUrl: './avis.component.html',
  styleUrl: './avis.component.css',
})
export class AvisComponent {
  valueravisForm: any = null;
  avisForm = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    filiere: new FormControl('', [Validators.required]),
    commentaire: new FormControl('', [Validators.required]),
  });
  get nom() {
    return this.avisForm.get('nom');
  }
  get email() {
    return this.avisForm.get('email');
  }
  get filiere() {
    return this.avisForm.get('filiere');
  }
  get statut() {
    return this.avisForm.get('statut');
  }
  get radio() {
    return this.avisForm.get('radio');
  }
  get commentaire() {
    return this.avisForm.get('commentaire');
  }
  alerte: boolean = false;
  onsubmit() {
    if (this.avisForm.valid) {
      this.valueravisForm = this.avisForm.value;

      console.log(this.avisForm.value);

      alert('Votre avis a été envoyé avec succès !');
    } else {
      this.alerte = !this.alerte;
      // alert(
      //   'Veuillez remplir correctement tous les champs obligatoires avant de publier votre avis.',
      // );
      // Affiche les erreurs dans la console pour faciliter le débogage
      this.avisForm.markAllAsTouched();
    }
  }
}
