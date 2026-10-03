import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private apiUrl = 'http://localhost:3000/api/users';
  constructor(private http: HttpClient) {}

  getdonner() {
    return this.http.get(this.apiUrl);
  }
}
