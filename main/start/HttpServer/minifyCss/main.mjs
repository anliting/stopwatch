import CleanCss from'clean-css'
export default s=>new CleanCss({}).minify(s).styles
