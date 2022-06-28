/* eslint-disable no-console */

import { Component, Directive, Input, OnInit } from '@angular/core';
@Component({
  selector: 'prop',
  template:`
    <ul *ngFor="let prop of propKeys">
    {{prop}}
        <div ngSwitch="props[prop as keyof typeof props].type">
            <li *ngSwitchCase="'array'">
                hi im an array
            </li>
            <li *ngSwitchCase="'string'">
                hi im string
            </li>
        </div>
    </ul>
`,
  styleUrls: ['./app.component.scss']
})
export class PropComponent implements OnInit{
    @Input() props!: Object; 
    propKeys : string[] = [];
    constructor(){
    }
    ngOnInit(): void {
        console.log(this.props);
        for(const prop in this.props){
            this.propKeys.push(prop);
        }
    }
    title = 'jsonTalkSoft';
}
