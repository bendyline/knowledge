---
title: "How to: Set the Security Mode"
description: "Learn how to set the three common WCF security modes on most predefined bindings: Transport, Message, and TransportWithMessageCredential."
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "Mode property"
  - "WCF, security mode"
  - "WCF, security"
ms.assetid: 6e01dd9f-b5dd-4474-b24c-06e124de4ff7
---
# How to: Set the Security Mode

Windows Communication Foundation (WCF) security has three common security modes that are found on most predefined bindings: transport, message, and "transport with message credential." Two additional modes are specific to two bindings: the "transport-credential only" mode found on the [System.ServiceModel.BasicHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.BasicHttpBinding), and the "Both" mode, found on the [System.ServiceModel.NetMsmqBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.NetMsmqBinding). However, this topic concentrates on the three common security modes: [System.ServiceModel.SecurityMode.Transport](https://learn.microsoft.com/search/?terms=System.ServiceModel.SecurityMode.Transport), [System.ServiceModel.SecurityMode.Message](https://learn.microsoft.com/search/?terms=System.ServiceModel.SecurityMode.Message), and [System.ServiceModel.SecurityMode.TransportWithMessageCredential](https://learn.microsoft.com/search/?terms=System.ServiceModel.SecurityMode.TransportWithMessageCredential).

Note that not every predefined binding supports all of these modes. This topic sets the mode with the [System.ServiceModel.WSHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WSHttpBinding) and [System.ServiceModel.NetTcpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.NetTcpBinding) classes and demonstrates how to set the mode both programmatically and through configuration.

For more information, see WCF security, see [Security Overview](feature-details/security-overview.md), [Securing Services](securing-services.md), and [Securing Services and Clients](feature-details/securing-services-and-clients.md). For more information about transport mode and message, see [Transport Security](feature-details/transport-security.md) and [Message Security](feature-details/message-security-in-wcf.md).

## To set the security mode in code

1. Create an instance of the binding class that you are using. For a list of predefined bindings, see [System-Provided Bindings](system-provided-bindings.md). This example creates an instance of the [System.ServiceModel.WSHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WSHttpBinding) class.

2. Set the `Mode` property of the object returned by the `Security` property.

     [c_SettingSecurityMode#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CFX/c_settingsecuritymode/cs/source.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_settingsecuritymode/cs/source.cs.md)
     [c_SettingSecurityMode#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_settingsecuritymode/vb/source.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_settingsecuritymode/vb/source.vb.md)

     Alternatively, set the mode to message, as shown in the following code.

     [c_SettingSecurityMode#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CFX/c_settingsecuritymode/cs/source.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_settingsecuritymode/cs/source.cs.md)
     [c_SettingSecurityMode#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_settingsecuritymode/vb/source.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_settingsecuritymode/vb/source.vb.md)

     Or set the mode to transport with message credentials, as shown in the following code.

     [c_SettingSecurityMode#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CFX/c_settingsecuritymode/cs/source.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_settingsecuritymode/cs/source.cs.md)
     [c_SettingSecurityMode#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_settingsecuritymode/vb/source.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_settingsecuritymode/vb/source.vb.md)

3. You can also set the mode in the constructor of the binding, as shown in the following code.

     [c_SettingSecurityMode#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CFX/c_settingsecuritymode/cs/source.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_settingsecuritymode/cs/source.cs.md)
     [c_SettingSecurityMode#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_settingsecuritymode/vb/source.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_settingsecuritymode/vb/source.vb.md)

## Setting the ClientCredentialType Property

Setting the mode to one of the three values determines how you set the `ClientCredentialType` property. For example, using the [System.ServiceModel.WSHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WSHttpBinding) class, setting the mode to `Transport` means you must set the [System.ServiceModel.HttpTransportSecurity.ClientCredentialType](https://learn.microsoft.com/search/?terms=System.ServiceModel.HttpTransportSecurity.ClientCredentialType) property of the [System.ServiceModel.HttpTransportSecurity](https://learn.microsoft.com/search/?terms=System.ServiceModel.HttpTransportSecurity) class to an appropriate value.

### To set the ClientCredentialType property for Transport mode

1. Create an instance of the binding.

2. Set the `Mode` property to `Transport`.

3. Set the `ClientCredential` property to an appropriate value. The following code sets the property to `Windows`.

     [c_SettingSecurityMode#5 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CFX/c_settingsecuritymode/cs/source.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_settingsecuritymode/cs/source.cs.md)
     [c_SettingSecurityMode#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_settingsecuritymode/vb/source.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_settingsecuritymode/vb/source.vb.md)

### To set the ClientCredentialType property for Message mode

1. Create an instance of the binding.

2. Set the `Mode` property to `Message`.

3. Set the `ClientCredential` property to an appropriate value. The following code sets the property to `Certificate`.

     [c_SettingSecurityMode#6 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CFX/c_settingsecuritymode/cs/source.cs#6)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_settingsecuritymode/cs/source.cs.md)
     [c_SettingSecurityMode#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_settingsecuritymode/vb/source.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_settingsecuritymode/vb/source.vb.md)

### To set the Mode and ClientCredentialType property in configuration

1. Add an appropriate binding element to the [\<bindings>](../configure-apps/file-schema/wcf/bindings.md) element of the configuration file. The following example adds a [\<wsHttpBinding>](../configure-apps/file-schema/wcf/wshttpbinding.md) element.

2. Add a `<binding>` element and set its `name` attribute to an appropriate value.

3. Add a `<security>` element and set the `mode` attribute to `Message`, `Transport`, or `TransportWithMessageCredential`.

4. If the mode is set to `Transport`, add a `<transport>` element and set the `clientCredential` attribute to an appropriate value.

     The following example sets the mode to "`Transport"`, and then sets the `clientCredentialType` attribute of the `<transport>` element to "`Windows"`.

    ```xml
    <wsHttpBinding>
    <binding name="TransportSecurity">
        <security mode="Transport" >
           <transport clientCredentialType = "Windows" />
        </security>
    </binding>
    </wsHttpBinding >
    ```

     Alternatively, set the `security mode` to "`Message"`, followed by a `<"message">` element. This example sets the `clientCredentialType` to "`Certificate"`.

    ```xml
    <wsHttpBinding>
    <binding name="MessageSecurity">
        <security mode="Message" >
           <message clientCredentialType = "Certificate" />
        </security>
    </binding>
    </wsHttpBinding >
    ```

     Using the [System.ServiceModel.BasicHttpSecurityMode.TransportWithMessageCredential](https://learn.microsoft.com/search/?terms=System.ServiceModel.BasicHttpSecurityMode.TransportWithMessageCredential) value is a special case, and is explained below.

### Using TransportWithMessageCredential

When setting the security mode to `TransportWithMessageCredential`, the transport determines the actual mechanism that provides the transport-level security. For example, the HTTP protocol uses Secure Sockets Layer (SSL) over HTTP (HTTPS). Therefore, setting the `ClientCredentialType` property of any transport security object (such as [System.ServiceModel.HttpTransportSecurity](https://learn.microsoft.com/search/?terms=System.ServiceModel.HttpTransportSecurity)) is ignored.  In other words, you can only set the `ClientCredentialType` of the message security object (for the `WSHttpBinding` binding, the [System.ServiceModel.NonDualMessageSecurityOverHttp](https://learn.microsoft.com/search/?terms=System.ServiceModel.NonDualMessageSecurityOverHttp) object).

For more information, see [How to: Use Transport Security and Message Credentials](feature-details/how-to-use-transport-security-and-message-credentials.md).

## See also

- [How to: Configure a Port with an SSL Certificate](feature-details/how-to-configure-a-port-with-an-ssl-certificate.md)
- [How to: Use Transport Security and Message Credentials](feature-details/how-to-use-transport-security-and-message-credentials.md)
- [Transport Security](feature-details/transport-security.md)
- [Message Security](feature-details/message-security-in-wcf.md)
- [Security Overview](feature-details/security-overview.md)
- [System-Provided Bindings](system-provided-bindings.md)
- [\<security>](../configure-apps/file-schema/wcf/security-of-wshttpbinding.md)
- [\<security>](../configure-apps/file-schema/wcf/security-of-basichttpbinding.md)
- [\<security>](../configure-apps/file-schema/wcf/security-of-nettcpbinding.md)
