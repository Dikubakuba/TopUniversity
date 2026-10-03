import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private apiUrl = 'https://backend-unirank-universite.onrender.com/api/users';
  constructor(private http: HttpClient) {}

  getdonner() {
    return this.http.get(this.apiUrl);
  }
}
