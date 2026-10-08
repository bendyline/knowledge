---
title: "getUnicodeStream Method (SQLServerResultSet)"
description: "getUnicodeStream Method (SQLServerResultSet)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "sqljdbc.jar"
apiname: "SQLServerResultSet.getUnicodeStream"
apitype: "Assembly"
---
# getUnicodeStream Method (SQLServerResultSet)


  Retrieves the value of the designated column in the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object as a stream of Unicode characters.  
  
> **Note:**  
>  This method has been deprecated from the JDBC specification, and calling it will cause a "not implemented" exception to be thrown. Instead, you should use the [getCharacterStream](getcharacterstream-method-sqlserverresultset.md) method.  
  
## Overload List  
  
| Name | Description |
| --- | --- |
| [getUnicodeStream Method (int)](getunicodestream-method-int.md) | Retrieves the value of the designated column index in the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object as a stream of Unicode characters. |
| [getUnicodeStream Method (java.lang.String)](getunicodestream-method-java-lang-string.md) | Retrieves the value of the designated column name in the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object as a stream of Unicode characters. |
  
## Related content

- [SQLServerResultSet Members](sqlserverresultset-members.md)
- [SQLServerResultSet Class](sqlserverresultset-class.md)
