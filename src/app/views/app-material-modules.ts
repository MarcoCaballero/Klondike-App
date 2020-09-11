/* Material Modules */
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';

/* Material CDK Modules */
import { DragDropModule } from '@angular/cdk/drag-drop';

export const ANGULAR_MATERIAL_MODULES: any[] = [
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatRadioModule
]

export const ANGULAR_CDK_MODULES: any[] = [
    DragDropModule
]