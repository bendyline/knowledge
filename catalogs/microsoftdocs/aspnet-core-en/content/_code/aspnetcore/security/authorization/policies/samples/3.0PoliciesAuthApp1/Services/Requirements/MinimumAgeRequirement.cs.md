# Source code: aspnetcore/security/authorization/policies/samples/3.0PoliciesAuthApp1/Services/Requirements/MinimumAgeRequirement.cs

Complete source file; linked examples may select a region or line range.

```
namespace PoliciesAuthApp1.Services.Requirements
{
    #region snippet_MinimumAgeRequirementClass
    using Microsoft.AspNetCore.Authorization;

    public class MinimumAgeRequirement : IAuthorizationRequirement
    {
        public int MinimumAge { get; }

        public MinimumAgeRequirement(int minimumAge)
        {
            MinimumAge = minimumAge;
        }
    }
    #endregion
}

```
