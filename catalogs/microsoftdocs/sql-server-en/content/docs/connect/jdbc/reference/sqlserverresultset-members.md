---
title: "SQLServerResultSet Members"
description: "SQLServerResultSet Members"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
---
# SQLServerResultSet Members


  The following tables list the members that are exposed by the [SQLServerResultSet](sqlserverresultset-class.md) class.  
  
## Constructors  
 None.  
  
## Fields  
  
| Name | Description |
| --- | --- |
| [CONCUR_SS_OPTIMISTIC_CC](concur-ss-optimistic-cc-field-sqlserverresultset.md) | Used to specify a  SQL Server |
 | read/write optimistic concurrency type with no row locks. |
| [CONCUR_SS_OPTIMISTIC_CCVAL](concur-ss-optimistic-ccval-field-sqlserverresultset.md) | Used to specify a  SQL Server |
 | read/write optimistic concurrency type with no row locks. |
| [CONCUR_SS_SCROLL_LOCKS](concur-ss-scroll-locks-field-sqlserverresultset.md) | Used to specify a  SQL Server |
 | read/write optimistic concurrency type with row locks. |
| [TYPE_SS_DIRECT_FORWARD_ONLY](type-ss-direct-forward-only-field-sqlserverresultset.md) | Used to specify a  SQL Server |
 | fast forward-only, read-only cursor type. |
| [TYPE_SS_SCROLL_DYNAMIC](type-ss-scroll-dynamic-field-sqlserverresultset.md) | Used to specify a  SQL Server |
 | dynamic cursor type. |
| [TYPE_SS_SCROLL_KEYSET](type-ss-scroll-keyset-field-sqlserverresultset.md) | Used to specify a  SQL Server |
 | keyset cursor type. |
| [TYPE_SS_SCROLL_STATIC](type-ss-scroll-static-field-sqlserverresultset.md) | Used to specify a  SQL Server |
 | static cursor type. |
| [TYPE_SS_SERVER_CURSOR_FORWARD_ONLY](type-ss-server-cursor-forward-only-field-sqlserverresultset.md) | Used to specify a  SQL Server |
 | fast forward-only, read-only cursor type. |
  
## Inherited Fields  
  
| Class inherited from: | Description |
| --- | --- |
| java.sql.ResultSet | CLOSE_CURSORS_AT_COMMIT, CONCUR_READ_ONLY, CONCUR_UPDATABLE, FETCH_FORWARD, FETCH_REVERSE, FETCH_UNKNOWN, HOLD_CURSORS_OVER_COMMIT, TYPE_FORWARD_ONLY, TYPE_SCROLL_INSENSITIVE, TYPE_SCROLL_SENSITIVE |
  
## Methods  
  
