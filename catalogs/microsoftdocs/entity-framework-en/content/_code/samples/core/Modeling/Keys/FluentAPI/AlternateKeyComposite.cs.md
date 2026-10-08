# Source code: samples/core/Modeling/Keys/FluentAPI/AlternateKeyComposite.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;

namespace EFModeling.Keys.FluentAPI.AlternateKeyComposite;

internal class MyContext : DbContext
{
    public DbSet<Car> Cars { get; set; }

    #region AlternateKeyComposite
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Car>()
            .HasAlternateKey(c => new { c.State, c.LicensePlate });
    }
    #endregion
}

public class Car
{
    public int CarId { get; set; }
    public string State { get; set; }
    public string LicensePlate { get; set; }
    public string Make { get; set; }
    public string Model { get; set; }
}
```
