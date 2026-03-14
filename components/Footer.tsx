import { Link } from "react-router-dom";
import { Phone, MessageCircle, MapPin, Clock, Facebook } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  const { t, lang } = useLanguage();

  return (
    <footer className="bg-card border-t border-border">

      <div className="container mx-auto px-4 py-12 md:py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Logo + Description */}
          <div>

            <div className="flex items-center gap-3 mb-4">

              <img
                src={logo}
                alt="Nagham Arts"
                className="h-12 w-12 object-contain"
              />

              <span className="text-xl font-bold gradient-text">
                {lang === "ar" ? "نغم للفنون" : "Nagham Arts"}
              </span>

            </div>

            <p className="text-muted-foreground text-sm leading-relaxed">
              {lang === "ar"
                ? "مكتبة متخصصة في توفير خامات التربية الفنية والاقتصاد المنزلي والكتب الدراسية والخدمات الأكاديمية."
                : "Specialized store for art & home economics supplies, textbooks, and academic services."}
            </p>

            <p className="text-muted-foreground text-sm mt-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 shrink-0" />
              {lang === "ar"
                ? "سوهاج – الشرق – خلف الجامعة القديمة – بعد الجراج"
                : "Sohag – East – Behind Old University – After Garage"}
            </p>

          </div>


          {/* Shop */}
          <div>
            <h3 className="font-bold text-foreground mb-4">{t("nav.shop")}</h3>

            <div className="flex flex-col gap-2">

              <Link
                to="/shop?cat=art"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("sections.art")}
              </Link>

              <Link
                to="/shop?cat=home"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("sections.home_ec")}
              </Link>

              <Link
                to="/books"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("sections.books")}
              </Link>

              <Link
                to="/shop?cat=summaries"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("sections.summaries")}
              </Link>

            </div>
          </div>


          {/* Services */}
          <div>

            <h3 className="font-bold text-foreground mb-4">
              {t("nav.services")}
            </h3>

            <div className="flex flex-col gap-2">

              <Link
                to="/services"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("sections.thesis")}
              </Link>

              <Link
                to="/services"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t("sections.web")}
              </Link>

            </div>
          </div>


          {/* Contact */}
          <div>

            <h3 className="font-bold text-foreground mb-4">
              {t("contact.title")}
            </h3>

            <div className="flex flex-col gap-3">

              <a
                href="tel:01099817790"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" /> 01099817790
              </a>

              <a
                href="tel:01121688248"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" /> 01121688248
              </a>

              <a
                href="https://wa.me/201121688248"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                {t("contact.whatsapp")}
              </a>

              <a
                href="https://www.facebook.com/share/18dnXqgEsS/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="w-4 h-4" /> Facebook
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61569051526622"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="w-4 h-4" /> Facebook 2
              </a>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 shrink-0" />
                {t("footer.hours")}
              </div>

            </div>

          </div>

        </div>


        {/* Bottom Footer */}

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-muted-foreground">
            {t("footer.rights")}
          </p>

          <p className="text-sm text-muted-foreground">
            {t("footer.design")}
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;