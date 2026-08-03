import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HoSoListComponent } from './ho-so-list/ho-so-list.component';
import { HoSoCuaToiComponent } from './ho-so-cua-toi/ho-so-cua-toi.component';
import { HoSoDetailComponent } from './ho-so-detail/ho-so-detail.component';
import { ChoPheDuyetComponent } from './cho-phe-duyet/cho-phe-duyet.component';

const routes: Routes = [
  { path: '', component: HoSoListComponent },
  { path: 'cua-toi', component: HoSoCuaToiComponent },
  { path: 'cho-phe-duyet', component: ChoPheDuyetComponent },
  { path: ':id', component: HoSoDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HoSoRoutingModule {}
