import htmlMinifier from'html-minifier'
export default s=>htmlMinifier.minify(s,{
    collapseWhitespace:true,
    removeAttributeQuotes:true,
    removeOptionalTags:true,
})
