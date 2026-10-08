---
title: Work with farm activities data in Azure Data Manager for Agriculture
description: Learn how to integrate with data providers for farm activities and ingest data into Azure Data Manager for Agriculture. 
author: BlackRider97
ms.author: ramithar
ms.service: azure-data-manager-agriculture
ms.topic: concept-article
ms.date: 08/14/2023
ms.custom: template-concept
---
# Work with farm activities data in Azure Data Manager for Agriculture

Data about farm activities is one of the most important ground-truth datasets in precision agriculture. These machine-generated reports preserve the record of exactly what happened and when. That record can help improve in-field practice and the downstream value-chain analytics.

Azure Data Manager for Agriculture supports both:

* **Summary data**: Entered as properties directly in the operation data item.
* **Precision data**: Uploaded as an attachment file (for example, .shp, .dat, or .isoxml) and reference linked to the operation data item.

New operation data can be pushed into the service via the APIs for operation and attachment creation. Or, if the desired source is in the supported list of original equipment manufacturer (OEM) connectors, data can be synced automatically from providers like Climate FieldView with an ingestion job for farm operations.


> **Important:**
> **Microsoft Azure Data Manager for Agriculture (Preview) will be retired on September 1, 2025.**
>
> If you are actively using Azure Data Manager for Agriculture (Preview), we recommend that you pause new development and begin transition planning as soon as possible. **This preview no longer receives functional or security updates**. 
>
> Microsoft doesn't retain copies of your data. Extract your data as soon as possible; Microsoft will delete it 30 days after the retirement date. 
>
> Thank you for engaging with Azure Data Manager for Agriculture (Preview) and for leading with innovation during this early phase. 
>
> Have questions? Get answers from community experts in [Microsoft Q\&A](https://learn.microsoft.com/answers/tags/133/azure). If you have a support plan and need technical help, [create a support request](https://learn.microsoft.com/azure/azure-portal/supportability/how-to-create-azure-support-request). 


Azure Data Manager for Agriculture supports a range of data about farm activities. For more information, see [What is Azure Data Manager for Agriculture?](https://learn.microsoft.com/rest/api/data-manager-for-agri)

## Integration with manufacturers of farm equipment

Azure Data Manager for Agriculture fetches the associated data about farm activities (planting, application, tillage, and harvest) from the data provider (for example, Climate FieldView) by creating a data ingestion job for farm activities. For more information, see [Working with farm activities and activity data in Azure Data Manager for Agriculture](how-to-ingest-and-egress-farm-operations-data.md).

## Next steps

* [Test the Azure Data Manager for Agriculture REST APIs](https://learn.microsoft.com/rest/api/data-manager-for-agri)
