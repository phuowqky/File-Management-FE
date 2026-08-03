// import { Component, OnInit } from '@angular/core';
// import { RoleService } from 'src/app/core/services/role.service';
// import {Role} from '../../core/models/role.model'

// @Component({
//   selector: 'app-roles',
//   templateUrl: './roles.component.html',
//   styleUrls: ['./roles.component.scss']
// })

// export class RolesComponent implements OnInit {
  
//   roles: Role[] = [];

//   constructor(private roleService: RoleService) {}

//   ngOnInit(): void {
//     this.loadRoles();
//   }

//   loadRoles(): void {
//     this.roleService.getAll().subscribe({
//       next: (res) => {
//         if (res.success) {
//           this.roles = res.data;
//           console.log(this.roles);
//         }
//       },
//       error: (err) => {
//         console.error(err);
//       }
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RoleService } from 'src/app/core/services/role.service';
import { Role } from '../../core/models/role.model';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  // Table data
  roles: Role[] = [];
  displayData: Role[] = [];

  // Pagination
  total = 0;
  pageIndex = 1;
  pageSize = 10;

  // State
  loading = false;
  modalLoading = false;
  searchText = '';

  // Modal flags
  isAddModalVisible = false;
  isEditModalVisible = false;
  isViewModalVisible = false;
  isDeleteModalVisible = false;

  // Editing target
  editingRole: Partial<Role> = {};

  constructor(
    private roleService: RoleService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.loading = true;
    this.roleService.getAll().subscribe({
      next: (res) => {
        if (res.success) {
          this.roles = res.data;
          this.total = this.roles.length;
          this.applyFilter();
        }
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.message.error('Không thể tải danh sách vai trò');
        this.loading = false;
      }
    });
  }

  // ─── Search ───────────────────────────────────────────

  onSearchChange(value: string): void {
    this.searchText = value;
    this.pageIndex = 1;
    this.applyFilter();
  }

  applyFilter(): void {
    const keyword = this.searchText.trim().toLowerCase();
    const filtered = keyword
      ? this.roles.filter(r =>
          r.name?.toLowerCase().includes(keyword) ||
          r.description?.toLowerCase().includes(keyword)
        )
      : [...this.roles];

    this.total = filtered.length;
    const start = (this.pageIndex - 1) * this.pageSize;
    this.displayData = filtered.slice(start, start + this.pageSize);
  }

  onPageIndexChange(index: number): void {
    this.pageIndex = index;
    this.applyFilter();
  }

  // ─── Modal: Thêm ──────────────────────────────────────

  showAddModal(): void {
    this.editingRole = {};
    this.isAddModalVisible = true;
  }

  handleAdd(): void {
    if (!this.editingRole.name?.trim()) {
      this.message.warning('Vui lòng nhập tên vai trò');
      return;
    }
    this.modalLoading = true;
    this.roleService.create(this.editingRole as Role).subscribe({
      next: (res) => {
        if (res.success) {
          this.message.success('Thêm vai trò thành công');
          this.isAddModalVisible = false;
          this.loadRoles();
        }
        this.modalLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.message.error('Thêm vai trò thất bại');
        this.modalLoading = false;
      }
    });
  }

  // ─── Modal: Sửa ───────────────────────────────────────

  // editRole(role: Role): void {
  //   this.editingRole = { ...role };
  //   this.isEditModalVisible = true;
  // }

  // handleEdit(): void {
  //   if (!this.editingRole.name?.trim()) {
  //     this.message.warning('Vui lòng nhập tên vai trò');
  //     return;
  //   }
  //   this.modalLoading = true;
  //   this.roleService.update(this.editingRole.id!, this.editingRole as Role).subscribe({
  //     next: (res) => {
  //       if (res.success) {
  //         this.message.success('Cập nhật vai trò thành công');
  //         this.isEditModalVisible = false;
  //         this.loadRoles();
  //       }
  //       this.modalLoading = false;
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       this.message.error('Cập nhật vai trò thất bại');
  //       this.modalLoading = false;
  //     }
  //   });
  // }

editRole(role: Role): void {
    console.log(role);       // xem object
  console.log(role.id);    // xem id

  this.roleService.getById(role.id!).subscribe({
    
    next: (res) => {
      if (res.success) {
        this.editingRole = res.data;
        this.isEditModalVisible = true;
      }
    },
    error: (err) => {
      console.error(err);
    }
  });

}
handleEdit(): void {
  console.log('ID:', this.editingRole.id);
  console.log('DATA:', this.editingRole);

  this.roleService.update(
    this.editingRole.id!,
    this.editingRole as Role
  )
  .subscribe({

      next: (res)=>{

          if(res.success){

              this.message.success("Cập nhật thành công");

              this.isEditModalVisible=false;

              this.loadRoles();

          }

          this.modalLoading=false;

      },

      error: ()=>{

          this.modalLoading=false;

          this.message.error("Cập nhật thất bại");

      }

  });

}

  // ─── Modal: Xem ───────────────────────────────────────

  viewRole(role: Role): void {
    this.editingRole = { ...role };
    this.isViewModalVisible = true;
  }

  // ─── Modal: Xóa ───────────────────────────────────────

showDelete(role: Role): void {

    this.editingRole = role;

    this.isDeleteModalVisible = true;

}

confirmDelete(): void {
  this.roleService.delete(this.editingRole.id!).subscribe({
    next: () => {
      this.message.success('Xóa vai trò thành công');
      this.isDeleteModalVisible = false;
      this.editingRole = {};
      this.loadRoles();
    },
    error: (err) => {
      console.error(err);
      this.message.error('Xóa vai trò thất bại');
    }
  });
}

  
}