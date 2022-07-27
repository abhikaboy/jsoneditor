/* eslint-disable no-console */

import { Component, Directive, Input, OnInit } from '@angular/core';
import { schema } from './jsonfiles/schema2';
import { quicktype, InputData, jsonInputForTargetLanguage, JSONSchemaInput, FetchingJSONSchemaStore } from "quicktype-core";
@Component({
    selector: 'form',
    template: `
        <ul style="list-style-type:none;">
        <button nbButton (click)="refresh()">refresh</button>
            <li *ngFor="let item of data">
                <nb-card status="success">
                    <nb-card-header style="text-align:center;font-size:1.2em">
                        {{item.name}}
                    </nb-card-header>
                    <nb-card-body>
                            <div *ngIf="item.hasOwnProperty('items')">
                                <prop ref={{item.items.$ref}} [props]=item.properties parents="{{item.name}}" type={{item.type}}> </prop>
                            </div>
                            <div *ngIf="item.hasOwnProperty('properties')">
                                <h1>prop</h1>
                                <prop [props]=item.properties parents="{{item.name}}"> </prop>
                            </div>
                            <div *ngIf="item.hasOwnProperty('$ref')"> 
                                    <!-- <h1>ref</h1> -->
                                 <ref ref ={{item.$ref}} parents="{{item.name}}"> </ref>
                            </div>
                            <div *ngIf="!item.hasOwnProperty('properties') && !item.hasOwnProperty('items') && !item.hasOwnProperty('$ref')"> 
                                <h2>lolw</h2>
                                <prop [props]=this.itemMagic(item) parents={{item.name}} solo="true"></prop>
                            </div>
                    </nb-card-body>
                </nb-card>
            </li>
        <ul>
`,
    styleUrls: ['./app.component.scss']
})
export class FormComponent implements OnInit {
    @Input() changeForce: number = 0;
    data: any[] = [];
    definitions: {} = {};
    constructor() {
        for (const property in schema.properties) {
            this.data.push({ ...schema.properties[property as keyof typeof schema.properties], name: property });
        }
    }
    ngOnInit(): void {
        
    }
    itemMagic(item) {
        let ret = {}
        ret[item.name] = {...item};
        return ret;
    }
    refresh() {
        this.changeForce++;
        console.log("super good");
        this.data = [];
        for (const property in schema.properties) {
            this.data.push({ ...schema.properties[property as keyof typeof schema.properties], name: property });
        }
    }
    title = 'jsonTalkSoft';
}
