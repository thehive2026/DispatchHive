
# Generate app/layout.tsx - Root Layout

layout_tsx = """import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DispatchHive - Simple Dispatch Management",
  description:
    "Dispatch management software for small carriers and freight brokers. Track loads, manage drivers, and grow your fleet.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
"""

print("=" * 60)
print("FILE 17: app/layout.tsx")
print("=" * 60)
print(layout_tsx)

