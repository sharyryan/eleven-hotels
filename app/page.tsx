"use client";
import { useState, useEffect } from "react";

// ============== TYPES ==============
type Page = "home" | "hotels" | "booking" | "billing" | "account" | "rewards" | "support" | "contact" | "faq";

// ============== HOTEL DATA ==============
const hotels = [
  { id: 1, name: "Eleven Hotels Downtown", city: "New York", state: "NY", price: 189, rating: 4.7, image: "🏨", amenities: ["Free WiFi", "Pool", "Gym", "Restaurant", "Valet Parking"], rooms: ["Standard King", "Deluxe Queen", "Executive Suite"] },
  { id: 2, name: "Eleven Hotels Beachfront", city: "Miami", state: "FL", price: 229, rating: 4.8, image: "🏖️", amenities: ["Ocean View", "Pool", "Spa", "Beach Access", "Free WiFi"], rooms: ["Ocean View King", "Beach Suite", "Penthouse"] },
  { id: 3, name: "Eleven Hotels Mountain Lodge", city: "Aspen", state: "CO", price: 299, rating: 4.9, image: "🏔️", amenities: ["Ski-In/Ski-Out", "Fireplace", "Hot Tub", "Restaurant", "Spa"], rooms: ["Mountain View", "Lodge Suite", "Grand Chalet"] },
  { id: 4, name: "Eleven Hotels Airport", city: "Chicago", state: "IL", price: 129, rating: 4.3, image: "✈️", amenities: ["Airport Shuttle", "Free WiFi", "Business Center", "Gym"], rooms: ["Standard Double", "Business King", "Airport Suite"] },
  { id: 5, name: "Eleven Hotels Resort & Spa", city: "Scottsdale", state: "AZ", price: 259, rating: 4.8, image: "🌵", amenities: ["Full Spa", "Golf Course", "3 Pools", "Fine Dining", "Tennis"], rooms: ["Garden View", "Resort King", "Presidential Suite"] },
  { id: 6, name: "Eleven Hotels Historic District", city: "Charleston", state: "SC", price: 199, rating: 4.6, image: "🏛️", amenities: ["Free Breakfast", "Rooftop Bar", "Courtyard", "Free WiFi"], rooms: ["Classic Queen", "Heritage King", "Carriage Suite"] },
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
];

// ============== COMPONENTS ==============

