export default`
    .stopwatch>.clock{
        text-align:center;
        font-family:monospace;
        margin:calc(16px * var(--zoom)) 0;
    }
    .stopwatch>.control>.button{
        background-color:#404040;
        font-size:calc(32px * var(--zoom));
        height:calc(64px * var(--zoom));
        color:white;
        text-shadow:
            0 0 .05em rgba(0,0,0,.4),
            .05em .05em .05em rgba(0,0,0,.2);
        user-select:none;
        text-align:center;
        line-height:calc(64px * var(--zoom));
    }
    .stopwatch.a>.clock{
        font-size:calc(64px * var(--zoom));
    }
    .stopwatch.a>.control{
        position:relative;
        margin:0 auto;
        width:calc(600px * var(--zoom));
        height:calc(64px * var(--zoom));
    }
    .stopwatch.a>.control>.button{
        position:absolute;
        width:48%;
    }
    .stopwatch.a>.control>.button.a{
        left:1%;
    }
    .stopwatch.a>.control>.button.b{
        right:1%;
    }
    .stopwatch.b>.clock{
        font-size:calc(40px * var(--zoom));
    }
    .stopwatch.b>.control>.button{
        width:calc(302px * var(--zoom));
        margin:0 auto;
    }
    .stopwatch.b>.control>.button+.button{
        margin-top:calc(8px * var(--zoom));
    }
`
