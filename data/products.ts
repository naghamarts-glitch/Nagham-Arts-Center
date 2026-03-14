import pigmentImg from "@/assets/products/pigment-colors.png";
import faber12Img from "@/assets/products/faber-castell-12.png";
import faber48Img from "@/assets/products/faber-castell-48.png";
import glassImg from "@/assets/products/glass-colors.png";
import oilImg from "@/assets/products/oil-colors.png";
import gouacheImg from "@/assets/products/gouache-colors.png";
import ceramicImg from "@/assets/products/ceramic-colors.png";
import woodShellsImg from "@/assets/products/wood-shells.png";
import plywoodImg from "@/assets/products/plywood.png";
import mdfImg from "@/assets/products/MDF-11.png";
import m12 from "@/assets/products/m12.png";
import m13 from "@/assets/products/m13.png";
import m14 from "@/assets/products/m14.png";
import m15 from "@/assets/products/m15.jpg";
import m16 from "@/assets/products/m16.jpg";
import m17 from "@/assets/products/m17.jpg";
import m18 from "@/assets/products/m18.jpg";
import m19 from "@/assets/products/m19.jpg";
import m20 from "@/assets/products/m20.jpg";
import m21 from "@/assets/products/m21.jpg";
import m22 from "@/assets/products/m22.jpg";
import m23 from "@/assets/products/m23.jpg";
import m24 from "@/assets/products/m24.jpg";
import m25 from "@/assets/products/m25.jpg";
import m26 from "@/assets/products/m26.jpg";
import m27 from "@/assets/products/m27.jpg";
import m28 from "@/assets/products/m28.png";
import m29 from "@/assets/products/m29.png";
import m30 from "@/assets/products/m30.png";
import m31 from "@/assets/products/m31.png";
import m32 from "@/assets/products/m32.png";
import m33 from "@/assets/products/m33.png";
import m34 from "@/assets/products/m34.png";
import m35 from "@/assets/products/m35.png";
import h1 from "@/assets/products/h1.png";
import h2 from "@/assets/products/h2.png";
import h3 from "@/assets/products/h3.png";
import h4 from "@/assets/products/h4.png";
import h5 from "@/assets/products/h5.png";
import h6 from "@/assets/products/h6.png";
import h7 from "@/assets/products/h7.png";
import h8 from "@/assets/products/h8.png";
import h9 from "@/assets/products/h9.png";
import h10 from "@/assets/products/h10.png";
import h11 from "@/assets/products/h11.png";
import h12 from "@/assets/products/h12.png";
import h13 from "@/assets/products/h13.png";
import h14 from "@/assets/products/h14.png";
import h15 from "@/assets/products/h15.jpg";
import h16 from "@/assets/products/h16.png";
import h17 from "@/assets/products/h17.jpg";
import h18 from "@/assets/products/h18.jpg";
import h19 from "@/assets/products/h19.jpg";
import h20 from "@/assets/products/h20.jpg";
import h21 from "@/assets/products/h21.jpg";
import h22 from "@/assets/products/h22.jpg";
import h23 from "@/assets/products/h23.jpg";
import h24 from "@/assets/products/h24.jpg";

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  price: number | null;
  category: "art" | "home" | "summaries";
  image?: string;
}

