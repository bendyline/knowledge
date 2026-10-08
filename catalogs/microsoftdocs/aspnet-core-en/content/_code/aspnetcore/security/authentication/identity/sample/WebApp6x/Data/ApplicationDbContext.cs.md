# Source code: aspnetcore/security/authentication/identity/sample/WebApp6x/Data/ApplicationDbContext.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace WebApp1.Data;
public class ApplicationDbContext : IdentityDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
}

```
