export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "src/css": "css",
    "src/js": "js",
    "src/assets": "assets",
  });
  eleventyConfig.addWatchTarget("src/css");
  eleventyConfig.addWatchTarget("src/js");

  eleventyConfig.addFilter("findBySlug", (items, slug) =>
    (items || []).find((item) => item.slug === slug)
  );
  eleventyConfig.addFilter("where", (items, key, value) =>
    (items || []).filter((item) => item[key] === value)
  );
  eleventyConfig.addFilter("initials", (name) =>
    String(name || "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("")
  );

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    // Set PATH_PREFIX when the site is served from a sub-path,
    // e.g. https://yaxleycy.github.io/portfolio/ -> PATH_PREFIX=/portfolio/
    pathPrefix: process.env.PATH_PREFIX || "/",
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
