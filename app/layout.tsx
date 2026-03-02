import Script from "next/script";

export const metadata = {
  title: "Eleven Hotels",
  description: "Experience luxury, comfort, and exceptional service at every stay.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
        <Script
          src="https://unpkg.com/@elevenlabs/convai-widget-embed"
          strategy="afterInteractive"
        />
        <Script id="eleven-widget" strategy="afterInteractive">
          {`
            (function check() {
              if (!document.querySelector('elevenlabs-convai')) {
                var el = document.createElement('elevenlabs-convai');
                el.setAttribute('agent-id', 'agent_9201kjnr6xqcfk7syx2g3fd7hph8');
                document.body.appendChild(el);
              }
              var widget = document.querySelector('elevenlabs-convai');
              if (!widget) { setTimeout(check, 500); return; }
              widget.addEventListener('elevenlabs-convai:call', function(event) {
                event.detail.config.clientTools = {
                  navigate_to_page: function(params) {
                    if (window.__elevenHotelsNavigate) window.__elevenHotelsNavigate(params.page);
                    return 'Navigated to ' + params.page;
                  },
                  search_hotels: function(params) {
                    if (window.__elevenHotelsNavigate) window.__elevenHotelsNavigate('hotels');
                    return 'Showing hotels in ' + params.location;
                  },
                  start_booking: function(params) {
                    if (window.__elevenHotelsNavigate) window.__elevenHotelsNavigate('booking');
                    return 'Starting booking for ' + params.hotel_name;
                  },
                  view_billing: function(params) {
                    if (window.__elevenHotelsNavigate) window.__elevenHotelsNavigate('billing');
                    return 'Showing billing records';
                  },
                  check_rewards_balance: function() {
                    if (window.__elevenHotelsNavigate) window.__elevenHotelsNavigate('rewards');
                    return 'Points balance: 45,230. Tier: Gold';
                  }
                };
              });
            })();
          `}
        </Script>
      </body>
    </html>
  );
}