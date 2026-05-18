import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  CirclePlay,
  HandCoins,
  Rocket,
  ScanLine,
  Sparkles,
  Users,
} from "lucide-react";

import { MetricItem } from "@/components/atoms/metric-item";
import { FeatureCard } from "@/components/molecules/feature-card";
import { SectionHeading } from "@/components/molecules/section-heading";
import { TestimonialCard } from "@/components/molecules/testimonial-card";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { Separator } from "@/ui/separator";

const brands = ["Saigon Bistro", "Luna Kitchen", "Mekong Bowl", "Ariya Café", "Lotus Dine"];

const benefitItems = [
  {
    title: "Tăng tốc phục vụ",
    description: "Khách quét mã và gọi món trực tiếp, giảm thời gian ghi order thủ công giờ cao điểm.",
    icon: <Rocket className="size-7" />,
  },
  {
    title: "Tiết kiệm chi phí",
    description: "Cắt giảm giấy in menu và vận hành tinh gọn hơn mà vẫn giữ trải nghiệm chuyên nghiệp.",
    icon: <HandCoins className="size-7" />,
  },
  {
    title: "Quản lý thông minh",
    description: "Theo dõi doanh thu, bàn phục vụ và hiệu suất nhân viên theo thời gian thực.",
    icon: <BarChart3 className="size-7" />,
  },
];

const featureGrid = [
  {
    title: "Thực đơn số hóa",
    description: "Cập nhật món ăn theo mùa trong vài giây, không cần in lại menu.",
    icon: <ScanLine className="size-7" />,
  },
  {
    title: "Phân tích thời gian thực",
    description: "Nắm được món bán chạy, khung giờ cao điểm và tỷ lệ quay lại của khách.",
    icon: <BarChart3 className="size-7" />,
  },
  {
    title: "Quản lý nhân sự",
    description: "Phân quyền theo vai trò, theo dõi hiệu suất và lịch làm việc trực quan.",
    icon: <Users className="size-7" />,
  },
  {
    title: "Khách hàng thân thiết",
    description: "Tạo chương trình tích điểm và ưu đãi tự động để tăng tần suất quay lại.",
    icon: <Sparkles className="size-7" />,
  },
];

const planCards = [
  {
    name: "Cơ bản",
    price: "200.000đ",
    period: "/tháng",
    cta: "Chọn gói này",
    ctaVariant: "outline" as const,
    highlight: false,
    features: ["Menu online 50 món", "Tối đa 20 bàn", "Báo cáo cơ bản"],
  },
  {
    name: "Premium Care",
    price: "500.000đ",
    period: "/tháng",
    cta: "Dùng thử 14 ngày",
    ctaVariant: "default" as const,
    highlight: true,
    badge: "Phổ biến nhất",
    features: ["Menu không giới hạn", "Không giới hạn số bàn", "Thanh toán trực tuyến", "Hỗ trợ 24/7"],
  },
  {
    name: "Doanh nghiệp",
    price: "Liên hệ",
    period: "",
    cta: "Gửi yêu cầu",
    ctaVariant: "secondary" as const,
    highlight: false,
    features: ["Tùy chỉnh thương hiệu riêng", "API kết nối POS sẵn có", "Quản lý chuỗi cửa hàng"],
  },
];

const faqItems = [
  {
    question: "Cần mất bao lâu để thiết lập xong hệ thống?",
    answer:
      "Chỉ mất từ 15-30 phút để bạn tải menu và tạo mã QR đầu tiên. Đội ngũ kỹ thuật sẽ hỗ trợ để nhà hàng vận hành trong cùng ngày.",
    defaultOpen: true,
  },
  {
    question: "Tôi có cần mua thêm thiết bị phần cứng gì không?",
    answer:
      "Không cần. Scan Now vận hành trên web, bạn chỉ cần điện thoại hoặc máy tính bảng hiện có để quản lý đơn hàng.",
  },
  {
    question: "Chi phí 500k/tháng đã bao gồm tất cả chưa?",
    answer:
      "Gói đã bao gồm hạ tầng lưu trữ, bảo mật và cập nhật tính năng mới. Không có chi phí ẩn phát sinh.",
  },
  {
    question: "Hỗ trợ kỹ thuật như thế nào nếu gặp sự cố?",
    answer:
      "Đội ngũ hỗ trợ 24/7 qua hotline, Zalo và email. Lỗi nghiêm trọng sẽ được ưu tiên xử lý từ xa ngay lập tức.",
  },
];

