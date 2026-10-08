# Source code: aspnetcore/fundamentals/error-handling/samples/2.x/ErrorHandlingSample/Pages/Index.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}

    <div>
        <p><a href="/missingpage">Trigger a 404</a>.</p>
        <p><a href="/index?throw=true">Trigger an exception</a>.</p>
    </div>

```
