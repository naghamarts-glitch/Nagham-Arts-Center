import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import {
  Palette, Scissors, Printer, Code, Newspaper, Settings,
  Award, Clock, DollarSign, Headphones, Zap,
  User, Phone, Mail, MessageSquare, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const ServicesPage = () => {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    details: ''
  });

  const services = [
    {
      id: 'art',
      icon: Palette,
      title: { ar: 'مستلزمات الفنون', en: 'Art Supplies' },
      desc: { ar: 'ألوان – فرش رسم – أدوات فنية – أدوات يدوية', en: 'Paints – Brushes – Art tools – Crafts' },
      color: 'from-violet-500 to-pink-500'
    },
    {
      id: 'sewing',
      icon: Scissors,
      title: { ar: 'مستلزمات الخياطة والكروشيه', en: 'Sewing & Crochet Supplies' },
      desc: { ar: 'خيوط – إبر – أقمشة – أدوات تطريز', en: 'Threads – Needles – Fabrics – Embroidery tools' },
      color: 'from-emerald-500 to-teal-500'
    },
    {
      id: 'print',
      icon: Printer,
      title: { ar: 'خدمات الطباعة', en: 'Printing Services' },
      desc: { ar: 'طباعة مستندات – تصوير – تصميم بسيط', en: 'Document printing – Photocopy – Simple design' },
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'web',
      icon: Code,
      title: { ar: 'إنشاء المواقع الإلكترونية', en: 'Website Development' },
      desc: { ar: 'تصميم وتطوير مواقع احترافية للشركات والمتاجر', en: 'Professional websites for businesses & stores' },
      color: 'from-blue-500 to-indigo-500'
    },
    {
      id: 'news',
      icon: Newspaper,
      title: { ar: 'مواقع المجلات والصحف', en: 'News & Magazine Websites' },
      desc: { ar: 'مواقع إخبارية مثل الأهرام واليوم السابع مع لوحة تحكم', en: 'News sites like Al-Ahram with CMS' },
      color: 'from-purple-500 to-fuchsia-500'
    },
    {
      id: 'custom',
      icon: Settings,
      title: { ar: 'خدمات حسب الطلب', en: 'Custom Services' },
      desc: { ar: 'أي خدمة رقمية أو تصميم أو تطوير حسب طلبك', en: 'Any digital service on demand' },
      color: 'from-amber-500 to-yellow-500'
    }
  ];

  const portfolio = [
    { title: { ar: 'موقع الأهرام الإلكتروني', en: 'Al-Ahram Website' }, desc: { ar: 'نظام نشر إخباري كامل', en: 'Full news publishing system' }, img: '/api/placeholder/400/250' },
    { title: { ar: 'متجر إلكتروني', en: 'E-commerce Store' }, desc: { ar: 'منصة بيع متكاملة', en: 'Complete sales platform' }, img: '/api/placeholder/400/250' },
    { title: { ar: 'بورتفوليو شخصي', en: 'Personal Portfolio' }, desc: { ar: 'تصميم عصري للفنانين', en: 'Modern design for artists' }, img: '/api/placeholder/400/250' },
    { title: { ar: 'لوحة تحكم', en: 'Admin Dashboard' }, desc: { ar: 'إدارة المحتوى والطلبات', en: 'Content & orders management' }, img: '/api/placeholder/400/250' }
  ];

  const features = [
    { icon: Award, title: { ar: 'تصميم احترافي', en: 'Professional Design' }, desc: { ar: 'تصميم عصري يناسب علامتك التجارية', en: 'Modern design matching your brand' } },
    { icon: Clock, title: { ar: 'سرعة في التنفيذ', en: 'Fast Delivery' }, desc: { ar: 'تسليم سريع مع الحفاظ على الجودة', en: 'Fast delivery with quality' } },
    { icon: DollarSign, title: { ar: 'أسعار مناسبة', en: 'Affordable Prices' }, desc: { ar: 'جودة عالية بأسعار تنافسية', en: 'High quality at competitive prices' } },
    { icon: Headphones, title: { ar: 'دعم فني مستمر', en: 'Ongoing Support' }, desc: { ar: 'دعم فني 24/7 بعد التسليم', en: '24/7 technical support' } },
    { icon: Zap, title: { ar: 'تنفيذ أي فكرة', en: 'Any Idea Executed' }, desc: { ar: 'ننفذ أي فكرة حسب رؤيتك', en: 'We execute any idea your vision' } }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert(lang === 'ar' ? 'تم إرسال طلبك بنجاح!' : 'Request sent successfully!');
    setFormData({ name: '', phone: '', service: '', details: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-accent/20 pt-24 pb-16">
      {/* Floating Background Shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-1/2 left-10 w-64 h-64 bg-secondary/10 rounded-full blur-2xl"
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -bottom-40 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24 py-24"
        >
          <motion.div 
            className="inline-block px-8 py-6 bg-white/20 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl mb-8"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6 leading-tight">
              مكتبة نغم للفنون
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              نقدم جميع خدمات الفنون، الأدوات المكتبية، والخدمات الرقمية باحترافية عالية
            </p>
          </motion.div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="group bg-gradient-to-r from-primary to-secondary text-xl px-12 py-8 shadow-2xl hover:shadow-glow hover:-translate-y-1 transition-all duration-300 font-semibold min-w-[200px]">
              استعرض المنتجات
              <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="text-xl px-12 py-8 border-2 border-primary/50 bg-white/20 backdrop-blur-xl hover:bg-white/40 hover:border-primary font-semibold min-w-[200px]">
              اطلب خدمتك الآن
            </Button>
          </div>
        </motion.section>

        {/* Services Section */}
        <section className="mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-center mb-20 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text"
          >
            خدماتنا المتميزة
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-card p-8 cursor-pointer group"
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-2xl group-hover:rotate-3 transition-all duration-300`}>
                  <service.icon className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
                <CardTitle className="text-2xl font-black mb-4 group-hover:text-primary transition-colors">
                  {service.title.ar}
                </CardTitle>
                <CardDescription className="text-lg mb-8 leading-relaxed text-muted-foreground">
                  {service.desc.ar}
                </CardDescription>
                <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 shadow-lg hover:shadow-glow">
                  اعرف المزيد
                </Button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-center mb-20 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text"
          >
            أعمالنا المميزة
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {portfolio.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="glass-card overflow-hidden group cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-br from-muted to-accent/30 group-hover:from-primary/20 relative overflow-hidden">
                  <img src={project.img} alt={project.title.ar} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-2">{project.title.ar}</h3>
                  <p className="text-muted-foreground mb-4">{project.desc.ar}</p>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    شاهد المشروع <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-24 py-20 hero-gradient rounded-3xl">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-center mb-4 bg-gradient-to-r from-white to-primary/80 bg-clip-text text-transparent"
          >
            لماذا تختار نغم؟
          </motion.h2>
          <p className="text-xl text-center text-white/90 max-w-3xl mx-auto mb-20">
            خبرة واسعة في تقديم حلول فنية ورقمية متميزة
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="text-center p-8 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 hover:bg-white/30 transition-all duration-300"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-white">{feature.title.ar}</h3>
                <p className="text-white/90">{feature.desc.ar}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-black text-center mb-12 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            اطلب خدمتك الآن
          </motion.h2>
          <Card className="glass-card border-2 border-primary/30 shadow-2xl">
            <CardContent className="p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label className="text-lg font-semibold mb-2 block">الاسم الكامل</Label>
                  <Input 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="h-14 text-lg bg-white/20 backdrop-blur-xl border-2 border-white/30 focus:border-primary rounded-2xl"
                    placeholder="اكتب اسمك هنا..."
                  />
                </div>
                <div>
                  <Label className="text-lg font-semibold mb-2 block">رقم الهاتف</Label>
                  <Input 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="h-14 text-lg bg-white/20 backdrop-blur-xl border-2 border-white/30 focus:border-primary rounded-2xl"
                    placeholder="01xxxxxxxxx"
                  />
                </div>
                <div>
                  <Label className="text-lg font-semibold mb-2 block">نوع الخدمة</Label>
                  <Select value={formData.service} onValueChange={(v) => setFormData({...formData, service: v})}>
                    <SelectTrigger className="h-14 text-lg bg-white/20 backdrop-blur-xl border-2 border-white/30 focus:border-primary rounded-2xl">
                      <SelectValue placeholder="اختر الخدمة..." />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map(s => (
                        <SelectItem key={s.id} value={s.title.ar}>{s.title.ar}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-lg font-semibold mb-2 block">تفاصيل الطلب</Label>
                  <Textarea 
                    value={formData.details}
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    className="h-32 text-lg bg-white/20 backdrop-blur-xl border-2 border-white/30 focus:border-primary rounded-2xl resize-none p-6"
                    placeholder="صف لنا ما تريد بالتفصيل..."
                  />
                </div>
                <Button type="submit" className="w-full h-16 text-xl bg-gradient-to-r from-primary via-secondary to-accent shadow-2xl hover:shadow-glow hover:scale-[1.02] font-bold rounded-3xl">
                  إرسال الطلب مجاناً
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
};

export default ServicesPage;

