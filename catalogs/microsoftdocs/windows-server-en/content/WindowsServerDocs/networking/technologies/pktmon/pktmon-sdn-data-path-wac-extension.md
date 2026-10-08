---
title: SDN Data Path Diagnostics Extension in Windows Admin Center
description: Describes how to automate Packet Monitor-based packet captures with the SDN Data Path Diagnostics Extension in Windows Admin Center.
ms.topic: how-to
author: robinharwood
ms.author: roharwoo
ms.date: 10/27/2021
ms.custom: sfi-image-nochange
---

# SDN Data Path Diagnostics Extension in Windows Admin Center

SDN Data Path Diagnostics is a tool within the SDN monitoring extension of Windows Admin Center that automates Packet Monitor-based packet captures according to various SDN scenarios, and presents the output in a single view that is easy to follow and manipulate.​

## What is Packet Monitor (Pktmon)?
Packet Monitor (Pktmon) is an in-box, cross-component network diagnostics tool for Windows. It can be used for packet capture, packet drop detection, packet filtering, and counting. The tool is especially helpful in virtualization scenarios, like container networking and SDN, because it provides visibility within the networking stack.

## What is Windows Admin Center?
Windows Admin Center is a locally-deployed, browser-based management tool that lets you manage your Windows Servers with no Azure or cloud dependency. Windows Admin Center gives you full control over all aspects of your server infrastructure and is particularly useful for managing servers on private networks that are not connected to the Internet. Windows Admin Center is the modern evolution of "in-box" management tools, like Server Manager and MMC.

## Before you start
- To use the tool, the target server needs to be running Windows Server 2019 version 1903 (19H1) and above.
- [Install Windows Admin Center](../../../manage/windows-admin-center/deploy/install.md).
- Add a cluster to Windows Admin Center:
  1. Click **+ Add** under **All Connections**.
  2. Choose to add a Hyper-Converged Cluster Connection.
  3. Type the name of the cluster and, if prompted, the credentials to use.
  4. Check **Configure the Network Controller** to continue.
  5. Enter the Network Controller URI and click **Validate**.
  6. Click **Add** to finish.

The cluster will be added to the connections list. Click it to launch the Dashboard.

<center>

Adding an SDN enabled HCI connection with Windows Admin Center

</center>

## Getting started

To get to the tool, navigate to the cluster that you created in the previous step, then to the "SDN monitoring" extension, then to the "Data Path Diagnostics" tab.

## Selecting scenarios

The first page lists all the SDN scenarios classified as Workload scenarios and Infrastructure scenarios as shown in the image below. To start, select the SDN scenario that needs to be diagnosed.

<center>

SDN monitoring - Diagnostic Scenarios page

</center>

## Scenario parameters

After choosing the scenario, fill out a list of mandatory and optional parameters to start the capture. These basic parameters will point the tool to the connection that needs to be diagnosed. The tool then will use these parameters for queries to run a successful capture, without any intervention from the user to figure out the expected packet flow, the machines involved in the scenario, their location in the cluster, or the capture filters to apply on each machine. The mandatory parameters enable the capture to run, and the optional parameters help filter out some noise.

<center>

SDN monitoring - Capture Conditions page

</center>

## Capture log

After starting the capture, the extension will show a list of the machines where the capture is starting. You might get prompted to sign in to these machines if your credentials were not saved. You can start reproducing the ping or issue that you are trying to diagnose by capturing the relative packets. After packets are captured, the extension will show marks next to the machines where packets were captured.

<center>

starting the packet capture

</center>

After stopping the capture, the logs of all the machines will be shown in a single page, divided by the machine title. Each title will include the machine name, its role in the scenario, and its host in the case of virtual machines (VMs).

<center>

Data Path Diagnostics log after stopping the capture

</center>

The results are displayed in a table that shows the main parameters of the captured packets: Timestamp, Sources IP Address, Source Port, Destination IP Address, Destination Port, Ethertype, Protocol, TCP Flags, whether the packet was dropped, and the drop reason.

   - The timestamp for each of these packets is also a hyperlink that will redirect you to a different page where you can find more information about the selected packet. See the Details Page section below.
   - All dropped packets have a “True” value in the **Dropped** tab, a drop reason, and is displayed in red text to make it easier to pinpoint.
   - All the tabs can be sorted ascending and descending.
   - You can search for a value in any column in the log by using the search bar.
   - You can restart the capture with the same chosen filters using the **Restart** button.

## Details page

The information in this page is particularly valuable if you have incorrect packet propagation issues or misconfiguration issues, because you can investigate the flow of the packet through each component of the networking stack. For each packet hop, there are details that include the packet parameters as well as the raw packet details.

- The hops are grouped together based on the components involved. Each adapter and the drivers on top of it are grouped by the name of the adapter. This makes it easier to track the packet on a high level through these group titles.
- All dropped packets will also be displayed in red text to make them easier to pinpoint.

<center>

Data Path Diagnostics Details page

</center>

Select a hop to view more details. In encapsulation and NAT (Network Address Translation) scenarios, this feature allows you to see the packet changing as it passes through the networking stack, and check for any misconfiguration issues.

<center>

viewing details about a specific hop

</center>

Scroll down to view raw packet details:

<center>

viewing raw packet details about a specific hop

</center>

## Display filters

The display filters allow you to filter the log after capturing the packets. For each filter, you can specify packet parameters like MAC Addresses, IP Addresses, Ports, Ethertype, and Transport Protocol.

   - Display filters can distinguish between the source and the destination of IP Addresses, MAC Addresses, and Ports.
   - Display filters can be deleted and edited after applying them to change the view of the log.
   - Display filters are reversed in the saved logs.

<center>

filtering logs with display filters

</center>

## Save

The save button allows you to save the log on your local machine for further analysis through other tools. Display filters will be reversed in the saved log. Logs can be saved in various formats:

   - ETL format which can be analyzed using Microsoft Network Monitor. Note: [Check this page](pktmon-netmon-support.md) for more information.
   - Text format which can be analyzed using any text editor like TextAnalysisTool.NET.
   - Pcapng format which can be analyzed using tools like Wireshark.
      - Most of the Packet Monitor metadata will be lost during this conversion. Note: [Check this page](https://github.com/MicrosoftDocs/windowsserverdocs/blob/b30da775fdeb9df0c446fda330fd0f101422edbe/WindowsServerDocs/networking/technologies/pktmon/pktmon-pcapng-support.md) for more information.

<center>

saving logs locally

</center>
