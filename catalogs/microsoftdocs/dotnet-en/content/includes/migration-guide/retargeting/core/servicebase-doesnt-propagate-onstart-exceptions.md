### ServiceBase doesn't propagate OnStart exceptions

#### Details

In the .NET Framework 4.7 and earlier versions, exceptions thrown on service startup are not propagated to the caller of [System.ServiceProcess.ServiceBase.Run%2A](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.Run%252A).

Starting with applications that target the .NET Framework 4.7.1, the runtime propagates exceptions to [System.ServiceProcess.ServiceBase.Run%2A](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.Run%252A) for services that fail to start.

#### Suggestion

On service start, if there is an exception, that exception will be propagated. This should help diagnose cases where services fail to start.

If this behavior is undesirable, you can opt out of it by adding the following `AppContextSwitchOverrides` element to the `runtime` section of your application configuration file:

```xml
<AppContextSwitchOverrides value="Switch.System.ServiceProcess.DontThrowExceptionsOnStart=true" />
```

If your application targets an earlier version than 4.7.1 but you want to have this behavior, add the following `AppContextSwitchOverrides` element to the `runtime` section of your application configuration file:

```xml
<AppContextSwitchOverrides value="Switch.System.ServiceProcess.DontThrowExceptionsOnStart=false" />
```

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.7.1 |
| Type | Retargeting |

#### Affected APIs

- [System.ServiceProcess.ServiceBase.Run(System.ServiceProcess.ServiceBase)](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.Run(System.ServiceProcess.ServiceBase))
- [System.ServiceProcess.ServiceBase.Run(System.ServiceProcess.ServiceBase\[\])](https://learn.microsoft.com/search/?terms=System.ServiceProcess.ServiceBase.Run(System.ServiceProcess.ServiceBase%5B%5D))
