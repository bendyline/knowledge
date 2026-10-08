# Source code: aspnetcore/fundamentals/http-requests/samples/6.x/HttpRequestsSample/Pages/Consumption/NamedClient.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model HttpRequestsSample.Pages.NamedClientModel

@{
	ViewData["Title"] = "Consumption - Named";
}

<h1>Consumption patterns - Named client</h1>

@await Component.InvokeAsync("GitHubBranches", new { gitHubBranches = Model.GitHubBranches })

```
