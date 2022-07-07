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
    @Input() route!: string

    constructor() {
    }
    writeChange(change: any) {

    }
    ngOnInit(): void {
        // console.log(this.route);
    }
    title = 'jsonTalkSoft';
}