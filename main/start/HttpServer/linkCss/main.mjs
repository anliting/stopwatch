import fs from'fs'
import postcss from'postcss'
import postcssImport from'postcss-import'
export default async p=>
    (await postcss().use(postcssImport()).process(
        ''+await fs.promises.readFile(p),
        {from:p}
    )).css

