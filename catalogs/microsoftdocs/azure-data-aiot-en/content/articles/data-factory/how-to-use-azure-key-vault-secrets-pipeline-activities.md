---
title: Use Azure Key Vault secrets in pipeline activities 
description: Learn how to fetch stored credentials from Azure Key Vault and use them during data factory pipeline runs. 
author: nabhishek
ms.author: abnarain
ms.subservice: security
ms.topic: how-to
ms.date: 02/13/2025
ms.custom: sfi-image-nochange
---

# Use Azure Key Vault secrets in pipeline activities

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


You can store credentials or secret values in an Azure Key Vault and use them during pipeline execution to pass to your activities.

## Prerequisites

This feature relies on the data factory managed identity.  Learn how it works from [Managed identity for Data Factory](data-factory-service-identity.md) and make sure your data factory has one associated.

## Steps

1. Open the properties of your data factory and copy the Managed Identity Application ID value.

    Managed Identity Value

2. Open the key vault access policies and add the managed identity permissions to Get and List secrets.

    Screenshot that shows the \&quot;Access policies\&quot; page with the \&quot;Add Access Policy\&quot; action highlighted.

    Key Vault access policies

    Click **Add**, then click **Save**.

3. Navigate to your Key Vault secret and copy the Secret Identifier.

    Secret Identifier

    Make a note of your secret URI that you want to get during your data factory pipeline run.
    
    > **Caution:**
    > The secret URI is structured like this: `{vaultBaseUrl}/secrets/{secret-name}/{secret-version}`. The _secret-version_ is optional; the latest version is returned when not specified. It is often desirable to specify a secret URI in a pipeline without a specific version so that the pipeline always uses the latest version of the secret.

4. In your Data Factory pipeline, add a new Web activity and configure it as follows.  

    | Property | Value |
    | --- | --- |
    | Secure Output | True |
    | URL | [Your secret URI value]?api-version=7.5 |
    | Method | GET |
    | Authentication | System Assigned Managed Identity |
    | Resource | https://vault.azure.net |

    Web activity

    > **Important:**
    > You must add **?api-version=7.5** to the end of your secret URI.

    > **Caution:**
    > Set the Secure Output option to true to prevent the secret value from being logged in plain text.  Any further activities that consume this value should have their Secure Input option set to true.

5. To use the value in another activity, use the following code expression **@activity('Web1').output.value**.

    Code expression

## Related content

To learn how to use Azure Key Vault to store credentials for data stores and computes, see [Store credentials in Azure Key Vault](store-credentials-in-key-vault.md)
