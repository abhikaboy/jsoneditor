/* eslint-disable no-console */

import { Component, Directive, Input, OnInit } from '@angular/core';
import { schema } from './jsonfiles/schema';
@Component({
  selector: 'ref',
  template:`
    <h5>{{definitionName}} definition </h5>
      <prop [props]=propKeys> 
      </prop> 
  `,
  styleUrls: ['./app.component.scss']
})
export class RefComponent implements OnInit{
    @Input() ref!: string; 
    propKeys : string[] = [];
    definitionName: string | undefined;
    constructor(){
      this.definitionName = '';
    }
    getProperty(propKeys : any, prop:string){
      console.log(propKeys)
      return propKeys[prop as  keyof typeof propKeys];
    }
    ngOnInit(): void {
        const path:string[] = this.ref.split("/");
        this.definitionName = path.pop();
        const def = schema.definitions[this.definitionName as keyof typeof schema.definitions];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        for(const prop in def.properties){
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.propKeys.push({...def.properties[prop], name: prop})
        }
        // console.log(this.propKeys);
        // console.log(def);
    }
    title = 'jsonTalkSoft';
}
