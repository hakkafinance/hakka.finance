if (process.env.TEST) {
  require('dotenv').config({
    path: '.env.development'
  })
} else {
  require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`
  })
}

module.exports = {
  flags: {
    DEV_SSR: true
  },
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
      resolve: 'gatsby-plugin-apollo',
      options: {
        uri: 'https://graphigo.prd.galaxy.eco/query'
      }
    },
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
    },
    {
      resolve: 'gatsby-plugin-tawk.to',
      options: {
        tawkId: process.env.TAWK_ID,
        tawkKey: process.env.TAWK_KEY
      }
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-5RNGTLZ',
        includeInDevelopment: false,
        enableWebVitalsTracking: true,
        routeChangeEventName: 'routeChangeEvent'
      }
    }
  ]
}
