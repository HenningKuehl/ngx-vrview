import { Component, OnInit } from '@angular/core';
import {_VRViewBase, Player} from "../vrview-base";

declare let VRView: any;

@Component({
  selector: 'vrview-video',
  templateUrl: './vrview-video.component.html',
  styleUrls: ['./vrview-video.component.css']
})
export class VRViewVideoComponent extends _VRViewBase implements OnInit {
  private _volume = 1;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  protected initPlayer(): Player {
    const config = this.configBase;
    config.video = this.src;

    return new VRView.Player(`#${this.viewerElement.nativeElement.id}`, config);
  }

  /**
   * Calling play() resumes the video.
   */
  public play(): void {
    if (!this.vrView) {
      return;
    }
    this.vrView.play();
  }

  /**
   * Calling pause() pauses the video.
   */
  public pause(): void {
    if (!this.vrView) {
      return;
    }
    this.vrView.pause();
  }

  /**
   * Calling setVolume() sets the volume to the given fraction of the max volume.
   * Set fractionVol to any value in range [0, 1].
   * For example, setVolume(0.5).
   */
  public setVolume(value: number): void {
    if (value < 0 || value > 1) {
      throw new Error('Volume must between 0 and 1. For example 0.5');
    }
    if (!this.vrView) {
      return;
    }
    this._volume = value;
    this.vrView.setVolume(value);
  }

  /**
   * Mutes the volume of the video.
   */
  public mute(): void {
    this.setVolume(0);
  }

  /**
   * Reset the volume of the video.
   */
  public unmute(): void {
    this.setVolume(this._volume);
  }

}
