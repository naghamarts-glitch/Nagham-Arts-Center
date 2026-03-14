import { useRef, useEffect, useState } from "react";
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import pigmentImg from '@/assets/products/pigment-colors.png';
import gouacheImg from '@/assets/products/gouache-colors.png';
import oilImg from '@/assets/products/oil-colors.png';
import glassImg from '@/assets/products/glass-colors.png';
import ceramicImg from '@/assets/products/ceramic-colors.png';
import faber48Img from '@/assets/products/faber-castell-48.png';
import oilcolors from '@/assets/products/oil-colors.png';
import h1 from '@/assets/products/h1.png';
import h4 from '@/assets/products/h4.png';
import h10 from '@/assets/products/h10.png';
import e1 from '@/assets/products/e1.jpg';
import mdfImg from '@/assets/products/MDF-11.png';
import plywoodImg from '@/assets/products/plywood.png';
import w2 from '@/assets/products/w2.png';
import w3 from '@/assets/products/w3.png';
import w4 from '@/assets/products/w4.png';
import e2 from '@/assets/products/e2.png';
import e3 from '@/assets/products/e3.png';
import b1 from '@/assets/products/b1.png';
import b2 from '@/assets/products/b2.jpg';
import b3 from '@/assets/products/b3.jpg';
import q1 from '@/assets/products/q1.png';
import q2 from '@/assets/products/q2.png';
import q3 from '@/assets/products/q3.png';

import woodShellsImg from '@/assets/products/wood-shells.png';
import { artProducts } from '@/data/products';

