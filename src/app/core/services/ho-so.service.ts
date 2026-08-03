import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environments';


export interface HoSo {
  id: number;
  soHoSo: string;
  tieuDe: string;
  loaiHoSo: string;
  noiDung: string;
  ghiChu: string;
  trangThai: string;
  doUuTien: string;
  hanXuLy: string;
  ketQua: string;
  nguonTiepNhan: string;
  quaHan: boolean;
  ngayNop: string;
  ngayXuLy: string;
  ngayPheDuyet: string;
  lyDoTuChoi: string;
  createdAt: string;
  updatedAt: string;
  nguoiNopId: number;
  nguoiNopUsername: string;
  nguoiNopFullName: string;
  nguoiXuLyId: number;
  nguoiXuLyUsername: string;
  nguoiXuLyFullName: string;
  nguoiPheDuyetId: number;
  nguoiPheDuyetUsername: string;
  nguoiPheDuyetFullName: string;
}

export interface LoaiHoSo {
  id: number;
  maLoai: string;
  tenLoai: string;
  moTa: string;
  hanXuLyMacDinh: number;
  trangThai: number;
}

export interface LichSuXuLy {
  id: number;
  hoSoId: number;
  hanhDong: string;
  tuTrangThai: string;
  denTrangThai: string;
  nguoiThucHienId: number;
  nguoiThucHienUsername: string;
  nguoiThucHienFullName: string;
  noiDung: string;
  thoiGian: string;
}

export interface NhanXet {
  id: number;
  hoSoId: number;
  nguoiNhanXetId: number;
  nguoiNhanXetUsername: string;
  nguoiNhanXetFullName: string;
  noiDung: string;
  loai: string;
  thoiGian: string;
}

export interface HoSoRequest {
  tieuDe: string;
  loaiHoSo: string;
  noiDung?: string;
  ghiChu?: string;
  doUuTien?: string;
  hanXuLy?: string;
  nguonTiepNhan?: string;
}

@Injectable({ providedIn: 'root' })
export class HoSoService {
  private readonly BASE = `${environment.apiUrl}/ho-so`;
  private readonly LOAI_BASE = `${environment.apiUrl}/loai-ho-so`;

  constructor(private http: HttpClient) {}

  // ===== HỒ SƠ =====
  getAll(): Observable<HoSo[]> {
    return this.http.get<any>(this.BASE).pipe(map(r => r.data || r));
  }

  getById(id: number): Observable<HoSo> {
    return this.http.get<any>(`${this.BASE}/${id}`).pipe(map(r => r.data || r));
  }

  search(params: any): Observable<HoSo[]> {
    let p = new HttpParams();
    Object.keys(params).forEach(k => { if (params[k] != null && params[k] !== '') p = p.set(k, params[k]); });
    return this.http.get<any>(`${this.BASE}/search`, { params: p }).pipe(map(r => r.data || r));
  }

  create(data: HoSoRequest): Observable<HoSo> {
    return this.http.post<any>(this.BASE, data).pipe(map(r => r.data || r));
  }

  update(id: number, data: HoSoRequest): Observable<HoSo> {
    return this.http.put<any>(`${this.BASE}/${id}`, data).pipe(map(r => r.data || r));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.BASE}/${id}`);
  }

  // Hồ sơ theo tab
  getCuaToi(): Observable<HoSo[]> {
    return this.http.get<any>(`${this.BASE}/cua-toi`).pipe(map(r => r.data || r));
  }

  getDangXuLy(): Observable<HoSo[]> {
    return this.http.get<any>(`${this.BASE}/dang-xu-ly`).pipe(map(r => r.data || r));
  }

  getChoPheduyet(): Observable<HoSo[]> {
    return this.http.get<any>(`${this.BASE}/cho-phe-duyet`).pipe(map(r => r.data || r));
  }

  // Hành động
  phanCong(id: number, nguoiXuLyId: number): Observable<HoSo> {
    return this.http.put<any>(`${this.BASE}/${id}/phan-cong?nguoiXuLyId=${nguoiXuLyId}`, {}).pipe(map(r => r.data || r));
  }

  chuyenChoPheduyet(id: number): Observable<HoSo> {
    return this.http.put<any>(`${this.BASE}/${id}/cho-phe-duyet`, {}).pipe(map(r => r.data || r));
  }

  pheDuyet(id: number, ketQua?: string): Observable<HoSo> {
    let url = `${this.BASE}/${id}/phe-duyet`;
    if (ketQua) url += `?ketQua=${encodeURIComponent(ketQua)}`;
    return this.http.put<any>(url, {}).pipe(map(r => r.data || r));
  }

  tuChoi(id: number, lyDo: string): Observable<HoSo> {
    return this.http.put<any>(`${this.BASE}/${id}/tu-choi?lyDo=${encodeURIComponent(lyDo)}`, {}).pipe(map(r => r.data || r));
  }

  yeuCauBoSung(id: number, lyDo: string): Observable<HoSo> {
    return this.http.put<any>(`${this.BASE}/${id}/yeu-cau-bo-sung?lyDo=${encodeURIComponent(lyDo)}`, {}).pipe(map(r => r.data || r));
  }

  hoanThanh(id: number): Observable<HoSo> {
    return this.http.put<any>(`${this.BASE}/${id}/hoan-thanh`, {}).pipe(map(r => r.data || r));
  }

  // Thống kê
  thongKeTrangThai(): Observable<{ [key: string]: number }> {
    return this.http.get<any>(`${this.BASE}/thong-ke/trang-thai`).pipe(map(r => r.data || r));
  }

  // ===== LỊCH SỬ & NHẬN XÉT =====
  getLichSu(hoSoId: number): Observable<LichSuXuLy[]> {
    return this.http.get<any>(`${this.BASE}/${hoSoId}/lich-su`).pipe(map(r => r.data || r));
  }

  getNhanXet(hoSoId: number): Observable<NhanXet[]> {
    return this.http.get<any>(`${this.BASE}/${hoSoId}/nhan-xet`).pipe(map(r => r.data || r));
  }

  themNhanXet(hoSoId: number, noiDung: string, loai = 'XU_LY'): Observable<NhanXet> {
    return this.http.post<any>(`${this.BASE}/${hoSoId}/nhan-xet`, { noiDung, loai }).pipe(map(r => r.data || r));
  }

  // ===== LOẠI HỒ SƠ =====
  getLoaiHoSoActive(): Observable<LoaiHoSo[]> {
    return this.http.get<any>(`${this.LOAI_BASE}/active`).pipe(map(r => r.data || r));
  }

  getLoaiHoSoAll(): Observable<LoaiHoSo[]> {
    return this.http.get<any>(this.LOAI_BASE).pipe(map(r => r.data || r));
  }

  createLoai(data: any): Observable<LoaiHoSo> {
    return this.http.post<any>(this.LOAI_BASE, data).pipe(map(r => r.data || r));
  }

  updateLoai(id: number, data: any): Observable<LoaiHoSo> {
    return this.http.put<any>(`${this.LOAI_BASE}/${id}`, data).pipe(map(r => r.data || r));
  }

  deleteLoai(id: number): Observable<any> {
    return this.http.delete(`${this.LOAI_BASE}/${id}`);
  }

    getNguoiXuLy(roleId: number): Observable<any[]> {
  return this.http
    .get<any>(`${environment.apiUrl}/users/nguoi-xu-ly?roleId=${roleId}`)
    .pipe(map(res => res.data || []));
}
}
