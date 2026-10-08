# Source code: aspnetcore/fundamentals/http-requests/samples/6.x/HttpRequestsSample/Pages/Refit.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model HttpRequestsSample.Pages.RefitModel

@{
	ViewData["Title"] = "Refit";
}

<h1>Refit</h1>

@await Component.InvokeAsync("GitHubBranches", new { gitHubBranches = Model.GitHubBranches })

```
