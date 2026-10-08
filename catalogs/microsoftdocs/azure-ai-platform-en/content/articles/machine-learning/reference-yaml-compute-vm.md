---
title: 'CLI (v2) attached Virtual Machine YAML schema'
titleSuffix: Azure Machine Learning
description: Reference documentation for the CLI (v2) attached Virtual Machine schema.
services: machine-learning
ms.service: azure-machine-learning
ms.subservice: core
ms.topic: reference
ms.custom: cliv2

author: vijetajo
ms.author: vijetaj
ms.date: 10/21/2021
ms.reviewer: scottpolly
---

# CLI (v2) attached Virtual Machine YAML schema


**APPLIES TO:**  [Azure CLI ml extension **v2 (current)**](how-to-configure-cli.md) 


The source JSON schema can be found at https://azuremlschemas.azureedge.net/latest/vmCompute.schema.json.




> **Note:**
> The YAML syntax detailed in this document is based on the JSON schema for the latest version of the ML CLI v2 extension. This syntax is guaranteed only to work with the latest version of the ML CLI v2 extension.
> You can find the schemas for older extension versions at [https://azuremlschemasprod.azureedge.net/](https://azuremlschemasprod.azureedge.net/).


## YAML syntax

| Key | Type | Description | Allowed values | Default value |
| --- | --- | --- | --- | --- |
| `$schema` | string | The YAML schema. If you use the Azure Machine Learning VS Code extension to author the YAML file, including `$schema` at the top of your file enables you to invoke schema and resource completions. |  |  |
| `type` | string | **Required.** The type of compute. | `virtualmachine` |  |
| `name` | string | **Required.** Name of the compute. |  |  |
| `description` | string | Description of the compute. |  |  |
| `resource_id` | string | **Required.** Fully qualified resource ID of the Azure Virtual Machine to attach to the workspace as a compute target. |  |  |
| `ssh_settings` | object | SSH settings for connecting to the virtual machine. |  |  |
| `ssh_settings.admin_username` | string | The name of the administrator user account that can be used to SSH into the virtual machine. |  |  |
| `ssh_settings.admin_password` | string | The password of the administrator user account. **One of `admin_password` or `ssh_private_key_file` is required.** |  |  |
| `ssh_settings.ssh_private_key_file` | string | The local path to the SSH private key file of the administrator user account. **One of `admin_password` or `ssh_private_key_file` is required.** |  |  |
| `ssh_settings.ssh_port` | integer | The SSH port on the virtual machine. |  | `22` |

## Remarks

The `az ml compute` command can be used for managing Virtual Machines (VM) attached to an Azure Machine Learning workspace.

## Examples

Examples are available in the [examples GitHub repository](https://github.com/Azure/azureml-examples/tree/main/cli/resources/compute). Several are shown below.

## YAML: basic

[Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/resources/compute/vm-attach.yml](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/reference-yaml-compute-vm.md)

## Next steps

- [Install and use the CLI (v2)](how-to-configure-cli.md)
