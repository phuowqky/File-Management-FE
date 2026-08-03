import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HoSoRoutingModule } from './ho-so-routing.module';
import { HoSoListComponent } from './ho-so-list/ho-so-list.component';
import { HoSoDetailComponent } from './ho-so-detail/ho-so-detail.component';
import { HoSoCuaToiComponent } from './ho-so-cua-toi/ho-so-cua-toi.component';
import { ChoPheDuyetComponent } from './cho-phe-duyet/cho-phe-duyet.component';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@NgModule({
  declarations: [
    HoSoListComponent,
    HoSoDetailComponent,
    HoSoCuaToiComponent,
    ChoPheDuyetComponent,
  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    HoSoRoutingModule,
    NzTableModule, NzButtonModule, NzInputModule, NzSelectModule,
    NzModalModule, NzFormModule, NzTagModule, NzBreadCrumbModule,
    NzIconModule, NzMessageModule, NzPopconfirmModule, NzToolTipModule,
    NzSpinModule, NzTabsModule, NzBadgeModule, NzCardModule,
    NzTimelineModule, NzAvatarModule, NzStepsModule, NzEmptyModule,
    NzDividerModule, NzDatePickerModule,
  ]
})
export class HoSoModule {}
