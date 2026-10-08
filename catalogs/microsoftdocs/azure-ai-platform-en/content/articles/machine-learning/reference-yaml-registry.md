---
title: 'CLI (v2) registry YAML schema'
titleSuffix: Azure Machine Learning
description: Reference documentation for the CLI (v2) registry YAML schema.
services: machine-learning
ms.service: azure-machine-learning
ms.subservice: core
ms.topic: reference
ms.custom: cliv2, build-2023

author: s-polly
ms.author: scottpolly
ms.date: 04/29/2024
ms.reviewer: kritifaujdar
---

# CLI (v2) registry YAML schema


**APPLIES TO:**  [Azure CLI ml extension **v2 (current)**](how-to-configure-cli.md) 


The source JSON schema can be found at [https://azuremlschemasprod.azureedge.net/latest/registry.schema.json](https://azuremlschemasprod.azureedge.net/latest/registry.schema.json).




> **Note:**
> The YAML syntax detailed in this document is based on the JSON schema for the latest version of the ML CLI v2 extension. This syntax is guaranteed only to work with the latest version of the ML CLI v2 extension.
> You can find the schemas for older extension versions at [https://azuremlschemasprod.azureedge.net/](https://azuremlschemasprod.azureedge.net/).


## YAML syntax

| Key | Type | Description | Allowed values | Default value |
| --- | --- | --- | --- | --- |
| `$schema` | string | The YAML schema. If you use the Azure Machine Learning VS Code extension to author the YAML file, including `$schema` at the top of your file enables you to invoke schema and resource completions. |  |  |
| `name` | string | **Required.** Name of the registry. |  |  |
| `tags` | object | Dictionary of tags for the registry. |  |  |
| `location` | string | **Required.** The primary location of the registry. |  |  |
| `replication_locations` | object | **Required.** List of locations where the associated resources of the registry will be replicated. The list must include the primary location of registry. |  |  |
| `public_network_access` | string | Whether public endpoint access is allowed if the registry will be using Private Link. | `enabled`, `disabled` | `enabled` |

## Remarks

The `az ml registry` command can be used for managing Azure Machine Learning registries.

## Examples

Examples are available in the [examples GitHub repository](https://github.com/Azure/azureml-examples/tree/main/cli/resources/registry). Several are shown in the following sections.

## YAML: basic

[Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/resources/registry/registry.yml](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/reference-yaml-registry.md)

## YAML: with storage options

[Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/resources/registry/registry-storage-options.yml](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/reference-yaml-registry.md)

## Next steps

- [Install and use the CLI (v2)](how-to-configure-cli.md)
