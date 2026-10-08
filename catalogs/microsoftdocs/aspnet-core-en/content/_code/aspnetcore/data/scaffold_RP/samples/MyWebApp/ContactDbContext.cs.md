# Source code: aspnetcore/data/scaffold_RP/samples/MyWebApp/ContactDbContext.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;

public class ContactDbContext(DbContextOptions<ContactDbContext> options) : DbContext(options)
{
    public DbSet<MyWebApp.Contact> Contact { get; set; } = default!;
}

```
