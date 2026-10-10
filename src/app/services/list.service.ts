import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  // =================================================================
  // URLS DU BACKEND
  // =================================================================
  // apiUrlProd = quand ton backend est sur Render (en ligne)
  private apiUrlProd = 'https://backend-unirank-universite.onrender.com/api';

  // apiUrlLocal = quand tu travailles en local chez toi
  // ACTUELLEMENT ton backend est sur le port 5000 (serveurEx.js)
  // Tu avais mis 3000, ça c'est l'ancien port, ça ne marchera plus
  // private apiUrlLocal = 'http://localhost:3000/api';

  // On choisit quelle URL utiliser.
  // ASTUCE : Change juste cette ligne pour passer de local à prod
  // private baseUrl = this.apiUrlLocal; // Mets this.apiUrlProd quand tu déploies
  private baseUrl = this.apiUrlProd;
  // private baseUrlProd = this.apiUrlProd ;

  // Ancienne route test
  private apinexus = 'http://localhost:5000/api/deux';

  constructor(private http: HttpClient) {}

  // =================================================================
  // METHODES
  // =================================================================

  // getnexus() : Route test que tu avais, garde la si tu veux
  getnexus() {
    return this.http.get(this.apinexus); // Appelle GET /api/deux
  }

  // getdonner() : C'EST CELLE QUI EST IMPORTANTE
  // Avant tu appelais /api/users sur le port 3000 qui n'existe plus
  // Maintenant elle appelle ton backend Firebase sur port 5000
  getdonner() {
    // Cette route appelle : GET http://localhost:5000/api/users
    // Et dans ton serveurEx.js, cette route va chercher dans Firestore collection 'universities'
    return this.http.get(`${this.baseUrl}/users`);
  }

  // --- NOUVELLES METHODES QUE TU VAS AVOIR BESOIN POUR LA SUITE ---

  // getUniversity(id) : Récupère UNE seule université par son ID (AUK ou CEPROMAD)
  getUniversity(id: string) {
    return this.http.get(`${this.baseUrl}/universities/${id}`);
  }

  // getReviews(universityId) : Récupère tous les avis d'une fac
  // Exemple: getReviews("AUK") -> tous les avis de AUK
  getReviews(universityId: string) {
    return this.http.get(`${this.baseUrl}/reviews/${universityId}`);
  }

  // addReview(data) : Ajoute un avis
  // data doit être : { universityId: "AUK", note: 5, commentaire: "Top", userId: "moi" }
  addReview(data: any) {
    return this.http.post(`${this.baseUrl}/reviews`, data);
  }
}

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root',
// })
// export class ListService {
//   private apiUrl = 'https://backend-unirank-universite.onrender.com/api/users';
//   private apiUrls = ' http://localhost:3000/api/users';
//   private apinexus = 'http://localhost:5000/api/deux';
//   constructor(private http: HttpClient) {}

// getdonner() {
//   return this.http.get(this.apiUrl);
// }
//   getnexus() {
//     return this.http.get(this.apinexus);
//   }
//   getdonner() {
//     return this.http.get(this.apiUrls);
//   }
// }
