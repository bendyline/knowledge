---
description: "Learn more about: Oracle Data Type Mappings"
title: "Oracle Data Type Mappings"
ms.date: "03/30/2017"
ms.assetid: ec34ae21-bbbb-4adb-b672-83865e2a8451
---
# Oracle Data Type Mappings

The following table lists Oracle data types and their mappings to the [System.Data.OracleClient.OracleDataReader](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleDataReader).

| Oracle data type | .NET Framework data type returned by OracleDataReader.GetValue | OracleClient data type returned by OracleDataReader.GetOracleValue | Remarks |
| --- | --- | --- | --- |
| **BFILE** | **Byte[]** | [System.Data.OracleClient.OracleBFile](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleBFile) |  |
| **BLOB** | **Byte[]** | [System.Data.OracleClient.OracleLob](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleLob) |  |
| **CHAR** | **String** | [System.Data.OracleClient.OracleString](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleString) |  |
| **CLOB** | **String** | [System.Data.OracleClient.OracleLob](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleLob) |  |
| **DATE** | **DateTime** | [System.Data.OracleClient.OracleDateTime](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleDateTime) |  |
| **FLOAT** | **Decimal** | [System.Data.OracleClient.OracleNumber](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleNumber) | This data type is an alias for the `NUMBER` data type, and is designed so that the [System.Data.OracleClient.OracleDataReader](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleDataReader) returns a **System.Decimal** or [System.Data.OracleClient.OracleNumber](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleNumber) instead of a floating-point value. Using the .NET Framework data type can cause an overflow. |
| **INTEGER** | **Decimal** | [System.Data.OracleClient.OracleNumber](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleNumber) | This data type is an alias for the **NUMBER(38)** data type, and is designed so that the [System.Data.OracleClient.OracleDataReader](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleDataReader) returns a **System.Decimal** or [System.Data.OracleClient.OracleNumber](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleNumber) instead of an integer value. Using the .NET Framework data type can cause an overflow. |
| **INTERVAL YEAR TO MONTH** | **Int32** | [System.Data.OracleClient.OracleMonthSpan](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleMonthSpan) |  |
| **INTERVAL DAY TO SECOND** | **TimeSpan** | [System.Data.OracleClient.OracleTimeSpan](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleTimeSpan) |  |
| **LONG** | **String** | [System.Data.OracleClient.OracleString](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleString) |  |
| **LONG RAW** | **Byte[]** | [System.Data.OracleClient.OracleBinary](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleBinary) |  |
| **NCHAR** | **String** | [System.Data.OracleClient.OracleString](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleString) |  |
| **NCLOB** | **String** | [System.Data.OracleClient.OracleLob](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleLob) |  |
| **NUMBER** | **Decimal** | [System.Data.OracleClient.OracleNumber](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleNumber) | Using the .NET Framework data type can cause an overflow. |
| **NVARCHAR2** | **String** | [System.Data.OracleClient.OracleString](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleString) |  |
| **RAW** | **Byte[]** | [System.Data.OracleClient.OracleBinary](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleBinary) |  |
| **REF CURSOR** |  |  | The Oracle **REF CURSOR** data type is not supported by the [System.Data.OracleClient.OracleDataReader](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleDataReader) object. |
| **ROWID** | **String** | [System.Data.OracleClient.OracleString](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleString) |  |
| **TIMESTAMP** | **DateTime** | [System.Data.OracleClient.OracleDateTime](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleDateTime) |  |
| **TIMESTAMP WITH LOCAL TIME ZONE** | **DateTime** | [System.Data.OracleClient.OracleDateTime](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleDateTime) |  |
| **TIMESTAMP WITH TIME ZONE** | **DateTime** | [System.Data.OracleClient.OracleDateTime](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleDateTime) |  |
| **UNSIGNED INTEGER** | **Number** | [System.Data.OracleClient.OracleNumber](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleNumber) | This data type is an alias for the **NUMBER(38)** data type, and is designed so that the [System.Data.OracleClient.OracleDataReader](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleDataReader) returns a **System.Decimal** or [System.Data.OracleClient.OracleNumber](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleNumber) instead of an unsigned integer value. Using the .NET Framework data type can cause an overflow. |
| **VARCHAR2** | **String** | [System.Data.OracleClient.OracleString](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleString) |  |

 The following table lists Oracle data types and the .NET Framework data types (**System.Data.DbType** and [System.Data.OracleClient.OracleType](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleType)) to use when binding them as parameters.

