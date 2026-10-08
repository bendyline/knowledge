# Source code: aspnetcore/performance/caching/memory/samples/3.x/WebCacheSample/Views/Home/CheckCancel.cshtml

Complete source file; linked examples may select a region or line range.

```
@{
    ViewData["Title"] = "CheckMsg";
}


<h3>@ViewData["CachedTime"] -- Cached Seconds</h3>
<h3>@ViewData["Message"] -- Eviction Message</h3>
<h3>@DateTime.Now.Second.ToString() -- Current Seconds</h3>
```
