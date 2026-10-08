---
title: Debug issues with the SAP CDC connector by sending logs
titleSuffix: Azure Data Factory
description: Learn how to debug issues with the Azure Data Factory SAP CDC (change data capture) connector by sending self-hosted integration runtime logs to Microsoft.
author: ukchrist
ms.subservice: data-movement
ms.topic: troubleshooting-general
ms.date: 05/15/2024
ms.author: ulrichchrist
ms.custom: sfi-image-nochange
---

# Debug issues with the SAP CDC connector by sending self-hosted integration runtime logs

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


If you want Microsoft to debug Azure Data Factory issues with your SAP CDC connector, send us your self-hosted integration runtime logs, and then contact us.

## Send logs to Microsoft

1. On the computer running the self-hosted integration runtime, open Microsoft Integration Runtime Configuration Manager.

1. Select the **Diagnostics** tab. Under **Logging**, select **Send logs**.

   Screenshot of the Integration Runtime Configuration Manager Diagnostics tab, with Send logs highlighted.

1. Enter or select the information that's requested, and then select **Send logs**.

## Contact Microsoft support

After you've uploaded and sent your self-hosted integration runtime logs, contact Microsoft support. In your support request, include the Report ID and Timestamp values that are shown in the confirmation:

Screenshot of the self-hosted integration runtime's diagnostic log confirmation, with Report ID and Timestamp highlighted.

## Related content

[SAP CDC (Change Data Capture) Connector](connector-sap-change-data-capture.md)
