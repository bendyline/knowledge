---
title: Encrypt credentials in Azure Data Factory
description: Learn how to encrypt and store credentials for your on-premises data stores on a machine with self-hosted integration runtime.
author: kromerm
ms.subservice: integration-runtime
ms.topic: how-to
ms.date: 05/15/2024
ms.author: makromer
ms.custom:
  - devx-track-azurepowershell
  - sfi-ropc-nochange
---

# Encrypt credentials for on-premises data stores in Azure Data Factory

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics


> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


You can encrypt and store credentials for any of your on-premises data stores (linked services with sensitive information) on a machine with self-hosted integration runtime.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/updated-for-az.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-factory/encrypt-credentials-self-hosted-integration-runtime.md)

You pass a JSON definition file with credentials to the <br/>[**New-AzDataFactoryV2LinkedServiceEncryptedCredential**](https://learn.microsoft.com/powershell/module/az.datafactory/New-AzDataFactoryV2LinkedServiceEncryptedCredential) cmdlet to produce an output JSON definition file with the encrypted credentials. Then, use the updated JSON definition to create the linked services.

## Create a linked service with encrypted credentials

This example shows how to create a linked service to an on-premises SQL Server data source with encrypted credentials.

### Create initial linked service JSON file description

Create a JSON file named **SqlServerLinkedService.json** with the following content:

Replace `<servername>`, `<databasename>`, `<username>`, and `<password>` with values for your SQL Server before saving the file. And, replace `<integration runtime name>` with the name of your integration runtime.

```json
{
    "properties": {
        "type": "SqlServer",
        "typeProperties": {
            "connectionString": "Server=<servername>;Database=<databasename>;User ID=<username>;Password=<password>;Timeout=60"
        },
        "connectVia": {
            "type": "integrationRuntimeReference",
            "referenceName": "<integration runtime name>"
        },
        "name": "SqlServerLinkedService"
    }
}
```

### Encrypt credentials
To encrypt the sensitive data from the JSON payload on an on-premises self-hosted integration runtime, run **New-AzDataFactoryV2LinkedServiceEncryptedCredential**, and pass on the JSON payload. This cmdlet ensures the credentials are encrypted using DPAPI and stored on the self-hosted integration runtime node locally. The output payload containing the encrypted reference to the credential can be redirected to another JSON file (in this case 'encryptedLinkedService.json').

Please ensure the following prerequisites are met:
- Remote access option is enabled on the self-hosted integration runtime.
- Powershell 7.0 or higher is used to execute the cmdlet.

```powershell
New-AzDataFactoryV2LinkedServiceEncryptedCredential -DataFactoryName $dataFactoryName -ResourceGroupName $ResourceGroupName -IntegrationRuntimeName 'test-selfhost-ir' -DefinitionFile ".\SQLServerLinkedService.json" > encryptedSQLServerLinkedService.json
```

### Use the JSON with encrypted credentials
Now, use the output JSON file from the previous command containing the encrypted credential to set up the **SqlServerLinkedService**.

```powershell
Set-AzDataFactoryV2LinkedService -DataFactoryName $dataFactoryName -ResourceGroupName $ResourceGroupName -Name "EncryptedSqlServerLinkedService" -DefinitionFile ".\encryptedSqlServerLinkedService.json"
```

## Related content
For information about security considerations for data movement, see [Data movement security considerations](data-movement-security-considerations.md).
