---
title: GetErrorInfo function (Unmanaged API Reference)
description: The GetErrorInfo function retrieves error information from the previous function call.
ms.date: "11/06/2017"
api_name: 
  - "GetErrorInfo"
api_location: 
  - "WMINet_Utils.dll"
api_type: 
  - "DLLExport"
f1_keywords: 
  - "GetErrorInfo"
helpviewer_keywords: 
  - "GetErrorInfo function [.NET WMI and performance counters]"
topic_type: 
  - "Reference"
---
# GetErrorInfo function

Retrieves error information from the previous function call.  
  
> **Note:**
> This API is for internal use only. It's not intended for use from developer code.

  
## Syntax  
  
```cpp  
IErrorInfo* GetErrorInfo();
```  

## Return value

An pointer to an [IErrorInfo](https://learn.microsoft.com/previous-versions/windows/desktop/api/oaidl/nn-oaidl-ierrorinfo) object if the function call succeeds, or `null` if it fails.
  
## Remarks

This function wraps a call to the [IComThreadingInfo::GetErrorInfo](https://learn.microsoft.com/windows/desktop/api/objidlbase/nf-objidlbase-icomthreadinginfo-getcurrentapartmenttype) method.

## Requirements  

 **Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
  
 **Header:** WMINet_Utils.def  
  
 **.NET Framework Versions:** Available since 4.7.2
  
  
## See also

- [WMI and Performance Counters (Unmanaged API Reference)](index.md)
