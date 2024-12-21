import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from '../../components/category/category.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    CategoryComponent
  ],
  exports: [
    CategoryComponent
  ],
  imports: [
    CommonModule
  ],
  bootstrap: [CategoryComponent],
  providers: [provideHttpClient()]
})

export class CategoryModule { }
