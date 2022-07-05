/* eslint-disable no-console */

import { Component, Directive, Input, OnInit } from '@angular/core';
import { data } from './jsonfiles/data';
import { schema } from './jsonfiles/schema';
@Component({
    selector: 'boolInput',
    template: `
                <nb-checkbox (checkedChange)="toggle($event)" [checked]='this.checked'>
                </nb-checkbox>
`,
    styleUrls: ['./app.component.scss']
})
export class BooleanInputComponent implements OnInit {
    @Input() route! : String;
    checked = false;
    toggle(checked: boolean) {
        this.checked = checked;
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
    constructor() {

    }
    ngOnInit(): void {
        // @ts-ignore   
        this.checked = this.getData();
        // console.log(this.route);
    }
    title = 'jsonTalkSoft';
}
