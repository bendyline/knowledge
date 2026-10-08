### Deadlock may result when using Reentrant services

#### Details

A deadlock may result in a Reentrant service, which restricts instances of the service to one thread of execution at a time. Services prone to encounter this problem will have the following [System.ServiceModel.ServiceBehaviorAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute) in their code:

```csharp
[ServiceBehavior(ConcurrencyMode = ConcurrencyMode.Reentrant)]
```

#### Suggestion

To address this issue, you can do the following:

- Set the service's concurrency mode to [System.ServiceModel.ConcurrencyMode.Single](https://learn.microsoft.com/search/?terms=System.ServiceModel.ConcurrencyMode.Single) or [System.ServiceModel.ConcurrencyMode.Multiple](https://learn.microsoft.com/search/?terms=System.ServiceModel.ConcurrencyMode.Multiple). For example:

```csharp
[ServiceBehavior(ConcurrencyMode = ConcurrencyMode.Reentrant)]
```

- Install the latest update to the .NET Framework 4.6.2, or upgrade to a later version of the .NET Framework. This disables the flow of the [System.Threading.ExecutionContext](https://learn.microsoft.com/search/?terms=System.Threading.ExecutionContext) in [System.ServiceModel.OperationContext.Current](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationContext.Current). This behavior is configurable; it is equivalent to adding the following app setting to your configuration file:

```xml
<appSettings>
  <add key="Switch.System.ServiceModel.DisableOperationContextAsyncFlow" value="true" />
</appSettings>
```

The value of `Switch.System.ServiceModel.DisableOperationContextAsyncFlow` should never be set to `false` for Reentrant services.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.6.2 |
| Type | Retargeting |

#### Affected APIs

- [System.ServiceModel.ServiceBehaviorAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute)
- [System.ServiceModel.ConcurrencyMode.Reentrant](https://learn.microsoft.com/search/?terms=System.ServiceModel.ConcurrencyMode.Reentrant)
