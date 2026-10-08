---
title: Post-deployment configuration with extensions
description: Learn how to use Azure Resource Manager template (ARM template) extensions for post-deployment configurations.
ms.topic: article
ms.custom: devx-track-arm-template
ms.date: 06/26/2026
---

# Post-deployment configurations by using extensions

Azure Resource Manager template (ARM template) extensions are small applications that provide post-deployment configuration and automation tasks on Azure resources. The most popular one is virtual machine extensions. See [Virtual machine extensions and features for Windows](https://learn.microsoft.com/azure/virtual-machines/extensions/features-windows), and [Virtual machine extensions and features for Linux](https://learn.microsoft.com/azure/virtual-machines/extensions/features-linux).

## Extensions

The existing extensions are:

- [Microsoft.Compute/virtualMachines/extensions](https://learn.microsoft.com/azure/templates/microsoft.compute/virtualmachines/extensions)
- [Microsoft.Compute virtualMachineScaleSets/extensions](https://learn.microsoft.com/azure/templates/microsoft.compute/virtualmachinescalesets/extensions)
- [Microsoft.HDInsight clusters/extensions](https://learn.microsoft.com/azure/templates/microsoft.hdinsight/clusters)
- [Microsoft.Sql servers/databases/extensions](https://learn.microsoft.com/azure/templates/microsoft.sql/servers/databases/extensions)
- [Microsoft.Web/sites/siteextensions](https://learn.microsoft.com/azure/templates/microsoft.web/sites/siteextensions)

To find out the available extensions, browse to the [template reference](https://learn.microsoft.com/azure/templates/). In **Filter by title**, enter **extension**.

To learn how to use these extensions, see:

- [Tutorial: Deploy virtual machine extensions with ARM templates](template-tutorial-deploy-vm-extensions.md).
- [Tutorial: Import SQL BACPAC files with ARM templates](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/templates/template-tutorial-deploy-sql-extensions-bacpac.md)

## Next steps

> 
> [Tutorial: Deploy virtual machine extensions with ARM templates](template-tutorial-deploy-vm-extensions.md)
