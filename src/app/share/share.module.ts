import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';


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