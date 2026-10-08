# Source code: aspnetcore/fundamentals/app-state/6.0samples/SessionSample/Pages/Index.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}

<div class="text-center">
<p><b>Name:</b> @HttpContext.Session.GetString("_Name");<b>Age:

</b> @HttpContext.Session.GetInt32("_Age").ToString()</p>
</div>
```
