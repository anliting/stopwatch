export default`
    .stopwatch{
        text-align:justify;
    }
    .stopwatch>.clock{
        text-align:center;
        font-family:monospace;
        margin:16px 0;
    }
    .stopwatch>.control>.button{
        background-color:#404040;
        font-size:32px;
        height:64px;
        color:white;
        text-shadow:
            0 0 .05em rgba(0,0,0,.4),
            .05em .05em .05em rgba(0,0,0,.2);
        user-select:none;
        text-align:center;
        line-height:64px;
    }
    @media(min-width:320px) and (max-width:639px){
        .stopwatch>.clock{
            font-size:10vw;
        }
        .stopwatch>.control>.button{
            width:100%;
        }
        .stopwatch>.control>.button+.button{
            margin-top:8px;
        }
    }
    @media(min-width:640px){
        .stopwatch>.clock{
            font-size:64px;
        }
        .stopwatch>.control{
            position:relative;
            width:100%;
            height:64px;
        }
        .stopwatch>.control>.button{
            position:absolute;
            width:48%;
        }
        .stopwatch>.control>.button.a{
            left:1%;
        }
        .stopwatch>.control>.button.b{
            right:1%;
        }
    }
`
