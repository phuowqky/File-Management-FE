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
        NzTagModule
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
        NzTagModule
    ]
})
export class ShareModule {

}