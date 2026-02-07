import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SmoothScrolling } from "@/components/SmoothScrolling";
import { Header } from "@/components/Header";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tharun Krishna C U | Visual & Brand Designer",
  description: "Portfolio of a Visual and Brand Designer specializing in Digital Design, Identity, and UI/UX.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${inter.variable} antialiased font-sans bg-background text-foreground transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {/* ThemeToggle removed as per request for dark mode only */}
          <SmoothScrolling>
            <Header />
            {children}
          </SmoothScrolling>
        </ThemeProvider>
      </body>
    </html>
  );
}
