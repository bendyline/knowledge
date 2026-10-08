# Source code: aspnetcore/fundamentals/http-requests/samples/6.x/HttpRequestsSample/Pages/Consumption/Basic.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model HttpRequestsSample.Pages.BasicModel

@{
	ViewData["Title"] = "Consumption - Basic";
}

<h1>Consumption patterns - Basic usage</h1>

@await Component.InvokeAsync("GitHubBranches", new { gitHubBranches = Model.GitHubBranches })

```
