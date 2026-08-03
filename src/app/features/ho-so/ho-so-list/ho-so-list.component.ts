import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HoSo, HoSoService, LoaiHoSo } from '../../../core/services/ho-so.service';
import { UserService } from '../../../core/services/user.service';
import { NzDateMode } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-ho-so-list',
  templateUrl: './ho-so-list.component.html',
  styleUrls: ['./ho-so-list.component.scss']
})
export class HoSoListComponent implements OnInit {
  hoSoList: HoSo[] = [];
  filteredList: HoSo[] = [];
  loaiHoSoOptions: LoaiHoSo[] = [];
  allUsers: any[] = [];
  loading = false;

  // Search
  searchKeyword = '';
  filterLoai = '';
  filterTrangThai = '';
  filterDoUuTien = '';

  // Pagination
  pageIndex = 1;
  pageSize = 10;

  // Modal tạo/sửa
  isModalVisible = false;
  isEditMode = false;
  editingId: number | null = null;
  modalLoading = false;
  hoSoForm!: FormGroup;

  // Modal phân công
  isPhanCongVisible = false;
  phanCongHoSoId: number | null = null;
  selectedNguoiXuLyId: number | null = null;

  readonly TRANG_THAI_OPTIONS = [
    { value: 'TIEP_NHAN', label: 'Tiếp nhận', color: 'blue' },
    { value: 'DANG_XU_LY', label: 'Đang xử lý', color: 'gold' },
    { value: 'CHO_PHE_DUYET', label: 'Chờ phê duyệt', color: 'orange' },
    { value: 'DA_PHE_DUYET', label: 'Đã phê duyệt', color: 'green' },
    { value: 'TU_CHOI', label: 'Từ chối', color: 'red' },
    { value: 'YEU_CAU_BO_SUNG', label: 'Cần bổ sung', color: 'purple' },
    { value: 'HOAN_THANH', label: 'Hoàn thành', color: 'cyan' },
  ];

  readonly UU_TIEN_OPTIONS = [
    { value: 'Khan', label: '🔴 Khẩn', color: 'red' },
    { value: 'Binh_Thuong', label: '🔵 Bình thường', color: 'blue' },
  ];

  constructor(
    private hoSoService: HoSoService,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private msg: NzMessageService
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadData();
    this.loadLoaiHoSo();
    this.loadUsers();
  }
readonly hanXuLyMode = signal<NzDateMode>('date');
  initForm() {
    this.hoSoForm = this.fb.group({
      tieuDe: ['', [Validators.required]],
      loaiHoSo: ['', [Validators.required]],
      doUuTien: ['Binh_Thuong'],
      nguonTiepNhan: ['ONLINE'],
      hanXuLy: [null],
      noiDung: [''],
      ghiChu: [''],
    });
  }

  loadData() {
    this.loading = true;
    this.hoSoService.getAll().subscribe({
      next: (data) => { this.hoSoList = data; this.applyFilter(); this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  loadLoaiHoSo() {
    this.hoSoService.getLoaiHoSoActive().subscribe(data => this.loaiHoSoOptions = data);
  }

  loadUsers() {
    this.userService.getAll().subscribe(data => this.allUsers = data);
  }

  applyFilter() {
    this.filteredList = this.hoSoList.filter(h => {
      const matchKw = !this.searchKeyword ||
        h.tieuDe?.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
        h.soHoSo?.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
        h.nguoiNopFullName?.toLowerCase().includes(this.searchKeyword.toLowerCase());
      const matchLoai = !this.filterLoai || h.loaiHoSo === this.filterLoai;
      const matchTT = !this.filterTrangThai || h.trangThai === this.filterTrangThai;
      const matchUuTien = !this.filterDoUuTien || h.doUuTien === this.filterDoUuTien;
      return matchKw && matchLoai && matchTT && matchUuTien;
    });
    this.pageIndex = 1;
  }

  get displayData(): HoSo[] {
    const start = (this.pageIndex - 1) * this.pageSize;
    return this.filteredList.slice(start, start + this.pageSize);
  }

  onReset() {
    this.searchKeyword = ''; this.filterLoai = '';
    this.filterTrangThai = ''; this.filterDoUuTien = '';
    this.applyFilter();
  }

  viewDetail(id: number) {
    this.router.navigate(['/ho-so', id]);
  }

  showAddModal() {
    this.isEditMode = false; this.editingId = null;
    this.hoSoForm.reset({ doUuTien: 'Binh_Thuong', nguonTiepNhan: 'ONLINE' });
    this.isModalVisible = true;
  }

  showEditModal(hs: HoSo) {
    this.isEditMode = true; this.editingId = hs.id;
    this.hoSoForm.patchValue({
      tieuDe: hs.tieuDe, loaiHoSo: hs.loaiHoSo,
      doUuTien: hs.doUuTien, nguonTiepNhan: hs.nguonTiepNhan,
      hanXuLy: hs.hanXuLy ? new Date(hs.hanXuLy) : null,
      noiDung: hs.noiDung, ghiChu: hs.ghiChu,
    });
    this.isModalVisible = true;
  }

  handleSave() {
    if (this.hoSoForm.invalid) { Object.values(this.hoSoForm.controls).forEach(c => c.markAsDirty()); return; }
    this.modalLoading = true;
    const val = this.hoSoForm.value;
    const obs = this.isEditMode
      ? this.hoSoService.update(this.editingId!, val)
      : this.hoSoService.create(val);
    obs.subscribe({
      next: () => {
        this.msg.success(this.isEditMode ? 'Cập nhật thành công!' : 'Tạo hồ sơ thành công!');
        this.isModalVisible = false; this.modalLoading = false; this.loadData();
      },
      error: (e) => { this.msg.error(e?.error?.message || 'Có lỗi xảy ra'); this.modalLoading = false; }
    });
  }

  handleCancel() { this.isModalVisible = false; }

openPhanCong(hs: HoSo) {
  this.phanCongHoSoId = hs.id;
  this.selectedNguoiXuLyId = hs.nguoiXuLyId || null;

  this.loadNguoiXuLy(1);

  this.isPhanCongVisible = true;
}

  handlePhanCong() {
    if (!this.selectedNguoiXuLyId || !this.phanCongHoSoId) return;
    this.hoSoService.phanCong(this.phanCongHoSoId, this.selectedNguoiXuLyId).subscribe({
      next: () => { this.msg.success('Phân công thành công!'); this.isPhanCongVisible = false; this.loadData(); },
      error: (e) => this.msg.error(e?.error?.message || 'Lỗi phân công')
    });
  }

  xoaHoSo(id: number) {
    this.hoSoService.delete(id).subscribe({
      next: () => { this.msg.success('Đã xóa hồ sơ'); this.loadData(); },
      error: (e) => this.msg.error(e?.error?.message || 'Không thể xóa')
    });
  }

  getTrangThaiInfo(tt: string) {
    return this.TRANG_THAI_OPTIONS.find(o => o.value === tt) || { label: tt, color: 'default' };
  }

  getUuTienInfo(ut: string) {
    return this.UU_TIEN_OPTIONS.find(o => o.value === ut) || { label: ut, color: 'default' };
  }

  loadNguoiXuLy(roleId: number) {
  this.userService.getNguoiXuLy(roleId).subscribe({
    next: data => this.allUsers = data,
    error: err => this.msg.error(err.error?.message || 'Không tải được danh sách người xử lý')
  });
}
}
