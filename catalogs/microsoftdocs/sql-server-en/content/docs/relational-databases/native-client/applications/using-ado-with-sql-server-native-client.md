---
title: "Using ADO"
description: To use new features introduced in SQL Server 2005, existing applications that use ADO should use the SQL Server Native Client OLE DB provider.
author: markingmyname
ms.author: maghan
ms.date: "03/16/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "SQL Server Native Client, ADO"
  - "data access [SQL Server Native Client], ADO"
  - "ADO [SQL Server Native Client]"
  - "SQLNCLI, ADO"
ms.custom: sfi-ropc-nochange
---
# Using ADO with SQL Server Native Client

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





> **Important:** 
> [SQL Server Native Client](../sql-server-native-client.md) (SNAC) isn't shipped with:

-  SQL Server 2022 (16.x) 
 and later versions
-  SQL Server Management Studio 
 19 and later versions

The SQL Server Native Client (SQLNCLI or SQLNCLI11) and the legacy Microsoft OLE DB Provider for SQL Server (SQLOLEDB) aren't recommended for new application development.

For new projects, use one of the following drivers:

- [Microsoft ODBC Driver for SQL Server](../../../connect/odbc/microsoft-odbc-driver-for-sql-server.md)
- [Microsoft OLE DB Driver for SQL Server](../../../connect/oledb/oledb-driver-for-sql-server.md)

