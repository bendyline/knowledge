# Source code: aspnetcore/fundamentals/http-requests/samples/6.x/HttpRequestsSample/Views/Shared/Components/GitHubBranches/Default.cshtml

Complete source file; linked examples may select a region or line range.

```
@using HttpRequestsSample.GitHub

@model IEnumerable<GitHubBranch>

@if (@Model is null)
{
	<div class="alert alert-danger" role="alert">
		Unable to load branches from GitHub. Please try again later.
	</div>
}
else
{
	<p>@Model.Count() GitHub Branches</p>
	<ul class="list-group">
		@foreach (var gitHubBranch in @Model)
		{
			<li class="list-group-item">@gitHubBranch.Name</li>
		}
	</ul>
}

```
