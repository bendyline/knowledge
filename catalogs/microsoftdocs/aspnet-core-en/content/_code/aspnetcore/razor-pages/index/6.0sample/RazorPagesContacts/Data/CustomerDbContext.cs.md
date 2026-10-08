# Source code: aspnetcore/razor-pages/index/6.0sample/RazorPagesContacts/Data/CustomerDbContext.cs

Complete source file; linked examples may select a region or line range.

```
#region snippet
using Microsoft.EntityFrameworkCore;

namespace RazorPagesContacts.Data
{
    public class CustomerDbContext : DbContext
    {
        public CustomerDbContext (DbContextOptions<CustomerDbContext> options)
            : base(options)
        {
        }

        public DbSet<RazorPagesContacts.Models.Customer> Customer => Set<RazorPagesContacts.Models.Customer>();
    }
}
#endregion

```
