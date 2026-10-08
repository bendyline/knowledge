---
title: Deploy Orleans to Azure App Service
description: Learn how to deploy an Orleans shopping cart app to Azure App Service.
ms.date: 05/23/2025
ms.topic: tutorial
ms.custom:
  - devx-track-bicep
  - sfi-image-nochange
  - sfi-ropc-nochange
---

# Deploy Orleans to Azure App Service

In this tutorial, learn how to deploy an Orleans shopping cart app to Azure App Service. This guide walks through a sample application supporting the following features:

- **Shopping cart**: A simple shopping cart application using Orleans for its cross-platform framework support and scalable distributed application capabilities.

  - **Inventory management**: Edit and/or create product inventory.
  - **Shop inventory**: Explore purchasable products and add them to the cart.
  - **Cart**: View a summary of all items in the cart and manage these items by removing or changing the quantity of each item.

With an understanding of the app and its features, learn how to deploy the app to Azure App Service using GitHub Actions, the .NET and Azure CLIs, and Azure Bicep. Additionally, learn how to configure the virtual network for the app within Azure.

In this tutorial, you learn how to:

> 
>
> - Deploy an Orleans application to Azure App Service
> - Automate deployment using GitHub Actions and Azure Bicep
> - Configure the virtual network for the app within Azure

## Prerequisites

