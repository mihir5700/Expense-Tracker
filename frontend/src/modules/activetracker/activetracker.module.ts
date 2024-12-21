import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveTrackerComponent } from '../../components/activetracker/activetracker.component';



@NgModule({
  declarations: [
    ActiveTrackerComponent
  ],
  exports: [
    ActiveTrackerComponent
  ],
  imports: [
    CommonModule
  ],
  bootstrap: [ActiveTrackerComponent]
})
export class ActiveTrackerModule { }
