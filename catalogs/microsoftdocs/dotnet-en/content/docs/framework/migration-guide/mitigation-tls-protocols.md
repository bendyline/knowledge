---
title: "Mitigation: TLS Protocols"
description: Learn about the impact and mitigation for the TLS Protocol changes beginning with .NET Framework 4.6.
ms.date: "03/30/2017"
dev_langs: 
  - "csharp"
  - "vb"
ms.assetid: 33f97d13-3022-43da-8b18-cdb5c88df9c2
---
# Mitigation: TLS Protocols

Starting with .NET Framework 4.6, the [System.Net.ServicePointManager](https://learn.microsoft.com/search/?terms=System.Net.ServicePointManager) and [System.Net.Security.SslStream](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStream) classes are allowed to use one of the following three protocols: Tls1.0, Tls1.1, or Tls 1.2. The SSL3.0 protocol and RC4 cipher are not supported.  
  
## Impact  

 This change affects:  
  
- Any app that uses SSL to talk to an HTTPS server or a socket server using any of the following types: [System.Net.Http.HttpClient](https://learn.microsoft.com/search/?terms=System.Net.Http.HttpClient), [System.Net.HttpWebRequest](https://learn.microsoft.com/search/?terms=System.Net.HttpWebRequest), [System.Net.FtpWebRequest](https://learn.microsoft.com/search/?terms=System.Net.FtpWebRequest), [System.Net.Mail.SmtpClient](https://learn.microsoft.com/search/?terms=System.Net.Mail.SmtpClient), and [System.Net.Security.SslStream](https://learn.microsoft.com/search/?terms=System.Net.Security.SslStream).  
  
- Any server-side app that cannot be upgraded to support Tls1.0, Tls1.1, or Tls 1.2..  
  
## Mitigation  

 The recommended mitigation is to upgrade the sever-side app to Tls1.0, Tls1.1, or Tls 1.2. If this is not feasible, or if client apps are broken, the [System.AppContext](https://learn.microsoft.com/search/?terms=System.AppContext) class can be used to opt out of this feature in either of two ways:  
  
- Programmatically, by using a code snippet like the following:  
  
     [AppCompat.SSLProtocols#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/appcompat.sslprotocols/cs/program.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/appcompat.sslprotocols/cs/program.cs.md)
     [AppCompat.SSLProtocols#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/appcompat.sslprotocols/vb/module1.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/appcompat.sslprotocols/vb/module1.vb.md)  
  
     Because the [System.Net.ServicePointManager](https://learn.microsoft.com/search/?terms=System.Net.ServicePointManager) object is initialized only once, defining these compatibility settings must be the first thing the application does.  
  
- By adding the following line to the [\<runtime>](../configure-apps/file-schema/runtime/runtime-element.md) section of your app.config file:  
  
    ```xml  
    <AppContextSwitchOverrides value="Switch.System.Net.DontEnableSchUseStrongCrypto=true"/>  
    ```  
  
 Note, however, that opting out of the default behavior is not recommended, since it makes the application less secure.  
  
## See also

- [Application compatibility](application-compatibility.md)
