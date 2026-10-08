---
description: "Learn more about: How to: Disable Secure Sessions on a WSFederationHttpBinding"
title: "How to: Disable Secure Sessions on a WSFederationHttpBinding"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "WCF, federation"
  - "federation"
ms.assetid: 675fa143-6a4e-4be3-8afc-673334ab55ec
---
# How to: Disable Secure Sessions on a WSFederationHttpBinding

Some services may require federated credentials but not support secure sessions. In that case, you must disable the secure session feature. Unlike the [System.ServiceModel.WSHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WSHttpBinding), the [System.ServiceModel.WSFederationHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WSFederationHttpBinding) class does not provide a way to disable secure sessions when communicating with a service. Instead, you must create a custom binding that replaces the secure session settings with a bootstrap.

This topic demonstrates how to modify the binding elements contained within a [System.ServiceModel.WSFederationHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WSFederationHttpBinding) to create a custom binding. The result is identical to the [System.ServiceModel.WSFederationHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WSFederationHttpBinding) except that it does not use secure sessions.

## To create a custom federated binding without secure session

1. Create an instance of the [System.ServiceModel.WSFederationHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WSFederationHttpBinding) class either imperatively in code or by loading one from the configuration file.

2. Clone the [System.ServiceModel.WSFederationHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WSFederationHttpBinding) into a [System.ServiceModel.Channels.CustomBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.CustomBinding).

3. Find the [System.ServiceModel.Channels.SecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement) in the [System.ServiceModel.Channels.CustomBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.CustomBinding).

4. Find the [System.ServiceModel.Security.Tokens.SecureConversationSecurityTokenParameters](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.Tokens.SecureConversationSecurityTokenParameters) in the [System.ServiceModel.Channels.SecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement).

5. Replace the original [System.ServiceModel.Channels.SecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement) with the bootstrap security binding element from the [System.ServiceModel.Security.Tokens.SecureConversationSecurityTokenParameters](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.Tokens.SecureConversationSecurityTokenParameters).

## Example

This following example creates a custom federated binding without secure session.

[c_CustomFederationBinding#0 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customfederationbinding/cs/c_customfederationbinding.cs#0)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customfederationbinding/cs/c_customfederationbinding.cs.md)
[c_CustomFederationBinding#0 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customfederationbinding/vb/c_customfederationbinding.vb#0)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customfederationbinding/vb/c_customfederationbinding.vb.md)

## Compiling the Code

- To compile the code example, create a project that references the System.ServiceModel.dll assembly.

## See also

- [Bindings and Security](bindings-and-security.md)
