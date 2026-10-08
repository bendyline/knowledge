---
title: Use PowerShell to enable transparent data encryption
titleSuffix: Azure SQL Managed Instance
description: Enable transparent data encryption in Azure SQL Managed Instance using PowerShell and your own key.
author: MladjoA
ms.author: mlandzic
ms.reviewer: vanto
ms.date: 05/18/2022
ms.service: azure-sql-managed-instance
ms.subservice: security
ms.topic: how-to
ms.custom: kr2b-contr-experiment, devx-track-azurepowershell
ms.devlang: powershell
---

# PowerShell script to enable transparent data encryption using your own key



  **Applies to:**    [Azure SQL Managed Instance](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

This PowerShell script example configures transparent data encryption (TDE) in Azure SQL Managed Instance, using a customer-managed key from Azure Key Vault. This is often referred to as a bring-your-own-key (BYOK) scenario for TDE. To learn more, see [Azure SQL Transparent Data Encryption with customer-managed key](../../database/transparent-data-encryption-byok-overview.md).

## Prerequisites

- An existing managed instance. See [Use PowerShell to create a managed instance](create-configure-managed-instance-powershell.md).

If you don't have an [Azure subscription](https://learn.microsoft.com/azure/guides/developer/azure-developer-guide#understanding-accounts-subscriptions-and-billing), create an [Azure free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

> **Note:**
> This article uses the Azure Az PowerShell module, which is the recommended PowerShell module for interacting with Azure. To get started with the Az PowerShell module, see [Install Azure PowerShell](https://learn.microsoft.com/powershell/azure/install-az-ps). To learn how to migrate to the Az PowerShell module, see [Migrate Azure PowerShell from AzureRM to Az](https://learn.microsoft.com/powershell/azure/migrate-from-azurerm-to-az).

## Use Azure Cloud Shell

Azure hosts Azure Cloud Shell, an interactive shell environment that you can use through your browser. You can use either Bash or PowerShell with Cloud Shell to work with Azure services. You can use the Cloud Shell preinstalled commands to run the code in this article, without having to install anything on your local environment.

To start Azure Cloud Shell:

| Option | Example/Link |
| --- | --- |
| Select **Try It** in the upper-right corner of a code block. Selecting **Try It** doesn't automatically copy the code to Cloud Shell. | Screenshot that shows an example of Try It for Azure Cloud Shell. |
| Go to <https://shell.azure.com>, or select the **Launch Cloud Shell** button to open Cloud Shell in your browser. | [Screenshot that shows how to launch Cloud Shell in a new window.](https://shell.azure.com) |
| Select the **Cloud Shell** button on the menu bar at the upper right in the [Azure portal](https://portal.azure.com). | Screenshot that shows the Cloud Shell button in the Azure portal |

To run the code in this article in Azure Cloud Shell:

1. Start Cloud Shell.

1. Select the **Copy** button on a code block to copy the code.

1. Paste the code into the Cloud Shell session by selecting **Ctrl**+**Shift**+**V** on Windows and Linux, or by selecting **Cmd**+**Shift**+**V** on macOS.

1. Select **Enter** to run the code.


Using PowerShell locally or using Azure Cloud Shell requires Azure PowerShell 2.3.2 or a later version. If you need to upgrade, see [Install Azure PowerShell module](https://learn.microsoft.com/powershell/azure/install-az-ps), or run the below sample script to install the module for the current user:

`Install-Module -Name Az -AllowClobber -Scope CurrentUser`

If you are running PowerShell locally, you also need to run `Connect-AzAccount` to create a connection with Azure.

## Sample scripts 

[Code reference unavailable in this source snapshot: ~/../azure_powershell_scripts/azure-sql/managed-instance/transparent-data-encryption/setup-tde-byok-sqlmi-az-ps.ps1](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/managed-instance/scripts/transparent-data-encryption-byok-powershell.md)

## Next steps

For more information on Azure PowerShell, see [Azure PowerShell documentation](https://learn.microsoft.com/powershell/azure/).

Additional PowerShell script samples for SQL Managed Instance can be found in [Azure SQL Managed Instance PowerShell scripts](../../database/powershell-script-content-guide.md).
