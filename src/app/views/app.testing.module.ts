import { HttpClientModule } from '@angular/common/http';
import { TestModuleMetadata } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ANGULAR_CDK_MODULES, ANGULAR_MATERIAL_MODULES } from './app-material-modules';
import { AppRoutingModule } from './app-routing.module';
import { BoardComponent } from './board/board.component';
import { CardComponent } from './card/card.component';
import { FoundationComponent } from './foundation/foundation.component';
import { StockComponent } from './stock/stock.component';
import { TableauComponent } from './tableau/tableau.component';
import { WasteComponent } from './waste/waste.component';
import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';

// TestModuleMetadata
export const TESTING_MODULE_METADATA: TestModuleMetadata = {
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        ANGULAR_CDK_MODULES,
        ANGULAR_MATERIAL_MODULES
      ] ,
      declarations: [
        AppComponent,
        BoardComponent,
        StockComponent,
        CardComponent,
        WasteComponent,
        FoundationComponent,
        TableauComponent
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
}