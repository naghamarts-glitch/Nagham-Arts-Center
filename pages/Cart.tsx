import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { t, lang } = useLanguage();
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <ShoppingBag className="w-20 h-20 mx-auto text-muted-foreground/30 mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-2">{t("cart.empty")}</h2>
          <Link to="/shop" className="inline-flex mt-4 px-6 py-3 rounded-xl gradient-bg text-primary-foreground font-medium hover:opacity-90 transition-opacity">
            {t("hero.browse")}
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-foreground mb-8">{t("cart.title")} ({totalItems})</h1>
        </motion.div>

        <div className="space-y-3 mb-8">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: lang === "ar" ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-4 flex items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm">{lang === "ar" ? item.name : item.nameEn}</h3>
                {item.price > 0 && <p className="text-primary text-sm font-medium">{item.price} {t("shop.currency")}</p>}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button onClick={() => removeItem(item.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold text-foreground">{t("cart.total")}</span>
            <span className="text-2xl font-black gradient-text">{totalPrice} {t("shop.currency")}</span>
          </div>
          <a
            href={`https://wa.me/201121688248?text=${encodeURIComponent(
              items.map(i => `${i.name} x${i.quantity}`).join("\n") + `\n\nالإجمالي: ${totalPrice} جنيه`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="block w-full py-3.5 rounded-xl gradient-bg text-primary-foreground text-center font-semibold hover:opacity-90 transition-opacity"
          >
            {t("cart.checkout")} — {lang === "ar" ? "واتساب" : "WhatsApp"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cart;
