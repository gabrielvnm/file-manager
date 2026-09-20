import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArquivoDetalheComponent } from './arquivo-detalhe.component';

describe('ArquivoDetalheComponent', () => {
  let component: ArquivoDetalheComponent;
  let fixture: ComponentFixture<ArquivoDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArquivoDetalheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArquivoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
