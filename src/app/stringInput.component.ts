/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment

import { Component, Directive, Input, OnInit } from '@angular/core';
import { data } from './jsonfiles/data2';
import { schema } from './jsonfiles/schema2';
@Component({
    selector: 'stringInput',
    template: `
        <div *ngIf="!hasEnum; else dropdown">    
            <input nbInput [value]="getData()" (input)="this.writeChange($event)" />
        </div>
        <ng-template #dropdown>
            <dropdown [options]="options" [selectedItem]="getData()" route={{this.route}}></dropdown>
        </ng-template>
`,
    styleUrls: ['./app.component.scss']
})
export class StringInputComponent implements OnInit {
    @Input() route!: String;
    @Input() prop: any;
    @Input() props: any;
    input = "";
    hasEnum = false;
    options = [];
    constructor() {
    }
    writeChange(change: any) {
        if (change.data == null) {
            this.input = this.input.substring(0, this.input.length - 1);
        } else {
            this.input += change.data;
        }
        let routes = this.getRouteArray();
        let temp = data;

        for (let i = 0; i < routes.length - 1; i++) {
            if (temp.hasOwnProperty(routes[i])) {
                //@ts-ignore
                temp = temp[routes[i]];
            } else {
                console.log("route does not exist");
            }
        }
        // @ts-ignore
        temp[routes[routes.length - 1]] = this.input;
        console.log(data);
    }
    getRouteArray() {
        const preRoutes = this.route.split(".");
        let routes = [];
        let indSplit = [];
        for (let route in preRoutes) {
            let level = preRoutes[route]
            if (level.includes('[')) {
                indSplit = level.split('[');
                for (let str in indSplit) {
                    indSplit[str] = indSplit[str].replace(']', '');
                    routes.push(indSplit[str]);
                }
            } else {
                routes.push(level);
            }
        }
        return routes;
    }
    getData() {
        const routes = this.route.split("."); // establishes levels of nesting 
        let currentLocation = data;
        for (const route of routes) {
            currentLocation = this.dig(route, currentLocation);
        }
        return currentLocation;
    }
    dig(route: string, input: any) {
        // property
        if (!route.includes("[")) {
            try {
                return input[route];
            } catch (e) {
                return "route does not exist"
            }
        }
        // array digging 
        const level1 = route.split("[");
        const routeRoot = level1[0];
        const level2 = level1.slice(1);
        const indicies = level2.map((index) => parseFloat(index.split("]")[0]));
        let search = input[routeRoot];
        for (const index of indicies) {
            search = search[index];
        }
        return search;
    }
    ngOnInit(): void {
        this.hasEnum = this.props[this.prop].hasOwnProperty("enum");
        if (this.hasEnum) {
            this.options = this.props[this.prop].enum;
        }
    }
    title = 'jsonTalkSoft';
}