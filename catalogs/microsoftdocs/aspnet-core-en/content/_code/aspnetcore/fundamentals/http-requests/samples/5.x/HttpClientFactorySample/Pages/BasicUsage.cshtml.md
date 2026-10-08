# Source code: aspnetcore/fundamentals/http-requests/samples/5.x/HttpClientFactorySample/Pages/BasicUsage.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model BasicUsageModel
@{
    ViewData["Title"] = "Branches for Docs Repo";
}

<h1>@ViewData["Title"]</h1>

@if (Model.GetBranchesError)
{
    <p>Unable to get branches from GitHub. Please try again later.</p>
}
else
{
    <ul>
        @foreach (var branch in Model.Branches)
        {
            <li>@branch.Name</li>
        }
    </ul>
}

```
