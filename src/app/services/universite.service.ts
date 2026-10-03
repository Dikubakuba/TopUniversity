// universite.service.ts - C'est le téléphone qui appelle le backend

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UniversiteService {
  // Adresse de ton backend
  private apiUrl = 'http://localhost:3000/api/universites';

  constructor(private http: HttpClient) {}

  // Méthode que ton composant va appeler
  getClassementParSpecialite(specialite: string) {
    // On appelle : /api/universites?specialite=informatique
    // Le backend va scraper, calculer et nous renvoyer le tri
    return this.http.get<any[]>(`${this.apiUrl}?specialite=${specialite}`);
  }
}
