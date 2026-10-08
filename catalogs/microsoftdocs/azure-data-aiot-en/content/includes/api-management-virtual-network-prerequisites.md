---
author: PatAltimore
ms.service: azure-api-management
ms.topic: include
ms.date: 04/17/2025
ms.author: patricka
---

## Prerequisites

Review the [network resource requirements for API Management injection into a virtual network](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/virtual-network-injection-resources.md) before you begin.

+ **An API Management instance.** For more information, see [Create an Azure API Management instance](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/get-started-create-service-instance.md).

* **A virtual network and subnet** in the same region and subscription as your API Management instance. 
  * The subnet used to connect to the API Management instance may contain other Azure resource types. 
  * The subnet shouldn't have any delegations enabled. The **Delegate subnet to a service** setting for the subnet should be set to *None*. 

* **A network security group** attached to the subnet above. A network security group (NSG) is required to explicitly allow inbound connectivity, because the load balancer used internally by API Management is secure by default and rejects all inbound traffic. For specific configuration, see [Configure NSG rules](#configure-nsg-rules), later in this article.

* For certain scenarios, enable **service endpoints** in the subnet to dependent services such as Azure Storage or Azure SQL. For more information, see [Force tunnel traffic to on-premises firewall using ExpressRoute or network virtual appliance](#force-tunnel-traffic-to-on-premises-firewall-using-expressroute-or-network-virtual-appliance), later in this article.

* **(Optional) A Standard SKU [public IPv4 address](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/public-ip-addresses.md#sku)**.

  
> **Important:**
> * Starting May 2024, a public IP address resource is *no longer needed* when deploying (injecting) an API Management instance in a VNet in internal mode or migrating the internal VNet configuration to a new subnet. In external VNet mode, specifying a public IP address is *optional*; if you don't provide one, an Azure-managed public IP address is automatically configured and used for runtime API traffic. Only provide the public IP address if you want to own and control the public IP address used for inbound or outbound communication to the internet.

  * If provided, the IP address must be in the same region and subscription as the API Management instance and the virtual network.

  * When creating a public IP address resource, ensure you assign a **DNS name label** to it. In general, you should use the same DNS name as your API Management instance. If you change it, redeploy your instance so that the new DNS label is applied.

  * For best network performance, it's recommended to use the default **Routing preference**: **Microsoft network**.  

  * When creating a public IP address in a region where you plan to enable [zone redundancy](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/enable-availability-zone-support.md) for your API Management instance, configure the **Zone-redundant** setting.

  * The value of the IP address is assigned as the virtual public IPv4 address of the API Management instance in that region. 

* For multi-region API Management deployments, configure virtual network resources separately for each location.
