import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input, OnChanges, OnDestroy,
  OnInit,
  Output, SimpleChanges,
  ViewChild,
} from '@angular/core';

let id = 0;
declare let VRView: any;

@Component({
  selector: 'vrview-image',
  templateUrl: './vrview-image.component.html',
  styleUrls: ['./vrview-image.component.css']
})
export class VRViewImageComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  @Input() src!: string;

  @Input() id = `vrview-${id++}`;
  @Input() height = 400;
  @Input() width = 400;

  @Input() stereo?: boolean;
  @Input() debug?: boolean;
  @Input() vrOff?: boolean;
  @Input() autoPanOff?: boolean;
  @Input() defaultYaw?: number;
  @Input() yawOnly?: boolean;

  @Output() load = new EventEmitter<Event>();
  @Output() ready = new EventEmitter();
  @Output() error = new EventEmitter<any>();
  @Output() click = new EventEmitter<{id?: number}>();
  @Output() modeChange = new EventEmitter<any>();

  @ViewChild('viewer') viewerElement!: ElementRef<HTMLElement>;

  scriptLoaded = false;
  viewInitialized = false;
  playerInitialized = false;

  vrView: any | null = null;

  constructor() {
    this.addVRViewScript();
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.viewInitialized = true;
    this.initPlayer();
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
      this.initPlayer();
    });
    document.body.appendChild(vrViewScript);
  }

  private initPlayer() {
    if (!this.scriptLoaded || !this.viewInitialized || this.playerInitialized) {
      return;
    }

    this.vrView = new VRView.Player(`#${this.viewerElement.nativeElement.id}`, {
      image: this.src,
      width: this.width,
      height: this.height,
      is_debug: this.debug,
    });

    this.vrView.on('ready', () => this.ready.emit());
    this.vrView.on('error', (event: any) => this.error.emit(event));
    this.vrView.on('click', (event: { id?: number }) => this.click.emit(event));
    this.vrView.on('modechange', (event: any) => this.modeChange.emit(event));
  }

}
