---
title: Manage Edge resource groups on your Azure Stack Edge Pro GPU device
description: Learn how to manage Edge resource groups on your Azure Stack Edge Pro GPU, Azure Stack Edge Pro R, and Azure Stack Edge Mini R device via the Azure portal.
services: databox
author: sipastak

ms.service: azure-stack-edge
ms.topic: how-to
ms.date: 08/02/2021
ms.author: sipastak
# Customer intent: As an IT admin, I need a quick way to get rid of resource groups no longer in use that were created for VMs on my Azure Stack Edge Pro GPU devices.
---

# Manage Edge resource groups on Azure Stack Edge Pro GPU devices


**APPLIES TO:** Yes for Pro GPU SKUAzure Stack Edge Pro - GPUYes for Pro 2 SKUAzure Stack Edge Pro 2Yes for Pro R SKUAzure Stack Edge Pro RYes for Mini R SKUAzure Stack Edge Mini R&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;  &nbsp;


Edge resource groups contain resources that are created on the device via the local Azure Resource Manager during virtual machine creation and deployment. These local resources can include virtual machines, VM images, disks, network interfaces, and other resource types such as Edge storage accounts.

This article describes how to view and delete Edge resource groups on an Azure Stack Edge Pro GPU device.

## View Edge resource groups

Follow these steps to view the Edge resource groups for the current subscription.

1. Go to **Virtual machines** on your device, and go to the **Resources** pane. Select **Edge resource groups**.

    Screenshot of the Resources view for virtual machines on an Azure Stack Edge device. The Edge Resource groups tab is shown and highlighted.

    > **Note:**
    > You can get the same listing by using [Get-AzResource](https://learn.microsoft.com/powershell/module/az.resources/get-azresource) in Azure PowerShell after you set up the Azure Resource Manager environment on your device. For more information, see [Connect to Azure Resource Manager](azure-stack-edge-gpu-connect-resource-manager.md).


## Delete an Edge resource group

Follow these steps to delete an Edge resource group that's no longer in use.

> **Note:**
> - A resource group must be empty to be deleted. 
> - You can't delete the ASERG resource group. That resource group stores the ASEVNET virtual network, which is created automatically when you enable compute on your device.

1. Go to **Virtual machines** on your device, and go to the **Resources** pane. Select **Edge resource groups**.

    Screenshot showing Resources view for virtual machines on an Azure Stack Edge device. The Edge Resource groups tab is shown and highlighted.

1. Select the resource group that you want to delete. In the far right of the resource group, select the delete icon (trashcan).

   The delete icon is only displayed when a resource group doesn't contain any resources.

    Screenshot of Resources view, Edge resource groups tab, for VMs on an Azure Stack Edge device. A trashcan icon by a resource group indicates it can be deleted. The icon is highlighted.

1. You'll see a message asking you to confirm that you want to delete the Edge resource group. The operation can't be reversed. Select **Yes**.

    Screenshot of  the Edge resource groups tab  in Resources view for VMs. The highlighted trashcan icon indicates a resource group can be deleted.

    When deletion is complete, the resource group is removed from the list.

## Next steps

- To learn how to administer your Azure Stack Edge Pro GPU device, see [Use local web UI to administer an Azure Stack Edge Pro GPU](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/databox-online/azure-stack-edge-manage-access-power-connectivity-mode.md).

- [Set up the Azure Resource Manager environment on your device](azure-stack-edge-gpu-connect-resource-manager.md).
