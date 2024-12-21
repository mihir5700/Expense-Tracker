import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetComponent } from '../components/budget/budget.component';
import { CategoryComponent } from '../components/category/category.component';
import { ActiveTrackerComponent } from '../components/activetracker/activetracker.component';
import { HistoryTrackerComponent } from '../components/historytracker/historytracker.component';
import { HomeComponent } from '../components/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'budget', component: BudgetComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'mm-active', component: ActiveTrackerComponent },
  { path: 'mm-history', component: HistoryTrackerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
