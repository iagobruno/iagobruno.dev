import { parseStringPromise as parseXML } from 'xml2js';

export default async function getMyTopArtists() {
  try {
    const response = await fetch(
      'https://lfm.xiffy.nl/httpiago/topartists?period=1month'
    );
    const xmlString = await response.text();
    const result = await parseXML(xmlString);

    const list = result?.rss?.channel?.[0]?.item ?? [];
    const top5 = list.slice(0, 5).map((item) => item.title[0]);
    // console.log('top5', top5)

    return top5;
  } catch (error) {
    return [];
  }
}
