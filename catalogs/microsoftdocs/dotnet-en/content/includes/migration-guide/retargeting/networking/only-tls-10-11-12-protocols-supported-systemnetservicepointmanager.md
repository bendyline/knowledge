### Only Tls 1.0, 1.1 and 1.2 protocols supported in System.Net.ServicePointManager and System.Net.Security.SslStream

#### Details

Starting with .NET Framework 4.6, the [System.Net.ServicePointManager](https://learn.microsoft.com/search/?terms=System.Net.ServicePointManager) and [System.Net.Security.SslStream](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStream) classes are only allowed to use one of the following three protocols: Tls1.0, Tls1.1, or Tls1.2. The SSL3.0 protocol and RC4 cipher are not supported.

#### Suggestion

The recommended mitigation is to upgrade the sever-side app to Tls1.0, Tls1.1, or Tls1.2. If this is not feasible, or if client apps are broken, the [System.AppContext](https://learn.microsoft.com/search/?terms=System.AppContext) class can be used to opt out of this feature in either of two ways:

- By programmatically setting compat switches on the [System.AppContext](https://learn.microsoft.com/search/?terms=System.AppContext), as explained in [.NET Announcements at Build 2015](https://devblogs.microsoft.com/dotnet/net-announcements-at-build-2015/#dotnet46).
- By adding the following line to the `<runtime>` section of the app.config file:

```xml
<AppContextSwitchOverrides value="Switch.System.Net.DontEnableSchUseStrongCrypto=true"/>
```

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.6 |
| Type | Retargeting |

#### Affected APIs

- [System.Net.SecurityProtocolType.Ssl3](https://learn.microsoft.com/search/?terms=System.Net.SecurityProtocolType.Ssl3)
- [System.Security.Authentication.SslProtocols.None](https://learn.microsoft.com/search/?terms=System.Security.Authentication.SslProtocols.None)
- [System.Security.Authentication.SslProtocols.Ssl2](https://learn.microsoft.com/search/?terms=System.Security.Authentication.SslProtocols.Ssl2)
- [System.Security.Authentication.SslProtocols.Ssl3](https://learn.microsoft.com/search/?terms=System.Security.Authentication.SslProtocols.Ssl3)
