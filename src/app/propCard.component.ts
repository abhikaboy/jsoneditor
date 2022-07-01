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
                        <dropdown [props] = this.optionKeys.condition.conditionType></dropdown>
                    </div>
                    <div *ngSwitchCase="'value'" style="display:inline">
                        <dropdown [props] = this.optionKeys.condition.value></dropdown>
                    </div>
                    <div *ngSwitchCase="'actionType'" style="display:inline">
                        <dropdown [props] = this.optionKeys.action.actionType></dropdown>
                    </div>
                    <div *ngSwitchCase="'actionEnum'" style="display:inline">
                        <dropdown [props] = this.optionKeys.action.actionEnum></dropdown>
                    </div>
                    <div *ngSwitchCase="'selectionType'" style="display:inline">
                        <dropdown [props] = this.optionKeys.action.selectionType></dropdown>
                    </div>
                    <div *ngSwitchCase="'selectionValue'" style="display:inline">
                        <dropdown [props] = this.optionKeys.action.selectionValue></dropdown>
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
            promptType: [""], //select is needed to set type as string 
            resource: [""]
        },
        action: {
            actionType: [""],
            actionEnum:[""],
            selectionType:[""],
            selectionValue:[""]
        },
        condition: {
            conditionType:[""],
            value:[""]
        }
    }
    checked = false;
    toggle(checked: boolean) {
        this.checked = checked;
    }

    constructor() {
    }

    populateOptions(): void { //this needs to be streamlined - maybe store the arrays in a data structure or something idk
        //prompts
        for (var i = 0; i < schema.definitions.prompt.oneOf.length; i++) {
            //prompt type 
            for (var j = 0; j < schema.definitions.prompt.oneOf[i].properties.promptType.enum.length; j++) {
                this.optionKeys.prompt.promptType.push(schema.definitions.prompt.oneOf[i].properties.promptType.enum[j]);
            }
            //resource - string isn't completely processed
            this.optionKeys.prompt.resource = this.optionKeys.prompt.resource.concat(schema.definitions.prompt.oneOf[i].properties.resource.pattern.split("|"));
        }
        //make below code reactive to radio buttons
        for (var j = 0; j < schema.definitions.condition.oneOf[1].properties.conditionType.enum.length; j++) {
            if(this.checked){
                this.optionKeys.condition.value.push(schema.definitions.condition.oneOf[1].properties.conditionType.enum[j]);
            }
            else{
                this.optionKeys.condition.value.push("true");
                this.optionKeys.condition.value.push("false");
            }
        }
        //actiontype
        for(var x = 0; x < schema.definitions.action.properties.actionType.enum.length; x++){
            this.optionKeys.action.actionType.push(schema.definitions.action.properties.actionType.enum[x]);
        }
        //actionEnum
        for(var x = 0; x < schema.definitions.action.properties.actionEnum.enum.length; x++){
            this.optionKeys.action.actionEnum.push(schema.definitions.action.properties.actionEnum.enum[x]);
        }
        //selectionType
        for(var x = 0; x < schema.definitions.action.properties.selectionType.enum.length; x++){
            this.optionKeys.action.selectionType.push(schema.definitions.action.properties.selectionType.enum[x]);
        }
        //selectionEnum
        this.optionKeys.action.selectionValue = this.optionKeys.action.selectionValue.concat(schema.definitions.action.properties.selectionValue.pattern.split("|"));
        
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
