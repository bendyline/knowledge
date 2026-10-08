---
description: "Learn more about: Replacing a Principal Object"
title: "Replacing a Principal Object"
ms.date: 07/15/2020
dev_langs: 
  - "csharp"
  - "vb"
helpviewer_keywords: 
  - "principal objects, replacing"
  - "security [.NET], replacing principal objects"
  - "security [.NET], principals"
ms.assetid: c323687e-b196-487b-beba-f38f9b3f961b
---
# Replacing a Principal Object

Applications that provide authentication services must be able to replace the **Principal** object ([System.Security.Principal.IPrincipal](https://learn.microsoft.com/search/?terms=System.Security.Principal.IPrincipal)) for a given thread. Furthermore, the security system must help protect the ability to replace **Principal** objects because a maliciously attached, incorrect **Principal** compromises the security of your application by claiming an untrue identity or role. Therefore, applications that require the ability to replace **Principal** objects must be granted the [System.Security.Permissions.SecurityPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.SecurityPermission) object for principal control. (Note that this permission is not required for performing role-based security checks or for creating **Principal** objects.)  
  
The current **Principal** object can be replaced by performing the following tasks:  
  
1. Create the replacement **Principal** object and associated **Identity** object.  
  
2. Attach the new **Principal** object to the call context.  
  
## Example

The following example shows how to create a generic principal object and use it to set the principal of a thread.  

[language="csharp" source="./snippets/replacing-a-principal-object/csharp/program.cs" id="Snippet1"::: (complete source file; reference: ./snippets/replacing-a-principal-object/csharp/program.cs)](../../../_code/docs/standard/security/snippets/replacing-a-principal-object/csharp/program.cs.md)
[language="vb" source="./snippets/replacing-a-principal-object/vb/program.vb" id="Snippet1"::: (complete source file; reference: ./snippets/replacing-a-principal-object/vb/program.vb)](../../../_code/docs/standard/security/snippets/replacing-a-principal-object/vb/program.vb.md)
  
## See also

- [System.Security.Permissions.SecurityPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.SecurityPermission)
- [Principal and Identity Objects](principal-and-identity-objects.md)
- [ASP.NET Core Security](https://learn.microsoft.com/aspnet/core/security/)
