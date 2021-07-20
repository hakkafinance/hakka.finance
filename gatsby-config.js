require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  siteMetadata: {
    title: 'Hakka Finance',
    siteUrl: 'https://www.gatsbyjs.com'
  },
  plugins: [
    'gatsby-plugin-root-import',
    'gatsby-plugin-theme-ui',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-polyfill-io',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/logos/favicon.png'
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/'
      },
      __key: 'images'
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Open Sans', 'Open+Sans:wght@400;600;700', 'Droid Serif']
        }
      }
    }
  ]
}
