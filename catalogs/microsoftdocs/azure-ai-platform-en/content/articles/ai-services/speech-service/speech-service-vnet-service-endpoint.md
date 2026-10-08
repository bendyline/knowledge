---
title: Use Virtual Network service endpoints with Speech service
titleSuffix: Foundry Tools
description: This article describes how to use Speech service with an Azure Virtual Network service endpoint.
author: PatrickFarley
ms.author: pafarley
manager: mcleans
ms.service: azure-speech-foundry-tools
ms.topic: how-to
ms.date: 02/25/2026
ms.reviewer: jagoerge
#Customer intent: As a developer, I want to learn how to use Speech service with an Azure Virtual Network service endpoint.
---

# Use Speech service through a Virtual Network service endpoint

[Azure Virtual Network](https://learn.microsoft.com/azure/virtual-network/virtual-networks-overview) [service endpoints](https://learn.microsoft.com/azure/virtual-network/virtual-network-service-endpoints-overview) help to provide secure and direct connectivity to Azure services over an optimized route on the Azure backbone network. Endpoints help you secure your critical Azure service resources to only your virtual networks. Service endpoints enable private IP addresses in the virtual network to reach the endpoint of an Azure service without needing a public IP address on the virtual network.

This article explains how to set up and use Virtual Network service endpoints with Speech service in Foundry Tools.

> **Note:**
> Before you start, review [how to use virtual networks with Foundry Tools](../cognitive-services-virtual-networks.md).

This article also describes [how to remove Virtual Network service endpoints later but still use the Speech resource](#use-a-foundry-resource-for-speech-that-has-a-custom-domain-name-but-that-doesnt-have-allowed-virtual-networks).

To set up a Foundry resource for Speech for Virtual Network service endpoint scenarios, you need to:
1. [Create a custom domain name for the Speech resource](#create-a-custom-domain-name).
1. [Configure virtual networks and networking settings for the Speech resource](#configure-virtual-networks-and-the-speech-resource-networking-settings).
1. [Adjust existing applications and solutions](#adjust-existing-applications-and-solutions).

> **Note:**
> Setting up and using Virtual Network service endpoints for Speech service is similar to setting up and using private endpoints. In this article, we refer to the corresponding sections of the [article on using private endpoints](speech-services-private-link.md) when the procedures are the same.


## Private endpoints and Virtual Network service endpoints

Azure provides private endpoints and Virtual Network service endpoints for traffic that tunnels via the [private Azure backbone network](https://azure.microsoft.com/global-infrastructure/global-network/). The purpose and underlying technologies of these endpoint types are similar. But there are differences between the two technologies. We recommend that you learn about the pros and cons of both before you design your network.

There are a few things to consider when you decide which technology to use:
- Both technologies ensure that traffic between the virtual network and the Speech resource doesn't travel over the public internet.
- A private endpoint provides a dedicated private IP address for your Speech resource. This IP address is accessible only within a specific virtual network and subnet. You have full control of the access to this IP address within your network infrastructure.
- Virtual Network service endpoints don't provide a dedicated private IP address for the Speech resource. Instead, they encapsulate all packets sent to the Speech resource and deliver them directly over the Azure backbone network.
- Both technologies support on-premises scenarios. By default, when they use Virtual Network service endpoints, Azure service resources secured to virtual networks can't be reached from on-premises networks. But you can [change that behavior](https://learn.microsoft.com/azure/virtual-network/virtual-network-service-endpoints-overview#secure-azure-service-access-from-on-premises).
- Virtual Network service endpoints are often used to restrict the access for a Foundry resource for Speech based on the virtual networks from which the traffic originates.
- For Foundry Tools, enabling the Virtual Network service endpoint forces the traffic for all Microsoft Foundry resources to go through the private backbone network. That requires explicit network access configuration. (For more information, see [Configure virtual networks and the Speech resource networking settings](speech-service-vnet-service-endpoint.md#configure-virtual-networks-and-the-speech-resource-networking-settings).) Private endpoints don't have this limitation and provide more flexibility for your network configuration. You can access one resource through the private backbone and another through the public internet by using the same subnet of the same virtual network.
- Private endpoints incur [extra costs](https://azure.microsoft.com/pricing/details/private-link). Virtual Network service endpoints are free.
- Private endpoints require [extra DNS configuration](speech-services-private-link.md#turn-on-private-endpoints).
- One Speech resource can work simultaneously with both private endpoints and Virtual Network service endpoints.

We recommend that you try both endpoint types before you make a decision about your production design. 

For more information, see these resources:

- [Azure Private Link and private endpoint documentation](https://learn.microsoft.com/azure/private-link/private-link-overview)
- [Virtual Network service endpoints documentation](https://learn.microsoft.com/azure/virtual-network/virtual-network-service-endpoints-overview)


This article describes how to use Virtual Network service endpoints with Speech service. For information about private endpoints, see [Use Speech service through a private endpoint](speech-services-private-link.md).

## Create a custom domain name

Virtual Network service endpoints require a [custom subdomain name for Foundry Tools](../cognitive-services-custom-subdomains.md). Create a custom domain by following the [guidance](speech-services-private-link.md#create-a-custom-domain-name) in the private endpoint article. All warnings in the section also apply to Virtual Network service endpoints.

## Configure virtual networks and the Speech resource networking settings

You need to add all virtual networks that are allowed access via the service endpoint to the Speech resource networking properties.

> **Note:**
> To access a Foundry resource for Speech via the Virtual Network service endpoint, you need to enable the `Microsoft.CognitiveServices` service endpoint type for the required subnets of your virtual network. Doing so will route all subnet traffic related to Foundry Tools through the private backbone network. If you intend to access any other Microsoft Foundry resources from the same subnet, make sure these resources are configured to allow your virtual network. 
>
> If a virtual network isn't added as *allowed* in the Speech resource networking properties, it won't have access to the Speech resource via the service endpoint, even if the `Microsoft.CognitiveServices` service endpoint is enabled for the virtual network. And if the service endpoint is enabled but the virtual network isn't allowed, the Speech resource won't be accessible for the virtual network through a public IP address, no matter what the Speech resource's other network security settings are. That's because enabling the `Microsoft.CognitiveServices` endpoint routes all traffic related to Foundry Tools through the private backbone network, and in this case the virtual network should be explicitly allowed to access the resource. This guidance applies for all Microsoft Foundry resources, not just for Speech resources.  
  
1. Go to the [Azure portal](https://portal.azure.com/) and sign in to your Azure account.
1. Select the Speech resource.
1. In the **Resource Management** group in the left pane, select **Networking**.
1. On the **Firewalls and virtual networks** tab, select **Selected Networks and Private Endpoints**. 

   > **Note:**
   > To use Virtual Network service endpoints, you need to select the **Selected Networks and Private Endpoints** network security option. No other options are supported. If your scenario requires the **All networks** option, consider using [private endpoints](speech-services-private-link.md), which support all three network security options.

1. Select **Add existing virtual network** or **Add new virtual network** and provide the required parameters. Select **Add** for an existing virtual network or **Create** for a new one. If you add an existing virtual network, the `Microsoft.CognitiveServices` service endpoint is automatically enabled for the selected subnets. This operation can take up to 15 minutes. Also, see the note at the beginning of this section.

### Enabling service endpoint for an existing virtual network 

As described in the previous section, when you configure a virtual network as *allowed* for the Speech resource, the `Microsoft.CognitiveServices` service endpoint is automatically enabled. If you later disable it, you need to re-enable it manually to restore the service endpoint access to the Speech resource (and to other Microsoft Foundry resources):

1. Go to the [Azure portal](https://portal.azure.com/) and sign in to your Azure account.
1. Select the virtual network.
1. In the **Settings** group in the left pane, select **Subnets**.
1. Select the required subnet.
1. A new panel appears on the right side of the window. In this panel, in the **Service Endpoints** section, select `Microsoft.CognitiveServices` in the **Services** list.
1. Select **Save**.

## Adjust existing applications and solutions

A Foundry resource for Speech that has a custom domain enabled interacts with the Speech service in a different way. This is true for a custom-domain-enabled Speech resource regardless of whether service endpoints are configured. Information in this section applies to both scenarios.

### Use a Foundry resource for Speech that has a custom domain name and allowed virtual networks 

In this scenario, the **Selected Networks and Private Endpoints** option is selected in the networking settings of the Speech resource and at least one virtual network is allowed. This scenario is equivalent to [using a Foundry resource for Speech that has a custom domain name and a private endpoint enabled](speech-services-private-link.md#adjust-an-application-to-use-a-speech-resource-with-a-private-endpoint).


### Use a Foundry resource for Speech that has a custom domain name but that doesn't have allowed virtual networks

In this scenario, private endpoints aren't enabled and one of these statements is true:

- The **Selected Networks and Private Endpoints** option is selected in the networking settings of the Speech resource, but no allowed virtual networks are configured.
- The **All networks** option is selected in the networking settings of the Speech resource.

This scenario is equivalent to [using a Foundry resource for Speech that has a custom domain name and that doesn't have private endpoints](speech-services-private-link.md#adjust-an-application-to-use-a-speech-resource-without-private-endpoints).

## Use Speech Studio

[Speech Studio](speech-studio-overview.md) is a web portal with tools for building and integrating Azure Speech in Foundry Tools service in your application. When you work in Speech Studio projects, network connections and API calls to the corresponding Speech resource are made on your behalf. Working with [private endpoints](speech-services-private-link.md), [virtual network service endpoints](speech-service-vnet-service-endpoint.md), and other network security options can limit the availability of Speech Studio features. You normally use Speech Studio when working with features, like [custom speech](custom-speech-overview.md), [custom voice](professional-voice-create-project.md) and [audio content creation](how-to-audio-content-creation.md).


### Reach Speech Studio from a virtual network

To use Speech Studio from a virtual machine within an Azure virtual network, allow outgoing connections to the required set of [service tags](https://learn.microsoft.com/azure/virtual-network/service-tags-overview) for that virtual network. See details in [supported regions and service offerings](../cognitive-services-virtual-networks.md#supported-regions-and-service-offerings).

Access to the Speech resource endpoint is *not* equal to access to the Speech Studio web portal. Access to Speech Studio through private or VNet service endpoints is not supported.

### Work with Speech Studio projects

This section describes working with the different kinds of Speech Studio projects for the different network security options of the Speech resource. It's expected that the web browser connection to Speech Studio is established. Set Speech resource network security in the Azure portal or by using the CLI:

**Azure CLI**
```azurecli
# View current network settings
az cognitiveservices account show \
  --name <your-speech-resource-name> \
  --resource-group <your-resource-group-name> \
  --query "{publicAccess:properties.publicNetworkAccess, networkRules:properties.networkAcls}" \
  -o json

# Change public network access (options: Enabled, Disabled)
az cognitiveservices account update \
  --name <your-speech-resource-name> \
  --resource-group <your-resource-group-name> \
  --public-network-access Enabled
```

**Azure portal**
1. Go to the [Azure portal](https://portal.azure.com/) and sign in to your Azure account.
1. Select the Speech resource.
1. In the **Resource Management** group in the left pane, select **Networking** > **Firewalls and virtual networks**. 
1. Select one option from **All networks**, **Selected Networks and Private Endpoints**, or **Disabled**. 

#### Custom speech, custom voice, and audio content creation

The following table describes custom speech/custom voice/audio content creation project accessibility per Speech resource **Networking** > **Firewalls and virtual networks** security setting.

> **Note:**
> If you allow only private endpoints through the **Networking** > **Private endpoint connections** tab, you can't use Speech Studio with the Speech resource. You can still use the Speech resource outside of Speech Studio.

| Speech resource network security setting | Speech Studio project accessibility |
| --- | --- |
| All networks | No restrictions |
| Selected Networks and Private Endpoints | Accessible from allowed public IP addresses |
| Disabled | Not accessible |

If you select **Selected Networks and Private Endpoints**, you see a tab with **Virtual networks** and **Firewall** access configuration options. In the **Firewall** section, you must allow at least one public IP address and use this address for the browser connection with Speech Studio.

To use custom speech without relaxing network access restrictions on your production Speech resource, consider one of these workarounds:

- Create another Speech resource for development that can be used on a public network. Prepare your custom model in Speech Studio on the development resource, and then copy the model to your production resource. See the [Models_CopyTo](https://learn.microsoft.com/rest/api/speechtotext/models/copy-to) REST request with the [Speech to text REST API](rest-speech-to-text.md).
- You can use the [Speech to text REST API](rest-speech-to-text.md) for all custom speech operations instead of Speech Studio.

To use custom voice without relaxing network access restrictions on your production Speech resource, consider one of these workarounds:

- Create another Speech resource for development that can be used on a public network. Prepare your custom model in Speech Studio on the development resource, then submit an Azure support ticket to request assistance with copying the model to your production resource.
- Use the [Custom voice REST API](https://learn.microsoft.com/rest/api/aiservices/speechapi/operation-groups) directly for all custom voice operations with your production resource.



## Simultaneous use of private endpoints and Virtual Network service endpoints

You can use [private endpoints](speech-services-private-link.md) and [Virtual Network service endpoints](speech-service-vnet-service-endpoint.md) to access to the same Speech resource simultaneously. To enable this simultaneous use, you need to use the **Selected Networks and Private Endpoints** option in the networking settings of the Speech resource in the Azure portal. Other options aren't supported for this scenario.


## Learn more

* [Use Speech service through a private endpoint](speech-services-private-link.md)
* [Azure Virtual Network service endpoints](https://learn.microsoft.com/azure/virtual-network/virtual-network-service-endpoints-overview)
* [Azure Private Link](https://learn.microsoft.com/azure/private-link/private-link-overview)
* [Speech SDK](speech-sdk.md)
* [Speech to text REST API](rest-speech-to-text.md)
* [Text to speech REST API](rest-text-to-speech.md)
