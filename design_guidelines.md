# CalculateTimeshare.com Design Guidelines

## Design Approach & Principles

**Reference-Based Approach**: Draw inspiration from trusted financial and legal service websites that prioritize credibility and clarity:
- **Stripe** (payment processing): Clean forms, generous spacing, subtle depth
- **TurboTax** (financial tools): Guided calculator experiences, progress indicators
- **LegalZoom** (legal services): Trust-building layout, professional tone, clear CTAs

**Core Design Principles**:
- Trust & Credibility: Professional appearance that instills confidence
- Clarity Over Cleverness: Straightforward interactions and plain language
- Data Visualization Focus: Make numbers and projections easily digestible
- Guided Experience: Walk users through complex calculations step-by-step

## Typography System

**Font Families** (Google Fonts via CDN):
- **Primary**: Inter (headings, UI elements, buttons) - weights 400, 600, 700
- **Secondary**: IBM Plex Sans (body text, form labels) - weights 400, 500

**Hierarchy**:
- H1 (Hero): 3.5rem (56px) desktop / 2.5rem (40px) mobile, weight 700
- H2 (Section): 2.5rem (40px) desktop / 2rem (32px) mobile, weight 600
- H3 (Subsection): 1.875rem (30px) desktop / 1.5rem (24px) mobile, weight 600
- H4 (Card Headers): 1.25rem (20px), weight 600
- Body Large: 1.125rem (18px), weight 400
- Body Default: 1rem (16px), weight 400
- Small/Caption: 0.875rem (14px), weight 400
- Button Text: 1rem (16px), weight 600

## Layout & Spacing System

**Tailwind Units**: Consistently use **4, 6, 8, 12, 16, 20, 24** for spacing
- Component padding: p-6 to p-8
- Section padding: py-16 to py-24 (desktop), py-12 (mobile)
- Card spacing: p-6 to p-8
- Grid gaps: gap-6 to gap-8
- Form field spacing: space-y-6

**Container Strategy**:
- Max width: max-w-7xl for full sections, max-w-4xl for calculators/forms, max-w-prose for blog content
- Side padding: px-4 (mobile), px-6 (tablet), px-8 (desktop)

**Grid Systems**:
- Home features: 3-column grid (lg:grid-cols-3, md:grid-cols-2, grid-cols-1)
- Blog grid: 3-column masonry (lg:grid-cols-3, md:grid-cols-2, grid-cols-1)
- Calculator results: 2-column comparison layout (lg:grid-cols-2, grid-cols-1)

## Component Library

### Navigation Header
- Sticky top navigation (sticky top-0 z-50)
- Logo left, navigation center, CTA button right
- Navigation links: Home, Calculators (dropdown), Exit Options, Blog, About, Contact
- Mobile: Hamburger menu with slide-out drawer
- CTA: "Get Exit Quote" button (primary style)

### Hero Section (Home Page)
- **Layout**: Two-column split (60/40) on desktop, stacked mobile
- **Left**: Headline + subheadline + dual CTA buttons + trust indicators ("Helped 5,000+ Owners Exit")
- **Right**: Large hero image showing family/freedom/travel imagery
- **Background**: Subtle gradient overlay
- **Height**: 85vh minimum for visual impact

### Calculator Cards (Home Page Preview)
- Two prominent cards side-by-side (lg:grid-cols-2)
- Card structure: Icon/graphic + title + description + "Launch Calculator" button
- Elevated design with shadow-lg and hover:shadow-2xl transition
- Icons: Chart/calculator symbols from Heroicons

### Form Components (Calculators)
- **Input Fields**: 
  - Full-width text inputs with floating labels
  - Border styling with focus states (ring-2)
  - Height: h-12 for text inputs
  - Rounded corners: rounded-lg
- **Dropdowns**: Custom styled select with chevron icon
- **Sliders**: Range input with value display and percentage markers
- **Toggle Switch**: Monthly/Annual mode with smooth slide animation
- **Buttons**: 
  - Primary: Full rounded-lg, h-12, px-8
  - Secondary: Outline style with border-2

### Results Display (Calculators)
- **Summary Cards**: Large metric cards in grid (grid-cols-2 lg:grid-cols-4)
  - Large number display (text-4xl font-bold)
  - Label underneath (text-sm)
  - Icon accent in corner
- **Data Table**: 
  - Zebra striping for rows
  - Sticky header on scroll
  - Mobile: Horizontal scroll or stacked card view
- **Chart Visualization**: 
  - Use Chart.js for line graph (30-year projection)
  - Height: h-80 minimum for readability
  - Gradient fill under line
  - Tooltip on hover with detailed year data

### Blog Components
- **Blog Card**: 
  - Featured image (aspect-ratio 16/9)
  - Category badge (absolute top-4 left-4)
  - Title + excerpt + author/date + "Read More" link
  - Hover: Slight lift effect (hover:-translate-y-1)
