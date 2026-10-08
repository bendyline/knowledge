---
title: "How to: Use Transport Security and Message Credentials"
description: Learn how to implement transport security with message credentials, which offers the best of Transport and Message security modes in WCF.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "TransportWithMessageCredentials"
ms.assetid: 6cc35346-c37a-4859-b82b-946c0ba6e68f
---
# How to: Use Transport Security and Message Credentials

Securing a service with both transport and message credentials uses the best of both Transport and Message security modes in Windows Communication Foundation (WCF). In sum, transport-layer security provides integrity and confidentiality, while message-layer security provides a variety of credentials that are not possible with strict transport security mechanisms. This topic shows the basic steps for implementing transport with message credentials using the [System.ServiceModel.WSHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WSHttpBinding) and [System.ServiceModel.NetTcpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.NetTcpBinding) bindings. For more information about setting the security mode, see [How to: Set the Security Mode](../how-to-set-the-security-mode.md).

 When setting the security mode to `TransportWithMessageCredential`, the transport determines the actual mechanism that provides the transport-level security. For HTTP, the mechanism is Secure Sockets Layer (SSL) over HTTP (HTTPS); for TCP, it is SSL over TCP or Windows.

 If the transport is HTTP (using the [System.ServiceModel.WSHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WSHttpBinding)), SSL over HTTP provides the transport-level security. In that case, you must configure the computer hosting the service with an SSL certificate bound to a port, as shown later in this topic.

 If the transport is TCP (using the [System.ServiceModel.NetTcpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.NetTcpBinding)), by default the transport-level security provided is Windows security, or SSL over TCP. When using SSL over TCP, you must specify the certificate using the [System.ServiceModel.Security.X509CertificateRecipientServiceCredential.SetCertificate*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.X509CertificateRecipientServiceCredential.SetCertificate*) method, as shown later in this topic.

### To use the WSHttpBinding with a certificate for transport security (in code)

1. Use the HttpCfg.exe tool to bind an SSL certificate to a port on the machine. For more information, see [How to: Configure a Port with an SSL Certificate](how-to-configure-a-port-with-an-ssl-certificate.md).

