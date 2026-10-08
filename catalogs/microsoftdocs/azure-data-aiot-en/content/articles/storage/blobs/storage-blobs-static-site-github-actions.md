---
title: Use GitHub Actions to deploy a static site to Azure Storage
description: Azure Storage static website hosting with GitHub Actions
author: stevenmatthew
ms.service: azure-blob-storage
ms.topic: how-to
ms.author: shaas
ms.reviewer: dineshm
ms.date: 02/12/2025
ms.custom: devx-track-javascript, github-actions-azure, devx-track-azurecli
# Customer intent: As a web developer, I want to set up a GitHub Actions workflow for deploying my static website to Azure Storage, so that I can automate updates and improve deployment efficiency every time I push changes to my GitHub repository.
---

# Use GitHub Actions workflow to deploy your static website in Azure Storage

Get started with [GitHub Actions](https://docs.github.com/en/actions) by using a workflow to deploy a static site to an Azure storage account. Once you have set up a GitHub Actions workflow, you will be able to automatically deploy your site to Azure from GitHub when you make changes to your site's code.

> **Note:**
> If you are using [Azure Static Web Apps](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/static-web-apps/index.yml), then you do not need to manually set up a GitHub Actions workflow.
> Azure Static Web Apps automatically creates a GitHub Actions workflow for you.

## Prerequisites

An Azure subscription and GitHub account.

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A GitHub repository with your static website code. If you do not have a GitHub account, [sign up for free](https://github.com/join).
- A working static website hosted in Azure Storage. Learn how to [host a static website in Azure Storage](storage-blob-static-website-how-to.md). To follow this example, you should also deploy [Azure CDN](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/static-website-content-delivery-network.md).

> **Note:**
> It's common to use a content delivery network (CDN) to reduce latency to your users around the globe and to reduce the number of transactions to your storage account. Deploying static content to a cloud-based storage service can reduce the need for potentially expensive compute instance. For more information, see [Static Content Hosting pattern](https://learn.microsoft.com/azure/architecture/patterns/static-content-hosting).

## Generate deployment credentials

[Include unavailable in this source snapshot: ~/reusable-content/github-actions/generate-deployment-credentials.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blobs-static-site-github-actions.md)

## Configure GitHub secrets

[Include unavailable in this source snapshot: ~/reusable-content/github-actions/create-secrets-with-openid.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-blobs-static-site-github-actions.md)

## Add your workflow

# [OpenID Connect](#tab/openid)

1. Go to **Actions** for your GitHub repository.

    GitHub Actions menu item

1. Select **Set up your workflow yourself**.

1. Delete everything after the `on:` section of your workflow file. For example, your remaining workflow may look like this.

    ```yaml
    name: CI with OpenID Connect

    on:
        push:
            branches: [ main ]
    ```

1. Add a permissions section. 


    ```yaml
    name: CI with OpenID Connect

    on:
        push:
            branches: [ main ]

    permissions:
          id-token: write
          contents: read
    ```

1. Add checkout and login actions. These actions will check out your site code and authenticate with Azure using the GitHub secrets you created earlier.

    ```yaml
    name: CI with OpenID Connect

    on:
        push:
            branches: [ main ]

    permissions:
          id-token: write
          contents: read

    jobs:
      build:
        runs-on: ubuntu-latest
        steps:
        - uses: actions/checkout@v3
        - uses: azure/login@v2
          with:
          client-id: ${{ secrets.AZURE_CLIENT_ID }}
          tenant-id: ${{ secrets.AZURE_TENANT_ID }}
          subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}
    ```

1. Use the Azure CLI action to upload your code to blob storage and to purge your CDN endpoint. For `az storage blob upload-batch`, replace the placeholder with your storage account name. The script will upload to the `$web` container. For `az cdn endpoint purge`, replace the placeholders with your CDN profile name, CDN endpoint name, and resource group. To speed up your CDN purge, you can add the `--no-wait` option to `az cdn endpoint purge`. To enhance security, you can also add the `--account-key` option with your [storage account key](../common/storage-account-keys-manage.md).

    ```yaml
        - name: Upload to blob storage
          uses: azure/CLI@v1
          with:
            inlineScript: |
                az storage blob upload-batch --account-name <STORAGE_ACCOUNT_NAME>  --auth-mode key -d '$web' -s .
        - name: Purge CDN endpoint
          uses: azure/CLI@v1
          with:
            inlineScript: |
               az cdn endpoint purge --content-paths  "/*" --profile-name "CDN_PROFILE_NAME" --name "CDN_ENDPOINT" --resource-group "RESOURCE_GROUP"
    ```

1. Complete your workflow by adding an action to logout of Azure. Here is the completed workflow. The file will appear in the `.github/workflows` folder of your repository.

    ```yaml
    name: CI with OpenID Connect

    on:
        push:
            branches: [ main ]

    permissions:
          id-token: write
          contents: read

    jobs:
      build:
        runs-on: ubuntu-latest
        steps:
        - uses: actions/checkout@v3
        - uses: azure/login@v2
          with:
          client-id: ${{ secrets.AZURE_CLIENT_ID }}
          tenant-id: ${{ secrets.AZURE_TENANT_ID }}
          subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}

        - name: Upload to blob storage
          uses: azure/CLI@v1
          with:
            inlineScript: |
                az storage blob upload-batch --account-name <STORAGE_ACCOUNT_NAME> --auth-mode key -d '$web' -s .
        - name: Purge CDN endpoint
          uses: azure/CLI@v1
          with:
            inlineScript: |
               az cdn endpoint purge --content-paths  "/*" --profile-name "CDN_PROFILE_NAME" --name "CDN_ENDPOINT" --resource-group "RESOURCE_GROUP"

      # Azure logout
        - name: logout
          run: |
                az logout
          if: always()
    ```

# [Service principal](#tab/userlevel)


1. Go to **Actions** for your GitHub repository.

    GitHub Actions menu item

1. Select **Set up your workflow yourself**.

1. Delete everything after the `on:` section of your workflow file. For example, your remaining workflow may look like this.

    ```yaml
    name: CI

    on:
        push:
            branches: [ main ]
    ```

1. Rename your workflow `Blob storage website CI` and add the checkout and login actions. These actions will check out your site code and authenticate with Azure using the `AZURE_CREDENTIALS` GitHub secret you created earlier.

    ```yaml
    name: Blob storage website CI

    on:
        push:
            branches: [ main ]

    jobs:
      build:
        runs-on: ubuntu-latest
        steps:
        - uses: actions/checkout@v3
        - uses: azure/login@v2
          with:
              creds: ${{ secrets.AZURE_CREDENTIALS }}
    ```

1. Use the Azure CLI action to upload your code to blob storage and to purge your CDN endpoint. For `az storage blob upload-batch`, replace the placeholder with your storage account name. The script will upload to the `$web` container. For `az cdn endpoint purge`, replace the placeholders with your CDN profile name, CDN endpoint name, and resource group. To speed up your CDN purge, you can add the `--no-wait` option to `az cdn endpoint purge`. To enhance security, you can also add the `--account-key` option with your [storage account key](../common/storage-account-keys-manage.md).

    ```yaml
        - name: Upload to blob storage
          uses: azure/CLI@v1
          with:
            inlineScript: |
                az storage blob upload-batch --account-name <STORAGE_ACCOUNT_NAME>  --auth-mode key -d '$web' -s .
        - name: Purge CDN endpoint
          uses: azure/CLI@v1
          with:
            inlineScript: |
               az cdn endpoint purge --content-paths  "/*" --profile-name "CDN_PROFILE_NAME" --name "CDN_ENDPOINT" --resource-group "RESOURCE_GROUP"
    ```

1. Complete your workflow by adding an action to logout of Azure. Here is the completed workflow. The file will appear in the `.github/workflows` folder of your repository.

    ```yaml
    name: Blob storage website CI

    on:
        push:
            branches: [ main ]

    jobs:
      build:
        runs-on: ubuntu-latest
        steps:
        - uses: actions/checkout@v3
        - uses: azure/login@v2
          with:
              creds: ${{ secrets.AZURE_CREDENTIALS }}

        - name: Upload to blob storage
          uses: azure/CLI@v1
          with:
            inlineScript: |
                az storage blob upload-batch --account-name <STORAGE_ACCOUNT_NAME> --auth-mode key -d '$web' -s .
        - name: Purge CDN endpoint
          uses: azure/CLI@v1
          with:
            inlineScript: |
               az cdn endpoint purge --content-paths  "/*" --profile-name "CDN_PROFILE_NAME" --name "CDN_ENDPOINT" --resource-group "RESOURCE_GROUP"

      # Azure logout
        - name: logout
          run: |
                az logout
          if: always()
    ```

---

## Review your deployment

1. Go to **Actions** for your GitHub repository.

1. Open the first result to see detailed logs of your workflow's run.

    Log of GitHub Actions run

## Clean up resources

When your static website and GitHub repository are no longer needed, clean up the resources you deployed by deleting the resource group and your GitHub repository.

## Next steps

> 
> [Learn about Azure Static Web Apps](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/static-web-apps/index.yml)
