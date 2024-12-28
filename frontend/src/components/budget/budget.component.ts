import { Component, HostListener, ViewChild } from '@angular/core';
import { BudgetService } from '../../services/budget.service';
import { APIService } from '../../services/api.service';
import { DatePipe } from '@angular/common';
import { HelperService } from '../../services/helper.service';
import { ModalComponent } from '../helpercomponents/modal/modal.component';
import { MessageBoxComponent, MessageType } from '../helpercomponents/messagebox/messagebox.component';
import { BudgetArguments } from './budget.arguments';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css'
})

export class BudgetComponent {
  public years: Array<any> = [];
  public showYearDropdown: boolean = false;
  public showBudgetFieldSetButtons: boolean = true;
  public showAddButton: boolean = false;
  public showEditButton: boolean = false;
  public iconPath: string = "assets/images/";
  public budgetModalTitle: string = "Budget";
  public isMonthDisabled: boolean = true;
  public isBudgetDisabled: boolean = false;
  public isRemarksDisabled: boolean = false;
  public showSaveButton: boolean = true;
  @ViewChild('etModalComponent') public budgetAddEditModal: ModalComponent;
  @ViewChild('etMessageBox') public etMessage: MessageBoxComponent;
  public mode: string = 'F';

  constructor(public budgetService: BudgetService, private apiService: APIService, private datePipe: DatePipe) {
  }

  ngOnInit() {
    let self = this;
    self.generateYears(2019, new Date().getFullYear());
  }

