# Source code: samples/core/Miscellaneous/Multitenancy/SingleDbSingleTable/Pages/_Host.cshtml

Complete source file; linked examples may select a region or line range.

```
@page "/"
@namespace SingleDbSingleTable.Pages
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
@{
    Layout = "_Layout";
}

<component type="typeof(App)" render-mode="ServerPrerendered" />

```
