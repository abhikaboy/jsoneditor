/* eslint-disable no-console */

import { Component, Directive, Input, OnInit } from '@angular/core';
import { schema } from './jsonfiles/schema';
@Component({
  selector: 'ref',
  template:`
    <h5 class = "spacing">{{definitionName}}</h5>
      <div *ngIf='isOneOf'>
          <prop [props]=getOneOf()>
          </prop>
      </div>
      <prop [props]=propKeys #normalProp> 
      </prop> 
  `,
  styleUrls: ['./app.component.scss']
})
export class RefComponent implements OnInit{
    @Input() ref!: string; 
    propKeys : string[] = [];
    definitionName: string | undefined;
    isOneOf: boolean = false;
    oneOfType: number = 0;
    constructor(){
      this.definitionName = '';
    }
    getOneOf(){
      const ret: any[] = [];
      const def = schema.definitions[this.definitionName as keyof typeof schema.definitions];
      // console.log(def);
      if(!def.hasOwnProperty('oneOf')) return {};
      // console.log(this.oneOfType);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const props = def.oneOf[this.oneOfType].properties;
        for (const prop in props){
          ret.push({...props[prop], name: prop});
        }
      return ret;
    }
    getProperty(propKeys : any, prop:string){
      // console.log(propKeys)
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
        this.isOneOf = def.hasOwnProperty("oneOf");
        // console.log(`${this.isOneOf} ${this.definitionName}`); 
    }
    title = 'jsonTalkSoft';
}
