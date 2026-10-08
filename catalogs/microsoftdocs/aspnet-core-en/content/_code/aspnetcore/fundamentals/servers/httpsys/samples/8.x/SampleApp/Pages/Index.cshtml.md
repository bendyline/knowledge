# Source code: aspnetcore/fundamentals/servers/httpsys/samples/8.x/SampleApp/Pages/Index.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@using HttpSysSample.Pages;
@model IndexModel
@{
    ViewData["Title"] = "HTTP.sys Demo";
}

<h1>@ViewData["Title"]</h1>
<hr>
<p>Hello World from the HTTP.sys Demo!</p>
<h2>Server Addresses</h2>
<p>@Model.ServerAddresses</p>

```
