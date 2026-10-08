# Source code: aspnetcore/fundamentals/http-requests/samples/6.x/HttpRequestsSample/Pages/Consumption/TypedClient.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model HttpRequestsSample.Pages.TypedClientModel

@{
	ViewData["Title"] = "Consumption - Typed";
}

<h1>Consumption patterns - Typed client</h1>

@await Component.InvokeAsync("GitHubBranches", new { gitHubBranches = Model.GitHubBranches })

```
