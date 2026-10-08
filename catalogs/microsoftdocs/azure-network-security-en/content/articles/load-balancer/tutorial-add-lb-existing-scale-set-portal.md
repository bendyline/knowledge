---
title: 'Tutorial: Add Azure Load Balancer to an existing Virtual Machine Scale Set - Azure portal'
description: In this tutorial, learn how to add a load balancer to existing Virtual Machine Scale Set using the Azure portal. 
author: mbender-ms
ms.author: mbender
ms.service: azure-load-balancer
ms.topic: tutorial
ms.date: 01/23/2024
ms.custom: template-tutorial, engagement-fy23
# Customer intent: As a cloud administrator, I want to add an Azure Load Balancer to an existing Virtual Machine Scale Set, so that I can enhance the scalability and availability of my application infrastructure.
---

# Tutorial: Add Azure Load Balancer to an existing Virtual Machine Scale Set using the Azure portal

In many organizations, the need can arise where an Azure Load Balancer isn't associated with a Virtual Machine Scale Set, but needs to be added. Or an existing Virtual Machine Scale Set is deployed with an Azure Load Balancer that requires updating. The Azure portal can be used to add or update an Azure Load Balancer associated with a Virtual Machine Scale Set.  

In this tutorial, you learn how to:

> 
> * Create a virtual network
> * Create a NAT gateway for outbound connectivity
> * Create a standard SKU Azure Load Balancer
> * Create a virtual machine scale set without a load balancer
> * Add a Azure Load Balancer to virtual machine scale set

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)



## Create a virtual network and bastion host

