/**
 * Interface chung cho kết quả phân trang server-side.
 * Map với PageResponse<T> từ backend.
 */
// export interface PageResult<T> {
//   content: T[];
//   page: number;           // trang hiện tại (0-based từ backend)
//   size: number;           // số bản ghi mỗi trang
//   totalElements: number;  // tổng số bản ghi
//   totalPages: number;     // tổng số trang
// }

export interface PageResult<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}