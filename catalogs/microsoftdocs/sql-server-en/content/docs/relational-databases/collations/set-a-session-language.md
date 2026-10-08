---
title: "Set a Session Language"
description: "Set a Session Language"
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.date: "03/16/2017"
ms.service: sql
ms.topic: concept-article
ms.custom:
  - sfi-ropc-nochange
  - ignite-2025
helpviewer_keywords:
  - "errors [SQL Server], international considerations"
  - "globalization [SQL Server], sessions"
  - "time [SQL Server]"
  - "sessions [SQL Server], languages"
  - "international considerations [SQL Server], sessions"
  - "dates [SQL Server], session languages"
  - "global considerations [SQL Server], sessions"
  - "client-side session language"
  - "time [SQL Server], session languages"
  - "messages [SQL Server], international considerations"
  - "server-side session language"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Set a Session Language

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)


  The session language can be used to set how the following elements are displayed on the server, based on language and cultural preference:  
  
-   The language that will be used for error and other system messages.  SQL Server 
 supports having multiple copies of all system error strings and messages in all the languages in which  SQL Server 
 is available. These messages can be viewed in the [sys.messages](../system-catalog-views/messages-for-errors-catalog-views-sys-messages.md) catalog view. When you install a localized version of  SQL Server 
, these system messages are translated for the language version that you install. By default, you also obtain the U.S. English set of these messages. Additionally, you can add user-defined messages in a specific language by using [sp_addmessage](../system-stored-procedures/sp-addmessage-transact-sql.md).  
  
-   The format of date and time data.  
  
-   The names of days and months, including abbreviations.  
  
-   The first day of the week.  
  
-   Currency data.  
  
 There are 33 languages available for use as session settings. For a list of languages, see [sys.syslanguages](../system-compatibility-views/sys-syslanguages-transact-sql.md).  
  
## Setting the Session Language from the Server  
 To set the session language from the server side, use [SET LANGUAGE](../../t-sql/statements/set-language-transact-sql.md).  
  
## Setting the Session Language from the Client  
 The session language can be set on the client side by using OLE DB, ODBC or ADO.NET. For OLE DB, use the SSPROP_INIT_CURRENTLANGUAGE property. For more information, see [Initialization and Authorization Properties](../native-client-ole-db-data-source-objects/initialization-and-authorization-properties.md).  
  
 For ODBC, use the Language keyword. For more information, see [SQLConfigDataSource](../native-client-odbc-api/sqlconfigdatasource.md).  
  
 For ADO.NET, use the **Current Language** parameter of the **ConnectionString** object. For more information, see the  Microsoft 
 Data Access Components (MDAC) software development kit (SDK) documentation.
