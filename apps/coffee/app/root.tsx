import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import stylesheet from "@raonc/ui/globals.css?url";
import fontStyleSheet from "../public/font/pretendardvariable.css?url";
import { LinksFunction, LoaderFunctionArgs, MetaFunction } from "@vercel/remix";
import SiteHeader from "./components/site-header";
import { TailwindIndicator } from "./components/tailwind-indicator";
import { Icons } from "./components/Icons";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from "remix-themes";
import { themeSessionResolver } from "./components/theme-session";
import { cn } from "@raonc/ui/lib/utils";
import { siteConfig } from "./constant/common";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/remix";

export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request);
  return {
    theme: getTheme(),
  };
}

export const meta: MetaFunction = ({ location }) => {
  return [
    { title: siteConfig.name },
    { name: "description", content: siteConfig.description },
    { name: "og:title", content: siteConfig.name },
    { name: "og:description", content: siteConfig.description },
    { name: "og:image", content: `https://${siteConfig.domain}/og-image.png` },
    {
      name: "og:url",
      content: `https://${siteConfig.domain}${location.pathname}`,
    },
    {
      name: "twitter:image",
      content: `https://${siteConfig.domain}/og-image.png`,
    },
    {
      name: "twitter:card",
      content: `https://${siteConfig.domain}/og-image.png`,
    },
    { name: "twitter:title", content: siteConfig.name },
    { name: "twitter:description", content: siteConfig.description },
  ];
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: fontStyleSheet },
  { rel: "stylesheet", href: stylesheet },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "96x96",
    href: "/favicon-96x96.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicon-16x16.png",
  },
  { rel: "manifest", href: "/manifest.json" },
  { rel: "apple-touch-icon", sizes: "57x57", href: "/apple-icon-57x57.png" },
  { rel: "apple-touch-icon", sizes: "60x60", href: "/apple-icon-60x60.png" },
  { rel: "apple-touch-icon", sizes: "72x72", href: "/apple-icon-72x72.png" },
  { rel: "apple-touch-icon", sizes: "76x76", href: "/apple-icon-76x76.png" },
  {
    rel: "apple-touch-icon",
    sizes: "114x114",
    href: "/apple-icon-114x114.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "120x120",
    href: "/apple-icon-120x120.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "144x144",
    href: "/apple-icon-144x144.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "152x152",
    href: "/apple-icon-152x152.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/apple-icon-180x180.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "192x192",
    href: "/android-icon-192x192.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "96x96",
    href: "/favicon-96x96.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicon-16x16.png",
  },
  { rel: "manifest", href: "/manifest.json" },
];

export function App({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();

  return (
    <html
      lang="en"
      className={cn(theme)}
      style={{ colorScheme: theme?.toString() }}
    >
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, shrink-to-fit=no"
        />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <body style={{ fontFamily: "Pretendard Variable" }}>
        {children}
        <ScrollRestoration />
        <Scripts />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <Root />
    </ThemeProvider>
  );
}

export function Root() {
  const navigation = useNavigation();
  const isLoading = ["loading", "submitting"].includes(navigation.state);

  return (
    <App>
      <div className="relative flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <main className="flex-1 flex">
          {isLoading && (
            <div className="fixed top-0 left-0 right-0 bottom-0 m-auto flex justify-center items-center bg-accent/60 z-[9999]">
              <Icons.spinner className="animate-spin" />
            </div>
          )}
          {<Outlet />}
        </main>
        {/* <SiteFooter /> */}
        <TailwindIndicator />
      </div>
    </App>
  );
}