const testimonialItems = [
  {
    name: "Anh Minh Trần",
    role: "Chủ nhà hàng nướng tại Quận 7",
    quote:
      "Từ khi dùng Scan Now, đội ngũ phục vụ xử lý đơn nhanh hơn rõ rệt và khách hàng hài lòng hơn vì không phải chờ lâu.",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=faces",
  },
  {
    name: "Chị Lan Hương",
    role: "Quản lý chuỗi café tại Hà Nội",
    quote:
      "Báo cáo theo thời gian thực giúp tôi quyết định nhập hàng chính xác hơn, giảm lãng phí gần 20% chỉ sau 2 tháng.",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces",
  },
  {
    name: "Anh Hoàng Nam",
    role: "Founder mô hình food court",
    quote:
      "Điều tôi thích nhất là triển khai nhanh. Chỉ trong một buổi là toàn bộ gian hàng đã có menu QR đồng bộ.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces",
  },
];

const PROCESS_STEPS = [
  {
    title: "Khách quét mã QR tại bàn",
    description: "Hiển thị menu tối ưu cho điện thoại với hình ảnh, mô tả và tùy chọn món.",
  },
  {
    title: "Đặt món và thanh toán linh hoạt",
    description: "Hỗ trợ gọi món tại chỗ, thanh toán online hoặc tại quầy theo nhu cầu.",
  },
  {
    title: "Bếp và thu ngân nhận đơn tức thì",
    description: "Đơn được đồng bộ theo thời gian thực, giảm sai sót truyền tin thủ công.",
  },
];

export const SalesLanding = () => {
  return (
    <main className="bg-background overflow-x-hidden">
      <HeroSection />
      <TrustedBySection />
      <BenefitsSection />
      <FeatureDetailSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <FinalCtaSection />
    </main>
  );
};

const HeroSection = () => {
  return (
    <section id="hero" className="scroll-mt-header relative overflow-hidden bg-black px-5 pt-28 pb-24 md:px-16 md:pt-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-35"
      />
      <div aria-hidden className="from-background/95 via-background/70 to-background/15 pointer-events-none absolute inset-0 bg-gradient-to-r" />
      <div aria-hidden className="from-background/70 via-background/15 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="max-w-3xl space-y-8">
          <span className="border-primary/20 bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.15em] uppercase backdrop-blur-sm">
            <Sparkles className="size-4" />
            Xu hướng ẩm thực 2026
          </span>

          <h1 className="text-on-surface text-4xl leading-tight font-extrabold sm:text-5xl lg:text-6xl">
            Phần mềm quản lý gọi món <br className="hidden md:block" />
            <span className="text-primary-container">thông minh nhất</span> hiện nay
          </h1>

          <p className="text-on-surface-variant max-w-2xl text-base leading-relaxed sm:text-xl">
            Hơn 300.000 nhà kinh doanh F&B đang dùng Scan Now để tăng tốc phục vụ, giảm thất thoát và tạo trải nghiệm gọi món hiện đại.
          </p>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
            <Button size="lg" className="w-full sm:w-auto">
              Dùng thử miễn phí
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Khám phá
              <CirclePlay className="size-5" />
            </Button>
          </div>

          <div className="border-outline-variant/40 grid grid-cols-2 gap-6 border-t pt-8 sm:grid-cols-4 sm:gap-10">
            <MetricItem value="300.000+" label="nhà kinh doanh sử dụng" />
            <MetricItem value="10.000+" label="đối tác mới mỗi tháng" />
            <MetricItem value="15 phút" label="thời gian khởi tạo menu" />
            <MetricItem value="24/7" label="hỗ trợ kỹ thuật" />
          </div>
        </div>
      </div>
    </section>
  );
};

