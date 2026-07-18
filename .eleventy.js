const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {

  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/assets");

  // Watch for CSS changes during development  
  eleventyConfig.addWatchTarget("src/assets/css");
  
  // Disable JavaScript dependency tracking for cleaner rebuilds
  eleventyConfig.setWatchJavaScriptDependencies(false);
  
  // Reduce throttle time for faster rebuilds
  eleventyConfig.setWatchThrottleWaitTime(100);

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("MMMM dd, yyyy");
  });

  eleventyConfig.addCollection("nav", function(collectionApi) {
    return collectionApi
      .getAll()
      .filter(page => page.data.nav === true)
      .sort((a, b) => a.data.navOrder - b.data.navOrder);
  });

  // Explicitly define lifestory collection to ensure it updates in watch mode
  eleventyConfig.addCollection("lifestory", function(collectionApi) {
    return collectionApi
      .getFilteredByTag("lifestory")
      .sort((a, b) => a.date - b.date);
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
    htmlTemplateEngine: "njk",
    // Disable incremental builds - forces full rebuild on file changes
    // This ensures collections update when new posts are added
    incremental: false,
    // Watch options for better hot reload
    watchOptions: {
      ignored: ['_site/**']
    }
  };
};