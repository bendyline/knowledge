# Source code: samples/core/Modeling/Keys/FluentAPI/AlternateKeySingle.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;

namespace EFModeling.Keys.FluentAPI.AlternateKeySingle;

internal class MyContext : DbContext
{
    public DbSet<Car> Cars { get; set; }

    #region AlternateKeySingle
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Car>()
            .HasAlternateKey(c => c.LicensePlate);
    }
    #endregion
}

public class Car
{
    public int CarId { get; set; }
    public string LicensePlate { get; set; }
    public string Make { get; set; }
    public string Model { get; set; }
}
```
