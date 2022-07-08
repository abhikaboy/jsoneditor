/* eslint-disable no-console */

import { Component, Directive, OnInit, Input } from '@angular/core';
import { data } from './jsonfiles/data';

@Component({
    selector: 'dropdown',
    template: `
        <div style="display:inline">
            <nb-select  placeholder="Select" [(selected)]="selectedItem" (selectedChange)="this.writeChange($event)">
                <nb-select-label>{{ selectedItem }}</nb-select-label>
                    <nb-option *ngFor="let option of this.options; let ind = index" value={{option}}>{{option}}</nb-option>
            </nb-select>
        </div>
`,
    styleUrls: ['./app.component.scss']
})
export class DropdownComponent implements OnInit {
    @Input() options!: string[];
    @Input() selectedItem!: any;
    @Input() route!: any

    constructor() {
    }
    writeChange(change: any) {
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
        //@ts-ignore
        temp[routes[routes.length - 2]] = change;
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
    ngOnInit(): void {
    }
    title = 'jsonTalkSoft';
}