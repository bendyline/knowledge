---
title: 'CLI (v2) Azure Data Lake Gen1 datastore YAML schema'
titleSuffix: Azure Machine Learning
description: Reference documentation for the CLI (v2) Azure Data Lake Gen1 datastore YAML schema.
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

# CLI (v2) Azure Data Lake Gen1 YAML schema


**APPLIES TO:**  [Azure CLI ml extension **v2 (current)**](how-to-configure-cli.md) 


See the source JSON schema at https://azuremlschemas.azureedge.net/latest/azureDataLakeGen1.schema.json.


> **Note:**
> The YAML syntax detailed in this document is based on the JSON schema for the latest version of the ML CLI v2 extension. This syntax is guaranteed only to work with the latest version of the ML CLI v2 extension.
> You can find the schemas for older extension versions at [https://azuremlschemasprod.azureedge.net/](https://azuremlschemasprod.azureedge.net/).


## YAML syntax

| Key | Type | Description | Allowed values | Default value |
| --- | --- | --- | --- | --- |
| `$schema` | string | The YAML schema. If you use the Azure Machine Learning Visual Studio Code extension to author the YAML file, include `$schema` at the top of your file to invoke schema and resource completions. |  |  |
| `type` | string | **Required.** The datastore type. | `azure_data_lake_gen1` |  |
| `name` | string | **Required.** The datastore name. |  |  |
| `description` | string | The datastore description. |  |  |
| `tags` | object | The datastore tag dictionary. |  |  |
| `store_name` | string | **Required.** The Azure Data Lake Storage Gen1 account name. |  |  |
| `credentials` | object | Service principal credentials to connect to the Azure storage account. Credential secrets are stored in the workspace key vault. |  |  |
| `credentials.tenant_id` | string | The service principal tenant ID. **Required if `credentials` is specified.** |  |  |
| `credentials.client_id` | string | The service principal client ID. **Required if `credentials` is specified.** |  |  |
| `credentials.client_secret` | string | The service principal client secret. **Required if `credentials` is specified.** |  |  |
| `credentials.resource_url` | string | The resource URL that determines which operations the Azure Data Lake Storage Gen1 account performs. |  | `https://datalake.azure.net/` |
| `credentials.authority_url` | string | The authority URL used for user authentication. |  | `https://login.microsoftonline.com` |

## Remarks

You can use the `az ml datastore` command to manage Azure Machine Learning datastores.

## Examples

See examples in the [examples GitHub repository](https://github.com/Azure/azureml-examples/tree/main/cli/resources/datastore). Several are shown here:

## YAML: identity-based access

[Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/resources/datastore/adls-gen1-credless.yml](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/reference-yaml-datastore-data-lake-gen1.md)

## YAML: tenant ID, client ID, client secret

[Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/resources/datastore/adls-gen1.yml](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/reference-yaml-datastore-data-lake-gen1.md)

## Next steps

- [Install and use the CLI (v2)](how-to-configure-cli.md)
