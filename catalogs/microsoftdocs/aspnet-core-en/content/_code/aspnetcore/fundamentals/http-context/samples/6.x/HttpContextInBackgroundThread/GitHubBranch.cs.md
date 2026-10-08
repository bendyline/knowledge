# Source code: aspnetcore/fundamentals/http-context/samples/6.x/HttpContextInBackgroundThread/GitHubBranch.cs

Complete source file; linked examples may select a region or line range.

```
using System.Text.Json.Serialization;

namespace HttpContextInBackgroundThread;

public record GitHubBranch([property: JsonPropertyName("name")] string Name);

```
