### Certificate EKU OID validation

#### Details

Starting with .NET Framework 4.6, the [System.Net.Security.SslStream](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStream) or [System.Net.ServicePointManager](https://learn.microsoft.com/search/?terms=System.Net.ServicePointManager) classes perform enhanced key use (EKU) object identifier (OID) validation. An enhanced key usage (EKU) extension is a collection of object identifiers (OIDs) that indicate the applications that use the key. EKU OID validation uses remote certificate callbacks to ensure that the remote certificate has the correct OIDs for the intended purpose.

#### Suggestion

If this change is undesirable, you can disable certificate EKU OID validation by adding the following switch to the [\<AppContextSwitchOverrides>](../../../../docs/framework/configure-apps/file-schema/runtime/appcontextswitchoverrides-element.md) in the [\`](../../../../docs/framework/configure-apps/file-schema/runtime/runtime-element.md) of your app configuration file:

```xml
<runtime>
  <AppContextSwitchOverrides value="Switch.System.Net.DontCheckCertificateEKUs=true" />
</runtime>
```

> **Important:**
> This setting is provided for backward compatibility only. Its use is otherwise not recommended.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.6 |
| Type | Retargeting |

#### Affected APIs

- [System.Net.Security.SslStream](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStream)
- [System.Net.ServicePointManager](https://learn.microsoft.com/search/?terms=System.Net.ServicePointManager)
- [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient)
- [System.Net.Mail.SmtpClient](https://learn.microsoft.com/search/?terms=System.Net.Mail.SmtpClient)
- [System.Net.HttpWebRequest](https://learn.microsoft.com/search/?terms=System.Net.HttpWebRequest)
- [System.Net.FtpWebRequest](https://learn.microsoft.com/search/?terms=System.Net.FtpWebRequest)
