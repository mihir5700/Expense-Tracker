import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterTemplateComponent } from '../../components/mastertemplate/mastertemplate.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BudgetModule } from '../budget/budget.module';
import { CategoryModule } from '../category/category.module';

@NgModule({
  declarations: [
    MasterTemplateComponent
  ],
  exports: [
    MasterTemplateComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    BudgetModule,
    CategoryModule
  ],
  bootstrap: [MasterTemplateComponent]
})

export class MasterTemplateModule { }
