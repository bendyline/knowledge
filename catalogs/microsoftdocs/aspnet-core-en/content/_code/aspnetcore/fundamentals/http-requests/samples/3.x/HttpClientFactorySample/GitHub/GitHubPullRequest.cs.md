# Source code: aspnetcore/fundamentals/http-requests/samples/3.x/HttpClientFactorySample/GitHub/GitHubPullRequest.cs

Complete source file; linked examples may select a region or line range.

```
using System.Text.Json.Serialization;

namespace HttpClientFactorySample.GitHub
{
    /// <summary>
    /// A partial representation of a pull request object from the GitHub API
    /// </summary>
    public class GitHubPullRequest
    {
        [JsonPropertyName("title")]
        public string Title { get; set; }
    }
}
```
