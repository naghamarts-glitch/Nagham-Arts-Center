import React, { createContext, useContext, useState, useEffect } from "react";

type Lang = "ar" | "en";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  dir: "rtl" | "ltr";
}

const translations: Record<string, Record<Lang, string>> = {
  "nav.home": { ar: "الرئيسية", en: "Home" },
  "nav.shop": { ar: "المتجر", en: "Shop" },
  "nav.services": { ar: "الخدمات", en: "Services" },
  "nav.books": { ar: "الكتب", en: "Books" },
  "nav.about": { ar: "من نحن", en: "About" },
  "nav.contact": { ar: "تواصل معنا", en: "Contact" },
  "nav.cart": { ar: "السلة", en: "Cart" },
  "hero.title": { ar: "نغم للفنون", en: "Nagham Arts" },
  "hero.subtitle": { ar: "وجهتك الأولى لخامات الفنون والتعليم والخدمات الاحترافية", en: "Your destination for art supplies, education & professional services" },
  "hero.browse": { ar: "تصفح الخدمات", en: "Browse Services" },
  "hero.order": { ar: "اطلب خدمتك الآن", en: "Request Your Service" },
  "index.services.title": { ar: "خدماتنا المتميزة", en: "Our Distinguished Services" },
  "index.portfolio.title": { ar: "أعمالنا المميزة", en: "Our Featured Works" },
  "index.why.title": { ar: "لماذا تختار نغم", en: "Why Choose Nagham" },
  "index.offer.title": { ar: "ماذا نقدم لك؟", en: "What Do We Offer You?" },
  "index.cta.title": { ar: "جاهز للبدء؟", en: "Ready to Start?" },
  "index.cta.desc": { ar: "تواصل معنا الآن وابدأ مشروعك مع أفضل المتخصصين", en: "Contact us now and start your project with the best specialists" },
  "index.cta.free": { ar: "اطلب استشارة مجانية", en: "Request Free Consultation" },
  "index.cta.whatsapp": { ar: "تواصل واتساب", en: "WhatsApp Now" },
  "services.art.title": { ar: "🎨 مستلزمات الفنون", en: "🎨 Art Supplies" },
  "services.art.desc": { ar: "ألوان – أدوات رسم – أدوات يدوية.", en: "Colors - Drawing tools - Handcrafts." },
  "services.sewing.title": { ar: "🧵 مستلزمات الخياطة والكروشيه", en: "🧵 Sewing & Crochet Supplies" },
  "services.sewing.desc": { ar: "خيوط – إبر – أدوات تطريز.", en: "Threads - Needles - Embroidery tools." },
  "services.print.title": { ar: "🖨 خدمات الطباعة", en: "🖨 Printing Services" },
  "services.print.desc": { ar: "طباعة – تصوير – تصميم.", en: "Printing - Photocopy - Design." },
  "services.web.title": { ar: "💻 إنشاء المواقع الإلكترونية", en: "💻 Website Creation" },
  "services.web.desc": { ar: "تصميم مواقع للشركات والمتاجر الإلكترونية.", en: "Website design for companies & e-commerce." },
  "services.news.title": { ar: "📰 مواقع المجلات والصحف", en: "📰 Magazines & Newspapers Sites" },
  "services.news.desc": { ar: "تصميم مواقع إخبارية احترافية مثل الأهرام والأخبار واليوم السابع.", en: "Professional news sites like Al-Ahram, Al-Akhbar, Youm7." },
  "services.custom.title": { ar: "⚙ خدمات حسب الطلب", en: "⚙ Custom Services" },
  "services.custom.desc": { ar: "تنفيذ أي خدمة رقمية أو تطوير حسب طلب العميل.", en: "Any digital service or custom development." },
  "portfolio.ahram": { ar: "موقع الأهرام الإلكتروني", en: "Al-Ahram Electronic Site" },
  "portfolio.ahram.desc": { ar: "نظام نشر إخباري كامل مع لوحة تحكم متقدمة", en: "Complete news publishing system with advanced dashboard" },
  "portfolio.store": { ar: "متجر إلكتروني متكامل", en: "Complete E-commerce Store" },
  "portfolio.store.desc": { ar: "منصة بيع مع دفع إلكتروني وإدارة مخزون", en: "Sales platform with electronic payment & inventory management" },
  "portfolio.artist": { ar: "بورتفوليو فنان", en: "Artist Portfolio" },
  "portfolio.artist.desc": { ar: "تصميم عصري تفاعلي لعرض الأعمال الفنية", en: "Modern interactive design for art showcase" },
  "portfolio.admin": { ar: "لوحة تحكم إدارية", en: "Admin Control Panel" },
  "portfolio.admin.desc": { ar: "نظام إدارة المحتوى والطلبات والمستخدمين", en: "Content, orders & users management system" },
  "why.speed": { ar: "⚡ سرعة التنفيذ", en: "⚡ Fast Execution" },
  "why.design": { ar: "🎨 تصميم احترافي", en: "🎨 Professional Design" },
  "why.price": { ar: "💰 أسعار مناسبة", en: "💰 Affordable Prices" },
  "why.support": { ar: "🛠 دعم فني مستمر", en: "🛠 Continuous Technical Support" },
  "why.experience": { ar: "⭐ خبرة في المجال", en: "⭐ Field Experience" },
"offer.services.1": { ar: "تصميم مواقع إلكترونية", en: "Website Design" },
  "offer.services.2": { ar: "إنشاء مواقع صحف ومجلات", en: "News & Magazine Sites" },
  "offer.services.3": { ar: "تصميم متاجر إلكترونية", en: "E-commerce Design" },
  "offer.services.4": { ar: "مستلزمات الفنون", en: "Art Supplies" },
  "offer.services.5": { ar: "خدمات الطباعة", en: "Printing Services" },
  "offer.services.6": { ar: "تنفيذ خدمات حسب الطلب", en: "Custom Services" },


  "sections.art": { ar: "خامات التربية الفنية", en: "Art Education Supplies" },
  "sections.art.desc": { ar: "ألوان، أخشاب، خيوط، أدوات رسم وأكثر", en: "Colors, wood, threads, drawing tools & more" },
  "sections.home_ec": { ar: "خامات الاقتصاد المنزلي", en: "Home Economics Supplies" },
  "sections.home_ec.desc": { ar: "خيوط، إبر، أقمشة، أدوات خياطة وتطريز", en: "Threads, needles, fabrics, sewing & embroidery tools" },
  "sections.books": { ar: "كتب الثانوية العامة", en: "High School Books" },
  "sections.books.desc": { ar: "احجز كتبك الدراسية أونلاين بسهولة", en: "Book your textbooks online easily" },
  "sections.summaries": { ar: "ملخصات المرحلة الإعدادية", en: "Prep School Summaries" },
  "sections.summaries.desc": { ar: "ملخصات شاملة لجميع المراحل الإعدادية", en: "Comprehensive summaries for all prep stages" },
  "sections.thesis": { ar: "رسائل الماجستير والدكتوراه", en: "Thesis & Dissertation Services" },
  "sections.thesis.desc": { ar: "كتابة وتنسيق ومراجعة الرسائل العلمية", en: "Writing, formatting & reviewing academic papers" },
  "sections.web": { ar: "مواقع ويب ومشاريع تخرج", en: "Websites & Graduation Projects" },
  "sections.web.desc": { ar: "تصميم وتطوير مواقع ومشاريع برمجية", en: "Design & develop websites & software projects" },
  "footer.rights": { ar: "© 2024 مكتبة نغم للفنون - جميع الحقوق محفوظة", en: "© 2024 Nagham Arts Library - All Rights Reserved" },
  "footer.design": { ar: "تصميم وتطوير: مروان محمد", en: "Design & Development: Marwan Mohamed" },
  "footer.address": { ar: "شرق سوهاج، قسم ثان، محافظة سوهاج", en: "East Sohag, Second District, Sohag Governorate" },
  "footer.hours": { ar: "السبت - الخميس | الجمعة مغلق", en: "Saturday - Thursday | Friday Closed" },
  "about.title": { ar: "من نحن", en: "About Us" },
  "about.desc": { ar: "نغم للفنون هي مكتبة شاملة متخصصة في توفير خامات التربية الفنية والاقتصاد المنزلي، الكتب الدراسية، خدمات الطباعة والتنسيق الأكاديمي، وتطوير المواقع الإلكترونية.", en: "Nagham Arts is a comprehensive store specializing in art & home economics supplies, textbooks, academic printing & formatting services, and web development." },
  "contact.title": { ar: "تواصل معنا", en: "Contact Us" },
  "contact.phone": { ar: "الهاتف", en: "Phone" },
  "contact.whatsapp": { ar: "واتساب", en: "WhatsApp" },
  "contact.address": { ar: "العنوان", en: "Address" },
  "contact.hours": { ar: "مواعيد العمل", en: "Working Hours" },
  "payment.title": { ar: "طرق الدفع", en: "Payment Methods" },
  "payment.cash": { ar: "الدفع عند الاستلام", en: "Cash on Delivery" },
  "payment.vodafone": { ar: "فودافون كاش", en: "Vodafone Cash" },
  "nav.login": { ar: "تسجيل الدخول", en: "Login" },
  "nav.settings": { ar: "الإعدادات", en: "Settings" },
  "nav.logout": { ar: "تسجيل الخروج", en: "Logout" },
  "shop.addToCart": { ar: "أضف للسلة", en: "Add to Cart" },
  "shop.currency": { ar: "جنيه", en: "EGP" },
  "cart.title": { ar: "سلة التسوق", en: "Shopping Cart" },
  "cart.empty": { ar: "السلة فارغة", en: "Your cart is empty" },
  "cart.total": { ar: "الإجمالي", en: "Total" },
  "cart.checkout": { ar: "إتمام الشراء", en: "Checkout" },
};


const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>("ar");
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang, dir]);

  const t = (key: string) => translations[key]?.[lang] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
