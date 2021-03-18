export default`
    .stopwatch>.control>.button{
        background-color:#3f3f3f;
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
    .stopwatch.b>.control>.button{
        width:calc(302px * var(--zoom));
        margin:0 auto;
    }
    .stopwatch.b>.control>.button+.button{
        margin-top:calc(8px * var(--zoom));
    }
`
