/* eslint-disable no-console */

import { ConvertPropertyBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, Directive, Input, OnInit } from '@angular/core';
import { NbChatOptions } from '@nebular/theme';
import { schema } from './jsonfiles/schema2';
import { DropdownComponent } from './dropdown.component';
@Component({
    selector: 'prop',
    template: `
    <div *ngIf="propKeys.length == 0">
        <!-- This is a reference array -->
            <div *ngIf='isArray()'>
            <arrayInput [name]='getNameRef()'  [ref]='this.ref' route={{this.parents}} [prop]='' [props]='props' index={{index}}>
            </arrayInput>
            </div>
            <div *ngIf='isObject()'>
                
            </div>

    </div>
    <div *ngFor="let prop of propKeys">
        <div *ngIf='hasParents()'>
            <div  class="spacing" [ngSwitch]='getPropertyType(prop, props)' id="inline" style="display:inline">
                <div *ngSwitchCase="'array'">
                        <arrayInput [name] ='getPropertyName(prop, props)' [ref]='getArrayRef(prop,props)' route={{this.parents}} [prop]='prop' [props]='props' index={{index}}>
                        </arrayInput>
                </div>
                <div *ngSwitchCase="'string'" style="display:inline" id="inline">
                        <p id="inline">{{getPropertyName(prop, props)}}: </p>
                        <stringInput route={{getPath(prop)}} [prop]='getPropfromKeys(prop,propKeys)' [prop] = 'prop' [props] = 'props'>
                        </stringInput>
                </div>
                <div *ngSwitchCase="'boolean'" style="display:inline"> 
                        <p id="inline">{{getPropertyName(prop, props)}}: </p>
                        <boolInput route={{getPath(prop)}} [props] = 'props'>
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
    @Input() solo: string | undefined;
    propKeys: string[] = [];
    options: string[] = [];
    
    getNameRef(){
        console.log(this.parents.split("/").slice(-1) )
        let [ret] = this.parents.split("/").slice(-1) 
        return ret
    }
    getPropfromKeys(prop:any, props:any){
        return props[prop];
    }
    getPathArray(){
        return this.parents;
    }
    getArrayRef(prop,props){
        const obj = this.getPropfromKeys(prop,props);
        if(obj.hasOwnProperty("items")) return obj.items.$ref;
        else return undefined;
    }
    getPath(prop : any) {
        let propName =  this.getPropertyName(prop, this.props);
        if(propName == undefined){
            propName='';
        } else {
            propName = "." +propName
        }
        if(this.solo=="true"){ console.log(this.parents + " lol");return this.parents}
        if(this.getPropertyType(prop,this.props) == 'array') return this.parents + propName+`[${this.index}]`;
        else return this.parents + propName;
    }
    hasParents():boolean{
      return this.parents != undefined;
    }
    isArray():boolean{
        if(this.type == undefined) return false;
        if(this.type != "array") return false;
        return this.type == "array" || this.hasParents();
    }
    isObject():boolean{
        if(this.type == undefined) return false;
        if(this.type != "object") return false;
        return this.type == "object" || this.hasParents();
    }

    constructor() {
        this.index = 0;
    }
    toNum(input : string): number{
        return parseFloat(input);
    }
    getPropertyType(prop: string, object: any): string {
        return object[prop as keyof typeof object].type;
    }
    getPropertyName(prop: string, object: any): string {
        if(object[prop as keyof typeof object].hasOwnProperty("name")) return object[prop as keyof typeof object].name;
        else {
            return prop;
        };
    }
    getPropertyLength(prop: string, object: any){

    }
    hasItems(prop: string, object: any): boolean {
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
