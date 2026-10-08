# Source code: samples/core/Modeling/IndexesAndConstraints/FluentAPI/CheckConstraint.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;

namespace EFModeling.IndexesAndConstraints.FluentAPI.CheckConstraint;

internal class MyContext : DbContext
{
    public DbSet<Product> Products { get; set; }

    #region CheckConstraint
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .Entity<Product>()
            .ToTable(b => b.HasCheckConstraint("CK_Prices", "[Price] > [DiscountedPrice]"));
    }
    #endregion
}

public class Product
{
    public int Id { get; set; }
    public decimal Price { get; set; }
    public decimal DiscountedPrice { get; set; }
}

```