2. Create an instance of the [System.ServiceModel.WSHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WSHttpBinding) class and set the [System.ServiceModel.WSHttpSecurity.Mode](https://learn.microsoft.com/search/?terms=System.ServiceModel.WSHttpSecurity.Mode) property to [System.ServiceModel.SecurityMode.TransportWithMessageCredential](https://learn.microsoft.com/search/?terms=System.ServiceModel.SecurityMode.TransportWithMessageCredential).

3. Set the [System.ServiceModel.HttpTransportSecurity.ClientCredentialType](https://learn.microsoft.com/search/?terms=System.ServiceModel.HttpTransportSecurity.ClientCredentialType) property to an appropriate value. (For more information, see [Selecting a Credential Type](selecting-a-credential-type.md).) The following code uses the [System.ServiceModel.MessageCredentialType.Certificate](https://learn.microsoft.com/search/?terms=System.ServiceModel.MessageCredentialType.Certificate) value.

4. Create an instance of the [System.Uri](https://learn.microsoft.com/search/?terms=System.Uri) class with an appropriate base address. Note that the address must use the "HTTPS" scheme and must contain the actual name of the machine and the port number that the SSL certificate is bound to. (Alternatively, you can set the base address in configuration.)

5. Add a service endpoint using the [System.ServiceModel.ServiceHost.AddServiceEndpoint*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost.AddServiceEndpoint*) method.

6. Create the instance of the [System.ServiceModel.ServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost) and call the [System.ServiceModel.ICommunicationObject.Open*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ICommunicationObject.Open*) method, as shown in the following code.

     [c_SettingSecurityMode#7 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_settingsecuritymode/cs/source.cs#7)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_settingsecuritymode/cs/source.cs.md)
     [c_SettingSecurityMode#7 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_settingsecuritymode/vb/source.vb#7)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_settingsecuritymode/vb/source.vb.md)

### To use the NetTcpBinding with a certificate for transport security (in code)

1. Create an instance of the [System.ServiceModel.NetTcpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.NetTcpBinding) class and set the [System.ServiceModel.NetTcpSecurity.Mode](https://learn.microsoft.com/search/?terms=System.ServiceModel.NetTcpSecurity.Mode) property to [System.ServiceModel.SecurityMode.TransportWithMessageCredential](https://learn.microsoft.com/search/?terms=System.ServiceModel.SecurityMode.TransportWithMessageCredential).

2. Set the [System.ServiceModel.MessageSecurityOverTcp.ClientCredentialType*](https://learn.microsoft.com/search/?terms=System.ServiceModel.MessageSecurityOverTcp.ClientCredentialType*) to an appropriate value. The following code uses the [System.ServiceModel.MessageCredentialType.Certificate](https://learn.microsoft.com/search/?terms=System.ServiceModel.MessageCredentialType.Certificate) value.

3. Create an instance of the [System.Uri](https://learn.microsoft.com/search/?terms=System.Uri) class with an appropriate base address. Note that the address must use the "net.tcp" scheme. (Alternatively, you can set the base address in configuration.)

4. Create the instance of the [System.ServiceModel.ServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost) class.

5. Use the [System.ServiceModel.Security.X509CertificateRecipientServiceCredential.SetCertificate*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.X509CertificateRecipientServiceCredential.SetCertificate*) method of the [System.ServiceModel.Security.X509CertificateRecipientServiceCredential](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.X509CertificateRecipientServiceCredential) class to explicitly set the X.509 certificate for the service.

6. Add a service endpoint using the [System.ServiceModel.ServiceHost.AddServiceEndpoint*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost.AddServiceEndpoint*) method.

7. Call the [System.ServiceModel.ICommunicationObject.Open*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ICommunicationObject.Open*) method, as shown in the following code.

     [c_SettingSecurityMode#8 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_settingsecuritymode/cs/source.cs#8)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_settingsecuritymode/cs/source.cs.md)
     [c_SettingSecurityMode#8 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_settingsecuritymode/vb/source.vb#8)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_settingsecuritymode/vb/source.vb.md)

### To use the NetTcpBinding with Windows for transport security (in code)

1. Create an instance of the [System.ServiceModel.NetTcpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.NetTcpBinding) class and set the [System.ServiceModel.NetTcpSecurity.Mode](https://learn.microsoft.com/search/?terms=System.ServiceModel.NetTcpSecurity.Mode) property to [System.ServiceModel.SecurityMode.TransportWithMessageCredential](https://learn.microsoft.com/search/?terms=System.ServiceModel.SecurityMode.TransportWithMessageCredential).

2. Set the transport security to use Windows by setting the [System.ServiceModel.TcpTransportSecurity.ClientCredentialType*](https://learn.microsoft.com/search/?terms=System.ServiceModel.TcpTransportSecurity.ClientCredentialType*) to [System.ServiceModel.TcpClientCredentialType.Windows](https://learn.microsoft.com/search/?terms=System.ServiceModel.TcpClientCredentialType.Windows). (Note that this is the default.)

3. Set the [System.ServiceModel.MessageSecurityOverTcp.ClientCredentialType*](https://learn.microsoft.com/search/?terms=System.ServiceModel.MessageSecurityOverTcp.ClientCredentialType*) to an appropriate value. The following code uses the [System.ServiceModel.MessageCredentialType.Certificate](https://learn.microsoft.com/search/?terms=System.ServiceModel.MessageCredentialType.Certificate) value.

4. Create an instance of the [System.Uri](https://learn.microsoft.com/search/?terms=System.Uri) class with an appropriate base address. Note that the address must use the "net.tcp" scheme. (Alternatively, you can set the base address in configuration.)

5. Create the instance of the [System.ServiceModel.ServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost) class.

6. Use the [System.ServiceModel.Security.X509CertificateRecipientServiceCredential.SetCertificate*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.X509CertificateRecipientServiceCredential.SetCertificate*) method of the [System.ServiceModel.Security.X509CertificateRecipientServiceCredential](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.X509CertificateRecipientServiceCredential) class to explicitly set the X.509 certificate for the service.

7. Add a service endpoint using the [System.ServiceModel.ServiceHost.AddServiceEndpoint*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost.AddServiceEndpoint*) method.

8. Call the [System.ServiceModel.ICommunicationObject.Open*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ICommunicationObject.Open*) method, as shown in the following code.

     [c_SettingSecurityMode#9 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_settingsecuritymode/cs/source.cs#9)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_settingsecuritymode/cs/source.cs.md)
     [c_SettingSecurityMode#9 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_settingsecuritymode/vb/source.vb#9)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_settingsecuritymode/vb/source.vb.md)

## Using Configuration

#### To use the WSHttpBinding

1. Configure the computer with an SSL certificate bound to a port. (For more information, see [How to: Configure a Port with an SSL Certificate](how-to-configure-a-port-with-an-ssl-certificate.md)). You do not need to set a `<transport>` element value with this configuration.

2. Specify the client credential type for the message-level security. The following example sets the `clientCredentialType` attribute of the `<message>` element to `UserName`.

    ```xml
    <wsHttpBinding>
    <binding name="WsHttpBinding_ICalculator">
            <security mode="TransportWithMessageCredential" >
               <message clientCredentialType="UserName" />
            </security>
    </binding>
    </wsHttpBinding>
    ```

#### To use the NetTcpBinding with a certificate for transport security

1. For SSL over TCP, you must explicitly specify the certificate in the `<behaviors>` element. The following example specifies a certificate by its issuer in the default store location (local machine and personal stores).

    ```xml
    <behaviors>
     <serviceBehaviors>
       <behavior name="mySvcBehavior">
           <serviceCredentials>
             <serviceCertificate findValue="contoso.com"
                                 x509FindType="FindByIssuerName" />
           </serviceCredentials>
       </behavior>
     </serviceBehaviors>
    </behaviors>
    ```

2. Add a [\<netTcpBinding>](../../configure-apps/file-schema/wcf/nettcpbinding.md) to the bindings section

3. Add a binding element, and set the `name` attribute to an appropriate value.

4. Add a `<security>` element, and set the `mode` attribute to `TransportWithMessageCredential`.

5. Add a <`message>` element, and set the `clientCredentialType` attribute to an appropriate value.

    ```xml
    <bindings>
    <netTcpBinding>
      <binding name="myTcpBinding">
        <security mode="TransportWithMessageCredential" >
           <message clientCredentialType="Windows" />
        </security>
      </binding>
    </netTcpBinding>
    </bindings>
    ```

#### To use the NetTcpBinding with Windows for transport security

1. Add a [\<netTcpBinding>](../../configure-apps/file-schema/wcf/nettcpbinding.md) to the bindings section,

2. Add a `<binding>` element and set the `name` attribute to an appropriate value.

3. Add a `<security>` element, and set the `mode` attribute to `TransportWithMessageCredential`.

4. Add a `<transport>` element and set the `clientCredentialType` attribute to `Windows`.

5. Add a `<message>` element and set the `clientCredentialType` attribute to an appropriate value. The following code sets the value to a certificate.

    ```xml
    <bindings>
    <netTcpBinding>
      <binding name="myTcpBinding">
        <security mode="TransportWithMessageCredential" >
           <transport clientCredentialType="Windows" />
           <message clientCredentialType="Certificate" />
        </security>
      </binding>
    </netTcpBinding>
    </bindings>
    ```

## See also

- [How to: Set the Security Mode](../how-to-set-the-security-mode.md)
- [Securing Services](../securing-services.md)
- [Securing Services and Clients](securing-services-and-clients.md)
