import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoqueSaidaListaComponent } from './estoque-saida-lista.component';

describe('EstoqueSaidaListaComponent', () => {
  let component: EstoqueSaidaListaComponent;
  let fixture: ComponentFixture<EstoqueSaidaListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EstoqueSaidaListaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstoqueSaidaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
