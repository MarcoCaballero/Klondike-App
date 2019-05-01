import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './views/app-routing.module';
import { AppComponent } from './views/app.component';

import { ANGULAR_MATERIAL_MODULES, ANGULAR_CDK_MODULES } from './views/app-material-modules';

import { StockComponent } from './views/stock/stock.component';
import { CardComponent } from './views/card/card.component';
import { WasteComponent } from './views/waste/waste.component';
import { FoundationComponent } from './views/foundation/foundation.component';
import { TableauComponent } from './views/tableau/tableau.component';
import { BoardComponent } from './views/board/board.component';

@NgModule({
  declarations: [
    AppComponent,
    StockComponent,
    CardComponent,
    WasteComponent,
    FoundationComponent,
    TableauComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ANGULAR_CDK_MODULES,
    ANGULAR_MATERIAL_MODULES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