export const artProducts: Product[] = [
  { id: "a1", name: "الوان بجمنت", nameEn: "Pigment Colors", price: 15, category: "art", image: pigmentImg },
  { id: "a2", name: "الوان فبركسل خشب 12 لون", nameEn: "Faber-Castell 12 Wood Colors", price: 85, category: "art", image: faber12Img },
  { id: "a3", name: "الوان فبركسل خشب 48 لون", nameEn: "Faber-Castell 48 Wood Colors", price: 350, category: "art", image: faber48Img },
  { id: "a4", name: "الوان زجاج", nameEn: "Glass Colors", price: 70, category: "art", image: glassImg },
  { id: "a5", name: "الوان زيت", nameEn: "Oil Colors", price: 70, category: "art", image: oilImg },
  { id: "a6", name: "الوان جواش", nameEn: "Gouache Colors", price: null, category: "art", image: gouacheImg },
  { id: "a8", name: "الوان سيراميك", nameEn: "Ceramic Colors", price: 40, category: "art", image: ceramicImg },
  { id: "a9", name: "قشور خشب طبيعية وصناعية", nameEn: "Natural & Artificial Wood Shells", price: null, category: "art", image: woodShellsImg },
  { id: "a10", name: "خشب ابلكاش", nameEn: "Plywood", price: null, category: "art", image: plywoodImg },
  { id: "a11", name: "خشب MDF", nameEn: "MDF Wood", price: null, category: "art" , image:mdfImg },
  { id: "a12", name: "جلد طبيعي الحيوان", nameEn: "Natural Animal Leather", price: 75, category: "art",image:m12 },
  { id: "a13", name: "ابر تنجيد", nameEn: "Upholstery Needles", price: 5, category: "art",image:m13 },
  { id: "a14", name: "نشار", nameEn: "Sawdust", price: null, category: "art",image:m14 },
  { id: "a15", name: "خيوط مكرمية سلسلة", nameEn: "Chain Macramé Threads", price: null, category: "art", image: m15 },
  { id: "a16", name: "خيوط مكرمية عادية 1 كيلو", nameEn: "Regular Macramé Threads 1kg", price: 120, category: "art",image: m16 },
  { id: "a17", name: "خيوط تطريز", nameEn: "Embroidery Threads", price: null, category: "art" , image: m17 },
  { id: "a18", name: "نحاس اصفر", nameEn: "Yellow Copper", price: null, category: "art" , image: m18 },
  { id: "a19", name: "نحاس احمر", nameEn: "Red Copper", price: null, category: "art", image: m28},
  { id: "a20", name: "المونيوم", nameEn: "Aluminum", price: null, category: "art", image:m19 },
  { id: "a21", name: "قلم خط عربي", nameEn: "Arabic Calligraphy Pen", price: null, category: "art" ,image:m20},
  { id: "a22", name: "اقلام تظليل", nameEn: "Shading Pens", price: null, category: "art", image:m21 },
  { id: "a23", name: "اقلام تحبير", nameEn: "Inking Pens", price: null, category: "art", image: m22},
  { id: "a24", name: "مسطرة اشكال هندسية", nameEn: "Geometric Shapes Ruler", price: null, category: "art" ,image:m23  },
  { id: "a25", name: "مسطرة جديدة", nameEn: "New Ruler", price: null, category: "art", image:m24 },
  { id: "a26", name: "اقلام روصاص فبركسل", nameEn: "Faber-Castell Pencils", price: null, category: "art",image:m25},
  { id: "a27", name: "استيكة فبركسل", nameEn: "Faber-Castell Eraser", price: null, category: "art" ,image:m26},
  { id: "a28", name: "استيكة شمع فبركسل", nameEn: "Faber-Castell Wax Eraser", price: null, category: "art" , image:m27},
  { id: "a29", name: "فرخ كانسون 150 جرام", nameEn: "Canson Sheet 150g", price: 25, category: "art",image:m29},
  { id: "a30", name: "فرخ كانسون 250 جرام", nameEn: "Canson Sheet 250g", price: 35, category: "art",image:m30 },
  { id: "a31", name: "فرخ كانسون 300 جرام", nameEn: "Canson Sheet 300g", price: 40, category: "art",image:m31 },
  { id: "a32", name: "رقائق نحاس أحمر", nameEn: "Red Copper Sheets", price: null, category: "art" ,image:m32},
  { id: "a33", name: "نحاس أصفر 0.8 ملي", nameEn: "Yellow Copper 0.8mm", price: null, category: "art",image:m33 },
  { id: "a34", name: "الألمنيوم نشر وتفريغ", nameEn: "Aluminum Cutting & Piercing", price: null, category: "art",image:m34 },
  { id: "a35", name: "رقائق الألمنيوم", nameEn: "Aluminum Sheets", price: null, category: "art", image:m35},
];


export const homeProducts: Product[] = [
  { id: "h1", name: "خيوط تطريز", nameEn: "Embroidery Threads", price: null, category: "home", image: h1 },
  { id: "h2", name: "ابر خياطة", nameEn: "Sewing Needles", price: null, category: "home", image: h2 },
  { id: "h3", name: "خيوط صوف", nameEn: "Wool Threads", price: null, category: "home", image: h3 },
  { id: "h4", name: "ابر كروشيه", nameEn: "Crochet Hooks", price: null, category: "home", image: h4 },
  { id: "h5", name: "شرائط ستان", nameEn: "Satin Ribbons", price: null, category: "home", image: h5 },
  { id: "h6", name: "خرز", nameEn: "Beads", price: null, category: "home", image: h6 },
  { id: "h7", name: "قماش لباد", nameEn: "Felt Fabric", price: null, category: "home", image: h7 },
  { id: "h8", name: "فوم ملون", nameEn: "Colored Foam", price: null, category: "home", image: h8 },
  { id: "h9", name: "مسدس شمع", nameEn: "Glue Gun", price: null, category: "home", image: h9 },
  { id: "h10", name: "ابر تريكو", nameEn: "Knitting Needles", price: null, category: "home", image: h10 },
  { id: "h11", name: "ابر تطريز", nameEn: "Embroidery Needles", price: null, category: "home",image:h24 },
  { id: "h12", name: "ابر كنفاه", nameEn: "Canvas Needles", price: null, category: "home" , image: h11},
  { id: "h13", name: "ابر تنجيد", nameEn: "Upholstery Needles", price: null, category: "home", image: h12 },
  { id: "h14", name: "ابر ماكينات خياطة", nameEn: "Sewing Machine Needles", price: null, category: "home", image: h13 },
  { id: "h15", name: "خيوط كروشيه تركي", nameEn: "Turkish Crochet Threads", price: null, category: "home", image: h14 },
  { id: "h16", name: "خيوط كروشيه مصري", nameEn: "Egyptian Crochet Threads", price: null, category: "home" , image: h15},
  { id: "h17", name: "بكرة خياطة", nameEn: "Sewing Bobbin", price: null, category: "home" , image: h16},
  { id: "h18", name: "قماش ستان", nameEn: "Satin Fabric", price: null, category: "home" , image: h17},
  { id: "h19", name: "قماش دبلان", nameEn: "Doblin Fabric", price: null, category: "home" , image: h18},
  { id: "h20", name: "فيزلين قماش", nameEn: "Fabric Interfacing", price: null, category: "home" , image: h19},
  { id: "h21", name: "كربون قماش", nameEn: "Fabric Carbon Paper", price: null, category: "home", image: h20 },
  { id: "h22", name: "اقلام تحديد قماش", nameEn: "Fabric Marking Pens", price: null, category: "home" , image: h21},
  { id: "h23", name: "فرخ كرافت", nameEn: "Kraft Sheet", price: 10, category: "home" , image: h22},
  { id: "h24", name: "فرخ زبدة", nameEn: "Butter Paper Sheet", price: 7.5, category: "home", image: h23},
];