---
title: "Oracle Publisher"
description: "Oracle Publisher"
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: reference
ms.custom:
  - updatefrequency5
f1_keywords:
  - "sql13.rep.newpubwizard.selectoraclepublisher.f1"
---
# Oracle Publisher
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  Beginning with  Microsoft 
  SQL Server 2005 (9.x) 
,  SQL Server 
 allows you to publish data from an Oracle database using snapshot and transactional replication. For more information, see [Oracle Publishing Overview](non-sql/oracle-publishing-overview.md).  
  
 The Oracle Publisher must use a remote  SQL Server 
 Distributor; this wizard must be run on that server after the necessary Oracle networking software has been installed and tested. For more information, see [Configure an Oracle Publisher](non-sql/configure-an-oracle-publisher.md).  
  
> **Important:**  
>  If another administrator configured the Oracle database as a Publisher, after clicking **Next** you will be prompted to enter the password for the replication login used to connect to the Oracle database.  SQL Server 
 will then create a mapping between your login and the linked server connection to the Oracle database. You will not be required to enter a password for subsequent connections to the Oracle database.  
  
## Options  
 **Oracle Publishers**  
 Select an Oracle Publisher from the list. This list contains Oracle Publishers that have previously been configured to use the server against which the wizard is running as their Distributor. If the list is empty, or the Oracle Publisher you want to use is not in the list, click **Add Oracle Publisher**.  
  
 **Add Oracle Publisher**  
 Click to launch the **Distributor Properties** dialog box. In this dialog box, click **Add**, and then click **Add Oracle Publisher**. In the **Connect to Server** dialog box, specify the Oracle server name, and the login and password for the replication administrative user schema. For more information, see [Connect to Server (Oracle), Login](connect-to-server-oracle-login.md).  
  
> **Note:**  
>  If the server against which the wizard is running has not yet been configured as a Distributor, you are prompted to configure it now.  
  
## Related content

- [Create a Publication from an Oracle Database](publish/create-a-publication-from-an-oracle-database.md)
