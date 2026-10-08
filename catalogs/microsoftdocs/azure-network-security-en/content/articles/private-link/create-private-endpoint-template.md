---
title: 'Quickstart: Create a private endpoint - ARM template'
description: In this quickstart, you'll learn how to create a private endpoint using an Azure Resource Manager template (ARM template).
services: private-link
author: asudbring
ms.service: azure-private-link
ms.topic: quickstart
ms.date: 03/25/2025
ms.author: allensu
ms.custom: subject-armqs, mode-arm, template-quickstart, devx-track-arm-template
#Customer intent: As someone who has a basic network background but is new to Azure, I want to create a private endpoint by using an ARM template.
# Customer intent: As a network administrator new to Azure, I want to create a private endpoint using an ARM template, so that I can securely connect to my Azure SQL Database while learning to manage resources in the cloud.
---

# Quickstart: Create a private endpoint by using an ARM template

In this quickstart, you'll use an Azure Resource Manager template (ARM template) to create a private endpoint.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/create-private-endpoint-template.md)

You can also create a private endpoint by using the [Azure portal](create-private-endpoint-portal.md), [Azure PowerShell](create-private-endpoint-powershell.md), or the [Azure CLI](create-private-endpoint-cli.md).

If your environment meets the prerequisites and you're familiar with using ARM templates, select the **Deploy to Azure** button here. The ARM template will open in the Azure portal.

Button to deploy the Resource Manager template to Azure.

Diagram of resources created in private endpoint quickstart.


## Prerequisites

You need an Azure account with an active subscription. If you don't already have an Azure account, [create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

## Review the template

This template creates a private endpoint for an instance of Azure SQL Database.

The template that this quickstart uses is from [Azure Quickstart Templates](https://azure.microsoft.com/resources/templates/private-endpoint-sql/).

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.sql/private-endpoint-sql/azuredeploy.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/create-private-endpoint-template.md)

The template defines multiple Azure resources:

- [**Microsoft.Sql/servers**](https://learn.microsoft.com/azure/templates/microsoft.sql/servers): The instance of SQL Database with the sample database.
- [**Microsoft.Sql/servers/databases**](https://learn.microsoft.com/azure/templates/microsoft.sql/servers/databases): The sample database.
- [**Microsoft.Network/virtualNetworks**](https://learn.microsoft.com/azure/templates/microsoft.network/virtualnetworks): The virtual network where the private endpoint is deployed.
- [**Microsoft.Network/privateEndpoints**](https://learn.microsoft.com/azure/templates/microsoft.network/privateendpoints): The private endpoint that you use to access the instance of SQL Database.
- [**Microsoft.Network/privateDnsZones**](https://learn.microsoft.com/azure/templates/microsoft.network/privatednszones): The zone that you use to resolve the private endpoint IP address.
- [**Microsoft.Network/privateDnsZones/virtualNetworkLinks**](https://learn.microsoft.com/azure/templates/microsoft.network/privatednszones/virtualnetworklinks)
- [**Microsoft.Network/privateEndpoints/privateDnsZoneGroups**](https://learn.microsoft.com/azure/templates/microsoft.network/privateendpoints/privateDnsZoneGroups): The zone group that you use to associate the private endpoint with a private DNS zone.
- [**Microsoft.Network/publicIpAddresses**](https://learn.microsoft.com/azure/templates/microsoft.network/publicIpAddresses): The public IP address that you use to access the virtual machine.
- [**Microsoft.Network/networkInterfaces**](https://learn.microsoft.com/azure/templates/microsoft.network/networkinterfaces): The network interface for the virtual machine.
- [**Microsoft.Compute/virtualMachines**](https://learn.microsoft.com/azure/templates/microsoft.compute/virtualmachines): The virtual machine that you use to test the connection of the private endpoint to the instance of SQL Database.

## Deploy the template

Deploy the ARM template to Azure by doing the following:

1. Sign in to Azure and open the ARM template by selecting the **Deploy to Azure** button here. The template creates the private endpoint, the instance of SQL Database, the network infrastructure, and a virtual machine to be validated.

   Button to deploy the Resource Manager template to Azure.

1. Select your resource group or create a new one.
1. Enter the SQL administrator sign-in name and password.
1. Enter the virtual machine administrator username and password.
1. Read the terms and conditions statement. If you agree, select **I agree to the terms and conditions stated above**, and then select **Purchase**. The deployment can take 20 minutes or longer to complete.

## Validate the deployment

> **Note:**
> The ARM template generates a unique name for the virtual machine myVm<b>{uniqueid}</b> resource, and for the SQL Database sqlserver<b>{uniqueid}</b> resource. Substitute your generated value for **{uniqueid}**.

### Connect to a VM from the internet

Connect to the VM _myVm{uniqueid}_ from the internet by doing the following:

1. In the portal's search bar, enter _myVm{uniqueid}_.

1. Select **Connect**. **Connect to virtual machine** opens.

1. Select **Download RDP File**. Azure creates a Remote Desktop Protocol (RDP) file and downloads it to your computer.

1. Open the downloaded RDP file.

   a. If you're prompted, select **Connect**.  
   b. Enter the username and password that you specified when you created the VM.

      > **Note:**
      > You might need to select **More choices** > **Use a different account** to specify the credentials you entered when you created the VM.

1. Select **OK**.

   You might receive a certificate warning during the sign-in process. If you do, select **Yes** or **Continue**.

1. After the VM desktop appears, minimize it to go back to your local desktop.

### Access the SQL Database server privately from the VM

To connect to the SQL Database server from the VM by using the private endpoint, do the following:

1.  On the Remote Desktop of _myVM{uniqueid}_, open PowerShell.
1.  Run the following command: 

    `nslookup sqlserver{uniqueid}.database.windows.net` 

    You'll receive a message that's similar to this one:

    ```
      Server:  UnKnown
      Address:  168.63.129.16
      Non-authoritative answer:
      Name:    sqlserver.privatelink.database.windows.net
      Address:  10.0.0.5
      Aliases:  sqlserver.database.windows.net
    ```

1.  Install SQL Server Management Studio.

1.  On the **Connect to server** pane, do the following:
    - For **Server type**, select **Database Engine**.
    - For **Server name**, select **sqlserver{uniqueid}.database.windows.net**.
    - For **Username**, enter the username that was provided earlier.
    - For **Password**, enter the password that was provided earlier.
    - For **Remember password**, select **Yes**.

1. Select **Connect**.
1. On the left pane, select **Databases**. Optionally, you can create or query information from _sample-db_.
1. Close the Remote Desktop connection to _myVm{uniqueid}_.

## Clean up resources

When you no longer need the resources that you created with the private endpoint, delete the resource group. Doing so removes the private endpoint and all the related resources.

To delete the resource group, run the `Remove-AzResourceGroup` cmdlet:

```azurepowershell-interactive
Remove-AzResourceGroup -Name <your resource group name>
```

## Next steps

For more information about the services that support private endpoints, see:
> 
> [What is Azure Private Link?](private-link-overview.md#availability)
