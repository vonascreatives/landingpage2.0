'use client';

import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import localFont from 'next/font/local';
import {
  Syne,
  Aladin,
  Big_Shoulders_Display,
  Marcellus,
} from 'next/font/google';

import '../app/globals.scss';

const gellery = localFont({
  src: [
    {
      path: '../../public/assets/fonts/gallerymodern-webfont.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/gallerymodern-webfont.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/gallerymodern-webfont.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--tp-ff-gallery',
});

const aladin = Aladin({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--tp-ff-aladin',
});
const syne_body = Syne({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--tp-ff-body',
});
const syne_heading = Syne({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--tp-ff-heading',
});
const syne_p = Syne({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--tp-ff-p',
});
const syne = Syne({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--tp-ff-syne',
});
const big_shoulders = Big_Shoulders_Display({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--tp-ff-shoulders',
});
const marcellus = Marcellus({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--tp-ff-marcellus',
});

const fontClassNames = `${gellery.variable} ${aladin.variable} ${syne_body.variable} ${syne_heading.variable} ${syne_p.variable} ${syne.variable} ${big_shoulders.variable} ${marcellus.variable}`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme="light">
      <div id="body" className={fontClassNames}>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}
