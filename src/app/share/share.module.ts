import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzAvatarModule } from "ng-zorro-antd/avatar";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";

@NgModule({
    imports: [
        CommonModule,
        NzFormModule,
        NzInputModule,
        NzButtonModule,

        
    ],
    exports: [
        NzFormModule,
        NzInputModule,
        NzButtonModule,
    ]
})
export class ShareModule {

}