---
title: "SQLServerParameterMetaData Members"
description: "SQLServerParameterMetaData Members"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
---
# SQLServerParameterMetaData Members


  The following tables list the members that are exposed by the [SQLServerParameterMetaData](sqlserverparametermetadata-class.md) class.  
  
## Constructors  
 None.  
  
## Fields  
 None.  
  
## Inherited Fields  
  
| Name | Description |
| --- | --- |
| java.sql.ParameterMetaData | parameterModeIn, parameterModeInOut, parameterModeOut, parameterModeUnknown, parameterNoNulls, parameterNullable, parameterNullableUnknown |
  
## Methods  
  
| Name | Description |
| --- | --- |
| [getParameterClassName](getparameterclassname-method-sqlserverparametermetadata.md) | Retrieves the fully-qualified name of the Java class whose instances should be passed to the [setObject](setobject-method-sqlserverpreparedstatement.md) method of the [SQLServerPreparedStatement](sqlserverpreparedstatement-class.md) class. |
| [getParameterCount](getparametercount-method-sqlserverparametermetadata.md) | Retrieves the number of parameters in the [SQLServerPreparedStatement](sqlserverpreparedstatement-class.md) object for which this [SQLServerParameterMetaData](sqlserverparametermetadata-class.md) object contains information. |
| [getParameterMode](getparametermode-method-sqlserverparametermetadata.md) | Retrieves the mode of the designated parameter. |
| [getParameterType](getparametertype-method-sqlserverparametermetadata.md) | Retrieves the SQL type of the designated parameter. |
| [getParameterTypeName](getparametertypename-method-sqlserverparametermetadata.md) | Retrieves the database-specific type name of the designated parameter. |
| [getPrecision](getprecision-method-sqlserverparametermetadata.md) | Retrieves the number of decimal digits for the designated parameter. |
| [getScale](getscale-method-sqlserverparametermetadata.md) | Retrieves the number of digits to the right of the decimal point for the designated parameter. |
| [isNullable](isnullable-method-sqlserverparametermetadata.md) | Retrieves whether null values are allowed in the designated parameter. |
| [isSigned](issigned-method-sqlserverparametermetadata.md) | Retrieves whether values for the designated parameter can be signed numbers. |
  
## Inherited Methods  
  
| Class inherited from: | Methods |
| --- | --- |
| java.lang.Object | clone, equals, finalize, getClass, hashCode, notify, notifyAll, toString, wait |
| java.sql.Wrapper | isWrapperFor, unwrap |
  
## Related content

- [SQLServerParameterMetaData Class](sqlserverparametermetadata-class.md)