| Oracle data type | DbType enumeration to bind as a parameter | OracleType enumeration to bind as a parameter | Remarks |
| --- | --- | --- | --- |
| **BFILE** |  | **BFile** | Oracle only allows binding a `BFILE` as a `BFILE` parameter. The .NET Data Provider for Oracle does not automatically construct one for you if you attempt to bind a non-**BFILE** value, such as `byte[]` or [System.Data.OracleClient.OracleBinary](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleBinary). |
| **BLOB** |  | **Blob** | Oracle only allows binding a `BLOB` as a `BLOB` parameter. The .NET Data Provider for Oracle does not automatically construct one for you if you attempt to bind a non-**BLOB** value, such as `byte[]` or [System.Data.OracleClient.OracleBinary](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleBinary). |
| **CHAR** | **AnsiStringFixedLength** | **Char** |  |
| **CLOB** |  | **Clob** | Oracle only allows binding a `CLOB` as a `CLOB` parameter. The .NET Data Provider for Oracle does not automatically construct one for you if you attempt to bind a non-**CLOB** value, such as **System.String** or [System.Data.OracleClient.OracleString](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleString). |
| **DATE** | **DateTime** | **DateTime** |  |
| **FLOAT** | **Single, Double, Decimal** | **Float, Double, Number** | [System.Data.OracleClient.OracleParameter.Size*](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleParameter.Size*) determines the **System.Data.DBType** and [System.Data.OracleClient.OracleType](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleType). |
| **INTEGER** | **SByte, Int16, Int32, Int64, Decimal** | **SByte, Int16, Int32, Number** | [System.Data.OracleClient.OracleParameter.Size*](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleParameter.Size*) determines the **System.Data.DBType** and [System.Data.OracleClient.OracleType](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleType). |
| **INTERVAL YEAR TO MONTH** | **Int32** | **IntervalYearToMonth** | [System.Data.OracleClient.OracleType](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleType) is only available when using both Oracle 9i client and server software. |
| **INTERVAL DAY TO SECOND** | **Object** | **IntervalDayToSecond** | [System.Data.OracleClient.OracleType](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleType) is only available when using both Oracle 9i client and server software. |
| **LONG** | **AnsiString** | **LongVarChar** |  |
| **LONG RAW** | **Binary** | **LongRaw** |  |
| **NCHAR** | **StringFixedLength** | **NChar** |  |
| **NCLOB** |  | **NClob** | Oracle only allows binding a `NCLOB` as a `NCLOB` parameter. The .NET Data Provider for Oracle does not automatically construct one for you if you attempt to bind a non-**NCLOB** value, such as **System.String** or [System.Data.OracleClient.OracleString](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleString). |
| **NUMBER** | **VarNumeric** | **Number** |  |
| **NVARCHAR2** | **String** | **NVarChar** |  |
| **RAW** | **Binary** | **Raw** |  |
| **REF CURSOR** |  | **Cursor** | For more information, see [Oracle REF CURSORs](oracle-ref-cursors.md). |
| **ROWID** | **AnsiString** | **Rowid** |  |
| **TIMESTAMP** | **DateTime** | **Timestamp** | [System.Data.OracleClient.OracleType](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleType) is only available when using both Oracle 9i client and server software. |
| **TIMESTAMP WITH LOCAL TIME ZONE** | **DateTime** | **TimestampLocal** | [System.Data.OracleClient.OracleType](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleType) is only available when using both Oracle 9i client and server software. |
| **TIMESTAMP WITH TIME ZONE** | **DateTime** | **TimestampWithTz** | [System.Data.OracleClient.OracleType](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleType) is only available when using both Oracle 9i client and server software. |
| **UNSIGNED INTEGER** | **Byte, UInt16, UInt32, UInt64, Decimal** | **Byte, UInt16, Uint32, Number** | [System.Data.OracleClient.OracleParameter.Size*](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleParameter.Size*) determines the **System.Data.DBType** and [System.Data.OracleClient.OracleType](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleType). |
| **VARCHAR2** | **AnsiString** | **VarChar** |  |

 The **InputOutput**, **Output**, and `ReturnValue` **ParameterDirection** values used by the [System.Data.OracleClient.OracleParameter.Value](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleParameter.Value) property of the [System.Data.OracleClient.OracleParameter](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleParameter) object are .NET Framework data types, unless the input value is an Oracle data type (for example, [System.Data.OracleClient.OracleNumber](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleNumber) or [System.Data.OracleClient.OracleString](https://learn.microsoft.com/search/?terms=System.Data.OracleClient.OracleString)). This does not apply to **REF CURSOR**, **BFILE**, or `LOB` data types.

## See also

- [Oracle and ADO.NET](oracle-and-adonet.md)
- [ADO.NET Overview](ado-net-overview.md)
