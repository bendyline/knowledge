# Source code: aspnetcore/fundamentals/localization/sample/5.x/POLocalization/Pages/Index.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@using Microsoft.AspNetCore.Mvc.Localization
@inject IViewLocalizer Localizer
@{
    ViewData["Title"] = "Home";
}

<div class="text-center">
    <h1 class="display-4">Welcome</h1>
    <p>Learn about <a href="https://docs.microsoft.com/aspnet/core">building Web apps with ASP.NET Core</a>.</p>
</div>

<p>@Localizer["Hello world!"]</p>

```
