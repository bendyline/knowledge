---
title: "SQLServerResultSetMetaData Members"
description: "SQLServerResultSetMetaData Members"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
---
# SQLServerResultSetMetaData Members


  The following tables list the members that are exposed by the [SQLServerResultSetMetaData](sqlserverresultsetmetadata-class.md) class.  
  
## Constructors  
 None.  
  
## Fields  
 None.  
  
## Inherited Fields  
  
| Name | Description |
| --- | --- |
| java.sql.ResultSetMetaData | columnNoNulls, columnNullable, columnNullableUnknown |
  
## Methods  
  
| Name | Description |
| --- | --- |
| [getCatalogName](getcatalogname-method-sqlserverresultsetmetadata.md) | Gets the catalog name for the table that includes the designated column. |
| [getColumnClassName](getcolumnclassname-method-sqlserverresultsetmetadata.md) | Returns the fully-qualified name of the Java class whose instances are manufactured if the [getObject](getobject-method-sqlserverresultset.md) method of the [SQLServerResultSet](sqlserverresultset-class.md) class is called to retrieve a value from the column. |
| [getColumnCount](getcolumncount-method-sqlserverresultsetmetadata.md) | Returns the number of columns in the result set. |
| [getColumnDisplaySize](getcolumndisplaysize-method-sqlserverresultsetmetadata.md) | Returns the normal maximum width, in characters, of the designated column. |
| [getColumnLabel](getcolumnlabel-method-sqlserverresultsetmetadata.md) | Gets the title that is suggested for use in printouts and displays of the designated column. |
| [getColumnName](getcolumnname-method-sqlserverresultsetmetadata.md) | Get the name of the designated column. |
| [getColumnType](getcolumntype-method-sqlserverresultsetmetadata.md) | Retrieves the SQL type of the designated column. |
| [getColumnTypeName](getcolumntypename-method-sqlserverresultsetmetadata.md) | Retrieves the database-specific type name of the designated column. |
| [getPrecision](getprecision-method-sqlserverresultsetmetadata.md) | Get the number of decimal digits for the designated column. |
| [getScale](getscale-method-sqlserverresultsetmetadata.md) | Gets the number of digits to the right of the decimal point for the designated column. |
| [getSchemaName](getschemaname-method-sqlserverresultsetmetadata.md) | Gets the table schema name for the designated column. |
| [getTableName](gettablename-method-sqlserverresultsetmetadata.md) | Gets the table name of the designated column. |
| [isAutoIncrement](isautoincrement-method-sqlserverresultsetmetadata.md) | Indicates whether the designated column is automatically numbered, which makes it read-only. |
| [isCaseSensitive](iscasesensitive-method-sqlserverresultsetmetadata.md) | Indicates whether a column is case sensitive. |
| [isCurrency](iscurrency-method-sqlserverresultsetmetadata.md) | Indicates whether the designated column is a cash value. |
| [isDefinitelyWritable](isdefinitelywritable-method-sqlserverresultsetmetadata.md) | Indicates whether a write on the designated column will definitely succeed. |
| [isNullable](isnullable-method-sqlserverresultsetmetadata.md) | Indicates the nullability of values in the designated column. |
| [isReadOnly](isreadonly-method-sqlserverresultsetmetadata.md) | Indicates whether the designated column is definitely not writable. |
| [isSearchable](issearchable-method-sqlserverresultsetmetadata.md) | Indicates whether the designated column can be used in a SQL WHERE clause. |
| [isSigned](issigned-method-sqlserverresultsetmetadata.md) | Indicates whether values in the designated column are signed numbers. |
| [isSparseColumnSet](issparsecolumnset-method-sqlserverresultsetmetadata.md) | Indicates if a column in a result set is a sparse column set. |
| [isWritable](iswritable-method-sqlserverresultsetmetadata.md) | Indicates whether it is possible for a write on the designated column to succeed. |
  
## Inherited Methods  
  
| Class inherited from: | Methods |
| --- | --- |
| java.lang.Object | clone, equals, finalize, getClass, hashCode, notify, notifyAll, toString, wait |
| java.sql.Wrapper | isWrapperFor, unwrap |
  
## Related content

- [SQLServerResultSetMetaData Class](sqlserverresultsetmetadata-class.md)
