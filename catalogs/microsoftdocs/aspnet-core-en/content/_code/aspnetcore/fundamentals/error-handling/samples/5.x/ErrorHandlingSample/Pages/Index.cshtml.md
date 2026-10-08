# Source code: aspnetcore/fundamentals/error-handling/samples/5.x/ErrorHandlingSample/Pages/Index.cshtml

Complete source file; linked examples may select a region or line range.

```
@page "{code:int?}"
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}

<div class="text-left">
    <p>
        <a href="/NoSuchPage">
            Request an endpoint that doesn't exist. Trigger a 404
        </a>.
    </p>
    <p><a href="/index/1">Trigger an exceptionn</a>.</p>
    <p><a href="/index/2">Return a 500 error.</a>.</p>
</div>

```
