import type { TimelineEvent } from "../types";

export const timelineEvents: TimelineEvent[] = [
  {
    id: "dong-son",
    year: -1000,
    yearLabel: "~1000 TCN",
    title: "Văn hóa Đông Sơn",
    description:
      "Nền văn minh rực rỡ của người Việt cổ với đỉnh cao là kỹ thuật đúc trống đồng, biểu tượng quyền lực và tín ngưỡng của cư dân đồng bằng Bắc Bộ.",
    relatedHeritageIds: ["trong-dong-dong-son"],
    image:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ef/Dong_Son_Bronze_Drum_09.jpg/1920px-Dong_Son_Bronze_Drum_09.jpg",
  },
  {
    id: "bach-dang",
    year: 938,
    yearLabel: "938",
    title: "Chiến thắng Bạch Đằng",
    description:
      "Ngô Quyền đánh tan quân Nam Hán trên sông Bạch Đằng, chấm dứt hơn một nghìn năm Bắc thuộc, mở ra kỷ nguyên độc lập tự chủ cho dân tộc.",
    image:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/27/Ng%C3%B4_Quy%E1%BB%81n_%C4%91%E1%BA%A1i_ph%C3%A1_qu%C3%A2n_Nam_H%C3%A1n_tr%C3%AAn_s%C3%B4ng_B%E1%BA%A1ch_%C4%90%E1%BA%B1ng.jpg/1920px-Ng%C3%B4_Quy%E1%BB%81n_%C4%91%E1%BA%A1i_ph%C3%A1_qu%C3%A2n_Nam_H%C3%A1n_tr%C3%AAn_s%C3%B4ng_B%E1%BA%A1ch_%C4%90%E1%BA%B1ng.jpg",
  },
  {
    id: "thang-long-event",
    year: 1010,
    yearLabel: "1010",
    title: "Chiếu dời đô — Thăng Long",
    description:
      "Vua Lý Thái Tổ ban \"Chiếu dời đô\", chuyển kinh đô từ Hoa Lư về thành Đại La và đổi tên thành Thăng Long, đặt nền móng cho kinh đô nghìn năm văn hiến.",
    relatedHeritageIds: ["hoang-thanh-thang-long"],
    image:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/eb/Hanoi_Vietnam_%C4%90oan-m%C3%B4n-01.jpg/1920px-Hanoi_Vietnam_%C4%90oan-m%C3%B4n-01.jpg",
  },
  {
    id: "van-mieu-event",
    year: 1070,
    yearLabel: "1070",
    relatedHeritageIds: ["bia-tien-si-van-mieu"],
    title: "Văn Miếu — Quốc Tử Giám",
    description:
      "Vua Lý Thánh Tông cho lập Văn Miếu thờ Khổng Tử; đến năm 1076, Quốc Tử Giám ra đời — trường đại học đầu tiên của Việt Nam, biểu tượng cho nền học vấn Nho giáo.",
    image:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/39/Hanoi_Temple_of_Literature_%28cropped%29.jpg/1920px-Hanoi_Temple_of_Literature_%28cropped%29.jpg",
  },
  {
    id: "nha-ho",
    year: 1397,
    yearLabel: "1397",
    title: "Thành nhà Hồ",
    description:
      "Hồ Quý Ly cho xây dựng tòa thành đá kỳ vĩ tại Thanh Hóa, ứng dụng kỹ thuật xây dựng độc đáo với những phiến đá nặng hàng tấn ghép khít không cần chất kết dính.",
    relatedHeritageIds: ["thanh-nha-ho"],
    image:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/C%E1%BB%95ng_Nam.jpg/1920px-C%E1%BB%95ng_Nam.jpg",
  },
  {
    id: "nguyen-dynasty",
    year: 1802,
    yearLabel: "1802",
    title: "Nhà Nguyễn — Kinh đô Huế",
    description:
      "Triều Nguyễn dời kinh đô về Huế, xây dựng Kinh thành, Hoàng thành và Tử Cấm thành cùng hệ thống lăng tẩm, để lại di sản kiến trúc cung đình đồ sộ nhất Việt Nam.",
    relatedHeritageIds: ["hue-co-do"],
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b9/%C4%90%E1%BA%A1i_n%E1%BB%99i.jpg",
  },
  {
    id: "can-dai",
    year: 1858,
    yearLabel: "1858",
    title: "Giai đoạn cận đại",
    description:
      "Pháp nổ súng tấn công Đà Nẵng, mở đầu thời kỳ thuộc địa. Xã hội Việt Nam chuyển mình mạnh mẽ, giao thoa Đông - Tây trong kiến trúc, văn hóa và tư tưởng.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/a8/Ban_nh%E1%BA%A1c_%C4%91%E1%BB%9Dn_ca_t%C3%A0i_t%E1%BB%AD_S%C3%A0i_G%C3%B2n_%281911%29.jpeg",
  },
  {
    id: "cach-mang-thang-tam",
    year: 1945,
    yearLabel: "1945",
    title: "Cách mạng tháng Tám",
    description:
      "Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình, khai sinh nước Việt Nam Dân chủ Cộng hòa, mở ra kỷ nguyên độc lập dân tộc.",
    image:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/35/L%C4%83ng_Ch%E1%BB%A7_t%E1%BB%8Bch_H%E1%BB%93_Ch%C3%AD_Minh%2C_H%C3%A0_N%E1%BB%99i.jpeg/1920px-L%C4%83ng_Ch%E1%BB%A7_t%E1%BB%8Bch_H%E1%BB%93_Ch%C3%AD_Minh%2C_H%C3%A0_N%E1%BB%99i.jpeg",
  },
  {
    id: "hien-dai-unesco",
    year: 1993,
    yearLabel: "1993",
    title: "UNESCO ghi danh di sản đầu tiên",
    description:
      "Quần thể di tích Cố đô Huế trở thành di sản thế giới đầu tiên của Việt Nam được UNESCO công nhận, mở đầu hành trình đưa di sản Việt ra thế giới.",
    image:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c7/Dien_Thai_Hoa.jpg/1920px-Dien_Thai_Hoa.jpg",
  },
];
