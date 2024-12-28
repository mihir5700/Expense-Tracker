import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { HelperService } from '../../../services/helper.service';

@Component({
    selector: 'et-messagebox',
    template: `
        <div class="et-msg-modal-container" 
             [ngClass]="{'msg-success': messageType == 1, 'msg-danger': messageType == 2 }" 
             [hidden]="!isVisible" 
             (click)="closeModal($event)">
             <div class="et-msg-modal-content" (click)="$event.stopPropagation()">
                <div class="et-msg-header">
                    <img [src]="messageTypeLogoPath" alt="">
                    <button class="bud-circular-btn" (click)="closeModal()">
                        <i class='bx bx-x'></i>
                    </button>
                </div>
                <div class="et-message">
                    {{message}}
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

    // public showMessage(messages: Array<string> = [], messageType: MessageType): any;

    // public showMessage(message: string = "", messageType: MessageType): any;

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
            default:
                return customMessageType.toLowerCase();
        }
    }
}

export enum MessageType {
    success = 1,
    error = 2,
    warning = 3,
    info = 4
}