import { Component, OnInit } from '@angular/core';

export interface User {
  tenDangNhap: string;
  hoTen: string;
  soCancuoc: string;
  soDienThoai: string;
  donVi: string;
  chucDanh: string;
  trangThai: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  // Search & Filter
  searchText = '';
  selectedCoQuan: string | null = null;
  selectedTrangThai: string | null = null;
  selectedVaiTro: string | null = null;

  // Pagination
  pageIndex = 1;
  pageSize = 10;

  // Data
  allData: User[] = [];
  filteredData: User[] = [];
  displayData: User[] = [];

  // Filter options

  coQuanL: any = [

  ]


  coQuanList: string[] = [
    'Sở Nội vụ',
    'Văn phòng Hội đồng nhân dân và Ủy ban nhân dân',
    'Phòng Kiểm tra Nông nghiệp và môi trường',
    'Phòng theo dõi công tác tiếp công dân và xử lý đơn',
    'Phòng HC-TC',
    'Phòng Tiếp công dân và Xử lý đơn',
    'Văn phòng Ban Nội chính Thành ủy',
    'Văn Phòng',
    'Văn phòng Đảng ủy xã Yên',
    'Sở Tư pháp',
    'Sở Tài chính',
    'Sở Giáo dục và Đào tạo',
    'UBND Quận Hoàn Kiếm',
    'UBND Huyện Gia Lâm'
  ];

  vaiTroList: string[] = [
    'Chuyên viên',
    'Cán bộ tiếp công dân',
    'Văn thư',
    'Lãnh đạo',
    'Quản trị viên',
    'Trưởng phòng',
    'Phó phòng'
  ];

  constructor() { }

  ngOnInit(): void {
    this.initMockData();
    this.filteredData = [...this.allData];
    this.updateDisplayData();
  }

  initMockData(): void {
    this.allData = [
      { tenDangNhap: '001180015387', hoTen: 'Nguyễn Thị Thu Hoa', soCancuoc: '001180015387', soDienThoai: '0912620272', donVi: 'Sở Nội vụ', chucDanh: 'Chuyên viên', trangThai: 'Hoạt động' },
      { tenDangNhap: '001082035427', hoTen: 'Nguyễn Anh Tuấn', soCancuoc: '001082035427', soDienThoai: '0912142464', donVi: 'Văn phòng Hội đồng nhân dân và Ủy ban nhân dân', chucDanh: 'Chuyên viên', trangThai: 'Hoạt động' },
      { tenDangNhap: '001075014662', hoTen: 'Uông Hồng Thắng', soCancuoc: '001075014662', soDienThoai: '0989992359', donVi: 'Phòng Kiểm tra Nông nghiệp và môi trường', chucDanh: 'Chuyên viên', trangThai: 'Hoạt động' },
      { tenDangNhap: 'hoalu_ninhbinh_tcd', hoTen: 'Vũ Văn An', soCancuoc: '036085002151', soDienThoai: '', donVi: 'Phòng theo dõi công tác tiếp công dân và xử lý đơn', chucDanh: 'Cán bộ tiếp công dân', trangThai: 'Hoạt động' },
      { tenDangNhap: '027172000076', hoTen: 'Trần Thị Mơ', soCancuoc: '027172000076', soDienThoai: '0912 502 888', donVi: 'Phòng HC-TC', chucDanh: 'Chuyên viên', trangThai: 'Hoạt động' },
      { tenDangNhap: '001303020922', hoTen: 'Đinh Ngọc Anh', soCancuoc: '001303020922', soDienThoai: '', donVi: 'Phòng Tiếp công dân và Xử lý đơn', chucDanh: 'Chuyên viên', trangThai: 'Hoạt động' },
      { tenDangNhap: '001199023398', hoTen: 'Cao Thị Danh Trà', soCancuoc: '001199023398', soDienThoai: '', donVi: 'Văn phòng Ban Nội chính Thành ủy', chucDanh: 'Văn thư', trangThai: 'Hoạt động' },
      { tenDangNhap: '033176006918', hoTen: 'Lê Thu Hằng', soCancuoc: '033176006918', soDienThoai: '0903249470', donVi: 'Văn Phòng', chucDanh: 'Chuyên viên', trangThai: 'Hoạt động' },
      { tenDangNhap: '001089045123', hoTen: 'Phạm Văn Đức', soCancuoc: '001089045123', soDienThoai: '0987654321', donVi: 'Sở Tư pháp', chucDanh: 'Trưởng phòng', trangThai: 'Hoạt động' },
      { tenDangNhap: '001090078456', hoTen: 'Hoàng Minh Tuệ', soCancuoc: '001090078456', soDienThoai: '0976543210', donVi: 'Sở Tài chính', chucDanh: 'Phó phòng', trangThai: 'Hoạt động' },
      { tenDangNhap: '036185009876', hoTen: 'Lý Thị Mai', soCancuoc: '036185009876', soDienThoai: '0965432109', donVi: 'Sở Giáo dục và Đào tạo', chucDanh: 'Chuyên viên', trangThai: 'Khóa' },
      { tenDangNhap: '027088007654', hoTen: 'Đỗ Quang Huy', soCancuoc: '027088007654', soDienThoai: '0954321098', donVi: 'UBND Quận Hoàn Kiếm', chucDanh: 'Lãnh đạo', trangThai: 'Hoạt động' },
      { tenDangNhap: '001195004321', hoTen: 'Bùi Thị Lan Anh', soCancuoc: '001195004321', soDienThoai: '0943210987', donVi: 'UBND Huyện Gia Lâm', chucDanh: 'Chuyên viên', trangThai: 'Hoạt động' },
      { tenDangNhap: '033179008765', hoTen: 'Trịnh Văn Bình', soCancuoc: '033179008765', soDienThoai: '0932109876', donVi: 'Sở Nội vụ', chucDanh: 'Quản trị viên', trangThai: 'Hoạt động' },
      { tenDangNhap: '001286003456', hoTen: 'Vương Thị Hồng', soCancuoc: '001286003456', soDienThoai: '0921098765', donVi: 'Phòng HC-TC', chucDanh: 'Văn thư', trangThai: 'Khóa' },
      { tenDangNhap: '036092001234', hoTen: 'Ngô Đình Tùng', soCancuoc: '036092001234', soDienThoai: '0910987654', donVi: 'Văn phòng Hội đồng nhân dân và Ủy ban nhân dân', chucDanh: 'Trưởng phòng', trangThai: 'Hoạt động' },
      { tenDangNhap: '027183005678', hoTen: 'Phan Thị Ngọc', soCancuoc: '027183005678', soDienThoai: '0909876543', donVi: 'Sở Tư pháp', chucDanh: 'Chuyên viên', trangThai: 'Hoạt động' },
      { tenDangNhap: '001091006789', hoTen: 'Lê Hoàng Nam', soCancuoc: '001091006789', soDienThoai: '0898765432', donVi: 'Sở Tài chính', chucDanh: 'Chuyên viên', trangThai: 'Hoạt động' },
      { tenDangNhap: '033175003210', hoTen: 'Đặng Thị Kim', soCancuoc: '033175003210', soDienThoai: '0887654321', donVi: 'Phòng Kiểm tra Nông nghiệp và môi trường', chucDanh: 'Phó phòng', trangThai: 'Hoạt động' },
      { tenDangNhap: '036091007890', hoTen: 'Tạ Văn Long', soCancuoc: '036091007890', soDienThoai: '0876543210', donVi: 'Văn phòng Đảng ủy xã Yên', chucDanh: 'Cán bộ tiếp công dân', trangThai: 'Khóa' },
      { tenDangNhap: '001184002345', hoTen: 'Mai Thị Thanh', soCancuoc: '001184002345', soDienThoai: '0865432109', donVi: 'Sở Giáo dục và Đào tạo', chucDanh: 'Lãnh đạo', trangThai: 'Hoạt động' },
      { tenDangNhap: '027087004567', hoTen: 'Hồ Quốc Việt', soCancuoc: '027087004567', soDienThoai: '0854321098', donVi: 'UBND Quận Hoàn Kiếm', chucDanh: 'Chuyên viên', trangThai: 'Hoạt động' },
      { tenDangNhap: '001292005678', hoTen: 'Nguyễn Thị Bích Ngọc', soCancuoc: '001292005678', soDienThoai: '0843210987', donVi: 'UBND Huyện Gia Lâm', chucDanh: 'Văn thư', trangThai: 'Hoạt động' },
      { tenDangNhap: '033178001234', hoTen: 'Lưu Văn Thành', soCancuoc: '033178001234', soDienThoai: '0832109876', donVi: 'Phòng Tiếp công dân và Xử lý đơn', chucDanh: 'Trưởng phòng', trangThai: 'Hoạt động' },
    ];
  }

