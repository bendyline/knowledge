# Source code: samples/core/Modeling/Keys/DataAnnotations/KeySingle.cs

Complete source file; linked examples may select a region or line range.

```
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace EFModeling.Keys.DataAnnotations.KeySingle;

internal class MyContext : DbContext
{
    public DbSet<Car> Cars { get; set; }
}

#region KeySingle
public class Car
{
    [Key]
    public string LicensePlate { get; set; }

    public string Make { get; set; }
    public string Model { get; set; }
}
#endregion
```
