import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CategoryComponent } from '../../components/category/category.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { APIService } from '../../services/api.service';
import { BudgetService } from '../../services/budget.service';
import { HelperService } from '../../services/helper.service';
import { FormsModule } from '@angular/forms';
import { HelperComponentsModule } from '../helpercomponents/helpercomponents.module';
import { BrowserModule } from '@angular/platform-browser';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@NgModule({
  declarations: [
    CategoryComponent,
  ],
  exports: [
    CategoryComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HelperComponentsModule,
    BrowserModule
  ],
  bootstrap: [CategoryComponent],
  providers: [provideHttpClient(withFetch()), APIService, BudgetService, HelperService],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})

export class CategoryModule { }
