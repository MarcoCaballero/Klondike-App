import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

import { Suit } from '../model/suit';

interface IconData {
  name: string,
  path: string
}

@Component({
  selector: 'klondike-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'klondike-app';
  icons: IconData[] = [
    { name: 'hearts', path: 'cards/hearts.svg' },
    { name: 'diamonds', path: 'cards/diamonds.svg' },
    { name: 'spades', path: 'cards/spades.svg' },
    { name: 'clubs', path: 'cards/clubs.svg' }
  ];
  millisFromStart: number = 0;
  matchTimeString: String = '0:00:00';

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {

    this.addIcons();

    setInterval(() => {
      this.millisFromStart += 100;
      this.updateTime();
    }, 100);
  }

  private updateTime(): void {
    let hours: number = Math.floor(this.millisFromStart / (1000 * 60 * 60) % 60);
    let minutes: number = Math.floor(this.millisFromStart / (1000 * 60) % 60);
    let seconds: number = Math.floor(this.millisFromStart / 1000 % 60);

    this.matchTimeString = `${hours}:${this.getFormatedField(minutes)}:${this.getFormatedField(seconds)}`;
  }

  private getFormatedField(field: number): string {
    return (field < 10) ? `0${field}` : `${field}`;
  }

  private addIcons(): void {
    this.icons.forEach(icon => {
      this.iconRegistry.addSvgIconInNamespace('klondike-assets', icon.name,
        this.sanitizer.bypassSecurityTrustResourceUrl(`../../assets/${icon.path}`));
    });
  }
}
