/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://neet720.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/login', '/forgotpassword'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      }
    ]
  },
};

export default config;
