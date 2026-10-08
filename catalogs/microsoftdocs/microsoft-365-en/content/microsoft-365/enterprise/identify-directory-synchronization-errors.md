---
title: "View directory synchronization errors in Microsoft 365"
ms.author: scotv
author: kelleyvice-msft
manager: scotv
ms.date: 07/17/2024
audience: Admin
ms.topic: how-to
ms.service: microsoft-365-enterprise
ms.subservice: administration
ms.localizationpriority: medium
f1.keywords:
- CSH
ms.custom: 
 - Adm_O365
 - seo-marvel-apr2020
 - admindeeplinkMAC
 - identity-models
ms.collection:
- scotvorg
- Ent_O365
- M365-identity-device-management
- must-keep
search.appverid:
- MET150
- MOE150
- MED150
- MBS150
- GPA150
ms.assetid: b4fc07a5-97ea-4ca6-9692-108acab74067
description: Learn how to view directory synchronization errors and possible fixes in Microsoft 365 admin center.
---

# View directory synchronization errors in Microsoft 365

You can view directory synchronization errors in the <a href="https://go.microsoft.com/fwlink/p/?linkid=2024339" target="_blank">Microsoft 365 admin center</a>. Only the User object errors are displayed. To view errors with PowerShell, see [Identify objects with DirSyncProvisioningErrors](https://learn.microsoft.com/azure/active-directory/hybrid/how-to-connect-syncservice-duplicate-attribute-resiliency).

## View directory synchronization errors in the Microsoft 365 admin center

To view any errors in the Microsoft 365 admin center:
  
1. Sign in to the [Microsoft 365 admin center](https://admin.microsoft.com) with a Hybrid Identity Administrator account.

2. On the **Home** page, you'll see the **User management** card.

    The User management card in the Microsoft 365 admin center.
  
3. On the card, choose **Sync errors** under **Microsoft Entra Connect** to see the errors on the **Directory sync errors** page.

    An example of the Directory sync errors page.

4. Choose any of the errors to display the details pane with information about the error and tips on how to fix it.

   Example of the details of a directory sync error.
  
After viewing, see [fixing problems with directory synchronization for Microsoft 365](fix-problems-with-directory-synchronization.md) to correct any identified issues.
