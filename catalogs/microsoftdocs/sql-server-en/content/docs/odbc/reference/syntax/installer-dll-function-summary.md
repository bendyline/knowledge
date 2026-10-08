---
title: "Installer DLL Function Summary"
description: "Installer DLL Function Summary"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, sunilbs, mcimfl
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
ms.custom: intro-installation
helpviewer_keywords:
  - "functions [ODBC], installer DLL functions"
  - "installer DLL [ODBC]"
---
# Installer DLL Function Summary
The following table describes the functions in the installer DLL. For more information about the syntax and semantics for each function, see [Installer DLL API Reference](installer-dll-api-reference-function.md).  
  
| Task | Function name | Purpose |
| --- | --- | --- |
| Installing ODBC | [SQLConfigDriver](sqlconfigdriver-function.md) | Loads the driver-specific setup DLL. |
|  | [SQLGetInstalledDrivers](sqlgetinstalleddrivers-function.md) | Returns a list of installed drivers. |
|  | [SQLInstallDriverEx](sqlinstalldriverex-function.md) | Adds a driver to the system information. |
|  | [SQLInstallDriverManager](sqlinstalldrivermanager-function.md) | Returns the target directory for the Driver Manager. |
|  | [SQLInstallerError](sqlinstallererror-function.md) | Returns error or status information for the installer functions. |
|  | [SQLInstallTranslatorEx](sqlinstalltranslatorex-function.md) | Adds a translator to the system information. |
|  | [SQLPostInstallerError](sqlpostinstallererror-function.md) | Allows a driver or translator setup library to report errors. |
|  | [SQLRemoveDriver](sqlremovedriver-function.md) | Removes a driver from the system information. |
|  | [SQLRemoveDriverManager](sqlremovedrivermanager-function.md) | Removes ODBC core components from the system information. |
|  | [SQLRemoveTranslator](sqlremovetranslator-function.md) | Removes the translator from the system information. |
| Configuring data sources | [SQLConfigDataSource](sqlconfigdatasource-function.md) | Calls the driver-specific setup DLL. |
|  | [SQLCreateDataSource](sqlcreatedatasource-function.md) | Displays a dialog box to add a data source. |
|  | [SQLGetConfigMode](sqlgetconfigmode-function.md) | Retrieves the configuration mode that indicates where the Odbc.ini entry listing DSN values is in the system information. |
|  | [SQLGetPrivateProfileString](sqlgetprivateprofilestring-function.md) | Writes a value to the system information. |
|  | [SQLGetTranslator](sqlgettranslator-function.md) | Displays a dialog box to select a translator. |
|  | [SQLManageDataSources](sqlmanagedatasources.md) | Displays a dialog box to configure data sources and drivers. |
|  | [SQLReadFileDSN](sqlreadfiledsn-function.md) | Reads information from file DSNs. |
|  | [SQLRemoveDefaultDataSource](sqlremovedefaultdatasource-function.md) | Removes the default data source. |
|  | [SQLRemoveDSNFromIni](sqlremovedsnfromini-function.md) | Removes a data source. |
|  | [SQLSetConfigMode](sqlsetconfigmode-function.md) | Sets the configuration mode that indicates where the Odbc.ini entry listing DSN values is in the system information. |
|  | [SQLValidDSN](sqlvaliddsn-function.md) | Checks the length and validity of the data source name. |
|  | [SQLWriteDSNToIni](sqlwritedsntoini-function.md) | Adds a data source. |
|  | [SQLWriteFileDSN](sqlwritefiledsn-function.md) | Writes information to file DSNs. |
|  | [SQLWritePrivateProfileString](sqlwriteprivateprofilestring-function.md) | Gets a value from the system information. |
