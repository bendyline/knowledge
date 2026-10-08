# Source code: docs/core/extensions/snippets/caching/memory-worker/Photo.cs

Complete source file; linked examples may select a region or line range.

```
namespace CachingExamples.Memory;

public readonly record struct Photo(
    int AlbumId,
    int Id,
    string Title,
    string Url,
    string ThumbnailUrl);

```
