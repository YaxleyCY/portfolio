// Absolute origin of the deployed site, used for canonical URLs, Open Graph
// tags, and the sitemap. The GitHub Actions workflow sets SITE_URL from the
// repository owner; PATH_PREFIX is appended by the `url` filter.
export default {
  url: (process.env.SITE_URL || "https://yaxleycy.github.io").replace(/\/$/, ""),
};
