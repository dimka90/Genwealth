import "./globals.css";
import Nav from "@/components/Nav";
import { Providers } from "@/providers/PrivyProviders";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <Nav />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
