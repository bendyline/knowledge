# Source code: aspnetcore/performance/caching/memory/samples/3.x/WebCacheSample/Views/Home/Cache.cshtml

Complete source file; linked examples may select a region or line range.

```
@model DateTime?

<div>
    <h2>Actions</h2>
    <ul>
        <li><a asp-controller="Home" asp-action="CacheTryGetValueSet">TryGetValue and Set</a></li>
        <li><a asp-controller="Home" asp-action="CacheGet">Get</a></li>
        <li><a asp-controller="Home" asp-action="CacheGetOrCreate">GetOrCreate</a></li>
        <li><a asp-controller="Home" asp-action="CacheGetOrCreateAsynchronous">CacheGetOrCreateAsynchronous</a></li>
        <li><a asp-controller="Home" asp-action="CacheRemove">Remove</a></li>
        <li><a asp-controller="Home" asp-action="CacheGetOrCreateAbs">CacheGetOrCreateAbs</a></li>
        <li><a asp-controller="Home" asp-action="CacheGetOrCreateAbsSliding">CacheGetOrCreateAbsSliding</a></li>

    </ul>
</div>

<h3>Current Time: @DateTime.Now.TimeOfDay.ToString()</h3>
<h3>Cached Time: @(Model == null ? "No cached entry found" : Model.Value.TimeOfDay.ToString())</h3>

```
