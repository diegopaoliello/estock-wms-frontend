import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemVendaListaComponent } from './item-venda-lista.component';

describe('ItemVendaListaComponent', () => {
  let component: ItemVendaListaComponent;
  let fixture: ComponentFixture<ItemVendaListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemVendaListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemVendaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
