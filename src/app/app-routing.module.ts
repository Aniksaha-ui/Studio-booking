import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutocompleteComponent } from './component/reuse-component/autocomplete/autocomplete.component';
import { InputComponent } from './input/input.component';
import { HomeComponent } from './component/home/home.component';
import { CardComponent } from './component/reuse-component/card/card.component';
import { SliderComponent } from './component/reuse-component/slider/slider.component';
import { TableComponent } from './component/reuse-component/table/table.component';
import { FormdesignComponent } from './component/reuse-component/formdesign/formdesign.component';
import { AssociateComponent } from './component/reuse-component/associate/associate.component';
import { StudioListComponent } from './component/studio-list/studio-list.component';
import { BookingListComponent } from './component/booking-list/booking-list.component';

const routes: Routes = [
  { path: '', component: StudioListComponent },
  { path: 'bookings', component: BookingListComponent },
  { path: 'autocomplete', component: AutocompleteComponent },
  { path: 'input', component: InputComponent },
  { path: 'card', component: CardComponent },
  { path: 'slider', component: SliderComponent },
  { path: 'table', component: TableComponent },
  { path: 'form', component: FormdesignComponent },
  { path: 'associate', component: AssociateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
