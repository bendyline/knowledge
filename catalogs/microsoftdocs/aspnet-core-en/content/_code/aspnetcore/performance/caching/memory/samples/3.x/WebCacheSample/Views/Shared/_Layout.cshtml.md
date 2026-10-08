# Source code: aspnetcore/performance/caching/memory/samples/3.x/WebCacheSample/Views/Shared/_Layout.cshtml

Complete source file; linked examples may select a region or line range.

```
<!DOCTYPE html>
<html>
<body>
    <div>
        <h2>Scenarios</h2>
        <ul>
            <li><a asp-area="" asp-controller="Home" asp-action="CacheGet">Basic cache operations</a></li>
            <li><a asp-area="" asp-controller="Home" asp-action="GetCallbackEntry">Cache entry with eviction callback</a></li>
            <li><a asp-area="" asp-controller="Home" asp-action="GetDependentEntries">Dependent cache entries</a></li>
        </ul>
    </div>
    @RenderBody()
</body>
</html>
```
