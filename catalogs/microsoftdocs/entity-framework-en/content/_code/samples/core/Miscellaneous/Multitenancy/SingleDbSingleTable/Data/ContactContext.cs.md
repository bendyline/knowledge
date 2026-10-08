# Source code: samples/core/Miscellaneous/Multitenancy/SingleDbSingleTable/Data/ContactContext.cs

Complete source file; linked examples may select a region or line range.

```
using Common;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace SingleDbSingleTable.Data
{
    public class ContactContext : DbContext
    {
        private readonly string _tenant = string.Empty;

        public ContactContext(
            DbContextOptions<ContactContext> opts,
            ITenantService service)
            : base(opts) => _tenant = service.Tenant;

        public DbSet<MultitenantContact> Contacts { get; set; } = null!;

        public async Task CheckAndSeedAsync()
        {
            if (await Database.EnsureCreatedAsync())
            {
                foreach (var contact in Contact.GeneratedContacts)
                {
                    var tenant = contact.IsUnicorn ? "TenantA" : "TenantB";
                    Contacts.Add(new MultitenantContact(contact, tenant));
                }

                await SaveChangesAsync();
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
            => modelBuilder.Entity<MultitenantContact>()
                .HasQueryFilter(mt => mt.Tenant == _tenant);
    }
}

```
