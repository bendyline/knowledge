---
title: Get access token using Azure CLI - Azure API for FHIR
description: This article explains how to obtain an access token for Azure API for FHIR using the Azure CLI.
services: healthcare-apis
author: expekesheth
ms.service: azure-health-data-services
ms.subservice: fhir
ms.custom: devx-track-azurecli
ms.topic: how-to
ms.date: 11/21/2025
ms.author: kesheth
---

# Get access token for Azure API for FHIR using Azure CLI


> **Important:**
> Microsoft deprecated Azure API for FHIR on **September 30, 2026**. For questions or assistance, create an Azure support request by using **Azure API for FHIR Extension Request**.


In this article, you learn how to obtain an access token for the Azure API for FHIR&reg; using the Azure CLI. When you [provision the Azure API for FHIR](fhir-paas-portal-quickstart.md), you configure a set of users or service principals that have access to the service. If your user object ID is in the list of allowed object IDs, you can access the service using a token obtained using the Azure CLI.

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/healthcare-apis/azure-api-for-fhir/get-healthcare-apis-access-token-cli.md)

## Obtain a token

The Azure API for FHIR uses a `resource`  or `Audience` with a URI equal to the URI of the FHIR server `https://<FHIR ACCOUNT NAME>.azurehealthcareapis.com`. You can obtain a token and store it in a variable (named `$token`) with the following command.

```azurecli-interactive
$token=$(az account get-access-token --resource=https://<FHIR ACCOUNT NAME>.azurehealthcareapis.com --query accessToken --output tsv)
```

## Use with Azure API for FHIR

```azurecli-interactive
curl -X GET --header "Authorization: Bearer $token" https://<FHIR ACCOUNT NAME>.azurehealthcareapis.com/Patient
```

## Next steps

In this article, you learned how to obtain an access token for the Azure API for FHIR using the Azure CLI. To learn how to access the FHIR API using REST Client:

>
>[Access the FHIR service using REST Client](../fhir/using-rest-client.md)


> **Note:**
> FHIR&reg; is a registered trademark of [HL7](https://hl7.org/fhir/) and is used with the permission of HL7.
