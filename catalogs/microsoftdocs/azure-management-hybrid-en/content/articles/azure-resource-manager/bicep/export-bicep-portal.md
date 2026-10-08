---
title: Export Bicep files in Azure portal
description: Use Azure portal to export a Bicep file from resources in your subscription.
ms.topic: how-to
ms.custom: devx-track-arm-template
ms.date: 06/26/2026
---

# Use Azure portal to export a Bicep file


To assist with creating Azure Resource Manager templates, you can export a template from existing resources as either a [Bicep file](overview.md) or an [ARM JSON template](../templates/overview.md). The exported template helps you understand the syntax and properties needed for resource deployment. To streamline future deployments, use the exported template as a starting point and customize it for your needs. While the export process generates a functional template, most exported templates require adjustments before they can be used for deployment.

Resource Manager enables you to pick one or more resources for exporting to a template. You can focus on exactly the resources you need in the template.


Currently, Bicep files can only be exported from the Azure portal. However, you can export ARM JSON templates via [Azure CLI](../templates/export-template-cli.md) or [Azure PowerShell](../templates/export-template-powershell.md) and then [decompile](decompile.md) them into to Bicep files.


## Limitations

Export is not guaranteed to succeed. Export is not a reliable way to turn pre-existing resources into templates that are usable in production. It is better to create resources from scratch using hand-written [Bicep file](overview.md), [ARM template](../templates/overview.md) or [terraform](https://learn.microsoft.com/azure/developer/terraform/overview).

When exporting from a resource group or resource, the exported template is generated from the [published schemas](https://github.com/Azure/azure-resource-manager-schemas/tree/master/schemas) for each resource type. Occasionally, the schema doesn't have the latest version for a resource type. Check your exported template to make sure it includes the properties you need. If necessary, edit the exported template to use the API version you need.

Some password parameters might be missing from the exported templates. You need to check [template reference](https://learn.microsoft.com/azure/templates), and manually add these parameters before you can use the templates to deploy resources.

The export template feature doesn't support exporting Azure Data Factory resources. To learn about how you can export Data Factory resources, see [Copy or clone a data factory in Azure Data Factory](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-factory/copy-clone-data-factory.md).

To export resources created through classic deployment model, you must [migrate them to the Resource Manager deployment model](https://learn.microsoft.com/azure/virtual-machines/migration-classic-resource-manager-overview).

If you get a warning when exporting a template that indicates a resource type wasn't exported, you can still discover the properties for that resource. For resource properties, see [template reference](https://learn.microsoft.com/azure/templates). You can also look at the [Azure REST API](https://learn.microsoft.com/rest/api/azure/) for the resource type.

There's a limit of 200 resources in the resource group you create the exported template for. If you attempt to export a resource group that has more than 200 resources, the error message `Export template is not supported for resource groups more than 200 resources` is shown.


## Export Bicep file from a resource group

To export one or more resources from a resource group:

1. Select the resource group that contains the resources you want to export.

1. Select one or more resources by selecting the checkboxes. To select all, select the checkbox on the left of **Name**. The **Export template** from the top menu only becomes enabled after you've selected at least one resource.

   Screenshot of selecting all resources for export in Azure portal.

1. Select **Export template** from the top menu. The **Export template** from the left menu exports all the resources in the group to a Bicep file.

1. Select **Bicep**. The exported Bicep file is displayed, and is available to download and deploy.

   Screenshot of the displayed exported Bicep file in Azure portal.

   All template parameters are included when the Bicep file is generated. 

## Export Bicep file from a resource

To export one resource:

1. Select the resource group containing the resource you want to export.

1. Select the resource that you want to export to open the resource.

1. For that resource, select **Export template** in the left pane.

   Screenshot of exporting a single resource in Azure portal.

1. Select **Bicep**. The exported Bicep file is displayed, and is available to download and deploy. The Bicep file only contains the single resource. All template parameters are included when the Bicep file is generated.

## Export template after deployment

This option supports exporting only ARM JSON templates. It retrieves an exact copy of the template used for deployment, allowing you to select a specific deployment from the deployment history. After exporting, you can [decompile](decompile.md) them into to Bicep files. For more information about saving from history and the export options, see [Choose the right export option](../templates/export-template-portal.md#choose-the-right-export-option).

## Next steps

* Learn how to export ARM JSON templates with [Azure CLI](../templates/export-template-cli.md), [Azure PowerShell](../templates/export-template-powershell.md), or [REST API](https://learn.microsoft.com/rest/api/resources/resourcegroups/exporttemplate).
* Learn the [Bicep file structure and syntax](file.md).
* Learn how to [decompile ARM JSON templates to Bicep](decompile.md).
