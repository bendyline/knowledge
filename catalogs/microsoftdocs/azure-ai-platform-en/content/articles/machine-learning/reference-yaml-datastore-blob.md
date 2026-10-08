---
title: 'CLI (v2) Azure Blob datastore YAML schema'
titleSuffix: Azure Machine Learning
description: Reference documentation for the CLI (v2) Azure Blob datastore YAML schema.
services: machine-learning
ms.service: azure-machine-learning
ms.subservice: mldata
ms.topic: reference
ms.custom: cliv2

author: s-polly
ms.author: scottpolly
ms.date: 04/15/2024
ms.reviewer: soumyapatro
---

# CLI (v2) Azure Blob datastore YAML schema


**APPLIES TO:**  [Azure CLI ml extension **v2 (current)**](how-to-configure-cli.md) 


See the source JSON schema at https://azuremlschemas.azureedge.net/latest/azureBlob.schema.json.


> **Note:**
> The YAML syntax detailed in this document is based on the JSON schema for the latest version of the ML CLI v2 extension. This syntax is guaranteed only to work with the latest version of the ML CLI v2 extension.
> You can find the schemas for older extension versions at [https://azuremlschemasprod.azureedge.net/](https://azuremlschemasprod.azureedge.net/).


## YAML syntax

| Key | Type | Description | Allowed values | Default value |
| --- | --- | --- | --- | --- |
| `$schema` | string | The YAML schema. If you use the Azure Machine Learning Visual Studio Code extension to author the YAML file, include `$schema` at the top of your file to invoke schema and resource completions. |  |  |
| `type` | string | **Required.** The datastore type. | `azure_blob` |  |
| `name` | string | **Required.** The datastore name. |  |  |
| `description` | string | The datastore description. |  |  |
| `tags` | object | The datastore tag dictionary. |  |  |
| `account_name` | string | **Required.** The Azure storage account name. |  |  |
| `container_name` | string | **Required.** The container name. |  |  |
| `endpoint` | string | The endpoint suffix of the storage service, used for creation of the storage account endpoint URL. It combines the storage account name and `endpoint`. Example storage account URL: `https://<storage-account-name>.blob.core.windows.net`. |  | `core.windows.net` |
| `protocol` | string | Protocol for connection to the container. | `https`, `wasbs` | `https` |
| `credentials` | object | Credential-based authentication credentials for connection to the Azure storage account. An account key or a shared access signature (SAS) token will work. The workspace key vault stores the credential secrets. |  |  |
| `credentials.account_key` | string | The account key used for storage account access. **One of `credentials.account_key` or `credentials.sas_token` is required if `credentials` is specified.** |  |  |
| `credentials.sas_token` | string | The SAS token for accessing the storage account. **One of `credentials.account_key` or `credentials.sas_token` is required if `credentials` is specified.** |  |  |

## Remarks

You can use the `az ml datastore` command to manage Azure Machine Learning datastores.

## Examples

Visit [this GitHub resource](https://github.com/Azure/azureml-examples/tree/main/cli/resources/datastore) for examples. Several are shown here:

## YAML: identity-based access

[Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/resources/datastore/blob-credless.yml](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/reference-yaml-datastore-blob.md)

## YAML: account key

[Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/resources/datastore/blob.yml](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/reference-yaml-datastore-blob.md)

## YAML: wasbs protocol

[Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/resources/datastore/blob-protocol.yml](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/reference-yaml-datastore-blob.md)

## YAML: sas token

[Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/resources/datastore/blob-sas.yml](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/reference-yaml-datastore-blob.md)

## Next steps

- [Install and use the CLI (v2)](how-to-configure-cli.md)
