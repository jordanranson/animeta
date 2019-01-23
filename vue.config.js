module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/projects/animeta/'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/variables.sass"`
      }
    }
  }
}
