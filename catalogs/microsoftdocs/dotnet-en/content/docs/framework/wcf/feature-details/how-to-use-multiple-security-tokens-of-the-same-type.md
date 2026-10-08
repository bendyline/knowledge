---
description: "Learn more about: How to: Use Multiple Security Tokens of the Same Type"
title: "How to: Use Multiple Security Tokens of the Same Type"
ms.date: "03/30/2017"
ms.assetid: cf179f48-4ed4-4caa-86a5-ef8eecc231cd
---
# How to: Use Multiple Security Tokens of the Same Type

- In .NET Framework 3.0, a client message only contained one token of any given type. Now client messages can contain multiple tokens of a type. This topic shows how to include multiple tokens of the same type in a client message.

- Note that you cannot configure a service in this way: a service can contain only one supporting token.

### To use multiple security tokens of the same type

1. Create an empty binding element collection to be populated.

     [C_CustomBinding#9 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_custombinding/cs/c_custombinding.cs#9)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_custombinding/cs/c_custombinding.cs.md)

2. Create a [System.ServiceModel.Channels.SecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement) by calling [System.ServiceModel.Channels.SecurityBindingElement.CreateMutualCertificateBindingElement*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement.CreateMutualCertificateBindingElement*).

     [C_CustomBinding#10 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_custombinding/cs/c_custombinding.cs#10)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_custombinding/cs/c_custombinding.cs.md)

3. Create a [System.ServiceModel.Security.Tokens.SupportingTokenParameters](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.Tokens.SupportingTokenParameters) collection.

     [C_CustomBinding#11 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_custombinding/cs/c_custombinding.cs#11)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_custombinding/cs/c_custombinding.cs.md)

4. Add SAML tokens to the collection.

     [C_CustomBinding#12 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_custombinding/cs/c_custombinding.cs#12)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_custombinding/cs/c_custombinding.cs.md)

5. Add the collection to the [System.ServiceModel.Channels.SecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement).

     [C_CustomBinding#13 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_custombinding/cs/c_custombinding.cs#13)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_custombinding/cs/c_custombinding.cs.md)

6. Add binding elements to the binding element collection.

     [C_CustomBinding#14 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_custombinding/cs/c_custombinding.cs#14)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_custombinding/cs/c_custombinding.cs.md)

7. Return a new custom binding created from the binding element collection.

     [C_CustomBinding#15 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_custombinding/cs/c_custombinding.cs#15)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_custombinding/cs/c_custombinding.cs.md)

## Example

 The following is the entire method described by the preceding procedure.

 [C_CustomBinding#7 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_custombinding/cs/c_custombinding.cs#7)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_custombinding/cs/c_custombinding.cs.md)