In this section, you create a virtual network with a resource subnet, an Azure Bastion subnet, an Azure Bastion host, and a NAT gateway for outbound internet access for resources in the virtual network. For other options for outbound rules, see [Network Address Translation (SNAT) for outbound connections](https://learn.microsoft.com/azure/load-balancer/load-balancer-outbound-connections).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/bastion-pricing.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/tutorial-add-lb-existing-scale-set-portal.md)

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



## Create Virtual Machine Scale Set

In this section, you create a Virtual Machine Scale Set that is attached to a load balancer created later.

1. In the search box at the top of the portal, enter **Virtual machine scale**, and select **Virtual machine scale sets** from the search results.
1. Select **Create**.

1. In the **Basics** tab of **Create a virtual machine scale set**, enter, or select the following information:

    | Setting | Value |
    | --- | --- |
    | **Project details** |  |
    | Subscription | Select your subscription. |
    | Resource group | Select **load-balancer-rg**. |
    | **Scale set details** |  |
    | Virtual machine scale set name | Enter **lb-vmss**. |
    | Region | Select **(US) East US**. |
    | Availability zone | Leave the default of **None**. |
    | **Orchestration** |  |
    | Orchestration mode | Leave the default of **Uniform: optimized for large-scale stateless workloads with identical instances**. |
    | Security type | Leave the default of **Standard** |
    | **Instance details** |  |
    | Image | Select **Windows Server 2022 Datacenter: Azure Edition - x64 Gen2**. |
    | Azure Spot Instance | Leave the default of the box unchecked. |
    | Size | Select a size. |
    | **Administrator account** |
    | Username | Enter a username. |
    | Password | Enter a password. |
    | Confirm password | Confirm password. |

1. Select the **Networking** tab.

1. Enter or select the following information in the **Networking** tab:

    | Setting | Value |
    | --- | --- |
    | **Virtual network configuration** |  |
    | Virtual network | Select **lb-vnet**. |

1. Select the **Review + create** tab, or select the blue **Review + create** button at the bottom of the page.

1. Select **Create**.


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

## Create load balancer

In this section, you create a load balancer in this section. The frontend IP and backend pool are configured as part of the creation.

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
1. Select the blue **Review + create** button at the bottom of the page.
1. Select **Create**.

    > **Note:**
    > In this example we created a NAT gateway to provide outbound Internet access. The outbound rules tab in the configuration is bypassed as it's optional and isn't needed with the NAT gateway. For more information on Azure NAT gateway, see [What is Azure Virtual Network NAT?](https://learn.microsoft.com/azure/nat-gateway/nat-overview)
    > For more information about outbound connections in Azure, see [Source Network Address Translation (SNAT) for outbound connections](https://learn.microsoft.com/azure/load-balancer/load-balancer-outbound-connections).

### Configure load balancer settings

In this section, you create a backend pool for load-balancer. You create a health probe to monitor HTTP and Port 80 to ensure the health of the virtual machines in the backend pool. Additionally, you create a load-balancing rule for Port 80 with outbound SNAT disabled. The outbound connectivity of the virtual machines is handled by the NAT gateway created earlier.

1. In the search box at the top of the portal, enter **Load balancer**.

1. Select **Load balancers** in the search results.

1. Select **load-balancer**.

1. In **load-balancer**, select **Backend pools** in **Settings**.

1. Select **+ Add** in **Backend pools**.

1. In **Add backend pool**, enter or select the following information:

    | Setting | Value |
    | --- | --- |
    | Name | Enter **lb-backend-pool**. |
    | Virtual network | Select **lb-vnet**. |
    | Backend Pool Configuration | Leave the default of **NIC**. |

1. Select **Save**.

1. Select **Next: Inbound rules**

1. In **Create load balancer** page, select **+ Add a load balancing rule**.

1. Enter or select the following information in **Add load-balancing rule**:

    | Setting | Value |
    | --- | --- |
    | Name | Enter **lb-HTTP-rule**. |
    | IP Version | Leave the default of **IPv4**. |
    | Frontend IP address | Select **lb-Frontend-IP**. |
    | Backend pool | Select **lb-backend-pool**. |
    | Protocol | Select the default of **TCP**. |
    | Port | Enter **80**. |
    | Backend port | Enter **80**. |
    | Health probe | Select **Create new**.<br/> Enter **lb-HTTP-probe** for **Name**.</br><br/>Select **HTTP** for **Protocol**.</br><br/> Select **Ok**.</br> |
    | Session persistence | Leave the default of **None**. |
    | Idle timeout (minutes) | Change the slider to **15**. |
    | TCP reset | Select **Enabled**. |
    | Floating IP | Leave the default of **Disabled**. |
    | Outbound source network address translation (SNAT) | Leave the default of **(Recommended) Use outbound rules to provide backend pool members access to the internet.** |

1. Select **Add**.
1. Select **Review + Create** and **Create**.

## Add load balancer to scale set

In this section, you add a load balancer to the scale set in the Azure portal.

1. In the search box at the top of the portal, enter **Virtual machine scale**.

1. In the search results, select **Virtual machine scale sets**.

1. Select **lb-vmss**.

1. In the **Settings** section of **lb-vmss**, select **Networking**.

1. Select the **Load balancing** tab in the **Overview** page of the **Networking** settings of **lb-vmss**.

    Select the load balancing tab in networking.

1. Select the blue **Add load balancing** button.

1. In **Add load balancing**, enter or select the following information:

    | Setting | Value |
    | --- | --- |
    | Load balancing options | Select **Azure load balancer**. |
    | Select a load balancer | Select **load-balancer**. |
    | Backend pool | Select **Use existing**. |
    | Select a backend pool | Select **lb-backend-pool**. |

1. Select **Save**.

## Clean up resources

If you're not going to continue to use this application, delete
the load balancer and the supporting resources with the following steps:

1. In the search box at the top of the portal, enter **Resource group**.
1. Select **Resource groups** in the search results.
1. Select **load-balancer-rg**.
1. In the overview page of **load-balancer-rg**, select **Delete resource group**.
1. Enter **load-balancer-rg** in **TYPE THE RESOURCE GROUP NAME**.
1. Select **Delete**.

## Next steps

In this tutorial, you:

* Created a virtual network and Azure Bastion host.
* Created an Azure Standard Load Balancer.
* Created a virtual machine scale set.
* Added load balancer to Virtual Machine Scale Set.

Advance to the next article to learn how to create a cross-region Azure Load Balancer:
> 
> [Create a cross-region load balancer](tutorial-cross-region-portal.md)
