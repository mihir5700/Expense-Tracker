import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetComponent } from '../../components/budget/budget.component';
import { provideHttpClient } from '@angular/common/http';

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
  providers: [provideHttpClient()]
})

export class BudgetModule { }
