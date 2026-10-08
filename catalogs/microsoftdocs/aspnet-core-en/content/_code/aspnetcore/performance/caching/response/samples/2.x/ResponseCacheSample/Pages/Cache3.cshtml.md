# Source code: aspnetcore/performance/caching/response/samples/2.x/ResponseCacheSample/Pages/Cache3.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model Cache1Model
@{
    ViewData["Title"] = "Cache 3";
}

<h1>@ViewData["Title"]</h1>

<div class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title">Cache 10 seconds</h3>
    </div>
    <div class="panel-body">
        <h4><code>Cache3Model</code> attribute:</h4>
        <pre><code>[ResponseCache(
    Duration = 10, 
    Location = ResponseCacheLocation.Any, 
    NoStore = false)]</code></pre>
    </div>
</div>

```
