---
title: How to create custom projects
titleSuffix: Foundry Tools
author: laujan
manager: mcleans
ms.service: azure-language-foundry-tools
ms.topic: include
ms.date: 02/23/2026
ms.author: lajanuar
---
| Requirement | Description |
| --- | --- |
| Regions | If you don't have a resource, you need to create a new one in a supported region. |
| Pricing tier | pricing tier for your resource. |
| Managed identity | Make sure that the resource's managed identity setting is enabled. Otherwise, read the next section. |

To use this service, you'll need to [create an Azure storage account](https://learn.microsoft.com/azure/storage/common/storage-account-create) if you don't have one already.

## Enable identity management using Azure portal

Your Language resource must have identity management, to enable it using [Azure portal](https://portal.azure.com/):

1. Go to your Language resource
1. From left hand menu, under **Resource Management** section, select **Identity**
1. From **System assigned** tab, make sure to set **Status** to **On**

### Enable the custom feature for your resource

Make sure to enable this service's custom feature from Azure portal.

1. Go to your Language resource in [Azure portal](https://portal.azure.com/)
1. From the left side menu, under **Resource Management** section, select **Features**
1. Enable this service's custom feature
1. Connect your storage account
1. Select **Apply**

> **Important:**
> Make sure that your **Language resource** has **storage blob data contributor** role assigned on the storage account you're connecting.

### Set roles for your Azure Language resource and storage account

Use the following steps to set the required roles for your Language resource and storage account.

An animated image showing how to set roles in the Azure portal.

### Roles for your Azure Language in Foundry Tools resource

1. Go to your storage account or Language resource in the [Azure portal](https://portal.azure.com/).
2. Select **Access Control (IAM)** in the left pane.
3. Select **Add** to **Add Role Assignments**, and choose the appropriate role for your account.

    * You should have the **owner** or **contributor** role assigned on your Language resource.

4. Within **Assign access to**, select **User, group, or service principal**
5. Select **Select members**
6. Select your user name. You can search for user names in the **Select** field. Repeat this for all roles. 
7. Repeat these steps for all the user accounts that need access to this resource. 

### Roles for your storage account

1. Go to your storage account page in the [Azure portal](https://portal.azure.com/).
2. Select **Access Control (IAM)** in the left pane.
3. Select **Add** to **Add Role Assignments**, and choose the **Storage blob data contributor** role on the storage account.
4. Within **Assign access to**, select **Managed identity**. 
5. Select **Select members**
6. Select your subscription, and **Language** as the managed identity. You can search for user names in the **Select** field. 

> **Important:**
> If you have a virtual network or private endpoint, be sure to select **Allow Azure services on the trusted services list to access this storage account** in the Azure portal.


### Enable CORS for your storage account

Make sure to allow (**GET, PUT, DELETE**) methods when enabling Cross-Origin Resource Sharing (CORS).
Set allowed origins field to `https://language.cognitive.azure.com`. Allow all header by adding `*` to the allowed header values, and set the maximum age to `500`.

A screenshot showing how to use CORS for storage accounts.
