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
                        <dropdown [props] = options></dropdown>
                    </div>
                    <div *ngSwitchCase="'resourceType'" style="display:inline">
                        <dropdown [props] = options></dropdown>
                    </div>
                    <!-- plenty more, action enum, action type, etc.  -->
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
    checked = false;
    toggle(checked: boolean) {
      this.checked = checked;
    }

    constructor() {
    }

    populateOptions(prop: string): string[] {
        for(let i = 0; i < 2; i++){
            let length = schema.definitions.prompt.oneOf[i].properties.promptType.enum.length;
            for(let j = 0; j < length; j++){
                this.options.push(schema.definitions.prompt.oneOf[i].properties.promptType.enum[j]);
            }
        }
        return this.options;
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
        this.populateOptions("fillin");
        // console.log(this.props);
        for (const prop in this.props) {
            this.propKeys.push(prop);
        }
        // console.log(definitionName)
        // console.log(def);
    }
    title = 'jsonTalkSoft';
}
