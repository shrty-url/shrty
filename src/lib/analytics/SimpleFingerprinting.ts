export function getUserFingerprint(): string {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;
  const pixelRatio = window.devicePixelRatio;
  const canvasWidth = Math.round(window.innerWidth * pixelRatio);
  const canvasHeight = Math.round(window.innerHeight * pixelRatio);
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  context.font = '16px Arial';
  context.fillText('**--**--**', 10, 10);
  const imageData = context.getImageData(0, 0, canvasWidth, canvasHeight).data;
  const data = [...imageData, pixelRatio, canvasWidth, canvasHeight];
  const hash = hashString(JSON.stringify(data));
  return hash;
}

function hashString(str: string): string {
  let hash = 0;
  if (str.length == 0) {
    return hash.toString();
  }
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString();
}