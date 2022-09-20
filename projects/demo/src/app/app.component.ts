import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  debug = true;

  logEvent(type: string, event: any) {
    console.log('vr view event', type, event);
  }

}
