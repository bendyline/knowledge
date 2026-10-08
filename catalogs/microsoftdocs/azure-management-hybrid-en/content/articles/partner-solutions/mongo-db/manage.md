---
title: Manage a MongoDB Atlas Resource
description: Learn how to manage MongoDB Atlas resources in the Azure portal.
author: vpriyanshi
ms.author: priyverma
ms.topic: how-to
ms.date: 07/24/2025
---

# Manage a MongoDB Atlas resource

This article describes how to manage the settings for MongoDB Atlas resources.

## Resource overview


Begin by signing in to the [Azure portal](https://portal.azure.com/).

1. In the Azure portal search bar, enter *All resources* and select **All resources** from the results.

1. From the **Resources** list, select your resource.

   The Azure portal shows the resource with the **Overview** page open, by default.



Screenshot of a MongoDB Atlas resource overview in the Azure portal.

The details under **Essentials** include:

- Resource group
- Location
- Subscription
- Subscription ID
- Tags
- Status
- Pricing plan
- Billing term
- Portal URL

To manage your resource, select the links next to corresponding details.

## Access a MongoDB Atlas account

To access your MongoDB Atlas account, select **Go to MongoDB Atlas** on the working pane.

> **Note:**
> If you don't have an Atlas account for your Azure email address, you're prompted to configure your account and set a password.

Screenshot of a MongoDB Atlas resource overview in the Azure portal. The Go to MongoDB Atlas link is emphasized.

## Delete a resource


To delete a resource:

1. On the command bar, select **Delete**.

1. On the **Delete Resource** pane, optionally select a reason for deleting the resource.

1. In the **Enter resource name to confirm deletion** box, enter the name of the resource.

1. Select **Delete**.

1. Select **Delete** again to confirm deletion.

After the resource is deleted, all billing for that resource through Azure Marketplace stops.


> **Important:**
> Following these steps deletes your MongoDB Atlas Azure resource, but doesn't delete the organization in Atlas. To learn how to delete your Atlas organization, see [Delete an organization](https://www.mongodb.com/docs/atlas/access/orgs-create-view-edit-delete/#delete-an-organization) in MongoDB's documentation.

## Get support

Contact [MongoDB Atlas](https://www.mongodb.com/company/contact) for customer support. 

You can also request support in the Azure portal from the [resource overview](#resource-overview). Select **Support + Troubleshooting** > **New support request** from the service menu, then choose the link to [log a support request in the MongoDB portal](https://www.mongodb.com/company/contact).

## Related content

- [MongoDB Atlas resources and tools](tools.md)
