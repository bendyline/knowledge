---
title: "Generate Mirror Tables and CDC Capture Instances"
description: "Generate Mirror Tables and CDC Capture Instances"
ms.date: "03/01/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: how-to
f1_keywords:
  - "mirTab"
---
# Generate Mirror Tables and CDC Capture Instances


> **Important:**
> Change Data Capture for Oracle by Attunity is deprecated now. For details, refer to [the announcement](https://www.microsoft.com/sql-server/blog/2024/02/28/sql-server-integration-services-ssis-change-data-capture-attunity-feature-deprecations/).

  Use the Generate Mirror Tables page to generate the mirror tables for the tables you included in the CDC instance  
  
 Click **Run** to create the mirror tables. The progress for the creation of each table is displayed and a message is displayed to let you know whether each mirror table is completed successfully or with errors. If any errors occur, click **Details** to see a dialog box with an explanation of the error.  
  
 If any of the tables fail to be created, you can choose to continue or delete any tables that failed before continuing. After you finish running the wizard, you can decide whether to fix the table in the Oracle source database or not use it in the CDC instance. If you fix the table, you can add it when you [Edit Tables](edit-tables.md).  
  
 Click **Next** to open the [Finish](finish.md) page.  
  
## Related content

- [How to Create the SQL Server Change Database Instance](how-to-create-the-sql-server-change-database-instance.md)
