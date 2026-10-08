---
title: InvalidNetworkSecurityGroupSecurityRules error - Azure HDInsight
description: Cluster Creation Fails with the ErrorCode InvalidNetworkSecurityGroupSecurityRules
ms.service: azure-hdinsight
ms.topic: troubleshooting
author: hareshg
ms.author: hgowrisankar
ms.reviewer: nijelsf
ms.date: 07/12/2024
---

# Scenario: InvalidNetworkSecurityGroupSecurityRules - cluster creation fails in Azure HDInsight

This article describes troubleshooting steps and possible resolutions for issues when interacting with Azure HDInsight clusters.

## Issue

You receive error code `InvalidNetworkSecurityGroupSecurityRules` with a description similar to "The security rules in the Network Security Group configured with subnet does not allow required inbound and/or outbound connectivity."

## Cause

Likely an issue with the inbound [network security group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/virtual-network-vnet-plan-design-arm.md) rules configured for your cluster.

## Resolution

Go to the Azure portal and identify the NSG that is associated with the subnet where the cluster is being deployed. In the **Inbound security rules** section, make sure the rules allow inbound access to port 443 for the IP addresses mentioned [here](../control-network-traffic.md).

## Next steps


If you didn't see your problem or are unable to solve your issue, visit one of the following channels for more support:

* Get answers from Azure experts through [Azure Community Support](https://azure.microsoft.com/support/community/).

* Connect with [@AzureSupport](https://x.com/azuresupport) - the official Microsoft Azure account for improving customer experience. Connecting the Azure community to the right resources: answers, support, and experts.

* If you need more help, you can submit a support request from the [Azure portal](https://portal.azure.com/?#blade/Microsoft_Azure_Support/HelpAndSupportBlade/). Select **Support** from the menu bar or open the **Help + support** hub. For more detailed information, review [How to create an Azure support request](https://learn.microsoft.com/azure/azure-portal/supportability/how-to-create-azure-support-request). Access to Subscription Management and billing support is included with your Microsoft Azure subscription, and Technical Support is provided through one of the [Azure Support Plans](https://azure.microsoft.com/support/plans/).
