# Source code: docs/csharp/tutorials/snippets/WebAPIClient/Repository.cs

Complete source file; linked examples may select a region or line range.

```
using System.Text.Json.Serialization;

public record class Repository(
    string Name,
    string Description,
    [property: JsonPropertyName("html_url")] Uri GitHubHomeUrl,
    Uri Homepage,
    int Watchers,
    [property: JsonPropertyName("pushed_at")] DateTime LastPushUtc
    )
{
    public DateTime LastPush => LastPushUtc.ToLocalTime();
}

```
