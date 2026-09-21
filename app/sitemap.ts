import type { MetadataRoute } from 'next';
import { programs, trainers } from '../lib/data';
import { siteConfig } from '../lib/site-config';

const staticRoutes = ['/', '/about', '/programs', '/classes', '/schedule', '/trainers', '/membership', '/gallery', '/personal-training', '/contact', '/book-free-trial', '/privacy-policy', '/terms-and-conditions'];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...staticRoutes,
    ...programs.map(program => `/programs/${program.id}`),
    ...trainers.map(trainer => `/trainers/${trainer.id}`),
  ];
  return routes.map(url => ({ url: `${siteConfig.website}${url}`, lastModified: new Date() }));
}
