### ContentDisposition DateTimes returns slightly different string

#### Details

String representations of [System.Net.Mime.ContentDisposition](https://learn.microsoft.com/search/?terms=System.Net.Mime.ContentDisposition)'s have been updated, beginning in 4.6, to always represent the hour component of a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) with two digits. This is to comply with RFC822 and [RFC2822](https://www.ietf.org/rfc/rfc2822.txt). This causes [System.Net.Mime.ContentDisposition.ToString](https://learn.microsoft.com/search/?terms=System.Net.Mime.ContentDisposition.ToString) to return a slightly different string in 4.6 in scenarios where one of the disposition's time elements was before 10:00 AM. Note that ContentDispositions are sometimes serialized via converting them to strings, so any [System.Net.Mime.ContentDisposition.ToString](https://learn.microsoft.com/search/?terms=System.Net.Mime.ContentDisposition.ToString) operations, serialization, or GetHashCode calls should be reviewed.

#### Suggestion

Do not expect that string representations of ContentDispositions from different .NET Framework versions will correctly compare to one another. Convert the strings back to ContentDispositions, if possible, before conducting a comparison.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.6 |
| Type | Runtime |

#### Affected APIs

- [System.Net.Mime.ContentDisposition.ToString](https://learn.microsoft.com/search/?terms=System.Net.Mime.ContentDisposition.ToString)
- [System.Net.Mime.ContentDisposition.GetHashCode](https://learn.microsoft.com/search/?terms=System.Net.Mime.ContentDisposition.GetHashCode)
