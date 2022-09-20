import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild} from "@angular/core";
import {BooleanInput, coerceBooleanProperty, coerceNumberProperty, NumberInput} from "@angular/cdk/coercion";

let id = 0;

export type Player = any;

@Directive()
export abstract class _VRViewBase implements AfterViewInit, OnDestroy {

  /**
   * Unique id to assign VRPlayer iframe.
   */
  @Input() id = `vrview-${id++}`;

  /**
   * URL to a 360° image file.
   * OR
   * URL to a 360° video file or an adaptive streaming manifest file (.mpd or .m3u8).
   */
  @Input() src!: string;

  /**
   * String value for the iframe's width attribute.
   * Has no effect if used within an iframe.
   */
  @Input() width!: string;

  /**
   * String value for the iframe's height attribute.
   * Has no effect if used within an iframe.
   */
  @Input() height!: string;

  /**
   * Indicates whether the content at the image or video URL is stereo.
   */
  @Input()
  get stereo(): boolean {
    return this._stereo;
  }
  set stereo(value: BooleanInput) {
    this._stereo = coerceBooleanProperty(value);
  }
  private _stereo = false;

  /**
   * When true, turns on debug features like rendering hotspots ad showing the FPS meter.
   */
  @Input()
  get debug(): boolean {
    return this._debug;
  }
  set debug(value: BooleanInput) {
    this._debug = coerceBooleanProperty(value);
  }
  private _debug = false;

  /**
   * When true, disables the VR mode button.
   */
  @Input()
  get vrOff(): boolean {
    return this._vrOff;
  }
  set vrOff(value: BooleanInput) {
    this._vrOff = coerceBooleanProperty(value);
  }
  private _vrOff = false;

  /**
   * When true, disables the autopan introduction on desktop.
   */
  @Input()
  get autoPanOff(): boolean {
    return this._autoPanOff
  }
  set autoPanOff(value: BooleanInput) {
    this._autoPanOff = coerceBooleanProperty(value);
  }
  private _autoPanOff = false;

  /**
   * Numeric angle in degrees of the initial heading for the 360° content.
   * By default, the camera points at the center of the underlying image.
   */
  @Input()
  get defaultYaw(): number | undefined {
    return this._defaultYaw
  }
  set defaultYaw(value: NumberInput) {
    this._defaultYaw = coerceNumberProperty(value);
  }
  private _defaultYaw?: number;

  /**
   * When true, prevents roll and pitch. This is intended for stereo panoramas.
   */
  @Input()
  get yawOnly(): boolean {
    return this._yawOnly;
  }
  set yawOnly(value: BooleanInput) {
    this._yawOnly = coerceBooleanProperty(value);
  }
  private _yawOnly = false;

  @Output() load = new EventEmitter<Event>();
  @Output() ready = new EventEmitter();
  @Output() error = new EventEmitter<any>();
  @Output() click = new EventEmitter<{id?: number}>();
  @Output() modeChange = new EventEmitter<any>();

  @ViewChild('viewer') viewerElement!: ElementRef<HTMLElement>;

  scriptLoaded = false;
  viewInitialized = false;
  playerInitialized = false;

  vrView: Player | null = null;

  protected get configBase() {
    const config: any = {
      width: this.width,
      height: this.height,
      is_stereo: this.stereo,
      is_debug: this.debug,
      is_vr_off: this.vrOff,
      is_autopan_off: this.autoPanOff,
      is_yaw_only: this.yawOnly
    }

    if (this.defaultYaw) {
      config.default_yaw = this.defaultYaw;
    }

    return config;
  }

  protected constructor() {
    this.addVRViewScript();
  }

  ngAfterViewInit() {
    this.viewInitialized = true;
    this._initPlayer();
  }

  ngOnDestroy() {
    if (this.vrView) {
      this.vrView.removeAllListeners();
    }
  }

  private addVRViewScript() {
    const vrViewScript = document.createElement('script');
    vrViewScript.setAttribute('src', 'https://storage.googleapis.com/vrview/2.0/build/vrview.min.js')
    vrViewScript.addEventListener('load', (event) => {
      this.scriptLoaded = true;
      this.load.emit(event);
      this._initPlayer();
    });
    document.body.appendChild(vrViewScript);
  }

  private _initPlayer() {
    if (!this.scriptLoaded || !this.viewInitialized || this.playerInitialized) {
      return;
    }
    this.vrView = this.initPlayer();
    this.initEventListeners();
  }

  protected abstract initPlayer(): Player;

  protected initEventListeners(): void {
    this.vrView.on('ready', () => this.ready.emit());
    this.vrView.on('error', (event: any) => this.error.emit(event));
    this.vrView.on('click', (event: { id?: number }) => this.click.emit(event));
    this.vrView.on('modechange', (event: any) => this.modeChange.emit(event));
  }
}
