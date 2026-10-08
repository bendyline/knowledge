---
title: Manage Network Watcher Agent VM Extension
description: Learn about the Network Watcher Agent virtual machine extension and how to install, update, and uninstall it on Windows and Linux virtual machines.
author: halkazwini
ms.author: halkazwini
ms.service: azure-network-watcher
ms.topic: how-to
ms.date: 09/14/2026
ms.custom: devx-track-arm-template, linux-related-content, devx-track-azurepowershell, devx-track-azurecli
zone_pivot_groups: network-watcher-agent-os

# Customer intent: As an Azure administrator, I want to manage the Network Watcher Agent VM extension on my Windows or Linux virtual machines, so that I can effectively diagnose and monitor network traffic and performance.
---

# Manage Network Watcher Agent virtual machine extension

The Network Watcher Agent virtual machine extension is a requirement for some of Azure Network Watcher features that capture network traffic to diagnose and monitor Azure virtual machines (VMs). For more information, see [What is Azure Network Watcher?](network-watcher-overview.md)

In this article, you learn how to install, update, and uninstall Network Watcher Agent for Windows and Linux. Installation of the agent doesn't disrupt, or require a reboot of the virtual machine. If the virtual machine is deployed by an Azure service, check the documentation of the service to determine whether the service permits installing extensions in the virtual machine.

**Applies to: linux**

> **Note:**
> Network Watcher Agent extension isn't supported on AKS clusters.


## Prerequisites

# [**Portal**](#tab/portal)

