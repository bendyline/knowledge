---
title: QualifierSet_EndEnumeration function (Unmanaged API Reference)
description: The QualifierSet_EndEnumeration function terminates an enumeration.
ms.date: "11/06/2017"
api_name: 
  - "QualifierSet_EndEnumeration"
api_location: 
  - "WMINet_Utils.dll"
api_type: 
  - "DLLExport"
f1_keywords: 
  - "QualifierSet_EndEnumeration"
helpviewer_keywords: 
  - "QualifierSet_EndEnumeration function [.NET WMI and performance counters]"
topic_type: 
  - "Reference"
---
# QualifierSet_EndEnumeration function

Terminates the enumeration begun with a call to the [QualifierSet_BeginEnumeration](qualifierset-beginenumeration.md) function.  

> **Note:**
> This API is for internal use only. It's not intended for use from developer code.

  
## Syntax  
  
```cpp  
HRESULT QualifierSet_EndEnumeration (
   [in] int                  vFunc,
   [in] IWbemQualifierSet*   ptr
);
```  

## Parameters

`vFunc`  
[in] This parameter is unused.

`ptr`
[in] A pointer to an [IWbemQualifierSet](https://learn.microsoft.com/windows/desktop/api/wbemcli/nn-wbemcli-iwbemqualifierset) instance.

## Return value

The following value returned by this function is defined in the *WbemCli.h* header file, or you can define it as a constant in your code:

| Constant | Value | Description |
| --- | --- | --- |
| `WBEM_S_NO_ERROR` | 0 | The function call was successful. |
  
## Remarks

This function wraps a call to the [IWbemQualifierSet::EndEnumeration](https://learn.microsoft.com/windows/desktop/api/wbemcli/nf-wbemcli-iwbemqualifierset-endenumeration) method.

This call is recommended, but not required. It immediately releases resources associated with the enumeration.

## Requirements  

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
  
**Header:** WMINet_Utils.idl  
  
**.NET Framework Versions:** Available since 4.7.2
  
  
## See also

- [WMI and Performance Counters (Unmanaged API Reference)](index.md)
