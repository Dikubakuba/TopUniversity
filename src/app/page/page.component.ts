import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent {
  constructor(
    private route: Router,
    private router: Router,
    private listeservice: ListService,
  ) {}

  Mavariable: any[] = [];

  ngOnInit(): void {
    this.listeservice.getdonner().subscribe({
      next: (data: any) => {
        this.Mavariable = data;
        console.log(this.Mavariable);
      },
      error: (error) => {
        console.error('Erreur API:', error);
      },
    });
  }
  voirDetail(id: string) {
    this.router.navigate(['/universite', id]);
  }
}
