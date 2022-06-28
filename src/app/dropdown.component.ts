/* eslint-disable no-console */

import { Component, Directive, OnInit, Input } from '@angular/core';
@Component({
  selector: 'dropdown',
  template:`
`,
  styleUrls: ['./app.component.scss']
})
export class DropdownComponent implements OnInit{
    @Input() props!: Object; 
    options: string[] = [];
    
    constructor(){
    }
    ngOnInit(): void {
    }
    title = 'jsonTalkSoft';
}
