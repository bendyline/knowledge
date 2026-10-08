# Source code: samples/core/Querying/RelatedData/Theme.cs

Complete source file; linked examples may select a region or line range.

```
namespace EFQuerying.RelatedData;

public class Theme
{
    public int Id { get; set; }

    public int ColorSchemeId { get; set; }
    public ColorScheme ColorScheme { get; set; }
}
```
