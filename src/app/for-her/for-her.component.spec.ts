import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForHerComponent } from './for-her.component';

describe('ForHerComponent', () => {
  let component: ForHerComponent;
  let fixture: ComponentFixture<ForHerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForHerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForHerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
