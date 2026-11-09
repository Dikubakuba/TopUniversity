import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homme',
  templateUrl: './homme.component.html',
  styleUrl: './homme.component.css',
})
export class HommeComponent {
  constructor(private router: Router) {}

  // --- TON CODE EXISTANT, JE LE GARDE ---
  menus: boolean = false; // j'ai mis false pour que le menu soit caché au début
  searchText: string = '';

  redirecto() {
    this.router.navigate(['/page']);
  }

  menu() {
    this.menus = !this.menus;
  }

  // --- MES DONNÉES POUR TES CARTES ---
  universites = [
    { nom: 'ISIPA', frais: '450$/an', note: 4.6, avis: 320, filiere: 'Informatique - Kinshasa', img: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&q=80', badge: 'Vérifiée', isFav: false },
    { nom: 'UNIKIN', frais: '200$/an', note: 4.4, avis: 512, filiere: 'Médecine - Kinshasa', img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&q=80', badge: 'Publique', isFav: false },
    { nom: 'UPC', frais: '600$/an', note: 4.3, avis: 187, filiere: 'Économie - Kinshasa', img: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&q=80', badge: 'Vérifiée', isFav: false },
  ];

  get filteredUniversites() {
    const m = this.searchText.toLowerCase().trim();
    if (!m) return this.universites;
    return this.universites.filter(u =>
      u.nom.toLowerCase().includes(m) ||
      u.filiere.toLowerCase().includes(m)
    );
  }

  toggleFav(u: any, e: Event) {
    e.stopPropagation();
    u.isFav = !u.isFav;
  }

  go(page: string) {
    // Si tu veux naviguer plus tard, mets ton router ici
    // this.router.navigate(['/page']);
    alert('Tu vas vers : ' + page);
  }
}
