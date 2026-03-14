import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Phone, MessageCircle, MapPin, Clock, Facebook, Copy, Check,
  Navigation, Send, ChevronDown, ChevronUp, User, Mail, FileQuestion
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { t, lang } = useLanguage();
  const { toast } = useToast();
  const [copiedNum, setCopiedNum] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", type: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  const copyNumber = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNum(num);
    toast({ title: lang === "ar" ? "تم نسخ الرقم" : "Number copied!" });
    setTimeout(() => setCopiedNum(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;
    setFormSent(true);
    setTimeout(() => setFormSent(false), 5000);
    setFormData({ name: "", phone: "", email: "", type: "", message: "" });
  };

  const contactInfo = [
    { icon: Phone, label: t("contact.phone"), value: "01099817790", href: "tel:01099817790", copyable: true },
    { icon: Phone, label: t("contact.phone"), value: "01121688248", href: "tel:01121688248", copyable: true },
    { icon: MessageCircle, label: t("contact.whatsapp"), value: "01121688248", href: "https://wa.me/201121688248", copyable: true },
    { icon: Facebook, label: "Facebook", value: lang === "ar" ? "صفحتنا على فيسبوك" : "Our Facebook Page", href: "https://www.facebook.com/share/18dnXqgEsS/" },
    { icon: Facebook, label: "Facebook 2", value: lang === "ar" ? "صفحتنا الثانية" : "Second Page", href: "https://www.facebook.com/profile.php?id=61569051526622" },
    { icon: MapPin, label: t("contact.address"), value: lang === "ar" ? "شرق سوهاج – قسم ثان سوهاج – محافظة سوهاج – مصر" : "East Sohag – Second District – Sohag Governorate – Egypt" },
    { icon: Clock, label: t("contact.hours"), value: t("footer.hours") },
  ];

  const faqs = [
    {
      q: { ar: "هل يمكن طلب الخدمات أونلاين؟", en: "Can I order services online?" },
      a: { ar: "نعم يمكن طلب جميع الخدمات من خلال الموقع أو تدفع عربون قبل استلام الخدمة لتكون الأولوية لك في الخدمة", en: "Yes, you can order all services through the website or pay a deposit before receiving the service to have priority." },
    },
    {
      q: { ar: "هل يوجد توصيل للكتب؟", en: "Is book delivery available?" },
      a: { ar: "نعم يتوفر استلام من المكتبة أو التوصيل.", en: "Yes, pickup from the store or delivery is available." },
    },
    {
      q: { ar: "كيف يمكن رفع الملفات؟", en: "How can I upload files?" },
      a: { ar: "من خلال نموذج الطلب في الموقع أو من خلال التواصل على الواتساب", en: "Through the order form on the website or via WhatsApp." },
    },
  ];

  const inquiryTypes = lang === "ar"
    ? ["طلب خدمة", "استفسار", "شكوى", "اقتراح"]
    : ["Service Request", "Inquiry", "Complaint", "Suggestion"];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{t("contact.title")}</h1>
          <p className="text-muted-foreground">
            {lang === "ar" ? "نحن هنا لمساعدتك، تواصل معنا بأي طريقة تناسبك" : "We're here to help, reach out in any way you prefer"}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info & Form */}
          <div className="space-y-6">
            {/* Contact cards */}
            {contactInfo.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: lang === "ar" ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="glass-card p-4 flex items-center gap-4"
              >
                <div className="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer" className="font-semibold text-sm text-foreground hover:text-primary transition-colors" dir="ltr">
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-semibold text-sm text-foreground">{item.value}</p>
                  )}
                </div>
                {item.copyable && (
                  <button onClick={() => copyNumber(item.value)} className="p-2 rounded-lg hover:bg-muted transition-colors shrink-0">
                    {copiedNum === item.value ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                  </button>
                )}
              </motion.div>
            ))}

            {/* Directions button */}
            <motion.a
              href="https://maps.app.goo.gl/8mmkK6cbbCuvMsXc8"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl gradient-bg text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              <Navigation className="w-5 h-5" />
              {lang === "ar" ? "اذهب إلى الموقع" : "Get Directions"}
            </motion.a>
          </div>

          {/* Right column: Map + Form */}
          <div className="space-y-6">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card overflow-hidden rounded-2xl h-[300px]"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.5!2d31.7!3d26.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDMzJzAwLjAiTiAzMcKwNDInMDAuMCJF!5e0!3m2!1sar!2seg!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location"
              />
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-2xl"
            >
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Send className="w-5 h-5 text-primary" />
                {lang === "ar" ? "أرسل لنا رسالة" : "Send us a message"}
              </h3>
              {formSent ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Check className="w-8 h-8 text-green-500" />
                  </div>
                  <p className="font-semibold text-foreground">
                    {lang === "ar" ? "تم إرسال رسالتك بنجاح!" : "Message sent successfully!"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {lang === "ar" ? "سنقوم بالرد عليك قريبًا" : "We'll get back to you soon"}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <User className="absolute top-1/2 -translate-y-1/2 start-3 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        required
                        maxLength={100}
                        value={formData.name}
                        onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                        placeholder={lang === "ar" ? "الاسم الكامل" : "Full Name"}
                        className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute top-1/2 -translate-y-1/2 start-3 w-4 h-4 text-muted-foreground" />
                      <input
                        type="tel"
                        maxLength={15}
                        value={formData.phone}
                        onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                        placeholder={lang === "ar" ? "رقم الهاتف" : "Phone Number"}
                        className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                        dir="ltr"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <Mail className="absolute top-1/2 -translate-y-1/2 start-3 w-4 h-4 text-muted-foreground" />
                    <input
                      type="email"
                      maxLength={255}
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      placeholder={lang === "ar" ? "البريد الإلكتروني" : "Email"}
                      className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                      dir="ltr"
                    />
                  </div>
                  <div className="relative">
                    <FileQuestion className="absolute top-1/2 -translate-y-1/2 start-3 w-4 h-4 text-muted-foreground" />
                    <select
                      value={formData.type}
                      onChange={e => setFormData(p => ({ ...p, type: e.target.value }))}
                      className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm appearance-none"
                    >
                      <option value="">{lang === "ar" ? "نوع الاستفسار" : "Inquiry Type"}</option>
                      {inquiryTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <textarea
                    required
                    maxLength={1000}
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    placeholder={lang === "ar" ? "رسالتك..." : "Your message..."}
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm resize-none"
                  />
                  <button type="submit" className="w-full py-3 rounded-xl gradient-bg text-primary-foreground font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    {lang === "ar" ? "إرسال الرسالة" : "Send Message"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>

        {/* Social Media Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            {lang === "ar" ? "تابعنا على وسائل التواصل" : "Follow Us on Social Media"}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/share/18dnXqgEsS/", color: "bg-blue-500" },
              { icon: Facebook, label: "Facebook 2", href: "https://www.facebook.com/profile.php?id=61569051526622", color: "bg-blue-600" },
              { icon: MessageCircle, label: lang === "ar" ? "واتساب" : "WhatsApp", href: "https://wa.me/201121688248", color: "bg-green-500" },
              { icon: Phone, label: lang === "ar" ? "اتصل بنا" : "Call Us", href: "tel:01099817790", color: "bg-primary" },
            ].map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, y: -3 }}
                className={`${s.color} text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:opacity-90 transition-opacity`}
              >
                <s.icon className="w-5 h-5" />
                {s.label}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            {lang === "ar" ? "الأسئلة الشائعة" : "FAQ"}
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-start font-semibold text-foreground hover:bg-muted/30 transition-colors"
                >
                  <span>{lang === "ar" ? faq.q.ar : faq.q.en}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-primary shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />}
                </button>
                {openFaq === i && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="px-4 pb-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{lang === "ar" ? faq.a.ar : faq.a.en}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating Quick Contact */}
      <div className="fixed bottom-6 end-6 z-40 flex flex-col gap-3">
        <motion.a
          href="https://wa.me/201121688248"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.1 }}
          className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          title="WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.a>
        <motion.a
          href="tel:01099817790"
          whileHover={{ scale: 1.1 }}
          className="w-14 h-14 rounded-full gradient-bg text-primary-foreground flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          title={lang === "ar" ? "اتصل" : "Call"}
        >
          <Phone className="w-6 h-6" />
        </motion.a>
      </div>
    </div>
  );
};

export default Contact;
