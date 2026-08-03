import { RoleService } from 'src/app/core/services/role.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { DonViService } from 'src/app/core/services/donvi.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  fullName: string;
  age: number;
  enabled: boolean;
  donViId: number | null;
  tenDonVi: string | null;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {

  searchText = '';
  pageIndex = 1;
  pageSize = 10;
  total = 0;
  loading = false;
  displayData: User[] = [];
  private searchSubject = new Subject<string>();
  

  

  // Modal
  // isModalVisible = false;
  // isEditing = false;
  // editingUser: any = {};
  // modalLoading = false;

  // Modal thêm/sửa
// isAddEditModalVisible = false;

// Modal xem
isViewModalVisible = false;

isEditModalVisible = false;

isEditing = false;

editingUser: any = {};

modalLoading = false;
isAddModalVisible = false;


// Chứa role khi gọi về để fill lên UI

roleList: any[] = [];
selectedRoleId!: number;

donViList: any[] = [];
donViLoading = false;

isDeleteModalVisible=false;
deleteId=0;


  constructor(
  private userService: UserService,
  private roleService: RoleService,
  private donViService: DonViService,
) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {

  this.loading = true;

  this.userService
    .getUsers(this.pageIndex, this.pageSize)
    .subscribe({

      next: (page) => {

        console.log(page);

        this.displayData = page.content;

        this.total = page.totalElements;

        this.loading = false;
      },

      error: err => {
        console.error(err);
        this.loading = false;
      }
    });

      this.searchSubject
    .pipe(
      debounceTime(3000), // nếu muốn 3 giây
      distinctUntilChanged()
    )
    .subscribe(keyword => {

      this.pageIndex = 1;

      this.search(keyword);

    });
}
// Chuyển trang
onPageIndexChange(page: number): void {

  this.pageIndex = page;

  this.loadData();
}




    // Modal
  showPassword = false;
  // donViLoading = false;
  // donViList: { id: number; ten: string }[] = [];

  loadRoles() {
  this.roleService.getAll().subscribe(res => {
    this.roleList = res.data;
  });
}

loadDonVi() {

  this.donViLoading = true;

  this.donViService.getAll().subscribe({

    next: (res:any) => {

      this.donViList = res.data;

      this.donViLoading = false;

    },

    error: () => {

      this.donViLoading = false;

    }

  });

}

  // === CRUD Modal ===

  showAddModal(): void {

  this.isEditing = false;

  this.editingUser = {
    username: '',
    email: '',
    fullName: '',
    password: '',
    age: null,
    enabled: true,
    donViId: null
  };
  this.selectedRoleId = 0;
this.loadRoles();
this.loadDonVi();

this.isAddModalVisible = true;
}

  // handleModalOk(): void{
  //   this.modalLoading = true;
  //   if (this.isEditing) {
  //     this.userService.update(this.editingUser.id, {
  //       username: this.editingUser.username,
  //       email: this.editingUser.email,
  //       fullName: this.editingUser.fullName,
  //       age: this.editingUser.age
  //     }).subscribe({
  //       next: () => {this.isViewModalVisible = false; this.modalLoading = false; this.loadData();},
  //       error: () => { this.modalLoading = false; }
  //     });
  //   } else {
  //     this.userService.create({
  //       username: this.editingUser.username,
  //       email: this.editingUser.email,
  //       fullName: this.editingUser.fullName,
  //       age: this.editingUser.age,
  //       password: this.editingUser.password,
  //       enabled: true
  //     }).subscribe({
  //       next: () => { this.isAddModalVisible = false; this.modalLoading = false; this.loadData(); },
  //       error: () => { this.modalLoading = false; }
  //     });
  //   }

  // }

  handleAdd() {

  this.modalLoading = true;

  this.userService.create({

    username: this.editingUser.username,
    email: this.editingUser.email,
    fullName: this.editingUser.fullName,
    password: this.editingUser.password,
    age: this.editingUser.age,
    enabled: this.editingUser.enabled,
    donViId: this.editingUser.donViId,
    // roleId: this.selectedRoleId

  }).subscribe({

    next: () => {

      this.modalLoading = false;

      this.isAddModalVisible = false;

      this.loadData();

    },

    error: () => {

      this.modalLoading = false;

    }

  });

}

  viewUser(user: User): void {
  this.editingUser = { ...user };
  this.isEditing = false;
  this.isViewModalVisible = true;
}

// editUser(user: User): void {
//   this.editingUser = { ...user };
//   this.isEditing = true;
//   this.isEditModalVisible = true;
// }

editUser(user: User) {
  console.log('USER CLICK EDIT:', user);

  this.isEditModalVisible = true;

  this.editingUser = { ...user };

  console.log('EDITING USER AFTER COPY:', this.editingUser);
  console.log('DONVI ID:', this.editingUser.donViId);

  this.loadDonVi();
  this.loadRoles();

  this.userService.getUserRoles(user.id!).subscribe(res => {
    console.log('USER ROLES API:', res);

    if (res.data.length > 0) {
      this.selectedRoleId = res.data[0].id;
      console.log('SELECTED ROLE:', this.selectedRoleId);
    }
  });
}

// editUser(user: User) {

//   this.isEditModalVisible = true;

//   this.editingUser = {
//     ...user
//   };

//   // load đơn vị
//   this.loadDonVi();

//   // load tất cả role
//   this.loadRoles();

//   // load role hiện tại của user
//   this.userService.getUserRoles(user.id!).subscribe(res => {

//       if(res.data.length > 0){
//           this.selectedRoleId = res.data[0].id;
//       }
//       this.isEditModalVisible = true;

//   });

// }

// deleteUser(id: number): void {
//   this.userService.delete(id).subscribe({
//     next: () => this.loadData(),
//     error: err => console.error(err)
//   });
// }
showDelete(user:User){

    this.deleteId=user.id!;

    this.editingUser=user;

    this.isDeleteModalVisible=true;

}
confirmDelete(){

    this.userService.delete(this.deleteId).subscribe({

        next:()=>{

            this.isDeleteModalVisible=false;

            this.loadData();

        }

    });

}

handleEdit() {

  this.modalLoading = true;

  this.userService.update(

    this.editingUser.id,

    {

      username: this.editingUser.username,
      email: this.editingUser.email,
      fullName: this.editingUser.fullName,
      age: this.editingUser.age,
      enabled: this.editingUser.enabled,
      donViId: this.editingUser.donViId,
      // roleId: this.selectedRoleId

    }

  ).subscribe({

    next: () => {

      this.modalLoading = false;

      this.isEditModalVisible = false;

      this.loadData();

    },

    error: () => {

      this.modalLoading = false;

    }

  });

}

onSearchChange(value: string): void {
  this.searchSubject.next(value);
}

search(keyword: string): void {

  this.loading = true;

  this.userService.searchPaged(
    keyword,
    this.pageIndex,
    this.pageSize
)
.subscribe({
    next: (page) => {

        this.displayData = page.content;
        this.total = page.totalElements;
        this.loading = false;

    },

    error: () => {

        this.loading = false;

    }
});

}




}