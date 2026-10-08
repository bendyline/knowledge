# Source code: aspnetcore/security/data-protection/configuration/samples/9.x/DataProtectionConfigurationSample/Snippets/SampleDbContext.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.DataProtection.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DataProtectionConfigurationSample.Snippets;

public class SampleDbContext : DbContext, IDataProtectionKeyContext
{
    public SampleDbContext(DbContextOptions<SampleDbContext> dbContextOptions)
        : base(dbContextOptions) { }

    // <snippet_DataProtectionKeys>
    public DbSet<DataProtectionKey> DataProtectionKeys { get; set; } = null!;
    // </snippet_DataProtectionKeys>
}

```
