---
title: Create a private container registry in Azure for Bicep modules
description: Learn how to set up a private container registry in Azure for private Bicep modules.
ms.topic: how-to
ms.date: 02/25/2026
ms.custom: devx-track-bicep
---

# Create a private container registry in Azure for Bicep modules

To share [modules](modules.md) within your organization, you can create a private module registry. You can then publish modules to that registry and give read access to users who need to deploy the modules. After the modules are shared in the registries, you can reference them from your Bicep files. To use public modules, see [Bicep Modules](modules.md#file-in-registry).

To work with module registries, you must have [Bicep CLI](install.md#visual-studio-code-and-bicep-extension) version 0.4.1008 or later. To use with [Azure CLI](install.md#azure-cli), you must have version 2.31.0 or later. To use with [Azure PowerShell](install.md#azure-powershell), you must have version 7.0.0 or later.

## Configure private registry

A Bicep registry is hosted on [Azure Container Registry (ACR)](https://learn.microsoft.com/azure/container-registry/container-registry-intro). Use the following steps to configure your registry for modules.

1. If you already have a container registry, you can use it. If you need to create a container registry, see [Quickstart: Create a container registry by using a Bicep file](https://learn.microsoft.com/azure/container-registry/container-registry-get-started-bicep).

   You can use any of the available registry SKUs for the module registry. Registry [geo-replication](https://learn.microsoft.com/azure/container-registry/container-registry-geo-replication) provides users with a local presence or as a hot-backup.

1. Get the login server name. You need this name when linking to the registry from your Bicep files. The format of the login server name is: `<registry-name>.azurecr.io`.

    # [Azure PowerShell](#tab/azure-powershell)

    To get the login server name, use [Get-AzContainerRegistry](https://learn.microsoft.com/powershell/module/az.containerregistry/get-azcontainerregistry).

    ```azurepowershell
    Get-AzContainerRegistry -ResourceGroupName "<resource-group-name>" -Name "<registry-name>"  | Select-Object LoginServer
    ```

    # [Azure CLI](#tab/azure-cli)

    To get the login server name, use [az acr show](https://learn.microsoft.com/cli/azure/acr#az-acr-show).

    ```azurecli
    az acr show --resource-group <resource-group-name> --name <registry-name> --query loginServer
    ```

    ---

1. To publish modules to a registry, you must have permission to **push** an image. To deploy a module from a registry, you must have permission to **pull** the image. For more information about the roles that grant adequate access, see [Azure Container Registry roles and permissions](https://learn.microsoft.com/azure/container-registry/container-registry-roles).

1. Depending on the type of account you use to deploy the module, you may need to customize which credentials are used. These credentials are needed to get the modules from the registry. By default, credentials are obtained from Azure CLI or Azure PowerShell. You can customize the precedence for getting the credentials in the _bicepconfig.json_ file. For more information, see [Credentials for restoring modules](bicep-config-modules.md#configure-profiles-and-credentials).

> **Important:**
> The private container registry is only available to users with the required access. However, it's accessed through the public internet. For more security, you can require access through a private endpoint. See [Connect privately to an Azure container registry using Azure Private Link](https://learn.microsoft.com/azure/container-registry/container-registry-private-link).
> 
> The private container registry must have the policy `azureADAuthenticationAsArmPolicy` set to `enabled`. If `azureADAuthenticationAsArmPolicy` is set to `disabled`, you'll get a 401 (Unauthorized) error message when publishing modules. See [Azure Container Registry introduces the Conditional Access policy](https://learn.microsoft.com/azure/container-registry/container-registry-configure-conditional-access).

> **Warning:**
> If `properties.policies.quarantinePolicy.status` is enabled on your Azure Container Registry, your Bicep module will "successfully" publish but the versions/tags are stripped or hidden.

## Publish files to registry

After setting up the container registry, you can publish files to it. Use the [publish](bicep-cli.md#publish) command and provide any Bicep files you intend to use as modules. Specify the target location for the module in your registry. The publish command creates an ARM template, which is stored in the registry. This means if publishing a Bicep file that references other local modules, these modules are fully expanded as one JSON file and published to the registry.

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell
Publish-AzBicepModule -FilePath ./storage.bicep -Target br:exampleregistry.azurecr.io/bicep/modules/storage:v1 -DocumentationUri https://www.contoso.com/exampleregistry.html
```

# [Azure CLI](#tab/azure-cli)

To run this deployment command, you must have the [latest version](https://learn.microsoft.com/cli/azure/install-azure-cli) of Azure CLI.

```azurecli
az bicep publish --file storage.bicep --target br:exampleregistry.azurecr.io/bicep/modules/storage:v1 --documentationUri https://www.contoso.com/exampleregistry.html
```

---

With Bicep CLI version 0.27.1 or newer, you can publish a module with the Bicep source code in addition to the compiled JSON template. If a module is published with the Bicep source code to a registry, you can press `F12` ([Go to Definition](visual-studio-code.md#go-to-file)) from Visual Studio Code to see the Bicep code. The Bicep extension version 0.27 or new is required to see the Bicep file.

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell
Publish-AzBicepModule -FilePath ./storage.bicep -Target br:exampleregistry.azurecr.io/bicep/modules/storage:v1 -DocumentationUri https://www.contoso.com/exampleregistry.html -WithSource
```

# [Azure CLI](#tab/azure-cli)

To run this deployment command, you must have the [latest version](https://learn.microsoft.com/cli/azure/install-azure-cli) of Azure CLI.

```azurecli
az bicep publish --file storage.bicep --target br:exampleregistry.azurecr.io/bicep/modules/storage:v1 --documentationUri https://www.contoso.com/exampleregistry.html --with-source
```

---

With the with source switch, you see another layer in the manifest:

Screenshot of bicep module registry with source.

If the Bicep module references a module in a Private Registry, the ACR endpoint is visible. To hide the full endpoint, you can configure an alias for the private registry.

## View files in registry

To see the published module in the portal:

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Search for **container registries**.
1. Select your registry.
1. Select **Services** -> **Repositories** from the left menu.
1. Select the module path (repository). In the preceding example, the module path name is **bicep/modules/storage**.
1. Select the tag. In the preceding example, the tag is **v1**.
1. The **Artifact reference** matches the reference you use in the Bicep file.

   Bicep module registry artifact reference

You're now ready to reference the file in the registry from a Bicep file. For examples of the syntax to use for referencing an external module, see [Bicep modules](modules.md).

---

## Working with Bicep registry files

When using bicep files that are hosted in a remote registry, it's important to understand how your local machine interacts with the registry. When you first declare the reference to the registry, your local editor tries to communicate with the Azure Container Registry and download a copy of the registry to your local cache.

The local cache is found in:

- On Windows

    ```path
    %USERPROFILE%\.bicep\br\<registry-name>.azurecr.io\<module-path\<tag>
    ```

- On Linux

    ```path
    /home/<username>/.bicep
    ```

- On Mac

    ```path
    ~/.bicep
    ```

Your local machine can recognize any changes made to the remote registry until you run a `restore` with the specified file that includes the registry reference.

```azurecli
az bicep restore --file <bicep-file> [--force]
```

For more information, see the [`restore` command.](bicep-cli.md#restore)

## Next steps

- To learn about modules, see [Bicep modules](modules.md).
- To configure aliases for a module registry, see [Add module settings in the Bicep config file](bicep-config-modules.md).
- For more information about publishing and restoring modules, see [Bicep CLI commands](bicep-cli.md).
