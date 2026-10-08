---
description: "Learn more about: How to: Create a Custom Principal Identity"
title: "How to: Create a Custom Principal Identity"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "IPrincipal"
  - "IAuthorizationPolicy"
  - "PrincipalPermissionMode"
  - "PrincipalPermissionAttribute"
ms.assetid: c4845fca-0ed9-4adf-bbdc-10812be69b61
---
# How to: Create a Custom Principal Identity

The [System.Security.Permissions.PrincipalPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.PrincipalPermissionAttribute) is a declarative means of controlling access to service methods. When using this attribute, the [System.ServiceModel.Description.PrincipalPermissionMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.PrincipalPermissionMode) enumeration specifies the mode for performing authorization checks. When this mode is set to [System.ServiceModel.Description.PrincipalPermissionMode.Custom](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.PrincipalPermissionMode.Custom), it enables the user to specify a custom [System.Security.Principal.IPrincipal](https://learn.microsoft.com/search/?terms=System.Security.Principal.IPrincipal) class returned by the [System.Threading.Thread.CurrentPrincipal](https://learn.microsoft.com/search/?terms=System.Threading.Thread.CurrentPrincipal) property. This topic illustrates the scenario when [System.ServiceModel.Description.PrincipalPermissionMode.Custom](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.PrincipalPermissionMode.Custom) is used in combination with a custom authorization policy and a custom principal.

 For more information about using the [System.Security.Permissions.PrincipalPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.PrincipalPermissionAttribute), see [How to: Restrict Access with the PrincipalPermissionAttribute Class](../how-to-restrict-access-with-the-principalpermissionattribute-class.md).

## Example

 [PrincipalPermissionMode#8 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/principalpermissionmode/cs/source.cs#8)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/principalpermissionmode/cs/source.cs.md)
 [PrincipalPermissionMode#8 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/principalpermissionmode/vb/source.vb#8)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/principalpermissionmode/vb/source.vb.md)

## Compiling the Code

 References to the following namespaces are needed to compile the code:

- [System](https://learn.microsoft.com/search/?terms=System)

- [System.Collections.Generic](https://learn.microsoft.com/search/?terms=System.Collections.Generic)

- [System.Security.Permissions](https://learn.microsoft.com/search/?terms=System.Security.Permissions)

- [System.Security.Principal](https://learn.microsoft.com/search/?terms=System.Security.Principal)

- [System.Threading](https://learn.microsoft.com/search/?terms=System.Threading)

- [System.ServiceModel](https://learn.microsoft.com/search/?terms=System.ServiceModel)

- [System.ServiceModel.Channels](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels)

- [System.ServiceModel.Description](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description)

- [System.IdentityModel.Claims](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims)

- [System.IdentityModel.Policy](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy)

## See also

- [System.ServiceModel.Description.PrincipalPermissionMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.PrincipalPermissionMode)
- [System.Security.Permissions.PrincipalPermissionAttribute](https://learn.microsoft.com/search/?terms=System.Security.Permissions.PrincipalPermissionAttribute)
- [How to: Use the ASP.NET Role Provider with a Service](../feature-details/how-to-use-the-aspnet-role-provider-with-a-service.md)
- [How to: Restrict Access with the PrincipalPermissionAttribute Class](../how-to-restrict-access-with-the-principalpermissionattribute-class.md)
