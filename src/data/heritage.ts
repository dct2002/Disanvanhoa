import type { Heritage } from "../types";
import { placeholderImage } from "./placeholder";

/**
 * Nguồn ảnh: Wikimedia Commons (ảnh tự do bản quyền / Creative Commons).
 * Một số di sản chưa tìm được ảnh phù hợp sẽ dùng ảnh placeholder — có thể
 * thay bằng URL ảnh thật hoặc model3D (.glb/.gltf) bất cứ lúc nào.
 */
export const heritageList: Heritage[] = [
  // ───────────────── DI SẢN VẬT THỂ ─────────────────
  {
    id: "hue-co-do",
    name: "Quần thể di tích Cố đô Huế",
    type: "tangible",
    location: "Thừa Thiên Huế",
    region: "trung-bo",
    era: "trung-dai",
    year: 1802,
    unescoYear: 1993,
    unesco: true,
    description:
      "Kinh đô của 13 đời vua triều Nguyễn với Kinh thành, Hoàng thành, Tử Cấm thành và hệ thống lăng tẩm uy nghi bên dòng sông Hương.",
    longDescription:
      "Được xây dựng từ năm 1802 dưới triều vua Gia Long, Quần thể di tích Cố đô Huế là minh chứng tiêu biểu cho một kinh đô phong kiến phương Đông, kết hợp hài hòa giữa kiến trúc cung đình, nghệ thuật trang trí và triết lý phong thủy Á Đông. Toàn bộ quần thể trải rộng dọc hai bờ sông Hương, gồm Kinh thành, Hoàng thành, Tử Cấm thành cùng lăng tẩm của các vị vua như Gia Long, Minh Mạng, Tự Đức, Khải Định. Đây là di sản văn hóa thế giới đầu tiên của Việt Nam được UNESCO công nhận năm 1993.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6f/Du_kh%C3%A1ch_vi%E1%BA%BFng_th%C4%83m_L%E1%BA%A7u_Ng%C5%A9_Ph%E1%BB%A5ng.JPG",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/6/6f/Du_kh%C3%A1ch_vi%E1%BA%BFng_th%C4%83m_L%E1%BA%A7u_Ng%C5%A9_Ph%E1%BB%A5ng.JPG",
      "https://upload.wikimedia.org/wikipedia/commons/b/b9/%C4%90%E1%BA%A1i_n%E1%BB%99i.jpg",
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c7/Dien_Thai_Hoa.jpg/1920px-Dien_Thai_Hoa.jpg",
    ],
    mapPosition: { x: 43, y: 58 },
    tags: ["cung đình", "kiến trúc", "triều Nguyễn"],
    significance:
      "Biểu tượng cho đỉnh cao kiến trúc cung đình phong kiến Việt Nam và tư tưởng \"thiên nhân hợp nhất\".",
  },
  {
    id: "vinh-ha-long",
    name: "Vịnh Hạ Long",
    type: "tangible",
    location: "Quảng Ninh",
    region: "bac-bo",
    era: "co-dai",
    unescoYear: 1994,
    unesco: true,
    description:
      "Kỳ quan thiên nhiên với hàng nghìn đảo đá vôi và hang động kỳ vĩ giữa vùng biển Đông Bắc Việt Nam.",
    longDescription:
      "Vịnh Hạ Long sở hữu khoảng 1.600 hòn đảo lớn nhỏ, phần lớn là đảo đá vôi được bào mòn qua hàng triệu năm, tạo nên cảnh quan karst trên biển độc đáo bậc nhất thế giới. Vịnh còn lưu giữ nhiều hang động kỳ vĩ như Sửng Sốt, Đầu Gỗ, Thiên Cung, cùng hệ sinh thái biển đa dạng. Vịnh Hạ Long được UNESCO công nhận là Di sản Thiên nhiên Thế giới hai lần, năm 1994 về giá trị cảnh quan và năm 2000 về giá trị địa chất - địa mạo.",
    image:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/29/V%E1%BB%8Bnh_H%E1%BA%A1_Long_-_NKS.jpg/1920px-V%E1%BB%8Bnh_H%E1%BA%A1_Long_-_NKS.jpg",
    mapPosition: { x: 62, y: 20 },
    tags: ["thiên nhiên", "karst", "biển đảo"],
    significance: "Một trong những kỳ quan thiên nhiên nổi tiếng nhất thế giới.",
  },
  {
    id: "pho-co-hoi-an",
    name: "Phố cổ Hội An",
    type: "tangible",
    location: "Quảng Nam",
    region: "trung-bo",
    era: "trung-dai",
    year: 1500,
    unescoYear: 1999,
    unesco: true,
    description:
      "Thương cảng cổ trầm mặc bên sông Hoài, nơi giao thoa kiến trúc Việt - Hoa - Nhật - Pháp qua nhiều thế kỷ.",
    longDescription:
      "Từ thế kỷ 15 đến 19, Hội An là một thương cảng quốc tế sầm uất, nơi các thương nhân Nhật Bản, Trung Hoa, Bồ Đào Nha, Hà Lan... cập bến giao thương. Phố cổ còn giữ gần như nguyên vẹn hàng trăm ngôi nhà cổ, hội quán, chùa, cầu cổ như Chùa Cầu — biểu tượng của đô thị. Kiến trúc nơi đây là sự giao thoa độc đáo giữa phong cách bản địa và các nền văn hóa ngoại lai, tạo nên một không gian đô thị cổ hiếm có còn được bảo tồn ở Đông Nam Á.",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f3/PhoCoHoiAn.jpg",
    mapPosition: { x: 46, y: 63 },
    tags: ["đô thị cổ", "thương cảng", "kiến trúc"],
    significance: "Mẫu hình tiêu biểu của một cảng thị châu Á truyền thống được bảo tồn nguyên vẹn.",
  },
  {
    id: "thanh-dia-my-son",
    name: "Thánh địa Mỹ Sơn",
    type: "tangible",
    location: "Quảng Nam",
    region: "trung-bo",
    era: "co-dai",
    year: 400,
    unescoYear: 1999,
    unesco: true,
    description:
      "Quần thể đền tháp Champa cổ kính ẩn mình giữa thung lũng núi rừng, trung tâm tôn giáo của vương quốc Champa.",
    longDescription:
      "Được xây dựng liên tục từ thế kỷ 4 đến thế kỷ 13, Mỹ Sơn là trung tâm tôn giáo quan trọng nhất của Vương quốc Champa, thờ thần Shiva theo Ấn Độ giáo. Quần thể gồm hơn 70 công trình đền tháp bằng gạch nung với kỹ thuật xây dựng và điêu khắc độc đáo, thể hiện ảnh hưởng sâu sắc của văn hóa Ấn Độ hòa quyện với bản sắc Champa bản địa.",
    image:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/2024_-_M%E1%BB%B9_S%C6%A1n_Group_B%2C_C_and_D_-_img_23.jpg/1920px-2024_-_M%E1%BB%B9_S%C6%A1n_Group_B%2C_C_and_D_-_img_23.jpg",
    mapPosition: { x: 46, y: 64 },
    tags: ["Champa", "đền tháp", "tôn giáo"],
    significance: "Trung tâm tôn giáo tiêu biểu nhất của nền văn minh Champa còn tồn tại.",
  },
  {
    id: "hoang-thanh-thang-long",
    name: "Hoàng thành Thăng Long",
    type: "tangible",
    location: "Hà Nội",
    region: "bac-bo",
    era: "trung-dai",
    year: 1010,
    unescoYear: 2010,
    unesco: true,
    description:
      "Trung tâm quyền lực chính trị liên tục hơn một nghìn năm của Việt Nam, từ thời Đại La đến thời Nguyễn.",
    longDescription:
      "Hoàng thành Thăng Long là minh chứng cho quá trình phát triển liên tục của trung tâm quyền lực chính trị Việt Nam suốt hơn 13 thế kỷ. Các tầng văn hóa khảo cổ chồng xếp từ thời Đại La, Đinh - Tiền Lê, Lý, Trần, Lê đến Nguyễn cho thấy sự giao thoa, tiếp biến văn hóa Đông Á sâu sắc trong kiến trúc cung đình Việt Nam. Đoan Môn, Điện Kính Thiên, Cột cờ Hà Nội là những di tích tiêu biểu còn lại.",
    image:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/eb/Hanoi_Vietnam_%C4%90oan-m%C3%B4n-01.jpg/1920px-Hanoi_Vietnam_%C4%90oan-m%C3%B4n-01.jpg",
    mapPosition: { x: 51, y: 23 },
    tags: ["kinh thành", "khảo cổ", "Thăng Long"],
    significance: "Biểu tượng cho tính liên tục của quyền lực chính trị Việt Nam qua hơn nghìn năm.",
  },
  {
    id: "thanh-nha-ho",
    name: "Thành nhà Hồ",
    type: "tangible",
    location: "Thanh Hóa",
    region: "trung-bo",
    era: "trung-dai",
    year: 1397,
    unescoYear: 2011,
    unesco: true,
    description:
      "Tòa thành đá độc đáo được xây dựng thần tốc chỉ trong vài tháng với những phiến đá khổng lồ ghép khít.",
    longDescription:
      "Thành nhà Hồ được Hồ Quý Ly cho xây dựng năm 1397 làm kinh đô của triều Hồ. Công trình sử dụng những khối đá xanh nguyên khối, có phiến nặng tới 20 tấn, được đẽo gọt vuông vắn và ghép nối với nhau không cần chất kết dính — một kỹ thuật xây dựng độc đáo hiếm có ở Đông Nam Á thời trung đại, thể hiện trình độ kỹ thuật và tổ chức lao động đáng kinh ngạc.",
    image:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/C%E1%BB%95ng_Nam.jpg/1920px-C%E1%BB%95ng_Nam.jpg",
    mapPosition: { x: 44, y: 40 },
    tags: ["thành đá", "kiến trúc quân sự", "nhà Hồ"],
    significance: "Kỳ tích kỹ thuật xây dựng thành đá quy mô lớn của Đông Nam Á thế kỷ 14.",
  },
  {
    id: "trang-an",
    name: "Quần thể danh thắng Tràng An",
    type: "tangible",
    location: "Ninh Bình",
    region: "bac-bo",
    era: "co-dai",
    unescoYear: 2014,
    unesco: true,
    description:
      "Di sản hỗn hợp văn hóa và thiên nhiên với hang động, sông ngòi và dấu tích con người tiền sử.",
    longDescription:
      "Tràng An là di sản thế giới hỗn hợp đầu tiên của Việt Nam, kết hợp giữa cảnh quan karst ngoạn mục với hệ thống hang động, thung lũng, sông ngòi và những dấu tích cư trú của con người có niên đại hàng vạn năm. Nơi đây còn gắn liền với kinh đô Hoa Lư xưa — kinh đô đầu tiên của nhà nước phong kiến tập quyền Việt Nam thời Đinh - Tiền Lê.",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Muaxuantamcoc.jpg",
    mapPosition: { x: 48, y: 32 },
    tags: ["karst", "di sản hỗn hợp", "Hoa Lư"],
    significance: "Di sản thế giới hỗn hợp (văn hóa và thiên nhiên) đầu tiên của Việt Nam.",
  },
  {
    id: "phong-nha-ke-bang",
    name: "Phong Nha – Kẻ Bàng",
    type: "tangible",
    location: "Quảng Bình",
    region: "trung-bo",
    era: "co-dai",
    unescoYear: 2003,
    unesco: true,
    description:
      "Vườn quốc gia sở hữu hệ thống hang động karst cổ nhất và kỳ vĩ nhất châu Á, gồm cả hang Sơn Đoòng.",
    longDescription:
      "Phong Nha - Kẻ Bàng là một trong những khu vực karst rộng lớn và đa dạng nhất thế giới, với hơn 300 hang động được phát hiện, tiêu biểu là Sơn Đoòng — hang động tự nhiên lớn nhất hành tinh. Vườn quốc gia còn là nơi bảo tồn hệ sinh thái rừng nhiệt đới nguyên sinh với đa dạng sinh học đặc hữu quý hiếm.",
    image:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c9/Phongnhakebang6.jpg/1920px-Phongnhakebang6.jpg",
    mapPosition: { x: 41, y: 52 },
    tags: ["hang động", "karst", "sinh thái"],
    significance: "Sở hữu hang Sơn Đoòng — hang động tự nhiên lớn nhất thế giới.",
  },
  {
    id: "yen-tu",
    name: "Quần thể Yên Tử – Vĩnh Nghiêm – Côn Sơn, Kiếp Bạc",
    type: "tangible",
    location: "Quảng Ninh - Bắc Giang - Hải Dương",
    region: "bac-bo",
    era: "trung-dai",
    year: 1299,
    unescoYear: 2025,
    unesco: true,
    description:
      "Trung tâm Phật giáo Trúc Lâm — dòng thiền do vua Trần Nhân Tông sáng lập, gắn với tinh thần nhập thế của Phật giáo Việt Nam.",
    longDescription:
      "Sau khi nhường ngôi, vua Trần Nhân Tông lên núi Yên Tử tu hành và sáng lập Thiền phái Trúc Lâm — dòng Phật giáo mang đậm bản sắc Việt Nam. Quần thể di tích trải rộng qua Yên Tử, chùa Vĩnh Nghiêm và Côn Sơn - Kiếp Bạc, lưu giữ hệ thống chùa tháp cổ kính ẩn mình giữa rừng núi, phản ánh sự dung hợp giữa đạo pháp và tinh thần dân tộc.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e9/%C4%90%C6%B0%E1%BB%9Dng_l%C3%AAn_Y%C3%AAn_T%E1%BB%AD.jpg",
    mapPosition: { x: 58, y: 24 },
    tags: ["Phật giáo Trúc Lâm", "núi thiêng", "Trần Nhân Tông"],
    significance: "Di sản thế giới mới nhất của Việt Nam, được UNESCO ghi danh năm 2025.",
  },

  // ───────────────── DI SẢN PHI VẬT THỂ ─────────────────
  {
    id: "nha-nhac-cung-dinh-hue",
    name: "Nhã nhạc cung đình Huế",
    type: "intangible",
    location: "Thừa Thiên Huế",
    region: "trung-bo",
    era: "trung-dai",
    unescoYear: 2003,
    unesco: true,
    description:
      "Thể loại âm nhạc cung đình trang trọng, được biểu diễn trong các nghi lễ tế trời, đăng quang và tiếp sứ thần.",
    longDescription:
      "Nhã nhạc là loại hình âm nhạc cung đình phát triển mạnh dưới triều Nguyễn, sử dụng dàn nhạc bát âm gồm nhiều loại nhạc cụ như đàn nguyệt, đàn tỳ bà, sáo, trống, chiêng... Nhã nhạc gắn liền với các nghi lễ quan trọng của triều đình như tế Nam Giao, lễ đăng quang, lễ tiếp sứ thần, thể hiện tư tưởng vũ trụ quan và vương quyền của xã hội phong kiến Việt Nam. Đây là di sản phi vật thể đầu tiên của Việt Nam được UNESCO công nhận.",
    image:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/80/Nh%C3%A3_nh%E1%BA%A1c_cung_%C4%91%C3%ACnh_Hu%E1%BA%BF.JPG/1920px-Nh%C3%A3_nh%E1%BA%A1c_cung_%C4%91%C3%ACnh_Hu%E1%BA%BF.JPG",
    culturalSpace: "Cung đình Huế và các nghi lễ triều Nguyễn",
    practitioners: "Nghệ nhân Nhã nhạc cung đình Huế",
    significance: "Di sản văn hóa phi vật thể đầu tiên của Việt Nam được UNESCO vinh danh (2003).",
    tags: ["âm nhạc cung đình", "nghi lễ", "Huế"],
  },
  {
    id: "cong-chieng-tay-nguyen",
    name: "Không gian văn hóa Cồng chiêng Tây Nguyên",
    type: "intangible",
    location: "Tây Nguyên",
    region: "tay-nguyen",
    era: "co-dai",
    unescoYear: 2005,
    unesco: true,
    description:
      "Nghệ thuật cồng chiêng gắn liền với vòng đời con người và lễ hội nông nghiệp của các dân tộc Tây Nguyên.",
    longDescription:
      "Cồng chiêng là nhạc cụ thiêng liêng gắn bó mật thiết với đời sống tâm linh của các dân tộc Ê Đê, Gia Rai, Ba Na, M'nông... Tiếng cồng chiêng vang lên trong các nghi lễ vòng đời, lễ hội mừng lúa mới, lễ bỏ mả, kết nối con người với thần linh và cộng đồng. Không gian văn hóa Cồng chiêng Tây Nguyên trải rộng trên năm tỉnh Kon Tum, Gia Lai, Đắk Lắk, Đắk Nông và Lâm Đồng.",
    image:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/29/B%E1%BB%99_c%E1%BB%93ng_chi%C3%AAng.jpg/1920px-B%E1%BB%99_c%E1%BB%93ng_chi%C3%AAng.jpg",
    culturalSpace: "Buôn làng các dân tộc Tây Nguyên",
    practitioners: "Cộng đồng các dân tộc Ê Đê, Gia Rai, Ba Na, M'nông",
    significance: "Kết nối con người với thế giới thần linh trong tín ngưỡng Tây Nguyên.",
    tags: ["cồng chiêng", "Tây Nguyên", "tín ngưỡng"],
  },
  {
    id: "quan-ho-bac-ninh",
    name: "Dân ca Quan họ Bắc Ninh",
    type: "intangible",
    location: "Bắc Ninh - Bắc Giang",
    region: "bac-bo",
    era: "trung-dai",
    unescoYear: 2009,
    unesco: true,
    description:
      "Lối hát đối đáp trữ tình giữa liền anh, liền chị trong trang phục truyền thống vùng Kinh Bắc.",
    longDescription:
      "Quan họ là hình thức hát giao duyên độc đáo giữa các \"liền anh\" và \"liền chị\", đối đáp bằng những làn điệu tinh tế với hàng trăm bài bản khác nhau. Quan họ không chỉ là nghệ thuật trình diễn mà còn là lối ứng xử văn hóa, thể hiện qua tục kết chạ, mời trầu, mời nước giữa các \"bọn Quan họ\" kết nghĩa lâu đời.",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/60/Quan_ho_bac_ninh_o_ha_noi.jpg",
    culturalSpace: "Các làng Quan họ vùng Kinh Bắc",
    practitioners: "Liền anh, liền chị các làng Quan họ",
    significance: "Nghệ thuật giao duyên tinh tế bậc nhất trong dân ca Việt Nam.",
    tags: ["dân ca", "giao duyên", "Kinh Bắc"],
  },
  {
    id: "ca-tru",
    name: "Ca trù",
    type: "intangible",
    location: "Bắc Bộ và Bắc Trung Bộ",
    region: "bac-bo",
    era: "trung-dai",
    unescoYear: 2009,
    unesco: true,
    description:
      "Loại hình nghệ thuật thính phòng cổ với tiếng phách, đàn đáy và giọng hát ca nương độc đáo.",
    longDescription:
      "Ca trù từng là thú thưởng thức nghệ thuật tao nhã của giới trí thức phong kiến, kết hợp giữa thơ ca, âm nhạc và trình diễn. Ba yếu tố cốt lõi tạo nên Ca trù là giọng hát của đào nương, tiếng đàn đáy của kép đàn và tiếng phách — nhạc cụ gõ nhịp đặc trưng chỉ Ca trù mới có. Đây là di sản được UNESCO ghi danh vào danh sách cần bảo vệ khẩn cấp.",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Ca_tr%C3%B9_performance.jpg",
    culturalSpace: "Giáo phường Ca trù vùng đồng bằng Bắc Bộ",
    practitioners: "Đào nương, kép đàn các giáo phường Ca trù",
    significance: "Nghệ thuật thính phòng bác học với hệ thống phách độc nhất vô nhị.",
    tags: ["thính phòng", "đào nương", "phách"],
  },
  {
    id: "vi-giam-nghe-tinh",
    name: "Dân ca Ví, Giặm Nghệ Tĩnh",
    type: "intangible",
    location: "Nghệ An - Hà Tĩnh",
    region: "trung-bo",
    era: "trung-dai",
    unescoYear: 2014,
    unesco: true,
    description:
      "Những câu hát ví, giặm mộc mạc cất lên trong lao động và sinh hoạt thường ngày của người dân xứ Nghệ.",
    longDescription:
      "Ví và Giặm là hai lối hát dân gian không nhạc đệm, gắn bó với đời sống lao động của người dân Nghệ An - Hà Tĩnh như hát ví phường vải, ví đò đưa, giặm ru con, giặm kể. Ca từ mộc mạc, chân chất nhưng giàu chất thơ, phản ánh tâm tư, tình cảm và triết lý sống của người dân xứ Nghệ qua bao thế hệ.",
    image: placeholderImage("Ví, Giặm Nghệ Tĩnh", 3),
    culturalSpace: "Cộng đồng cư dân Nghệ An và Hà Tĩnh",
    practitioners: "Nghệ nhân dân gian hai tỉnh Nghệ An, Hà Tĩnh",
    significance: "Tiếng hát lao động đặc trưng của cư dân sông Lam, núi Hồng.",
    tags: ["dân ca", "xứ Nghệ", "lao động"],
  },
  {
    id: "don-ca-tai-tu",
    name: "Đờn ca tài tử Nam Bộ",
    type: "intangible",
    location: "Nam Bộ",
    region: "nam-bo",
    era: "can-dai",
    unescoYear: 2013,
    unesco: true,
    description:
      "Nghệ thuật đàn và ca thính phòng phóng khoáng, đậm chất trữ tình của vùng sông nước Nam Bộ.",
    longDescription:
      "Đờn ca tài tử hình thành từ cuối thế kỷ 19 trên nền tảng nhạc lễ, nhã nhạc cung đình Huế và văn học dân gian miền Nam. Người chơi \"tài tử\" thường quy tụ ngẫu hứng trong không gian đời thường — trên ghe, dưới mái nhà — cùng nhau đàn ca giao lưu bằng các nhạc cụ như đàn kìm, đàn tranh, đàn cò, song lang. Đây cũng là cội nguồn hình thành nghệ thuật Cải lương sau này.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/a8/Ban_nh%E1%BA%A1c_%C4%91%E1%BB%9Dn_ca_t%C3%A0i_t%E1%BB%AD_S%C3%A0i_G%C3%B2n_%281911%29.jpeg",
    culturalSpace: "Các tỉnh thành Nam Bộ",
    practitioners: "Giới tài tử đờn ca Nam Bộ",
    significance: "Cội nguồn của nghệ thuật Cải lương, biểu tượng văn hóa sông nước Nam Bộ.",
    tags: ["đờn ca", "Nam Bộ", "tài tử"],
  },
  {
    id: "tho-cung-hung-vuong",
    name: "Tín ngưỡng thờ cúng Hùng Vương",
    type: "intangible",
    location: "Phú Thọ",
    region: "bac-bo",
    era: "co-dai",
    unescoYear: 2012,
    unesco: true,
    description:
      "Tín ngưỡng thờ các Vua Hùng — biểu tượng cội nguồn dân tộc, quy tụ hàng triệu người hành hương mỗi năm.",
    longDescription:
      "Tín ngưỡng thờ cúng Hùng Vương bắt nguồn từ truyền thuyết Lạc Long Quân - Âu Cơ và 18 đời Vua Hùng dựng nước Văn Lang. Hằng năm vào ngày 10 tháng 3 âm lịch, hàng triệu người dân từ khắp mọi miền hành hương về Đền Hùng (Phú Thọ) để tưởng nhớ tổ tiên, thể hiện đạo lý \"uống nước nhớ nguồn\" và tinh thần đại đoàn kết dân tộc.",
    image:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f8/Mausoleum_of_Hung_King.JPG/1920px-Mausoleum_of_Hung_King.JPG",
    culturalSpace: "Đền Hùng, Phú Thọ và cả nước",
    practitioners: "Cộng đồng người Việt trong và ngoài nước",
    significance: "Biểu tượng tâm linh về cội nguồn dân tộc Việt Nam.",
    tags: ["tín ngưỡng", "Vua Hùng", "cội nguồn"],
  },
  {
    id: "xoe-thai",
    name: "Nghệ thuật Xòe Thái",
    type: "intangible",
    location: "Tây Bắc (Điện Biên, Lai Châu, Sơn La, Yên Bái)",
    region: "bac-bo",
    era: "co-dai",
    unescoYear: 2021,
    unesco: true,
    description:
      "Điệu múa vòng tròn kết đoàn của dân tộc Thái, biểu tượng cho tinh thần cộng đồng vùng Tây Bắc.",
    longDescription:
      "Xòe là điệu múa truyền thống không thể thiếu trong các dịp lễ hội, cưới hỏi, mừng nhà mới của người Thái vùng Tây Bắc. Người múa nắm tay nhau thành vòng tròn quanh đống lửa hoặc hũ rượu cần, chuyển động uyển chuyển theo tiếng trống, tiếng khèn. Xòe Thái có hàng chục điệu khác nhau, từ Xòe vòng phổ biến đến Xòe nghi lễ trang trọng, thể hiện tinh thần đoàn kết \"không xòe thì cây lúa không trổ bông\".",
    image: placeholderImage("Nghệ thuật Xòe Thái", 6),
    culturalSpace: "Cộng đồng người Thái vùng Tây Bắc",
    practitioners: "Cộng đồng dân tộc Thái",
    significance: "Biểu tượng gắn kết cộng đồng của người Thái Tây Bắc.",
    tags: ["múa", "dân tộc Thái", "Tây Bắc"],
  },
  {
    id: "then",
    name: "Thực hành Then của người Tày, Nùng, Thái",
    type: "intangible",
    location: "Các tỉnh miền núi phía Bắc",
    region: "bac-bo",
    era: "co-dai",
    unescoYear: 2019,
    unesco: true,
    description:
      "Nghi lễ Then kết hợp hát, đàn tính và múa, phản ánh vũ trụ quan và đời sống tâm linh của các dân tộc Tày, Nùng, Thái.",
    longDescription:
      "Then là hình thức sinh hoạt tín ngưỡng dân gian quan trọng của người Tày, Nùng, Thái, do các thầy Then thực hành trong các nghi lễ cầu an, cầu mùa, giải hạn, gắn với hành trình tưởng tượng lên \"Mường Trời\". Nghi lễ kết hợp lời hát Then, tiếng đàn tính và các điệu múa nghi lễ, phản ánh sâu sắc quan niệm vũ trụ ba tầng (trời - đất - nước) trong tâm thức các dân tộc vùng núi phía Bắc.",
    image:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/N%C3%B4ng_Thi_L%C3%ACm_ngh%E1%BB%87_nh%C3%A2n_h%C3%A1t_Then.jpg/1920px-N%C3%B4ng_Thi_L%C3%ACm_ngh%E1%BB%87_nh%C3%A2n_h%C3%A1t_Then.jpg",
    culturalSpace: "Cộng đồng Tày, Nùng, Thái miền núi phía Bắc",
    practitioners: "Thầy Then và cộng đồng Tày, Nùng, Thái",
    significance: "Phản ánh vũ trụ quan ba tầng của các dân tộc miền núi phía Bắc.",
    tags: ["Then", "đàn tính", "tín ngưỡng"],
  },
  {
    id: "bai-choi",
    name: "Nghệ thuật Bài Chòi Trung Bộ",
    type: "intangible",
    location: "Trung Bộ (Quảng Bình đến Bình Thuận)",
    region: "trung-bo",
    era: "can-dai",
    unescoYear: 2017,
    unesco: true,
    description:
      "Trò chơi dân gian kết hợp hát hô, ứng tác và giải trí cộng đồng phổ biến khắp làng quê miền Trung.",
    longDescription:
      "Bài Chòi vừa là một trò chơi dân gian vừa là một loại hình nghệ thuật trình diễn, kết hợp giữa âm nhạc, thơ ca, diễn xướng và ứng tác dân gian. Người \"hô Bài Chòi\" ứng khẩu những câu hát dí dỏm, sâu sắc để xướng tên các quân bài, tạo nên không khí lễ hội rộn ràng mỗi dịp Tết đến xuân về ở các làng quê duyên hải miền Trung.",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f2/B%C3%A0i_Ch%C3%B2i.jpg",
    culturalSpace: "Các tỉnh duyên hải miền Trung",
    practitioners: "Nghệ nhân hô Bài Chòi",
    significance: "Kết hợp độc đáo giữa trò chơi dân gian và nghệ thuật ứng tác.",
    tags: ["trò chơi dân gian", "hát hô", "miền Trung"],
  },

  // ───────────────── DI SẢN TƯ LIỆU ─────────────────
  {
    id: "moc-ban-trieu-nguyen",
    name: "Mộc bản triều Nguyễn",
    type: "documentary",
    location: "Đà Lạt, Lâm Đồng (lưu trữ)",
    region: "trung-bo",
    era: "can-dai",
    year: 1802,
    unescoYear: 2009,
    unesco: true,
    description:
      "Hơn 34.000 tấm mộc bản khắc chữ Hán - Nôm ngược để in sách, tài liệu chính thức của triều Nguyễn.",
    longDescription:
      "Mộc bản triều Nguyễn là những bản khắc gỗ chữ Hán - Nôm ngược dùng để in ấn các bộ sách chính văn, chính sử do triều đình biên soạn như Đại Nam thực lục, Khâm định Đại Nam hội điển sự lệ. Đây là khối tư liệu gốc quý giá phản ánh lịch sử, địa lý, chính trị, văn hóa, giáo dục Việt Nam thời Nguyễn, được UNESCO công nhận là Di sản Tư liệu Thế giới đầu tiên của Việt Nam.",
    image:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bb/Woodblocks_of_the_Nguy%E1%BB%85n_Dynasty_01.jpg/1920px-Woodblocks_of_the_Nguy%E1%BB%85n_Dynasty_01.jpg",
    material: "Gỗ thị, gỗ nam mộc khắc chữ ngược",
    origin: "Quốc Sử Quán triều Nguyễn",
    significance: "Di sản tư liệu thế giới đầu tiên của Việt Nam (2009).",
    tags: ["mộc bản", "triều Nguyễn", "in ấn"],
  },
  {
    id: "bia-tien-si-van-mieu",
    name: "Bia đá các khoa thi tiến sĩ triều Lê - Mạc",
    type: "documentary",
    location: "Văn Miếu - Quốc Tử Giám, Hà Nội",
    region: "bac-bo",
    era: "trung-dai",
    year: 1442,
    unescoYear: 2011,
    unesco: true,
    description:
      "82 tấm bia đá đặt trên lưng rùa, khắc tên các tiến sĩ đỗ đạt qua 82 khoa thi từ năm 1442 đến 1779.",
    longDescription:
      "Được dựng từ năm 1484 dưới triều vua Lê Thánh Tông, hệ thống bia Tiến sĩ tại Văn Miếu - Quốc Tử Giám ghi danh những người đỗ đạt cao nhất trong các kỳ thi Đình suốt hơn ba thế kỷ. Mỗi tấm bia không chỉ ghi tên tuổi, quê quán người đỗ mà còn khắc bài văn bia thể hiện quan điểm về hiền tài và giáo dục — \"hiền tài là nguyên khí quốc gia\".",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/05/VN-HN-Temple_of_literature-Turtle_steles_collage.jpg",
    material: "Đá xanh, đặt trên bệ rùa đá",
    origin: "Văn Miếu - Quốc Tử Giám, triều Lê",
    significance: "Minh chứng cho truyền thống hiếu học và trọng dụng hiền tài của dân tộc.",
    tags: ["bia đá", "khoa cử", "Văn Miếu"],
  },
  {
    id: "chau-ban-trieu-nguyen",
    name: "Châu bản triều Nguyễn",
    type: "documentary",
    location: "Hà Nội (lưu trữ)",
    region: "bac-bo",
    era: "can-dai",
    year: 1802,
    unescoYear: 2014,
    unesco: true,
    description:
      "Văn bản hành chính gốc có bút phê son đỏ của các vua triều Nguyễn, tư liệu gốc độc bản duy nhất.",
    longDescription:
      "Châu bản là các văn bản hành chính do triều đình nhà Nguyễn ban hành hoặc tiếp nhận, có bút tích phê duyệt trực tiếp (châu phê) bằng mực son đỏ của nhà vua. Đây là khối tài liệu gốc, độc bản, phản ánh chân thực và chi tiết mọi mặt đời sống chính trị, kinh tế, xã hội, ngoại giao của Việt Nam thời Nguyễn, trong đó có nhiều tư liệu quý về chủ quyền biển đảo Hoàng Sa, Trường Sa.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d9/Nguy%E1%BB%85n_Dynasty_period_map_-_B%E1%BA%A3n_qu%E1%BB%91c_%C4%91%E1%BB%8Ba_%C4%91%E1%BB%93_trong_s%C3%A1ch_Kh%E1%BA%A3i_%C4%91%E1%BB%93ng_thuy%E1%BA%BFt_%C6%B0%E1%BB%9Bc.png",
    material: "Giấy dó, mực son và mực đen",
    origin: "Nội các triều Nguyễn",
    significance: "Chứa nhiều bằng chứng lịch sử quý giá về chủ quyền Hoàng Sa, Trường Sa.",
    tags: ["châu bản", "hành chính", "triều Nguyễn"],
  },
  {
    id: "moc-ban-truong-hoc-phuc-giang",
    name: "Mộc bản trường học Phúc Giang",
    type: "documentary",
    location: "Hà Tĩnh",
    region: "trung-bo",
    era: "trung-dai",
    year: 1762,
    unescoYear: 2016,
    unesco: true,
    description:
      "Mộc bản dùng để dạy học của dòng họ Nguyễn Huy tại làng Trường Lưu, phản ánh nền giáo dục tư thục xưa.",
    longDescription:
      "Mộc bản trường học Phúc Giang gồm 383 bản khắc gỗ do dòng họ Nguyễn Huy ở làng Trường Lưu (Hà Tĩnh) biên soạn và sử dụng để giảng dạy tại trường tư thục Phúc Giang từ thế kỷ 18. Đây là tư liệu quý hiếm phản ánh sinh động về nội dung, phương pháp giáo dục Nho học của một dòng họ khoa bảng, cũng như tư duy sư phạm tiến bộ đương thời.",
    image: placeholderImage("Mộc bản Phúc Giang", 9),
    material: "Gỗ thị khắc chữ Hán - Nôm",
    origin: "Dòng họ Nguyễn Huy, làng Trường Lưu, Hà Tĩnh",
    significance: "Tư liệu giáo dục tư thục cổ quý hiếm của dòng họ khoa bảng Việt Nam.",
    tags: ["mộc bản", "giáo dục", "Trường Lưu"],
  },
  {
    id: "hoang-hoa-su-trinh-do",
    name: "Hoàng hoa sứ trình đồ",
    type: "documentary",
    location: "Hà Tĩnh",
    region: "trung-bo",
    era: "trung-dai",
    year: 1765,
    unescoYear: 2018,
    unesco: true,
    description:
      "Tập bản đồ ghi chép hành trình đi sứ sang nhà Thanh của sứ thần Nguyễn Huy Oánh, minh họa chi tiết bằng tranh vẽ.",
    longDescription:
      "Hoàng hoa sứ trình đồ do sứ thần Nguyễn Huy Oánh biên soạn năm 1765, ghi lại hành trình đi sứ từ Việt Nam sang Trung Hoa với hơn 200 bức tranh vẽ và bản đồ minh họa chi tiết các trạm dịch, danh lam thắng cảnh, phong tục dọc đường. Đây là tư liệu quý giá về ngoại giao, địa lý và giao lưu văn hóa giữa Việt Nam và Trung Hoa thời phong kiến.",
    image: placeholderImage("Hoàng hoa sứ trình đồ", 12),
    material: "Giấy dó, tranh vẽ minh họa",
    origin: "Nguyễn Huy Oánh, làng Trường Lưu, Hà Tĩnh",
    significance: "Tư liệu bản đồ ngoại giao cổ hiếm hoi còn lưu giữ được ở Việt Nam.",
    tags: ["bản đồ", "ngoại giao", "đi sứ"],
  },
  {
    id: "tho-van-kien-truc-cung-dinh-hue",
    name: "Thơ văn trên kiến trúc cung đình Huế",
    type: "documentary",
    location: "Thừa Thiên Huế",
    region: "trung-bo",
    era: "can-dai",
    year: 1802,
    unescoYear: 2016,
    unesco: true,
    description:
      "Hệ thống thơ văn chữ Hán được chạm khắc, cẩn xà cừ trực tiếp trên các công trình kiến trúc cung đình Huế.",
    longDescription:
      "Trên các cung điện, lăng tẩm ở Huế còn lưu giữ khoảng 2.967 ô thơ văn được chạm khắc, cẩn xà cừ, hoặc viết trên pháp lam ngay trên kết cấu kiến trúc — một hình thức trang trí độc đáo chưa từng thấy ở bất kỳ nơi nào khác. Nội dung thơ văn phản ánh tư tưởng, triết lý trị quốc, quan niệm thẩm mỹ và đời sống tinh thần phong phú của các vị vua triều Nguyễn.",
    image:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c7/Dien_Thai_Hoa.jpg/1920px-Dien_Thai_Hoa.jpg",
    material: "Gỗ chạm khắc, cẩn xà cừ, pháp lam",
    origin: "Cung đình triều Nguyễn, Huế",
    significance: "Hình thức \"bảo tàng sống\" độc đáo — thơ văn hòa quyện cùng kiến trúc.",
    tags: ["thơ văn", "kiến trúc", "cung đình"],
  },
];

