---
title: Creating a private endpoint for Azure Data Manager for Agriculture
description: Learn how to use private links in Azure Data Manager for Agriculture
author: BlackRider97
ms.author: ramithar
ms.service: azure-data-manager-agriculture
ms.topic: how-to
ms.date: 03/22/2023
ms.custom:
  - template-how-to
  - sfi-image-nochange
---

# Create a private endpoint for Azure Data Manager for Agriculture

[Azure Private Link](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/private-link-overview.md) provides private connectivity from a virtual network to Azure platform as a service (PaaS). It simplifies the network architecture and secures the connection between endpoints in Azure by eliminating data exposure to the public internet.

By using Azure Private Link, you can connect to an Azure Data Manager for Agriculture service from your virtual network via a private endpoint, which is a set of private IP addresses in a subnet within the virtual network. You can then limit access to your Azure Data Manager for Agriculture Preview instance over these private IP addresses.

This article describes how to create a private endpoint and approval process for Azure Data Manager for Agriculture Preview.

## Prerequisites

[Create a virtual network](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quick-create-portal.md) in the same subscription as the Azure Data Manager for Agriculture Preview instance. This virtual network will allow automatic approval of the Private Link endpoint.

## How to set up a private endpoint
Private Endpoints can be created using the Azure portal, PowerShell, or the Azure CLI:

*  [Azure portal](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/create-private-endpoint-portal.md)
*  [PowerShell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/create-private-endpoint-powershell.md)
*  [CLI](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/create-private-endpoint-cli.md)

### Approval process for a private endpoint
Once the network admin creates the private endpoint, the Data Manager for Agriculture admin can manage the private endpoint connection to Data Manager for Agriculture resource.

1. Navigate to the Data Manager for Agriculture resource in Azure portal. Select the Networking tab in the left pane, this will show a list of all Private Endpoint Connections and Corresponding Private Endpoint created.
  Screenshot showing list of private endpoint connections in Azure portal.

2. Select an individual private endpoint connection from the list.
  Screenshot showing how to select a private endpoint.

3. The Data Manager for Agriculture administrator can choose to approve or reject a private endpoint connection and can optionally add a short text response also. 
  Screenshot showing how to approve a private endpoint connection.

4. After approval or rejection, the list will reflect the appropriate state along with the response text. 
  Screenshot showing private endpoint connection status.

5. Finally click on the private endpoint name to see the network interface details and IP address of your private endpoint.
  Screenshot showing where to click to get network interface details.
  Screenshot showing private endpoint connection status.
  Screenshot showing private endpoint IP address.

## Disable public access to your Data Manager for Agriculture resource
If you want to disable all public access to your Data Manager for Agriculture resource and allow connections only from your virtual network then you need to ensure that your private endpoint connections are enabled and configured. To disable public access to your Data Manager for Agriculture resource:

1. Go to the Networking page of your Data Manager for Agriculture resource.
2. Select the Deny public network access checkbox.


## Next steps

* See the Hierarchy Model and learn how to create and organize your agriculture data  [here](concepts-hierarchy-model.md).
* Understand our APIs [here](https://learn.microsoft.com/rest/api/data-manager-for-agri).
