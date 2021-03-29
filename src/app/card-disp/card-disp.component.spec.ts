import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDispComponent } from './card-disp.component';

describe('CardDispComponent', () => {
  let component: CardDispComponent;
  let fixture: ComponentFixture<CardDispComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardDispComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDispComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
