export default`
    .settingsPage{
        height:100%;
        text-align:center;
    }
    .settingsPage{
        line-height:0;
    }
    .settingsPage::after{
        content:'';
        display:inline-block;
        height:100%;
        vertical-align:middle;
    }
    .settingsPage>*{
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
    .settingsPage>*>*{
        height:calc(1px * var(--zoom) * 4 / 24);
        text-align:left;
        user-select:none;
    }
    .settingsPage>*>:hover{
        background-color:#8f8f8f;
    }
    .settingsPage>*>:active{
        background-color:#5f5f5f;
    }
    .settingsPage>*>*::after{
        content:'';
        display:inline-block;
        height:100%;
        vertical-align:middle;
        line-height:0;
    }
    .settingsPage>*>*>*{
        display:inline-block;
        vertical-align:middle;
    }
    .settingsPage>*>.a{
        padding:0 1em;
        font-size:calc(1px * 1.5 / 24 * var(--zoom));
    }
    .settingsPage>*>.b{
        display:table;
        width:100%;
        cursor:default;
    }
    .settingsPage>*>.b>*{
        display:table-cell;
    }
    .settingsPage>*>.b>.c{
        padding-left:calc(1px / 24 * var(--zoom));
        padding-right:calc(1px * var(--zoom) * .5 / 24);
        font-size:calc(1px * 1.5 / 24 * var(--zoom));
        width:calc(1px * 1.5 / 24 * var(--zoom));
    }
    .settingsPage>*>.b>.a{
        font-size:calc(1px * 1.5 / 24 * var(--zoom));
        text-align:left;
    }
    .settingsPage>*>.b>.b{
        padding-right:calc(1px / 24 * var(--zoom));
        text-align:right;
    }
`
