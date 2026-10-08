---
title: Configure export settings in Azure API for FHIR
description: Learn how to configure export settings in Azure API for FHIR.
author: expekesheth
ms.service: azure-health-data-services
ms.subservice: fhir
ms.topic: reference
ms.date: 11/20/2025
ms.author: kesheth
---

# Configure export settings in Azure API for FHIR


> **Important:**
> Microsoft deprecated Azure API for FHIR on **September 30, 2026**. For questions or assistance, create an Azure support request by using **Azure API for FHIR Extension Request**.


Azure API for FHIR&reg; supports the `$export` command, which allows you to export the data out of an Azure API for FHIR instance to a storage account.

The steps are:

1. Enable Managed Identity on Azure API for FHIR.
1. Create an Azure storage account and assign permissions to Azure API for FHIR to the storage account, if necessary.
1. Select the storage account in Azure API for FHIR as the export storage account.

## Enable managed identity on Azure API for FHIR

First, enable system-wide managed identity on the service. For more information, see [About managed identities for Azure resources](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/overview.md).

In the Azure portal, go to the Azure API for FHIR service. Select **Identity**. Changing the status to **On** enables managed identity in Azure API for FHIR.

Screenshot showing how to turn on a managed identity.

Then, create a storage account and assign permission to the service.

## Add permission to storage account

Next, assign permission for Azure API for FHIR to write to the storage account.

After you create a storage account, go to the **Access Control (IAM)** in the storage account, and then select **Add role assignment**. 

For more information, see [Azure built-in roles](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal).

It's here that you add the role [Storage Blob Data Contributor](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage-blob-data-contributor) to the service name, and then select **Save**.

Screenshot showing RBAC assignment page.

Next, select the storage account in Azure API for FHIR as a default storage account for `$export`.

## Select the storage account for $export

The final step is to assign the Azure storage account to export the data to. Go to **Export** in Azure API for FHIR and then select the storage account.

Screenshot showing selection of the storage account for export.

After you complete this final step, you’re ready to export the data by using the `$export` command.

> **Note:**
> Only storage accounts in the same subscription as Azure API for FHIR can be registered as the destination for `$export` operations.

## Next steps

[Additional settings](azure-api-for-fhir-additional-settings.md)


> **Note:**
> FHIR&reg; is a registered trademark of [HL7](https://hl7.org/fhir/) and is used with the permission of HL7.
