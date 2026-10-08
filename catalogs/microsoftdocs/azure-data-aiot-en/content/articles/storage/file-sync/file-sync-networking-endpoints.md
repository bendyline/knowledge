---
title: Configure Azure File Sync network endpoints
description: Learn how to create private endpoints, restrict public endpoint access, and use Azure Policy for Azure File Sync and Azure Files network endpoint compliance.
author: khdownie
ms.service: azure-file-storage
ms.topic: how-to
ms.date: 07/24/2026
ms.author: kendownie
ms.custom: devx-track-azurepowershell, devx-track-azurecli
# Customer intent: As a cloud administrator, I want to configure private and public network endpoints for Azure File Sync, so that I can securely manage access to file shares and enhance network security.
---

# Configure Azure File Sync network endpoints

Azure File Sync uses two Azure resources, each with its own network endpoints: the **storage account** (which holds the Azure file share) and the **Storage Sync Service** (which coordinates sync, server registration, and sync groups). Both resources use public endpoints by default.

The Azure File Sync agent communicates with both resources over HTTPS (port 443). For servers that connect to Azure over the internet with no VPN or ExpressRoute, you can use the public endpoint and no configuration is needed. However, most Azure File Sync customers want to configure private endpoints.

Use the following table to decide whether you need private endpoints. If you need them, create private endpoints for both resources.

