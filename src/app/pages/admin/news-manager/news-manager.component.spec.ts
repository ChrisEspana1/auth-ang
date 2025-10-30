import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsManagerComponent } from './news-manager.component';

describe('NewsManagerComponent', () => {
  let component: NewsManagerComponent;
  let fixture: ComponentFixture<NewsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
