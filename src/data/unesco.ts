import type { UnescoStat } from "../types";

/**
 * Cấu trúc dữ liệu, dễ cập nhật khi UNESCO ghi danh thêm di sản mới
 * mà không cần sửa giao diện.
 */
export const unescoStats: UnescoStat[] = [
  {
    id: "world-heritage",
    value: 9,
    suffix: "",
    label: "Di sản văn hóa & thiên nhiên thế giới",
  },
  {
    id: "intangible-heritage",
    value: 16,
    suffix: "+",
    label: "Di sản văn hóa phi vật thể đại diện nhân loại",
  },
  {
    id: "documentary-heritage",
    value: 7,
    suffix: "+",
    label: "Di sản tư liệu thuộc Chương trình Ký ức Thế giới",
  },
  {
    id: "years",
    value: 4000,
    suffix: "+",
    label: "Năm lịch sử được lưu truyền",
  },
];
