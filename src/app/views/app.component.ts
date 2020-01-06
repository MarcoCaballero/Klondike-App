import { Component, ViewChild} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { BoardComponent } from './board/board.component';

interface IconData {
  name: string,
  path: string
}

// position: absolute;
// height: 150px;
// width: 150px;
// top: 45%;
// left: 30%;

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
        opacity: '100',
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
  ]
})
export class AppComponent {
  @ViewChild('board', {static: false}) board: BoardComponent;
  title = 'klondike-app';
  timer: NodeJS.Timer;
  icons: IconData[] = [
    { name: 'hearts', path: 'cards/hearts.svg' },
    { name: 'diamonds', path: 'cards/diamonds.svg' },
    { name: 'spades', path: 'cards/spades.svg' },
    { name: 'clubs', path: 'cards/clubs.svg' }
  ];
  millisFromStart: number = 0;
  matchTimeString: String = '0:00:00';
  public isUp: boolean = true;

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.addIcons();
  }

  onStart(): void {
    this.isUp = false;
    this.timer = setInterval(() => {
      this.millisFromStart += 100;
      this.updateTime();
    }, 100);
    this.board.startGame();
  }

  onStop(): void {
    this.isUp = true;
    clearInterval(this.timer);
    this.millisFromStart = 0;
    this.updateTime();
    this.board.stopGame(); 
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
