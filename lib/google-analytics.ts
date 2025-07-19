// Google Analytics e-commerce tracking events
declare global {
  interface Window {
    gtag: any;
  }
}

export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-G2YY6DJHV8', {
      page_path: url,
    });
  }
};

export const trackViewItem = (item: {
  item_id: string;
  item_name: string;
  price: number;
  currency: string;
  quantity?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      currency: item.currency,
      value: item.price,
      items: [{
        item_id: item.item_id,
        item_name: item.item_name,
        price: item.price,
        quantity: item.quantity || 1,
      }],
    });
  }
};

export const trackAddToCart = (item: {
  item_id: string;
  item_name: string;
  price: number;
  currency: string;
  quantity: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: item.currency,
      value: item.price * item.quantity,
      items: [{
        item_id: item.item_id,
        item_name: item.item_name,
        price: item.price,
        quantity: item.quantity,
      }],
    });
  }
};

export const trackBeginCheckout = (items: Array<{
  item_id: string;
  item_name: string;
  price: number;
  quantity: number;
}>, currency: string = 'ZAR') => {
  if (typeof window !== 'undefined' && window.gtag) {
    const value = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    window.gtag('event', 'begin_checkout', {
      currency: currency,
      value: value,
      items: items,
    });
  }
};

export const trackPurchase = (transaction: {
  transaction_id: string;
  value: number;
  currency: string;
  items: Array<{
    item_id: string;
    item_name: string;
    price: number;
    quantity: number;
  }>;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transaction.transaction_id,
      value: transaction.value,
      currency: transaction.currency,
      items: transaction.items,
    });
  }
};

export const trackContact = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', {
      method: 'contact_form',
    });
  }
};

export const trackNewsletterSignup = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'sign_up', {
      method: 'newsletter',
    });
  }
};

export const trackCustomEvent = (eventName: string, parameters: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
}; 