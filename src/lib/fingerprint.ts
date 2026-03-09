export function generateFingerprint(): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('QuickPDF', 2, 2);
  }

  const canvasData = canvas.toDataURL();

  const fingerprint = {
    canvas: canvasData,
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screenResolution: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };

  const fingerprintString = JSON.stringify(fingerprint);
  return hashString(fingerprintString);
}

function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

let cachedFingerprint: string | null = null;

export function getUserIdentifier(): string {
  if (!cachedFingerprint) {
    cachedFingerprint = localStorage.getItem('user_fingerprint');

    if (!cachedFingerprint) {
      cachedFingerprint = generateFingerprint();
      localStorage.setItem('user_fingerprint', cachedFingerprint);
    }
  }

  return cachedFingerprint;
}
