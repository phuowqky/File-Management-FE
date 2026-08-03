import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HoSo, HoSoService, LichSuXuLy, NhanXet, LoaiHoSo } from '../../../core/services/ho-so.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-ho-so-detail',
  templateUrl: './ho-so-detail.component.html',
  styleUrls: ['./ho-so-detail.component.scss']
})
export class HoSoDetailComponent implements OnInit {
  hoSo: HoSo | null = null;
  lichSu: LichSuXuLy[] = [];
  nhanXetList: NhanXet[] = [];
  allUsers: any[] = [];
  loading = false;

  // Nhận xét
  newComment = '';
  commentLoading = false;

  // Modal hành động
  isActionModalVisible = false;
  actionType: 'phe-duyet' | 'tu-choi' | 'bo-sung' | 'phan-cong' | 'hoan-thanh' = 'phe-duyet';
  actionReason = '';
  actionKetQua = '';
  selectedNguoiXuLyId: number | null = null;
  actionLoading = false;

  readonly TRANG_THAI_STEPS = [
    { key: 'TIEP_NHAN', label: 'Tiếp nhận', icon: 'file-add' },
    { key: 'DANG_XU_LY', label: 'Đang xử lý', icon: 'edit' },
    { key: 'CHO_PHE_DUYET', label: 'Chờ phê duyệt', icon: 'hourglass' },
    { key: 'DA_PHE_DUYET', label: 'Phê duyệt', icon: 'check-circle' },
    { key: 'HOAN_THANH', label: 'Hoàn thành', icon: 'trophy' },
  ];

  readonly TRANG_THAI_MAP: { [key: string]: { label: string; color: string } } = {
    TIEP_NHAN: { label: 'Tiếp nhận', color: 'blue' },
    DANG_XU_LY: { label: 'Đang xử lý', color: 'gold' },
    CHO_PHE_DUYET: { label: 'Chờ phê duyệt', color: 'orange' },
    DA_PHE_DUYET: { label: 'Đã phê duyệt', color: 'green' },
    TU_CHOI: { label: 'Từ chối', color: 'red' },
    YEU_CAU_BO_SUNG: { label: 'Cần bổ sung', color: 'purple' },
    HOAN_THANH: { label: 'Hoàn thành', color: 'cyan' },
  };

