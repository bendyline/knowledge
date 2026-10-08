# Source code: aspnetcore/fundamentals/http-requests/samples/3.x/HttpClientFactorySample/GitHub/GitHubBranch.cs

Complete source file; linked examples may select a region or line range.

```
using System.Text.Json.Serialization;

namespace HttpClientFactorySample.GitHub
{
    /// <summary>
    /// A partial representation of a branch object from the GitHub API
    /// </summary>
    public class GitHubBranch
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }
    }
}
```
