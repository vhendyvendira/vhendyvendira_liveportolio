import { CASE_STUDIES } from './constants';

export const CRITICAL_IMAGES = [
  // Intro / Hero images
  '/favicon.svg',
  
  // Case Study Thumbnails
  ...CASE_STUDIES.map(cs => cs.image),
  
  // About Page Images
  '/about-images/google-singapore-2022.png',
  
  // Presence Page Images
  '/presence-images/iddr-apple-event-2025.png',
  '/presence-images/uix-mentor-binaracademy-2022.png',
  '/presence-images/vhendy-bali-airport-2025.46.36.jpeg',
  '/presence-images/pantaimelasti.jpeg',
  
  // Reel Images
  '/presence-images/vhendy-with-angga-iqbal-jogja.jpg',
  '/presence-images/vhendy-hafidz.png',
  '/presence-images/vhendy-on-kanvas-confrence.png',
  '/presence-images/vhendy-femmy-nabila.jpeg',
  '/presence-images/vhendy-andrew-singapore.jpg',

  // Learning Section Logos
  "/images-company-logo/google-logo.png",
  "/images-company-logo/ibm-logo.png",
  "/images-company-logo/mckinsey-&-company.png",
  "/images-company-logo/anthropic-logo.png",
  "/images-company-logo/rws-group.png"
];

export function preloadImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve();
    img.onerror = () => {
      console.warn(`Failed to load image: ${url}`);
      resolve(); // Still resolve to not block the app indefinitely
    };
  });
}

export function preloadAllAssets(urls: string[], onProgress?: (progress: number) => void): Promise<void> {
  let loadedCount = 0;
  const total = urls.length;
  
  if (total === 0) return Promise.resolve();
  
  return new Promise((resolve) => {
    urls.forEach((url) => {
      preloadImage(url).finally(() => {
        loadedCount++;
        onProgress?.(loadedCount / total);
        if (loadedCount === total) {
          resolve();
        }
      });
    });
  });
}
