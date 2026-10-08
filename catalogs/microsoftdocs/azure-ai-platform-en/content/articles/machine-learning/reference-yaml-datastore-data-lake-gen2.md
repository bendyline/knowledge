---
title: 'CLI (v2) Azure Data Lake Gen2 datastore YAML schema'
titleSuffix: Azure Machine Learning
description: Reference documentation for the CLI (v2) Azure Data Lake Gen2 datastore YAML schema.
services: machine-learning
ms.service: azure-machine-learning
ms.subservice: mldata
ms.topic: reference
ms.custom: cliv2

author: s-polly
ms.author: scottpolly
ms.date: 12/15/2023
ms.reviewer: soumyapatro
---

# CLI (v2) Azure Data Lake Gen2 YAML schema


**APPLIES TO:**  [Azure CLI ml extension **v2 (current)**](how-to-configure-cli.md) 


The source JSON schema can be found at [this resource](https://azuremlschemas.azureedge.net/latest/azureDataLakeGen2.schema.json).


> **Note:**
> The YAML syntax detailed in this document is based on the JSON schema for the latest version of the ML CLI v2 extension. This syntax is guaranteed only to work with the latest version of the ML CLI v2 extension.
> You can find the schemas for older extension versions at [https://azuremlschemasprod.azureedge.net/](https://azuremlschemasprod.azureedge.net/).


## YAML syntax

| Key | Type | Description | Allowed values | Default value |
| --- | --- | --- | --- | --- |
| `$schema` | string | The YAML schema. If you use the Azure Machine Learning Visual Studio Code extension to author the YAML file, you can invoke schema and resource completions if you include `$schema` at the top of your file. |  |  |
| `type` | string | **Required.**  The datastore type. | `azure_data_lake_gen2` |  |
| `name` | string | **Required.**  The datastore name. |  |  |
| `description` | string | The datastore description. |  |  |
| `tags` | object | The datastore tag dictionary. |  |  |
| `account_name` | string | **Required.** The Azure storage account name. |  |  |
| `filesystem` | string | **Required.** The file system name. The parent directory containing the files and folders, equivalent to an Azure Blog storage container. |  |  |
| `endpoint` | string | The endpoint suffix of the storage service, used for creation of the storage account endpoint URL. It combines the storage account name and `endpoint`. Example storage account URL: `https://<storage-account-name>.dfs.core.windows.net`. |  | `core.windows.net` |
| `protocol` | string | Protocol for connection to the file system. | `https`, `abfss` | `https` |
| `credentials` | object | Service principal credentials for connecting to the Azure storage account. Credential secrets are stored in the workspace key vault. |  |  |
| `credentials.tenant_id` | string | The service principal tenant ID. **Required if `credentials` is specified.** |  |  |
| `credentials.client_id` | string | The service principal client ID. **Required if `credentials` is specified.** |  |  |
| `credentials.client_secret` | string | The service principal client secret. **Required if `credentials` is specified.** |  |  |
| `credentials.resource_url` | string | The resource URL that specifies the operations that will be performed on the Azure Data Lake Storage Gen2 account. |  | `https://storage.azure.com/` |
| `credentials.authority_url` | string | The authority URL used for user authentication. |  | `https://login.microsoftonline.com` |

## Remarks

The `az ml datastore` command can be used for managing Azure Machine Learning datastores.

## Examples

Examples are available in the [examples GitHub repository](https://github.com/Azure/azureml-examples/tree/main/cli/resources/datastore). Several are shown here:

## YAML: identity-based access

[Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/resources/datastore/adls-gen2-credless.yml](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/reference-yaml-datastore-data-lake-gen2.md)

## YAML: tenant ID, client ID, client secret

[Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/resources/datastore/adls-gen2.yml](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/reference-yaml-datastore-data-lake-gen2.md)

## Next steps

- [Install and use the CLI (v2)](how-to-configure-cli.md)
