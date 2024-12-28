import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HelperService } from '../../../services/helper.service';

@Component({
    selector: 'et-modal',
    templateUrl: './modal.html'
})

export class ModalComponent {
    public isVisible = false; // Controls visibility
    @Input() public showModalHeader: boolean = true; // Controls visibility
    @Input() modalTitle: string = "Modal"; 
    @Input() viewMessageBox: boolean = false; 
    @Output() close: EventEmitter<any> = new EventEmitter<any>(); 

    constructor() {
    }

    ngOnInit() {
        let self = this;
        self.closeModal();
    }

    ngAfterViewInit() {
    }

    closeModal(event?: Event): void {
        let self = this;
        if (event) 
            event.stopPropagation(); // Prevent closing on modal content click
        self.isVisible = false;
        self.close.emit();
    }

    showModal() {
        let self = this;
        self.isVisible = true;
    }
}
