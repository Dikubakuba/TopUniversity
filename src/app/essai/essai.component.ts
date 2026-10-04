import { Component, OnInit } from '@angular/core';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-essai',
  templateUrl: './essai.component.html',
  styleUrl: './essai.component.css',
})
export class EssaiComponent {
  constructor(private service: ListService) {}
  donneany: any[] = [];
  ngOnInit() {
    this.service.getnexus().subscribe({
      next: (data: any) => {
        this.donneany = data;
      },
      error: (erreur) => {
        console.error('Erreur', erreur);
      },
    });
  }
}
