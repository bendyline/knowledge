---
title: "Azure CLI example: Deploy custom domain in Azure Front Door"
description: Use this Azure CLI example script to deploy a Custom Domain name and TLS certificate on an Azure Front Door front-end.
author: halkazwini
ms.author: halkazwini
ms.service: azure-frontdoor
ms.topic: sample
ms.date: 05/04/2026
ms.devlang: azurecli
ms.custom: devx-track-azurecli
---

# Azure Front Door: Deploy custom domain

**Applies to:** :heavy_check_mark: Front Door (classic)

> **Important:**
> Azure Front Door (classic) retires on **March 31, 2027**. Because the service is retiring, it no longer supports profile creation, new domain onboarding, or managed certificates. To avoid service disruption, ⁠[**migrate to Azure Front Door Standard or Premium**](../migrate-tier.md). For more information, see ⁠[**Azure Front Door (classic) retirement**](https://azure.microsoft.com/updates?id=azure-front-door-classic-will-be-retired-on-31-march-2027).

This Azure CLI script example demonstrates how to deploy a custom domain name and TLS certificate on an Azure Front Door front-end. The script automates the provisioning of Azure Front Door with a custom domain name (hosted by Azure DNS) and a TLS certificate.

> **Important:**
> Ensure that an Azure DNS public zone already exists for your domain name. For a tutorial, see [Host your domain in Azure DNS](../../dns/dns-delegate-domain-azure-dns.md).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/frontdoor/scripts/custom-domain.md)

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/frontdoor/scripts/custom-domain.md)

## Sample script

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/cli-launch-cloud-shell-sign-in.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/frontdoor/scripts/custom-domain.md)

### Getting started

The script:

1. Creates a resource group.
1. Creates a storage account to host a single-page application (SPA).
1. Enables SPA hosting on the storage account.
1. Uploads a "Hello world!" `index.html` file.
1. Creates a Front Door profile.
1. Creates a DNS alias for the Apex that resolves to the Front Door.
1. Creates a CNAME for the `adverify` hostname.
1. Creates a Front Door front-end endpoint for the custom domain.
1. Adds a route from the custom domain front-end to the SPA origin.
1. Adds a routing rule to redirect HTTP to HTTPS.
1. Enables HTTPS with a Front Door managed certificate.

### Run the script

To run this script, copy the following code to a `.sh` file, change the hardcoded variables to your domain values, and then execute the following command to pass these variables into the script:

```sh
AZURE_DNS_ZONE_NAME=www.contoso.com AZURE_DNS_ZONE_RESOURCE_GROUP=contoso-rg ./deploy-custom-apex-domain.sh
```

[Code reference unavailable in this source snapshot: ~/azure_cli_scripts/azure-front-door/deploy-custom-domain/deploy-custom-domain.sh](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/frontdoor/scripts/custom-domain.md)

## Clean up resources

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/cli-clean-up-resources.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/frontdoor/scripts/custom-domain.md)

```azurecli
az group delete --name $resourceGroup
```

## Sample reference

This script uses the following commands. Each command in the table links to command-specific documentation.

| Command | Description |
| --- | --- |
| [az group create](https://learn.microsoft.com/cli/azure/group#az-group-create) | Creates a resource group to store all resources. |
| [az storage account create](https://learn.microsoft.com/cli/azure/storage/account) | Creates an Azure Storage account in the specified resource group. |
| [az storage blob service-properties update](https://learn.microsoft.com/cli/azure/storage/blob/service-properties#az-storage-blob-service-properties-update) | Updates storage blob service properties. |
| [az storage blob upload](https://learn.microsoft.com/cli/azure/storage/blob#az-storage-blob-upload) | Uploads a blob to a container. |
| [az storage account show](https://learn.microsoft.com/cli/azure/storage/account#az-storage-account-show) | Shows storage account properties. |
| [az network front-door create](https://learn.microsoft.com/cli/azure/network/front-door#az-network-front-door-create) | Creates a Front Door. |
| [az network dns record-set](https://learn.microsoft.com/cli/azure/network/dns/record-set) | Manages DNS records and record sets. |
| [az network front-door](https://learn.microsoft.com/cli/azure/network/front-door) | Manages Front Doors. |
