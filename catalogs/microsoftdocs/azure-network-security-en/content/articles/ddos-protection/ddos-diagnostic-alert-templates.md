---
title: 'Tutorial: Configure Azure DDoS Protection diagnostic logging alerts'
description: Learn how to configure DDoS protection diagnostic alerts for Azure DDoS Protection.
services: ddos-protection
author: duongau
ms.service: azure-ddos-protection
ms.topic: tutorial
ms.date: 03/17/2026
ms.author: duau
# Customer intent: "As a network administrator, I want to configure DDoS protection diagnostic logging alerts so that I can receive timely notifications and take action during potential DDoS attacks to protect my resources."
---

# Tutorial: Configure Azure DDoS Protection diagnostic logging alerts

In this tutorial, you learn how to:

> 
> * Configure diagnostic logging alerts through Azure Monitor and Logic App.

DDoS Protection diagnostic logging alerts provide visibility into DDoS attacks and mitigation actions. You can configure alerts for all DDoS protected public IP addresses that you have enabled diagnostic logging on.

## Prerequisites

- If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.
- [DDoS Network Protection](manage-ddos-protection.md) must be enabled on a virtual network or [DDoS IP Protection](manage-ddos-protection-powershell-ip.md) must be enabled on a public IP address. 
- In order to use diagnostic logging, you must first create a [Log Analytics workspace with diagnostic settings enabled](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/ddos-configure-log-analytics-workspace.md). 
- DDoS Protection monitors public IP addresses assigned to resources within a virtual network. If you don't have any resources with public IP addresses in the virtual network, you must first create a resource with a public IP address. 

## Configure diagnostic logging alerts through Azure Monitor

With these templates, you are able to configure alerts for all public IP addresses that you have enabled diagnostic logging on. 

### Create Azure Monitor alert rule

The Azure Monitor alert rule template runs a query against the diagnostic logs to detect when an active DDoS mitigation is occurring. The alert indicates a potential attack. Action groups can be used to invoke actions as a result of the alert.


#### Deploy the template

1. Select **Deploy to Azure** to sign in to Azure and open the template. 

    Button to deploy the Resource Manager template to Azure.

1. On the *Custom deployment* page, under *Project details*, enter the following information. 

    Screenshot of Azure Monitor alert rule template.

    | Setting | Value |
    | --- | --- |
    | Subscription | Select your Azure subscription. |
    | Resource Group | Select your Resource group. |
    | Region | Select your Region. |
    | Workspace Name | Enter your workspace name. In this example, the *Workspace name* is **myLogAnalyticsWorkspace**. |
    | Location | Enter **East US**. |

    > **Note:**
    > *Location* must match the location of the workspace.
        
1. Select **Review + create** and then select **Create** after validation passes.


### Create Azure Monitor diagnostic logging alert rule with Logic App

This DDoS Mitigation Alert Enrichment template deploys the necessary components of an enriched DDoS mitigation alert: Azure Monitor alert rule, action group, and Logic App. The result of the process is an email alert with details about the IP address under attack, including information about the resource associated with the IP. The owner of the resource is added as a recipient of the email, along with the security team. A basic application availability test is also performed and the results are included in the email alert.
#### Deploy the template 

1.  Select **Deploy to Azure** to sign in to Azure and open the template. 

    Button to deploy the Resource Manager template to Azure.
    
1. On the *Custom deployment* page, under *Project details*, enter the following information. 

    Screenshot of DDoS Mitigation Alert Enrichment template.

    | Setting | Value |
    | --- | --- |
    | Subscription | Select your Azure subscription. |
    | Resource Group | Select your Resource group. |
    | Region | Select your Region. |
    | Alert Name | Leave as default. |
    | Security Team Email | Enter the required email address. |
    | Company Domain | Enter the required domain. |
    | Workspace Name | Enter your workspace name. In this example, the *Workspace name* is **myLogAnalyticsWorkspace**. |

1. Select **Review + create** and then select **Create** after validation passes. 

## Clean up resources
You can keep your resources for the next guide. If no longer needed, delete the alerts.

1. In the search box at the top of the portal, enter **Alerts**. Select **Alerts** in the search results.

1. Select **Alert rules**, then in the Alert rules page, select your subscription.

1. Select the alerts created in this guide, then select **Delete**. 

## Next steps

In this tutorial you learned how to configure diagnostic alerts through Azure portal.

To test DDoS Protection through simulations, continue to the next guide.

> 
> [Test through simulations](test-through-simulations.md)
> [View alerts in Microsoft Defender for Cloud](ddos-view-alerts-defender-for-cloud.md)
