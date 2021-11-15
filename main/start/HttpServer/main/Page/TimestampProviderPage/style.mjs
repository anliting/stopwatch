export default`
    .timestampProviderPage{
        height:100%;
        text-align:center;
    }
    .timestampProviderPage{
        line-height:0;
    }
    .timestampProviderPage::after{
        content:'';
        display:inline-block;
        height:100%;
        vertical-align:middle;
    }
    .timestampProviderPage>*{
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
    .timestampProviderPage>*>*{
        height:calc(1px * var(--zoom) * 4 / 24);
        text-align:left;
    }
    .timestampProviderPage>*>.clickable{
        cursor:default;
        user-select:none;
    }
    .timestampProviderPage>*>.clickable:hover{
        background-color:#8f8f8f;
    }
    .timestampProviderPage>*>.clickable:active{
        background-color:#5f5f5f;
    }
    .timestampProviderPage>*>*::after{
        content:'';
        display:inline-block;
        height:100%;
        vertical-align:middle;
        line-height:0;
    }
    .timestampProviderPage>*>*>*{
        display:inline-block;
        vertical-align:middle;
    }
    .timestampProviderPage>*>.b{
        display:table;
        width:100%;
    }
    .timestampProviderPage>*>.b>*{
        display:table-cell;
    }
    .timestampProviderPage>*>.b>.c{
        padding-left:calc(1px / 24 * var(--zoom));
        padding-right:calc(1px * var(--zoom) * .5 / 24);
        font-size:calc(1px * 1.5 / 24 * var(--zoom));
        width:calc(1px * 1.5 / 24 * var(--zoom));
    }
    .timestampProviderPage>*>.b>.a{
        font-size:calc(1px * 1.5 / 24 * var(--zoom));
        text-align:left;
        line-height:1.2;
    }
    .timestampProviderPage>*>.b>.a>*{
        font-size:calc(1px * .8 / 24 * var(--zoom));
        color:#dfdfdf;
    }
    .timestampProviderPage>*>.b>.b{
        padding-right:calc(1px / 24 * var(--zoom));
        text-align:right;
    }
`
