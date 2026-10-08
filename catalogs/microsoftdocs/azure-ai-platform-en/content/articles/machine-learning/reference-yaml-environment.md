---
title: 'CLI (v2) environment YAML schema'
titleSuffix: Azure Machine Learning
description: Reference documentation for the CLI (v2) environment YAML schema.
ms.service: azure-machine-learning
ms.subservice: core
ms.topic: reference
ms.custom: cliv2, build-2023
author: ositanachi
ms.author: osiotugo
ms.date: 03/31/2022
ms.reviewer: scottpolly
---

# CLI (v2) environment YAML schema


**APPLIES TO:**  [Azure CLI ml extension **v2 (current)**](how-to-configure-cli.md) 


The source JSON schema can be found at https://azuremlschemas.azureedge.net/latest/environment.schema.json.



> **Note:**
> The YAML syntax detailed in this document is based on the JSON schema for the latest version of the ML CLI v2 extension. This syntax is guaranteed only to work with the latest version of the ML CLI v2 extension.
> You can find the schemas for older extension versions at [https://azuremlschemasprod.azureedge.net/](https://azuremlschemasprod.azureedge.net/).


## YAML syntax

| Key | Type | Description | Allowed values | Default value |
| --- | --- | --- | --- | --- |
| `$schema` | string | The YAML schema. If you use the Azure Machine Learning VS Code extension to author the YAML file, including `$schema` at the top of your file enables you to invoke schema and resource completions. |  |  |
| `name` | string | **Required.** Name of the environment. |  |  |
| `version` | string | Version of the environment. If omitted, Azure Machine Learning will autogenerate a version. |  |  |
| `description` | string | Description of the environment. |  |  |
| `tags` | object | Dictionary of tags for the environment. |  |  |
| `image` | string | The Docker image to use for the environment. **One of `image` or `build` is required.** |  |  |
| `conda_file` | string or object | The standard conda YAML configuration file of the dependencies for a conda environment. See https://conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#creating-an-environment-file-manually. <br> <br> If specified, `image` must be specified as well. Azure Machine Learning will build the conda environment on top of the Docker image provided. |  |  |
| `build` | object | The Docker build context configuration to use for the environment. **One of `image` or `build` is required.** |  |  |
| `build.path` | string | Local path to the directory to use as the build context. |  |  |
| `build.dockerfile_path` | string | Relative path to the Dockerfile within the build context. |  | `Dockerfile` |
| `os_type` | string | The type of operating system. | `linux`, `windows` | `linux` |
| `inference_config` | object | Inference container configurations. Only applicable if the environment is used to build a serving container for online deployments. See [Attributes of the `inference_config` key](#attributes-of-the-inference_config-key). |  |  |

### Attributes of the `inference_config` key

| Key | Type | Description |
| --- | --- | --- |
| `liveness_route` | object | The liveness route for the serving container. |
| `liveness_route.path` | string | The path to route liveness requests to. |
| `liveness_route.port` | integer | The port to route liveness requests to. |
| `readiness_route` | object | The readiness route for the serving container. |
| `readiness_route.path` | string | The path to route readiness requests to. |
| `readiness_route.port` | integer | The port to route readiness requests to. |
| `scoring_route` | object | The scoring route for the serving container. |
| `scoring_route.path` | string | The path to route scoring requests to. |
| `scoring_route.port` | integer | The port to route scoring requests to. |

## Remarks

The `az ml environment` command can be used for managing Azure Machine Learning environments.

## Examples

Examples are available in the [examples GitHub repository](https://github.com/Azure/azureml-examples/tree/main/cli/assets/environment). Several are shown below.

## YAML: local Docker build context

[Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/assets/environment/docker-context.yml](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/reference-yaml-environment.md)

## YAML: Docker image

[Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/assets/environment/docker-image.yml](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/reference-yaml-environment.md)

## YAML: Docker image plus conda file

[Code reference unavailable in this source snapshot: ~/azureml-examples-main/cli/assets/environment/docker-image-plus-conda.yaml](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/reference-yaml-environment.md)

## Next steps

- [Install and use the CLI (v2)](how-to-configure-cli.md)
