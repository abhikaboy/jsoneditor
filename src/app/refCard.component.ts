/* eslint-disable no-console */

import { TokenizeResult } from '@angular/compiler/src/ml_parser/lexer';
import { Component, Directive, Input, OnInit } from '@angular/core';
import { schema } from './jsonfiles/schemas';

@Component({
  selector: 'ref',
  template: `
        <h5 class = "spacing" id= "inline">{{definitionName + " " +indexLabel}}</h5>
      <div *ngIf='hasParents()'>
        <div *ngIf='isOneOf' id="inline">
              <nb-radio-group [(ngModel)]="this.oneOfType" class="smallIndent" id= "inline"> 
                <nb-radio *ngFor="let key of this.keys" (click) = changeIndex(key) [value]="key" id="inline">{{def.oneOf[key].properties.label.label}}</nb-radio>
              </nb-radio-group>
              <prop [props]=getOneOf() index={{this.index}} parents={{getPath()}}></prop>
        </div>
      </div>
      <div *ngIf='hasParents()'>
          <prop [props]=propKeys #normalProp index={{this.index}} parents={{getPath()}}> </prop> 
      </div>

  `,
  styleUrls: ['./app.component.scss']
})
/* 
  Needs to know position in array
  Needs to know object position in tree
*/
export class RefComponent implements OnInit {
  @Input() ref!: string | undefined;
  @Input() parents!: string;
  @Input() index: number | undefined | string;
  @Input() indexLabel: string | number;
  propKeys: string[] = [];
  definitionName: string | undefined;
  isOneOf: boolean = false;
  oneOfType: number = 0;
  def: any;
  keys: number[] = [];
  constructor() {
    this.definitionName = '';
    this.indexLabel = ''
  }
  hasParents(): boolean {
    return this.parents != undefined;
  }
  getPath() {
    if (this.index != undefined) return this.parents + `[${this.index}]`;
    return this.parents;
  }
  changeIndex(index: number) {
    this.oneOfType = index;
  }
  getOneOf() {
    const ret: any[] = [];
    if (!this.def.hasOwnProperty('oneOf')) return {};
    // @ts-ignore
    const props = this.def.oneOf[this.oneOfType].properties;
    for (const prop in props) {
      ret.push({ ...props[prop], name: prop });
    }
    return ret;
  }
  getProperty(propKeys: any, prop: string) {
    return propKeys[prop as keyof typeof propKeys];
  }
  ngOnInit(): void {
    // console.log(this.ref)
    console.log(this.index);
    // @ts-ignore
    const path: string[] = this.ref.split("/");
    this.definitionName = path.pop();
    this.def = schema.definitions[this.definitionName as keyof typeof schema.definitions];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    for (const prop in this.def.properties) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.propKeys.push({ ...this.def.properties[prop], name: prop })
    }
    this.isOneOf = this.def.hasOwnProperty("oneOf");
    if (this.isOneOf) {
      let stringKeys = Object.keys(this.def.oneOf);
      for (let key of stringKeys) {
        this.keys.push(parseInt(key));
      }
    }
  }
  title = 'jsonTalkSoft';
}
