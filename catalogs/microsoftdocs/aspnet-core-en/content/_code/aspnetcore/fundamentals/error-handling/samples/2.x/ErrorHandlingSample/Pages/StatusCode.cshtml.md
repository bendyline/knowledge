# Source code: aspnetcore/fundamentals/error-handling/samples/2.x/ErrorHandlingSample/Pages/StatusCode.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model StatusCodeModel
@{
    ViewData["Title"] = "Status Code @Model.ErrorStatusCode";
}

<h1 class="text-danger">Status Code: @Model.ErrorStatusCode</h1>
<h2 class="text-danger">An error occurred while processing your request.</h2>

@if (Model.ShowRequestId)
{
    <h3>Request ID</h3>
    <p>
        <code>@Model.RequestId</code>
    </p>
}

@if (Model.ShowOriginalURL)
{
    <h3>Original URL</h3>
    <p>
        <code>@Model.OriginalURL</code>
    </p>
}
```
