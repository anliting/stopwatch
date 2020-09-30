import link from            './link.mjs'
import minify from          './minify.mjs'
export default async path=>minify(await link(path))
