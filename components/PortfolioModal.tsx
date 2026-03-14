import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, Calendar, User, Award } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface PortfolioItem {
  title: { ar: string };
  desc: { ar: string };
  img: string;
}

interface PortfolioModalProps {
  project: PortfolioItem;
  isOpen: boolean;
  onClose: () => void;
}

const PortfolioModal = ({ project, isOpen, onClose }: PortfolioModalProps) => {
  const galleryImages = [
    project.img || '/api/placeholder/800/500?text=Project+Image+1',
    '/api/placeholder/800/500?text=Project+Image+2',
    '/api/placeholder/800/500?text=Project+Image+3',
    '/api/placeholder/800/500?text=Project+Image+4'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] p-0 bg-transparent border-0 sm:rounded-3xl overflow-hidden glass-card shadow-2xl">
        <div className="h-full grid grid-cols-1 lg:grid-cols-2 p-6 md:p-8 lg:p-12">
          {/* Gallery */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative order-2 lg:order-1"
          >
            <div className="h-96 lg:h-full rounded-3xl overflow-hidden shadow-2xl border glass-card mb-6 lg:mb-0">
              <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                navigation={{
                  prevEl: '.portfolio-prev',
                  nextEl: '.portfolio-next',
                }}
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000, pauseOnMouseEnter: true }}
                loop={true}
                className="h-full"
              >
                {galleryImages.map((imgSrc, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="h-full w-full">
                      <img 
                        src={imgSrc} 
                        alt={`${project.title.ar} - صورة ${idx + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="flex gap-3 justify-center lg:hidden">
              <button className="portfolio-prev w-12 h-12 rounded-full glass-card flex items-center justify-center shadow-lg hover:shadow-glow backdrop-blur-xl text-primary">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button className="portfolio-next w-12 h-12 rounded-full glass-card flex items-center justify-center shadow-lg hover:shadow-glow backdrop-blur-xl text-primary">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>

          {/* Project Details */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="order-1 lg:order-2 flex flex-col justify-between"
          >
            <DialogHeader className="mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex flex-col gap-2">
                  <DialogTitle className="text-4xl lg:text-5xl font-black leading-tight gradient-text">
                    {project.title.ar}
                  </DialogTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>2024</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>فريق نغم</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      <Badge className="bg-gradient-to-r from-accent to-primary text-primary-foreground px-3 py-1">
                        مميز
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-8 max-w-lg">
                {project.desc.ar}
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2 p-4 rounded-xl glass-card">
                  <span className="text-muted-foreground/70 text-xs uppercase font-medium tracking-wider">التقنيات</span>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/30">React.js</Badge>
                    <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/30">Tailwind</Badge>
                    <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/30">Framer Motion</Badge>
                  </div>
                </div>
                <div className="space-y-2 p-4 rounded-xl glass-card">
                  <span className="text-muted-foreground/70 text-xs uppercase font-medium tracking-wider">المميزات</span>
                  <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>تصميم متجاوب</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-secondary flex-shrink-0" />
                      <span>تحسين SEO</span>
                    </span>
                  </div>
                </div>
              </div>
            </DialogHeader>

            <DialogFooter className="gap-4 pt-6 border-t border-border/30">
              <Button variant="outline" className="flex-1 rounded-2xl h-16 text-lg font-semibold border-2 hover:bg-muted/50">
                شاهد الموقع الحي
              </Button>
              <Button className="flex-1 rounded-2xl h-16 text-lg font-semibold gradient-bg shadow-lg hover:shadow-glow text-primary-foreground">
                اطلب مشروع مشابه
              </Button>
            </DialogFooter>
          </motion.div>

          {/* Desktop Navigation - Hidden on Mobile */}
  <div className="hidden lg:flex absolute -top-4 -right-4 z-20">
            <button className="portfolio-prev w-16 h-16 rounded-full glass-card flex items-center justify-center shadow-2xl hover:shadow-glow backdrop-blur-3xl text-primary mx-2">
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button className="portfolio-next w-16 h-16 rounded-full glass-card flex items-center justify-center shadow-2xl hover:shadow-glow backdrop-blur-3xl text-primary mx-2">
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioModal;

