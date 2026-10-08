---
title: Azure Government Marketplace images
description: This article provides an overview of Azure Government Marketplace image gallery
services: azure-government
cloud: gov

ms.service: azure-government
ms.topic: article
ms.date: 08/31/2021
---

# Azure Government Marketplace images

Microsoft Azure Government Marketplace provides a similar experience as Azure Marketplace. You can choose to deploy prebuilt images from Microsoft and our partners, or upload your own VHDs. This approach gives you the flexibility to deploy your own standardized images if needed.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/updated-for-az.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-government/documentation-government-image-gallery.md)

## Images

To obtain a list of virtual machine images available in Azure Government, [connect to Azure Government via PowerShell](documentation-government-get-started-connect-with-ps.md) and run the following commands:

```powershell
Connect-AzAccount -Environment AzureUSGovernment

Get-AzVMImagePublisher -Location USGovVirginia | `
Get-AzVMImageOffer | `
Get-AzVMImageSku
```
<!-- 
Get-AzVMImagePublisher -Location USGovVirginia | `
Get-AzVMImageOffer | `
Get-AzVMImageSku | `
Select-Object @{Name="Entry";Expression={"| " + $_.PublisherName + " | " + $_.Offer +  " | " + $_.Skus + " |" }} | `
Select-Object -ExpandProperty Entry | `
Out-File vm-images.md
-->

Some of the prebuilt images include pay-as-you-go licensing for specific software. Work with your Microsoft account team or reseller for Azure Government-specific pricing. For more information, see [Virtual machine pricing](https://azure.microsoft.com/pricing/details/virtual-machines/).

## Next steps

- [Create a Windows virtual machine with the Azure portal](https://learn.microsoft.com/azure/virtual-machines/windows/quick-create-portal)
- [Create a Windows virtual machine with PowerShell](https://learn.microsoft.com/azure/virtual-machines/windows/quick-create-powershell)
- [Create a Windows virtual machine with the Azure CLI](https://learn.microsoft.com/azure/virtual-machines/windows/quick-create-cli)
- [Create a Linux virtual machine with the Azure portal](https://learn.microsoft.com/azure/virtual-machines/linux/quick-create-portal)
