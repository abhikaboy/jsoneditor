/* eslint-disable no-console */

import { Component, Input, OnInit } from '@angular/core';
@Component({
    selector: 'dropdown',
    template: `
    
`,
    styleUrls: ['./app.component.scss']
})
export class DropdownComponent implements OnInit {
    @Input() props!: Object;
    propKeys: string[] = [];
    constructor() {
    }
    ngOnInit(): void {
        
    }
    title = 'jsonTalkSoft';
}
