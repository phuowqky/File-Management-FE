import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { LOCALE_ID } from '@angular/core';
@NgModule({
    imports: [
        CommonModule,
        NzFormModule,
        NzInputModule,
        NzButtonModule,
        NzMenuModule,
        NzCheckboxModule,
        NzBreadCrumbModule,
        NzIconModule,
        NzDropDownModule,
        NzSelectModule,
        NzTableModule,
        NzPaginationModule,
        NzToolTipModule,
        NzPopconfirmModule,
        NzModalModule,
        NzDividerModule,
        NzTagModule,
        NzAlertModule,
        NzInputNumberModule,
        FormsModule,
        ReactiveFormsModule,
        NzSwitchModule,
        NzCardModule,
        NzDescriptionsModule,
        NzDatePickerModule,
    ],
    exports: [
        NzFormModule,
        NzInputModule,
        NzButtonModule,
        NzMenuModule,
        NzCheckboxModule,
        NzBreadCrumbModule,
        NzIconModule,
        NzDropDownModule,
        NzSelectModule,
        NzTableModule,
        NzPaginationModule,
        NzToolTipModule,
        NzPopconfirmModule,
        NzModalModule,
        NzDividerModule,
        NzTagModule,
        NzAlertModule,
        NzInputNumberModule,
        FormsModule,
        ReactiveFormsModule,
        NzSwitchModule,
        NzCardModule,
        NzDescriptionsModule,
        NzDatePickerModule,
    ],  providers: [
    { provide: NZ_I18N, useValue: vi_VN }
  ]
})
export class ShareModule {

}