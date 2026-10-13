import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(
    private meta: Meta,
    private title: Title,
  ) {}

  setSeo(data: {
    title: string;
    description: string;
    url: string;
    image?: string;
  }) {
    this.title.setTitle(data.title);

    this.meta.updateTag({ name: 'description', content: data.description });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'université RDC, avis université Congo, classement université Kinshasa, UniRank, UPC, UNIKIN',
    });

    this.meta.updateTag({ property: 'og:title', content: data.title });
    this.meta.updateTag({
      property: 'og:description',
      content: data.description,
    });
    this.meta.updateTag({ property: 'og:url', content: data.url });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    this.meta.updateTag({ name: 'twitter:title', content: data.title });
    this.meta.updateTag({
      name: 'twitter:description',
      content: data.description,
    });

    if (data.image) {
      this.meta.updateTag({ property: 'og:image', content: data.image });
    }

    let link: HTMLLinkElement | null = document.querySelector(
      "link[rel='canonical']",
    );
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', data.url);
  }
}
