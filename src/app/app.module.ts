import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbButtonModule, NbCardModule, NbInputModule, NbListModule, NbListItemComponent, NbRadioComponent, NbRadioModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AppRoutingModule } from './app-routing.module';
import { FormComponent } from './form.component';
import { RefComponent } from './refCard.component';
import { PropComponent } from './propCard.component';
import { DropdownComponent } from './dropdown.component';
import { RefCardModule } from './refCard.module';
@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    RefComponent,
    PropComponent,
    DropdownComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    AppRoutingModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbListModule,
    NbRadioModule,
    FormsModule,
    RefCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
