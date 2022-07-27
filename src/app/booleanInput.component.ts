/* eslint-disable no-console */

import { Component, Directive, Input, OnInit } from '@angular/core';
import { DartTargetLanguage } from 'quicktype-core';
import { dataJSON } from './jsonfiles/data2';
import { schema } from './jsonfiles/schema2';
// let {data} = dataJSON;
@Component({
    selector: 'boolInput',
    template: `
                <nb-checkbox (checkedChange)="toggle($event)" [checked]='this.checked'>
                </nb-checkbox>
`,
    styleUrls: ['./app.component.scss']
})
export class BooleanInputComponent implements OnInit {
    data = dataJSON.data;
    @Input() route!: String;
    @Input() props!: Object;

    checked = false;
    toggle(checked: boolean) {
        this.checked = checked;
        let routes = this.getRouteArray();
        let temp = dataJSON.data

        for (let i = 0; i < routes.length - 1; i++) {
            if (temp.hasOwnProperty(routes[i])) {
                //@ts-ignore
                temp = temp[routes[i]];
            } else {
                console.log("route does not exist");
            }
        }
        // @ts-ignore
        temp[routes[routes.length - 1]] = this.checked;
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
        let currentLocation = dataJSON.data;
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
    constructor() {

    }
    ngOnInit(): void {
        // @ts-ignore   
        this.checked = this.getData();
    }
    title = 'jsonTalkSoft';
}
