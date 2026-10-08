# Source code: aspnetcore/performance/caching/response/samples/2.x/ResponseCacheSample/Pages/Cache2.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model Cache2Model
@{
    ViewData["Title"] = "Cache 2";
}

<h1>@ViewData["Title"]</h1>

<div class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title">Do not cache</h3>
    </div>
    <div class="panel-body">
        <h4><code>Cache2Model</code> attribute:</h4>
        <pre><code>[ResponseCache(
    Duration = 0, 
    Location = ResponseCacheLocation.None, 
    NoStore = true)]</code></pre>
    </div>
</div>

```
