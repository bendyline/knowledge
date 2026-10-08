---
description: "Learn more about: How to: Create a SecurityBindingElement for a Specified Authentication Mode"
title: "How to: Create a SecurityBindingElement for a Specified Authentication Mode"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: a7c7747a-5b8c-463f-8493-7266dac75066
---
# How to: Create a SecurityBindingElement for a Specified Authentication Mode

Windows Communication Foundation (WCF) provides several modes by which clients and services authenticate to one another. You can create security binding elements for these authentication modes by using static methods on the [System.ServiceModel.Channels.SecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement) class or through configuration, as shown in the following example.

 For more information about the 18 authentication modes, see [SecurityBindingElement Authentication Modes](securitybindingelement-authentication-modes.md).

## Example

 The following code example shows methods for creating bindings for the various authentication modes.

> **Note:**
> Once an instance of the [System.ServiceModel.Channels.SecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement) object is created, a number of properties are immutable, such as [System.ServiceModel.Security.Tokens.IssuedSecurityTokenParameters.KeyType*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.Tokens.IssuedSecurityTokenParameters.KeyType*) and [System.ServiceModel.Channels.SecurityBindingElement.MessageSecurityVersion*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement.MessageSecurityVersion*). Calling `set` on such properties does not change them.

 [c_CustomBindingsAuthMode#2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_custombindingsauthmode/cs/source.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_custombindingsauthmode/cs/source.cs.md)
 [c_CustomBindingsAuthMode#2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_custombindingsauthmode/vb/source.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_custombindingsauthmode/vb/source.vb.md)

## See also

- [SecurityBindingElement Authentication Modes](securitybindingelement-authentication-modes.md)
- [How to: Create a Custom Binding Using the SecurityBindingElement](how-to-create-a-custom-binding-using-the-securitybindingelement.md)
