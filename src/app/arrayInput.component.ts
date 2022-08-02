/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment

import { Component, Directive, Input, OnInit } from '@angular/core';
import { dataJSON } from './jsonfiles/data';
import { schema } from './jsonfiles/schemas';
import { NbDialogService } from '@nebular/theme';
import { MoveCardComponent } from './moveCard.component';
@Component({
    selector: 'arrayInput',
    template: `
                <div style="width:100%;background-color:rgba(200,255,200,0.5);borderRadius:5px;padding-left:1vw;padding:0.5vw">
                    <p style="display: inline;">{{name}}: </p> <button nbButton outline status="success" size="tiny" (click)="appendRef()">+</button>
                </div>
                <nb-accordion *ngIf='hasNoRef()'>
                            <nb-accordion-item  *ngFor='let i of getData(); let ind = index'>
                                <nb-accordion-item-header>{{capFirstLetter(getItemTitle(prop,props) + (ind + 1))}}
                                    <button nbButton status="danger" size="small" (click)='removeRef(ind)' style="margin-left:3%">Remove</button>
                                    <button nbButton status="info" size="small" (click)='move(ind,-1)' style="margin-left:0.2%">Up</button>
                                    <button nbButton status="info" size="small" (click)='move(ind,1)' style="margin-left:0.2%">Down</button>
                                </nb-accordion-item-header>
                                <nb-accordion-item-body>
                                    <div *ngIf='hasItems(prop,props); else showProp'>
                                        <h1>outside</h1>
                                        <ref [ref]='getRef(prop,props)'  parents={{getPath(prop,ind)}}> </ref>
                                    </div>
                                    <ng-template #showProp>
                                        <h2>prop card</h2>
                                        <prop [props]=generatePropCard() index="index" parents={{this.getPropParents()}}> </prop>
                                    </ng-template>
                                </nb-accordion-item-body>
                            </nb-accordion-item>
                                <nb-accordion-item *ngIf='isEmpty()' >
                                        <h1>outsid2e</h1>
                                    <nb-accordion-item-header>Empty</nb-accordion-item-header>
                            </nb-accordion-item>
                    </nb-accordion>
                    <nb-accordion *ngIf='hasRef()'>
                        <nb-accordion-item *ngFor='let item of getDataRef(); let i = index'>
                            <nb-accordion-item-header>{{capFirstLetter(this.getRefTitle()+ " " + (i+1))}}
                                    <button nbButton ghost status="danger" size="small" (click)='removeRef(index)' style="margin-left:3%">Remove</button>
                                    <button nbButton ghost status="info" size="small" (click)='move(index,-1)' style="margin-left:0.2%">Up</button>
                                    <button nbButton ghost status="info" size="small" (click)='move(index,1)' style="margin-left:0.2%">Down</button>
                                </nb-accordion-item-header>
                                <nb-accordion-item-body>
                                    <div>
                                        <p>ref card in an array</p>
                                        <ref [ref]='this.ref' index={{$any(i)}} parents={{this.route}}>
                                        </ref>
                                    </div>
                                </nb-accordion-item-body>
                        </nb-accordion-item>    
                    </nb-accordion >
                    `,
    styleUrls: ['./app.component.scss']
})

/*
 passing undefined into new referances 
*/
export class ArrayInputComponent implements OnInit {
    
    @Input() route!: String;
    @Input() prop!: any;
    @Input() props!: Object;
    @Input() index!: any;
    @Input() ref: string | undefined;
    @Input() name!: string;
    data = dataJSON.data;

