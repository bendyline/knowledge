---
title: Install SQL Server documentation to view offline
description: Learn how to install offline documentation for SQL Server. Use SQL Server Management Studio (SSMS) to view the offline content.
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 03/11/2024
ms.service: sql
ms.subservice: install
ms.topic: install-set-up-deploy
ms.custom:
  - intro-installation
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017"
---

# Install SQL Server documentation to view offline in SSMS


**Applies to:**
 

](sql-docs-navigation-guide.md#applies-to)
 

This article describes how to download and view offline SQL Server content in [SQL Server Management Studio (SSMS)](https://learn.microsoft.com/ssms/sql-server-management-studio-ssms). Offline content enables you to access the documentation without an internet connection (although an internet connection is initially required to download it).

## Overview

Offline documentation is available for versions of  SQL Server 2012 (11.x) 
 and later versions. Although you can view content for [previous versions online](https://learn.microsoft.com/previous-versions/sql/), an offline option provides a convenient way to access the older content.

-  SQL Server 2016 (13.x) 
 and later versions
-  SQL Server 2014 (12.x)

-  SQL Server 2012 (11.x) 


If your system doesn't have internet access and you want to install the offline content, first download the content on a system that has internet access, and then move the package over to the offline system. Use SSMS to locate the installation file path and load the files.

## Offline content for SQL Server

The following steps explain how to load offline content for  SQL Server 
, by using SQL Server Management Studio (SSMS) that has access to the internet.

### [SQL Server 2016 and later versions](#tab/sqlserver2016)

This section describes how to load offline content for  SQL Server 2016 (13.x) 
 and later versions.

1. In SSMS, select **Add and Remove Help Content** on the Help menu.

   Screenshot of Add and Remove Help Content.

   The Help Viewer opens to the Manage Content tab.

1. To find the latest help content for  SQL Server 2016 (13.x) 
 and later versions, under the **Manage Content** tab choose **Online** under the Installation source and then type in *sql server* in the search bar.

   Screenshot of SQL Server books search.

   > **Note:**  
   > The Local store path on the Manage Content tab shows where on the local computer the content is installed. To change the location, select **Move**, enter a different folder path in the **To** field, and then select **OK**. If the help installation fails after changing the Local store path, close and reopen Help Viewer. Ensure the new location appears in the Local store path and then try the installation again.

1. To install the latest help content for  SQL Server 2016 (13.x) 
 and later versions, select **Add** next to each content package (book) that you want to install and then select **Update** in the lower right.

   Screenshot of SQL Server online books add and update.

   > **Note:**  
   > If the Help Viewer freezes (hangs) while adding content, change the `Cache LastRefreshed="<mm/dd/yyyy> 00:00:00"` line in the `%LOCALAPPDATA%\Microsoft\HelpViewer2.x\HlpViewer_SSMSx_en-US.settings` or `HlpViewer_VisualStudiox_en-US.settings` file to some date in the future. For more information about this issue, see [Visual Studio Help Viewer freezes](https://learn.microsoft.com/visualstudio/welcome-to-visual-studio).

1. You can verify that the  SQL Server 2016 (13.x) 
 and later version content loaded, by searching under the left content pane for `sql server <nnnn>`, where `<nnnn>` is the version you installed.

   Screenshot of SQL Server 2016 documentation automatically updated.

1. (Optional) To move the content to an offline system, go to the **Local store path** (mentioned in step 2) where the files were installed. Copy the ContentStore and IndexStore folders to **new** folder in another location. After copying, zip up the folders and their contents, then copy them to the offline system.

1. On the offline system, open SSMS, select **Add and Remove Help Content** on the Help menu. Go to the **Manage Content** tab and note the location for the Local store path. Close SSMS.

1. Extract the contents of the zip file. Copy the contents of the ContentStore folder into the ContentStore folder within the Local store path.

   > **Note:**  
   > The installedBooks.*.xml file should be larger than 1 KB. If there are two files with the same names, rename the smaller file to `.old` by changing the file extension.

1. Copy the contents of the IndexStore folder into the IndexStore folder within the local store path.

1. Open SSMS, select **Add and Remove Help Content** on the Help menu to view the documentation.

### [SQL Server 2014](#tab/sqlserver2014)

This section describes how to load offline content for  SQL Server 2014 (12.x)
.

> **Important:**  
>  SQL Server 2014 (12.x)
 Transact-SQL content is only available offline.

1. Download the [Product Documentation for Microsoft SQL Server 2014 for firewall and proxy restricted environments](https://www.microsoft.com/download/details.aspx?id=42557) content from the download center and save it to a folder.

1. Unzip the file to view the `*.msha*` file.

   Screenshot of SQL Server 2014 Help documentation setup file.

1. In SSMS, select **Add and Remove Help Content** on the Help menu.

   Screenshot of HelpViewer Add Remove Content.

   The Help Viewer opens to the Manage Content tab.

1. To install the latest help content, choose **Disk** under Installation source and then the ellipses (...).

   Screenshot of Help Viewer Manage Content Disk Source.

   > **Note:**  
   > The Local store path on the Manage Content tab shows where on the local computer the content is located. To change the location, select **Move**, enter a different folder path in the **To** field, and then select **OK**.
   If the help installation fails after changing the Local store path, close and reopen the Help Viewer. Ensure the new location appears in the Local store path and then try the installation again.

1. Locate the folder where you unzipped the content. Select the `HelpContentSetup.msha` file in the folder then select **Open**.

   Screenshot of Open the SQL Server 2014 Help Content Setup.msha file.

1. Type in *sql server 2014* in the search bar. Once you see the 2014 content available, select **Add** next to each content package (book) that you want to install to Help Viewer and then select **Update**.

   Screenshot of SQL Server 2014 books search in Help Viewer.

   Screenshot of SQL Server 2014 books add and update in Help Viewer.

    > **Note:**  
    > If the Help Viewer freezes (hangs) while adding content, change the `Cache LastRefreshed="<mm/dd/yyyy> 00:00:00"` line in the `%LOCALAPPDATA%\Microsoft\HelpViewer2.x\HlpViewer_SSMSx_en-US.settings` or `HlpViewer_VisualStudiox_en-US.settings` file to some date in the future. For more information about this issue, see [Visual Studio Help Viewer freezes](https://learn.microsoft.com/visualstudio/welcome-to-visual-studio).

1. You can verify that the SQL Server 2014 content installed by searching under the content pane on the left for *sql server 2014*.

   Screenshot of SQL Server 2014 books automatically updated.

### [SQL Server 2012](#tab/sqlserver2012)

This section describes how to load offline content for  SQL Server 2012 (11.x) 
.

1. Download the [Product Documentation for Microsoft SQL Server 2012 for firewall and proxy restricted environments](https://www.microsoft.com/download/details.aspx?id=35750) content from the download center and save it to a folder.

1. Unzip the file to view the `*.msha*` file.

   Screenshot of SQL Server 2012 Help content setup file.

1. In SSMS, select **Add and Remove Help Content** on the Help menu.

   Screenshot of HelpViewer Add Remove Content.

   The Help Viewer opens to the Manage Content tab.

1. To install the latest help content, choose **Disk** under Installation source and then the ellipses (...).

   Screenshot of Help Viewer Manage Content Disk Source.

   > **Note:**  
   > The Local store path on the Manage Content tab shows where on the local computer the content is located. To change the location, select **Move**, enter a different folder path in the **To** field, and then select **OK**.
   If the help installation fails after changing the Local store path, close and reopen the Help Viewer. Ensure the new location appears in the Local store path and then try the installation again.

1. Locate the folder where you unzipped the content. Select the `HelpContentSetup.msha` file in the folder then select **Open**.

   Screenshot of Open the SQL Server 2012 Help Content Setup.msha file.

1. Type in *sql server 2012* in the search bar. Once you see the 2012 content available, select **Add** next to each content package (book) that you want to install to Help Viewer and then select **Update**.

   Screenshot of SQL Server 2012 documentation search in Help Viewer.

   Screenshot of SQL Server 2012 documentation add and update in Help Viewer.

   > **Note:**  
   > If the Help Viewer freezes (hangs) while adding content, change the `Cache LastRefreshed="<mm/dd/yyyy> 00:00:00"` line in the `%LOCALAPPDATA%\Microsoft\HelpViewer2.x\HlpViewer_SSMSx_en-US.settings` or `HlpViewer_VisualStudiox_en-US.settings` file to some date in the future. For more information about this issue, see [Visual Studio Help Viewer freezes](https://learn.microsoft.com/visualstudio/welcome-to-visual-studio).

1. You can verify that the  SQL Server 2012 (11.x) 
 content is loaded by searching under the content pane on the left for *sql server 2012*.

   Screenshot of SQL Server 2012 documentation automatically updated.

---

## View offline documentation

You can view SQL Server help content using the **Help** menu in [SQL Server Management Studio (SSMS)](https://learn.microsoft.com/ssms/sql-server-management-studio-ssms).

### View offline help content in SSMS

To view the installed help in SSMS, select **Launch in Help Viewer** from the Help menu, to launch the Help Viewer.

Screenshot of Launch in Help Viewer.

Help Viewer opens to the Manage Content tab, with the installed help table of contents in the left pane. Select **Articles** in the table of contents to display them in the contents pane.

> **Important:**  
> If the contents pane isn't visible, select **Contents** on the left margin. Select the pushpin icon to keep the contents pane open.

Screenshot of Help Viewer with content.

## Lifecycle policy

Review the Microsoft Product Lifecycle for information about how a specific product, service, or technology is supported:

- [Microsoft Lifecycle Policy](https://learn.microsoft.com/lifecycle/products)


##  Get help

- [Ideas for SQL: Have suggestions for improving SQL Server?](https://feedback.azure.com/forums/908035-sql-server)
- [Microsoft Q & A (SQL Server)](https://learn.microsoft.com/answers/products/sql-server)
- [DBA Stack Exchange (tag sql-server): Ask SQL Server questions](https://dba.stackexchange.com/questions/tagged/sql-server)
- [Stack Overflow (tag sql-server): Answers to SQL development questions](https://stackoverflow.com/questions/tagged/sql-server)
- [Microsoft SQL Server License Terms and Information](https://www.microsoft.com/licensing/product-licensing/sql-server)
- [Support options for business users](https://support.microsoft.com/support-for-business)
- [Additional SQL Server help and feedback](sql-server-get-help.md)

##  Contribute to SQL documentation

Did you know that you can edit SQL content yourself? If you do so, not only do you help improve our documentation, but you also get credited as a contributor to the page.

For more information, see [Edit Microsoft Learn documentation](sql-server-docs-contribute.md).



## Related content

- [Online documentation for SQL Server 2016 and later versions](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/sql-server/index.yml)
- [SQL Server 2014 online documentation](https://learn.microsoft.com/previous-versions/sql/2014)
- [Previous versions of SQL Server documentation](previous-versions-sql-server.md)
- [Versioning system for SQL documentation](versioning-system-monikers-ui-sql-server.md)
