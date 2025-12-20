interface Device {
  name: string;
  link: string;
  position?: [top: number, left: number];
  displayOnImgMap: boolean;
  displayOnDevicesList: boolean;
}

export const list: Device[] = [
  {
    name: 'Notebook: Acer Aspire 315 i3, 8GB RAM',
    link: 'https://mercadolivre.com/sec/2NmHwSk',
    position: [75, 19],
    displayOnImgMap: true,
    displayOnDevicesList: true,
  },
  {
    name: 'Monitor 1: SuperFrame de 24”',
    link: 'https://www.terabyteshop.com.br/produto/20042/monitor-gamer-superframe-vision-238-pol-full-hd-ips-g-syncfreesync-1ms-144hz-hdmidp-sfv2409',
    position: [35, 30.5],
    displayOnImgMap: true,
    displayOnDevicesList: true,
  },
  {
    name: 'Monitor 2: LG de 24”',
    link: 'https://mercadolivre.com/sec/2eeR4iq',
    position: [35, 74],
    displayOnImgMap: true,
    displayOnDevicesList: true,
  },
  {
    name: 'Teclado: Redragon switch brown',
    link: 'https://mercadolivre.com/sec/19yLfQL',
    position: [90.5, 49.9],
    displayOnImgMap: true,
    displayOnDevicesList: true,
  },
  {
    name: 'Mouse: Hrebos pro-gaming',
    link: 'https://mercadolivre.com/sec/1qaoEDJ',
    position: [88, 79],
    displayOnImgMap: true,
    displayOnDevicesList: true,
  },
  {
    name: 'Microfone: Fifine Ampligame A6t',
    link: 'https://mercadolivre.com/sec/2ZCmvub',
    position: [64, 83.4],
    displayOnImgMap: true,
    displayOnDevicesList: true,
  },
  {
    name: 'Suporte articulado para dois monitores',
    link: 'https://mercadolivre.com/sec/2BqcVik',
    position: [68, 48],
    displayOnImgMap: true,
    displayOnDevicesList: true,
  },
  {
    name: 'Áudio: Headset QCY H3 Lite Anc',
    link: 'https://mercadolivre.com/sec/2z4iw7z',
    displayOnImgMap: false,
    displayOnDevicesList: true,
  },
  {
    name: 'Webcam: iPhone 11 conectado via Camo Studio',
    link: '',
    displayOnImgMap: false,
    displayOnDevicesList: true,
  },
];
