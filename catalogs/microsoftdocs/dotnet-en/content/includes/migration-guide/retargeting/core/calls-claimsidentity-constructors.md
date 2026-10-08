### Calls to ClaimsIdentity constructors

#### Details

Starting with the .NET Framework 4.6.2, there is a change in how [System.Security.Claims.ClaimsIdentity](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsIdentity) constructors with an [System.Security.Principal.IIdentity](https://learn.microsoft.com/search/?terms=System.Security.Principal.IIdentity) parameter set the [System.Security.Claims.ClaimsIdentity.Actor](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsIdentity.Actor) property. If the [System.Security.Principal.IIdentity](https://learn.microsoft.com/search/?terms=System.Security.Principal.IIdentity) argument is a [System.Security.Claims.ClaimsIdentity](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsIdentity) object, and the [System.Security.Claims.ClaimsIdentity.Actor](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsIdentity.Actor) property of that [System.Security.Claims.ClaimsIdentity](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsIdentity) object is not `null`, the [System.Security.Claims.ClaimsIdentity.Actor](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsIdentity.Actor) property is attached by using the [System.Security.Claims.ClaimsIdentity.Clone](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsIdentity.Clone) method. In the Framework 4.6.1 and earlier versions, the [System.Security.Claims.ClaimsIdentity.Actor](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsIdentity.Actor) property is attached as an existing reference.Because of this change, starting with the .NET Framework 4.6.2, the [System.Security.Claims.ClaimsIdentity.Actor](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsIdentity.Actor) property of the new [System.Security.Claims.ClaimsIdentity](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsIdentity) object is not equal to the [System.Security.Claims.ClaimsIdentity.Actor](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsIdentity.Actor) property of the constructor's [System.Security.Principal.IIdentity](https://learn.microsoft.com/search/?terms=System.Security.Principal.IIdentity) argument. In the .NET Framework 4.6.1 and earlier versions, it is equal.

#### Suggestion

If this behavior is undesirable, you can restore the previous behavior by setting the `Switch.System.Security.ClaimsIdentity.SetActorAsReferenceWhenCopyingClaimsIdentity` switch in your application configuration file to `true`. This requires that you add the following to the `<runtime>` section of your web.config file:

```xml
<configuration>
  <runtime>
    <AppContextSwitchOverrides value="Switch.System.Security.ClaimsIdentity.SetActorAsReferenceWhenCopyingClaimsIdentity=true" />
  </runtime>
</configuration>
```

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.6.2 |
| Type | Retargeting |

#### Affected APIs

- [System.Security.Claims.ClaimsIdentity.%23ctor(System.Security.Principal.IIdentity)](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsIdentity.%2523ctor(System.Security.Principal.IIdentity))
- [System.Security.Claims.ClaimsIdentity.%23ctor(System.Security.Principal.IIdentity,System.Collections.Generic.IEnumerable{System.Security.Claims.Claim})](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsIdentity.%2523ctor(System.Security.Principal.IIdentity%2CSystem.Collections.Generic.IEnumerable%7BSystem.Security.Claims.Claim%7D))
- [System.Security.Claims.ClaimsIdentity.%23ctor(System.Security.Principal.IIdentity,System.Collections.Generic.IEnumerable{System.Security.Claims.Claim},System.String,System.String,System.String)](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsIdentity.%2523ctor(System.Security.Principal.IIdentity%2CSystem.Collections.Generic.IEnumerable%7BSystem.Security.Claims.Claim%7D%2CSystem.String%2CSystem.String%2CSystem.String))
