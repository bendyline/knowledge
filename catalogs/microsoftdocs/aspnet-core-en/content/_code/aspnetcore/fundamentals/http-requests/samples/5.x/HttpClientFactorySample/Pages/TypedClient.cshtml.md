# Source code: aspnetcore/fundamentals/http-requests/samples/5.x/HttpClientFactorySample/Pages/TypedClient.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model TypedClientModel
@{
    ViewData["Title"] = "Latest GitHub Issues for ASP.NET Docs";
}

<h1>@ViewData["Title"]</h1>

@if (Model.GetIssuesError)
{
    <p>Unable to get issues from GitHub. Please try again later.</p>
}
else if (Model.HasIssue)
{
    @foreach (var issue in Model.LatestIssues)
    {
        <h2>Title: @issue.Title</h2>
        <p><a href="@issue.Url">View Issue</a></p>
    }
}
else
{
    <p>No issues found.</p>
}

```