  onSearch(): void {
    this.pageIndex = 1;
    this.filteredData = this.allData.filter(user => {
      const matchText = !this.searchText ||
        user.hoTen.toLowerCase().includes(this.searchText.toLowerCase()) ||
        user.tenDangNhap.toLowerCase().includes(this.searchText.toLowerCase()) ||
        user.soCancuoc.includes(this.searchText) ||
        user.soDienThoai.includes(this.searchText);

      const matchCoQuan = !this.selectedCoQuan || user.donVi === this.selectedCoQuan;
      const matchTrangThai = !this.selectedTrangThai || user.trangThai === this.selectedTrangThai;
      const matchVaiTro = !this.selectedVaiTro || user.chucDanh === this.selectedVaiTro;

      return matchText && matchCoQuan && matchTrangThai && matchVaiTro;
    });

    this.updateDisplayData();
  }

  onReset(): void {
    this.searchText = '';
    this.selectedCoQuan = null;
    this.selectedTrangThai = null;
    this.selectedVaiTro = null;
    this.pageIndex = 1;
    this.filteredData = [...this.allData];
    this.updateDisplayData();
  }

  onPageChange(page: number): void {
    this.pageIndex = page;
    this.updateDisplayData();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.pageIndex = 1;
    this.updateDisplayData();
  }

  updateDisplayData(): void {
    const start = (this.pageIndex - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayData = this.filteredData.slice(start, end);
  }

  addUser(): void {
    console.log('Thêm mới người dùng');
    // TODO: Open modal or navigate to add user form
  }

  viewUser(user: User): void {
    console.log('Xem chi tiết:', user);
    // TODO: Open detail modal
  }

  editUser(user: User): void {
    console.log('Chỉnh sửa:', user);
    // TODO: Open edit modal
  }

  deleteUser(user: User): void {
    this.allData = this.allData.filter(u => u.tenDangNhap !== user.tenDangNhap);
    this.onSearch(); // Re-filter after deletion
    console.log('Đã xóa:', user.hoTen);
  }
}