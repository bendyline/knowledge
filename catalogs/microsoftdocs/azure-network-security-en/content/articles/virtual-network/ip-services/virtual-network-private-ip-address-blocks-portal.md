---
title: Assign private IP address prefixes to VMs - Azure portal
description: Learn how to assign private IP address prefixes to a virtual machine using the Azure portal.
services: virtual-network
ms.date: 11/07/2024
ms.author: mbender
author: ramandhillon84
ms.service: azure-virtual-network
ms.subservice: ip-services
ms.topic: how-to
ms.custom: sfi-image-nochange

# Customer intent: As a cloud administrator, I want to assign private IP address prefixes to virtual machines, so that I can efficiently manage network configurations for varying workloads in my environment.
---
# Assign private IP address prefixes to virtual machines using the Azure portal - Preview

This article helps you add secondary IP configurations on a virtual machine NIC with a CIDR block of private IP addresses using the Azure portal. An Azure Virtual Machine (VM) has one or more network interfaces (NIC) attached to it. All the NICs have one primary IP configuration and zero or more secondary IP configurations assigned to them. The primary IP configuration has a single private IP Address assigned to it and can optionally have a public IP address assignment as well. Each secondary IP configuration can have the following items:

* A private IP address assignment and (optionally) a public IP address assignment, OR
* A CIDR block of private IP addresses (IP address prefix).

