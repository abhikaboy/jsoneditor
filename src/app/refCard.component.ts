/* eslint-disable no-console */

import { Component, Directive, Input, OnInit } from '@angular/core';
import { schema } from './jsonfiles/schema';
@Component({
  selector: 'ref',
  template:`
    {{ref}}
  `,
  styleUrls: ['./app.component.scss']
})
export class RefComponent implements OnInit{
    @Input() ref!: string; 
    constructor(){
    }
    ngOnInit(): void {
        const path:string[] = this.ref.split("/");
        const definitionName:string | undefined = path.pop();
        const def = schema.definitions[definitionName as keyof typeof schema.definitions];
        // console.log(definitionName)
        // console.log(def);
    }
    title = 'jsonTalkSoft';
}
