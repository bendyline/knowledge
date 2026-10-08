---
description: "Learn more about: SQL-CLR Type Mapping"
title: "SQL-CLR Type Mapping"
ms.date: "07/23/2018"
ms.assetid: 4ed76327-54a7-414b-82a9-7579bfcec04b
---
# SQL-CLR Type Mapping

In LINQ to SQL, the data model of a relational database maps to an object model that is expressed in the programming language of your choice. When the application runs, LINQ to SQL translates the language-integrated queries in the object model into SQL and sends them to the database for execution. When the database returns the results, LINQ to SQL translates the results back to objects that you can work with in your own programming language.

 In order to translate data between the object model and the database, a *type mapping* must be defined. LINQ to SQL uses a type mapping to match each common language runtime (CLR) type with a particular SQL Server type. You can define type mappings and other mapping information, such as database structure and table relationships, inside the object model with attribute-based mapping. Alternatively, you can specify the mapping information outside the object model with an external mapping file. For more information, see [Attribute-Based Mapping](attribute-based-mapping.md) and [External Mapping](external-mapping.md).

 This topic discusses the following points:

- [Default Type Mapping](#DefaultTypeMapping)

- [Type Mapping Runtime Behavior Matrix](#BehaviorMatrix)

- [Behavior Differences Between CLR and SQL Execution](#BehaviorDiffs)

- [Enum Mapping](#EnumMapping)

- [Numeric Mapping](#NumericMapping)

- [Text and XML Mapping](#TextMapping)

- [Date and Time Mapping](#DateMapping)

- [Binary Mapping](#BinaryMapping)

- [Miscellaneous Mapping](#MiscMapping)

<a name="DefaultTypeMapping"></a>

## Default Type Mapping

 You can create the object model or external mapping file automatically with the Object Relational Designer (O/R Designer) or the SQLMetal command-line tool. The default type mappings for these tools define which CLR types are chosen to map to columns inside the SQL Server database. For more information about using these tools, see [Creating the Object Model](creating-the-object-model.md).

 You can also use the [System.Data.Linq.DataContext.CreateDatabase*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.CreateDatabase*) method to create a SQL Server database based on the mapping information in the object model or external mapping file. The default type mappings for the [System.Data.Linq.DataContext.CreateDatabase*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.CreateDatabase*) method define which type of SQL Server columns are created to map to the CLR types in the object model. For more information, see [How to: Dynamically Create a Database](how-to-dynamically-create-a-database.md).

<a name="BehaviorMatrix"></a>

## Type Mapping Runtime Behavior Matrix

 The following diagram shows the expected runtime behavior of specific type mappings when data is retrieved from or saved to the database. With the exception of serialization, LINQ to SQL does not support mapping between any CLR or SQL Server data types that are not specified in this matrix. For more information on serialization support, see [Binary Serialization](#BinarySerialization).

SQL Server to SQL CLR data type mapping table

> **Note:**
> Some type mappings may result in overflow or data loss exceptions while translating to or from the database.

### Custom Type Mapping

 With LINQ to SQL, you are not limited to the default type mappings used by the O/R Designer, SQLMetal, and the [System.Data.Linq.DataContext.CreateDatabase*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.CreateDatabase*) method. You can create custom type mappings by explicitly specifying them in a DBML file. Then you can use that DBML file to create the object model code and mapping file. For more information, see [SQL-CLR Custom Type Mappings](sql-clr-custom-type-mappings.md).

<a name="BehaviorDiffs"></a>

## Behavior Differences Between CLR and SQL Execution

 Because of differences in precision and execution between the CLR and SQL Server, you may receive different results or experience different behavior depending on where you perform your calculations. Calculations performed in LINQ to SQL queries are actually translated to Transact-SQL and then executed on the SQL Server database. Calculations performed outside LINQ to SQL queries are executed within the context of the CLR.

 For example, the following are some differences in behavior between the CLR and SQL Server:

- SQL Server orders some data types differently than data of equivalent type in the CLR. For example, SQL Server data of type `UNIQUEIDENTIFIER` is ordered differently than CLR data of type [System.Guid](https://learn.microsoft.com/search/?terms=System.Guid).

- SQL Server handles some string comparison operations differently than the CLR. In SQL Server, string comparison behavior depends on the collation settings on the server. For more information, see [Working with Collations](https://learn.microsoft.com/previous-versions/sql/sql-server-2008-r2/ms187582\(v=sql.105\)).

- SQL Server may return different values for some mapped functions than the CLR. For example, equality functions will differ because SQL Server considers two strings to be equal if they only differ in trailing white space; whereas the CLR considers them to be not equal.

<a name="EnumMapping"></a>

## Enum Mapping

 LINQ to SQL supports mapping the CLR [System.Enum](https://learn.microsoft.com/search/?terms=System.Enum) type to SQL Server types in two ways:

- Mapping to SQL numeric types (`TINYINT`, `SMALLINT`, `INT`, `BIGINT`)

     When you map a CLR [System.Enum](https://learn.microsoft.com/search/?terms=System.Enum) type to a SQL numeric type, you map the underlying integer value of the CLR [System.Enum](https://learn.microsoft.com/search/?terms=System.Enum) to the value of the SQL Server database column. For example, if a [System.Enum](https://learn.microsoft.com/search/?terms=System.Enum) named `DaysOfWeek` contains a member named `Tue` with an underlying integer value of 3, that member maps to a database value of 3.

- Mapping to SQL text types (`CHAR`, `NCHAR`, `VARCHAR`, `NVARCHAR`)

     When you map a CLR [System.Enum](https://learn.microsoft.com/search/?terms=System.Enum) type to a SQL text type, the SQL database value is mapped to the names of the CLR [System.Enum](https://learn.microsoft.com/search/?terms=System.Enum) members. For example, if a [System.Enum](https://learn.microsoft.com/search/?terms=System.Enum) named `DaysOfWeek` contains a member named `Tue` with an underlying integer value of 3, that member maps to a database value of `Tue`.

> **Note:**
> When mapping SQL text types to a CLR [System.Enum](https://learn.microsoft.com/search/?terms=System.Enum), include only the names of the [System.Enum](https://learn.microsoft.com/search/?terms=System.Enum) members in the mapped SQL column. Other values are not supported in the [System.Enum](https://learn.microsoft.com/search/?terms=System.Enum)-mapped SQL column.

 The O/R Designer and SQLMetal command-line tool cannot automatically map a SQL type to a CLR [System.Enum](https://learn.microsoft.com/search/?terms=System.Enum) class. You must explicitly configure this mapping by customizing a DBML file for use by the O/R Designer and SQLMetal. For more information about custom type mapping, see [SQL-CLR Custom Type Mappings](sql-clr-custom-type-mappings.md).

 Because a SQL column intended for enumeration will be of the same type as other numeric and text columns; these tools will not recognize your intent and default to mapping as described in the following [Numeric Mapping](#NumericMapping) and [Text and XML Mapping](#TextMapping) sections. For more information about generating code with the DBML file, see [Code Generation in LINQ to SQL](code-generation-in-linq-to-sql.md).

 The [System.Data.Linq.DataContext.CreateDatabase*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.CreateDatabase*) method creates a SQL column of numeric type to map a CLR [System.Enum](https://learn.microsoft.com/search/?terms=System.Enum) type.

<a name="NumericMapping"></a>

## Numeric Mapping

 LINQ to SQL lets you map many CLR and SQL Server numeric types. The following table shows the CLR types that O/R Designer and SQLMetal select when building an object model or external mapping file based on your database.

| SQL Server Type | Default CLR Type mapping used by O/R Designer and SQLMetal |
| --- | --- |
| `BIT` | [System.Boolean](https://learn.microsoft.com/search/?terms=System.Boolean) |
| `TINYINT` | [System.Int16](https://learn.microsoft.com/search/?terms=System.Int16) |
| `INT` | [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32) |
| `BIGINT` | [System.Int64](https://learn.microsoft.com/search/?terms=System.Int64) |
| `SMALLMONEY` | [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal) |
| `MONEY` | [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal) |
| `DECIMAL` | [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal) |
| `NUMERIC` | [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal) |
| `REAL/FLOAT(24)` | [System.Single](https://learn.microsoft.com/search/?terms=System.Single) |
| `FLOAT/FLOAT(53)` | [System.Double](https://learn.microsoft.com/search/?terms=System.Double) |

 The next table shows the default type mappings used by the [System.Data.Linq.DataContext.CreateDatabase*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.CreateDatabase*) method to define which type of SQL columns are created to map to the CLR types defined in your object model or external mapping file.

| CLR Type | Default SQL Server Type used by [System.Data.Linq.DataContext.CreateDatabase*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.CreateDatabase*) |
| --- | --- |
| [System.Boolean](https://learn.microsoft.com/search/?terms=System.Boolean) | `BIT` |
| [System.Byte](https://learn.microsoft.com/search/?terms=System.Byte) | `TINYINT` |
| [System.Int16](https://learn.microsoft.com/search/?terms=System.Int16) | `SMALLINT` |
| [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32) | `INT` |
| [System.Int64](https://learn.microsoft.com/search/?terms=System.Int64) | `BIGINT` |
| [System.SByte](https://learn.microsoft.com/search/?terms=System.SByte) | `SMALLINT` |
| [System.UInt16](https://learn.microsoft.com/search/?terms=System.UInt16) | `INT` |
| [System.UInt32](https://learn.microsoft.com/search/?terms=System.UInt32) | `BIGINT` |
| [System.UInt64](https://learn.microsoft.com/search/?terms=System.UInt64) | `DECIMAL(20)` |
| [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal) | `DECIMAL(29,4)` |
| [System.Single](https://learn.microsoft.com/search/?terms=System.Single) | `REAL` |
| [System.Double](https://learn.microsoft.com/search/?terms=System.Double) | `FLOAT` |

 There are many other numeric mappings you can choose, but some may result in overflow or data loss exceptions while translating to or from the database. For more information, see the [Type Mapping Run Time Behavior Matrix](#BehaviorMatrix).

### Decimal and Money Types

 The default precision of SQL Server `DECIMAL` type (18 decimal digits to the left and right of the decimal point) is much smaller than the precision of the CLR [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal) type that it is paired with by default. This can result in precision loss when you save data to the database. However, just the opposite can happen if the SQL Server `DECIMAL` type is configured with greater than 29 digits of precision. When a SQL Server `DECIMAL` type has been configured with a greater precision than the CLR [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal), precision loss can occur when retrieving data from the database.

 The SQL Server `MONEY` and `SMALLMONEY` types, which are also paired with the CLR [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal) type by default, have a much smaller precision, which can result in overflow or data loss exceptions when saving data to the database.

<a name="TextMapping"></a>

## Text and XML Mapping

 There are also many text-based and XML types that you can map with LINQ to SQL. The following table shows the CLR types that O/R Designer and SQLMetal select when building an object model or external mapping file based on your database.

| SQL Server Type | Default CLR Type mapping used by O/R Designer and SQLMetal |
| --- | --- |
| `CHAR` | [System.String](https://learn.microsoft.com/search/?terms=System.String) |
| `NCHAR` | [System.String](https://learn.microsoft.com/search/?terms=System.String) |
| `VARCHAR` | [System.String](https://learn.microsoft.com/search/?terms=System.String) |
| `NVARCHAR` | [System.String](https://learn.microsoft.com/search/?terms=System.String) |
| `TEXT` | [System.String](https://learn.microsoft.com/search/?terms=System.String) |
| `NTEXT` | [System.String](https://learn.microsoft.com/search/?terms=System.String) |
| `XML` | [System.Xml.Linq.XElement](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement) |

 The next table shows the default type mappings used by the [System.Data.Linq.DataContext.CreateDatabase*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.CreateDatabase*) method to define which type of SQL columns are created to map to the CLR types defined in your object model or external mapping file.

| CLR Type | Default SQL Server Type used by [System.Data.Linq.DataContext.CreateDatabase*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.CreateDatabase*) |
| --- | --- |
| [System.Char](https://learn.microsoft.com/search/?terms=System.Char) | `NCHAR(1)` |
| [System.String](https://learn.microsoft.com/search/?terms=System.String) | `NVARCHAR(4000)` |
| [System.Char](https://learn.microsoft.com/search/?terms=System.Char)[] | `NVARCHAR(4000)` |
| Custom type implementing `Parse()` and `ToString()` | `NVARCHAR(MAX)` |

 There are many other text-based and XML mappings you can choose, but some may result in overflow or data loss exceptions while translating to or from the database. For more information, see the [Type Mapping Run Time Behavior Matrix](#BehaviorMatrix).

### XML Types

 The SQL Server `XML` data type is available starting in Microsoft SQL Server 2005. You can map the SQL Server `XML` data type to [System.Xml.Linq.XElement](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement), [System.Xml.Linq.XDocument](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XDocument), or [System.String](https://learn.microsoft.com/search/?terms=System.String). If the column stores XML fragments that cannot be read into [System.Xml.Linq.XElement](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement), the column must be mapped to [System.String](https://learn.microsoft.com/search/?terms=System.String) to avoid runtime errors. XML fragments that must be mapped to [System.String](https://learn.microsoft.com/search/?terms=System.String) include the following:

- A sequence of XML elements

- Attributes

- Public Identifiers (PI)

- Comments

 Although you can map [System.Xml.Linq.XElement](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement) and [System.Xml.Linq.XDocument](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XDocument) to SQL Server as shown in the [Type Mapping Run Time Behavior Matrix](#BehaviorMatrix), the [System.Data.Linq.DataContext.CreateDatabase*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.CreateDatabase*) method has no default SQL Server type mapping for these types.

### Custom Types

 If a class implements `Parse()` and `ToString()`, you can map the object to any SQL text type (`CHAR`, `NCHAR`, `VARCHAR`, `NVARCHAR`, `TEXT`, `NTEXT`, `XML`). The object is stored in the database by sending the value returned by `ToString()` to the mapped database column. The object is reconstructed by invoking `Parse()` on the string returned by the database.

> **Note:**
> LINQ to SQL does not support serialization by using [System.Xml.Serialization.IXmlSerializable](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.IXmlSerializable).

<a name="DateMapping"></a>

## Date and Time Mapping

 With LINQ to SQL, you can map many SQL Server date and time types. The following table shows the CLR types that O/R Designer and SQLMetal select when building an object model or external mapping file based on your database.

| SQL Server Type | Default CLR Type mapping used by O/R Designer and SQLMetal |
| --- | --- |
| `SMALLDATETIME` | [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) |
| `DATETIME` | [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) |
| `DATETIME2` | [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) |
| `DATETIMEOFFSET` | [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) |
| `DATE` | [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) |
| `TIME` | [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) |

 The next table shows the default type mappings used by the [System.Data.Linq.DataContext.CreateDatabase*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.CreateDatabase*) method to define which type of SQL columns are created to map to the CLR types defined in your object model or external mapping file.

| CLR Type | Default SQL Server Type used by [System.Data.Linq.DataContext.CreateDatabase*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.CreateDatabase*) |
| --- | --- |
| [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) | `DATETIME` |
| [System.DateTimeOffset](https://learn.microsoft.com/search/?terms=System.DateTimeOffset) | `DATETIMEOFFSET` |
| [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) | `TIME` |

 There are many other date and time mappings you can choose, but some may result in overflow or data loss exceptions while translating to or from the database. For more information, see the [Type Mapping Run Time Behavior Matrix](#BehaviorMatrix).

> **Note:**
> The SQL Server types `DATETIME2`, `DATETIMEOFFSET`, `DATE`, and `TIME` are available starting with Microsoft SQL Server 2008. LINQ to SQL supports mapping to these new types starting with the .NET Framework version 3.5 SP1.

### System.Datetime

 The range and precision of the CLR [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) type is greater than the range and precision of the SQL Server `DATETIME` type, which is the default type mapping for the [System.Data.Linq.DataContext.CreateDatabase*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.CreateDatabase*) method. To help avoid exceptions related to dates outside the range of `DATETIME`, use `DATETIME2`, which is available starting with Microsoft SQL Server 2008. `DATETIME2` can match the range and precision of the CLR [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime).

 SQL Server dates have no concept of [System.TimeZone](https://learn.microsoft.com/search/?terms=System.TimeZone), a feature that is richly supported in the CLR. [System.TimeZone](https://learn.microsoft.com/search/?terms=System.TimeZone) values are saved as is to the database without [System.TimeZone](https://learn.microsoft.com/search/?terms=System.TimeZone) conversion, regardless of the original [System.DateTimeKind](https://learn.microsoft.com/search/?terms=System.DateTimeKind) information. When [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) values are retrieved from the database, their value is loaded as is into a [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) with a [System.DateTimeKind](https://learn.microsoft.com/search/?terms=System.DateTimeKind) of [System.DateTimeKind.Unspecified](https://learn.microsoft.com/search/?terms=System.DateTimeKind.Unspecified). For more information about supported [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) methods, see [System.DateTime Methods](system-datetime-methods.md).

### System.TimeSpan

 Microsoft SQL Server 2008 and the .NET Framework 3.5 SP1 let you map the CLR [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) type to the SQL Server `TIME` type. However, there is a large difference between the range that the CLR [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) supports and what the SQL Server `TIME` type supports. Mapping values less than 0 or greater than 23:59:59.9999999 hours to the SQL `TIME` will result in overflow exceptions. For more information, see [System.TimeSpan Methods](system-timespan-methods.md).

 In Microsoft SQL Server 2000 and SQL Server 2005, you cannot map database fields to [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan). However, operations on [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) are supported because [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) values can be returned from [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) subtraction or introduced into an expression as a literal or bound variable.

<a name="BinaryMapping"></a>

## Binary Mapping

 There are many SQL Server types that can map to the CLR type [System.Data.Linq.Binary](https://learn.microsoft.com/search/?terms=System.Data.Linq.Binary). The following table shows the SQL Server types that cause O/R Designer and SQLMetal to define a CLR [System.Data.Linq.Binary](https://learn.microsoft.com/search/?terms=System.Data.Linq.Binary) type when building an object model or external mapping file based on your database.

| SQL Server Type | Default CLR Type mapping used by O/R Designer and SQLMetal |
| --- | --- |
| `BINARY(50)` | [System.Data.Linq.Binary](https://learn.microsoft.com/search/?terms=System.Data.Linq.Binary) |
| `VARBINARY(50)` | [System.Data.Linq.Binary](https://learn.microsoft.com/search/?terms=System.Data.Linq.Binary) |
| `VARBINARY(MAX)` | [System.Data.Linq.Binary](https://learn.microsoft.com/search/?terms=System.Data.Linq.Binary) |
| `VARBINARY(MAX)` with the `FILESTREAM` attribute | [System.Data.Linq.Binary](https://learn.microsoft.com/search/?terms=System.Data.Linq.Binary) |
| `IMAGE` | [System.Data.Linq.Binary](https://learn.microsoft.com/search/?terms=System.Data.Linq.Binary) |
| `TIMESTAMP` | [System.Data.Linq.Binary](https://learn.microsoft.com/search/?terms=System.Data.Linq.Binary) |

 The next table shows the default type mappings used by the [System.Data.Linq.DataContext.CreateDatabase*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.CreateDatabase*) method to define which type of SQL columns are created to map to the CLR types defined in your object model or external mapping file.

| CLR Type | Default SQL Server Type used by [System.Data.Linq.DataContext.CreateDatabase*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.CreateDatabase*) |
| --- | --- |
| [System.Data.Linq.Binary](https://learn.microsoft.com/search/?terms=System.Data.Linq.Binary) | `VARBINARY(MAX)` |
| [System.Byte](https://learn.microsoft.com/search/?terms=System.Byte) | `VARBINARY(MAX)` |
| [System.Runtime.Serialization.ISerializable](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.ISerializable) | `VARBINARY(MAX)` |

 There are many other binary mappings you can choose, but some may result in overflow or data loss exceptions while translating to or from the database. For more information, see the [Type Mapping Run Time Behavior Matrix](#BehaviorMatrix).

### SQL Server FILESTREAM

 The `FILESTREAM` attribute for `VARBINARY(MAX)` columns is available starting with Microsoft SQL Server 2008; you can map to it with LINQ to SQL starting with the .NET Framework version 3.5 SP1.

 Although you can map `VARBINARY(MAX)` columns with the `FILESTREAM` attribute to [System.Data.Linq.Binary](https://learn.microsoft.com/search/?terms=System.Data.Linq.Binary) objects, the [System.Data.Linq.DataContext.CreateDatabase*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.CreateDatabase*) method is unable to automatically create columns with the `FILESTREAM` attribute. For more information about `FILESTREAM`, see [FILESTREAM Overview](https://learn.microsoft.com/previous-versions/sql/sql-server-2008-r2/bb933993\(v=sql.105\)).

<a name="BinarySerialization"></a>

### Binary Serialization

 If a class implements the [System.Runtime.Serialization.ISerializable](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.ISerializable) interface, you can serialize an object to any SQL binary field (`BINARY`, `VARBINARY`, `IMAGE`). The object is serialized and deserialized according to how the [System.Runtime.Serialization.ISerializable](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.ISerializable) interface is implemented. For more information, see [Binary Serialization](https://learn.microsoft.com/previous-versions/dotnet/fundamentals/serialization/binary/binary-serialization).

<a name="MiscMapping"></a>

## Miscellaneous Mapping

 The following table shows the default type mappings for some miscellaneous types that have not yet been mentioned. The following table shows the CLR types that O/R Designer and SQLMetal select when building an object model or external mapping file based on your database.

| SQL Server Type | Default CLR Type mapping used by O/R Designer and SQLMetal |
| --- | --- |
| `UNIQUEIDENTIFIER` | [System.Guid](https://learn.microsoft.com/search/?terms=System.Guid) |
| `SQL_VARIANT` | [System.Object](https://learn.microsoft.com/search/?terms=System.Object) |

 The next table shows the default type mappings used by the [System.Data.Linq.DataContext.CreateDatabase*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.CreateDatabase*) method to define which type of SQL columns are created to map to the CLR types defined in your object model or external mapping file.

| CLR Type | Default SQL Server Type used by [System.Data.Linq.DataContext.CreateDatabase*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.CreateDatabase*) |
| --- | --- |
| [System.Guid](https://learn.microsoft.com/search/?terms=System.Guid) | `UNIQUEIDENTIFIER` |
| [System.Object](https://learn.microsoft.com/search/?terms=System.Object) | `SQL_VARIANT` |

 LINQ to SQL does not support any other type mappings for these miscellaneous types.  For more information, see the [Type Mapping Run Time Behavior Matrix](#BehaviorMatrix).

## See also

- [Attribute-Based Mapping](attribute-based-mapping.md)
- [External Mapping](external-mapping.md)
- [Data Types and Functions](data-types-and-functions.md)
- [SQL-CLR Type Mismatches](sql-clr-type-mismatches.md)
