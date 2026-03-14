import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { BookOpen, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

const grades = [
  { key: "1", ar: "الصف الأول الثانوي", en: "First Year Secondary" },
  { key: "2", ar: "الصف الثاني الثانوي", en: "Second Year Secondary" },
  { key: "3", ar: "الصف الثالث الثانوي", en: "Third Year Secondary" },
];

const bookTypes = [
  { ar: "كتب الوزارة", en: "Ministry Books" },
  { ar: "كتاب الامتحان", en: "Al-Emtihan Book" },
  { ar: "كتاب المعاصر", en: "Al-Moasser Book" },
  { ar: "كتاب الأضواء", en: "Al-Adwaa Book" },
  { ar: "كتاب الشامل", en: "Al-Shamel Book" },
  { ar: "كتب المراجعة النهائية", en: "Final Review Books" },
];

const Books = () => {
  const { lang } = useLanguage();
  const { addItem } = useCart();
  const [selectedGrade, setSelectedGrade] = useState("1");
  const [delivery, setDelivery] = useState<"pickup" | "delivery">("pickup");

  const handleAdd = (book: { ar: string; en: string }) => {
    const grade = grades.find(g => g.key === selectedGrade);
    addItem({
      id: `book-${selectedGrade}-${book.en}`,
      name: `${book.ar} - ${grade?.ar}`,
      nameEn: `${book.en} - ${grade?.en}`,
      price: 0,
    });
    toast.success(lang === "ar" ? "تمت إضافة الكتاب للسلة" : "Book added to cart");
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {lang === "ar" ? "حجز كتب الثانوية العامة" : "High School Book Reservation"}
          </h1>
          <p className="text-muted-foreground">
            {lang === "ar" ? "احجز كتبك الدراسية أونلاين واستلمها من المكتبة أو بالتوصيل" : "Book your textbooks online — pick up or delivery"}
          </p>
        </motion.div>

        {/* Grade Selection */}
        <div className="flex flex-wrap gap-3 mb-8">
          {grades.map(g => (
            <button
              key={g.key}
              onClick={() => setSelectedGrade(g.key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                selectedGrade === g.key ? "gradient-bg text-primary-foreground" : "glass-card text-foreground/70 hover:text-foreground"
              }`}
            >
              {lang === "ar" ? g.ar : g.en}
            </button>
          ))}
        </div>

        {/* Delivery */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setDelivery("pickup")}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              delivery === "pickup" ? "gradient-accent-bg text-accent-foreground" : "glass-card text-foreground/70"
            }`}
          >
            {lang === "ar" ? "استلام من المكتبة" : "Pickup from Store"}
          </button>
          <button
            onClick={() => setDelivery("delivery")}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              delivery === "delivery" ? "gradient-accent-bg text-accent-foreground" : "glass-card text-foreground/70"
            }`}
          >
            {lang === "ar" ? "توصيل" : "Delivery"}
          </button>
        </div>

        {/* Books */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookTypes.map((book, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-6 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm">{lang === "ar" ? book.ar : book.en}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {lang === "ar" ? grades.find(g => g.key === selectedGrade)?.ar : grades.find(g => g.key === selectedGrade)?.en}
                </p>
              </div>
              <button
                onClick={() => handleAdd(book)}
                className="p-2.5 rounded-xl gradient-bg text-primary-foreground hover:opacity-90 transition-opacity shrink-0"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Books;
