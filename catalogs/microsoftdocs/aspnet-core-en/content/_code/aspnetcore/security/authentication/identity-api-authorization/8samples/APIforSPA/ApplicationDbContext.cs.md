# Source code: aspnetcore/security/authentication/identity-api-authorization/8samples/APIforSPA/ApplicationDbContext.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : IdentityDbContext<IdentityUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :
        base(options)
    { }
}

```
