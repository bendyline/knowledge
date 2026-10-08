# Source code: aspnetcore/security/authorization/policies/samples/6.0/AuthorizationPoliciesSample/Policies/Requirements/MinimumAgeRequirement.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Authorization;

namespace AuthorizationPoliciesSample.Policies.Requirements;

public class MinimumAgeRequirement : IAuthorizationRequirement
{
    public MinimumAgeRequirement(int minimumAge) =>
        MinimumAge = minimumAge;

    public int MinimumAge { get; }
}

```
