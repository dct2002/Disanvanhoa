export default function Footer() {
  return (
    <footer id="about" className="relative overflow-hidden border-t border-gold/10 bg-ink pb-10 pt-20">
      <div className="ornament-pattern absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-display text-lg tracking-[0.2em] text-ivory">DI SẢN VĂN HÓA VIỆT NAM</p>
            <p className="mt-4 max-w-md font-serif text-sm italic leading-relaxed text-ivory-dim">
              Gìn giữ ký ức – Kết nối thế hệ – Lan tỏa giá trị Việt Nam
            </p>
            <p className="mt-6 max-w-md text-xs leading-relaxed text-ivory-dim/70">
              Một dự án bảo tàng số phi lợi nhuận, ra đời với mong muốn đưa di sản văn hóa Việt Nam
              đến gần hơn với thế hệ trẻ thông qua công nghệ 3D và trải nghiệm tương tác hiện đại.
            </p>
          </div>

          <FooterColumn
            title="Về dự án"
            links={["Giới thiệu", "Đội ngũ thực hiện", "Liên hệ hợp tác"]}
          />
          <FooterColumn
            title="Tài nguyên"
            links={["UNESCO Việt Nam", "Nguồn dữ liệu & bản quyền ảnh", "Đóng góp tư liệu"]}
          />
        </div>

        <div className="divider-gold my-10" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-ivory-dim/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Di Sản Văn Hóa Việt Nam. Dự án phi thương mại.</p>
          <p>Hình ảnh: Wikimedia Commons — thuộc phạm vi tư liệu tự do chia sẻ.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.25em] text-gold">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link}>
            <span className="cursor-default text-sm text-ivory-dim transition-colors hover:text-ivory">
              {link}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
