import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VRViewVideoComponent } from './vrview-video.component';

describe('VrviewVideoComponent', () => {
  let component: VRViewVideoComponent;
  let fixture: ComponentFixture<VRViewVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VRViewVideoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VRViewVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
