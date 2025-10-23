// Simple helper to generate correct public asset URLs
// Handles base path on deployments like Vercel or others
export const asset = (path) => {
  const p = typeof path === 'string' ? path : '';
  const cleaned = p.replace(/^\/+/, '');
  return `${import.meta.env.BASE_URL}${cleaned}`;
};

