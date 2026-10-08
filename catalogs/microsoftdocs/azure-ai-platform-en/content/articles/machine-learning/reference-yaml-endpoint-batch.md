---
title: 'CLI (v2) batch endpoint YAML schema'
titleSuffix: Azure Machine Learning
description: Reference documentation for the CLI (v2) batch endpoint YAML schema.
services: machine-learning
ms.service: azure-machine-learning
ms.subservice: core
ms.topic: reference
ms.custom: cliv2, update-code
ms.reviewer: None
author: s-polly
ms.author: scottpolly
ms.date: 10/21/2021
---

# CLI (v2) batch endpoint YAML schema


**APPLIES TO:**  [Azure CLI ml extension **v2 (current)**](how-to-configure-cli.md) 


The source JSON schema can be found at https://azuremlschemas.azureedge.net/latest/batchEndpoint.schema.json.




> **Note:**
> The YAML syntax detailed in this document is based on the JSON schema for the latest version of the ML CLI v2 extension. This syntax is guaranteed only to work with the latest version of the ML CLI v2 extension.
> You can find the schemas for older extension versions at [https://azuremlschemasprod.azureedge.net/](https://azuremlschemasprod.azureedge.net/).


## YAML syntax

| Key | Type | Description | Allowed values | Default value |
| --- | --- | --- | --- | --- |
| `$schema` | string | The YAML schema. If you use the Azure Machine Learning VS Code extension to author the YAML file, including `$schema` at the top of your file enables you to invoke schema and resource completions. |  |  |
| `name` | string | **Required.** Name of the endpoint. Needs to be unique at the Azure region level. |  |  |
| `description` | string | Description of the endpoint. |  |  |
| `tags` | object | Dictionary of tags for the endpoint. |  |  |
| `auth_mode` | string | The authentication method for the endpoint. Currently only Microsoft Entra token-based authentication is supported. | `aad_token` | `aad_token` |
| `defaults` | object | Default settings for the endpoint. |  |  |
| `defaults.deployment_name` | string | Name of the deployment that will serve as the default deployment for the endpoint. |  |  |

## Remarks

The `az ml batch-endpoint` commands can be used for managing Azure Machine Learning endpoints.

## Examples

Examples are available in the [examples GitHub repository](https://github.com/Azure/azureml-examples/tree/main/cli/endpoints/batch). Several are shown below.

## YAML: basic

[Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/endpoints/batch/deploy-models/mnist-classifier/endpoint.yml](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/reference-yaml-endpoint-batch.md)

## Next steps

- [Install and use the CLI (v2)](how-to-configure-cli.md)
