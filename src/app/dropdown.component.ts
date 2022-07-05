/* eslint-disable no-console */

import { Component, Directive, OnInit, Input } from '@angular/core';
@Component({
    selector: 'dropdown',
    template: `
        <div style="display:inline">
            <nb-select  placeholder="Select" [(selected)]="selectedItem">
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

    constructor() {
    }
    ngOnInit(): void {
        console.log(this.options);
    }
    title = 'jsonTalkSoft';
}