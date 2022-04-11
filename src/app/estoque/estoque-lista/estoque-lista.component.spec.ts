import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoqueListaComponent } from './estoque-lista.component';

describe('EstoqueListaComponent', () => {
  let component: EstoqueListaComponent;
  let fixture: ComponentFixture<EstoqueListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstoqueListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstoqueListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
