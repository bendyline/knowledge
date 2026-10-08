---
title: Using credentials
titleSuffix: Azure Data Factory & Azure Synapse
description: Learn about using Azure credentials for Azure Data Factory. 
author: nabhishek
ms.subservice: security
ms.topic: how-to
ms.date: 09/26/2024
ms.author: abnarain 
ms.custom:
  - synapse
  - sfi-image-nochange
---

# Credentials in Azure Data Factory and Azure Synapse

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


## Prerequisites

Users must have the Managed Identity Operator (Azure RBAC) role or a custom role with **Microsoft.ManagedIdentity/userAssignedIdentities/*/assign/action** RBAC action to configure a user assigned managed identity as a credential. Additional RBAC is required to create and use credentials in Synapse. [Learn more](../synapse-analytics/security/synapse-workspace-synapse-rbac-roles.md).

## Using credentials

We are introducing Credentials which can contain user-assigned managed identities, service principals, and also lists the system-assigned managed identity that you can use in the linked services that support Microsoft Entra authentication. It helps you consolidate and manage all your Microsoft Entra ID-based credentials.  

Below are the generic steps for using a **user-assigned managed identity** in the linked services for authentication. 

# [Azure Data Factory](#tab/data-factory)

1. If you do not have a user-assigned managed identity created in Azure, first create one in the Azure portal [Managed Identities](https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.ManagedIdentity%2FuserAssignedIdentities) page.

1. Associate the user-assigned managed identity to the data factory instance using Azure portal, SDK, PowerShell, REST API. The screenshot below used Azure portal (data factory blade) to associate the user-assigned managed identity.

   Screenshot showing how to use Azure portal to associate a user-assigned managed identity.

1. Create a **Credential** in data factory user interface interactively. You can select the user-assigned managed identity associated with the data factory in Step 1. 

   Screenshot showing the creation of new credentials.

   Screenshot showing the configuration of new credentials.

1. Create a new linked service and select **User-assigned managed identity** under authentication

   Screenshot showing the new linked service with user-assigned managed identity authentication.

   Screenshot showing the new linked service configuration with User-Assigned Managed Identity and credentials selected.

# [Azure Synapse](#tab/synapse-analytics)

1. If you do not have a user-assigned managed identity created in Azure, first create one in the Azure portal [Managed Identities](https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.ManagedIdentity%2FuserAssignedIdentities) page.

1. Associate the user-assigned managed identity to the workspace using Azure portal, SDK, PowerShell, REST API. The screenshot below used Azure portal (Identity blade) to associate the user-assigned managed identity.

   Screenshot showing how to use Azure portal to associate a user-assigned managed identity.

1. Create a **Credential** in Synapse Studio interactively. You can select the user-assigned managed identity associated with the workspace in Step 1.

   Screenshot showing the creation of new credentials.

   Screenshot showing the configuration of new credentials.

1. Create a new linked service and select **User-assigned managed identity** under authentication

   Screenshot showing the new linked service with user-assigned managed identity authentication.

   Screenshot showing the new linked service configuration with User-Assigned Managed Identity and credentials selected.

---

## Managing credentials with scripts

You can use the [SDK](https://learn.microsoft.com/dotnet/api/microsoft.azure.management.synapse?preserve-view=true\&view=azure-dotnet-preview), [PowerShell](https://learn.microsoft.com/powershell/module/az.synapse/?context=%2Fazure%2Fsynapse-analytics%2Fcontext%2Fcontext\&view=azps-9.1.0\&preserve-view=true), and [REST APIs](https://learn.microsoft.com/rest/api/synapse/) for the above actions. An example of creating a user-assigned managed identity and assigning it permissions to a resource with Bicep/ARM is available in [this example](https://github.com/Azure/azure-quickstart-templates/tree/master/quickstarts/microsoft.datafactory/data-factory-get-started). Linked services with user-assigned managed identity are currently not supported in Synapse Spark. 

## Related content

- [Managed identity](data-factory-service-identity.md)

See the following topics that introduce when and how to use managed identity:

- [Store credential in Azure Key Vault](store-credentials-in-key-vault.md)
- [Copy data from/to Azure Data Lake Store using managed identities for Azure resources authentication](connector-azure-data-lake-store.md)

See [Managed Identities for Azure Resources Overview](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/overview.md) for more background on managed identities for Azure resources, which data factory managed identity is based upon.
