---
title: "Tutorial: Load balance VMs within an availability zone - Azure portal"
titleSuffix: Azure Load Balancer
description: This tutorial demonstrates how to create a Standard Load Balancer with zonal frontend to load balance VMs within an availability zone by using Azure portal.
services: load-balancer
author: mbender-ms
ms.service: azure-load-balancer
ms.topic: tutorial
ms.date: 12/04/2023
ms.author: mbender
ms.custom: template-tutorial
# Customer intent: As an IT administrator, I want to create a load balancer that load balances incoming internet traffic to virtual machines within a specific zone in a region.
---

# Tutorial: Load balance VMs within an availability zone by using the Azure portal

This tutorial creates a public [load balancer](https://aka.ms/azureloadbalancerstandard) with a zonal IP. In the tutorial, you specify a zone for your frontend and backend instances.

In this tutorial, you learn how to:

> 
> * Create a virtual network with an Azure Bastion host for management.
> * Create a NAT gateway for outbound internet access of the resources in the virtual network.
> * Create a load balancer with a health probe and traffic rules.
> * Create zonal virtual machines (VMs) and attach them to a load balancer.
> * Create a basic Internet Information Services (IIS) site.
> * Test the load balancer.

For more information about availability zones and a standard load balancer, see [Standard load balancer and availability zones](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/load-balancer-standard-availability-zones.md).

## Prerequisites

* An Azure subscription

## Sign in to Azure

Sign in to the [Azure portal](https://portal.azure.com).


## Create a virtual network and bastion host

In this section, you create a virtual network with a resource subnet, an Azure Bastion subnet, an Azure Bastion host, and a NAT gateway for outbound internet access for resources in the virtual network. For other options for outbound rules, see [Network Address Translation (SNAT) for outbound connections](https://learn.microsoft.com/azure/load-balancer/load-balancer-outbound-connections).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/bastion-pricing.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/tutorial-load-balancer-standard-public-zonal-portal.md)

1. In the portal, search for and select **Virtual networks**.

1. On **Virtual networks**, select **+ Create**.

1. On the **Basics** tab of **Create virtual network**, enter or select the following information:

    | Setting | Value |
    | --- | --- |
    | **Project details** |  |
    | Subscription | Select your subscription. |
    | Resource group | Select **load-balancer-rg** from the dropdown or **Create new** if it doesn't exist.</br> Enter **load-balancer-rg** in Name.</br> Select **OK**. |
    | **Instance details** |  |
    | Name | Enter **lb-vnet**. |
    | Region | Select **(US) East US**. |

1. Select the **Security** tab or **Next** button at the bottom of the page.
1. Under **Azure Bastion**, enter or select the following information:

    | Setting | Value |
    | --- | --- |
    | **Azure Bastion** |  |
    | Enable Azure Bastion | Select the checkbox. |
    | Azure Bastion host name | Enter **lb-vnet-bastion**. |
    | Azure Bastion public IP address | Select **Create new**.</br> Enter **lb-vnet-bastion-ip** in Name.</br> Select **OK**. |

1. Select the **Address space** tab, or **Next** at the bottom of the page.
1. On **Create virtual network**, enter or select the following information:

    | Setting | Value |
    | --- | --- |
    | IPv4 address space | Enter **10.0.0.0/16 (65,356 addresses)**. |
    | **Subnets** | Select the **default** subnet link to edit. |
    | **Edit subnet** |  |
    | Subnet purpose | Leave the default **Default**. |
    | Name | Enter **backend-subnet**. |
    | Starting address | Enter **10.0.0.0**. |
    | Subnet size | Enter **/24(256 addresses)**. |
    | **Security** |  |
    | NAT Gateway | Select **Create new**.</br> Enter **lb-nat-gateway** in name.</br> Select **Create a public IP address**. </br> Enter **nat-gw-public-ip**.</br> Enter **Ok** and **OK**. |

1. Select **Save**.
1. Select **Review + create** at the bottom of the screen, and when validation passes, select **Create**.



## Create NAT gateway

In this section, you'll create a NAT gateway for outbound internet access for resources in the virtual network.  For other options for outbound rules, check out [Network Address Translation (SNAT) for outbound connections](https://learn.microsoft.com/azure/load-balancer/load-balancer-outbound-connections)

1. Sign in to the [Azure portal](https://portal.azure.com).

1. In the search box at the top of the portal, enter **NAT gateway**. Select **NAT gateways** in the search results.

1. Select **+ Create**.

1. In the **Basics** tab of **Create network address translation (NAT) gateway** enter or select the following information:

    | Setting | Value |
    | --- | --- |
    | **Project details** |  |
    | Subscription | Select your subscription. |
    | Resource group | Select **Create new**. </br> Enter **load-balancer-rg** in Name. </br> Select **OK**. |
    | **Instance details** |  |
    | NAT gateway name | Enter **lb-nat-gateway**. |
    | Region | Select **East US**. |
    | Availability zone | Select **None**. |
    | Idle timeout (minutes) | Enter **15**. |

1. Select the **Outbound IP** tab or select the **Next: Outbound IP** button at the bottom of the page.

1. Select **Create a new public IP address** under **Public IP addresses**.

1. Enter **nat-gw-public-ip** in **Name** in **Add a public IP address**.

1. Select **OK**.

1. Select the **Subnet** tab or select the **Next: Subnet** button at the bottom of the page.

1. On the **Subnet** page, for **Virtual network**, select **lb-vnet** from the dropdown.

1. For **Subnet name**, select **backend-subnet**.

1. Select the blue **Review + create** button at the bottom of the page, or select the **Review + create** tab.

1. Select **Create**.

## Create load balancer

In this section, you create a load balancer for the virtual machines.

1. In the search box at the top of the portal, enter **Load balancer**. Select **Load balancers** in the search results.
1. In the **Load balancer** page, select **Create** or the **Create load balancer** button.
1. In the **Basics** tab of the **Create load balancer** page, enter, or select the following information: 

    | Setting | Value |
    | --- | --- |
    | **Project details** |  |
    | Subscription | Select your subscription. |
    | Resource group | Select **lb-resource-group**. |
    | **Instance details** |  |
    | Name | Enter **load-balancer** |
    | Region | Select **(US) East US**. |
    | SKU | Leave the default **Standard**. |
    | Type | Select **Public**. |
    | Tier | Leave the default **Regional**. |

1. Select the **Frontend IP configuration** tab, or select the **Next: Frontend IP configuration** button at the bottom of the page.
1. In **Frontend IP configuration**, select **+ Add a frontend IP configuration**.
1. Enter **lb-frontend-IP** in **Name**.
1. Select **IPv4** or **IPv6** for the **IP version**.

    > **Note:**
    > IPv6 isn't currently supported with Routing Preference or Cross-region load-balancing (Global Tier).

1. Select **IP address** for the **IP type**.

    > **Note:**
    > For more information on IP prefixes, see [Azure Public IP address prefix](../virtual-network/ip-services/public-ip-address-prefix.md).
    
1. Select **Create new** in **Public IP address**.
1. In **Add a public IP address**, enter **lb-public-IP** for **Name**.
1. Select **Zone-redundant** in **Availability zone**.

    > **Note:**
    > In regions with [Availability Zones](https://learn.microsoft.com/azure/reliability/availability-zones-overview?toc=%2Fazure%2Fvirtual-network%2Ftoc.json\&tabs=azure-cli#availability-zones), you have the option to select no zone (default option), a specific zone, or zone-redundant. The choice will depend on your specific domain failure requirements. In regions without Availability Zones, this field won't appear. </br> For more information on availability zones, see [Availability zones overview](https://learn.microsoft.com/azure/reliability/availability-zones-overview?tabs=azure-cli).

1. Select **OK**.
1. Select **Add**.
1. Select the **Next: Backend pools>** button at the bottom of the page.
1. In the **Backend pools** tab, select **+ Add a backend pool**.
1. Enter **lb-backend-pool** for **Name** in **Add backend pool**.
1. Select **lb-VNet** in **Virtual network**.
1. Select **IP Address** for **Backend Pool Configuration** and select **Save**.
1. Select the **Inbound rules** tab, or select the **Next: Inbound rules** button at the bottom of the page.
1. In **Load balancing rule** in the **Inbound rules** tab, select **+ Add a load balancing rule**.
1. In **Add load balancing rule**, enter or select the following information:

    | Setting | Value |
    | --- | --- |
    | Name | Enter **lb-HTTP-rule** |
    | IP Version | Select **IPv4** or **IPv6** depending on your requirements. |
    | Frontend IP address | Select **lb-frontend-IP**. |
    | Backend pool | Select **lb-backend-pool**. |
    | Protocol | Select **TCP**. |
    | Port | Enter **80**. |
    | Backend port | Enter **80**. |
    | Health probe | Select **Create new**. </br> In **Name**, enter **lb-health-probe**. </br> Select **HTTP** in **Protocol**. </br> Leave the rest of the defaults, and select **Save**. |
    | Session persistence | Select **None**. |
    | Idle timeout (minutes) | Enter **15**. |
    | Enable TCP reset | Select checkbox. |
    | Enable Floating IP | Select checkbox. |
    | Outbound source network address translation (SNAT) | Leave the default of **(Recommended) Use outbound rules to provide backend pool members access to the internet.** |

1. Select **Save**.
1. Select the blue **Review + create** button at the bottom of the page.
1. Select **Create**.

    > **Note:**
    > In this example we created a NAT gateway to provide outbound Internet access. The outbound rules tab in the configuration is bypassed as it's optional and isn't needed with the NAT gateway. For more information on Azure NAT gateway, see [What is Azure Virtual Network NAT?](https://learn.microsoft.com/azure/nat-gateway/nat-overview)
    > For more information about outbound connections in Azure, see [Source Network Address Translation (SNAT) for outbound connections](https://learn.microsoft.com/azure/load-balancer/load-balancer-outbound-connections).


## Create virtual machines

In this section, you create two VMs (**lb-vm1** and **lb-VM2**) in a single zone (**Zone 1**). 

These VMs are added to the backend pool of the load balancer that was created earlier.

1. In the search box at the top of the portal, enter **Virtual machine**. Select **Virtual machines** in the search results.

1. In **Virtual machines**, select **+ Create** > **Azure virtual machine**.
   
1. In **Create a virtual machine**, enter or select the following values in the **Basics** tab:

    | Setting | Value |
    | --- | --- |
    | **Project Details** |  |
    | Subscription | Select your Azure subscription |
    | Resource Group | Select **load-balancer-rg** |
    | **Instance details** |  |
    | Virtual machine name | Enter **lb-VM1** |
    | Region | Select **((US) East US)** |
    | Availability Options | Select **Availability zones** |
    | Availability zone | Select **Zone 1** |
    | Security type | Select **Standard**. |
    | Image | Select **Windows Server 2022 Datacenter: Azure Edition - Gen2** |
    | Azure Spot instance | Leave the default of unchecked. |
    | Size | Choose VM size or take default setting |
    | **Administrator account** |  |
    | Username | Enter a username |
    | Password | Enter a password |
    | Confirm password | Reenter password |
    | **Inbound port rules** |  |
    | Public inbound ports | Select **None** |

1. Select the **Networking** tab, or select **Next: Disks**, then **Next: Networking**.
  
1. In the Networking tab, select or enter the following information:

    | Setting | Value |
    | --- | --- |
    | **Network interface** |  |
    | Virtual network | Select **lb-vnet** |
    | Subnet | Select **backend-subnet** |
    | Public IP | Select **None**. |
    | NIC network security group | Select **Advanced** |
    | Configure network security group | Skip this setting until the rest of the settings are completed. Complete after **Select a backend pool**. |
    | Delete NIC when VM is deleted | Leave the default of **unselected**. |
    | Accelerated networking | Leave the default of **selected**. |
    | **Load balancing** |
    | **Load balancing options** |
    | Load-balancing options | Select **Azure load balancer** |
    | Select a load balancer | Select **load-balancer** |
    | Select a backend pool | Select **lb-backend-pool** |
    | Configure network security group | Select **Create new**. </br> In the **Create network security group**, enter **lb-NSG** in **Name**. </br> Under **Inbound rules**, select **+Add an inbound rule**. </br> In **Service**, select **HTTP**. </br> Under **Priority**, enter **100**. </br> In **Name**, enter **lb-NSG-Rule** </br> Select **Add** </br> Select **OK** |
   
1. Select **Review + create**. 
  
1. Review the settings, and then select **Create**.

1. Follow the steps 1 through 7 to create another VM with the following values and all the other settings the same as **lb-VM1**:

    | Setting | VM 2 |
    | --- | --- |
    | Name | **lb-VM2** |
    | Availability zone | **Zone 1** |
    | Network security group | Select the existing **lb-NSG** |

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ephemeral-ip-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/tutorial-load-balancer-standard-public-zonal-portal.md)


## Install IIS

1. Select **All services** in the left-hand menu, select **All resources**, and then from the resources list, select **lb-VM1** that is located in the **load-balancer-rg** resource group.

1. On the **Overview** page, select **Connect**, then **Bastion**.

1. Select **Use Bastion**.

1. Enter the username and password entered during VM creation.

1. Select **Connect**.

1. On the server desktop, navigate to **Windows Administrative Tools** > **Windows PowerShell**.

1. In the PowerShell Window, run the following commands to:

    * Install the IIS server
    * Remove the default iisstart.htm file
    * Add a new iisstart.htm file that displays the name of the VM:

   ```powershell
    # Install IIS server role
    Install-WindowsFeature -name Web-Server -IncludeManagementTools
    
    # Remove default htm file
    Remove-Item  C:\inetpub\wwwroot\iisstart.htm
    
    # Add a new htm file that displays server name
    Add-Content -Path "C:\inetpub\wwwroot\iisstart.htm" -Value $("Hello World from " + $env:computername)
   ```

1. Close the Bastion session with **lb-VM1**.

1. Repeat steps to install IIS and the updated iisstart.htm file on **lb-VM2**.

## Test the load balancer

1. In the search box at the top of the page, enter **Load balancer**. Select **Load balancers** in the search results.

1. Click the load balancer you created, **load-balancer**. On the **Frontend IP configuration** page for your load balancer, locate the public **IP address**.

1. Copy the public IP address, and then paste it into the address bar of your browser. The custom VM page of the IIS Web server is displayed in the browser.

    Screenshot of load balancer test.



## Clean up resources

When no longer needed, delete the resource group, load balancer, and all related resources. To do so, select the resource group **load-balancer-rg** that contains the resources and then select **Delete**.

## Next steps

Advance to the next article to learn how to load balance VMs across availability zones:
> 
> [Load balance VMs across availability zones](quickstart-load-balancer-standard-public-portal.md)
