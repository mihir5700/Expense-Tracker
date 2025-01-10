import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelperService } from '../../services/helper.service';
import { ModalComponent } from '../../components/helpercomponents/modal/modal.component';
import { MessageBoxComponent } from '../../components/helpercomponents/messagebox/messagebox.component';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@NgModule({
  declarations: [
    ModalComponent,
    MessageBoxComponent,
    TruncatePipe
  ],
  exports: [
    ModalComponent,
    MessageBoxComponent,
    TruncatePipe
  ],
  imports: [
    CommonModule
  ],
  bootstrap: [],
  providers: [HelperService]
})

export class HelperComponentsModule { }
