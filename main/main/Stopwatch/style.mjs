export default`
    .stopwatch>.control>.button{
        position:relative;
        overflow:hidden;
    }
    .stopwatch>.control>.button>.ripple{
        opacity:.8;
        position:absolute;
        left:calc(var(--l) - var(--d) / 2);
        top:calc(var(--t) - var(--d) / 2);
        border-radius:50%;
        animation:ripple 500ms linear;
        background-color:#fff;
        width:var(--d);
        height:var(--d);
        transform:scale(0);
    }
    @keyframes ripple{
        to{
            opacity:0;
            transform:scale(5.656);
        }
    }
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
    .stopwatch>.control>.button:hover{
        background-color:#4f4f4f;
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
