// Skip generating /reflections/ until there is at least one post.
export default {
  eleventyComputed: {
    permalink: (data) =>
      data.reflections?.posts?.length ? "/reflections/index.html" : false,
  },
};
