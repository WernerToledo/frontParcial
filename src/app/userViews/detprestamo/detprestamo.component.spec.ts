import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetprestamoComponent } from './detprestamo.component';

describe('DetprestamoComponent', () => {
  let component: DetprestamoComponent;
  let fixture: ComponentFixture<DetprestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetprestamoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetprestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
