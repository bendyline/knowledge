---
title: 'Quickstart: Create an Azure Firewall and a firewall policy - Bicep'
description: In this quickstart, you deploy an Azure Firewall and a firewall policy using Bicep.
services: firewall-manager
author: duongau
ms.author: duau
ms.date: 01/08/2025
ms.topic: quickstart
ms.service: azure-firewall-manager
ms.custom: subject-armqs, mode-arm, devx-track-bicep
---

# Quickstart: Create an Azure Firewall and a firewall policy - Bicep

In this quickstart, you use Bicep to create an Azure Firewall and a firewall policy. The firewall policy has an application rule that allows connections to `www.microsoft.com` and a rule that allows connections to Windows Update using the **WindowsUpdate** FQDN tag. A network rule allows UDP connections to a time server at 13.86.101.172.

Also, IP Groups are used in the rules to define the **Source** IP addresses.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-bicep-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/firewall-manager/quick-firewall-policy-bicep.md)

For information about Azure Firewall Manager, see [What is Azure Firewall Manager?](overview.md)

For information about Azure Firewall, see [What is Azure Firewall?](../firewall/overview.md)

For information about IP Groups, see [IP Groups in Azure Firewall](../firewall/ip-groups.md).

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

## Review the Bicep file

This Bicep file creates a hub virtual network, along with the necessary resources to support the scenario.

The Bicep file used in this quickstart is from [Azure Quickstart Templates](https://azure.microsoft.com/resources/templates/azurefirewall-create-with-firewallpolicy-apprule-netrule-ipgroups/).

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.network/azurefirewall-create-with-firewallpolicy-apprule-netrule-ipgroups/main.bicep](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/firewall-manager/quick-firewall-policy-bicep.md)

Multiple Azure resources are defined in the Bicep file:

- [**Microsoft.Network/ipGroups**](https://learn.microsoft.com/azure/templates/microsoft.network/ipGroups)
- [**Microsoft.Network/firewallPolicies**](https://learn.microsoft.com/azure/templates/microsoft.network/firewallPolicies)
- [**Microsoft.Network/firewallPolicies/ruleCollectionGroups**](https://learn.microsoft.com/azure/templates/microsoft.network/firewallPolicies/ruleCollectionGroups)
- [**Microsoft.Network/azureFirewalls**](https://learn.microsoft.com/azure/templates/microsoft.network/azureFirewalls)
- [**Microsoft.Network/virtualNetworks**](https://learn.microsoft.com/azure/templates/microsoft.network/virtualnetworks)
- [**Microsoft.Network/publicIPAddresses**](https://learn.microsoft.com/azure/templates/microsoft.network/publicipaddresses)

## Deploy the Bicep file

1. Save the Bicep file as `main.bicep` to your local computer.
1. Deploy the Bicep file using either Azure CLI or Azure PowerShell.

    # [CLI](#tab/CLI)

    ```azurecli
    az group create --name exampleRG --location eastus
    az deployment group create --resource-group exampleRG --template-file main.bicep --parameters firewallName=<firewall-name>
    ```

    # [PowerShell](#tab/PowerShell)

    ```azurepowershell
    New-AzResourceGroup -Name exampleRG -Location eastus
    New-AzResourceGroupDeployment -ResourceGroupName exampleRG -TemplateFile ./main.bicep -firewallName "<firewall-name>"
    ```

    ---

    > **Note:**
    > Replace **\<firewall-name\>** with the name of the Azure Firewall.
  
When the deployment finishes, you should see a message indicating the deployment succeeded.

## Review deployed resources

Use Azure CLI or Azure PowerShell to review the deployed resources.

# [CLI](#tab/CLI)

```azurecli-interactive
az resource list --resource-group exampleRG
```

# [PowerShell](#tab/PowerShell)

```azurepowershell-interactive
Get-AzResource -ResourceGroupName exampleRG
```

---

## Clean up resources

When you no longer need the resources that you created with the firewall, delete the resource group. The firewall and all the related resources are deleted.


# [CLI](#tab/CLI)

```azurecli-interactive
az group delete --name exampleRG
```

# [PowerShell](#tab/PowerShell)

```azurepowershell-interactive
Remove-AzResourceGroup -Name exampleRG
```

---

## Next steps

> 
> [Azure Firewall Manager policy overview](policy-overview.md)
