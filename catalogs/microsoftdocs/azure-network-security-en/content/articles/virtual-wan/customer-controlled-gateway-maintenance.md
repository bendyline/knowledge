---
title: 'Configure customer-controlled maintenance for your Virtual WAN gateways'
titleSuffix: Azure Virtual WAN
description: Learn how to configure customer-controlled maintenance for your Virtual WAN gateways using the Azure portal or PowerShell.
author: duongau
ms.service: azure-virtual-wan
ms.custom: devx-track-azurepowershell
ms.topic: how-to
ms.date: 03/11/2025
ms.author: duau
---
# Configure customer-controlled gateway maintenance for Virtual WAN

This article helps you configure customer-controlled maintenance windows for Virtual WAN site-to-site VPN gateways, Virtual WAN user VPN (or point-to-site VPN) gateways and Virtual WAN ExpressRoute gateways. Learn how to schedule customer-controlled maintenance for your gateways using the Azure portal or PowerShell.

>**Note:**
> You can also configure customer-controlled maintenance windows for Azure Firewall in secured hubs. For more information, see [Configure customer-controlled maintenance for Azure Firewall](../firewall/customer-controlled-maintenance.md).


Gateways undergo regular updates aimed at enhancing functionality, reliability, performance, and security. These updates encompass a wide range of activities, including patching software components, upgrading networking components, and decommissioning hardware.

In most cases, these updates are carefully planned to minimize their impact on customer operations. Factors such as Azure scheduling updates during nonbusiness hours in the gateway region, and customers having robust architecture, help ensure that most updates don't disrupt normal business activities. However, there might be instances where customers are affected by these updates. To mitigate any potential impact on operations, you can configure maintenance windows during non-business hours. This allows you to avoid disruptions and maintain smooth gateway operations.

For more information on limitations and frequently asked questions related to customer-controlled maintenance, see the [Virtual WAN FAQ](virtual-wan-faq.md).

## Azure portal steps


Use the following steps to create a maintenance configuration.

1. In the Azure portal, search for **Maintenance Configurations**.

1. On the **Maintenance Configurations** page, select **+ Create** to open the **create a maintenance configuration** page.

   Screenshot of Maintenance Configurations page.

1. On the **Basics** page, input the relevant values.

   * **Subscription:** Your subscription.
   * **Resource Group:** The resource group your resources reside in.
   * **Configuration name:** Use an intuitive name by which you can identify this maintenance configuration.
   * **Region:** The Region needs to be same region as your gateway resources.
   * **Maintenance scope:** Select **Network gateways** from the dropdown.
1. Click **Add a schedule** to define the maintenance schedule. The maintenance window needs to be a minimum of 5 Hours.
1. After you specify the schedule, click **Save**.
1. Next, select the resources. On the **Resources** page, click **+ Add resources**. You can add resources to the maintenance configuration when creating the configuration, or you can add the resources after the maintenance configuration is created. For this exercise, we'll add resources at the same time we create a maintenance configuration.
1. On the **Select resources** page you should see your resources. If you don't, go back and make sure that you selected the correct region and maintenance scope. Select the resources you want to include in this maintenance configuration, then click **OK**.

   Values for **Type** are:

   * **VPN Gateways:** Virtual WAN site-to-site VPN gateways
   * **ExpressRoute Gateways:** Virtual WAN ExpressRoute gateways
   * **Virtual network gateways** VPN and ExpressRoute Virtual network gateways

1. Click **Review + Create** to validate. Once validation completes, click **Create**.


### View resources

To view the associated resources for a maintenance configuration, use the following steps.

1. In the portal, go to the Maintenance Configurations page.
1. Click the maintenance configuration that you created.
1. In the left pane, click **Resources** to open the Resources page and view the associated resources for this maintenance configuration.

### Add resources

You can add resources to a maintenance configuration.

1. In the portal, go to the Maintenance Configurations page.
1. Click the maintenance configuration that you created.
1. In the left pane, click **Resources** to open the Resources page and view the associated resources for this maintenance configuration.
1. On the Resource page, click **+ Add** to add a resource.

### Remove resources

You can remove associated resources from a maintenance configuration.

1. In the portal, go to the Maintenance Configurations page.
1. Click the maintenance configuration that you created.
1. In the left pane, click **Resources** to open the Resources page and view the associated resources for this maintenance configuration.
1. On the Resource page, select the resource that you want to remove, then click **X Remove**.
1. On the **Remove resources** message, click **Yes**.


## Azure PowerShell steps



Use the following steps to assign policy to the resources. If you're new to PowerShell, see [Get started with Azure PowerShell](https://learn.microsoft.com/powershell/azure/get-started-azureps).

1. Set the Subscription context.

   ```azurepowershell-interactive
   set-AzContext -Subscription 'Subscription Name’
   ```

1. Register the Azure Resource Provider.

   ```azurepowershell-interactive
   Register-AzResourceProvider -ProviderNamespace Microsoft.Maintenance
   ```

1. Create a maintenance configuration using the [New-AzMaintenanceConfiguration](https://learn.microsoft.com/powershell/module/az.maintenance/new-azmaintenanceconfiguration) cmdlet.

   * The **-Duration** must be a minimum of a 5 hour window.
   * The **-RecurEvery** is per day.
   * For TimeZone options, see [Time Zones](https://learn.microsoft.com/rest/api/sql/2020-11-01-preview/time-zones/list-by-location).

   ```azurepowershell-interactive
   New-AzMaintenanceConfiguration -ResourceGroupName <rgName> -Name <configurationName> -Location <arm location of resource> -MaintenanceScope Resource -ExtensionProperty @{"maintenanceSubScope"="NetworkGatewayMaintenance"} -StartDateTime "<date in YYYY-MM-DD HH:mm format>" -TimeZone "<Selected Time Zone>" -Duration "<Duration in HH:mm format>" -Visibility "Custom" -RecurEvery "1Day"
   ```

1. Save the **maintenance configuration** as a variable named `$config`.

   ```azurepowershell-interactive
   $config = Get-AzMaintenanceConfiguration -ResourceGroupName <rgName> -Name <configurationName>
   ```

1. Save the service resource as a variable named `$serviceResource`.

6. Create the maintenance configuration assignment using the [New-AzConfigurationAssignment](https://learn.microsoft.com/powershell/module/az.maintenance/new-azconfigurationassignment) cmdlet. The maintenance policy is applied to the resource within 24 hours.

   ```azurepowershell-interactive
   New-AzConfigurationAssignment -ResourceGroupName <rgName> -ProviderName "Microsoft.Network" -ResourceType "<your resource's resource type per ARM. For example, expressRouteGateways or vpnSites>" -ResourceName "<your resource's name>" -ConfigurationAssignmentName "<assignment name>" -ResourceId $serviceResource.Id -MaintenanceConfigurationId $config.Id -Location "<arm location of resource>"
   ```

### To remove a configuration assignment


A configuration assignment is removed automatically if the configuration or the resource is deleted.

If you want to manually remove a configuration assignment from the maintenance configuration to a resource, use the [Remove-AzConfigurationAssignment](https://learn.microsoft.com/powershell/module/az.maintenance/remove-azconfigurationassignment) cmdlet.

## Next steps

For more information, see the [Virtual WAN FAQ](virtual-wan-faq.md).
