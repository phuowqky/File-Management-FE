import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { HoSo, HoSoService } from "src/app/core/services/ho-so.service";


@Component({
  selector: 'app-cho-phe-duyet',
  templateUrl: './cho-phe-duyet.component.html',
  styleUrls: ['./cho-phe-duyet.component.scss']
})
export class ChoPheDuyetComponent implements OnInit {
  hoSoList: HoSo[] = [];
  loading = false;
  stats = { choDuyet: 0, daDuyet: 0, tuChoi: 0 };

  // Modal phê duyệt / từ chối
  isModalVisible = false;
  actionType: 'phe-duyet' | 'tu-choi' | 'bo-sung' = 'phe-duyet';
  selectedHoSo: HoSo | null = null;
  actionText = '';
  actionLoading = false;

  constructor(
    private hoSoService: HoSoService,
    private router: Router,
    private msg: NzMessageService
  ) {}

  ngOnInit() { this.loadData(); this.loadStats(); }

  loadData() {
    this.loading = true;
    this.hoSoService.getChoPheduyet().subscribe({
      next: d => { this.hoSoList = d.sort((a, b) => (a.doUuTien === 'Khan' ? -1 : 1)); this.loading = false; },
      error: () => this.loading = false
    });
  }

  loadStats() {
    this.hoSoService.thongKeTrangThai().subscribe(data => {
      this.stats.choDuyet = data['CHO_PHE_DUYET'] || 0;
      this.stats.daDuyet = data['DA_PHE_DUYET'] || 0;
      this.stats.tuChoi = data['TU_CHOI'] || 0;
    });
  }

  viewDetail(id: number) { this.router.navigate(['/ho-so', id]); }

  openAction(hs: HoSo, type: typeof this.actionType) {
    this.selectedHoSo = hs; this.actionType = type;
    this.actionText = ''; this.isModalVisible = true;
  }

  handleAction() {
    if (!this.selectedHoSo) return;
    if ((this.actionType === 'tu-choi' || this.actionType === 'bo-sung') && !this.actionText) {
      this.msg.warning('Vui lòng nhập nội dung'); return;
    }
    this.actionLoading = true;
    const id = this.selectedHoSo.id;
    const obs = this.actionType === 'phe-duyet'
      ? this.hoSoService.pheDuyet(id, this.actionText)
      : this.actionType === 'tu-choi'
        ? this.hoSoService.tuChoi(id, this.actionText)
        : this.hoSoService.yeuCauBoSung(id, this.actionText);

    obs.subscribe({
      next: () => {
        this.msg.success('Thao tác thành công!');
        this.isModalVisible = false; this.actionLoading = false;
        this.loadData(); this.loadStats();
      },
      error: (e) => { this.msg.error(e?.error?.message || 'Lỗi'); this.actionLoading = false; }
    });
  }

  getWaitTime(ngayNop: string): string {
    if (!ngayNop) return '';
    const diff = Math.floor((Date.now() - new Date(ngayNop).getTime()) / 86400000);
    return diff > 0 ? `${diff} ngày` : 'Hôm nay';
  }
}
