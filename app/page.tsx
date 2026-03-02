"use client";
import { useState, useEffect } from "react";

// ============== TYPES ==============
type Page = "home" | "hotels" | "booking" | "billing" | "account" | "rewards" | "support" | "contact" | "faq" | "nyc_hotels";

// ============== HOTEL DATA ==============
const nycHotels = [
  {
    id: 1,
    name: "Eleven Hotels Times Square Family Suites",
    neighborhood: "Midtown West",
    address: "343 W 44th St, New York, NY 10036",
    price: 279,
    rating: 4.8,
    image: "🏙️",
    kidFriendly: true,
    cribAvailable: true,
    amenities: ["Free WiFi", "Family Suites", "Cribs Available", "Kids Welcome Pack", "Mini Fridge", "Microwave", "Stroller Storage", "Baby-Proofed Rooms"],
    rooms: [
      { name: "Family King Suite", price: 279, description: "Spacious suite with king bed, pull-out sofa, crib-ready, mini kitchen" },
      { name: "Connected Double Room", price: 329, description: "Two connected rooms, ideal for families, cribs provided on request" },
      { name: "Family Deluxe Suite", price: 399, description: "Luxury suite with separate living area, full kitchen, crib included" }
    ],
    nearbyRestaurants: [
      { name: "Ellen's Stardust Diner", cuisine: "American", distance: "2 min walk", kidFriendly: true, note: "Singing waitstaff — kids love it!" },
      { name: "John's of Times Square", cuisine: "Pizza", distance: "3 min walk", kidFriendly: true, note: "Classic NYC pizza, high chairs available" },
      { name: "Becco", cuisine: "Italian", distance: "1 min walk", kidFriendly: true, note: "Unlimited pasta special, great for families" },
      { name: "Le Bernardin", cuisine: "French Seafood", distance: "5 min walk", kidFriendly: false, note: "3 Michelin stars — perfect for a date night if you get a sitter" }
    ],
    description: "Our flagship family hotel in the heart of Times Square. Designed with families in mind — every room comes with baby-proofing kits, and cribs are complimentary. Steps away from Broadway, Central Park, and some of NYC's best family-friendly restaurants.",
    familyHighlights: ["Complimentary cribs and pack-n-plays", "Kids eat free breakfast (under 5)", "In-room baby monitors available", "Partnership with local babysitting service", "Kids welcome amenity bag at check-in"]
  },
  {
    id: 2,
    name: "Eleven Hotels SoHo Boutique",
    neighborhood: "SoHo",
    address: "310 W Broadway, New York, NY 10013",
    price: 349,
    rating: 4.9,
    image: "🎨",
    kidFriendly: true,
    cribAvailable: true,
    amenities: ["Free WiFi", "Rooftop Terrace", "Cribs Available", "Stroller Valet", "Organic Baby Amenities", "In-Room Dining"],
    rooms: [
      { name: "SoHo Family Loft", price: 349, description: "Loft-style room with king bed, toddler-friendly layout, crib included" },
      { name: "SoHo Grand Suite", price: 449, description: "Expansive suite with separate bedroom, living area, and nursery nook" },
      { name: "Artist Family Suite", price: 499, description: "Two-bedroom suite with kitchenette, washer/dryer, and play area" }
    ],
    nearbyRestaurants: [
      { name: "Balthazar", cuisine: "French Bistro", distance: "4 min walk", kidFriendly: true, note: "Iconic SoHo brunch spot, kids menu available" },
      { name: "Prince Street Pizza", cuisine: "Pizza", distance: "2 min walk", kidFriendly: true, note: "Famous pepperoni square — quick and easy with kids" },
      { name: "Ruby's Cafe", cuisine: "Australian", distance: "3 min walk", kidFriendly: true, note: "Relaxed vibe, great avocado toast, stroller-friendly" },
      { name: "Dominique Ansel Bakery", cuisine: "Pastry/Bakery", distance: "5 min walk", kidFriendly: true, note: "Home of the Cronut — a must-visit for foodies" },
      { name: "Blue Ribbon Sushi", cuisine: "Japanese", distance: "2 min walk", kidFriendly: false, note: "Top-tier sushi for a parents' night out" }
    ],
    description: "A stylish boutique hotel in the heart of SoHo's food and art scene. Despite its chic aesthetic, this property is wonderfully family-friendly with dedicated kids' amenities and some of NYC's best restaurants right outside your door.",
    familyHighlights: ["Complimentary cribs and organic baby toiletries", "Stroller valet service", "Kids art kit at check-in", "Curated family restaurant guide provided", "Walking distance to Children's Museum of the Arts"]
  },
  {
    id: 3,
    name: "Eleven Hotels Upper West Side",
    neighborhood: "Upper West Side",
    address: "201 W 79th St, New York, NY 10024",
    price: 239,
    rating: 4.7,
    image: "🌳",
    kidFriendly: true,
    cribAvailable: true,
    amenities: ["Free WiFi", "Central Park Adjacent", "Cribs Available", "Family Lounge", "Playground Nearby", "Laundry Service", "Bottle Warming Station"],
    rooms: [
      { name: "Park View Family Room", price: 239, description: "King bed with Central Park views, crib-ready, blackout curtains" },
      { name: "Family Two-Bedroom", price: 339, description: "Two bedrooms with full bathroom, kitchenette, washer/dryer" },
      { name: "Central Park Suite", price: 419, description: "Premium suite overlooking Central Park, separate nursery area, full kitchen" }
    ],
    nearbyRestaurants: [
      { name: "Jacob's Pickles", cuisine: "Southern Comfort", distance: "3 min walk", kidFriendly: true, note: "Massive biscuits, comfort food, very kid-friendly" },
      { name: "Levain Bakery", cuisine: "Bakery", distance: "2 min walk", kidFriendly: true, note: "Famous giant cookies — a NYC foodie must" },
      { name: "Celeste", cuisine: "Italian", distance: "4 min walk", kidFriendly: true, note: "Neighborhood gem, affordable Italian, cash only" },
      { name: "Barney Greengrass", cuisine: "Jewish Deli", distance: "5 min walk", kidFriendly: true, note: "Iconic NYC deli since 1908 — the sturgeon king" },
      { name: "The Milling Room", cuisine: "New American", distance: "6 min walk", kidFriendly: true, note: "Upscale but welcoming, great brunch with kids" }
    ],
    description: "A family-first hotel steps from Central Park and the American Museum of Natural History. The Upper West Side is one of NYC's most family-friendly neighborhoods, packed with great restaurants, playgrounds, and culture.",
    familyHighlights: ["Complimentary cribs and baby gear lending library", "Family lounge with toys and books", "Steps from Central Park playgrounds", "2 blocks from Natural History Museum", "Bottle warming station on every floor"]
  },
  {
    id: 4,
    name: "Eleven Hotels Williamsburg",
    neighborhood: "Williamsburg, Brooklyn",
    address: "160 N 12th St, Brooklyn, NY 11249",
    price: 219,
    rating: 4.6,
    image: "🌉",
    kidFriendly: true,
    cribAvailable: true,
    amenities: ["Free WiFi", "Rooftop Pool", "Cribs Available", "Bike Rentals", "Family-Friendly Events", "In-Room Dining"],
    rooms: [
      { name: "Brooklyn Family Room", price: 219, description: "Spacious room with king bed, crib on request, city views" },
      { name: "Williamsburg Loft Suite", price: 299, description: "Industrial-chic loft with separate sleeping areas, crib included" },
      { name: "Brooklyn Grand Suite", price: 379, description: "Two-bedroom suite with full kitchen, laundry, and play corner" }
    ],
    nearbyRestaurants: [
      { name: "Lilia", cuisine: "Italian", distance: "5 min walk", kidFriendly: false, note: "One of NYC's best Italian restaurants — book in advance for date night" },
      { name: "Smorgasburg", cuisine: "Food Market", distance: "4 min walk", kidFriendly: true, note: "Weekend food market with 100+ vendors — foodie heaven" },
      { name: "Sunday in Brooklyn", cuisine: "New American", distance: "3 min walk", kidFriendly: true, note: "Famous pancakes, great brunch with kids" },
      { name: "Juliana's Pizza", cuisine: "Pizza", distance: "10 min walk", kidFriendly: true, note: "Under the Brooklyn Bridge, legendary coal-fired pizza" },
      { name: "Los Tacos No. 1", cuisine: "Mexican", distance: "6 min walk", kidFriendly: true, note: "Authentic tacos, quick and easy with little ones" }
    ],
    description: "Experience Brooklyn's coolest neighborhood with your family. Our Williamsburg hotel offers a hip but family-welcoming vibe, with easy access to Manhattan via the L train and surrounded by Brooklyn's incredible food scene.",
    familyHighlights: ["Complimentary cribs", "Rooftop pool with kids' hours", "Weekend family brunch events", "Bike rentals with child seats available", "5 min from Domino Park playground"]
  },
  {
    id: 5,
    name: "Eleven Hotels Financial District",
    neighborhood: "Financial District",
    address: "85 West St, New York, NY 10006",
    price: 199,
    rating: 4.5,
    image: "🗽",
    kidFriendly: true,
    cribAvailable: false,
    amenities: ["Free WiFi", "Harbor Views", "Gym", "Business Center", "In-Room Dining"],
    rooms: [
      { name: "Harbor View King", price: 199, description: "King bed with harbor views, modern amenities" },
      { name: "Liberty Suite", price: 289, description: "Suite with separate living area, Statue of Liberty views" },
      { name: "FiDi Executive Suite", price: 349, description: "Premium suite with office space and city views" }
    ],
    nearbyRestaurants: [
      { name: "Nobu Downtown", cuisine: "Japanese", distance: "4 min walk", kidFriendly: false, note: "Celebrity chef Nobu Matsuhisa's flagship — upscale dining" },
      { name: "Eataly Downtown", cuisine: "Italian Market", distance: "3 min walk", kidFriendly: true, note: "Italian food hall with multiple restaurants and a market" },
      { name: "Crown Shy", cuisine: "New American", distance: "5 min walk", kidFriendly: false, note: "One of NYC's hottest restaurants — great for date night" },
      { name: "Shake Shack", cuisine: "Burgers", distance: "2 min walk", kidFriendly: true, note: "Classic burgers, easy with kids" }
    ],
    description: "A modern hotel near the Statue of Liberty, One World Observatory, and the 9/11 Memorial. Great value option in Lower Manhattan, though note that cribs are not currently available at this location.",
    familyHighlights: ["Close to Statue of Liberty ferry", "Near One World Observatory", "Eataly food hall walking distance", "Note: Cribs NOT available at this location"]
  }
];

