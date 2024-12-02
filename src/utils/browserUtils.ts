/**
 * Check if the browser supports a specific feature
 */
export const checkFeatureSupport = (feature: string): boolean => {
  switch (feature) {
    case 'webp':
      const elem = document.createElement('canvas');
      if (elem.getContext && elem.getContext('2d')) {
        return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      }
      return false;

    case 'localStorage':
      try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        return true;
      } catch (e) {
        return false;
      }

    case 'indexedDB':
      return !!window.indexedDB;

    default:
      return false;
  }
};

/**
 * Get browser information
 */
export const getBrowserInfo = () => {
  const ua = navigator.userAgent;
  let browserName = "Unknown";
  let browserVersion = "Unknown";

  if (ua.indexOf("Firefox") > -1) {
    browserName = "Firefox";
    browserVersion = ua.match(/Firefox\/([0-9.]+)/)?.[1] || "";
  } else if (ua.indexOf("Chrome") > -1) {
    browserName = "Chrome";
    browserVersion = ua.match(/Chrome\/([0-9.]+)/)?.[1] || "";
  } else if (ua.indexOf("Safari") > -1) {
    browserName = "Safari";
    browserVersion = ua.match(/Version\/([0-9.]+)/)?.[1] || "";
  } else if (ua.indexOf("Edge") > -1) {
    browserName = "Edge";
    browserVersion = ua.match(/Edge\/([0-9.]+)/)?.[1] || "";
  }

  return {
    name: browserName,
    version: browserVersion,
    isMobile: /Mobile|Android|iPhone/i.test(ua),
    isIOS: /iPhone|iPad|iPod/i.test(ua),
    isAndroid: /Android/i.test(ua),
  };
};

/**
 * Safe localStorage wrapper with fallback
 */
export const storage = {
  get: (key: string, defaultValue: any = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.warn('localStorage is not available:', e);
      return defaultValue;
    }
  },
  set: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn('localStorage is not available:', e);
      return false;
    }
  },
  remove: (key: string) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.warn('localStorage is not available:', e);
      return false;
    }
  },
};

/**
 * Safe requestAnimationFrame with fallback
 */
export const raf = (callback: FrameRequestCallback): number => {
  return window.requestAnimationFrame?.(callback) || 
         window.setTimeout(callback, 1000 / 60);
};

/**
 * Cancel animation frame safely
 */
export const cancelRaf = (id: number): void => {
  (window.cancelAnimationFrame || window.clearTimeout)(id);
};