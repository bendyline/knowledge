### OperationContext.Current may return null when called in a using clause

#### Details

[System.ServiceModel.OperationContext.Current](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationContext.Current) may return `null` and a [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException) may result if all of the following conditions are true:

- You retrieve the value of the [System.ServiceModel.OperationContext.Current](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationContext.Current) property in a method that returns a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) or [System.Threading.Tasks.Task%601](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%25601).
- You instantiate the [System.ServiceModel.OperationContextScope](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationContextScope) object in a `using` clause.
- You retrieve the value of the [System.ServiceModel.OperationContext.Current](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationContext.Current) property within the `using statement`. For example:

```csharp
using (new OperationContextScope(OperationContext.Current))
{
    // OperationContext.Current is null.
    OperationContext context = OperationContext.Current;

    // ...
}
```

#### Suggestion

To address this issue, you can do the following:

- Modify your code as follows to instantiate a new non- `null` [System.ServiceModel.OperationContext.Current%2A](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationContext.Current%252A) object:

    ```csharp
    OperationContext ocx = OperationContext.Current;
    using (new OperationContextScope(OperationContext.Current))
    {
        OperationContext.Current = new OperationContext(ocx.Channel);

        // ...
    }
    ```

- Install the latest update to the .NET Framework 4.6.2, or upgrade to a later version of the .NET Framework. This disables the flow of the [System.Threading.ExecutionContext](https://learn.microsoft.com/search/?terms=System.Threading.ExecutionContext) in [System.ServiceModel.OperationContext.Current](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationContext.Current) and restores the behavior of WCF applications in the .NET Framework 4.6.1 and earlier versions. This behavior is configurable; it is equivalent to adding the following app setting to your configuration file:

    ```xml
    <appSettings>
      <add key="Switch.System.ServiceModel.DisableOperationContextAsyncFlow" value="true" />
    </appSettings>
    ```

    If this change is undesirable and your application depends on execution context flowing between operation contexts, you can enable its flow as follows:

    ```xml
    <appSettings>
      <add key="Switch.System.ServiceModel.DisableOperationContextAsyncFlow" value="false" />
    </appSettings>
    ```

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.6.2 |
| Type | Retargeting |

#### Affected APIs

- [System.ServiceModel.OperationContext.Current](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationContext.Current)
