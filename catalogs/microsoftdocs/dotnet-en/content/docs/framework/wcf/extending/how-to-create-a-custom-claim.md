---
title: "How to: Create a Custom Claim"
description: Learn how to create a custom claim in WCF. WCF supports a variety of built-in claims and some applications may require custom claims.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: d619976b-eda3-475e-ac23-c7988a2dceb0
---
# How to: Create a Custom Claim

The Identity Model infrastructure in Windows Communication Foundation (WCF) provides a set of built-in claim types and rights with the helper functions for creating [System.IdentityModel.Claims.Claim](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim) instances with those types and rights. These built-in claims are designed to model information found in client credential types that WCF supports by default. In many cases, the built-in claims are sufficient; however some applications may require custom claims. A claim consists of the claim type, the resource for which the claim applies to and the right that is asserted over that resource. This topic describes how to create a custom claim.

### To create a custom claim that is based on a primitive data type

1. Create a custom claim by passing the claim type, resource value and right to the [System.IdentityModel.Claims.Claim.%23ctor%28System.String%2CSystem.Object%2CSystem.String%29](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.%2523ctor%2528System.String%252CSystem.Object%252CSystem.String%2529) constructor.

    1. Decide on a unique value for the claim type.

         The claim type is a unique string identifier. It is the custom claim designer's responsibility to ensure that the string identifier that is used for the claim type is unique. For a list of claim types that are defined by WCF, see the [System.IdentityModel.Claims.ClaimTypes](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.ClaimTypes) class.

    2. Choose the primitive data type and value for the resource.

         A resource is an object. The CLR type of the resource can be a primitive, such as [System.String](https://learn.microsoft.com/search/?terms=System.String) or [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32), or any serializable type. The CLR type of the resource must be serializable, because claims are serialized at various points by WCF. Primitive types are serializable.

    3. Choose a right that is defined by WCF or a unique value for a custom right.

         A right is a unique string identifier. The rights that are defined by WCF are defined in the [System.IdentityModel.Claims.Rights](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Rights) class.

         It is the custom claim designer's responsibility to ensure that the string identifier that is used for the right is unique.

         The following code example creates a custom claim with a claim type of `http://example.org/claims/simplecustomclaim`, for a resource named `Driver's License`, and with the [System.IdentityModel.Claims.Rights.PossessProperty*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Rights.PossessProperty*) right.

     [c_CustomClaim#4 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customclaim/cs/c_customclaim.cs#4)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customclaim/cs/c_customclaim.cs.md)
     [c_CustomClaim#4 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customclaim/vb/c_customclaim.vb#4)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customclaim/vb/c_customclaim.vb.md)

### To create a custom claim that is based on a non-primitive data type

1. Create a custom claim by passing the claim type, resource value and right to the [System.IdentityModel.Claims.Claim.%23ctor%28System.String%2CSystem.Object%2CSystem.String%29](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.%2523ctor%2528System.String%252CSystem.Object%252CSystem.String%2529) constructor.

    1. Decide on a unique value for the claim type.

         The claim type is a unique string identifier. It is the custom claim designer's responsibility to ensure that the string identifier that is used for the claim type is unique. For a list of claim types that are defined by WCF, see the [System.IdentityModel.Claims.ClaimTypes](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.ClaimTypes) class.

    2. Choose or define a serializable non-primitive type for the resource.

         A resource is an object. The CLR type of the resource must be serializable, because claims are serialized at various points by WCF. Primitive types are already serializable.

         When a new type is defined, apply the [System.Runtime.Serialization.DataContractAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractAttribute) to the class. Also apply the [System.Runtime.Serialization.DataMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataMemberAttribute) attribute to the all members of the new type that need to be serialized as part of the claim.

         The following code example defines a custom resource type named `MyResourceType`.

         [c_CustomClaim#2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customclaim/cs/c_customclaim.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customclaim/cs/c_customclaim.cs.md)
         [c_CustomClaim#2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customclaim/vb/c_customclaim.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customclaim/vb/c_customclaim.vb.md)

    3. Choose a right that is defined by WCF or a unique value for a custom right.

         A right is a unique string identifier. The rights that are defined by WCF are defined in the [System.IdentityModel.Claims.Rights](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Rights) class.

         It is the custom claim designer's responsibility to ensure that the string identifier that is used for the right is unique.

         The following code example creates a custom claim with a claim type of `http://example.org/claims/complexcustomclaim`, a custom resource type of `MyResourceType`, and with the [System.IdentityModel.Claims.Rights.PossessProperty*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Rights.PossessProperty*) right.

         [c_CustomClaim#5 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customclaim/cs/c_customclaim.cs#5)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customclaim/cs/c_customclaim.cs.md)
         [c_CustomClaim#5 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customclaim/vb/c_customclaim.vb#5)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customclaim/vb/c_customclaim.vb.md)

## Example

 The following code example demonstrates how to create a custom claim with a primitive resource type and a custom claim with a non-primitive resource type.

 [c_CustomClaim#0 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customclaim/cs/c_customclaim.cs#0)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customclaim/cs/c_customclaim.cs.md)
 [c_CustomClaim#0 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customclaim/vb/c_customclaim.vb#0)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customclaim/vb/c_customclaim.vb.md)

## See also

- [System.IdentityModel.Claims.Claim](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim)
- [System.IdentityModel.Claims.Rights](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Rights)
- [System.IdentityModel.Claims.ClaimTypes](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.ClaimTypes)
- [System.Runtime.Serialization.DataContractAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractAttribute)
- [System.Runtime.Serialization.DataMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataMemberAttribute)
- [Managing Claims and Authorization with the Identity Model](../feature-details/managing-claims-and-authorization-with-the-identity-model.md)
