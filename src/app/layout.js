
import "./globals.css";

export const metadata = {
  title: "DEV@Deakin",
  description: "Artcle and Tutorial Hub",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
