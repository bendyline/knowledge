---
title: 'Tutorial: Create a load balancer with more than one availability set in the backend pool - Azure portal'
titleSuffix: Azure Load Balancer
description: Learn to deploy Azure Load Balancer with multiple availability sets and virtual machines in a backend pool using the Azure portal.
author: mbender-ms
ms.author: mbender
ms.service: azure-load-balancer
ms.topic: tutorial
ms.date: 10/24/2023
ms.custom:
  - template-tutorial
  - engagement-fy24
  - sfi-image-nochange
# Customer intent: "As a cloud architect, I want to deploy a load balancer with multiple availability sets in the backend pool, so that I can ensure high availability and efficient traffic distribution for my applications."
---

# Tutorial: Create a load balancer with more than one availability set in the backend pool using the Azure portal

As part of a high availability deployment, virtual machines are often grouped into multiple availability sets. 

Load Balancer supports more than one availability set with virtual machines in the backend pool.

In this tutorial, you learn how to:

> 
> * Create a NAT gateway for outbound connectivity
> * Create a virtual network and a network security group
> * Create a standard SKU Azure Load Balancer
> * Create four virtual machines and two availability sets
> * Add virtual machines in availability sets to backend pool of load balancer
> * Test the load balancer

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).


## Create NAT gateway

In this section, you create a NAT gateway. 

1. In the search box at the top of the portal, enter **NAT gateway**. Select **NAT gateways** in the search results.

1. Select **+ Create**.

1. In the **Basics** tab of **Create network address translation (NAT) gateway**, enter or select the following information:

    | Setting | Value |
    | --- | --- |
    | **Project details** |  |
    | Subscription | Select your subscription. |
    | Resource group | Select **Create a new resource group**.</br>Enter **load-balancer-rg** in Name.</br>Select **OK**. |
    | **Instance details** |  |
    | NAT gateway name | Enter **lb-nat-gateway**. |
    | Region | Select **East US**. |
    | SKU | Select **Standard V2 (Recommended)**. |
    | Enable NAT64 | Leave unselected. |
    | TCP idle timeout (minutes) | Enter **15**. |

1. Select the **Outbound IP** tab or select the **Next** button at the bottom of the page.
1. Select **Add public IP addresses or prefixes**.
1. On the **Manage public IP addresses and prefixes** page, select **Create a public IP address** and enter **nat-gw-public-ip** in **Name**.
1. Select **OK** and **Save**.
1. Select the blue **Review + create** button at the bottom of the page, or select the **Review + create** tab.
1. Select **Create**.


## Create a virtual network

The following procedure creates a virtual network with a resource subnet.

1. In the portal, search for and select **Virtual networks**.

1. On the **Virtual networks** page, select **+ Create**.

1. On the **Basics** tab of **Create virtual network**, enter or select the following information:

    | Setting | Value |
    | --- | --- |
    | **Project details** |  |
    | Subscription | Select your subscription. |
    | Resource group | Select **Create new**. </br> Enter **load-balancer-rg** in Name. </br> Select **OK**. |
    | **Instance details** |  |
    | Name | Enter **lb-vnet**. |
    | Region | Select **East US**. |

1. Select the **IP addresses** tab, or the **Next: Security** and **Next: IP Addresses** buttons at the bottom of the page.
  
1. In the address space box in **Subnets**, select the **default** subnet.

1. In **Edit subnet**, enter or select the following information:

    | Setting | Value |
    | --- | --- |
    | **Subnet details** |  |
    | Subnet template | Leave the default **Default**. |
    | Name | Enter **backend-subnet**. |
    | Starting address | Leave the default of **10.0.0.0**. |
    | Subnet size | Leave the default of **/24(256 addresses)**. |
    | **Security** |  |
    | NAT Gateway | Select **lb-nat-gateway**. |

1. Select **Save**.

1. Select **Review + create** at the bottom of the screen, and when validation passes, select **Create**.


## Create a network security group

In this section, you'll create a network security group (NSG) for the virtual machines in the backend pool of the load balancer. The NSG will allow inbound traffic on port 80.

1. In the search box at the top of the portal, enter **Network security group**.
1. Select **Network security groups** in the search results.
1. Select **+ Create** or **Create network security group** button.
1. On the **Basics** tab, enter or select this information:

    | Setting | Value |
    | --- | --- |
    | **Project details** |  |
    | Subscription | Select your subscription. |
    | Resource group | Select **lb-resource-group**. |
    | **Instance details** |  |
    | Name | Enter **lb-NSG**. |
    | Region | Select **(US) East US**. |

