# Source code: aspnetcore/security/authentication/scaffold-identity/consoleAddUser/Data/ApplicationDbContext.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace WebApplication1.Data
{
    public class AppDbCntx : IdentityDbContext
    {
        public AppDbCntx(DbContextOptions<AppDbCntx> options)
            : base(options)
        {
        }
    }
}

```
