---
title: Configure Azure RBAC role for Azure Health Data Services
description: Learn how to configure Azure RBAC for FHIR and DICOM services in Azure Health Data Services. Assign roles and manage access to your data plane.
author: chachachachami
ms.service: azure-health-data-services
ms.topic: how-to
ms.date: 03/27/2026
ms.author: chrupa
ms.reviewer: v-catheribun
ms.custom: sfi-image-nochange
---
# Configure Azure RBAC roles for Azure Health Data Services

In this article, you learn how to use [Azure role-based access control (RBAC)](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/index.yml) to assign permissions to the FHIR and DICOM service instances in Azure Health Data Services. 

Azure RBAC is an authorization system built on Azure Resource Manager that provides fine-grained access management of Azure resources. By using Azure RBAC, you can manage who has access to Azure resources, what they can do with those resources, and what areas they have access to.

You can manage role assignments in the Azure portal for the FHIR&reg; service and DICOM&reg; service. 

## RBAC roles for the FHIR and DICOM services

Azure Health Data Services provides built-in roles for the FHIR and DICOM services. These roles provide granular access control to the data plane of each service. 

The built-in roles for the FHIR service include:

* **FHIR Data Reader**: Can read and search FHIR data.
* **FHIR Data Writer**: Can read, write, and soft delete FHIR data.
* **FHIR Data Exporter**: Can read and export data by using the $export operator.
* **FHIR Data Contributor**: Can perform all data plane operations.
* **FHIR Data Converter**: Can use the converter to perform data conversion.
* **FHIR SMART User**: Can read and write FHIR data according to the SMART IG V1.0.0 specifications.


The built-in roles for the DICOM service include:
* **DICOM Data Owner**:  Full access to DICOM data.
* **DICOM Data Reader**: Can read and search DICOM data.

## Assign roles for the FHIR and DICOM services

Assign roles to users, service principals, or groups to grant them access to the FHIR and DICOM services. 

For the DICOM service, an application also must have the appropriate API permissions to access the DICOM service. For more information, see [Register a client application in Microsoft Entra ID for the Azure Health Data Services](register-application.md).

1. Go to your FHIR or DICOM service in the Azure portal.
1. Select **Access control (IAM)**.
1. Select **+ Add** > **Add role assignment**. 
1. Enter *DICOM* or *FHIR* in the search box, select one of the built-in roles for the service, and then select **Next**.

    Screenshot of adding an Azure RBAC role assignment in the Azure portal.

1. On the **Members** tab, for **Assign access to**, select **User, group, or service principal**.
1. Select **+ Select members** to search for a user, service principal, or group that you want to assign the role to. After you make your selection, select **Select**.

    Screenshot of selecting members for an Azure RBAC role assignment.

1. Select **Review + assign** to take you to the **Review and assign** tab.  Review your selections, and then select **Review and assign** to finish the role assignment.

    Screenshot of reviewing and assigning an Azure RBAC role.

To view your role assignments, select the **Role assignments** tab from the **Access control (IAM)** menu option.

Screenshot of viewing Azure RBAC role assignments in the Azure portal.

From this tab, you can select any role assignment to view more details about the assignment. You can also delete a role assignment from this tab by selecting the role assignment, and then selecting **Delete**.

> **Note:**
> If you can't access the FHIR or DICOM service in your application or other tools, you might need to wait a few more minutes for the role assignment to finish propagating in the system.

## Next step

>
>[Access Azure Health Data Services](access-healthcare-apis.md)


> **Note:**
> FHIR&reg; is a registered trademark of [HL7](https://hl7.org/fhir/) and is used with the permission of HL7. 
>
> [DICOM&reg;](https://www.dicomstandard.org/) is the registered trademark of the National Electrical Manufacturers Association for its Standards publications relating to digital communications of medical information.
