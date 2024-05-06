import "@raonc/ui/globals.css";
import "@radix-ui/themes/styles.css";

import Layout from "../components/Layout";
import { BLOG_TITLE, BLOG_URL } from "../constant/common";
import { Analytics } from "@vercel/analytics/next";
import { Metadata } from "next";
import Head from "./head";
import { Theme, ThemePanel } from "@radix-ui/themes";
import NextThemeProvider from "./NextThemeProvider";
import { Noto_Sans_KR } from "next/font/google";
import { TailwindIndicator } from "../components/tailwind-indicator";

const description =
  "안녕하세요. Raon.dev의 개발 블로그 입니다. 주로 Front-end 관련 글을 작성합니다. Youtube 에서 라이브 방송을 합니다.";

export const metadata: Metadata = {
  metadataBase: new URL(`${BLOG_URL}`),
  title: {
    default: BLOG_TITLE,
    template: `${BLOG_TITLE} | %s`,
  },
  description,
  openGraph: {
    title: BLOG_TITLE,
    description,
    url: BLOG_URL,
    siteName: BLOG_TITLE,
    locale: "ko-Kr",
    type: "website",
    images: [
      {
        url: `${BLOG_URL}/og.png`,
        width: 400,
        height: 600,
      },
    ],
  },
};

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <Head />
      <body className={notoSansKr.className}>
        <NextThemeProvider>
          <Theme
            radius="large"
            scaling="100%"
            grayColor="olive"
            accentColor="jade"
          >
            <Layout>{children}</Layout>
            <Analytics />
            {/* <SpeedInsights /> */}
            {process.env.NODE_ENV === "development" && (
              <ThemePanel defaultOpen={false} />
            )}
          <TailwindIndicator />
          </Theme>
        </NextThemeProvider>
      </body>
    </html>
  );
}
