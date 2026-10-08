# Source code: aspnetcore/performance/caching/memory/samples/3.x/RPcache/Pages/Index.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}

<h3>Current Time: @DateTime.Now.TimeOfDay.ToString()</h3>
<h3>
    Cached Time: @Model.DateTime_Now
</h3>
```
