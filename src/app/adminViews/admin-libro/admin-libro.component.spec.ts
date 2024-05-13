import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLibroComponent } from './admin-libro.component';

describe('AdminLibroComponent', () => {
  let component: AdminLibroComponent;
  let fixture: ComponentFixture<AdminLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLibroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
