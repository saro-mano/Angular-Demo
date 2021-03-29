import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDispComponent } from './movie-disp.component';

describe('MovieDispComponent', () => {
  let component: MovieDispComponent;
  let fixture: ComponentFixture<MovieDispComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieDispComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDispComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
