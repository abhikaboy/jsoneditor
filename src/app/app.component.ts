import { Component } from '@angular/core';
import { data } from './jsonfiles/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  logData = () => {
    console.log(data);
  }
  title = 'jsonTalkSoft';
}
