import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { LoaiHoSoComponent } from './loai-ho-so.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  declarations: [LoaiHoSoComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    LoaiHoSoModule,
    NzTableModule, NzButtonModule, NzInputModule, NzInputNumberModule,
    NzSelectModule, NzModalModule, NzFormModule, NzTagModule,
    NzIconModule, NzMessageModule, NzPopconfirmModule, NzToolTipModule,
  ]
})
export class LoaiHoSoModule {}