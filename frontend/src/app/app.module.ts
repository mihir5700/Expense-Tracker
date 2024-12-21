import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MasterTemplateModule } from '../modules/mastertemplate/mastertemplate.module';
import { BudgetModule } from '../modules/budget/budget.module';
import { CategoryModule } from '../modules/category/category.module';
import { ActiveTrackerModule } from '../modules/activetracker/activetracker.module';
import { HistoryTrackerModule } from '../modules/historytracker/historytracker.module';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    BudgetModule,
    CategoryModule,
    ActiveTrackerModule,
    HistoryTrackerModule
  ],
  providers: [
    // provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
