---
title: 'CLI (v2) Azure Files datastore YAML schema'
titleSuffix: Azure Machine Learning
description: Reference documentation for the CLI (v2) Azure Files datastore YAML schema.
services: machine-learning
ms.service: azure-machine-learning
ms.subservice: mlops
ms.topic: reference
ms.custom: cliv2

author: s-polly
ms.author: scottpolly
ms.date: 12/18/2023
ms.reviewer: jturuk
---

# CLI (v2) Azure Files datastore YAML schema


**APPLIES TO:**  [Azure CLI ml extension **v2 (current)**](how-to-configure-cli.md) 


The source JSON schema can be found at https://azuremlschemas.azureedge.net/latest/azureFile.schema.json.


> **Note:**
> The YAML syntax detailed in this document is based on the JSON schema for the latest version of the ML CLI v2 extension. This syntax is guaranteed only to work with the latest version of the ML CLI v2 extension.
> You can find the schemas for older extension versions at [https://azuremlschemasprod.azureedge.net/](https://azuremlschemasprod.azureedge.net/).


## YAML syntax

| Key | Type | Description | Allowed values | Default value |
| --- | --- | --- | --- | --- |
| `$schema` | string | The YAML schema. If you use the Azure Machine Learning VS Code extension to author the YAML file, include `$schema` at the top of your file to invoke schema and resource completions. |  |  |
| `type` | string | **Required.** The datastore type. | `azure_file` |  |
| `name` | string | **Required.** The datastore name. |  |  |
| `description` | string | The datastore description. |  |  |
| `tags` | object | The datastore tag dictionary. |  |  |
| `account_name` | string | **Required.** The Azure storage account name. |  |  |
| `file_share_name` | string | **Required.** The file share name. |  |  |
| `endpoint` | string | Endpoint suffix of the storage service. This is used to create the storage account endpoint URL. It combines the storage account name and `endpoint`. Example storage account URL: `https://<storage-account-name>.file.core.windows.net`. |  | `core.windows.net` |
| `protocol` | string | Protocol to use to connect to the file share. | `https` | `https` |
| `credentials` | object | Credential-based authentication credentials to connect to the Azure storage account. Provide either an account key or a shared access signature (SAS) token for this. Credential secrets are stored in the workspace key vault. |  |  |
| `credentials.account_key` | string | The account key to access the storage account. **One of either`credentials.account_key` or `credentials.sas_token` is required if `credentials` is specified.** |  |  |
| `credentials.sas_token` | string | The SAS token to access the storage account. **One of `credentials.account_key` or `credentials.sas_token` is required if `credentials` is specified.** |  |  |

## Remarks

The `az ml datastore` command can be used for managing Azure Machine Learning datastores.

## Examples

Examples are available in the [examples GitHub repository](https://github.com/Azure/azureml-examples/tree/main/cli/resources/datastore). Several are shown below.

## YAML: account key

[Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/resources/datastore/file.yml](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/reference-yaml-datastore-files.md)

## YAML: sas token

[Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/resources/datastore/file-sas.yml](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/reference-yaml-datastore-files.md)

## Next steps

- [Install and use the CLI (v2)](how-to-configure-cli.md)
