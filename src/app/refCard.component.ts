/* eslint-disable no-console */

import { Component, Directive, Input, OnInit } from '@angular/core';
import { schema } from './jsonfiles/schema';

@Component({
  selector: 'ref',
  template:`
    <!-- <nb-accordion>
 <nb-accordion-item>
      <nb-accordion-item-header> -->
        <h5 class = "spacing" id= "inline">{{definitionName + " " +indexLabel}}</h5>
  <!-- </nb-accordion-item-header>
  <nb-accordion-item-body> -->
      <div *ngIf='hasParents()'>
        <div *ngIf='isOneOf' id= "inline">
              <nb-radio-group [(ngModel)]="this.oneOfType"  class="smallIndent" id= "inline"> 
                <nb-radio *ngFor="let key of (this.keys)" [value]="key" id="inline">{{this.def.oneOf[key].properties.label}}</nb-radio>
              </nb-radio-group>
              <prop [props]=getOneOf() index={{this.index}}  parents={{getPath()}}>
              </prop>
        </div>
      </div>
      <div *ngIf='hasParents()'>
          <prop [props]=propKeys #normalProp  index={{this.index}} parents={{getPath()}}> 
            </prop> 
      </div>
<!-- </nb-accordion-item-body>
</nb-accordion-item>
  </nb-accordion> -->

  `,
  styleUrls: ['./app.component.scss']
})
/* 
  Needs to know position in array
  Needs to know object position in tree
*/ 
export class RefComponent implements OnInit{
    @Input() ref!: string | undefined; 
    @Input() parents!: string; 
    @Input() index: number | undefined | string;
    @Input() indexLabel: string | number;
    propKeys : string[] = [];
    definitionName: string | undefined;
    isOneOf: boolean = false;
    oneOfType: number = 0;
    def : any;
    keys: string[] = []; 
    constructor(){
      this.definitionName = '';
      this.indexLabel = ''
      // this.index = 0;
    }
    hasParents():boolean{
      // console.log("from parents: " + this.parents);
      return this.parents != undefined;
    }
    getPath() {
      if(this.index != undefined) return this.parents + `[${this.index}]`;
      return this.parents;
    }
    getOneOfProps(){
      // console.log()
    }
    getOneOf(){
      const ret: any[] = [];
      // console.log(def);
      if(!this.def.hasOwnProperty('oneOf')) return {};
      // @ts-ignore
      // if(def.oneOf)
      // console.log(this.def.oneOf);

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
        console.log(this.ref)
        console.log(this.parents)
        // @ts-ignore
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
        this.isOneOf = this.def.hasOwnProperty("oneOf");
        if(this.isOneOf) {this.keys = Object.keys(this.def.oneOf)

        for(let oneOf in Object.keys(this.def.oneOf)){
          console.log(oneOf);
          console.log(this.def.oneOf[oneOf]);
        }
      }
        // console.log(`${this.isOneOf} ${this.definitionName}`); 
    }
    title = 'jsonTalkSoft';
}
