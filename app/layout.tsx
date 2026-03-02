export const metadata = {
  title: "Eleven Hotels",
  description: "Experience luxury, comfort, and exceptional service at every stay.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}