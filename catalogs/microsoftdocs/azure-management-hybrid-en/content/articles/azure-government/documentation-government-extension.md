---
title: Azure Government virtual machine extensions
description: This article provides customer guidance on how to obtain a complete list of virtual machine extensions available in Azure Government.
services: azure-government
cloud: gov

ms.service: azure-government
ms.topic: article
ms.date: 08/31/2021
---

# Azure Government virtual machine extensions

Azure [virtual machine (VM) extensions](https://learn.microsoft.com/azure/virtual-machines/extensions/features-windows) are small applications that provide post-deployment configuration and automation tasks on Azure VMs. 

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/updated-for-az.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-government/documentation-government-extension.md)

## Virtual machine extensions

You can obtain the list of virtual machine extensions available in Azure Government by [connecting to Azure Government via PowerShell](documentation-government-get-started-connect-with-ps.md) and running the following commands:

```powershell
Connect-AzAccount -Environment AzureUSGovernment

Get-AzVmImagePublisher -Location USGovVirginia | `
Get-AzVMExtensionImageType | `
Get-AzVMExtensionImage | Select Type, Version
```
<!-- 
Get-AzVmImagePublisher -Location USGovVirginia | `
Get-AzVMExtensionImageType | `
Get-AzVMExtensionImage | `
Select Type, Version | `
Group Type | `
Sort Name | `
Select-Object @{Name="Entry";Expression={"| " + $_.Name + " | " + ($_.Group.Version -join "; ") +  " | " }} | `
Select-Object -ExpandProperty Entry | `
Out-File vm-extensions.md
-->

## Next steps

* [Deploy a Windows virtual machine extension](https://learn.microsoft.com/azure/virtual-machines/extensions/features-windows#run-vm-extensions)
* [Deploy a Linux virtual machine extension](https://learn.microsoft.com/azure/virtual-machines/extensions/features-linux#run-vm-extensions)
