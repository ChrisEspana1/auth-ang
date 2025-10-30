import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasEventComponent } from './noticias-event.component';

describe('NoticiasEventComponent', () => {
  let component: NoticiasEventComponent;
  let fixture: ComponentFixture<NoticiasEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticiasEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticiasEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
