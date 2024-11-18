import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpcenterSupportRequestComponent } from './helpcenter-support-request.component';

describe('HelpcenterSupportRequestComponent', () => {
  let component: HelpcenterSupportRequestComponent;
  let fixture: ComponentFixture<HelpcenterSupportRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpcenterSupportRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelpcenterSupportRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
