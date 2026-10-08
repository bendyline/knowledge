# Source code: samples/core/Saving/Disconnected/EntityBase.cs

Complete source file; linked examples may select a region or line range.

```
using System.ComponentModel.DataAnnotations.Schema;

namespace EFSaving.Disconnected;

public abstract class EntityBase
{
    [NotMapped]
    public bool IsNew { get; set; }

    [NotMapped]
    public bool IsDeleted { get; set; }

    [NotMapped]
    public bool IsChanged { get; set; }
}
```
