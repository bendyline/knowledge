---
title: ISV solution framework in Azure Data Manager for Agriculture
description: Learn about solutions that ISVs build on top of Azure Data Manager for Agriculture. 
author: BlackRider97
ms.author: ramithar
ms.service: azure-data-manager-agriculture
ms.topic: overview
ms.date: 02/14/2023
ms.custom: template-concept
---

# ISV solution framework in Azure Data Manager for Agriculture

In this article, you learn how Azure Data Manager for Agriculture provides a framework for customers to use solutions built by Bayer and other independent software vendor (ISV) partners.


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


## Overview

The agriculture industry is going through a significant technology transformation. Technology is playing a key role in building sustainable agriculture.

The adoption of technology like drones, satellite imagery, and Internet of Things (IoT) devices has increased. These source systems generate large volumes of data that's stored in the cloud. Companies want to efficiently manage this data and derive actionable insights that they can use to achieve more with less.

Azure Data Manager for Agriculture provides a core technology platform that hides all the technical complexity and helps customers focus on building their core business logic and drive business value.

The solution framework is built on top of Azure Data Manager for Agriculture to provide extensibility.

Diagram that shows the solution framework relates to Azure Data Manager for Agriculture, solutions from independent software vendors, and customers.

The solution framework:

* Enables ISV partners to apply their deep domain knowledge and build industry-specific solutions on top of Azure Data Manager for Agriculture.
* Helps ISV partners generate revenue by monetizing their solutions and publishing them on Azure Marketplace.
* Provides a simplified onboarding experience for ISV partners and customers.
* Offers integration that's based on asynchronous APIs.
* Complies with data privacy standards to help ensure that ISV partners and customers have the right level of access.

## Use cases

Here are a few examples of how an ISV partner could use the solution framework to build an industry-specific solution:

* **Yield prediction model**: Build a yield model by using historical data for a specific geometry, forecast estimated crop yield for the upcoming season, and track progress.
* **Carbon emission model**: Estimate the amount of carbon emitted from a field based on imagery and sensor data for a particular farm.
* **Crop identification**: Use imagery data to identify crops growing in an area of interest.

An ISV partner can come up with its own specific scenario and build a solution.

## Bayer AgPowered Services

Bayer built the following solutions in partnership with Microsoft. A customer can install them on top of an Azure Data Manager for Agriculture instance.

* Growing Degree Days
* Crop Water Usage Maps
* Biomass Variability

To install the preceding solutions, see the [article about working with ISV solutions](how-to-set-up-isv-solution.md).

## Next steps

* [Test the Azure Data Manager for Agriculture REST APIs](https://learn.microsoft.com/rest/api/data-manager-for-agri)
