import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadeMedidaListaComponent } from './unidade-medida-lista.component';

describe('UnidadeMedidaListaComponent', () => {
  let component: UnidadeMedidaListaComponent;
  let fixture: ComponentFixture<UnidadeMedidaListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadeMedidaListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadeMedidaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