    constructor(private dialogService: NbDialogService) {
        this.index = 0;
    }
    hasRef(): boolean {
        // console.log(this.ref);
        return this.ref != undefined;
    }
    hasNoRef(): boolean {
        return (this.ref == undefined);
    }
    generatePropCard(){ 
        console.log("array dont know what to do");
        return { 

        }
    }
    getPropParents(){
        const ret = this.route + "." + this.name;
        console.log( ret);
        return ret;
    }
    getItemTitle(prop: string, object: any): string {
        const ret = this.getRef(prop, object).split("/").pop();
        if (ret == undefined) return "Item";
        return `${ret} `;
    }
    getRefTitle(): string {
        if (this.ref == undefined) return "item";
        return this.ref.split("/").pop() || "deafult";
    }
    getPath(prop : any, index : number) {
        let propName =  this.getPropertyName(prop, this.props);
        if(propName == undefined){
            propName='';
        } else {
            propName = "." + propName
        }
        if(this.getPropertyType(prop,this.props) == 'array') return this.route + propName+`[${index}]`;
        else return this.route + propName;
    }
    hasParents(): boolean {
        return this.route != undefined;
    }
    isEmpty(){
        // console.log(this.getData());
        if(this.getData() == undefined) return true;
        return this.getData().length == 0;
    }
    toNum(input: string): number {
        return parseFloat(input);
    }
    getPropertyType(prop: string, object: any): string {
        return object[prop as keyof typeof object].type;
    }
    getPropertyName(prop: string, object: any): string {
        if (object[prop as keyof typeof object].hasOwnProperty("name")) return object[prop as keyof typeof object].name;
        else {
            return prop;
        };
    }
    hasItems(prop: string, object: any): boolean {
        return object[prop as keyof typeof object].hasOwnProperty('items');
    }
    getRef(prop: string, object: any): string {
        if (object[prop as keyof typeof object].hasOwnProperty('items')) return object[prop as keyof typeof object].items.$ref;
        else return "";
    }
        writeChange(change: any) {
        let routes = this.getRouteArray();
        let temp = dataJSON.data;

        for (let i = 0; i < routes.length - 1; i++) {
            if (temp.hasOwnProperty(routes[i])) {
                //@ts-ignore
                temp = temp[routes[i]];
            } else {
                console.log("route does not exist");
            }
        }
        // @ts-ignore
        temp[routes[routes.length - 1]] = this.input;
    }
    getRouteArray() {
        const preRoutes = this.route.split(".");
        let routes = [];
        let indSplit = [];
        for (let route in preRoutes) {
            let level = preRoutes[route]
            if (level.includes('[')) {
                indSplit = level.split('[');
                for (let str in indSplit) {
                    indSplit[str] = indSplit[str].replace(']', '');
                    routes.push(indSplit[str]);
                }
            } else {
                routes.push(level);
            }
        }
        return routes;
    }
    getData(): Object[] {
        let currentRoute = this.route + "." + this.getPropertyName(this.prop, this.props);
        const routes = currentRoute.split("."); // establishes levels of nesting 
        // console.log(routes);
        let currentLocation = this.data;
        for (const route of routes) {
            currentLocation = this.dig(route, currentLocation);
        }
        // @ts-ignore
        return currentLocation;
    }
    getRefToObject(ref: string): Object {
        // @ts-ignore
        const def = ref.split("/").pop();
        // @ts-ignore
        const defy = schema.definitions[def];
        const ret = {};
        let fill = (propertyTag: object, object: object) => {
            let property = object[propertyTag as keyof typeof object];
            // @ts-ignore
            switch (property.type) {
                case "array":
                    // console.log("adding array")
                    // @ts-ignore
                    ret[propertyTag] = [];
                    break;
                case "string":
                    // console.log("adding string")
                    // @ts-ignore
                    ret[propertyTag] = ""
                    break;
                case "boolean":
                    // console.log("adding bool")
                    // @ts-ignore
                    ret[propertyTag] = false;
                    break;
            }
            // console.log(ret);
        }
        if (defy.hasOwnProperty("oneOf")) {
            for (let property in defy.oneOf[0].properties) {
                // @ts-ignore
                fill(property, defy.oneOf[0].properties);
            }
        }
        for (let property in defy.properties) {
            // @ts-ignore
            fill(property, defy.properties);
        }
        // console.log(ret);
        return ret;
    }
    capFirstLetter(input: string): string {
        return input.charAt(0).toUpperCase() + input.slice(1);
    }
    appendRef(): void {
        // console.log(dataJSON)
        if (this.ref == undefined) {
            // console.log(this.getRef(this.prop,this.props));
            // this pulls the ref from "items". If it doesn't have 
            // items property then just make it an empty string
            // TO-DO make it so this checks the data type of the property and add default from there
            // console.log(this.xgetData());
            if(this.getRef(this.prop,this.props) != undefined){
                console.log("1");
                this.getData().push(this.getRef(this.prop,this.props));
            } else {
                console.log("2");
                this.getData().push({});
            }
        } else{ 
                console.log("3");
            // has the reference property 
            // @ts-ignore
            this.getDataRef().push(this.getRefToObject(this.ref));
            // console.log("get data ref:");
            // console.log(this.getDataRef())
            // console.log("get ref to object:");

            // console.log(this.getRefToObject(this.ref));
        }
    }
    removeRef(index: number): void {
        const dataArray = this.ref == undefined ? this.getData() : this.getDataRef()
        dataArray.splice(index, 1);
    }
    move(index,amount) {
                const dataArray = this.ref == undefined ? this.getData() : this.getDataRef()
                let position = index + amount;
                if (position > dataArray.length || position < 0) return;
                const [copy] = dataArray.splice(index, 1);
                dataArray.splice(position, 0, copy); //insert
    }
    
    getDataRef(): Object[] {
        // @ts-ignore
        console.log(this.data[this.route]);
                let currentRoute = this.route + "." +this.name;
        let routes = currentRoute.split("."); // establishes levels of nesting
        let uniqueRoute = new Set(routes);
        routes = [...uniqueRoute]
        // console.log(routes);
        let currentLocation = this.data;
        for (const route of routes) {
            currentLocation = this.dig(route, currentLocation);
        }
        // @ts-ignore
        return currentLocation;
    }
    dig(route: string, input: any) {
        if (!route.includes("[")) {
            try {
                return input[route];
            } catch (e) {
                return "route does not exist"
            }
        }
        // array digging 
        const level1 = route.split("[");
        const routeRoot = level1[0];
        const level2 = level1.slice(1);
        const indicies = level2.map((index) => parseFloat(index.split("]")[0]));
        let search = input[routeRoot];
        for (const index of indicies) {
            search = search[index];
        }
        return search;
    }
    ngOnInit(): void {

    }
    title = 'jsonTalkSoft';
}
