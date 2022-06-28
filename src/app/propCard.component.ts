/* eslint-disable no-console */

import { Component, Directive, Input, OnInit } from '@angular/core';
import { schema } from './jsonfiles/schema';
@Component({
  selector: 'prop',
  template:`
    <div *ngFor="let prop of propKeys" class="indent">
    <p>{{getPropertyName(prop, props)}} </p>
        <div [ngSwitch]='getPropertyType(prop, props)'>
            <div *ngSwitchCase="'array'">
                <!-- hi im an array -->
                {{getPropertyName(prop, props)}} is array
                <div ngif='hasItems(prop,props)'>
                    <ref [ref]='getRef(prop,props)'></ref>
                </div>

            </div>
            <div *ngSwitchCase="'string'" style="display:inline">
                <input nbInput/>
            </div>
            
        </div>
</div>
`,
  styleUrls: ['./app.component.scss']
})
export class PropComponent implements OnInit{
    @Input() props!: Object; 
    propKeys : string[] = [];
    constructor(){
    
    }
    getPropertyType(prop: string, object: any): string{
        // console.log(object[prop as keyof typeof object]);
        return object[prop as keyof typeof object].type;
    }
    getPropertyName(prop: string, object: any): string{
        // console.log(object[prop as keyof typeof object]);
        return object[prop as keyof typeof object].name;
    }
    hasItems(prop: string, object: any): boolean{
        // console.log(object[prop as keyof typeof object]);
        return object[prop as keyof typeof object].hasOwnProperty('items');
    }
    getRef(prop: string, object: any): string{
        return object[prop as keyof typeof object].items.$ref;
    }
    ngOnInit(): void {
        // console.log(this.props);
        for(const prop in this.props){
            this.propKeys.push(prop);
        }
        // console.log(definitionName)
        // console.log(def);
    }
    title = 'jsonTalkSoft';
}
