import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { StartService } from 'app/services/start.service';
import { GameMode, GetGameMode } from 'app/model/game-mode';

interface IconData {
  name: string;
  path: string;
}

@Component({
  selector: 'klondike-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    // Start
    trigger('startGameAnimation', [
      state('down', style({
        position: 'absolute',
        top: '87%',
        left: '1%',
        height: '56px',
        width: '56px',
        'z-index': '100'
      })),
      state('up', style({
        position: 'absolute',
        height: '150px',
        width: '150px',
        top: '45%',
        left: '45%',
        'z-index': '100'
      })),
      transition('up => down', [
        animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')
      ]),
      transition('down => up', [
        animate('500ms cubic-bezier(0, 0, 0.25, 1)')
      ]),
    ]),
    // End
    trigger('endGameAnimation', [
      state('down', style({
        opacity: '1',
        'z-index': '100'
      })),
      state('up', style({
        opacity: '0',
        'z-index': '100'
      })),
      transition('up => down', [
        animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')
      ]),
      transition('down => up', [
        animate('500ms cubic-bezier(0, 0, 0.25, 1)')
      ]),
    ]),
    // Gme mode
    trigger('gameModeAnimation', [
      state('up', style({
        opacity: '1',
        'z-index': '100'
      })),
      state('down', style({
        opacity: '0',
        'z-index': '100'
      })),
      transition('up => down', [
        animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')
      ]),
      transition('down => up', [
        animate('500ms cubic-bezier(0, 0, 0.25, 1)')
      ]),
    ]),
  ]
})
export class AppComponent {
  title = 'klondike-app';
  timer: any;
  icons: IconData[] = [
    { name: 'hearts', path: 'cards/hearts.svg' },
    { name: 'diamonds', path: 'cards/diamonds.svg' },
    { name: 'spades', path: 'cards/spades.svg' },
    { name: 'clubs', path: 'cards/clubs.svg' }
  ];
  millisFromStart = 0;
  matchTimeString = '0:00:00';
  selectedMode: string = GameMode.ONE_CARD_MODE;
  public isNewGameButtonShown = true;

  constructor(private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer,
              private _startService: StartService) {
    this.addIcons();
  }

  onStart(): void {
    this.hideNewGameButton();
    this.setGameTimer();
    this._startService.start(GetGameMode(this.selectedMode));
  }

  onStop(): void {
    this.showNewGameButton();
    clearInterval(this.timer);
    this.resetGameTimer();
    this.updateTime();
    this._startService.stop();
  }

  isOneModeEnabled(): boolean {
    return this.selectedMode === GameMode.ONE_CARD_MODE;
  }

  private updateTime(): void {
    const hours: number = Math.floor(this.millisFromStart / (1000 * 60 * 60) % 60);
    const minutes: number = Math.floor(this.millisFromStart / (1000 * 60) % 60);
    const seconds: number = Math.floor(this.millisFromStart / 1000 % 60);

    this.matchTimeString = `${hours}:${this.getFormatedField(minutes)}:${this.getFormatedField(seconds)}`;
  }

  private getFormatedField(field: number): string {
    return (field < 10) ? `0${field}` : `${field}`;
  }

  private addIcons(): void {
    this.icons.forEach((icon: IconData) => {
      this.iconRegistry.addSvgIconInNamespace('klondike-assets', icon.name,
        this.sanitizer.bypassSecurityTrustResourceUrl(`../../assets/${icon.path}`));
    });
  }

  private hideNewGameButton(): void {
    this.isNewGameButtonShown = false;
  }

  private showNewGameButton(): void {
    this.isNewGameButtonShown = true;
  }

  private setGameTimer(): void {
    this.millisFromStart = 0;
    this.timer = setInterval(() => {
      this.millisFromStart += 100;
      this.updateTime();
    }, 100);
  }

  private resetGameTimer(): void {
    this.millisFromStart = 0;
  }

}
