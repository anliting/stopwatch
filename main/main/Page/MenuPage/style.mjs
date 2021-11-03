export default`
    .menuPage{
        height:100%;
        text-align:center;
    }
    .menuPage{
        line-height:0;
    }
    .menuPage::after{
        content:'';
        display:inline-block;
        height:100%;
        vertical-align:middle;
    }
    .menuPage>*{
        display:inline-block;
        width:24em;
        height:18em;
        color:white;
        font-size:calc(1px / 24 * var(--zoom));
        text-shadow:
            0 0 .05em rgba(0,0,0,.4),
            .05em .05em .05em rgba(0,0,0,.2);
        text-align:center;
        vertical-align:middle;
    }
    .menuPage>*>*{
        height:calc(1px * var(--zoom) * 4 / 24);
        text-align:left;
        user-select:none;
    }
    .menuPage>*>:hover{
        background-color:#8f8f8f;
    }
    .menuPage>*>:active{
        background-color:#5f5f5f;
    }
    .menuPage>*>*::after{
        content:'';
        display:inline-block;
        height:100%;
        vertical-align:middle;
        line-height:0;
    }
    .menuPage>*>*>*{
        display:inline-block;
        vertical-align:middle;
    }
    .menuPage>*>.a{
        padding:0 1em;
        font-size:calc(1px * 1.5 / 24 * var(--zoom));
    }
    .menuPage>*>.b{
        display:table;
        width:100%;
        cursor:default;
    }
    .menuPage>*>.b>*{
        display:table-cell;
    }
    .menuPage>*>.b>.c{
        padding-left:calc(1px / 24 * var(--zoom));
        padding-right:calc(1px * var(--zoom) * .5 / 24);
        font-size:calc(1px * 1.5 / 24 * var(--zoom));
        width:calc(1px * 1.5 / 24 * var(--zoom));
    }
    .menuPage>*>.b>.a{
        font-size:calc(1px * 1.5 / 24 * var(--zoom));
        text-align:left;
    }
    .menuPage>*>.b>.b{
        padding-right:calc(1px / 24 * var(--zoom));
        text-align:right;
    }
`
