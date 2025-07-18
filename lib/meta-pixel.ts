// Meta Pixel conversion tracking events
declare global {
  interface Window {
    fbq: any;
  }
}

export const trackPageView = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
};

export const trackViewContent = (contentName: string, contentCategory?: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: contentName,
      content_category: contentCategory || 'product',
    });
  }
};

export const trackAddToCart = (value: number, currency: string = 'ZAR', contentName?: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'AddToCart', {
      value: value,
      currency: currency,
      content_name: contentName || 'Lumeye Under Eye Serum',
    });
  }
};

export const trackInitiateCheckout = (value: number, currency: string = 'ZAR') => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      value: value,
      currency: currency,
    });
  }
};

export const trackPurchase = (value: number, currency: string = 'ZAR', orderId?: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Purchase', {
      value: value,
      currency: currency,
      content_name: 'Lumeye Under Eye Serum',
      content_category: 'product',
      order_id: orderId,
    });
  }
};

export const trackLead = (value?: number, currency: string = 'ZAR') => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      value: value,
      currency: currency,
      content_name: 'Lumeye Under Eye Serum',
    });
  }
};

export const trackContact = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Contact', {
      content_name: 'Contact Form',
      content_category: 'contact',
    });
  }
};

export const trackCompleteRegistration = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'CompleteRegistration', {
      content_name: 'Newsletter Signup',
      content_category: 'newsletter',
    });
  }
}; 