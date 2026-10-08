---
title: Azure CLI Script Sample - Work with key-values in App Configuration Store
titleSuffix: Azure App Configuration
description: Use an Azure CLI script to create, view, update, and delete key-values from an App Configuration store.
author: maud-lv
ms.service: azure-app-configuration
ms.devlang: azurecli
ms.topic: sample
ms.date: 9/1/2026
ms.author: malev 
ms.custom: devx-track-azurecli
ai-usage: ai-assisted
---

# Work with key-values in an Azure App Configuration store

This sample script shows how to:

* Create a new key-value pair.
* List all existing key-value pairs.
* Update the value of a newly created key.
* Delete the new key-value pair.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-app-configuration/scripts/cli-work-with-keys.md)

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-app-configuration/scripts/cli-work-with-keys.md)

- This sample requires version 2.0 or later of the Azure CLI. If you use Azure Cloud Shell, the latest version is already installed.
## Sample script

In the following example, replace the placeholder text _`<AppConfigurationStoreName>`_ with the name of your App Configuration store.

```azurecli-interactive
#!/bin/bash

appConfigName=<AppConfigurationStoreName>
newKey="TestKey"
refKey="KeyVaultReferenceTestKey"
uri="[URL to value stored in Key Vault]"
uri2="[URL to another value stored in Key Vault]"

# Create a new key-value 
az appconfig kv set --name $appConfigName --key $newKey --value "Value 1"

# List current key-values
az appconfig kv list --name $appConfigName

# Update new key's value
az appconfig kv set --name $appConfigName --key $newKey --value "Value 2"

# List current key-values
az appconfig kv list --name $appConfigName

# Create a new key-value referencing a value stored in Azure Key Vault
az appconfig kv set-keyvault  --name $appConfigName --key $refKey --secret-identifier $uri

# List current key-values
az appconfig kv list --name $appConfigName

# Update Key Vault reference
az appconfig kv set-keyvault --name $appConfigName --key $refKey --secret-identifier $uri2

# List current key-values
az appconfig kv list --name $appConfigName

# Delete new key
az appconfig kv delete  --name $appConfigName --key $newKey

# Delete Key Vault reference
az appconfig kv delete --name $appConfigName --key $refKey

# List current key-values
az appconfig kv list --name $appConfigName
```

## Clean up deployment

After the sample script has been run, the following command can be used to remove the resource group and all resources associated with it.

```azurecli
az group delete --name myResourceGroup
```


## Script explanation

This table lists the commands used in the sample script.

| Command | Notes |
| --- | --- |
| [az appconfig kv set](https://learn.microsoft.com/cli/azure/appconfig/kv#az-appconfig-kv-set) | Create or update a key-value pair. |
| [az appconfig kv list](https://learn.microsoft.com/cli/azure/appconfig/kv#az-appconfig-kv-list) | List key-value pairs in an App Configuration store. |
| [az appconfig kv delete](https://learn.microsoft.com/cli/azure/appconfig/kv#az-appconfig-kv-delete) | Delete a key-value pair. |

## Next steps

For more information on the Azure CLI, see [Azure CLI documentation](https://learn.microsoft.com/cli/azure).

Additional App Configuration CLI script samples can be found in the [Azure App Configuration CLI samples](../cli-samples.md).