1. Select *Review + create* tab, or select the blue **Review + create** button at the bottom of the page.
1. Select **Create**.
1. When deployment is complete, select **Go to resource**.
1. In the **Settings** section of the **lb-NSG** page, select **Inbound security rules**.
1. Select **+ Add**.
1. In the **Add inbound security rule** window, enter or select the following information:

    | Setting | Value |
    | --- | --- |
    | Source | Select **Any**. |
    | Source port ranges | Enter **\***. |
    | Destination | Select **Any**. |
    | Service | Select **HTTP**. |
    | Action | Select **Allow**. |
    | Priority | Enter **100**. |
    | Name | Enter **lb-NSG-HTTP-rule**. |

1. Select **Add**.

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

In this section, you create two availability groups with two virtual machines per group. These machines are added to the backend pool of the load balancer during creation. 

### Create first set of VMs

1. Select **+ Create a resource** in the upper left-hand section of the portal.
1. In **New**, select **Compute** > **Virtual machine**.
1. In the **Basics** tab of **Create a virtual machine**, enter, or select the following information:

    | Setting | Value |
    | --- | --- |
    | **Project details** |  |
    | Subscription | Select your subscription |
    | Resource group | Select **lb-resource-group**. |
    | **Instance details** |  |
    | Virtual machine name | Enter **lb-VM1**. |
    | Region | Select **(US) East US**. |
    | Availability options | Select **Availability set**. |
    | Availability set | Select **Create new**. </br> Enter **lb-availability-set1** in **Name**. </br> Select **OK**. |
    | Security type | Select **Trusted launch virtual machines**. |
    | Image | Select **Windows Server 2022 Datacenter - x64 Gen2**. |
    | Azure Spot instance | Leave the default of unchecked. |
    | Size | Select a size for the virtual machine. |
    | **Administrator account** |  |
    | Username | Enter a username. |
    | Password | Enter a password. |

1. Select the **Networking** tab, or select the **Next: Disks**, then **Next: Networking** button at the bottom of the page.
1. In the **Networking** tab, enter or select the following information:

    | Setting | Value |
    | --- | --- |
    | **Network interface** |  |
    | Virtual network | Select **lb-VNet**. |
    | Subnet | Select **backend-subnet**. |
    | Public IP | Select **None**. |
    | NIC network security group | Select **Advanced**. |
    | Configure network security group | Skip this setting until the rest of the settings are completed. Complete after **Select a backend pool**. |
    | **Load balancing** |  |
    | Load-balancing options | Select **Azure load balancer**. |
    | Select a load balancer | Select **load-balancer**. |
    | Select a backend pool | Select **lb-backend-pool**. |
    | Configure network security group | Select **Create new**. </br> In the **Create network security group**, enter **lb-NSG** in **Name**. </br> Under **Inbound rules**, select **+Add an inbound rule**. </br> Under  **Service**, select **HTTP**. </br> Under **Priority**, enter **100**. </br> In **Name**, enter **lb-NSG-rule** </br> Select **Add** </br> Select **OK** |

1. Select the **Review + create** tab, or select the blue **Review + create** button at the bottom of the page.
1. Select **Create**.
1. Repeat steps 1 through 7 to create the second virtual machine of the set. Replace the settings for the VM with the following information:

    | Setting | Value |
    | --- | --- |
    | Name | Enter **lb-VM2**. |
    | Availability set | Select **lb-availability-set1**. |
    | Virtual Network | Select **lb-VNet**. |
    | Subnet | Select **backend-subnet**. |
    | Public IP | Select **None**. |
    | NIC network security group | Select **Advanced**. |
    | Configure network security group | Skip this setting until the rest of the settings are completed. Complete after **Select a backend pool**. |
    | Load-balancing options | Select **Azure load balancer**. |
    | Select a load balancer | Select **load-balancer**. |
    | Select a backend pool | Select **lb-backend-pool**. |
    | Configure network security group | Select **lb-NSG**. |

### Create second set of VMs

