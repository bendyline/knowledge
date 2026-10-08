# Source code: aspnetcore/security/authentication/customize-identity-model/samples/2.1/RazorPagesSampleApp/Data/ApplicationRole.cs

Complete source file; linked examples may select a region or line range.

```
namespace RazorPagesSampleApp.Data
{
    #region snippet_ApplicationRole
    using System;
    using Microsoft.AspNetCore.Identity;

    public class ApplicationRole : IdentityRole<Guid>
    {
        public string Description { get; set; }
    }
    #endregion
}

```
