---
title: "Secure development (Reporting Services)"
description: Learn about the code access security system that Reporting Services uses, which runs code in tightly constrained, administrator-defined security contexts.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: extensions
ms.topic: reference
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "development security [Reporting Services]"
  - "security [Reporting Services], development"
  - "security [Reporting Services], strategies"
---
# Secure development (Reporting Services)
  The  Microsoft 
  .NET Framework 
 provides a robust security system that can run code in tightly constrained, administrator-defined security contexts.  Reporting Services 
 uses the  .NET Framework 
 security system, known as code access security (or evidence-based security). Under code access security, a user might be trusted to access a resource, but if the code the user executes isn't trusted, access to the resource is denied.  
  
 Security based on code, as opposed to specific users, permits security to be expressed for custom assemblies or data, delivery, rendering, and security extensions that you develop for  Reporting Services 
. Any number of  Reporting Services 
 users might execute your extension code, all of whom are unknown at development time. The custom assemblies or extensions that you develop require specific security policies in  Reporting Services 
. These security policies are represented as types in the  .NET Framework 
. For a more information about code access security, see "Code Access Security" in the  .NET Framework 
 documentation.  
  
## In this section  
 [Code access security in Reporting Services](code-access-security-in-reporting-services.md)  
 Introduces code access security and policy configuration for custom assemblies and extensions in  Reporting Services 
.  
  
 [Understand security policies](understanding-security-policies.md)  
 Describes the various assembly types in  Reporting Services 
 and how code access security affects code permissions.  
  
 [Use Reporting Services security policy files](using-reporting-services-security-policy-files.md)  
 Describes the different  Reporting Services 
 components and the corresponding policy configuration files.
