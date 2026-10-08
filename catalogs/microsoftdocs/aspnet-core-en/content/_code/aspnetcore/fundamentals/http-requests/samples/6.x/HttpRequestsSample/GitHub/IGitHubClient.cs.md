# Source code: aspnetcore/fundamentals/http-requests/samples/6.x/HttpRequestsSample/GitHub/IGitHubClient.cs

Complete source file; linked examples may select a region or line range.

```
using Refit;

namespace HttpRequestsSample.GitHub;

// <snippet_Interface>
public interface IGitHubClient
{
    [Get("/repos/dotnet/AspNetCore.Docs/branches")]
    Task<IEnumerable<GitHubBranch>> GetAspNetCoreDocsBranchesAsync();
}
// </snippet_Interface>

```