- An Azure virtual machine (VM) running a supported operating system. For more information, see [Supported operating systems](#supported-operating-systems).

- Outbound TCP connectivity to `169.254.169.254` over `port 80` and `168.63.129.16` over `port 8037`. The agent uses these IP addresses to communicate with the Azure platform.

- Internet connectivity: Network Watcher Agent requires internet connectivity for some features to work properly. For example, it requires connectivity to your storage account to upload packet captures.

# [**PowerShell**](#tab/powershell)

- An Azure virtual machine (VM) running a supported operating system. For more information, see [Supported operating systems](#supported-operating-systems).

- Outbound TCP connectivity to `169.254.169.254` over `port 80` and `168.63.129.16` over `port 8037`. The agent uses these IP addresses to communicate with the Azure platform.

- Internet connectivity: Network Watcher Agent requires internet connectivity for some features to work properly. For example, it requires connectivity to your storage account to upload packet captures.

- Azure Cloud Shell or Azure PowerShell.

    The steps in this article run the Azure PowerShell cmdlets interactively in [Azure Cloud Shell](https://learn.microsoft.com/azure/cloud-shell/overview). To run the commands in the Cloud Shell, select **Open Cloud Shell** at the upper-right corner of a code block. Select **Copy** to copy the code and then paste it into Cloud Shell to run it. You can also run the Cloud Shell from within the Azure portal.

    You can also [install Azure PowerShell locally](https://learn.microsoft.com/powershell/azure/install-azure-powershell) to run the cmdlets. If you run PowerShell locally, sign in to Azure using the [Connect-AzAccount](https://learn.microsoft.com/powershell/module/az.accounts/connect-azaccount) cmdlet.

# [**Azure CLI**](#tab/cli)

- An Azure virtual machine (VM) running a supported operating system. For more information, see [Supported operating systems](#supported-operating-systems).

- Outbound TCP connectivity to `169.254.169.254` over `port 80` and `168.63.129.16` over `port 8037`. The agent uses these IP addresses to communicate with the Azure platform.

- Internet connectivity: Network Watcher Agent requires internet connectivity for some features to work properly. For example, it requires connectivity to your storage account to upload packet captures.

- Azure Cloud Shell or Azure CLI.

    The steps in this article run the Azure CLI commands interactively in [Azure Cloud Shell](https://learn.microsoft.com/azure/cloud-shell/overview). To run the commands in the Cloud Shell, select **Open Cloud Shell** at the upper-right corner of a code block. Select **Copy** to copy the code, and paste it into Cloud Shell to run it. You can also run the Cloud Shell from within the Azure portal.

    You can also [install Azure CLI locally](https://learn.microsoft.com/cli/azure/install-azure-cli) to run the commands. If you run Azure CLI locally, sign in to Azure using the [az login](https://learn.microsoft.com/cli/azure/reference-index#az-login) command.

# [**Resource Manager**](#tab/arm)

- An Azure virtual machine (VM) running a supported operating system. For more information, see [Supported operating systems](#supported-operating-systems).

- Outbound TCP connectivity to `169.254.169.254` over `port 80` and `168.63.129.16` over `port 8037`. The agent uses these IP addresses to communicate with the Azure platform.

- Internet connectivity: Network Watcher Agent requires internet connectivity for some features to work properly. For example, it requires connectivity to your storage account to upload packet captures.

- Azure PowerShell or Azure CLI installed locally to deploy the template.

    - You can [install Azure PowerShell](https://learn.microsoft.com/powershell/azure/install-azure-powershell) to run the cmdlets. Use [Connect-AzAccount](https://learn.microsoft.com/powershell/module/az.accounts/connect-azaccount) cmdlet to sign in to Azure.

    - You can [install Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) to run the commands. Use [az login](https://learn.microsoft.com/cli/azure/reference-index#az-login) command to sign in to Azure.

---

## Supported operating systems

**Applies to: windows**


You can install the Network Watcher Agent extension for Windows on the following operating systems:

- Windows Server 2012, 2012 R2, 2016, 2019, 2022, and 2025 releases.
- Windows 10 and 11 releases.

> **Note:**
> Currently, Nano Server isn't supported.



**Applies to: linux**


You can install the Network Watcher Agent extension for Linux on the following Linux distributions:

| Distribution | Version |
| --- | --- |
| AlmaLinux | 9.2 |
| Azure Linux | 2.0 |
| CentOS <sup>1</sup> | 6.10 and 7 |
| Debian | 7 and 8 |
| openSUSE Leap | 42.3+ |
| Oracle Linux | 6.10 <sup>2</sup>, 7, 8, and 9+ |
| Red Hat Enterprise Linux (RHEL) | 6.10 <sup>3</sup>, 7, 8, and 9.2 |
| Rocky Linux | 9.1 |
| SUSE Linux Enterprise Server (SLES) | 12 and 15 (SP2, SP3, and SP4) |
| Ubuntu | 16+ |

<sup>1</sup> CentOS Linux reached its end of life (EOL) on June 30, 2024. For more information, see the [CentOS End Of Life guidance](https://learn.microsoft.com/azure/virtual-machines/workloads/centos/centos-end-of-life).

<sup>2</sup> [Extended life cycle (ELS) support](https://www.oracle.com/a/ocom/docs/linux/oracle-linux-extended-support-ds.pdf) for Oracle Linux version 6.X ended on [July 1, 2024](https://www.oracle.com/a/ocom/docs/elsp-lifetime-069338.pdf).

<sup>3</sup> [Extended life cycle (ELS) support](https://www.redhat.com/en/resources/els-datasheet) for Red Hat Enterprise Linux 6.X ended on [June 30, 2024]( https://access.redhat.com/product-life-cycles/?product=Red%20Hat%20Enterprise%20Linux,OpenShift%20Container%20Platform%204).

> **Note:**
> Internet Control Message Protocol (ICMP) monitoring isn't currently supported in the Network Watcher Agent on Oracle Linux due to known kernel-level limitations specific to the distro.



## Extension schema

The following JSON shows the schema for the Network Watcher Agent extension. The extension doesn't require or support any user-supplied settings, and it relies on its default configuration.

**Applies to: windows**


```json
{
    "name": "[concat(parameters('vmName'), '/AzureNetworkWatcherExtension')]",
    "type": "Microsoft.Compute/virtualMachines/extensions",
    "apiVersion": "2023-03-01",
    "location": "[resourceGroup().location]",
    "dependsOn": [
        "[concat('Microsoft.Compute/virtualMachines/', parameters('vmName'))]"
    ],
    "properties": {
        "autoUpgradeMinorVersion": true,
        "publisher": "Microsoft.Azure.NetworkWatcher",
        "type": "NetworkWatcherAgentWindows",
        "typeHandlerVersion": "1.4"
    }
}
```



**Applies to: linux**


```json
{
    "name": "[concat(parameters('vmName'), '/AzureNetworkWatcherExtension')]",
    "type": "Microsoft.Compute/virtualMachines/extensions",
    "apiVersion": "2023-03-01",
    "location": "[resourceGroup().location]",
    "dependsOn": [
        "[concat('Microsoft.Compute/virtualMachines/', parameters('vmName'))]"
    ],
    "properties": {
        "autoUpgradeMinorVersion": true,
        "publisher": "Microsoft.Azure.NetworkWatcher",
        "type": "NetworkWatcherAgentLinux",
        "typeHandlerVersion": "1.4"
    }
}
```



## List installed extensions

# [**Portal**](#tab/portal)

From the virtual machine page in the Azure portal, you can view the installed extensions by following these steps:

1. Under **Settings**, select **Extensions + applications**.

1. In the **Extensions** tab, you can see all installed extensions on the virtual machine. If the list is long, use the search box to filter the list.

    **Applies to: windows**

    Screenshot that shows how to view installed extensions on a VM in the Azure portal.

    **Applies to: linux**

    Screenshot that shows how to view installed extensions on a VM in the Azure portal.


# [**PowerShell**](#tab/powershell)

Use the [Get-AzVMExtension](https://learn.microsoft.com/powershell/module/az.compute/get-azvmextension) cmdlet to list all installed extensions on the virtual machine.

```azurepowershell-interactive
# List the installed extensions on the virtual machine.
Get-AzVMExtension -ResourceGroupName 'myResourceGroup' -VMName 'myVM' | format-table Name, Publisher, ExtensionType, AutoUpgradeMinorVersion, EnableAutomaticUpgrade
```

The output of the cmdlet lists the installed extensions:

**Applies to: windows**


```output
Name                         Publisher                      ExtensionType              AutoUpgradeMinorVersion EnableAutomaticUpgrade
----                         ---------                      -------------              ----------------------- ----------------------
AzureNetworkWatcherExtension Microsoft.Azure.NetworkWatcher NetworkWatcherAgentWindows                    True                   True
```



**Applies to: linux**


```output
Name                         Publisher                      ExtensionType            AutoUpgradeMinorVersion EnableAutomaticUpgrade
----                         ---------                      -------------            ----------------------- ----------------------
AzureNetworkWatcherExtension Microsoft.Azure.NetworkWatcher NetworkWatcherAgentLinux                    True                   True
```



# [**Azure CLI**](#tab/cli)

Use the [az vm extension list](https://learn.microsoft.com/cli/azure/vm/extension#az-vm-extension-list) command to list all installed extensions on the virtual machine.

```azurecli-interactive
# List the installed extensions on the virtual machine.
az vm extension list --resource-group 'myResourceGroup' --vm-name 'myVM' --out table
```

The output of the command lists the installed extensions:

```output
Name                          ProvisioningState    Publisher                       Version    AutoUpgradeMinorVersion
----------------------------  -------------------  ------------------------------  ---------  -------------------------
AzureNetworkWatcherExtension  Succeeded            Microsoft.Azure.NetworkWatcher  1.4        True
```

# [**Resource Manager**](#tab/arm)

N/A

---

## Install Network Watcher Agent VM extension

# [**Portal**](#tab/portal)

From the virtual machine page in the Azure portal, you can install the Network Watcher Agent VM extension by following these steps:

1. Under **Settings**, select **Extensions + applications**.

1. Select **+ Add**, search for **Network Watcher Agent**, and install it. If the extension is already installed, you can see it in the list of extensions.

    Screenshot that shows the VM's extensions page in the Azure portal.

1. In the search box of **Install an Extension**, enter *Network Watcher Agent*, select the matching extension for your operating system from the list, and then select **Next**.

    **Applies to: windows**

    Screenshot that shows how to install Network Watcher Agent for Windows in the Azure portal.

    **Applies to: linux**

    Screenshot that shows how to install Network Watcher Agent for Linux in the Azure portal.


1. Select **Review + create** and then select **Create**.

# [**PowerShell**](#tab/powershell)

Use the [Set-AzVMExtension](https://learn.microsoft.com/powershell/module/az.compute/set-azvmextension) cmdlet to install the Network Watcher Agent VM extension on the virtual machine:

**Applies to: windows**


```azurepowershell-interactive
# Install Network Watcher Agent for Windows on the virtual machine.
Set-AzVMExtension -Name 'AzureNetworkWatcherExtension' -Publisher 'Microsoft.Azure.NetworkWatcher' -ExtensionType 'NetworkWatcherAgentWindows' -EnableAutomaticUpgrade 1 -TypeHandlerVersion '1.4' -ResourceGroupName 'myResourceGroup' -VMName 'myVM' 
```



**Applies to: linux**


```azurepowershell-interactive
# Install Network Watcher Agent for Linux on the virtual machine.
Set-AzVMExtension -Name 'AzureNetworkWatcherExtension' -Publisher 'Microsoft.Azure.NetworkWatcher' -ExtensionType 'NetworkWatcherAgentLinux' -EnableAutomaticUpgrade 1 -TypeHandlerVersion '1.4' -ResourceGroupName 'myResourceGroup' -VMName 'myVM' 
```



When the installation finishes, you see the following output:

```output
RequestId IsSuccessStatusCode StatusCode ReasonPhrase
--------- ------------------- ---------- ------------
                         True         OK 
```

# [**Azure CLI**](#tab/cli)

Use the [az vm extension set](https://learn.microsoft.com/cli/azure/vm/extension#az-vm-extension-set) command to install the Network Watcher Agent VM extension on the virtual machine: 

**Applies to: windows**


```azurecli-interactive
# Install Network Watcher Agent for Windows on the virtual machine.
az vm extension set --name 'NetworkWatcherAgentWindows' --extension-instance-name 'AzureNetworkWatcherExtension' --publisher 'Microsoft.Azure.NetworkWatcher' --enable-auto-upgrade 'true' --version '1.4' --resource-group 'myResourceGroup' --vm-name 'myVM'
```



**Applies to: linux**


```azurecli-interactive
# Install Network Watcher Agent for Linux on the virtual machine.
az vm extension set --name 'NetworkWatcherAgentLinux' --extension-instance-name 'AzureNetworkWatcherExtension' --publisher 'Microsoft.Azure.NetworkWatcher' --enable-auto-upgrade 'true' --version '1.4' --resource-group 'myResourceGroup' --vm-name 'myVM'
```



# [**Resource Manager**](#tab/arm)

Use the following Azure Resource Manager template (ARM template) to install the Network Watcher Agent VM extension on a virtual machine:

**Applies to: windows**


```json
{
    "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {
        "vmName": {
            "type": "string"
        }
    },
    "resources": [
        {
            "name": "[concat(parameters('vmName'), '/AzureNetworkWatcherExtension')]",
            "type": "Microsoft.Compute/virtualMachines/extensions",
            "apiVersion": "2024-07-01",
            "location": "[resourceGroup().location]",
            "properties": {
                "autoUpgradeMinorVersion": true,
                "publisher": "Microsoft.Azure.NetworkWatcher",
                "type": "NetworkWatcherAgentWindows",
                "typeHandlerVersion": "1.4"
            }
        }
    ]
}
```



**Applies to: linux**


```json
{
    "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {
        "vmName": {
            "type": "string"
        }
    },
    "resources": [
        {
            "name": "[concat(parameters('vmName'), '/AzureNetworkWatcherExtension')]",
            "type": "Microsoft.Compute/virtualMachines/extensions",
            "apiVersion": "2024-07-01",
            "location": "[resourceGroup().location]",
            "properties": {
                "autoUpgradeMinorVersion": true,
                "publisher": "Microsoft.Azure.NetworkWatcher",
                "type": "NetworkWatcherAgentLinux",
                "typeHandlerVersion": "1.4"
            }
        }
    ]
}
```



You can use either Azure PowerShell or Azure CLI to deploy the Resource Manager template:

```azurepowershell
# Deploy the JSON template file using Azure PowerShell.
New-AzResourceGroupDeployment -ResourceGroupName 'myResourceGroup' -TemplateFile 'agent.json'
```

```azurecli-interactive
# Deploy the JSON template file using the Azure CLI.
az deployment group create --resource-group 'myResourceGroup' --template-file 'agent.json'
```

---

## Update Network Watcher Agent VM extension

### Check your extension version

You can check your extension version by using the Azure portal, the Azure CLI, or PowerShell.

# [**Portal**](#tab/portal)

1. Go to **Extensions + applications** of your VM in the Azure portal.
1. In the extensions list, check the **Version** column for **AzureNetworkWatcherExtension**. If a newer version is available, the **Latest Version** column shows **(Update Available)**.

    Screenshot that shows the Network Watcher extension.

# [**PowerShell**](#tab/powershell)

Use the [Get-AzVM](https://learn.microsoft.com/powershell/module/az.compute/get-azvm) cmdlet to check the extension's installed version:

```azurepowershell-interactive
(Get-AzVM -ResourceGroupName 'myResourceGroup' -Name 'myVM' -Status).Extensions | Where-Object { $_.Name -eq 'AzureNetworkWatcherExtension' } | Select-Object Name, TypeHandlerVersion
```

Use the [Get-AzVMExtensionImage](https://learn.microsoft.com/powershell/module/az.compute/get-azvmextensionimage) cmdlet to find the latest available version of the extension for your VM's operating system and region:

**Applies to: windows**


```azurepowershell-interactive
Get-AzVMExtensionImage -Location '<region>' -PublisherName 'Microsoft.Azure.NetworkWatcher' -Type 'NetworkWatcherAgentWindows' | Sort-Object -Property { [Version]$_.Version } -Descending | Select-Object -First 1
```



**Applies to: linux**


```azurepowershell-interactive
Get-AzVMExtensionImage -Location '<region>' -PublisherName 'Microsoft.Azure.NetworkWatcher' -Type 'NetworkWatcherAgentLinux' | Sort-Object -Property { [Version]$_.Version } -Descending | Select-Object -First 1
```



# [**Azure CLI**](#tab/cli)

Use the [az vm get-instance-view](https://learn.microsoft.com/cli/azure/vm#az-vm-get-instance-view) command to check the extension's installed version:

```azurecli-interactive
az vm get-instance-view --resource-group 'myResourceGroup' --name 'myVM' --query "extensions[?name=='AzureNetworkWatcherExtension'].typeHandlerVersion" --output tsv
```

Use the [az vm extension image list](https://learn.microsoft.com/cli/azure/vm/extension/image#az-vm-extension-image-list) command to find the latest available version of the extension for your VM's operating system:

**Applies to: windows**


```azurecli-interactive
az vm extension image list --name 'NetworkWatcherAgentWindows' --publisher 'Microsoft.Azure.NetworkWatcher' --latest
```



**Applies to: linux**


```azurecli-interactive
az vm extension image list --name 'NetworkWatcherAgentLinux' --publisher 'Microsoft.Azure.NetworkWatcher' --latest
```



# [**Resource Manager**](#tab/arm)

N/A

---

> **Note:**
> The latest version of the Network Watcher extension is `1.4.4011.1`.


### Enable automatic upgrade

Automatic upgrade lets the Azure platform update the extension to the latest version without manual intervention. Use the following steps to check whether automatic upgrade is enabled, and to enable it if it's not.

# [**Portal**](#tab/portal)

1. Under **Settings** of your VM in the Azure portal, select **Extensions + applications**.
1. Select **AzureNetworkWatcherExtension** from the list of extensions, and check the **Automatic upgrade status** column.

1. If it shows **Disabled**, select **Enable automatic upgrade** from the toolbar.

    Screenshot that shows the Network Watcher extension.

1. Select **Yes** to confirm.

    Screenshot that shows the confirmation dialog for enabling automatic upgrade on the Network Watcher extension.

# [**PowerShell**](#tab/powershell)

Use [Get-AzVMExtension](https://learn.microsoft.com/powershell/module/az.compute/get-azvmextension) cmdlet to check whether automatic upgrade is enabled:

```azurepowershell-interactive
Get-AzVMExtension -ResourceGroupName 'myResourceGroup' -VMName 'myVM' -Name 'AzureNetworkWatcherExtension' | Select-Object Name, EnableAutomaticUpgrade
```

If `EnableAutomaticUpgrade` is `False`, use [Set-AzVMExtension](https://learn.microsoft.com/powershell/module/az.compute/set-azvmextension) cmdlet to enable it:

**Applies to: windows**


```azurepowershell-interactive
Set-AzVMExtension -ResourceGroupName 'myResourceGroup' -VMName 'myVM' -Name 'AzureNetworkWatcherExtension' -Publisher 'Microsoft.Azure.NetworkWatcher' -ExtensionType 'NetworkWatcherAgentWindows' -EnableAutomaticUpgrade $true
```



**Applies to: linux**


```azurepowershell-interactive
Set-AzVMExtension -ResourceGroupName 'myResourceGroup' -VMName 'myVM' -Name 'AzureNetworkWatcherExtension' -Publisher 'Microsoft.Azure.NetworkWatcher' -ExtensionType 'NetworkWatcherAgentLinux' -EnableAutomaticUpgrade $true
```



# [**Azure CLI**](#tab/cli)

Use the [az vm extension show](https://learn.microsoft.com/cli/azure/vm/extension#az-vm-extension-show) command to check whether automatic upgrade is enabled:

```azurecli-interactive
az vm extension show --resource-group 'myResourceGroup' --vm-name 'myVM' --name 'AzureNetworkWatcherExtension' --query 'enableAutomaticUpgrade'
```

If the command returns `false`, use the [az vm extension set](https://learn.microsoft.com/cli/azure/vm/extension#az-vm-extension-set) command to enable it:

**Applies to: windows**


```azurecli-interactive
az vm extension set --resource-group 'myResourceGroup' --vm-name 'myVM' --name 'NetworkWatcherAgentWindows' --publisher 'Microsoft.Azure.NetworkWatcher' --enable-auto-upgrade 'true'
```



**Applies to: linux**


```azurecli-interactive
az vm extension set --resource-group 'myResourceGroup' --vm-name 'myVM' --name 'NetworkWatcherAgentLinux' --publisher 'Microsoft.Azure.NetworkWatcher' --enable-auto-upgrade 'true'
```



# [**Resource Manager**](#tab/arm)

Use the following Azure Resource Manager template (ARM template) to enable automatic upgrade on the Network Watcher Agent VM extension:

**Applies to: windows**


```json
{
    "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {
        "vmName": {
            "type": "string"
        }
    },
    "resources": [
        {
            "name": "[concat(parameters('vmName'), '/AzureNetworkWatcherExtension')]",
            "type": "Microsoft.Compute/virtualMachines/extensions",
            "apiVersion": "2024-07-01",
            "location": "[resourceGroup().location]",
            "properties": {
                "autoUpgradeMinorVersion": true,
                "enableAutomaticUpgrade": true,
                "publisher": "Microsoft.Azure.NetworkWatcher",
                "type": "NetworkWatcherAgentWindows",
                "typeHandlerVersion": "1.4"
            }
        }
    ]
}
```



**Applies to: linux**


```json
{
    "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {
        "vmName": {
            "type": "string"
        }
    },
    "resources": [
        {
            "name": "[concat(parameters('vmName'), '/AzureNetworkWatcherExtension')]",
            "type": "Microsoft.Compute/virtualMachines/extensions",
            "apiVersion": "2024-07-01",
            "location": "[resourceGroup().location]",
            "properties": {
                "autoUpgradeMinorVersion": true,
                "enableAutomaticUpgrade": true,
                "publisher": "Microsoft.Azure.NetworkWatcher",
                "type": "NetworkWatcherAgentLinux",
                "typeHandlerVersion": "1.4"
            }
        }
    ]
}
```



You can use either Azure PowerShell or Azure CLI to deploy the Resource Manager template:

```azurepowershell
# Deploy the JSON template file using Azure PowerShell.
New-AzResourceGroupDeployment -ResourceGroupName 'myResourceGroup' -TemplateFile 'agent.json'
```

```azurecli-interactive
# Deploy the JSON template file using the Azure CLI.
az deployment group create --resource-group 'myResourceGroup' --template-file 'agent.json'
```

---

> **Note:**
> After you enable automatic upgrade, Azure updates the extension automatically without requiring a restart of the virtual machine. This process can take up to 30 days after a new version is released.

### Update manually

# [**Portal**](#tab/portal)

1. Under **Settings** of your VM in the Azure portal, select **Extensions + applications**.
1. Select **AzureNetworkWatcherExtension** from the list of extensions, and then select **Update** from the toolbar.

    Screenshot that shows the Network Watcher extension.

1. Select **Yes** to confirm.

    Screenshot that shows the confirmation dialog for updating the Network Watcher extension to the latest version.

1. When the update finishes, the **Version** and **Latest Version** columns show the same version number.

    Screenshot that shows the Network Watcher extension after it's updated to the latest version.

If updating doesn't apply the latest version, remove the extension and install it again:

1. Select **AzureNetworkWatcherExtension** from the list of extensions, and then select **Uninstall**.
1. Select **+ Add**, search for **Network Watcher Agent**, and install it again. The platform automatically installs the latest available version. For more information, see [Install Network Watcher Agent VM extension](#install-network-watcher-agent-vm-extension).

# [**PowerShell**](#tab/powershell)

Use the [Set-AzVMExtension](https://learn.microsoft.com/powershell/module/az.compute/set-azvmextension) cmdlet with the `-ForceRerun` parameter to reapply the extension without uninstalling it. The `-ForceRerun` value must be different from its current value each time you run the command, so use a value that changes, such as the current date and time:

**Applies to: windows**


```azurepowershell-interactive
Set-AzVMExtension -ResourceGroupName 'myResourceGroup' -VMName 'myVM' -Name 'AzureNetworkWatcherExtension' -Publisher 'Microsoft.Azure.NetworkWatcher' -Type 'NetworkWatcherAgentWindows' -ForceRerun (Get-Date -Format o)
```



**Applies to: linux**


```azurepowershell-interactive
Set-AzVMExtension -ResourceGroupName 'myResourceGroup' -VMName 'myVM' -Name 'AzureNetworkWatcherExtension' -Publisher 'Microsoft.Azure.NetworkWatcher' -Type 'NetworkWatcherAgentLinux' -ForceRerun (Get-Date -Format o)
```



If that condition doesn't update the extension, remove it and install it again to get the latest version:

```azurepowershell-interactive
Remove-AzVMExtension -ResourceGroupName 'myResourceGroup' -VMName 'myVM' -Name 'AzureNetworkWatcherExtension'
```

**Applies to: windows**


```azurepowershell-interactive
Set-AzVMExtension -ResourceGroupName 'myResourceGroup' -VMName 'myVM' -Name 'AzureNetworkWatcherExtension' -Publisher 'Microsoft.Azure.NetworkWatcher' -Type 'NetworkWatcherAgentWindows'
```



**Applies to: linux**


```azurepowershell-interactive
Set-AzVMExtension -ResourceGroupName 'myResourceGroup' -VMName 'myVM' -Name 'AzureNetworkWatcherExtension' -Publisher 'Microsoft.Azure.NetworkWatcher' -Type 'NetworkWatcherAgentLinux'
```



# [**Azure CLI**](#tab/cli)

Use the [az vm extension set](https://learn.microsoft.com/cli/azure/vm/extension#az-vm-extension-set) command with the `--force-update` parameter to reapply the extension without uninstalling it:

**Applies to: windows**


```azurecli-interactive
az vm extension set --resource-group 'myResourceGroup' --vm-name 'myVM' --name 'NetworkWatcherAgentWindows' --publisher 'Microsoft.Azure.NetworkWatcher' --force-update
```



**Applies to: linux**


```azurecli-interactive
az vm extension set --resource-group 'myResourceGroup' --vm-name 'myVM' --name 'NetworkWatcherAgentLinux' --publisher 'Microsoft.Azure.NetworkWatcher' --force-update
```



If that condition doesn't update the extension, remove it and install it again to get the latest version:

```azurecli-interactive
az vm extension delete --resource-group 'myResourceGroup' --vm-name 'myVM' --name 'AzureNetworkWatcherExtension'
```

**Applies to: windows**


```azurecli-interactive
az vm extension set --resource-group 'myResourceGroup' --vm-name 'myVM' --name 'NetworkWatcherAgentWindows' --publisher 'Microsoft.Azure.NetworkWatcher'
```



**Applies to: linux**


```azurecli-interactive
az vm extension set --resource-group 'myResourceGroup' --vm-name 'myVM' --name 'NetworkWatcherAgentLinux' --publisher 'Microsoft.Azure.NetworkWatcher'
```



# [**Resource Manager**](#tab/arm)

Use the following Azure Resource Manager template (ARM template) to reapply the extension. Update the `typeHandlerVersion` parameter to the latest version you identified in [Check your extension version](#check-your-extension-version), and redeploy the template:

**Applies to: windows**


```json
{
    "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {
        "vmName": {
            "type": "string"
        },
        "typeHandlerVersion": {
            "type": "string"
        }
    },
    "resources": [
        {
            "name": "[concat(parameters('vmName'), '/AzureNetworkWatcherExtension')]",
            "type": "Microsoft.Compute/virtualMachines/extensions",
            "apiVersion": "2024-07-01",
            "location": "[resourceGroup().location]",
            "properties": {
                "autoUpgradeMinorVersion": true,
                "publisher": "Microsoft.Azure.NetworkWatcher",
                "type": "NetworkWatcherAgentWindows",
                "typeHandlerVersion": "[parameters('typeHandlerVersion')]"
            }
        }
    ]
}
```



**Applies to: linux**


```json
{
    "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {
        "vmName": {
            "type": "string"
        },
        "typeHandlerVersion": {
            "type": "string"
        }
    },
    "resources": [
        {
            "name": "[concat(parameters('vmName'), '/AzureNetworkWatcherExtension')]",
            "type": "Microsoft.Compute/virtualMachines/extensions",
            "apiVersion": "2024-07-01",
            "location": "[resourceGroup().location]",
            "properties": {
                "autoUpgradeMinorVersion": true,
                "publisher": "Microsoft.Azure.NetworkWatcher",
                "type": "NetworkWatcherAgentLinux",
                "typeHandlerVersion": "[parameters('typeHandlerVersion')]"
            }
        }
    ]
}
```



You can use either Azure PowerShell or Azure CLI to deploy the Resource Manager template:

```azurepowershell
# Deploy the JSON template file using Azure PowerShell.
New-AzResourceGroupDeployment -ResourceGroupName 'myResourceGroup' -TemplateFile 'agent.json' -typeHandlerVersion '<version>'
```

```azurecli-interactive
# Deploy the JSON template file using the Azure CLI.
az deployment group create --resource-group 'myResourceGroup' --template-file 'agent.json' --parameters typeHandlerVersion='<version>'
```

---

### Update at scale with a PowerShell script

If you have large deployments, use a PowerShell script to update multiple VMs in a subscription at once. The following script updates the Network Watcher extension on all out-of-date VMs in a subscription:

```powershell
<#
    .SYNOPSIS
    This script scans all VMs in the provided subscription and upgrades any out-of-date AzureNetworkWatcherExtensions to the latest available version.
    .DESCRIPTION
    This script is a no-op if AzureNetworkWatcherExtensions are already up to date.
    Requires Azure PowerShell 4.2 or higher to be installed.
    .EXAMPLE
    .\UpdateVMAgentsInSub.ps1 -SubID aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e -NoUpdate
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)]
    [string] $SubID,
    [Parameter(Mandatory=$false)]
    [Switch] $NoUpdate = $false
)
function Get-LatestExtensionVersion($location, $extensionType)
{
    $latestImage = Get-AzVMExtensionImage -Location $location -PublisherName "Microsoft.Azure.NetworkWatcher" -Type $extensionType |
        Sort-Object -Property { [Version]$_.Version } -Descending |
        Select-Object -First 1
    return $latestImage.Version
}
Write-Host "Scanning all VMs in the subscription: $($SubID)"
Set-AzContext -SubscriptionId $SubID
$vms = Get-AzVM
$foundVMs = $false
Write-Host "Starting VM search, this may take a while"
foreach ($vmName in $vms)
{
    # Get Detailed VM info
    $vm = Get-AzVM -ResourceGroupName $vmName.ResourceGroupName -Name $vmName.name -Status
    $isitWindows = $vm.OsName -like "*Windows*"
    $type = if ($isitWindows) { "NetworkWatcherAgentWindows" } else { "NetworkWatcherAgentLinux" }
    $latestVersion = Get-LatestExtensionVersion -location $vmName.Location -extensionType $type

    foreach ($extension in $vm.Extensions)
    {
        if ($extension.Name -eq "AzureNetworkWatcherExtension")
        {
            if ([Version]$extension.TypeHandlerVersion -lt [Version]$latestVersion)
            {
                $foundVMs = $true
                if (-not ($NoUpdate))
                {
                    Write-Host "Found VM that needs to be updated: subscriptions/$($SubID)/resourceGroups/$($vm.ResourceGroupName)/providers/Microsoft.Compute/virtualMachines/$($vm.Name) -> Updating to $latestVersion " -NoNewline
                    Remove-AzVMExtension -ResourceGroupName $vm.ResourceGroupName -VMName $vm.Name -Name "AzureNetworkWatcherExtension" -Force
                    Write-Host "... " -NoNewline
                    Set-AzVMExtension -ResourceGroupName $vm.ResourceGroupName -Location $vmName.Location -VMName $vm.Name -Name "AzureNetworkWatcherExtension" -Publisher "Microsoft.Azure.NetworkWatcher" -Type $type -TypeHandlerVersion $latestVersion
                    Write-Host "Done"
                }
                else
                {
                    Write-Host "Found $(if ($isitWindows) {"Windows"} else {"Linux"}) VM that needs to be updated to $($latestVersion): subscriptions/$($SubID)/resourceGroups/$($vm.ResourceGroupName)/providers/Microsoft.Compute/virtualMachines/$($vm.Name)"
                }
            }
        }
    }
}

if ($foundVMs)
{
    Write-Host "Finished $(if ($NoUpdate) {"searching"} else {"updating"}) out of date AzureNetworkWatcherExtension on VMs"
}
else
{
    Write-Host "All AzureNetworkWatcherExtensions up to date"
}

```

## Uninstall Network Watcher Agent VM extension

# [**Portal**](#tab/portal)

From the virtual machine page in the Azure portal, you can uninstall the Network Watcher Agent VM extension by following these steps:

1. Under **Settings**, select **Extensions + applications**.

1. Select **AzureNetworkWatcherExtension** from the list of extensions, and then select **Uninstall**.

    **Applies to: windows**

    Screenshot that shows how to uninstall Network Watcher Agent for Windows in the Azure portal.

    **Applies to: linux**

    Screenshot that shows how to uninstall Network Watcher Agent for Linux in the Azure portal.


    > **Note:**
    > You might see Network Watcher Agent VM extension named differently than **AzureNetworkWatcherExtension**.

# [**PowerShell**](#tab/powershell)

Use the [Remove-AzVMExtension](https://learn.microsoft.com/powershell/module/az.compute/remove-azvmextension) cmdlet to remove the Network Watcher Agent VM extension from the virtual machine:

```azurepowershell-interactive
# Uninstall Network Watcher Agent VM extension.
Remove-AzVMExtension -Name 'AzureNetworkWatcherExtension' -ResourceGroupName 'myResourceGroup' -VMName 'myVM'
```

# [**Azure CLI**](#tab/cli)

Use the [az vm extension delete](https://learn.microsoft.com/cli/azure/vm/extension#az-vm-extension-delete) command to remove the Network Watcher Agent VM extension from the virtual machine:

```azurecli-interactive
# Uninstall Network Watcher Agent VM extension.
az vm extension delete --name 'AzureNetworkWatcherExtension' --resource-group 'myResourceGroup' --vm-name 'myVM'
```

# [**Resource Manager**](#tab/arm)

N/A

---

## Frequently asked questions (FAQ)

To get answers to the most frequently asked questions about Network Watcher Agent, see [Network Watcher Agent FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/network-watcher/frequently-asked-questions.yml#network-watcher-agent).

## Related content

- [Enable or disable Azure Network Watcher](network-watcher-create.md)
- [Microsoft Q\&A - Network Watcher](https://learn.microsoft.com/answers/topics/azure-network-watcher.html)
