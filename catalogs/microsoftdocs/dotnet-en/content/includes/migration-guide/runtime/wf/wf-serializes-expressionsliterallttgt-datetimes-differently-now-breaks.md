### WF serializes Expressions.Literal&lt;T&gt; DateTimes differently now (breaks custom XAML parsers)

#### Details

The associated [System.Windows.Markup.ValueSerializer](https://learn.microsoft.com/search/?terms=System.Windows.Markup.ValueSerializer) object will convert a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) or [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) object whose Second and [System.DateTime.Millisecond](https://learn.microsoft.com/search/?terms=System.DateTime.Millisecond) components are non-zero and (for a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value) whose [System.DateTime.Kind](https://learn.microsoft.com/search/?terms=System.DateTime.Kind) property is not Unspecified to property element syntax instead of a string. This change allows [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) and [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) values to be round-tripped. Custom XAML parsers that assume that input XAML is in the attribute syntax will not function correctly.

#### Suggestion

This change allows [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) and [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) values to be round-tripped. Custom XAML parsers that assume that input XAML is in the attribute syntax will not function correctly.

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.5 |
| Type | Runtime |

#### Affected APIs

Not detectable via API analysis.

<!--

#### Affected APIs

Not detectable via API analysis.

-->
