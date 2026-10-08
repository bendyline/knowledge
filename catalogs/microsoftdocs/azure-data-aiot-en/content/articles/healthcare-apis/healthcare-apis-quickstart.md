---
title: Azure Health Data Services quickstart
description: Learn how to create a workspace for Azure Health Data Services by using the Azure portal. The workspace is a centralized logical container for instances of the FHIR service and DICOM service.
author: EXPEkesheth
ms.service: azure-health-data-services
ms.subservice: workspace
ms.topic: quickstart
ms.date: 02/25/2026
ms.author: kesheth
ms.custom:
  - mode-api
  - sfi-image-nochange
---

# Quickstart: Azure Health Data Services

Follow the steps in this article to create a workspace before you deploy instances of Azure Health Data Services in the Azure portal. The workspace is a centralized logical container for Azure Health Data services such as FHIR&reg; and DICOM&reg; services. It allows you to organize and manage configuration settings that are shared among all the underlying datasets and services.

## Prerequisites

Before you create a workspace in the Azure portal, you need an Azure account subscription. For more information, see [Create your free Azure account today](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

## Create a resource

1. In the Azure portal, select **Create a resource**.

   Screenshot showing resource creation.

1. In the search box, enter **Azure Health Data Services**.

   Screenshot showing how to search for Azure Health Data Services.

1. Choose **Create** to create an Azure Health Data Services account.

   Screenshot showing how to create a new account.

1. On the **Basics** tab, under **Project details**, from the dropdown lists select a **Subscription** and **Resource group**.  

1. Choose **Create new** to create a new resource group.

   Screenshot showing the workspace settings on the Basics tab.
   
1. Enter a **Name** for the workspace, and then select a **Region**. The name must be 3 to 24 alphanumeric characters, all lowercase. Don't use a hyphen "-" as it's an invalid character for the name. For information about regions and availability zones, see [Regions and Availability Zones in Azure](https://learn.microsoft.com/azure/reliability/availability-zones-overview).

1. Select **Next: Networking >**. Connect a workspace publicly with the default **Public endpoint (all networks)** option selected. You can also connect a workspace using a private endpoint by selecting the **Private endpoint** option. For more information about accessing Azure Health Data Services over a private endpoint, see [Configure Private Link for Azure Health Data Services](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/healthcare-apis/healthcare-apis-configure-private-link.md).

   Screenshot showing the Networking tab.
  
1. Select **Next: Tags >** if you want to include name and value pairs to categorize resources and view consolidated billing by applying the same tag to multiple resources and resource groups. Enter a **Name** and **Value** for the workspace, and then select **Review + create** or **Next: Review + create**. For more information about tags, see [Use tags to organize your Azure resources and management hierarchy](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/tag-resources.md).

   Screenshot showing the Tags tab.

1. Review the details. Choose **Create** if you don't need to make any changes to the workspace project and instance details. If you need to make changes to the project and instance details, select **Previous**.

   Screenshot showing details about the workspace.

      **Optional**: Select **Download a template for automation** of the newly created workspace.

1. To see your newly deployed workspace, select **Go to resource** after the workspace deployment process is complete.

   Screenshot showing the workspace and the Go to resource button.


## Next steps

Select the following articles to create a new service instance in your workspace.

[Deploy the FHIR service](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/healthcare-apis/fhir/fhir-portal-quickstart.md)

[Deploy the DICOM service](dicom/deploy-dicom-services-in-azure.md)

[Convert data to FHIR format](fhir/convert-data-overview.md)


> **Note:**
> FHIR&reg; is a registered trademark of [HL7](https://hl7.org/fhir/) and is used with the permission of HL7. 
>
> [DICOM&reg;](https://www.dicomstandard.org/) is the registered trademark of the National Electrical Manufacturers Association for its Standards publications relating to digital communications of medical information.
