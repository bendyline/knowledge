# Source code: aspnetcore/security/authentication/social/additional-claims/samples/6.x/ClaimsSample/Data/ApplicationDbContext.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace WebGoogOauth.Data
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