import ServiceModal from '@/components/ServiceModal';
import PortfolioModal from '@/components/PortfolioModal';
import { 
  ShoppingBag, Headphones, Sparkles, MessageCircle, Phone, MapPin, Star, 
  Palette, Scissors, Printer, Code, Newspaper, Settings, Award, Clock, DollarSign, Zap,
  CheckCircle2, Send, ChevronRight, ChevronDown, ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';

import { toast } from 'sonner';

const services = [
  {
    id: 'art',
    title: { ar: '🎨 مستلزمات الفنون', en: '🎨 Art Supplies' },
    desc: { ar: 'ألوان – أدوات رسم – أدوات يدوية.', en: 'Colors - Drawing tools - Handcrafts.' },
    images: [pigmentImg, gouacheImg, oilcolors],
    color: 'from-violet-500 to-pink-500'
  },
  {
    id: 'sewing',
    title: { ar: '🧵 مستلزمات الخياطة والكروشيه', en: '🧵 Sewing & Crochet Supplies' },
    desc: { ar: 'خيوط – إبر – أدوات تطريز.', en: 'Threads - Needles - Embroidery tools.' },
    images: [h1, h4, h10],
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'print',
    title: { ar: '🖨 خدمات الطباعة', en: '🖨 Printing Services' },
    desc: { ar: 'طباعة – تصوير – تصميم.', en: 'Printing - Photocopy - Design.' },
    images: [w4,w2 , w3],
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'web',
    title: { ar: '💻 إنشاء المواقع الإلكترونية', en: '💻 Website Creation' },
    desc: { ar: 'تصميم مواقع للشركات والمتاجر الإلكترونية.', en: 'Website design for companies & e-commerce.' },
    images: [e1, e2, e3],
    color: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'news',
    title: { ar: '📰 مواقع المجلات والصحف', en: '📰 Magazines & Newspapers Sites' },
    desc: { ar: 'تصميم مواقع إخبارية احترافية مثل الأهرام والأخبار واليوم السابع.', en: 'Professional news sites like Al-Ahram, Al-Akhbar, Youm7.' },
    images: [faber48Img, gouacheImg, oilImg],
    color: 'from-purple-500 to-fuchsia-500'
  },
  {
    id: 'custom',
    title: { ar: '⚙ خدمات لطلاب الماجستير والدكتوراة ومشاريع التخرج', en: '⚙Services for Master s and PhD students and graduation projects ' },
    desc: { ar: ' جميع خدمات  رسائل الماجستير والدكتوراة ومشاريع التخرج', en: 'Any digital service or custom development.' },
    images: [b1, b2, b3],
    color: 'from-amber-500 to-yellow-500'
  }
];

const portfolio = [
  { 
    title: { ar: 'موقع الأهرام الإلكتروني', en: 'Al-Ahram Electronic Site' }, 
    desc: { ar: 'نظام نشر إخباري كامل مع لوحة تحكم متقدمة', en: 'Complete news publishing system with advanced dashboard' }, 
    img:[ q1]  || '/placeholder.svg' 
  },
  { 
    title: { ar: 'متجر إلكتروني متكامل', en: 'Complete E-commerce Store' }, 
    desc: { ar: 'منصة بيع مع دفع إلكتروني وإدارة مخزون', en: 'Sales platform with electronic payment & inventory management' }, 
    img: e1 || '/placeholder.svg' 
  },
  { 
    title: { ar: 'بورتفوليو فنان', en: 'Artist Portfolio' }, 
    desc: { ar: 'تصميم عصري تفاعلي لعرض الأعمال الفنية', en: 'Modern interactive design for art showcase' }, 
    img: artProducts[0]?.image || '/placeholder.svg' 
  },
  { 
    title: { ar: 'لوحة تحكم إدارية', en: 'Admin Control Panel' }, 
    desc: { ar: 'نظام إدارة المحتوى والطلبات والمستخدمين', en: 'Content, orders & users management system' }, 
    img: artProducts[3]?.image || '/placeholder.svg' 
  }
];


                                                                            const Index = () => {
  const { lang, t } = useLanguage();
  const carouselApi = useRef<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!carouselApi.current) return;

    const api = carouselApi.current;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    api.on('select', () => {
      setActiveIndex(api.selectedScrollSnap());
    });

    return () => {
      clearInterval(interval);
      api.off('select');
    };
  }, []);


  const heroImages = [
    pigmentImg,
    gouacheImg,
    oilImg,
    glassImg,
    ceramicImg,
    faber48Img
  ];

  const whyNagham = [
{ icon: Zap, title: '⚡ سرعة التنفيذ', desc: 'تنفيذ المشاريع بسرعة عالية مع الحفاظ على الجودة' },

{ icon: Award, title: '🎨 تصميم احترافي', desc: 'تصميمات عصرية وجذابة تناسب علامتك التجارية' },

{ icon: DollarSign, title: '💰 أسعار مناسبة', desc: 'أفضل جودة بأسعار تنافسية ومناسبة للجميع' },

{ icon: Headphones, title: '🛠 دعم فني مستمر', desc: 'دعم ومتابعة فنية بعد تنفيذ الخدمة' },

{ icon: Star, title: '⭐ خبرة في المجال', desc: 'سنوات من الخبرة وتنفيذ العديد من المشاريع الناجحة' }

  ];

  const whatWeOffer = services.map(service => service.title[lang]);

  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [selectedProject, setSelectedProject] = useState(portfolio[0]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', service_type: '', details: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleServiceOpen = (service: typeof services[0]) => setSelectedService(service);
  const handleServiceClose = () => setSelectedService(null);
  const handleProjectOpen = (project: typeof portfolio[0]) => {
    setSelectedProject(project);
    setShowProjectModal(true);
  };
  const handleProjectClose = () => setShowProjectModal(false);

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/backend/create-service-request.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setFormData({ name: '', phone: '', service_type: '', details: '' });
        setShowFormModal(false);
      } else {
        toast.error(data.error || 'حدث خطأ في الإرسال');
      }
    } catch (error) {
      toast.error('خطأ في الاتصال بالخادم');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl" animate={{ y: [0, -30, 0] }} transition={{ duration: 8, repeat: Infinity }} />
        <motion.div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" animate={{ y: [0, 30, 0] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }} />
        <motion.div className="absolute top-1/2 -left-20 w-64 h-64 rounded-full bg-accent/5 blur-2xl" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity }} />
      </div>

      {/* Hero Section */}
      <section id="hero" className="min-h-[100svh] flex flex-col items-center justify-center relative overflow-hidden pt-24">
        {/* Background Image Slider */}
        <div className="absolute inset-0 -z-10 h-full w-full">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
              draggable: false,
              containScroll: 'trimSnaps',
              skipSnaps: false
            }}
            setApi={(api) => (carouselApi.current = api)}
            className="h-full w-full"
          >
            <CarouselContent className="-ml-0 h-full w-full">
              {heroImages.map((imgSrc, index) => (
                <CarouselItem key={index} className="pl-0 h-full w-full basis-full">
                  <motion.div
                    className="h-full w-full"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5 }}
                  >
                    <img
                      src={imgSrc}
                      alt={`Art supply ${index + 1}`}
                      className="h-full w-full object-cover"
                      loading={index === 0 ? 'eager' : 'lazy'}
                      sizes="100vw"
                    />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/60 backdrop-blur-[1px]" />

        {/* Slider Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20 md:flex-row flex-col">
{heroImages.map((_, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${isActive ? 'bg-white scale-125 shadow-lg' : 'bg-white/50 hover:bg-white'}`}
                onClick={() => carouselApi.current?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-pressed={isActive}
              />
            );
          })}
        </div>

        <div className="container mx-auto px-6 text-center relative z-30">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto backdrop-blur-xl bg-black/60 rounded-3xl p-12 md:p-16 shadow-2xl border border-white/20"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary font-semibold mb-8">
              <Sparkles className="w-5 h-5" />
              <span>=مركز نغم للفنون - الجودة والاحترافية</span>
            </div>
            <motion.div 
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight mb-6">
                {t("hero.title")}
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed mb-12">
                {t("hero.subtitle")}
              </p>
            </motion.div>
            <div className="flex flex-col lg:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
              <Button 
                onClick={() => scrollToSection('services')}
                className="group w-full lg:w-auto px-10 py-8 text-lg font-bold rounded-3xl shadow-2xl hover:shadow-glow bg-gradient-to-r from-purple-600 via-indigo-500 to-violet-600 hover:from-purple-700 h-16 transition-all duration-300 flex items-center gap-3"
              >
                {t("hero.browse")}
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                onClick={() => setShowFormModal(true)}
                variant="outline"
                className="w-full lg:w-auto px-10 py-8 text-lg font-bold rounded-3xl border-2 border-primary/50 bg-white/10 backdrop-blur-xl hover:bg-white/20 hover:border-primary h-16 shadow-xl transition-all duration-300 flex items-center gap-3"
              >
                {t("hero.order")}
                <Send className="w-6 h-6" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-foreground to-primary bg-clip-text mb-6">
              {t("index.services.title")}
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              مجموعة شاملة من الخدمات الاحترافية لتلبية جميع احتياجاتك الفنية والرقمية
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group cursor-pointer glass-card overflow-hidden rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border hover:border-primary/50"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {service.images.map((imgSrc, imgIndex) => (
                    <div key={imgIndex} className="group relative overflow-hidden rounded-full aspect-square shadow-2xl hover:shadow-purple-glow border-4 border-white/20 cursor-pointer hover:scale-105 transition-all duration-500 bg-gradient-to-br from-white/10 to-transparent">
                      <img 
                        src={imgSrc}
                        alt={`${service.title[lang]} ${imgIndex + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                        loading={imgIndex === 0 ? 'eager' : 'lazy'}
                      />
                    </div>
                  ))}
                </div>
                <CardTitle className="text-2xl md:text-3xl font-black mb-4 text-foreground group-hover:text-primary transition-colors">
                  {service.title[lang]}
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground mb-10 leading-relaxed">
                  {service.desc[lang]}
                </CardDescription>
                {/* Preview image removed as 3-grid covers it */}
                <Button 
                  onClick={() => handleServiceOpen(service)}
                  className="w-full rounded-2xl h-14 bg-gradient-to-r from-primary to-secondary text-lg font-bold shadow-lg hover:shadow-glow transition-all duration-300"
                >
                  {lang === 'ar' ? 'عرض الخدمة' : 'View Service'}
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-32 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-foreground to-secondary bg-clip-text mb-6">
              {t("index.portfolio.title")}
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              أبرز مشاريعنا التي أذهلت العملاء وأثبتت كفاءتنا
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
{portfolio.map((project, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group cursor-pointer glass-card overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl border hover:border-primary/50 transition-all duration-500"
              >
                <div className="h-64 lg:h-72 relative overflow-hidden group-hover:brightness-110">
                  <img 
                    src={project.img} 
                    alt={project.title.ar}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <Badge className="bg-white/20 backdrop-blur-sm border-white/40 text-white px-4 py-2 font-semibold shadow-lg">
                      مشروع مميز
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-8 pt-0">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title[lang]}</h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed">{project.desc[lang]}</p>
                  <Button 
                    variant="ghost"
                    className="w-full justify-start rounded-2xl h-14 border hover:border-primary/50 group-hover:translate-x-2 transition-all"
                    onClick={() => handleProjectOpen(project)}
                  >
                    {lang === 'ar' ? 'عرض المشروع' : 'View Project'}
                    <ChevronRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Nagham Section */}
      <section id="why" className="py-32 relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #020617 100%)'
      }}>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-primary/80 to-secondary/80 bg-clip-text text-transparent">
              {t("index.why.title")}
            </h2>
            <p className="text-2xl text-white/90 max-w-4xl mx-auto">
              الثقة التي تستحقها في كل خطوة من رحلتك الفنية والرقمية
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {whyNagham.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -16, scale: 1.05 }}
                className="group p-10 rounded-3xl text-center bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 hover:shadow-2xl hover:shadow-glow transition-all duration-500 cursor-default"
              >
                <motion.div 
                  className="w-24 h-24 mx-auto mb-8 rounded-3xl flex items-center justify-center shadow-2xl group-hover:shadow-glow/50 bg-gradient-to-br from-primary to-secondary"
                  whileHover={{ rotate: [0, 5, -5, 0], scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-12 h-12 text-white drop-shadow-2xl" />
                </motion.div>
                <h3 className="text-2xl font-black text-white mb-4 group-hover:translate-y-2 transition-transform">{feature.title}</h3>
                <p className="text-white/90 leading-relaxed text-lg">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section id="offer" className="py-32 bg-gradient-to-b from-background to-muted/50">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="text-center mb-24 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text mb-6">
              {t("index.offer.title")}
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground">
              خدمات شاملة تغطي كل احتياجاتك في عالم الفنون والتكنولوجيا
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {whatWeOffer.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg"
                >
                  <motion.div 
                    className="w-12 h-12 rounded-2xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-all duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.4 }}
                  >
                    <CheckCircle2 className="w-7 h-7 text-primary-foreground" />
                  </motion.div>
                  <span className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text mb-6">
              {t("index.cta.title")}
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              تواصل معنا الآن وابدأ مشروعك مع أفضل المتخصصين
            </p>
            <div className="flex flex-col lg:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
              <Button 
                onClick={() => setShowFormModal(true)}
                className="group w-full lg:w-auto px-12 py-10 text-xl font-black rounded-3xl shadow-2xl hover:shadow-glow bg-gradient-to-r from-primary via-secondary to-accent h-20 transition-all duration-500 flex items-center gap-4"
                size="lg"
              >
                {t("index.cta.free")}
                <Send className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
              </Button>
              <Button 
                asChild
                className="w-full lg:w-auto px-12 py-10 text-xl font-bold rounded-3xl border-3 border-primary bg-white/20 backdrop-blur-xl hover:bg-white/40 shadow-2xl h-20 transition-all duration-300 flex items-center gap-4"
                variant="outline"
                size="lg"
              >
                <a href="https://wa.me/201121688248?text=مرحبا، أود استفسار عن خدماتكم" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4">
                  تواصل واتساب
                  <MessageCircle className="w-7 h-7" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Request Form Modal */}
      <Dialog open={showFormModal} onOpenChange={setShowFormModal}>
        <DialogContent className="max-w-2xl sm:max-w-3xl max-h-[90vh] rounded-3xl glass-card shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSubmitForm} className="space-y-8 p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text mb-4">
                اطلب خدمتك الآن
              </h2>
              <p className="text-xl text-muted-foreground max-w-md mx-auto">
                سنتواصل معك خلال 24 ساعة لتنسيق التفاصيل
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-lg font-semibold mb-3 block">الاسم الكامل</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="h-16 rounded-2xl border-2 border-border bg-white/20 backdrop-blur-xl focus:border-primary text-lg px-6"
                  placeholder="الاسم الكامل"
                  required
                />
              </div>
              <div>
                <Label className="text-lg font-semibold mb-3 block">رقم الهاتف</Label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="h-16 rounded-2xl border-2 border-border bg-white/20 backdrop-blur-xl focus:border-primary text-lg px-6"
                  placeholder="01xxxxxxxxx"
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-lg font-semibold mb-3 block">نوع الخدمة</Label>
              <Select value={formData.service_type} onValueChange={(v) => setFormData({...formData, service_type: v})}>
                <SelectTrigger className="h-16 rounded-2xl border-2 border-border bg-white/20 backdrop-blur-xl focus:border-primary text-lg px-6">
                  <SelectValue placeholder="اختر نوع الخدمة المطلوبة" />
                </SelectTrigger>
                <SelectContent>
                  {services.map(s => (
                    <SelectItem key={s.id} value={s.title.ar}>
                      {s.title.ar}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-lg font-semibold mb-3 block">تفاصيل الطلب (اختياري)</Label>
              <Textarea
                value={formData.details}
                onChange={(e) => setFormData({...formData, details: e.target.value})}
                className="min-h-[160px] rounded-2xl border-2 border-border bg-white/20 backdrop-blur-xl focus:border-primary text-lg px-6 py-5 resize-vertical"
                placeholder="صف لنا تفاصيل طلبك، الأبعاد، الألوان، الميزانية، أو أي معلومات أخرى..."
              />
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-20 rounded-3xl text-2xl font-black shadow-2xl hover:shadow-glow bg-gradient-to-r from-primary via-secondary to-accent disabled:opacity-50 transition-all duration-300"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mr-4" />
                  جار الإرسال...
                </>
              ) : (
                <>
                  إرسال الطلب مجاناً
                  <Send className="w-7 h-7 ml-4" />
                </>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {selectedService && <ServiceModal service={selectedService} isOpen={!!selectedService} onClose={handleServiceClose} />}
      <PortfolioModal project={selectedProject} isOpen={showProjectModal} onClose={handleProjectClose} />

      <footer className="border-t border-border/50 bg-background/80 backdrop-blur-sm py-12 mt-32">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground text-lg mb-4">
            {t('footer.rights')}
          </p>
          <div className="flex justify-center items-center gap-6 text-muted-foreground">
            <a href="tel:01099817790" className="hover:text-primary transition-colors">
              <Phone className="w-6 h-6 inline" />
            </a>
            <a href="https://wa.me/201121688248" className="hover:text-green-500 transition-colors">
              <MessageCircle className="w-6 h-6 inline" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;