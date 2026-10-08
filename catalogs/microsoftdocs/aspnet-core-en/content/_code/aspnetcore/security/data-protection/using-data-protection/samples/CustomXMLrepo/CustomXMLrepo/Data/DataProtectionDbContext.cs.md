# Source code: aspnetcore/security/data-protection/using-data-protection/samples/CustomXMLrepo/CustomXMLrepo/Data/DataProtectionDbContext.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore;

namespace CustomXMLrepo.Data
{
    #region snippet
    public class DataProtectionDbContext : DbContext
    {
        public DataProtectionDbContext(DbContextOptions<DataProtectionDbContext> options)
            : base(options)
        {
        }
        public DbSet<XmlKey> XmlKeys { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<XmlKey>().Property(x => x.Xml).HasColumnType("TEXT");
        }
    }
    #endregion
}

```
