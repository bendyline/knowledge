---
title: "Use XML Data in Applications"
description: Learn about the options that are available for working with the xml data type in your applications.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: randolphwest
ms.date: 05/05/2022
ms.service: sql
ms.subservice: xml
ms.topic: how-to
ms.custom:
  - sfi-ropc-nochange
  - ignite-2025
helpviewer_keywords:
  - "parameters [XML in SQL Server]"
  - "XML [SQL Server], ADO"
  - "columns [XML in SQL Server], ADO.NET"
  - "ADO [XML in SQL Server]"
  - "columns [XML in SQL Server], SQL Server Native Client"
  - "xml data type [SQL Server], ADO"
  - "SQLNCLI, XML"
  - "xml data type [SQL Server], SQL Server Native Client"
  - "SQL Server Native Client, XML"
  - "ADO.NET [XML in SQL Server]"
  - "XML [SQL Server], ADO.NET"
  - "columns [XML in SQL Server], ADO"
  - "xml data type [SQL Server], ADO.NET"
  - "XML [SQL Server], SQL Server Native Client"
---
# Use XML data in applications


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



This article describes the options that are available to you for working with the **xml** data type in your application. The article includes information about the following:

- Handling XML from an **xml** type column by using ADO and  SQL Server 
 Native Client

- Handling XML from an **xml** type column by using ADO.NET

- Handling **xml** type in parameters by using ADO.NET

## Handle XML from an xml type column by using ADO and SQL Server Native Client

To use MDAC components to access the types and features that were introduced in  SQL Server 2005 (9.x) 
, you must set the DataTypeCompatibility initialization property in the ADO connection string.

For example, the following Visual Basic Scripting Edition (VBScript) sample shows the results of querying an **xml** data type column, `Demographics`, in the `Sales.Store` table of the  `AdventureWorks2025`  sample database. Specifically, the query looks for the instance value of this column for the row where the `CustomerID` is equal to `3`.

```vb
Const DS = "MyServer"
Const DB = "AdventureWorks2022"

Set objConn = CreateObject("ADODB.Connection")
Set objRs = CreateObject("ADODB.Recordset")

CommandText = "SELECT Demographics" & _
              " FROM Sales.Store" & _
              " INNER JOIN Sales.Customer" & _
              " ON Sales.Store.BusinessEntityID = sales.customer.StoreID" & _
              " WHERE Sales.Customer.CustomerID = 3" & _
              " OR Sales.Customer.CustomerID = 4"

ConnectionString = "Provider=MSOLEDBSQL" & _
                   ";Data Source=" & DS & _
                   ";Initial Catalog=" & DB & _
                   ";Integrated Security=SSPI;" & _
                   "DataTypeCompatibility=80"

'Connect to the data source.
objConn.Open ConnectionString

'Execute command through the connection and display
Set objRs = objConn.Execute(CommandText)

Dim rowcount
rowcount = 0
Do While Not objRs.EOF
   rowcount = rowcount + 1
   MsgBox "Row " & rowcount & _
           vbCrLf & vbCrLf & objRs(0)
   objRs.MoveNext
Loop

'Clean up.
objRs.Close
objConn.Close
Set objRs = Nothing
Set objConn = Nothing
```

This example shows how to set the data type compatibility property. By default, this is set to 0 when you're using  SQL Server 
 Native Client. If you set the value to 80, the  SQL Server 
 Native Client provider will make **xml** and user-defined type columns appear as  SQL Server 2000 (8.x) 
 data types. This would be DBTYPE_WSTR and DBTYPE_BYTES, respectively.

> **Note:**
> [SQL Server Native Client](../native-client/sql-server-native-client.md) (SNAC) isn't shipped with:

-  SQL Server 2022 (16.x) 
 and later versions
-  SQL Server Management Studio 
 19 and later versions

The SQL Server Native Client (SQLNCLI or SQLNCLI11) and the legacy Microsoft OLE DB Provider for SQL Server (SQLOLEDB) aren't recommended for new application development.

For new projects, use one of the following drivers:

- [Microsoft ODBC Driver for SQL Server](../../connect/odbc/microsoft-odbc-driver-for-sql-server.md)
- [Microsoft OLE DB Driver for SQL Server](../../connect/oledb/oledb-driver-for-sql-server.md)

For SQLNCLI that ships as a component of  SQL Server Database Engine 
 (versions 2012 through 2019), see this [Support Lifecycle exception](../native-client/applications/support-policies-for-sql-server-native-client.md#support-lifecycle-exception).


### Test this example

1. Verify that the  SQL Server 
 Native Client is installed and that MDAC 2.6.0or later is available on the client computer.

     For more information, see [SQL Server Native Client Programming](../native-client/sql-server-native-client-programming.md).

2. Verify that the  `AdventureWorks2025`  sample database in  SQL Server 
 is installed.

     This example requires the  `AdventureWorks2025`  sample database.

3. Copy the code shown previously in this article and paste the code into your text or code editor. Save the file as HandlingXmlDataType.vbs.

4. Modify the script as required for your  SQL Server 
 installation and save your changes.

     For example, where `MyServer` is specified, you should replace it with either `(local)` or the actual name of the server on which  SQL Server 
 is installed.

5. Run HandlingXmlDataType.vbs and execute the script.

The results should be similar to the following sample output:

```xml
Row 1

<StoreSurvey xmlns="http://schemas.microsoft.com/sqlserver/2004/07/adventure-works/StoreSurvey">
  <AnnualSales>1500000</AnnualSales>
  <AnnualRevenue>150000</AnnualRevenue>
  <BankName>Primary International</BankName>
  <BusinessType>OS</BusinessType>
  <YearOpened>1974</YearOpened>
  <Specialty>Road</Specialty>
  <SquareFeet>38000</SquareFeet>
  <Brands>3</Brands>
  <Internet>DSL</Internet>
  <NumberEmployees>40</NumberEmployees>
</StoreSurvey>

Row 2

<StoreSurvey xmlns="http://schemas.microsoft.com/sqlserver/2004/07/adventure-works/StoreSurvey">
  <AnnualSales>300000</AnnualSales>
  <AnnualRevenue>30000</AnnualRevenue>
  <BankName>United Security</BankName>
  <BusinessType>BM</BusinessType>
  <YearOpened>1976</YearOpened>
  <Specialty>Road</Specialty>
  <SquareFeet>6000</SquareFeet>
  <Brands>2</Brands>
  <Internet>DSL</Internet>
  <NumberEmployees>5</NumberEmployees>
</StoreSurvey>
```

## Handle XML from an xml type column by using ADO.NET

To handle XML from an **xml** data type column by using ADO.NET and the  Microsoft 
  .NET Framework 
 you can use the standard behavior of the **SqlCommand** class. For example, an **xml** data type column and its values can be retrieved in the same way any SQL column is retrieved by using a **SqlDataReader**.However, if you want to work with the contents of an **xml** data type column as XML, you'll first have to assign the contents to an **XmlReader** type.

For more information and example code, see "XML Column Values in a Data Reader" in the  Microsoft 
  .NET Framework 
 2.0 SDK documentation.

## Handle an xml type column in parameters by Using ADO.NET

To handle an **xml** data type passed as a parameter in ADO.NET and the  .NET Framework 
, you can supply the value as an instance of the **SqlXml** data type. No special handling is involved, because **xml** data type columns in  SQL Server 
 can accept parameter values in the same way as other columns and data types, such as **string** or **integer**.

For more information and example code, see "XML Values as Command Parameters" in the  Microsoft 
  .NET Framework 
 2.0 SDK documentation.

## Related content

- [XML data (SQL Server)](xml-data-sql-server.md)
