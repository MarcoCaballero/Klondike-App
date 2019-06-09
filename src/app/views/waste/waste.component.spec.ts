import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Waste } from 'src/app/model/waste';
import { TESTING_MODULE_METADATA } from '../app.testing.module';
import { WasteComponent } from './waste.component';


describe('WasteComponent', () => {
  let fixture: ComponentFixture<WasteComponent>;
  let waste_SUT: WasteComponent;
  let waste_DOM_SUT: any;

  beforeEach(() => {
    TestBed.configureTestingModule(TESTING_MODULE_METADATA).compileComponents();
    fixture = TestBed.createComponent(WasteComponent);
    waste_SUT = fixture.componentInstance;
    waste_SUT.waste = new Waste();
    waste_DOM_SUT = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(waste_SUT).toBeTruthy();
  });
});
