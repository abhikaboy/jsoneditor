/* eslint-disable no-console */

import { Component, Directive, OnInit } from '@angular/core';
import { dataJSON } from './jsonfiles/data2';
import { schema } from './jsonfiles/schema2';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'review',
  template: `
        <div style="width:50vw;backgroundColor:white;padding:4vw;borderRadius:10px;overflow:scroll;marginTop:10vh;height:100%">
            <h2 style="textAlign:center">Review Json</h2>
            <ngx-json-viewer style="overflow:scroll;height:100%"[json]="getData()" [expanded]="false"></ngx-json-viewer>
            <button nbButton style="width:100%" status="success" (click)="save()">Save</button>
        <div>

`,
  styleUrls: ['./app.component.scss']
})
export class ReviewCardComponent implements OnInit {
  constructor(private clipboard: Clipboard) {}
  copyText(text) {
    const pending = this.clipboard.beginCopy(text);
    let remainingAttempts = 3;
    const attempt = () => {
      const result = pending.copy();
      if (!result && --remainingAttempts) {
        setTimeout(attempt);
      } else {
        pending.destroy();
      }
    };
    attempt();
  }
  save = () => {
    const readable = JSON.stringify(dataJSON);
    this.copyText(readable);
    console.log(readable);
  }
  getData() {
    // console.log(dataJSON);
    return dataJSON.data;
  }
  ngOnInit(): void {
  }
  title = 'jsonTalkSoft';
}