| I need to... | Use |
| --- | --- |
| Sync servers that connect to Azure over the internet with no VPN or ExpressRoute | Public endpoints (no configuration needed) |
| Route all sync traffic through ExpressRoute or site-to-site VPN connection | [Private endpoints](#create-the-private-endpoints) for both resources |
| Meet compliance requirements prohibiting data over the public internet | [Private endpoints](#create-the-private-endpoints) for both resources |
| Disable the public endpoint as a security hardening measure | [Private endpoints](#create-the-private-endpoints) for both resources first, then [restrict access](#restrict-access-to-the-public-endpoints) |
| Implement zero-trust network access | [Private endpoints](#create-the-private-endpoints) for both resources |

For broader networking concepts, see [Azure File Sync networking considerations](file-sync-networking-overview.md). To configure endpoints for accessing Azure file shares directly (without Azure File Sync), see [Configure Azure Files network endpoints](../files/storage-files-networking-endpoints.md?toc=/azure/storage/filesync/toc.json).

## Prerequisites

This article assumes that:

- You have an Azure subscription. If you don't already have a subscription, then create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.
- You've created an SMB Azure classic file share in a storage account which you would like to connect to from on-premises. To learn how to create an Azure classic file share, see [Create an Azure classic file share](../files/create-classic-file-share.md?toc=/azure/storage/filesync/toc.json).
- Your firewall allows the required domains for communication. See [Azure File Sync firewall settings](file-sync-firewall-and-proxy.md#azure-file-sync-firewall-settings).

Additionally:

- If you intend to use Azure PowerShell, [install the latest version](https://learn.microsoft.com/powershell/azure/install-azure-powershell).
- If you intend to use the Azure CLI, [install the latest version](https://learn.microsoft.com/cli/azure/install-azure-cli).

## Create the private endpoints

When you create a private endpoint for an Azure resource, the following resources are deployed:

| Deployed resource | Description | What you do |
| --- | --- | --- |
| **Private endpoint** | An Azure resource that connects your storage account or Storage Sync Service to a network interface in your virtual network | Create one for each resource in [Create the storage account private endpoint](#create-the-storage-account-private-endpoint) and [Create the Storage Sync Service private endpoint](#create-the-storage-sync-service-private-endpoint) |
| **Network interface (NIC)** | Holds the private IP address for the private endpoint within your subnet | Created automatically with the private endpoint; no extra action required |
| **Private DNS zone** | Maps the resource's public hostname to the private endpoint IP address, so clients resolve to the private endpoint without changing connection strings | Created automatically if one doesn't exist; recommended to avoid manual DNS configuration |

> **Note:**
> This article uses the DNS suffixes for the Azure Public regions: `core.windows.net` for storage accounts and `afs.azure.net` for Storage Sync Services. This nomenclature also applies to Azure Sovereign clouds such as the Azure US Government cloud. Just substitute the appropriate suffixes for your environment.

### Create the storage account private endpoint

# [Portal](#tab/azure-portal)
Navigate to the storage account for which you would like to create a private endpoint. From the service menu, under **Security + networking**, select **Networking**, **Private endpoint connections**, and then **+ Private endpoint** to create a new private endpoint.

[Screenshot of the private endpoint connections item in the storage account service menu.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/media/storage-files-networking-endpoints-private-portal/create-private-endpoint-0.png#lightbox)

The resulting wizard has multiple pages to complete.

In the **Basics** blade, select the desired subscription, resource group, name, network interface name, and region for your private endpoint. These can be whatever you want, they don't have to match the storage account in any way, although you must create the private endpoint in the same region as the virtual network you wish to create the private endpoint in. Then select **Next: Resource**.

[Screenshot showing how to provide the project and instance details for a new private endpoint.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/media/storage-files-networking-endpoints-private-portal/private-endpoint-basics.png#lightbox)

In the **Resource** blade, select **file** for the target sub-resource. Then select **Next: Virtual Network**.

[Screenshot showing how to select which resource you would like to connect to using the new private endpoint.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/media/storage-files-networking-endpoints-private-portal/private-endpoint-resource.png#lightbox)

The **Virtual Network** blade allows you to select the specific virtual network and subnet you would like to add your private endpoint to. Select dynamic or static IP address allocation for the new private endpoint. If you select static, you'll also need to provide a name and a private IP address. You can also optionally specify an application security group. When you're finished, select **Next: DNS**.

[Screenshot showing how to provide virtual network, subnet, and IP address details for the new private endpoint.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/media/storage-files-networking-endpoints-private-portal/private-endpoint-virtual-network.png#lightbox)

The **DNS** blade contains the information for integrating your private endpoint with a private DNS zone. Make sure the subscription and resource group are correct, then select **Next: Tags**.

[Screenshot showing how to integrate your private endpoint with a private DNS zone.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/media/storage-files-networking-endpoints-private-portal/private-endpoint-dns.png#lightbox)

You can optionally apply tags to categorize your resources, such as applying the name **Environment** and the value **Test** to all testing resources. Enter name/value pairs if desired, and then select **Next: Review + create**.

[Screenshot showing how to optionally tag your private endpoint with name/value pairs for easy categorization.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/media/storage-files-networking-endpoints-private-portal/private-endpoint-tags.png#lightbox)

Select **Create** to create the private endpoint.


If you have a VM inside your virtual network, or you configured DNS forwarding as described in [Configuring DNS forwarding for Azure Files](../files/storage-files-networking-dns.md?toc=/azure/storage/filesync/toc.json), you can test that your private endpoint is set up correctly by running the following commands from PowerShell, the command line, or the terminal (works for Windows, Linux, or macOS). Replace `<storage-account-name>` with your storage account name:

```bash
nslookup <storage-account-name>.file.core.windows.net
```

If everything works successfully, you should see the following output, where `192.168.0.5` is the private IP address of the private endpoint in your virtual network (output shown for Windows):

```output
Server:  UnKnown
Address:  10.2.4.4

Non-authoritative answer:
Name:    storageaccount.privatelink.file.core.windows.net
Address:  192.168.0.5
Aliases:  storageaccount.file.core.windows.net
```

# [PowerShell](#tab/azure-powershell)
To create a private endpoint for your storage account, you first need to get a reference to your storage account and the virtual network subnet to which you want to add the private endpoint. Replace `<storage-account-resource-group-name>`,  `<storage-account-name>`, `<vnet-resource-group-name>`, `<vnet-name>`, and `<vnet-subnet-name>` below:

```PowerShell
$storageAccountResourceGroupName = "<storage-account-resource-group-name>"
$storageAccountName = "<storage-account-name>"
$virtualNetworkResourceGroupName = "<vnet-resource-group-name>"
$virtualNetworkName = "<vnet-name>"
$subnetName = "<vnet-subnet-name>"

# Get storage account reference, and throw error if it doesn't exist
$storageAccount = Get-AzStorageAccount `
        -ResourceGroupName $storageAccountResourceGroupName `
        -Name $storageAccountName `
        -ErrorAction SilentlyContinue

if ($null -eq $storageAccount) {
    $errorMessage = "Storage account $storageAccountName not found "
    $errorMessage += "in resource group $storageAccountResourceGroupName."
    Write-Error -Message $errorMessage -ErrorAction Stop
}

# Get virtual network reference, and throw error if it doesn't exist
$virtualNetwork = Get-AzVirtualNetwork `
        -ResourceGroupName $virtualNetworkResourceGroupName `
        -Name $virtualNetworkName `
        -ErrorAction SilentlyContinue

if ($null -eq $virtualNetwork) {
    $errorMessage = "Virtual network $virtualNetworkName not found "
    $errorMessage += "in resource group $virtualNetworkResourceGroupName."
    Write-Error -Message $errorMessage -ErrorAction Stop
}

# Get reference to virtual network subnet, and throw error if it doesn't exist
$subnet = $virtualNetwork | `
    Select-Object -ExpandProperty Subnets | `
    Where-Object { $_.Name -eq $subnetName }

if ($null -eq $subnet) {
    Write-Error `
            -Message "Subnet $subnetName not found in virtual network $virtualNetworkName." `
            -ErrorAction Stop
}
```

To create a private endpoint, you must create a private link service connection to the storage account. The private link service connection is an input to the creation of the private endpoint. 

```PowerShell
# Disable private endpoint network policies
$subnet.PrivateEndpointNetworkPolicies = "Disabled"
$virtualNetwork = $virtualNetwork | `
    Set-AzVirtualNetwork -ErrorAction Stop

# Create a private link service connection to the storage account.
$privateEndpointConnection = New-AzPrivateLinkServiceConnection `
        -Name "$storageAccountName-Connection" `
        -PrivateLinkServiceId $storageAccount.Id `
        -GroupId "file" `
        -ErrorAction Stop

# Create a new private endpoint.
$privateEndpoint = New-AzPrivateEndpoint `
        -ResourceGroupName $storageAccountResourceGroupName `
        -Name "$storageAccountName-PrivateEndpoint" `
        -Location $virtualNetwork.Location `
        -Subnet $subnet `
        -PrivateLinkServiceConnection $privateEndpointConnection `
        -ErrorAction Stop
```

Creating an Azure private DNS zone enables the original name of the storage account, such as `storageaccount.file.core.windows.net` to resolve to the private IP inside of the virtual network. Although optional from the perspective of creating a private endpoint, it is explicitly required for mounting the Azure file share directly using an AD user principal or accessing via the REST API.  

```PowerShell
# Get the desired storage account suffix (core.windows.net for public cloud).
# This is done like this so this script will seamlessly work for non-public Azure.
$storageAccountSuffix = Get-AzContext | `
    Select-Object -ExpandProperty Environment | `
    Select-Object -ExpandProperty StorageEndpointSuffix

# For public cloud, this will generate the following DNS suffix:
# privatelink.file.core.windows.net.
$dnsZoneName = "privatelink.file.$storageAccountSuffix"

# Find a DNS zone matching desired name attached to this virtual network.
$dnsZone = Get-AzPrivateDnsZone | `
    Where-Object { $_.Name -eq $dnsZoneName } | `
    Where-Object {
        $privateDnsLink = Get-AzPrivateDnsVirtualNetworkLink `
                -ResourceGroupName $_.ResourceGroupName `
                -ZoneName $_.Name `
                -ErrorAction SilentlyContinue
        
        $privateDnsLink.VirtualNetworkId -eq $virtualNetwork.Id
    }

if ($null -eq $dnsZone) {
    # No matching DNS zone attached to virtual network, so create new one.
    $dnsZone = New-AzPrivateDnsZone `
            -ResourceGroupName $virtualNetworkResourceGroupName `
            -Name $dnsZoneName `
            -ErrorAction Stop

    $privateDnsLink = New-AzPrivateDnsVirtualNetworkLink `
            -ResourceGroupName $virtualNetworkResourceGroupName `
            -ZoneName $dnsZoneName `
            -Name "$virtualNetworkName-DnsLink" `
            -VirtualNetworkId $virtualNetwork.Id `
            -ErrorAction Stop
}
```

Now that you have a reference to the private DNS zone, you must create an A record for your storage account.

```PowerShell
$privateEndpointIP = $privateEndpoint | `
    Select-Object -ExpandProperty NetworkInterfaces | `
    Select-Object @{ 
        Name = "NetworkInterfaces"; 
        Expression = { Get-AzNetworkInterface -ResourceId $_.Id } 
    } | `
    Select-Object -ExpandProperty NetworkInterfaces | `
    Select-Object -ExpandProperty IpConfigurations | `
    Select-Object -ExpandProperty PrivateIpAddress

$privateDnsRecordConfig = New-AzPrivateDnsRecordConfig `
        -IPv4Address $privateEndpointIP

New-AzPrivateDnsRecordSet `
        -ResourceGroupName $virtualNetworkResourceGroupName `
        -Name $storageAccountName `
        -RecordType A `
        -ZoneName $dnsZoneName `
        -Ttl 600 `
        -PrivateDnsRecords $privateDnsRecordConfig `
        -ErrorAction Stop | `
    Out-Null
```


If you have a VM inside your virtual network, or you configured DNS forwarding as described in [Configure DNS forwarding for Azure Files](../files/storage-files-networking-dns.md?toc=/azure/storage/filesync/toc.json), you can test that your private endpoint is set up correctly by using the following commands:

```powershell
$storageAccountHostName = [System.Uri]::new($storageAccount.PrimaryEndpoints.file) | `
    Select-Object -ExpandProperty Host

Resolve-DnsName -Name $storageAccountHostName
```

If everything works successfully, you should see the following output, where `192.168.0.5` is the private IP address of the private endpoint in your virtual network:

```output
Name                             Type   TTL   Section    NameHost
----                             ----   ---   -------    --------
storageaccount.file.core.windows CNAME  60    Answer     storageaccount.privatelink.file.core.windows.net
.net

Name       : storageaccount.privatelink.file.core.windows.net
QueryType  : A
TTL        : 600
Section    : Answer
IP4Address : 192.168.0.5
```

# [Azure CLI](#tab/azure-cli)
To create a private endpoint for your storage account, you first need to get a reference to your storage account and the virtual network subnet to which you want to add the private endpoint. Replace `<storage-account-resource-group-name>`,  `<storage-account-name>`, `<vnet-resource-group-name>`, `<vnet-name>`, and `<vnet-subnet-name>` below:

```bash
storageAccountResourceGroupName="<storage-account-resource-group-name>"
storageAccountName="<storage-account-name>"
virtualNetworkResourceGroupName="<vnet-resource-group-name>"
virtualNetworkName="<vnet-name>"
subnetName="<vnet-subnet-name>"

# Get storage account ID 
storageAccount=$(az storage account show \
        --resource-group $storageAccountResourceGroupName \
        --name $storageAccountName \
        --query "id" | \
    tr -d '"')

# Get virtual network ID
virtualNetwork=$(az network vnet show \
        --resource-group $virtualNetworkResourceGroupName \
        --name $virtualNetworkName \
        --query "id" | \
    tr -d '"')

# Get subnet ID
subnet=$(az network vnet subnet show \
        --resource-group $virtualNetworkResourceGroupName \
        --vnet-name $virtualNetworkName \
        --name $subnetName \
        --query "id" | \
    tr -d '"')
```

To create a private endpoint, you must first ensure that the subnet's private endpoint network policy is set to disabled. Then you can create a private endpoint with the `az network private-endpoint create` command.

```azurecli
# Disable private endpoint network policies
az network vnet subnet update \
        --ids $subnet \
        --disable-private-endpoint-network-policies \
        --output none

# Get virtual network location
region=$(az network vnet show \
        --ids $virtualNetwork \
        --query "location" | \
    tr -d '"')

# Create a private endpoint
privateEndpoint=$(az network private-endpoint create \
        --resource-group $storageAccountResourceGroupName \
        --name "$storageAccountName-PrivateEndpoint" \
        --location $region \
        --subnet $subnet \
        --private-connection-resource-id $storageAccount \
        --group-id "file" \
        --connection-name "$storageAccountName-Connection" \
        --query "id" | \
    tr -d '"')
```

Creating an Azure private DNS zone enables the original name of the storage account, such as `storageaccount.file.core.windows.net` to resolve to the private IP inside of the virtual network. Although optional from the perspective of creating a private endpoint, it is explicitly required for mounting the Azure file share using an AD user principal or accessing via the REST API.  

```bash
# Get the desired storage account suffix (core.windows.net for public cloud).
# This is done like this so this script will seamlessly work for non-public Azure.
storageAccountSuffix=$(az cloud show \
        --query "suffixes.storageEndpoint" | \
    tr -d '"')

# For public cloud, this will generate the following DNS suffix:
# privatelink.file.core.windows.net.
dnsZoneName="privatelink.file.$storageAccountSuffix"

# Find a DNS zone matching desired name attached to this virtual network.
possibleDnsZones=""
possibleDnsZones=$(az network private-dns zone list \
        --query "[?name == '$dnsZoneName'].id" \
        --output tsv)

dnsZone=""
possibleDnsZone=""
for possibleDnsZone in $possibleDnsZones
do
    possibleResourceGroupName=$(az resource show \
            --ids $possibleDnsZone \
            --query "resourceGroup" | \
        tr -d '"')
    
    link=$(az network private-dns link vnet list \
            --resource-group $possibleResourceGroupName \
            --zone-name $dnsZoneName \
            --query "[?virtualNetwork.id == '$virtualNetwork'].id" \
            --output tsv)
    
    if [ -z $link ]
    then
        echo "1" > /dev/null
    else 
        dnsZoneResourceGroup=$possibleResourceGroupName
        dnsZone=$possibleDnsZone
        break
    fi  
done

if [ -z $dnsZone ]
then
    # No matching DNS zone attached to virtual network, so create a new one
    dnsZone=$(az network private-dns zone create \
            --resource-group $virtualNetworkResourceGroupName \
            --name $dnsZoneName \
            --query "id" | \
        tr -d '"')
    
    az network private-dns link vnet create \
            --resource-group $virtualNetworkResourceGroupName \
            --zone-name $dnsZoneName \
            --name "$virtualNetworkName-DnsLink" \
            --virtual-network $virtualNetwork \
            --registration-enabled false \
            --output none
    
    dnsZoneResourceGroup=$virtualNetworkResourceGroupName
fi
```

Now that you have a reference to the private DNS zone, you must create an A record for your storage account.

```azurecli
privateEndpointNIC=$(az network private-endpoint show \
        --ids $privateEndpoint \
        --query "networkInterfaces[0].id" | \
    tr -d '"')

privateEndpointIP=$(az network nic show \
        --ids $privateEndpointNIC \
        --query "ipConfigurations[0].privateIPAddress" | \
    tr -d '"')

az network private-dns record-set a create \
        --resource-group $dnsZoneResourceGroup \
        --zone-name $dnsZoneName \
        --name $storageAccountName \
        --output none

az network private-dns record-set a add-record \
        --resource-group $dnsZoneResourceGroup \
        --zone-name $dnsZoneName \
        --record-set-name $storageAccountName \
        --ipv4-address $privateEndpointIP \
        --output none
```


If you have a VM inside your virtual network, or you configured DNS forwarding as described in [Configure DNS forwarding for Azure Files](../files/storage-files-networking-dns.md?toc=/azure/storage/filesync/toc.json), you can test that your private endpoint is set up correctly by using the following commands:

```azurecli
httpEndpoint=$(az storage account show \
        --resource-group $storageAccountResourceGroupName \
        --name $storageAccountName \
        --query "primaryEndpoints.file" | \
    tr -d '"')

hostName=$(echo $httpEndpoint | cut -c7-$(expr length $httpEndpoint) | tr -d "/")
nslookup $hostName
```

If everything works successfully, you should see the following output, where `192.168.0.5` is the private IP address of the private endpoint in your virtual network:

```output
Server:         127.0.0.53
Address:        127.0.0.53#53

Non-authoritative answer:
storageaccount.file.core.windows.net      canonical name = storageaccount.privatelink.file.core.windows.net.
Name:   storageaccount.privatelink.file.core.windows.net
Address: 192.168.0.5
```

---

### Create the Storage Sync Service private endpoint

# [Portal](#tab/azure-portal)
Go to the **Private Link Center** by typing *Private Link* into the search bar at the top of the Azure portal. In the table of contents for the Private Link Center, select **Private endpoints**, and then select **+ Add** to create a new private endpoint.

[A screenshot of the private link center](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/file-sync/media/storage-sync-files-networking-endpoints/create-storage-sync-private-endpoint-0.png#lightbox)

The resulting wizard has multiple pages to complete.

In the **Basics** tab, select the resource group, name, and region for your private endpoint. These values can be any valid values. They don't need to match the Storage Sync Service in any way, but you must create the private endpoint in the same region as the virtual network you select.

A screenshot of the Basics section of the create private endpoint section

In the **Resource** tab, select **Connect to an Azure resource in my directory**. Under the **Resource type**, select **Microsoft.StorageSync/storageSyncServices**.

The **Configuration** tab allows you to select the specific virtual network and subnet you want to add your private endpoint to. Select the same virtual network as the one you used for the storage account. The **Configuration** tab also contains the information for creating and updating the private DNS zone.

Select **Review + create** to create the private endpoint.

You can test that your private endpoint is set up correctly by running the following PowerShell commands.

```powershell
$privateEndpointResourceGroupName = "<your-private-endpoint-resource-group>"
$privateEndpointName = "<your-private-endpoint-name>"

Get-AzPrivateEndpoint `
        -ResourceGroupName $privateEndpointResourceGroupName `
        -Name $privateEndpointName `
        -ErrorAction Stop | `
    Select-Object -ExpandProperty NetworkInterfaces | `
    Select-Object -ExpandProperty Id | `
    ForEach-Object { Get-AzNetworkInterface -ResourceId $_ } | `
    Select-Object -ExpandProperty IpConfigurations | `
    Select-Object -ExpandProperty PrivateLinkConnectionProperties | `
    Select-Object -ExpandProperty Fqdns | `
    ForEach-Object { Resolve-DnsName -Name $_ } | `
    Format-List
```

If everything works correctly, you should see the following output where `192.168.1.4`, `192.168.1.5`, `192.168.1.6`, and `192.168.1.7` are the private IP addresses assigned to the private endpoint:

```output
Name     : mysssmanagement.westus2.afs.azure.net
Type     : CNAME
TTL      : 60
Section  : Answer
NameHost : mysssmanagement.westus2.privatelink.afs.azure.net


Name       : mysssmanagement.westus2.privatelink.afs.azure.net
QueryType  : A
TTL        : 60
Section    : Answer
IP4Address : 192.168.1.4

Name     : myssssyncp.westus2.afs.azure.net
Type     : CNAME
TTL      : 60
Section  : Answer
NameHost : myssssyncp.westus2.privatelink.afs.azure.net


Name       : myssssyncp.westus2.privatelink.afs.azure.net
QueryType  : A
TTL        : 60
Section    : Answer
IP4Address : 192.168.1.5

Name     : myssssyncs.westus2.afs.azure.net
Type     : CNAME
TTL      : 60
Section  : Answer
NameHost : myssssyncs.westus2.privatelink.afs.azure.net


Name       : myssssyncs.westus2.privatelink.afs.azure.net
QueryType  : A
TTL        : 60
Section    : Answer
IP4Address : 192.168.1.6

Name     : mysssmonitoring.westus2.afs.azure.net
Type     : CNAME
TTL      : 60
Section  : Answer
NameHost : mysssmonitoring.westus2.privatelink.afs.azure.net


Name       : mysssmonitoring.westus2.privatelink.afs.azure.net
QueryType  : A
TTL        : 60
Section    : Answer
IP4Address : 192.168.1.7

```

# [PowerShell](#tab/azure-powershell)
To create a private endpoint for your Storage Sync Service, first get a reference to your Storage Sync Service. Replace `<storage-sync-service-resource-group>` and `<storage-sync-service>` with the correct values for your environment. The following PowerShell commands assume that you already populated the virtual network information.

```powershell
$storageSyncServiceResourceGroupName = "<storage-sync-service-resource-group>"
$storageSyncServiceName = "<storage-sync-service>"

$storageSyncService = Get-AzStorageSyncService `
        -ResourceGroupName $storageSyncServiceResourceGroupName `
        -Name $storageSyncServiceName `
        -ErrorAction SilentlyContinue

if ($null -eq $storageSyncService) {
    $errorMessage = "Storage Sync Service $storageSyncServiceName not found "
    $errorMessage += "in resource group $storageSyncServiceResourceGroupName."
    Write-Error -Message $errorMessage -ErrorAction Stop
}
```

To create a private endpoint, you must create a private link service connection to the Storage Sync Service. The private link connection is an input to the creation of the private endpoint.

```powershell
# Disable private endpoint network policies
$subnet.PrivateEndpointNetworkPolicies = "Disabled"
$virtualNetwork = $virtualNetwork | `
    Set-AzVirtualNetwork -ErrorAction Stop

# Create a private link service connection to the storage account
$privateEndpointConnection = New-AzPrivateLinkServiceConnection `
        -Name "$storageSyncServiceName-Connection" `
        -PrivateLinkServiceId $storageSyncService.ResourceId `
        -GroupId "Afs" `
        -ErrorAction Stop

# Create a new private endpoint
$privateEndpoint = New-AzPrivateEndpoint `
        -ResourceGroupName $storageSyncServiceResourceGroupName `
        -Name "$storageSyncServiceName-PrivateEndpoint" `
        -Location $virtualNetwork.Location `
        -Subnet $subnet `
        -PrivateLinkServiceConnection $privateEndpointConnection `
        -ErrorAction Stop
```

Creating an Azure private DNS zone enables the host names for the Storage Sync Service, such as `mysssmanagement.westus2.afs.azure.net`, to resolve to the correct private IPs for the Storage Sync Service inside of the virtual network. Although optional from the perspective of creating a private endpoint, it's explicitly required for the Azure File Sync agent to access the Storage Sync Service.

```powershell
# Get the desired Storage Sync Service suffix (afs.azure.net for public cloud)
# This is done like this so this script will seamlessly work for non-public Azure
$azureEnvironment = Get-AzContext | `
    Select-Object -ExpandProperty Environment | `
    Select-Object -ExpandProperty Name

switch($azureEnvironment) {
    "AzureCloud" {
        $storageSyncSuffix = "afs.azure.net"
    }

    "AzureUSGovernment" {
        $storageSyncSuffix = "afs.azure.us"
    }

   "AzureChinaCloud" {
        $storageSyncSuffix = "afs.azure.cn"
    }

    default {
        Write-Error
                -Message "The Azure environment $_ is not currently supported by Azure File Sync." `
                -ErrorAction Stop
    }
}

# For public cloud, this will generate the following DNS suffix:
# privatelink.afs.azure.net
$dnsZoneName = "privatelink.$storageSyncSuffix"

# Find a DNS zone matching desired name attached to this virtual network
$dnsZone = Get-AzPrivateDnsZone | `
    Where-Object { $_.Name -eq $dnsZoneName } | `
    Where-Object {
        $privateDnsLink = Get-AzPrivateDnsVirtualNetworkLink `
                -ResourceGroupName $_.ResourceGroupName `
                -ZoneName $_.Name `
                -ErrorAction SilentlyContinue

        $privateDnsLink.VirtualNetworkId -eq $virtualNetwork.Id
    }

if ($null -eq $dnsZone) {
    # No matching DNS zone attached to virtual network, so create a new one
    $dnsZone = New-AzPrivateDnsZone `
            -ResourceGroupName $virtualNetworkResourceGroupName `
            -Name $dnsZoneName `
            -ErrorAction Stop

    $privateDnsLink = New-AzPrivateDnsVirtualNetworkLink `
            -ResourceGroupName $virtualNetworkResourceGroupName `
            -ZoneName $dnsZoneName `
            -Name "$virtualNetworkName-DnsLink" `
            -VirtualNetworkId $virtualNetwork.Id `
            -ErrorAction Stop
}
```
Now that you have a reference to the private DNS zone, you must create an A record for your Storage Sync Service.

```powershell
$privateEndpointIpFqdnMappings = $privateEndpoint | `
    Select-Object -ExpandProperty NetworkInterfaces | `
    Select-Object -ExpandProperty Id | `
    ForEach-Object { Get-AzNetworkInterface -ResourceId $_ } | `
    Select-Object -ExpandProperty IpConfigurations | `
    ForEach-Object {
        $privateIpAddress = $_.PrivateIpAddress;
        $_ | `
            Select-Object -ExpandProperty PrivateLinkConnectionProperties | `
            Select-Object -ExpandProperty Fqdns | `
            Select-Object `
                @{
                    Name = "PrivateIpAddress";
                    Expression = { $privateIpAddress }
                }, `
                @{
                    Name = "FQDN";
                    Expression = { $_ }
                }
    }

foreach($ipFqdn in $privateEndpointIpFqdnMappings) {
    $privateDnsRecordConfig = New-AzPrivateDnsRecordConfig `
        -IPv4Address $ipFqdn.PrivateIpAddress

    $dnsEntry = $ipFqdn.FQDN.Substring(0,
        $ipFqdn.FQDN.IndexOf(".", $ipFqdn.FQDN.IndexOf(".") + 1))

    New-AzPrivateDnsRecordSet `
            -ResourceGroupName $virtualNetworkResourceGroupName `
            -Name $dnsEntry `
            -RecordType A `
            -ZoneName $dnsZoneName `
            -Ttl 600 `
            -PrivateDnsRecords $privateDnsRecordConfig `
            -ErrorAction Stop | `
        Out-Null
}
```

# [Azure CLI](#tab/azure-cli)
To create a private endpoint for your Storage Sync Service, first get a reference to your Storage Sync Service. Replace `<storage-sync-service-resource-group>` and `<storage-sync-service>` with the correct values for your environment. The following CLI commands assume that you already populated the virtual network information.

```azurecli
storageSyncServiceResourceGroupName="<storage-sync-service-resource-group>"
storageSyncServiceName="<storage-sync-service>"

storageSyncService=$(az resource show \
        --resource-group $storageSyncServiceResourceGroupName \
        --name $storageSyncServiceName \
        --resource-type "Microsoft.StorageSync/storageSyncServices" \
        --query "id" | \
    tr -d '"')

storageSyncServiceRegion=$(az resource show \
        --resource-group $storageSyncServiceResourceGroupName \
        --name $storageSyncServiceName \
        --resource-type "Microsoft.StorageSync/storageSyncServices" \
        --query "location" | \
    tr -d '"')
```

To create a private endpoint, first ensure that the subnet's private endpoint network policy is set to **disabled**. Then create a private endpoint by using the `az network private-endpoint create` command.

```azurecli
# Disable private endpoint network policies
az network vnet subnet update \
        --ids $subnet \
        --disable-private-endpoint-network-policies \
        --output none

# Get virtual network location
region=$(az network vnet show \
        --ids $virtualNetwork \
        --query "location" | \
    tr -d '"')

# Create a private endpoint
privateEndpoint=$(az network private-endpoint create \
        --resource-group $storageSyncServiceResourceGroupName \
        --name "$storageSyncServiceName-PrivateEndpoint" \
        --location $region \
        --subnet $subnet \
        --private-connection-resource-id $storageSyncService \
        --group-id "Afs" \
        --connection-name "$storageSyncServiceName-Connection" \
        --query "id" | \
    tr -d '"')
```

Creating an Azure private DNS zone enables the host names for the Storage Sync Service, such as `mysssmanagement.westus2.afs.azure.net`, to resolve to the correct private IPs for the Storage Sync Service inside of the virtual network. Although optional from the perspective of creating a private endpoint, it's explicitly required for the Azure File Sync agent to access the Storage Sync Service.

```azurecli
# Get the desired storage account suffix (afs.azure.net for public cloud)
# This is done like this so this script will seamlessly work for non-public Azure
azureEnvironment=$(az cloud show \
        --query "name" |
    tr -d '"')

storageSyncSuffix=""
if [ $azureEnvironment == "AzureCloud" ]
then
    storageSyncSuffix="afs.azure.net"
elif [ $azureEnvironment == "AzureUSGovernment" ]
then
    storageSyncSuffix="afs.azure.us"
else
    echo "Unsupported Azure environment $azureEnvironment."
fi

# For public cloud, this will generate the following DNS suffix:
# privatelink.afs.azure.net
dnsZoneName="privatelink.$storageSyncSuffix"

# Find a DNS zone matching desired name attached to this virtual network
possibleDnsZones=""
possibleDnsZones=$(az network private-dns zone list \
        --query "[?name == '$dnsZoneName'].id" \
        --output tsv)

dnsZone=""
possibleDnsZone=""
for possibleDnsZone in $possibleDnsZones
do
    possibleResourceGroupName=$(az resource show \
            --ids $possibleDnsZone \
            --query "resourceGroup" | \
        tr -d '"')

    link=$(az network private-dns link vnet list \
            --resource-group $possibleResourceGroupName \
            --zone-name $dnsZoneName \
            --query "[?virtualNetwork.id == '$virtualNetwork'].id" \
            --output tsv)

    if [ -z $link ]
    then
        echo "1" > /dev/null
    else
        dnsZoneResourceGroup=$possibleResourceGroupName
        dnsZone=$possibleDnsZone
        break
    fi
done

if [ -z $dnsZone ]
then
    # No matching DNS zone attached to virtual network, so create a new one
    dnsZone=$(az network private-dns zone create \
            --resource-group $virtualNetworkResourceGroupName \
            --name $dnsZoneName \
            --query "id" | \
        tr -d '"')

    az network private-dns link vnet create \
            --resource-group $virtualNetworkResourceGroupName \
            --zone-name $dnsZoneName \
            --name "$virtualNetworkName-DnsLink" \
            --virtual-network $virtualNetwork \
            --registration-enabled false \
            --output none

    dnsZoneResourceGroup=$virtualNetworkResourceGroupName
fi
```

Now that you have a reference to the private DNS zone, you must create an A record for your Storage Sync Service.

```bash
privateEndpointNIC=$(az network private-endpoint show \
        --ids $privateEndpoint \
        --query "networkInterfaces[0].id" | \
    tr -d '"')

privateIpAddresses=$(az network nic show \
        --ids $privateEndpointNIC \
        --query "ipConfigurations[].privateIpAddress" \
        --output tsv)

hostNames=$(az network nic show \
        --ids $privateEndpointNIC \
        --query "ipConfigurations[].privateLinkConnectionProperties.fqdns[]" \
        --output tsv)

i=0
for privateIpAddress in $privateIpAddresses
do
    j=0
    targetHostName=""
    for hostName in $hostNames
    do
        if [ $i == $j ]
        then
            targetHostName=$hostName
            break
        fi

        j=$(expr $j + 1)
    done

    endpointName=$(echo $targetHostName | \
        cut -c1-$(expr $(expr index $targetHostName ".") - 1))

    az network private-dns record-set a create \
        --resource-group $dnsZoneResourceGroup \
        --zone-name $dnsZoneName \
        --name "$endpointName.$storageSyncServiceRegion" \
        --output none

    az network private-dns record-set a add-record \
        --resource-group $dnsZoneResourceGroup \
        --zone-name $dnsZoneName \
        --record-set-name "$endpointName.$storageSyncServiceRegion" \
        --ipv4-address $privateIpAddress \
        --output none

    i=$(expr $i + 1)
done
```
---

## Restrict access to the public endpoints

You can restrict access to the public endpoints of both the storage account and the Storage Sync Services. Restricting access to the public endpoint provides additional security by ensuring that network packets are only accepted from approved locations.

### Restrict access to the storage account public endpoint

You can restrict access to the public endpoint by using the storage account firewall settings. In general, most firewall policies for a storage account restrict networking access to one or more virtual networks. To restrict access to a storage account to a virtual network, use one of the following approaches:

- [Create one or more private endpoints for the storage account](#create-the-storage-account-private-endpoint) and disable access to the public endpoint. This ensures that only traffic originating from within the desired virtual networks can access the Azure file shares within the storage account.
- Restrict the public endpoint to one or more virtual networks. This approach works by using a capability of the virtual network called *service endpoints*. When you restrict the traffic to a storage account through a service endpoint, you're still accessing the storage account through the public IP address.

> **Note:**
> To allow trusted first-party Microsoft services such as Azure File Sync to access the storage account, select the **Allow trusted Microsoft services to access this resource** checkbox on your storage account. For more information, see [Restrict access to the public endpoint to specific networks](../files/storage-files-networking-endpoints.md#restrict-access-to-the-public-endpoint-to-specific-networks).

> **Important:**
> **Azure File Sync has a known limitation with network security perimeters (NSP).**
> Storage Sync Services can't be placed inside a perimeter, and full perimeter integration isn't supported.
>
> To connect a Storage Sync Service to a storage account protected by an NSP:
> 1. Configure the Storage Sync Service to use [Managed Identities](file-sync-managed-identities.md).
> 2. Create an NSP inbound profile rule that allowlists the subscription hosting the Storage Sync Service.
>
> Storage Sync Services must remain outside the perimeter for sync to function correctly.

#### Grant access to trusted Azure services and disable access to the storage account public endpoint

When you disable access to the public endpoint, you can still access the storage account through its private endpoint, but requests to the storage account's public endpoint are rejected.

# [Portal](#tab/azure-portal)
Navigate to the storage account for which you would like to restrict all access to the public endpoint. In the table of contents for the storage account, select **Networking**.

At the top of the page, select the **Enabled from selected virtual networks and IP addresses** radio button. This will un-hide a number of settings for controlling the restriction of the public endpoint. Select **Allow Azure services on the trusted services list to access this storage account** to allow trusted first party Microsoft services such as Azure File Sync to access the storage account.

Screenshot of the Networking blade with the required settings to disable access to the storage account public endpoint.


# [PowerShell](#tab/azure-powershell)
The following PowerShell command will deny all traffic to the storage account's public endpoint. Note that this command has the `-Bypass` parameter set to `AzureServices`. This will allow trusted first party services such as Azure File Sync to access the storage account via the public endpoint.

```PowerShell
# This assumes $storageAccount is still defined from the beginning of this of this guide.
$storageAccount | Update-AzStorageAccountNetworkRuleSet `
        -DefaultAction Deny `
        -Bypass AzureServices `
        -WarningAction SilentlyContinue `
        -ErrorAction Stop | `
    Out-Null
```


# [Azure CLI](#tab/azure-cli)
The following CLI command will deny all traffic to the storage account's public endpoint. Note that this command has the `-bypass` parameter set to `AzureServices`. This will allow trusted first party services such as Azure File Sync to access the storage account via the public endpoint.

```azurecli
# This assumes $storageAccountResourceGroupName and $storageAccountName 
# are still defined from the beginning of this guide.
az storage account update \
    --resource-group $storageAccountResourceGroupName \
    --name $storageAccountName \
    --bypass "AzureServices" \
    --default-action "Deny" \
    --output none
```

---

#### Grant access to trusted Azure services and restrict access to the storage account public endpoint to specific virtual networks

When you restrict the storage account to specific virtual networks, you're allowing requests to the public endpoint from within the specified virtual networks. This works by using a capability of the virtual network called *service endpoints*. This can be used with or without private endpoints.

# [Portal](#tab/azure-portal)

Navigate to the storage account for which you would like to restrict the public endpoint to specific virtual networks. In the table of contents for the storage account, select **Networking**. 

At the top of the page, select the **Enabled from selected virtual networks and IP addresses** radio button. This will un-hide a number of settings for controlling the restriction of the public endpoint. Select **+Add existing virtual network** to select the specific virtual network that should be allowed to access the storage account via the public endpoint. Select a virtual network and a subnet for that virtual network, and then select **Enable**.

Select **Allow Azure services on the trusted services list to access this storage account** to allow trusted first party Microsoft services such as Azure File Sync to access the storage account.

Screenshot of the Networking blade with a specific virtual network allowed to access the storage account via the public endpoint.


# [PowerShell](#tab/azure-powershell)

To restrict access to the storage account's public endpoint to specific virtual networks using service endpoints, we first need to collect information about the storage account and virtual network. Fill in `<storage-account-resource-group>`, `<storage-account-name>`, `<vnet-resource-group-name>`, `<vnet-name>`, and `<subnet-name>` to collect this information.

```PowerShell
$storageAccountResourceGroupName = "<storage-account-resource-group>"
$storageAccountName = "<storage-account-name>"
$restrictToVirtualNetworkResourceGroupName = "<vnet-resource-group-name>"
$restrictToVirtualNetworkName = "<vnet-name>"
$subnetName = "<subnet-name>"

$storageAccount = Get-AzStorageAccount `
        -ResourceGroupName $storageAccountResourceGroupName `
        -Name $storageAccountName `
        -ErrorAction Stop

$virtualNetwork = Get-AzVirtualNetwork `
        -ResourceGroupName $restrictToVirtualNetworkResourceGroupName `
        -Name $restrictToVirtualNetworkName `
        -ErrorAction Stop

$subnet = $virtualNetwork | `
    Select-Object -ExpandProperty Subnets | `
    Where-Object { $_.Name -eq $subnetName }

if ($null -eq $subnet) {
    Write-Error `
            -Message "Subnet $subnetName not found in virtual network $restrictToVirtualNetworkName." `
            -ErrorAction Stop
}
```

In order for traffic from the virtual network to be allowed by the Azure network fabric to get to the storage account public endpoint, the virtual network's subnet must have the `Microsoft.Storage` service endpoint exposed. The following PowerShell commands will add the `Microsoft.Storage` service endpoint to the subnet if it's not already there.

```PowerShell
$serviceEndpoints = $subnet | `
    Select-Object -ExpandProperty ServiceEndpoints | `
    Select-Object -ExpandProperty Service

if ($serviceEndpoints -notcontains "Microsoft.Storage") {
    if ($null -eq $serviceEndpoints) {
        $serviceEndpoints = @("Microsoft.Storage")
    } elseif ($serviceEndpoints -is [string]) {
        $serviceEndpoints = @($serviceEndpoints, "Microsoft.Storage")
    } else {
        $serviceEndpoints += "Microsoft.Storage"
    }

    $virtualNetwork = $virtualNetwork | Set-AzVirtualNetworkSubnetConfig `
            -Name $subnetName `
            -AddressPrefix $subnet.AddressPrefix `
            -ServiceEndpoint $serviceEndpoints `
            -WarningAction SilentlyContinue `
            -ErrorAction Stop | `
        Set-AzVirtualNetwork `
            -ErrorAction Stop
}
```

The final step in restricting traffic to the storage account is to create a networking rule and add to the storage account's network rule set.

```PowerShell
$networkRule = $storageAccount | Add-AzStorageAccountNetworkRule `
    -VirtualNetworkResourceId $subnet.Id `
    -ErrorAction Stop

$storageAccount | Update-AzStorageAccountNetworkRuleSet `
        -DefaultAction Deny `
        -Bypass AzureServices `
        -VirtualNetworkRule $networkRule `
        -WarningAction SilentlyContinue `
        -ErrorAction Stop | `
    Out-Null
```


# [Azure CLI](#tab/azure-cli)

To restrict access to the storage account's public endpoint to specific virtual networks using service endpoints, we first need to collect information about the storage account and virtual network. Fill in `<storage-account-resource-group>`, `<storage-account-name>`, `<vnet-resource-group-name>`, `<vnet-name>`, and `<subnet-name>` to collect this information.

```bash
storageAccountResourceGroupName="<storage-account-resource-group>"
storageAccountName="<storage-account-name>"
restrictToVirtualNetworkResourceGroupName="<vnet-resource-group-name>"
restrictToVirtualNetworkName="<vnet-name>"
subnetName="<subnet-name>"

storageAccount=$(az storage account show \
        --resource-group $storageAccountResourceGroupName \
        --name $storageAccountName \
        --query "id" | \
    tr -d '"')

virtualNetwork=$(az network vnet show \
        --resource-group $restrictToVirtualNetworkResourceGroupName \
        --name $restrictToVirtualNetworkName \
        --query "id" | \
    tr -d '"')

subnet=$(az network vnet subnet show \
        --resource-group $restrictToVirtualNetworkResourceGroupName \
        --vnet-name $restrictToVirtualNetworkName \
        --name $subnetName \
        --query "id" | \
    tr -d '"')
```

In order for traffic from the virtual network to be allowed by the Azure network fabric to get to the storage account public endpoint, the virtual network's subnet must have the `Microsoft.Storage` service endpoint exposed. The following CLI commands will add the `Microsoft.Storage` service endpoint to the subnet if it's not already there.

```bash
serviceEndpoints=$(az network vnet subnet show \
        --resource-group $restrictToVirtualNetworkResourceGroupName \
        --vnet-name $restrictToVirtualNetworkName \
        --name $subnetName \
        --query "serviceEndpoints[].service" \
        --output tsv)

foundStorageServiceEndpoint=false
for serviceEndpoint in $serviceEndpoints
do
    if [ $serviceEndpoint = "Microsoft.Storage" ]
    then
        foundStorageServiceEndpoint=true
    fi
done

if [ $foundStorageServiceEndpoint = false ] 
then
    serviceEndpointList=""

    for serviceEndpoint in $serviceEndpoints
    do
        serviceEndpointList+=$serviceEndpoint
        serviceEndpointList+=" "
    done
    
    serviceEndpointList+="Microsoft.Storage"

    az network vnet subnet update \
            --ids $subnet \
            --service-endpoints $serviceEndpointList \
            --output none
fi
```

The final step in restricting traffic to the storage account is to create a networking rule and add to the storage account's network rule set.

```azurecli
az storage account network-rule add \
        --resource-group $storageAccountResourceGroupName \
        --account-name $storageAccountName \
        --subnet $subnet \
        --output none

az storage account update \
        --resource-group $storageAccountResourceGroupName \
        --name $storageAccountName \
        --bypass "AzureServices" \
        --default-action "Deny" \
        --output none
```


---

### Disable access to the Storage Sync Service public endpoint

Azure File Sync enables you to restrict access to specific virtual networks through private endpoints only; Azure File Sync doesn't support service endpoints for restricting access to the public endpoint to specific virtual networks. This means that the two states for the Storage Sync Service's public endpoint are **enabled** and **disabled**.

> **Important:**
> You must create a private endpoint before disabling access to the public endpoint. If the public endpoint is disabled and there's no private endpoint configured, sync can't work.

# [Portal](#tab/azure-portal)
To disable access to the Storage Sync Service's public endpoint, follow these steps:

1. Sign in to the [Azure portal](https://portal.azure.com?azure-portal=true).
1. Go to the Storage Sync Service and select **Settings** > **Network** from the left navigation.
1. Under **Allow access from**, select **Private endpoints only**.
1. Select a private endpoint from the **Private endpoint connections** list.

# [PowerShell](#tab/azure-powershell)
To disable access to the Storage Sync Service public endpoint, set the `incomingTrafficPolicy` property on the Storage Sync Service to `AllowVirtualNetworksOnly`. To enable access to the Storage Sync Service public endpoint, set `incomingTrafficPolicy` to `AllowAllTraffic`. Replace `<storage-sync-service-resource-group>` and `<storage-sync-service>` with your own values.

```powershell
$storageSyncServiceResourceGroupName = "<storage-sync-service-resource-group>"
$storageSyncServiceName = "<storage-sync-service>"

Set-AzStorageSyncService `
    -ResourceGroupName $storageSyncServiceResourceGroupName `
    -Name $storageSyncServiceName `
    -IncomingTrafficPolicy AllowVirtualNetworksOnly
```

# [Azure CLI](#tab/azure-cli)
Azure CLI doesn't support setting the `incomingTrafficPolicy` property on the Storage Sync Service. Select the Azure PowerShell tab for instructions on how to disable the Storage Sync Service public endpoint.

---

## Azure Policy for Azure Files and Azure File Sync

Azure Policy helps enforce organization standards and assess compliance against those standards at scale. Azure Files and Azure File Sync expose several useful audit and remediation network policies that help you monitor and automate your deployment.

Policies audit your environment and alert you if your storage accounts or Storage Sync Services diverge from the defined behavior. For example, the policy alerts you if a public endpoint is enabled when your policy was set to disable the public endpoints. Modify and deploy policies can proactively modify a resource (such as the Storage Sync Service) or deploy resources (such as private endpoints) to align with the policies.

The following pre-defined policies are available for Azure Files and Azure File Sync:

| Action | Service | Condition | Policy name |
| --- | --- | --- | --- |
| Audit | Azure Files | The storage account's public endpoint is enabled. See [Grant access to trusted Azure services and disable access to the storage account public endpoint](#grant-access-to-trusted-azure-services-and-disable-access-to-the-storage-account-public-endpoint) for more information. | Storage accounts should restrict network access |
| Audit | Azure File Sync | The Storage Sync Service's public endpoint is enabled. See [Disable access to the Storage Sync Service public endpoint](#disable-access-to-the-storage-sync-service-public-endpoint) for more information. | Public network access should be disabled for Azure File Sync |
| Audit | Azure Files | The storage account needs at least one private endpoint. See [Create the storage account private endpoint](#create-the-storage-account-private-endpoint) for more information. | Storage account should use a private link connection |
| Audit | Azure File Sync | The Storage Sync Service needs at least one private endpoint. See [Create the Storage Sync Service private endpoint](#create-the-storage-sync-service-private-endpoint) for more information. | Azure File Sync should use private link |
| Modify | Azure File Sync | Disable the Storage Sync Service's public endpoint. | Modify - Configure Azure File Sync to disable public network access |
| Deploy | Azure File Sync | Deploy a private endpoint for the Storage Sync Service. | Configure Azure File Sync with private endpoints |
| Deploy | Azure File Sync | Deploy an A record to privatelink.afs.azure.net DNS zone. | Configure Azure File Sync to use private DNS zones |

### Set up a private endpoint deployment policy

To set up a private endpoint deployment policy, follow these steps:

1. Sign in to the [Azure portal](https://portal.azure.com/) and search for **Policy**. Select **Policy** from the results.
1. Go to **Authoring** > **Definitions** in the Policy center's table of contents.
1. In the **Definitions** pane, select the **Storage** category in the category filter, or search for **Configure Azure File Sync with private endpoints**.
1. Select **...** next to the policy and then select **Assign**.
1. On the **Basics** page, optionally set a scope, exclusion list, and a friendly name for the policy. Select **Next**.
1. On the **Parameters** page, select **...** next to the **privateEndpointSubnetId** field. Select the virtual network and subnet where the private endpoints for your Storage Sync Service resources should be deployed. The wizard might take several seconds to load available virtual networks. Select **Next**.
1. On the **Remediation** page, select **Create a remediation task** so that the private endpoint is deployed when a Storage Sync Service without a private endpoint is identified.
1. Select **Review + create** to review the policy assignment, and then select **Create**.

The resulting policy assignment will be executed on a periodic basis and might not run immediately after being created.

## See also

- [Plan for an Azure File Sync deployment](file-sync-planning.md)
- [Deploy Azure File Sync](file-sync-deployment-guide.md)
