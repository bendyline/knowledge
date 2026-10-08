# Source code: aspnetcore/security/authentication/identity/sample/src/ASPNET-IdentityDemo-PrimaryKeysConfig/Models/ApplicationRole.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webapptemplate.Models
{
    public class ApplicationRole : IdentityRole<Guid>
    {
    }
}
```
