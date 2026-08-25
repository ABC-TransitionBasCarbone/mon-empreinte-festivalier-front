//@ts-check
/* eslint-disable @typescript-eslint/no-var-requires */
const withMDX = require('@next/mdx')({
  extension: /\.mdx$/,
})
const path = require('path')

const redirects = require('./config/redirects.js')

const remoteImagesPatterns = require('./config/remoteImagesPatterns.js')


/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  images: {
    // @ts-expect-error remotePatterns is not typed
    remotePatterns: remoteImagesPatterns,
  },
  async rewrites() {
    return [
      { 
        source: '/region/:region/territoire/:territoire',
        destination: '/',
      },
      { 
        source: '/region/:region',
        destination: '/'
      },
      { 
        source: '/region/:region/territoire/:territoire/:path*',
        destination: '/:path*'
      },
      { 
        source: '/region/:region/:path*',
        destination: '/:path*'
      }
    ]
  },
  async redirects() {
    return redirects
  },
  webpack: (config, { dev, isServer }) => {
    if (config.cache) {
      if (dev) {
        // Development configuration
        config.cache = {
          type: 'filesystem',
        }
      } else {
        // Use cache in production
        config.cache = Object.freeze({
          type: 'memory',
        })
        config.cache.maxMemoryGenerations = 0
      }
    }

    // Add a rule for YAML files
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: 'yaml-loader',
    })

    config.resolve.alias['@publicodes/tools/migration'] = path.resolve(
      __dirname,
      'node_modules/@publicodes/tools/dist/migration/index.mjs'
    )

    // Enable source maps
    if (!dev && !isServer) {
      config.devtool = 'source-map'
    }

    // We do not want to split the chunks too much
    config.optimization.splitChunks.minSize = 300000

    return config
  },
  productionBrowserSourceMaps: true,
  outputFileTracingExcludes: {
    '*': ['.next/cache/webpack', '.git/**/*', 'cypress/**/*'],
    '/blog': ['public/NGC_Kit.diffusion.zip'],
    '/nouveautes': ['public/images/blog', 'public/NGC_Kit.diffusion.zip'],
    '/actions/plus': ['public/images/blog', 'public/NGC_Kit.diffusion.zip'],
    '/sitemap.xml': ['public/images/blog', 'public/NGC_Kit.diffusion.zip'],
  },
  experimental: {
    webpackBuildWorker: true,
  },
  outputFileTracingRoot: path.join(__dirname, '../'),
  turbopack: {
    resolveAlias: {
      '@publicodes/tools/migration': './node_modules/@publicodes/tools/dist/migration/index.mjs',
    },
    rules: {
      '*.yaml': {
        loaders: ['yaml-loader'],
        as: '*.js'
      },
      '*.yml': {
        loaders: ['yaml-loader'],
        as: '*.js'
      }
    }
  }
}

module.exports =
  process.env.NODE_ENV !== 'development'
    ? withMDX(nextConfig)
    : nextConfig
