---
title: "Quickstart: Create an internal load balancer - Azure portal"
titleSuffix: Azure Load Balancer
description: Learn to create an internal Azure Load Balancer and test it with two virtual machines. Learn how to configure traffic rules and health probes to distribute traffic across multiple VMs.
services: load-balancer
author: mbender-ms
ms.service: azure-load-balancer
ms.topic: quickstart
ms.date: 07/17/2026
ms.author: mbender
ms.custom:
  - mvc
  - mode-ui
  - template-quickstart
  - engagement-fy24
  - sfi-image-nochange
#Customer intent: I want to create a internal load balancer so that I can load balance internal traffic to VMs.
# Customer intent: "As a cloud engineer, I want to create an internal load balancer with traffic rules and health probes for my VMs, so that I can efficiently distribute internal traffic and ensure high availability of my applications."
---

# Quickstart: Create an internal load balancer to load balance VMs using the Azure portal

Get started with Azure Load Balancer by using the Azure portal to create an internal load balancer for a backend pool with two virtual machines. Other resources include Azure Bastion, NAT Gateway, a virtual network, and the required subnets.

Use this quickstart for private traffic within a virtual network. For internet-facing traffic, see [Create a public load balancer](quickstart-load-balancer-standard-public-portal.md).

After you create the resources and install IIS on the backend virtual machines, [test the load balancer](#test-the-load-balancer) from the test virtual machine.

Diagram of resources deployed for internal load balancer.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

## Sign in to Azure

Sign in to the [Azure portal](https://portal.azure.com).


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

> **Note:**
> In this example, you create a NAT gateway to provide outbound internet access. The outbound rules tab is bypassed and isn't needed with the NAT gateway. For more information, see [What is Azure Virtual Network NAT?](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/nat-gateway/nat-overview.md) and [Source Network Address Translation (SNAT) for outbound connections](load-balancer-outbound-connections.md).


## Create a virtual network and bastion host

In this section, you create a virtual network with a resource subnet, an Azure Bastion subnet, an Azure Bastion host, and a NAT gateway for outbound internet access for resources in the virtual network. For other options for outbound rules, see [Network Address Translation (SNAT) for outbound connections](https://learn.microsoft.com/azure/load-balancer/load-balancer-outbound-connections).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/bastion-pricing.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/quickstart-load-balancer-standard-internal-portal.md)

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


## Create load balancer

In this section, you create a load balancer that load balances virtual machines.

During the creation of the load balancer, you configure:

- Frontend IP address
- Backend pool
- Inbound load-balancing rules

1. In the search box at the top of the portal, enter **Load balancer**. Select **Load balancers** in the search results.
1. In the **Load balancer** page, select **Create**.
1. In the **Basics** tab of the **Create load balancer** page, enter, or select the following information: 

    | Setting | Value |
    | --- | --- |
    | **Project details** |  |
    | Subscription | Select your subscription. |
    | Resource group | Select **load-balancer-rg**. |
    | **Instance details** |  |
    | Name | Enter **load-balancer**. |
    | Region | Select **East US**. |
    | SKU | Leave the default **Standard**. |
    | Type | Select **Internal**. |
    | Tier | Leave the default of **Regional**. |
    
    Screenshot of create standard load balancer basics tab.

1. Select **Next: Frontend IP configuration** at the bottom of the page.
1. In **Frontend IP configuration**, select **+ Add a frontend IP configuration**, then enter or select the following information:

    | Setting | Value |
    | --- | --- |
    | Name | Enter **lb-frontend**. |
    | Private IP address version | Select **IPv4** or **IPv6** depending on your requirements. |
    | Virtual network | Select **lb-vnet**. |
    | Subnet | Select **backend-subnet**. |
    | Assignment | Select **Dynamic**. |
    | Availability zone | Select **Zone-redundant**. |

1. Select **Save**.
1. Select **Next: Backend pools** at the bottom of the page.
1. In the **Backend pools** tab, select **+ Add a backend pool**.
1. Enter **lb-backend-pool** for **Name** in **Add backend pool**.
1. Select **IP Address** for **Backend Pool Configuration**.
1. Select **Save**.
1. Select the **Next: Inbound rules** button at the bottom of the page.
1. In **Load balancing rule** in the **Inbound rules** tab, select **+ Add a load balancing rule**.
1. In **Add load balancing rule**, enter or select the following information:

    | **Setting** | **Value** |
    | --- | --- |
    | Name | Enter **lb-HTTP-rule**. |
    | IP Version | Select **IPv4** or **IPv6** depending on your requirements. |
    | Frontend IP address | Select **lb-frontend(Dynamic)**. |
    | Backend pool | Select **lb-backend-pool**. |
    | Protocol | Select **TCP**. |
    | Port | Enter **80**. |
    | Backend port | Enter **80**. |
    | Health probe | Select **Create new**.</br> In **Name**, enter **lb-health-probe**.</br> Select **TCP** in **Protocol**.</br> Leave the rest of the defaults, and select **Save**. |
    | Session persistence | Select **None**. |
    | Idle timeout (minutes) | Enter or select **15**. |
    | Enable TCP reset | Select **checkbox**. |
    | Enable Floating IP | Leave the default of unselected. |

1. Select **Save**.
1. Select the blue **Review + create** button at the bottom of the page.
1. Select **Create**.


## Create virtual machines

In this section, you create two VMs (**lb-vm1** and **lb-VM2**) in two different zones (**Zone 1** and **Zone 2**). 

Add these VMs to the backend pool of the load balancer that you created earlier.

1. In the search box at the top of the portal, enter **Virtual machine**. Select **Virtual machines** in the search results.

1. In **Compute infrastructure | Virtual machines**, select **+ Create** > **Virtual machine**.
   
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
    | Zone options | Leave default of **Self-selected zone** |
    | Availability zone | Select **Zone 1** |
    | Security type | Select **Standard**. |
    | Image | Select **Windows Server 2025 Datacenter: Azure Edition - x64 Gen2** |
    | Azure Spot instance | Leave the default of unchecked. |
    | Size | Choose VM size or take default setting |
    | **Administrator account** |  |
    | Username | Enter a username |
    | Password | Enter a password |
    | Confirm password | Reenter password |
    | **Inbound port rules** |  |
    | Public inbound ports | Select **None** |

1. Select the **Networking** tab, or select **Next: Disks**, and then **Next: Networking**.
  
1. In the Networking tab, select or enter the following information:

    | Setting | Value |
    | --- | --- |
    | **Network interface** |  |
    | Virtual network | Select **lb-vnet** |
    | Subnet | Select **backend-subnet** |
    | Public IP | Select **None**. |
    | NIC network security group | Select **Advanced** |
    | Configure network security group | Skip this setting until the rest of the settings are completed as you add the ports for the load balancer after selecting the load balancer and backend pool. Complete after **Select a backend pool**. |
    | Delete NIC when VM is deleted | Leave the default of **unselected**. |
    | Accelerated networking | Leave the default of **selected**. |
    | **Load balancing** |
    | **Load balancing options** |
    | Load-balancing options | Select **Azure load balancer** |
    | Select a load balancer | Select **load-balancer** |
    | Select a backend pool | Select **lb-backend-pool** |
    | Configure network security group | Select **Create new**. </br> In the **Create network security group**, enter **lb-nsg** in **Name**. </br> Under **Inbound rules**, select **+Add an inbound rule**. </br> In **Service**, select **HTTP**. </br> Under **Priority**, enter **100**. </br> In **Name**, enter **lb-nsg-rule** </br> Select **Add** </br> Select **OK**. |
   
1. Select **Review + create**. 
  
1. Review the settings, and then select **Create**.

1. Follow steps 1 through 7 to create another VM with the following values and all the other settings the same as **lb-VM1**:

    | Setting | VM 2 |
    | --- | --- |
    | Name | **lb-VM2** |
    | Availability zone | **Zone 2** |
    | Network security group | Select the existing **lb-NSG** |

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ephemeral-ip-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/quickstart-load-balancer-standard-internal-portal.md)

## Create test virtual machine

In this section, you create a VM named **lb-TestVM**. This VM is used to test the load balancer configuration.

1. In the search box at the top of the portal, enter **Virtual machine**. Select **Virtual machines** in the search results.
1. In **Virtual machines**, select **+ Create** > **Azure virtual machine**. 
1. In **Create a virtual machine**, enter or select the values in the **Basics** tab:

    | Setting | Value |
    | --- | --- |
    | **Project Details** |  |
    | Subscription | Select your Azure subscription. |
    | Resource Group | Select **load-balancer-rg**. |
    | **Instance details** |  |
    | Virtual machine name | Enter **lb-TestVM**. |
    | Region | Select **(US) East US**. |
    | Availability Options | Select **No infrastructure redundancy required**. |
    | Security type | Select **Standard**. |
    | Image | Select **Windows Server 2022 Datacenter - x64 Gen2**. |
    | Azure Spot instance | Leave the default of unselected. |
    | Size | Choose VM size or take default setting. |
    | **Administrator account** |  |
    | Username | Enter a username. |
    | Password | Enter a password. |
    | Confirm password | Reenter password. |
    | **Inbound port rules** |  |
    | Public inbound ports | Select **None**. |

1. Select the **Networking** tab, or select **Next: Disks**, then **Next: Networking**.
1. In the **Networking** tab, select or enter:

    | Setting | Value |
    | --- | --- |
    | **Network interface** |  |
    | Virtual network | **lb-vnet**. |
    | Subnet | **backend-subnet**. |
    | Public IP | Select **None**. |
    | NIC network security group | Select **Advanced**. |
    | Configure network security group | Select **lb-NSG** created in the previous step. |
       
1. Select **Review + create**. 
1. Review the settings, and then select **Create**.

## Install IIS

1. In the search box at the top of the portal, enter **Virtual machine**. Select **Virtual machines** in the search results.
1. Select **lb-vm1**.
1. In the **Overview** page, select **Connect**, then **Bastion**.
1. Enter the username and password entered during VM creation.
1. Select **Connect**.
1. On the server desktop, navigate to **Windows Administrative Tools** > **Windows PowerShell** > **Windows PowerShell**.
1. In the PowerShell Window, execute the following commands to:
    1. Install the IIS server.
    1. Remove the default iisstart.htm file.
    1. Add a new iisstart.htm file that displays the name of the VM.

    ```powershell
    # Install IIS server role
    Install-WindowsFeature -name Web-Server -IncludeManagementTools

    # Remove default htm file
    Remove-Item  C:\inetpub\wwwroot\iisstart.htm

    # Add a new htm file that displays server name
    Add-Content -Path "C:\inetpub\wwwroot\iisstart.htm" -Value $("Hello World from " + $env:computername)
    ```

1. Close the Bastion session with **lb-vm1**.
1. Repeat steps 1 through 8 to install IIS and the updated iisstart.htm file on **lb-VM2**.

## Test the load balancer

In this section, you test the load balancer by connecting to the **lb-TestVM** and verifying the webpage.

1. In the search box at the top of the portal, enter **Load balancer**. Select **Load balancers** in the search results.
1. Select **load-balancer**.
1. Make note or copy the address next to **Private IP address** in the **Overview** of **load-balancer**. If you can't see the **Private IP address** field, select **See more** in the information window.
1. In the search box at the top of the portal, enter **Virtual machine**. Select **Virtual machines** in the search results.
1. Select **lb-TestVM**.
1. In the **Overview** page, select **Connect**, then **Bastion**.
1. Enter the username and password entered during VM creation.
1. Open **Microsoft Edge** on **lb-TestVM**.
1. Enter the IP address from the previous step into the address bar of the browser. The custom page displaying one of the backend server names is displayed on the browser. In this example, it's **10.1.0.4**.

    Screenshot shows a browser window displaying the customized page, as expected.
   
1. To see the load balancer distribute traffic across both VMs, navigate to the VM shown in the browser message, and stop the VM.
1. Refresh the browser window. The page should still display the customized page. The load balancer is now only sending traffic to the remaining VM.

## Clean up resources

When no longer needed, delete the resource group, load balancer, and all related resources. To do so, select the resource group **load-balancer-rg** that contains the resources and then select **Delete**.

## Next steps

In this quickstart, you:

- Created an internal Azure Load Balancer

- Attached two VMs to the load balancer

- Configured the load balancer traffic rule, health probe, and then tested the load balancer

To learn more about Azure Load Balancer, continue to:
> 
> [What is Azure Load Balancer?](load-balancer-overview.md)
