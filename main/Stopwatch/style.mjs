export default`
    .stopwatch{
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
    .stopwatch>.readme{
        margin-top:24px;
        display:block;
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
`
