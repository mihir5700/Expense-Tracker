import { Injectable } from "@angular/core";
import { BudgetArguments } from "../components/budget/budget.arguments";

@Injectable({providedIn: 'root'})
export class HelperService {
    constructor() {

    }

    static isNullOrUndefined(data: any) {
        if(data === undefined) 
            return true;
        else if (data === null)
            return true;
        else
            return false;
    }

    static isNullOrEmpty(data: any) {
        if (this.isNullOrUndefined(data))
            return true;
        else {
            if (data instanceof Array) {
                if(data.length === 0)
                    return true;
                else 
                    return false;
            }
            else if (data instanceof Object) {
                if(Object.keys(data).length === 0)
                    return true;
                else
                    return false;
            }
            else 
                return data.toString() === "" || data.toString().length === 0; 
        }
    }
}