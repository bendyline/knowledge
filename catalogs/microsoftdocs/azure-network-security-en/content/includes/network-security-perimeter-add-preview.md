
- Registration for the Azure Network Security Perimeter public preview is required. To register, add the `AllowNSPInPublicPreview` feature flag to your subscription. 
  Screenshot of addition of network security perimeter feature flag to Azure subscription.

  For more information on adding feature flags, see [Set up preview features in Azure subscription](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/preview-features.md).

- After the feature flag is added, you need to re-register the `Microsoft.Network` resource provider in your subscription.
  - To re-register the `Microsoft.Network` resource provider in the Azure portal, select your subscription, and then select **Resource providers**. Search for `Microsoft.Network` and select **Re-register**.

    Screenshot of re-registration of Microsoft.Network resource provider in subscription.

  - To re-register the `Microsoft.Network` resource provider, use the following Azure PowerShell command:

    ```azurepowershell-interactive
    # Register the Microsoft.Network resource provider
    Register-AzResourceProvider -ProviderNamespace Microsoft.Network
    ```

  - To re-register the `Microsoft.Network` resource provider, use the following Azure CLI command:

    ```azurecli-interactive
    # Register the Microsoft.Network resource provider
    az provider register --namespace Microsoft.Network
    ```
    
  For more information on re-registering resource providers, see [Azure resource providers and types](https://learn.microsoft.com/azure/azure-resource-manager/management/resource-providers-and-types).


## Original source metadata

```text
---
 title: include file
 description: include file
 services: private-link
 author: mbender
 ms.service: azure-private-link
 ms.topic: include
 ms.date: 03/05/2025
 ms.author: mbender-ms
ms.custom: include file, ignite-2024
---
```
