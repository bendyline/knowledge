---
title: Deploy to existing virtual network
description: Describes how to enable users of your managed application to select an existing virtual network. The virtual network can be outside of the managed application.
ms.topic: how-to
ms.date: 06/24/2024
---

# Use existing virtual network with Azure Managed Applications

This article shows you how to define an Azure Managed Application that integrates with an existing virtual network in the consumer's subscription. The managed application lets the consumer decide whether to create a new virtual network or use an existing one. The existing virtual network can be outside of the managed resource group.

## Main template

First, let's look at the _mainTemplate.json_ file. The whole template for deploying a virtual machine and its associated resources is shown. Later, you review the parts of the template that are related to using an existing virtual network.

[Code reference unavailable in this source snapshot: ~/resourcemanager-templates/managed-app-existing-vnet/mainTemplate.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/managed-applications/existing-vnet-integration.md)

Notice that the virtual network is [conditionally deployed](../templates/conditional-resource-deployment.md). The consumer passes in a parameter value that indicates whether to create a new or use existing virtual network. If the consumer selects a new virtual network, the resource is deployed. Otherwise, the resource is skipped during deployment.

[Code reference unavailable in this source snapshot: ~/resourcemanager-templates/managed-app-existing-vnet/mainTemplate.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/managed-applications/existing-vnet-integration.md)

The variable for the virtual network ID has two properties. One property returns the resource ID when a new virtual network is deployed. The other property returns the resource ID when an existing virtual network is used. The resource ID for the existing virtual network includes the name of the resource group that contains the virtual network.

The subnet ID is constructed from the value for the virtual network ID. It uses the value matches the consumers selection.

[Code reference unavailable in this source snapshot: ~/resourcemanager-templates/managed-app-existing-vnet/mainTemplate.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/managed-applications/existing-vnet-integration.md)

The network interface is set to the subnet ID variable.

[Code reference unavailable in this source snapshot: ~/resourcemanager-templates/managed-app-existing-vnet/mainTemplate.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/managed-applications/existing-vnet-integration.md)

## UI definition

Now, let's look at the _createUiDefinition.json_ file. The whole file is:

[Code reference unavailable in this source snapshot: ~/resourcemanager-templates/managed-app-existing-vnet/createUiDefinition.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/managed-applications/existing-vnet-integration.md)

The file includes a virtual network element.

[Code reference unavailable in this source snapshot: ~/resourcemanager-templates/managed-app-existing-vnet/createUiDefinition.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/managed-applications/existing-vnet-integration.md)

That element lets the consumer select either a new or existing virtual network.

New or existing virtual network

In the outputs, you include a value that indicates whether the consumer selected a new or existing virtual network. There's also a managed identity value.

> **Note:**
> The output value for the managed identity must be named `managedIdentity`.

[Code reference unavailable in this source snapshot: ~/resourcemanager-templates/managed-app-existing-vnet/createUiDefinition.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/managed-applications/existing-vnet-integration.md)

## Next steps

To learn more about creating the UI definition file, see [CreateUiDefinition.json for Azure managed application's create experience](create-uidefinition-overview.md).
