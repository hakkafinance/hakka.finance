module.exports = {
  siteMetadata: {
    title: 'Hakka Finance',
    siteUrl: 'https://hakka.coin98.app/'
  },
  plugins: [
    'gatsby-plugin-remove-fingerprints',
    'gatsby-plugin-root-import',
    'gatsby-plugin-theme-ui',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/logos/hakkaTitleLogo.svg'
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
          families: ['Open Sans', 'Droid Serif']
        }
      }
    }
  ]
}
