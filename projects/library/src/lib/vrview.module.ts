import { NgModule } from '@angular/core';
import { VRViewImageComponent } from './vrview-image/vrview-image.component';
import { VRViewVideoComponent } from './vrview-video/vrview-video.component';



@NgModule({
  declarations: [
    VRViewImageComponent,
    VRViewVideoComponent
  ],
  imports: [
  ],
  exports: [
    VRViewImageComponent,
    VRViewVideoComponent
  ]
})
export class VRViewModule { }
