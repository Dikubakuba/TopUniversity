import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private apiUrl = 'https://backend-unirank-universite.onrender.com/api/users';
  private apiUrls = ' http://localhost:5000/api/users';
  private apinexus = 'http://localhost:5000/api/deux';
  constructor(private http: HttpClient) {}

  getdonner() {
    return this.http.get(this.apiUrl);
  }
  getnexus() {
    return this.http.get(this.apinexus);
  }
}
