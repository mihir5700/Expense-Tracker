import { Component, HostListener } from '@angular/core';
import { BudgetService } from '../../services/budget.service';
import { APIService } from '../../services/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css'
})

export class BudgetComponent {
  public years: Array<any> = [];
  public showYearDropdown: boolean = false;
  public showBudgetFieldSetButtons: boolean = true;
  public showAddButton: boolean = true;
  public showEditButton: boolean = true;

  constructor(public budgetService: BudgetService, private apiService: APIService, private datePipe: DatePipe) {

  }

  ngOnInit() {
    let self = this;
    self.generateYears(2019,  new Date().getFullYear());
  }


  /* ----Year---- */
  public generateYears(startYear: number, endYear: number): void {
    for (let year = endYear; year >= startYear; year--)
      this.years.push(year);
  }

  public onYearDropdownClick(event: Event) {
    let self = this;
    self.showYearDropdown = !self.showYearDropdown;
    event.stopPropagation();
  }

  public onYearSelect(year: any) {
    if(year != null && year > 0) {
      this.budgetService.budgetArguments.year = year;
      this.showYearDropdown = false;
      this.getYearWiseBudgets(year);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    this.showYearDropdown = false;
  }
  /* ----Year---- */


  /* ----Add/Edit---- */
  public onAddBtnClick() {
    let self = this;

  }
  
  public onEditBtnClick() {
    let self = this;

  }
  /* ----Add/Edit---- */


  /* ----API Calls/Data Initialization---- */
  public getYearWiseBudgets(year: number) {
    let self = this;
    self.apiService.getData(`budget/get/${year}`).subscribe({
      next: (resp: any) => {
        if(resp != null && resp != undefined && resp.length > 0) {
          self.budgetService.budgetsList = resp;
        }
      },
      error: (err: any) => {

      }
    });
  }

  public getMonthName(monthNumber: number): string {
    const date = new Date(0, monthNumber - 1);
    return this.datePipe?.transform(date, 'MMMM') || '';
  }
  /* ----API Calls/Data Initialization---- */


  /* ----Component Vacation Methods---- */
  /* ----Component Vacation Methods---- */


}
