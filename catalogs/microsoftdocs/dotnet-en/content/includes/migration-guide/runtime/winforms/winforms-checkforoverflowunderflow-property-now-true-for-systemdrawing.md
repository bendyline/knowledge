### WinForm's CheckForOverflowUnderflow property is now true for System.Drawing

#### Details

The CheckForOverflowUnderflow property for the System.Drawing.dll assembly is set to true.

#### Suggestion

Previously when overflows occurred, the result would be silently truncated. Now an [System.OverflowException](https://learn.microsoft.com/search/?terms=System.OverflowException) exception is thrown.

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
