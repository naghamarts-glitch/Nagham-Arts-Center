import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Store, Users, Award, Heart, Eye, Target, ListChecks, Star,
  BarChart, Palette, Scissors, BookOpen, Notebook, FileText,
  BarChart3, Code, GraduationCap, ShoppingCart, Send, Phone,
  BadgeCheck, CheckCircle
} from "lucide-react";

const About = () => {
  const { t, lang } = useLanguage();

  const features = [
    { icon: Store, ar: "مكتبة شاملة لجميع الخامات", en: "Comprehensive store for all supplies" },
    { icon: Users, ar: "خدمة عملاء متميزة", en: "Outstanding customer service" },
    { icon: BadgeCheck, ar: "جودة عالية وأسعار مناسبة", en: "High quality & competitive prices" },
    { icon: Award, ar: "خبرة واسعة في المجال", en: "Extensive industry experience" },
  ];

  const offerings = [
    { icon: Palette, ar: "توفير جميع خامات التربية الفنية", en: "All art education supplies" },
    { icon: Scissors, ar: "توفير خامات الاقتصاد المنزلي", en: "Home economics supplies" },
    { icon: BookOpen, ar: "بيع الكتب الدراسية لجميع المراحل", en: "Textbooks for all levels" },
    { icon: BookOpen, ar: "حجز كتب الثانوية العامة أونلاين", en: "Online high school book reservation" },
    { icon: Notebook, ar: "ملخصات المرحلة الإعدادية", en: "Prep school summaries" },
    { icon: FileText, ar: "كتابة وتنسيق الرسائل العلمية", en: "Thesis writing & formatting" },
    { icon: BarChart3, ar: "تحليل البيانات SPSS", en: "SPSS data analysis" },
    { icon: Code, ar: "تصميم وتنفيذ مواقع الويب", en: "Website design & development" },
    { icon: GraduationCap, ar: "تنفيذ مشاريع التخرج للطلاب", en: "Student graduation projects" },
  ];

  const whyUs = [
    { icon: Award, ar: "خبرة واسعة في المجال", en: "Extensive industry experience" },
    { icon: Star, ar: "أسعار مناسبة لجميع الطلاب", en: "Affordable prices for all students" },
    { icon: BadgeCheck, ar: "جودة عالية في المنتجات", en: "High-quality products" },
    { icon: Users, ar: "خدمة عملاء سريعة", en: "Fast customer service" },
    { icon: CheckCircle, ar: "تنفيذ الطلبات بدقة واحترافية", en: "Precise & professional execution" },
    { icon: Store, ar: "إمكانية طلب الخدمات أونلاين", en: "Online service ordering" },
  ];

  const stats = [
    { num: "1000+", ar: "عميل", en: "Clients" },
    { num: "500+", ar: "مشروع تم تنفيذه", en: "Projects Completed" },
    { num: "100+", ar: "كتاب وخامة متوفرة", en: "Books & Supplies" },
    { num: "10+", ar: "خدمة أكاديمية", en: "Academic Services" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{t("about.title")}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {lang === "ar"
              ? "مكتبة نغم للفنون هي مكتبة متخصصة في توفير جميع خامات التربية الفنية والاقتصاد المنزلي والكتب الدراسية، بالإضافة إلى تقديم خدمات أكاديمية متكاملة مثل كتابة وتنسيق الرسائل العلمية ومشاريع التخرج، وخدمات الطباعة والتصميم."
              : "Nagham Arts is a specialized store providing all art education and home economics supplies, textbooks, and comprehensive academic services including thesis writing, formatting, graduation projects, and printing & design services."}
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            {lang === "ar"
              ? "نهدف إلى مساعدة الطلاب والباحثين والفنانين في الحصول على كل ما يحتاجونه في مكان واحد، مع توفير جودة عالية وأسعار مناسبة وخدمة سريعة."
              : "We aim to help students, researchers, and artists get everything they need in one place, with high quality, competitive prices, and fast service."}
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-20">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card p-6 text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl gradient-bg flex items-center justify-center">
                <f.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <p className="font-semibold text-foreground text-sm">{lang === "ar" ? f.ar : f.en}</p>
            </motion.div>
          ))}
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-20">
          <motion.div initial={{ opacity: 0, x: lang === "ar" ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center"><Eye className="w-6 h-6 text-primary-foreground" /></div>
              <h2 className="text-xl font-bold text-foreground">{lang === "ar" ? "رؤيتنا" : "Our Vision"}</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {lang === "ar"
                ? "أن تصبح مكتبة نغم للفنون من أفضل المكتبات المتخصصة في مجال الخامات الفنية والخدمات التعليمية في مصر، وأن تكون وجهة موثوقة للطلاب والباحثين والفنانين."
                : "To become one of the best specialized stores in art supplies and educational services in Egypt, and a trusted destination for students, researchers, and artists."}
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: lang === "ar" ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl gradient-accent-bg flex items-center justify-center"><Target className="w-6 h-6 text-accent-foreground" /></div>
              <h2 className="text-xl font-bold text-foreground">{lang === "ar" ? "رسالتنا" : "Our Mission"}</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {lang === "ar"
                ? "تقديم منتجات تعليمية وفنية عالية الجودة، مع توفير خدمات أكاديمية وتقنية تساعد الطلاب على النجاح والتفوق، وتوفير تجربة سهلة ومريحة للعملاء سواء داخل المكتبة أو عبر الموقع الإلكتروني."
                : "Providing high-quality educational and artistic products, along with academic and technical services that help students succeed, while ensuring a smooth and convenient experience both in-store and online."}
            </p>
          </motion.div>
        </div>

        {/* What We Offer */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8 flex items-center justify-center gap-2">
            <ListChecks className="w-6 h-6 text-primary" />
            {lang === "ar" ? "ماذا تقدم مكتبة نغم؟" : "What Does Nagham Offer?"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {offerings.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -3, scale: 1.02 }}
                className="glass-card p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">{lang === "ar" ? item.ar : item.en}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8 flex items-center justify-center gap-2">
            <Star className="w-6 h-6 text-accent" />
            {lang === "ar" ? "لماذا تختارنا؟" : "Why Choose Us?"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {whyUs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -3 }}
                className="glass-card p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <p className="text-sm font-medium text-foreground">{lang === "ar" ? item.ar : item.en}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8 flex items-center justify-center gap-2">
            <BarChart className="w-6 h-6 text-primary" />
            {lang === "ar" ? "إحصائيات المكتبة" : "Our Statistics"}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="text-3xl font-black gradient-text mb-1">{s.num}</div>
                <p className="text-sm text-muted-foreground">{lang === "ar" ? s.ar : s.en}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center glass-card p-8 md:p-12 rounded-2xl">
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            {lang === "ar"
              ? "إذا كنت طالبًا أو باحثًا أو مهتمًا بالفنون، فإن مكتبة نغم للفنون توفر لك كل ما تحتاجه من منتجات وخدمات في مكان واحد. يمكنك تصفح المنتجات أو طلب الخدمات مباشرة من الموقع أو التواصل معنا."
              : "Whether you're a student, researcher, or art enthusiast, Nagham Arts provides everything you need in one place. Browse products, order services, or contact us directly."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/shop" className="px-6 py-3 rounded-xl gradient-bg text-primary-foreground font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              {lang === "ar" ? "تصفح المنتجات" : "Browse Products"}
            </Link>
            <Link to="/services" className="px-6 py-3 rounded-xl border-2 border-primary text-primary font-medium hover:bg-primary/5 transition-colors flex items-center gap-2">
              <Send className="w-5 h-5" />
              {lang === "ar" ? "طلب خدمة الآن" : "Order a Service"}
            </Link>
            <Link to="/contact" className="px-6 py-3 rounded-xl border-2 border-accent text-accent font-medium hover:bg-accent/5 transition-colors flex items-center gap-2">
              <Phone className="w-5 h-5" />
              {lang === "ar" ? "تواصل معنا" : "Contact Us"}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
