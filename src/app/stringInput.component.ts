/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment

import { Component, Directive, Input, OnInit } from '@angular/core';
import { data } from './jsonfiles/data';
import { schema } from './jsonfiles/schema';
@Component({
    selector: 'stringInput',
    template: `
        <div *ngIf="!hasEnum; else dropdown">    
            <input nbInput [value]="getData()" />
        </div>
        <ng-template #dropdown>
            <dropdown [options]="options" [selectedItem]="getData()" route={{this.route}}></dropdown>
        </ng-template>
`,
    styleUrls: ['./app.component.scss']
})
export class StringInputComponent implements OnInit {
    @Input() route! : String;
    @Input() prop : any;
    @Input() props : any;
    hasEnum = false;
    options = [];
    constructor() {
    }
    getData() {
            const routes = this.route.split("."); // establishes levels of nesting 
            let currentLocation = data;
            for(const route of routes){ 
                // ['actionsStep[0][0]', 'actionType']
                currentLocation = this.dig(route, currentLocation); 
            }
            return currentLocation;
    }
    dig(route : string, input:any){
        // property
        if(!route.includes("["))
        { 
            try{
                return input[route];
            } catch(e){
                return "route does not exist"
            }
        }
        // array digging 
        const level1 = route.split("[");
        const routeRoot = level1[0];
        const level2 = level1.slice(1);
        const indicies = level2.map((index) => parseFloat(index.split("]")[0]));
        let search = input[routeRoot];
        for(const index of indicies){
            search = search[index];
        }
        return search;
    }
    ngOnInit(): void {
        // console.log(this.props[this.prop]);
        console.log(this.route)
        this.hasEnum = this.props[this.prop].hasOwnProperty("enum");
        if(this.hasEnum){
            this.options = this.props[this.prop].enum;
        }
    }
    title = 'jsonTalkSoft';
}