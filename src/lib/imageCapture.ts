/**
 * Convert all <img> elements inside the target to inline data URLs
 * BEFORE html2canvas cloning, then restore them after capture.
 *
 * This bypasses html2canvas issues with Next.js Image proxy URLs,
 * WebP format handling, and object-fit rendering.
 */
interface ImageBackup {
  img: HTMLImageElement;
  originalSrc: string;
  originalSrcset: string;
}

function convertImagesToDataUrl(element: HTMLElement): ImageBackup[] {
  const backups: ImageBackup[] = [];
  const imgs = element.querySelectorAll('img');

  imgs.forEach((img) => {
    if (!img.complete || img.naturalWidth === 0) return;

    backups.push({
      img,
      originalSrc: img.getAttribute('src') || '',
      originalSrcset: img.getAttribute('srcset') || '',
    });

    try {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        img.setAttribute('src', dataUrl);
        img.removeAttribute('srcset');
        img.removeAttribute('sizes');
      }
    } catch {
      // CORS-tainted canvas — keep original
    }
  });

  return backups;
}

function restoreImages(backups: ImageBackup[]) {
  backups.forEach(({ img, originalSrc, originalSrcset }) => {
    img.setAttribute('src', originalSrc);
    if (originalSrcset) {
      img.setAttribute('srcset', originalSrcset);
    }
  });
}

export async function captureResultCard(
  element: HTMLElement,
  errorMessage?: string,
): Promise<void> {
  // Pre-convert images to data URLs on the ORIGINAL DOM
  // so html2canvas receives plain PNG data URLs (no proxy, no WebP, no CORS).
  const imageBackups = convertImagesToDataUrl(element);

  try {
    const html2canvas = (await import('html2canvas')).default;
    const canvas = await html2canvas(element, {
      useCORS: true,
      scale: 2,
      backgroundColor: '#ffffff',
      logging: false,
      imageTimeout: 15000,
      onclone: (_clonedDoc: Document, clonedEl: HTMLElement) => {
        // Fix object-fit (unsupported by html2canvas) on cloned images
        const imgs = clonedEl.querySelectorAll('img');
        imgs.forEach((img) => {
          img.style.objectFit = 'contain';
          // Next.js Image sets color:transparent inline — reset it
          img.style.color = 'initial';
        });

        // Freeze all framer-motion animations in cloned DOM
        clonedEl.querySelectorAll('*').forEach((el) => {
          const htmlEl = el as HTMLElement;
          if (htmlEl.style.transform) {
            htmlEl.style.transform = 'none';
          }
        });
      },
    });

    const link = document.createElement('a');
    link.download = 'crossfit-mbti-result.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Image capture failed:', error);
    throw new Error(errorMessage ?? 'Image save failed. Please use a screenshot instead!');
  } finally {
    // Always restore original image sources
    restoreImages(imageBackups);
  }
}
