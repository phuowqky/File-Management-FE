import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HoSo, HoSoService } from 'src/app/core/services/ho-so.service';

@Component({
  selector: 'app-ho-so-cua-toi',
  templateUrl: './ho-so-cua-toi.component.html',
  styleUrls: ['./ho-so-cua-toi.component.scss']
})
export class HoSoCuaToiComponent {

    tabIndex = 0;
  daNop: HoSo[] = [];
  dangXuLy: HoSo[] = [];
  choPheduyet: HoSo[] = [];
  hoanThanh: HoSo[] = [];
  tuChoi: HoSo[] = [];
  loading = false;

  readonly TRANG_THAI_MAP: { [k: string]: { label: string; color: string } } = {
    TIEP_NHAN: { label: 'Tiếp nhận', color: 'blue' },
    DANG_XU_LY: { label: 'Đang xử lý', color: 'gold' },
    CHO_PHE_DUYET: { label: 'Chờ phê duyệt', color: 'orange' },
    DA_PHE_DUYET: { label: 'Đã phê duyệt', color: 'green' },
    TU_CHOI: { label: 'Từ chối', color: 'red' },
    YEU_CAU_BO_SUNG: { label: 'Cần bổ sung', color: 'purple' },
    HOAN_THANH: { label: 'Hoàn thành', color: 'cyan' },
  };

  constructor(private hoSoService: HoSoService, private router: Router) {}

  ngOnInit() { this.loadAll(); }

  loadAll() {
    this.loading = true;
    this.hoSoService.getCuaToi().subscribe({ next: d => { this.daNop = d; this.loading = false; }, error: () => this.loading = false });
    this.hoSoService.getDangXuLy().subscribe(d => this.dangXuLy = d);
    this.hoSoService.getChoPheduyet().subscribe(d => this.choPheduyet = d);
  }

  viewDetail(id: number) { this.router.navigate(['/ho-so', id]); }
}