const TrustedBySection = () => {
  return (
    <section className="border-outline-variant/30 bg-surface border-b px-5 py-12 md:px-16">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        <p className="text-on-surface-variant text-center text-xs font-bold tracking-[0.2em] uppercase">
          Hàng ngàn chủ nhà hàng đã thay đổi cách vận hành cùng Scan Now
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {brands.map((brand) => (
            <span
              key={brand}
              className="border-outline-variant/40 text-on-surface-variant bg-surface-container-low inline-flex rounded-full border px-5 py-2 text-sm font-semibold"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

const BenefitsSection = () => {
  return (
    <section id="benefits" className="scroll-mt-header bg-surface px-5 py-24 md:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          title="Lợi ích vượt trội"
          description="Giải pháp đồng bộ từ gọi món, vận hành bếp tới quản trị doanh thu giúp nhà hàng tăng trưởng bền vững."
          className="mb-16"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {benefitItems.map((item) => (
            <FeatureCard key={item.title} title={item.title} description={item.description} icon={item.icon} className="p-10" />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureDetailSection = () => {
  return (
    <section id="feature-details" className="scroll-mt-header bg-surface-container-lowest px-5 py-24 md:px-16">
      <div className="mx-auto w-full max-w-7xl space-y-16">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <SectionHeading
            align="left"
            eyebrow="Hệ sinh thái toàn diện"
            title="Mọi tính năng cần thiết để vận hành chuyên nghiệp"
            description="Từ thực đơn số hóa, quản trị nhân sự đến phân tích doanh thu, mọi thứ đều nằm trong một nền tảng thống nhất."
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {featureGrid.map((item) => (
              <article
                key={item.title}
                className="border-outline-variant/40 bg-surface-container rounded-2xl border p-6 shadow-sm"
              >
                <div className="text-primary mb-4">{item.icon}</div>
                <h3 className="text-on-surface mb-2 text-lg font-bold">{item.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{item.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="from-primary-container to-secondary-container text-on-primary rounded-[2rem] bg-gradient-to-r p-8 sm:p-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <h3 className="text-2xl leading-tight font-bold sm:text-3xl">Sẵn sàng tích hợp thanh toán online?</h3>
              <p className="text-on-primary/90 max-w-2xl text-sm leading-relaxed sm:text-base">
                Hỗ trợ MoMo, ZaloPay, ShopeePay và mọi ngân hàng Việt Nam. Giao dịch được ghi nhận tức thì vào báo cáo vận hành.
              </p>
            </div>
            <Button
              variant="secondary"
              size="lg"
              className="text-primary-container w-full border-white/15 bg-white hover:bg-white/90 sm:w-auto"
            >
              Kết nối ngay
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>

        <div className="border-outline-variant/40 bg-surface-container-low rounded-3xl border p-8 sm:p-10">
          <SectionHeading
            align="left"
            eyebrow="Quy trình"
            title="Triển khai theo 3 bước đơn giản"
            description="Không cần thay đổi hạ tầng hiện tại, đội ngũ có thể vận hành ngay trong ngày."
            className="mb-10"
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {PROCESS_STEPS.map((step, index) => (
              <article key={step.title} className="bg-surface-container-lowest border-outline-variant/35 rounded-2xl border p-6">
                <p className="text-primary mb-4 text-sm font-bold tracking-[0.2em] uppercase">Bước {index + 1}</p>
                <h4 className="text-on-surface mb-2 text-lg font-semibold">{step.title}</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="scroll-mt-header bg-surface px-5 py-24 md:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          title="Chia sẻ từ đối tác"
          description="Những kết quả thực tế từ các mô hình F&B đã ứng dụng Scan Now trong vận hành hằng ngày."
          className="mb-16"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {testimonialItems.map((item) => (
            <TestimonialCard
              key={item.name}
              name={item.name}
              role={item.role}
              quote={item.quote}
              avatarUrl={item.avatarUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingSection = () => {
  return (
    <section id="pricing" className="scroll-mt-header bg-surface-container-low px-5 py-24 md:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          title="Gói giải pháp linh hoạt"
          description="Lựa chọn theo quy mô vận hành hiện tại và mở rộng khi nhà hàng tăng trưởng."
          className="mb-16"
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {planCards.map((plan) => (
            <article
              key={plan.name}
              className={cn(
                "border-outline-variant/60 bg-surface-container-lowest relative flex h-full flex-col rounded-3xl border p-8 shadow-sm",
                plan.highlight &&
                  "border-primary-container shadow-primary-container/20 scale-[1.01] border-2 shadow-xl"
              )}
            >
              {plan.badge ? (
                <span className="bg-primary-container text-on-primary absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold tracking-wide">
                  {plan.badge}
                </span>
              ) : null}

              <div className="mb-8 pt-2">
                <h3 className="text-on-surface mb-2 text-2xl font-bold">{plan.name}</h3>
                <div className="flex items-end gap-1">
                  <p className="text-on-surface text-3xl font-extrabold">{plan.price}</p>
                  {plan.period ? <p className="text-on-surface-variant pb-1 text-sm">{plan.period}</p> : null}
                </div>
              </div>

              <ul className="mb-10 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-on-surface-variant flex items-start gap-3 text-sm">
                    <CheckCircle2 className="text-primary mt-0.5 size-5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button variant={plan.ctaVariant} size="lg" className="mt-auto w-full">
                {plan.cta}
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const FaqSection = () => {
  return (
    <section id="faq" className="scroll-mt-header bg-surface px-5 py-24 md:px-16">
      <div className="mx-auto w-full max-w-3xl">
        <SectionHeading
          title="Câu hỏi thường gặp"
          description="Một số câu hỏi phổ biến trước khi bắt đầu triển khai tại nhà hàng của bạn."
          className="mb-12"
        />

        <div className="space-y-4">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group border-outline-variant/40 bg-surface-container-low overflow-hidden rounded-2xl border"
              open={item.defaultOpen}
            >
              <summary className="hover:bg-surface-container-high cursor-pointer list-none p-6 transition-colors">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-on-surface text-base font-bold">{item.question}</p>
                  <ChevronDown className="text-primary size-5 shrink-0 transition-transform group-open:rotate-180" />
                </div>
              </summary>
              <Separator className="bg-outline-variant/25" />
              <p className="text-on-surface-variant p-6 text-sm leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCtaSection = () => {
  return (
    <section id="final-cta" className="scroll-mt-header bg-on-surface relative overflow-hidden px-5 py-24 md:px-16">
      <div aria-hidden className="bg-primary/10 pointer-events-none absolute top-0 -right-24 h-full w-80 -skew-x-12" />
      <div aria-hidden className="bg-secondary/10 pointer-events-none absolute bottom-0 -left-20 h-full w-72 skew-x-12" />

      <div className="relative z-10 mx-auto w-full max-w-7xl text-center">
        <h2 className="mx-auto mb-6 max-w-4xl text-4xl leading-tight font-extrabold text-white sm:text-5xl">
          Sẵn sàng để đột phá doanh thu nhà hàng?
        </h2>
        <p className="mx-auto mb-12 max-w-3xl text-base leading-relaxed text-white/75 sm:text-xl">
          Gia nhập cộng đồng hơn 300.000 chủ nhà hàng đã tin dùng Scan Now. Bắt đầu dùng thử miễn phí 14 ngày ngay hôm nay.
        </p>

        <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
          <Button size="lg" className="w-full sm:w-auto">
            Bắt đầu ngay miễn phí
            <ArrowRight className="size-5" />
          </Button>
          <Button variant="outline" size="lg" className="w-full border-white/35 text-white hover:bg-white/10 sm:w-auto">
            Liên hệ tư vấn
          </Button>
        </div>

        <p className="mt-7 text-xs text-white/45">Không yêu cầu thẻ tín dụng. Hủy bất cứ lúc nào.</p>
      </div>
    </section>
  );
};
