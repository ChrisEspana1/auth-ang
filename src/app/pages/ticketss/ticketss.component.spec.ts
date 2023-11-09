import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketssComponent } from './ticketss.component';

describe('TicketssComponent', () => {
  let component: TicketssComponent;
  let fixture: ComponentFixture<TicketssComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicketssComponent]
    });
    fixture = TestBed.createComponent(TicketssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
