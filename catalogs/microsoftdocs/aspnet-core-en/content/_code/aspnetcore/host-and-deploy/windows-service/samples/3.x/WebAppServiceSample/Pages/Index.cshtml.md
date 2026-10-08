# Source code: aspnetcore/host-and-deploy/windows-service/samples/3.x/WebAppServiceSample/Pages/Index.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model IndexModel
@using Microsoft.AspNetCore.Hosting
@inject IWebHostEnvironment Environment
@{
    ViewData["Title"] = "ASP.NET Core Service";
}

<h1>@ViewData["Title"]</h1>

<div class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title">ASP.NET Core Service</h3>
    </div>
    <div class="panel-body">
        <p>Current Environment: @Environment.EnvironmentName</p>
    </div>
</div>

```
