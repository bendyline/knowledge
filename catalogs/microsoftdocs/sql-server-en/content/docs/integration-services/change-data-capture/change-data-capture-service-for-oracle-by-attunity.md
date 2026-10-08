---
title: "Change Data Capture Service for Oracle by Attunity"
description: "Change Data Capture Service for Oracle by Attunity"
ms.date: 02/24/2026
ms.service: sql
ms.subservice: integration-services
ms.topic: install-set-up-deploy
---
# Change Data Capture Service for Oracle by Attunity


> **Important:**
> Change Data Capture for Oracle by Attunity is deprecated now. For details, refer to [the announcement](https://www.microsoft.com/sql-server/blog/2024/02/28/sql-server-integration-services-ssis-change-data-capture-attunity-feature-deprecations/).

The CDC Service for Oracle is a Windows service that scans Oracle transaction logs and captures changes to Oracle tables of interest into  SQL Server 
 change tables. The SQL change tables where the changes captured from Oracle are stored are the same type of change tables used in the native  SQL Server 
 Change Data Capture feature. This makes consuming these changes as easy as consuming changes made to  SQL Server 
 databases.

## Installation

Download Microsoft Change Data Capture Designer and Service for Oracle by Attunity for corresponding SQL Server version from below links:

- [Microsoft SQL Server 2016 Integration Services Attunity Oracle CDC Designer/Service Feature Pack](https://www.microsoft.com/download/details.aspx?id=55802)
- [Microsoft SQL Server 2017 Integration Services Attunity Oracle CDC Designer/Service Feature Pack](https://www.microsoft.com/download/details.aspx?id=56610)
- [Microsoft SQL Server 2019 Integration Services Feature Pack](https://www.microsoft.com/download/details.aspx?id=100303)

The CDC Service for Oracle can be installed on any supported Windows computer with access to the source Oracle database(s) being captured and the target  SQL Server 
 instance where the target CDC database resides. The CDC Service doesn't need a local installation of the Oracle database or the  SQL Server 
 database, only their supported clients. For information about where to install the required database components, see **Database Prerequisites** in this topic.

The installation of the  SQL Server 
 CDC Service for Oracle places the service configuration UI and the service program in the selected location. The CDC Service for Oracle is configured separately using the Oracle CDC Service Configuration Console. For more information on configuring the Oracle CDC Service, see [The Oracle CDC Service](the-oracle-cdc-service.md).

The CDC Service for Oracle can be installed on any supported Windows computer where the  SQL Server 
 Native Client is installed; it doesn't need to be installed on the same computer where the target  SQL Server 
 is installed.

## Supported Windows Environments

The Change Data Capture Service for Oracle by Attunity can run in the following Windows environments:
- Windows 8 and 8.1
- Windows 10
- Windows Server 2012 and 2012 R2
- Windows Server 2016
- Windows 2019

## Database Prerequisites

To work with the CDC Service for Oracle you must install Oracle client that is compatible with Oracle database version. This is a prerequisite that should be obtained from Oracle and installed before installing the Oracle CDC Service. Additionally, you need to install the SQL Server ODBC Client using SQL Server Setup.

The CDC Service for Oracle supports the following versions:

### Source Oracle Database

- Oracle Database 10g Release 2
- Oracle Database 11g Release 1 and Release 2
- Oracle Database 12c in classic installation (Multitenant installation isn't supported)
- Oracle Database 18c in classic installation (Multitenant installation isn't supported), for SQL Server 2019 only
- Oracle Database 19c in classic installation. (Multitenant installation isn't supported), for SQL Server 2019 only

### Target SQL Server Database

For a list of features supported by the editions in  SQL Server 
, see [Editions and supported features of SQL Server 2016](https://learn.microsoft.com/previous-versions/sql/sql-server/editions-and-components-of-sql-server-2016).

<a id="running-the-installation-program"></a>

## Run the Installation Program

To install the CDC Service for Oracle, open the installation wizard for the Windows platform you're using (32/64-bit) and follow the directions on the screen.

<a id="uninstalling-change-data-capture-service-for-oracle-by-attunity"></a>

## Uninstall Change Data Capture Service for Oracle by Attunity

You uninstall the CDC Service for Oracle using Control Panel, Programs and Features.

Uninstalling the CDC Service doesn't delete the  SQL Server 
 databases created. For complete removal of the tool, you must remove the MSXDBCDC database and the specific CDC databases that were created in the target  SQL Server 
 instance you worked with.

If you uninstall the CDC Service software from one machine and install it on another computer, you only need to provide the following definitions:

- Service account

-  SQL Server 
 connect string and credentials

- The master password

All the other definitions are stored in  SQL Server 
 and are available from the previous installation on another computer.

## In This Documentation

- [Change Data Capture Service for Oracle by Attunity System Architecture](change-data-capture-service-for-oracle-by-attunity-system-architecture.md)

- [The Oracle CDC Service](the-oracle-cdc-service.md)

- [Change Data Capture Service for Oracle by Attunity How to Guide](change-data-capture-service-for-oracle-by-attunity-how-to-guide.md)

## Related content

- [Working with the Oracle CDC Service](working-with-the-oracle-cdc-service.md)
