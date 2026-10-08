---
title: Troubleshoot the Google Ads connector
titleSuffix: Azure Data Factory & Azure Synapse
description: Learn how to troubleshoot issues with the Google Ads connector in Azure Data Factory and Azure Synapse Analytics. 
author: simplywilson
ms.subservice: data-movement
ms.topic: troubleshooting
ms.date: 01/19/2024
ms.author: tinglee
ms.custom: has-adal-ref, synapse
---

# Troubleshoot the Google Ads connector in Azure Data Factory and Azure Synapse

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


This article provides suggestions to troubleshoot common problems with the Google Ads connector in Azure Data Factory and Azure Synapse.

## Error code: DeprecatedGoogleAdsLegacyDriverVersion 

- **Message**: `The Google Ads connector’s legacy driver has been deprecated. To ensure your pipeline works, please upgrade the driver version of Google Ads linked service. Detailed instructions can be found in this documentation: https://learn.microsoft.com/azure/data-factory/connector-google-adwords?tabs=data-factory#upgrade-the-google-ads-driver-version`

- **Cause**: Your pipeline is still running on a legacy Google Ads connector's driver.

- **Resolution**: Upgrade your Google Ads linked service's driver version to the Recommended version. Refer to this [article](connector-google-adwords.md#upgrade-the-google-ads-driver-version).
    

## Error code: DeprecatedGoogleAdWordsOdbcConnector 

- **Message**: `The Google AdWords connector has been deprecated. To ensure your pipeline works, please create a new Google Ads linked service. Detailed instructions can be found in this documentation: https://learn.microsoft.com/azure/data-factory/connector-google-adwords#upgrade-google-adwords-connector-to-google-ads-connector`

- **Cause**: Your pipeline is still running on a deprecated Google AdWords connector. 

- **Resolution**: Create a new Google Ads linked service. Refer to this [article](connector-google-adwords.md#upgrade-google-adwords-connector-to-google-ads-connector). 

## Related content

For more troubleshooting help, try these resources:

- [Connector troubleshooting guide](connector-troubleshoot-guide.md)
- [Data Factory blog](https://techcommunity.microsoft.com/t5/azure-data-factory-blog/bg-p/AzureDataFactoryBlog)
- [Data Factory feature requests](https://learn.microsoft.com/answers/topics/azure-data-factory.html)
- [Azure videos](https://learn.microsoft.com/shows/data-exposed/?products=azure\&terms=data-factory)
- [Microsoft Q\&A page](https://learn.microsoft.com/answers/topics/azure-data-factory.html)
- [Stack Overflow forum for Data Factory](https://stackoverflow.com/questions/tagged/azure-data-factory)
- [X information about Data Factory](https://x.com/hashtag/DataFactory)
