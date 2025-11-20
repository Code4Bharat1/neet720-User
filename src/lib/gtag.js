export const GA_ID = "G-FWW584RNVM"; // your GA ID

const safeGtag = (...args) => {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;
  window.gtag(...args);
};

export const pageview = (url) => {
  safeGtag("event", "page_view", {
    page_path: url,
  });
};

export const trackEvent = ({ action, category, label, value }) => {
  safeGtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