export const trongDongDongSon: Heritage = {
  id: "trong-dong-dong-son",
  name: "Trống đồng Đông Sơn",
  type: "tangible",
  location: "Thanh Hóa (phát hiện đầu tiên tại Đông Sơn)",
  region: "trung-bo",
  era: "co-dai",
  year: -700,
  description:
    "Hiện vật tiêu biểu nhất của văn minh Đông Sơn, biểu tượng quyền lực và tín ngưỡng phồn thực của người Việt cổ.",
  longDescription:
    "Trống đồng Đông Sơn được đúc bằng kỹ thuật đúc đồng thất truyền tinh xảo, mặt trống trang trí hình ngôi sao nhiều cánh ở trung tâm, bao quanh là các vành hoa văn hình học, hình chim lạc, hình thuyền, cảnh sinh hoạt và lễ hội của cư dân nông nghiệp lúa nước. Trống đồng không chỉ là nhạc khí mà còn là biểu tượng quyền lực của thủ lĩnh, vật thiêng trong các nghi lễ cầu mưa, cầu mùa của cư dân Đông Sơn cách đây khoảng 2.500 - 2.000 năm.",
  image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/57/Trong_dong_Dong_Son.jpg/1920px-Trong_dong_Dong_Son.jpg",
  material: "Hợp kim đồng - thiếc - chì (đồng thau)",
  origin: "Văn hóa Đông Sơn, lưu vực sông Mã - sông Hồng",
  pattern: "Hoa văn hình ngôi sao nhiều cánh, chim Lạc, thuyền, cảnh sinh hoạt cộng đồng",
  significance:
    "Biểu tượng đỉnh cao của văn minh Đông Sơn và kỹ thuật luyện kim thời cổ đại Việt Nam.",
  tags: ["trống đồng", "Đông Sơn", "đúc đồng"],
};

export const allHeritage: Heritage[] = [...heritageList, trongDongDongSon];
