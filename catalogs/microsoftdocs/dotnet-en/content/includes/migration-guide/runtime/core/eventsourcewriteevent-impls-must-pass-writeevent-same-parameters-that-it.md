### EventSource.WriteEvent impls must pass WriteEvent the same parameters that it received (plus ID)

#### Details

The runtime now enforces the contract that specifies the following: A class derived from [System.Diagnostics.Tracing.EventSource](https://learn.microsoft.com/search/?terms=System.Diagnostics.Tracing.EventSource) that defines an ETW event method must call the base class `EventSource.WriteEvent` method with the event ID followed by the same arguments that the ETW event method was passed.

#### Suggestion

An [System.IndexOutOfRangeException](https://learn.microsoft.com/search/?terms=System.IndexOutOfRangeException) exception is thrown if an [System.Diagnostics.Tracing.EventListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.Tracing.EventListener) reads [System.Diagnostics.Tracing.EventSource](https://learn.microsoft.com/search/?terms=System.Diagnostics.Tracing.EventSource) data in process for an event source that violates this contract.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.5.1 |
| Type | Runtime |

#### Affected APIs

Not detectable via API analysis.

<!--

#### Affected APIs

Not detectable via API analysis.

-->
