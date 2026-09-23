import type { RegionInfo } from "../types";

export const regions: RegionInfo[] = [
  {
    id: "ha-noi",
    name: "Hà Nội",
    region: "bac-bo",
    heritageCount: 3,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/39/Hanoi_Temple_of_Literature_%28cropped%29.jpg",
    mapPosition: { x: 51, y: 23 },
    description:
      "Kinh đô ngàn năm văn hiến, nơi lưu giữ Hoàng thành Thăng Long, Văn Miếu - Quốc Tử Giám và Chùa Một Cột.",
  },
  {
    id: "quang-ninh",
    name: "Quảng Ninh",
    region: "bac-bo",
    heritageCount: 1,
    image:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/29/V%E1%BB%8Bnh_H%E1%BA%A1_Long_-_NKS.jpg/1920px-V%E1%BB%8Bnh_H%E1%BA%A1_Long_-_NKS.jpg",
    mapPosition: { x: 62, y: 20 },
    description:
      "Vùng đất địa đầu Đông Bắc với Vịnh Hạ Long — kỳ quan đá vôi giữa biển được UNESCO công nhận hai lần.",
  },
  {
    id: "bac-ninh",
    name: "Bắc Ninh",
    region: "bac-bo",
    heritageCount: 1,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/60/Quan_ho_bac_ninh_o_ha_noi.jpg",
    mapPosition: { x: 55, y: 25 },
    description:
      "Miền quê Kinh Bắc, cái nôi của những làn điệu Quan họ trữ tình và mạch nguồn văn hóa Đông Sơn.",
  },
  {
    id: "ninh-binh",
    name: "Ninh Bình",
    region: "bac-bo",
    heritageCount: 1,
    image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Muaxuantamcoc.jpg",
    mapPosition: { x: 48, y: 32 },
    description:
      "\"Vịnh Hạ Long trên cạn\" với quần thể danh thắng Tràng An hòa quyện núi non, sông nước và di tích lịch sử.",
  },
  {
    id: "thanh-hoa",
    name: "Thanh Hóa",
    region: "trung-bo",
    heritageCount: 1,
    image:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/C%E1%BB%95ng_Nam.jpg/1920px-C%E1%BB%95ng_Nam.jpg",
    mapPosition: { x: 44, y: 40 },
    description:
      "Vùng đất địa linh với tòa thành đá Thành nhà Hồ độc nhất vô nhị và cái nôi văn hóa Đông Sơn cổ đại.",
  },
  {
    id: "quang-binh",
    name: "Quảng Bình",
    region: "trung-bo",
    heritageCount: 1,
    image:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c9/Phongnhakebang6.jpg/1920px-Phongnhakebang6.jpg",
    mapPosition: { x: 41, y: 52 },
    description:
      "Vương quốc hang động với Vườn quốc gia Phong Nha - Kẻ Bàng, hệ thống hang động kỳ vĩ bậc nhất thế giới.",
  },
  {
    id: "hue",
    name: "Thừa Thiên Huế",
    region: "trung-bo",
    heritageCount: 3,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/b9/%C4%90%E1%BA%A1i_n%E1%BB%99i.jpg",
    mapPosition: { x: 43, y: 58 },
    description:
      "Cố đô của triều Nguyễn, nơi hội tụ Quần thể di tích Cố đô Huế, Nhã nhạc cung đình và kho tàng thơ văn trên kiến trúc.",
  },
  {
    id: "quang-nam",
    name: "Quảng Nam",
    region: "trung-bo",
    heritageCount: 2,
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f3/PhoCoHoiAn.jpg",
    mapPosition: { x: 46, y: 63 },
    description:
      "Vùng đất di sản với Phố cổ Hội An trầm mặc bên sông Hoài và Thánh địa Mỹ Sơn — thánh đô Champa cổ kính.",
  },
  {
    id: "tay-nguyen",
    name: "Tây Nguyên",
    region: "tay-nguyen",
    heritageCount: 1,
    image:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/29/B%E1%BB%99_c%E1%BB%93ng_chi%C3%AAng.jpg/1920px-B%E1%BB%99_c%E1%BB%93ng_chi%C3%AAng.jpg",
    mapPosition: { x: 52, y: 72 },
    description:
      "Đại ngàn hùng vĩ, không gian thiêng của cồng chiêng vang vọng giữa núi rừng và những lễ hội buôn làng.",
  },
  {
    id: "nam-bo",
    name: "Nam Bộ",
    region: "nam-bo",
    heritageCount: 2,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/a8/Ban_nh%E1%BA%A1c_%C4%91%E1%BB%9Dn_ca_t%C3%A0i_t%E1%BB%AD_S%C3%A0i_G%C3%B2n_%281911%29.jpeg",
    mapPosition: { x: 44, y: 88 },
    description:
      "Vùng đất phương Nam trù phú, nơi tiếng đờn ca tài tử ngân vang trên những dòng kênh và cánh đồng bát ngát.",
  },
];