For SQLNCLI that ships as a component of  SQL Server Database Engine 
 (versions 2012 through 2019), see this [Support Lifecycle exception](support-policies-for-sql-server-native-client.md#support-lifecycle-exception).


  In order to take advantage of new features introduced in  SQL Server 2005 (9.x) 
 such as multiple active result sets (MARS), query notifications, user-defined types (UDTs), or the new **xml** data type, existing applications that use ActiveX Data Objects (ADO) should use the  SQL Server 
 Native Client OLE DB provider as their data access provider.  
  
 If you do not need to use any of the new features introduced in  SQL Server 2005 (9.x) 
, there is no need to use the  SQL Server 
 Native Client OLE DB provider; you can continue using your current data access provider, which is typically SQLOLEDB. If you are enhancing an existing application and you need to use the new features introduced in  SQL Server 2005 (9.x) 
, you should use  SQL Server 
 Native Client OLE DB provider.  
  
> **Note:**  
>  If you are developing a new application, it is recommended that you consider using ADO.NET and the .NET Framework Data Provider for  SQL Server 
 instead of  SQL Server 
 Native Client to access all the new features of recent versions of  SQL Server 
. For more information about the .NET Framework Data Provider for  SQL Server 
, see the .NET Framework SDK documentation for ADO.NET.  
  
 To enable ADO to use new features of recent versions of  SQL Server 
, some enhancements have been made to the  SQL Server 
 Native Client OLE DB provider which extends the core features of OLE DB. These enhancements allow ADO applications to use newer  SQL Server 
 features and to consume two data types introduced in  SQL Server 2005 (9.x) 
: **xml** and **udt**. These enhancements also exploit enhancements to the **varchar**, **nvarchar**, and **varbinary** data types.  SQL Server 
 Native Client adds the SSPROP_INIT_DATATYPECOMPATIBILITY initialization property to the DBPROPSET_SQLSERVERDBINIT property set for use by ADO applications so that the new data types are exposed in a way compatible with ADO. In addition, the  SQL Server 
 Native Client OLE DB provider also defines a new connection string keyword named **DataTypeCompatibility** that is set in the connection string.  
  
> **Note:**  
>  Existing ADO applications can access and update XML, UDT, and large value text and binary field values using the SQLOLEDB provider. The new larger **varchar(max)**, **nvarchar(max)**, and **varbinary(max)** data types are returned as the ADO types **adLongVarChar**, **adLongVarWChar** and **adLongVarBinary** respectively. XML columns are returned as **adLongVarChar**, and UDT columns are returned as **adVarBinary**. However, if you use the  SQL Server 
 Native Client OLE DB provider (SQLNCLI11) instead of SQLOLEDB, you need to make sure to set the **DataTypeCompatibility** keyword to "80" so that the new data types will map correctly to the ADO data types.  
  
## Enabling SQL Server Native Client from ADO  
 To enable the usage of  SQL Server 
 Native Client, ADO applications will need to implement the following keywords in their connection strings:  
  
-   `Provider=SQLNCLI11`  
  
-   `DataTypeCompatibility=80`  
  
 For more information about the ADO connections string keywords supported in  SQL Server 
 Native Client, see [Using Connection String Keywords with SQL Server Native Client](using-connection-string-keywords-with-sql-server-native-client.md).  
  
 The following is an example of establishing an ADO connection string that is fully enabled to work with  SQL Server 
 Native Client, including the enabling of the MARS feature:  
  
```  
Dim con As New ADODB.Connection  
  
con.ConnectionString = "Provider=SQLNCLI11;" _  
         & "Server=(local);" _  
         & "Database=AdventureWorks;" _   
         & "Integrated Security=SSPI;" _  
         & "DataTypeCompatibility=80;" _  
         & "MARS Connection=True;"  
con.Open  
```  
  
## Examples  
 The following sections provide examples of how you can use ADO with the  SQL Server 
 Native Client OLE DB provider.  
  
### Retrieving XML Column Data  
 In this example, a recordset is used to retrieve and display the data from an XML column in the  SQL Server 
 **AdventureWorks** sample database.  
  
```  
Dim con As New ADODB.Connection  
Dim rst As New ADODB.Recordset  
Dim sXMLResult As String  
  
con.ConnectionString = "Provider=SQLNCLI11;" _  
         & "Server=(local);" _  
         & "Database=AdventureWorks;" _   
         & "Integrated Security=SSPI;" _   
         & "DataTypeCompatibility=80;"  
  
con.Open  
  
' Get the xml data as a recordset.  
Set rst.ActiveConnection = con  
rst.Source = "SELECT AdditionalContactInfo FROM Person.Contact " _  
   & "WHERE AdditionalContactInfo IS NOT NULL"  
rst.Open  
  
' Display the data in the recordset.  
While (Not rst.EOF)  
   sXMLResult = rst.Fields("AdditionalContactInfo").Value  
   Debug.Print (sXMLResult)  
   rst.MoveNext  
End While  
  
con.Close  
Set con = Nothing  
```  
  
> **Note:**  
>  Recordset filtering is not supported with XML columns. If used, an error will be returned.  
  
### Retrieving UDT Column Data  
 In this example, a **Command** object is used to execute a SQL query that returns a UDT, the UDT data is updated, and then the new data is inserted back into the database. This example assumes that the **Point** UDT has already been registered in the database.  
  
```  
Dim con As New ADODB.Connection  
Dim cmd As New ADODB.Command  
Dim rst As New ADODB.Recordset  
Dim strOldUDT As String  
Dim strNewUDT As String  
Dim aryTempUDT() As String  
Dim strTempID As String  
Dim i As Integer  
  
con.ConnectionString = "Provider=SQLNCLI11;" _  
         & "Server=(local);" _  
         & "Database=AdventureWorks;" _   
         & "Integrated Security=SSPI;" _  
         & "DataTypeCompatibility=80;"  
  
con.Open  
  
' Get the UDT value.  
Set cmd.ActiveConnection = con  
cmd.CommandText = "SELECT ID, Pnt FROM dbo.Points.ToString()"  
Set rst = cmd.Execute  
strTempID = rst.Fields(0).Value  
strOldUDT = rst.Fields(1).Value  
  
' Do something with the UDT by adding i to each point.  
arytempUDT = Split(strOldUDT, ",")  
i = 3  
strNewUDT = LTrim(Str(Int(aryTempUDT(0)) + i)) + "," + _  
   LTrim(Str(Int(aryTempUDT(1)) + i))  
  
' Insert the new value back into the database.  
cmd.CommandText = "UPDATE dbo.Points SET Pnt = '" + strNewUDT + _  
   "' WHERE ID = '" + strTempID + "'"  
cmd.Execute  
  
con.Close  
Set con = Nothing  
```  
  
### Enabling and Using MARS  
 In this example, the connection string is constructed to enable MARS through the  SQL Server 
 Native Client OLE DB provider, and then two recordset objects are created to execute using the same connection.  
  
```  
Dim con As New ADODB.Connection  
  
con.ConnectionString = "Provider=SQLNCLI11;" _  
         & "Server=(local);" _  
         & "Database=AdventureWorks;" _   
         & "Integrated Security=SSPI;" _  
         & "DataTypeCompatibility=80;" _  
         & "MARS Connection=True;"  
con.Open  
  
Dim recordset1 As New ADODB.Recordset  
Dim recordset2 As New ADODB.Recordset  
  
Dim recordsaffected As Integer  
Set recordset1 =  con.Execute("SELECT * FROM Table1", recordsaffected, adCmdText)  
Set recordset2 =  con.Execute("SELECT * FROM Table2", recordsaffected, adCmdText)  
  
con.Close  
Set con = Nothing  
```  
  
 In prior versions of the OLE DB provider, this code would cause an implicit connection to be created on the second execution because only one active set of results could be opened per a single connection. Because the implicit connection was not pooled in the OLE DB connection pool this would cause additional overhead. With the MARS feature exposed by the  SQL Server 
 Native Client OLE DB provider, you get multiple active results on the one connection.  
  
## Related content

- [Building Applications with SQL Server Native Client](building-applications-with-sql-server-native-client.md)
