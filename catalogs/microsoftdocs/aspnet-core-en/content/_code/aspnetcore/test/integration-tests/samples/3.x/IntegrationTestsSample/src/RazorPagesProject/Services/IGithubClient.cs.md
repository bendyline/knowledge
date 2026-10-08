# Source code: aspnetcore/test/integration-tests/samples/3.x/IntegrationTestsSample/src/RazorPagesProject/Services/IGithubClient.cs

Complete source file; linked examples may select a region or line range.

```
using System.Threading.Tasks;

namespace RazorPagesProject.Services
{
    public interface IGithubClient
  {
    Task<GithubUser> GetUserAsync(string userName);
  }
}

```
