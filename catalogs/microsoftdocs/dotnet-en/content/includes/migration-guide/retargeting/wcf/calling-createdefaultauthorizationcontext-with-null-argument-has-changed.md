### Calling CreateDefaultAuthorizationContext with a null argument has changed

#### Details

The implementation of the [System.IdentityModel.Policy.AuthorizationContext](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.AuthorizationContext) returned by a call to the [System.IdentityModel.Policy.AuthorizationContext.CreateDefaultAuthorizationContext(System.Collections.Generic.IList{System.IdentityModel.Policy.IAuthorizationPolicy})](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.AuthorizationContext.CreateDefaultAuthorizationContext(System.Collections.Generic.IList%7BSystem.IdentityModel.Policy.IAuthorizationPolicy%7D)) with a null authorizationPolicies argument has changed its implementation in the .NET Framework 4.6.

#### Suggestion

In rare cases, WCF apps that use custom authentication may see behavioral differences. In such cases, the previous behavior can be restored in either of two ways:

- Recompile your app to target an earlier version of the .NET Framework than 4.6. For IIS-hosted services, use the `<httpRuntime targetFramework="x.x">` element to target an earlier version of the .NET Framework.
- Add the following line to the `<appSettings>` section of your app.config file:

    ```xml
    <add key="appContext.SetSwitch:Switch.System.IdentityModel.EnableCachedEmptyDefaultAuthorizationContext" value="true" />
    ```

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.6 |
| Type | Retargeting |

#### Affected APIs

- [System.IdentityModel.Policy.AuthorizationContext.CreateDefaultAuthorizationContext(System.Collections.Generic.IList{System.IdentityModel.Policy.IAuthorizationPolicy})](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.AuthorizationContext.CreateDefaultAuthorizationContext(System.Collections.Generic.IList%7BSystem.IdentityModel.Policy.IAuthorizationPolicy%7D))
