import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelperService } from '../../services/helper.service';
import { ModalComponent } from '../../components/helpercomponents/modal/modal.component';
import { MessageBoxComponent } from '../../components/helpercomponents/messagebox/messagebox.component';

@NgModule({
  declarations: [
    ModalComponent,
    MessageBoxComponent
  ],
  exports: [
    ModalComponent,
    MessageBoxComponent
  ],
  imports: [
    CommonModule
  ],
  bootstrap: [],
  providers: [HelperService]
})

export class HelperComponentsModule { }
