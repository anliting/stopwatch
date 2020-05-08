require('fs').writeFileSync(
    'cjs-compat.mjs',
    "import('../stopwatch/main/app.mjs')\n"
)
require('esm')(module)('./cjs-compat.mjs')
