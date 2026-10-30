import "./globals.css";

export const metadata = {
  title: "Nexa",
  description: "ZamLine informational website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
