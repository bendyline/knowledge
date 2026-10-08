---
title: "How to: Configure an Application Domain"
description: Configure an application domain in .NET. You can provide the CLR with configuration information for a new application domain using the AppDomainSetup class.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
  - "cpp"
helpviewer_keywords:
  - "application domains, configuring"
  - "ApplicationBase property"
ms.assetid: 07ea8438-7a34-49f0-a7e8-3d6ff7e4a482
---
# How to: Configure an Application Domain

> **Note:**
> This article is specific to .NET Framework. It doesn't apply to newer implementations of .NET, including .NET 6 and later versions.


You can provide the common language runtime with configuration information for a new application domain using the [System.AppDomainSetup](https://learn.microsoft.com/search/?terms=System.AppDomainSetup) class. When creating your own application domains, the most important property is [System.AppDomainSetup.ApplicationBase*](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.ApplicationBase*). The other `AppDomainSetup` properties are used mainly by runtime hosts to configure a particular application domain.

 The `ApplicationBase` property defines the root directory of the application. When the runtime needs to satisfy a type request, it probes for the assembly containing the type in the directory specified by the `ApplicationBase` property.

> **Note:**
> A new application domain inherits only the `ApplicationBase` property of the creator.

 The following example creates an instance of the `AppDomainSetup` class, uses this class to create a new application domain, writes the information to console, and then unloads the application domain.

## Example

 [ADApplicationBase#2 (complete source file; reference: ../../../samples/snippets/cpp/VS_Snippets_CLR/ADApplicationBase/CPP/source2.cpp#2)](../../../_code/samples/snippets/cpp/VS_Snippets_CLR/ADApplicationBase/CPP/source2.cpp.md)
 [ADApplicationBase#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/ADApplicationBase/CS/source2.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/ADApplicationBase/CS/source2.cs.md)
 [ADApplicationBase#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/ADApplicationBase/VB/source2.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/ADApplicationBase/VB/source2.vb.md)

## See also

- [Programming with Application Domains](application-domains.md#programming-with-application-domains)
- [Using Application Domains](use.md)
