/* eslint-disable no-console */

import { Component, Directive, OnInit, Input } from '@angular/core';
@Component({
    selector: 'dropdown',
    template: `
        <nb-card>
            <nb-card-body>
                <nb-select placeholder="Custom label" [(selected)]="selectedItem">
                <nb-select-label>
                    Selected: {{ selectedItem }}
                </nb-select-label>
                  <nb-option *ngFor="let prop of this.props; let ind = index" value={{prop}}>{{prop}}</nb-option>
                </nb-select>
            </nb-card-body>
        </nb-card>
`,
    styleUrls: ['./app.component.scss']
})
export class DropdownComponent implements OnInit {
    @Input() props!: any[];

    selectedItem: string = "";

    constructor() {
    }
    ngOnInit(): void {
        console.log(this.props);
    }
    title = 'jsonTalkSoft';
}