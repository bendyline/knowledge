---
description: "Learn more about: How to: Create a Custom Client Identity Verifier"
title: "How to: Create a Custom Client Identity Verifier"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: f2d34e43-fa8b-46d2-91cf-d2960e13e16b
---
# How to: Create a Custom Client Identity Verifier

The *identity* feature of Windows Communication Foundation (WCF) enables a client to specify in advance the expected identity of the service. Whenever a server authenticates itself to the client, the identity is checked against the expected identity. (For an explanation of identity and how it works, see [Service Identity and Authentication](../feature-details/service-identity-and-authentication.md).)

 If needed, the verification can be customized using a custom identity verifier. For example, you can perform additional service identity verification checks. In this example, the custom identity verifier checks additional claims in the X.509 certificate returned from the server. For a sample application, see [Service Identity Sample](../samples/service-identity-sample.md).

### To extend the EndpointIdentity class

1. Define a new class that derives from the [System.ServiceModel.EndpointIdentity](https://learn.microsoft.com/search/?terms=System.ServiceModel.EndpointIdentity) class. This example names the extension `OrgEndpointIdentity`.

2. Add private members along with properties that will be used by the extended [System.ServiceModel.Security.IdentityVerifier](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.IdentityVerifier) class to perform the identity check against claims in the security token returned from the service. This example defines one property: the `OrganizationClaim` property.

     [c_HowToSetCustomClientIdentity#6 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_howtosetcustomclientidentity/cs/source.cs#6)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_howtosetcustomclientidentity/cs/source.cs.md)
     [c_HowToSetCustomClientIdentity#6 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_howtosetcustomclientidentity/vb/source.vb#6)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_howtosetcustomclientidentity/vb/source.vb.md)

### To extend the IdentityVerifier class

1. Define a new class that derives from [System.ServiceModel.Security.IdentityVerifier](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.IdentityVerifier). This example names the extension `CustomIdentityVerifier`.

     [c_HowToSetCustomClientIdentity#7 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_howtosetcustomclientidentity/cs/source.cs#7)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_howtosetcustomclientidentity/cs/source.cs.md)
     [c_HowToSetCustomClientIdentity#7 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_howtosetcustomclientidentity/vb/source.vb#7)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_howtosetcustomclientidentity/vb/source.vb.md)

2. Override the [System.ServiceModel.Security.IdentityVerifier.CheckAccess*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.IdentityVerifier.CheckAccess*) method. The method determines whether the identity check succeeded or failed.

3. The `CheckAccess` method has two parameters. The first is an instance of the [System.ServiceModel.EndpointIdentity](https://learn.microsoft.com/search/?terms=System.ServiceModel.EndpointIdentity) class. The second is an instance of the [System.IdentityModel.Policy.AuthorizationContext](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.AuthorizationContext) class.

     In the method implementation, examine the collection of claims returned by the [System.IdentityModel.Policy.AuthorizationContext.ClaimSets](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.AuthorizationContext.ClaimSets) property of the [System.IdentityModel.Policy.AuthorizationContext](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.AuthorizationContext) class, and perform authentication checks as required. This example begins by finding any claim that is of type "Distinguished Name" and then compares the name to the extension of the [System.ServiceModel.EndpointIdentity](https://learn.microsoft.com/search/?terms=System.ServiceModel.EndpointIdentity) (`OrgEndpointIdentity`).

     [c_HowToSetCustomClientIdentity#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_howtosetcustomclientidentity/cs/source.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_howtosetcustomclientidentity/cs/source.cs.md)
     [c_HowToSetCustomClientIdentity#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_howtosetcustomclientidentity/vb/source.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_howtosetcustomclientidentity/vb/source.vb.md)

### To implement the TryGetIdentity method

1. Implement the [System.ServiceModel.Security.IdentityVerifier.TryGetIdentity*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.IdentityVerifier.TryGetIdentity*) method, which determines whether an instance of the [System.ServiceModel.EndpointIdentity](https://learn.microsoft.com/search/?terms=System.ServiceModel.EndpointIdentity) class can be returned by the client. The WCF infrastructure calls the implementation of the `TryGetIdentity` method first to retrieve the service's identity from the message. Next, the infrastructure calls the `CheckAccess` implementation with the returned `EndpointIdentity` and [System.IdentityModel.Policy.AuthorizationContext](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.AuthorizationContext).

2. In the `TryGetIdentity` method, put the following code:

     [c_HowToSetCustomClientIdentity#2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_howtosetcustomclientidentity/cs/source.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_howtosetcustomclientidentity/cs/source.cs.md)
     [c_HowToSetCustomClientIdentity#2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_howtosetcustomclientidentity/vb/source.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_howtosetcustomclientidentity/vb/source.vb.md)

### To implement a custom binding and set the custom IdentityVerifier

1. Create a method that returns a [System.ServiceModel.Channels.Binding](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Binding) object. This example begins creates an instance of the [System.ServiceModel.WSHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WSHttpBinding) class and sets its security mode to [System.ServiceModel.SecurityMode.Message](https://learn.microsoft.com/search/?terms=System.ServiceModel.SecurityMode.Message), and its [System.ServiceModel.MessageSecurityOverHttp.ClientCredentialType*](https://learn.microsoft.com/search/?terms=System.ServiceModel.MessageSecurityOverHttp.ClientCredentialType*) to [System.ServiceModel.MessageCredentialType.None](https://learn.microsoft.com/search/?terms=System.ServiceModel.MessageCredentialType.None).

2. Create a [System.ServiceModel.Channels.BindingElementCollection](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElementCollection) using the [System.ServiceModel.WSHttpBinding.CreateBindingElements*](https://learn.microsoft.com/search/?terms=System.ServiceModel.WSHttpBinding.CreateBindingElements*) method.

3. Return the [System.ServiceModel.Channels.SecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement) from the collection and cast it to a [System.ServiceModel.Channels.SymmetricSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SymmetricSecurityBindingElement) variable.

4. Set the [System.ServiceModel.Channels.LocalClientSecuritySettings.IdentityVerifier](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.LocalClientSecuritySettings.IdentityVerifier) property of the [System.ServiceModel.Channels.LocalClientSecuritySettings](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.LocalClientSecuritySettings) class to a new instance of the `CustomIdentityVerifier` class created previously.

     [c_HowToSetCustomClientIdentity#3 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_howtosetcustomclientidentity/cs/source.cs#3)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_howtosetcustomclientidentity/cs/source.cs.md)
     [c_HowToSetCustomClientIdentity#3 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_howtosetcustomclientidentity/vb/source.vb#3)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_howtosetcustomclientidentity/vb/source.vb.md)

5. The custom binding that is returned is used to create an instance of the client and class. The client can then perform a custom identity verification check of the service as shown in the following code.

     [c_HowToSetCustomClientIdentity#4 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_howtosetcustomclientidentity/cs/source.cs#4)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_howtosetcustomclientidentity/cs/source.cs.md)
     [c_HowToSetCustomClientIdentity#4 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_howtosetcustomclientidentity/vb/source.vb#4)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_howtosetcustomclientidentity/vb/source.vb.md)

## Example 1

 The following example shows a complete implementation of the [System.ServiceModel.Security.IdentityVerifier](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.IdentityVerifier) class.

 [c_HowToSetCustomClientIdentity#5 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_howtosetcustomclientidentity/cs/source.cs#5)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_howtosetcustomclientidentity/cs/source.cs.md)
 [c_HowToSetCustomClientIdentity#5 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_howtosetcustomclientidentity/vb/source.vb#5)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_howtosetcustomclientidentity/vb/source.vb.md)

## Example 2

 The following example shows a complete implementation of the [System.ServiceModel.EndpointIdentity](https://learn.microsoft.com/search/?terms=System.ServiceModel.EndpointIdentity) class.

 [c_HowToSetCustomClientIdentity#6 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_howtosetcustomclientidentity/cs/source.cs#6)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_howtosetcustomclientidentity/cs/source.cs.md)
 [c_HowToSetCustomClientIdentity#6 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_howtosetcustomclientidentity/vb/source.vb#6)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_howtosetcustomclientidentity/vb/source.vb.md)

## See also

- [System.ServiceModel.ServiceAuthorizationManager](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceAuthorizationManager)
- [System.ServiceModel.EndpointIdentity](https://learn.microsoft.com/search/?terms=System.ServiceModel.EndpointIdentity)
- [System.ServiceModel.Security.IdentityVerifier](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.IdentityVerifier)
- [Service Identity Sample](../samples/service-identity-sample.md)
- [Authorization Policy](../samples/authorization-policy.md)
