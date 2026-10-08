---
title: Troubleshoot the Hive connector
titleSuffix: Azure Data Factory & Azure Synapse
description: Learn how to troubleshoot issues with the Hive connector in Azure Data Factory and Azure Synapse Analytics. 
author: simplywilson
ms.subservice: data-movement
ms.topic: troubleshooting
ms.date: 10/20/2023
ms.author: tinglee
ms.custom: has-adal-ref, synapse
---

# Troubleshoot the Hive connector in Azure Data Factory and Azure Synapse

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


This article provides suggestions to troubleshoot common problems with the Hive connector in Azure Data Factory and Azure Synapse.

## The performance difference between the ODBC connector and the Hive connector

- **Symptoms**: The concern about the performance difference between the ODBC connector and the Hive connector. 

- **Cause**: The ODBC connector needs its own driver, which may cause the performance difference due to the third-party driver quality.

- **Recommendation**: Use the Hive connector firstly. 


## Unexpected response received from the server when connecting to the Hive server via ODBC

- **Symptoms**: When connecting to the Hive server using ODBC linked service, you meet this error message: `ERROR [HY000] [Cloudera][DriverSupport] (1110) Unexpected response received from server. Please ensure the server host and port specified for the connection are correct and confirm if SSL should be enabled for the connection.`

- **Cause**: You use the Kerberos authentication that is not supported in Azure Data Factory.

- **Recommendation**: Try the following steps. If they do not work, check the provided driver to resolve this issue.
    1. The **krb5.ini** file is in the **C:\Program Files\MIT\Kerberos\bin** folder.
    2. Add the `KRB5_CONFIG` and `KRB5CCNAME` to the system variable as well.
    3. Edit the **krb5.ini** file.
    4. Shut down and restart the VM and the SHIR from the machine.

## Related content

For more troubleshooting help, try these resources:

- [Connector troubleshooting guide](connector-troubleshoot-guide.md)
- [Data Factory blog](https://techcommunity.microsoft.com/t5/azure-data-factory-blog/bg-p/AzureDataFactoryBlog)
- [Data Factory feature requests](https://learn.microsoft.com/answers/topics/azure-data-factory.html)
- [Azure videos](https://learn.microsoft.com/shows/data-exposed/?products=azure\&terms=data-factory)
- [Microsoft Q\&A page](https://learn.microsoft.com/answers/topics/azure-data-factory.html)
- [Stack Overflow forum for Data Factory](https://stackoverflow.com/questions/tagged/azure-data-factory)
- [X information about Data Factory](https://x.com/hashtag/DataFactory)
