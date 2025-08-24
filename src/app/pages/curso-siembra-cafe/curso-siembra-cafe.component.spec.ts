import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoSiembraCafeComponent } from './curso-siembra-cafe.component';

describe('CursoSiembraCafeComponent', () => {
  let component: CursoSiembraCafeComponent;
  let fixture: ComponentFixture<CursoSiembraCafeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CursoSiembraCafeComponent]
    });
    fixture = TestBed.createComponent(CursoSiembraCafeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
