import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML content to prevent XSS attacks
 * @param dirty - Potentially unsafe HTML string
 * @returns Sanitized HTML string safe for rendering
 */
export const sanitizeHtml = (dirty: string): string => {
  if (typeof window === 'undefined') {
    // Server-side: return as-is (will be sanitized on client)
    return dirty;
  }

  // Client-side: sanitize with DOMPurify
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre',
      'table', 'thead', 'tbody', 'tr', 'th', 'td', 'div', 'span',
      'iframe', 'video', 'source'
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'alt', 'title', 'class', 'id', 'style',
      'target', 'rel', 'width', 'height', 'frameborder', 'allowfullscreen',
      'controls', 'autoplay', 'loop', 'muted'
    ],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    KEEP_CONTENT: true,
    RETURN_TRUSTED_TYPE: false
  });
};

/**
 * Sanitizes user input text (removes HTML tags completely)
 * @param input - User input string
 * @returns Plain text without HTML
 */
export const sanitizeUserInput = (input: string): string => {
  if (typeof window === 'undefined') {
    return input;
  }
  
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    KEEP_CONTENT: true
  });
};
