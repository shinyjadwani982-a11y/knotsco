export interface Product {
  id: string;
  name: string;
  personalitySubtitle: string;
  category: string;
  categorySlug: 'flowers' | 'charms' | 'bags' | 'bookmarks' | 'tumbler-holders' | 'plants' | 'hair';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  secondaryImage?: string;
  badge?: string;
  story: string;
  whyYouWillLoveIt: string[];
  materials: string;
  dimensions: string;
  care: string;
  personalityArchetypes: string[];
  vibes: string[];
  occasions: string[];
  inStock: boolean;
  isBestseller?: boolean;
}

export interface Review {
  id: string;
  author: string;
  avatarLetter: string;
  rating: number;
  date: string;
  productName: string;
  comment: string;
  verified: boolean;
  highlight?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'daisy-bouquet',
    name: 'Daisy Bouquet (5-Stem Cluster)',
    personalitySubtitle: 'For the person who would rather receive flowers that stay.',
    category: 'Flowers that don’t fade',
    categorySlug: 'flowers',
    price: 750,
    originalPrice: 890,
    rating: 4.9,
    reviewCount: 142,
    image: '/src/assets/images/product_daisy_bouquet_1792146742734.jpg',
    badge: 'Signature',
    isBestseller: true,
    story: 'No wilting, no dropping petals on the carpet. Just five sunny little daisy blooms hand-looped in milk-cotton yarn that will sit quietly on your windowsill through every season.',
    whyYouWillLoveIt: [
      'Individually wired stems you can bend and arrange in your favourite vase',
      'Soft pastel butter-yellow cores with cream petals that never fade',
      'Wrapped in recycled craft paper with hand-tied jute twine',
      'Zero maintenance — 100% emotional warmth'
    ],
    materials: '100% combed milk-cotton yarn, flexible copper wire core, eco craft paper wrap',
    dimensions: 'Stem length ~28cm, bloom diameter ~6.5cm',
    care: 'Gently dust with a soft brush. Keep away from direct water.',
    personalityArchetypes: ['The Sunshine Person', 'The Romantic', 'The Sentimental One'],
    vibes: ['Sunny & Bright', 'Soft & Dreamy', 'Romantic & Nostalgic'],
    occasions: ['Just because', 'For my bestie', 'For someone special', 'Self-gifting ♡'],
    inStock: true,
  },
  {
    id: 'strawberry-charm',
    name: 'Strawberry & Blossom Bag Charm',
    personalitySubtitle: 'Adds an instant sweet dopamine hit to any everyday tote.',
    category: 'Tiny personality pieces',
    categorySlug: 'charms',
    price: 490,
    originalPrice: 580,
    rating: 5.0,
    reviewCount: 98,
    image: '/src/assets/images/product_strawberry_charm_1792146744728.jpg',
    badge: 'Most Gifted',
    isBestseller: true,
    story: 'Your canvas tote looks exactly like three other totes on the metro. Clip this tiny crimson berry with its accompanying little white blossom, and it immediately becomes unmistakably yours.',
    whyYouWillLoveIt: [
      'Tactile seed stitch details hand-embroidered with white yarn',
      'Solid antique brass trigger-snap clasp that fits bag loops, zippers, and keyrings',
      'Comes with a baby strawberry leaf and delicate companion blossom',
      'Featherlight weight so it won’t drag down your daily essentials'
    ],
    materials: 'Hypoallergenic milk cotton, organic fiber fill, antique brass hardware',
    dimensions: 'Berry height ~4.5cm, total drop length with clasp ~12cm',
    care: 'Spot clean with a damp cloth if needed. Air dry flat.',
    personalityArchetypes: ['The Cute-but-Chaotic One', 'The Sunshine Person', 'The Sentimental One'],
    vibes: ['Playful & Cheerful', 'Cute-but-Chaotic', 'Sunny & Bright'],
    occasions: ['For my bestie', 'Birthday warmth', 'Just because', 'Self-gifting ♡'],
    inStock: true,
  },
  {
    id: 'dhoop-sunflower',
    name: 'DHOOP — Sunflower Desk Companion',
    personalitySubtitle: 'A tiny pocket of morning warmth for long workdays.',
    category: 'For people who keep plants alive',
    categorySlug: 'plants',
    price: 680,
    originalPrice: 799,
    rating: 4.8,
    reviewCount: 86,
    image: '/src/assets/images/product_sunflower_dhoop_1792146779590.jpg',
    badge: 'Staff Favourite',
    isBestseller: true,
    story: 'Named after the gentle sunlight that sneaks through half-drawn curtains. Potted in a speckled ceramic-style yarn base, it faces you with cheerful confidence even during 3 PM spreadsheets.',
    whyYouWillLoveIt: [
      'Double-stitched spiraling seed center in deep chocolate yarn',
      'Potted in a weighted textured cream base so it never tips over',
      'Requires zero water, zero sunlight, zero botanical talent',
      'Instant desk mood booster for study or home office tables'
    ],
    materials: 'Premium milk cotton yarn, weighted recycled bead base, non-allergenic fill',
    dimensions: 'Height ~17cm, pot diameter ~8cm',
    care: 'Dust lightly. Do not water (seriously, it’s yarn!).',
    personalityArchetypes: ['The Sunshine Person', 'The Plant Person', 'The Bookworm'],
    vibes: ['Sunny & Bright', 'Calm & Earthy', 'Playful & Cheerful'],
    occasions: ['Birthday warmth', 'For someone special', 'Self-gifting ♡'],
    inStock: true,
  },
  {
    id: 'matcha-sprout-bookmark',
    name: 'Matcha Sprout Book Buddy',
    personalitySubtitle: 'Guarding your page until you find the time to wander back.',
    category: 'For pages worth staying in',
    categorySlug: 'bookmarks',
    price: 360,
    originalPrice: 420,
    rating: 4.9,
    reviewCount: 114,
    image: '/src/assets/images/product_matcha_bookmark_1792146780908.jpg',
    badge: 'Under ₹400',
    isBestseller: true,
    story: 'No dog-earing pages. No crumpled receipts. This sage-and-matcha twin-leaf vine slips between the leaves of your book, with delicate bud tendrils peeking out over the spine.',
    whyYouWillLoveIt: [
      'Flat-woven central vine that never bends your book binding',
      'Sculpted dual ribbed leaf details with delicate hand-knotted tassels',
      'Soft earthy sage hue inspired by iced matcha lattes',
      'The quintessential companion for long library afternoons'
    ],
    materials: '100% fine cotton thread with soft brushed finish',
    dimensions: 'Stem length ~30cm, fits standard paperbacks and oversized hardcovers',
    care: 'Gently hand-wash with mild detergent if stained. Dry flat.',
    personalityArchetypes: ['The Bookworm', 'The Sentimental One', 'The Plant Person'],
    vibes: ['Calm & Earthy', 'Soft & Dreamy', 'Romantic & Nostalgic'],
    occasions: ['Just because', 'For my bestie', 'Self-gifting ♡'],
    inStock: true,
  },
  {
    id: 'rose-ishq',
    name: 'Gulab-e-Ishq (Everlasting Rose Stem)',
    personalitySubtitle: 'For love that doesn’t need watering.',
    category: 'Flowers that don’t fade',
    categorySlug: 'flowers',
    price: 520,
    originalPrice: 600,
    rating: 5.0,
    reviewCount: 77,
    image: '/src/assets/images/product_rose_ishq_1792146780529.jpg',
    badge: 'Romantic',
    isBestseller: false,
    story: 'Crafted in a nostalgic dusty vintage rose pink. Twenty-four layered petals spiraled by hand around a pliable stem with sage foliage.',
    whyYouWillLoveIt: [
      'Layered vintage petal technique creates realistic blooming depth',
      'Dusty rose palette that complements warm, minimalist interiors',
      'Keepsake memory stem for anniversaries, confessions, and self-appreciation',
      'Pairable with our Daisy stems for a curated wild arrangement'
    ],
    materials: 'Milk-cotton yarn blend, flexible inner armature wire',
    dimensions: 'Stem length ~32cm, rose head ~8cm across',
    care: 'Reshape petals gently with fingers if stored. Keep dry.',
    personalityArchetypes: ['The Romantic', 'The Sentimental One'],
    vibes: ['Romantic & Nostalgic', 'Soft & Dreamy'],
    occasions: ['For someone special', 'Birthday warmth', 'Self-gifting ♡'],
    inStock: true,
  },
  {
    id: 'checker-tumbler-sling',
    name: 'Cloud Nine Tumbler Sling',
    personalitySubtitle: 'Because your emotional-support tumbler deserves an outfit.',
    category: 'For your emotional-support tumbler',
    categorySlug: 'tumbler-holders',
    price: 890,
    originalPrice: 1050,
    rating: 4.8,
    reviewCount: 63,
    image: '/src/assets/images/product_tumbler_sling_1792146779633.jpg',
    badge: 'Trending',
    isBestseller: true,
    story: 'Handmade in a retro checkerboard pattern in soft sky-blue and cream. Crossbody woven strap frees up both hands for iced coffees, books, and phone scrolling.',
    whyYouWillLoveIt: [
      'Stretchy yet supportive ribbed basket weave fits 500ml–1000ml tumblers',
      'Comfortable braided strap that doesn’t dig into your shoulder',
      'Protects your bottle from dings, scratches, and noisy clangs',
      'Machine washable in a gentle laundry pouch'
    ],
    materials: 'Heavyweight reinforced combed cotton yarn, stretch weave base',
    dimensions: 'Sleeve height ~18cm, strap drop length ~52cm (crossbody fit)',
    care: 'Cold hand wash or delicate mesh wash cycle. Reshape and air dry flat.',
    personalityArchetypes: ['The Cute-but-Chaotic One', 'The Sunshine Person', 'The Plant Person'],
    vibes: ['Playful & Cheerful', 'Cute-but-Chaotic', 'Sunny & Bright'],
    occasions: ['Self-gifting ♡', 'For my bestie', 'Birthday warmth'],
    inStock: true,
  },
  {
    id: 'fairy-tale-hair-bows',
    name: 'Fairy Tale Hair Bows (Pair)',
    personalitySubtitle: 'Soft nostalgic knots for gentle, good-hair days.',
    category: 'Put a little crochet in your hair',
    categorySlug: 'hair',
    price: 420,
    rating: 4.9,
    reviewCount: 45,
    image: '/src/assets/images/product_hair_bows_1792150673203.jpg',
    badge: 'New',
    isBestseller: false,
    story: 'A duo of vintage-inspired crochet ribbon bows mounted on snag-free French alligator clips. Adds a tactile touch to half-up styles, pigtails, or messy buns.',
    whyYouWillLoveIt: [
      'Non-slip grip teeth lined with soft felt so they stay put without pulling',
      'Delicate picot edge stitch detailing along both bow tails',
      'Comes as a matched pair in butter cream and dusty blossom',
      'Lightweight and comfortable for all-day wear'
    ],
    materials: 'Fine Egyptian cotton yarn, nickel-free alloy alligator clips',
    dimensions: 'Bow span ~7cm each, clip length ~4.5cm',
    care: 'Keep dry. Wipe clip with soft cloth.',
    personalityArchetypes: ['The Romantic', 'The Sentimental One', 'The Cute-but-Chaotic One'],
    vibes: ['Soft & Dreamy', 'Romantic & Nostalgic', 'Playful & Cheerful'],
    occasions: ['Just because', 'For my bestie', 'Self-gifting ♡'],
    inStock: true,
  },
  {
    id: 'crochet-market-tote',
    name: 'Everyday Knotted Market Tote',
    personalitySubtitle: 'Carry something that isn’t mass-produced and boring.',
    category: 'Carry your character',
    categorySlug: 'bags',
    price: 1450,
    originalPrice: 1750,
    rating: 4.9,
    reviewCount: 52,
    image: '/src/assets/images/hero_crochet_lifestyle_1792146742852.jpg',
    badge: 'Artisan Hero',
    isBestseller: true,
    story: 'Over 8 hours of hand-knotting go into this open-mesh cotton shoulder bag. It expands softly to hold your journal, a cardigan, your water bottle, and a fresh pastry.',
    whyYouWillLoveIt: [
      'Reinforced double-layered shoulder straps that won’t stretch to your knees',
      'Breathable organic mesh structure with a dense, secure base',
      'Folds down tiny into your pocket until market time',
      'Includes an interior loop to clip your favourite Knots & Co. charm'
    ],
    materials: '100% thick mercerized cotton cord',
    dimensions: 'Width ~36cm, Body height ~38cm, Strap drop ~26cm',
    care: 'Hand wash cold. Lay flat on a clean towel to dry.',
    personalityArchetypes: ['The Sunshine Person', 'The Bookworm', 'The Plant Person'],
    vibes: ['Sunny & Bright', 'Calm & Earthy', 'Soft & Dreamy'],
    occasions: ['Self-gifting ♡', 'Birthday warmth', 'For someone special'],
    inStock: true,
  }
];

