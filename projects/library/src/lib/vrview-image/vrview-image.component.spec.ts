import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VRViewImageComponent } from './vrview-image.component';

describe('VrviewImageComponent', () => {
  let component: VRViewImageComponent;
  let fixture: ComponentFixture<VRViewImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VRViewImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VRViewImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
