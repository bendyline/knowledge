---
author: mumian
ms.service: azure-resource-manager
ms.topic: include
ms.date: 02/14/2025
ms.author: jgao
---

To assist with creating Azure Resource Manager templates, you can export a template from existing resources as either a [Bicep file](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/bicep/overview.md) or an [ARM JSON template](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/templates/overview.md). The exported template helps you understand the syntax and properties needed for resource deployment. To streamline future deployments, use the exported template as a starting point and customize it for your needs. While the export process generates a functional template, most exported templates require adjustments before they can be used for deployment.

Resource Manager enables you to pick one or more resources for exporting to a template. You can focus on exactly the resources you need in the template.
