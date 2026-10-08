---
title: "Start Microsoft Report Builder"
description: Learn how to start Microsoft Report Builder from the SQL Server Reporting Services (SSRS) web portal and create paginated reports.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-builder
ms.topic: how-to
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "Report Builder, launching"
  - "launching Report Builder"
  - "SharePoint integration [Reporting Services], starting Report Builder"
  - "starting Report Builder"
# customer intent: As a SQL Server report author, I want to start Microsoft Report Builder from the Reporting Services web portal so that I can create and manage reports.
---
# Start Microsoft Report Builder

  **Applies to:**
 
 Reporting Services and later versions
 

Learn how to start Microsoft Report Builder from the Reporting Services web portal. Microsoft Report Builder
 is a stand-alone report authoring environment. With it, you can create paginated reports and publish them to a  Reporting Services 
 report server.

The first time you start Report Builder
 from the  Reporting Services 
 web portal, you can [download Report Builder](https://www.microsoft.com/download/details.aspx?id=53613) from the Microsoft Download Center by selecting **Get Report Builder**.

Screenshot of the We're opening Report Builder message.

You or an administrator can install Report Builder on your computer from the Microsoft Download Center. For more information, see [Install Report Builder](../install-windows/install-report-builder.md).

When you start Report Builder
 from the web portal or SharePoint site, if an earlier version of Report Builder
 opens, contact your administrator. The administrator can update the version on the web portal or SharePoint site.

## Prerequisites

- SQL Server 2016 (13.x) or later.
- Connection to a report server database.
- Access to the Reporting Services web portal. 

## Start Report Builder from the Reporting Services web portal

1. In your web browser, go to the URL for your report server. By default, the URL is `https://<servername>/reports`.

1. In the web portal's menu bar, select **New** and choose **Paginated Report**.

     Screenshot of the New Paginated Report menu.

     The first time you start Report Builder with the **Paginated Report** option, you receive the prompt to [install Report Builder](../install-windows/install-report-builder.md).

     After the first time, Report Builder
 opens, and you can create a paginated report or open a report from the report server.

## Related content

- [Microsoft Report Builder in SQL Server](report-builder-in-sql-server.md)
- [Set default options for Report Builder](set-default-options-for-report-builder.md)
- [Try asking the Reporting Services forum](https://learn.microsoft.com/answers/search.html?c=\&f=\&includeChildren=\&q=ssrs+OR+reporting+services\&redirect=search%2fsearch\&sort=relevance\&type=question+OR+idea+OR+kbentry+OR+answer+OR+topic+OR+user)
