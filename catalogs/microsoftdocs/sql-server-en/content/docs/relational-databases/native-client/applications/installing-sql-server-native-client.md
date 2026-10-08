---
title: "Installing"
description: SQL Server Native Client 11.0 is installed with SQL Server 2016. Learn where components are installed. There is also a redistributable installation program.
author: markingmyname
ms.author: maghan
ms.date: "07/15/2016"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
ms.custom: intro-installation
helpviewer_keywords:
  - "SQL Server Native Client, uninstalling"
  - "SQLNCLI, installing"
  - "SQLNCLI, uninstalling"
  - "Setup [SQL Server Native Client]"
  - "uninstalling SQL Server Native Client"
  - "data access [SQL Server Native Client], uninstalling SQL Server Native Client"
  - "installing SQL Server Native Client"
  - "SQL Server Native Client, installing"
  - "data access [SQL Server Native Client], installing SQL Server Native Client"
  - "removing SQL Server Native Client"
---
# Installing SQL Server Native Client

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


  Microsoft  SQL Server 
 Native Client 11.0 is installed when you install  SQL Server 2016 (13.x) 
. 
 
 There is no SQL Server 2016 Native Client. For more information, see [SQL Server Native Client](../sql-server-native-client.md). 
 
You can also get sqlncli.msi from the SQL Server 2012 Feature Pack web page. To download the most recent version of the SQL Server Native Client, go to [Microsoft SQL Server 2012 Feature Pack](https://www.microsoft.com/download/details.aspx?id=56041). If a previous version of  SQL Server 
 Native Client earlier than SQL Server 2012 is also installed on the computer,  SQL Server 
 Native Client 11.0 will be installed side-by-side with the earlier version.  
  
 The  SQL Server 
 Native Client files (sqlncli11.dll, sqlnclir11.rll, and s11ch_sqlncli.chm) are installed to the following location:  
  
 `%SYSTEMROOT%\system32\`  
  
> **Note:**  
>  All appropriate registry settings for the  SQL Server 
 Native Client OLE DB provider and the  SQL Server 
 Native Client ODBC driver are made as part of the installation process.  
  
 The  SQL Server 
 Native Client header and library files (sqlncli.h and sqlncli11.lib) are installed in the following location:  
  
 `%PROGRAMFILES%\Microsoft SQL Server\110\SDK`  
  
 In addition to installing  SQL Server 
 Native Client as part of the  SQL Server 
 installation, there is also a redistributable installation program named sqlncli.msi, which can be found on the  SQL Server 
 installation disk in the following location: `%CD%\Setup\`.  
  
 You can distribute  SQL Server 
 Native Client through sqlncli.msi. You might have to install  SQL Server 
 Native Client when you deploy an application. One way to install multiple packages in what seems to the user to be a single installation is to use chainer and bootstrapper technology. For more information, see [Authoring a Custom Bootstrapper Package for Visual Studio 2005](https://learn.microsoft.com/previous-versions/aa730839\(v=vs.80\)) and [Adding Custom Prerequisites](https://learn.microsoft.com/visualstudio/deployment/creating-bootstrapper-packages).  
  
 The x64 and Itanium versions of sqlncli.msi also install the 32-bit version of  SQL Server 
 Native Client. If your application targets a platform other than the one it was developed on, you can download versions of sqlncli.msi for x64, Itanium, and x86 from the Microsoft Download Center.  
  
 When you invoke sqlncli.msi, only the client components are installed by default. The client components are files that support running an application that was developed using  SQL Server 
 Native Client. To also install the SDK components, specify `ADDLOCAL=All` on the command line. For example:  
  
 `msiexec /i sqlncli.msi ADDLOCAL=ALL APPGUID={0CC618CE-F36A-415E-84B4-FB1BFF6967E1}`  
  
## Silent Install  
 If you use the /passive, /qn, /qb, or /qr option with msiexec, you must also specify IACCEPTSQLNCLILICENSETERMS=YES, to explicitly indicate that you accept the terms of the end user license. This option must be specified in all capital letters.  
  
## Uninstalling SQL Server Native Client  
 Because applications such as  SQL Server 
 server and the  SQL Server 
 tools depend on  SQL Server 
 Native Client, it is important not to uninstall  SQL Server 
 Native Client until all dependent applications are uninstalled. To provider users with a warning that your application depends on  SQL Server 
 Native Client, use the APPGUID install option in your MSI, as follows:  
  
 `msiexec /i sqlncli.msi APPGUID={0CC618CE-F36A-415E-84B4-FB1BFF6967E1}`  
  
 The value passed to APPGUID is your specific product code. A product code must be created when using Microsoft Installer to bundle your application setup program.  
  
## Related content

- [Building Applications with SQL Server Native Client](#installing-sql-server-native-client)
- [Installation How-to Topics](https://learn.microsoft.com/previous-versions/sql/)
