---
title: 'Quickstart: Deploy Azure API for FHIR using Azure portal'
description: In this quickstart, you learn how to deploy Azure API for FHIR and configure settings using the Azure portal.
services: healthcare-apis
author: expekesheth
ms.service: azure-health-data-services
ms.subservice: fhir
ms.topic: quickstart 
ms.date: 11/20/2025
ms.author: kesheth
ms.custom:
  - mode-api
  - sfi-image-nochange
---

# Quickstart: Deploy Azure API for FHIR using Azure portal


> **Important:**
> Microsoft deprecated Azure API for FHIR on **September 30, 2026**. For questions or assistance, create an Azure support request by using **Azure API for FHIR Extension Request**.


In this quickstart, you learn how to deploy Azure API for FHIR using the Azure portal.

If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

## Create new resource

Open the [Azure portal](https://portal.azure.com) and select **Create a resource**

Create a resource

## Search for Azure API for FHIR

You can find Azure API for FHIR by typing "FHIR" into the search box:

Search for Azure Health Data Services

## Create Azure API for FHIR account

Select **Create** to create a new Azure API for FHIR account:

Create Azure API for FHIR account

## Enter account details

Select an existing resource group or create a new one. Choose a name for the account, and finally select **Review + create**:

New healthcare api details

Confirm creation and await FHIR API deployment.

## Additional settings (optional)

You can also select **Next: Additional settings** to view the authentication settings. The default configuration for the Azure API for FHIR is to [use Azure role-based access control (RBAC) for assigning data plane roles](configure-azure-rbac.md). When configured in this mode, the "Authority" for the FHIR service is set to the Microsoft Entra tenant of the subscription.

Default Authentication settings

Notice that the box for entering allowed object IDs is grayed out, since we use Azure RBAC for configuring role assignments in this case.

If you wish to configure the FHIR service to use an external or secondary Microsoft Entra tenant, you can change the Authority and enter object IDs for users and groups that should be allowed access to the server. For more information, see the [local RBAC configuration](configure-local-rbac.md) guide.

## Fetch FHIR API capability statement

To validate that the new FHIR API account is provisioned, fetch a capability statement by pointing a browser to `https://<ACCOUNT-NAME>.azurehealthcareapis.com/metadata`.

## Clean up resources

When no longer needed, you can delete the resource group, Azure API for FHIR, and all related resources. To do so, select the resource group containing the Azure API for FHIR account, select **Delete resource group**, then confirm the name of the resource group to delete.

## Next steps

In this quickstart guide, you deployed the Azure API for FHIR into your subscription. For information about how to register applications and the Azure API for FHIR configuration settings, see


>
>[Register Applications Overview](fhir-app-registration.md)

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