All the IP addresses can be statically or dynamically assigned from the available IP address ranges. For more information, see [IP addresses in Azure](public-ip-addresses.md). All IP configurations on a single NIC must be associated to the same subnet. If multiple IPs on different subnets are desired, multiple NICs on a VM can be used. For more information, see [Create VM with Multiple NICs](https://learn.microsoft.com/azure/virtual-machines/windows/multiple-nics).

There's a limit to how many IP configurations can be assigned to a NIC. For more information, see the [Azure limits](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/azure-subscription-service-limits.md?toc=%2fazure%2fvirtual-network%2ftoc.json#azure-resource-manager-virtual-networking-limits) article.

> **Important:**
> The capability to add private IP address prefixes to NIC is currently in PREVIEW.
> See the [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/) for legal terms that apply to Azure features that are in beta, preview, or otherwise not yet released into general availability.

Diagram of network configuration resources created in article.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- An existing Azure virtual machine. For more information about creating a virtual machine, see [Create a Windows VM](https://learn.microsoft.com/azure/virtual-machines/windows/quick-create-portal) or [Create a Linux VM](https://learn.microsoft.com/azure/virtual-machines/linux/quick-create-portal).

  - The example used in this article is named **myVM**. Replace this value with your virtual machine name.

- To use this feature during Preview, you must first register. To register, complete the [Onboarding Form](https://forms.office.com/r/v1ys2F1xjT).

> **Important:**
> Before proceeding, register for this Preview by completing the [Onboarding Form](https://forms.office.com/r/v1ys2F1xjT).

## Add a dynamic private IP address prefix to a VM

You can add a dynamic private IP address prefix to an Azure network interface by completing the following steps.

1. Sign in to the [Azure portal](https://portal.azure.com).

2. In the search box at the top of the portal, enter **Virtual machine**. Select **Virtual machines** in the search results.

3. In **Virtual machines**, select **myVM** or the name of your virtual machine.

4. Select **Networking** in **Settings**.

5. Select the name of the network interface of the virtual machine.

6. In the network interface, select **IP configurations** in **Settings**.

7. The existing IP configuration is displayed. This configuration is created when the virtual machine is created. To add a private and public IP address to the virtual machine, select **+ Add**.

8. In **Add IP configuration**, enter or select the following information.

   | Setting | Value |
   | --- | --- |
   | Name | Enter **ipconfig2**. |
   | **Private IP address settings** |  |
   | Private IP Address Type | IP address prefix |
   | Allocation | Select **Dynamic** |

9. Select **OK**.

   > **Note:**
   > Public IP address association is not available for configuration when IP address prefix option is selected.

10. After you change the IP address configuration, you must restart the VM for the changes to take effect in the VM.

## Add a static private IP address prefix to a VM

You can add a static private IP address prefix to a virtual machine by completing the following steps.

1. Sign in to the [Azure portal](https://portal.azure.com).

2. In the search box at the top of the portal, enter **Virtual machine**. Select **Virtual machines** in the search results.

3. In **Virtual machines**, select **myVM** or the name of your virtual machine.

4. Select **Networking** in **Settings**.

5. Select the name of the network interface of the virtual machine.

6. In the network interface, select **IP configurations** in **Settings**.

7. The existing IP configuration is displayed. This configuration is created when the virtual machine is created. To add a private and public IP address to the virtual machine, select **+ Add**.

8. In **Add IP configuration**, enter or select the following information.

   | Setting | Value |
   | --- | --- |
   | Name | Enter **ipconfig2**. |
   | **Private IP address settings** |  |
   | Private IP Address Type | IP address prefix |
   | Allocation | Select **Static**. |
   | IP address | Enter an unused CIDR of size /28 from the subnet for your virtual machine.</br> For the 10.0.0.0/14 subnet in the example, an IP would be **10.0.0.0/28**. |

9. Select **OK**.

   > **Note:**
   > When adding a static IP address, you must specify an unused, valid private IP address CIDR from the subnet the NIC is connected to.
10. After you change the IP address configuration, you must restart the VM for the changes to take effect in the VM.


## <a name="os-config"></a>Add IP addresses to a VM operating system

Connect and sign in to a VM you created with multiple private IP addresses. You must manually add all the private IP addresses, including the primary, that you added to the VM. Complete the following steps for your VM operating system.

### Windows Server

<details>
  <summary>Expand</summary>

1. Open a command prompt or PowerShell.

2. Enter **`ipconfig /all`** at the command line. You see the **Primary** private IP address that was assigned through DHCP.

3. Enter **`ncpa.cpl`** at the command line to open the **Network Connections** configuration.

4. Open the **Properties** for the network adapter assigned the new IP addresses.

5. Double-click **Internet Protocol Version 4 (TCP/IPv4)**.

6. Select **Use the following IP address:**. Enter the following values.

    | Setting | Value |
    | --- | --- |
    | **IP address:** | Enter the **Primary** private IP address. |
    | **Subnet mask:** | Enter a subnet mask based on your IP address. </br> For example, if the subnet is a **/24** subnet then the subnet mask is **255.255.255.0**. |
    | **Default gateway:** | The first IP address in the subnet. </br> If your subnet is **10.0.0.0/24**, then the gateway IP address is **10.0.0.1**. |

7. Select **Use the following DNS server addresses:**. Enter the following values.

    | Setting | Value |
    | --- | --- |
    | **Preferred DNS server:** | Enter your primary DNS server. </br> Enter the IP address of **168.63.129.16** to use the default Azure provided DNS. |

8. Select the **Advanced** button.

9. Select **Add**.

10. Enter the private **IP address** you added to the Azure network interface. Enter the corresponding **Subnet mask**. Select **Add**.

11. Repeat the previous steps to add any more private IP addresses that you added to the Azure network interface.

> **Important:**
> You should never manually assign the public IP address assigned to an Azure virtual machine within the virtual machine's operating system. When you manually set the IP address within the operating system, ensure that it's the same address as the private IP address assigned to the Azure network interface. Failure to assign the address correctly can cause loss of connectivity to the virtual machine. For more information, see [Change IP address settings](virtual-network-network-interface-addresses.md#change-ip-address-settings).
>
For more information about private IP addresses, see [Private IP address](virtual-network-network-interface-addresses.md#private).

12. Select **OK** to close the secondary IP address settings.

13. Select **OK** to close the adapter settings. Your RDP connection re-establishes.

14. Open a command prompt or PowerShell.

15. Enter **`ipconfig /all`** at the command line.

16. Verify the primary and secondary private IP addresses are present in the configuration.

    ```powershell
    PS C:\Users\azureuser> ipconfig /all

    Windows IP Configuration

       Host Name . . . . . . . . . . . . : myVM
       Primary Dns Suffix  . . . . . . . :
       Node Type . . . . . . . . . . . . : Hybrid
       IP Routing Enabled. . . . . . . . : No
       WINS Proxy Enabled. . . . . . . . : No

    Ethernet adapter Ethernet:

       Connection-specific DNS Suffix  . :
       Description . . . . . . . . . . . : Microsoft Hyper-V Network Adapter
       Physical Address. . . . . . . . . : 00-0D-3A-E6-CE-A3
       DHCP Enabled. . . . . . . . . . . : No
       Autoconfiguration Enabled . . . . : Yes
       Link-local IPv6 Address . . . . . : fe80::a8d1:11d5:3ab2:6a51%5(Preferred)
       IPv4 Address. . . . . . . . . . . : 10.1.0.4(Preferred)
       Subnet Mask . . . . . . . . . . . : 255.255.255.0
       IPv4 Address. . . . . . . . . . . : 10.1.0.5(Preferred)
       Subnet Mask . . . . . . . . . . . : 255.255.255.0
       IPv4 Address. . . . . . . . . . . : 10.1.0.6(Preferred)
       Subnet Mask . . . . . . . . . . . : 255.255.255.0
       Default Gateway . . . . . . . . . : 10.1.0.1
       DHCPv6 IAID . . . . . . . . . . . : 100666682
       DHCPv6 Client DUID. . . . . . . . : 00-01-00-01-2A-A8-26-B1-00-0D-3A-E6-CE-A3
       DNS Servers . . . . . . . . . . . : 168.63.129.16
       NetBIOS over Tcpip. . . . . . . . : Enabled
    ```

17. Ensure the primary private IP address used in windows is the same as the primary IP address of the Azure VM network interface. For more information, see [No Internet access from Azure Windows VM that has multiple IP addresses](https://support.microsoft.com/help/4040882/no-internet-access-from-azure-windows-vm-that-has-multiple-ip-addresse).

#### Validation (Windows Server)

To validate connectivity to the internet from the secondary IP configuration via the public IP, use the following command. Replace 10.1.0.5 with the secondary private IP address you added to the Azure VM network interface.

```powershell
ping -S 10.1.0.5 outlook.com
```
 
> **Note:**
> For secondary IP configurations, you can ping to the Internet if the configuration has a public IP address associated with it. For primary IP configurations, a public IP address isn't required to ping to the Internet.

</details>

### SUSE Linux Enterprise and openSUSE
 
<details>
  <summary>Expand</summary>
 
SUSE-based distributions use the <code>cloud-netconfig</code> plugin from the <code>cloud-netconfig-azure</code> package to manage the IP configuration. No manual steps are required on the part of the administrator. The first IP address of an interface set on the platform is assigned via DHCP. The cloud-netconfig plugin then probes the Azure Instance Metadata Service API continuously (once per minute) for more IP addresses assigned to the interface and adds/removes them as secondary IP addresses automatically.

This plugin should be installed and enabled on new images by default.  Configuration steps for old workloads can be found here: https://www.suse.com/c/multi-nic-cloud-netconfig-ec2-azure/.

</details>

### Ubuntu 14/16

<details>
  <summary>Expand</summary>

We recommend looking at the latest documentation for your Linux distribution. 

1. Open a terminal window.

2. Ensure you're the root user. If you aren't, enter the following command:

   ```bash
   sudo -i
   ```

3. Update the configuration file of the network interface (assuming **‘eth0’**).

   * Keep the existing line item for dhcp. The primary IP address remains configured as it was previously.
   
   * Add a configuration for another static IP address with the following commands:

     ```bash
     cd /etc/network/interfaces.d/
     ls
     ```

     You should see a .cfg file.

4. Open the file. You should see the following lines at the end of the file:

   ```bash
   auto eth0
   iface eth0 inet dhcp
   ```

5. Add the following lines after the lines that exist in the file. Replace **`10.1.0.5`** with your private IP address and subnet mask.

   ```bash
   iface eth0 inet static
   address 10.1.0.5
   netmask 255.255.255.0
   ```
    
    To add other private IP addresses, edit the file and add the new private IP addresses on subsequent lines:

    ```bash
    iface eth0 inet static
    address 10.1.0.5
    netmask 255.255.255.0
    iface eth0 inet static
    address 10.1.0.6
    netmask 255.255.255.0
    ```

6. Save the file by using the following command:

   ```bash
   :wq
   ```

7. Reset the network interface with the following command:

   ```bash
   ifdown eth0 && ifup eth0
   ```

   > **Important:**
   > Execute both ifdown and ifup in the same line if using a remote connection.
   >

8. Verify the IP address is added to the network interface with the following command:

   ```bash
   ip addr list eth0
   ```

   You should see the IP address you added as part of the list. Example:

    ```bash
    2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether 00:0d:3a:04:45:16 brd ff:ff:ff:ff:ff:ff
    inet 10.1.0.5/24 brd 10.1.0.255 scope global eth0
       valid_lft forever preferred_lft forever
    inet 10.1.0.6/24 brd 10.1.0.255 scope global secondary eth0
       valid_lft forever preferred_lft forever
    inet 10.1.0.4/24 brd 10.1.0.255 scope global secondary eth0
       valid_lft forever preferred_lft forever
    inet6 fe80::20d:3aff:fe04:4516/64 scope link
       valid_lft forever preferred_lft forever
    ```

#### Validation (Ubuntu 14/16)

To ensure you're able to connect to the internet from your secondary IP configuration via the public IP associated with it, use the following command:

```bash
ping -I 10.1.0.5 outlook.com
```

> **Note:**
> For secondary IP configurations, you can only ping to the Internet if the configuration has a public IP address associated with it. For primary IP configurations, a public IP address isn't required to ping to the Internet.

For Linux VMs, when attempting to validate outbound connectivity from a secondary NIC, you may need to add appropriate routes. See appropriate documentation for your Linux distribution. The following method to accomplish this goal:

```bash
echo 150 custom >> /etc/iproute2/rt_tables 

ip rule add from 10.1.0.5 lookup custom
ip route add default via 10.1.0.1 dev eth2 table custom
```

- Ensure to replace:
  
  - **10.1.0.5** with the private IP address that has a public IP address associated to it
  
  - **10.1.0.1** to your default gateway
  
  - **eth2** to the name of your secondary NIC

</details>

### Ubuntu 18.04+

<details>
  <summary>Expand</summary>

Starting on 18.04, **`netplan`** is used in Ubuntu for network management. We recommend looking at the latest documentation for your Linux distribution. 

1. Open a terminal window.

2. Ensure you're the root user. If you are not, enter the following command:

    ```bash
    sudo -i
    ```

3. Create a file for the second interface and open it in a text editor:

    ```bash
    vi /etc/netplan/60-static.yaml
    ```

4. Add the following lines to the file, replacing **`10.1.0.5/24`** with your IP and subnet mask:

    ```bash
    network:
        version: 2
        ethernets:
            eth0:
                addresses:
                    - 10.1.0.5/24
    ```
    To add private IP addresses, edit the file and add the new private IP addresses on subsequent lines:

    ```bash
    network:
        version: 2
        ethernets:
            eth0:
                addresses:
                    - 10.1.0.5/24
                    - 10.1.0.6/24
    ```

5. Save the file by using the following command:

    ```bash
    :wq
    ```

6. Test the changes with **`netplan try`** to confirm syntax:

    ```bash
    netplan try
    ```

    > **Note:**
    > `netplan try` will apply the changes temporarily and roll back the changes after 120 seconds. If there's a loss of connectivity, wait 2 minutes, and then reconnect. At that time, the changes will have been rolled back.

7. Assuming no issues with **`netplan try`**, apply the configuration changes:

    ```bash
    netplan apply
    ```

8. Verify the IP address is added to the network interface with the following command:

    ```bash
    ip addr list eth0
    ```

    You should see the IP address you added as part of the list. Example:

    ```bash
    2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether 00:0d:3a:04:45:16 brd ff:ff:ff:ff:ff:ff
    inet 10.1.0.5/24 brd 10.1.0.255 scope global eth0
       valid_lft forever preferred_lft forever
    inet 10.1.0.6/24 brd 10.1.0.255 scope global secondary eth0
       valid_lft forever preferred_lft forever
    inet 10.1.0.4/24 brd 10.1.0.255 scope global secondary eth0
       valid_lft forever preferred_lft forever
    inet6 fe80::20d:3aff:fe04:4516/64 scope link
       valid_lft forever preferred_lft forever
    ```

#### Validation (Ubuntu 18.04+)

To ensure you're able to connect to the internet from your secondary IP configuration via the public IP associated with it, use the following command:

```bash
ping -I 10.1.0.5 outlook.com
```

>**Note:**
>For secondary IP configurations, you can only ping to the Internet if the configuration has a public IP address associated with it. For primary IP configurations, a public IP address isn't required to ping to the Internet.

For Linux VMs, when trying to validate outbound connectivity from a secondary NIC, you may need to add appropriate routes. Follow the appropriate documentation for your Linux distribution. The following method is one way to accomplish this goal:

```bash
echo 150 custom >> /etc/iproute2/rt_tables 

ip rule add from 10.1.0.5 lookup custom
ip route add default via 10.1.0.1 dev eth2 table custom
```

- Ensure you replace:
  
  - **10.1.0.5** with the private IP address that has a public IP address associated to it
  
  - **10.1.0.1** to your default gateway
  
  - **eth2** to the name of your secondary NIC

</details>

### Red Hat Enterprise Linux and others

<details>
  <summary>Expand</summary>

>**Note:**
>To configure the extra IP addresses in RHEL10.x, it's enough to restart NetworkManger with: `systemctl restart NetworkManger.service` or reboot the system. No other steps are required.


#### RHEL 8.6 & above, RHEL 9

Starting RHEL 8.6 & above and RHEL 9, "networkmanager-cloud-setup" package can handle multiple IP configurations and its associated route configuration.

1. Disabled cloud-init to handle secondary IP configuration in the respective files  /etc/cloud/cloud.cfg.d/99-apply-network-config.cfg or /etc/cloud/cloud.cfg.d/91-azure_datasource.cfg.
   This will let NetworkManager and nm-cloud-setup manage the entire network configuration

 ```bash
[root@rhel8 ~]# cat /etc/cloud/cloud.cfg.d/99-apply-network-config.cfg
datasource:
   Azure:
      apply_network_config: False
```

2. Install "NetworkManager-cloud-setup" package if not already installed

```bash
]# yum install NetworkManager-cloud-setup
Red Hat Enterprise Linux 8 for x86_64 - BaseOS from RHUI (RPMs)                                                                                                39 MB/s |  66 MB     00:01
Red Hat Enterprise Linux 8 for x86_64 - Supplementary (RPMs) from RHUI                                                                                        2.3 MB/s | 340 kB     00:00
Red Hat Enterprise Linux 8 for x86_64 - AppStream from RHUI (RPMs)                                                                                             41 MB/s |  60 MB     00:01
Red Hat CodeReady Linux Builder for RHEL 8 x86_64 (RPMs) from RHUI                                                                                             33 MB/s | 8.9 MB     00:00
Red Hat Ansible Engine 2 for RHEL 8 x86_64 (RPMs) from RHUI                                                                                                    14 MB/s | 2.5 MB     00:00
Dependencies resolved.
==============================================================================================================================================================================================
 Package                                           Architecture                  Version                                   Repository                                                    Size
==============================================================================================================================================================================================
Installing:
 NetworkManager-cloud-setup                        x86_64                        1:1.40.16-13.el8_9                        rhel-8-for-x86_64-appstream-rhui-rpms                        198 k
Upgrading:
 NetworkManager                                    x86_64                        1:1.40.16-13.el8_9                        rhel-8-for-x86_64-baseos-rhui-rpms                           2.3 M
 NetworkManager-libnm                              x86_64                        1:1.40.16-13.el8_9                        rhel-8-for-x86_64-baseos-rhui-rpms                           1.9 M
 NetworkManager-team                               x86_64                        1:1.40.16-13.el8_9                        rhel-8-for-x86_64-baseos-rhui-rpms                           161 k
 NetworkManager-tui                                x86_64                        1:1.40.16-13.el8_9                        rhel-8-for-x86_64-baseos-rhui-rpms                           356 k

Transaction Summary
==============================================================================================================================================================================================
Install  1 Package
Upgrade  4 Packages

Total download size: 4.9 M
Is this ok [y/N]: y
Downloading Packages:
(1/5): NetworkManager-cloud-setup-1.40.16-13.el8_9.x86_64.rpm                                                                                                 2.0 MB/s | 198 kB     00:00
(2/5): NetworkManager-1.40.16-13.el8_9.x86_64.rpm                                                                                                              18 MB/s | 2.3 MB     00:00
(3/5): NetworkManager-team-1.40.16-13.el8_9.x86_64.rpm                                                                                                        4.1 MB/s | 161 kB     00:00
(4/5): NetworkManager-libnm-1.40.16-13.el8_9.x86_64.rpm                                                                                                        12 MB/s | 1.9 MB     00:00
(5/5): NetworkManager-tui-1.40.16-13.el8_9.x86_64.rpm                                                                                                         8.8 MB/s | 356 kB     00:00
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Total                                                                                                                                                          28 MB/s | 4.9 MB     00:00
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                                                                                                                                      1/1
  Running scriptlet: NetworkManager-libnm-1:1.40.16-13.el8_9.x86_64                                                                                                                       1/1
  Upgrading        : NetworkManager-libnm-1:1.40.16-13.el8_9.x86_64                                                                                                                       1/9
  Running scriptlet: NetworkManager-libnm-1:1.40.16-13.el8_9.x86_64                                                                                                                       1/9
  Running scriptlet: NetworkManager-1:1.40.16-13.el8_9.x86_64                                                                                                                             2/9
  Upgrading        : NetworkManager-1:1.40.16-13.el8_9.x86_64                                                                                                                             2/9
  Running scriptlet: NetworkManager-1:1.40.16-13.el8_9.x86_64                                                                                                                             2/9
  Installing       : NetworkManager-cloud-setup-1:1.40.16-13.el8_9.x86_64                                                                                                                 3/9
  Running scriptlet: NetworkManager-cloud-setup-1:1.40.16-13.el8_9.x86_64                                                                                                                 3/9
  Upgrading        : NetworkManager-team-1:1.40.16-13.el8_9.x86_64                                                                                                                        4/9
  Upgrading        : NetworkManager-tui-1:1.40.16-13.el8_9.x86_64                                                                                                                         5/9
  Cleanup          : NetworkManager-tui-1:1.40.0-1.el8.x86_64                                                                                                                             6/9
  Cleanup          : NetworkManager-team-1:1.40.0-1.el8.x86_64                                                                                                                            7/9
  Running scriptlet: NetworkManager-1:1.40.0-1.el8.x86_64                                                                                                                                 8/9
  Cleanup          : NetworkManager-1:1.40.0-1.el8.x86_64                                                                                                                                 8/9
  Running scriptlet: NetworkManager-1:1.40.0-1.el8.x86_64                                                                                                                                 8/9
  Cleanup          : NetworkManager-libnm-1:1.40.0-1.el8.x86_64                                                                                                                           9/9
  Running scriptlet: NetworkManager-libnm-1:1.40.0-1.el8.x86_64                                                                                                                           9/9
  Verifying        : NetworkManager-cloud-setup-1:1.40.16-13.el8_9.x86_64                                                                                                                 1/9
  Verifying        : NetworkManager-1:1.40.16-13.el8_9.x86_64                                                                                                                             2/9
  Verifying        : NetworkManager-1:1.40.0-1.el8.x86_64                                                                                                                                 3/9
  Verifying        : NetworkManager-libnm-1:1.40.16-13.el8_9.x86_64                                                                                                                       4/9
  Verifying        : NetworkManager-libnm-1:1.40.0-1.el8.x86_64                                                                                                                           5/9
  Verifying        : NetworkManager-team-1:1.40.16-13.el8_9.x86_64                                                                                                                        6/9
  Verifying        : NetworkManager-team-1:1.40.0-1.el8.x86_64                                                                                                                            7/9
  Verifying        : NetworkManager-tui-1:1.40.16-13.el8_9.x86_64                                                                                                                         8/9
  Verifying        : NetworkManager-tui-1:1.40.0-1.el8.x86_64                                                                                                                             9/9
Installed products updated.

Upgraded:
  NetworkManager-1:1.40.16-13.el8_9.x86_64   NetworkManager-libnm-1:1.40.16-13.el8_9.x86_64   NetworkManager-team-1:1.40.16-13.el8_9.x86_64   NetworkManager-tui-1:1.40.16-13.el8_9.x86_64
Installed:
  NetworkManager-cloud-setup-1:1.40.16-13.el8_9.x86_64

Complete!
```

3. To enable “nm-cloud-setup” to handle secondary IP configuration, create nm-cloud-setup.service and nm-cloud-setup.timer (adjust OnBootSec & OnUnitActiveSec parameters to suit your requirement) files

```bash
[root@rhel8 ~]# cat /etc/systemd/system/nm-cloud-setup.service
[Unit]
Description=Automatically configure NetworkManager in cloud
Documentation=man:nm-cloud-setup(8)
Before=network-online.target
After=NetworkManager.service

[Service]
Environment=NM_CLOUD_SETUP_AZURE=yes
Type=oneshot
ExecStart=/usr/libexec/nm-cloud-setup

[Install]
WantedBy=NetworkManager.service
```

```bash
[root@rhel8 ~]# cat /etc/systemd/system/nm-cloud-setup.timer
[Unit]
Description=Periodically run nm-cloud-setup

[Timer]
OnBootSec=1min
OnUnitActiveSec=1min

[Install]
WantedBy=timers.target

```
4. Enable services are reload daemon
   
```bash
systemctl enable --now nm-cloud-setup.service
systemctl start nm-cloud-setup.service
systemctl enable --now nm-cloud-setup.timer
systemctl daemon-reload
```
5. Reboot VM & verify. VM should now successfully identify respective primary and secondary IPs.

#### RHEL 8.5 & below 

1. Open a terminal window.

2. Ensure you're the root user. If you aren't, enter the following command:

    ```bash
    sudo -i
    ```

3. Enter your password and follow instructions as prompted. Once you're the root user, go to the network scripts folder with the following command:

    ```bash
    cd /etc/sysconfig/network-scripts
    ```

4. List the related ifcfg files using the following command:

    ```bash
    ls ifcfg-*
    ```

    You should see **ifcfg-eth0** as one of the files.

5. Create a new configuration file for each IP added to the system.

    ```bash
    touch ifcfg-eth0:0
    ```

6. Open the *ifcfg-eth0:0* file with the following command:

    ```bash
    vi ifcfg-eth0:0
    ```

7. Add content to the file, **eth0:0** in this case, with the following command. Replace **`10.1.0.5`** with your new private IP address and subnet mask.

    ```bash
    DEVICE=eth0:0
    BOOTPROTO=static
    ONBOOT=yes
    IPADDR=10.1.0.5
    NETMASK=255.255.255.0
    ```

8. Save the file with the following command:

    ```bash
    :wq
    ```

9. Create a config file per IP address to add with their corresponding values:

    ```bash
    touch ifcfg-eth0:1
    ```

        
    ```bash
    vi ifcfg-eth0:1
    ```

    ```bash
    DEVICE=eth0:1
    BOOTPROTO=static
    ONBOOT=yes
    IPADDR=10.1.0.6
    NETMASK=255.255.255.0
    ```

    ```bash
    :wq
    ```

9. Restart the network services and make sure the changes are successful by running the following commands:

    ```bash
    systemctl restart NetworkManager.service
    ifconfig
    ```

    You should see the IP address or addresses you added in the list returned.

    ```bash
    eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 10.1.0.4  netmask 255.255.255.0  broadcast 10.1.0.255
        inet6 fe80::6245:bdff:fe7d:704a  prefixlen 64  scopeid 0x20<link>
        ether 60:45:bd:7d:70:4a  txqueuelen 1000  (Ethernet)
        RX packets 858  bytes 244215 (238.4 KiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 1021  bytes 262077 (255.9 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

    eth0:0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 10.1.0.5  netmask 255.255.255.0  broadcast 10.1.0.255
        ether 60:45:bd:7d:70:4a  txqueuelen 1000  (Ethernet)

    eth0:1: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 10.1.0.6  netmask 255.255.255.0  broadcast 10.1.0.255
        ether 60:45:bd:7d:70:4a  txqueuelen 1000  (Ethernet)
    ```

#### Validation (Red Hat and others)

To ensure you're able to connect to the internet from your secondary IP configuration via the public IP associated with it, use the following command:

```bash
ping -I 10.0.0.5 outlook.com
```
>**Note:**
>For secondary IP configurations, you can only ping to the Internet if the configuration has a public IP address associated with it. For primary IP configurations, a public IP address isn't required to ping to the Internet.

For Linux VMs, when attempting to validate outbound connectivity from a secondary NIC, you may need to add appropriate routes. See the appropriate documentation for your Linux distribution. The following method to accomplish this goal:

```bash
echo 150 custom >> /etc/iproute2/rt_tables 

ip rule add from 10.1.0.5 lookup custom
ip route add default via 10.1.0.1 dev eth2 table custom
```

- Ensure to replace:
  
  - **10.0.0.5** with the private IP address that has a public IP address associated to it
  
  - **10.0.0.1** to your default gateway
  
  - **eth2** to the name of your secondary NIC


</details>

### Debian GNU/Linux

<details>
  <summary>Expand</summary>

We recommend looking at the latest documentation for your Linux distribution. 

1. Open a terminal window.

2. Ensure you're the root user. If you aren't, enter the following command:

   ```bash
   sudo -i
   ```

3. Update the configuration file of the network interface (assuming **‘eth0’**).

   * Keep the existing line item for dhcp. The primary IP address remains configured as it was previously.
   
   * Add a configuration for each static IP address using the following commands:

     ```bash
     cd /etc/network/interfaces.d/
     ls
     ```

     You should see a .cfg file.

4. Open the file. You should see the following lines at the end of the file:

   ```bash
   auto eth0
   iface eth0 inet dhcp
   ```

5. Add the following lines after the lines that exist in the file. Replace **`10.1.0.5`** with your private IP address and subnet mask.

   ```bash
   iface eth0 inet static
   address 10.1.0.5
   netmask 255.255.255.0
   ```
    
    Add the new IP addresses information in the configuration file:

    ```bash
    iface eth0 inet static
    address 10.1.0.5
    netmask 255.255.255.0
    iface eth0 inet static
    address 10.1.0.6
    netmask 255.255.255.0
    ```

6. Save the file by using the following command:

   ```bash
   :wq
   ```

7. Restart networking services for the changes to take effect. For Debian 8 and above, use:

   ```bash
   systemctl restart networking
   ```
   For prior versions of Debian, you can use below commands:

   ```bash
   service networking restart
   ```

8. Verify the IP address is added to the network interface with the following command:

   ```bash
   ip addr list eth0
   ```

   You should see the IP address you added as part of the list. Example:

    ```bash
    2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether 00:0d:3a:04:45:16 brd ff:ff:ff:ff:ff:ff
    inet 10.1.0.5/24 brd 10.1.0.255 scope global eth0
       valid_lft forever preferred_lft forever
    inet 10.1.0.6/24 brd 10.1.0.255 scope global secondary eth0
       valid_lft forever preferred_lft forever
    inet 10.1.0.4/24 brd 10.1.0.255 scope global secondary eth0
       valid_lft forever preferred_lft forever
    inet6 fe80::20d:3aff:fe04:4516/64 scope link
       valid_lft forever preferred_lft forever
    ```

#### Validation (Debian GNU/Linux)

To ensure you're able to connect to the internet from your secondary IP configuration via the public IP associated with it, use the following command:

```bash
ping -I 10.1.0.5 outlook.com
```

> **Note:**
> For secondary IP configurations, you can only ping to the Internet if the configuration has a public IP address associated with it. For primary IP configurations, a public IP address isn't required to ping to the Internet.

For Linux VMs, when attempting to validate outbound connectivity from a secondary NIC, you may need to add appropriate routes. See appropriate documentation for your Linux distribution. The following method to accomplish this goal:

```bash
echo 150 custom >> /etc/iproute2/rt_tables 

ip rule add from 10.1.0.5 lookup custom
ip route add default via 10.1.0.1 dev eth2 table custom
```

- Ensure to replace:
  
  - **10.1.0.5** with the private IP address that has a public IP address associated to it
  
  - **10.1.0.1** to your default gateway
  
  - **eth2** to the name of your secondary NIC

</details>


## Next steps

- Learn more about [public IP addresses](public-ip-addresses.md) in Azure.
- Learn more about [private IP addresses](private-ip-addresses.md) in Azure.
- Learn how to [Configure IP addresses for an Azure network interface](virtual-network-network-interface-addresses.md).
