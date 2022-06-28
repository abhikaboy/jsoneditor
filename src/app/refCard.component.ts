/* eslint-disable no-console */

import { Component, Directive, Input, OnInit } from '@angular/core';
import { schema } from './jsonfiles/schema';
@Component({
  selector: 'ref',
  template:`
    <h5 class = "spacing" id= "inline">{{definitionName}}</h5>
      <div *ngIf='isOneOf' id= "inline">
        <nb-radio-group [(ngModel)]="this.oneOfType"  class="smallIndent" id= "inline">
          <nb-radio *ngFor="let oneOf of def.oneOf | keyvalue" [value]="oneOf.key" id="inline">{{oneOf.key}}</nb-radio>
        </nb-radio-group>
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
    def : any;
    constructor(){
      this.definitionName = '';
    }
    getOneOfProps(){
      console.log()
    }
    getOneOf(){
      const ret: any[] = [];
      // console.log(def);
      if(!this.def.hasOwnProperty('oneOf')) return {};
      // @ts-ignore
      // if(def.oneOf)
      console.log(this.def.oneOf);

        // @ts-ignore
        const props = this.def.oneOf[this.oneOfType].properties;
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
        this.def = schema.definitions[this.definitionName as keyof typeof schema.definitions];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        for(const prop in this.def.properties){
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.propKeys.push({...this.def.properties[prop], name: prop})
        }
        // console.log(this.propKeys);
        this.isOneOf = this.def.hasOwnProperty("oneOf");
        // console.log(`${this.isOneOf} ${this.definitionName}`); 
    }
    title = 'jsonTalkSoft';
}
