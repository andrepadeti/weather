module.exports = {
  siteMetadata: {
    title: `Weather App`,
    titleTemplate: "%s · The ultimate weather app!",
    description: `Never be got by surprise anymore!`,
    url: "www.no-url.com",
    author: `André Padeti`,
    twitterUsername: `@PadetiIT`,
    image: `/images/myAvatar.png`,
  },

  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Weather app",
        short_name: "Weather",
        start_url: "/",
        background_color: "#000000",
        theme_color: "#000000",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        icon: "src/images/icon.png", // This path is relative to the root of the site.
        // An optional attribute which provides support for CORS check.
        // If you do not provide a crossOrigin option, it will skip CORS for manifest.
        // Any invalid keyword or empty string defaults to `anonymous`
        crossOrigin: `use-credentials`,
      },
    },
    "gatsby-plugin-offline",
    // {
    //   resolve: `gatsby-plugin-sass`,
    //   options: {
    //     implementation: require("sass"),
    //   },
    // },
    `gatsby-plugin-react-helmet`,
  ],
}
