'use client';
import Script from 'next/script';

export default function Scripts() {
  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/gh/philfung/add-to-homescreen@3.4/dist/add-to-homescreen.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          window.AddToHomeScreenInstance = window.AddToHomeScreen({
            appName: 'Iago Bruno',
            appNameDisplay: 'standalone',
            appIconUrl: 'favicon.png',
            assetUrl:
              'https://cdn.jsdelivr.net/gh/philfung/add-to-homescreen@3.4/dist/assets/img/',
            maxModalDisplayCount: -1,
            displayOptions: {
              showMobile: true,
              showDesktop: true,
            },
            allowClose: true,
            showArrow: true,
          });
        }}
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/philfung/add-to-homescreen@3.4/dist/add-to-homescreen.min.css"
      />

      <Script
        src="https://www.unpkg.com/leader-line@1.0.8/leader-line.min.js"
        strategy="afterInteractive"
      />
    </>
  );
}
