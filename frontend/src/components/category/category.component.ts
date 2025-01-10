    import { Component, ViewChild } from '@angular/core';
    import { CategoryArguments, CategoryService } from '../../services/category.service';
    import { APIService } from '../../services/api.service';
    import { MessageBoxComponent, MessageType } from '../helpercomponents/messagebox/messagebox.component';
    import { ModalComponent } from '../helpercomponents/modal/modal.component';
import { HelperService } from '../../services/helper.service';

    @Component({
    selector: 'app-category',
    templateUrl: './category.component.html'
    })

    export class CategoryComponent {
    public mode: string = "F";
    public categoryModalTitle: string = "Category";
    public isCategoryDisabled: boolean = false;
    public isRemarksDisabled: boolean = false;
    public showSaveButton: boolean = true;
    @ViewChild('etModalComponent') public etModal: ModalComponent;
    @ViewChild('etMessageBox') public etMessage: MessageBoxComponent;


    /* ----Component Initializers---- */
    constructor(public categoryService: CategoryService, private apiService: APIService) {
    }

    ngOnInit() {
        let self = this;
        self.getCategories();
    }


    /* ----Styling Helpers---- */
    public setActiveBtnClass(activatedMode: string) {
        let self = this;
        if(self.mode === activatedMode) 
            return true;
        return false;
    }


    /* ----Click Event Methods---- */
    public onAddBtnClick() {
        let self = this;
        self.mode = "I";
        self.categoryService.categoryArguments = new CategoryArguments();
        self.categoryModalTitle = "Set Category"
        self.isCategoryDisabled = self.isRemarksDisabled = false;
        self.showSaveButton = true;
        self.etModal.showModal();
    }

    public onSaveButtonClick() {
        let self = this;
        if(!HelperService.isNullOrEmpty(self.categoryService.categoryArguments)) {
            if(!self.validateCategoryForm())
                return;
            else {
                if (self.mode == "I") {
                    self.createCategory();
                }
                else if (self.mode == "U") {
                    self.updateCategory();
                }
            }
        }
    }

    public onEditButtonClick(event: Event, category: CategoryArguments) {
        event.stopPropagation();
        let self = this;
        self.mode = "U";
        self.categoryService.categoryArguments = JSON.parse(JSON.stringify(category));
        self.categoryModalTitle = "Edit Category";
        self.isCategoryDisabled = self.isRemarksDisabled = false;
        self.showSaveButton = true;
        self.etModal.showModal();
    }

    public onDeleteButtonClick(event: Event, category: CategoryArguments) {
        event.stopPropagation();
        let self = this;
        self.categoryService.categoryArguments = JSON.parse(JSON.stringify(category));
        self.etMessage.showMessage("Are you sure you want to delete this category ?", MessageType.confirm);
    }

    public onConfirmBoxBtnClick(confirm: any) {
        let self = this;
        if(confirm == true) {
            self.mode = "D";
            self.deleteCategory();
        }
        else {
            self.mode = "F";
            self.categoryService.categoryArguments = new CategoryArguments();
        }
    }

    public onCategoryTileClick(category: CategoryArguments, mode: string = "F") {
        let self = this;
        self.mode = "F";
        self.categoryService.categoryArguments = JSON.parse(JSON.stringify(category));
        self.isCategoryDisabled = self.isRemarksDisabled = true;
        self.showSaveButton = false;
        self.categoryModalTitle = "Category";
        self.etModal?.showModal();
    }

    public closeModal() {
        let self = this;
        self.mode = "F";
        self.categoryService.categoryArguments = new CategoryArguments();
    }


    /* ----API Calls/Data Initialisation---- */
    public getCategories() {
        let self = this;
        self.apiService.getData('category/get').subscribe({
            next: (resp: any) => {
                if(!HelperService.isNullOrUndefined(resp)) {
                    if(!HelperService.isNullOrEmpty(resp.categoriesList) && resp.status == true) {
                        self.categoryService.categoriesList = resp.categoriesList;
                    }
                    else {
                        if(!HelperService.isNullOrEmpty(resp.message))
                            self.etMessage.showMessage(resp.message, MessageType.error);
                        else
                            self.etMessage.showMessage("Failed to fetch all categories. Please try again!", MessageType.error);
                    }
                }
            },
            error: (err: any) => {
                if (!HelperService.isNullOrEmpty(err.error)) {
                    self.etMessage.showMessage(err.error, MessageType.error);
                }
                else {
                    self.etMessage.showMessage("Failed to fetch all categories. Please try again!", MessageType.error);
                }
            }
        })
    }

    public createCategory() {
        let self = this;
        let categoryArgs: any = {
            category: self.categoryService.categoryArguments.category || "",
            remarks: self.categoryService.categoryArguments.remarks || ""
        }
        self.apiService.postData('category/create', categoryArgs).subscribe({
            next: (resp: any) => {
                if(!HelperService.isNullOrUndefined(resp)) {
                    if(resp.status == true) {
                        self.etModal.closeModal();
                        self.categoryService.categoryArguments.category = "";
                        self.categoryService.categoryArguments.remarks = "";
                        self.etMessage.showMessage("Category created successfully!", MessageType.success);
                    }
                    else {
                        if(!HelperService.isNullOrEmpty(resp.message)) {
                            self.etMessage.showMessage(resp.message, MessageType.error);
                        }
                        else {
                            self.etMessage.showMessage("Failed to create this category. Please try again!", MessageType.error);
                        }
                    }
                }
                else {
                    self.etMessage.showMessage("Failed to create this category. Please try again!", MessageType.error);
                }
                self.getCategories();
            },
            error: (err: any) => {
                self.getCategories();
                if (!HelperService.isNullOrEmpty(err.error)) {
                    self.etMessage.showMessage(err.error, MessageType.error);
                }
                else {
                    self.etMessage.showMessage("Failed to create this category. Please try again!", MessageType.error);
                }
            }
        })
    }

    public updateCategory() {
        let self = this;
        let categoryArgs: any = {
            _id: self.categoryService.categoryArguments._id.toString(),
            category: self.categoryService.categoryArguments.category || "",
            remarks: self.categoryService.categoryArguments.remarks || ""
        }
        self.apiService.patchData('category/edit', categoryArgs).subscribe({
            next: (resp: any) => {
                if(!HelperService.isNullOrUndefined(resp)) {
                    if(resp.status == true) {
                        self.etModal.closeModal();
                        self.categoryService.categoryArguments.category = "";
                        self.categoryService.categoryArguments.remarks = "";
                        self.etMessage.showMessage("Category updated successfully!", MessageType.success);
                    }
                    else {
                        if(!HelperService.isNullOrEmpty(resp.message)) {
                            self.etMessage.showMessage(resp.message, MessageType.error);
                        }
                        else {
                            self.etMessage.showMessage("Failed to update this category. Please try again!", MessageType.error);
                        }
                    }
                }
                else {
                    self.etMessage.showMessage("Failed to update this category. Please try again!", MessageType.error);
                }
                self.getCategories();
            },
            error: (err: any) => {
                self.getCategories();
                if (!HelperService.isNullOrEmpty(err.error)) {
                    self.etMessage.showMessage(err.error, MessageType.error);
                }
                else {
                    self.etMessage.showMessage("Failed to update this category. Please try again!", MessageType.error);
                }
            }
        })
    }

    public deleteCategory() {
        let self = this;
        self.apiService.deleteData(`category/delete/${self.categoryService.categoryArguments._id.toString()}`)
        .subscribe({
            next: (resp: any) => {
                if(!HelperService.isNullOrUndefined(resp)) {
                    if(resp.status == true) {
                        self.etModal.closeModal();
                        self.categoryService.categoryArguments.category = "";
                        self.categoryService.categoryArguments.remarks = "";
                        self.etMessage.showMessage("Category deleted successfully!", MessageType.success);
                    }
                    else {
                        if(!HelperService.isNullOrEmpty(resp.message)) {
                            self.etMessage.showMessage(resp.message, MessageType.error);
                        }
                        else {
                            self.etMessage.showMessage("Failed to delete this category. Please try again!", MessageType.error);
                        }
                    }
                }
                else {
                    self.etMessage.showMessage("Failed to delete this category. Please try again!", MessageType.error);
                }
                self.getCategories();
            },
            error: (err: any) => {
                self.getCategories();
                if (!HelperService.isNullOrEmpty(err.error)) {
                    self.etMessage.showMessage(err.error, MessageType.error);
                }
                else {
                    self.etMessage.showMessage("Failed to delete this category. Please try again!", MessageType.error);
                }
            }
        })
    }

    /* Validation Methods */
    private validateCategoryForm(): boolean {
        let self = this;
        let flag = true;

        if(HelperService.isNullOrEmpty(self.categoryService.categoryArguments.category)){
            self.etMessage.showMessage("Please enter a category", MessageType.error);
            flag = false;
        }

        if(self.mode == "U" && HelperService.isNullOrEmpty(self.categoryService.categoryArguments._id)) {
            self.etMessage.showMessage("Id not found", MessageType.error);
            flag = false;
        }

        return flag;
    }
}
