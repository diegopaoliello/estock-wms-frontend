import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoqueSaidaFormComponent } from './estoque-saida-form.component';

describe('EstoqueSaidaFormComponent', () => {
  let component: EstoqueSaidaFormComponent;
  let fixture: ComponentFixture<EstoqueSaidaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstoqueSaidaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstoqueSaidaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
