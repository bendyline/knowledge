---
description: "Learn more about: Partial Trust"
title: "Partial Trust"
ms.date: "03/30/2017"
ms.assetid: 489b1587-9909-4d0e-8c1a-5e83c8f8292b
---
# Partial trust

Starting with .NET Framework 3.5, partially trusted callers can access public types and methods implemented in [System.ServiceModel](https://learn.microsoft.com/search/?terms=System.ServiceModel), [System.Runtime.Serialization](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization), and [System.ServiceModel.Web](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web). This section describes supported scenarios for using Windows Communication Foundation (WCF) within a partially trusted application. It also describes the limited subset of WCF functionality available to applications running with reduced code access security (CAS) permissions.

> **Note:**
> Code Access Security (CAS) has been deprecated across all versions of .NET Framework and .NET. Recent versions of .NET do not honor CAS annotations and produce errors if CAS-related APIs are used. Developers should seek alternative means of accomplishing security tasks.

  
## In This Section  

 [Supported Deployment Scenarios](supported-deployment-scenarios.md)  
 Describes the main partial trust scenarios for running WCF.  
  
 [Partial Trust Feature Compatibility](partial-trust-feature-compatibility.md)  
 Describes the WCF features that can't be used with partial trust.  
  
 [Partial Trust Best Practices](partial-trust-best-practices.md)  
 Contains best practices for using WCF in partially trusted applications.
