import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetComponent } from '../../components/budget/budget.component';
import { provideHttpClient } from '@angular/common/http';
import { APIService } from '../../services/api.service';
import { BudgetService } from '../../services/budget.service';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    BudgetComponent
  ],
  exports: [
    BudgetComponent
  ],
  imports: [
    CommonModule
  ],
  bootstrap: [BudgetComponent],
  providers: [provideHttpClient(), APIService, BudgetService, DatePipe]
})

export class BudgetModule { }
