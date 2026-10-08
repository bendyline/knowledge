# Source code: docs/core/resilience/snippets/http-resilience/Comment.cs

Complete source file; linked examples may select a region or line range.

```
namespace Http.Resilience.Example;

public record class Comment(
    int PostId, int Id, string Name, string Email, string Body);

```
