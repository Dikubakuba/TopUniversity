import { Component } from '@angular/core';

@Component({
  selector: 'app-classement',
  templateUrl: './classement.component.html',
  styleUrls: ['./classement.component.css']
})
export class ClassementComponent {
  search = '';
  cityFilter = 'all';
  typeFilter = 'all';
  scoreFilter = 'all';

  universities = [
    { id: 1, name: 'Université de Kinshasa', nameFr: 'Première université publique du pays', code: 'UNIKIN', city: 'Kinshasa', type: 'Public', score: 88.4, change: '+2', color: '#3b82f6' },
    { id: 2, name: 'Université de Lubumbashi', nameFr: 'Excellence académique au Katanga', code: 'UNILU', city: 'Lubumbashi', type: 'Public', score: 84.7, change: '+1', color: '#0d9488' },
    { id: 3, name: 'Université Catholique du Congo', nameFr: 'Université privée de référence', code: 'UCC', city: 'Kinshasa', type: 'Privé', score: 81.3, change: '0', color: '#7c3aed' },
    { id: 4, name: 'Université Protestante au Congo', nameFr: 'Formation théologique et sciences', code: 'UPC', city: 'Kinshasa', type: 'Privé', score: 77.9, change: '-1', color: '#f97316' },
    { id: 5, name: 'Université de Kisangani', nameFr: 'Pôle universitaire de la Tshopo', code: 'UNIKIS', city: 'Kisangani', type: 'Public', score: 74.2, change: '+3', color: '#22c55e' },
    { id: 6, name: 'Université Loyola du Congo', nameFr: 'Université jésuite', code: 'ULC', city: 'Kinshasa', type: 'Privé', score: 71.5, change: '+4', color: '#1e40af' },
  ];

  onSearch(event: any) { this.search = event.target.value.toLowerCase().trim(); }
  onCityChange(event: any) { this.cityFilter = event.target.value; }
  onTypeChange(event: any) { this.typeFilter = event.target.value; }
  onScoreChange(event: any) { this.scoreFilter = event.target.value; }
  resetFilters() {
    this.search = '';
    this.cityFilter = 'all';
    this.typeFilter = 'all';
    this.scoreFilter = 'all';
    (document.querySelector('.search-box input') as HTMLInputElement).value = '';
    (document.querySelectorAll('.filters select') as any).forEach((s: any) => s.value = 'all');
  }

  get filtered() {
    return this.universities.filter(u => {
      const q = this.search;
      const matchSearch = !q || u.name.toLowerCase().includes(q) || u.city.toLowerCase().includes(q) || u.code.toLowerCase().includes(q);
      const matchCity = this.cityFilter === 'all' || u.city.toLowerCase() === this.cityFilter.toLowerCase();
      const matchType = this.typeFilter === 'all' || u.type.toLowerCase() === this.typeFilter.toLowerCase();
      const matchScore = this.scoreFilter === 'all' || u.score >= Number(this.scoreFilter);
      return matchSearch && matchCity && matchType && matchScore;
    });
  }
}
