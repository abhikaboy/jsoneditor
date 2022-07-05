/* eslint-disable no-console */

import { Component, Directive, OnInit, Input } from '@angular/core';
@Component({
    selector: 'dropdown',
    template: `
        <div style="display:inline">
            <nb-select  placeholder="Select" [(selected)]="selectedString">
                <nb-select-label>{{ selectedString }}</nb-select-label>
                    <nb-option *ngFor="let option of this.options; let ind = index" value={{option}}>{{option}}</nb-option>
            </nb-select>
        </div>
`,
    styleUrls: ['./app.component.scss']
})
export class DropdownComponent implements OnInit {
    @Input() options!: string[];
    @Input() selectedItem!: any;
    @Input() props!: string[];

    selectedString: string = "";

    constructor() {
    }
    ngOnInit(): void {
        this.options = this.props.slice(1, this.props.length);
    }
    title = 'jsonTalkSoft';
}