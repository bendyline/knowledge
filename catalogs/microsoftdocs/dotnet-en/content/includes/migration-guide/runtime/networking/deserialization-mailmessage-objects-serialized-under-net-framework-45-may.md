### Deserialization of MailMessage objects serialized under the .NET Framework 4.5 may fail

#### Details

Starting with the .NET Framework 4.5, [System.Web.Mail.MailMessage](https://learn.microsoft.com/search/?terms=System.Web.Mail.MailMessage) objects can include non-ASCII characters. In the .NET Framework 4, only ASCII characters are supported. [System.Web.Mail.MailMessage](https://learn.microsoft.com/search/?terms=System.Web.Mail.MailMessage) objects that contain non-ASCII characters and that are serialized under the .NET Framework 4.5 or later cannot be deserialized under the .NET Framework 4.

#### Suggestion

Ensure that your code provides exception handling when deserializing a [System.Web.Mail.MailMessage](https://learn.microsoft.com/search/?terms=System.Web.Mail.MailMessage) object.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.5 |
| Type | Runtime |

#### Affected APIs

- [System.Web.Mail.MailMessage](https://learn.microsoft.com/search/?terms=System.Web.Mail.MailMessage)

<!--

#### Affected APIs

- `T:System.Web.Mail.MailMessage`

-->
