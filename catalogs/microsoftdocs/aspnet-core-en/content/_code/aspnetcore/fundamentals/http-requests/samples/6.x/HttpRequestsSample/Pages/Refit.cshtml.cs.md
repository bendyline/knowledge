# Source code: aspnetcore/fundamentals/http-requests/samples/6.x/HttpRequestsSample/Pages/Refit.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using HttpRequestsSample.GitHub;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Refit;

namespace HttpRequestsSample.Pages;

// <snippet_Class>
public class RefitModel : PageModel
{
    private readonly IGitHubClient _gitHubClient;

    public RefitModel(IGitHubClient gitHubClient) =>
        _gitHubClient = gitHubClient;

    public IEnumerable<GitHubBranch>? GitHubBranches { get; set; }

    public async Task OnGet()
    {
        try
        {
            GitHubBranches = await _gitHubClient.GetAspNetCoreDocsBranchesAsync();
        }
        catch (ApiException)
        {
            // ...
        }
    }
}
// </snippet_Class>

```
