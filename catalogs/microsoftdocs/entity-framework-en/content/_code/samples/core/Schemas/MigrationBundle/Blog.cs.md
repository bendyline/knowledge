# Source code: samples/core/Schemas/MigrationBundle/Blog.cs

Complete source file; linked examples may select a region or line range.

```
namespace MigrationBundle;

public class Blog
{
    public int Id { get; set; }

    public required string Url { get; set; }

    public bool IsActive { get; set; }
}

```
