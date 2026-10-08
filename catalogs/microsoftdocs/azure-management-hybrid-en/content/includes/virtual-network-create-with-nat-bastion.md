---
 title: include file
 description: include file
 services: virtual-network
 author: asudbring
 ms.service: azure-virtual-network
 ms.topic: include
 ms.date: 07/29/2024
 ms.author: allensu
 ms.custom:
   - include file
   - sfi-image-nochange
---

## Create a NAT gateway

Before you deploy the NAT gateway resource and the other resources, a resource group is required to contain the resources deployed. In the following steps, you create a resource group, NAT gateway resource, and a public IP address. You can use one or more public IP address resources, public IP prefixes, or both. 

For information about public IP prefixes and a NAT gateway, see [Manage NAT gateway](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/nat-gateway/manage-nat-gateway.md?tabs=manage-nat-portal#add-or-remove-a-public-ip-prefix).

1. In the search box at the top of the portal, enter **NAT gateway**. Select **NAT gateways** in the search results.

1. Select **+ Create**. 

1. In **Create network address translation (NAT) gateway**, enter or select this information in the **Basics** tab:

    | **Setting** | **Value** |
    | --- | --- |
    | **Project Details** |  |
    | Subscription | Select your Azure subscription. |
    | Resource Group | Select **Create new**. </br> Enter **test-rg**. </br> Select **OK**. |
    | **Instance details** |  |
    | NAT gateway name | Enter **nat-gateway** |
    | Region | Select **East US 2** |
    | Availability Zone | Select **No Zone**. |
    | TCP idle timeout (minutes) | Leave the default of **4**. |

    For information about availability zones and NAT gateway, see [Reliability in Azure NAT Gateway](https://learn.microsoft.com/azure/reliability/reliability-nat-gateway).

1. Select the **Outbound IP** tab, or select the **Next: Outbound IP** button at the bottom of the page.

1. In the **Outbound IP** tab, enter or select the following information:

    | **Setting** | **Value** |
    | --- | --- |
    | Public IP addresses | Select **Create a new public IP address**. </br> In **Name**, enter **public-ip-nat**. </br> Select **OK**. |

1. Select the **Review + create** tab, or select the blue **Review + create** button at the bottom of the page.

1. Select **Create**.

## Create a virtual network and bastion host

The following procedure creates a virtual network with a resource subnet, an Azure Bastion subnet, and an Azure Bastion host.

1. In the portal, search for and select **Virtual networks**.

1. On the **Virtual networks** page, select **+ Create**.

1. On the **Basics** tab of **Create virtual network**, enter or select the following information:

    | Setting | Value |
    | --- | --- |
    | **Project details** |  |
    | Subscription | Select your subscription. |
    | Resource group | Select **test-rg**. |
    | **Instance details** |  |
    | Name | Enter **vnet-1**. |
    | Region | Select **(US) East US 2**. |

    Screenshot of Basics tab of Create virtual network in the Azure portal.

1. Select **Next** to proceed to the **Security** tab.

1. Select **Enable Azure Bastion** in the **Azure Bastion** section of the **Security** tab.

    Azure Bastion uses your browser to connect to VMs in your virtual network over secure shell (SSH) or remote desktop protocol (RDP) by using their private IP addresses. The VMs don't need public IP addresses, client software, or special configuration. For more information about Azure Bastion, see [Azure Bastion](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/bastion-overview.md)

    >**Note:**
    >[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/bastion-pricing.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/virtual-network-create-with-nat-bastion.md)

1. Enter or select the following information in **Azure Bastion**:

    | Setting | Value |
    | --- | --- |
    | Azure Bastion host name | Enter **bastion**. |
    | Azure Bastion public IP address | Select **Create a public IP address**. </br> Enter **public-ip-bastion** in Name. </br> Select **OK**. |

    Screenshot of enable bastion host in Create virtual network in the Azure portal.

1. Select **Next** to proceed to the **IP Addresses** tab.
    
1. In the address space box in **Subnets**, select the **default** subnet.

1. In **Edit subnet**, enter or select the following information:

    | Setting | Value |
    | --- | --- |
    | Subnet purpose | Leave the default **Default**. |
    | Name | Enter **subnet-1**. |
    | **IPv4** |  |
    | IPv4 address range | Leave the default of **10.0.0.0/16**. |
    | Starting address | Leave the default of **10.0.0.0**. |
    | Size | Leave the default of **/24(256 addresses)**. |
    | **Security** |  |
    | NAT gateway | Select **nat-gateway**. |

    Screenshot of default subnet rename and configuration.

1. Select **Save**.

1. Select **Review + create** at the bottom of the screen, and when validation passes, select **Create**.
