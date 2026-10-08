---
title: Save Trace Results to a File
titleSuffix: SQL Server Profiler
description: Find out how to save captured event data to a trace file, specify a maximum trace file size, and enable the file rollover option in SQL Server Profiler.
author: rwestMSFT
ms.author: randolphwest
ms.date: 06/05/2025
ms.service: sql
ms.subservice: profiler
ms.topic: how-to
ms.collection:
  - data-tools
---

# Save trace results to a file (SQL Server Profiler)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





This article describes how to save trace results to a file by using  SQL Server Profiler 
.

## Save trace results to a file

1. On the **File** menu, select **New Trace**, and then connect to an instance of  SQL Server 
.

   The **Trace Properties** dialog box appears.

   If **Start tracing immediately after making connection** is selected, the **Trace Properties** dialog box fails to appear and the trace begins instead. To turn off this setting, on the **Tools** menu, select **Options**, and clear the **Start tracing immediately after making connection** check box.

1. In the **Trace name** box, type a name for the trace.

1. Select the **Save to file** check box.

   The **Save As** dialog box appears.

1. Specify a path and filename in the **Save As** dialog box. Select **Save**.

   Ensure that the SQL Server service has sufficient permissions to write to a file in the directory specified.

1. In the **Trace Properties** dialog box, enter the maximum file size in the **Set maximum file size (MB)** text box. The default value is 5 megabytes (MB).

1. Optionally, specify the following options:

   - Select the **Enable file rollover** check box to have  SQL Server Profiler 
 create new files for trace data once the maximum file size is reached. This option is selected by default.

   - Select the **Server processes trace data** check box to ensure that the server records each trace event.

     When **Server processes trace data** is cleared, the server doesn't record events if recording events significantly degrades performance.

## Related content

- [SQL Server Profiler](sql-server-profiler.md)
