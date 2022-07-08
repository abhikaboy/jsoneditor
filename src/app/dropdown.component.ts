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
        const routes = this.route.split(".");
        let currentLocation = data;
        for (const route of routes) {
            currentLocation = this.dig(route, currentLocation);
        }
        currentLocation = change;
        console.log(data);
    }
    dig(route: string, input: any) {
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
    }
    title = 'jsonTalkSoft';
}