import { Component, OnInit } from '@angular/core';
import { Action, ActionService } from 'src/app/core/services/action.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  ngOnInit(): void {
    this.loadActions();
    this.initForm();
  }
  actions: Action[] = [];
  loading = false;
  isModalVisible = false;
  isEditMode = false;
  actionForm!: FormGroup;
  currentActionId?: number;

  constructor(
    private actionService: ActionService, 
    private message: NzMessageService, 
    private fb: FormBuilder) { }
  

  loadActions(): void {
    this.loading = true;
    this.actionService.getAll().subscribe({
      next: (data) => {
        this.actions = data;
        this.loading = false;
      },
      error: () => {
        this.message.error('Không thể tải danh dách hành động');
        this.loading = false;
      }
    })
  }

showEditModal(action: Action): void {
  this.isEditMode = true;
  this.currentActionId = action.id;
  this.loading = true;

  this.actionService.getById(action.id).subscribe({
    next: (data) => {

      this.actionForm.patchValue({
        code: data.code,
        name: data.name,
        allowPaths: data.allowPaths,
        logPaths: data.logPaths,
        description: data.description,
        status: data.status
      });

      this.loading = false;
      this.isModalVisible = true;
    },

    error: () => {
      this.loading = false;
      this.message.error('Không tải được thông tin Action');
    }
  });
}

  showAddModal(): void {
    this.isEditMode = false;
    this.currentActionId = undefined;
    this.actionForm.reset({ status: 1 });
    this.isModalVisible = true;
  }

    reloadCache(): void {
    this.loading = true;
    this.actionService.reloadCache().subscribe({
      next: (res) => {
        this.message.success('Đã áp dụng cấu hình quyền mới nhất lên Server');
        this.loading = false;
      },
      error: () => {
        this.message.error('Có lỗi xảy ra khi áp dụng cấu hình');
        this.loading = false;
      }
    });
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }

  handleSave(): void {
    if (this.actionForm.invalid){
      Object.values(this.actionForm.controls).forEach(control => {
    if (control.invalid){
      control.markAsDirty();
      control.updateValueAndValidity({ onlySelf: true });
    }
      });
      return;
  }

  const payload = this.actionForm.value;

  if (this.isEditMode && this.currentActionId !== undefined) {
    this.actionService.update(this.currentActionId, payload).subscribe({
      next: (data) => {
        this.message.success('Cập nhật Action thành công');
        this.isModalVisible = false;
        this.loadActions();
      },
      error: () => {
        this.message.error('Cập nhật Action thất bại');
      }
    })
  }
}

  initForm(): void {
    this.actionForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      allowPaths: [''],
      logPaths: [''],
      description: [''],
      status: [1]
    });
  }

    deleteAction(id: number): void {
    this.actionService.delete(id).subscribe({
      next: () => {
        this.message.success('Xóa thành công');
        this.loadActions();
      },
      error: () => this.message.error('Lỗi khi xóa mã quyền')
    });
  }

  
}
