import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoqueEntradaFormComponent } from './estoque-entrada-form.component';

describe('EstoqueEntradaFormComponent', () => {
  let component: EstoqueEntradaFormComponent;
  let fixture: ComponentFixture<EstoqueEntradaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstoqueEntradaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstoqueEntradaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
