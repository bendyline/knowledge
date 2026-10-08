### Application.FilterMessage no longer throws for re-entrant implementations of IMessageFilter.PreFilterMessage

#### Details

Prior to the .NET Framework 4.6.1, calling [System.Windows.Forms.Application.FilterMessage(System.Windows.Forms.Message@)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Application.FilterMessage(System.Windows.Forms.Message%40)) with an [System.Windows.Forms.IMessageFilter.PreFilterMessage(System.Windows.Forms.Message@)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.IMessageFilter.PreFilterMessage(System.Windows.Forms.Message%40)) which called [System.Windows.Forms.Application.AddMessageFilter(System.Windows.Forms.IMessageFilter)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Application.AddMessageFilter(System.Windows.Forms.IMessageFilter)) or [System.Windows.Forms.Application.RemoveMessageFilter(System.Windows.Forms.IMessageFilter)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Application.RemoveMessageFilter(System.Windows.Forms.IMessageFilter)) (while also calling [System.Windows.Forms.Application.DoEvents](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Application.DoEvents)) would cause an [System.IndexOutOfRangeException](https://learn.microsoft.com/search/?terms=System.IndexOutOfRangeException).

Beginning with applications targeting .NET Framework 4.6.1, this exception is no longer thrown, and re-entrant filters as described above may be used.

#### Suggestion

Be aware that [System.Windows.Forms.Application.FilterMessage(System.Windows.Forms.Message@)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Application.FilterMessage(System.Windows.Forms.Message%40)) will no longer throw for the re-entrant [System.Windows.Forms.IMessageFilter.PreFilterMessage(System.Windows.Forms.Message@)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.IMessageFilter.PreFilterMessage(System.Windows.Forms.Message%40)) behavior described above. This only affects applications targeting the .NET Framework 4.6.1.Apps targeting the .NET Framework 4.6.1 can opt out of this change (or apps targeting older Frameworks may opt in) by using the [DontSupportReentrantFilterMessage](../../../../docs/framework/migration-guide/mitigation-custom-imessagefilter-prefiltermessage-implementations.md#mitigation) compatibility switch.

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.6.1 |
| Type | Retargeting |

#### Affected APIs

- [System.Windows.Forms.Application.FilterMessage(System.Windows.Forms.Message@)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Application.FilterMessage(System.Windows.Forms.Message%40))
