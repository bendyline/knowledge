---
description: "Learn more about: How to: Configure a Local Issuer"
title: "How to: Configure a Local Issuer"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "WCF, federation"
  - "federation"
ms.assetid: 15263371-514e-4ea6-90fb-14b4939154cd
---
# How to: Configure a Local Issuer

This topic describes how to configure a client to use a local issuer for issued tokens.

Often, when a client communicates with a federated service, the service specifies the address of the security token service that is expected to issue the token the client will use to authenticate itself to the federated service. In certain situations, the client may be configured to use a *local issuer*.

Windows Communication Foundation (WCF) uses a local issuer in cases where the issuer address of a federated binding is `http://schemas.microsoft.com/2005/12/ServiceModel/Addressing/Anonymous` or `null`. In such cases, you must configure the [System.ServiceModel.Description.ClientCredentials](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ClientCredentials) with the address of the local issuer and the binding to use to communicate with that issuer.

> **Note:**
> If the [System.ServiceModel.Description.ClientCredentials.SupportInteractive](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ClientCredentials.SupportInteractive) property of the `ClientCredentials` class is set to `true`, a local issuer address is not specified, and the issuer address specified by the [\<wsFederationHttpBinding>](../../configure-apps/file-schema/wcf/wsfederationhttpbinding.md) or other federated binding is `http://schemas.xmlsoap.org/ws/2005/05/identity/issuer/self`, `http://schemas.microsoft.com/2005/12/ServiceModel/Addressing/Anonymous`, or is `null`, then the Windows CardSpace issuer is used.

## To configure the local issuer in code

1. Create a variable of type [System.ServiceModel.Security.IssuedTokenClientCredential](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.IssuedTokenClientCredential)

2. Set the variable to the instance returned from the [System.ServiceModel.Description.ClientCredentials.IssuedToken](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ClientCredentials.IssuedToken) property of the `ClientCredentials` class. That instance is returned by the [System.ServiceModel.ClientBase`1.ClientCredentials](https://learn.microsoft.com/search/?terms=System.ServiceModel.ClientBase%601.ClientCredentials) property of the client (inherited from [System.ServiceModel.ClientBase`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.ClientBase%601)) or the [System.ServiceModel.ChannelFactory.Credentials](https://learn.microsoft.com/search/?terms=System.ServiceModel.ChannelFactory.Credentials) property of the [System.ServiceModel.ChannelFactory](https://learn.microsoft.com/search/?terms=System.ServiceModel.ChannelFactory):

     [c_CreateSTS#9 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_creatests/cs/source.cs#9)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_creatests/cs/source.cs.md)
     [c_CreateSTS#9 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_creatests/vb/source.vb#9)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_creatests/vb/source.vb.md)

3. Set the [System.ServiceModel.Security.IssuedTokenClientCredential.LocalIssuerAddress](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.IssuedTokenClientCredential.LocalIssuerAddress) property to a new instance of the [System.ServiceModel.EndpointAddress](https://learn.microsoft.com/search/?terms=System.ServiceModel.EndpointAddress), with the address of the local issuer as an argument to the constructor.

     [c_CreateSTS#10 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_creatests/cs/source.cs#10)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_creatests/cs/source.cs.md)
     [c_CreateSTS#10 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_creatests/vb/source.vb#10)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_creatests/vb/source.vb.md)

     Alternatively, create a new [System.Uri](https://learn.microsoft.com/search/?terms=System.Uri) instance as an argument to the constructor.

     [c_CreateSTS#11 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_creatests/cs/source.cs#11)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_creatests/cs/source.cs.md)
     [c_CreateSTS#11 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_creatests/vb/source.vb#11)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_creatests/vb/source.vb.md)

     The `addressHeaders` parameter is an array of [System.ServiceModel.Channels.AddressHeader](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.AddressHeader) instances, as shown.

     [c_CreateSTS#12 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_creatests/cs/source.cs#12)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_creatests/cs/source.cs.md)
     [c_CreateSTS#12 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_creatests/vb/source.vb#12)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_creatests/vb/source.vb.md)

4. Set the binding for the local issuer using the [System.ServiceModel.Security.IssuedTokenClientCredential.LocalIssuerBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.IssuedTokenClientCredential.LocalIssuerBinding) property.

     [c_CreateSTS#13 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_creatests/cs/source.cs#13)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_creatests/cs/source.cs.md)
     [c_CreateSTS#13 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_creatests/vb/source.vb#13)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_creatests/vb/source.vb.md)

5. Optional. Add configured endpoint behaviors for the local issuer by adding such behaviors to the collection returned by the [System.ServiceModel.Security.IssuedTokenClientCredential.LocalIssuerChannelBehaviors](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.IssuedTokenClientCredential.LocalIssuerChannelBehaviors) property.

     [c_CreateSTS#14 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_creatests/cs/source.cs#14)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_creatests/cs/source.cs.md)
     [c_CreateSTS#14 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_creatests/vb/source.vb#14)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_creatests/vb/source.vb.md)

## To configure the local issuer in configuration

1. Create a [\<localIssuer>](../../configure-apps/file-schema/wcf/localissuer.md) element as a child of the [\<issuedToken>](../../configure-apps/file-schema/wcf/issuedtoken.md) element that is itself a child of the [\<clientCredentials>](../../configure-apps/file-schema/wcf/clientcredentials.md) element in an endpoint behavior.

2. Set the `address` attribute to the address of the local issuer that will accept token requests.

3. Set the `binding` and `bindingConfiguration` attributes to values that reference the appropriate binding to use when communicating with the local issuer endpoint.

4. Optional. Set the [\<identity>](../../configure-apps/file-schema/wcf/identity.md) element as a child of the `<localIssuer>` element and specify identity information for the local issuer.

5. Optional. Set the [\<headers>](../../configure-apps/file-schema/wcf/headers.md) element as a child of the `<localIssuer>` element and specify additional headers that are required in order to correctly address the local issuer.

## .NET Framework Security

Note that if an issuer address and binding are specified for a given binding, the local issuer is not used for endpoints that use that binding. Clients who expect to always use the local issuer should ensure that they do not use such a binding or that they modify the binding so that the issuer address is `null`.

## See also

- [How to: Configure Credentials on a Federation Service](how-to-configure-credentials-on-a-federation-service.md)
- [How to: Create a Federated Client](how-to-create-a-federated-client.md)
- [How to: Create a WSFederationHttpBinding](how-to-create-a-wsfederationhttpbinding.md)
