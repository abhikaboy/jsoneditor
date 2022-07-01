/* eslint-disable no-console */

import { ConvertPropertyBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, Directive, Input, OnInit } from '@angular/core';
import { NbChatOptions } from '@nebular/theme';
import { schema } from './jsonfiles/schema';
import { DropdownComponent } from './dropdown.component';
@Component({
    selector: 'prop',
    template: `
    <div *ngFor="let prop of propKeys" class="indent">
        <p id="inline">{{getPropertyName(prop, props)}}: </p>
        <div  class="spacing" [ngSwitch]='getPropertyType(prop, props)' id="inline">
            <div *ngSwitchCase="'array'">
                <nb-list>
                    <!-- {{getPropertyName(prop, props)}} is array -->
                    <nb-list-item>
                        <div *ngIf='hasItems(prop,props)'>
                            <ref [ref]='getRef(prop,props)'></ref>
                        </div>
                    </nb-list-item>
                </nb-list>
            </div>
            <div *ngSwitchCase="'string'" [ngSwitch]="getPropertyName(prop, props)" style="display:inline">
                    <div *ngSwitchCase="'promptType'" style="display:inline">
                        <dropdown [props] = this.optionKeys.prompt.promptType></dropdown>
                    </div>
                    <div *ngSwitchCase="'resource'" style="display:inline">
                        <dropdown [props] = this.optionKeys.prompt.resource></dropdown>
                    </div>
                    <div *ngSwitchCase="'conditionType'" style="display:inline">
                        <dropdown [props] = options></dropdown>
                    </div>
                    <div *ngSwitchCase="'value'" style="display:inline">
                        <dropdown [props] = options></dropdown>
                    </div>
                    <div *ngSwitchCase="'actionType'" style="display:inline">
                        <dropdown [props] = options></dropdown>
                    </div>
                    <div *ngSwitchCase="'actionEnum'" style="display:inline">
                        <dropdown [props] = options></dropdown>
                    </div>
                    <div *ngSwitchCase="'selectionType'" style="display:inline">
                        <dropdown [props] = options></dropdown>
                    </div>
                    <div *ngSwitchCase="'selectionValue'" style="display:inline">
                        <dropdown [props] = options></dropdown>
                    </div>
            </div>
            <div *ngSwitchCase="'boolean'" style="display:inline"> 
                <nb-checkbox (checkedChange)="toggle($event)">
                </nb-checkbox>
            </div>
        </div>
</div>
`,
    styleUrls: ['./app.component.scss']
})
export class PropComponent implements OnInit {
    @Input() props!: Object;
    propKeys: string[] = [];
    oneOf: {} = {};
    options: string[] = [];
    optionKeys = {
        prompt: {
            promptType: ["Select"], //select is needed to set type as string 
            resource: ["0"]
        },
        action: {
            actionType: [],
            actionEnum:[],
            selectionType:[],
            selectionValue:[]
        },
        condition: {
            conditionType:[],
            value:[]
        }
    }
    checked = false;
    toggle(checked: boolean) {
        this.checked = checked;
    }

    constructor() {
    }

    populateOptions(): void { //this needs to be streamlined - maybe store the arrays in a data structure or something idk
        for (let i = 0; i < schema.definitions.prompt.oneOf.length; i++) {
            //prompt type 
            for (let j = 0; j < schema.definitions.prompt.oneOf[i].properties.promptType.enum.length; j++) {
                this.optionKeys.prompt.promptType.push(schema.definitions.prompt.oneOf[i].properties.promptType.enum[j]);
            }
            //resource
            this.optionKeys.prompt.resource = this.optionKeys.prompt.resource.concat(schema.definitions.prompt.oneOf[i].properties.resource.pattern.split("|"));
        }
        
    }
    getPropertyType(prop: string, object: any): string {
        // console.log(object[prop as keyof typeof object]);
        return object[prop as keyof typeof object].type;
    }
    getPropertyName(prop: string, object: any): string {
        // console.log(object[prop as keyof typeof object]);
        return object[prop as keyof typeof object].name;
    }
    hasItems(prop: string, object: any): boolean {
        // console.log(object[prop as keyof typeof object]);
        return object[prop as keyof typeof object].hasOwnProperty('items');
    }
    getRef(prop: string, object: any): string {
        return object[prop as keyof typeof object].items.$ref;
    }
    ngOnInit(): void {
        console.log(schema.definitions.prompt.oneOf[1].properties.resource.pattern.split("|"));
        this.populateOptions();
        // console.log(this.props);
        for (const prop in this.props) {
            this.propKeys.push(prop);
        }
    }
    title = 'jsonTalkSoft';
}