- A [GitHub account](https://github.com/join)
- [Read an introduction to Orleans](../overview.md)
- The [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet)
- The [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli)
- A .NET integrated development environment (IDE)
  - Feel free to use [Visual Studio](https://visualstudio.microsoft.com) or [Visual Studio Code](https://code.visualstudio.com)

## Run the app locally

To run the app locally, fork the [Azure Samples: Orleans Cluster on Azure App Service](https://github.com/Azure-Samples/Orleans-Cluster-on-Azure-App-Service) repository and clone it to your local machine. Once cloned, open the solution in an IDE of your choice. If using Visual Studio, right-click the **Orleans.ShoppingCart.Silo** project, select **Set As Startup Project**, then run the app. Otherwise, run the app using the following .NET CLI command:

```dotnetcli
dotnet run --project Silo\Orleans.ShoppingCart.Silo.csproj
```

For more information, see [dotnet run](../../core/tools/dotnet-run.md). With the app running, navigate around and test its capabilities. All app functionality when running locally relies on in-memory persistence and local clustering. It also uses the [Bogus NuGet](https://www.nuget.org/packages/Bogus) package to generate fake products. Stop the app either by selecting the **Stop Debugging** option in Visual Studio or by pressing <kbd>Ctrl</kbd>+<kbd>C</kbd> in the .NET CLI.

## Inside the shopping cart app

Orleans is a reliable and scalable framework for building distributed applications. For this tutorial, deploy a simple shopping cart app built using Orleans to Azure App Service. The app exposes the ability to manage inventory, add and remove items in a cart, and shop available products. The client is built using Blazor with a server hosting model. The app is architected as follows:

Orleans: Shopping Cart sample app architecture.

The preceding diagram shows that the client is the server-side Blazor app. It's composed of several services that consume a corresponding Orleans grain. Each service pairs with an Orleans grain as follows:

- `InventoryService`: Consumes the `IInventoryGrain` where inventory is partitioned by product category.
- `ProductService`: Consumes the `IProductGrain` where a single product is tethered to a single grain instance by [Orleans.IdAttribute](https://learn.microsoft.com/search/?terms=Orleans.IdAttribute).
- `ShoppingCartService`: Consumes the `IShoppingCartGrain` where a single user only has a single shopping cart instance regardless of consuming clients.

The solution contains three projects:

- `Orleans.ShoppingCart.Abstractions`: A class library defining the models and interfaces for the app.
- `Orleans.ShoppingCart.Grains`: A class library defining the grains that implement the app's business logic.
- `Orleans.ShoppingCart.Silos`: A server-side Blazor app hosting the Orleans silo.

### The client user experience

The shopping cart client app has several pages, each representing a different user experience. The app's UI is built using the [MudBlazor NuGet](https://www.nuget.org/packages/MudBlazor) package.

**Home page**

A few simple phrases help understand the app's purpose and add context to each navigation menu item.

Orleans: Shopping Cart sample app, home page.

**Shop inventory page**

A page displaying all products available for purchase. Items can be added to the cart from this page.

Orleans: Shopping Cart sample app, shop inventory page.

**Empty cart page**

If nothing has been added to the cart, the page renders a message indicating no items are in the cart.

Orleans: Shopping Cart sample app, empty cart page.

**Items added to the cart while on the shop inventory page**

When items are added to the cart while on the shop inventory page, the app displays a message indicating the item was added.

Orleans: Shopping Cart sample app, items added to cart while on shop inventory page.

**Product management page**

Manage inventory from this page. Products can be added, edited, and removed from the inventory.

Orleans: Shopping Cart sample app, product management page.

**Product management page create new dialog**

Clicking the **Create new product** button displays a dialog allowing creation of a new product.

Orleans: Shopping Cart sample app, product management page - create new product dialog.

**Items in the cart page**

When items are in the cart, view them, change their quantity, and even remove them. A summary of the items in the cart and the pretax total cost is shown.

Orleans: Shopping Cart sample app, items in cart page.

> **Important:**
> When this app runs locally in a development environment, it uses localhost clustering, in-memory storage, and a local silo. It also seeds the inventory with fake data automatically generated using the [Bogus NuGet](https://www.nuget.org/packages/bogus) package. This is intentional to demonstrate functionality.

## Deployment overview

Orleans applications are designed to scale up and scale out efficiently. To accomplish this, application instances communicate directly via TCP sockets. Therefore, Orleans requires network connectivity between silos. Azure App Service supports this requirement via [virtual network integration](https://learn.microsoft.com/azure/app-service/overview-vnet-integration) and additional configuration instructing App Service to allocate private network ports for app instances.

When deploying Orleans to Azure App Service, take the following actions to ensure hosts can communicate:

- Enable virtual network integration by following the [Enable integration with an Azure virtual network](https://learn.microsoft.com/azure/app-service/configure-vnet-integration-enable) guide.
- Configure the app with private ports using the Azure CLI as described in the [Configure private port count using Azure CLI](#configure-private-port-count-using-azure-cli) section. The Bicep template in the [Explore the Bicep templates](#explore-the-bicep-templates) section below shows how to configure this setting via Bicep.
- If deploying to Linux, ensure hosts listen on all IP addresses as described in the [Configure host networking](#configure-host-networking) section.

### Configure private port count using Azure CLI

```azurecli
az webapp config set -g '<resource-group-name>' --subscription '<subscription-id>' -n '<app-service-app-name>' --generic-configurations '{\"vnetPrivatePortsCount\": "2"}'
```

### Configure host networking

Once you configure Azure App Service with virtual network (VNet) integration and set it to provide application instances with at least two private ports each, two additional environment variables are provided to your app processes: `WEBSITE_PRIVATE_IP` and `WEBSITE_PRIVATE_PORTS`. These variables provide two important pieces of information:

- Which IP address other hosts in your virtual network can use to contact a given app instance; and
- Which ports on that IP address will be routed to that app instance

The `WEBSITE_PRIVATE_IP` variable specifies an IP routable from the VNet, but not necessarily an IP address the app instance can directly bind to. For this reason, instruct the host to bind to all internal addresses by passing `listenOnAnyHostAddress: true` to the `ConfigureEndpoints` method call. The following example configures an [Orleans.Hosting.ISiloBuilder](https://learn.microsoft.com/search/?terms=Orleans.Hosting.ISiloBuilder) instance to consume the injected environment variables and listen on the correct interfaces:

```csharp
var endpointAddress = IPAddress.Parse(builder.Configuration["WEBSITE_PRIVATE_IP"]!);
var strPorts = builder.Configuration["WEBSITE_PRIVATE_PORTS"]!.Split(',');
if (strPorts.Length < 2)
{
    throw new Exception("Insufficient private ports configured.");
}

var (siloPort, gatewayPort) = (int.Parse(strPorts[0]), int.Parse(strPorts[1]));

siloBuilder
    .ConfigureEndpoints(endpointAddress, siloPort, gatewayPort, listenOnAnyHostAddress: true)
```

The code above is also present in the [Azure Samples: Orleans Cluster on Azure App Service](https://github.com/Azure-Samples/Orleans-Cluster-on-Azure-App-Service) repository, allowing viewing it in the context of the rest of the host configuration.

## Deploy to Azure App Service

A typical Orleans application consists of a cluster of server processes (silos) where grains live, and a set of client processes (usually web servers) receiving external requests, turning them into grain method calls, and returning results. Hence, the first step to run an Orleans application is starting a cluster of silos. For testing purposes, a cluster can consist of a single silo.

> **Note:**
> For a reliable production deployment, you'd want more than one silo in a cluster for fault tolerance and scale.

Before deploying the app, create an Azure Resource Group (or you can use an existing one). To create a new Azure Resource Group, use one of the following articles:

- [Azure portal](https://learn.microsoft.com/azure/azure-resource-manager/management/manage-resource-groups-portal#create-resource-groups)
- [Azure CLI](https://learn.microsoft.com/azure/azure-resource-manager/management/manage-resource-groups-cli#create-resource-groups)
- [Azure PowerShell](https://learn.microsoft.com/azure/azure-resource-manager/management/manage-resource-groups-powershell#create-resource-groups)

Make note of the resource group name you choose; you need it later to deploy the app.


### Create a service principal

To automate the app's deployment, you need to create a service principal. This is a Microsoft account that has permission to manage Azure resources on your behalf.

```azurecli
az ad sp create-for-rbac --sdk-auth --role Contributor \
  --name "<display-name>"  --scopes /subscriptions/<your-subscription-id>
```

The JSON credentials created look similar to the following, but with actual values for your client, subscription, and tenant:

```json
{
  "clientId": "<your client id>",
  "clientSecret": "<your client secret>",
  "subscriptionId": "<your subscription id>",
  "tenantId": "<your tenant id>",
  "activeDirectoryEndpointUrl": "https://login.microsoftonline.com/",
  "resourceManagerEndpointUrl": "https://brazilus.management.azure.com",
  "activeDirectoryGraphResourceId": "https://graph.windows.net/",
  "sqlManagementEndpointUrl": "https://management.core.windows.net:8443/",
  "galleryEndpointUrl": "https://gallery.azure.com",
  "managementEndpointUrl": "https://management.core.windows.net"
}
```

Copy the output of the command into your clipboard, and continue to the next step.


### Create a GitHub secret

GitHub provides a mechanism for creating encrypted secrets. The secrets you create are available for use in GitHub Actions workflows. You'll see how to use GitHub Actions to automate the app's deployment in conjunction with Azure Bicep. Bicep is a domain-specific language (DSL) that uses declarative syntax to deploy Azure resources. For more information, see [What is Bicep?](https://learn.microsoft.com/azure/azure-resource-manager/bicep/overview?tabs=bicep). Using the output from the [Create a service principal](#create-a-service-principal) step, you need to create a GitHub secret named `AZURE_CREDENTIALS` with the JSON-formatted credentials.

Within your GitHub repository, select **Settings** > **Secrets** > **Create a new secret**. Enter the name `AZURE_CREDENTIALS` and paste the JSON credentials from the previous step into the **Value** field.

GitHub Repository: Settings > Secrets

For more information, see [GitHub: Encrypted Secrets](https://docs.github.com/actions/security-guides/encrypted-secrets).


### Prepare for Azure deployment

Package the app for deployment. In the `Orleans.ShoppingCart.Silos` project, a `Target` element is defined that runs after the `Publish` step. This target zips the publish directory into a _silo.zip_ file:

```xml
<Target Name="ZipPublishOutput" AfterTargets="Publish">
    <Delete Files="$(ProjectDir)\..\silo.zip" />
    <ZipDirectory SourceDirectory="$(PublishDir)" DestinationFile="$(ProjectDir)\..\silo.zip" />
</Target>
```

There are many ways to deploy a .NET app to Azure App Service. In this tutorial, use GitHub Actions, Azure Bicep, and the .NET and Azure CLIs. Consider the _./github/workflows/deploy.yml_ file in the root of the GitHub repository:

```yml
name: Deploy to Azure App Service

on:
  push:
    branches:
    - main

env:
  UNIQUE_APP_NAME: cartify
  AZURE_RESOURCE_GROUP_NAME: orleans-resourcegroup
  AZURE_RESOURCE_GROUP_LOCATION: centralus

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    - name: Setup .NET 8.0
      uses: actions/setup-dotnet@v3
      with:
        dotnet-version: 8.0.x

    - name: .NET publish shopping cart app
      run: dotnet publish ./Silo/Orleans.ShoppingCart.Silo.csproj --configuration Release

    - name: Login to Azure
      uses: azure/login@v1
      with:
        creds: ${{ secrets.AZURE_CREDENTIALS }}

    - name: Flex bicep
      run: |
        az deployment group create \
          --resource-group ${{ env.AZURE_RESOURCE_GROUP_NAME }} \
          --template-file '.github/workflows/flex/main.bicep' \
          --parameters location=${{ env.AZURE_RESOURCE_GROUP_LOCATION }} \
            appName=${{ env.UNIQUE_APP_NAME }} \
          --debug

    - name: Webapp deploy
      run: |
        az webapp deploy --name ${{ env.UNIQUE_APP_NAME }} \
          --resource-group ${{ env.AZURE_RESOURCE_GROUP_NAME  }} \
          --clean true --restart true \
          --type zip --src-path silo.zip --debug

    - name: Staging deploy
      run: |
        az webapp deploy --name ${{ env.UNIQUE_APP_NAME }} \
          --slot ${{ env.UNIQUE_APP_NAME }}stg \
          --resource-group ${{ env.AZURE_RESOURCE_GROUP_NAME  }} \
          --clean true --restart true \
          --type zip --src-path silo.zip --debug
```

The preceding GitHub workflow does the following:

- Publishes the shopping cart app as a zip file using the [dotnet publish](../../core/tools/dotnet-publish.md) command.
- Logs in to Azure using credentials from the [Create a service principal](#create-a-service-principal) step.
- Evaluates the _main.bicep_ file and starts a deployment group using [az deployment group create](https://learn.microsoft.com/cli/azure/deployment/group#az-deployment-group-create).
- Deploys the _silo.zip_ file to Azure App Service using [az webapp deploy](https://learn.microsoft.com/cli/azure/webapp#az-webapp-deploy).
  - An additional deployment to staging is also configured.

The workflow triggers on a push to the `main` branch. For more information, see [GitHub Actions and .NET](../../devops/github-actions-overview.md).

> **Tip:**
> If you encounter issues when running the workflow, you might need to verify that the service principal has all the required provider namespaces registered. The following provider namespaces are required:
>
> - `Microsoft.Web`
> - `Microsoft.Network`
> - `Microsoft.OperationalInsights`
> - `Microsoft.Insights`
> - `Microsoft.Storage`
>
> For more information, see [Resolve errors for resource provider registration](https://learn.microsoft.com/azure/azure-resource-manager/troubleshooting/error-register-resource-provider?tabs=azure-cli).

Azure imposes naming restrictions and conventions for resources. Update the values in the _deploy.yml_ file for the following environment variables:

- `UNIQUE_APP_NAME`
- `AZURE_RESOURCE_GROUP_NAME`
- `AZURE_RESOURCE_GROUP_LOCATION`

Set these values to your unique app name and your Azure resource group name and location.

For more information, see [Naming rules and restrictions for Azure resources](https://learn.microsoft.com/azure/azure-resource-manager/management/resource-name-rules).

## Explore the Bicep templates

When the `az deployment group create` command runs, it evaluates the _main.bicep_ file. This file contains the Azure resources to deploy. Think of this step as _provisioning_ all resources for deployment.

> **Important:**
> If you're using Visual Studio Code, the bicep authoring experience is improved when using the [Bicep Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-bicep).

There are many Bicep files, each containing either resources or modules (collections of resources). The _main.bicep_ file is the entry point and consists primarily of `module` definitions:

```bicep
param appName string
param location string = resourceGroup().location

module storageModule 'storage.bicep' = {
  name: 'orleansStorageModule'
  params: {
    name: '${appName}storage'
    location: location
  }
}

module logsModule 'logs-and-insights.bicep' = {
  name: 'orleansLogModule'
  params: {
    operationalInsightsName: '${appName}-logs'
    appInsightsName: '${appName}-insights'
    location: location
  }
}

resource vnet 'Microsoft.Network/virtualNetworks@2021-05-01' = {
  name: '${appName}-vnet'
  location: location
  properties: {
    addressSpace: {
      addressPrefixes: [
        '172.17.0.0/16',
        '192.168.0.0/16'
      ]
    }
    subnets: [
      {
        name: 'default'
        properties: {
          addressPrefix: '172.17.0.0/24'
          delegations: [
            {
              name: 'delegation'
              properties: {
                serviceName: 'Microsoft.Web/serverFarms'
              }
            }
          ]
        }
      }
      {
        name: 'staging'
        properties: {
          addressPrefix: '192.168.0.0/24'
          delegations: [
            {
              name: 'delegation'
              properties: {
                serviceName: 'Microsoft.Web/serverFarms'
              }
            }
          ]
        }
      }
    ]
  }
}

module siloModule 'app-service.bicep' = {
  name: 'orleansSiloModule'
  params: {
    appName: appName
    location: location
    vnetSubnetId: vnet.properties.subnets[0].id
    stagingSubnetId: vnet.properties.subnets[1].id
    appInsightsConnectionString: logsModule.outputs.appInsightsConnectionString
    appInsightsInstrumentationKey: logsModule.outputs.appInsightsInstrumentationKey
    storageConnectionString: storageModule.outputs.connectionString
  }
}
```

The preceding Bicep file defines the following:

- Two parameters for the resource group name and the app name.
- The `storageModule` definition, defining the storage account.
- The `logsModule` definition, defining the Azure Log Analytics and Application Insights resources.
- The `vnet` resource, defining the virtual network.
- The `siloModule` definition, defining the Azure App Service.

One very important `resource` is the Virtual Network. The `vnet` resource enables Azure App Service to communicate with the Orleans cluster.

Whenever a `module` is encountered in the Bicep file, it's evaluated via another Bicep file containing the resource definitions. The first module encountered is `storageModule`, defined in the _storage.bicep_ file:

```bicep
param name string
param location string

resource storage 'Microsoft.Storage/storageAccounts@2021-08-01' = {
  name: name
  location: location
  kind: 'StorageV2'
  sku: {
    name: 'Standard_LRS'
  }
}

var key = listKeys(storage.name, storage.apiVersion).keys[0].value
var protocol = 'DefaultEndpointsProtocol=https'
var accountBits = 'AccountName=${storage.name};AccountKey=${key}'
var endpointSuffix = 'EndpointSuffix=${environment().suffixes.storage}'

output connectionString string = '${protocol};${accountBits};${endpointSuffix}'
```

Bicep files accept parameters, declared using the `param` keyword. Likewise, they can declare outputs using the `output` keyword. The storage `resource` relies on the `Microsoft.Storage/storageAccounts@2021-08-01` type and version. It's provisioned in the resource group's location as a `StorageV2` and `Standard_LRS` SKU. The storage Bicep file defines its connection string as an `output`. This `connectionString` is later used by the silo Bicep file to connect to the storage account.

Next, the _logs-and-insights.bicep_ file defines the Azure Log Analytics and Application Insights resources:

```bicep
param operationalInsightsName string
param appInsightsName string
param location string

resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: appInsightsName
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: logs.id
  }
}

resource logs 'Microsoft.OperationalInsights/workspaces@2021-06-01' = {
  name: operationalInsightsName
  location: location
  properties: {
    retentionInDays: 30
    features: {
      searchVersion: 1
    }
    sku: {
      name: 'PerGB2018'
    }
  }
}

output appInsightsInstrumentationKey string = appInsights.properties.InstrumentationKey
output appInsightsConnectionString string = appInsights.properties.ConnectionString
```

This Bicep file defines the Azure Log Analytics and Application Insights resources. The `appInsights` resource is a `web` type, and the `logs` resource is a `PerGB2018` type. Both `appInsights` and `logs` resources are provisioned in the resource group's location. The `appInsights` resource links to the `logs` resource via the `WorkspaceResourceId` property. This Bicep file defines two outputs used later by the App Service `module`.

Finally, the _app-service.bicep_ file defines the Azure App Service resource:

```bicep
param appName string
param location string
param vnetSubnetId string
param stagingSubnetId string
param appInsightsInstrumentationKey string
param appInsightsConnectionString string
param storageConnectionString string

resource appServicePlan 'Microsoft.Web/serverfarms@2021-03-01' = {
  name: '${appName}-plan'
  location: location
  kind: 'app'
  sku: {
    name: 'S1'
    capacity: 1
  }
}

resource appService 'Microsoft.Web/sites@2021-03-01' = {
  name: appName
  location: location
  kind: 'app'
  properties: {
    serverFarmId: appServicePlan.id
    virtualNetworkSubnetId: vnetSubnetId
    httpsOnly: true
    siteConfig: {
      vnetPrivatePortsCount: 2
      webSocketsEnabled: true
      netFrameworkVersion: 'v8.0'
      appSettings: [
        {
          name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
          value: appInsightsInstrumentationKey
        }
        {
          name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
          value: appInsightsConnectionString
        }
        {
          name: 'ORLEANS_AZURE_STORAGE_CONNECTION_STRING'
          value: storageConnectionString
        }
        {
          name: 'ORLEANS_CLUSTER_ID'
          value: 'Default'
        }
      ]
      alwaysOn: true
    }
  }
}

resource stagingSlot 'Microsoft.Web/sites/slots@2022-03-01' = {
  name: '${appName}stg'
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    virtualNetworkSubnetId: stagingSubnetId
    siteConfig: {
      http20Enabled: true
      vnetPrivatePortsCount: 2
      webSocketsEnabled: true
      netFrameworkVersion: 'v8.0'
      appSettings: [
        {
          name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
          value: appInsightsInstrumentationKey
        }
        {
          name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
          value: appInsightsConnectionString
        }
        {
          name: 'ORLEANS_AZURE_STORAGE_CONNECTION_STRING'
          value: storageConnectionString
        }
        {
          name: 'ORLEANS_CLUSTER_ID'
          value: 'Staging'
        }
      ]
      alwaysOn: true
    }
  }
}

resource slotConfig 'Microsoft.Web/sites/config@2021-03-01' = {
  name: 'slotConfigNames'
  parent: appService
  properties: {
    appSettingNames: [
      'ORLEANS_CLUSTER_ID'
    ]
  }
}

resource appServiceConfig 'Microsoft.Web/sites/config@2021-03-01' = {
  parent: appService
  name: 'metadata'
  properties: {
    CURRENT_STACK: 'dotnet'
  }
}
```

This Bicep file configures Azure App Service as a .NET 8 application. Both `appServicePlan` and `appService` resources are provisioned in the resource group's location. The `appService` resource is configured to use the `S1` SKU with a capacity of `1`. Additionally, the resource is configured to use the `vnetSubnetId` subnet and HTTPS. It also configures the `appInsightsInstrumentationKey` instrumentation key, the `appInsightsConnectionString` connection string, and the `storageConnectionString` connection string. The shopping cart app uses these values.

The aforementioned Visual Studio Code extension for Bicep includes a visualizer. All these Bicep files are visualized as follows:

Orleans: Shopping cart sample app bicep provisioning visualizer rendering.

### Staging environments

The deployment infrastructure can deploy to staging environments. These are short-lived, test-centric, immutable throwaway environments very helpful for testing deployments before promoting them to production.

> **Note:**
> If the App Service runs on Windows, each App Service must be on its own separate App Service Plan. Alternatively, to avoid such configuration, use App Service on Linux instead, and this problem is resolved.

## Summary

As source code is updated and changes are `push`ed to the `main` branch of the repository, the _deploy.yml_ workflow runs. It provisions the resources defined in the Bicep files and deploys the application. The application can be expanded to include new features, such as authentication, or to support multiple instances. The primary objective of this workflow is demonstrating the ability to provision and deploy resources in a single step.

In addition to the visualizer from the Bicep extension, the Azure portal resource group page looks similar to the following example after provisioning and deploying the application:

Azure portal: Orleans shopping cart sample app resources.

## See also

- [Orleans deployment overview](index.md)
- [GitHub Actions and .NET](../../devops/github-actions-overview.md)
- [Quickstart: Deploy an ASP.NET web app](https://learn.microsoft.com/azure/app-service/quickstart-dotnetcore)
- [Integrate your app with an Azure virtual network](https://learn.microsoft.com/azure/app-service/overview-vnet-integration)
- [Enable virtual network integration in Azure App Service](https://learn.microsoft.com/azure/app-service/configure-vnet-integration-enable)