const billingRecords = [
  { id: "INV-2024-001", date: "2024-12-15", hotel: "Eleven Hotels Downtown", amount: 567.00, status: "Paid", nights: 3 },
  { id: "INV-2024-002", date: "2025-01-22", hotel: "Eleven Hotels Beachfront", amount: 916.00, status: "Paid", nights: 4 },
  { id: "INV-2025-003", date: "2025-02-10", hotel: "Eleven Hotels Resort & Spa", amount: 777.00, status: "Pending", nights: 3 },
  { id: "INV-2025-004", date: "2025-03-05", hotel: "Eleven Hotels Mountain Lodge", amount: 1197.00, status: "Pending", nights: 4 },
];

const faqData = [
  { q: "What is the cancellation policy?", a: "Free cancellation up to 24 hours before check-in. Late cancellations may incur a one-night charge." },
  { q: "What time is check-in and check-out?", a: "Check-in is at 3:00 PM and check-out is at 11:00 AM. Early check-in and late check-out are available upon request." },
  { q: "Do you offer pet-friendly rooms?", a: "Yes! Select Eleven Hotels locations offer pet-friendly rooms. A pet fee of $50 per stay applies." },
  { q: "How do I earn rewards points?", a: "You earn 10 points per dollar spent on eligible room rates. Bonus points are available during promotional periods." },
  { q: "Is breakfast included?", a: "Complimentary breakfast is included at select properties. Check the hotel amenities for details." },
  { q: "How do I modify my reservation?", a: "Log into your account, go to My Bookings, and select Modify. You can also call our support line." },
  { q: "Are cribs available?", a: "Most Eleven Hotels properties offer complimentary cribs. Check the hotel details page or ask our agent for crib availability at your chosen hotel." },
  { q: "Can I use rewards points for booking?", a: "Yes! You can apply your Eleven Rewards points at checkout. Points are worth $0.01 each, so 10,000 points = $100 off your stay." },
];

