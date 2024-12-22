import { Injectable } from "@angular/core";
import { BudgetArguments } from "../components/budget/budget.arguments";

@Injectable({providedIn: 'root'})
export class BudgetService {
    public budgetArguments: BudgetArguments = new BudgetArguments();
    public budgetsList: Array<BudgetArguments> = new Array<BudgetArguments>();

    constructor() {

    }
}