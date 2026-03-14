import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Palette, Scissors, Printer, Code, Newspaper, Settings, Image, Phone, Mail } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ServiceModalProps {
  service: {
    id: string;
    title: { ar: string };
    desc: { ar: string };
    color: string;
    images: string[];
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceModal = ({ service, isOpen, onClose }: ServiceModalProps) => {
  if (!service || !isOpen) return null;

  const images = service?.images || [];

  const [currentImg, setCurrentImg] = useState(0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-transparent backdrop-blur-none border-0 sm:rounded-3xl overflow-hidden glass-card shadow-2xl">
        <div className="p-8 md:p-12 h-full flex flex-col">
          <DialogHeader className="flex flex-row items-start justify-between mb-8">
            <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden shadow-2xl border-4 border-white/20 bg-gradient-to-br from-primary/20 to-secondary/20">
                  <img 
                    src={service.images[0]} 
                    alt={service.title.ar}
                    className="w-full h-full object-cover"
                  />
                </div>
              <div>
                <DialogTitle className="text-3xl font-black mb-2">{service.title.ar}</DialogTitle>
                <DialogDescription className="text-xl text-muted-foreground max-w-md leading-relaxed">
                  {service.desc.ar}
                </DialogDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="rounded-full p-2 hover:bg-primary/10" onClick={onClose}>
              <X className="w-6 h-6" />
            </Button>
          </DialogHeader>

          {/* Images Gallery */}
          <div className="flex-1 mb-8">
            <motion.div 
              key={currentImg}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-64 md:h-80 lg:h-96 rounded-3xl overflow-hidden shadow-2xl glass-card border"
            >
              <img 
                src={images[currentImg]} 
                alt={`${service.title.ar} ${currentImg + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm border-white/30 text-white font-semibold px-4 py-2">
                  صورة {currentImg + 1} من {images.length}
                </Badge>
              </div>
            </motion.div>
            <div className="flex gap-2 mt-4 justify-center">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentImg ? 'w-8 bg-primary shadow-lg' : 'bg-muted-foreground/50 hover:bg-muted-foreground'
                  }`}
                  onClick={() => setCurrentImg(idx)}
                />
              ))}
            </div>
            <div className="flex gap-2 mt-4 justify-between">
              <Button variant="outline" size="sm" className="flex-1 rounded-xl h-12" onClick={() => setCurrentImg((currentImg - 1 + images.length) % images.length)}>
                <ChevronLeft className="w-5 h-5 mr-2 h-5" />
                السابق
              </Button>
              <Button className="flex-1 rounded-xl h-12 gradient-bg text-primary-foreground shadow-lg" onClick={() => setCurrentImg((currentImg + 1) % images.length)}>
                التالي
                <ChevronRight className="w-5 h-5 ml-2 h-5" />
              </Button>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4 mb-8">
            <h3 className="text-2xl font-bold text-foreground">ما نقدمه في هذه الخدمة:</h3>
            <ul className="space-y-2 text-muted-foreground text-lg">
              <li className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border">
                <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
                  <Image className="w-5 h-5 text-primary-foreground" />
                </div>
                <span>أحدث الأدوات والمواد عالية الجودة</span>
              </li>
              <li className="flex items-center gap-3 p-3 rounded-xl bg-secondary/5 border">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-accent-foreground" />
                </div>
                <span>دعم فني على مدار الساعة</span>
              </li>
              <li className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border">
                <div className="w-8 h-8 rounded-lg gradient-accent-bg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-accent-foreground" />
                </div>
                <span>توصيل سريع لجميع المحافظات</span>
              </li>
            </ul>
          </div>

          <DialogFooter className="gap-4 pt-4 border-t border-border/50">
            <Button variant="outline" className="flex-1 h-14 rounded-2xl text-lg border-2 font-semibold hover:bg-muted/50">
              احصل على عرض سعر مجاني
            </Button>
            <Button className="flex-1 h-14 rounded-2xl text-lg gradient-bg text-primary-foreground shadow-lg hover:shadow-glow font-semibold">
              اطلب هذه الخدمة الآن
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceModal;

