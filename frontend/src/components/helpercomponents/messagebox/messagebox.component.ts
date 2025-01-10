import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { HelperService } from '../../../services/helper.service';

@Component({
    selector: 'et-messagebox',
    template: `
        <div class="et-msg-modal-container" 
             [ngClass]="{'msg-success': messageType == 1, 'msg-danger': messageType == 2, 'msg-warning': messageType == 3 || messageType == 5  }" 
             [hidden]="!isVisible" 
             (click)="closeModal($event)">
             <div class="et-msg-modal-content" (click)="$event.stopPropagation()">
                <div class="et-msg-header" [style.margin-bottom]="messageType == 5 ? '2px' : '30px'">
                    <img [src]="messageTypeLogoPath" alt="">
                    <button class="bud-circular-btn" [style.top]="messageType == 5 ? '-11px' : '-46px'" (click)="closeModal()">
                        <i class='bx bx-x'></i>
                    </button>
                </div>
                <div class="et-message" [style.margin-bottom]="messageType == 5 ? '28px' : '10px'">
                    {{message}}
                </div>
                <div class="confirm-box-buttons" *ngIf="messageType == 5">
                    <button type="submit" class="confirm-box-btn cancel-btn" (click)="onConfirmBoxBtnClick(false)">
                        Cancel
                    </button>
                    <button type="submit" class="confirm-box-btn confirm-btn" (click)="onConfirmBoxBtnClick(true)">
                        Proceed
                    </button>
                </div>
            </div>
        </div>
    `
})

export class MessageBoxComponent {
    public isVisible = false;
    public messageList: Array<string> = [];
    public message: string = "";
    public messageType: MessageType;
    public customMessageType: string = "";
    public messageTypeLogoPath: string = "";
    @Output() onConfirmBoxButtonClick: EventEmitter<any> = new EventEmitter<any>(); 

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

    public closeModal(event?: Event) {
        let self = this;
        if (event) 
            event.stopPropagation(); // Prevent closing on modal content click
        self.isVisible = false;
    }

    public showMessage(messageContent: string = "", messageType: MessageType): any {
        this.message = messageContent;
        this.messageType = messageType;
        this.messageTypeLogoPath = "assets/images/" + this.getMessageTypeName(messageType).toLowerCase().trimStart() + ".png"; 
        this.isVisible = true;
    }

    public getMessageTypeName(messageType: MessageType, customMessageType: string = ""): string {
        switch(messageType){
            case 1:
                return " Success";
            case 2:
                return " Error";
            case 3:
                return " Warning";
            case 4:
                return " Info";
            case 5:
                return " Warning";
            default:
                return customMessageType.toLowerCase();
        }
    }

    public onConfirmBoxBtnClick(confirmed: boolean) {
        if(!confirmed)
            this.closeModal();
        this.onConfirmBoxButtonClick.emit(confirmed);
    }
}

export enum MessageType {
    success = 1,
    error = 2,
    warning = 3,
    info = 4,
    confirm = 5
}