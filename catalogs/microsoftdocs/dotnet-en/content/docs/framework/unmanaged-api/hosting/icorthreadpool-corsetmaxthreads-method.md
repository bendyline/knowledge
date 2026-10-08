---
description: "Learn more about: ICorThreadpool::CorSetMaxThreads Method"
title: "ICorThreadpool::CorSetMaxThreads Method"
ms.date: "03/30/2017"
api_name: 
  - "ICorThreadpool.CorSetMaxThreads"
api_location: 
  - "mscoree.dll"
api_type: 
  - "COM"
f1_keywords: 
  - "CorSetMaxThreads"
helpviewer_keywords: 
  - "ICorThreadpool::CorSetMaxThreads method [.NET Framework hosting]"
  - "CorSetMaxThreads method [.NET Framework hosting]"
ms.assetid: 4a846238-df4e-4060-ba3b-5173f6a51e85
topic_type: 
  - "apiref"
---
# ICorThreadpool::CorSetMaxThreads Method

This method supports the .NET Framework infrastructure and is not intended to be used directly from your code.  
  
## Syntax  
  
```cpp  
HRESULT CorSetMaxThreads (  
    [in] DWORD MaxWorkerThreads,  
    [in] DWORD MaxIOCompletionThreads  
);  
```  
  
## Requirements  

 **Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
  
 **Header:** MSCorEE.h  
  
 **Library:** Included as a resource in MSCorEE.dll  
  
 **.NET Framework Versions:** Available since 2.0
  
  
## See also

- [ICorThreadpool Interface](icorthreadpool-interface.md)
