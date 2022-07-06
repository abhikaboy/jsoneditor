/* eslint-disable no-console */

import { ConvertPropertyBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, Directive, Input, OnInit } from '@angular/core';
import { NbChatOptions } from '@nebular/theme';
import { schema } from './jsonfiles/schema';
import { DropdownComponent } from './dropdown.component';
@Component({
    selector: 'prop',
    template: `
    <div *ngIf="propKeys.length == 0">
        <!-- This is a reference array -->
            <div *ngIf='isArray()'>
            <arrayInput name="list" [ref]='this.ref' route={{this.parents}} [prop]='' [props]='props' index={{index}}>
            </arrayInput>
        </div>
    </div>
    <div *ngFor="let prop of propKeys">
        <div *ngIf='hasParents()'>
        <div  class="spacing" [ngSwitch]='getPropertyType(prop, props)' id="inline" style="display:inline">
            <div *ngSwitchCase="'array'">
                    <arrayInput [name] ='getPropertyName(prop, props)' route={{this.parents}} [prop]='prop' [props]='props' index={{index}}>
                    </arrayInput>
            </div>
            <div *ngSwitchCase="'string'" style="display:inline" id="inline">
                    <p id="inline">{{getPropertyName(prop, props)}}: </p>
                    <stringInput route={{getPath(prop)}} [prop]='getPropfromKeys(prop,propKeys)' [prop] = 'prop' [props] = 'props'>
                    </stringInput>
            </div>
            <div *ngSwitchCase="'boolean'" style="display:inline"> 
                    <p id="inline">{{getPropertyName(prop, props)}}: </p>
                    <boolInput route={{getPath(prop)}}>
                    </boolInput>
            </div>
</div>
        </div>
    </div>
`,
    styleUrls: ['./app.component.scss']
})
/* 
  Needs to know position in array
  Needs to know object position in tree
*/ 
export class PropComponent implements OnInit {
    @Input() props!: Object;
    @Input() parents!: String;
    @Input() index: number | undefined | string;
    @Input() ref: string | undefined;
    @Input() type: string | undefined;
    propKeys: string[] = [];
    oneOf: {} = {};
    options: string[] = [];
    
    getPropfromKeys(prop:any, props:any){
        return props[prop];
    }
    getPathArray(){
        return this.parents;
    }
    getPath(prop : any) {
        // console.log(this.getPropertyType(prop,this.props));
        let propName =  this.getPropertyName(prop, this.props);
        if(propName == undefined){
            propName='';
        } else {
            propName = "." +propName
        }
        if(this.getPropertyType(prop,this.props) == 'array') return this.parents + propName+`[${this.index}]`;
        else return this.parents + propName;
    }
    hasParents():boolean{
    //   console.log("from parents: " + this.parents);
      return this.parents != undefined;
    }
    isArray():boolean{
        if(this.type == undefined) return false;
        return this.type == "array" || this.hasParents();
    }

    constructor() {
        this.index = 0;
        // console.log(this.parents);
        // console.log(this.parents);
    }
    toNum(input : string): number{
        return parseFloat(input);
    }
    getPropertyType(prop: string, object: any): string {
        // console.log(object[prop as keyof typeof object]);
        return object[prop as keyof typeof object].type;
    }
    getPropertyName(prop: string, object: any): string {
        // console.log(object[prop as keyof typeof object]);
        if(object[prop as keyof typeof object].hasOwnProperty("name")) return object[prop as keyof typeof object].name;
        else {
            return prop;
        };
    }
    getPropertyLength(prop: string, object: any){

    }
    hasItems(prop: string, object: any): boolean {
        // console.log(object[prop as keyof typeof object].hasOwnProperty('items'));
        return object[prop as keyof typeof object].hasOwnProperty('items');
    }
    getRef(prop: string, object: any): string {
        return object[prop as keyof typeof object].items.$ref;
    }
    ngOnInit(): void {
        for (const prop in this.props) {
            this.propKeys.push(prop);
        }
    }
    title = 'jsonTalkSoft';
}
