# Source code: aspnetcore/fundamentals/http-requests/samples/6.x/HttpRequestsSample/GitHub/GitHubBranch.cs

Complete source file; linked examples may select a region or line range.

```
using System.Text.Json.Serialization;

namespace HttpRequestsSample.GitHub;

public record GitHubBranch(
    [property: JsonPropertyName("name")] string Name);

```
