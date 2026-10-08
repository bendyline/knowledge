### EventListener truncates strings with embedded nulls

#### Details

[System.Diagnostics.Tracing.EventListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.Tracing.EventListener) truncates strings with embedded nulls. Null characters are not supported by the [System.Diagnostics.Tracing.EventSource](https://learn.microsoft.com/search/?terms=System.Diagnostics.Tracing.EventSource) class. The change only affects apps that use [System.Diagnostics.Tracing.EventListener](https://learn.microsoft.com/search/?terms=System.Diagnostics.Tracing.EventListener) to read [System.Diagnostics.Tracing.EventSource](https://learn.microsoft.com/search/?terms=System.Diagnostics.Tracing.EventSource) data in process and that use null characters as delimiters.

#### Suggestion

[System.Diagnostics.Tracing.EventSource](https://learn.microsoft.com/search/?terms=System.Diagnostics.Tracing.EventSource) data should be updated, if possible, to not use embedded null characters.

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.5.1 |
| Type | Runtime |

#### Affected APIs

- [System.Diagnostics.Tracing.EventListener.%23ctor](https://learn.microsoft.com/search/?terms=System.Diagnostics.Tracing.EventListener.%2523ctor)
- [System.Diagnostics.Tracing.EventListener.EnableEvents(System.Diagnostics.Tracing.EventSource,System.Diagnostics.Tracing.EventLevel)](https://learn.microsoft.com/search/?terms=System.Diagnostics.Tracing.EventListener.EnableEvents(System.Diagnostics.Tracing.EventSource%2CSystem.Diagnostics.Tracing.EventLevel))
- [System.Diagnostics.Tracing.EventListener.EnableEvents(System.Diagnostics.Tracing.EventSource,System.Diagnostics.Tracing.EventLevel,System.Diagnostics.Tracing.EventKeywords)](https://learn.microsoft.com/search/?terms=System.Diagnostics.Tracing.EventListener.EnableEvents(System.Diagnostics.Tracing.EventSource%2CSystem.Diagnostics.Tracing.EventLevel%2CSystem.Diagnostics.Tracing.EventKeywords))
- [System.Diagnostics.Tracing.EventListener.EnableEvents(System.Diagnostics.Tracing.EventSource,System.Diagnostics.Tracing.EventLevel,System.Diagnostics.Tracing.EventKeywords,System.Collections.Generic.IDictionary{System.String,System.String})](https://learn.microsoft.com/search/?terms=System.Diagnostics.Tracing.EventListener.EnableEvents(System.Diagnostics.Tracing.EventSource%2CSystem.Diagnostics.Tracing.EventLevel%2CSystem.Diagnostics.Tracing.EventKeywords%2CSystem.Collections.Generic.IDictionary%7BSystem.String%2CSystem.String%7D))

<!--

#### Affected APIs

- `M:System.Diagnostics.Tracing.EventListener.#ctor`
- `M:System.Diagnostics.Tracing.EventListener.EnableEvents(System.Diagnostics.Tracing.EventSource,System.Diagnostics.Tracing.EventLevel)`
- `M:System.Diagnostics.Tracing.EventListener.EnableEvents(System.Diagnostics.Tracing.EventSource,System.Diagnostics.Tracing.EventLevel,System.Diagnostics.Tracing.EventKeywords)`
- `M:System.Diagnostics.Tracing.EventListener.EnableEvents(System.Diagnostics.Tracing.EventSource,System.Diagnostics.Tracing.EventLevel,System.Diagnostics.Tracing.EventKeywords,System.Collections.Generic.IDictionary{System.String,System.String})`

-->
