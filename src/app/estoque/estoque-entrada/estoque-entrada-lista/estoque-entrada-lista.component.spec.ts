import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoqueEntradaListaComponent } from './estoque-entrada-lista.component';

describe('EstoqueEntradaListaComponent', () => {
  let component: EstoqueEntradaListaComponent;
  let fixture: ComponentFixture<EstoqueEntradaListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstoqueEntradaListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstoqueEntradaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
