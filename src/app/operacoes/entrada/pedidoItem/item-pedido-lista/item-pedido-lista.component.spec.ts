import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPedidoListaComponent } from './item-pedido-lista.component';

describe('ItemPedidoListaComponent', () => {
  let component: ItemPedidoListaComponent;
  let fixture: ComponentFixture<ItemPedidoListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemPedidoListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPedidoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
