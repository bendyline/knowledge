---
title: "Toolbox Component F1 Help"
description: Toolbox Component F1 Help
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: randolphwest
ms.date: 03/27/2023
ms.service: sql
ms.subservice: supportability
ms.topic: "reference"
helpviewer_keywords:
  - "Toolbox [SQL Server Management Studio]"
---
# Toolbox Component F1 Help


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

**Toolbox** displays various items for use in  Microsoft 
  SQL Server Management Studio 
 projects. You can open the **Toolbox** from the **View** menu, and dock this window as you wish. While docked, the **Toolbox** can either be pinned open or set to **Auto Hide** when not in use.

**Toolbox** items can be dragged and dropped or copied and pasted into code editors or onto design view surfaces within  SQL Server Management Studio 
.

## How the Toolbox works

The Toolbox is a sliding tree control that behaves much like  Microsoft 
 Windows Explorer, but without grid or connection lines. Multiple segments of the **Toolbox** (called "tabs") can be expanded simultaneously, and the entire tree scrolls inside the **Toolbox** window. To expand any tab of the **Toolbox**, select the plus (**+**) sign next to its name. To collapse an expanded tab, select the minus (**-**) sign next to its name.

Each time you return to an editor or designer, the **Toolbox** automatically scrolls to the most recent tab and item selected. As you shift focus to a different editor or designer, the current selection in the **Toolbox** shifts with you.

## Customize the Toolbox

It is easy to rearrange items within a tab, and to add custom tabs and items to the **Toolbox**.

To add or remove **Toolbox** items, on the **Tools** menu, select **Choose Toolbox Items**. Only **Maintenance Tasks** can be made available as **Toolbox** icons. All components aren't always available. For instance, maintenance tasks are only available when creating a maintenance plan.

## Add Azure components to the Toolbox

The Azure Feature Pack for Integration Services contains connection managers to connect to Azure data sources and tasks to do common Azure operations. Install the Feature Pack to add these items to the Toolbox. For more info, see [Azure Feature Pack for Integration Services (SSIS)](../../integration-services/azure-feature-pack-for-integration-services-ssis.md).

## Related content

- [Use the Toolbox](https://learn.microsoft.com/ssms/use-the-toolbox)
- [Choose Toolbox Items (Maintenance Tasks Page)](https://learn.microsoft.com/ssms/menu-help/choose-toolbox-items-maintenance-tasks-page)
