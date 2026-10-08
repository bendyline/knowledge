---
title: Configure Azure role-based access control (Azure RBAC) for Azure API for FHIR
description: This article describes how to configure Azure RBAC for the Azure API for FHIR data plane
author: expekesheth
ms.service: azure-health-data-services
ms.subservice: fhir
ms.topic: reference 
ms.date: 10/10/2025
ms.author: kesheth
ms.custom: sfi-image-nochange
---

# Configure Azure RBAC for FHIR 


> **Important:**
> Microsoft deprecated Azure API for FHIR on **September 30, 2026**. For questions or assistance, create an Azure support request by using **Azure API for FHIR Extension Request**.


In this article, you learn how to use [Azure role-based access control (Azure RBAC)](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/index.yml) to assign access to the Azure API for FHIR&reg; data plane. Azure RBAC is the preferred methods for assigning data plane access when data plane users are managed in the Microsoft Entra tenant associated with your Azure subscription. If you're using an external Microsoft Entra tenant, refer to the [local RBAC assignment reference](configure-local-rbac.md).

## Confirm Azure RBAC mode

To use Azure RBAC, your Azure API for FHIR must be configured to use your Azure subscription tenant for data plane, and there should be no assigned identity object IDs. You can verify your settings by inspecting the **Authentication** of your Azure API for FHIR:

Confirm Azure RBAC mode

The **Authority** should be set to the Microsoft Entra tenant associated with your subscription and there should be no GUIDs in the box labeled **Allowed object IDs**. Notice the box is disabled and a label indicates that Azure RBAC should be used to assign data plane roles.

## Assign roles

To grant users, service principals, or groups access to the FHIR data plane, select **Access control (IAM)**, then select **Role assignments** and select **+ Add**.

Add Azure role assignment

In the **Role** selection, search for one of the built-in roles for the FHIR data plane.

Built-in FHIR data roles

You can choose from among the following.

* FHIR Data Reader: Can read (and search) FHIR data
* FHIR Data Writer: Can read, write, and soft delete FHIR data
* FHIR Data Exporter: Can read and export (`$export` operator) data
* FHIR Data Contributor: Can perform all data plane operations

In the **Select** box, search for a user, service principal, or group that you wish to assign the role to.

>**Note:**
>Make sure that the client application registration is completed. See details on [application registration](register-confidential-azure-ad-client-app.md)
>If OAuth 2.0 authorization code grant type is used, grant the same FHIR application role to the user. If OAuth 2.0 client credentials grant type is used, this step is not required.

## Caching behavior

The Azure API for FHIR caches decisions for up to 5 minutes. If you grant a user access to the FHIR server by adding them to the list of allowed object IDs, or you remove them from the list, you should expect it to take up to five minutes for changes in permissions to propagate.

## Next steps

In this article, you learned how to assign Azure roles for the FHIR data plane. For information about Azure API for FHIR configuration settings, see

>
>[Configure Azure RBAC](configure-azure-rbac.md)

>
>[Configure local RBAC](configure-local-rbac.md)

>
>[Configure database settings](configure-database.md)

>
>[Configure customer-managed keys](customer-managed-key.md)

>
>[Configure CORS](configure-cross-origin-resource-sharing.md)

>
>[Configure Private Link](configure-private-link.md)


> **Note:**
> FHIR&reg; is a registered trademark of [HL7](https://hl7.org/fhir/) and is used with the permission of HL7.
