import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BudgetComponent } from '../../components/budget/budget.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { APIService } from '../../services/api.service';
import { BudgetService } from '../../services/budget.service';
import { DatePipe } from '@angular/common';
import { HelperService } from '../../services/helper.service';
import { HelperComponentsModule } from '../helpercomponents/helpercomponents.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    BudgetComponent
  ],
  exports: [
    BudgetComponent
  ],
  imports: [
    CommonModule,
    HelperComponentsModule,
    FormsModule,
    BrowserModule
  ],
  bootstrap: [BudgetComponent],
  providers: [provideHttpClient(withFetch()), APIService, BudgetService, DatePipe, HelperService, CurrencyPipe],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})

export class BudgetModule { }
