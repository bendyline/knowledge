---
title: Configure Azure RBAC for the DICOM service - Azure Health Data Services
description: This article describes how to configure Azure RBAC for the DICOM service
author: varunbms
ms.service: azure-health-data-services
ms.topic: how-to 
ms.date: 06/15/2025
ms.author: buchvarun
---

# Configure Azure RBAC for the DICOM service

In this article, you'll learn how to use [Azure role-based access control (Azure RBAC)](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/index.yml) to assign access to the DICOM&reg; service. 

## Assign roles

To grant users, service principals, or groups access to the DICOM data plane, select the **Access control (IAM)** blade. Select the **Role assignments** tab, and select **+ Add**.

[Screenshot of DICOM access control.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/healthcare-apis/dicom/media/dicom-access-control.png#lightbox)


In the **Role** selection, search for one of the built-in roles for the DICOM data plane:

[Screenshot of add RBAC role assignment.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/healthcare-apis/dicom/media/rbac-add-role-assignment.png#lightbox)

You can choose between:

* DICOM Data Owner:  Full access to DICOM data.
* DICOM Data Reader: Read and search DICOM data.

If these roles aren't sufficient for your need, you can use PowerShell to create custom roles. For information about creating custom roles, see [Create a custom role using Azure PowerShell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/tutorial-custom-role-powershell.md).

In the **Select** box, search for a user, service principal, or group that you want to assign the role to.

## Caching behavior

The DICOM service will cache decisions for up to five minutes. If you grant a user access to the DICOM service by adding them to the list of allowed object IDs, or you remove them from the list, you should expect it to take up to five minutes for changes in permissions to propagate.


> **Note:**
> [DICOM&reg;](https://www.dicomstandard.org/) is the registered trademark of the National Electrical Manufacturers Association for its Standards publications relating to digital communications of medical information.
