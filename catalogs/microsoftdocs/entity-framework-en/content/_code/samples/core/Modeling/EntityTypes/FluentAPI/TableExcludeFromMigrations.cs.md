# Source code: samples/core/Modeling/EntityTypes/FluentAPI/TableExcludeFromMigrations.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;

namespace EFModeling.EntityTypes.FluentAPI.TableExcludeFromMigrations;

internal class MyContext : DbContext
{
    public DbSet<IdentityUser> Users { get; set; }

    #region TableExcludeFromMigrations
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<IdentityUser>()
            .ToTable("AspNetUsers", t => t.ExcludeFromMigrations());
    }
    #endregion
}

public class IdentityUser
{
    public string Id { get; set; }
    public string UserName { get; set; }
}
```
