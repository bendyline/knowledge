---
description: "Learn more about: IHostControl Interface"
title: "IHostControl Interface"
ms.date: "03/30/2017"
api_name: 
  - "IHostControl"
api_location: 
  - "mscoree.dll"
api_type: 
  - "COM"
f1_keywords: 
  - "IHostControl"
helpviewer_keywords: 
  - "IHostControl interface [.NET Framework hosting]"
ms.assetid: a4ae0d1f-ade9-4b0a-a122-93ed11a5e6b3
topic_type: 
  - "apiref"
---
# IHostControl Interface

Provides methods for configuring the loading of assemblies, and for determining which hosting interfaces the host supports.  
  
## Methods  
  
| Method | Description |
| --- | --- |
| [GetHostManager Method](ihostcontrol-gethostmanager-method.md) | Gets an interface pointer to the host's implementation of the interface with the specified `IID`. |
| [SetAppDomainManager Method](ihostcontrol-setappdomainmanager-method.md) | Notifies the host that an application domain has been created. |
  
## Requirements  

 **Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
  
 **Header:** MSCorEE.h  
  
 **Library:** Included as a resource in MSCorEE.dll  
  
 **.NET Framework Versions:** Available since 2.0
  
  
## See also

- [System.AppDomainManager](https://learn.microsoft.com/search/?terms=System.AppDomainManager)
- [ICLRRuntimeHost Interface](iclrruntimehost-interface.md)
- [ICLRControl Interface](iclrcontrol-interface.md)
- [Hosting Interfaces](hosting-interfaces.md)
