# TODO: Improve Homepage Services with 3 Circular Images per Card

Status: [ ] Not started

## Steps (from approved plan):

1. [x] Update src/pages/Index.tsx:
   - Add imports for additional images (h4, h10, plywoodImg, etc.)
   - Update services array with images: [img1, img2, img3] for each service
   - Restructure service cards: Replace icon div with grid-cols-1 md:grid-cols-3 of circular images (w-full h-32 rounded-full object-cover hover:scale-105 shadow-purple-glow)
   - Fix portfolio img fallbacks
   - Responsive grid

2. [x] Update src/components/ServiceModal.tsx:
   - Use service.images for real gallery (3 images)
   - Replace modal icon with circular service.image

3. [x] Add to src/index.css:
   - Custom .shadow-purple-glow class for hover effects

4. [x] Test:
   - npm run dev (server running at http://localhost:8080/)
   - Services now display 3 high-quality circular images per card (art supplies: paints; sewing: threads/hooks; printing: stationery; etc.)
   - Hover effects with purple glow scale/shadow
   - Responsive: grid-cols-1 on mobile, 3-cols desktop
   - No placeholders; all images load from assets/products
   - Modals show real service images

5. [ ] Complete: attempt_completion

5. [ ] Complete: attempt_completion

Progress tracked here. Mark [x] when done.