| Name | Description |
| --- | --- |
| [absolute](absolute-method-sqlserverresultset.md) | Moves the cursor to the specified row in this [SQLServerResultSet](sqlserverresultset-class.md) object. |
| [afterLast](afterlast-method-sqlserverresultset.md) | Moves the cursor to after the last row of this [SQLServerResultSet](sqlserverresultset-class.md) object. |
| [beforeFirst](beforefirst-method-sqlserverresultset.md) | Moves the cursor to before the first row of this [SQLServerResultSet](sqlserverresultset-class.md) object. |
| [cancelRowUpdates](cancelrowupdates-method-sqlserverresultset.md) | Cancels the updates made to the current row in this [SQLServerResultSet](sqlserverresultset-class.md) object. |
| [clearWarnings](clearwarnings-method-sqlserverresultset.md) | Clears all warnings reported on this [SQLServerResultSet](sqlserverresultset-class.md) object. |
| [close](close-method-sqlserverresultset.md) | Releases this [SQLServerResultSet](sqlserverresultset-class.md) object's database and JDBC resources immediately instead of waiting for this to happen when it is automatically closed. |
| [deleteRow](deleterow-method-sqlserverresultset.md) | Deletes the current row from this[SQLServerResultSet](sqlserverresultset-class.md) object and from the underlying database. |
| [finalize](finalize-method-sqlserverresultset.md) | Explicitly closes this [SQLServerResultSet](sqlserverresultset-class.md) object. |
| [findColumn](findcolumn-method-sqlserverresultset.md) | Retrieves the index of the first matching column for the specified column name in this [SQLServerResultSet](sqlserverresultset-class.md) object. |
| [first](first-method-sqlserverresultset.md) | Moves the cursor to the first row of this [SQLServerResultSet](sqlserverresultset-class.md) object. |
| [getArray](getarray-method-sqlserverresultset.md) | Retrieves the value of the designated column in the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object as an Array object. |
| [getAsciiStream](getasciistream-method-sqlserverresultset.md) | Retrieves the value of the designated column in the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object as a stream of ASCII characters. |
| [getBigDecimal](getbigdecimal-method-sqlserverresultset.md) | Retrieves the value of the designated column index in the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object as a java.math.BigDecimal. |
| [getBinaryStream](getbinarystream-method-sqlserverresultset.md) | Retrieves the value of the designated column in the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object as a binary stream of uninterpreted bytes. |
| [getBlob](getblob-method-sqlserverresultset.md) | Retrieves the value of the designated column in the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object as a Blob object in the Java programming language. |
| [getBoolean](getboolean-method-sqlserverresultset.md) | Retrieves the value of the designated column in the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object as a **boolean** in the Java programming language. |
| [getByte](getbyte-method-sqlserverresultset.md) | Retrieves the value of the designated column in the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object as a **byte** in the Java programming language. |
| [getBytes](getbytes-method-sqlserverresultset.md) | Retrieves the value of the designated column in the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object as a **byte** array in the Java programming language. |
| [getCharacterStream](getcharacterstream-method-sqlserverresultset.md) | Retrieves the value of the designated column in the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object as a java.io.Reader object. |
| [getClob](getclob-method-sqlserverresultset.md) | Retrieves the value of the designated column in the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object as a Clob object in the Java programming language. |
| [getConcurrency](getconcurrency-method-sqlserverresultset.md) | Retrieves the concurrency mode of this [SQLServerResultSet](sqlserverresultset-class.md) object. |
| [getCursorName](getcursorname-method-sqlserverresultset.md) | Retrieves the name of the SQL cursor used by this [SQLServerResultSet](sqlserverresultset-class.md) object. |
| [getDate](getdate-method-sqlserverresultset.md) | Retrieves the value of the designated column in the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object as a java.sql.Date object in the Java programming language. |
| [getDateTimeOffset](getdatetimeoffset-sqlserverresultset.md) | Retrieves the value of the specified column as a[DateTimeOffset Class](datetimeoffset-class.md) object. |
| [getDouble](getdouble-method-sqlserverresultset.md) | Retrieves the value of the designated column in the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object as a **double** in the Java programming language. |
| [getFetchDirection](getfetchdirection-method-sqlserverresultset.md) | Retrieves the fetch direction for this [SQLServerResultSet](sqlserverresultset-class.md) object. |
| [getFetchSize](getfetchsize-method-sqlserverresultset.md) | Retrieves the fetch size for this [SQLServerResultSet](sqlserverresultset-class.md) object. |
| [getFloat](getfloat-method-sqlserverresultset.md) | Retrieves the value of the designated column in the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object as a **float** in the Java programming language. |
| [getHoldability](getholdability-method-sqlserverresultset.md) | Retrieves the holdability of this [SQLServerResultSet](sqlserverresultset-class.md) object. |
| [getInt](getint-method-sqlserverresultset.md) | Retrieves the value of the designated column in the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object as an **int** in the Java programming language. |
| [getLong](getlong-method-sqlserverresultset.md) | Retrieves the value of the designated column in the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object as a **long** in the Java programming language. |
| [getMetaData](getmetadata-method-sqlserverresultset.md) | Retrieves the number, types, and properties of this [SQLServerResultSet](sqlserverresultset-class.md) object's columns. |
| [getNCharacterStream](getncharacterstream-method-sqlserverresultset.md) | Retrieves the value of the designated column in the current row of the [SQLServerResultSet](sqlserverresultset-class.md) object as a Reader object. |
| [getNClob](getnclob-method-sqlserverresultset.md) | Retrieves the value of the designated column in the current row of the  [SQLServerResultSet](sqlserverresultset-class.md) object as an **NClob** object in the Java programming language. |
| [getNString](getnstring-method-sqlserverresultset.md) | Retrieves the value of the designated column in the current row of the [SQLServerResultSet](sqlserverresultset-class.md) object as a String in the Java programming language. |
| [getObject](getobject-method-sqlserverresultset.md) | Gets the value of the designated column in the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object as an object in the Java programming language. |
| [getRef](getref-method-sqlserverresultset.md) | Retrieves the value of the designated column in the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object as a Ref object in the Java programming language. |
| [getRow](getrow-method-sqlserverresultset.md) | Retrieves the current row number. |
| [getShort](getshort-method-sqlserverresultset.md) | Retrieves the value of the designated column in the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object as a **short** in the Java programming language. |
| [getStatement](getstatement-method-sqlserverresultset.md) | Retrieves the [SQLServerStatement](sqlserverstatement-class.md) object that produced this [SQLServerResultSet](sqlserverresultset-class.md) object. |
| [getString](getstring-method-sqlserverresultset.md) | Retrieves the value of the designated column in the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object as a **String** in the Java programming language. |
| [getSQLXML](getsqlxml-method-sqlserverresultset.md) | Retrieves the value of the designated column in the current row of the [SQLServerResultSet](sqlserverresultset-class.md) object as a **SQLXML** object. |
| [getTime](gettime-method-sqlserverresultset.md) | Retrieves the value of the designated column in the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object as a java.sql.Time object in the Java programming language. |
| [getTimestamp](gettimestamp-method-sqlserverresultset.md) | Retrieves the value of the designated column in the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object as a java.sql.Timestamp object in the Java programming language. |
| [getType](gettype-method-sqlserverresultset.md) | Retrieves the cursor type of this [SQLServerResultSet](sqlserverresultset-class.md) object. |
| [getUnicodeStream](getunicodestream-method-sqlserverresultset.md) | Retrieves the value of the designated column in the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object as a stream of Unicode characters. |
| [getURL](geturl-method-sqlserverresultset.md) | Retrieves the value of the designated column in the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object as a URL object. |
| [getWarnings](getwarnings-method-sqlserverresultset.md) | Retrieves the first warning reported by calls on this [SQLServerResultSet](sqlserverresultset-class.md) object. |
| [insertRow](insertrow-method-sqlserverresultset.md) | Inserts the contents of the insert row into this [SQLServerResultSet](sqlserverresultset-class.md) object and into the database. |
| [isAfterLast](isafterlast-method-sqlserverresultset.md) | Retrieves whether the cursor is after the last row in this [SQLServerResultSet](sqlserverresultset-class.md) object. |
| [isBeforeFirst](isbeforefirst-method-sqlserverresultset.md) | Retrieves whether the cursor is before the first row in this [SQLServerResultSet](sqlserverresultset-class.md) object. |
| [isClosed](isclosed-method-sqlserverresultset.md) | Indicates whether this [SQLServerResultSet](sqlserverresultset-class.md) object has been closed. |
| [isFirst](isfirst-method-sqlserverresultset.md) | Retrieves whether the cursor is on the first row of this [SQLServerResultSet](sqlserverresultset-class.md) object. |
| [isLast](islast-method-sqlserverresultset.md) | Retrieves whether the cursor is on the last row of this [SQLServerResultSet](sqlserverresultset-class.md) object. |
| [last](last-method-sqlserverresultset.md) | Moves the cursor to the last row in this [SQLServerResultSet](sqlserverresultset-class.md) object. |
| [moveToCurrentRow](movetocurrentrow-method-sqlserverresultset.md) | Moves the cursor to the remembered cursor position, usually the current row. |
| [moveToInsertRow](movetoinsertrow-method-sqlserverresultset.md) | Moves the cursor to the insert row. |
| [next](next-method-sqlserverresultset.md) | Moves the cursor down one row from its current position. |
| [previous](previous-method-sqlserverresultset.md) | Moves the cursor to the previous row in this [SQLServerResultSet](sqlserverresultset-class.md) object. |
| [refreshRow](refreshrow-method-sqlserverresultset.md) | Refreshes the current row with its most recent value in the database. |
| [relative](relative-method-sqlserverresultset.md) | Moves the cursor the given amount of rows, relative to the current row, in either a positive or a negative direction. |
| [rowDeleted](rowdeleted-method-sqlserverresultset.md) | Retrieves whether a row has been deleted. |
| [rowInserted](rowinserted-method-sqlserverresultset.md) | Retrieves whether the current row has had an insertion. |
| [rowUpdated](rowupdated-method-sqlserverresultset.md) | Retrieves whether the current row has been updated. |
| [setFetchDirection](setfetchdirection-method-sqlserverresultset.md) | Gives a hint as to the direction in which the rows in this [SQLServerResultSet](sqlserverresultset-class.md) object will be processed. |
| [setFetchSize](setfetchsize-method-sqlserverresultset.md) | Gives the JDBC driver a hint as to the number of rows that should be fetched from the database when more rows are needed for this [SQLServerResultSet](sqlserverresultset-class.md) object. |
| [updateArray](updatearray-method-sqlserverresultset.md) | Updates the designated column with an Array object. |
| [updateAsciiStream](updateasciistream-method-sqlserverresultset.md) | Updates the designated column with an ASCII stream value. |
| [updateBigDecimal](updatebigdecimal-method-sqlserverresultset.md) | Updates the designated column with a BigDecimal object. |
| [updateBinaryStream](updatebinarystream-method-sqlserverresultset.md) | Updates the designated column with a binary stream value. |
| [updateBlob](updateblob-method-sqlserverresultset.md) | Updates the designated column with a java.sql.Blob value. |
| [updateBoolean](updateboolean-method-sqlserverresultset.md) | Updates the designated column with a **boolean** value. |
| [updateByte](updatebyte-method-sqlserverresultset.md) | Updates the designated column with a **byte** value. |
| [updateBytes](updatebytes-method-sqlserverresultset.md) | Updates the designated column with an array of **byte** values. |
| [updateCharacterStream](updatecharacterstream-method-sqlserverresultset.md) | Updates the designated column with a character stream value. |
| [updateClob](updateclob-method-sqlserverresultset.md) | Updates the designated column with a java.sql.Clob value. |
| [updateDate](updatedate-method-sqlserverresultset.md) | Updates the designated column with a date value. |
| [updateDateTimeOffset](updatedatetimeoffset-sqlserverresultset.md) | Updates a [DateTimeOffset Class](datetimeoffset-class.md) column. |
| [updateDouble](updatedouble-method-sqlserverresultset.md) | Updates the designated column with a **double** value. |
| [updateFloat](updatefloat-method-sqlserverresultset.md) | Updates the designated column with a **float** value. |
| [updateInt](updateint-method-sqlserverresultset.md) | Updates the designated column with an **int** value. |
| [updateLong](updatelong-method-sqlserverresultset.md) | Updates the designated column with a **long** value. |
| [updateNCharacterStream](updatencharacterstream-method-sqlserverresultset.md) | Updates the designated column with a character stream value. |
| [updateNClob](updatenclob-method-sqlserverresultset.md) | Updates the designated column with the specified object value. |
| [updateNString](updatenstring-method-sqlserverresultset.md) | Updates the designated column with a **String** value. |
| [updateNull](updatenull-method-sqlserverresultset.md) | Updates the designated column with a null value. |
| [updateObject](updateobject-method-sqlserverresultset.md) | Updates the designated column with an **Object** value. |
| [updateRef](updateref-method-sqlserverresultset.md) | Updates the designated column with a java.sql.Ref value. |
| [updateRow](updaterow-method-sqlserverresultset.md) | Updates the underlying database with the new contents of the current row of this [SQLServerResultSet](sqlserverresultset-class.md) object. |
| [updateShort](updateshort-method-sqlserverresultset.md) | Updates the designated column with a **short** value. |
| [updateString](updatestring-method-sqlserverresultset.md) | Updates the designated column with a **String** value. |
| [updateSQLXML](updatesqlxml-method-sqlserverresultset.md) | Updates the designated column with a **SQLXML** value. |
| [updateTime](updatetime-method-sqlserverresultset.md) | Updates the designated column with a time value. |
| [updateTimestamp](updatetimestamp-method-sqlserverresultset.md) | Updates the designated column with a timestamp value. |
| [wasNull](wasnull-method-sqlserverresultset.md) | Verifies whether the last value read was a null value. |
  
## Inherited Methods  
  
| Class inherited from: | Methods |
| --- | --- |
| java.lang.Object | clone, equals, getClass, hashCode, notify, notifyAll, toString, wait |
| java.sql.Wrapper | isWrapperFor, unwrap |
  
## Related content

- [SQLServerResultSet Class](sqlserverresultset-class.md)
