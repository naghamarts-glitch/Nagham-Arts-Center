import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface ProductCardProps {
  id: string;
  name: string;
  nameEn: string;
  price: number | null;
  image?: string;
  delay?: number;
}

const ProductCard = ({ id, name, nameEn, price, image, delay = 0 }: ProductCardProps) => {
  const { lang, t } = useLanguage();
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({ id, name, nameEn, price: price || 0 });
    toast.success(lang === "ar" ? "تمت الإضافة للسلة" : "Added to cart");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="glass-card overflow-hidden group cursor-pointer"
    >
      <div className="aspect-square bg-muted/50 flex items-center justify-center overflow-hidden">
        {image ? (
          <img src={image} alt={lang === "ar" ? name : nameEn} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
        ) : (
          <div className="w-20 h-20 rounded-2xl gradient-bg opacity-20" />
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-2">
          {lang === "ar" ? name : nameEn}
        </h3>
        {price !== null ? (
          <p className="text-primary font-bold text-lg">{price} {t("shop.currency")}</p>
        ) : (
          <p className="text-muted-foreground text-sm">{lang === "ar" ? "اتصل للسعر" : "Call for price"}</p>
        )}
        <button
          onClick={handleAdd}
          className="mt-3 w-full py-2.5 rounded-lg gradient-bg text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          {t("shop.addToCart")}
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
