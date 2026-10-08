### SslStream supports TLS Alerts

#### Details

After a failed TLS handshake, an [System.IO.IOException](https://learn.microsoft.com/search/?terms=System.IO.IOException) with an inner [System.ComponentModel.Win32Exception](https://learn.microsoft.com/search/?terms=System.ComponentModel.Win32Exception) exception will be thrown by the first I/O Read/Write operation. The [System.ComponentModel.Win32Exception.NativeErrorCode](https://learn.microsoft.com/search/?terms=System.ComponentModel.Win32Exception.NativeErrorCode) code for the [System.ComponentModel.Win32Exception](https://learn.microsoft.com/search/?terms=System.ComponentModel.Win32Exception) can be mapped to the TLS Alert from the remote party using the [Schannel error codes for TLS and SSL alerts](https://learn.microsoft.com/windows/desktop/SecAuthN/schannel-error-codes-for-tls-and-ssl-alerts).For more information, see [RFC 2246: Section 7.2.2 Error alerts](https://tools.ietf.org/html/rfc2246#section-7.2.2). <br/>The behavior in .NET Framework 4.6.2 and earlier is that the transport channel (usually TCP connection) will timeout during either Write or Read if the other party failed the handshake and immediately afterwards rejected the connection.

#### Suggestion

Applications calling network I/O APIs such as [System.IO.Stream.Read(System.Byte\[\],System.Int32,System.Int32)](https://learn.microsoft.com/search/?terms=System.IO.Stream.Read(System.Byte%5B%5D%2CSystem.Int32%2CSystem.Int32))/[System.IO.Stream.Write(System.Byte\[\],System.Int32,System.Int32)](https://learn.microsoft.com/search/?terms=System.IO.Stream.Write(System.Byte%5B%5D%2CSystem.Int32%2CSystem.Int32)) should handle [System.IO.IOException](https://learn.microsoft.com/search/?terms=System.IO.IOException) or [System.TimeoutException](https://learn.microsoft.com/search/?terms=System.TimeoutException).<br/>The TLS Alerts feature is enabled by default starting with .NET Framework 4.7. Applications targeting versions of the .NET Framework from 4.0 through 4.6.2 running on a .NET Framework 4.7 or higher system will have the feature disabled to preserve compatibility. <br/>The following configuration API is available to enable or disable the feature for .NET Framework 4.6 and later applications running on .NET Framework 4.7 or later.

- Programmatically:
    Must be the very first thing the application does since ServicePointManager will initialize only once:

    ```csharp
    AppContext.SetSwitch("TestSwitch.LocalAppContext.DisableCaching", true);

    // Set to 'false' to enable the feature in .NET Framework 4.6 - 4.6.2.
    AppContext.SetSwitch("Switch.System.Net.DontEnableTlsAlerts", true);
    ```

- AppConfig:

    ```xml
    <runtime>
      <AppContextSwitchOverrides value="Switch.System.Net.DontEnableTlsAlerts=true"/>
      <!-- Set to 'false' to enable the feature in .NET Framework 4.6 - 4.6.2. -->
    </runtime>
    ```

- Registry key (machine global):
    Set the Value to `false` to enable the feature in .NET Framework 4.6 - 4.6.2.

    ```ini
    Key: HKLM\SOFTWARE\Wow6432Node\Microsoft\.NETFramework\AppContext\Switch.System.Net.DontEnableTlsAlerts
    - Type: String
    - Value: "true"
    ```

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.7 |
| Type | Retargeting |

#### Affected APIs

- [System.Net.Security.SslStream](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStream)
- [System.Net.WebRequest](https://learn.microsoft.com/search/?terms=System.Net.WebRequest)
- [System.Net.HttpWebRequest](https://learn.microsoft.com/search/?terms=System.Net.HttpWebRequest)
- [System.Net.FtpWebRequest](https://learn.microsoft.com/search/?terms=System.Net.FtpWebRequest)
- [System.Net.Mail.SmtpClient](https://learn.microsoft.com/search/?terms=System.Net.Mail.SmtpClient)
- [System.Net.Http](https://learn.microsoft.com/search/?terms=System.Net.Http)
