/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://neet720.com",

  // Generates sitemap.xml + sitemap-0.xml
  generateRobotsTxt: true,

  // Frequency Google should recrawl pages
  changefreq: "daily",
  priority: 0.8,

  // Max URLs per sitemap file
  sitemapSize: 5000,

  // ❌ Exclude private/secure pages from being indexed
  exclude: [
    "/login",
    "/forgotpassword",
    "/admin/*",
    "/api/*",
    "/private/*",
  ],

  // Robots.txt settings
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/private/",
          "/login",
          "/forgotpassword",
        ],
      },
    ],
    additionalSitemaps: [
      "https://neet720.com/sitemap.xml",
    ],
  },
};

export default config;
