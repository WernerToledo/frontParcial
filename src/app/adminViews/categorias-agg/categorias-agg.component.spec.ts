import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasAggComponent } from './categorias-agg.component';

describe('CategoriasAggComponent', () => {
  let component: CategoriasAggComponent;
  let fixture: ComponentFixture<CategoriasAggComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriasAggComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriasAggComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
