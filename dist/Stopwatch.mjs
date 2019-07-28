/*© An-Li Ting (anliting.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/function doe(n){
    let
        state=0,
        p={
            function:f=>f(n),
            number,
            object,
            string,
        };
    transform([...arguments].slice(1));
    return n
    function number(n){
        state=n;
    }
    function object(o){
        if(o instanceof Array)
            array();
        else if(o instanceof Node)
            n[state?'removeChild':'appendChild'](o);
        else if(('length' in o)||o[Symbol.iterator]){
            o=Array.from(o);
            array();
        }else if(state)
            Object.entries(o).map(([a,b])=>n.setAttribute(a,b));
        else
            Object.assign(n,o);
        function array(){
            o.map(transform);
        }
    }
    function string(s){
        n.appendChild(document.createTextNode(s));
    }
    function transform(t){
        for(let q;q=p[typeof t];t=q(t));
    }
}
let methods={
    html(){
        return doe(document.documentElement,...arguments)
    },
    head(){
        return doe(document.head,...arguments)
    },
    body(){
        return doe(document.body,...arguments)
    },
};
var doe$1 = new Proxy(doe,{
    get:(t,p)=>methods[p]||function(){
        return doe(document.createElement(p),...arguments)
    }
});

function characteristics(){
    return [
        doe$1.h2('Characteristics'),
        doe$1.p('Network is not needed once the webpage is loaded.'),
        doe$1.p(
            doe$1.a(
                {href:'https://www.w3.org/TR/hr-time-2/'},
                'High resolution time',
            ),
            ' of events are taken as arguments. For those who do not know about ',
            doe$1.a(
                {href:'https://www.w3.org/TR/hr-time-2/'},
                'high resolution time',
            ),
            ': It is monotonically increasing and not subject to system clock adjustments or system clock skew. More specifically, it is not subject to',
        ),
        doe$1.ul(
            doe$1.li('putting the tab into background, or'),
            doe$1.li('minimizing the browser.'),
        ),
        doe$1.p('When the clock is not ticking, and usually, when browser is minimized, no computing resources other than memory are consumed. If the clock is ticking, and the browser is freshing the display, it is refreshed at the display refresh rate (typically 60fps).'),
        doe$1.p('Monospace font is used to render the clock if the system is providing it.'),
        doe$1.p('All viewport width larger than 320px are supported.'),
    ]
}

var style = `
    .stopwatch{
        max-width:600px;
        text-align:justify;
    }
    .stopwatch>.clock{
        text-align:center;
        font-family:monospace;
        margin:16px 0;
    }
    .stopwatch>.button{
        height:32px;
    }
    @media(min-width:320px) and (max-width:639px){
        .stopwatch>.clock{
            font-size:10vw;
        }
        .stopwatch>.button{
            width:100%;
        }
        .stopwatch>.button+.button{
            margin-top:8px;
        }
    }
    @media(min-width:640px){
        .stopwatch>.clock{
            font-size:64px;
        }
        .stopwatch>.button{
            width:50%;
        }
    }
`;

function msToString(t){
    let output=paddingZerosTo(t%1000,3);
    t=~~(t/1000);
    output=paddingZerosTo(t%60,2)+'.'+output;
    t=~~(t/60);
    output=paddingZerosTo(t%60,2)+':'+output;
    t=~~(t/60);
    output=paddingZerosTo(t%24,2)+':'+output;
    t=~~(t/24);
    return output
    function paddingZerosTo(m,n){
        m=''+m;
        while(m.length<n)
            m='0'+m;
        return m
    }
}
function Stopwatch(){
    let stopwatch=this;
    this._node={};
    this.ui=doe$1.div(
        {className:'stopwatch'},
        this._node.clock=doe$1.div(
            {className:'clock'},
            msToString(0),
        ),
        this._node.startOrPauseButton=
            doe$1.button('Start (space)',{className:'button',onclick(e){
                stopwatch[stopwatch._isRunning?'_pause':'_start'](
                    e.timeStamp
                );
            }}),
        doe$1.button('Reset (R)',{className:'button',onclick(){
            stopwatch._reset();
        }}),
        characteristics(),
    );
}
Stopwatch.prototype._pause=function(now){
    this._node.startOrPauseButton.textContent='Start (space)';
    cancelAnimationFrame(this._requestId);
    this._isRunning=0;
    this._stopTime=now;
    this._setClock(now);
};
Stopwatch.prototype._reset=function(){
    if(this._isRunning)
        this._pause();
    this._startTime=undefined;
    this._node.clock.textContent=msToString(0);
};
Stopwatch.prototype._setClock=function(now){
    this._node.clock.textContent=
        msToString(~~(now-this._startTime));
};
Stopwatch.prototype._start=function(now){
    this._node.startOrPauseButton.textContent='Pause (space)';
    this._startTime=this._startTime?
        now-(this._stopTime-this._startTime)
    :
        now;
    this._isRunning=1;
    let frame=now=>{
        this._setClock(now);
        this._requestId=requestAnimationFrame(frame);
    };
    this._requestId=requestAnimationFrame(frame);
};
let map={
    ' ':function(e){
        this[this._isRunning?'_pause':'_start'](e.timeStamp);
    },
    r(){
        this._reset();
    },
};
Stopwatch.prototype.onKeyDown=function(e){
    if(!(e.key in map))
        return
    e.preventDefault();
    e.stopPropagation();
    map[e.key].call(this,e);
};
Stopwatch.style=style;

export default Stopwatch;