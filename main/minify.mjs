import{minify}from'terser'
export default async s=>(await minify(s)).code
