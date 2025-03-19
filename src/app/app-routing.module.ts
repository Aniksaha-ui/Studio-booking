import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudioBookingComponent } from './features/studio-booking/studio-booking.component';

const routes: Routes = [{ path: '', component: StudioBookingComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
