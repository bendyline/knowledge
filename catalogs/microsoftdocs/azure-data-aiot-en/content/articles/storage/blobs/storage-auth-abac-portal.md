---
title: "Tutorial: Add a role assignment condition to restrict access to blobs using the Azure portal - Azure ABAC"
titleSuffix: Azure Storage
description: Add a role assignment condition to restrict access to blobs using the Azure portal and Azure attribute-based access control (Azure ABAC).
author: normesta
ms.author: normesta
ms.service: azure-blob-storage
ms.topic: tutorial
ms.reviewer: nachakra
ms.date: 03/15/2023
ms.custom: sfi-image-nochange

#Customer intent:

# Customer intent: As a cloud administrator, I want to implement role assignment conditions for blob storage access, so that I can enforce granular access control based on attributes like tags, ensuring users only access the data they need.
---

# Tutorial: Add a role assignment condition to restrict access to blobs using the Azure portal

In most cases, a role assignment grants the permissions you need to Azure resources. However, in some cases you might want to provide more granular access control by adding a role assignment condition.

In this tutorial, you learn how to:

> 
>
> - Add a condition to a role assignment
> - Restrict access to blobs based on a blob index tag


> **Important:**
> Azure attribute-based access control (Azure ABAC) is generally available (GA) for controlling access to Azure Blob Storage, Azure Data Lake Storage Gen2, and Azure Queues using `request`, `resource`, `environment`, and `principal` attributes in both the standard and premium storage account performance tiers. Currently, the list blob include request attribute and snapshot request attribute for hierarchical namespace are in PREVIEW. For complete feature status information of ABAC for Azure Storage, see [Status of condition features in Azure Storage](storage-auth-abac.md#status-of-condition-features-in-azure-storage).
>
> See the [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/) for legal terms that apply to Azure features that are in beta, preview, or otherwise not yet released into general availability.


## Prerequisites

For information about the prerequisites to add or edit role assignment conditions, see [Conditions prerequisites](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/conditions-prerequisites.md).

## Condition

In this tutorial, you restrict access to blobs with a specific tag. For example, you add a condition to a role assignment so that Chandra can only read files with the tag `Project=Cascade`.

Diagram of role assignment with a condition.

If Chandra tries to read a blob without the tag `Project=Cascade`, access isn't allowed.

Diagram showing read access to blobs with Project=Cascade tag.

Here's what the condition looks like in code:

```
(
    (
        !(ActionMatches{'Microsoft.Storage/storageAccounts/blobServices/containers/blobs/read'}
        AND NOT
        SubOperationMatches{'Blob.List'})
    )
    OR
    (
        @Resource[Microsoft.Storage/storageAccounts/blobServices/containers/blobs/tags:Project<$key_case_sensitive$>] StringEqualsIgnoreCase 'Cascade'
    )
)
```

## Step 1: Create a user

1. Sign in to the Azure portal as an Owner of a subscription.

1. Select **Microsoft Entra ID**.

1. Create a user or find an existing user. This tutorial uses Chandra as the example.

## Step 2: Set up storage

1. Create a storage account that is compatible with the blob index tags feature. For more information, see [Manage and find Azure Blob data with blob index tags](storage-manage-find-blobs.md#regional-availability-and-storage-account-support).

1. Create a new container within the storage account and set the anonymous access level to **Private (no anonymous access)**.

1. In the container, select **Upload** to open the Upload blob pane.

1. Find a text file to upload.

1. Select **Advanced** to expand the pane.

1. In the **Blob index tags** section, add the following blob index tag to the text file.

    If you don't see the Blob index tags section and you just registered your subscription, you might need to wait a few minutes for changes to propagate. For more information, see [Use blob index tags to manage and find data on Azure Blob Storage](storage-blob-index-how-to.md).

    > **Note:**
    > Blobs also support the ability to store arbitrary user-defined key-value metadata. Although metadata is similar to blob index tags, you must use blob index tags with conditions.

    | Key | Value |
    | --- | --- |
    | Project | Cascade |

Screenshot showing Upload blob pane with Blog index tags section.

1. Select the **Upload** button to upload the file.

1. Upload a second text file.

1. Add the following blob index tag to the second text file.

    | Key | Value |
    | --- | --- |
    | Project | Baker |

## Step 3: Assign a storage blob data role

1. Open the resource group.

1. Select **Access control (IAM)**.

1. Select the **Role assignments** tab to view the role assignments at this scope.

1. Select **Add** > **Add role assignment**. The Add role assignment page opens:

Screenshot of Add > Add role assignment menu.

1. On the **Roles** tab, select the [Storage Blob Data Reader](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage-blob-data-reader) role.

Screenshot of Add role assignment page with Roles tab.

1. On the **Members** tab, select the user you created earlier.

Screenshot of Add role assignment page with Members tab.

1. (Optional) In the **Description** box, enter **Read access to blobs with the tag Project=Cascade**.

1. Select **Next**.

## Step 4: Add a condition

1. On the **Conditions (optional)** tab, select **Add condition**. The Add role assignment condition page appears:

Screenshot of Add role assignment condition page for a new condition.

1. In the Add action section, select **Add action**.

    The Select an action pane appears. This pane is a filtered list of data actions based on the role assignment that will be the target of your condition. Check the box next to **Read a blob**, then select **Select**:

Screenshot of Select an action pane with an action selected.

1. In the Build expression section, select **Add expression**.

    The Expression section expands.

1. Specify the following expression settings:

    | Setting | Value |
    | --- | --- |
    | Attribute source | Resource |
    | Attribute | Blob index tags [Values in key] |
    | Key | Project |
    | Operator | StringEqualsIgnoreCase |
    | Value | Cascade |

Screenshot of Build expression section for blob index tags.

1. Scroll up to **Editor type** and select **Code**.

    The condition is displayed as code. You can make changes to the condition in this code editor. To go back to the visual editor, select **Visual**.

Screenshot of condition displayed in code editor.

1. Select **Save** to add the condition and return to the Add role assignment page.

1. Select **Next**.

1. On the **Review + assign** tab, select **Review + assign** to assign the role with a condition.

    After a few moments, the security principal is assigned the role at the selected scope.

Screenshot of role assignment list after assigning role.

## Step 5: Assign Reader role

- Repeat the previous steps to assign the [Reader](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#reader) role to the user you created earlier at resource group scope.

    > **Note:**
    > You typically don't need to assign the Reader role. However, this is done so that you can test the condition using the Azure portal.

## Step 6: Test the condition

1. In a new window, sign in to the [Azure portal](https://portal.azure.com).

1. Sign in as the user you created earlier.

1. Open the storage account and container you created.

1. Ensure that the authentication method is set to **Microsoft Entra user Account** and not **Access key**.

Screenshot of storage container with test files.

1. Select the Baker text file.

    You should **NOT** be able to view or download the blob and an authorization failed message should be displayed.
 
1. Select Cascade text file.

    You should be able to view and download the blob.

## Step 7: Clean up resources

1. Remove the role assignment you added.

1. Delete the test storage account you created.

1. Delete the user you created.

## Next steps

- [Example Azure role assignment conditions](storage-auth-abac-examples.md)
- [Actions and attributes for Azure role assignment conditions in Azure Storage](storage-auth-abac-attributes.md)
- [Azure role assignment condition format and syntax](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/conditions-format.md)
