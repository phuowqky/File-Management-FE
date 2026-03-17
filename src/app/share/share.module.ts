import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzIconModule } from 'ng-zorro-antd/icon';

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
    ],
    exports: [
        NzFormModule,
        NzInputModule,
        NzButtonModule,
        NzMenuModule,
        NzCheckboxModule,
        NzBreadCrumbModule,
        NzIconModule,
    ]
})
export class ShareModule {

}