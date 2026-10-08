---
title: 'Quickstart: Deploy Azure API for FHIR using Azure CLI'
description: In this quickstart, you learn how to deploy Azure API for FHIR in Azure using the Azure CLI.
services: healthcare-apis
author: expekesheth
ms.service: azure-health-data-services
ms.subservice: fhir
ms.topic: quickstart
ms.date: 11/20/2025
ms.author: kesheth
ms.custom: devx-track-azurecli, mode-api
---

# Quickstart: Deploy Azure API for FHIR using Azure CLI


> **Important:**
> Microsoft deprecated Azure API for FHIR on **September 30, 2026**. For questions or assistance, create an Azure support request by using **Azure API for FHIR Extension Request**.


In this quickstart, you learn how to deploy Azure API for FHIR in Azure using the Azure CLI.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/healthcare-apis/azure-api-for-fhir/fhir-paas-cli-quickstart.md)

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/healthcare-apis/azure-api-for-fhir/fhir-paas-cli-quickstart.md)

## Add Azure Health Data Services (for example, HealthcareAPIs) extension

```azurecli-interactive
az extension add --name healthcareapis
```

To get a list of commands for HealthcareAPIs:

```azurecli-interactive
az healthcareapis --help
```

## Create Azure Resource Group

Pick a name for the resource group that contains the Azure API for FHIR and create it:

```azurecli-interactive
az group create --name "myResourceGroup" --location westus2
```

## Deploy the Azure API for FHIR

```azurecli-interactive
az healthcareapis create --resource-group myResourceGroup --name nameoffhiraccount --kind fhir-r4 --location westus2 
```

## Fetch FHIR API capability statement

Obtain a capability statement from the FHIR API with the following command:

```azurecli-interactive
curl --url "https://nameoffhiraccount.azurehealthcareapis.com/metadata"
```

## Clean up resources

If you're not going to continue to use this application, delete the resource group with the following steps.

```azurecli-interactive
az group delete --name "myResourceGroup"
```

## Next steps

In this quickstart guide, you deployed the Azure API for FHIR into your subscription. For information about how to register applications, and the Azure API for FHIR configuration settings, see the following.


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