  ngAfterContentInit () {
    let self = this;
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


  /* ---- Modal ---- */
  public openModal(): void {
    this.budgetAddEditModal?.showModal();
  }

  public closeModal(): void {
    this.mode = 'F';
    this.budgetService.budgetArguments.month = 0;
    this.budgetService.budgetArguments.budget = 0;
    this.budgetService.budgetArguments.remarks = "";
    this.budgetAddEditModal?.closeModal();
  }


  /* ----Add/Edit---- */
  public onAddBtnClick() {
    let self = this;
    self.mode = 'I';
    self.budgetService.budgetArguments.month = new Date().getMonth() + 1;
    self.budgetModalTitle = "Set Budget";
    self.openModal();
  }
  
  public onEditBtnClick() {
    let self = this;
    self.mode = 'U';
    self.isBudgetDisabled = self.isRemarksDisabled = false;
    self.showSaveButton = true;
    if(!HelperService.isNullOrEmpty(self.budgetService.budgetsList)) {
      self.budgetService.budgetArguments = JSON.parse(JSON.stringify(self.budgetService.budgetsList.find(p => p.month == new Date().getMonth() + 1))) || new BudgetArguments();
    }
    self.budgetService.budgetArguments.month = new Date().getMonth() + 1;
    self.budgetModalTitle = "Edit Budget";
    self.openModal();
  }

  /* ----On Budget Save Click---- */
  public onSaveButtonClick(): any {
    let self = this;
    if(!HelperService.isNullOrEmpty(self.budgetService.budgetArguments)) {
      if(!self.validateBudgetForm())
        return;
      else {
        if(self.mode == "I") {
          self.createBudget();
        }
        else if (self.mode == "U") {
          self.updateBudget();
        }
      }
    }
  }

  /* ----API Calls/Data Initialization---- */
  // CREATE //
  public createBudget() {
    let self = this;
    let createArgs = {
      year: self.budgetService.budgetArguments.year,
      month: self.budgetService.budgetArguments.month,
      budget: self.budgetService.budgetArguments.budget,
      remarks: self.budgetService.budgetArguments.remarks
    };

    self.apiService.postData('budget/create', createArgs).subscribe({
      next: (resp: any) => {
        if(!HelperService.isNullOrEmpty(resp)) {
          if(resp.status == true) {
            self.budgetAddEditModal.closeModal();
            self.budgetService.budgetArguments.month = 0;
            self.budgetService.budgetArguments.budget = 0;
            self.budgetService.budgetArguments.remarks = "";
            self.etMessage.showMessage("Budget created successfully!", MessageType.success);
          }
          else{
            self.etMessage.showMessage("Failed to create budget, please try again!", MessageType.error);
          }
        }
        self.getYearWiseBudgets(this.budgetService.budgetArguments.year || new Date().getFullYear());
      },
      error: (err: any) => {
        if(!HelperService.isNullOrEmpty(err.error)) {
          self.etMessage.showMessage(err.error, MessageType.error);
        }
        else {
          self.etMessage.showMessage("Failed to create budget, please try again!", MessageType.error);
        }
      }
    });
  }

  // UPDATE //
  public updateBudget() {
    let self = this;
    let updateArgs = {
      _id: self.budgetService.budgetArguments._id,
      budget: self.budgetService.budgetArguments.budget,
      remarks: self.budgetService.budgetArguments.remarks
    };

    self.apiService.patchData('budget/edit', updateArgs).subscribe({
      next: (resp: any) => {
        if(!HelperService.isNullOrEmpty(resp)) {
          if(resp.status == true) {
            self.budgetAddEditModal.closeModal();
            self.budgetService.budgetArguments.month = 0;
            self.budgetService.budgetArguments.budget = 0;
            self.budgetService.budgetArguments.remarks = "";
            self.etMessage.showMessage("Budget updated successfully!", MessageType.success);
          }
          else{
            self.etMessage.showMessage("Failed to update budget, please try again!", MessageType.error);
          }
        }
        self.getYearWiseBudgets(this.budgetService.budgetArguments.year || new Date().getFullYear());
      },
      error: (err: any) => {
        if(!HelperService.isNullOrEmpty(err.error)) {
          self.etMessage.showMessage(err.error, MessageType.error);
        }
        else {
          self.etMessage.showMessage("Failed to update budget, please try again!", MessageType.error);
        }
      }
    });
  }

  // GET //
  public getYearWiseBudgets(year: number) {
    let self = this;
    self.apiService.getData(`budget/get/${year}`).subscribe({
      next: (resp: any) => {
        if(!HelperService.isNullOrEmpty(resp)) {
          if(!HelperService.isNullOrEmpty(resp.budgetList)) {
            self.budgetService.budgetsList = resp.budgetList;
            self.setBudgetMonthIcons();
          }
          else {
            self.budgetService.budgetsList = [];
            if(!HelperService.isNullOrEmpty(resp.message)) 
              self.etMessage.showMessage(resp.message, MessageType.error);
            else
              self.etMessage.showMessage("No Records Found!", MessageType.error);
          }
        }
        else {
          self.budgetService.budgetsList = [];
          self.etMessage.showMessage("Failed to fetch budget for the given year!", MessageType.error);
        }

        if(self.budgetService.budgetArguments.year == new Date().getFullYear()) {
          if(HelperService.isNullOrEmpty(self.budgetService.budgetsList.find(p => p.month == new Date().getMonth() + 1))) {
            self.showAddButton = true;
            self.showEditButton = false;
          }
          else {
            self.showAddButton = false;
            self.showEditButton = true;
          }
        }
        else{
          self.showAddButton = false;
          self.showEditButton = false;
        }
      },
      error: (err: any) => {
        self.budgetService.budgetsList = [];
        if(!HelperService.isNullOrEmpty(err.error)) {
          self.etMessage.showMessage(err.error, MessageType.error);
        }
        else {
          self.etMessage.showMessage("Failed to fetch budget for the given year!", MessageType.error);
        }
      }
    });
  }

  public getMonthName(monthNumber: number): string {
    const date = new Date(0, monthNumber - 1);
    return this.datePipe?.transform(date, 'MMMM') || '';
  }

  public setBudgetMonthIcons() {
    let self = this;
    if(!HelperService.isNullOrEmpty(self.budgetService.budgetsList)) {
      self.budgetService.budgetsList.forEach(budget => {
        budget.iconPath = self.iconPath + self.getMonthName(budget.month).toLowerCase() + ".png"; 
      });
    }
  }

  // GET
  public onBudgetTileClick(budget: BudgetArguments, mode: string = "F") {
    let self = this;
    self.mode = "F";
    self.budgetService.budgetArguments = JSON.parse(JSON.stringify(budget));
    self.isBudgetDisabled = self.isRemarksDisabled = true;
    self.showSaveButton = false;
    self.budgetAddEditModal.showModal();
  }

  /* Setting Custom Classes */
  public setActiveBudBtnClass(activatedMode: string) {
    let self = this;
    if(self.mode === activatedMode) 
      return true;
    return false;
  }

  /* Validations */
  private validateBudgetForm(): boolean {
    let self = this;
    let flag: boolean = true;

    if(!HelperService.isNullOrEmpty(self.budgetService.budgetArguments)) {
      if(self.mode == "U" && HelperService.isNullOrEmpty(self.budgetService.budgetArguments._id)) {
        self.etMessage.showMessage("Id not found", MessageType.error);
        flag = false;
      }

      if(self.budgetService.budgetArguments.budget <= 0) {
        self.etMessage.showMessage("Budget Amount is too huge", MessageType.error);
        flag = false;
      }
      
      if(self.mode == "I" && !HelperService.isNullOrEmpty(self.budgetService.budgetsList.find(p => p.year == new Date().getFullYear() && p.month == new Date().getMonth()))) {
        self.etMessage.showMessage("Budget data for current Month and Year already exists", MessageType.error);
        flag = false;
      }
      
      if(self.budgetService.budgetArguments.month <= 0) {
        self.etMessage.showMessage("Month not found", MessageType.error);
        flag = false;
      }
      
      if(self.budgetService.budgetArguments.year <= 0) {
        self.etMessage.showMessage("Year not found", MessageType.error);
        flag = false;
      }
    }
    return flag; 
  }
}
