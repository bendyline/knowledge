---
title: Configure VMware syslogs for Azure VMware Solution
description: Learn how to configure diagnostic settings to collect VMware syslogs for your Azure VMware Solution private cloud.
ms.topic: how-to 
ms.service: azure-vmware
ms.date: 2/18/2026
ms.custom: engagement-fy23

#Customer intent: As an Azure service administrator, I want to collect VMware syslogs and store it in my storage account so that I can view the vCenter Server logs and analyze for any diagnostic purposes.

# Customer intent: "As an Azure service administrator, I want to configure diagnostic settings to collect and store VMware syslogs, so that I can analyze vCenter Server logs for effective monitoring and troubleshooting in my Azure VMware Solution private cloud."
---

# Configure VMware syslogs for Azure VMware Solution

Diagnostic settings are used to configure streaming export of platform logs and metrics for a resource to the destination of your choice. You can create up to five different diagnostic settings to send different logs and metrics to independent destinations. 

In this article, learn how to configure a diagnostic setting to collect VMware syslogs for your Azure VMware Solution private cloud. Then, learn how to store the syslog to a storage account to view the vCenter Server logs and analyze for diagnostic purposes. 
 >**Important:**
   >The **VMware syslogs** contains the following logs:
   >- vCenter Server logs
   >- ESXi logs
   >- vSAN logs
   >- NSX Manager logs
   >- NSX Distributed Firewall logs
   >- NSX Gateway Firewall logs
   >- NSX Edge Appliance logs

## Prerequisites

Make sure you have an Azure VMware Solution private cloud with access to the vCenter Server and NSX Manager interfaces. 

## Configure diagnostic settings

1. From your Azure VMware Solution private cloud, select **Diagnostic settings**, then **Add diagnostic settings**.

Screenshot showing where to configure VMware syslogs.

1. Select the **vmwaresyslog**, **All metrics**, and select one of the following options presented.

### Send to Log Analytics workspace

#### How to set up Log Analytics

A Log Analytics workspace:

* Contains your Azure VMware Solution private cloud logs.

* Is the workspace from which you can take desired actions, such as querying for logs.

In this section, you learn to:

* Configure a Log Analytics workspace.

* Create a diagnostic setting in your private cloud to send your logs to this workspace.

#### Create a resource

1. In the Azure portal, navigate to **Create a resource**.
2. Search for “Log Analytics Workspace” and select **Create** -> **Log Analytics Workspace**.

Screenshot of Create a resource.

#### Set up your workspace

1. Navigate to the **Basics** tab on the **Create Log Analytics workspace** page.
2. Under **Project details**, enter the **Subscription** you intend to use and the **Resource Group** chosen to house this workspace. 
3. Under **Instance details**, create a **Name** and select a **Region**. 
3. Select **Review** + **Create**.

Screenshot of Marketplace.

#### Add a diagnostic setting

Next, we add a diagnostic setting in your Azure VMware Solution private cloud, so it knows where to send your logs to.

Screenshot of vh-private-cloud.

1. Select your Azure VMware Solution private cloud.
Go to Diagnostic settings on the left-hand menu under Monitoring.
Select **Add diagnostic setting**.
2. Give your diagnostic setting a name. 
Select the log categories you're interested in sending to your Log Analytics workspace.

3. Make sure to select the checkbox next to **Send to Log Analytics workspace**.
Select the Subscription your Log Analytics workspace lives in and the Log Analytics workspace.
Select **Save** on the top left.

Screenshot of Diagnostics settings.

At this point, your Log Analytics workspace is now successfully configured to receive logs from your Azure VMware Solution private cloud.

#### Search and analyze logs using Kusto

Now that you successfully configured your logs to go to your Log Analytics workspace, you can use that data to gain meaningful insights with the Log Analytics search feature.
Log Analytics uses a language called the Kusto Query Language (or Kusto) to search through your logs.

For more information, see
[Data analysis in Azure Data Explorer with Kusto Query Language](https://learn.microsoft.com/training/paths/data-analysis-data-explorer-kusto-query-language/).

### Archive to storage account

1. In **Diagnostic setting**, select the storage account where you want to store the logs and select **Save**.

Screenshot showing the options to select for storing the syslogs.

2. Go to your **Storage accounts**, verify **Insight logs vmwarelog** was created, and select it. 
 
Screenshot showing the Insight logs vmwarelog option created and available.


3. Browse **Insight logs vmwarelog** to locate and download the json file to view the logs.

Screenshot showing the drill-down path to the json file.

### Stream to Microsoft Azure Event Hubs

1. In **Diagnostic setting**, under Destination details, select **Stream to an Event Hub**. 
2. From the **Event Hub namespace** drop-down menu, choose where you want to send the logs, select, and **Save**.
    
Screenshot showing the drill-down path to send the logs.
