---
title: Deploy the FHIR service in Azure Health Data Services via Azure portal
description: Learn how to deploy the FHIR service in Azure Health Data Services by using the Azure portal. This article covers prerequisites, workspace deployment, service creation, and security settings.
author: EXPEkesheth
ms.service: azure-health-data-services
ms.topic: quickstart
ms.date: 02/23/2026
ms.author: kesheth
ms.custom:
  - mode-api
  - sfi-image-nochange
---

# Quickstart: Deploy the FHIR service via the Azure portal

In this quickstart, you learn how to create and deploy a FHIR service instance via the Azure portal. The Azure portal provides a web interface with guided workflows, making it an efficient tool for deploying the FHIR&reg; service. 

## Prerequisites

- An Azure subscription. If you don't have an Azure account, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

- An Azure Health Data Services workspace. To create and deploy a workspace, see [Deploy workspace in the Azure portal](../healthcare-apis-quickstart.md).

## Create and deploy a new FHIR service
 
1. Go to your Azure Health Data Services workspace resource.
1. On the menu, select **Services** > **FHIR service**.
1. Select **+ Add FHIR service**.
              
   - **Basics tab**: Give the FHIR service a friendly and unique name. Select the **FHIR version** (**STU3** or **R4**), and then choose **Next: Additional settings**.

     Screenshot showing how to create a FHIR service from the Basics tab.

   - **Additional settings tab (optional)**: This tab allows you to:
     - **View authentication settings**: The default configuration for the FHIR service is **Use Azure RBAC for assigning data plane roles**. When configured in this mode, the authority for the FHIR service is set to the Microsoft Entra tenant for the subscription.

     - **Integration with non-Microsoft Entra ID (optional)**: Use this option when you need to configure up to two more identity providers other than Microsoft Entra ID to authenticate and access FHIR resources with SMART on FHIR scopes.
    
     - **Setting versioning policy (optional)**: The versioning policy controls the history setting for FHIR service at the system level or individual resource type level. For more information, see [FHIR versioning policy and history management](fhir-versioning-policy-and-history-management.md). Choose **Next: Security**.

   - On the **Security settings** tab, review the fields. 

       By default, data is encrypted with Microsoft-managed keys. For more control over encryption keys, you can supply customer-managed keys to use for encryption of data. Customer-managed keys must be stored in an Azure Key Vault. You can either create your own keys and store them in a key vault, or use the Azure Key Vault APIs to generate keys. For more information, see [Configure customer-managed keys for the FHIR service](configure-customer-managed-keys.md). Choose **Next: Tags**. 

   - On the **Tags** tab (optional), enter any tags. 
   
     Tags are name and value pairs used for categorizing resources and aren't required. For more information, see [Use tags to organize your Azure resources and management hierarchy](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/tag-resources.md).

1. Choose **Review + Create** to begin the validation process. Wait until you receive confirmation that the deployment completed successfully. Review the confirmation screen, and then choose **Create** to begin the deployment. 

   The deployment process might take several minutes. When the deployment completes, you see a confirmation message.

   Screenshot showing successful deployment.

## Validate the deployment

From the deployment confirmation page, select **Go to resource**  Copy the **FHIR metadata endpoint** and paste in a browser to fetch the capability statement from your new FHIR service. 

## Clean up resources

To avoid incurring costs, you can delete unneeded resources by deleting the FHIR service, or its containing workspace or resource group.


## Next step

[Access the FHIR service](get-started-with-fhir.md#access-the-fhir-service)


> **Note:**
> FHIR&reg; is a registered trademark of [HL7](https://hl7.org/fhir/) and is used with the permission of HL7.
