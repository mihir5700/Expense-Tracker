import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class CategoryService {
    public categoryArguments: CategoryArguments = new CategoryArguments();
    public categoriesList: Array<CategoryArguments> = new Array<CategoryArguments>();

    constructor() {

    }
}

export class CategoryArguments {
    public _id: string = "";
    public category: string = "";
    public remarks: string = "";
}