  readonly HANH_DONG_MAP: { [key: string]: { label: string; icon: string; color: string } } = {
    TAO_HO_SO: { label: 'Tạo hồ sơ', icon: 'file-add', color: '#1890ff' },
    PHAN_CONG: { label: 'Phân công xử lý', icon: 'user-add', color: '#722ed1' },
    TRINH_LANH_DAO: { label: 'Trình lãnh đạo', icon: 'send', color: '#fa8c16' },
    PHE_DUYET: { label: 'Phê duyệt', icon: 'check-circle', color: '#52c41a' },
    TU_CHOI: { label: 'Từ chối', icon: 'close-circle', color: '#ff4d4f' },
    YEU_CAU_BO_SUNG: { label: 'Yêu cầu bổ sung', icon: 'exclamation-circle', color: '#722ed1' },
    CAP_NHAT: { label: 'Cập nhật thông tin', icon: 'edit', color: '#13c2c2' },
    HOAN_THANH: { label: 'Hoàn thành', icon: 'trophy', color: '#52c41a' },
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hoSoService: HoSoService,
    private userService: UserService,
    private msg: NzMessageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p['id']) { this.loadDetail(+p['id']); }
    });
    this.userService.getAll().subscribe(data => this.allUsers = data);
  }

  loadDetail(id: number) {
    this.loading = true;
    this.hoSoService.getById(id).subscribe({
      next: (data) => { this.hoSo = data; this.loading = false; this.loadLichSu(id); this.loadNhanXet(id); },
      error: () => { this.loading = false; this.router.navigate(['/ho-so']); }
    });
  }

  loadLichSu(id: number) {
    this.hoSoService.getLichSu(id).subscribe(data => this.lichSu = data);
  }

  loadNhanXet(id: number) {
    this.hoSoService.getNhanXet(id).subscribe(data => this.nhanXetList = data);
  }

  getCurrentStepIndex(): number {
    if (!this.hoSo) return 0;
    const tt = this.hoSo.trangThai;
    if (tt === 'TU_CHOI' || tt === 'YEU_CAU_BO_SUNG') return 2;
    const idx = this.TRANG_THAI_STEPS.findIndex(s => s.key === tt);
    return idx >= 0 ? idx : 0;
  }

  getStepStatus(stepKey: string): string {
    if (!this.hoSo) return 'wait';
    const tt = this.hoSo.trangThai;
    if (tt === 'TU_CHOI' && stepKey === 'DA_PHE_DUYET') return 'error';
    const stepIdx = this.TRANG_THAI_STEPS.findIndex(s => s.key === stepKey);
    const currIdx = this.getCurrentStepIndex();
    if (stepIdx < currIdx) return 'finish';
    if (stepIdx === currIdx) return 'process';
    return 'wait';
  }

  // Hành động
  openAction(type: typeof this.actionType) {
    this.actionType = type;
    this.actionReason = ''; this.actionKetQua = '';
    this.loadNguoiXuLy(1);
    this.selectedNguoiXuLyId = this.hoSo?.nguoiXuLyId || null;
    this.isActionModalVisible = true;
  }

  handleAction() {
    if (!this.hoSo) return;
    this.actionLoading = true;
    const id = this.hoSo.id;
    let obs;

    switch (this.actionType) {
      case 'phan-cong':
        if (!this.selectedNguoiXuLyId) { this.msg.warning('Vui lòng chọn cán bộ'); this.actionLoading = false; return; }
        obs = this.hoSoService.phanCong(id, this.selectedNguoiXuLyId);
        break;
      case 'phe-duyet':
        obs = this.hoSoService.pheDuyet(id, this.actionKetQua);
        break;
      case 'tu-choi':
        if (!this.actionReason) { this.msg.warning('Vui lòng nhập lý do'); this.actionLoading = false; return; }
        obs = this.hoSoService.tuChoi(id, this.actionReason);
        break;
      case 'bo-sung':
        if (!this.actionReason) { this.msg.warning('Vui lòng nhập nội dung cần bổ sung'); this.actionLoading = false; return; }
        obs = this.hoSoService.yeuCauBoSung(id, this.actionReason);
        break;
      case 'hoan-thanh':
        obs = this.hoSoService.hoanThanh(id);
        break;
      default: this.actionLoading = false; return;
    }

    obs.subscribe({
      next: (data) => {
        this.hoSo = data; this.msg.success('Thao tác thành công!');
        this.isActionModalVisible = false; this.actionLoading = false;
        this.loadLichSu(id); this.loadNhanXet(id);
      },
      error: (e) => { this.msg.error(e?.error?.message || 'Có lỗi xảy ra'); this.actionLoading = false; }
    });
  }

  chuyenChoPheDuyet() {
    if (!this.hoSo) return;
    this.hoSoService.chuyenChoPheduyet(this.hoSo.id).subscribe({
      next: (data) => { this.hoSo = data; this.msg.success('Đã chuyển chờ phê duyệt!'); this.loadLichSu(this.hoSo.id); },
      error: (e) => this.msg.error(e?.error?.message || 'Lỗi')
    });
  }

  addComment() {
    if (!this.newComment.trim() || !this.hoSo) return;
    this.commentLoading = true;
    this.hoSoService.themNhanXet(this.hoSo.id, this.newComment).subscribe({
      next: (data) => { this.nhanXetList.push(data); this.newComment = ''; this.commentLoading = false; },
      error: () => this.commentLoading = false
    });
  }

  getHanhDongInfo(hd: string) {
    return this.HANH_DONG_MAP[hd] || { label: hd, icon: 'info-circle', color: '#1890ff' };
  }

    loadNguoiXuLy(roleId: number) {
  this.userService.getNguoiXuLy(roleId).subscribe({
    next: data => this.allUsers = data,
    error: err => this.msg.error(err.error?.message || 'Không tải được danh sách người xử lý')
  });
}

  goBack() { this.router.navigate(['/ho-so']); }

  
}
