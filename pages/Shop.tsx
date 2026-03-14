import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ProductCard from "@/components/ProductCard";
import { artProducts, homeProducts } from "@/data/products";

const Shop = () => {
  const { t, lang } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCat = searchParams.get("cat") || "art";
  const [search, setSearch] = useState("");

  const categories = [
    { key: "art", label: t("sections.art") },
    { key: "home", label: t("sections.home_ec") },
  ];

  const products = activeCat === "art" ? artProducts : homeProducts;
  const filtered = products.filter(p =>
    search ? (lang === "ar" ? p.name : p.nameEn).toLowerCase().includes(search.toLowerCase()) : true
  );

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{t("nav.shop")}</h1>
          <p className="text-muted-foreground">{lang === "ar" ? "تصفح جميع منتجاتنا" : "Browse all our products"}</p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex gap-2">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setSearchParams({ cat: cat.key })}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeCat === cat.key ? "gradient-bg text-primary-foreground" : "glass-card text-foreground/70 hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={lang === "ar" ? "ابحث عن منتج..." : "Search products..."}
              className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
            />
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} id={p.id} name={p.name} nameEn={p.nameEn} price={p.price} image={p.image} delay={i * 0.03} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            {lang === "ar" ? "لا توجد نتائج" : "No results found"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
