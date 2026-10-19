import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  apiUrl = 'https://backend-unirank-universite.onrender.com/api';
  private readonly ADMIN_PASSWORD = 'unirank2026';

  reviews: any[] = [];
  filtered: any[] = [];
  search = '';
  isLogged = false;
  secretInput = '';
  loading = false;
  stats = { total: 0, publies: 0, masques: 0 };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const saved = localStorage.getItem('admin_secret');
    if (saved === this.ADMIN_PASSWORD) {
      this.secretInput = saved;
      this.login();
    }
  }

  get headers() {
    return {
      headers: new HttpHeaders({ 'x-admin-secret': this.ADMIN_PASSWORD }),
    };
  }

  login(): void {
    if (this.secretInput !== this.ADMIN_PASSWORD) {
      alert('Code secret incorrect');
      return;
    }
    this.loading = true;

    this.http.get<any>(`${this.apiUrl}/reviews`).subscribe({
      next: (res) => {
        const data = res.data || res;
        this.reviews = Array.isArray(data) ? data : [];
        this.filtered = [...this.reviews];
        this.calcStats();
        this.isLogged = true;
        localStorage.setItem('admin_secret', this.ADMIN_PASSWORD);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        // Fallback sur all-reviews si /reviews bloque
        this.http.get<any>(`${this.apiUrl}/all-reviews`).subscribe({
          next: (res2) => {
            this.reviews = res2.data || res2;
            if (!Array.isArray(this.reviews)) this.reviews = [];
            this.filtered = [...this.reviews];
            this.calcStats();
            this.isLogged = true;
            localStorage.setItem('admin_secret', this.ADMIN_PASSWORD);
            this.loading = false;
          },
          error: () => {
            alert('Backend encore en redémarrage, attends 30s et réessaie');
            this.loading = false;
          },
        });
      },
    });
  }

  logout(): void {
    localStorage.removeItem('admin_secret');
    this.isLogged = false;
    this.secretInput = '';
    this.reviews = [];
    this.filtered = [];
  }

  calcStats(): void {
    this.stats.total = this.reviews.length;
    this.stats.publies = this.reviews.filter(
      (r) => r.isPublished !== false,
    ).length;
    this.stats.masques = this.stats.total - this.stats.publies;
  }

  onSearch(): void {
    const q = this.search.toLowerCase().trim();
    if (!q) {
      this.filtered = [...this.reviews];
      return;
    }
    this.filtered = this.reviews.filter(
      (r) =>
        r.nom?.toLowerCase().includes(q) ||
        r.commentaire?.toLowerCase().includes(q) ||
        r.universityId?.toLowerCase().includes(q),
    );
  }

  toggleReview(r: any): void {
    const id = r.id;
    this.http
      .patch(`${this.apiUrl}/reviews/${id}/toggle`, {}, this.headers)
      .subscribe({
        next: () => {
          r.isPublished = !r.isPublished;
          this.calcStats();
        },
        error: () => alert('Erreur toggle'),
      });
  }

  deleteReview(r: any): void {
    const id = r.id;
    if (!confirm(`Supprimer l'avis de ${r.nom} ?`)) return;
    this.http.delete(`${this.apiUrl}/reviews/${id}`, this.headers).subscribe({
      next: () => {
        this.reviews = this.reviews.filter((x) => x.id !== id);
        this.filtered = this.filtered.filter((x) => x.id !== id);
        this.calcStats();
      },
      error: () => alert('Erreur suppression'),
    });
  }

  trackById(index: number, item: any): string {
    return item.id;
  }
}
