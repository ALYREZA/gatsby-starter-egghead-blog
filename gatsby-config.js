const config = require('./config/website')
const pathPrefix = config.pathPrefix === '/'
  ? ''
  : config.pathPrefix

require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})

module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    siteUrl: config.siteUrl + pathPrefix,
    title: config.siteTitle,
    twitterHandle: config.twitterHandle,
    description: config.siteDescription,
    keywords: ['Alyreza Mahmoudy Blogger Programmer'],
    canonicalUrl: config.siteUrl,
    image: config.siteLogo,
    author: {
      name: config.author,
      minibio: `
        <strong>A13Y</strong> is the abbreviation of Alyreza Mahmoudy or number of words between A till Y.
      `
    },
    organization: {
      name: config.organization,
      url: config.siteUrl,
      logo: config.siteLogo
    },
    social: {
      twitter: config.twitterHandle,
      fbAppID: ''
    }
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/blog`,
        name: 'blog'
      }
    }, {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/images`,
        name: 'images'
      }
    }, {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/images`,
        name: 'banner'
      }
    }, {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-relative-images`,
          `gatsby-remark-normalize-paths`, {
            resolve: `gatsby-remark-images`,
            options: {}
          }
        ]
      }
    }, {
      resolve: `gatsby-mdx`,
      options: {
        extensions: [
          '.mdx', '.md', '.markdown'
        ],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              backgroundColor: '#fafafa',
              maxWidth: 1035,
              sizeByPixelDensity: true
            }
          }
        ]
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-emotion',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet', {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'standalone',
        icons: [
          {
            src: '/favicons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          }, {
            src: '/favicons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }, {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-74906216-1`
      }
    }, {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({
              query: {
                site,
                allMdx
              }
            }) => {
              return allMdx
                .edges
                .map(edge => {
                  return Object.assign({}, edge.node.frontmatter, {
                    description: edge.node.excerpt,
                    date: edge.node.fields.date,
                    url: site.siteMetadata.siteUrl + "/" + edge.node.fields.slug,
                    guid: site.siteMetadata.siteUrl + "/" + edge.node.fields.slug
                  })
                })
            },
            query: `
              {
                allMdx(
                  limit: 1000,
                  filter: { frontmatter: { published: { ne: false } } }
                  sort: { order: DESC, fields: [frontmatter___date] }
                ) {
                  edges {
                    node {
                      excerpt(pruneLength: 250)
                      fields { 
                        slug
                        date
                      }
                      frontmatter {
                        title
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Blog RSS Feed'
          }
        ]
      }
    }, {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/lib/typography`
      }
    },
    'gatsby-plugin-offline'
  ]
}