const rewardsData = {
  points: 45230,
  tier: "Gold",
  pointsValue: 452.30,
  pointsToNextTier: 4770,
  nightsThisYear: 14,
  nightsForNextTier: 6,
  pointsPerDollar: 10,
  dollarsPerPoint: 0.01,
  history: [
    { desc: "Earned — Downtown Stay", pts: "+1,890 pts", date: "Dec 15" },
    { desc: "Earned — Beachfront Stay", pts: "+3,664 pts", date: "Jan 22" },
    { desc: "Redeemed — Free Night", pts: "-10,000 pts", date: "Feb 1" },
    { desc: "Bonus — Gold Member Promo", pts: "+2,000 pts", date: "Feb 10" },
  ]
};

// ============== COMPONENTS ==============

function Nav({ current, onNavigate }: { current: Page; onNavigate: (p: Page) => void }) {
  const links: { page: Page; label: string }[] = [
    { page: "home", label: "Home" },
    { page: "hotels", label: "Hotels" },
    { page: "nyc_hotels", label: "NYC Hotels" },
    { page: "booking", label: "Book Now" },
    { page: "billing", label: "Billing" },
    { page: "account", label: "My Account" },
    { page: "rewards", label: "Rewards" },
    { page: "support", label: "Support" },
  ];
  return (
    <nav style={{ background: "#1a1a2e", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => onNavigate("home")}>
        <span style={{ fontSize: 28 }}>🏨</span>
        <span style={{ color: "#f0c040", fontWeight: 700, fontSize: 20 }}>Eleven Hotels</span>
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        {links.map(l => (
          <button key={l.page} onClick={() => onNavigate(l.page)}
            style={{ background: current === l.page ? "#f0c040" : "transparent", color: current === l.page ? "#1a1a2e" : "#ccc", border: "none", padding: "8px 14px", borderRadius: 6, cursor: "pointer", fontWeight: current === l.page ? 700 : 400, fontSize: 13 }}>
            {l.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

function Footer({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <footer style={{ background: "#1a1a2e", color: "#aaa", padding: "40px 24px", marginTop: 60 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
        <div>
          <h4 style={{ color: "#f0c040", marginBottom: 12 }}>Eleven Hotels</h4>
          <p style={{ fontSize: 13, lineHeight: 1.6 }}>Experience comfort and luxury at every stay. Your home away from home.</p>
        </div>
        <div>
          <h4 style={{ color: "#fff", marginBottom: 12 }}>Quick Links</h4>
          {(["hotels", "nyc_hotels", "booking", "rewards"] as Page[]).map(p => (
            <div key={p}><a onClick={() => onNavigate(p)} style={{ color: "#aaa", cursor: "pointer", fontSize: 13, lineHeight: 2 }}>{p === "nyc_hotels" ? "NYC Hotels" : p.charAt(0).toUpperCase() + p.slice(1)}</a></div>
          ))}
        </div>
        <div>
          <h4 style={{ color: "#fff", marginBottom: 12 }}>Support</h4>
          {(["faq", "contact", "support"] as Page[]).map(p => (
            <div key={p}><a onClick={() => onNavigate(p)} style={{ color: "#aaa", cursor: "pointer", fontSize: 13, lineHeight: 2 }}>{p.toUpperCase()}</a></div>
          ))}
        </div>
        <div>
          <h4 style={{ color: "#fff", marginBottom: 12 }}>Contact</h4>
          <p style={{ fontSize: 13, lineHeight: 1.8 }}>📞 1-800-ELEVEN-H<br />📧 support@elevenhotels.com<br />📍 123 Hospitality Blvd</p>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: 32, paddingTop: 20, borderTop: "1px solid #333", fontSize: 12 }}>© 2025 Eleven Hotels. All rights reserved.</div>
    </footer>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", padding: 24, ...style }}>{children}</div>;
}

function Btn({ children, onClick, variant = "primary", style }: { children: React.ReactNode; onClick?: () => void; variant?: "primary" | "secondary"; style?: React.CSSProperties }) {
  const bg = variant === "primary" ? "#f0c040" : "#1a1a2e";
  const color = variant === "primary" ? "#1a1a2e" : "#fff";
  return <button onClick={onClick} style={{ background: bg, color, border: "none", padding: "12px 24px", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: 15, ...style }}>{children}</button>;
}

function Tag({ children, color = "#f0f0f0", textColor = "#333" }: { children: React.ReactNode; color?: string; textColor?: string }) {
  return <span style={{ background: color, color: textColor, padding: "4px 10px", borderRadius: 12, fontSize: 12, fontWeight: 500, display: "inline-block" }}>{children}</span>;
}

// ============== PAGES ==============

function HomePage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", color: "#fff", padding: "80px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: 48, marginBottom: 16 }}>Welcome to <span style={{ color: "#f0c040" }}>Eleven Hotels</span></h1>
        <p style={{ fontSize: 20, color: "#ccc", maxWidth: 600, margin: "0 auto 32px" }}>Experience luxury, comfort, and exceptional service at every stay. Your perfect getaway starts here.</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <Btn onClick={() => onNavigate("booking")}>Book Your Stay</Btn>
          <Btn onClick={() => onNavigate("nyc_hotels")} variant="secondary">Explore NYC Hotels</Btn>
        </div>
      </div>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
        <h2 style={{ textAlign: "center", marginBottom: 8, fontSize: 28 }}>Featured NYC Family Hotels</h2>
        <p style={{ textAlign: "center", color: "#888", marginBottom: 32 }}>Kid-friendly properties with cribs, great food nearby, and everything your family needs.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {nycHotels.slice(0, 3).map(h => (
            <Card key={h.id}>
              <div style={{ fontSize: 48, textAlign: "center", marginBottom: 12 }}>{h.image}</div>
              <h3 style={{ marginBottom: 4, fontSize: 16 }}>{h.name}</h3>
              <p style={{ color: "#888", marginBottom: 8, fontSize: 13 }}>{h.neighborhood}</p>
              <div style={{ display: "flex", gap: 4, marginBottom: 8, flexWrap: "wrap" }}>
                {h.cribAvailable && <Tag color="#e6f9e6" textColor="#2e7d32">🛏️ Cribs Available</Tag>}
                {h.kidFriendly && <Tag color="#e3f2fd" textColor="#1565c0">👶 Kid Friendly</Tag>}
                <Tag color="#fff3e0" textColor="#e65100">🍽️ {h.nearbyRestaurants.length} Restaurants Nearby</Tag>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 700, fontSize: 20, color: "#1a1a2e" }}>${h.price}<span style={{ fontSize: 13, fontWeight: 400 }}>/night</span></span>
                <span style={{ color: "#f0c040" }}>⭐ {h.rating}</span>
              </div>
              <Btn onClick={() => onNavigate("nyc_hotels")} style={{ width: "100%", marginTop: 12 }}>View Details</Btn>
            </Card>
          ))}
        </div>
      </div>
      <div style={{ background: "#f8f8f8", padding: "48px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ marginBottom: 32, fontSize: 28 }}>Why Eleven Hotels?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {[["👶", "Family First", "Cribs, baby gear, and kid-friendly amenities at most locations"], ["🍽️", "Foodie Friendly", "Curated restaurant guides for every neighborhood"], ["🎁", "Rewards Program", "Earn points on every stay — use them to book free nights"], ["📞", "24/7 Support", "Our AI concierge and human team are always here"]].map(([icon, title, desc]) => (
              <div key={title as string} style={{ padding: 24 }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{icon}</div>
                <h3 style={{ marginBottom: 8 }}>{title}</h3>
                <p style={{ color: "#888", fontSize: 14 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NYCHotelsPage({ onNavigate, onSelectHotel }: { onNavigate: (p: Page) => void; onSelectHotel: (hotel: typeof nycHotels[0]) => void }) {
  const [filter, setFilter] = useState<"all" | "crib" | "foodie">("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = nycHotels.filter(h => {
    if (filter === "crib") return h.cribAvailable;
    if (filter === "foodie") return h.nearbyRestaurants.length >= 5;
    return true;
  });

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>New York City Hotels</h1>
      <p style={{ color: "#888", marginBottom: 24 }}>Find the perfect family-friendly hotel in NYC. All properties listed offer kid-friendly amenities.</p>

      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {([["all", "All Hotels"], ["crib", "🛏️ Cribs Available"], ["foodie", "🍽️ Best for Foodies"]] as [string, string][]).map(([key, label]) => (
          <button key={key} onClick={() => setFilter(key as any)} style={{ padding: "8px 16px", borderRadius: 20, border: filter === key ? "2px solid #f0c040" : "1px solid #ddd", background: filter === key ? "#fff8e0" : "#fff", cursor: "pointer", fontWeight: filter === key ? 600 : 400, fontSize: 13 }}>{label}</button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {filtered.map(h => (
          <Card key={h.id} style={{ border: expandedId === h.id ? "2px solid #f0c040" : "1px solid #eee" }}>
            <div style={{ display: "flex", gap: 20 }}>
              <div style={{ fontSize: 56, display: "flex", alignItems: "flex-start", paddingTop: 4 }}>{h.image}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h3 style={{ marginBottom: 4 }}>{h.name}</h3>
                    <p style={{ color: "#888", marginBottom: 6, fontSize: 14 }}>{h.neighborhood} — {h.address}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 700, fontSize: 24 }}>${h.price}<span style={{ fontSize: 13, fontWeight: 400 }}>/night</span></div>
                    <span style={{ color: "#f0c040" }}>⭐ {h.rating}</span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
                  {h.cribAvailable ? <Tag color="#e6f9e6" textColor="#2e7d32">🛏️ Cribs Available</Tag> : <Tag color="#ffebee" textColor="#c62828">❌ No Cribs</Tag>}
                  {h.kidFriendly && <Tag color="#e3f2fd" textColor="#1565c0">👶 Kid Friendly</Tag>}
                  <Tag color="#fff3e0" textColor="#e65100">🍽️ {h.nearbyRestaurants.filter(r => r.kidFriendly).length} Kid-Friendly Restaurants</Tag>
                  <Tag color="#f3e5f5" textColor="#7b1fa2">🍽️ {h.nearbyRestaurants.length} Total Nearby</Tag>
                </div>

                <p style={{ fontSize: 14, color: "#555", marginBottom: 12, lineHeight: 1.5 }}>{h.description}</p>

                <div style={{ display: "flex", gap: 8 }}>
                  <Btn onClick={() => setExpandedId(expandedId === h.id ? null : h.id)} variant="secondary" style={{ fontSize: 13, padding: "8px 16px" }}>
                    {expandedId === h.id ? "Hide Details" : "View Details"}
                  </Btn>
                  <Btn onClick={() => { onSelectHotel(h); onNavigate("booking"); }} style={{ fontSize: 13, padding: "8px 16px" }}>
                    Book This Hotel
                  </Btn>
                </div>
              </div>
            </div>

            {expandedId === h.id && (
              <div style={{ marginTop: 20, borderTop: "1px solid #eee", paddingTop: 20 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                  <div>
                    <h4 style={{ marginBottom: 12, color: "#1a1a2e" }}>👶 Family Highlights</h4>
                    {h.familyHighlights.map((fh, i) => (
                      <div key={i} style={{ padding: "6px 0", fontSize: 14, color: "#555" }}>✅ {fh}</div>
                    ))}

                    <h4 style={{ marginTop: 16, marginBottom: 12, color: "#1a1a2e" }}>🏨 Amenities</h4>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {h.amenities.map(a => <Tag key={a}>{a}</Tag>)}
                    </div>
                  </div>

                  <div>
                    <h4 style={{ marginBottom: 12, color: "#1a1a2e" }}>🍽️ Nearby Restaurants</h4>
                    {h.nearbyRestaurants.map((r, i) => (
                      <div key={i} style={{ padding: "8px 0", borderBottom: i < h.nearbyRestaurants.length - 1 ? "1px solid #f0f0f0" : "none" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <strong style={{ fontSize: 14 }}>{r.name}</strong>
                          <div style={{ display: "flex", gap: 4 }}>
                            <Tag>{r.cuisine}</Tag>
                            <Tag>{r.distance}</Tag>
                            {r.kidFriendly && <Tag color="#e6f9e6" textColor="#2e7d32">👶</Tag>}
                          </div>
                        </div>
                        <p style={{ fontSize: 13, color: "#888", marginTop: 2 }}>{r.note}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <h4 style={{ marginTop: 20, marginBottom: 12, color: "#1a1a2e" }}>🛏️ Room Options</h4>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                  {h.rooms.map((r, i) => (
                    <div key={i} style={{ border: "1px solid #eee", borderRadius: 8, padding: 16 }}>
                      <h4 style={{ marginBottom: 4, fontSize: 14 }}>{r.name}</h4>
                      <p style={{ fontSize: 13, color: "#888", marginBottom: 8 }}>{r.description}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <strong>${r.price}/night</strong>
                        <Btn onClick={() => { onSelectHotel(h); onNavigate("booking"); }} style={{ fontSize: 12, padding: "6px 12px" }}>Book</Btn>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

function HotelsPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const cities = [
    { city: "New York City", count: 5, image: "🗽", page: "nyc_hotels" as Page },
    { city: "Miami", count: 3, image: "🏖️", page: "hotels" as Page },
    { city: "Aspen", count: 2, image: "🏔️", page: "hotels" as Page },
    { city: "Chicago", count: 3, image: "🌆", page: "hotels" as Page },
    { city: "Scottsdale", count: 2, image: "🌵", page: "hotels" as Page },
    { city: "Charleston", count: 2, image: "🏛️", page: "hotels" as Page },
  ];
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>Our Hotels</h1>
      <p style={{ color: "#888", marginBottom: 24 }}>Discover Eleven Hotels properties across the country.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {cities.map(c => (
          <Card key={c.city} style={{ textAlign: "center", cursor: "pointer" }}>
            <div onClick={() => onNavigate(c.page)}>
              <div style={{ fontSize: 56, marginBottom: 12 }}>{c.image}</div>
              <h3>{c.city}</h3>
              <p style={{ color: "#888", fontSize: 14 }}>{c.count} {c.count === 1 ? "property" : "properties"}</p>
              {c.city === "New York City" && <Tag color="#f0c040" textColor="#1a1a2e">Most Popular</Tag>}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function BookingPage({ selectedHotel, onNavigate, bookingDefaults }: { selectedHotel: typeof nycHotels[0] | null; onNavigate: (p: Page) => void; bookingDefaults?: {checkin: string; checkout: string; guests: string} | null }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ location: "New York", checkin: bookingDefaults?.checkin || "", checkout: bookingDefaults?.checkout || "", guests: bookingDefaults?.guests || "3", hotel: selectedHotel?.name || "", room: "" });
  const [usePoints, setUsePoints] = useState(false);
  const [pointsToUse, setPointsToUse] = useState(0);

  const selectedRoom = selectedHotel?.rooms.find(r => r.name === form.room) || selectedHotel?.rooms[0];
  const nights = 3;
  const subtotal = (selectedRoom?.price || 279) * nights;
  const pointsDiscount = usePoints ? pointsToUse * rewardsData.dollarsPerPoint : 0;
  const total = subtotal - pointsDiscount;

  useEffect(() => {
    if (selectedHotel) {
      setForm(f => ({
        ...f,
        hotel: selectedHotel.name,
        location: "New York",
        checkin: f.checkin || "2025-03-15",
        checkout: f.checkout || "2025-03-18",
        guests: f.guests || "3"
      }));
      setStep(2);
    }
  }, [selectedHotel]);

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 24px" }}>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>Book Your Stay</h1>
      <p style={{ color: "#888", marginBottom: 24 }}>Complete the form below to reserve your room.</p>
      <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
        {["Search", "Select Room", "Rewards", "Confirm"].map((s, i) => (
          <div key={s} style={{ flex: 1, textAlign: "center", padding: "10px 0", borderBottom: `3px solid ${step >= i + 1 ? "#f0c040" : "#ddd"}`, color: step >= i + 1 ? "#1a1a2e" : "#aaa", fontWeight: step === i + 1 ? 700 : 400, fontSize: 14 }}>{s}</div>
        ))}
      </div>

      {step === 1 && (
        <Card>
          <h3 style={{ marginBottom: 16 }}>Search Hotels</h3>
          {[["Location", "location", "text", "Where are you going?"], ["Check-in", "checkin", "date", ""], ["Check-out", "checkout", "date", ""], ["Guests (including children)", "guests", "number", ""]].map(([label, key, type, ph]) => (
            <div key={key} style={{ marginBottom: 16 }}>
              <label style={{ display: "block", marginBottom: 4, fontWeight: 600, fontSize: 14 }}>{label}</label>
              <input type={type} placeholder={ph as string} value={(form as any)[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} style={{ width: "100%", padding: "12px", borderRadius: 8, border: "1px solid #ddd", fontSize: 15, boxSizing: "border-box" }} />
            </div>
          ))}
          <Btn onClick={() => setStep(2)} style={{ width: "100%", marginTop: 8 }}>Search Available Hotels</Btn>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <h3 style={{ marginBottom: 16 }}>Select Your Room</h3>
          {(selectedHotel ? [selectedHotel] : nycHotels.filter(h => h.cribAvailable).slice(0, 3)).map(h => (
            <div key={h.id} style={{ border: form.hotel === h.name ? "2px solid #f0c040" : "1px solid #eee", borderRadius: 8, padding: 16, marginBottom: 12, cursor: "pointer" }} onClick={() => setForm({ ...form, hotel: h.name })}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <strong>{h.name}</strong><br />
                  <span style={{ color: "#888", fontSize: 13 }}>{h.neighborhood}</span>
                  <div style={{ marginTop: 4, display: "flex", gap: 4 }}>
                    {h.cribAvailable && <Tag color="#e6f9e6" textColor="#2e7d32">🛏️ Crib</Tag>}
                    <Tag color="#e3f2fd" textColor="#1565c0">👶 Kid Friendly</Tag>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}><strong>${h.price}</strong>/night<br /><span style={{ color: "#f0c040", fontSize: 13 }}>⭐ {h.rating}</span></div>
              </div>
              {form.hotel === h.name && (
                <div style={{ marginTop: 12 }}>
                  {h.rooms.map(r => (
                    <button key={r.name} onClick={(e) => { e.stopPropagation(); setForm({ ...form, room: r.name }); }}
                      style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 14px", borderRadius: 6, border: form.room === r.name ? "2px solid #f0c040" : "1px solid #ddd", background: form.room === r.name ? "#fff8e0" : "#fff", cursor: "pointer", fontSize: 13, marginBottom: 6 }}>
                      <strong>{r.name}</strong> — ${r.price}/night<br />
                      <span style={{ color: "#888" }}>{r.description}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Btn onClick={() => setStep(3)} style={{ width: "100%", marginTop: 8 }}>Continue</Btn>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <h3 style={{ marginBottom: 16 }}>Use Rewards Points?</h3>
          <div style={{ background: "linear-gradient(135deg, #1a1a2e, #0f3460)", borderRadius: 12, padding: 20, color: "#fff", marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 13, color: "#f0c040" }}>Your Points Balance</div>
                <div style={{ fontSize: 32, fontWeight: 700 }}>{rewardsData.points.toLocaleString()} pts</div>
                <div style={{ fontSize: 14, color: "#aaa" }}>Worth ${rewardsData.pointsValue.toFixed(2)}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, color: "#f0c040" }}>Member Tier</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: "#f0c040" }}>{rewardsData.tier}</div>
                <div style={{ fontSize: 13, color: "#aaa" }}>10% member discount applied</div>
              </div>
            </div>
          </div>

          <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 16, marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <strong>Room Cost: {nights} nights × ${selectedRoom?.price || 279}</strong>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <input type="checkbox" checked={usePoints} onChange={e => { setUsePoints(e.target.checked); if (e.target.checked) setPointsToUse(Math.min(rewardsData.points, subtotal / rewardsData.dollarsPerPoint)); else setPointsToUse(0); }} style={{ width: 18, height: 18 }} />
              <label style={{ fontWeight: 600 }}>Apply rewards points to this booking</label>
            </div>
            {usePoints && (
              <div style={{ background: "#f8f8f8", borderRadius: 8, padding: 12 }}>
                <label style={{ display: "block", marginBottom: 4, fontSize: 13 }}>Points to apply (max {rewardsData.points.toLocaleString()}):</label>
                <input type="range" min={0} max={Math.min(rewardsData.points, subtotal / rewardsData.dollarsPerPoint)} value={pointsToUse} onChange={e => setPointsToUse(Number(e.target.value))} style={{ width: "100%" }} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginTop: 4 }}>
                  <span>{pointsToUse.toLocaleString()} points</span>
                  <span style={{ color: "#2e7d32", fontWeight: 600 }}>-${pointsDiscount.toFixed(2)} off</span>
                </div>
              </div>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderTop: "2px solid #1a1a2e" }}>
            <span style={{ fontSize: 18, fontWeight: 700 }}>Total</span>
            <span style={{ fontSize: 24, fontWeight: 700, color: "#1a1a2e" }}>${total.toFixed(2)}</span>
          </div>

          <button onClick={() => onNavigate("rewards")} style={{ background: "none", border: "none", color: "#0f3460", textDecoration: "underline", cursor: "pointer", fontSize: 13, marginBottom: 12, padding: 0 }}>View full rewards details →</button>

          <Btn onClick={() => setStep(4)} style={{ width: "100%", marginTop: 8 }}>Continue to Confirmation</Btn>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <h3 style={{ marginBottom: 16 }}>Booking Confirmation</h3>
          <div style={{ background: "#f8f8f8", borderRadius: 8, padding: 20, marginBottom: 20 }}>
            <p><strong>Hotel:</strong> {form.hotel || "Eleven Hotels Times Square Family Suites"}</p>
            <p><strong>Room:</strong> {form.room || "Family King Suite"}</p>
            <p><strong>Check-in:</strong> {form.checkin || "2025-03-15"}</p>
            <p><strong>Check-out:</strong> {form.checkout || "2025-03-18"}</p>
            <p><strong>Guests:</strong> {form.guests} (including children)</p>
            <hr style={{ margin: "12px 0", border: "none", borderTop: "1px solid #ddd" }} />
            <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
            {usePoints && <p style={{ color: "#2e7d32" }}><strong>Points Discount:</strong> -${pointsDiscount.toFixed(2)} ({pointsToUse.toLocaleString()} points)</p>}
            <p style={{ fontWeight: 700, fontSize: 24, marginTop: 8 }}>Total: ${total.toFixed(2)}</p>
          </div>
          <div style={{ background: "#e6f9e6", borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 14, color: "#2e7d32" }}>
            ✅ Complimentary crib will be set up in your room before arrival
          </div>
          <Btn onClick={() => alert("Booking confirmed! (Demo)")} style={{ width: "100%" }}>Confirm Booking</Btn>
        </Card>
      )}
    </div>
  );
}

function BillingPage() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>Billing & Payments</h1>
      <p style={{ color: "#888", marginBottom: 24 }}>View your billing history and manage payment methods.</p>
      <Card style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 16 }}>Payment Method on File</h3>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f8f8f8", padding: 16, borderRadius: 8 }}>
          <div>💳 Visa ending in <strong>4242</strong><br /><span style={{ color: "#888", fontSize: 13 }}>Expires 08/2027</span></div>
          <button style={{ background: "none", border: "1px solid #ddd", padding: "8px 16px", borderRadius: 6, cursor: "pointer" }}>Update</button>
        </div>
      </Card>
      <Card>
        <h3 style={{ marginBottom: 16 }}>Billing History</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #eee", textAlign: "left" }}>
              <th style={{ padding: "10px 8px" }}>Invoice</th>
              <th style={{ padding: "10px 8px" }}>Date</th>
              <th style={{ padding: "10px 8px" }}>Hotel</th>
              <th style={{ padding: "10px 8px" }}>Nights</th>
              <th style={{ padding: "10px 8px" }}>Amount</th>
              <th style={{ padding: "10px 8px" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {billingRecords.map(b => (
              <tr key={b.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                <td style={{ padding: "12px 8px", fontWeight: 600 }}>{b.id}</td>
                <td style={{ padding: "12px 8px" }}>{b.date}</td>
                <td style={{ padding: "12px 8px" }}>{b.hotel}</td>
                <td style={{ padding: "12px 8px" }}>{b.nights}</td>
                <td style={{ padding: "12px 8px", fontWeight: 600 }}>${b.amount.toFixed(2)}</td>
                <td style={{ padding: "12px 8px" }}><span style={{ background: b.status === "Paid" ? "#e6f9e6" : "#fff3e0", color: b.status === "Paid" ? "#2e7d32" : "#e65100", padding: "4px 12px", borderRadius: 12, fontSize: 12, fontWeight: 600 }}>{b.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function AccountPage() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 24px" }}>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>My Account</h1>
      <p style={{ color: "#888", marginBottom: 24 }}>Manage your profile, preferences, and settings.</p>
      <Card style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 16 }}>Profile Information</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[["First Name", "Alex"], ["Last Name", "Johnson"], ["Email", "alex.johnson@email.com"], ["Phone", "(555) 123-4567"], ["Member Since", "January 2022"], ["Member ID", "EH-2022-78432"]].map(([label, value]) => (
            <div key={label}>
              <label style={{ fontSize: 12, color: "#888", fontWeight: 600 }}>{label}</label>
              <div style={{ padding: "10px 14px", background: "#f8f8f8", borderRadius: 6, marginTop: 4 }}>{value}</div>
            </div>
          ))}
        </div>
        <Btn style={{ marginTop: 20 }}>Edit Profile</Btn>
      </Card>
      <Card>
        <h3 style={{ marginBottom: 16 }}>Upcoming Reservations</h3>
        <div style={{ background: "#f8f8f8", borderRadius: 8, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <strong>Eleven Hotels Times Square Family Suites</strong><br />
            <span style={{ color: "#888", fontSize: 13 }}>New York, NY — Mar 15-18, 2025 — Family King Suite — 3 guests (1 child)</span>
          </div>
          <span style={{ background: "#e6f9e6", color: "#2e7d32", padding: "4px 12px", borderRadius: 12, fontSize: 12, fontWeight: 600 }}>Confirmed</span>
        </div>
      </Card>
    </div>
  );
}

function RewardsPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>Eleven Rewards</h1>
      <p style={{ color: "#888", marginBottom: 24 }}>Earn points, unlock perks, and enjoy free stays.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16, marginBottom: 32 }}>
        <Card style={{ textAlign: "center", background: "linear-gradient(135deg, #1a1a2e, #0f3460)", color: "#fff" }}>
          <div style={{ fontSize: 13, color: "#f0c040", marginBottom: 4 }}>Points Balance</div>
          <div style={{ fontSize: 32, fontWeight: 700 }}>{rewardsData.points.toLocaleString()}</div>
          <div style={{ fontSize: 13, color: "#aaa" }}>points available</div>
        </Card>
        <Card style={{ textAlign: "center", background: "linear-gradient(135deg, #1a1a2e, #0f3460)", color: "#fff" }}>
          <div style={{ fontSize: 13, color: "#f0c040", marginBottom: 4 }}>Points Value</div>
          <div style={{ fontSize: 32, fontWeight: 700 }}>${rewardsData.pointsValue.toFixed(2)}</div>
          <div style={{ fontSize: 13, color: "#aaa" }}>$0.01 per point</div>
        </Card>
        <Card style={{ textAlign: "center" }}>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 4 }}>Member Tier</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: "#f0c040" }}>{rewardsData.tier}</div>
          <div style={{ fontSize: 13, color: "#888" }}>{rewardsData.pointsToNextTier.toLocaleString()} pts to Platinum</div>
        </Card>
        <Card style={{ textAlign: "center" }}>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 4 }}>Nights This Year</div>
          <div style={{ fontSize: 32, fontWeight: 700 }}>{rewardsData.nightsThisYear}</div>
          <div style={{ fontSize: 13, color: "#888" }}>{rewardsData.nightsForNextTier} more for Platinum</div>
        </Card>
      </div>

      <Card style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 16 }}>How Points Work</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          <div style={{ background: "#f8f8f8", borderRadius: 8, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>💰</div>
            <h4>Earn</h4>
            <p style={{ fontSize: 14, color: "#666" }}>{rewardsData.pointsPerDollar} points per $1 spent on room rates</p>
          </div>
          <div style={{ background: "#f8f8f8", borderRadius: 8, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🔄</div>
            <h4>Redeem</h4>
            <p style={{ fontSize: 14, color: "#666" }}>1 point = ${rewardsData.dollarsPerPoint} toward any booking</p>
          </div>
          <div style={{ background: "#f8f8f8", borderRadius: 8, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🎁</div>
            <h4>Bonus</h4>
            <p style={{ fontSize: 14, color: "#666" }}>Gold members earn 10% bonus points on every stay</p>
          </div>
        </div>
      </Card>

      <Card style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 16 }}>Points Calculator</h3>
        <div style={{ background: "#fff8e0", borderRadius: 8, padding: 16 }}>
          <p style={{ fontSize: 14, marginBottom: 8 }}>With your <strong>{rewardsData.points.toLocaleString()} points</strong> (worth <strong>${rewardsData.pointsValue.toFixed(2)}</strong>), you could cover:</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 12 }}>
            <div style={{ background: "#fff", borderRadius: 8, padding: 12, textAlign: "center" }}>
              <strong>1.6 nights</strong><br /><span style={{ fontSize: 13, color: "#888" }}>at Times Square ($279/n)</span>
            </div>
            <div style={{ background: "#fff", borderRadius: 8, padding: 12, textAlign: "center" }}>
              <strong>1.9 nights</strong><br /><span style={{ fontSize: 13, color: "#888" }}>at Upper West Side ($239/n)</span>
            </div>
            <div style={{ background: "#fff", borderRadius: 8, padding: 12, textAlign: "center" }}>
              <strong>2.1 nights</strong><br /><span style={{ fontSize: 13, color: "#888" }}>at Williamsburg ($219/n)</span>
            </div>
          </div>
        </div>
        <Btn onClick={() => onNavigate("booking")} style={{ marginTop: 16 }}>Book with Points</Btn>
      </Card>

      <Card style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 16 }}>Tier Benefits</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[["Member", "Base earn rate\n500 pts welcome bonus", false], ["Silver", "5% bonus points\nLate checkout\nFree water", false], ["Gold", "10% bonus points\nFree breakfast\nRoom upgrade\nEarly check-in", true], ["Platinum", "15% bonus points\nLounge access\nSuite upgrade\nFree minibar", false]].map(([tier, perks, current]) => (
            <div key={tier as string} style={{ padding: 16, borderRadius: 8, border: current ? "2px solid #f0c040" : "1px solid #eee", background: current ? "#fff8e0" : "#fff", textAlign: "center" }}>
              <h4 style={{ marginBottom: 8 }}>{tier as string}</h4>
              <p style={{ fontSize: 13, color: "#666", whiteSpace: "pre-line" }}>{perks as string}</p>
              {current && <span style={{ fontSize: 11, color: "#f0c040", fontWeight: 700 }}>CURRENT TIER</span>}
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 style={{ marginBottom: 16 }}>Recent Points Activity</h3>
        {rewardsData.history.map((h, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < rewardsData.history.length - 1 ? "1px solid #f0f0f0" : "none" }}>
            <span>{h.desc}</span>
            <span style={{ display: "flex", gap: 20 }}>
              <span style={{ fontWeight: 600, color: h.pts.startsWith("+") ? "#2e7d32" : "#c62828" }}>{h.pts}</span>
              <span style={{ color: "#888", fontSize: 13, width: 60, textAlign: "right" }}>{h.date}</span>
            </span>
          </div>
        ))}
      </Card>
    </div>
  );
}

function SupportPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 24px" }}>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>Support Center</h1>
      <p style={{ color: "#888", marginBottom: 24 }}>How can we help you today?</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 32 }}>
        {([["📋", "FAQ", "faq"], ["💳", "Billing Help", "billing"], ["📞", "Contact Us", "contact"]] as [string, string, Page][]).map(([icon, label, page]) => (
          <Card key={label} style={{ textAlign: "center", cursor: "pointer" }}>
            <div onClick={() => onNavigate(page)}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>{icon}</div>
              <h3>{label}</h3>
            </div>
          </Card>
        ))}
      </div>
      <Card>
        <h3 style={{ marginBottom: 16 }}>Submit a Support Request</h3>
        <input placeholder="Subject" style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ddd", marginBottom: 12, fontSize: 15, boxSizing: "border-box" }} />
        <textarea placeholder="Describe your issue..." rows={5} style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ddd", marginBottom: 12, fontSize: 15, resize: "vertical", boxSizing: "border-box" }} />
        <Btn>Submit Request</Btn>
      </Card>
    </div>
  );
}

function ContactPage() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 24px" }}>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>Contact Us</h1>
      <p style={{ color: "#888", marginBottom: 24 }}>We would love to hear from you. Reach out anytime.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <Card>
          <h3 style={{ marginBottom: 16 }}>Get in Touch</h3>
          {[["📞 Phone", "1-800-ELEVEN-H", "Mon-Sun, 24/7"], ["📧 Email", "support@elevenhotels.com", "Response within 2 hours"], ["💬 Live Chat", "Available on website", "Mon-Fri, 8AM-10PM EST"], ["📍 Headquarters", "123 Hospitality Blvd", "New York, NY 10001"]].map(([title, val, sub]) => (
            <div key={title} style={{ marginBottom: 16 }}>
              <strong>{title}</strong><br />
              <span>{val}</span><br />
              <span style={{ color: "#888", fontSize: 13 }}>{sub}</span>
            </div>
          ))}
        </Card>
        <Card>
          <h3 style={{ marginBottom: 16 }}>Send a Message</h3>
          <input placeholder="Your Name" style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ddd", marginBottom: 12, boxSizing: "border-box" }} />
          <input placeholder="Your Email" style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ddd", marginBottom: 12, boxSizing: "border-box" }} />
          <textarea placeholder="Your message..." rows={4} style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ddd", marginBottom: 12, resize: "vertical", boxSizing: "border-box" }} />
          <Btn>Send Message</Btn>
        </Card>
      </div>
    </div>
  );
}

function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 24px" }}>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>Frequently Asked Questions</h1>
      <p style={{ color: "#888", marginBottom: 24 }}>Find quick answers to common questions below.</p>
      {faqData.map((f, i) => (
        <Card key={i} style={{ marginBottom: 12, cursor: "pointer" }}>
          <div onClick={() => setOpen(open === i ? null : i)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong>{f.q}</strong>
            <span style={{ fontSize: 20, color: "#888" }}>{open === i ? "−" : "+"}</span>
          </div>
          {open === i && <p style={{ marginTop: 12, color: "#555", lineHeight: 1.6 }}>{f.a}</p>}
        </Card>
      ))}
    </div>
  );
}

// ============== MAIN APP ==============

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [selectedHotel, setSelectedHotel] = useState<typeof nycHotels[0] | null>(null);
  const [bookingDefaults, setBookingDefaults] = useState<{checkin: string; checkout: string; guests: string} | null>(null);

  useEffect(() => {
    (window as any).__elevenHotelsNavigate = (p: Page) => {
      setPage(p);
      window.scrollTo(0, 0);
    };
    (window as any).__elevenHotelsGetPage = () => page;
    (window as any).__elevenHotelsStartBooking = (hotelName: string, checkin: string, checkout: string, guests: string) => {
      const hotel = nycHotels.find(h => h.name.toLowerCase().includes(hotelName.toLowerCase()));
      if (hotel) setSelectedHotel(hotel);
      setBookingDefaults({ checkin, checkout, guests });
      setPage("booking");
      window.scrollTo(0, 0);
    };
  }, [page]);

  const onNavigate = (p: Page) => {
    setPage(p);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage onNavigate={onNavigate} />;
      case "hotels": return <HotelsPage onNavigate={onNavigate} />;
      case "nyc_hotels": return <NYCHotelsPage onNavigate={onNavigate} onSelectHotel={setSelectedHotel} />;
     case "booking": return <BookingPage selectedHotel={selectedHotel} onNavigate={onNavigate} bookingDefaults={bookingDefaults} />;
      case "billing": return <BillingPage />;
      case "account": return <AccountPage />;
      case "rewards": return <RewardsPage onNavigate={onNavigate} />;
      case "support": return <SupportPage onNavigate={onNavigate} />;
      case "contact": return <ContactPage />;
      case "faq": return <FAQPage />;
      default: return <HomePage onNavigate={onNavigate} />;
    }
  };

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: "#1a1a2e", minHeight: "100vh", background: "#fff" }}>
      <Nav current={page} onNavigate={onNavigate} />
      {renderPage()}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}