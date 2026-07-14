const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {

  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/assets");

  // Watch for CSS changes during development
  eleventyConfig.addWatchTarget("src/assets/css");

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("MMMM dd, yyyy");
  });

  eleventyConfig.addCollection("nav", function(collectionApi) {
    return collectionApi
      .getAll()
      .filter(page => page.data.nav === true)
      .sort((a, b) => a.data.navOrder - b.data.navOrder);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    // Set default template language
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};