export const PERSONALITY_ARCHETYPES = [
  {
    id: 'sunshine',
    title: 'The Sunshine Person',
    emoji: '🌻',
    tagline: 'Warmth, yellow tones, and instant mood-lifters.',
    description: 'You enter a room and everyone feels like the clouds broke. You gravitate towards bright daisy hues, sunflowers on desks, and vibrant bag charms that spark smiles.',
    colorAccent: '#FDF6E2',
    accentBorder: '#F6E4AC',
    matchingProductIds: ['daisy-bouquet', 'dhoop-sunflower', 'strawberry-charm', 'crochet-market-tote']
  },
  {
    id: 'bookworm',
    title: 'The Bookworm',
    emoji: '📚',
    tagline: 'Quiet corners, tea cups, and pages that deserve keeping.',
    description: 'You believe dog-earing a paperback is a crime against literature. You need gentle sprout bookmarks, cozy textures, and companions for marathon reading sessions.',
    colorAccent: '#F2F5F3',
    accentBorder: '#D2DDD5',
    matchingProductIds: ['matcha-sprout-bookmark', 'dhoop-sunflower', 'crochet-market-tote']
  },
  {
    id: 'romantic',
    title: 'The Romantic',
    emoji: '🌷',
    tagline: 'Dusty rose hues, slow love letters, and lingering softness.',
    description: 'You look for beauty in quiet rituals. You love flowers that never die because love shouldn’t come with an expiration date or dropped petals.',
    colorAccent: '#FAF0ED',
    accentBorder: '#F2D3CB',
    matchingProductIds: ['rose-ishq', 'daisy-bouquet', 'fairy-tale-hair-bows']
  },
  {
    id: 'chaotic',
    title: 'The Cute-but-Chaotic One',
    emoji: '🍓',
    tagline: 'Keyrings with 8 charms, spontaneous plans, pure dopamine.',
    description: 'Your bag is heavy with three lip balms, an emotional-support water bottle, and endless trinkets. You wear your playful quirks right on your sleeve.',
    colorAccent: '#FDF0ED',
    accentBorder: '#F8CECE',
    matchingProductIds: ['strawberry-charm', 'checker-tumbler-sling', 'fairy-tale-hair-bows']
  },
  {
    id: 'plant-person',
    title: 'The Plant Person',
    emoji: '🌿',
    tagline: 'Earthy greens, desk companions, and botanical love.',
    description: 'You want plants on every ledge, but your desk doesn’t get enough window light (or you sometimes forget to water them). We’ve got the eternal green fix.',
    colorAccent: '#EFF5F0',
    accentBorder: '#CFE0D2',
    matchingProductIds: ['dhoop-sunflower', 'matcha-sprout-bookmark', 'crochet-market-tote']
  },
  {
    id: 'sentimental',
    title: 'The Sentimental One',
    emoji: '🎀',
    tagline: 'Keepsakes, shared memories, and gifts that say everything.',
    description: 'You keep cinema tickets, handwritten notes, and gifts that reminded someone of you. A crochet piece isn’t yarn to you—it’s a frozen memory.',
    colorAccent: '#F8F3F9',
    accentBorder: '#E6D7E8',
    matchingProductIds: ['rose-ishq', 'daisy-bouquet', 'matcha-sprout-bookmark', 'strawberry-charm']
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Creations', quote: 'Tiny things. Big personality.' },
  { id: 'flowers', label: 'Flowers that don’t fade', quote: 'For the person who would rather receive flowers that stay.' },
  { id: 'charms', label: 'Tiny personality pieces', quote: 'Make your bag unmistakably yours.' },
  { id: 'bags', label: 'Carry your character', quote: 'Slow woven cotton bags that carry real life.' },
  { id: 'bookmarks', label: 'For pages worth staying in', quote: 'Guarding your thoughts until you return.' },
  { id: 'tumbler-holders', label: 'For your emotional-support tumbler', quote: 'Crossbody slings for hands-free sipping.' },
  { id: 'plants', label: 'For people who keep plants alive', quote: 'Zero water required. 100% desk warmth.' },
  { id: 'hair', label: 'Put a little crochet in your hair', quote: 'Gentle nostalgic knots for good hair days.' },
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Aanya Sharma',
    avatarLetter: 'A',
    rating: 5,
    date: '3 days ago',
    productName: 'Daisy Bouquet (5-Stem Cluster)',
    comment: 'It is even cuter in person. The stems are sturdy yet bendable, so I arranged them in a tiny thrifted ceramic pitcher on my study desk. Literally brightens my entire mood when I sit down to work.',
    verified: true,
    highlight: 'Even cuter in person'
  },
  {
    id: 'rev-2',
    author: 'Rhea Sen',
    avatarLetter: 'R',
    rating: 5,
    date: '1 week ago',
    productName: 'Strawberry & Blossom Bag Charm',
    comment: 'Got this for my best friend and she literally cried when she opened the packaging with the little handwritten card! The tiny seeds and blossom stitch details are so clean.',
    verified: true,
    highlight: 'She literally cried'
  },
  {
    id: 'rev-3',
    author: 'Tara Mehra',
    avatarLetter: 'T',
    rating: 5,
    date: '2 weeks ago',
    productName: 'Matcha Sprout Book Buddy',
    comment: 'I read fantasy novels on the metro and strangers have literally stopped me twice to ask where I got this cute sprout bookmark. The yarn is so soft and does not pinch the spine.',
    verified: true,
    highlight: 'Strangers stopped me twice'
  },
  {
    id: 'rev-4',
    author: 'Diya Patel',
    avatarLetter: 'D',
    rating: 5,
    date: '3 weeks ago',
    productName: 'Cloud Nine Tumbler Sling',
    comment: 'My emotional support Stanley tumbler now has its own outfit and I am obsessed. The strap is super comfy and does not cut into my neck when walking across campus.',
    verified: true,
    highlight: 'Now has its own outfit'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ugc-1',
    handle: '@avani.reads',
    caption: 'Current read accompanied by my @knotsandco matcha sprout bookmark 🌱✨ never losing my place again',
    image: '/src/assets/images/product_matcha_bookmark_1792146780908.jpg',
    productTag: 'Matcha Sprout Book Buddy'
  },
  {
    id: 'ugc-2',
    handle: '@kavya_sunshine',
    caption: 'My work from home setup got 1000% warmer thanks to this little DHOOP sunflower companion 🌻💛',
    image: '/src/assets/images/product_sunflower_dhoop_1792146779590.jpg',
    productTag: 'DHOOP Sunflower'
  },
  {
    id: 'ugc-3',
    handle: '@mira_totes',
    caption: 'Bag charms are my love language. Spotted this strawberry charm on my daily commute 🍓🍓',
    image: '/src/assets/images/product_strawberry_charm_1792146744728.jpg',
    productTag: 'Strawberry & Blossom Charm'
  },
  {
    id: 'ugc-4',
    handle: '@isha.creates',
    caption: 'Unboxing the daisy bouquet. Flowers that don’t wilt are officially the only flowers I accept now 🌼🌼',
    image: '/src/assets/images/product_daisy_bouquet_1792146742734.jpg',
    productTag: 'Daisy Bouquet (5-Stem)'
  }
];
