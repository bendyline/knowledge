### Consistent authorization metadata across the stack

Authorization metadata can be expressed as [Microsoft.AspNetCore.Authorization.IAuthorizeData](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizeData), an [Microsoft.AspNetCore.Authorization.AuthorizationPolicy](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationPolicy), or an [Microsoft.AspNetCore.Authorization.IAuthorizationRequirementData](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationRequirementData) attribute. MVC filters, SignalR hub methods, and Blazor's `AuthorizeView` and `AuthorizeRouteView` apply all three forms consistently.

<!-- TODO: Update `AuthorizationPolicy.CombineAsync` to <xref:> once the new overload's API docs are published. -->

A new `AuthorizationPolicy.CombineAsync` overload is the shared implementation:

```csharp
public class AuthorizationPolicy
{
    public static Task<AuthorizationPolicy?> CombineAsync(
        IAuthorizationPolicyProvider policyProvider,
        IEnumerable<object> metadata);
}
```

MVC, SignalR, and Blazor use this overload internally. A custom attribute that implements both [Microsoft.AspNetCore.Authorization.IAuthorizeData](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizeData) and [Microsoft.AspNetCore.Authorization.IAuthorizationRequirementData](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationRequirementData) contributes to the decision once. The legacy MVC path with `EnableEndpointRouting = false` is unchanged.
