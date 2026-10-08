---
description: "Learn more about: How to: Compare Claims"
title: "How to: Compare Claims"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "claims [WCF], comparing"
  - "claims [WCF]"
ms.assetid: 0c4ec84d-53df-408f-8953-9bc437f56c28
---
# How to: Compare Claims

The Identity Model infrastructure in Windows Communication Foundation (WCF) is used to perform authorization checking. As such, a common task is to compare claims in the authorization context to the claims required to perform the requested action or access the requested resource. This topic describes how to compare claims, including built-in and custom claim types. For more information about the Identity Model infrastructure, see [Managing Claims and Authorization with the Identity Model](../feature-details/managing-claims-and-authorization-with-the-identity-model.md).

Claim comparison involves comparing the three parts of a claim (type, right, and resource) against the same parts in another claim to see if they are equal. See the following example.

[c_CustomClaimComparison#9 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customclaimcomparison/cs/c_customclaimcomparison.cs#9)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customclaimcomparison/cs/c_customclaimcomparison.cs.md)
[c_CustomClaimComparison#9 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customclaimcomparison/vb/source.vb#9)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customclaimcomparison/vb/source.vb.md)

Both claims have a claim type of [System.IdentityModel.Claims.ClaimTypes.Name*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.ClaimTypes.Name*), a right of [System.IdentityModel.Claims.Rights.PossessProperty*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Rights.PossessProperty*), and a resource of the string "someone". As all three parts of the claim are equal, the claims themselves are equal.

The built-in claim types are compared using the [System.IdentityModel.Claims.Claim.Equals*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.Equals*) method. Claim-specific comparison code is used where necessary. For example, given the following two user principal name (UPN) claims, the comparison code in the [System.IdentityModel.Claims.Claim.Equals*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.Equals*) method returns `true`, assuming `example\someone` identifies the same domain user as `someone@example.com`.

[c_CustomClaimComparison#4 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customclaimcomparison/cs/c_customclaimcomparison.cs#4)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customclaimcomparison/cs/c_customclaimcomparison.cs.md)
[c_CustomClaimComparison#4 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customclaimcomparison/vb/source.vb#4)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customclaimcomparison/vb/source.vb.md)

Custom claim types can also be compared using the [System.IdentityModel.Claims.Claim.Equals*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.Equals*) method. However, in cases where the type returned by the [System.IdentityModel.Claims.Claim.Resource](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.Resource) property of the claim is something other than a primitive type, the [System.IdentityModel.Claims.Claim.Equals*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.Equals*) returns `true` only if the values returned by the `Resource` properties are equal according to the [System.IdentityModel.Claims.Claim.Equals*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.Equals*) method. In cases where this is not appropriate, the custom type returned by the `Resource` property should override the [System.IdentityModel.Claims.Claim.Equals*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.Equals*) and [System.Object.GetHashCode*](https://learn.microsoft.com/search/?terms=System.Object.GetHashCode*) methods to perform whatever custom processing is necessary.

## Comparing built-in claims

1. Given two instances of the [System.IdentityModel.Claims.Claim](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim) class, use the [System.IdentityModel.Claims.Claim.Equals*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.Equals*) to make the comparison, as shown in the following code.

     [c_CustomClaimComparison#5 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customclaimcomparison/cs/c_customclaimcomparison.cs#5)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customclaimcomparison/cs/c_customclaimcomparison.cs.md)
     [c_CustomClaimComparison#5 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customclaimcomparison/vb/source.vb#5)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customclaimcomparison/vb/source.vb.md)

### Comparing custom claims with primitive resource types

1. For custom claims with primitive resource types, comparison can be performed as for built-in claims, as shown in the following code.

     [c_CustomClaimComparison#6 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customclaimcomparison/cs/c_customclaimcomparison.cs#6)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customclaimcomparison/cs/c_customclaimcomparison.cs.md)
     [c_CustomClaimComparison#6 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customclaimcomparison/vb/source.vb#6)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customclaimcomparison/vb/source.vb.md)

2. For custom claims with structure or class based resource types, the resource type should override the [System.IdentityModel.Claims.Claim.Equals*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.Claim.Equals*) method.

3. First check whether the `obj` parameter is `null`, and if so, return `false`.

     [c_CustomClaimComparison#7 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customclaimcomparison/cs/c_customclaimcomparison.cs#7)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customclaimcomparison/cs/c_customclaimcomparison.cs.md)
     [c_CustomClaimComparison#7 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customclaimcomparison/vb/source.vb#7)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customclaimcomparison/vb/source.vb.md)

4. Next call [System.Object.ReferenceEquals*](https://learn.microsoft.com/search/?terms=System.Object.ReferenceEquals*) and pass `this` and `obj` as parameters. If it returns `true`, then return `true`.

     [c_CustomClaimComparison#8 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customclaimcomparison/cs/c_customclaimcomparison.cs#8)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customclaimcomparison/cs/c_customclaimcomparison.cs.md)
     [c_CustomClaimComparison#8 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customclaimcomparison/vb/source.vb#8)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customclaimcomparison/vb/source.vb.md)

5. Next attempt to assign `obj` to a local variable of the class type. If this fails, the reference is `null`. In such cases, return `false`.

6. Perform the custom comparison necessary to correctly compare the current claim to the provided claim.

## Example

The following example shows a comparison of custom claims where the claim resource is a non-primitive type.

[c_CustomClaimComparison#0 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customclaimcomparison/cs/c_customclaimcomparison.cs#0)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customclaimcomparison/cs/c_customclaimcomparison.cs.md)
[c_CustomClaimComparison#0 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customclaimcomparison/vb/source.vb#0)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customclaimcomparison/vb/source.vb.md)

## See also

- [Managing Claims and Authorization with the Identity Model](../feature-details/managing-claims-and-authorization-with-the-identity-model.md)
- [How to: Create a Custom Claim](how-to-create-a-custom-claim.md)
