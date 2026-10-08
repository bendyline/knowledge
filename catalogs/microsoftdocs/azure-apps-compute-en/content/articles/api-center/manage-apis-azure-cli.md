---
title: Manage API Inventory in Azure API Center - Azure CLI
description: Use the Azure CLI to create and update APIs, API versions, and API definitions in your Azure API center.

ms.service: azure-api-center
ms.custom: devx-track-azurecli
ms.topic: how-to
ms.date: 08/28/2025
 
# Customer intent: As an API program manager, I want to automate processes to register and update APIs in my Azure API center.
---

# Use the Azure CLI to manage your API inventory

This article shows how to use [az apic api](https://learn.microsoft.com/cli/azure/apic/api) commands in the Azure CLI to add and configure APIs in your [Azure API center](overview.md) inventory. Use commands in the Azure CLI to script operations to manage your API inventory and other aspects of your API center.  

## Prerequisites

* An API center in your Azure subscription. If you haven't created one already, see [Quickstart: Create your API center](set-up-api-center.md).

* For Azure CLI:
    [Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-center/manage-apis-azure-cli.md)

    
> **Note:**
> The `az apic` commands require the `apic-extension` Azure CLI extension. The extension can be installed dynamically when you run your first `az apic` command, or you can install the extension manually. For more information, see [Manage Azure CLI Extensions: Install, Update, and Remove](https://learn.microsoft.com/cli/azure/azure-cli-extensions-overview).
>
> For the latest changes and updates in the `apic-extension`, see the [release notes](https://github.com/Azure/azure-cli-extensions/blob/main/src/apic-extension/HISTORY.rst). Certain features might require a preview or specific version of the extension.


## Register API, API version, and definition

The following steps show how to create an API and associate a single API version and API definition. For background about the data model in Azure API Center, see [Key concepts](key-concepts.md).

### Create an API

Use the [az apic api create](https://learn.microsoft.com/cli/azure/apic/api#az-apic-api-create) command to create an API in your API center. 

The following example creates an API named *Petstore API* in the *myResourceGroup* resource group and *myAPICenter* API center. The API is a REST API.

```azurecli-interactive
az apic api create  --resource-group myResourceGroup \
    --service-name myAPICenter --api-id petstore-api \
    --title "Petstore API" --type "rest"
```

### Create an API version

Use the [az apic api version create](https://learn.microsoft.com/cli/azure/apic/api/version#az-apic-api-version-create) command to create a version for your API. 

The following example creates an API version named *v1-0-0* for the *petstore-api* API that you created in the previous section. The version is set to the *testing* lifecycle stage.

```azurecli-interactive
az apic api version create --resource-group myResourceGroup \
    --service-name myAPICenter --api-id petstore-api \
    --version-id v1-0-0 --title "v1-0-0" --lifecycle-stage "testing"
```

### Create API definition and add specification file 

Use the [az apic api definition](https://learn.microsoft.com/cli/azure/apic/api/definition) commands to add a definition and an accompanying specification file for an API version.

#### Create a definition

The following example uses the [az apic api definition create](https://learn.microsoft.com/cli/azure/apic/api/definition#az-apic-api-definition-create) command to create a definition named *openapi* for the *petstore-api* API version that you created in the previous section. 

```azurecli-interactive
az apic api definition create --resource-group myResourceGroup \
    --service-name myAPICenter --api-id petstore-api \
    --version-id v1-0-0 --definition-id openapi --title "OpenAPI"
```

#### Import a specification file

Import a specification file to the definition by using the [az apic api definition import-specification](https://learn.microsoft.com/cli/azure/apic/api/definition#az-apic-api-definition-import-specification) command.

The following example imports an OpenAPI specification file from a publicly accessible URL to the *openapi* definition that you created in the previous step. The `name` and `version` properties of the specification resource are passed as JSON. 

```azurecli-interactive
az apic api definition import-specification \
    --resource-group myResourceGroup --service-name myAPICenter \
    --api-id petstore-api --version-id v1-0-0 \
    --definition-id openapi --format "link" \
    --value 'https://petstore3.swagger.io/api/v3/openapi.json' \
    --specification '{"name":"openapi","version":"3.0.2"}'
```

> **Tip:**
> You can import the specification file inline by setting the `--format` parameter to `inline` and passing the file contents using the `--value` parameter.

### Export a specification file

To export an API specification from your API center to a local file, use the [az apic api definition export-specification](https://learn.microsoft.com/cli/azure/apic/api/definition#az-apic-api-definition-export-specification) command.

The following example exports the specification file from the *openapi* definition that you created in the previous section to a local file named *specificationFile.json*.

```azurecli-interactive
az apic api definition export-specification \
    --resource-group myResourceGroup --service-name myAPICenter \
    --api-id petstore-api --version-id v1-0-0 \
    --definition-id openapi --file-name "/Path/to/specificationFile.json"
```

## Register API from a specification file - single step

By using the [az apic api register](https://learn.microsoft.com/cli/azure/apic/api#az-apic-api-register) command, you can register an API from a local specification file in a single step. With this option, a default API version and definition are created automatically for the API.

The following example registers an API in the *myAPICenter* API center from a local OpenAPI definition file named *specificationFile.json*.

```azurecli-interactive
az apic api register --resource-group myResourceGroup \
    --service-name myAPICenter --api-location "/Path/to/specificationFile.json"
```

* The command sets the API properties such as name and type from values in the definition file. 
* By default, the command sets the API's **Lifecycle stage** to *design*.
* It creates an API version named according to the `version` property in the API definition (or *1-0-0* by default), and an API definition named according to the specification format (for example, *openapi*).

## Update API properties

After registering an API, you can update the API's properties by using the [az apic api update](https://learn.microsoft.com/cli/azure/apic/api#az-apic-api-update), [az apic api version update](https://learn.microsoft.com/cli/azure/apic/api/version#az-apic-api-version-update), and [az apic api definition update](https://learn.microsoft.com/cli/azure/apic/api/definition#az-apic-api-definition-update) commands.

The following example updates the title of the *petstore-api* API to *Petstore API v2*.

```azurecli-interactive
az apic api update --resource-group myResourceGroup \
    --service-name myAPICenter --api-id petstore-api \
    --title "Petstore API v2"
```

The following example sets the API's Boolean `internal` custom property to *false*.

```azurecli-interactive
az apic api update --resource-group myResourceGroup \
    --service-name myAPICenter --api-id petstore-api \
    --set custom_properties.internal=false
```

## Delete API resources

Use the [az apic api delete](https://learn.microsoft.com/cli/azure/apic/api#az-apic-api-delete) command to delete an API and all of its version and definition resources. For example:

```azurecli-interactive
az apic api delete \
    --resource-group myResourceGroup --service-name myAPICenter \
    --api-id petstore-api
```

To delete individual API versions and definitions, use [az apic api version delete](https://learn.microsoft.com/cli/azure/apic/api/version#az-apic-api-version-delete) and [az apic api definition delete](https://learn.microsoft.com/cli/azure/apic/api/definition#az-apic-api-definition-delete), respectively.

## Related content

* See the reference for Azure API Center commands, including commands to manage [environments](https://learn.microsoft.com/cli/azure/apic/environment), [deployments](https://learn.microsoft.com/cli/azure/apic/api/deployment), [metadata schemas](https://learn.microsoft.com/cli/azure/apic/metadata), and [services](https://learn.microsoft.com/cli/azure/apic).
* [Import APIs to your API center from API Management](import-api-management-apis.md)
* [Build and register APIs with the Azure API Center extension for Visual Studio Code](build-register-apis-vscode-extension.md)
* [Register APIs in your API center using GitHub Actions](register-apis-github-actions.md)
