---
title: Sqoop import/export command fails for some users in ESP clusters - Azure HDInsight
description: Sqoop import/export command fails.
ms.service: azure-hdinsight
ms.custom: devx-track-extended-java
ms.topic: troubleshooting
author: hareshg
ms.author: hgowrisankar
ms.reviewer: nijelsf
ms.date: 05/23/2024
---

# Scenario: Sqoop import/export command fails for usernames greater than 20 characters in Azure HDInsight ESP clusters

This article describes a known issue and workaround when using Azure HDInsight ESP (Enterprise Security Pack) enabled clusters using ADLS Gen2 (ABFS) storage account.

'Apache Sqoop import/export command fails with "Import Failed: java.io.IOException: The ownership on the staging directory /user/yourusername/.staging isn't as expected" error for some users in Azure HDInsight ESP cluster'
## Issue

When you run sqoop import/export command, it fails with the error for some users

```
ERROR tool.ImportTool: Import failed: java.io.IOException:
The ownership on the staging directory /user/yourlongdomainuserna/.staging isn't as expected. 
It is owned by yourlongdomainusername.
The directory must be owned by the submitter yourlongdomainuserna or yourlongdomainuserna@AADDS.CONTOSO.COM
```

In the example, `/user/yourlongdomainuserna/.staging` displays the truncated 20 character username for the username `yourlongdomainusername`.

## Cause

The length of the username exceeds 20 characters in length. 

Refer to [How objects and credentials are synchronized in a Microsoft Entra Domain Services managed domain](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory-domain-services/synchronization.md) for further details.

## Workaround

Use a username less than or equals to 20 characters.

## Next steps


If you didn't see your problem or are unable to solve your issue, visit one of the following channels for more support:

* Get answers from Azure experts through [Azure Community Support](https://azure.microsoft.com/support/community/).

* Connect with [@AzureSupport](https://x.com/azuresupport) - the official Microsoft Azure account for improving customer experience. Connecting the Azure community to the right resources: answers, support, and experts.

* If you need more help, you can submit a support request from the [Azure portal](https://portal.azure.com/?#blade/Microsoft_Azure_Support/HelpAndSupportBlade/). Select **Support** from the menu bar or open the **Help + support** hub. For more detailed information, review [How to create an Azure support request](https://learn.microsoft.com/azure/azure-portal/supportability/how-to-create-azure-support-request). Access to Subscription Management and billing support is included with your Microsoft Azure subscription, and Technical Support is provided through one of the [Azure Support Plans](https://azure.microsoft.com/support/plans/).
