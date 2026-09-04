import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DonVi, DonViService } from 'src/app/core/services/donvi.service';


interface BreadcrumbItem {
    id: number | null;  // null = trang gốc
    tenDonVi: string;
}

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit{

donViList: DonVi[] = [];
loading = false;

constructor(private donViService: DonViService) {}

ngOnInit(): void {
  this.getAllDonVi();
}

getAllDonVi(): void {
  this.loading = true;

  this.donViService.getAll().subscribe({
    next: (res) => {
      this.donViList = res.data;
      this.loading = false;
    },
    error: (err) => {
      console.error('Lỗi khi lấy danh sách đơn vị:', err);
      this.loading = false;
    }
  });
}


}
