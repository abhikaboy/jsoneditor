import { Component } from '@angular/core';
import { dataJSON } from './jsonfiles/data';
import { schema } from './jsonfiles/schemas';
import { NbDialogService } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';

// @ts-ignore
import { FormComponent } from './form.component';
import jsv, { JsonSchemaValidator } from 'JSV';
import { ReviewCardComponent } from './reviewCard';
import { InputCardComponent } from './inputCard.component';
import { ActivatedRoute } from '@angular/router';
import { schemas } from "./jsonfiles/schemas"

let { data } = dataJSON;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  schemaTitle = schema.title;
  schemaDescription = schema.description;
  selectedSchema = {};
  selectedItem = {};
  update = 0;
  schemas = schemas;

  logData = () => {
    // console.log(data);
  }
  isDataEmpty() {
    console.log("data check");
    console.log(dataJSON.data)
    return dataJSON.data == {};
  }
  getData() {
    // console.log("data getting");
    return data;
  }
  setData(manualData) {
    data = manualData;
  }
  validate = () => {
    this.open(false)
  }
  constructor(private dialogService: NbDialogService, private route: ActivatedRoute, public http: HttpClient) {
  }

  open(hasScroll: boolean) {
    this.dialogService.open(ReviewCardComponent, { hasScroll });
  }
  openInput() {
    this.dialogService.open(InputCardComponent);
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log("parameters")
        console.log(params);

        try {
          this.http.get('http://localhost:3000/data?id=' + '7'/*params['id']*/).subscribe((data) => {
            // @ts-ignore
            console.log(data);
            // @ts-ignore
            let dataFromQuery = JSON.parse(atob(data.data));
            dataJSON["data"] = dataFromQuery;
            //@ts-ignore
            let schemaFromQuery = JSON.parse(atob(data.schema));
            this.selectedSchema = schemaFromQuery
            console.log(this.selectedSchema);
          })
        } catch (error) {
          console.log(error);
        }
      }
      );
  }
  title = 'jsonTalkSoft';
}
