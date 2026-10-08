# Source code: aspnetcore/performance/caching/memory/samples/6.x/CachingMemorySample/Pages/Index.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model IndexModel
@{
	ViewData["Title"] = "Home page";
}

<!-- <snippet_CacheCurrentDateTime> -->
<ul>
	<li>Current Time: @Model.CurrentDateTime</li>
	<li>Cached Time: @Model.CacheCurrentDateTime</li>
</ul>
<!-- </snippet_CacheCurrentDateTime> -->

```
