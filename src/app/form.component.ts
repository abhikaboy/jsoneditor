/* eslint-disable no-console */

import { Component, Directive, OnInit } from '@angular/core';
import { schema } from './jsonfiles/schema2';
import { validateAdditionalItems } from 'ajv/dist/vocabularies/applicator/additionalItems';

@Component({
    selector: 'form',
    template: `
        <ul style="list-style-type:none;">
            <li *ngFor="let item of data">
                <nb-card status="success">
                    <nb-card-header style="text-align:center;font-size:1.2em">
                        {{item.name}}
                    </nb-card-header>
                    <nb-card-body>
                            <div *ngIf="item.hasOwnProperty('items')">
                                <!-- <ref ref ={{item.items.$ref}} parents="schema.properties.{{item.name}}"> </ref> -->
                                <prop ref={{item.items.$ref}} [props]=item.properties parents="{{item.name}}" type={{item.type}}> </prop>
                            </div>
                            <div *ngIf="item.hasOwnProperty('properties')">
                                <prop [props]=item.properties parents="{{item.name}}"> </prop>
                            </div>
                    </nb-card-body>
                </nb-card>
            </li>
        <ul>
`,
    styleUrls: ['./app.component.scss']
})
export class FormComponent implements OnInit {
    data: any[] = [];
    definitions: {} = {};
    constructor() {
        for (const property in schema.properties) {
            this.data.push({ ...schema.properties[property as keyof typeof schema.properties], name: property });
        }
    }
    ngOnInit(): void {
        
    }
    title = 'jsonTalkSoft';
}
