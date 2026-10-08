# Source code: aspnetcore/fundamentals/http-requests/samples/6.x/HttpRequestsSample/ViewComponents/GitHubBranchesViewComponent.cs

Complete source file; linked examples may select a region or line range.

```
using HttpRequestsSample.GitHub;
using Microsoft.AspNetCore.Mvc;

namespace HttpRequestsSample.ViewComponents;

public class GitHubBranchesViewComponent : ViewComponent
{
    public IViewComponentResult Invoke(IEnumerable<GitHubBranch>? gitHubBranches) =>
        View(gitHubBranches);
}

```
