# Source code: aspnetcore/mvc/controllers/areas/60samples/RPareas/Data/ApplicationDbContext.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace RPareas.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
    }
}
```
