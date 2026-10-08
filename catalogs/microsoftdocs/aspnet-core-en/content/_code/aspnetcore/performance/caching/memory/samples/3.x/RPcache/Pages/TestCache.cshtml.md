# Source code: aspnetcore/performance/caching/memory/samples/3.x/RPcache/Pages/TestCache.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model RPcache.Pages.TestCacheModel
@{
    ViewData["Title"] = "TestCache";
}

<h3>Current Time: @DateTime.Now.TimeOfDay.ToString()</h3>
<h3>
    Cached Time: @Model.DateTime_Now <br />
    Cache size: @Model.cache_size
</h3>

<form method="post">
   
    <div class="form-group">
        <input type="submit" value="Delete" />
    </div>
</form>
```