function Nav({ current, onNavigate }: { current: Page; onNavigate: (p: Page) => void }) {
  const links: { page: Page; label: string }[] = [
    { page: "home", label: "Home" },
    { page: "hotels", label: "Hotels" },
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
            style={{ background: current === l.page ? "#f0c040" : "transparent", color: current === l.page ? "#1a1a2e" : "#ccc", border: "none", padding: "8px 14px", borderRadius: 6, cursor: "pointer", fontWeight: current === l.page ? 700 : 400, fontSize: 14 }}>
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
          {(["hotels", "booking", "rewards"] as Page[]).map(p => (
            <div key={p}><a onClick={() => onNavigate(p)} style={{ color: "#aaa", cursor: "pointer", fontSize: 13, lineHeight: 2 }}>{p.charAt(0).toUpperCase() + p.slice(1)}</a></div>
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

// ============== PAGES ==============

function HomePage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", color: "#fff", padding: "80px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: 48, marginBottom: 16 }}>Welcome to <span style={{ color: "#f0c040" }}>Eleven Hotels</span></h1>
        <p style={{ fontSize: 20, color: "#ccc", maxWidth: 600, margin: "0 auto 32px" }}>Experience luxury, comfort, and exceptional service at every stay. Your perfect getaway starts here.</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <Btn onClick={() => onNavigate("booking")}>Book Your Stay</Btn>
          <Btn onClick={() => onNavigate("hotels")} variant="secondary">Explore Hotels</Btn>
        </div>
      </div>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
        <h2 style={{ textAlign: "center", marginBottom: 32, fontSize: 28 }}>Featured Properties</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {hotels.slice(0, 3).map(h => (
            <Card key={h.id}>
              <div style={{ fontSize: 48, textAlign: "center", marginBottom: 12 }}>{h.image}</div>
              <h3 style={{ marginBottom: 4 }}>{h.name}</h3>
              <p style={{ color: "#888", marginBottom: 8 }}>{h.city}, {h.state}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 700, fontSize: 20, color: "#1a1a2e" }}>${h.price}<span style={{ fontSize: 13, fontWeight: 400 }}>/night</span></span>
                <span style={{ color: "#f0c040" }}>⭐ {h.rating}</span>
              </div>
              <Btn onClick={() => onNavigate("booking")} style={{ width: "100%", marginTop: 12 }}>Book Now</Btn>
            </Card>
          ))}
        </div>
      </div>
      <div style={{ background: "#f8f8f8", padding: "48px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ marginBottom: 32, fontSize: 28 }}>Why Eleven Hotels?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {[["🏆", "Award Winning", "Voted #1 hotel chain 3 years running"], ["💰", "Best Price Guarantee", "Find a lower price? We'll match it plus 10% off"], ["🎁", "Rewards Program", "Earn points on every stay and redeem for free nights"], ["📞", "24/7 Support", "Our team is always here to help you"]].map(([icon, title, desc]) => (
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

function HotelsPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [search, setSearch] = useState("");
  const filtered = hotels.filter(h => !search || h.city.toLowerCase().includes(search.toLowerCase()) || h.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>Our Hotels</h1>
      <p style={{ color: "#888", marginBottom: 24 }}>Discover the perfect Eleven Hotels property for your next trip.</p>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by city or hotel name..." style={{ width: "100%", padding: "14px 18px", borderRadius: 8, border: "1px solid #ddd", fontSize: 16, marginBottom: 32, boxSizing: "border-box" }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
        {filtered.map(h => (
          <Card key={h.id} style={{ display: "flex", gap: 20 }}>
            <div style={{ fontSize: 56, display: "flex", alignItems: "center" }}>{h.image}</div>
            <div style={{ flex: 1 }}>
              <h3 style={{ marginBottom: 4 }}>{h.name}</h3>
              <p style={{ color: "#888", marginBottom: 6 }}>{h.city}, {h.state} — ⭐ {h.rating}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                {h.amenities.map(a => <span key={a} style={{ background: "#f0f0f0", padding: "3px 10px", borderRadius: 12, fontSize: 12 }}>{a}</span>)}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 700, fontSize: 20 }}>${h.price}<span style={{ fontSize: 13, fontWeight: 400 }}>/night</span></span>
                <Btn onClick={() => onNavigate("booking")}>Book</Btn>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function BookingPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ location: "", checkin: "", checkout: "", guests: "1", hotel: "", room: "" });
  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 24px" }}>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>Book Your Stay</h1>
      <p style={{ color: "#888", marginBottom: 24 }}>Complete the form below to reserve your room.</p>
      <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
        {["Search", "Select Room", "Confirm"].map((s, i) => (
          <div key={s} style={{ flex: 1, textAlign: "center", padding: "10px 0", borderBottom: `3px solid ${step >= i + 1 ? "#f0c040" : "#ddd"}`, color: step >= i + 1 ? "#1a1a2e" : "#aaa", fontWeight: step === i + 1 ? 700 : 400 }}>{s}</div>
        ))}
      </div>
      {step === 1 && (
        <Card>
          <h3 style={{ marginBottom: 16 }}>Search Hotels</h3>
          {[["Location", "location", "text", "Where are you going?"], ["Check-in", "checkin", "date", ""], ["Check-out", "checkout", "date", ""], ["Guests", "guests", "number", ""]].map(([label, key, type, ph]) => (
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
          {hotels.slice(0, 3).map(h => (
            <div key={h.id} style={{ border: form.hotel === h.name ? "2px solid #f0c040" : "1px solid #eee", borderRadius: 8, padding: 16, marginBottom: 12, cursor: "pointer" }} onClick={() => setForm({ ...form, hotel: h.name })}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div><strong>{h.name}</strong><br /><span style={{ color: "#888", fontSize: 13 }}>{h.city}, {h.state}</span></div>
                <div style={{ textAlign: "right" }}><strong>${h.price}</strong>/night<br /><span style={{ color: "#f0c040", fontSize: 13 }}>⭐ {h.rating}</span></div>
              </div>
              {form.hotel === h.name && (
                <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                  {h.rooms.map(r => <button key={r} onClick={() => setForm({ ...form, room: r })} style={{ padding: "8px 14px", borderRadius: 6, border: form.room === r ? "2px solid #f0c040" : "1px solid #ddd", background: form.room === r ? "#fff8e0" : "#fff", cursor: "pointer", fontSize: 13 }}>{r}</button>)}
                </div>
              )}
            </div>
          ))}
          <Btn onClick={() => setStep(3)} style={{ width: "100%", marginTop: 8 }}>Continue to Confirmation</Btn>
        </Card>
      )}
      {step === 3 && (
        <Card>
          <h3 style={{ marginBottom: 16 }}>Booking Confirmation</h3>
          <div style={{ background: "#f8f8f8", borderRadius: 8, padding: 20, marginBottom: 20 }}>
            <p><strong>Hotel:</strong> {form.hotel || "Eleven Hotels Downtown"}</p>
            <p><strong>Room:</strong> {form.room || "Standard King"}</p>
            <p><strong>Check-in:</strong> {form.checkin || "2025-03-15"}</p>
            <p><strong>Check-out:</strong> {form.checkout || "2025-03-18"}</p>
            <p><strong>Guests:</strong> {form.guests}</p>
            <hr style={{ margin: "12px 0", border: "none", borderTop: "1px solid #ddd" }} />
            <p style={{ fontWeight: 700, fontSize: 20 }}>Total: $567.00</p>
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
            <strong>Eleven Hotels Resort & Spa</strong><br />
            <span style={{ color: "#888", fontSize: 13 }}>Scottsdale, AZ — Mar 15-18, 2025 — Resort King</span>
          </div>
          <span style={{ background: "#e6f9e6", color: "#2e7d32", padding: "4px 12px", borderRadius: 12, fontSize: 12, fontWeight: 600 }}>Confirmed</span>
        </div>
      </Card>
    </div>
  );
}

function RewardsPage() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>Eleven Rewards</h1>
      <p style={{ color: "#888", marginBottom: 24 }}>Earn points, unlock perks, and enjoy free stays.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginBottom: 32 }}>
        <Card style={{ textAlign: "center", background: "linear-gradient(135deg, #1a1a2e, #0f3460)", color: "#fff" }}>
          <div style={{ fontSize: 14, color: "#f0c040", marginBottom: 4 }}>Points Balance</div>
          <div style={{ fontSize: 36, fontWeight: 700 }}>45,230</div>
          <div style={{ fontSize: 13, color: "#aaa" }}>points available</div>
        </Card>
        <Card style={{ textAlign: "center" }}>
          <div style={{ fontSize: 14, color: "#888", marginBottom: 4 }}>Member Tier</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: "#f0c040" }}>Gold</div>
          <div style={{ fontSize: 13, color: "#888" }}>4,770 pts to Platinum</div>
        </Card>
        <Card style={{ textAlign: "center" }}>
          <div style={{ fontSize: 14, color: "#888", marginBottom: 4 }}>Nights This Year</div>
          <div style={{ fontSize: 36, fontWeight: 700 }}>14</div>
          <div style={{ fontSize: 13, color: "#888" }}>6 more for Platinum</div>
        </Card>
      </div>
      <Card style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 16 }}>Tier Benefits</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[["Member", "Base rate\n500 pts bonus", false], ["Silver", "5% off\nLate checkout", false], ["Gold", "10% off\nFree breakfast\nRoom upgrade", true], ["Platinum", "15% off\nLounge access\nSuite upgrade", false]].map(([tier, perks, current]) => (
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
        {[["Earned — Downtown Stay", "+1,890 pts", "Dec 15"], ["Earned — Beachfront Stay", "+3,664 pts", "Jan 22"], ["Redeemed — Free Night", "-10,000 pts", "Feb 1"], ["Bonus — Gold Member Promo", "+2,000 pts", "Feb 10"]].map(([desc, pts, date]) => (
          <div key={desc} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f0f0f0" }}>
            <span>{desc}</span>
            <span style={{ display: "flex", gap: 20 }}>
              <span style={{ fontWeight: 600, color: (pts as string).startsWith("+") ? "#2e7d32" : "#c62828" }}>{pts}</span>
              <span style={{ color: "#888", fontSize: 13, width: 60, textAlign: "right" }}>{date}</span>
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
      <p style={{ color: "#888", marginBottom: 24 }}>We'd love to hear from you. Reach out anytime.</p>
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

  // Expose navigation function globally for ElevenLabs agent
  useEffect(() => {
    (window as any).__elevenHotelsNavigate = (p: Page) => {
      setPage(p);
      window.scrollTo(0, 0);
    };
    (window as any).__elevenHotelsGetPage = () => page;
  }, [page]);

  const onNavigate = (p: Page) => {
    setPage(p);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage onNavigate={onNavigate} />;
      case "hotels": return <HotelsPage onNavigate={onNavigate} />;
      case "booking": return <BookingPage />;
      case "billing": return <BillingPage />;
      case "account": return <AccountPage />;
      case "rewards": return <RewardsPage />;
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
      {/* ElevenLabs Widget */}
      <div dangerouslySetInnerHTML={{ __html: '<elevenlabs-convai agent-id="agent_9201kjnr6xqcfk7syx2g3fd7hph8"></elevenlabs-convai><script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>' }} />
      <script dangerouslySetInnerHTML={{ __html: `
        (function check() {
          var widget = document.querySelector('elevenlabs-convai');
          if (!widget) { setTimeout(check, 500); return; }
          widget.addEventListener('elevenlabs-convai:call', function(event) {
            console.log('TOOL CALLED:', JSON.stringify(event.detail));
            event.detail.config.clientTools = {
              navigate_to_page: function(params) {
                console.log('NAVIGATING TO:', params.page);
                if (window.__elevenHotelsNavigate) window.__elevenHotelsNavigate(params.page);
                return 'Navigated to ' + params.page;
              },
              search_hotels: function(params) {
                console.log('SEARCHING:', params.location);
                if (window.__elevenHotelsNavigate) window.__elevenHotelsNavigate('hotels');
                return 'Showing hotels in ' + params.location;
              },
              start_booking: function(params) {
                console.log('BOOKING:', params.hotel_name);
                if (window.__elevenHotelsNavigate) window.__elevenHotelsNavigate('booking');
                return 'Starting booking for ' + params.hotel_name;
              },
              view_billing: function(params) {
                console.log('BILLING');
                if (window.__elevenHotelsNavigate) window.__elevenHotelsNavigate('billing');
                return 'Showing billing records';
              },
              check_rewards_balance: function() {
                console.log('REWARDS');
                if (window.__elevenHotelsNavigate) window.__elevenHotelsNavigate('rewards');
                return 'Points balance: 45,230. Tier: Gold';
              }
            };
          });
          console.log('CLIENT TOOLS REGISTERED');
        })();
      `}} />
    </div>
  );
}