- **Blog Post Page**:
  - Hero image (full-width, aspect-ratio 21/9)
  - Article container: max-w-3xl centered
  - Sidebar: Categories, Recent Posts, Newsletter signup (lg:grid-cols-3 with 2/1 split)
  - Typography: Generous line-height (1.8) for readability

### Admin Dashboard (Blog Management)
- **Layout**: Sidebar navigation + main content area
- **Sidebar**: Categories list, Add New Post button (sticky)
- **Post List**: Table with thumbnail, title, date, status, actions
- **Editor**: WYSIWYG with toolbar (bold, italic, headings, links, images)
- **Image Upload**: Drag-and-drop zone with preview

### Footer
- **Structure**: 4-column grid (lg:grid-cols-4, md:grid-cols-2)
  - Column 1: Logo + tagline + social icons
  - Column 2: Quick Links (Calculators, Exit Options, Blog)
  - Column 3: Resources (About, FAQs, Contact)
  - Column 4: Newsletter signup + contact info
- **Bottom Bar**: Copyright + Legal links (Privacy, Terms, Disclaimer)
- **Background**: Slightly elevated from page with subtle border-top

### Trust Elements
- **Testimonials**: 
  - Card-based carousel with 3 visible (lg:grid-cols-3)
  - Quote icon + text + name/location + star rating
- **Trust Badges**: Logos or icons showing credentials (Better Business Bureau, industry affiliations)
- **Stats Section**: 4-metric display (Owners Helped, Years Experience, Success Rate, Average Savings)

### Sticky CTA Button
- Fixed bottom-right on scroll (fixed bottom-8 right-8)
- Circular or pill-shaped with shadow-2xl
- Pulse animation to draw attention
- "Get Free Quote" or phone icon + number

## Special Page Layouts

### Exit Options Page
- **Hero**: Brief overview with CTA
- **Options Grid**: 3-column cards (Resale, Exit Company, Legal Path, Donation)
- **Comparison Table**: Side-by-side feature comparison
- **Process Timeline**: Horizontal stepper showing typical exit process

### Contact Page
- **Two-column layout**: 
  - Left: Contact form (name, email, phone, message, subject dropdown)
  - Right: Google Maps embed + office info + call/email buttons + hours
- **Form**: Full validation with error states

### Legal Pages
- **Simple layout**: Single column, max-w-4xl, prose styling
- **Table of Contents**: Sticky sidebar with jump links
- **Last Updated**: Date stamp at top

## Animations & Interactions

**Minimal, Purposeful Animations Only**:
- Calculator inputs: Smooth value updates (transition-all duration-300)
- Chart rendering: Staggered line draw-in on mount
- Card hover: Subtle lift (hover:-translate-y-1 transition-transform)
- Button states: Scale on click (active:scale-95)
- Page transitions: None (instant loads)

**No Animations**:
- Scroll-triggered effects
- Parallax
- Auto-playing sliders
- Unnecessary loading spinners

## Images

**Hero Image** (Home Page):
- Placement: Right side of hero section (60/40 split)
- Description: Professional lifestyle image showing a happy family/couple on vacation (beach, resort, or travel setting) conveying freedom and relief. Should feel aspirational and trustworthy.
- Treatment: Subtle rounded corners (rounded-2xl), optional subtle shadow

**Calculator Icons/Graphics**:
- Placement: Top of each calculator preview card on homepage
- Description: Abstract illustrations or icons representing financial calculations and data analysis
- Style: Flat, modern icons from Heroicons (calculator, chart-bar, currency-dollar)

**Blog Featured Images**:
- Placement: Top of each blog card and full-width hero on blog post pages
- Description: 
  - Blog 1: Calculator/spreadsheet with timeshare documents
  - Blog 2: Person reviewing contract with concerned expression
  - Blog 3: Graph/chart visualization showing upward trend
- Treatment: Aspect ratio 16/9 for cards, 21/9 for post heroes

**Exit Options Icons**:
- Placement: Top of each exit option card
- Description: Simple line icons representing each path (handshake, briefcase, gavel, gift)
- Source: Heroicons outline set

**Trust Section**:
- Placement: Testimonial cards (optional circular avatars)
- Description: Generic professional headshots or avatar placeholders
- Treatment: Circular crop, small size (w-12 h-12)

## Accessibility & Performance

- ARIA labels on all interactive elements
- Focus indicators with visible ring-2 states
- Keyboard navigation support for all calculators and forms
- Form validation with clear error messages
- Alt text for all images
- Semantic HTML5 structure
- Skip to main content link
- Minimum contrast ratio 4.5:1 for all text

This design creates a professional, trustworthy financial tool website that prioritizes usability and conversion while maintaining visual appeal through strategic use of whitespace, clear hierarchy, and purposeful interactions.