import {
  Component,
  Input,
} from '@angular/core';
import {_VRViewBase, Player} from "../vrview-base";

declare let VRView: any;

@Component({
  selector: 'vrview-image',
  templateUrl: './vrview-image.component.html',
  styleUrls: ['./vrview-image.component.css']
})
export class VRViewImageComponent extends _VRViewBase {

  /**
   * URL to a preview image for a 360° image file.
   */
  @Input() previewSrc?: string;

  constructor() {
    super();
  }

  protected initPlayer(): Player {
    const config = this.configBase;
    config.image = this.src;

    if (this.previewSrc) {
      config.preview = this.previewSrc;
    }

    return new VRView.Player(`#${this.viewerElement.nativeElement.id}`, config);
  }

}
