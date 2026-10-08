---
title: "SQLServerBlob Members"
description: "SQLServerBlob Members"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
---
# SQLServerBlob Members


  The following tables list the members that are exposed by the [SQLServerBlob](sqlserverblob-class.md) class.  
  
## Constructors  
  
| Name | Description |
| --- | --- |
| [SQLServerBlob](sqlserverblob-constructor-sqlserverconnection-byte.md) | Initializes a new instance of the SQLServerBlob class. |
  
## Fields  
 None.  
  
## Inherited Fields  
 None.  
  
## Methods  
  
| Name | Description |
| --- | --- |
| [free](free-method-sqlserverblob.md) | This method frees the BLOB object and releases the resources that it holds. |
| [getBinaryStream](getbinarystream-method-sqlserverblob.md) | Returns an input stream to read data from the BLOB. |
| [getBytes](getbytes-method-sqlserverblob.md) | Gets the BLOB data as an array of bytes. |
| [length](length-method-sqlserverblob.md) | Returns the number of bytes in the BLOB object. |
| [position](position-method-sqlserverblob.md) | Returns the position of a specified pattern in the BLOB based on the given pattern and the starting index. |
| [setBinaryStream](setbinarystream-method-sqlserverblob.md) | Retrieves a stream that can be used to write to the BLOB value. |
| [setBytes](setbytes-method-sqlserverblob.md) | Writes the given array of bytes into the BLOB starting at the given position, and then returns the number of bytes written. |
| [truncate](truncate-method-sqlserverblob.md) | Truncates a BLOB given the length. |
  
## Inherited Methods  
  
| Class inherited from: | Methods |
| --- | --- |
| java.lang.Object | clone, equals, finalize, getClass, hashCode, notify, notifyAll, toString, wait |
  
## Related content

- [SQLServerBlob Class](sqlserverblob-class.md)
