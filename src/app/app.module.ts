import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputComponent } from './input/input.component';
import { MaterialModule } from './material-module';
import { AutocompleteComponent } from './component/reuse-component/autocomplete/autocomplete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenubarComponent } from './component/menubar/menubar.component';
import { HomeComponent } from './component/home/home.component';
import { CardComponent } from './component/reuse-component/card/card.component';
import { SliderComponent } from './component/reuse-component/slider/slider.component';
import { TableComponent } from './component/reuse-component/table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { FormdesignComponent } from './component/reuse-component/formdesign/formdesign.component';
import { PopupComponent } from './component/reuse-component/popup/popup.component';
import { AssociateComponent } from './component/reuse-component/associate/associate.component';
import { UserdetailComponent } from './component/reuse-component/userdetail/userdetail.component';
import { StudioListComponent } from './component/studio-list/studio-list.component';
import { BookingPopupComponent } from './component/booking-popup/booking-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    AutocompleteComponent,
    MenubarComponent,
    HomeComponent,
    CardComponent,
    SliderComponent,
    TableComponent,
    FormdesignComponent,
    PopupComponent,
    AssociateComponent,
    UserdetailComponent,
    StudioListComponent,
    BookingPopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
