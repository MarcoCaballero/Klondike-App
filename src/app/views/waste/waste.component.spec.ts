import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Waste } from 'app/model/waste';
import { TESTING_MODULE_METADATA } from '../app.testing.module';
import { WasteComponent } from './waste.component';


describe('WasteComponent', () => {
  let fixture: ComponentFixture<WasteComponent>;
  let wasteSut: WasteComponent;
  let wasteDomSut: any;

  beforeEach(() => {
    TestBed.configureTestingModule(TESTING_MODULE_METADATA).compileComponents();
    fixture = TestBed.createComponent(WasteComponent);
    wasteSut = fixture.componentInstance;
    wasteSut.waste = new Waste();
    wasteDomSut = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(wasteSut).toBeTruthy();
  });
});
