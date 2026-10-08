# Source code: aspnetcore/security/authentication/add-user-data/samples/2.x/SampleApp/Areas/Identity/Data/WebApp1User.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Identity;
using System;

namespace WebApp1.Areas.Identity.Data
{
    public class WebApp1User : IdentityUser
    {
        [PersonalData]
        public string Name { get; set; }
        [PersonalData]
        public DateTime DOB { get; set; }
    }
}
```
