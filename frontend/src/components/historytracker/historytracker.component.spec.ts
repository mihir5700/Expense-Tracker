import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorytrackerComponent } from './historytracker.component';

describe('HistorytrackerComponent', () => {
  let component: HistorytrackerComponent;
  let fixture: ComponentFixture<HistorytrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistorytrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorytrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
