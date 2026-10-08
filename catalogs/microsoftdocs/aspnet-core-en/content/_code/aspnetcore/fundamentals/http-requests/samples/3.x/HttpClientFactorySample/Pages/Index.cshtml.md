# Source code: aspnetcore/fundamentals/http-requests/samples/3.x/HttpClientFactorySample/Pages/Index.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model IndexModel
@{
    ViewData["Title"] = "HttpClient Factory Sample";
}

<h1>@ViewData["Title"]</h1>

<p><a asp-page="BasicUsage">Basic usage of HttpClientFactory directly.</a></p>
<p><a asp-page="NamedClient">Use a named client.</a></p>
<p><a asp-page="TypedClient">Use a typed client.</a></p>
<p><a asp-page="UnreliableEndpointConsumer">Use a Polly WaitAndRetry handler.</a></p>

```
