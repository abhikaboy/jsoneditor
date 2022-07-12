/* eslint-disable no-console */

import { Component, Directive, OnInit } from '@angular/core';
import { data } from './jsonfiles/data2';
import { schema } from './jsonfiles/schema2';
@Component({
    selector: 'review',
    template: `
        <div style="width:50vw;backgroundColor:white;padding:4vw;borderRadius:10px;overflow:scroll;marginTop:10vh;height:100%">
            <h2 style="textAlign:center">Review Json</h2>
            <ngx-json-viewer style="overflow:scroll;height:100%"[json]="getData()" [expanded]="false"></ngx-json-viewer>
            <button nbButton style="width:100%" status="success" (click)="logData()">Save</button>
        <div>

`,
    styleUrls: ['./app.component.scss']
})
export class ReviewCardComponent implements OnInit {
      logData = () => {
    console.log(data);
  }
  getData(){
    console.log("data getting");
    return data;
  }
    ngOnInit(): void {
        // console.log(this.data);
    }
    title = 'jsonTalkSoft';
}
