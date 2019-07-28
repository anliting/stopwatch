import doe from'../../lib/doe/main/doe.mjs'
function characteristics(){
    return[
        doe.h2('Characteristics'),
        doe.p('Network is not needed once the webpage is loaded.'),
        doe.p(
            doe.a(
                {href:'https://www.w3.org/TR/hr-time-2/'},
                'High resolution time',
            ),
            ' of events are taken as arguments. For those who do not know about ',
            doe.a(
                {href:'https://www.w3.org/TR/hr-time-2/'},
                'high resolution time',
            ),
            ': It is monotonically increasing and not subject to system clock adjustments or system clock skew. More specifically, it is not subject to',
        ),
        doe.ul(
            doe.li('putting the tab into background, or'),
            doe.li('minimizing the browser.'),
        ),
        doe.p('When the clock is not ticking, and usually, when browser is minimized, no computing resources other than memory are consumed. If the clock is ticking, and the browser is freshing the display, it is refreshed at the display refresh rate (typically 60fps).'),
        doe.p('Monospace font is used to render the clock if the system is providing it.'),
        doe.p('All viewport width larger than 320px are supported.'),
    ]
}
export default characteristics
