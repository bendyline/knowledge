---
title: NIC advanced properties
description: You can manage NICs and all the features via Windows PowerShell or the Network Control Panel.
ms.topic: how-to
ms.author: roharwoo
author: robinharwood
ms.date: 10/26/2021
---

# NIC advanced properties

You can manage NICs and all the features via Windows PowerShell using the [NetAdapter](https://learn.microsoft.com/powershell/module/netadapter/) cmdlet.  You can also manage NICs and all the features using Network Control Panel (ncpa.cpl). To learn more, see [Host network requirements for Azure Local](https://learn.microsoft.com/azure/azure-local/concepts/host-network-requirements?context=/windows-server/context/windows-server-edge-networking).

1. In **Windows PowerShell**, run the `Get‑NetAdapterAdvancedProperty` cmdlet against two different make/model of NICs.

   Get-NetAdapterAdvancedProperty m1

   Get-NetAdapterAdvancedProperty c1

   There are similarities and differences in these two NIC Advanced Properties Lists.

2. In the **Network Control Panel** (ncpa.cpl), do the following:

   a. Right-click the NIC.

   Network connections dialog

   b. In the properties dialog, click **Configure**.

    C1 Properties

   c. Click the **Advanced** tab to view the advanced properties.<p>The items in this list correlates to the items in the `Get-NetAdapterAdvancedProperties` output.

   Chelsio Network Adapter Properties

---
