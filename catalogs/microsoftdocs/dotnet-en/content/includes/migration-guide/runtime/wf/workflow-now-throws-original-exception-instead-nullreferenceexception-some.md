### Workflow now throws original exception instead of NullReferenceException in some cases

#### Details

In the .NET Framework 4.6.2 and earlier versions, when the Execute method of a workflow activity throws an exception with a `null` value for the [System.Exception.Message](https://learn.microsoft.com/search/?terms=System.Exception.Message) property, the System.Activities Workflow runtime throws a [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException), masking the original exception.In the .NET Framework 4.7, the previously masked exception is thrown.

#### Suggestion

If your code relies on handling the [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException), change it to catch the exceptions that could be thrown from your custom activities.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.7 |
| Type | Runtime |

#### Affected APIs

- [System.Activities.CodeActivity.Execute(System.Activities.CodeActivityContext)](https://learn.microsoft.com/search/?terms=System.Activities.CodeActivity.Execute(System.Activities.CodeActivityContext))
- [System.Activities.AsyncCodeActivity.BeginExecute(System.Activities.AsyncCodeActivityContext,System.AsyncCallback,System.Object)](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivity.BeginExecute(System.Activities.AsyncCodeActivityContext%2CSystem.AsyncCallback%2CSystem.Object))
- [System.Activities.AsyncCodeActivity%601.BeginExecute(System.Activities.AsyncCodeActivityContext,System.AsyncCallback,System.Object)](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivity%25601.BeginExecute(System.Activities.AsyncCodeActivityContext%2CSystem.AsyncCallback%2CSystem.Object))
- [System.Activities.WorkflowInvoker.Invoke](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowInvoker.Invoke)

<!--

#### Affected APIs

- `M:System.Activities.CodeActivity.Execute(System.Activities.CodeActivityContext)`
- `M:System.Activities.AsyncCodeActivity.BeginExecute(System.Activities.AsyncCodeActivityContext,System.AsyncCallback,System.Object)`
- ``M:System.Activities.AsyncCodeActivity`1.BeginExecute(System.Activities.AsyncCodeActivityContext,System.AsyncCallback,System.Object)``
- `M:System.Activities.WorkflowInvoker.Invoke`

-->
