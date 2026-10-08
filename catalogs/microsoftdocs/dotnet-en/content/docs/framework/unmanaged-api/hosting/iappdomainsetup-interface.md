---
description: "Learn more about: IAppDomainSetup Interface"
title: "IAppDomainSetup Interface"
ms.date: "03/30/2017"
api_name:
  - "IAppDomainSetup"
api_location:
  - "mscoree.dll"
api_type:
  - "COM"
f1_keywords:
  - "IAppDomainSetup"
helpviewer_keywords:
  - "IAppDomainSetup interface [.NET Framework hosting]"
ms.assetid: 1844da85-c031-40bf-bea4-1a3d12a36c8c
topic_type:
  - "apiref"
---
# IAppDomainSetup Interface

Provides properties that allow the host to configure an [System.AppDomain](https://learn.microsoft.com/search/?terms=System.AppDomain) type before calling the [ICorRuntimeHost::CreateDomainEx](icorruntimehost-createdomainex-method.md) method to create it.

## Properties

| Property | Description |
| --- | --- |
| [System.AppDomainSetup.ApplicationBase*](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.ApplicationBase*) | Gets or sets the name of the directory that contains the application. |
| [System.AppDomainSetup.ApplicationName*](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.ApplicationName*) | Gets or sets the name of the application. |
| [System.AppDomainSetup.CachePath*](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.CachePath*) | Gets or sets the name of an area specific to the application where files are shadow-copied. |
| [System.AppDomainSetup.ConfigurationFile*](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.ConfigurationFile*) | Gets or sets the name of the configuration file for an application. |
| [System.AppDomainSetup.DynamicBase*](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.DynamicBase*) | Gets or sets the name of the directory where dynamically generated files are stored and accessed. |
| [System.AppDomainSetup.LicenseFile*](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.LicenseFile*) | Gets or sets the path to the license file that is associated with this domain. |
| [System.AppDomainSetup.PrivateBinPath*](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.PrivateBinPath*) | Gets or sets the list of directories combined with the [System.AppDomainSetup.ApplicationBase*](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.ApplicationBase*) directory to probe for private assemblies. |
| [System.AppDomainSetup.PrivateBinPathProbe*](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.PrivateBinPathProbe*) | Gets or sets a string value that includes or excludes [System.AppDomainSetup.ApplicationBase*](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.ApplicationBase*) from the search path for the application. |
| [System.AppDomainSetup.ShadowCopyDirectories*](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.ShadowCopyDirectories*) | Gets or sets the names of the directories that contain assemblies to be shadow-copied. |
| [System.AppDomainSetup.ShadowCopyFiles*](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.ShadowCopyFiles*) | Gets or sets a string that indicates whether shadow-copying is turned on or off. Valid values are "true" or "false". |

## Remarks

 The `IAppDomainSetup` interface corresponds to the managed [System.IAppDomainSetup](https://learn.microsoft.com/search/?terms=System.IAppDomainSetup) interface, which the [System.AppDomainSetup](https://learn.microsoft.com/search/?terms=System.AppDomainSetup) type implements. See [System.IAppDomainSetup](https://learn.microsoft.com/search/?terms=System.IAppDomainSetup) for detailed descriptions of its properties.

 `IAppDomainSetup` represents assembly binding information that can be added to an [System.AppDomain](https://learn.microsoft.com/search/?terms=System.AppDomain) instance before its creation. For example, a host can set the [System.AppDomainSetup.ApplicationBase](https://learn.microsoft.com/search/?terms=System.AppDomainSetup.ApplicationBase) property to establish a root directory, which the common language runtime (CLR) probes for managed assemblies.

## Requirements

 **Platforms:** See [System Requirements](../../get-started/system-requirements.md).

 **Header:** MSCorEE.h

 **Library:** Included as a resource in MSCorEE.dll

 **.NET Framework Versions:** Available since 1.1


## See also

- [System.AppDomain](https://learn.microsoft.com/search/?terms=System.AppDomain)
- [System.AppDomainSetup](https://learn.microsoft.com/search/?terms=System.AppDomainSetup)
- [System.IAppDomainSetup](https://learn.microsoft.com/search/?terms=System.IAppDomainSetup)
- [Hosting Interfaces](hosting-interfaces.md)
