import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDragDropComponent } from './base-drag-drop.component';

describe('BaseDragDropComponent', () => {
  let component: BaseDragDropComponent;
  let fixture: ComponentFixture<BaseDragDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseDragDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseDragDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
