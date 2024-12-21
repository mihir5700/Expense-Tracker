import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryTrackerComponent } from '../../components/historytracker/historytracker.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    HistoryTrackerComponent
  ],
  exports: [
    HistoryTrackerComponent
  ],
  imports: [
    CommonModule
  ],
  bootstrap: [HistoryTrackerComponent],
  providers: [provideHttpClient()]
})

export class HistoryTrackerModule { }
