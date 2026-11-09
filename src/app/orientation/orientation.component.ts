import { Component } from '@angular/core';

@Component({
  selector: 'app-orientation',
  templateUrl: './orientation.component.html',
  styleUrls: ['./orientation.component.css'],
})
export class OrientationComponent {
  step = 0;
  answers: string[] = ['', '', ''];
  questions = [
    {
      title: 'Qu’est-ce qui vous passionne le plus ?',
      options: [
        'Comprendre les technologies',
        'Soigner et aider les autres',
        'Défendre et conseiller',
        'Créer et entreprendre',
      ],
    },
    {
      title: 'Dans quel environnement aimez-vous travailler ?',
      options: [
        'Laboratoire ou bureau technique',
        'Hôpital ou milieu social',
        'Entreprise ou administration',
        'Terrain et projets pratiques',
      ],
    },
    {
      title: 'Quel est votre objectif principal ?',
      options: [
        'Devenir expert dans un domaine',
        'Avoir un métier utile à la société',
        'Diriger une organisation',
        'Créer ma propre activité',
      ],
    },
  ];

  choose(option: string): void {
    this.answers[this.step] = option;
  }
  next(): void {
    if (this.answers[this.step] && this.step < this.questions.length - 1)
      this.step++;
  }
  previous(): void {
    if (this.step > 0) this.step--;
  }
  restart(): void {
    this.step = 0;
    this.answers = ['', '', ''];
  }
  get finished(): boolean {
    return this.step === this.questions.length - 1 && !!this.answers[2];
  }
}