1. Select **+ Create a resource** in the upper left-hand section of the portal.
1. In **New**, select **Compute** > **Virtual machine**.
1. In the **Basics** tab of **Create a virtual machine**, enter, or select the following information:

    | Setting | Value |
    | --- | --- |
    | **Project details** |  |
    | Subscription | Select your subscription |
    | Resource group | Select **lb-resource-group**. |
    | **Instance details** |  |
    | Virtual machine name | Enter **lb-VM3**. |
    | Region | Select **(US) East US**. |
    | Availability options | Select **Availability set**. |
    | Availability set | Select **Create new**. </br> Enter **lb-availability-set2** in **Name**. </br> Select **OK**. |
    | Security type | Select **Trusted launch virtual machines**. |
    | Image | Select **Windows Server 2022 Datacenter - x64 Gen2**. |
    | Azure Spot instance | Leave the default of unchecked. |
    | Size | Select a size for the virtual machine. |
    | **Administrator account** |  |
    | Username | Enter a username. |
    | Password | Enter a password. |

1. Select the **Networking** tab, or select the **Next: Disks**, then **Next: Networking** button at the bottom of the page.
1. In the **Networking** tab, enter or select the following information:

    | Setting | Value |
    | --- | --- |
    | **Network interface** |  |
    | Virtual network | Select **lb-VNet**. |
    | Subnet | Select **backend-subnet**. |
    | Public IP | Select **None**. |
    | NIC network security group | Select **Advanced**. |
    | Configure network security group | Skip this setting until the rest of the settings are completed. Complete after **Select a backend pool**. |
    | **Load balancing** |  |
    | Load-balancing options | Select **Azure load balancer**. |
    | Select a load balancer | Select **load-balancer**. |
    | Select a backend pool | Select **lb-backend-pool**. |
    | Configure network security group | Select **lb-NSG**. |

6. Select the **Review + create** tab, or select the blue **Review + create** button at the bottom of the page.

7. Select **Create**.

8. Repeat steps 1 through 7 to create the second virtual machine of the set. Replace the settings for the VM with the following information:

    | Setting | Value |
    | --- | --- |
    | Name | Enter **lb-VM4**. |
    | Availability set | Select **lb-availability-set2**. |
    | Virtual Network | Select **lb-VM3**. |
    | NIC network security group | Select **Advanced**. |
    | Configure network security group | Skip this setting until the rest of the settings are completed. Complete after **Select a backend pool**. |
    | Load-balancing options | Select **Azure load balancer**. |
    | Select a load balancer | Select **load-balancer**. |
    | Select a backend pool | Select **lb-backend-pool**. |
    | Configure network security group | Select **lb-NSG**. |

## Install IIS

In this section, you use the Azure Bastion host you created previously to connect to the virtual machines and install IIS.

1. In the search box at the top of the portal, enter **Virtual machine**.
1. Select **Virtual machines** in the search results.
1. Select **lb-VM1**.
1. Under **Payload** in the left-side menu, select **Run command > RunPowerShellScript**.
1. In the PowerShell Script window, add the following commands to:

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
1. Select **Run** and wait for the command to complete.

    Screenshot of Run Command Script window with PowerShell code and output.

1. Repeat steps 1 through 8 for **lb-VM2**, **lb-VM3**, and **lb-VM4**.

## Test the load balancer

In this section, you discover the public IP address of the load balancer. You use the IP address to test the operation of the load balancer.

1. In the search box at the top of the portal, enter **Public IP**.
1. Select **Public IP addresses** in the search results.
1. Select **lb-Public-IP**.
1. Note the public IP address listed in **IP address** in the **Overview** page of **lb-Public-IP**:

    Find the public IP address of the load balancer.

1. Open a web browser and enter the public IP address in the address bar:

    Test load balancer with web browser.

1. Select refresh in the browser to see the traffic balanced to the other virtual machines in the backend pool.

## Clean up resources

If you're not going to continue to use this application, delete
the load balancer and the supporting resources with the following steps:

1. In the search box at the top of the portal, enter **Resource group**.
1. Select **Resource groups** in the search results.
1. Select **lb-resource-group**.
1. In the overview page of **lb-resource-group**, select **Delete resource group**.
1. Select **Apply force delete for selected Virtual Machines and Virtual machine scale sets**.
1. Enter **lb-resource-group** in **Enter resource group name to confirm deletion**.
1. Select **Delete**.

## Next steps

In this tutorial, you:

* Created a virtual network and a network security group.
* Created an Azure Standard Load Balancer.
* Created two availability sets with two virtual machines per set.
* Installed IIS and tested the load balancer.

Advance to the next article to learn how to create a cross-region Azure Load Balancer:
> 
> [Create a cross-region load balancer](tutorial-cross-region-portal.md)
