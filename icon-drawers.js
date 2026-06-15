export async function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Unable to load image: ${url}`));
    image.src = url;
  });
}

export function drawImageCaptionCard(ctx, w, h, textBelow, textColor, image, textSize = 28) {
  ctx.clearRect(0, 0, w, h);

  const sidePad = w * 0.08;
  const topPad = h * 0.06;
  const bottomPad = h * 0.16;

  const imageAreaW = w - sidePad * 2;
  const imageAreaH = h - topPad - bottomPad;

  const scale = Math.min(imageAreaW / image.width, imageAreaH / image.height);
  const drawW = image.width * scale;
  const drawH = image.height * scale;
  const drawX = (w - drawW) / 2;
  const drawY = topPad + (imageAreaH - drawH) / 2;

  ctx.drawImage(image, drawX, drawY, drawW, drawH);

  ctx.fillStyle = textColor;
  ctx.font = `bold ${textSize}px "Courier New", monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(textBelow, w / 2, h - bottomPad / 2);
}

export async function makeImageCaptionTexture(
  THREE,
  textBelow,
  textColor,
  imageUrl,
  width = 512,
  height = 512,
  textSize = 28,
) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const image = await loadImage(imageUrl);
  drawImageCaptionCard(ctx, canvas.width, canvas.height, textBelow, textColor, image, textSize);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

export function drawHeart(THREE, options = {}) {
  const { textSize = 28 } = options;
  return makeImageCaptionTexture(
    THREE,
    '1. MEET THE ONE',
    '#fff0ee',
    'assets/_Heart%20trophy.png',
    512,
    512,
    textSize,
  );
}

export function drawPlane(THREE, options = {}) {
  const { textSize = 28 } = options;
  return makeImageCaptionTexture(
    THREE,
    '2. MOVE TO US',
    '#5aaf5a',
    'assets/_Plane%20trophy.png',
    512,
    512,
    textSize,
  );
}

export function drawHouse(THREE, options = {}) {
  const { textSize = 28 } = options;
  return makeImageCaptionTexture(
    THREE,
    '3. BUY THE HOUSE',
    '#5aaf5a',
    'assets/_House%20trophy.png',
    512,
    512,
    textSize,
  );
}

export function drawBaby(THREE, options = {}) {
  const { textSize = 28 } = options;
  return makeImageCaptionTexture(
    THREE,
    '4. HAVE THE BABY',
    '#f5e07a',
    'assets/_Baby%20trophy.png',
    512,
    512,
    textSize,
  );
}
