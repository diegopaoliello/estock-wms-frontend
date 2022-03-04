import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPedidoFormComponent } from './item-pedido-form.component';

describe('ItemPedidoFormComponent', () => {
  let component: ItemPedidoFormComponent;
  let fixture: ComponentFixture<ItemPedidoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemPedidoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPedidoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
