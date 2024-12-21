import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivetrackerComponent } from './activetracker.component';

describe('ActivetrackerComponent', () => {
  let component: ActivetrackerComponent;
  let fixture: ComponentFixture<ActivetrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivetrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivetrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
