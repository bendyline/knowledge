---
title: List of sample Azure Resource Graph queries by category
description: List sample queries for Azure Resource-Graph. Categories include Tags, Azure Advisor, Key Vault, Kubernetes, Guest Configuration, and more.
ms.date: 06/05/2024
ms.topic: sample
author: jaspkaur28
ms.author: jaspkaur
---

# Azure Resource Graph sample queries by category

This page is a collection of Azure Resource Graph sample queries grouped by general and service
categories. To jump to a specific **category**, use the links on the top of the page.
Otherwise, use <kbd>Ctrl</kbd>-<kbd>F</kbd> to use your browser's search feature.

## Azure Advisor


### Get cost savings summary from Azure Advisor

This query summarizes the cost savings of each [Azure Advisor](https://learn.microsoft.com/azure/advisor/advisor-overview) recommendation.

```kusto
AdvisorResources
| where type == 'microsoft.advisor/recommendations'
| where properties.category == 'Cost'
| extend
  resources = tostring(properties.resourceMetadata.resourceId),
  savings = todouble(properties.extendedProperties.savingsAmount),
  solution = tostring(properties.shortDescription.solution),
  currency = tostring(properties.extendedProperties.savingsCurrency)
| summarize
  dcount(resources),
  bin(sum(savings), 0.01)
  by solution, currency
| project solution, dcount_resources, sum_savings, currency
| order by sum_savings desc
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "AdvisorResources | where type == 'microsoft.advisor/recommendations' | where properties.category == 'Cost' | extend resources = tostring(properties.resourceMetadata.resourceId), savings = todouble(properties.extendedProperties.savingsAmount), solution = tostring(properties.shortDescription.solution), currency = tostring(properties.extendedProperties.savingsCurrency) | summarize dcount(resources), bin(sum(savings), 0.01) by solution, currency | project solution, dcount_resources, sum_savings, currency | order by sum_savings desc"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "AdvisorResources | where type == 'microsoft.advisor/recommendations' | where properties.category == 'Cost' | extend resources = tostring(properties.resourceMetadata.resourceId), savings = todouble(properties.extendedProperties.savingsAmount), solution = tostring(properties.shortDescription.solution), currency = tostring(properties.extendedProperties.savingsCurrency) | summarize dcount(resources), bin(sum(savings), 0.01) by solution, currency | project solution, dcount_resources, sum_savings, currency | order by sum_savings desc"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/AdvisorResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.advisor%2frecommendations%27%0a%7c%20where%20properties.category%20%3d%3d%20%27Cost%27%0a%7c%20extend%0a%09resources%20%3d%20tostring(properties.resourceMetadata.resourceId)%2c%0a%09savings%20%3d%20todouble(properties.extendedProperties.savingsAmount)%2c%0a%09solution%20%3d%20tostring(properties.shortDescription.solution)%2c%0a%09currency%20%3d%20tostring(properties.extendedProperties.savingsCurrency)%0a%7c%20summarize%0a%09dcount(resources)%2c%0a%09bin(sum(savings)%2c%200.01)%0a%09by%20solution%2c%20currency%0a%7c%20project%20solution%2c%20dcount_resources%2c%20sum_savings%2c%20currency%0a%7c%20order%20by%20sum_savings%20desc" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/AdvisorResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.advisor%2frecommendations%27%0a%7c%20where%20properties.category%20%3d%3d%20%27Cost%27%0a%7c%20extend%0a%09resources%20%3d%20tostring(properties.resourceMetadata.resourceId)%2c%0a%09savings%20%3d%20todouble(properties.extendedProperties.savingsAmount)%2c%0a%09solution%20%3d%20tostring(properties.shortDescription.solution)%2c%0a%09currency%20%3d%20tostring(properties.extendedProperties.savingsCurrency)%0a%7c%20summarize%0a%09dcount(resources)%2c%0a%09bin(sum(savings)%2c%200.01)%0a%09by%20solution%2c%20currency%0a%7c%20project%20solution%2c%20dcount_resources%2c%20sum_savings%2c%20currency%0a%7c%20order%20by%20sum_savings%20desc" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/AdvisorResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.advisor%2frecommendations%27%0a%7c%20where%20properties.category%20%3d%3d%20%27Cost%27%0a%7c%20extend%0a%09resources%20%3d%20tostring(properties.resourceMetadata.resourceId)%2c%0a%09savings%20%3d%20todouble(properties.extendedProperties.savingsAmount)%2c%0a%09solution%20%3d%20tostring(properties.shortDescription.solution)%2c%0a%09currency%20%3d%20tostring(properties.extendedProperties.savingsCurrency)%0a%7c%20summarize%0a%09dcount(resources)%2c%0a%09bin(sum(savings)%2c%200.01)%0a%09by%20solution%2c%20currency%0a%7c%20project%20solution%2c%20dcount_resources%2c%20sum_savings%2c%20currency%0a%7c%20order%20by%20sum_savings%20desc" target="_blank">portal.azure.cn</a>

---


## Azure App Service


### List all Azure App Service resources

List all Azure App Service resources.

```kusto
Resources
| where type in ('microsoft.web/sites', 'microsoft.web/sites/slots', 'microsoft.web/serverfarms', 'microsoft.web/environment', 'microsoft.web/hostingenvironment')
| project name, type, kind, location, resourceGroup, sku , properties
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type in ('microsoft.web/sites', 'microsoft.web/sites/slots', 'microsoft.web/serverfarms', 'microsoft.web/environment', 'microsoft.web/hostingenvironment') | project name, type, kind, location, resourceGroup, sku , properties"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type in ('microsoft.web/sites', 'microsoft.web/sites/slots', 'microsoft.web/serverfarms', 'microsoft.web/environment', 'microsoft.web/hostingenvironment') | project name, type, kind, location, resourceGroup, sku , properties"
```

# [Portal](#tab/azure-portal)

- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0D%0A%7C%20where%20type%20in%20('microsoft.web%2Fsites'%2C%20'microsoft.web%2Fsites%2Fslots'%2C%20'microsoft.web%2Fserverfarms'%2C%20'microsoft.web%2Fenvironment'%2C%20'microsoft.web%2Fhostingenvironment')%0D%0A%7C%20project%20name%2C%20type%2C%20kind%2C%20location%2C%20resourceGroup%2C%20sku%20%2C%20properties" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0D%0A%7C%20where%20type%20in%20('microsoft.web%2Fsites'%2C%20'microsoft.web%2Fsites%2Fslots'%2C%20'microsoft.web%2Fserverfarms'%2C%20'microsoft.web%2Fenvironment'%2C%20'microsoft.web%2Fhostingenvironment')%0D%0A%7C%20project%20name%2C%20type%2C%20kind%2C%20location%2C%20resourceGroup%2C%20sku%20%2C%20properties" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0D%0A%7C%20where%20type%20in%20('microsoft.web%2Fsites'%2C%20'microsoft.web%2Fsites%2Fslots'%2C%20'microsoft.web%2Fserverfarms'%2C%20'microsoft.web%2Fenvironment'%2C%20'microsoft.web%2Fhostingenvironment')%0D%0A%7C%20project%20name%2C%20type%2C%20kind%2C%20location%2C%20resourceGroup%2C%20sku%20%2C%20properties" target="_blank">portal.azure.cn</a>

---



### List Azure App Service TLS version

List an Azure App Service's minimum Transport Layer Security (TLS) version for incoming requests to a web app.

```kusto
AppServiceResources
| where type =~ 'microsoft.web/sites/config'
| project id, name, properties.MinTlsVersion
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "AppServiceResources | where type =~ 'microsoft.web/sites/config' | project id, name, properties.MinTlsVersion"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "AppServiceResources | where type =~ 'microsoft.web/sites/config' | project id, name, properties.MinTlsVersion"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/AppServiceResources%0D%0A%7C%20where%20type%20%3D~%20%27microsoft.web%2Fsites%2Fconfig%27%0D%0A%7C%20project%20id%2C%20name%2C%20properties.MinTlsVersion" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/AppServiceResources%0D%0A%7C%20where%20type%20%3D~%20%27microsoft.web%2Fsites%2Fconfig%27%0D%0A%7C%20project%20id%2C%20name%2C%20properties.MinTlsVersion" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/AppServiceResources%0D%0A%7C%20where%20type%20%3D~%20%27microsoft.web%2Fsites%2Fconfig%27%0D%0A%7C%20project%20id%2C%20name%2C%20properties.MinTlsVersion" target="_blank">portal.azure.cn</a>

---


## Azure Arc


### Get enabled resource types for Azure Arc-enabled custom locations

Provides a list of enabled resource types for Azure Arc-enabled custom locations.

```kusto
ExtendedLocationResources
| where type == 'microsoft.extendedlocation/customlocations/enabledresourcetypes'
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "ExtendedLocationResources | where type == 'microsoft.extendedlocation/customlocations/enabledresourcetypes'"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "ExtendedLocationResources | where type == 'microsoft.extendedlocation/customlocations/enabledresourcetypes'"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/ExtendedLocationResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.extendedlocation%2fcustomlocations%2fenabledresourcetypes%27" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/ExtendedLocationResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.extendedlocation%2fcustomlocations%2fenabledresourcetypes%27" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/ExtendedLocationResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.extendedlocation%2fcustomlocations%2fenabledresourcetypes%27" target="_blank">portal.azure.cn</a>

---

### List Azure Arc-enabled custom locations with VMware or SCVMM enabled

Provides a list of all Azure Arc-enabled custom locations that have either VMware or SCVMM resource types enabled.

```kusto
Resources
| where type =~ 'microsoft.extendedlocation/customlocations' and properties.provisioningState =~ 'succeeded'
| extend clusterExtensionIds=properties.clusterExtensionIds
| mvexpand clusterExtensionIds
| extend clusterExtensionId = tolower(clusterExtensionIds)
| join kind=leftouter(
	ExtendedLocationResources
	| where type =~ 'microsoft.extendedlocation/customLocations/enabledResourcetypes'
	| project clusterExtensionId = tolower(properties.clusterExtensionId), extensionType = tolower(properties.extensionType)
	| where extensionType in~ ('microsoft.scvmm','microsoft.vmware')
) on clusterExtensionId
| where extensionType in~ ('microsoft.scvmm','microsoft.vmware')
| summarize virtualMachineKindsEnabled=make_set(extensionType) by id,name,location
| sort by name asc
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type =~ 'microsoft.extendedlocation/customlocations' and properties.provisioningState =~ 'succeeded' | extend clusterExtensionIds=properties.clusterExtensionIds | mvexpand clusterExtensionIds | extend clusterExtensionId = tolower(clusterExtensionIds) | join kind=leftouter( ExtendedLocationResources | where type =~ 'microsoft.extendedlocation/customLocations/enabledResourcetypes' | project clusterExtensionId = tolower(properties.clusterExtensionId), extensionType = tolower(properties.extensionType) | where extensionType in~ ('microsoft.scvmm','microsoft.vmware') ) on clusterExtensionId | where extensionType in~ ('microsoft.scvmm','microsoft.vmware') | summarize virtualMachineKindsEnabled=make_set(extensionType) by id,name,location | sort by name asc"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type =~ 'microsoft.extendedlocation/customlocations' and properties.provisioningState =~ 'succeeded' | extend clusterExtensionIds=properties.clusterExtensionIds | mvexpand clusterExtensionIds | extend clusterExtensionId = tolower(clusterExtensionIds) | join kind=leftouter( ExtendedLocationResources | where type =~ 'microsoft.extendedlocation/customLocations/enabledResourcetypes' | project clusterExtensionId = tolower(properties.clusterExtensionId), extensionType = tolower(properties.extensionType) | where extensionType in~ ('microsoft.scvmm','microsoft.vmware') ) on clusterExtensionId | where extensionType in~ ('microsoft.scvmm','microsoft.vmware') | summarize virtualMachineKindsEnabled=make_set(extensionType) by id,name,location | sort by name asc"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.extendedlocation%2fcustomlocations%27%20and%20properties.provisioningState%20%3d%7e%20%27succeeded%27%0a%7c%20extend%20clusterExtensionIds%3dproperties.clusterExtensionIds%0a%7c%20mvexpand%20clusterExtensionIds%0a%7c%20extend%20clusterExtensionId%20%3d%20tolower(clusterExtensionIds)%0a%7c%20join%20kind%3dleftouter(%0a%09ExtendedLocationResources%0a%09%7c%20where%20type%20%3d%7e%20%27microsoft.extendedlocation%2fcustomLocations%2fenabledResourcetypes%27%0a%09%7c%20project%20clusterExtensionId%20%3d%20tolower(properties.clusterExtensionId)%2c%20extensionType%20%3d%20tolower(properties.extensionType)%0a%09%7c%20where%20extensionType%20in%7e%20(%27microsoft.scvmm%27%2c%27microsoft.vmware%27)%0a)%20on%20clusterExtensionId%0a%7c%20where%20extensionType%20in%7e%20(%27microsoft.scvmm%27%2c%27microsoft.vmware%27)%0a%7c%20summarize%20virtualMachineKindsEnabled%3dmake_set(extensionType)%20by%20id%2cname%2clocation%0a%7c%20sort%20by%20name%20asc" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.extendedlocation%2fcustomlocations%27%20and%20properties.provisioningState%20%3d%7e%20%27succeeded%27%0a%7c%20extend%20clusterExtensionIds%3dproperties.clusterExtensionIds%0a%7c%20mvexpand%20clusterExtensionIds%0a%7c%20extend%20clusterExtensionId%20%3d%20tolower(clusterExtensionIds)%0a%7c%20join%20kind%3dleftouter(%0a%09ExtendedLocationResources%0a%09%7c%20where%20type%20%3d%7e%20%27microsoft.extendedlocation%2fcustomLocations%2fenabledResourcetypes%27%0a%09%7c%20project%20clusterExtensionId%20%3d%20tolower(properties.clusterExtensionId)%2c%20extensionType%20%3d%20tolower(properties.extensionType)%0a%09%7c%20where%20extensionType%20in%7e%20(%27microsoft.scvmm%27%2c%27microsoft.vmware%27)%0a)%20on%20clusterExtensionId%0a%7c%20where%20extensionType%20in%7e%20(%27microsoft.scvmm%27%2c%27microsoft.vmware%27)%0a%7c%20summarize%20virtualMachineKindsEnabled%3dmake_set(extensionType)%20by%20id%2cname%2clocation%0a%7c%20sort%20by%20name%20asc" target="_blank">portal.azure.us</a>
-  Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.extendedlocation%2fcustomlocations%27%20and%20properties.provisioningState%20%3d%7e%20%27succeeded%27%0a%7c%20extend%20clusterExtensionIds%3dproperties.clusterExtensionIds%0a%7c%20mvexpand%20clusterExtensionIds%0a%7c%20extend%20clusterExtensionId%20%3d%20tolower(clusterExtensionIds)%0a%7c%20join%20kind%3dleftouter(%0a%09ExtendedLocationResources%0a%09%7c%20where%20type%20%3d%7e%20%27microsoft.extendedlocation%2fcustomLocations%2fenabledResourcetypes%27%0a%09%7c%20project%20clusterExtensionId%20%3d%20tolower(properties.clusterExtensionId)%2c%20extensionType%20%3d%20tolower(properties.extensionType)%0a%09%7c%20where%20extensionType%20in%7e%20(%27microsoft.scvmm%27%2c%27microsoft.vmware%27)%0a)%20on%20clusterExtensionId%0a%7c%20where%20extensionType%20in%7e%20(%27microsoft.scvmm%27%2c%27microsoft.vmware%27)%0a%7c%20summarize%20virtualMachineKindsEnabled%3dmake_set(extensionType)%20by%20id%2cname%2clocation%0a%7c%20sort%20by%20name%20asc" target="_blank">portal.azure.cn</a>

---


## Azure Arc-enabled Kubernetes


### List all Azure Arc-enabled Kubernetes clusters with Azure Monitor extension

Returns the connected cluster ID of each Azure Arc-enabled Kubernetes cluster that has the Azure Monitor extension installed.

```kusto
KubernetesConfigurationResources
| where type == 'microsoft.kubernetesconfiguration/extensions'
| where properties.ExtensionType  == 'microsoft.azuremonitor.containers'
| parse id with connectedClusterId '/providers/Microsoft.KubernetesConfiguration/Extensions' *
| project connectedClusterId
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "KubernetesConfigurationResources | where type == 'microsoft.kubernetesconfiguration/extensions' | where properties.ExtensionType == 'microsoft.azuremonitor.containers' | parse id with connectedClusterId '/providers/Microsoft.KubernetesConfiguration/Extensions' * | project connectedClusterId"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "KubernetesConfigurationResources | where type == 'microsoft.kubernetesconfiguration/extensions' | where properties.ExtensionType == 'microsoft.azuremonitor.containers' | parse id with connectedClusterId '/providers/Microsoft.KubernetesConfiguration/Extensions' * | project connectedClusterId"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/KubernetesConfigurationResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.kubernetesconfiguration%2fextensions%27%0a%7c%20where%20properties.ExtensionType%20%20%3d%3d%20%27microsoft.azuremonitor.containers%27%0a%7c%20parse%20id%20with%20connectedClusterId%20%27%2fproviders%2fMicrosoft.KubernetesConfiguration%2fExtensions%27%20*%0a%7c%20project%20connectedClusterId" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/KubernetesConfigurationResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.kubernetesconfiguration%2fextensions%27%0a%7c%20where%20properties.ExtensionType%20%20%3d%3d%20%27microsoft.azuremonitor.containers%27%0a%7c%20parse%20id%20with%20connectedClusterId%20%27%2fproviders%2fMicrosoft.KubernetesConfiguration%2fExtensions%27%20*%0a%7c%20project%20connectedClusterId" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/KubernetesConfigurationResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.kubernetesconfiguration%2fextensions%27%0a%7c%20where%20properties.ExtensionType%20%20%3d%3d%20%27microsoft.azuremonitor.containers%27%0a%7c%20parse%20id%20with%20connectedClusterId%20%27%2fproviders%2fMicrosoft.KubernetesConfiguration%2fExtensions%27%20*%0a%7c%20project%20connectedClusterId" target="_blank">portal.azure.cn</a>

---

### List all Azure Arc-enabled Kubernetes clusters without Azure Monitor extension

Returns the connected cluster ID of each Azure Arc-enabled Kubernetes cluster that is missing the Azure Monitor extension.

```kusto
Resources
| where type =~ 'Microsoft.Kubernetes/connectedClusters' | extend connectedClusterId = tolower(id) | project connectedClusterId
| join kind = leftouter
	(KubernetesConfigurationResources
	| where type == 'microsoft.kubernetesconfiguration/extensions'
	| where properties.ExtensionType  == 'microsoft.azuremonitor.containers'
	| parse tolower(id) with connectedClusterId '/providers/microsoft.kubernetesconfiguration/extensions' *
	| project connectedClusterId
)  on connectedClusterId
| where connectedClusterId1 == ''
| project connectedClusterId
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type =~ 'Microsoft.Kubernetes/connectedClusters' | extend connectedClusterId = tolower(id) | project connectedClusterId | join kind = leftouter (KubernetesConfigurationResources | where type == 'microsoft.kubernetesconfiguration/extensions' | where properties.ExtensionType == 'microsoft.azuremonitor.containers' | parse tolower(id) with connectedClusterId '/providers/microsoft.kubernetesconfiguration/extensions' * | project connectedClusterId ) on connectedClusterId | where connectedClusterId1 == '' | project connectedClusterId"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type =~ 'Microsoft.Kubernetes/connectedClusters' | extend connectedClusterId = tolower(id) | project connectedClusterId | join kind = leftouter (KubernetesConfigurationResources | where type == 'microsoft.kubernetesconfiguration/extensions' | where properties.ExtensionType == 'microsoft.azuremonitor.containers' | parse tolower(id) with connectedClusterId '/providers/microsoft.kubernetesconfiguration/extensions' * | project connectedClusterId ) on connectedClusterId | where connectedClusterId1 == '' | project connectedClusterId"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.Kubernetes%2fconnectedClusters%27%20%7c%20extend%20connectedClusterId%20%3d%20tolower(id)%20%7c%20project%20connectedClusterId%20%0a%7c%20join%20kind%20%3d%20leftouter%0a%09(KubernetesConfigurationResources%0a%09%7c%20where%20type%20%3d%3d%20%27microsoft.kubernetesconfiguration%2fextensions%27%0a%09%7c%20where%20properties.ExtensionType%20%20%3d%3d%20%27microsoft.azuremonitor.containers%27%0a%09%7c%20parse%20tolower(id)%20with%20connectedClusterId%20%27%2fproviders%2fmicrosoft.kubernetesconfiguration%2fextensions%27%20*%0a%09%7c%20project%20connectedClusterId%0a)%20%20on%20connectedClusterId%0a%7c%20where%20connectedClusterId1%20%3d%3d%20%27%27%0a%7c%20project%20connectedClusterId" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.Kubernetes%2fconnectedClusters%27%20%7c%20extend%20connectedClusterId%20%3d%20tolower(id)%20%7c%20project%20connectedClusterId%20%0a%7c%20join%20kind%20%3d%20leftouter%0a%09(KubernetesConfigurationResources%0a%09%7c%20where%20type%20%3d%3d%20%27microsoft.kubernetesconfiguration%2fextensions%27%0a%09%7c%20where%20properties.ExtensionType%20%20%3d%3d%20%27microsoft.azuremonitor.containers%27%0a%09%7c%20parse%20tolower(id)%20with%20connectedClusterId%20%27%2fproviders%2fmicrosoft.kubernetesconfiguration%2fextensions%27%20*%0a%09%7c%20project%20connectedClusterId%0a)%20%20on%20connectedClusterId%0a%7c%20where%20connectedClusterId1%20%3d%3d%20%27%27%0a%7c%20project%20connectedClusterId" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.Kubernetes%2fconnectedClusters%27%20%7c%20extend%20connectedClusterId%20%3d%20tolower(id)%20%7c%20project%20connectedClusterId%20%0a%7c%20join%20kind%20%3d%20leftouter%0a%09(KubernetesConfigurationResources%0a%09%7c%20where%20type%20%3d%3d%20%27microsoft.kubernetesconfiguration%2fextensions%27%0a%09%7c%20where%20properties.ExtensionType%20%20%3d%3d%20%27microsoft.azuremonitor.containers%27%0a%09%7c%20parse%20tolower(id)%20with%20connectedClusterId%20%27%2fproviders%2fmicrosoft.kubernetesconfiguration%2fextensions%27%20*%0a%09%7c%20project%20connectedClusterId%0a)%20%20on%20connectedClusterId%0a%7c%20where%20connectedClusterId1%20%3d%3d%20%27%27%0a%7c%20project%20connectedClusterId" target="_blank">portal.azure.cn</a>

---

### List all Azure Arc-enabled Kubernetes resources

Returns a list of each Azure Arc-enabled Kubernetes cluster and relevant metadata for each cluster.

```kusto
Resources
| project id, subscriptionId, location, type, properties.agentVersion, properties.kubernetesVersion, properties.distribution, properties.infrastructure, properties.totalNodeCount, properties.totalCoreCount
| where type =~ 'Microsoft.Kubernetes/connectedClusters'
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | project id, subscriptionId, location, type, properties.agentVersion, properties.kubernetesVersion, properties.distribution, properties.infrastructure, properties.totalNodeCount, properties.totalCoreCount | where type =~ 'Microsoft.Kubernetes/connectedClusters'"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | project id, subscriptionId, location, type, properties.agentVersion, properties.kubernetesVersion, properties.distribution, properties.infrastructure, properties.totalNodeCount, properties.totalCoreCount | where type =~ 'Microsoft.Kubernetes/connectedClusters'"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20project%20id%2c%20subscriptionId%2c%20location%2c%20type%2c%20properties.agentVersion%2c%20properties.kubernetesVersion%2c%20properties.distribution%2c%20properties.infrastructure%2c%20properties.totalNodeCount%2c%20properties.totalCoreCount%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.Kubernetes%2fconnectedClusters%27" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20project%20id%2c%20subscriptionId%2c%20location%2c%20type%2c%20properties.agentVersion%2c%20properties.kubernetesVersion%2c%20properties.distribution%2c%20properties.infrastructure%2c%20properties.totalNodeCount%2c%20properties.totalCoreCount%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.Kubernetes%2fconnectedClusters%27" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20project%20id%2c%20subscriptionId%2c%20location%2c%20type%2c%20properties.agentVersion%2c%20properties.kubernetesVersion%2c%20properties.distribution%2c%20properties.infrastructure%2c%20properties.totalNodeCount%2c%20properties.totalCoreCount%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.Kubernetes%2fconnectedClusters%27" target="_blank">portal.azure.cn</a>

---

### List all ConnectedClusters and ManagedClusters that contain a Flux Configuration

Returns the connectedCluster and managedCluster Ids for clusters that contain at least one fluxConfiguration.

```kusto
resources
| where type =~ 'Microsoft.Kubernetes/connectedClusters' or type =~ 'Microsoft.ContainerService/managedClusters' | extend clusterId = tolower(id) | project clusterId
| join
( kubernetesconfigurationresources
| where type == 'microsoft.kubernetesconfiguration/fluxconfigurations'
| parse tolower(id) with clusterId '/providers/microsoft.kubernetesconfiguration/fluxconfigurations' *
| project clusterId
) on clusterId
| project clusterId
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "resources | where type =~ 'Microsoft.Kubernetes/connectedClusters' or type =~ 'Microsoft.ContainerService/managedClusters' | extend clusterId = tolower(id) | project clusterId | join ( kubernetesconfigurationresources | where type == 'microsoft.kubernetesconfiguration/fluxconfigurations' | parse tolower(id) with clusterId '/providers/microsoft.kubernetesconfiguration/fluxconfigurations' * | project clusterId ) on clusterId | project clusterId"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "resources | where type =~ 'Microsoft.Kubernetes/connectedClusters' or type =~ 'Microsoft.ContainerService/managedClusters' | extend clusterId = tolower(id) | project clusterId | join ( kubernetesconfigurationresources | where type == 'microsoft.kubernetesconfiguration/fluxconfigurations' | parse tolower(id) with clusterId '/providers/microsoft.kubernetesconfiguration/fluxconfigurations' * | project clusterId ) on clusterId | project clusterId"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/resources%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.Kubernetes%2fconnectedClusters%27%20or%20type%20%3d%7e%20%27Microsoft.ContainerService%2fmanagedClusters%27%20%7c%20extend%20clusterId%20%3d%20tolower(id)%20%7c%20project%20clusterId%0a%7c%20join%0a(%20kubernetesconfigurationresources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.kubernetesconfiguration%2ffluxconfigurations%27%0a%7c%20parse%20tolower(id)%20with%20clusterId%20%27%2fproviders%2fmicrosoft.kubernetesconfiguration%2ffluxconfigurations%27%20*%0a%7c%20project%20clusterId%0a)%20on%20clusterId%0a%7c%20project%20clusterId" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/resources%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.Kubernetes%2fconnectedClusters%27%20or%20type%20%3d%7e%20%27Microsoft.ContainerService%2fmanagedClusters%27%20%7c%20extend%20clusterId%20%3d%20tolower(id)%20%7c%20project%20clusterId%0a%7c%20join%0a(%20kubernetesconfigurationresources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.kubernetesconfiguration%2ffluxconfigurations%27%0a%7c%20parse%20tolower(id)%20with%20clusterId%20%27%2fproviders%2fmicrosoft.kubernetesconfiguration%2ffluxconfigurations%27%20*%0a%7c%20project%20clusterId%0a)%20on%20clusterId%0a%7c%20project%20clusterId" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/resources%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.Kubernetes%2fconnectedClusters%27%20or%20type%20%3d%7e%20%27Microsoft.ContainerService%2fmanagedClusters%27%20%7c%20extend%20clusterId%20%3d%20tolower(id)%20%7c%20project%20clusterId%0a%7c%20join%0a(%20kubernetesconfigurationresources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.kubernetesconfiguration%2ffluxconfigurations%27%0a%7c%20parse%20tolower(id)%20with%20clusterId%20%27%2fproviders%2fmicrosoft.kubernetesconfiguration%2ffluxconfigurations%27%20*%0a%7c%20project%20clusterId%0a)%20on%20clusterId%0a%7c%20project%20clusterId" target="_blank">portal.azure.cn</a>

---

### List All Flux Configurations that Are in a Non-Compliant State

Returns the fluxConfiguration Ids of configurations that are failing to sync resources on the cluster.

```kusto
kubernetesconfigurationresources
| where type == 'microsoft.kubernetesconfiguration/fluxconfigurations'
| where properties.complianceState == 'Non-Compliant'
| project id
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "kubernetesconfigurationresources | where type == 'microsoft.kubernetesconfiguration/fluxconfigurations' | where properties.complianceState == 'Non-Compliant' | project id"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "kubernetesconfigurationresources | where type == 'microsoft.kubernetesconfiguration/fluxconfigurations' | where properties.complianceState == 'Non-Compliant' | project id"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/kubernetesconfigurationresources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.kubernetesconfiguration%2ffluxconfigurations%27%0a%7c%20where%20properties.complianceState%20%3d%3d%20%27Non-Compliant%27%0a%7c%20project%20id" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/kubernetesconfigurationresources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.kubernetesconfiguration%2ffluxconfigurations%27%0a%7c%20where%20properties.complianceState%20%3d%3d%20%27Non-Compliant%27%0a%7c%20project%20id" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/kubernetesconfigurationresources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.kubernetesconfiguration%2ffluxconfigurations%27%0a%7c%20where%20properties.complianceState%20%3d%3d%20%27Non-Compliant%27%0a%7c%20project%20id" target="_blank">portal.azure.cn</a>

---


## Azure Arc-enabled servers


### Get count and percentage of Arc-enabled servers by domain

This query summarizes the **domainName** property on [Azure Arc-enabled servers](https://learn.microsoft.com/azure/azure-arc/servers/overview) and uses a calculation with `bin` to create a **Pct** column for the percent of Arc-enabled servers per domain.

```kusto
Resources
| where type == 'microsoft.hybridcompute/machines'
| project domain=tostring(properties.domainName)
| summarize Domains=make_list(domain), TotalMachineCount=sum(1)
| mvexpand EachDomain = Domains
| summarize PerDomainMachineCount = count() by tostring(EachDomain), TotalMachineCount
| extend Pct = 100 * bin(todouble(PerDomainMachineCount) / todouble(TotalMachineCount), 0.001)
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type == 'microsoft.hybridcompute/machines' | project domain=tostring(properties.domainName) | summarize Domains=make_list(domain), TotalMachineCount=sum(1) | mvexpand EachDomain = Domains | summarize PerDomainMachineCount = count() by tostring(EachDomain), TotalMachineCount | extend Pct = 100 * bin(todouble(PerDomainMachineCount) / todouble(TotalMachineCount), 0.001)"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type == 'microsoft.hybridcompute/machines' | project domain=tostring(properties.domainName) | summarize Domains=make_list(domain), TotalMachineCount=sum(1) | mvexpand EachDomain = Domains | summarize PerDomainMachineCount = count() by tostring(EachDomain), TotalMachineCount | extend Pct = 100 * bin(todouble(PerDomainMachineCount) / todouble(TotalMachineCount), 0.001)"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.hybridcompute%2fmachines%27%0a%7c%20project%20domain%3dtostring(properties.domainName)%0a%7c%20summarize%20Domains%3dmake_list(domain)%2c%20TotalMachineCount%3dsum(1)%0a%7c%20mvexpand%20EachDomain%20%3d%20Domains%0a%7c%20summarize%20PerDomainMachineCount%20%3d%20count()%20by%20tostring(EachDomain)%2c%20TotalMachineCount%0a%7c%20extend%20Pct%20%3d%20100%20*%20bin(todouble(PerDomainMachineCount)%20%2f%20todouble(TotalMachineCount)%2c%200.001)" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.hybridcompute%2fmachines%27%0a%7c%20project%20domain%3dtostring(properties.domainName)%0a%7c%20summarize%20Domains%3dmake_list(domain)%2c%20TotalMachineCount%3dsum(1)%0a%7c%20mvexpand%20EachDomain%20%3d%20Domains%0a%7c%20summarize%20PerDomainMachineCount%20%3d%20count()%20by%20tostring(EachDomain)%2c%20TotalMachineCount%0a%7c%20extend%20Pct%20%3d%20100%20*%20bin(todouble(PerDomainMachineCount)%20%2f%20todouble(TotalMachineCount)%2c%200.001)" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.hybridcompute%2fmachines%27%0a%7c%20project%20domain%3dtostring(properties.domainName)%0a%7c%20summarize%20Domains%3dmake_list(domain)%2c%20TotalMachineCount%3dsum(1)%0a%7c%20mvexpand%20EachDomain%20%3d%20Domains%0a%7c%20summarize%20PerDomainMachineCount%20%3d%20count()%20by%20tostring(EachDomain)%2c%20TotalMachineCount%0a%7c%20extend%20Pct%20%3d%20100%20*%20bin(todouble(PerDomainMachineCount)%20%2f%20todouble(TotalMachineCount)%2c%200.001)" target="_blank">portal.azure.cn</a>

---

### List all extensions installed on an Azure Arc-enabled server

First, this query uses `project` on the hybrid machine resource type to get the ID in uppercase (`toupper()`), get the computer name, and the operating system running on the machine. Getting the resource ID in uppercase is a good way to prepare to `join` to another property. Then, the query uses `join` with **kind** as _leftouter_ to get extensions by matching an uppercase `substring` of the extension ID. The portion of the ID before `/extensions/<ExtensionName>` is the same format as the hybrid machine ID, so we use this property for the `join`. `summarize` is then used with `make_list` on the name of the virtual machine extension to combine the name of each extension where _id_, _OSName_, and _ComputerName_ are the same into a single array property. Lastly, we order by lowercase _OSName_ with **asc**. By default, `order by` is descending.

```kusto
Resources
| where type == 'microsoft.hybridcompute/machines'
| project
  id,
  JoinID = toupper(id),
  ComputerName = tostring(properties.osProfile.computerName),
  OSName = tostring(properties.osName)
| join kind=leftouter(
  Resources
  | where type == 'microsoft.hybridcompute/machines/extensions'
  | project
    MachineId = toupper(substring(id, 0, indexof(id, '/extensions'))),
    ExtensionName = name
) on $left.JoinID == $right.MachineId
| summarize Extensions = make_list(ExtensionName) by id, ComputerName, OSName
| order by tolower(OSName) asc
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type == 'microsoft.hybridcompute/machines' | project id, JoinID = toupper(id), ComputerName = tostring(properties.osProfile.computerName), OSName = tostring(properties.osName) | join kind=leftouter( Resources | where type == 'microsoft.hybridcompute/machines/extensions' | project  MachineId = toupper(substring(id, 0, indexof(id, '/extensions'))),  ExtensionName = name ) on \$left.JoinID == \$right.MachineId | summarize Extensions = make_list(ExtensionName) by id, ComputerName, OSName | order by tolower(OSName) asc"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type == 'microsoft.hybridcompute/machines' | project id, JoinID = toupper(id), ComputerName = tostring(properties.osProfile.computerName), OSName = tostring(properties.osName) | join kind=leftouter( Resources | where type == 'microsoft.hybridcompute/machines/extensions' | project  MachineId = toupper(substring(id, 0, indexof(id, '/extensions'))),  ExtensionName = name ) on $left.JoinID == $right.MachineId | summarize Extensions = make_list(ExtensionName) by id, ComputerName, OSName | order by tolower(OSName) asc"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.hybridcompute%2fmachines%27%0a%7c%20project%0a%09id%2c%0a%09JoinID%20%3d%20toupper(id)%2c%0a%09ComputerName%20%3d%20tostring(properties.osProfile.computerName)%2c%0a%09OSName%20%3d%20tostring(properties.osName)%0a%7c%20join%20kind%3dleftouter(%0a%09Resources%0a%09%7c%20where%20type%20%3d%3d%20%27microsoft.hybridcompute%2fmachines%2fextensions%27%0a%09%7c%20project%0a%09%09MachineId%20%3d%20toupper(substring(id%2c%200%2c%20indexof(id%2c%20%27%2fextensions%27)))%2c%0a%09%09ExtensionName%20%3d%20name%0a)%20on%20%24left.JoinID%20%3d%3d%20%24right.MachineId%0a%7c%20summarize%20Extensions%20%3d%20make_list(ExtensionName)%20by%20id%2c%20ComputerName%2c%20OSName%0a%7c%20order%20by%20tolower(OSName)%20asc" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.hybridcompute%2fmachines%27%0a%7c%20project%0a%09id%2c%0a%09JoinID%20%3d%20toupper(id)%2c%0a%09ComputerName%20%3d%20tostring(properties.osProfile.computerName)%2c%0a%09OSName%20%3d%20tostring(properties.osName)%0a%7c%20join%20kind%3dleftouter(%0a%09Resources%0a%09%7c%20where%20type%20%3d%3d%20%27microsoft.hybridcompute%2fmachines%2fextensions%27%0a%09%7c%20project%0a%09%09MachineId%20%3d%20toupper(substring(id%2c%200%2c%20indexof(id%2c%20%27%2fextensions%27)))%2c%0a%09%09ExtensionName%20%3d%20name%0a)%20on%20%24left.JoinID%20%3d%3d%20%24right.MachineId%0a%7c%20summarize%20Extensions%20%3d%20make_list(ExtensionName)%20by%20id%2c%20ComputerName%2c%20OSName%0a%7c%20order%20by%20tolower(OSName)%20asc" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.hybridcompute%2fmachines%27%0a%7c%20project%0a%09id%2c%0a%09JoinID%20%3d%20toupper(id)%2c%0a%09ComputerName%20%3d%20tostring(properties.osProfile.computerName)%2c%0a%09OSName%20%3d%20tostring(properties.osName)%0a%7c%20join%20kind%3dleftouter(%0a%09Resources%0a%09%7c%20where%20type%20%3d%3d%20%27microsoft.hybridcompute%2fmachines%2fextensions%27%0a%09%7c%20project%0a%09%09MachineId%20%3d%20toupper(substring(id%2c%200%2c%20indexof(id%2c%20%27%2fextensions%27)))%2c%0a%09%09ExtensionName%20%3d%20name%0a)%20on%20%24left.JoinID%20%3d%3d%20%24right.MachineId%0a%7c%20summarize%20Extensions%20%3d%20make_list(ExtensionName)%20by%20id%2c%20ComputerName%2c%20OSName%0a%7c%20order%20by%20tolower(OSName)%20asc" target="_blank">portal.azure.cn</a>

---

### List Arc-enabled servers not running latest released agent version

This query returns all Arc-enabled servers running an outdated version of the Connected Machine agent. Agents with a status of **Expired** are excluded from the results. The query uses _leftouter_ `join` to bring together the Advisor recommendations raised about any Connected Machine agents identified as out of date, and Hybrid Computer machines to filter out any agent that haven't communicated with Azure over a period of time.

```kusto
AdvisorResources
| where type == 'microsoft.advisor/recommendations'
| where properties.category == 'HighAvailability'
| where properties.shortDescription.solution == 'Upgrade to the latest version of the Azure Connected Machine agent'
| project
    id,
    JoinId = toupper(properties.resourceMetadata.resourceId),
    machineName = tostring(properties.impactedValue),
    agentVersion = tostring(properties.extendedProperties.installedVersion),
    expectedVersion = tostring(properties.extendedProperties.latestVersion)
| join kind=leftouter(
  Resources
  | where type == 'microsoft.hybridcompute/machines'
  | project
    machineId = toupper(id),
    status = tostring (properties.status)
  ) on $left.JoinId == $right.machineId
| where status != 'Expired'
| summarize by id, machineName, agentVersion, expectedVersion
| order by tolower(machineName) asc
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "AdvisorResources | where type == 'microsoft.advisor/recommendations' | where properties.category == 'HighAvailability' | where properties.shortDescription.solution == 'Upgrade to the latest version of the Azure Connected Machine agent' | project  id,  JoinId = toupper(properties.resourceMetadata.resourceId),  machineName = tostring(properties.impactedValue),  agentVersion = tostring(properties.extendedProperties.installedVersion),  expectedVersion = tostring(properties.extendedProperties.latestVersion) | join kind=leftouter( Resources | where type == 'microsoft.hybridcompute/machines' | project  machineId = toupper(id),  status = tostring (properties.status) ) on \$left.JoinId == \$right.machineId | where status != 'Expired' | summarize by id, machineName, agentVersion, expectedVersion | order by tolower(machineName) asc"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "AdvisorResources | where type == 'microsoft.advisor/recommendations' | where properties.category == 'HighAvailability' | where properties.shortDescription.solution == 'Upgrade to the latest version of the Azure Connected Machine agent' | project  id,  JoinId = toupper(properties.resourceMetadata.resourceId),  machineName = tostring(properties.impactedValue),  agentVersion = tostring(properties.extendedProperties.installedVersion),  expectedVersion = tostring(properties.extendedProperties.latestVersion) | join kind=leftouter( Resources | where type == 'microsoft.hybridcompute/machines' | project  machineId = toupper(id),  status = tostring (properties.status) ) on $left.JoinId == $right.machineId | where status != 'Expired' | summarize by id, machineName, agentVersion, expectedVersion | order by tolower(machineName) asc"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/AdvisorResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.advisor%2frecommendations%27%0a%7c%20where%20properties.category%20%3d%3d%20%27HighAvailability%27%0a%7c%20where%20properties.shortDescription.solution%20%3d%3d%20%27Upgrade%20to%20the%20latest%20version%20of%20the%20Azure%20Connected%20Machine%20agent%27%0a%7c%20project%0a%09%09id%2c%0a%09%09JoinId%20%3d%20toupper(properties.resourceMetadata.resourceId)%2c%0a%09%09machineName%20%3d%20tostring(properties.impactedValue)%2c%0a%09%09agentVersion%20%3d%20tostring(properties.extendedProperties.installedVersion)%2c%0a%09%09expectedVersion%20%3d%20tostring(properties.extendedProperties.latestVersion)%0a%7c%20join%20kind%3dleftouter(%0a%09Resources%0a%09%7c%20where%20type%20%3d%3d%20%27microsoft.hybridcompute%2fmachines%27%0a%09%7c%20project%0a%09%09machineId%20%3d%20toupper(id)%2c%0a%09%09status%20%3d%20tostring%20(properties.status)%0a%09)%20on%20%24left.JoinId%20%3d%3d%20%24right.machineId%0a%7c%20where%20status%20!%3d%20%27Expired%27%0a%7c%20summarize%20by%20id%2c%20machineName%2c%20agentVersion%2c%20expectedVersion%0a%7c%20order%20by%20tolower(machineName)%20asc" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/AdvisorResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.advisor%2frecommendations%27%0a%7c%20where%20properties.category%20%3d%3d%20%27HighAvailability%27%0a%7c%20where%20properties.shortDescription.solution%20%3d%3d%20%27Upgrade%20to%20the%20latest%20version%20of%20the%20Azure%20Connected%20Machine%20agent%27%0a%7c%20project%0a%09%09id%2c%0a%09%09JoinId%20%3d%20toupper(properties.resourceMetadata.resourceId)%2c%0a%09%09machineName%20%3d%20tostring(properties.impactedValue)%2c%0a%09%09agentVersion%20%3d%20tostring(properties.extendedProperties.installedVersion)%2c%0a%09%09expectedVersion%20%3d%20tostring(properties.extendedProperties.latestVersion)%0a%7c%20join%20kind%3dleftouter(%0a%09Resources%0a%09%7c%20where%20type%20%3d%3d%20%27microsoft.hybridcompute%2fmachines%27%0a%09%7c%20project%0a%09%09machineId%20%3d%20toupper(id)%2c%0a%09%09status%20%3d%20tostring%20(properties.status)%0a%09)%20on%20%24left.JoinId%20%3d%3d%20%24right.machineId%0a%7c%20where%20status%20!%3d%20%27Expired%27%0a%7c%20summarize%20by%20id%2c%20machineName%2c%20agentVersion%2c%20expectedVersion%0a%7c%20order%20by%20tolower(machineName)%20asc" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/AdvisorResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.advisor%2frecommendations%27%0a%7c%20where%20properties.category%20%3d%3d%20%27HighAvailability%27%0a%7c%20where%20properties.shortDescription.solution%20%3d%3d%20%27Upgrade%20to%20the%20latest%20version%20of%20the%20Azure%20Connected%20Machine%20agent%27%0a%7c%20project%0a%09%09id%2c%0a%09%09JoinId%20%3d%20toupper(properties.resourceMetadata.resourceId)%2c%0a%09%09machineName%20%3d%20tostring(properties.impactedValue)%2c%0a%09%09agentVersion%20%3d%20tostring(properties.extendedProperties.installedVersion)%2c%0a%09%09expectedVersion%20%3d%20tostring(properties.extendedProperties.latestVersion)%0a%7c%20join%20kind%3dleftouter(%0a%09Resources%0a%09%7c%20where%20type%20%3d%3d%20%27microsoft.hybridcompute%2fmachines%27%0a%09%7c%20project%0a%09%09machineId%20%3d%20toupper(id)%2c%0a%09%09status%20%3d%20tostring%20(properties.status)%0a%09)%20on%20%24left.JoinId%20%3d%3d%20%24right.machineId%0a%7c%20where%20status%20!%3d%20%27Expired%27%0a%7c%20summarize%20by%20id%2c%20machineName%2c%20agentVersion%2c%20expectedVersion%0a%7c%20order%20by%20tolower(machineName)%20asc" target="_blank">portal.azure.cn</a>

---


## Azure Center for SAP solutions


### Current health of virtual machines in Virtual Instance for SAP

This query fetches the current availability health of all virtual machines of an SAP system given the SID of a [Virtual Instance for SAP](https://learn.microsoft.com/azure/sap/center-sap-solutions/overview). Replace `mySubscriptionId` with your subscription ID, and replace `myResourceId` with the resource ID of your Virtual Instance for SAP.

```kusto
Resources
| where subscriptionId == 'mySubscriptionId'
| where type startswith 'microsoft.workloads/sapvirtualinstances/'
| where id startswith 'myResourceId'
| mv-expand d = properties.vmDetails
| project VmId = tolower(d.virtualMachineId)
| join kind = inner (
  HealthResources
  | where subscriptionId == 'mySubscriptionId'
  | where type == 'microsoft.resourcehealth/availabilitystatuses'
  | where properties contains 'Microsoft.Compute/virtualMachines'
  | extend VmId = tolower(tostring(properties['targetResourceId']))
  | extend AvailabilityState = tostring(properties['availabilityState']))
on $left.VmId == $right.VmId
| project VmId, todatetime(properties['occurredTime']), AvailabilityState
| project-rename ['Virtual Machine ID'] = VmId, UTCTimeStamp = properties_occurredTime, ['Availability State'] = AvailabilityState
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where subscriptionId == 'mySubscriptionId' | where type startswith 'microsoft.workloads/sapvirtualinstances/' | where id startswith 'myResourceId' | mv-expand d = properties.vmDetails | project VmId = tolower(d.virtualMachineId) | join kind = inner (HealthResources | where subscriptionId == 'mySubscriptionId' | where type == 'microsoft.resourcehealth/availabilitystatuses' | where properties contains 'Microsoft.Compute/virtualMachines' | extend VmId = tolower(tostring(properties['targetResourceId'])) | extend AvailabilityState = tostring(properties['availabilityState'])) on \$left.VmId == \$right.VmId | project VmId, todatetime(properties['occurredTime']), AvailabilityState | project-rename ['Virtual Machine ID'] = VmId, UTCTimeStamp = properties_occurredTime, ['Availability State'] = AvailabilityState"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where subscriptionId == 'mySubscriptionId' | where type startswith 'microsoft.workloads/sapvirtualinstances/' | where id startswith 'myResourceId' | mv-expand d = properties.vmDetails | project VmId = tolower(d.virtualMachineId) | join kind = inner (HealthResources | where subscriptionId == 'mySubscriptionId' | where type == 'microsoft.resourcehealth/availabilitystatuses' | where properties contains 'Microsoft.Compute/virtualMachines' | extend VmId = tolower(tostring(properties['targetResourceId'])) | extend AvailabilityState = tostring(properties['availabilityState'])) on `$left.VmId == `$right.VmId | project VmId, todatetime(properties['occurredTime']), AvailabilityState | project-rename ['Virtual Machine ID'] = VmId, UTCTimeStamp = properties_occurredTime, ['Availability State'] = AvailabilityState"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0D%0A%7C%20where%20subscriptionId%20%3D%3D%20%27mySubscriptionId%27%0D%0A%7C%20where%20type%20startswith%20%27microsoft.workloads%2Fsapvirtualinstances%2F%27%0D%0A%7C%20where%20id%20startswith%20%27myResourceId%27%0D%0A%7C%20mv-expand%20d%20%3D%20properties.vmDetails%0D%0A%7C%20project%20VmId%20%3D%20tolower%28d.virtualMachineId%29%0D%0A%7C%20join%20kind%20%3D%20inner%20%28%0D%0A%20%20HealthResources%0D%0A%20%20%7C%20where%20subscriptionId%20%3D%3D%20%27mySubscriptionId%27%0D%0A%20%20%7C%20where%20type%20%3D%3D%20%27microsoft.resourcehealth%2Favailabilitystatuses%27%0D%0A%20%20%7C%20where%20properties%20contains%20%27Microsoft.Compute%2FvirtualMachines%27%0D%0A%20%20%7C%20extend%20VmId%20%3D%20tolower%28tostring%28properties%5B%27targetResourceId%27%5D%29%29%0D%0A%20%20%7C%20extend%20AvailabilityState%20%3D%20tostring%28properties%5B%27availabilityState%27%5D%29%29%0D%0Aon%20%24left.VmId%20%3D%3D%20%24right.VmId%0D%0A%7C%20project%20VmId%2C%20todatetime%28properties%5B%27occurredTime%27%5D%29%2C%20AvailabilityState%0D%0A%7C%20project-rename%20%5B%27Virtual%20Machine%20ID%27%5D%20%3D%20VmId%2C%20UTCTimeStamp%20%3D%20properties_occurredTime%2C%20%5B%27Availability%20State%27%5D%20%3D%20AvailabilityState" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0D%0A%7C%20where%20subscriptionId%20%3D%3D%20%27mySubscriptionId%27%0D%0A%7C%20where%20type%20startswith%20%27microsoft.workloads%2Fsapvirtualinstances%2F%27%0D%0A%7C%20where%20id%20startswith%20%27myResourceId%27%0D%0A%7C%20mv-expand%20d%20%3D%20properties.vmDetails%0D%0A%7C%20project%20VmId%20%3D%20tolower%28d.virtualMachineId%29%0D%0A%7C%20join%20kind%20%3D%20inner%20%28%0D%0A%20%20HealthResources%0D%0A%20%20%7C%20where%20subscriptionId%20%3D%3D%20%27mySubscriptionId%27%0D%0A%20%20%7C%20where%20type%20%3D%3D%20%27microsoft.resourcehealth%2Favailabilitystatuses%27%0D%0A%20%20%7C%20where%20properties%20contains%20%27Microsoft.Compute%2FvirtualMachines%27%0D%0A%20%20%7C%20extend%20VmId%20%3D%20tolower%28tostring%28properties%5B%27targetResourceId%27%5D%29%29%0D%0A%20%20%7C%20extend%20AvailabilityState%20%3D%20tostring%28properties%5B%27availabilityState%27%5D%29%29%0D%0Aon%20%24left.VmId%20%3D%3D%20%24right.VmId%0D%0A%7C%20project%20VmId%2C%20todatetime%28properties%5B%27occurredTime%27%5D%29%2C%20AvailabilityState%0D%0A%7C%20project-rename%20%5B%27Virtual%20Machine%20ID%27%5D%20%3D%20VmId%2C%20UTCTimeStamp%20%3D%20properties_occurredTime%2C%20%5B%27Availability%20State%27%5D%20%3D%20AvailabilityState" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0D%0A%7C%20where%20subscriptionId%20%3D%3D%20%27mySubscriptionId%27%0D%0A%7C%20where%20type%20startswith%20%27microsoft.workloads%2Fsapvirtualinstances%2F%27%0D%0A%7C%20where%20id%20startswith%20%27myResourceId%27%0D%0A%7C%20mv-expand%20d%20%3D%20properties.vmDetails%0D%0A%7C%20project%20VmId%20%3D%20tolower%28d.virtualMachineId%29%0D%0A%7C%20join%20kind%20%3D%20inner%20%28%0D%0A%20%20HealthResources%0D%0A%20%20%7C%20where%20subscriptionId%20%3D%3D%20%27mySubscriptionId%27%0D%0A%20%20%7C%20where%20type%20%3D%3D%20%27microsoft.resourcehealth%2Favailabilitystatuses%27%0D%0A%20%20%7C%20where%20properties%20contains%20%27Microsoft.Compute%2FvirtualMachines%27%0D%0A%20%20%7C%20extend%20VmId%20%3D%20tolower%28tostring%28properties%5B%27targetResourceId%27%5D%29%29%0D%0A%20%20%7C%20extend%20AvailabilityState%20%3D%20tostring%28properties%5B%27availabilityState%27%5D%29%29%0D%0Aon%20%24left.VmId%20%3D%3D%20%24right.VmId%0D%0A%7C%20project%20VmId%2C%20todatetime%28properties%5B%27occurredTime%27%5D%29%2C%20AvailabilityState%0D%0A%7C%20project-rename%20%5B%27Virtual%20Machine%20ID%27%5D%20%3D%20VmId%2C%20UTCTimeStamp%20%3D%20properties_occurredTime%2C%20%5B%27Availability%20State%27%5D%20%3D%20AvailabilityState" target="_blank">portal.azure.cn</a>

---

### Currently unhealthy virtual machines and annotations in Virtual Instance for SAP

This query fetches list of virtual machines of an SAP system that are unhealthy and corresponding annotations given the SID of a [Virtual Instance for SAP](https://learn.microsoft.com/azure/sap/center-sap-solutions/overview). Replace `mySubscriptionId` with your subscription ID, and replace `myResourceId` with the resource ID of your Virtual Instance for SAP.

```kusto
HealthResources
| where subscriptionId == 'mySubscriptionId'
| where type == 'microsoft.resourcehealth/availabilitystatuses'
| where properties contains 'Microsoft.Compute/virtualMachines'
| extend VmId = tolower(tostring(properties['targetResourceId']))
| extend AvailabilityState = tostring(properties['availabilityState'])
| where AvailabilityState != 'Available'
| project VmId, todatetime(properties['occurredTime']), AvailabilityState
| join kind = inner (
  HealthResources
  | where subscriptionId == 'mySubscriptionId'
  | where type == 'microsoft.resourcehealth/resourceannotations'
  | where properties contains 'Microsoft.Compute/virtualMachines'
  | extend VmId = tolower(tostring(properties['targetResourceId']))) on $left.VmId == $right.VmId
  | join kind = inner (Resources
  | where subscriptionId == 'mySubscriptionId'
  | where type startswith 'microsoft.workloads/sapvirtualinstances/'
  | where id startswith 'myResourceId'
  | mv-expand d = properties.vmDetails
  | project VmId = tolower(d.virtualMachineId))
on $left.VmId1 == $right.VmId
| extend AnnotationName = tostring(properties['annotationName']), ImpactType = tostring(properties['impactType']), Context = tostring(properties['context']), Summary = tostring(properties['summary']), Reason = tostring(properties['reason']), OccurredTime = todatetime(properties['occurredTime'])
| project VmId, OccurredTime, AvailabilityState, AnnotationName, ImpactType, Context, Summary, Reason
| project-rename ['Virtual Machine ID'] = VmId, ['Time Since Not Available'] = OccurredTime, ['Availability State'] = AvailabilityState, ['Annotation Name'] = AnnotationName, ['Impact Type'] = ImpactType
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "HealthResources | where subscriptionId == 'mySubscriptionId' | where type == 'microsoft.resourcehealth/availabilitystatuses' | where properties contains 'Microsoft.Compute/virtualMachines' | extend VmId = tolower(tostring(properties['targetResourceId'])) | extend AvailabilityState = tostring(properties['availabilityState']) | where AvailabilityState != 'Available' | project VmId, todatetime(properties['occurredTime']), AvailabilityState | join kind = inner (HealthResources | where subscriptionId == 'mySubscriptionId' | where type == 'microsoft.resourcehealth/resourceannotations' | where properties contains 'Microsoft.Compute/virtualMachines' | extend VmId = tolower(tostring(properties['targetResourceId']))) on \$left.VmId == \$right.VmId   | join kind = inner (Resources | where subscriptionId == 'mySubscriptionId' | where type startswith 'microsoft.workloads/sapvirtualinstances/' | where id startswith 'myResourceId' | mv-expand d = properties.vmDetails | project VmId = tolower(d.virtualMachineId)) on \$left.VmId1 == \$right.VmId | extend AnnotationName = tostring(properties['annotationName']), ImpactType = tostring(properties['impactType']), Context = tostring(properties['context']), Summary = tostring(properties['summary']), Reason = tostring(properties['reason']), OccurredTime = todatetime(properties['occurredTime']) | project VmId, OccurredTime, AvailabilityState, AnnotationName, ImpactType, Context, Summary, Reason | project-rename ['Virtual Machine ID'] = VmId, ['Time Since Not Available'] = OccurredTime, ['Availability State'] = AvailabilityState, ['Annotation Name'] = AnnotationName, ['Impact Type'] = ImpactType"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "HealthResources | where subscriptionId == 'mySubscriptionId' | where type == 'microsoft.resourcehealth/availabilitystatuses' | where properties contains 'Microsoft.Compute/virtualMachines' | extend VmId = tolower(tostring(properties['targetResourceId'])) | extend AvailabilityState = tostring(properties['availabilityState']) | where AvailabilityState != 'Available' | project VmId, todatetime(properties['occurredTime']), AvailabilityState | join kind = inner (HealthResources | where subscriptionId == 'mySubscriptionId' | where type == 'microsoft.resourcehealth/resourceannotations' | where properties contains 'Microsoft.Compute/virtualMachines' | extend VmId = tolower(tostring(properties['targetResourceId']))) on `$left.VmId == `$right.VmId   | join kind = inner (Resources | where subscriptionId == 'mySubscriptionId' | where type startswith 'microsoft.workloads/sapvirtualinstances/' | where id startswith 'myResourceId' | mv-expand d = properties.vmDetails | project VmId = tolower(d.virtualMachineId)) on `$left.VmId1 == `$right.VmId | extend AnnotationName = tostring(properties['annotationName']), ImpactType = tostring(properties['impactType']), Context = tostring(properties['context']), Summary = tostring(properties['summary']), Reason = tostring(properties['reason']), OccurredTime = todatetime(properties['occurredTime']) | project VmId, OccurredTime, AvailabilityState, AnnotationName, ImpactType, Context, Summary, Reason | project-rename ['Virtual Machine ID'] = VmId, ['Time Since Not Available'] = OccurredTime, ['Availability State'] = AvailabilityState, ['Annotation Name'] = AnnotationName, ['Impact Type'] = ImpactType"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/HealthResources%0D%0A%7C%20where%20subscriptionId%20%3D%3D%20%27mySubscriptionId%27%0D%0A%7C%20where%20type%20%3D%3D%20%27microsoft.resourcehealth%2Favailabilitystatuses%27%0D%0A%7C%20where%20properties%20contains%20%27Microsoft.Compute%2FvirtualMachines%27%0D%0A%7C%20extend%20VmId%20%3D%20tolower%28tostring%28properties%5B%27targetResourceId%27%5D%29%29%0D%0A%7C%20extend%20AvailabilityState%20%3D%20tostring%28properties%5B%27availabilityState%27%5D%29%0D%0A%7C%20where%20AvailabilityState%20%21%3D%20%27Available%27%0D%0A%7C%20project%20VmId%2C%20todatetime%28properties%5B%27occurredTime%27%5D%29%2C%20AvailabilityState%0D%0A%7C%20join%20kind%20%3D%20inner%20%28%0D%0A%20%20HealthResources%0D%0A%20%20%7C%20where%20subscriptionId%20%3D%3D%20%27mySubscriptionId%27%0D%0A%20%20%7C%20where%20type%20%3D%3D%20%27microsoft.resourcehealth%2Fresourceannotations%27%0D%0A%20%20%7C%20where%20properties%20contains%20%27Microsoft.Compute%2FvirtualMachines%27%0D%0A%20%20%7C%20extend%20VmId%20%3D%20tolower%28tostring%28properties%5B%27targetResourceId%27%5D%29%29%29%20on%20%24left.VmId%20%3D%3D%20%24right.VmId%0D%0A%20%20%7C%20join%20kind%20%3D%20inner%20%28Resources%0D%0A%20%20%7C%20where%20subscriptionId%20%3D%3D%20%27mySubscriptionId%27%0D%0A%20%20%7C%20where%20type%20startswith%20%27microsoft.workloads%2Fsapvirtualinstances%2F%27%0D%0A%20%20%7C%20where%20id%20startswith%20%27myResourceId%27%0D%0A%20%20%7C%20mv-expand%20d%20%3D%20properties.vmDetails%0D%0A%20%20%7C%20project%20VmId%20%3D%20tolower%28d.virtualMachineId%29%29%0D%0Aon%20%24left.VmId1%20%3D%3D%20%24right.VmId%0D%0A%7C%20extend%20AnnotationName%20%3D%20tostring%28properties%5B%27annotationName%27%5D%29%2C%20ImpactType%20%3D%20tostring%28properties%5B%27impactType%27%5D%29%2C%20Context%20%3D%20tostring%28properties%5B%27context%27%5D%29%2C%20Summary%20%3D%20tostring%28properties%5B%27summary%27%5D%29%2C%20Reason%20%3D%20tostring%28properties%5B%27reason%27%5D%29%2C%20OccurredTime%20%3D%20todatetime%28properties%5B%27occurredTime%27%5D%29%0D%0A%7C%20project%20VmId%2C%20OccurredTime%2C%20AvailabilityState%2C%20AnnotationName%2C%20ImpactType%2C%20Context%2C%20Summary%2C%20Reason%0D%0A%7C%20project-rename%20%5B%27Virtual%20Machine%20ID%27%5D%20%3D%20VmId%2C%20%5B%27Time%20Since%20Not%20Available%27%5D%20%3D%20OccurredTime%2C%20%5B%27Availability%20State%27%5D%20%3D%20AvailabilityState%2C%20%5B%27Annotation%20Name%27%5D%20%3D%20AnnotationName%2C%20%5B%27Impact%20Type%27%5D%20%3D%20ImpactType" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/HealthResources%0D%0A%7C%20where%20subscriptionId%20%3D%3D%20%27mySubscriptionId%27%0D%0A%7C%20where%20type%20%3D%3D%20%27microsoft.resourcehealth%2Favailabilitystatuses%27%0D%0A%7C%20where%20properties%20contains%20%27Microsoft.Compute%2FvirtualMachines%27%0D%0A%7C%20extend%20VmId%20%3D%20tolower%28tostring%28properties%5B%27targetResourceId%27%5D%29%29%0D%0A%7C%20extend%20AvailabilityState%20%3D%20tostring%28properties%5B%27availabilityState%27%5D%29%0D%0A%7C%20where%20AvailabilityState%20%21%3D%20%27Available%27%0D%0A%7C%20project%20VmId%2C%20todatetime%28properties%5B%27occurredTime%27%5D%29%2C%20AvailabilityState%0D%0A%7C%20join%20kind%20%3D%20inner%20%28%0D%0A%20%20HealthResources%0D%0A%20%20%7C%20where%20subscriptionId%20%3D%3D%20%27mySubscriptionId%27%0D%0A%20%20%7C%20where%20type%20%3D%3D%20%27microsoft.resourcehealth%2Fresourceannotations%27%0D%0A%20%20%7C%20where%20properties%20contains%20%27Microsoft.Compute%2FvirtualMachines%27%0D%0A%20%20%7C%20extend%20VmId%20%3D%20tolower%28tostring%28properties%5B%27targetResourceId%27%5D%29%29%29%20on%20%24left.VmId%20%3D%3D%20%24right.VmId%0D%0A%20%20%7C%20join%20kind%20%3D%20inner%20%28Resources%0D%0A%20%20%7C%20where%20subscriptionId%20%3D%3D%20%27mySubscriptionId%27%0D%0A%20%20%7C%20where%20type%20startswith%20%27microsoft.workloads%2Fsapvirtualinstances%2F%27%0D%0A%20%20%7C%20where%20id%20startswith%20%27myResourceId%27%0D%0A%20%20%7C%20mv-expand%20d%20%3D%20properties.vmDetails%0D%0A%20%20%7C%20project%20VmId%20%3D%20tolower%28d.virtualMachineId%29%29%0D%0Aon%20%24left.VmId1%20%3D%3D%20%24right.VmId%0D%0A%7C%20extend%20AnnotationName%20%3D%20tostring%28properties%5B%27annotationName%27%5D%29%2C%20ImpactType%20%3D%20tostring%28properties%5B%27impactType%27%5D%29%2C%20Context%20%3D%20tostring%28properties%5B%27context%27%5D%29%2C%20Summary%20%3D%20tostring%28properties%5B%27summary%27%5D%29%2C%20Reason%20%3D%20tostring%28properties%5B%27reason%27%5D%29%2C%20OccurredTime%20%3D%20todatetime%28properties%5B%27occurredTime%27%5D%29%0D%0A%7C%20project%20VmId%2C%20OccurredTime%2C%20AvailabilityState%2C%20AnnotationName%2C%20ImpactType%2C%20Context%2C%20Summary%2C%20Reason%0D%0A%7C%20project-rename%20%5B%27Virtual%20Machine%20ID%27%5D%20%3D%20VmId%2C%20%5B%27Time%20Since%20Not%20Available%27%5D%20%3D%20OccurredTime%2C%20%5B%27Availability%20State%27%5D%20%3D%20AvailabilityState%2C%20%5B%27Annotation%20Name%27%5D%20%3D%20AnnotationName%2C%20%5B%27Impact%20Type%27%5D%20%3D%20ImpactType" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/HealthResources%0D%0A%7C%20where%20subscriptionId%20%3D%3D%20%27mySubscriptionId%27%0D%0A%7C%20where%20type%20%3D%3D%20%27microsoft.resourcehealth%2Favailabilitystatuses%27%0D%0A%7C%20where%20properties%20contains%20%27Microsoft.Compute%2FvirtualMachines%27%0D%0A%7C%20extend%20VmId%20%3D%20tolower%28tostring%28properties%5B%27targetResourceId%27%5D%29%29%0D%0A%7C%20extend%20AvailabilityState%20%3D%20tostring%28properties%5B%27availabilityState%27%5D%29%0D%0A%7C%20where%20AvailabilityState%20%21%3D%20%27Available%27%0D%0A%7C%20project%20VmId%2C%20todatetime%28properties%5B%27occurredTime%27%5D%29%2C%20AvailabilityState%0D%0A%7C%20join%20kind%20%3D%20inner%20%28%0D%0A%20%20HealthResources%0D%0A%20%20%7C%20where%20subscriptionId%20%3D%3D%20%27mySubscriptionId%27%0D%0A%20%20%7C%20where%20type%20%3D%3D%20%27microsoft.resourcehealth%2Fresourceannotations%27%0D%0A%20%20%7C%20where%20properties%20contains%20%27Microsoft.Compute%2FvirtualMachines%27%0D%0A%20%20%7C%20extend%20VmId%20%3D%20tolower%28tostring%28properties%5B%27targetResourceId%27%5D%29%29%29%20on%20%24left.VmId%20%3D%3D%20%24right.VmId%0D%0A%20%20%7C%20join%20kind%20%3D%20inner%20%28Resources%0D%0A%20%20%7C%20where%20subscriptionId%20%3D%3D%20%27mySubscriptionId%27%0D%0A%20%20%7C%20where%20type%20startswith%20%27microsoft.workloads%2Fsapvirtualinstances%2F%27%0D%0A%20%20%7C%20where%20id%20startswith%20%27myResourceId%27%0D%0A%20%20%7C%20mv-expand%20d%20%3D%20properties.vmDetails%0D%0A%20%20%7C%20project%20VmId%20%3D%20tolower%28d.virtualMachineId%29%29%0D%0Aon%20%24left.VmId1%20%3D%3D%20%24right.VmId%0D%0A%7C%20extend%20AnnotationName%20%3D%20tostring%28properties%5B%27annotationName%27%5D%29%2C%20ImpactType%20%3D%20tostring%28properties%5B%27impactType%27%5D%29%2C%20Context%20%3D%20tostring%28properties%5B%27context%27%5D%29%2C%20Summary%20%3D%20tostring%28properties%5B%27summary%27%5D%29%2C%20Reason%20%3D%20tostring%28properties%5B%27reason%27%5D%29%2C%20OccurredTime%20%3D%20todatetime%28properties%5B%27occurredTime%27%5D%29%0D%0A%7C%20project%20VmId%2C%20OccurredTime%2C%20AvailabilityState%2C%20AnnotationName%2C%20ImpactType%2C%20Context%2C%20Summary%2C%20Reason%0D%0A%7C%20project-rename%20%5B%27Virtual%20Machine%20ID%27%5D%20%3D%20VmId%2C%20%5B%27Time%20Since%20Not%20Available%27%5D%20%3D%20OccurredTime%2C%20%5B%27Availability%20State%27%5D%20%3D%20AvailabilityState%2C%20%5B%27Annotation%20Name%27%5D%20%3D%20AnnotationName%2C%20%5B%27Impact%20Type%27%5D%20%3D%20ImpactType" target="_blank">portal.azure.cn</a>

---



### Changes in health of virtual machines and annotations in Virtual Instance for SAP

This query fetches the historical changes in availability health and corresponding annotations of all virtual machines of an SAP system given the SID of a [Virtual Instance for SAP](https://learn.microsoft.com/azure/sap/center-sap-solutions/overview). Replace `mySubscriptionId` with your subscription ID, and replace `myResourceId` with the resource ID of your Virtual Instance for SAP.

```kusto
Resources
| where subscriptionId == 'mySubscriptionId'
| where type startswith 'microsoft.workloads/sapvirtualinstances/'
| where id startswith 'myResourceId'
| mv-expand d = properties.vmDetails
| project VmId = tolower(d.virtualMachineId)
| join kind = leftouter (
  HealthResourceChanges
  | where subscriptionId == 'mySubscriptionId'
  | where id !has '/virtualMachineScaleSets/'
  | where id has '/virtualMachines/'
  | extend timestamp = todatetime(properties.changeAttributes.timestamp)
  | extend VmId = tolower(tostring(split(id, '/providers/Microsoft.ResourceHealth/')[0]))
  | where properties has 'properties.availabilityState' or properties has 'properties.annotationName'
  | extend HealthChangeType = iff(properties has 'properties.availabilityState', 'Availability', 'Annotation')
  | extend ChangeType = tostring(properties.changeType)
  | where ChangeType == 'Update'  or ChangeType == 'Delete')
on $left.VmId == $right.VmId
| extend Changes = parse_json(tostring(properties.changes))
| extend AvailabilityStateJson = parse_json(tostring(Changes['properties.availabilityState']))
| extend AnnotationNameJson = parse_json(tostring(Changes['properties.annotationName']))
| extend AnnotationSummary = parse_json(tostring(Changes['properties.summary']))
| extend AnnotationReason = parse_json(tostring(Changes['properties.reason']))
| extend AnnotationImpactType = parse_json(tostring(Changes['properties.impactType']))
| extend AnnotationContext = parse_json(tostring(Changes['properties.context']))
| extend AnnotationCategory = parse_json(tostring(Changes['properties.category']))
| extend AvailabilityStatePreviousValue = tostring(AvailabilityStateJson.previousValue)
| extend AvailabilityStateCurrentValue = tostring(AvailabilityStateJson.newValue)
| extend AnnotationNamePreviousValue = tostring(AnnotationNameJson.previousValue)
| extend AnnotationNameCurrentValue = tostring(AnnotationNameJson.newValue)
| extend AnnotationSummaryCurrentValue = tostring(AnnotationSummary.newValue)
| extend AnnotationReasonCurrentValue = tostring(AnnotationReason.newValue)
| extend AnnotationImpactTypeCurrentValue = tostring(AnnotationImpactType.newValue)
| extend AnnotationContextCurrentValue = tostring(AnnotationContext.newValue)
| extend AnnotationCategoryCurrentValue = tostring(AnnotationCategory.newValue)
| project id = VmId, timestamp, ChangeType, AvailabilityStateCurrentValue, AnnotationNameCurrentValue, AnnotationSummaryCurrentValue, AnnotationReasonCurrentValue, AnnotationImpactTypeCurrentValue, AnnotationContextCurrentValue, AnnotationCategoryCurrentValue, Changes
| order by id, timestamp asc
| project-rename ['Virtual Machine ID'] = id, UTCTimeStamp = timestamp, ['Change Type'] = ChangeType, ['Availability State'] = AvailabilityStateCurrentValue, ['Summary'] = AnnotationSummaryCurrentValue, ['Reason'] = AnnotationReasonCurrentValue, ['Impact Type'] = AnnotationImpactTypeCurrentValue, Category = AnnotationCategoryCurrentValue, Context = AnnotationContextCurrentValue
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where subscriptionId == 'mySubscriptionId' | where type startswith 'microsoft.workloads/sapvirtualinstances/' | where id startswith 'myResourceId' | mv-expand d = properties.vmDetails | project VmId = tolower(d.virtualMachineId) | join kind = leftouter (HealthResourceChanges | where subscriptionId == 'mySubscriptionId' | where id !has '/virtualMachineScaleSets/' | where id has '/virtualMachines/' | extend timestamp = todatetime(properties.changeAttributes.timestamp) | extend VmId = tolower(tostring(split(id, '/providers/Microsoft.ResourceHealth/')[0])) | where properties has 'properties.availabilityState' or properties has 'properties.annotationName' | extend HealthChangeType = iff(properties has 'properties.availabilityState', 'Availability', 'Annotation') | extend ChangeType = tostring(properties.changeType) | where ChangeType == 'Update' or ChangeType == 'Delete') on \$left.VmId == \$right.VmId | extend Changes = parse_json(tostring(properties.changes)) | extend AvailabilityStateJson = parse_json(tostring(Changes['properties.availabilityState'])) | extend AnnotationNameJson = parse_json(tostring(Changes['properties.annotationName'])) | extend AnnotationSummary = parse_json(tostring(Changes['properties.summary'])) | extend AnnotationReason = parse_json(tostring(Changes['properties.reason'])) | extend AnnotationImpactType = parse_json(tostring(Changes['properties.impactType'])) | extend AnnotationContext = parse_json(tostring(Changes['properties.context'])) | extend AnnotationCategory = parse_json(tostring(Changes['properties.category'])) | extend AvailabilityStatePreviousValue = tostring(AvailabilityStateJson.previousValue) | extend AvailabilityStateCurrentValue = tostring(AvailabilityStateJson.newValue) | extend AnnotationNamePreviousValue = tostring(AnnotationNameJson.previousValue) | extend AnnotationNameCurrentValue = tostring(AnnotationNameJson.newValue) | extend AnnotationSummaryCurrentValue = tostring(AnnotationSummary.newValue) | extend AnnotationReasonCurrentValue = tostring(AnnotationReason.newValue) | extend AnnotationImpactTypeCurrentValue = tostring(AnnotationImpactType.newValue) | extend AnnotationContextCurrentValue = tostring(AnnotationContext.newValue) | extend AnnotationCategoryCurrentValue = tostring(AnnotationCategory.newValue) | project id = VmId, timestamp, ChangeType, AvailabilityStateCurrentValue, AnnotationNameCurrentValue, AnnotationSummaryCurrentValue, AnnotationReasonCurrentValue, AnnotationImpactTypeCurrentValue, AnnotationContextCurrentValue, AnnotationCategoryCurrentValue, Changes | order by id, timestamp asc | project-rename ['Virtual Machine ID'] = id, UTCTimeStamp = timestamp, ['Change Type'] = ChangeType, ['Availability State'] = AvailabilityStateCurrentValue, ['Summary'] = AnnotationSummaryCurrentValue, ['Reason'] = AnnotationReasonCurrentValue, ['Impact Type'] = AnnotationImpactTypeCurrentValue, Category = AnnotationCategoryCurrentValue, Context = AnnotationContextCurrentValue"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where subscriptionId == 'mySubscriptionId' | where type startswith 'microsoft.workloads/sapvirtualinstances/' | where id startswith 'myResourceId' | mv-expand d = properties.vmDetails | project VmId = tolower(d.virtualMachineId) | join kind = leftouter (HealthResourceChanges | where subscriptionId == 'mySubscriptionId' | where id !has '/virtualMachineScaleSets/' | where id has '/virtualMachines/' | extend timestamp = todatetime(properties.changeAttributes.timestamp) | extend VmId = tolower(tostring(split(id, '/providers/Microsoft.ResourceHealth/')[0])) | where properties has 'properties.availabilityState' or properties has 'properties.annotationName' | extend HealthChangeType = iff(properties has 'properties.availabilityState', 'Availability', 'Annotation') | extend ChangeType = tostring(properties.changeType) | where ChangeType == 'Update' or ChangeType == 'Delete') on `$left.VmId == `$right.VmId | extend Changes = parse_json(tostring(properties.changes)) | extend AvailabilityStateJson = parse_json(tostring(Changes['properties.availabilityState'])) | extend AnnotationNameJson = parse_json(tostring(Changes['properties.annotationName'])) | extend AnnotationSummary = parse_json(tostring(Changes['properties.summary'])) | extend AnnotationReason = parse_json(tostring(Changes['properties.reason'])) | extend AnnotationImpactType = parse_json(tostring(Changes['properties.impactType'])) | extend AnnotationContext = parse_json(tostring(Changes['properties.context'])) | extend AnnotationCategory = parse_json(tostring(Changes['properties.category'])) | extend AvailabilityStatePreviousValue = tostring(AvailabilityStateJson.previousValue) | extend AvailabilityStateCurrentValue = tostring(AvailabilityStateJson.newValue) | extend AnnotationNamePreviousValue = tostring(AnnotationNameJson.previousValue) | extend AnnotationNameCurrentValue = tostring(AnnotationNameJson.newValue) | extend AnnotationSummaryCurrentValue = tostring(AnnotationSummary.newValue) | extend AnnotationReasonCurrentValue = tostring(AnnotationReason.newValue) | extend AnnotationImpactTypeCurrentValue = tostring(AnnotationImpactType.newValue) | extend AnnotationContextCurrentValue = tostring(AnnotationContext.newValue) | extend AnnotationCategoryCurrentValue = tostring(AnnotationCategory.newValue) | project id = VmId, timestamp, ChangeType, AvailabilityStateCurrentValue, AnnotationNameCurrentValue, AnnotationSummaryCurrentValue, AnnotationReasonCurrentValue, AnnotationImpactTypeCurrentValue, AnnotationContextCurrentValue, AnnotationCategoryCurrentValue, Changes | order by id, timestamp asc | project-rename ['Virtual Machine ID'] = id, UTCTimeStamp = timestamp, ['Change Type'] = ChangeType, ['Availability State'] = AvailabilityStateCurrentValue, ['Summary'] = AnnotationSummaryCurrentValue, ['Reason'] = AnnotationReasonCurrentValue, ['Impact Type'] = AnnotationImpactTypeCurrentValue, Category = AnnotationCategoryCurrentValue, Context = AnnotationContextCurrentValue"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0D%0A%7C%20where%20subscriptionId%20%3D%3D%20%27mySubscriptionId%27%0D%0A%7C%20where%20type%20startswith%20%27microsoft.workloads%2Fsapvirtualinstances%2F%27%0D%0A%7C%20where%20id%20startswith%20%27myResourceId%27%0D%0A%7C%20mv-expand%20d%20%3D%20properties.vmDetails%0D%0A%7C%20project%20VmId%20%3D%20tolower%28d.virtualMachineId%29%0D%0A%7C%20join%20kind%20%3D%20leftouter%20%28%0D%0A%20%20HealthResourceChanges%0D%0A%20%20%7C%20where%20subscriptionId%20%3D%3D%20%27mySubscriptionId%27%0D%0A%20%20%7C%20where%20id%20%21has%20%27%2FvirtualMachineScaleSets%2F%27%0D%0A%20%20%7C%20where%20id%20has%20%27%2FvirtualMachines%2F%27%0D%0A%20%20%7C%20extend%20timestamp%20%3D%20todatetime%28properties.changeAttributes.timestamp%29%0D%0A%20%20%7C%20extend%20VmId%20%3D%20tolower%28tostring%28split%28id%2C%20%27%2Fproviders%2FMicrosoft.ResourceHealth%2F%27%29%5B0%5D%29%29%0D%0A%20%20%7C%20where%20properties%20has%20%27properties.availabilityState%27%20or%20properties%20has%20%27properties.annotationName%27%0D%0A%20%20%7C%20extend%20HealthChangeType%20%3D%20iff%28properties%20has%20%27properties.availabilityState%27%2C%20%27Availability%27%2C%20%27Annotation%27%29%0D%0A%20%20%7C%20extend%20ChangeType%20%3D%20tostring%28properties.changeType%29%0D%0A%20%20%7C%20where%20ChangeType%20%3D%3D%20%27Update%27%20%20or%20ChangeType%20%3D%3D%20%27Delete%27%29%0D%0Aon%20%24left.VmId%20%3D%3D%20%24right.VmId%0D%0A%7C%20extend%20Changes%20%3D%20parse_json%28tostring%28properties.changes%29%29%0D%0A%7C%20extend%20AvailabilityStateJson%20%3D%20parse_json%28tostring%28Changes%5B%27properties.availabilityState%27%5D%29%29%0D%0A%7C%20extend%20AnnotationNameJson%20%3D%20parse_json%28tostring%28Changes%5B%27properties.annotationName%27%5D%29%29%0D%0A%7C%20extend%20AnnotationSummary%20%3D%20parse_json%28tostring%28Changes%5B%27properties.summary%27%5D%29%29%0D%0A%7C%20extend%20AnnotationReason%20%3D%20parse_json%28tostring%28Changes%5B%27properties.reason%27%5D%29%29%0D%0A%7C%20extend%20AnnotationImpactType%20%3D%20parse_json%28tostring%28Changes%5B%27properties.impactType%27%5D%29%29%0D%0A%7C%20extend%20AnnotationContext%20%3D%20parse_json%28tostring%28Changes%5B%27properties.context%27%5D%29%29%0D%0A%7C%20extend%20AnnotationCategory%20%3D%20parse_json%28tostring%28Changes%5B%27properties.category%27%5D%29%29%0D%0A%7C%20extend%20AvailabilityStatePreviousValue%20%3D%20tostring%28AvailabilityStateJson.previousValue%29%0D%0A%7C%20extend%20AvailabilityStateCurrentValue%20%3D%20tostring%28AvailabilityStateJson.newValue%29%0D%0A%7C%20extend%20AnnotationNamePreviousValue%20%3D%20tostring%28AnnotationNameJson.previousValue%29%0D%0A%7C%20extend%20AnnotationNameCurrentValue%20%3D%20tostring%28AnnotationNameJson.newValue%29%0D%0A%7C%20extend%20AnnotationSummaryCurrentValue%20%3D%20tostring%28AnnotationSummary.newValue%29%0D%0A%7C%20extend%20AnnotationReasonCurrentValue%20%3D%20tostring%28AnnotationReason.newValue%29%0D%0A%7C%20extend%20AnnotationImpactTypeCurrentValue%20%3D%20tostring%28AnnotationImpactType.newValue%29%0D%0A%7C%20extend%20AnnotationContextCurrentValue%20%3D%20tostring%28AnnotationContext.newValue%29%0D%0A%7C%20extend%20AnnotationCategoryCurrentValue%20%3D%20tostring%28AnnotationCategory.newValue%29%0D%0A%7C%20project%20id%20%3D%20VmId%2C%20timestamp%2C%20ChangeType%2C%20AvailabilityStateCurrentValue%2C%20AnnotationNameCurrentValue%2C%20AnnotationSummaryCurrentValue%2C%20AnnotationReasonCurrentValue%2C%20AnnotationImpactTypeCurrentValue%2C%20AnnotationContextCurrentValue%2C%20AnnotationCategoryCurrentValue%2C%20Changes%0D%0A%7C%20order%20by%20id%2C%20timestamp%20asc%0D%0A%7C%20project-rename%20%5B%27Virtual%20Machine%20ID%27%5D%20%3D%20id%2C%20UTCTimeStamp%20%3D%20timestamp%2C%20%5B%27Change%20Type%27%5D%20%3D%20ChangeType%2C%20%5B%27Availability%20State%27%5D%20%3D%20AvailabilityStateCurrentValue%2C%20%5B%27Summary%27%5D%20%3D%20AnnotationSummaryCurrentValue%2C%20%5B%27Reason%27%5D%20%3D%20AnnotationReasonCurrentValue%2C%20%5B%27Impact%20Type%27%5D%20%3D%20AnnotationImpactTypeCurrentValue%2C%20Category%20%3D%20AnnotationCategoryCurrentValue%2C%20Context%20%3D%20AnnotationContextCurrentValue" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0D%0A%7C%20where%20subscriptionId%20%3D%3D%20%27mySubscriptionId%27%0D%0A%7C%20where%20type%20startswith%20%27microsoft.workloads%2Fsapvirtualinstances%2F%27%0D%0A%7C%20where%20id%20startswith%20%27myResourceId%27%0D%0A%7C%20mv-expand%20d%20%3D%20properties.vmDetails%0D%0A%7C%20project%20VmId%20%3D%20tolower%28d.virtualMachineId%29%0D%0A%7C%20join%20kind%20%3D%20leftouter%20%28%0D%0A%20%20HealthResourceChanges%0D%0A%20%20%7C%20where%20subscriptionId%20%3D%3D%20%27mySubscriptionId%27%0D%0A%20%20%7C%20where%20id%20%21has%20%27%2FvirtualMachineScaleSets%2F%27%0D%0A%20%20%7C%20where%20id%20has%20%27%2FvirtualMachines%2F%27%0D%0A%20%20%7C%20extend%20timestamp%20%3D%20todatetime%28properties.changeAttributes.timestamp%29%0D%0A%20%20%7C%20extend%20VmId%20%3D%20tolower%28tostring%28split%28id%2C%20%27%2Fproviders%2FMicrosoft.ResourceHealth%2F%27%29%5B0%5D%29%29%0D%0A%20%20%7C%20where%20properties%20has%20%27properties.availabilityState%27%20or%20properties%20has%20%27properties.annotationName%27%0D%0A%20%20%7C%20extend%20HealthChangeType%20%3D%20iff%28properties%20has%20%27properties.availabilityState%27%2C%20%27Availability%27%2C%20%27Annotation%27%29%0D%0A%20%20%7C%20extend%20ChangeType%20%3D%20tostring%28properties.changeType%29%0D%0A%20%20%7C%20where%20ChangeType%20%3D%3D%20%27Update%27%20%20or%20ChangeType%20%3D%3D%20%27Delete%27%29%0D%0Aon%20%24left.VmId%20%3D%3D%20%24right.VmId%0D%0A%7C%20extend%20Changes%20%3D%20parse_json%28tostring%28properties.changes%29%29%0D%0A%7C%20extend%20AvailabilityStateJson%20%3D%20parse_json%28tostring%28Changes%5B%27properties.availabilityState%27%5D%29%29%0D%0A%7C%20extend%20AnnotationNameJson%20%3D%20parse_json%28tostring%28Changes%5B%27properties.annotationName%27%5D%29%29%0D%0A%7C%20extend%20AnnotationSummary%20%3D%20parse_json%28tostring%28Changes%5B%27properties.summary%27%5D%29%29%0D%0A%7C%20extend%20AnnotationReason%20%3D%20parse_json%28tostring%28Changes%5B%27properties.reason%27%5D%29%29%0D%0A%7C%20extend%20AnnotationImpactType%20%3D%20parse_json%28tostring%28Changes%5B%27properties.impactType%27%5D%29%29%0D%0A%7C%20extend%20AnnotationContext%20%3D%20parse_json%28tostring%28Changes%5B%27properties.context%27%5D%29%29%0D%0A%7C%20extend%20AnnotationCategory%20%3D%20parse_json%28tostring%28Changes%5B%27properties.category%27%5D%29%29%0D%0A%7C%20extend%20AvailabilityStatePreviousValue%20%3D%20tostring%28AvailabilityStateJson.previousValue%29%0D%0A%7C%20extend%20AvailabilityStateCurrentValue%20%3D%20tostring%28AvailabilityStateJson.newValue%29%0D%0A%7C%20extend%20AnnotationNamePreviousValue%20%3D%20tostring%28AnnotationNameJson.previousValue%29%0D%0A%7C%20extend%20AnnotationNameCurrentValue%20%3D%20tostring%28AnnotationNameJson.newValue%29%0D%0A%7C%20extend%20AnnotationSummaryCurrentValue%20%3D%20tostring%28AnnotationSummary.newValue%29%0D%0A%7C%20extend%20AnnotationReasonCurrentValue%20%3D%20tostring%28AnnotationReason.newValue%29%0D%0A%7C%20extend%20AnnotationImpactTypeCurrentValue%20%3D%20tostring%28AnnotationImpactType.newValue%29%0D%0A%7C%20extend%20AnnotationContextCurrentValue%20%3D%20tostring%28AnnotationContext.newValue%29%0D%0A%7C%20extend%20AnnotationCategoryCurrentValue%20%3D%20tostring%28AnnotationCategory.newValue%29%0D%0A%7C%20project%20id%20%3D%20VmId%2C%20timestamp%2C%20ChangeType%2C%20AvailabilityStateCurrentValue%2C%20AnnotationNameCurrentValue%2C%20AnnotationSummaryCurrentValue%2C%20AnnotationReasonCurrentValue%2C%20AnnotationImpactTypeCurrentValue%2C%20AnnotationContextCurrentValue%2C%20AnnotationCategoryCurrentValue%2C%20Changes%0D%0A%7C%20order%20by%20id%2C%20timestamp%20asc%0D%0A%7C%20project-rename%20%5B%27Virtual%20Machine%20ID%27%5D%20%3D%20id%2C%20UTCTimeStamp%20%3D%20timestamp%2C%20%5B%27Change%20Type%27%5D%20%3D%20ChangeType%2C%20%5B%27Availability%20State%27%5D%20%3D%20AvailabilityStateCurrentValue%2C%20%5B%27Summary%27%5D%20%3D%20AnnotationSummaryCurrentValue%2C%20%5B%27Reason%27%5D%20%3D%20AnnotationReasonCurrentValue%2C%20%5B%27Impact%20Type%27%5D%20%3D%20AnnotationImpactTypeCurrentValue%2C%20Category%20%3D%20AnnotationCategoryCurrentValue%2C%20Context%20%3D%20AnnotationContextCurrentValue" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0D%0A%7C%20where%20subscriptionId%20%3D%3D%20%27mySubscriptionId%27%0D%0A%7C%20where%20type%20startswith%20%27microsoft.workloads%2Fsapvirtualinstances%2F%27%0D%0A%7C%20where%20id%20startswith%20%27myResourceId%27%0D%0A%7C%20mv-expand%20d%20%3D%20properties.vmDetails%0D%0A%7C%20project%20VmId%20%3D%20tolower%28d.virtualMachineId%29%0D%0A%7C%20join%20kind%20%3D%20leftouter%20%28%0D%0A%20%20HealthResourceChanges%0D%0A%20%20%7C%20where%20subscriptionId%20%3D%3D%20%27mySubscriptionId%27%0D%0A%20%20%7C%20where%20id%20%21has%20%27%2FvirtualMachineScaleSets%2F%27%0D%0A%20%20%7C%20where%20id%20has%20%27%2FvirtualMachines%2F%27%0D%0A%20%20%7C%20extend%20timestamp%20%3D%20todatetime%28properties.changeAttributes.timestamp%29%0D%0A%20%20%7C%20extend%20VmId%20%3D%20tolower%28tostring%28split%28id%2C%20%27%2Fproviders%2FMicrosoft.ResourceHealth%2F%27%29%5B0%5D%29%29%0D%0A%20%20%7C%20where%20properties%20has%20%27properties.availabilityState%27%20or%20properties%20has%20%27properties.annotationName%27%0D%0A%20%20%7C%20extend%20HealthChangeType%20%3D%20iff%28properties%20has%20%27properties.availabilityState%27%2C%20%27Availability%27%2C%20%27Annotation%27%29%0D%0A%20%20%7C%20extend%20ChangeType%20%3D%20tostring%28properties.changeType%29%0D%0A%20%20%7C%20where%20ChangeType%20%3D%3D%20%27Update%27%20%20or%20ChangeType%20%3D%3D%20%27Delete%27%29%0D%0Aon%20%24left.VmId%20%3D%3D%20%24right.VmId%0D%0A%7C%20extend%20Changes%20%3D%20parse_json%28tostring%28properties.changes%29%29%0D%0A%7C%20extend%20AvailabilityStateJson%20%3D%20parse_json%28tostring%28Changes%5B%27properties.availabilityState%27%5D%29%29%0D%0A%7C%20extend%20AnnotationNameJson%20%3D%20parse_json%28tostring%28Changes%5B%27properties.annotationName%27%5D%29%29%0D%0A%7C%20extend%20AnnotationSummary%20%3D%20parse_json%28tostring%28Changes%5B%27properties.summary%27%5D%29%29%0D%0A%7C%20extend%20AnnotationReason%20%3D%20parse_json%28tostring%28Changes%5B%27properties.reason%27%5D%29%29%0D%0A%7C%20extend%20AnnotationImpactType%20%3D%20parse_json%28tostring%28Changes%5B%27properties.impactType%27%5D%29%29%0D%0A%7C%20extend%20AnnotationContext%20%3D%20parse_json%28tostring%28Changes%5B%27properties.context%27%5D%29%29%0D%0A%7C%20extend%20AnnotationCategory%20%3D%20parse_json%28tostring%28Changes%5B%27properties.category%27%5D%29%29%0D%0A%7C%20extend%20AvailabilityStatePreviousValue%20%3D%20tostring%28AvailabilityStateJson.previousValue%29%0D%0A%7C%20extend%20AvailabilityStateCurrentValue%20%3D%20tostring%28AvailabilityStateJson.newValue%29%0D%0A%7C%20extend%20AnnotationNamePreviousValue%20%3D%20tostring%28AnnotationNameJson.previousValue%29%0D%0A%7C%20extend%20AnnotationNameCurrentValue%20%3D%20tostring%28AnnotationNameJson.newValue%29%0D%0A%7C%20extend%20AnnotationSummaryCurrentValue%20%3D%20tostring%28AnnotationSummary.newValue%29%0D%0A%7C%20extend%20AnnotationReasonCurrentValue%20%3D%20tostring%28AnnotationReason.newValue%29%0D%0A%7C%20extend%20AnnotationImpactTypeCurrentValue%20%3D%20tostring%28AnnotationImpactType.newValue%29%0D%0A%7C%20extend%20AnnotationContextCurrentValue%20%3D%20tostring%28AnnotationContext.newValue%29%0D%0A%7C%20extend%20AnnotationCategoryCurrentValue%20%3D%20tostring%28AnnotationCategory.newValue%29%0D%0A%7C%20project%20id%20%3D%20VmId%2C%20timestamp%2C%20ChangeType%2C%20AvailabilityStateCurrentValue%2C%20AnnotationNameCurrentValue%2C%20AnnotationSummaryCurrentValue%2C%20AnnotationReasonCurrentValue%2C%20AnnotationImpactTypeCurrentValue%2C%20AnnotationContextCurrentValue%2C%20AnnotationCategoryCurrentValue%2C%20Changes%0D%0A%7C%20order%20by%20id%2C%20timestamp%20asc%0D%0A%7C%20project-rename%20%5B%27Virtual%20Machine%20ID%27%5D%20%3D%20id%2C%20UTCTimeStamp%20%3D%20timestamp%2C%20%5B%27Change%20Type%27%5D%20%3D%20ChangeType%2C%20%5B%27Availability%20State%27%5D%20%3D%20AvailabilityStateCurrentValue%2C%20%5B%27Summary%27%5D%20%3D%20AnnotationSummaryCurrentValue%2C%20%5B%27Reason%27%5D%20%3D%20AnnotationReasonCurrentValue%2C%20%5B%27Impact%20Type%27%5D%20%3D%20AnnotationImpactTypeCurrentValue%2C%20Category%20%3D%20AnnotationCategoryCurrentValue%2C%20Context%20%3D%20AnnotationContextCurrentValue" target="_blank">portal.azure.cn</a>

---


## Azure Container Registry


### List Container Registry vulnerability assessment results

Returns all vulnerabilities found on container images. Microsoft Defender for Containers has to be enabled in order to view these security findings.

```kusto
SecurityResources
| where type == 'microsoft.security/assessments'
| where properties.displayName contains 'Container registry images should have vulnerability findings resolved'
| summarize by assessmentKey=name //the ID of the assessment
| join kind=inner (
	securityresources
	| where type == 'microsoft.security/assessments/subassessments'
	| extend assessmentKey = extract('.*assessments/(.+?)/.*',1,  id)
) on assessmentKey
| project assessmentKey, subassessmentKey=name, id, parse_json(properties), resourceGroup, subscriptionId, tenantId
| extend description = properties.description,
	displayName = properties.displayName,
	resourceId = properties.resourceDetails.id,
	resourceSource = properties.resourceDetails.source,
	category = properties.category,
	severity = properties.status.severity,
	code = properties.status.code,
	timeGenerated = properties.timeGenerated,
	remediation = properties.remediation,
	impact = properties.impact,
	vulnId = properties.id,
	additionalData = properties.additionalData
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "SecurityResources | where type == 'microsoft.security/assessments' | where properties.displayName contains 'Container registry images should have vulnerability findings resolved' | summarize by assessmentKey=name //the ID of the assessment | join kind=inner ( securityresources | where type == 'microsoft.security/assessments/subassessments' | extend assessmentKey = extract('.*assessments/(.+?)/.*',1, id) ) on assessmentKey | project assessmentKey, subassessmentKey=name, id, parse_json(properties), resourceGroup, subscriptionId, tenantId | extend description = properties.description, displayName = properties.displayName, resourceId = properties.resourceDetails.id, resourceSource = properties.resourceDetails.source, category = properties.category, severity = properties.status.severity, code = properties.status.code, timeGenerated = properties.timeGenerated, remediation = properties.remediation, impact = properties.impact, vulnId = properties.id, additionalData = properties.additionalData"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "SecurityResources | where type == 'microsoft.security/assessments' | where properties.displayName contains 'Container registry images should have vulnerability findings resolved' | summarize by assessmentKey=name //the ID of the assessment | join kind=inner ( securityresources | where type == 'microsoft.security/assessments/subassessments' | extend assessmentKey = extract('.*assessments/(.+?)/.*',1, id) ) on assessmentKey | project assessmentKey, subassessmentKey=name, id, parse_json(properties), resourceGroup, subscriptionId, tenantId | extend description = properties.description, displayName = properties.displayName, resourceId = properties.resourceDetails.id, resourceSource = properties.resourceDetails.source, category = properties.category, severity = properties.status.severity, code = properties.status.code, timeGenerated = properties.timeGenerated, remediation = properties.remediation, impact = properties.impact, vulnId = properties.id, additionalData = properties.additionalData"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fassessments%27%0a%7c%20where%20properties.displayName%20contains%20%27Container%20registry%20images%20should%20have%20vulnerability%20findings%20resolved%27%0a%7c%20summarize%20by%20assessmentKey%3dname%20%2f%2fthe%20ID%20of%20the%20assessment%0a%7c%20join%20kind%3dinner%20(%0a%09securityresources%0a%09%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fassessments%2fsubassessments%27%0a%09%7c%20extend%20assessmentKey%20%3d%20extract(%27.*assessments%2f(.%2b%3f)%2f.*%27%2c1%2c%20%20id)%0a)%20on%20assessmentKey%0a%7c%20project%20assessmentKey%2c%20subassessmentKey%3dname%2c%20id%2c%20parse_json(properties)%2c%20resourceGroup%2c%20subscriptionId%2c%20tenantId%0a%7c%20extend%20description%20%3d%20properties.description%2c%0a%09displayName%20%3d%20properties.displayName%2c%0a%09resourceId%20%3d%20properties.resourceDetails.id%2c%0a%09resourceSource%20%3d%20properties.resourceDetails.source%2c%0a%09category%20%3d%20properties.category%2c%0a%09severity%20%3d%20properties.status.severity%2c%0a%09code%20%3d%20properties.status.code%2c%0a%09timeGenerated%20%3d%20properties.timeGenerated%2c%0a%09remediation%20%3d%20properties.remediation%2c%0a%09impact%20%3d%20properties.impact%2c%0a%09vulnId%20%3d%20properties.id%2c%0a%09additionalData%20%3d%20properties.additionalData" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fassessments%27%0a%7c%20where%20properties.displayName%20contains%20%27Container%20registry%20images%20should%20have%20vulnerability%20findings%20resolved%27%0a%7c%20summarize%20by%20assessmentKey%3dname%20%2f%2fthe%20ID%20of%20the%20assessment%0a%7c%20join%20kind%3dinner%20(%0a%09securityresources%0a%09%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fassessments%2fsubassessments%27%0a%09%7c%20extend%20assessmentKey%20%3d%20extract(%27.*assessments%2f(.%2b%3f)%2f.*%27%2c1%2c%20%20id)%0a)%20on%20assessmentKey%0a%7c%20project%20assessmentKey%2c%20subassessmentKey%3dname%2c%20id%2c%20parse_json(properties)%2c%20resourceGroup%2c%20subscriptionId%2c%20tenantId%0a%7c%20extend%20description%20%3d%20properties.description%2c%0a%09displayName%20%3d%20properties.displayName%2c%0a%09resourceId%20%3d%20properties.resourceDetails.id%2c%0a%09resourceSource%20%3d%20properties.resourceDetails.source%2c%0a%09category%20%3d%20properties.category%2c%0a%09severity%20%3d%20properties.status.severity%2c%0a%09code%20%3d%20properties.status.code%2c%0a%09timeGenerated%20%3d%20properties.timeGenerated%2c%0a%09remediation%20%3d%20properties.remediation%2c%0a%09impact%20%3d%20properties.impact%2c%0a%09vulnId%20%3d%20properties.id%2c%0a%09additionalData%20%3d%20properties.additionalData" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fassessments%27%0a%7c%20where%20properties.displayName%20contains%20%27Container%20registry%20images%20should%20have%20vulnerability%20findings%20resolved%27%0a%7c%20summarize%20by%20assessmentKey%3dname%20%2f%2fthe%20ID%20of%20the%20assessment%0a%7c%20join%20kind%3dinner%20(%0a%09securityresources%0a%09%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fassessments%2fsubassessments%27%0a%09%7c%20extend%20assessmentKey%20%3d%20extract(%27.*assessments%2f(.%2b%3f)%2f.*%27%2c1%2c%20%20id)%0a)%20on%20assessmentKey%0a%7c%20project%20assessmentKey%2c%20subassessmentKey%3dname%2c%20id%2c%20parse_json(properties)%2c%20resourceGroup%2c%20subscriptionId%2c%20tenantId%0a%7c%20extend%20description%20%3d%20properties.description%2c%0a%09displayName%20%3d%20properties.displayName%2c%0a%09resourceId%20%3d%20properties.resourceDetails.id%2c%0a%09resourceSource%20%3d%20properties.resourceDetails.source%2c%0a%09category%20%3d%20properties.category%2c%0a%09severity%20%3d%20properties.status.severity%2c%0a%09code%20%3d%20properties.status.code%2c%0a%09timeGenerated%20%3d%20properties.timeGenerated%2c%0a%09remediation%20%3d%20properties.remediation%2c%0a%09impact%20%3d%20properties.impact%2c%0a%09vulnId%20%3d%20properties.id%2c%0a%09additionalData%20%3d%20properties.additionalData" target="_blank">portal.azure.cn</a>

---


## Azure Cosmos DB


### List Azure Cosmos DB with specific write locations

The following query limits to Azure Cosmos DB resources, uses `mv-expand` to expand the property bag for **properties.writeLocations**, then project specific fields and limit the results further to **properties.writeLocations.locationName** values matching either 'East US' or 'West US'.

```kusto
Resources
| where type =~ 'microsoft.documentdb/databaseaccounts'
| project id, name, writeLocations = (properties.writeLocations)
| mv-expand writeLocations
| project id, name, writeLocation = tostring(writeLocations.locationName)
| where writeLocation in ('East US', 'West US')
| summarize by id, name
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type =~ 'microsoft.documentdb/databaseaccounts' | project id, name, writeLocations = (properties.writeLocations) | mv-expand writeLocations | project id, name, writeLocation = tostring(writeLocations.locationName) | where writeLocation in ('East US', 'West US') | summarize by id, name"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type =~ 'microsoft.documentdb/databaseaccounts' | project id, name, writeLocations = (properties.writeLocations) | mv-expand writeLocations | project id, name, writeLocation = tostring(writeLocations.locationName) | where writeLocation in ('East US', 'West US') | summarize by id, name"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.documentdb%2fdatabaseaccounts%27%0a%7c%20project%20id%2c%20name%2c%20writeLocations%20%3d%20(properties.writeLocations)%0a%7c%20mv-expand%20writeLocations%0a%7c%20project%20id%2c%20name%2c%20writeLocation%20%3d%20tostring(writeLocations.locationName)%0a%7c%20where%20writeLocation%20in%20(%27East%20US%27%2c%20%27West%20US%27)%0a%7c%20summarize%20by%20id%2c%20name" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.documentdb%2fdatabaseaccounts%27%0a%7c%20project%20id%2c%20name%2c%20writeLocations%20%3d%20(properties.writeLocations)%0a%7c%20mv-expand%20writeLocations%0a%7c%20project%20id%2c%20name%2c%20writeLocation%20%3d%20tostring(writeLocations.locationName)%0a%7c%20where%20writeLocation%20in%20(%27East%20US%27%2c%20%27West%20US%27)%0a%7c%20summarize%20by%20id%2c%20name" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.documentdb%2fdatabaseaccounts%27%0a%7c%20project%20id%2c%20name%2c%20writeLocations%20%3d%20(properties.writeLocations)%0a%7c%20mv-expand%20writeLocations%0a%7c%20project%20id%2c%20name%2c%20writeLocation%20%3d%20tostring(writeLocations.locationName)%0a%7c%20where%20writeLocation%20in%20(%27East%20US%27%2c%20%27West%20US%27)%0a%7c%20summarize%20by%20id%2c%20name" target="_blank">portal.azure.cn</a>

---


## Azure Key Vault


### Count key vault resources

This query uses `count` instead of `summarize` to count the number of records returned. Only key vaults are included in the count.

```kusto
Resources
| where type =~ 'microsoft.keyvault/vaults'
| count
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type =~ 'microsoft.keyvault/vaults' | count"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type =~ 'microsoft.keyvault/vaults' | count"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.keyvault%2fvaults%27%0a%7c%20count" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.keyvault%2fvaults%27%0a%7c%20count" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.keyvault%2fvaults%27%0a%7c%20count" target="_blank">portal.azure.cn</a>

---

### Key vaults with subscription name

The following query shows a complex use of `join` with **kind** as _leftouter_. The query limits the joined table to subscriptions resources and with `project` to include only the original field _subscriptionId_ and the _name_ field renamed to _SubName_. The field rename avoids `join` adding it as _name1_ since the field already exists in _resources_. The original table is filtered with `where` and the following `project` includes columns from both tables. The query result is all key vaults displaying type, the name of the key vault, and the name of the subscription it's in.

```kusto
Resources
| join kind=leftouter (ResourceContainers | where type=='microsoft.resources/subscriptions' | project SubName=name, subscriptionId) on subscriptionId
| where type == 'microsoft.keyvault/vaults'
| project type, name, SubName
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | join kind=leftouter (ResourceContainers | where type=='microsoft.resources/subscriptions' | project SubName=name, subscriptionId) on subscriptionId | where type == 'microsoft.keyvault/vaults' | project type, name, SubName"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | join kind=leftouter (ResourceContainers | where type=='microsoft.resources/subscriptions' | project SubName=name, subscriptionId) on subscriptionId | where type == 'microsoft.keyvault/vaults' | project type, name, SubName"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20join%20kind%3dleftouter%20(ResourceContainers%20%7c%20where%20type%3d%3d%27microsoft.resources%2fsubscriptions%27%20%7c%20project%20SubName%3dname%2c%20subscriptionId)%20on%20subscriptionId%0a%7c%20where%20type%20%3d%3d%20%27microsoft.keyvault%2fvaults%27%0a%7c%20project%20type%2c%20name%2c%20SubName" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20join%20kind%3dleftouter%20(ResourceContainers%20%7c%20where%20type%3d%3d%27microsoft.resources%2fsubscriptions%27%20%7c%20project%20SubName%3dname%2c%20subscriptionId)%20on%20subscriptionId%0a%7c%20where%20type%20%3d%3d%20%27microsoft.keyvault%2fvaults%27%0a%7c%20project%20type%2c%20name%2c%20SubName" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20join%20kind%3dleftouter%20(ResourceContainers%20%7c%20where%20type%3d%3d%27microsoft.resources%2fsubscriptions%27%20%7c%20project%20SubName%3dname%2c%20subscriptionId)%20on%20subscriptionId%0a%7c%20where%20type%20%3d%3d%20%27microsoft.keyvault%2fvaults%27%0a%7c%20project%20type%2c%20name%2c%20SubName" target="_blank">portal.azure.cn</a>

---


## Azure Monitor


### View recent Azure Monitor alerts

This sample query gets all Azure Monitor alerts that were fired in the last 12 hours and extracts
commonly used properties.

```kusto
alertsmanagementresources
| where properties.essentials.startDateTime > ago(12h)
| project
  alertId = id,
  name,
  monitorCondition = tostring(properties.essentials.monitorCondition),
  severity = tostring(properties.essentials.severity),
  monitorService = tostring(properties.essentials.monitorService),
  alertState = tostring(properties.essentials.alertState),
  targetResourceType = tostring(properties.essentials.targetResourceType),
  targetResource = tostring(properties.essentials.targetResource),
  subscriptionId,
  startDateTime = todatetime(properties.essentials.startDateTime),
  lastModifiedDateTime = todatetime(properties.essentials.lastModifiedDateTime),
  dimensions = properties.context.context.condition.allOf[0].dimensions, properties
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "alertsmanagementresources | where properties.essentials.startDateTime > ago(12h) | project   alertId = id,   name,   monitorCondition = tostring(properties.essentials.monitorCondition),   severity = tostring(properties.essentials.severity),   monitorService = tostring(properties.essentials.monitorService),   alertState = tostring(properties.essentials.alertState),   targetResourceType = tostring(properties.essentials.targetResourceType),   targetResource = tostring(properties.essentials.targetResource),   subscriptionId,   startDateTime = todatetime(properties.essentials.startDateTime),   lastModifiedDateTime = todatetime(properties.essentials.lastModifiedDateTime),   dimensions = properties.context.context.condition.allOf[0].dimensions, properties"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "alertsmanagementresources | where properties.essentials.startDateTime > ago(12h) | project   alertId = id,   name,   monitorCondition = tostring(properties.essentials.monitorCondition),   severity = tostring(properties.essentials.severity),   monitorService = tostring(properties.essentials.monitorService),   alertState = tostring(properties.essentials.alertState),   targetResourceType = tostring(properties.essentials.targetResourceType),   targetResource = tostring(properties.essentials.targetResource),   subscriptionId,   startDateTime = todatetime(properties.essentials.startDateTime),   lastModifiedDateTime = todatetime(properties.essentials.lastModifiedDateTime),   dimensions = properties.context.context.condition.allOf[0].dimensions, properties"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/alertsmanagementresources%20%7C%20where%20properties.essentials.startDateTime%20%3E%20ago%2812h%29%20%7C%20project%20%20%20alertId%20%3D%20id%2C%20%20%20name%2C%20%20%20monitorCondition%20%3D%20tostring%28properties.essentials.monitorCondition%29%2C%20%20%20severity%20%3D%20tostring%28properties.essentials.severity%29%2C%20%20%20monitorService%20%3D%20tostring%28properties.essentials.monitorService%29%2C%20%20%20alertState%20%3D%20tostring%28properties.essentials.alertState%29%2C%20%20%20targetResourceType%20%3D%20tostring%28properties.essentials.targetResourceType%29%2C%20%20%20targetResource%20%3D%20tostring%28properties.essentials.targetResource%29%2C%20%20%20subscriptionId%2C%20%20%20startDateTime%20%3D%20todatetime%28properties.essentials.startDateTime%29%2C%20%20%20lastModifiedDateTime%20%3D%20todatetime%28properties.essentials.lastModifiedDateTime%29%2C%20%20%20dimensions%20%3D%20properties.context.context.condition.allOf%5B0%5D.dimensions%2C%20properties" target="_blank">portal.Azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/alertsmanagementresources%20%7C%20where%20properties.essentials.startDateTime%20%3E%20ago%2812h%29%20%7C%20project%20%20%20alertId%20%3D%20id%2C%20%20%20name%2C%20%20%20monitorCondition%20%3D%20tostring%28properties.essentials.monitorCondition%29%2C%20%20%20severity%20%3D%20tostring%28properties.essentials.severity%29%2C%20%20%20monitorService%20%3D%20tostring%28properties.essentials.monitorService%29%2C%20%20%20alertState%20%3D%20tostring%28properties.essentials.alertState%29%2C%20%20%20targetResourceType%20%3D%20tostring%28properties.essentials.targetResourceType%29%2C%20%20%20targetResource%20%3D%20tostring%28properties.essentials.targetResource%29%2C%20%20%20subscriptionId%2C%20%20%20startDateTime%20%3D%20todatetime%28properties.essentials.startDateTime%29%2C%20%20%20lastModifiedDateTime%20%3D%20todatetime%28properties.essentials.lastModifiedDateTime%29%2C%20%20%20dimensions%20%3D%20properties.context.context.condition.allOf%5B0%5D.dimensions%2C%20properties" target="_blank">portal.Azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/alertsmanagementresources%20%7C%20where%20properties.essentials.startDateTime%20%3E%20ago%2812h%29%20%7C%20project%20%20%20alertId%20%3D%20id%2C%20%20%20name%2C%20%20%20monitorCondition%20%3D%20tostring%28properties.essentials.monitorCondition%29%2C%20%20%20severity%20%3D%20tostring%28properties.essentials.severity%29%2C%20%20%20monitorService%20%3D%20tostring%28properties.essentials.monitorService%29%2C%20%20%20alertState%20%3D%20tostring%28properties.essentials.alertState%29%2C%20%20%20targetResourceType%20%3D%20tostring%28properties.essentials.targetResourceType%29%2C%20%20%20targetResource%20%3D%20tostring%28properties.essentials.targetResource%29%2C%20%20%20subscriptionId%2C%20%20%20startDateTime%20%3D%20todatetime%28properties.essentials.startDateTime%29%2C%20%20%20lastModifiedDateTime%20%3D%20todatetime%28properties.essentials.lastModifiedDateTime%29%2C%20%20%20dimensions%20%3D%20properties.context.context.condition.allOf%5B0%5D.dimensions%2C%20properties" target="_blank">portal.Azure.cn</a>

---

### View recent Azure Monitor alerts enriched with resource tags

This example query gets all Azure Monitor alerts that were fired in the last 12 hours, extracts commonly used properties, and adds the tags of the target resource.

```kusto
alertsmanagementresources
| where properties.essentials.startDateTime > ago(12h)
| where tostring(properties.essentials.monitorService) <> "ActivityLog Administrative"
| project // converting extracted fields to string / datetime to allow grouping
  alertId = id,
  name,
  monitorCondition = tostring(properties.essentials.monitorCondition),
  severity = tostring(properties.essentials.severity),
  monitorService = tostring(properties.essentials.monitorService),
  alertState = tostring(properties.essentials.alertState),
  targetResourceType = tostring(properties.essentials.targetResourceType),
  targetResource = tostring(properties.essentials.targetResource),
  subscriptionId,
  startDateTime = todatetime(properties.essentials.startDateTime),
  lastModifiedDateTime = todatetime(properties.essentials.lastModifiedDateTime),
  dimensions = properties.context.context.condition.allOf[0].dimensions, // usefor metric alerts and log search alerts
  properties
| extend targetResource = tolower(targetResource)
| join kind=leftouter
  ( resources | project targetResource = tolower(id), targetResourceTags = tags) on targetResource
| project-away targetResource1
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "alertsmanagementresources | where properties.essentials.startDateTime > ago(12h) | where tostring(properties.essentials.monitorService) <> "ActivityLog Administrative" | project // converting extracted fields to string / datetime to allow grouping   alertId = id,   name,   monitorCondition = tostring(properties.essentials.monitorCondition),   severity = tostring(properties.essentials.severity),   monitorService = tostring(properties.essentials.monitorService),   alertState = tostring(properties.essentials.alertState),   targetResourceType = tostring(properties.essentials.targetResourceType),   targetResource = tostring(properties.essentials.targetResource),   subscriptionId,   startDateTime = todatetime(properties.essentials.startDateTime),   lastModifiedDateTime = todatetime(properties.essentials.lastModifiedDateTime),   dimensions = properties.context.context.condition.allOf[0].dimensions, // usefor metric alerts and log search alerts   properties | extend targetResource = tolower(targetResource) | join kind=leftouter   ( resources | project targetResource = tolower(id), targetResourceTags = tags) on targetResource | project-away targetResource1"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "alertsmanagementresources | where properties.essentials.startDateTime > ago(12h) | where tostring(properties.essentials.monitorService) <> "ActivityLog Administrative" | project // converting extracted fields to string / datetime to allow grouping   alertId = id,   name,   monitorCondition = tostring(properties.essentials.monitorCondition),   severity = tostring(properties.essentials.severity),   monitorService = tostring(properties.essentials.monitorService),   alertState = tostring(properties.essentials.alertState),   targetResourceType = tostring(properties.essentials.targetResourceType),   targetResource = tostring(properties.essentials.targetResource),   subscriptionId,   startDateTime = todatetime(properties.essentials.startDateTime),   lastModifiedDateTime = todatetime(properties.essentials.lastModifiedDateTime),   dimensions = properties.context.context.condition.allOf[0].dimensions, // usefor metric alerts and log search alerts   properties | extend targetResource = tolower(targetResource) | join kind=leftouter   ( resources | project targetResource = tolower(id), targetResourceTags = tags) on targetResource | project-away targetResource1"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/alertsmanagementresources%20%7C%20where%20properties.essentials.startDateTime%20%3E%20ago%2812h%29%20%7C%20where%20tostring%28properties.essentials.monitorService%29%20%3C%3E%20%22ActivityLog%20Administrative%22%20%7C%20project%20%2F%2F%20converting%20extracted%20fields%20to%20string%20%2F%20datetime%20to%20allow%20grouping%20%20%20alertId%20%3D%20id%2C%20%20%20name%2C%20%20%20monitorCondition%20%3D%20tostring%28properties.essentials.monitorCondition%29%2C%20%20%20severity%20%3D%20tostring%28properties.essentials.severity%29%2C%20%20%20monitorService%20%3D%20tostring%28properties.essentials.monitorService%29%2C%20%20%20alertState%20%3D%20tostring%28properties.essentials.alertState%29%2C%20%20%20targetResourceType%20%3D%20tostring%28properties.essentials.targetResourceType%29%2C%20%20%20targetResource%20%3D%20tostring%28properties.essentials.targetResource%29%2C%20%20%20subscriptionId%2C%20%20%20startDateTime%20%3D%20todatetime%28properties.essentials.startDateTime%29%2C%20%20%20lastModifiedDateTime%20%3D%20todatetime%28properties.essentials.lastModifiedDateTime%29%2C%20%20%20dimensions%20%3D%20properties.context.context.condition.allOf%5B0%5D.dimensions%2C%20%2F%2F%20usefor%20metric%20alerts%20and%20log%20search%20alerts%20%20%20properties%20%7C%20extend%20targetResource%20%3D%20tolower%28targetResource%29%20%7C%20join%20kind%3Dleftouter%20%20%20%28%20resources%20%7C%20project%20targetResource%20%3D%20tolower%28id%29%2C%20targetResourceTags%20%3D%20tags%29%20on%20targetResource%20%7C%20project-away%20targetResource1" target="_blank">portal.Azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/alertsmanagementresources%20%7C%20where%20properties.essentials.startDateTime%20%3E%20ago%2812h%29%20%7C%20where%20tostring%28properties.essentials.monitorService%29%20%3C%3E%20%22ActivityLog%20Administrative%22%20%7C%20project%20%2F%2F%20converting%20extracted%20fields%20to%20string%20%2F%20datetime%20to%20allow%20grouping%20%20%20alertId%20%3D%20id%2C%20%20%20name%2C%20%20%20monitorCondition%20%3D%20tostring%28properties.essentials.monitorCondition%29%2C%20%20%20severity%20%3D%20tostring%28properties.essentials.severity%29%2C%20%20%20monitorService%20%3D%20tostring%28properties.essentials.monitorService%29%2C%20%20%20alertState%20%3D%20tostring%28properties.essentials.alertState%29%2C%20%20%20targetResourceType%20%3D%20tostring%28properties.essentials.targetResourceType%29%2C%20%20%20targetResource%20%3D%20tostring%28properties.essentials.targetResource%29%2C%20%20%20subscriptionId%2C%20%20%20startDateTime%20%3D%20todatetime%28properties.essentials.startDateTime%29%2C%20%20%20lastModifiedDateTime%20%3D%20todatetime%28properties.essentials.lastModifiedDateTime%29%2C%20%20%20dimensions%20%3D%20properties.context.context.condition.allOf%5B0%5D.dimensions%2C%20%2F%2F%20usefor%20metric%20alerts%20and%20log%20search%20alerts%20%20%20properties%20%7C%20extend%20targetResource%20%3D%20tolower%28targetResource%29%20%7C%20join%20kind%3Dleftouter%20%20%20%28%20resources%20%7C%20project%20targetResource%20%3D%20tolower%28id%29%2C%20targetResourceTags%20%3D%20tags%29%20on%20targetResource%20%7C%20project-away%20targetResource1" target="_blank">portal.Azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/alertsmanagementresources%20%7C%20where%20properties.essentials.startDateTime%20%3E%20ago%2812h%29%20%7C%20where%20tostring%28properties.essentials.monitorService%29%20%3C%3E%20%22ActivityLog%20Administrative%22%20%7C%20project%20%2F%2F%20converting%20extracted%20fields%20to%20string%20%2F%20datetime%20to%20allow%20grouping%20%20%20alertId%20%3D%20id%2C%20%20%20name%2C%20%20%20monitorCondition%20%3D%20tostring%28properties.essentials.monitorCondition%29%2C%20%20%20severity%20%3D%20tostring%28properties.essentials.severity%29%2C%20%20%20monitorService%20%3D%20tostring%28properties.essentials.monitorService%29%2C%20%20%20alertState%20%3D%20tostring%28properties.essentials.alertState%29%2C%20%20%20targetResourceType%20%3D%20tostring%28properties.essentials.targetResourceType%29%2C%20%20%20targetResource%20%3D%20tostring%28properties.essentials.targetResource%29%2C%20%20%20subscriptionId%2C%20%20%20startDateTime%20%3D%20todatetime%28properties.essentials.startDateTime%29%2C%20%20%20lastModifiedDateTime%20%3D%20todatetime%28properties.essentials.lastModifiedDateTime%29%2C%20%20%20dimensions%20%3D%20properties.context.context.condition.allOf%5B0%5D.dimensions%2C%20%2F%2F%20usefor%20metric%20alerts%20and%20log%20search%20alerts%20%20%20properties%20%7C%20extend%20targetResource%20%3D%20tolower%28targetResource%29%20%7C%20join%20kind%3Dleftouter%20%20%20%28%20resources%20%7C%20project%20targetResource%20%3D%20tolower%28id%29%2C%20targetResourceTags%20%3D%20tags%29%20on%20targetResource%20%7C%20project-away%20targetResource1" target="_blank">portal.Azure.cn</a>

---

### List all Azure Arc-enabled Kubernetes clusters with the Azure Monitor extension

Returns the connected cluster ID of each Azure Arc-enabled Kubernetes cluster that has the Azure Monitor extension installed.

```kusto
KubernetesConfigurationResources
| where type == 'microsoft.kubernetesconfiguration/extensions'
| where properties.ExtensionType  == 'microsoft.azuremonitor.containers'
| parse id with connectedClusterId '/providers/Microsoft.KubernetesConfiguration/Extensions' *
| project connectedClusterId
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "KubernetesConfigurationResources | where type == 'microsoft.kubernetesconfiguration/extensions' | where properties.ExtensionType == 'microsoft.azuremonitor.containers' | parse id with connectedClusterId '/providers/Microsoft.KubernetesConfiguration/Extensions' * | project connectedClusterId"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "KubernetesConfigurationResources | where type == 'microsoft.kubernetesconfiguration/extensions' | where properties.ExtensionType == 'microsoft.azuremonitor.containers' | parse id with connectedClusterId '/providers/Microsoft.KubernetesConfiguration/Extensions' * | project connectedClusterId"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/KubernetesConfigurationResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.kubernetesconfiguration%2fextensions%27%0a%7c%20where%20properties.ExtensionType%20%20%3d%3d%20%27microsoft.azuremonitor.containers%27%0a%7c%20parse%20id%20with%20connectedClusterId%20%27%2fproviders%2fMicrosoft.KubernetesConfiguration%2fExtensions%27%20*%0a%7c%20project%20connectedClusterId" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/KubernetesConfigurationResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.kubernetesconfiguration%2fextensions%27%0a%7c%20where%20properties.ExtensionType%20%20%3d%3d%20%27microsoft.azuremonitor.containers%27%0a%7c%20parse%20id%20with%20connectedClusterId%20%27%2fproviders%2fMicrosoft.KubernetesConfiguration%2fExtensions%27%20*%0a%7c%20project%20connectedClusterId" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/KubernetesConfigurationResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.kubernetesconfiguration%2fextensions%27%0a%7c%20where%20properties.ExtensionType%20%20%3d%3d%20%27microsoft.azuremonitor.containers%27%0a%7c%20parse%20id%20with%20connectedClusterId%20%27%2fproviders%2fMicrosoft.KubernetesConfiguration%2fExtensions%27%20*%0a%7c%20project%20connectedClusterId" target="_blank">portal.azure.cn</a>

---

### List all Azure Arc-enabled Kubernetes clusters without the Azure Monitor extension

Returns the connected cluster ID of each Azure Arc-enabled Kubernetes cluster that's missing the Azure Monitor extension.

```kusto
Resources
| where type =~ 'Microsoft.Kubernetes/connectedClusters' | extend connectedClusterId = tolower(id) | project connectedClusterId
| join kind = leftouter
	(KubernetesConfigurationResources
	| where type == 'microsoft.kubernetesconfiguration/extensions'
	| where properties.ExtensionType  == 'microsoft.azuremonitor.containers'
	| parse tolower(id) with connectedClusterId '/providers/microsoft.kubernetesconfiguration/extensions' *
	| project connectedClusterId
)  on connectedClusterId
| where connectedClusterId1 == ''
| project connectedClusterId
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type =~ 'Microsoft.Kubernetes/connectedClusters' | extend connectedClusterId = tolower(id) | project connectedClusterId | join kind = leftouter (KubernetesConfigurationResources | where type == 'microsoft.kubernetesconfiguration/extensions' | where properties.ExtensionType == 'microsoft.azuremonitor.containers' | parse tolower(id) with connectedClusterId '/providers/microsoft.kubernetesconfiguration/extensions' * | project connectedClusterId ) on connectedClusterId | where connectedClusterId1 == '' | project connectedClusterId"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type =~ 'Microsoft.Kubernetes/connectedClusters' | extend connectedClusterId = tolower(id) | project connectedClusterId | join kind = leftouter (KubernetesConfigurationResources | where type == 'microsoft.kubernetesconfiguration/extensions' | where properties.ExtensionType == 'microsoft.azuremonitor.containers' | parse tolower(id) with connectedClusterId '/providers/microsoft.kubernetesconfiguration/extensions' * | project connectedClusterId ) on connectedClusterId | where connectedClusterId1 == '' | project connectedClusterId"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.Kubernetes%2fconnectedClusters%27%20%7c%20extend%20connectedClusterId%20%3d%20tolower(id)%20%7c%20project%20connectedClusterId%20%0a%7c%20join%20kind%20%3d%20leftouter%0a%09(KubernetesConfigurationResources%0a%09%7c%20where%20type%20%3d%3d%20%27microsoft.kubernetesconfiguration%2fextensions%27%0a%09%7c%20where%20properties.ExtensionType%20%20%3d%3d%20%27microsoft.azuremonitor.containers%27%0a%09%7c%20parse%20tolower(id)%20with%20connectedClusterId%20%27%2fproviders%2fmicrosoft.kubernetesconfiguration%2fextensions%27%20*%0a%09%7c%20project%20connectedClusterId%0a)%20%20on%20connectedClusterId%0a%7c%20where%20connectedClusterId1%20%3d%3d%20%27%27%0a%7c%20project%20connectedClusterId" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.Kubernetes%2fconnectedClusters%27%20%7c%20extend%20connectedClusterId%20%3d%20tolower(id)%20%7c%20project%20connectedClusterId%20%0a%7c%20join%20kind%20%3d%20leftouter%0a%09(KubernetesConfigurationResources%0a%09%7c%20where%20type%20%3d%3d%20%27microsoft.kubernetesconfiguration%2fextensions%27%0a%09%7c%20where%20properties.ExtensionType%20%20%3d%3d%20%27microsoft.azuremonitor.containers%27%0a%09%7c%20parse%20tolower(id)%20with%20connectedClusterId%20%27%2fproviders%2fmicrosoft.kubernetesconfiguration%2fextensions%27%20*%0a%09%7c%20project%20connectedClusterId%0a)%20%20on%20connectedClusterId%0a%7c%20where%20connectedClusterId1%20%3d%3d%20%27%27%0a%7c%20project%20connectedClusterId" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.Kubernetes%2fconnectedClusters%27%20%7c%20extend%20connectedClusterId%20%3d%20tolower(id)%20%7c%20project%20connectedClusterId%20%0a%7c%20join%20kind%20%3d%20leftouter%0a%09(KubernetesConfigurationResources%0a%09%7c%20where%20type%20%3d%3d%20%27microsoft.kubernetesconfiguration%2fextensions%27%0a%09%7c%20where%20properties.ExtensionType%20%20%3d%3d%20%27microsoft.azuremonitor.containers%27%0a%09%7c%20parse%20tolower(id)%20with%20connectedClusterId%20%27%2fproviders%2fmicrosoft.kubernetesconfiguration%2fextensions%27%20*%0a%09%7c%20project%20connectedClusterId%0a)%20%20on%20connectedClusterId%0a%7c%20where%20connectedClusterId1%20%3d%3d%20%27%27%0a%7c%20project%20connectedClusterId" target="_blank">portal.azure.cn</a>

---

### Returns all Azure Monitor alerts in a subscription in the last day

```json
{
  "subscriptions": [
    <subscriptionId>
  ],
  "query": "alertsmanagementresources | where properties.essentials.lastModifiedDateTime > ago(1d) | project alertInstanceId = id, parentRuleId = tolower(tostring(properties['essentials']['alertRule'])), sourceId = properties['essentials']['sourceCreatedId'], alertName = name, severity = properties.essentials.severity, status = properties.essentials.monitorCondition, state = properties.essentials.alertState, affectedResource = properties.essentials.targetResourceName, monitorService = properties.essentials.monitorService, signalType = properties.essentials.signalType, firedTime = properties['essentials']['startDateTime'], lastModifiedDate = properties.essentials.lastModifiedDateTime, lastModifiedBy = properties.essentials.lastModifiedUserName"
}
```



### Count Azure Monitor data collection rules by subscription and resource group

This query groups Azure Monitor data collection rules by subscription and resource group.

```kusto
resources
| where type == 'microsoft.insights/datacollectionrules'
| summarize dcrCount = count() by subscriptionId, resourceGroup, location
| sort by dcrCount desc
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "resources | where type == 'microsoft.insights/datacollectionrules' | summarize dcrCount = count() by subscriptionId, resourceGroup, location | sort by dcrCount desc"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "resources | where type == 'microsoft.insights/datacollectionrules' | summarize dcrCount = count() by subscriptionId, resourceGroup, location | sort by dcrCount desc"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/resources%0D%0A%7C%20where%20type%20%3D%3D%20%27microsoft.insights%2Fdatacollectionrules%27%0D%0A%7C%20summarize%20dcrCount%20%3D%20count%28%29%20by%20subscriptionId%2C%20resourceGroup%2C%20location%0D%0A%7C%20sort%20by%20dcrCount%20desc" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/resources%0D%0A%7C%20where%20type%20%3D%3D%20%27microsoft.insights%2Fdatacollectionrules%27%0D%0A%7C%20summarize%20dcrCount%20%3D%20count%28%29%20by%20subscriptionId%2C%20resourceGroup%2C%20location%0D%0A%7C%20sort%20by%20dcrCount%20desc" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/resources%0D%0A%7C%20where%20type%20%3D%3D%20%27microsoft.insights%2Fdatacollectionrules%27%0D%0A%7C%20summarize%20dcrCount%20%3D%20count%28%29%20by%20subscriptionId%2C%20resourceGroup%2C%20location%0D%0A%7C%20sort%20by%20dcrCount%20desc" target="_blank">portal.azure.cn</a>

---

### Count Azure Monitor data collection rules by location

This query groups Azure Monitor data collection rules by location.

```kusto
resources
| where type == 'microsoft.insights/datacollectionrules'
| summarize dcrCount=count() by location
| sort by dcrCount desc
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "resources | where type == 'microsoft.insights/datacollectionrules' | summarize dcrCount=count() by location | sort by dcrCount desc"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "resources | where type == 'microsoft.insights/datacollectionrules' | summarize dcrCount=count() by location | sort by dcrCount desc"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/resources%0D%0A%7C%20where%20type%20%3D%3D%20%27microsoft.insights%2Fdatacollectionrules%27%0D%0A%7C%20summarize%20dcrCount%3Dcount%28%29%20by%20location%0D%0A%7C%20sort%20by%20dcrCount%20desc" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/resources%0D%0A%7C%20where%20type%20%3D%3D%20%27microsoft.insights%2Fdatacollectionrules%27%0D%0A%7C%20summarize%20dcrCount%3Dcount%28%29%20by%20location%0D%0A%7C%20sort%20by%20dcrCount%20desc" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/resources%0D%0A%7C%20where%20type%20%3D%3D%20%27microsoft.insights%2Fdatacollectionrules%27%0D%0A%7C%20summarize%20dcrCount%3Dcount%28%29%20by%20location%0D%0A%7C%20sort%20by%20dcrCount%20desc" target="_blank">portal.azure.cn</a>

---

### List Azure Monitor data collection rules with Log Analytics workspace as destination

Get the list of Log Analytics workspaces, and for each of the workspaces, list data collection rules that specify the workspace as one of the destinations.

```kusto
resources
| where type == 'microsoft.insights/datacollectionrules'
| extend destinations = properties['destinations']
| extend logAnalyticsWorkspaces = destinations['logAnalytics']
| where isnotnull(logAnalyticsWorkspaces)
| mv-expand logAnalyticsWorkspace = logAnalyticsWorkspaces
| extend logAnalyticsWorkspaceResourceId = tolower(tostring(logAnalyticsWorkspace['workspaceResourceId']))
| summarize dcrList = make_list(id), dcrCount = count() by logAnalyticsWorkspaceResourceId
| sort by dcrCount desc
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "resources | where type == 'microsoft.insights/datacollectionrules' | extend destinations = properties['destinations'] | extend logAnalyticsWorkspaces = destinations['logAnalytics'] | where isnotnull(logAnalyticsWorkspaces) | mv-expand logAnalyticsWorkspace = logAnalyticsWorkspaces | extend logAnalyticsWorkspaceResourceId = tolower(tostring(logAnalyticsWorkspace['workspaceResourceId'])) | summarize dcrList = make_list(id), dcrCount = count() by logAnalyticsWorkspaceResourceId | sort by dcrCount desc"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "resources | where type == 'microsoft.insights/datacollectionrules' | extend destinations = properties['destinations'] | extend logAnalyticsWorkspaces = destinations['logAnalytics'] | where isnotnull(logAnalyticsWorkspaces) | mv-expand logAnalyticsWorkspace = logAnalyticsWorkspaces | extend logAnalyticsWorkspaceResourceId = tolower(tostring(logAnalyticsWorkspace['workspaceResourceId'])) | summarize dcrList = make_list(id), dcrCount = count() by logAnalyticsWorkspaceResourceId | sort by dcrCount desc"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/resources%0D%0A%7C%20where%20type%20%3D%3D%20%27microsoft.insights%2Fdatacollectionrules%27%0D%0A%7C%20extend%20destinations%20%3D%20properties%5B%27destinations%27%5D%0D%0A%7C%20extend%20logAnalyticsWorkspaces%20%3D%20destinations%5B%27logAnalytics%27%5D%0D%0A%7C%20where%20isnotnull%28logAnalyticsWorkspaces%29%0D%0A%7C%20mv-expand%20logAnalyticsWorkspace%20%3D%20logAnalyticsWorkspaces%0D%0A%7C%20extend%20logAnalyticsWorkspaceResourceId%20%3D%20tolower%28tostring%28logAnalyticsWorkspace%5B%27workspaceResourceId%27%5D%29%29%0D%0A%7C%20summarize%20dcrList%20%3D%20make_list%28id%29%2C%20dcrCount%20%3D%20count%28%29%20by%20logAnalyticsWorkspaceResourceId%0D%0A%7C%20sort%20by%20dcrCount%20desc" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/resources%0D%0A%7C%20where%20type%20%3D%3D%20%27microsoft.insights%2Fdatacollectionrules%27%0D%0A%7C%20extend%20destinations%20%3D%20properties%5B%27destinations%27%5D%0D%0A%7C%20extend%20logAnalyticsWorkspaces%20%3D%20destinations%5B%27logAnalytics%27%5D%0D%0A%7C%20where%20isnotnull%28logAnalyticsWorkspaces%29%0D%0A%7C%20mv-expand%20logAnalyticsWorkspace%20%3D%20logAnalyticsWorkspaces%0D%0A%7C%20extend%20logAnalyticsWorkspaceResourceId%20%3D%20tolower%28tostring%28logAnalyticsWorkspace%5B%27workspaceResourceId%27%5D%29%29%0D%0A%7C%20summarize%20dcrList%20%3D%20make_list%28id%29%2C%20dcrCount%20%3D%20count%28%29%20by%20logAnalyticsWorkspaceResourceId%0D%0A%7C%20sort%20by%20dcrCount%20desc" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/resources%0D%0A%7C%20where%20type%20%3D%3D%20%27microsoft.insights%2Fdatacollectionrules%27%0D%0A%7C%20extend%20destinations%20%3D%20properties%5B%27destinations%27%5D%0D%0A%7C%20extend%20logAnalyticsWorkspaces%20%3D%20destinations%5B%27logAnalytics%27%5D%0D%0A%7C%20where%20isnotnull%28logAnalyticsWorkspaces%29%0D%0A%7C%20mv-expand%20logAnalyticsWorkspace%20%3D%20logAnalyticsWorkspaces%0D%0A%7C%20extend%20logAnalyticsWorkspaceResourceId%20%3D%20tolower%28tostring%28logAnalyticsWorkspace%5B%27workspaceResourceId%27%5D%29%29%0D%0A%7C%20summarize%20dcrList%20%3D%20make_list%28id%29%2C%20dcrCount%20%3D%20count%28%29%20by%20logAnalyticsWorkspaceResourceId%0D%0A%7C%20sort%20by%20dcrCount%20desc" target="_blank">portal.azure.cn</a>

---

### List data collection rules that use Azure Monitor Metrics as one of its destinations

This query lists data collection rules that use Azure Monitor Metrics as one of its destinations.

```kusto
resources
| where type == 'microsoft.insights/datacollectionrules'
| extend destinations = properties['destinations']
| extend azureMonitorMetrics = destinations['azureMonitorMetrics']
| where isnotnull(azureMonitorMetrics)
| project-away destinations, azureMonitorMetrics
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "resources | where type == 'microsoft.insights/datacollectionrules' | extend destinations = properties['destinations'] | extend azureMonitorMetrics = destinations['azureMonitorMetrics'] | where isnotnull(azureMonitorMetrics) | project-away destinations, azureMonitorMetrics"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "resources | where type == 'microsoft.insights/datacollectionrules' | extend destinations = properties['destinations'] | extend azureMonitorMetrics = destinations['azureMonitorMetrics'] | where isnotnull(azureMonitorMetrics) | project-away destinations, azureMonitorMetrics"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/resources%0D%0A%7C%20where%20type%20%3D%3D%20%27microsoft.insights%2Fdatacollectionrules%27%0D%0A%7C%20extend%20destinations%20%3D%20properties%5B%27destinations%27%5D%0D%0A%7C%20extend%20azureMonitorMetrics%20%3D%20destinations%5B%27azureMonitorMetrics%27%5D%0D%0A%7C%20where%20isnotnull%28azureMonitorMetrics%29%0D%0A%7C%20project-away%20destinations%2C%20azureMonitorMetrics" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/resources%0D%0A%7C%20where%20type%20%3D%3D%20%27microsoft.insights%2Fdatacollectionrules%27%0D%0A%7C%20extend%20destinations%20%3D%20properties%5B%27destinations%27%5D%0D%0A%7C%20extend%20azureMonitorMetrics%20%3D%20destinations%5B%27azureMonitorMetrics%27%5D%0D%0A%7C%20where%20isnotnull%28azureMonitorMetrics%29%0D%0A%7C%20project-away%20destinations%2C%20azureMonitorMetrics" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/resources%0D%0A%7C%20where%20type%20%3D%3D%20%27microsoft.insights%2Fdatacollectionrules%27%0D%0A%7C%20extend%20destinations%20%3D%20properties%5B%27destinations%27%5D%0D%0A%7C%20extend%20azureMonitorMetrics%20%3D%20destinations%5B%27azureMonitorMetrics%27%5D%0D%0A%7C%20where%20isnotnull%28azureMonitorMetrics%29%0D%0A%7C%20project-away%20destinations%2C%20azureMonitorMetrics" target="_blank">portal.azure.cn</a>

---



### List VMs with data collection rule associations

This query lists virtual machines with data collection rule associations. For each virtual machine, lists data collection rules associated with it.

```kusto
insightsresources
| where type == 'microsoft.insights/datacollectionruleassociations'
| where id contains 'microsoft.compute/virtualmachines/'
| project id = trim_start('/', tolower(id)), properties
| extend idComponents = split(id, '/')
| extend subscription = tolower(tostring(idComponents[1])), resourceGroup = tolower(tostring(idComponents[3])), vmName = tolower(tostring(idComponents[7]))
| extend dcrId = properties['dataCollectionRuleId']
| where isnotnull(dcrId)
| extend dcrId = tostring(dcrId)
| summarize dcrList = make_list(dcrId), dcrCount = count() by subscription, resourceGroup, vmName
| sort by dcrCount desc
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "insightsresources | where type == 'microsoft.insights/datacollectionruleassociations' | where id contains 'microsoft.compute/virtualmachines/' | project id = trim_start('/', tolower(id)), properties | extend idComponents = split(id, '/') | extend subscription = tolower(tostring(idComponents[1])), resourceGroup = tolower(tostring(idComponents[3])), vmName = tolower(tostring(idComponents[7])) | extend dcrId = properties['dataCollectionRuleId'] | where isnotnull(dcrId) | extend dcrId = tostring(dcrId) | summarize dcrList = make_list(dcrId), dcrCount = count() by subscription, resourceGroup, vmName | sort by dcrCount desc"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "insightsresources | where type == 'microsoft.insights/datacollectionruleassociations' | where id contains 'microsoft.compute/virtualmachines/' | project id = trim_start('/', tolower(id)), properties | extend idComponents = split(id, '/') | extend subscription = tolower(tostring(idComponents[1])), resourceGroup = tolower(tostring(idComponents[3])), vmName = tolower(tostring(idComponents[7])) | extend dcrId = properties['dataCollectionRuleId'] | where isnotnull(dcrId) | extend dcrId = tostring(dcrId) | summarize dcrList = make_list(dcrId), dcrCount = count() by subscription, resourceGroup, vmName | sort by dcrCount desc"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/insightsresources%0D%0A%7C%20where%20type%20%3D%3D%20%27microsoft.insights%2Fdatacollectionruleassociations%27%0D%0A%7C%20where%20id%20contains%20%27microsoft.compute%2Fvirtualmachines%2F%27%0D%0A%7C%20project%20id%20%3D%20trim_start%28%27%2F%27%2C%20tolower%28id%29%29%2C%20properties%0D%0A%7C%20extend%20idComponents%20%3D%20split%28id%2C%20%27%2F%27%29%0D%0A%7C%20extend%20subscription%20%3D%20tolower%28tostring%28idComponents%5B1%5D%29%29%2C%20resourceGroup%20%3D%20tolower%28tostring%28idComponents%5B3%5D%29%29%2C%20vmName%20%3D%20tolower%28tostring%28idComponents%5B7%5D%29%29%0D%0A%7C%20extend%20dcrId%20%3D%20properties%5B%27dataCollectionRuleId%27%5D%0D%0A%7C%20where%20isnotnull%28dcrId%29%0D%0A%7C%20extend%20dcrId%20%3D%20tostring%28dcrId%29%0D%0A%7C%20summarize%20dcrList%20%3D%20make_list%28dcrId%29%2C%20dcrCount%20%3D%20count%28%29%20by%20subscription%2C%20resourceGroup%2C%20vmName%0D%0A%7C%20sort%20by%20dcrCount%20desc" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/insightsresources%0D%0A%7C%20where%20type%20%3D%3D%20%27microsoft.insights%2Fdatacollectionruleassociations%27%0D%0A%7C%20where%20id%20contains%20%27microsoft.compute%2Fvirtualmachines%2F%27%0D%0A%7C%20project%20id%20%3D%20trim_start%28%27%2F%27%2C%20tolower%28id%29%29%2C%20properties%0D%0A%7C%20extend%20idComponents%20%3D%20split%28id%2C%20%27%2F%27%29%0D%0A%7C%20extend%20subscription%20%3D%20tolower%28tostring%28idComponents%5B1%5D%29%29%2C%20resourceGroup%20%3D%20tolower%28tostring%28idComponents%5B3%5D%29%29%2C%20vmName%20%3D%20tolower%28tostring%28idComponents%5B7%5D%29%29%0D%0A%7C%20extend%20dcrId%20%3D%20properties%5B%27dataCollectionRuleId%27%5D%0D%0A%7C%20where%20isnotnull%28dcrId%29%0D%0A%7C%20extend%20dcrId%20%3D%20tostring%28dcrId%29%0D%0A%7C%20summarize%20dcrList%20%3D%20make_list%28dcrId%29%2C%20dcrCount%20%3D%20count%28%29%20by%20subscription%2C%20resourceGroup%2C%20vmName%0D%0A%7C%20sort%20by%20dcrCount%20desc" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/insightsresources%0D%0A%7C%20where%20type%20%3D%3D%20%27microsoft.insights%2Fdatacollectionruleassociations%27%0D%0A%7C%20where%20id%20contains%20%27microsoft.compute%2Fvirtualmachines%2F%27%0D%0A%7C%20project%20id%20%3D%20trim_start%28%27%2F%27%2C%20tolower%28id%29%29%2C%20properties%0D%0A%7C%20extend%20idComponents%20%3D%20split%28id%2C%20%27%2F%27%29%0D%0A%7C%20extend%20subscription%20%3D%20tolower%28tostring%28idComponents%5B1%5D%29%29%2C%20resourceGroup%20%3D%20tolower%28tostring%28idComponents%5B3%5D%29%29%2C%20vmName%20%3D%20tolower%28tostring%28idComponents%5B7%5D%29%29%0D%0A%7C%20extend%20dcrId%20%3D%20properties%5B%27dataCollectionRuleId%27%5D%0D%0A%7C%20where%20isnotnull%28dcrId%29%0D%0A%7C%20extend%20dcrId%20%3D%20tostring%28dcrId%29%0D%0A%7C%20summarize%20dcrList%20%3D%20make_list%28dcrId%29%2C%20dcrCount%20%3D%20count%28%29%20by%20subscription%2C%20resourceGroup%2C%20vmName%0D%0A%7C%20sort%20by%20dcrCount%20desc" target="_blank">portal.azure.cn</a>

---


## Azure Policy


### Compliance by policy assignment

Provides compliance state, compliance percentage, and counts of resources for each Azure Policy assignment.

```kusto
PolicyResources
| where type =~ 'Microsoft.PolicyInsights/PolicyStates'
| extend complianceState = tostring(properties.complianceState)
| extend
	resourceId = tostring(properties.resourceId),
	policyAssignmentId = tostring(properties.policyAssignmentId),
	policyAssignmentScope = tostring(properties.policyAssignmentScope),
	policyAssignmentName = tostring(properties.policyAssignmentName),
	policyDefinitionId = tostring(properties.policyDefinitionId),
	policyDefinitionReferenceId = tostring(properties.policyDefinitionReferenceId),
	stateWeight = iff(complianceState == 'NonCompliant', int(300), iff(complianceState == 'Compliant', int(200), iff(complianceState == 'Conflict', int(100), iff(complianceState == 'Exempt', int(50), int(0)))))
| summarize max(stateWeight) by resourceId, policyAssignmentId, policyAssignmentScope, policyAssignmentName
| summarize counts = count() by policyAssignmentId, policyAssignmentScope, max_stateWeight, policyAssignmentName
| summarize overallStateWeight = max(max_stateWeight),
nonCompliantCount = sumif(counts, max_stateWeight == 300),
compliantCount = sumif(counts, max_stateWeight == 200),
conflictCount = sumif(counts, max_stateWeight == 100),
exemptCount = sumif(counts, max_stateWeight == 50) by policyAssignmentId, policyAssignmentScope, policyAssignmentName
| extend totalResources = todouble(nonCompliantCount + compliantCount + conflictCount + exemptCount)
| extend compliancePercentage = iff(totalResources == 0, todouble(100), 100 * todouble(compliantCount + exemptCount) / totalResources)
| project policyAssignmentName, scope = policyAssignmentScope,
complianceState = iff(overallStateWeight == 300, 'noncompliant', iff(overallStateWeight == 200, 'compliant', iff(overallStateWeight == 100, 'conflict', iff(overallStateWeight == 50, 'exempt', 'notstarted')))),
compliancePercentage,
compliantCount,
nonCompliantCount,
conflictCount,
exemptCount
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "PolicyResources | where type =~ 'Microsoft.PolicyInsights/PolicyStates' | extend complianceState = tostring(properties.complianceState) | extend resourceId = tostring(properties.resourceId), policyAssignmentId = tostring(properties.policyAssignmentId), policyAssignmentScope = tostring(properties.policyAssignmentScope), policyAssignmentName = tostring(properties.policyAssignmentName), policyDefinitionId = tostring(properties.policyDefinitionId), policyDefinitionReferenceId = tostring(properties.policyDefinitionReferenceId), stateWeight = iff(complianceState == 'NonCompliant', int(300), iff(complianceState == 'Compliant', int(200), iff(complianceState == 'Conflict', int(100), iff(complianceState == 'Exempt', int(50), int(0))))) | summarize max(stateWeight) by resourceId, policyAssignmentId, policyAssignmentScope, policyAssignmentName | summarize counts = count() by policyAssignmentId, policyAssignmentScope, max_stateWeight, policyAssignmentName | summarize overallStateWeight = max(max_stateWeight), nonCompliantCount = sumif(counts, max_stateWeight == 300), compliantCount = sumif(counts, max_stateWeight == 200), conflictCount = sumif(counts, max_stateWeight == 100), exemptCount = sumif(counts, max_stateWeight == 50) by policyAssignmentId, policyAssignmentScope, policyAssignmentName | extend totalResources = todouble(nonCompliantCount + compliantCount + conflictCount + exemptCount) | extend compliancePercentage = iff(totalResources == 0, todouble(100), 100 * todouble(compliantCount + exemptCount) / totalResources) | project policyAssignmentName, scope = policyAssignmentScope, complianceState = iff(overallStateWeight == 300, 'noncompliant', iff(overallStateWeight == 200, 'compliant', iff(overallStateWeight == 100, 'conflict', iff(overallStateWeight == 50, 'exempt', 'notstarted')))), compliancePercentage, compliantCount, nonCompliantCount, conflictCount, exemptCount"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "PolicyResources | where type =~ 'Microsoft.PolicyInsights/PolicyStates' | extend complianceState = tostring(properties.complianceState) | extend resourceId = tostring(properties.resourceId), policyAssignmentId = tostring(properties.policyAssignmentId), policyAssignmentScope = tostring(properties.policyAssignmentScope), policyAssignmentName = tostring(properties.policyAssignmentName), policyDefinitionId = tostring(properties.policyDefinitionId), policyDefinitionReferenceId = tostring(properties.policyDefinitionReferenceId), stateWeight = iff(complianceState == 'NonCompliant', int(300), iff(complianceState == 'Compliant', int(200), iff(complianceState == 'Conflict', int(100), iff(complianceState == 'Exempt', int(50), int(0))))) | summarize max(stateWeight) by resourceId, policyAssignmentId, policyAssignmentScope, policyAssignmentName | summarize counts = count() by policyAssignmentId, policyAssignmentScope, max_stateWeight, policyAssignmentName | summarize overallStateWeight = max(max_stateWeight), nonCompliantCount = sumif(counts, max_stateWeight == 300), compliantCount = sumif(counts, max_stateWeight == 200), conflictCount = sumif(counts, max_stateWeight == 100), exemptCount = sumif(counts, max_stateWeight == 50) by policyAssignmentId, policyAssignmentScope, policyAssignmentName | extend totalResources = todouble(nonCompliantCount + compliantCount + conflictCount + exemptCount) | extend compliancePercentage = iff(totalResources == 0, todouble(100), 100 * todouble(compliantCount + exemptCount) / totalResources) | project policyAssignmentName, scope = policyAssignmentScope, complianceState = iff(overallStateWeight == 300, 'noncompliant', iff(overallStateWeight == 200, 'compliant', iff(overallStateWeight == 100, 'conflict', iff(overallStateWeight == 50, 'exempt', 'notstarted')))), compliancePercentage, compliantCount, nonCompliantCount, conflictCount, exemptCount"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/PolicyResources%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.PolicyInsights%2fPolicyStates%27%0a%7c%20extend%20complianceState%20%3d%20tostring(properties.complianceState)%0a%7c%20extend%0a%09resourceId%20%3d%20tostring(properties.resourceId)%2c%0a%09policyAssignmentId%20%3d%20tostring(properties.policyAssignmentId)%2c%0a%09policyAssignmentScope%20%3d%20tostring(properties.policyAssignmentScope)%2c%0a%09policyAssignmentName%20%3d%20tostring(properties.policyAssignmentName)%2c%0a%09policyDefinitionId%20%3d%20tostring(properties.policyDefinitionId)%2c%0a%09policyDefinitionReferenceId%20%3d%20tostring(properties.policyDefinitionReferenceId)%2c%0a%09stateWeight%20%3d%20iff(complianceState%20%3d%3d%20%27NonCompliant%27%2c%20int(300)%2c%20iff(complianceState%20%3d%3d%20%27Compliant%27%2c%20int(200)%2c%20iff(complianceState%20%3d%3d%20%27Conflict%27%2c%20int(100)%2c%20iff(complianceState%20%3d%3d%20%27Exempt%27%2c%20int(50)%2c%20int(0)))))%0a%7c%20summarize%20max(stateWeight)%20by%20resourceId%2c%20policyAssignmentId%2c%20policyAssignmentScope%2c%20policyAssignmentName%0a%7c%20summarize%20counts%20%3d%20count()%20by%20policyAssignmentId%2c%20policyAssignmentScope%2c%20max_stateWeight%2c%20policyAssignmentName%0a%7c%20summarize%20overallStateWeight%20%3d%20max(max_stateWeight)%2c%0anonCompliantCount%20%3d%20sumif(counts%2c%20max_stateWeight%20%3d%3d%20300)%2c%0acompliantCount%20%3d%20sumif(counts%2c%20max_stateWeight%20%3d%3d%20200)%2c%0aconflictCount%20%3d%20sumif(counts%2c%20max_stateWeight%20%3d%3d%20100)%2c%0aexemptCount%20%3d%20sumif(counts%2c%20max_stateWeight%20%3d%3d%2050)%20by%20policyAssignmentId%2c%20policyAssignmentScope%2c%20policyAssignmentName%0a%7c%20extend%20totalResources%20%3d%20todouble(nonCompliantCount%20%2b%20compliantCount%20%2b%20conflictCount%20%2b%20exemptCount)%0a%7c%20extend%20compliancePercentage%20%3d%20iff(totalResources%20%3d%3d%200%2c%20todouble(100)%2c%20100%20*%20todouble(compliantCount%20%2b%20exemptCount)%20%2f%20totalResources)%0a%7c%20project%20policyAssignmentName%2c%20scope%20%3d%20policyAssignmentScope%2c%0acomplianceState%20%3d%20iff(overallStateWeight%20%3d%3d%20300%2c%20%27noncompliant%27%2c%20iff(overallStateWeight%20%3d%3d%20200%2c%20%27compliant%27%2c%20iff(overallStateWeight%20%3d%3d%20100%2c%20%27conflict%27%2c%20iff(overallStateWeight%20%3d%3d%2050%2c%20%27exempt%27%2c%20%27notstarted%27))))%2c%0acompliancePercentage%2c%0acompliantCount%2c%0anonCompliantCount%2c%0aconflictCount%2c%0aexemptCount" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/PolicyResources%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.PolicyInsights%2fPolicyStates%27%0a%7c%20extend%20complianceState%20%3d%20tostring(properties.complianceState)%0a%7c%20extend%0a%09resourceId%20%3d%20tostring(properties.resourceId)%2c%0a%09policyAssignmentId%20%3d%20tostring(properties.policyAssignmentId)%2c%0a%09policyAssignmentScope%20%3d%20tostring(properties.policyAssignmentScope)%2c%0a%09policyAssignmentName%20%3d%20tostring(properties.policyAssignmentName)%2c%0a%09policyDefinitionId%20%3d%20tostring(properties.policyDefinitionId)%2c%0a%09policyDefinitionReferenceId%20%3d%20tostring(properties.policyDefinitionReferenceId)%2c%0a%09stateWeight%20%3d%20iff(complianceState%20%3d%3d%20%27NonCompliant%27%2c%20int(300)%2c%20iff(complianceState%20%3d%3d%20%27Compliant%27%2c%20int(200)%2c%20iff(complianceState%20%3d%3d%20%27Conflict%27%2c%20int(100)%2c%20iff(complianceState%20%3d%3d%20%27Exempt%27%2c%20int(50)%2c%20int(0)))))%0a%7c%20summarize%20max(stateWeight)%20by%20resourceId%2c%20policyAssignmentId%2c%20policyAssignmentScope%2c%20policyAssignmentName%0a%7c%20summarize%20counts%20%3d%20count()%20by%20policyAssignmentId%2c%20policyAssignmentScope%2c%20max_stateWeight%2c%20policyAssignmentName%0a%7c%20summarize%20overallStateWeight%20%3d%20max(max_stateWeight)%2c%0anonCompliantCount%20%3d%20sumif(counts%2c%20max_stateWeight%20%3d%3d%20300)%2c%0acompliantCount%20%3d%20sumif(counts%2c%20max_stateWeight%20%3d%3d%20200)%2c%0aconflictCount%20%3d%20sumif(counts%2c%20max_stateWeight%20%3d%3d%20100)%2c%0aexemptCount%20%3d%20sumif(counts%2c%20max_stateWeight%20%3d%3d%2050)%20by%20policyAssignmentId%2c%20policyAssignmentScope%2c%20policyAssignmentName%0a%7c%20extend%20totalResources%20%3d%20todouble(nonCompliantCount%20%2b%20compliantCount%20%2b%20conflictCount%20%2b%20exemptCount)%0a%7c%20extend%20compliancePercentage%20%3d%20iff(totalResources%20%3d%3d%200%2c%20todouble(100)%2c%20100%20*%20todouble(compliantCount%20%2b%20exemptCount)%20%2f%20totalResources)%0a%7c%20project%20policyAssignmentName%2c%20scope%20%3d%20policyAssignmentScope%2c%0acomplianceState%20%3d%20iff(overallStateWeight%20%3d%3d%20300%2c%20%27noncompliant%27%2c%20iff(overallStateWeight%20%3d%3d%20200%2c%20%27compliant%27%2c%20iff(overallStateWeight%20%3d%3d%20100%2c%20%27conflict%27%2c%20iff(overallStateWeight%20%3d%3d%2050%2c%20%27exempt%27%2c%20%27notstarted%27))))%2c%0acompliancePercentage%2c%0acompliantCount%2c%0anonCompliantCount%2c%0aconflictCount%2c%0aexemptCount" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/PolicyResources%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.PolicyInsights%2fPolicyStates%27%0a%7c%20extend%20complianceState%20%3d%20tostring(properties.complianceState)%0a%7c%20extend%0a%09resourceId%20%3d%20tostring(properties.resourceId)%2c%0a%09policyAssignmentId%20%3d%20tostring(properties.policyAssignmentId)%2c%0a%09policyAssignmentScope%20%3d%20tostring(properties.policyAssignmentScope)%2c%0a%09policyAssignmentName%20%3d%20tostring(properties.policyAssignmentName)%2c%0a%09policyDefinitionId%20%3d%20tostring(properties.policyDefinitionId)%2c%0a%09policyDefinitionReferenceId%20%3d%20tostring(properties.policyDefinitionReferenceId)%2c%0a%09stateWeight%20%3d%20iff(complianceState%20%3d%3d%20%27NonCompliant%27%2c%20int(300)%2c%20iff(complianceState%20%3d%3d%20%27Compliant%27%2c%20int(200)%2c%20iff(complianceState%20%3d%3d%20%27Conflict%27%2c%20int(100)%2c%20iff(complianceState%20%3d%3d%20%27Exempt%27%2c%20int(50)%2c%20int(0)))))%0a%7c%20summarize%20max(stateWeight)%20by%20resourceId%2c%20policyAssignmentId%2c%20policyAssignmentScope%2c%20policyAssignmentName%0a%7c%20summarize%20counts%20%3d%20count()%20by%20policyAssignmentId%2c%20policyAssignmentScope%2c%20max_stateWeight%2c%20policyAssignmentName%0a%7c%20summarize%20overallStateWeight%20%3d%20max(max_stateWeight)%2c%0anonCompliantCount%20%3d%20sumif(counts%2c%20max_stateWeight%20%3d%3d%20300)%2c%0acompliantCount%20%3d%20sumif(counts%2c%20max_stateWeight%20%3d%3d%20200)%2c%0aconflictCount%20%3d%20sumif(counts%2c%20max_stateWeight%20%3d%3d%20100)%2c%0aexemptCount%20%3d%20sumif(counts%2c%20max_stateWeight%20%3d%3d%2050)%20by%20policyAssignmentId%2c%20policyAssignmentScope%2c%20policyAssignmentName%0a%7c%20extend%20totalResources%20%3d%20todouble(nonCompliantCount%20%2b%20compliantCount%20%2b%20conflictCount%20%2b%20exemptCount)%0a%7c%20extend%20compliancePercentage%20%3d%20iff(totalResources%20%3d%3d%200%2c%20todouble(100)%2c%20100%20*%20todouble(compliantCount%20%2b%20exemptCount)%20%2f%20totalResources)%0a%7c%20project%20policyAssignmentName%2c%20scope%20%3d%20policyAssignmentScope%2c%0acomplianceState%20%3d%20iff(overallStateWeight%20%3d%3d%20300%2c%20%27noncompliant%27%2c%20iff(overallStateWeight%20%3d%3d%20200%2c%20%27compliant%27%2c%20iff(overallStateWeight%20%3d%3d%20100%2c%20%27conflict%27%2c%20iff(overallStateWeight%20%3d%3d%2050%2c%20%27exempt%27%2c%20%27notstarted%27))))%2c%0acompliancePercentage%2c%0acompliantCount%2c%0anonCompliantCount%2c%0aconflictCount%2c%0aexemptCount" target="_blank">portal.azure.cn</a>

---

### Compliance by resource type

Provides compliance state, compliance percentage, and counts of resources for each resource type.

```kusto
PolicyResources
| where type =~ 'Microsoft.PolicyInsights/PolicyStates'
| extend complianceState = tostring(properties.complianceState)
| extend
	resourceId = tostring(properties.resourceId),
	resourceType = tolower(tostring(properties.resourceType)),
	policyAssignmentId = tostring(properties.policyAssignmentId),
	policyDefinitionId = tostring(properties.policyDefinitionId),
	policyDefinitionReferenceId = tostring(properties.policyDefinitionReferenceId),
	stateWeight = iff(complianceState == 'NonCompliant', int(300), iff(complianceState == 'Compliant', int(200), iff(complianceState == 'Conflict', int(100), iff(complianceState == 'Exempt', int(50), int(0)))))
| summarize max(stateWeight) by resourceId, resourceType
| summarize counts = count() by resourceType, max_stateWeight
| summarize overallStateWeight = max(max_stateWeight),
nonCompliantCount = sumif(counts, max_stateWeight == 300),
compliantCount = sumif(counts, max_stateWeight == 200),
conflictCount = sumif(counts, max_stateWeight == 100),
exemptCount = sumif(counts, max_stateWeight == 50) by resourceType
| extend totalResources = todouble(nonCompliantCount + compliantCount + conflictCount + exemptCount)
| extend compliancePercentage = iff(totalResources == 0, todouble(100), 100 * todouble(compliantCount + exemptCount) / totalResources)
| project resourceType,
overAllComplianceState = iff(overallStateWeight == 300, 'noncompliant', iff(overallStateWeight == 200, 'compliant', iff(overallStateWeight == 100, 'conflict', iff(overallStateWeight == 50, 'exempt', 'notstarted')))),
compliancePercentage,
compliantCount,
nonCompliantCount,
conflictCount,
exemptCount
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "PolicyResources | where type =~ 'Microsoft.PolicyInsights/PolicyStates' | extend complianceState = tostring(properties.complianceState) | extend resourceId = tostring(properties.resourceId), resourceType = tolower(tostring(properties.resourceType)), policyAssignmentId = tostring(properties.policyAssignmentId), policyDefinitionId = tostring(properties.policyDefinitionId), policyDefinitionReferenceId = tostring(properties.policyDefinitionReferenceId), stateWeight = iff(complianceState == 'NonCompliant', int(300), iff(complianceState == 'Compliant', int(200), iff(complianceState == 'Conflict', int(100), iff(complianceState == 'Exempt', int(50), int(0))))) | summarize max(stateWeight) by resourceId, resourceType | summarize counts = count() by resourceType, max_stateWeight | summarize overallStateWeight = max(max_stateWeight), nonCompliantCount = sumif(counts, max_stateWeight == 300), compliantCount = sumif(counts, max_stateWeight == 200), conflictCount = sumif(counts, max_stateWeight == 100), exemptCount = sumif(counts, max_stateWeight == 50) by resourceType | extend totalResources = todouble(nonCompliantCount + compliantCount + conflictCount + exemptCount) | extend compliancePercentage = iff(totalResources == 0, todouble(100), 100 * todouble(compliantCount + exemptCount) / totalResources) | project resourceType, overAllComplianceState = iff(overallStateWeight == 300, 'noncompliant', iff(overallStateWeight == 200, 'compliant', iff(overallStateWeight == 100, 'conflict', iff(overallStateWeight == 50, 'exempt', 'notstarted')))), compliancePercentage, compliantCount, nonCompliantCount, conflictCount, exemptCount"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "PolicyResources | where type =~ 'Microsoft.PolicyInsights/PolicyStates' | extend complianceState = tostring(properties.complianceState) | extend resourceId = tostring(properties.resourceId), resourceType = tolower(tostring(properties.resourceType)), policyAssignmentId = tostring(properties.policyAssignmentId), policyDefinitionId = tostring(properties.policyDefinitionId), policyDefinitionReferenceId = tostring(properties.policyDefinitionReferenceId), stateWeight = iff(complianceState == 'NonCompliant', int(300), iff(complianceState == 'Compliant', int(200), iff(complianceState == 'Conflict', int(100), iff(complianceState == 'Exempt', int(50), int(0))))) | summarize max(stateWeight) by resourceId, resourceType | summarize counts = count() by resourceType, max_stateWeight | summarize overallStateWeight = max(max_stateWeight), nonCompliantCount = sumif(counts, max_stateWeight == 300), compliantCount = sumif(counts, max_stateWeight == 200), conflictCount = sumif(counts, max_stateWeight == 100), exemptCount = sumif(counts, max_stateWeight == 50) by resourceType | extend totalResources = todouble(nonCompliantCount + compliantCount + conflictCount + exemptCount) | extend compliancePercentage = iff(totalResources == 0, todouble(100), 100 * todouble(compliantCount + exemptCount) / totalResources) | project resourceType, overAllComplianceState = iff(overallStateWeight == 300, 'noncompliant', iff(overallStateWeight == 200, 'compliant', iff(overallStateWeight == 100, 'conflict', iff(overallStateWeight == 50, 'exempt', 'notstarted')))), compliancePercentage, compliantCount, nonCompliantCount, conflictCount, exemptCount"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/PolicyResources%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.PolicyInsights%2fPolicyStates%27%0a%7c%20extend%20complianceState%20%3d%20tostring(properties.complianceState)%0a%7c%20extend%0a%09resourceId%20%3d%20tostring(properties.resourceId)%2c%0a%09resourceType%20%3d%20tolower(tostring(properties.resourceType))%2c%0a%09policyAssignmentId%20%3d%20tostring(properties.policyAssignmentId)%2c%0a%09policyDefinitionId%20%3d%20tostring(properties.policyDefinitionId)%2c%0a%09policyDefinitionReferenceId%20%3d%20tostring(properties.policyDefinitionReferenceId)%2c%0a%09stateWeight%20%3d%20iff(complianceState%20%3d%3d%20%27NonCompliant%27%2c%20int(300)%2c%20iff(complianceState%20%3d%3d%20%27Compliant%27%2c%20int(200)%2c%20iff(complianceState%20%3d%3d%20%27Conflict%27%2c%20int(100)%2c%20iff(complianceState%20%3d%3d%20%27Exempt%27%2c%20int(50)%2c%20int(0)))))%0a%7c%20summarize%20max(stateWeight)%20by%20resourceId%2c%20resourceType%0a%7c%20summarize%20counts%20%3d%20count()%20by%20resourceType%2c%20max_stateWeight%0a%7c%20summarize%20overallStateWeight%20%3d%20max(max_stateWeight)%2c%0anonCompliantCount%20%3d%20sumif(counts%2c%20max_stateWeight%20%3d%3d%20300)%2c%0acompliantCount%20%3d%20sumif(counts%2c%20max_stateWeight%20%3d%3d%20200)%2c%0aconflictCount%20%3d%20sumif(counts%2c%20max_stateWeight%20%3d%3d%20100)%2c%0aexemptCount%20%3d%20sumif(counts%2c%20max_stateWeight%20%3d%3d%2050)%20by%20resourceType%0a%7c%20extend%20totalResources%20%3d%20todouble(nonCompliantCount%20%2b%20compliantCount%20%2b%20conflictCount%20%2b%20exemptCount)%0a%7c%20extend%20compliancePercentage%20%3d%20iff(totalResources%20%3d%3d%200%2c%20todouble(100)%2c%20100%20*%20todouble(compliantCount%20%2b%20exemptCount)%20%2f%20totalResources)%0a%7c%20project%20resourceType%2c%0aoverAllComplianceState%20%3d%20iff(overallStateWeight%20%3d%3d%20300%2c%20%27noncompliant%27%2c%20iff(overallStateWeight%20%3d%3d%20200%2c%20%27compliant%27%2c%20iff(overallStateWeight%20%3d%3d%20100%2c%20%27conflict%27%2c%20iff(overallStateWeight%20%3d%3d%2050%2c%20%27exempt%27%2c%20%27notstarted%27))))%2c%0acompliancePercentage%2c%0acompliantCount%2c%0anonCompliantCount%2c%0aconflictCount%2c%0aexemptCount" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/PolicyResources%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.PolicyInsights%2fPolicyStates%27%0a%7c%20extend%20complianceState%20%3d%20tostring(properties.complianceState)%0a%7c%20extend%0a%09resourceId%20%3d%20tostring(properties.resourceId)%2c%0a%09resourceType%20%3d%20tolower(tostring(properties.resourceType))%2c%0a%09policyAssignmentId%20%3d%20tostring(properties.policyAssignmentId)%2c%0a%09policyDefinitionId%20%3d%20tostring(properties.policyDefinitionId)%2c%0a%09policyDefinitionReferenceId%20%3d%20tostring(properties.policyDefinitionReferenceId)%2c%0a%09stateWeight%20%3d%20iff(complianceState%20%3d%3d%20%27NonCompliant%27%2c%20int(300)%2c%20iff(complianceState%20%3d%3d%20%27Compliant%27%2c%20int(200)%2c%20iff(complianceState%20%3d%3d%20%27Conflict%27%2c%20int(100)%2c%20iff(complianceState%20%3d%3d%20%27Exempt%27%2c%20int(50)%2c%20int(0)))))%0a%7c%20summarize%20max(stateWeight)%20by%20resourceId%2c%20resourceType%0a%7c%20summarize%20counts%20%3d%20count()%20by%20resourceType%2c%20max_stateWeight%0a%7c%20summarize%20overallStateWeight%20%3d%20max(max_stateWeight)%2c%0anonCompliantCount%20%3d%20sumif(counts%2c%20max_stateWeight%20%3d%3d%20300)%2c%0acompliantCount%20%3d%20sumif(counts%2c%20max_stateWeight%20%3d%3d%20200)%2c%0aconflictCount%20%3d%20sumif(counts%2c%20max_stateWeight%20%3d%3d%20100)%2c%0aexemptCount%20%3d%20sumif(counts%2c%20max_stateWeight%20%3d%3d%2050)%20by%20resourceType%0a%7c%20extend%20totalResources%20%3d%20todouble(nonCompliantCount%20%2b%20compliantCount%20%2b%20conflictCount%20%2b%20exemptCount)%0a%7c%20extend%20compliancePercentage%20%3d%20iff(totalResources%20%3d%3d%200%2c%20todouble(100)%2c%20100%20*%20todouble(compliantCount%20%2b%20exemptCount)%20%2f%20totalResources)%0a%7c%20project%20resourceType%2c%0aoverAllComplianceState%20%3d%20iff(overallStateWeight%20%3d%3d%20300%2c%20%27noncompliant%27%2c%20iff(overallStateWeight%20%3d%3d%20200%2c%20%27compliant%27%2c%20iff(overallStateWeight%20%3d%3d%20100%2c%20%27conflict%27%2c%20iff(overallStateWeight%20%3d%3d%2050%2c%20%27exempt%27%2c%20%27notstarted%27))))%2c%0acompliancePercentage%2c%0acompliantCount%2c%0anonCompliantCount%2c%0aconflictCount%2c%0aexemptCount" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/PolicyResources%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.PolicyInsights%2fPolicyStates%27%0a%7c%20extend%20complianceState%20%3d%20tostring(properties.complianceState)%0a%7c%20extend%0a%09resourceId%20%3d%20tostring(properties.resourceId)%2c%0a%09resourceType%20%3d%20tolower(tostring(properties.resourceType))%2c%0a%09policyAssignmentId%20%3d%20tostring(properties.policyAssignmentId)%2c%0a%09policyDefinitionId%20%3d%20tostring(properties.policyDefinitionId)%2c%0a%09policyDefinitionReferenceId%20%3d%20tostring(properties.policyDefinitionReferenceId)%2c%0a%09stateWeight%20%3d%20iff(complianceState%20%3d%3d%20%27NonCompliant%27%2c%20int(300)%2c%20iff(complianceState%20%3d%3d%20%27Compliant%27%2c%20int(200)%2c%20iff(complianceState%20%3d%3d%20%27Conflict%27%2c%20int(100)%2c%20iff(complianceState%20%3d%3d%20%27Exempt%27%2c%20int(50)%2c%20int(0)))))%0a%7c%20summarize%20max(stateWeight)%20by%20resourceId%2c%20resourceType%0a%7c%20summarize%20counts%20%3d%20count()%20by%20resourceType%2c%20max_stateWeight%0a%7c%20summarize%20overallStateWeight%20%3d%20max(max_stateWeight)%2c%0anonCompliantCount%20%3d%20sumif(counts%2c%20max_stateWeight%20%3d%3d%20300)%2c%0acompliantCount%20%3d%20sumif(counts%2c%20max_stateWeight%20%3d%3d%20200)%2c%0aconflictCount%20%3d%20sumif(counts%2c%20max_stateWeight%20%3d%3d%20100)%2c%0aexemptCount%20%3d%20sumif(counts%2c%20max_stateWeight%20%3d%3d%2050)%20by%20resourceType%0a%7c%20extend%20totalResources%20%3d%20todouble(nonCompliantCount%20%2b%20compliantCount%20%2b%20conflictCount%20%2b%20exemptCount)%0a%7c%20extend%20compliancePercentage%20%3d%20iff(totalResources%20%3d%3d%200%2c%20todouble(100)%2c%20100%20*%20todouble(compliantCount%20%2b%20exemptCount)%20%2f%20totalResources)%0a%7c%20project%20resourceType%2c%0aoverAllComplianceState%20%3d%20iff(overallStateWeight%20%3d%3d%20300%2c%20%27noncompliant%27%2c%20iff(overallStateWeight%20%3d%3d%20200%2c%20%27compliant%27%2c%20iff(overallStateWeight%20%3d%3d%20100%2c%20%27conflict%27%2c%20iff(overallStateWeight%20%3d%3d%2050%2c%20%27exempt%27%2c%20%27notstarted%27))))%2c%0acompliancePercentage%2c%0acompliantCount%2c%0anonCompliantCount%2c%0aconflictCount%2c%0aexemptCount" target="_blank">portal.azure.cn</a>

---

### List all non-compliant resources

Provides a list of all resources types that are in a `NonCompliant` state.

```kusto
PolicyResources
| where type == 'microsoft.policyinsights/policystates'
| where properties.complianceState == 'NonCompliant'
| extend NonCompliantResourceId = properties.resourceId, PolicyAssignmentName = properties.policyAssignmentName
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "PolicyResources | where type == 'microsoft.policyinsights/policystates' | where properties.complianceState == 'NonCompliant' | extend NonCompliantResourceId = properties.resourceId, PolicyAssignmentName = properties.policyAssignmentName"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "PolicyResources | where type == 'microsoft.policyinsights/policystates' | where properties.complianceState == 'NonCompliant'"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/PolicyResources%0a%7c%e2%80%afwhere%e2%80%aftype%e2%80%af%3d%3d%e2%80%af%27microsoft.policyinsights%2fpolicystates%27%0a%7c%e2%80%afwhere%e2%80%afproperties.complianceState%e2%80%af%3d%3d%e2%80%af%27NonCompliant%27" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/PolicyResources%0a%7c%e2%80%afwhere%e2%80%aftype%e2%80%af%3d%3d%e2%80%af%27microsoft.policyinsights%2fpolicystates%27%0a%7c%e2%80%afwhere%e2%80%afproperties.complianceState%e2%80%af%3d%3d%e2%80%af%27NonCompliant%27" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/PolicyResources%0a%7c%e2%80%afwhere%e2%80%aftype%e2%80%af%3d%3d%e2%80%af%27microsoft.policyinsights%2fpolicystates%27%0a%7c%e2%80%afwhere%e2%80%afproperties.complianceState%e2%80%af%3d%3d%e2%80%af%27NonCompliant%27" target="_blank">portal.azure.cn</a>

---

### Summarize resource compliance by state

Details the number of resources in each compliance state.

```kusto
PolicyResources
| where type == 'microsoft.policyinsights/policystates'
| extend complianceState = tostring(properties.complianceState)
| summarize count() by complianceState
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "PolicyResources | where type == 'microsoft.policyinsights/policystates' | extend complianceState = tostring(properties.complianceState) | summarize count() by complianceState"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "PolicyResources | where type == 'microsoft.policyinsights/policystates' | extend complianceState = tostring(properties.complianceState) | summarize count() by complianceState"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/PolicyResources%0a%7c%e2%80%afwhere%e2%80%aftype%e2%80%af%3d%3d%e2%80%af%27microsoft.policyinsights%2fpolicystates%27%0a%7c%e2%80%afextend%e2%80%afcomplianceState%e2%80%af%3d%e2%80%aftostring(properties.complianceState)%0a%7c%e2%80%afsummarize%e2%80%afcount()%e2%80%afby%e2%80%afcomplianceState" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/PolicyResources%0a%7c%e2%80%afwhere%e2%80%aftype%e2%80%af%3d%3d%e2%80%af%27microsoft.policyinsights%2fpolicystates%27%0a%7c%e2%80%afextend%e2%80%afcomplianceState%e2%80%af%3d%e2%80%aftostring(properties.complianceState)%0a%7c%e2%80%afsummarize%e2%80%afcount()%e2%80%afby%e2%80%afcomplianceState" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/PolicyResources%0a%7c%e2%80%afwhere%e2%80%aftype%e2%80%af%3d%3d%e2%80%af%27microsoft.policyinsights%2fpolicystates%27%0a%7c%e2%80%afextend%e2%80%afcomplianceState%e2%80%af%3d%e2%80%aftostring(properties.complianceState)%0a%7c%e2%80%afsummarize%e2%80%afcount()%e2%80%afby%e2%80%afcomplianceState" target="_blank">portal.azure.cn</a>

---

### Summarize resource compliance by state per location

Details the number of resources in each compliance state per location.

```kusto
PolicyResources
| where type == 'microsoft.policyinsights/policystates'
| extend complianceState = tostring(properties.complianceState)
| extend resourceLocation = tostring(properties.resourceLocation)
| summarize count() by resourceLocation, complianceState
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "PolicyResources | where type == 'microsoft.policyinsights/policystates' | extend complianceState = tostring(properties.complianceState) | extend resourceLocation = tostring(properties.resourceLocation) | summarize count() by resourceLocation, complianceState"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "PolicyResources | where type == 'microsoft.policyinsights/policystates' | extend complianceState = tostring(properties.complianceState) | extend resourceLocation = tostring(properties.resourceLocation) | summarize count() by resourceLocation, complianceState"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/PolicyResources%0a%7c%e2%80%afwhere%e2%80%aftype%e2%80%af%3d%3d%e2%80%af%27microsoft.policyinsights%2fpolicystates%27%0a%7c%e2%80%afextend%e2%80%afcomplianceState%e2%80%af%3d%e2%80%aftostring(properties.complianceState)%0a%7c%e2%80%afextend%e2%80%afresourceLocation%e2%80%af%3d%e2%80%aftostring(properties.resourceLocation)%0a%7c%e2%80%afsummarize%e2%80%afcount()%e2%80%afby%e2%80%afresourceLocation%2c%e2%80%afcomplianceState" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/PolicyResources%0a%7c%e2%80%afwhere%e2%80%aftype%e2%80%af%3d%3d%e2%80%af%27microsoft.policyinsights%2fpolicystates%27%0a%7c%e2%80%afextend%e2%80%afcomplianceState%e2%80%af%3d%e2%80%aftostring(properties.complianceState)%0a%7c%e2%80%afextend%e2%80%afresourceLocation%e2%80%af%3d%e2%80%aftostring(properties.resourceLocation)%0a%7c%e2%80%afsummarize%e2%80%afcount()%e2%80%afby%e2%80%afresourceLocation%2c%e2%80%afcomplianceState" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/PolicyResources%0a%7c%e2%80%afwhere%e2%80%aftype%e2%80%af%3d%3d%e2%80%af%27microsoft.policyinsights%2fpolicystates%27%0a%7c%e2%80%afextend%e2%80%afcomplianceState%e2%80%af%3d%e2%80%aftostring(properties.complianceState)%0a%7c%e2%80%afextend%e2%80%afresourceLocation%e2%80%af%3d%e2%80%aftostring(properties.resourceLocation)%0a%7c%e2%80%afsummarize%e2%80%afcount()%e2%80%afby%e2%80%afresourceLocation%2c%e2%80%afcomplianceState" target="_blank">portal.azure.cn</a>

---



### Policy exemptions per assignment

Lists the number of exemptions for each assignment.

```kusto
PolicyResources
| where type == 'microsoft.authorization/policyexemptions'
| summarize count() by tostring(properties.policyAssignmentId)
```

For more information about using scopes with Azure CLI or Azure PowerShell, go to [Count Azure resources](starter.md#count-azure-resources).

# [Azure CLI](#tab/azure-cli)

Use the `--management-groups` parameter with an Azure management group ID or tenant ID. In this example, the `tenantid` variable stores the tenant ID.

```azurecli-interactive
tenantid="$(az account show --query tenantId --output tsv)"
az graph query -q "policyresources | where type == 'microsoft.authorization/policyexemptions' | summarize count() by tostring(properties.policyAssignmentId)" --management-groups $tenantid
```

# [Azure PowerShell](#tab/azure-powershell)

By default, PowerShell get results for all subscriptions in your tenant but you can also include the `-UseTenantScope` parameter.

```azurepowershell-interactive
Search-AzGraph -Query "policyresources | where type == 'microsoft.authorization/policyexemptions' | summarize count() by tostring(properties.policyAssignmentId)" -UseTenantScope
```

# [Portal](#tab/azure-portal)

- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/policyresources%0D%0A%7C%20where%20type%20%3D%3D%20%27microsoft.authorization%2Fpolicyexemptions%27%0D%0A%7C%20summarize%20count%28%29%20by%20tostring%28properties.policyAssignmentId%29" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/policyresources%0D%0A%7C%20where%20type%20%3D%3D%20%27microsoft.authorization%2Fpolicyexemptions%27%0D%0A%7C%20summarize%20count%28%29%20by%20tostring%28properties.policyAssignmentId%29" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/policyresources%0D%0A%7C%20where%20type%20%3D%3D%20%27microsoft.authorization%2Fpolicyexemptions%27%0D%0A%7C%20summarize%20count%28%29%20by%20tostring%28properties.policyAssignmentId%29" target="_blank">portal.azure.cn</a>

---

### Policy exemptions that expire within 90 days

Lists the name and expiration date.

```kusto
PolicyResources
| where type == 'microsoft.authorization/policyexemptions'
| extend expiresOnC = todatetime(properties.expiresOn)
| where isnotnull(expiresOnC)
| where expiresOnC >= now() and expiresOnC < now(+90d)
| project name, expiresOnC
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "policyresources | where type == 'microsoft.authorization/policyexemptions' | extend expiresOnC = todatetime(properties.expiresOn) | where isnotnull(expiresOnC) | where expiresOnC >= now() and expiresOnC < now(+90d) | project name, expiresOnC"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "policyresources | where type == 'microsoft.authorization/policyexemptions' | extend expiresOnC = todatetime(properties.expiresOn) | where isnotnull(expiresOnC) | where expiresOnC >= now() and expiresOnC < now(+90d) | project name, expiresOnC"
```

# [Portal](#tab/azure-portal)

- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/policyresources%0D%0A%7C%20where%20type%20%3D%3D%20%27microsoft.authorization%2Fpolicyexemptions%27%0D%0A%7C%20extend%20expiresOnC%20%3D%20todatetime%28properties.expiresOn%29%0D%0A%7C%20where%20isnotnull%28expiresOnC%29%0D%0A%7C%20where%20expiresOnC%20%3E%3D%20now%28%29%20and%20expiresOnC%20%3C%20now%28%2B90d%29%0D%0A%7C%20project%20name%2C%20expiresOnC" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/policyresources%0D%0A%7C%20where%20type%20%3D%3D%20%27microsoft.authorization%2Fpolicyexemptions%27%0D%0A%7C%20extend%20expiresOnC%20%3D%20todatetime%28properties.expiresOn%29%0D%0A%7C%20where%20isnotnull%28expiresOnC%29%0D%0A%7C%20where%20expiresOnC%20%3E%3D%20now%28%29%20and%20expiresOnC%20%3C%20now%28%2B90d%29%0D%0A%7C%20project%20name%2C%20expiresOnC" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/policyresources%0D%0A%7C%20where%20type%20%3D%3D%20%27microsoft.authorization%2Fpolicyexemptions%27%0D%0A%7C%20extend%20expiresOnC%20%3D%20todatetime%28properties.expiresOn%29%0D%0A%7C%20where%20isnotnull%28expiresOnC%29%0D%0A%7C%20where%20expiresOnC%20%3E%3D%20now%28%29%20and%20expiresOnC%20%3C%20now%28%2B90d%29%0D%0A%7C%20project%20name%2C%20expiresOnC" target="_blank">portal.azure.cn</a>

---


## Azure Policy guest configuration


### Count machines in scope of guest configuration policies

Displays the count of Azure virtual machines and Arc connected servers in scope for [Azure Policy guest configuration](https://learn.microsoft.com/azure/governance/machine-configuration/overview) assignments.

```kusto
GuestConfigurationResources
| where type =~ 'microsoft.guestconfiguration/guestconfigurationassignments'
| extend vmid = split(properties.targetResourceId,'/')
| mvexpand properties.latestAssignmentReport.resources
| where properties_latestAssignmentReport_resources.resourceId != 'Invalid assignment package.'
| project machine = tostring(vmid[(-1)]),type = tostring(vmid[(-3)])
| distinct machine, type
| summarize count() by type
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "GuestConfigurationResources | where type =~ 'microsoft.guestconfiguration/guestconfigurationassignments' | extend vmid = split(properties.targetResourceId,'/') | mvexpand properties.latestAssignmentReport.resources | where properties_latestAssignmentReport_resources.resourceId != 'Invalid assignment package.' | project machine = tostring(vmid[(-1)]),type = tostring(vmid[(-3)]) | distinct machine, type | summarize count() by type"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "GuestConfigurationResources | where type =~ 'microsoft.guestconfiguration/guestconfigurationassignments' | extend vmid = split(properties.targetResourceId,'/') | mvexpand properties.latestAssignmentReport.resources | where properties_latestAssignmentReport_resources.resourceId != 'Invalid assignment package.' | project machine = tostring(vmid[(-1)]),type = tostring(vmid[(-3)]) | distinct machine, type | summarize count() by type"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/GuestConfigurationResources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.guestconfiguration%2fguestconfigurationassignments%27%0a%7c%20extend%20vmid%20%3d%20split(properties.targetResourceId%2c%27%2f%27)%0a%7c%20mvexpand%20properties.latestAssignmentReport.resources%0a%7c%20where%20properties_latestAssignmentReport_resources.resourceId%20!%3d%20%27Invalid%20assignment%20package.%27%0a%7c%20project%20machine%20%3d%20tostring(vmid%5b(-1)%5d)%2ctype%20%3d%20tostring(vmid%5b(-3)%5d)%0a%7c%20distinct%20machine%2c%20type%0a%7c%20summarize%20count()%20by%20type" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/GuestConfigurationResources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.guestconfiguration%2fguestconfigurationassignments%27%0a%7c%20extend%20vmid%20%3d%20split(properties.targetResourceId%2c%27%2f%27)%0a%7c%20mvexpand%20properties.latestAssignmentReport.resources%0a%7c%20where%20properties_latestAssignmentReport_resources.resourceId%20!%3d%20%27Invalid%20assignment%20package.%27%0a%7c%20project%20machine%20%3d%20tostring(vmid%5b(-1)%5d)%2ctype%20%3d%20tostring(vmid%5b(-3)%5d)%0a%7c%20distinct%20machine%2c%20type%0a%7c%20summarize%20count()%20by%20type" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/GuestConfigurationResources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.guestconfiguration%2fguestconfigurationassignments%27%0a%7c%20extend%20vmid%20%3d%20split(properties.targetResourceId%2c%27%2f%27)%0a%7c%20mvexpand%20properties.latestAssignmentReport.resources%0a%7c%20where%20properties_latestAssignmentReport_resources.resourceId%20!%3d%20%27Invalid%20assignment%20package.%27%0a%7c%20project%20machine%20%3d%20tostring(vmid%5b(-1)%5d)%2ctype%20%3d%20tostring(vmid%5b(-3)%5d)%0a%7c%20distinct%20machine%2c%20type%0a%7c%20summarize%20count()%20by%20type" target="_blank">portal.azure.cn</a>

---

### Count of non-compliant guest configuration assignments

Displays a count of non-compliant machines per [guest configuration assignment reason](https://learn.microsoft.com/azure/governance/policy/how-to/determine-non-compliance#compliance-details-for-guest-configuration). Limits results to first 100 for performance.

```kusto
GuestConfigurationResources
| where type =~ 'microsoft.guestconfiguration/guestconfigurationassignments'
| project id, name, resources = properties.latestAssignmentReport.resources, vmid = split(properties.targetResourceId,'/')[(-1)], status = tostring(properties.complianceStatus)
| extend resources = iff(isnull(resources[0]), dynamic([{}]), resources)
| mvexpand resources
| extend reasons = resources.reasons
| extend reasons = iff(isnull(reasons[0]), dynamic([{}]), reasons)
| mvexpand reasons
| project id, vmid, name, status, resource = tostring(resources.resourceId), reason = reasons.phrase
| summarize count() by resource, name
| order by count_
| limit 100
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "GuestConfigurationResources | where type =~ 'microsoft.guestconfiguration/guestconfigurationassignments' | project id, name, resources = properties.latestAssignmentReport.resources, vmid = split(properties.targetResourceId,'/')[(-1)], status = tostring(properties.complianceStatus) | extend resources = iff(isnull(resources[0]), dynamic([{}]), resources) | mvexpand resources | extend reasons = resources.reasons | extend reasons = iff(isnull(reasons[0]), dynamic([{}]), reasons) | mvexpand reasons | project id, vmid, name, status, resource = tostring(resources.resourceId), reason = reasons.phrase | summarize count() by resource, name | order by count_ | limit 100"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "GuestConfigurationResources | where type =~ 'microsoft.guestconfiguration/guestconfigurationassignments' | project id, name, resources = properties.latestAssignmentReport.resources, vmid = split(properties.targetResourceId,'/')[(-1)], status = tostring(properties.complianceStatus) | extend resources = iff(isnull(resources[0]), dynamic([{}]), resources) | mvexpand resources | extend reasons = resources.reasons | extend reasons = iff(isnull(reasons[0]), dynamic([{}]), reasons) | mvexpand reasons | project id, vmid, name, status, resource = tostring(resources.resourceId), reason = reasons.phrase | summarize count() by resource, name | order by count_ | limit 100"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/GuestConfigurationResources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.guestconfiguration%2fguestconfigurationassignments%27%0a%7c%20project%20id%2c%20name%2c%20resources%20%3d%20properties.latestAssignmentReport.resources%2c%20vmid%20%3d%20split(properties.targetResourceId%2c%27%2f%27)%5b(-1)%5d%2c%20status%20%3d%20tostring(properties.complianceStatus)%0a%7c%20extend%20resources%20%3d%20iff(isnull(resources%5b0%5d)%2c%20dynamic(%5b%7b%7d%5d)%2c%20resources)%0a%7c%20mvexpand%20resources%0a%7c%20extend%20reasons%20%3d%20resources.reasons%0a%7c%20extend%20reasons%20%3d%20iff(isnull(reasons%5b0%5d)%2c%20dynamic(%5b%7b%7d%5d)%2c%20reasons)%0a%7c%20mvexpand%20reasons%0a%7c%20project%20id%2c%20vmid%2c%20name%2c%20status%2c%20resource%20%3d%20tostring(resources.resourceId)%2c%20reason%20%3d%20reasons.phrase%0a%7c%20summarize%20count()%20by%20resource%2c%20name%0a%7c%20order%20by%20count_%0a%7c%20limit%20100" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/GuestConfigurationResources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.guestconfiguration%2fguestconfigurationassignments%27%0a%7c%20project%20id%2c%20name%2c%20resources%20%3d%20properties.latestAssignmentReport.resources%2c%20vmid%20%3d%20split(properties.targetResourceId%2c%27%2f%27)%5b(-1)%5d%2c%20status%20%3d%20tostring(properties.complianceStatus)%0a%7c%20extend%20resources%20%3d%20iff(isnull(resources%5b0%5d)%2c%20dynamic(%5b%7b%7d%5d)%2c%20resources)%0a%7c%20mvexpand%20resources%0a%7c%20extend%20reasons%20%3d%20resources.reasons%0a%7c%20extend%20reasons%20%3d%20iff(isnull(reasons%5b0%5d)%2c%20dynamic(%5b%7b%7d%5d)%2c%20reasons)%0a%7c%20mvexpand%20reasons%0a%7c%20project%20id%2c%20vmid%2c%20name%2c%20status%2c%20resource%20%3d%20tostring(resources.resourceId)%2c%20reason%20%3d%20reasons.phrase%0a%7c%20summarize%20count()%20by%20resource%2c%20name%0a%7c%20order%20by%20count_%0a%7c%20limit%20100" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/GuestConfigurationResources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.guestconfiguration%2fguestconfigurationassignments%27%0a%7c%20project%20id%2c%20name%2c%20resources%20%3d%20properties.latestAssignmentReport.resources%2c%20vmid%20%3d%20split(properties.targetResourceId%2c%27%2f%27)%5b(-1)%5d%2c%20status%20%3d%20tostring(properties.complianceStatus)%0a%7c%20extend%20resources%20%3d%20iff(isnull(resources%5b0%5d)%2c%20dynamic(%5b%7b%7d%5d)%2c%20resources)%0a%7c%20mvexpand%20resources%0a%7c%20extend%20reasons%20%3d%20resources.reasons%0a%7c%20extend%20reasons%20%3d%20iff(isnull(reasons%5b0%5d)%2c%20dynamic(%5b%7b%7d%5d)%2c%20reasons)%0a%7c%20mvexpand%20reasons%0a%7c%20project%20id%2c%20vmid%2c%20name%2c%20status%2c%20resource%20%3d%20tostring(resources.resourceId)%2c%20reason%20%3d%20reasons.phrase%0a%7c%20summarize%20count()%20by%20resource%2c%20name%0a%7c%20order%20by%20count_%0a%7c%20limit%20100" target="_blank">portal.azure.cn</a>

---

### Find all reasons a machine is non-compliant for guest configuration assignments

Display all [guest configuration assignment reasons](https://learn.microsoft.com/azure/governance/policy/how-to/determine-non-compliance#compliance-details-for-guest-configuration) for a specific machine. Remove the first `where` clause to also include audits where the machine is compliant.

```kusto
GuestConfigurationResources
| where type =~ 'microsoft.guestconfiguration/guestconfigurationassignments'
| where properties.complianceStatus == 'NonCompliant'
| project id, name, resources = properties.latestAssignmentReport.resources, machine = split(properties.targetResourceId,'/')[(-1)], status = tostring(properties.complianceStatus)
| extend resources = iff(isnull(resources[0]), dynamic([{}]), resources)
| mvexpand resources
| extend reasons = resources.reasons
| extend reasons = iff(isnull(reasons[0]), dynamic([{}]), reasons)
| mvexpand reasons
| where machine == 'MACHINENAME'
| project id, machine, name, status, resource = resources.resourceId, reason = reasons.phrase
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "GuestConfigurationResources | where type =~ 'microsoft.guestconfiguration/guestconfigurationassignments' | where properties.complianceStatus == 'NonCompliant' | project id, name, resources = properties.latestAssignmentReport.resources, machine = split(properties.targetResourceId,'/')[(-1)], status = tostring(properties.complianceStatus) | extend resources = iff(isnull(resources[0]), dynamic([{}]), resources) | mvexpand resources | extend reasons = resources.reasons | extend reasons = iff(isnull(reasons[0]), dynamic([{}]), reasons) | mvexpand reasons | where machine == 'MACHINENAME' | project id, machine, name, status, resource = resources.resourceId, reason = reasons.phrase"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "GuestConfigurationResources | where type =~ 'microsoft.guestconfiguration/guestconfigurationassignments' | where properties.complianceStatus == 'NonCompliant' | project id, name, resources = properties.latestAssignmentReport.resources, machine = split(properties.targetResourceId,'/')[(-1)], status = tostring(properties.complianceStatus) | extend resources = iff(isnull(resources[0]), dynamic([{}]), resources) | mvexpand resources | extend reasons = resources.reasons | extend reasons = iff(isnull(reasons[0]), dynamic([{}]), reasons) | mvexpand reasons | where machine == 'MACHINENAME' | project id, machine, name, status, resource = resources.resourceId, reason = reasons.phrase"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/GuestConfigurationResources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.guestconfiguration%2fguestconfigurationassignments%27%0a%7c%20where%20properties.complianceStatus%20%3d%3d%20%27NonCompliant%27%0a%7c%20project%20id%2c%20name%2c%20resources%20%3d%20properties.latestAssignmentReport.resources%2c%20machine%20%3d%20split(properties.targetResourceId%2c%27%2f%27)%5b(-1)%5d%2c%20status%20%3d%20tostring(properties.complianceStatus)%0a%7c%20extend%20resources%20%3d%20iff(isnull(resources%5b0%5d)%2c%20dynamic(%5b%7b%7d%5d)%2c%20resources)%0a%7c%20mvexpand%20resources%0a%7c%20extend%20reasons%20%3d%20resources.reasons%0a%7c%20extend%20reasons%20%3d%20iff(isnull(reasons%5b0%5d)%2c%20dynamic(%5b%7b%7d%5d)%2c%20reasons)%0a%7c%20mvexpand%20reasons%0a%7c%20where%20machine%20%3d%3d%20%27MACHINENAME%27%0a%7c%20project%20id%2c%20machine%2c%20name%2c%20status%2c%20resource%20%3d%20resources.resourceId%2c%20reason%20%3d%20reasons.phrase" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/GuestConfigurationResources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.guestconfiguration%2fguestconfigurationassignments%27%0a%7c%20where%20properties.complianceStatus%20%3d%3d%20%27NonCompliant%27%0a%7c%20project%20id%2c%20name%2c%20resources%20%3d%20properties.latestAssignmentReport.resources%2c%20machine%20%3d%20split(properties.targetResourceId%2c%27%2f%27)%5b(-1)%5d%2c%20status%20%3d%20tostring(properties.complianceStatus)%0a%7c%20extend%20resources%20%3d%20iff(isnull(resources%5b0%5d)%2c%20dynamic(%5b%7b%7d%5d)%2c%20resources)%0a%7c%20mvexpand%20resources%0a%7c%20extend%20reasons%20%3d%20resources.reasons%0a%7c%20extend%20reasons%20%3d%20iff(isnull(reasons%5b0%5d)%2c%20dynamic(%5b%7b%7d%5d)%2c%20reasons)%0a%7c%20mvexpand%20reasons%0a%7c%20where%20machine%20%3d%3d%20%27MACHINENAME%27%0a%7c%20project%20id%2c%20machine%2c%20name%2c%20status%2c%20resource%20%3d%20resources.resourceId%2c%20reason%20%3d%20reasons.phrase" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/GuestConfigurationResources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.guestconfiguration%2fguestconfigurationassignments%27%0a%7c%20where%20properties.complianceStatus%20%3d%3d%20%27NonCompliant%27%0a%7c%20project%20id%2c%20name%2c%20resources%20%3d%20properties.latestAssignmentReport.resources%2c%20machine%20%3d%20split(properties.targetResourceId%2c%27%2f%27)%5b(-1)%5d%2c%20status%20%3d%20tostring(properties.complianceStatus)%0a%7c%20extend%20resources%20%3d%20iff(isnull(resources%5b0%5d)%2c%20dynamic(%5b%7b%7d%5d)%2c%20resources)%0a%7c%20mvexpand%20resources%0a%7c%20extend%20reasons%20%3d%20resources.reasons%0a%7c%20extend%20reasons%20%3d%20iff(isnull(reasons%5b0%5d)%2c%20dynamic(%5b%7b%7d%5d)%2c%20reasons)%0a%7c%20mvexpand%20reasons%0a%7c%20where%20machine%20%3d%3d%20%27MACHINENAME%27%0a%7c%20project%20id%2c%20machine%2c%20name%2c%20status%2c%20resource%20%3d%20resources.resourceId%2c%20reason%20%3d%20reasons.phrase" target="_blank">portal.azure.cn</a>

---

### List machines and status of pending reboot

Provides a list of machines with configuration details about whether they have a pending reboot.

```kusto
GuestConfigurationResources
| where name in ('WindowsPendingReboot')
| project id, name, resources = properties.latestAssignmentReport.resources, vmid = split(properties.targetResourceId,'/'), status = tostring(properties.complianceStatus)
| extend resources = iff(isnull(resources[0]), dynamic([{}]), resources)
| mvexpand resources
| extend reasons = resources.reasons
| extend reasons = iff(isnull(reasons[0]), dynamic([{}]), reasons)
| mvexpand reasons
| project id, vmid, name, status, resource = resources.resourceId, reason = reasons.phrase
| summarize name = any(name), status = any(status), vmid = any(vmid), resources = make_list_if(resource, isnotnull(resource)), reasons = make_list_if(reason, isnotnull(reason)) by id = tolower(id)
| project id, machine = tostring(vmid[(-1)]), type = tostring(vmid[(-3)]), name, status, reasons
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "GuestConfigurationResources | where name in ('WindowsPendingReboot') | project id, name, resources = properties.latestAssignmentReport.resources, vmid = split(properties.targetResourceId,'/'), status = tostring(properties.complianceStatus) | extend resources = iff(isnull(resources[0]), dynamic([{}]), resources) | mvexpand resources | extend reasons = resources.reasons | extend reasons = iff(isnull(reasons[0]), dynamic([{}]), reasons) | mvexpand reasons | project id, vmid, name, status, resource = resources.resourceId, reason = reasons.phrase | summarize name = any(name), status = any(status), vmid = any(vmid), resources = make_list_if(resource, isnotnull(resource)), reasons = make_list_if(reason, isnotnull(reason)) by id = tolower(id) | project id, machine = tostring(vmid[(-1)]), type = tostring(vmid[(-3)]), name, status, reasons"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "GuestConfigurationResources | where name in ('WindowsPendingReboot') | project id, name, resources = properties.latestAssignmentReport.resources, vmid = split(properties.targetResourceId,'/'), status = tostring(properties.complianceStatus) | extend resources = iff(isnull(resources[0]), dynamic([{}]), resources) | mvexpand resources | extend reasons = resources.reasons | extend reasons = iff(isnull(reasons[0]), dynamic([{}]), reasons) | mvexpand reasons | project id, vmid, name, status, resource = resources.resourceId, reason = reasons.phrase | summarize name = any(name), status = any(status), vmid = any(vmid), resources = make_list_if(resource, isnotnull(resource)), reasons = make_list_if(reason, isnotnull(reason)) by id = tolower(id) | project id, machine = tostring(vmid[(-1)]), type = tostring(vmid[(-3)]), name, status, reasons"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/GuestConfigurationResources%0a%7c%20where%20name%20in%20(%27WindowsPendingReboot%27)%0a%7c%20project%20id%2c%20name%2c%20resources%20%3d%20properties.latestAssignmentReport.resources%2c%20vmid%20%3d%20split(properties.targetResourceId%2c%27%2f%27)%2c%20status%20%3d%20tostring(properties.complianceStatus)%0a%7c%20extend%20resources%20%3d%20iff(isnull(resources%5b0%5d)%2c%20dynamic(%5b%7b%7d%5d)%2c%20resources)%0a%7c%20mvexpand%20resources%0a%7c%20extend%20reasons%20%3d%20resources.reasons%0a%7c%20extend%20reasons%20%3d%20iff(isnull(reasons%5b0%5d)%2c%20dynamic(%5b%7b%7d%5d)%2c%20reasons)%0a%7c%20mvexpand%20reasons%0a%7c%20project%20id%2c%20vmid%2c%20name%2c%20status%2c%20resource%20%3d%20resources.resourceId%2c%20reason%20%3d%20reasons.phrase%0a%7c%20summarize%20name%20%3d%20any(name)%2c%20status%20%3d%20any(status)%2c%20vmid%20%3d%20any(vmid)%2c%20resources%20%3d%20make_list_if(resource%2c%20isnotnull(resource))%2c%20reasons%20%3d%20make_list_if(reason%2c%20isnotnull(reason))%20by%20id%20%3d%20tolower(id)%0a%7c%20project%20id%2c%20machine%20%3d%20tostring(vmid%5b(-1)%5d)%2c%20type%20%3d%20tostring(vmid%5b(-3)%5d)%2c%20name%2c%20status%2c%20reasons" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/GuestConfigurationResources%0a%7c%20where%20name%20in%20(%27WindowsPendingReboot%27)%0a%7c%20project%20id%2c%20name%2c%20resources%20%3d%20properties.latestAssignmentReport.resources%2c%20vmid%20%3d%20split(properties.targetResourceId%2c%27%2f%27)%2c%20status%20%3d%20tostring(properties.complianceStatus)%0a%7c%20extend%20resources%20%3d%20iff(isnull(resources%5b0%5d)%2c%20dynamic(%5b%7b%7d%5d)%2c%20resources)%0a%7c%20mvexpand%20resources%0a%7c%20extend%20reasons%20%3d%20resources.reasons%0a%7c%20extend%20reasons%20%3d%20iff(isnull(reasons%5b0%5d)%2c%20dynamic(%5b%7b%7d%5d)%2c%20reasons)%0a%7c%20mvexpand%20reasons%0a%7c%20project%20id%2c%20vmid%2c%20name%2c%20status%2c%20resource%20%3d%20resources.resourceId%2c%20reason%20%3d%20reasons.phrase%0a%7c%20summarize%20name%20%3d%20any(name)%2c%20status%20%3d%20any(status)%2c%20vmid%20%3d%20any(vmid)%2c%20resources%20%3d%20make_list_if(resource%2c%20isnotnull(resource))%2c%20reasons%20%3d%20make_list_if(reason%2c%20isnotnull(reason))%20by%20id%20%3d%20tolower(id)%0a%7c%20project%20id%2c%20machine%20%3d%20tostring(vmid%5b(-1)%5d)%2c%20type%20%3d%20tostring(vmid%5b(-3)%5d)%2c%20name%2c%20status%2c%20reasons" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/GuestConfigurationResources%0a%7c%20where%20name%20in%20(%27WindowsPendingReboot%27)%0a%7c%20project%20id%2c%20name%2c%20resources%20%3d%20properties.latestAssignmentReport.resources%2c%20vmid%20%3d%20split(properties.targetResourceId%2c%27%2f%27)%2c%20status%20%3d%20tostring(properties.complianceStatus)%0a%7c%20extend%20resources%20%3d%20iff(isnull(resources%5b0%5d)%2c%20dynamic(%5b%7b%7d%5d)%2c%20resources)%0a%7c%20mvexpand%20resources%0a%7c%20extend%20reasons%20%3d%20resources.reasons%0a%7c%20extend%20reasons%20%3d%20iff(isnull(reasons%5b0%5d)%2c%20dynamic(%5b%7b%7d%5d)%2c%20reasons)%0a%7c%20mvexpand%20reasons%0a%7c%20project%20id%2c%20vmid%2c%20name%2c%20status%2c%20resource%20%3d%20resources.resourceId%2c%20reason%20%3d%20reasons.phrase%0a%7c%20summarize%20name%20%3d%20any(name)%2c%20status%20%3d%20any(status)%2c%20vmid%20%3d%20any(vmid)%2c%20resources%20%3d%20make_list_if(resource%2c%20isnotnull(resource))%2c%20reasons%20%3d%20make_list_if(reason%2c%20isnotnull(reason))%20by%20id%20%3d%20tolower(id)%0a%7c%20project%20id%2c%20machine%20%3d%20tostring(vmid%5b(-1)%5d)%2c%20type%20%3d%20tostring(vmid%5b(-3)%5d)%2c%20name%2c%20status%2c%20reasons" target="_blank">portal.azure.cn</a>

---

### List machines that are not running and the last compliance status

Provides a list of machines that aren't powered on with their configuration assignments and the last reported compliance status.

```kusto
Resources
| where type =~ 'Microsoft.Compute/virtualMachines'
| where properties.extended.instanceView.powerState.code != 'PowerState/running'
| project vmName = name, power = properties.extended.instanceView.powerState.code
| join kind = leftouter (GuestConfigurationResources
  | extend vmName = tostring(split(properties.targetResourceId,'/')[(-1)])
  | project vmName, name, compliance = properties.complianceStatus) on vmName | project-away vmName1
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type =~ 'Microsoft.Compute/virtualMachines' | where properties.extended.instanceView.powerState.code != 'PowerState/running' | project vmName = name, power = properties.extended.instanceView.powerState.code | join kind = leftouter (GuestConfigurationResources | extend vmName = tostring(split(properties.targetResourceId,'/')[(-1)]) | project vmName, name, compliance = properties.complianceStatus) on vmName | project-away vmName1"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type =~ 'Microsoft.Compute/virtualMachines' | where properties.extended.instanceView.powerState.code != 'PowerState/running' | project vmName = name, power = properties.extended.instanceView.powerState.code | join kind = leftouter (GuestConfigurationResources | extend vmName = tostring(split(properties.targetResourceId,'/')[(-1)]) | project vmName, name, compliance = properties.complianceStatus) on vmName | project-away vmName1"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.Compute%2fvirtualMachines%27%0a%7c%20where%20properties.extended.instanceView.powerState.code%20!%3d%20%27PowerState%2frunning%27%0a%7c%20project%20vmName%20%3d%20name%2c%20power%20%3d%20properties.extended.instanceView.powerState.code%0a%7c%20join%20kind%20%3d%20leftouter%20(GuestConfigurationResources%0a%09%7c%20extend%20vmName%20%3d%20tostring(split(properties.targetResourceId%2c%27%2f%27)%5b(-1)%5d)%0a%09%7c%20project%20vmName%2c%20name%2c%20compliance%20%3d%20properties.complianceStatus)%20on%20vmName%20%7c%20project-away%20vmName1" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.Compute%2fvirtualMachines%27%0a%7c%20where%20properties.extended.instanceView.powerState.code%20!%3d%20%27PowerState%2frunning%27%0a%7c%20project%20vmName%20%3d%20name%2c%20power%20%3d%20properties.extended.instanceView.powerState.code%0a%7c%20join%20kind%20%3d%20leftouter%20(GuestConfigurationResources%0a%09%7c%20extend%20vmName%20%3d%20tostring(split(properties.targetResourceId%2c%27%2f%27)%5b(-1)%5d)%0a%09%7c%20project%20vmName%2c%20name%2c%20compliance%20%3d%20properties.complianceStatus)%20on%20vmName%20%7c%20project-away%20vmName1" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.Compute%2fvirtualMachines%27%0a%7c%20where%20properties.extended.instanceView.powerState.code%20!%3d%20%27PowerState%2frunning%27%0a%7c%20project%20vmName%20%3d%20name%2c%20power%20%3d%20properties.extended.instanceView.powerState.code%0a%7c%20join%20kind%20%3d%20leftouter%20(GuestConfigurationResources%0a%09%7c%20extend%20vmName%20%3d%20tostring(split(properties.targetResourceId%2c%27%2f%27)%5b(-1)%5d)%0a%09%7c%20project%20vmName%2c%20name%2c%20compliance%20%3d%20properties.complianceStatus)%20on%20vmName%20%7c%20project-away%20vmName1" target="_blank">portal.azure.cn</a>

---

### Query details of guest configuration assignment reports

Display report from [guest configuration assignment reason](https://learn.microsoft.com/azure/governance/policy/how-to/determine-non-compliance#compliance-details-for-guest-configuration) details. In the following example, the query returns only results where the Guest Assignment name is `installed_application_linux` and the output contains the string `Chrome` to list all Linux machines where a package is installed that includes the name **Chrome**.

```kusto
GuestConfigurationResources
| where name in ('installed_application_linux')
| project id, name, resources = properties.latestAssignmentReport.resources, vmid = split(properties.targetResourceId,'/')[(-1)], status = tostring(properties.complianceStatus)
| extend resources = iff(isnull(resources[0]), dynamic([{}]), resources)
| mvexpand resources
| extend reasons = resources.reasons
| extend reasons = iff(isnull(reasons[0]), dynamic([{}]), reasons)
| mvexpand reasons
| where reasons.phrase contains 'chrome'
| project id, vmid, name, status, resource = resources.resourceId, reason = reasons.phrase
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "GuestConfigurationResources | where name in ('installed_application_linux') | project id, name, resources = properties.latestAssignmentReport.resources, vmid = split(properties.targetResourceId,'/')[(-1)], status = tostring(properties.complianceStatus) | extend resources = iff(isnull(resources[0]), dynamic([{}]), resources) | mvexpand resources | extend reasons = resources.reasons | extend reasons = iff(isnull(reasons[0]), dynamic([{}]), reasons) | mvexpand reasons | where reasons.phrase contains 'chrome' | project id, vmid, name, status, resource = resources.resourceId, reason = reasons.phrase"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "GuestConfigurationResources | where name in ('installed_application_linux') | project id, name, resources = properties.latestAssignmentReport.resources, vmid = split(properties.targetResourceId,'/')[(-1)], status = tostring(properties.complianceStatus) | extend resources = iff(isnull(resources[0]), dynamic([{}]), resources) | mvexpand resources | extend reasons = resources.reasons | extend reasons = iff(isnull(reasons[0]), dynamic([{}]), reasons) | mvexpand reasons | where reasons.phrase contains 'chrome' | project id, vmid, name, status, resource = resources.resourceId, reason = reasons.phrase"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/GuestConfigurationResources%0a%7c%20where%20name%20in%20(%27installed_application_linux%27)%0a%7c%20project%20id%2c%20name%2c%20resources%20%3d%20properties.latestAssignmentReport.resources%2c%20vmid%20%3d%20split(properties.targetResourceId%2c%27%2f%27)%5b(-1)%5d%2c%20status%20%3d%20tostring(properties.complianceStatus)%0a%7c%20extend%20resources%20%3d%20iff(isnull(resources%5b0%5d)%2c%20dynamic(%5b%7b%7d%5d)%2c%20resources)%0a%7c%20mvexpand%20resources%0a%7c%20extend%20reasons%20%3d%20resources.reasons%0a%7c%20extend%20reasons%20%3d%20iff(isnull(reasons%5b0%5d)%2c%20dynamic(%5b%7b%7d%5d)%2c%20reasons)%0a%7c%20mvexpand%20reasons%0a%7c%20where%20reasons.phrase%20contains%20%27chrome%27%0a%7c%20project%20id%2c%20vmid%2c%20name%2c%20status%2c%20resource%20%3d%20resources.resourceId%2c%20reason%20%3d%20reasons.phrase" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/GuestConfigurationResources%0a%7c%20where%20name%20in%20(%27installed_application_linux%27)%0a%7c%20project%20id%2c%20name%2c%20resources%20%3d%20properties.latestAssignmentReport.resources%2c%20vmid%20%3d%20split(properties.targetResourceId%2c%27%2f%27)%5b(-1)%5d%2c%20status%20%3d%20tostring(properties.complianceStatus)%0a%7c%20extend%20resources%20%3d%20iff(isnull(resources%5b0%5d)%2c%20dynamic(%5b%7b%7d%5d)%2c%20resources)%0a%7c%20mvexpand%20resources%0a%7c%20extend%20reasons%20%3d%20resources.reasons%0a%7c%20extend%20reasons%20%3d%20iff(isnull(reasons%5b0%5d)%2c%20dynamic(%5b%7b%7d%5d)%2c%20reasons)%0a%7c%20mvexpand%20reasons%0a%7c%20where%20reasons.phrase%20contains%20%27chrome%27%0a%7c%20project%20id%2c%20vmid%2c%20name%2c%20status%2c%20resource%20%3d%20resources.resourceId%2c%20reason%20%3d%20reasons.phrase" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/GuestConfigurationResources%0a%7c%20where%20name%20in%20(%27installed_application_linux%27)%0a%7c%20project%20id%2c%20name%2c%20resources%20%3d%20properties.latestAssignmentReport.resources%2c%20vmid%20%3d%20split(properties.targetResourceId%2c%27%2f%27)%5b(-1)%5d%2c%20status%20%3d%20tostring(properties.complianceStatus)%0a%7c%20extend%20resources%20%3d%20iff(isnull(resources%5b0%5d)%2c%20dynamic(%5b%7b%7d%5d)%2c%20resources)%0a%7c%20mvexpand%20resources%0a%7c%20extend%20reasons%20%3d%20resources.reasons%0a%7c%20extend%20reasons%20%3d%20iff(isnull(reasons%5b0%5d)%2c%20dynamic(%5b%7b%7d%5d)%2c%20reasons)%0a%7c%20mvexpand%20reasons%0a%7c%20where%20reasons.phrase%20contains%20%27chrome%27%0a%7c%20project%20id%2c%20vmid%2c%20name%2c%20status%2c%20resource%20%3d%20resources.resourceId%2c%20reason%20%3d%20reasons.phrase" target="_blank">portal.azure.cn</a>

---


## Azure RBAC


### Troubleshoot Azure RBAC limits

The `authorizationresources` table can be used to troubleshoot Azure role-based access control (Azure RBAC) if you exceed limits. For more information, go to [Troubleshoot Azure RBAC limits](https://learn.microsoft.com/azure/role-based-access-control/troubleshoot-limits).



### Get role assignments with key properties

Provides a sample of [role assignments](https://learn.microsoft.com/azure/role-based-access-control/role-assignments) and some of the resources relevant properties.

```kusto
authorizationresources
| where type =~ 'microsoft.authorization/roleassignments'
| extend roleDefinitionId = properties.roleDefinitionId
| extend principalType = properties.principalType
| extend principalId = properties.principalId
| extend scope = properties.scope
| take 5
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "authorizationresources | where type =~ 'microsoft.authorization/roleassignments' | extend roleDefinitionId = properties.roleDefinitionId | extend principalType = properties.principalType | extend principalId = properties.principalId | extend scope = properties.scope | take 5"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "authorizationresources | where type =~ 'microsoft.authorization/roleassignments' | extend roleDefinitionId = properties.roleDefinitionId | extend principalType = properties.principalType | extend principalId = properties.principalId | extend scope = properties.scope | take 5"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/authorizationresources%0A%7C%20where%20type%20%3D~%20%27microsoft.authorization%2Froleassignments%27%0A%7C%20extend%20roleDefinitionId%20%3D%20properties.roleDefinitionId%0A%7C%20extend%20principalType%20%3D%20properties.principalType%0A%7C%20extend%20principalId%20%3D%20properties.principalId%0A%7C%20extend%20scope%20%3D%20properties.scope%0A%7C%20take%205" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/authorizationresources%0A%7C%20where%20type%20%3D~%20%27microsoft.authorization%2Froleassignments%27%0A%7C%20extend%20roleDefinitionId%20%3D%20properties.roleDefinitionId%0A%7C%20extend%20principalType%20%3D%20properties.principalType%0A%7C%20extend%20principalId%20%3D%20properties.principalId%0A%7C%20extend%20scope%20%3D%20properties.scope%0A%7C%20take%205" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/authorizationresources%0A%7C%20where%20type%20%3D~%20%27microsoft.authorization%2Froleassignments%27%0A%7C%20extend%20roleDefinitionId%20%3D%20properties.roleDefinitionId%0A%7C%20extend%20principalType%20%3D%20properties.principalType%0A%7C%20extend%20principalId%20%3D%20properties.principalId%0A%7C%20extend%20scope%20%3D%20properties.scope%0A%7C%20take%205" target="_blank">portal.azure.cn</a>

---



### Get role definitions with key properties

Provides a sample of [role definitions](https://learn.microsoft.com/azure/role-based-access-control/role-definitions) and some of the resources relevant properties.

```kusto
authorizationresources
| where type =~ 'microsoft.authorization/roledefinitions'
| extend assignableScopes = properties.assignableScopes
| extend permissionsList = properties.permissions
| extend isServiceRole = properties.isServiceRole
| take 5
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "authorizationresources | where type =~ 'microsoft.authorization/roledefinitions' | extend assignableScopes = properties.assignableScopes | extend permissionsList = properties.permissions | extend isServiceRole = properties.isServiceRole | take 5"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "authorizationresources | where type =~ 'microsoft.authorization/roledefinitions' | extend assignableScopes = properties.assignableScopes | extend permissionsList = properties.permissions | extend isServiceRole = properties.isServiceRole | take 5"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/authorizationresources%0A%7C%20where%20type%20%3D~%20%27microsoft.authorization%2Froledefinitions%27%0A%7C%20extend%20assignableScopes%20%3D%20properties.assignableScopes%0A%7C%20extend%20permissionsList%20%3D%20properties.permissions%0A%7C%20extend%20isServiceRole%20%3D%20properties.isServiceRole%0A%7C%20take%205" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/authorizationresources%0A%7C%20where%20type%20%3D~%20%27microsoft.authorization%2Froledefinitions%27%0A%7C%20extend%20assignableScopes%20%3D%20properties.assignableScopes%0A%7C%20extend%20permissionsList%20%3D%20properties.permissions%0A%7C%20extend%20isServiceRole%20%3D%20properties.isServiceRole%0A%7C%20take%205" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/authorizationresources%0A%7C%20where%20type%20%3D~%20%27microsoft.authorization%2Froledefinitions%27%0A%7C%20extend%20assignableScopes%20%3D%20properties.assignableScopes%0A%7C%20extend%20permissionsList%20%3D%20properties.permissions%0A%7C%20extend%20isServiceRole%20%3D%20properties.isServiceRole%0A%7C%20take%205" target="_blank">portal.azure.cn</a>

---



### Get role definitions with actions

Displays a sample of [role definitions](https://learn.microsoft.com/azure/role-based-access-control/role-definitions) with an expanded list of actions and not actions for each role definition's permissions list.

```kusto
authorizationresources
| where type =~ 'microsoft.authorization/roledefinitions'
| extend assignableScopes = properties.assignableScopes
| extend permissionsList = properties.permissions
| extend isServiceRole = properties.isServiceRole
| mv-expand permissionsList
| extend Actions = permissionsList.Actions
| extend notActions = permissionsList.notActions
| extend DataActions = permissionsList.DataActions
| extend notDataActions = permissionsList.notDataActions
| take 5
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "authorizationresources | where type =~ 'microsoft.authorization/roledefinitions' | extend assignableScopes = properties.assignableScopes | extend permissionsList = properties.permissions | extend isServiceRole = properties.isServiceRole | mv-expand permissionsList | extend Actions = permissionsList.Actions | extend notActions = permissionsList.notActions | extend DataActions = permissionsList.DataActions | extend notDataActions = permissionsList.notDataActions | take 5"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "authorizationresources | where type =~ 'microsoft.authorization/roledefinitions' | extend assignableScopes = properties.assignableScopes | extend permissionsList = properties.permissions | extend isServiceRole = properties.isServiceRole | mv-expand permissionsList | extend Actions = permissionsList.Actions | extend notActions = permissionsList.notActions | extend DataActions = permissionsList.DataActions | extend notDataActions = permissionsList.notDataActions | take 5"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/authorizationresources%0A%7C%20where%20type%20%3D~%20%27microsoft.authorization%2Froledefinitions%27%0A%7C%20extend%20assignableScopes%20%3D%20properties.assignableScopes%0A%7C%20extend%20permissionsList%20%3D%20properties.permissions%0A%7C%20extend%20isServiceRole%20%3D%20properties.isServiceRole%0A%7C%20mv-expand%20permissionsList%0A%7C%20extend%20Actions%20%3D%20permissionsList.Actions%0A%7C%20extend%20notActions%20%3D%20permissionsList.notActions%0A%7C%20extend%20DataActions%20%3D%20permissionsList.DataActions%0A%7C%20extend%20notDataActions%20%3D%20permissionsList.notDataActions%0A%7C%20take%205" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/authorizationresources%0A%7C%20where%20type%20%3D~%20%27microsoft.authorization%2Froledefinitions%27%0A%7C%20extend%20assignableScopes%20%3D%20properties.assignableScopes%0A%7C%20extend%20permissionsList%20%3D%20properties.permissions%0A%7C%20extend%20isServiceRole%20%3D%20properties.isServiceRole%0A%7C%20mv-expand%20permissionsList%0A%7C%20extend%20Actions%20%3D%20permissionsList.Actions%0A%7C%20extend%20notActions%20%3D%20permissionsList.notActions%0A%7C%20extend%20DataActions%20%3D%20permissionsList.DataActions%0A%7C%20extend%20notDataActions%20%3D%20permissionsList.notDataActions%0A%7C%20take%205" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/authorizationresources%0A%7C%20where%20type%20%3D~%20%27microsoft.authorization%2Froledefinitions%27%0A%7C%20extend%20assignableScopes%20%3D%20properties.assignableScopes%0A%7C%20extend%20permissionsList%20%3D%20properties.permissions%0A%7C%20extend%20isServiceRole%20%3D%20properties.isServiceRole%0A%7C%20mv-expand%20permissionsList%0A%7C%20extend%20Actions%20%3D%20permissionsList.Actions%0A%7C%20extend%20notActions%20%3D%20permissionsList.notActions%0A%7C%20extend%20DataActions%20%3D%20permissionsList.DataActions%0A%7C%20extend%20notDataActions%20%3D%20permissionsList.notDataActions%0A%7C%20take%205" target="_blank">portal.azure.cn</a>

---



### Get role definitions with permissions listed out

Displays a summary of the `Actions` and `notActions` for each unique role definition.

```kusto
authorizationresources
| where type =~ 'microsoft.authorization/roledefinitions'
| extend assignableScopes = properties.assignableScopes
| extend permissionsList = properties.permissions
| extend isServiceRole = properties.isServiceRole
| mv-expand permissionsList
| extend Actions = permissionsList.Actions
| extend notActions = permissionsList.notActions
| extend DataActions = permissionsList.DataActions
| extend notDataActions = permissionsList.notDataActions
| summarize make_set(Actions), make_set(notActions), make_set(DataActions), make_set(notDataActions), any(assignableScopes, isServiceRole) by id
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "authorizationresources | where type =~ 'microsoft.authorization/roledefinitions' | extend assignableScopes = properties.assignableScopes | extend permissionsList = properties.permissions | extend isServiceRole = properties.isServiceRole | mv-expand permissionsList | extend Actions = permissionsList.Actions | extend notActions = permissionsList.notActions | extend DataActions = permissionsList.DataActions | extend notDataActions = permissionsList.notDataActions | summarize make_set(Actions), make_set(notActions), make_set(DataActions), make_set(notDataActions), any(assignableScopes, isServiceRole) by id"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "authorizationresources | where type =~ 'microsoft.authorization/roledefinitions' | extend assignableScopes = properties.assignableScopes | extend permissionsList = properties.permissions | extend isServiceRole = properties.isServiceRole | mv-expand permissionsList | extend Actions = permissionsList.Actions | extend notActions = permissionsList.notActions | extend DataActions = permissionsList.DataActions | extend notDataActions = permissionsList.notDataActions | summarize make_set(Actions), make_set(notActions), make_set(DataActions), make_set(notDataActions), any(assignableScopes, isServiceRole) by id"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/authorizationresources%0A%7C%20where%20type%20%3D~%20%27microsoft.authorization%2Froledefinitions%27%0A%7C%20extend%20assignableScopes%20%3D%20properties.assignableScopes%0A%7C%20extend%20permissionsList%20%3D%20properties.permissions%0A%7C%20extend%20isServiceRole%20%3D%20properties.isServiceRole%0A%7C%20mv-expand%20permissionsList%0A%7C%20extend%20Actions%20%3D%20permissionsList.Actions%0A%7C%20extend%20notActions%20%3D%20permissionsList.notActions%0A%7C%20extend%20DataActions%20%3D%20permissionsList.DataActions%0A%7C%20extend%20notDataActions%20%3D%20permissionsList.notDataActions%0A%7C%20summarize%20make_set%28Actions%29%2C%20make_set%28notActions%29%2C%20make_set%28DataActions%29%2C%20make_set%28notDataActions%29%2C%20any%28assignableScopes%2C%20isServiceRole%29%20by%20id" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/authorizationresources%0A%7C%20where%20type%20%3D~%20%27microsoft.authorization%2Froledefinitions%27%0A%7C%20extend%20assignableScopes%20%3D%20properties.assignableScopes%0A%7C%20extend%20permissionsList%20%3D%20properties.permissions%0A%7C%20extend%20isServiceRole%20%3D%20properties.isServiceRole%0A%7C%20mv-expand%20permissionsList%0A%7C%20extend%20Actions%20%3D%20permissionsList.Actions%0A%7C%20extend%20notActions%20%3D%20permissionsList.notActions%0A%7C%20extend%20DataActions%20%3D%20permissionsList.DataActions%0A%7C%20extend%20notDataActions%20%3D%20permissionsList.notDataActions%0A%7C%20summarize%20make_set%28Actions%29%2C%20make_set%28notActions%29%2C%20make_set%28DataActions%29%2C%20make_set%28notDataActions%29%2C%20any%28assignableScopes%2C%20isServiceRole%29%20by%20id" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/authorizationresources%0A%7C%20where%20type%20%3D~%20%27microsoft.authorization%2Froledefinitions%27%0A%7C%20extend%20assignableScopes%20%3D%20properties.assignableScopes%0A%7C%20extend%20permissionsList%20%3D%20properties.permissions%0A%7C%20extend%20isServiceRole%20%3D%20properties.isServiceRole%0A%7C%20mv-expand%20permissionsList%0A%7C%20extend%20Actions%20%3D%20permissionsList.Actions%0A%7C%20extend%20notActions%20%3D%20permissionsList.notActions%0A%7C%20extend%20DataActions%20%3D%20permissionsList.DataActions%0A%7C%20extend%20notDataActions%20%3D%20permissionsList.notDataActions%0A%7C%20summarize%20make_set%28Actions%29%2C%20make_set%28notActions%29%2C%20make_set%28DataActions%29%2C%20make_set%28notDataActions%29%2C%20any%28assignableScopes%2C%20isServiceRole%29%20by%20id" target="_blank">portal.azure.cn</a>

---



### Get classic administrators with key properties

Provides a sample of [classic administrators](https://learn.microsoft.com/azure/role-based-access-control/classic-administrators) and some of the resources relevant properties.

```kusto
authorizationresources
| where type =~ 'microsoft.authorization/classicadministrators'
| extend state = properties.adminState
| extend roles = split(properties.role, ';')
| take 5
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "authorizationresources | where type =~ 'microsoft.authorization/classicadministrators' | extend state = properties.adminState | extend roles = split(properties.role, ';') | take 5"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "authorizationresources | where type =~ 'microsoft.authorization/classicadministrators' | extend state = properties.adminState | extend roles = split(properties.role, ';') | take 5"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/authorizationresources%0A%7C%20where%20type%20%3D~%20%27microsoft.authorization%2Fclassicadministrators%27%0A%7C%20extend%20state%20%3D%20properties.adminState%0A%7C%20extend%20roles%20%3D%20split%28properties.role%2C%20%27%3B%27%29%0A%7C%20take%205" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/authorizationresources%0A%7C%20where%20type%20%3D~%20%27microsoft.authorization%2Fclassicadministrators%27%0A%7C%20extend%20state%20%3D%20properties.adminState%0A%7C%20extend%20roles%20%3D%20split%28properties.role%2C%20%27%3B%27%29%0A%7C%20take%205" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/authorizationresources%0A%7C%20where%20type%20%3D~%20%27microsoft.authorization%2Fclassicadministrators%27%0A%7C%20extend%20state%20%3D%20properties.adminState%0A%7C%20extend%20roles%20%3D%20split%28properties.role%2C%20%27%3B%27%29%0A%7C%20take%205" target="_blank">portal.azure.cn</a>

---


## Azure Service Health

### Active Service Health event subscription impact

Returns all active Service Health events - including service issues, planned maintenance, health advisories, and security advisories – grouped by event type and including count of impacted subscriptions.

```kusto
ServiceHealthResources
| where type =~ 'Microsoft.ResourceHealth/events'
| extend eventType = tostring(properties.EventType), status = properties.Status, description = properties.Title, trackingId = properties.TrackingId, summary = properties.Summary, priority = properties.Priority, impactStartTime = properties.ImpactStartTime, impactMitigationTime = properties.ImpactMitigationTime
| where eventType == 'ServiceIssue' and status == 'Active'
| summarize count(subscriptionId) by name
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "ServiceHealthResources | where type =~ 'Microsoft.ResourceHealth/events' | extend eventType = tostring(properties.EventType), status = properties.Status, description = properties.Title, trackingId = properties.TrackingId, summary = properties.Summary, priority = properties.Priority, impactStartTime = properties.ImpactStartTime, impactMitigationTime = properties.ImpactMitigationTime | where eventType == 'ServiceIssue' and status == 'Active' | summarize count(subscriptionId) by name"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "ServiceHealthResources | where type =~ 'Microsoft.ResourceHealth/events' | extend eventType = tostring(properties.EventType), status = properties.Status, description = properties.Title, trackingId = properties.TrackingId, summary = properties.Summary, priority = properties.Priority, impactStartTime = properties.ImpactStartTime, impactMitigationTime = properties.ImpactMitigationTime | where eventType == 'ServiceIssue' and status == 'Active' | summarize count(subscriptionId) by name"
```

# [Portal](#tab/azure-portal)

- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/ServiceHealthResources%0D%0A%7C%20where%20type%20%3D~%20%27Microsoft.ResourceHealth%2Fevents%27%0D%0A%7C%20extend%20eventType%20%3D%20tostring%28properties.EventType%29%2C%20status%20%3D%20properties.Status%2C%20description%20%3D%20properties.Title%2C%20trackingId%20%3D%20properties.TrackingId%2C%20summary%20%3D%20properties.Summary%2C%20priority%20%3D%20properties.Priority%2C%20impactStartTime%20%3D%20properties.ImpactStartTime%2C%20impactMitigationTime%20%3D%20properties.ImpactMitigationTime%0D%0A%7C%20where%20eventType%20%3D%3D%20%27ServiceIssue%27%20and%20status%20%3D%3D%20%27Active%27%0D%0A%7C%20summarize%20count%28subscriptionId%29%20by%20name" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/ServiceHealthResources%0D%0A%7C%20where%20type%20%3D~%20%27Microsoft.ResourceHealth%2Fevents%27%0D%0A%7C%20extend%20eventType%20%3D%20tostring%28properties.EventType%29%2C%20status%20%3D%20properties.Status%2C%20description%20%3D%20properties.Title%2C%20trackingId%20%3D%20properties.TrackingId%2C%20summary%20%3D%20properties.Summary%2C%20priority%20%3D%20properties.Priority%2C%20impactStartTime%20%3D%20properties.ImpactStartTime%2C%20impactMitigationTime%20%3D%20properties.ImpactMitigationTime%0D%0A%7C%20where%20eventType%20%3D%3D%20%27ServiceIssue%27%20and%20status%20%3D%3D%20%27Active%27%0D%0A%7C%20summarize%20count%28subscriptionId%29%20by%20name" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/ServiceHealthResources%0D%0A%7C%20where%20type%20%3D~%20%27Microsoft.ResourceHealth%2Fevents%27%0D%0A%7C%20extend%20eventType%20%3D%20tostring%28properties.EventType%29%2C%20status%20%3D%20properties.Status%2C%20description%20%3D%20properties.Title%2C%20trackingId%20%3D%20properties.TrackingId%2C%20summary%20%3D%20properties.Summary%2C%20priority%20%3D%20properties.Priority%2C%20impactStartTime%20%3D%20properties.ImpactStartTime%2C%20impactMitigationTime%20%3D%20properties.ImpactMitigationTime%0D%0A%7C%20where%20eventType%20%3D%3D%20%27ServiceIssue%27%20and%20status%20%3D%3D%20%27Active%27%0D%0A%7C%20summarize%20count%28subscriptionId%29%20by%20name" target="_blank">portal.azure.cn</a>

---

### All active health advisory events

Returns all active health advisory Service Health events across all subscriptions to which the user has access.

```kusto
ServiceHealthResources
| where type =~ 'Microsoft.ResourceHealth/events'
| extend eventType = properties.EventType, status = properties.Status, description = properties.Title, trackingId = properties.TrackingId, summary = properties.Summary, priority = properties.Priority, impactStartTime = properties.ImpactStartTime, impactMitigationTime = todatetime(tolong(properties.ImpactMitigationTime))
| where eventType == 'HealthAdvisory' and impactMitigationTime > now()
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "ServiceHealthResources | where type =~ 'Microsoft.ResourceHealth/events' | extend eventType = properties.EventType, status = properties.Status, description = properties.Title, trackingId = properties.TrackingId, summary = properties.Summary, priority = properties.Priority, impactStartTime = properties.ImpactStartTime, impactMitigationTime = todatetime(tolong(properties.ImpactMitigationTime)) | where eventType == 'HealthAdvisory' and impactMitigationTime > now()"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "ServiceHealthResources | where type =~ 'Microsoft.ResourceHealth/events' | extend eventType = properties.EventType, status = properties.Status, description = properties.Title, trackingId = properties.TrackingId, summary = properties.Summary, priority = properties.Priority, impactStartTime = properties.ImpactStartTime, impactMitigationTime = todatetime(tolong(properties.ImpactMitigationTime)) | where eventType == 'HealthAdvisory' and impactMitigationTime > now()"
```

# [Portal](#tab/azure-portal)

- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/ServiceHealthResources%0D%0A%7C%20where%20type%20%3D~%20%27Microsoft.ResourceHealth%2Fevents%27%0D%0A%7C%20extend%20eventType%20%3D%20properties.EventType%2C%20status%20%3D%20properties.Status%2C%20description%20%3D%20properties.Title%2C%20trackingId%20%3D%20properties.TrackingId%2C%20summary%20%3D%20properties.Summary%2C%20priority%20%3D%20properties.Priority%2C%20impactStartTime%20%3D%20properties.ImpactStartTime%2C%20impactMitigationTime%20%3D%20todatetime%28tolong%28properties.ImpactMitigationTime%29%29%0D%0A%7C%20where%20eventType%20%3D%3D%20%27HealthAdvisory%27%20and%20impactMitigationTime%20%3E%20now%28%29" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/ServiceHealthResources%0D%0A%7C%20where%20type%20%3D~%20%27Microsoft.ResourceHealth%2Fevents%27%0D%0A%7C%20extend%20eventType%20%3D%20properties.EventType%2C%20status%20%3D%20properties.Status%2C%20description%20%3D%20properties.Title%2C%20trackingId%20%3D%20properties.TrackingId%2C%20summary%20%3D%20properties.Summary%2C%20priority%20%3D%20properties.Priority%2C%20impactStartTime%20%3D%20properties.ImpactStartTime%2C%20impactMitigationTime%20%3D%20todatetime%28tolong%28properties.ImpactMitigationTime%29%29%0D%0A%7C%20where%20eventType%20%3D%3D%20%27HealthAdvisory%27%20and%20impactMitigationTime%20%3E%20now%28%29" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/ServiceHealthResources%0D%0A%7C%20where%20type%20%3D~%20%27Microsoft.ResourceHealth%2Fevents%27%0D%0A%7C%20extend%20eventType%20%3D%20properties.EventType%2C%20status%20%3D%20properties.Status%2C%20description%20%3D%20properties.Title%2C%20trackingId%20%3D%20properties.TrackingId%2C%20summary%20%3D%20properties.Summary%2C%20priority%20%3D%20properties.Priority%2C%20impactStartTime%20%3D%20properties.ImpactStartTime%2C%20impactMitigationTime%20%3D%20todatetime%28tolong%28properties.ImpactMitigationTime%29%29%0D%0A%7C%20where%20eventType%20%3D%3D%20%27HealthAdvisory%27%20and%20impactMitigationTime%20%3E%20now%28%29" target="_blank">portal.azure.cn</a>

---

### All active planned maintenance events

Returns all active planned maintenance Service Health events across all subscriptions to which the user has access.

```kusto
ServiceHealthResources
| where type =~ 'Microsoft.ResourceHealth/events'
| extend eventType = properties.EventType, status = properties.Status, description = properties.Title, trackingId = properties.TrackingId, summary = properties.Summary, priority = properties.Priority, impactStartTime = properties.ImpactStartTime, impactMitigationTime = todatetime(tolong(properties.ImpactMitigationTime))
| where eventType == 'PlannedMaintenance' and impactMitigationTime > now()
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "ServiceHealthResources | where type =~ 'Microsoft.ResourceHealth/events' | extend eventType = properties.EventType, status = properties.Status, description = properties.Title, trackingId = properties.TrackingId, summary = properties.Summary, priority = properties.Priority, impactStartTime = properties.ImpactStartTime, impactMitigationTime = todatetime(tolong(properties.ImpactMitigationTime)) | where eventType == 'PlannedMaintenance' and impactMitigationTime > now()"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "ServiceHealthResources | where type =~ 'Microsoft.ResourceHealth/events' | extend eventType = properties.EventType, status = properties.Status, description = properties.Title, trackingId = properties.TrackingId, summary = properties.Summary, priority = properties.Priority, impactStartTime = properties.ImpactStartTime, impactMitigationTime = todatetime(tolong(properties.ImpactMitigationTime)) | where eventType == 'PlannedMaintenance' and impactMitigationTime > now()"
```

# [Portal](#tab/azure-portal)

- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/ServiceHealthResources%0D%0A%7C%20where%20type%20%3D~%20%27Microsoft.ResourceHealth%2Fevents%27%0D%0A%7C%20extend%20eventType%20%3D%20properties.EventType%2C%20status%20%3D%20properties.Status%2C%20description%20%3D%20properties.Title%2C%20trackingId%20%3D%20properties.TrackingId%2C%20summary%20%3D%20properties.Summary%2C%20priority%20%3D%20properties.Priority%2C%20impactStartTime%20%3D%20properties.ImpactStartTime%2C%20impactMitigationTime%20%3D%20todatetime%28tolong%28properties.ImpactMitigationTime%29%29%0D%0A%7C%20where%20eventType%20%3D%3D%20%27PlannedMaintenance%27%20and%20impactMitigationTime%20%3E%20now%28%29" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/ServiceHealthResources%0D%0A%7C%20where%20type%20%3D~%20%27Microsoft.ResourceHealth%2Fevents%27%0D%0A%7C%20extend%20eventType%20%3D%20properties.EventType%2C%20status%20%3D%20properties.Status%2C%20description%20%3D%20properties.Title%2C%20trackingId%20%3D%20properties.TrackingId%2C%20summary%20%3D%20properties.Summary%2C%20priority%20%3D%20properties.Priority%2C%20impactStartTime%20%3D%20properties.ImpactStartTime%2C%20impactMitigationTime%20%3D%20todatetime%28tolong%28properties.ImpactMitigationTime%29%29%0D%0A%7C%20where%20eventType%20%3D%3D%20%27PlannedMaintenance%27%20and%20impactMitigationTime%20%3E%20now%28%29" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/ServiceHealthResources%0D%0A%7C%20where%20type%20%3D~%20%27Microsoft.ResourceHealth%2Fevents%27%0D%0A%7C%20extend%20eventType%20%3D%20properties.EventType%2C%20status%20%3D%20properties.Status%2C%20description%20%3D%20properties.Title%2C%20trackingId%20%3D%20properties.TrackingId%2C%20summary%20%3D%20properties.Summary%2C%20priority%20%3D%20properties.Priority%2C%20impactStartTime%20%3D%20properties.ImpactStartTime%2C%20impactMitigationTime%20%3D%20todatetime%28tolong%28properties.ImpactMitigationTime%29%29%0D%0A%7C%20where%20eventType%20%3D%3D%20%27PlannedMaintenance%27%20and%20impactMitigationTime%20%3E%20now%28%29" target="_blank">portal.azure.cn</a>

---

### All active Service Health events

Returns all active Service Health events across all subscriptions to which the user has access including service issues, planned maintenance, health advisories, and security advisories.

```kusto
ServiceHealthResources
| where type =~ 'Microsoft.ResourceHealth/events'
| extend eventType = properties.EventType, status = properties.Status, description = properties.Title, trackingId = properties.TrackingId, summary = properties.Summary, priority = properties.Priority, impactStartTime = properties.ImpactStartTime, impactMitigationTime = properties.ImpactMitigationTime
| where (eventType in ('HealthAdvisory', 'SecurityAdvisory', 'PlannedMaintenance') and impactMitigationTime > now()) or (eventType == 'ServiceIssue' and status == 'Active')
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "ServiceHealthResources | where type =~ 'Microsoft.ResourceHealth/events' | extend eventType = properties.EventType, status = properties.Status, description = properties.Title, trackingId = properties.TrackingId, summary = properties.Summary, priority = properties.Priority, impactStartTime = properties.ImpactStartTime, impactMitigationTime = properties.ImpactMitigationTime | where (eventType in ('HealthAdvisory', 'SecurityAdvisory', 'PlannedMaintenance') and impactMitigationTime > now()) or (eventType == 'ServiceIssue' and status == 'Active')"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "ServiceHealthResources | where type =~ 'Microsoft.ResourceHealth/events' | extend eventType = properties.EventType, status = properties.Status, description = properties.Title, trackingId = properties.TrackingId, summary = properties.Summary, priority = properties.Priority, impactStartTime = properties.ImpactStartTime, impactMitigationTime = properties.ImpactMitigationTime | where (eventType in ('HealthAdvisory', 'SecurityAdvisory', 'PlannedMaintenance') and impactMitigationTime > now()) or (eventType == 'ServiceIssue' and status == 'Active')"
```

# [Portal](#tab/azure-portal)

- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/ServiceHealthResources%0D%0A%7C%20where%20type%20%3D~%20%27Microsoft.ResourceHealth%2Fevents%27%0D%0A%7C%20extend%20eventType%20%3D%20properties.EventType%2C%20status%20%3D%20properties.Status%2C%20description%20%3D%20properties.Title%2C%20trackingId%20%3D%20properties.TrackingId%2C%20summary%20%3D%20properties.Summary%2C%20priority%20%3D%20properties.Priority%2C%20impactStartTime%20%3D%20properties.ImpactStartTime%2C%20impactMitigationTime%20%3D%20properties.ImpactMitigationTime%0D%0A%7C%20where%20%28eventType%20in%20%28%27HealthAdvisory%27%2C%20%27SecurityAdvisory%27%2C%20%27PlannedMaintenance%27%29%20and%20impactMitigationTime%20%3E%20now%28%29%29%20or%20%28eventType%20%3D%3D%20%27ServiceIssue%27%20and%20status%20%3D%3D%20%27Active%27%29" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/ServiceHealthResources%0D%0A%7C%20where%20type%20%3D~%20%27Microsoft.ResourceHealth%2Fevents%27%0D%0A%7C%20extend%20eventType%20%3D%20properties.EventType%2C%20status%20%3D%20properties.Status%2C%20description%20%3D%20properties.Title%2C%20trackingId%20%3D%20properties.TrackingId%2C%20summary%20%3D%20properties.Summary%2C%20priority%20%3D%20properties.Priority%2C%20impactStartTime%20%3D%20properties.ImpactStartTime%2C%20impactMitigationTime%20%3D%20properties.ImpactMitigationTime%0D%0A%7C%20where%20%28eventType%20in%20%28%27HealthAdvisory%27%2C%20%27SecurityAdvisory%27%2C%20%27PlannedMaintenance%27%29%20and%20impactMitigationTime%20%3E%20now%28%29%29%20or%20%28eventType%20%3D%3D%20%27ServiceIssue%27%20and%20status%20%3D%3D%20%27Active%27%29" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/ServiceHealthResources%0D%0A%7C%20where%20type%20%3D~%20%27Microsoft.ResourceHealth%2Fevents%27%0D%0A%7C%20extend%20eventType%20%3D%20properties.EventType%2C%20status%20%3D%20properties.Status%2C%20description%20%3D%20properties.Title%2C%20trackingId%20%3D%20properties.TrackingId%2C%20summary%20%3D%20properties.Summary%2C%20priority%20%3D%20properties.Priority%2C%20impactStartTime%20%3D%20properties.ImpactStartTime%2C%20impactMitigationTime%20%3D%20properties.ImpactMitigationTime%0D%0A%7C%20where%20%28eventType%20in%20%28%27HealthAdvisory%27%2C%20%27SecurityAdvisory%27%2C%20%27PlannedMaintenance%27%29%20and%20impactMitigationTime%20%3E%20now%28%29%29%20or%20%28eventType%20%3D%3D%20%27ServiceIssue%27%20and%20status%20%3D%3D%20%27Active%27%29" target="_blank">portal.azure.cn</a>

---

### All active service issue events

Returns all active service issue (outage) Service Health events across all subscriptions to which the user has access.

```kusto
ServiceHealthResources
| where type =~ 'Microsoft.ResourceHealth/events'
| extend eventType = properties.EventType, status = properties.Status, description = properties.Title, trackingId = properties.TrackingId, summary = properties.Summary, priority = properties.Priority, impactStartTime = properties.ImpactStartTime, impactMitigationTime = properties.ImpactMitigationTime
| where eventType == 'ServiceIssue' and status == 'Active'
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "ServiceHealthResources | where type =~ 'Microsoft.ResourceHealth/events' | extend eventType = properties.EventType, status = properties.Status, description = properties.Title, trackingId = properties.TrackingId, summary = properties.Summary, priority = properties.Priority, impactStartTime = properties.ImpactStartTime, impactMitigationTime = properties.ImpactMitigationTime | where eventType == 'ServiceIssue' and status == 'Active'"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "ServiceHealthResources | where type =~ 'Microsoft.ResourceHealth/events' | extend eventType = properties.EventType, status = properties.Status, description = properties.Title, trackingId = properties.TrackingId, summary = properties.Summary, priority = properties.Priority, impactStartTime = properties.ImpactStartTime, impactMitigationTime = properties.ImpactMitigationTime | where eventType == 'ServiceIssue' and status == 'Active'"
```

# [Portal](#tab/azure-portal)

- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/ServiceHealthResources%0D%0A%7C%20where%20type%20%3D~%20%27Microsoft.ResourceHealth%2Fevents%27%0D%0A%7C%20extend%20eventType%20%3D%20properties.EventType%2C%20status%20%3D%20properties.Status%2C%20description%20%3D%20properties.Title%2C%20trackingId%20%3D%20properties.TrackingId%2C%20summary%20%3D%20properties.Summary%2C%20priority%20%3D%20properties.Priority%2C%20impactStartTime%20%3D%20properties.ImpactStartTime%2C%20impactMitigationTime%20%3D%20properties.ImpactMitigationTime%0D%0A%7C%20where%20eventType%20%3D%3D%20%27ServiceIssue%27%20and%20status%20%3D%3D%20%27Active%27" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/ServiceHealthResources%0D%0A%7C%20where%20type%20%3D~%20%27Microsoft.ResourceHealth%2Fevents%27%0D%0A%7C%20extend%20eventType%20%3D%20properties.EventType%2C%20status%20%3D%20properties.Status%2C%20description%20%3D%20properties.Title%2C%20trackingId%20%3D%20properties.TrackingId%2C%20summary%20%3D%20properties.Summary%2C%20priority%20%3D%20properties.Priority%2C%20impactStartTime%20%3D%20properties.ImpactStartTime%2C%20impactMitigationTime%20%3D%20properties.ImpactMitigationTime%0D%0A%7C%20where%20eventType%20%3D%3D%20%27ServiceIssue%27%20and%20status%20%3D%3D%20%27Active%27" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/ServiceHealthResources%0D%0A%7C%20where%20type%20%3D~%20%27Microsoft.ResourceHealth%2Fevents%27%0D%0A%7C%20extend%20eventType%20%3D%20properties.EventType%2C%20status%20%3D%20properties.Status%2C%20description%20%3D%20properties.Title%2C%20trackingId%20%3D%20properties.TrackingId%2C%20summary%20%3D%20properties.Summary%2C%20priority%20%3D%20properties.Priority%2C%20impactStartTime%20%3D%20properties.ImpactStartTime%2C%20impactMitigationTime%20%3D%20properties.ImpactMitigationTime%0D%0A%7C%20where%20eventType%20%3D%3D%20%27ServiceIssue%27%20and%20status%20%3D%3D%20%27Active%27" target="_blank">portal.azure.cn</a>

---


## Azure SQL


### List SQL Databases and their elastic pools

The following query uses `leftouter join` to bring together SQL Database resources and their related elastic pools if any exist.

```kusto
Resources
| where type =~ 'microsoft.sql/servers/databases'
| project databaseId = id, databaseName = name, elasticPoolId = tolower(tostring(properties.elasticPoolId))
| join kind=leftouter (
	Resources
	| where type =~ 'microsoft.sql/servers/elasticpools'
	| project elasticPoolId = tolower(id), elasticPoolName = name, elasticPoolState = properties.state)
	on elasticPoolId
| project-away elasticPoolId1
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type =~ 'microsoft.sql/servers/databases' | project databaseId = id, databaseName = name, elasticPoolId = tolower(tostring(properties.elasticPoolId)) | join kind=leftouter ( Resources | where type =~ 'microsoft.sql/servers/elasticpools' | project elasticPoolId = tolower(id), elasticPoolName = name, elasticPoolState = properties.state) on elasticPoolId | project-away elasticPoolId1"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type =~ 'microsoft.sql/servers/databases' | project databaseId = id, databaseName = name, elasticPoolId = tolower(tostring(properties.elasticPoolId)) | join kind=leftouter ( Resources | where type =~ 'microsoft.sql/servers/elasticpools' | project elasticPoolId = tolower(id), elasticPoolName = name, elasticPoolState = properties.state) on elasticPoolId | project-away elasticPoolId1"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.sql%2fservers%2fdatabases%27%0a%7c%20project%20databaseId%20%3d%20id%2c%20databaseName%20%3d%20name%2c%20elasticPoolId%20%3d%20tolower(tostring(properties.elasticPoolId))%0a%7c%20join%20kind%3dleftouter%20(%0a%09Resources%0a%09%7c%20where%20type%20%3d%7e%20%27microsoft.sql%2fservers%2felasticpools%27%0a%09%7c%20project%20elasticPoolId%20%3d%20tolower(id)%2c%20elasticPoolName%20%3d%20name%2c%20elasticPoolState%20%3d%20properties.state)%0a%09on%20elasticPoolId%0a%7c%20project-away%20elasticPoolId1" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.sql%2fservers%2fdatabases%27%0a%7c%20project%20databaseId%20%3d%20id%2c%20databaseName%20%3d%20name%2c%20elasticPoolId%20%3d%20tolower(tostring(properties.elasticPoolId))%0a%7c%20join%20kind%3dleftouter%20(%0a%09Resources%0a%09%7c%20where%20type%20%3d%7e%20%27microsoft.sql%2fservers%2felasticpools%27%0a%09%7c%20project%20elasticPoolId%20%3d%20tolower(id)%2c%20elasticPoolName%20%3d%20name%2c%20elasticPoolState%20%3d%20properties.state)%0a%09on%20elasticPoolId%0a%7c%20project-away%20elasticPoolId1" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.sql%2fservers%2fdatabases%27%0a%7c%20project%20databaseId%20%3d%20id%2c%20databaseName%20%3d%20name%2c%20elasticPoolId%20%3d%20tolower(tostring(properties.elasticPoolId))%0a%7c%20join%20kind%3dleftouter%20(%0a%09Resources%0a%09%7c%20where%20type%20%3d%7e%20%27microsoft.sql%2fservers%2felasticpools%27%0a%09%7c%20project%20elasticPoolId%20%3d%20tolower(id)%2c%20elasticPoolName%20%3d%20name%2c%20elasticPoolState%20%3d%20properties.state)%0a%09on%20elasticPoolId%0a%7c%20project-away%20elasticPoolId1" target="_blank">portal.azure.cn</a>

---


## Azure Storage


### Find storage accounts with a specific case-insensitive tag on the resource group

Similar to the 'Find storage accounts with a specific case-sensitive tag on the resource group' query, but when it's necessary to look for a case insensitive tag name and tag value, use `mv-expand` with the **bagexpansion** parameter. This query uses more quota than the original query, so use `mv-expand` only if necessary.

```kusto
Resources
| where type =~ 'microsoft.storage/storageaccounts'
| join kind=inner (
	ResourceContainers
	| where type =~ 'microsoft.resources/subscriptions/resourcegroups'
	| mv-expand bagexpansion=array tags
	| where isnotempty(tags)
	| where tags[0] =~ 'key1' and tags[1] =~ 'value1'
	| project subscriptionId, resourceGroup)
on subscriptionId, resourceGroup
| project-away subscriptionId1, resourceGroup1
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type =~ 'microsoft.storage/storageaccounts' | join kind=inner ( ResourceContainers | where type =~ 'microsoft.resources/subscriptions/resourcegroups' | mv-expand bagexpansion=array tags | where isnotempty(tags) | where tags[0] =~ 'key1' and tags[1] =~ 'value1' | project subscriptionId, resourceGroup) on subscriptionId, resourceGroup | project-away subscriptionId1, resourceGroup1"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type =~ 'microsoft.storage/storageaccounts' | join kind=inner ( ResourceContainers | where type =~ 'microsoft.resources/subscriptions/resourcegroups' | mv-expand bagexpansion=array tags | where isnotempty(tags) | where tags[0] =~ 'key1' and tags[1] =~ 'value1' | project subscriptionId, resourceGroup) on subscriptionId, resourceGroup | project-away subscriptionId1, resourceGroup1"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.storage%2fstorageaccounts%27%0a%7c%20join%20kind%3dinner%20(%0a%09ResourceContainers%0a%09%7c%20where%20type%20%3d%7e%20%27microsoft.resources%2fsubscriptions%2fresourcegroups%27%0a%09%7c%20mv-expand%20bagexpansion%3darray%20tags%0a%09%7c%20where%20isnotempty(tags)%0a%09%7c%20where%20tags%5b0%5d%20%3d%7e%20%27key1%27%20and%20tags%5b1%5d%20%3d%7e%20%27value1%27%0a%09%7c%20project%20subscriptionId%2c%20resourceGroup)%0aon%20subscriptionId%2c%20resourceGroup%0a%7c%20project-away%20subscriptionId1%2c%20resourceGroup1" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.storage%2fstorageaccounts%27%0a%7c%20join%20kind%3dinner%20(%0a%09ResourceContainers%0a%09%7c%20where%20type%20%3d%7e%20%27microsoft.resources%2fsubscriptions%2fresourcegroups%27%0a%09%7c%20mv-expand%20bagexpansion%3darray%20tags%0a%09%7c%20where%20isnotempty(tags)%0a%09%7c%20where%20tags%5b0%5d%20%3d%7e%20%27key1%27%20and%20tags%5b1%5d%20%3d%7e%20%27value1%27%0a%09%7c%20project%20subscriptionId%2c%20resourceGroup)%0aon%20subscriptionId%2c%20resourceGroup%0a%7c%20project-away%20subscriptionId1%2c%20resourceGroup1" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.storage%2fstorageaccounts%27%0a%7c%20join%20kind%3dinner%20(%0a%09ResourceContainers%0a%09%7c%20where%20type%20%3d%7e%20%27microsoft.resources%2fsubscriptions%2fresourcegroups%27%0a%09%7c%20mv-expand%20bagexpansion%3darray%20tags%0a%09%7c%20where%20isnotempty(tags)%0a%09%7c%20where%20tags%5b0%5d%20%3d%7e%20%27key1%27%20and%20tags%5b1%5d%20%3d%7e%20%27value1%27%0a%09%7c%20project%20subscriptionId%2c%20resourceGroup)%0aon%20subscriptionId%2c%20resourceGroup%0a%7c%20project-away%20subscriptionId1%2c%20resourceGroup1" target="_blank">portal.azure.cn</a>

---

### Find storage accounts with a specific case-sensitive tag on the resource group

The following query uses an **inner** `join` to connect storage accounts with resource groups that have a specified case-sensitive tag name and tag value.

```kusto
Resources
| where type =~ 'microsoft.storage/storageaccounts'
| join kind=inner (
	ResourceContainers
	| where type =~ 'microsoft.resources/subscriptions/resourcegroups'
	| where tags['Key1'] =~ 'Value1'
	| project subscriptionId, resourceGroup)
on subscriptionId, resourceGroup
| project-away subscriptionId1, resourceGroup1
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type =~ 'microsoft.storage/storageaccounts' | join kind=inner ( ResourceContainers | where type =~ 'microsoft.resources/subscriptions/resourcegroups' | where tags['Key1'] =~ 'Value1' | project subscriptionId, resourceGroup) on subscriptionId, resourceGroup | project-away subscriptionId1, resourceGroup1"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type =~ 'microsoft.storage/storageaccounts' | join kind=inner ( ResourceContainers | where type =~ 'microsoft.resources/subscriptions/resourcegroups' | where tags['Key1'] =~ 'Value1' | project subscriptionId, resourceGroup) on subscriptionId, resourceGroup | project-away subscriptionId1, resourceGroup1"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.storage%2fstorageaccounts%27%0a%7c%20join%20kind%3dinner%20(%0a%09ResourceContainers%0a%09%7c%20where%20type%20%3d%7e%20%27microsoft.resources%2fsubscriptions%2fresourcegroups%27%0a%09%7c%20where%20tags%5b%27Key1%27%5d%20%3d%7e%20%27Value1%27%0a%09%7c%20project%20subscriptionId%2c%20resourceGroup)%0aon%20subscriptionId%2c%20resourceGroup%0a%7c%20project-away%20subscriptionId1%2c%20resourceGroup1" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.storage%2fstorageaccounts%27%0a%7c%20join%20kind%3dinner%20(%0a%09ResourceContainers%0a%09%7c%20where%20type%20%3d%7e%20%27microsoft.resources%2fsubscriptions%2fresourcegroups%27%0a%09%7c%20where%20tags%5b%27Key1%27%5d%20%3d%7e%20%27Value1%27%0a%09%7c%20project%20subscriptionId%2c%20resourceGroup)%0aon%20subscriptionId%2c%20resourceGroup%0a%7c%20project-away%20subscriptionId1%2c%20resourceGroup1" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.storage%2fstorageaccounts%27%0a%7c%20join%20kind%3dinner%20(%0a%09ResourceContainers%0a%09%7c%20where%20type%20%3d%7e%20%27microsoft.resources%2fsubscriptions%2fresourcegroups%27%0a%09%7c%20where%20tags%5b%27Key1%27%5d%20%3d%7e%20%27Value1%27%0a%09%7c%20project%20subscriptionId%2c%20resourceGroup)%0aon%20subscriptionId%2c%20resourceGroup%0a%7c%20project-away%20subscriptionId1%2c%20resourceGroup1" target="_blank">portal.azure.cn</a>

---

### List all storage accounts with specific tag value

Combine the filter functionality of the previous example and filter Azure resource type by **type** property. This query also limits our search for specific types of Azure resources with a specific tag name and value.

```kusto
Resources
| where type =~ 'Microsoft.Storage/storageAccounts'
| where tags['tag with a space']=='Custom value'
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type =~ 'Microsoft.Storage/storageAccounts' | where tags['tag with a space']=='Custom value'"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type =~ 'Microsoft.Storage/storageAccounts' | where tags['tag with a space']=='Custom value'"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.Storage%2fstorageAccounts%27%0a%7c%20where%20tags%5b%27tag%20with%20a%20space%27%5d%3d%3d%27Custom%20value%27" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.Storage%2fstorageAccounts%27%0a%7c%20where%20tags%5b%27tag%20with%20a%20space%27%5d%3d%3d%27Custom%20value%27" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.Storage%2fstorageAccounts%27%0a%7c%20where%20tags%5b%27tag%20with%20a%20space%27%5d%3d%3d%27Custom%20value%27" target="_blank">portal.azure.cn</a>

---

### Show resources that contain storage

Instead of explicitly defining the type to match, this example query will find any Azure resource that `contains` the word **storage**.

```kusto
Resources
| where type contains 'storage' | distinct type
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type contains 'storage' | distinct type"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type contains 'storage' | distinct type"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20contains%20%27storage%27%20%7c%20distinct%20type" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20contains%20%27storage%27%20%7c%20distinct%20type" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20contains%20%27storage%27%20%7c%20distinct%20type" target="_blank">portal.azure.cn</a>

---


## Azure Virtual Machines


### Count of OS update installation done

Returns a list of status of OS update installation runs done for your machines in last 7 days.

```kusto
PatchAssessmentResources
| where type !has 'softwarepatches'
| extend machineName = tostring(split(id, '/', 8)), resourceType = tostring(split(type, '/', 0)), tostring(rgName = split(id, '/', 4))
| extend prop = parse_json(properties)
| extend lTime = todatetime(prop.lastModifiedDateTime), OS = tostring(prop.osType), installedPatchCount = tostring(prop.installedPatchCount), failedPatchCount = tostring(prop.failedPatchCount), pendingPatchCount = tostring(prop.pendingPatchCount), excludedPatchCount = tostring(prop.excludedPatchCount), notSelectedPatchCount = tostring(prop.notSelectedPatchCount)
| where lTime > ago(7d)
| project lTime, RunID=name,machineName, rgName, resourceType, OS, installedPatchCount, failedPatchCount, pendingPatchCount, excludedPatchCount, notSelectedPatchCount
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "PatchAssessmentResources | where type !has 'softwarepatches' | extend machineName = tostring(split(id, '/', 8)), resourceType = tostring(split(type, '/', 0)), tostring(rgName = split(id, '/', 4)) | extend prop = parse_json(properties) | extend lTime = todatetime(prop.lastModifiedDateTime), OS = tostring(prop.osType), installedPatchCount = tostring(prop.installedPatchCount), failedPatchCount = tostring(prop.failedPatchCount), pendingPatchCount = tostring(prop.pendingPatchCount), excludedPatchCount = tostring(prop.excludedPatchCount), notSelectedPatchCount = tostring(prop.notSelectedPatchCount) | where lTime > ago(7d) | project lTime, RunID=name,machineName, rgName, resourceType, OS, installedPatchCount, failedPatchCount, pendingPatchCount, excludedPatchCount, notSelectedPatchCount"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "PatchAssessmentResources | where type !has 'softwarepatches' | extend machineName = tostring(split(id, '/', 8)), resourceType = tostring(split(type, '/', 0)), tostring(rgName = split(id, '/', 4)) | extend prop = parse_json(properties) | extend lTime = todatetime(prop.lastModifiedDateTime), OS = tostring(prop.osType), installedPatchCount = tostring(prop.installedPatchCount), failedPatchCount = tostring(prop.failedPatchCount), pendingPatchCount = tostring(prop.pendingPatchCount), excludedPatchCount = tostring(prop.excludedPatchCount), notSelectedPatchCount = tostring(prop.notSelectedPatchCount) | where lTime > ago(7d) | project lTime, RunID=name,machineName, rgName, resourceType, OS, installedPatchCount, failedPatchCount, pendingPatchCount, excludedPatchCount, notSelectedPatchCount"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/PatchAssessmentResources%0a%7c%20where%20type%20!has%20%27softwarepatches%27%0a%7c%20extend%20machineName%20%3d%20tostring(split(id%2c%20%27%2f%27%2c%208))%2c%20resourceType%20%3d%20tostring(split(type%2c%20%27%2f%27%2c%200))%2c%20tostring(rgName%20%3d%20split(id%2c%20%27%2f%27%2c%204))%0a%7c%20extend%20prop%20%3d%20parse_json(properties)%0a%7c%20extend%20lTime%20%3d%20todatetime(prop.lastModifiedDateTime)%2c%20OS%20%3d%20tostring(prop.osType)%2c%20installedPatchCount%20%3d%20tostring(prop.installedPatchCount)%2c%20failedPatchCount%20%3d%20tostring(prop.failedPatchCount)%2c%20pendingPatchCount%20%3d%20tostring(prop.pendingPatchCount)%2c%20excludedPatchCount%20%3d%20tostring(prop.excludedPatchCount)%2c%20notSelectedPatchCount%20%3d%20tostring(prop.notSelectedPatchCount)%0a%7c%20where%20lTime%20%3e%20ago(7d)%0a%7c%20project%20lTime%2c%20RunID%3dname%2cmachineName%2c%20rgName%2c%20resourceType%2c%20OS%2c%20installedPatchCount%2c%20failedPatchCount%2c%20pendingPatchCount%2c%20excludedPatchCount%2c%20notSelectedPatchCount" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/PatchAssessmentResources%0a%7c%20where%20type%20!has%20%27softwarepatches%27%0a%7c%20extend%20machineName%20%3d%20tostring(split(id%2c%20%27%2f%27%2c%208))%2c%20resourceType%20%3d%20tostring(split(type%2c%20%27%2f%27%2c%200))%2c%20tostring(rgName%20%3d%20split(id%2c%20%27%2f%27%2c%204))%0a%7c%20extend%20prop%20%3d%20parse_json(properties)%0a%7c%20extend%20lTime%20%3d%20todatetime(prop.lastModifiedDateTime)%2c%20OS%20%3d%20tostring(prop.osType)%2c%20installedPatchCount%20%3d%20tostring(prop.installedPatchCount)%2c%20failedPatchCount%20%3d%20tostring(prop.failedPatchCount)%2c%20pendingPatchCount%20%3d%20tostring(prop.pendingPatchCount)%2c%20excludedPatchCount%20%3d%20tostring(prop.excludedPatchCount)%2c%20notSelectedPatchCount%20%3d%20tostring(prop.notSelectedPatchCount)%0a%7c%20where%20lTime%20%3e%20ago(7d)%0a%7c%20project%20lTime%2c%20RunID%3dname%2cmachineName%2c%20rgName%2c%20resourceType%2c%20OS%2c%20installedPatchCount%2c%20failedPatchCount%2c%20pendingPatchCount%2c%20excludedPatchCount%2c%20notSelectedPatchCount" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/PatchAssessmentResources%0a%7c%20where%20type%20!has%20%27softwarepatches%27%0a%7c%20extend%20machineName%20%3d%20tostring(split(id%2c%20%27%2f%27%2c%208))%2c%20resourceType%20%3d%20tostring(split(type%2c%20%27%2f%27%2c%200))%2c%20tostring(rgName%20%3d%20split(id%2c%20%27%2f%27%2c%204))%0a%7c%20extend%20prop%20%3d%20parse_json(properties)%0a%7c%20extend%20lTime%20%3d%20todatetime(prop.lastModifiedDateTime)%2c%20OS%20%3d%20tostring(prop.osType)%2c%20installedPatchCount%20%3d%20tostring(prop.installedPatchCount)%2c%20failedPatchCount%20%3d%20tostring(prop.failedPatchCount)%2c%20pendingPatchCount%20%3d%20tostring(prop.pendingPatchCount)%2c%20excludedPatchCount%20%3d%20tostring(prop.excludedPatchCount)%2c%20notSelectedPatchCount%20%3d%20tostring(prop.notSelectedPatchCount)%0a%7c%20where%20lTime%20%3e%20ago(7d)%0a%7c%20project%20lTime%2c%20RunID%3dname%2cmachineName%2c%20rgName%2c%20resourceType%2c%20OS%2c%20installedPatchCount%2c%20failedPatchCount%2c%20pendingPatchCount%2c%20excludedPatchCount%2c%20notSelectedPatchCount" target="_blank">portal.azure.cn</a>

---

### Count of virtual machines by availability state and Subscription Id

Returns the count of virtual machines (type `Microsoft.Compute/virtualMachines`) aggregated by their availability state across each of your subscriptions.

```kusto
HealthResources
| where type =~ 'microsoft.resourcehealth/availabilitystatuses'
| summarize count() by subscriptionId, AvailabilityState = tostring(properties.availabilityState)
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "HealthResources | where type =~ 'microsoft.resourcehealth/availabilitystatuses' | summarize count() by subscriptionId, AvailabilityState = tostring(properties.availabilityState)"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "HealthResources | where type =~ 'microsoft.resourcehealth/availabilitystatuses' | summarize count() by subscriptionId, AvailabilityState = tostring(properties.availabilityState)"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/HealthResources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.resourcehealth%2favailabilitystatuses%27%0a%7c%20summarize%20count()%20by%20subscriptionId%2c%20AvailabilityState%20%3d%20tostring(properties.availabilityState)" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/HealthResources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.resourcehealth%2favailabilitystatuses%27%0a%7c%20summarize%20count()%20by%20subscriptionId%2c%20AvailabilityState%20%3d%20tostring(properties.availabilityState)" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/HealthResources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.resourcehealth%2favailabilitystatuses%27%0a%7c%20summarize%20count()%20by%20subscriptionId%2c%20AvailabilityState%20%3d%20tostring(properties.availabilityState)" target="_blank">portal.azure.cn</a>

---

### Count of virtual machines by power state

Returns count of virtual machines (type `Microsoft.Compute/virtualMachines`) categorized according to their power state. For more information on power states, please see [Power states overview](https://learn.microsoft.com/azure/virtual-machines/states-billing).

```kusto
Resources
| where type == 'microsoft.compute/virtualmachines'
| summarize count() by PowerState = tostring(properties.extended.instanceView.powerState.code)
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type == 'microsoft.compute/virtualmachines' | summarize count() by PowerState = tostring(properties.extended.instanceView.powerState.code)"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type == 'microsoft.compute/virtualmachines' | summarize count() by PowerState = tostring(properties.extended.instanceView.powerState.code)"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.compute%2fvirtualmachines%27%0a%7c%20summarize%20count()%20by%20PowerState%20%3d%20tostring(properties.extended.instanceView.powerState.code)" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.compute%2fvirtualmachines%27%0a%7c%20summarize%20count()%20by%20PowerState%20%3d%20tostring(properties.extended.instanceView.powerState.code)" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.compute%2fvirtualmachines%27%0a%7c%20summarize%20count()%20by%20PowerState%20%3d%20tostring(properties.extended.instanceView.powerState.code)" target="_blank">portal.azure.cn</a>

---

### Count virtual machines by OS type

Building on the previous query, we're still limiting by Azure resources of type `Microsoft.Compute/virtualMachines`, but are no longer limiting the number of records returned. Instead, we used `summarize` and `count()` to define how to group and aggregate the values by property, which in this example is `properties.storageProfile.osDisk.osType`. For an example of how this string looks in the full object, see [explore resources - virtual machine discovery](https://learn.microsoft.com/azure/governance/resource-graph/concepts/explore-resources#virtual-machine-discovery).

```kusto
Resources
| where type =~ 'Microsoft.Compute/virtualMachines'
| summarize count() by tostring(properties.storageProfile.osDisk.osType)
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type =~ 'Microsoft.Compute/virtualMachines' | summarize count() by tostring(properties.storageProfile.osDisk.osType)"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type =~ 'Microsoft.Compute/virtualMachines' | summarize count() by tostring(properties.storageProfile.osDisk.osType)"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.Compute%2fvirtualMachines%27%0a%7c%20summarize%20count()%20by%20tostring(properties.storageProfile.osDisk.osType)" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.Compute%2fvirtualMachines%27%0a%7c%20summarize%20count()%20by%20tostring(properties.storageProfile.osDisk.osType)" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.Compute%2fvirtualMachines%27%0a%7c%20summarize%20count()%20by%20tostring(properties.storageProfile.osDisk.osType)" target="_blank">portal.azure.cn</a>

---

### Count virtual machines by OS type with extend

A different way to write the 'Count virtual machines by OS type' query is to `extend` a property and give it a temporary name for use within the query, in this case **os**. **os** is then used by `summarize` and `count()` as in the referenced example.

```kusto
Resources
| where type =~ 'Microsoft.Compute/virtualMachines'
| extend os = properties.storageProfile.osDisk.osType
| summarize count() by tostring(os)
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type =~ 'Microsoft.Compute/virtualMachines' | extend os = properties.storageProfile.osDisk.osType | summarize count() by tostring(os)"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type =~ 'Microsoft.Compute/virtualMachines' | extend os = properties.storageProfile.osDisk.osType | summarize count() by tostring(os)"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.Compute%2fvirtualMachines%27%0a%7c%20extend%20os%20%3d%20properties.storageProfile.osDisk.osType%0a%7c%20summarize%20count()%20by%20tostring(os)" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.Compute%2fvirtualMachines%27%0a%7c%20extend%20os%20%3d%20properties.storageProfile.osDisk.osType%0a%7c%20summarize%20count()%20by%20tostring(os)" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.Compute%2fvirtualMachines%27%0a%7c%20extend%20os%20%3d%20properties.storageProfile.osDisk.osType%0a%7c%20summarize%20count()%20by%20tostring(os)" target="_blank">portal.azure.cn</a>

---

### Get all New alerts from the past 30 days

This query provides a list of all the user's New alerts, from the past 30 days.

```kusto
iotsecurityresources
| where type == 'microsoft.iotsecurity/locations/devicegroups/alerts'
| where todatetime(properties.startTimeUtc) > ago(30d) and properties.status == 'New'
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "iotsecurityresources | where type == 'microsoft.iotsecurity/locations/devicegroups/alerts' | where todatetime(properties.startTimeUtc) > ago(30d) and properties.status == 'New'"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "iotsecurityresources | where type == 'microsoft.iotsecurity/locations/devicegroups/alerts' | where todatetime(properties.startTimeUtc) > ago(30d) and properties.status == 'New'"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/iotsecurityresources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.iotsecurity%2flocations%2fdevicegroups%2falerts%27%0a%7c%20where%20todatetime(properties.startTimeUtc)%20%3e%20ago(30d)%20and%20properties.status%20%3d%3d%20%27New%27" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/iotsecurityresources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.iotsecurity%2flocations%2fdevicegroups%2falerts%27%0a%7c%20where%20todatetime(properties.startTimeUtc)%20%3e%20ago(30d)%20and%20properties.status%20%3d%3d%20%27New%27" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/iotsecurityresources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.iotsecurity%2flocations%2fdevicegroups%2falerts%27%0a%7c%20where%20todatetime(properties.startTimeUtc)%20%3e%20ago(30d)%20and%20properties.status%20%3d%3d%20%27New%27" target="_blank">portal.azure.cn</a>

---

### Get virtual machine scale set capacity and size

This query looks for virtual machine scale set resources and gets various details including the virtual machine size and the capacity of the scale set. The query uses the `toint()` function to cast the capacity to a number so that it can be sorted. Finally, the columns are renamed into custom named properties.

```kusto
Resources
| where type=~ 'microsoft.compute/virtualmachinescalesets'
| where name contains 'contoso'
| project subscriptionId, name, location, resourceGroup, Capacity = toint(sku.capacity), Tier = sku.name
| order by Capacity desc
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type=~ 'microsoft.compute/virtualmachinescalesets' | where name contains 'contoso' | project subscriptionId, name, location, resourceGroup, Capacity = toint(sku.capacity), Tier = sku.name | order by Capacity desc"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type=~ 'microsoft.compute/virtualmachinescalesets' | where name contains 'contoso' | project subscriptionId, name, location, resourceGroup, Capacity = toint(sku.capacity), Tier = sku.name | order by Capacity desc"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%3d%7e%20%27microsoft.compute%2fvirtualmachinescalesets%27%0a%7c%20where%20name%20contains%20%27contoso%27%0a%7c%20project%20subscriptionId%2c%20name%2c%20location%2c%20resourceGroup%2c%20Capacity%20%3d%20toint(sku.capacity)%2c%20Tier%20%3d%20sku.name%0a%7c%20order%20by%20Capacity%20desc" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%3d%7e%20%27microsoft.compute%2fvirtualmachinescalesets%27%0a%7c%20where%20name%20contains%20%27contoso%27%0a%7c%20project%20subscriptionId%2c%20name%2c%20location%2c%20resourceGroup%2c%20Capacity%20%3d%20toint(sku.capacity)%2c%20Tier%20%3d%20sku.name%0a%7c%20order%20by%20Capacity%20desc" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%3d%7e%20%27microsoft.compute%2fvirtualmachinescalesets%27%0a%7c%20where%20name%20contains%20%27contoso%27%0a%7c%20project%20subscriptionId%2c%20name%2c%20location%2c%20resourceGroup%2c%20Capacity%20%3d%20toint(sku.capacity)%2c%20Tier%20%3d%20sku.name%0a%7c%20order%20by%20Capacity%20desc" target="_blank">portal.azure.cn</a>

---

### List all extensions installed on a virtual machine

First, this query uses `extend` on the virtual machines resource type to get the ID in uppercase (`toupper()`) the ID, get the operating system name and type, and get the virtual machine size. Getting the resource ID in uppercase is a good way to prepare to join to another property. Then, the query uses `join` with **kind** as _leftouter_ to get virtual machine extensions by matching an uppercase `substring` of the extension ID. The portion of the ID before "/extensions/\<ExtensionName\>" is the same format as the virtual machines ID, so we use this property for the `join`. `summarize` is then used with `make_list` on the name of the virtual machine extension to combine the name of each extension where _id_, _OSName_, _OSType_, and _VMSize_ are the same into a single array property. Lastly, we `order by` lowercase _OSName_ with **asc**. By default, `order by` is descending.

```kusto
Resources
| where type == 'microsoft.compute/virtualmachines'
| extend
  JoinID = toupper(id),
  OSName = tostring(properties.osProfile.computerName),
  OSType = tostring(properties.storageProfile.osDisk.osType),
  VMSize = tostring(properties.hardwareProfile.vmSize)
| join kind=leftouter(
  Resources
  | where type == 'microsoft.compute/virtualmachines/extensions'
  | extend
    VMId = toupper(substring(id, 0, indexof(id, '/extensions'))),
    ExtensionName = name
) on $left.JoinID == $right.VMId
| summarize Extensions = make_list(ExtensionName) by id, OSName, OSType, VMSize
| order by tolower(OSName) asc
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type == 'microsoft.compute/virtualmachines' | extend JoinID = toupper(id), OSName = tostring(properties.osProfile.computerName), OSType = tostring(properties.storageProfile.osDisk.osType), VMSize = tostring(properties.hardwareProfile.vmSize) | join kind=leftouter( Resources | where type == 'microsoft.compute/virtualmachines/extensions' | extend  VMId = toupper(substring(id, 0, indexof(id, '/extensions'))),  ExtensionName = name ) on \$left.JoinID == \$right.VMId | summarize Extensions = make_list(ExtensionName) by id, OSName, OSType, VMSize | order by tolower(OSName) asc"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type == 'microsoft.compute/virtualmachines' | extend JoinID = toupper(id), OSName = tostring(properties.osProfile.computerName), OSType = tostring(properties.storageProfile.osDisk.osType), VMSize = tostring(properties.hardwareProfile.vmSize) | join kind=leftouter( Resources | where type == 'microsoft.compute/virtualmachines/extensions' | extend  VMId = toupper(substring(id, 0, indexof(id, '/extensions'))),  ExtensionName = name ) on $left.JoinID == $right.VMId | summarize Extensions = make_list(ExtensionName) by id, OSName, OSType, VMSize | order by tolower(OSName) asc"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.compute%2fvirtualmachines%27%0a%7c%20extend%0a%09JoinID%20%3d%20toupper(id)%2c%0a%09OSName%20%3d%20tostring(properties.osProfile.computerName)%2c%0a%09OSType%20%3d%20tostring(properties.storageProfile.osDisk.osType)%2c%0a%09VMSize%20%3d%20tostring(properties.hardwareProfile.vmSize)%0a%7c%20join%20kind%3dleftouter(%0a%09Resources%0a%09%7c%20where%20type%20%3d%3d%20%27microsoft.compute%2fvirtualmachines%2fextensions%27%0a%09%7c%20extend%20%0a%09%09VMId%20%3d%20toupper(substring(id%2c%200%2c%20indexof(id%2c%20%27%2fextensions%27)))%2c%0a%09%09ExtensionName%20%3d%20name%0a)%20on%20%24left.JoinID%20%3d%3d%20%24right.VMId%0a%7c%20summarize%20Extensions%20%3d%20make_list(ExtensionName)%20by%20id%2c%20OSName%2c%20OSType%2c%20VMSize%0a%7c%20order%20by%20tolower(OSName)%20asc" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.compute%2fvirtualmachines%27%0a%7c%20extend%0a%09JoinID%20%3d%20toupper(id)%2c%0a%09OSName%20%3d%20tostring(properties.osProfile.computerName)%2c%0a%09OSType%20%3d%20tostring(properties.storageProfile.osDisk.osType)%2c%0a%09VMSize%20%3d%20tostring(properties.hardwareProfile.vmSize)%0a%7c%20join%20kind%3dleftouter(%0a%09Resources%0a%09%7c%20where%20type%20%3d%3d%20%27microsoft.compute%2fvirtualmachines%2fextensions%27%0a%09%7c%20extend%20%0a%09%09VMId%20%3d%20toupper(substring(id%2c%200%2c%20indexof(id%2c%20%27%2fextensions%27)))%2c%0a%09%09ExtensionName%20%3d%20name%0a)%20on%20%24left.JoinID%20%3d%3d%20%24right.VMId%0a%7c%20summarize%20Extensions%20%3d%20make_list(ExtensionName)%20by%20id%2c%20OSName%2c%20OSType%2c%20VMSize%0a%7c%20order%20by%20tolower(OSName)%20asc" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.compute%2fvirtualmachines%27%0a%7c%20extend%0a%09JoinID%20%3d%20toupper(id)%2c%0a%09OSName%20%3d%20tostring(properties.osProfile.computerName)%2c%0a%09OSType%20%3d%20tostring(properties.storageProfile.osDisk.osType)%2c%0a%09VMSize%20%3d%20tostring(properties.hardwareProfile.vmSize)%0a%7c%20join%20kind%3dleftouter(%0a%09Resources%0a%09%7c%20where%20type%20%3d%3d%20%27microsoft.compute%2fvirtualmachines%2fextensions%27%0a%09%7c%20extend%20%0a%09%09VMId%20%3d%20toupper(substring(id%2c%200%2c%20indexof(id%2c%20%27%2fextensions%27)))%2c%0a%09%09ExtensionName%20%3d%20name%0a)%20on%20%24left.JoinID%20%3d%3d%20%24right.VMId%0a%7c%20summarize%20Extensions%20%3d%20make_list(ExtensionName)%20by%20id%2c%20OSName%2c%20OSType%2c%20VMSize%0a%7c%20order%20by%20tolower(OSName)%20asc" target="_blank">portal.azure.cn</a>

---

### List available OS updates for all your machines grouped by update category

Returns a list of pending OS for your machines.

```kusto
PatchAssessmentResources
| where type !has 'softwarepatches'
| extend prop = parse_json(properties)
| extend lastTime = properties.lastModifiedDateTime
| extend updateRollupCount = prop.availablePatchCountByClassification.updateRollup, featurePackCount = prop.availablePatchCountByClassification.featurePack, servicePackCount = prop.availablePatchCountByClassification.servicePack, definitionCount = prop.availablePatchCountByClassification.definition, securityCount = prop.availablePatchCountByClassification.security, criticalCount = prop.availablePatchCountByClassification.critical, updatesCount = prop.availablePatchCountByClassification.updates, toolsCount = prop.availablePatchCountByClassification.tools, otherCount = prop.availablePatchCountByClassification.other, OS = prop.osType
| project lastTime, id, OS, updateRollupCount, featurePackCount, servicePackCount, definitionCount, securityCount, criticalCount, updatesCount, toolsCount, otherCount
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "PatchAssessmentResources | where type !has 'softwarepatches' | extend prop = parse_json(properties) | extend lastTime = properties.lastModifiedDateTime | extend updateRollupCount = prop.availablePatchCountByClassification.updateRollup, featurePackCount = prop.availablePatchCountByClassification.featurePack, servicePackCount = prop.availablePatchCountByClassification.servicePack, definitionCount = prop.availablePatchCountByClassification.definition, securityCount = prop.availablePatchCountByClassification.security, criticalCount = prop.availablePatchCountByClassification.critical, updatesCount = prop.availablePatchCountByClassification.updates, toolsCount = prop.availablePatchCountByClassification.tools, otherCount = prop.availablePatchCountByClassification.other, OS = prop.osType | project lastTime, id, OS, updateRollupCount, featurePackCount, servicePackCount, definitionCount, securityCount, criticalCount, updatesCount, toolsCount, otherCount"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "PatchAssessmentResources | where type !has 'softwarepatches' | extend prop = parse_json(properties) | extend lastTime = properties.lastModifiedDateTime | extend updateRollupCount = prop.availablePatchCountByClassification.updateRollup, featurePackCount = prop.availablePatchCountByClassification.featurePack, servicePackCount = prop.availablePatchCountByClassification.servicePack, definitionCount = prop.availablePatchCountByClassification.definition, securityCount = prop.availablePatchCountByClassification.security, criticalCount = prop.availablePatchCountByClassification.critical, updatesCount = prop.availablePatchCountByClassification.updates, toolsCount = prop.availablePatchCountByClassification.tools, otherCount = prop.availablePatchCountByClassification.other, OS = prop.osType | project lastTime, id, OS, updateRollupCount, featurePackCount, servicePackCount, definitionCount, securityCount, criticalCount, updatesCount, toolsCount, otherCount"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/PatchAssessmentResources%0a%7c%20where%20type%20!has%20%27softwarepatches%27%0a%7c%20extend%20prop%20%3d%20parse_json(properties)%0a%7c%20extend%20lastTime%20%3d%20properties.lastModifiedDateTime%0a%7c%20extend%20updateRollupCount%20%3d%20prop.availablePatchCountByClassification.updateRollup%2c%20featurePackCount%20%3d%20prop.availablePatchCountByClassification.featurePack%2c%20servicePackCount%20%3d%20prop.availablePatchCountByClassification.servicePack%2c%20definitionCount%20%3d%20prop.availablePatchCountByClassification.definition%2c%20securityCount%20%3d%20prop.availablePatchCountByClassification.security%2c%20criticalCount%20%3d%20prop.availablePatchCountByClassification.critical%2c%20updatesCount%20%3d%20prop.availablePatchCountByClassification.updates%2c%20toolsCount%20%3d%20prop.availablePatchCountByClassification.tools%2c%20otherCount%20%3d%20prop.availablePatchCountByClassification.other%2c%20OS%20%3d%20prop.osType%0a%7c%20project%20lastTime%2c%20id%2c%20OS%2c%20updateRollupCount%2c%20featurePackCount%2c%20servicePackCount%2c%20definitionCount%2c%20securityCount%2c%20criticalCount%2c%20updatesCount%2c%20toolsCount%2c%20otherCount" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/PatchAssessmentResources%0a%7c%20where%20type%20!has%20%27softwarepatches%27%0a%7c%20extend%20prop%20%3d%20parse_json(properties)%0a%7c%20extend%20lastTime%20%3d%20properties.lastModifiedDateTime%0a%7c%20extend%20updateRollupCount%20%3d%20prop.availablePatchCountByClassification.updateRollup%2c%20featurePackCount%20%3d%20prop.availablePatchCountByClassification.featurePack%2c%20servicePackCount%20%3d%20prop.availablePatchCountByClassification.servicePack%2c%20definitionCount%20%3d%20prop.availablePatchCountByClassification.definition%2c%20securityCount%20%3d%20prop.availablePatchCountByClassification.security%2c%20criticalCount%20%3d%20prop.availablePatchCountByClassification.critical%2c%20updatesCount%20%3d%20prop.availablePatchCountByClassification.updates%2c%20toolsCount%20%3d%20prop.availablePatchCountByClassification.tools%2c%20otherCount%20%3d%20prop.availablePatchCountByClassification.other%2c%20OS%20%3d%20prop.osType%0a%7c%20project%20lastTime%2c%20id%2c%20OS%2c%20updateRollupCount%2c%20featurePackCount%2c%20servicePackCount%2c%20definitionCount%2c%20securityCount%2c%20criticalCount%2c%20updatesCount%2c%20toolsCount%2c%20otherCount" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/PatchAssessmentResources%0a%7c%20where%20type%20!has%20%27softwarepatches%27%0a%7c%20extend%20prop%20%3d%20parse_json(properties)%0a%7c%20extend%20lastTime%20%3d%20properties.lastModifiedDateTime%0a%7c%20extend%20updateRollupCount%20%3d%20prop.availablePatchCountByClassification.updateRollup%2c%20featurePackCount%20%3d%20prop.availablePatchCountByClassification.featurePack%2c%20servicePackCount%20%3d%20prop.availablePatchCountByClassification.servicePack%2c%20definitionCount%20%3d%20prop.availablePatchCountByClassification.definition%2c%20securityCount%20%3d%20prop.availablePatchCountByClassification.security%2c%20criticalCount%20%3d%20prop.availablePatchCountByClassification.critical%2c%20updatesCount%20%3d%20prop.availablePatchCountByClassification.updates%2c%20toolsCount%20%3d%20prop.availablePatchCountByClassification.tools%2c%20otherCount%20%3d%20prop.availablePatchCountByClassification.other%2c%20OS%20%3d%20prop.osType%0a%7c%20project%20lastTime%2c%20id%2c%20OS%2c%20updateRollupCount%2c%20featurePackCount%2c%20servicePackCount%2c%20definitionCount%2c%20securityCount%2c%20criticalCount%2c%20updatesCount%2c%20toolsCount%2c%20otherCount" target="_blank">portal.azure.cn</a>

---

### List of Linux OS update installation done

Returns a list of status of Linux Server - OS update installation runs done for your machines in last 7 days.

```kusto
PatchAssessmentResources
| where type has 'softwarepatches' and properties has 'version'
| extend machineName = tostring(split(id, '/', 8)), resourceType = tostring(split(type, '/', 0)), tostring(rgName = split(id, '/', 4)), tostring(RunID = split(id, '/', 10))
| extend prop = parse_json(properties)
| extend lTime = todatetime(prop.lastModifiedDateTime), patchName = tostring(prop.patchName), version = tostring(prop.version), installationState = tostring(prop.installationState), classifications = tostring(prop.classifications)
| where lTime > ago(7d)
| project lTime, RunID, machineName, rgName, resourceType, patchName, version, classifications, installationState
| sort by RunID
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "PatchAssessmentResources | where type has 'softwarepatches' and properties has 'version' | extend machineName = tostring(split(id, '/', 8)), resourceType = tostring(split(type, '/', 0)), tostring(rgName = split(id, '/', 4)), tostring(RunID = split(id, '/', 10)) | extend prop = parse_json(properties) | extend lTime = todatetime(prop.lastModifiedDateTime), patchName = tostring(prop.patchName), version = tostring(prop.version), installationState = tostring(prop.installationState), classifications = tostring(prop.classifications) | where lTime > ago(7d) | project lTime, RunID, machineName, rgName, resourceType, patchName, version, classifications, installationState | sort by RunID"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "PatchAssessmentResources | where type has 'softwarepatches' and properties has 'version' | extend machineName = tostring(split(id, '/', 8)), resourceType = tostring(split(type, '/', 0)), tostring(rgName = split(id, '/', 4)), tostring(RunID = split(id, '/', 10)) | extend prop = parse_json(properties) | extend lTime = todatetime(prop.lastModifiedDateTime), patchName = tostring(prop.patchName), version = tostring(prop.version), installationState = tostring(prop.installationState), classifications = tostring(prop.classifications) | where lTime > ago(7d) | project lTime, RunID, machineName, rgName, resourceType, patchName, version, classifications, installationState | sort by RunID"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/PatchAssessmentResources%0a%7c%20where%20type%20has%20%27softwarepatches%27%20and%20properties%20has%20%27version%27%0a%7c%20extend%20machineName%20%3d%20tostring(split(id%2c%20%27%2f%27%2c%208))%2c%20resourceType%20%3d%20tostring(split(type%2c%20%27%2f%27%2c%200))%2c%20tostring(rgName%20%3d%20split(id%2c%20%27%2f%27%2c%204))%2c%20tostring(RunID%20%3d%20split(id%2c%20%27%2f%27%2c%2010))%0a%7c%20extend%20prop%20%3d%20parse_json(properties)%0a%7c%20extend%20lTime%20%3d%20todatetime(prop.lastModifiedDateTime)%2c%20patchName%20%3d%20tostring(prop.patchName)%2c%20version%20%3d%20tostring(prop.version)%2c%20installationState%20%3d%20tostring(prop.installationState)%2c%20classifications%20%3d%20tostring(prop.classifications)%0a%7c%20where%20lTime%20%3e%20ago(7d)%0a%7c%20project%20lTime%2c%20RunID%2c%20machineName%2c%20rgName%2c%20resourceType%2c%20patchName%2c%20version%2c%20classifications%2c%20installationState%0a%7c%20sort%20by%20RunID" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/PatchAssessmentResources%0a%7c%20where%20type%20has%20%27softwarepatches%27%20and%20properties%20has%20%27version%27%0a%7c%20extend%20machineName%20%3d%20tostring(split(id%2c%20%27%2f%27%2c%208))%2c%20resourceType%20%3d%20tostring(split(type%2c%20%27%2f%27%2c%200))%2c%20tostring(rgName%20%3d%20split(id%2c%20%27%2f%27%2c%204))%2c%20tostring(RunID%20%3d%20split(id%2c%20%27%2f%27%2c%2010))%0a%7c%20extend%20prop%20%3d%20parse_json(properties)%0a%7c%20extend%20lTime%20%3d%20todatetime(prop.lastModifiedDateTime)%2c%20patchName%20%3d%20tostring(prop.patchName)%2c%20version%20%3d%20tostring(prop.version)%2c%20installationState%20%3d%20tostring(prop.installationState)%2c%20classifications%20%3d%20tostring(prop.classifications)%0a%7c%20where%20lTime%20%3e%20ago(7d)%0a%7c%20project%20lTime%2c%20RunID%2c%20machineName%2c%20rgName%2c%20resourceType%2c%20patchName%2c%20version%2c%20classifications%2c%20installationState%0a%7c%20sort%20by%20RunID" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/PatchAssessmentResources%0a%7c%20where%20type%20has%20%27softwarepatches%27%20and%20properties%20has%20%27version%27%0a%7c%20extend%20machineName%20%3d%20tostring(split(id%2c%20%27%2f%27%2c%208))%2c%20resourceType%20%3d%20tostring(split(type%2c%20%27%2f%27%2c%200))%2c%20tostring(rgName%20%3d%20split(id%2c%20%27%2f%27%2c%204))%2c%20tostring(RunID%20%3d%20split(id%2c%20%27%2f%27%2c%2010))%0a%7c%20extend%20prop%20%3d%20parse_json(properties)%0a%7c%20extend%20lTime%20%3d%20todatetime(prop.lastModifiedDateTime)%2c%20patchName%20%3d%20tostring(prop.patchName)%2c%20version%20%3d%20tostring(prop.version)%2c%20installationState%20%3d%20tostring(prop.installationState)%2c%20classifications%20%3d%20tostring(prop.classifications)%0a%7c%20where%20lTime%20%3e%20ago(7d)%0a%7c%20project%20lTime%2c%20RunID%2c%20machineName%2c%20rgName%2c%20resourceType%2c%20patchName%2c%20version%2c%20classifications%2c%20installationState%0a%7c%20sort%20by%20RunID" target="_blank">portal.azure.cn</a>

---

### List of virtual machines and associated availability states by Resource Ids

Returns the latest list of virtual machines (type `Microsoft.Compute/virtualMachines`) aggregated by availability state. The query also provides the associated Resource Id based on `properties.targetResourceId`, for easy debugging and mitigation. Availability states can be one of four values: Available, Unavailable, Degraded and Unknown. For more details on what each of the availability states mean, please see [Azure Resource Health overview](https://learn.microsoft.com/azure/service-health/resource-health-overview#health-status).

```kusto
HealthResources
| where type =~ 'microsoft.resourcehealth/availabilitystatuses'
| summarize by ResourceId = tolower(tostring(properties.targetResourceId)), AvailabilityState = tostring(properties.availabilityState)
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "HealthResources | where type =~ 'microsoft.resourcehealth/availabilitystatuses' | summarize by ResourceId = tolower(tostring(properties.targetResourceId)), AvailabilityState = tostring(properties.availabilityState)"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "HealthResources | where type =~ 'microsoft.resourcehealth/availabilitystatuses' | summarize by ResourceId = tolower(tostring(properties.targetResourceId)), AvailabilityState = tostring(properties.availabilityState)"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/HealthResources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.resourcehealth%2favailabilitystatuses%27%0a%7c%20summarize%20by%20ResourceId%20%3d%20tolower(tostring(properties.targetResourceId))%2c%20AvailabilityState%20%3d%20tostring(properties.availabilityState)" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/HealthResources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.resourcehealth%2favailabilitystatuses%27%0a%7c%20summarize%20by%20ResourceId%20%3d%20tolower(tostring(properties.targetResourceId))%2c%20AvailabilityState%20%3d%20tostring(properties.availabilityState)" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/HealthResources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.resourcehealth%2favailabilitystatuses%27%0a%7c%20summarize%20by%20ResourceId%20%3d%20tolower(tostring(properties.targetResourceId))%2c%20AvailabilityState%20%3d%20tostring(properties.availabilityState)" target="_blank">portal.azure.cn</a>

---

### List of virtual machines by availability state and power state with Resource Ids and resource Groups

Returns list of virtual machines (type `Microsoft.Compute/virtualMachines`) aggregated on their power state and availability state to provide a cohesive state of health for your virtual machines. The query also provides details on the resource group and resource Id associated with each entry for detailed visibility into your resources.

```kusto
Resources
| where type =~ 'microsoft.compute/virtualmachines'
| project resourceGroup, Id = tolower(id), PowerState = tostring( properties.extended.instanceView.powerState.code)
| join kind=leftouter (
  HealthResources
  | where type =~ 'microsoft.resourcehealth/availabilitystatuses'
  | where tostring(properties.targetResourceType) =~ 'microsoft.compute/virtualmachines'
  | project targetResourceId = tolower(tostring(properties.targetResourceId)), AvailabilityState = tostring(properties.availabilityState))
  on $left.Id == $right.targetResourceId
| project-away targetResourceId
| where PowerState != 'PowerState/deallocated'
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type =~ 'microsoft.compute/virtualmachines' | project resourceGroup, Id = tolower(id), PowerState = tostring( properties.extended.instanceView.powerState.code) | join kind=leftouter ( HealthResources | where type =~ 'microsoft.resourcehealth/availabilitystatuses' | where tostring(properties.targetResourceType) =~ 'microsoft.compute/virtualmachines' | project targetResourceId = tolower(tostring(properties.targetResourceId)), AvailabilityState = tostring(properties.availabilityState)) on \$left.Id == \$right.targetResourceId | project-away targetResourceId | where PowerState != 'PowerState/deallocated'"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type =~ 'microsoft.compute/virtualmachines' | project resourceGroup, Id = tolower(id), PowerState = tostring( properties.extended.instanceView.powerState.code) | join kind=leftouter ( HealthResources | where type =~ 'microsoft.resourcehealth/availabilitystatuses' | where tostring(properties.targetResourceType) =~ 'microsoft.compute/virtualmachines' | project targetResourceId = tolower(tostring(properties.targetResourceId)), AvailabilityState = tostring(properties.availabilityState)) on $left.Id == $right.targetResourceId | project-away targetResourceId | where PowerState != 'PowerState/deallocated'"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.compute%2fvirtualmachines%27%0a%7c%20project%20resourceGroup%2c%20Id%20%3d%20tolower(id)%2c%20PowerState%20%3d%20tostring(%20properties.extended.instanceView.powerState.code)%0a%7c%20join%20kind%3dleftouter%20(%0a%09HealthResources%0a%09%7c%20where%20type%20%3d%7e%20%27microsoft.resourcehealth%2favailabilitystatuses%27%0a%09%7c%20where%20tostring(properties.targetResourceType)%20%3d%7e%20%27microsoft.compute%2fvirtualmachines%27%0a%09%7c%20project%20targetResourceId%20%3d%20tolower(tostring(properties.targetResourceId))%2c%20AvailabilityState%20%3d%20tostring(properties.availabilityState))%0a%09on%20%24left.Id%20%3d%3d%20%24right.targetResourceId%0a%7c%20project-away%20targetResourceId%0a%7c%20where%20PowerState%20!%3d%20%27PowerState%2fdeallocated%27" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.compute%2fvirtualmachines%27%0a%7c%20project%20resourceGroup%2c%20Id%20%3d%20tolower(id)%2c%20PowerState%20%3d%20tostring(%20properties.extended.instanceView.powerState.code)%0a%7c%20join%20kind%3dleftouter%20(%0a%09HealthResources%0a%09%7c%20where%20type%20%3d%7e%20%27microsoft.resourcehealth%2favailabilitystatuses%27%0a%09%7c%20where%20tostring(properties.targetResourceType)%20%3d%7e%20%27microsoft.compute%2fvirtualmachines%27%0a%09%7c%20project%20targetResourceId%20%3d%20tolower(tostring(properties.targetResourceId))%2c%20AvailabilityState%20%3d%20tostring(properties.availabilityState))%0a%09on%20%24left.Id%20%3d%3d%20%24right.targetResourceId%0a%7c%20project-away%20targetResourceId%0a%7c%20where%20PowerState%20!%3d%20%27PowerState%2fdeallocated%27" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.compute%2fvirtualmachines%27%0a%7c%20project%20resourceGroup%2c%20Id%20%3d%20tolower(id)%2c%20PowerState%20%3d%20tostring(%20properties.extended.instanceView.powerState.code)%0a%7c%20join%20kind%3dleftouter%20(%0a%09HealthResources%0a%09%7c%20where%20type%20%3d%7e%20%27microsoft.resourcehealth%2favailabilitystatuses%27%0a%09%7c%20where%20tostring(properties.targetResourceType)%20%3d%7e%20%27microsoft.compute%2fvirtualmachines%27%0a%09%7c%20project%20targetResourceId%20%3d%20tolower(tostring(properties.targetResourceId))%2c%20AvailabilityState%20%3d%20tostring(properties.availabilityState))%0a%09on%20%24left.Id%20%3d%3d%20%24right.targetResourceId%0a%7c%20project-away%20targetResourceId%0a%7c%20where%20PowerState%20!%3d%20%27PowerState%2fdeallocated%27" target="_blank">portal.azure.cn</a>

---

### List of virtual machines that are not Available by Resource Ids

Returns the latest list of virtual machines (type `Microsoft.Compute/virtualMachines`) aggregated by their availability state. The populated list only highlights virtual machines whose availability state is not "Available" to ensure you are aware of all the concerning states your virtual machines are in. When all your virtual machines are Available, you can expect to receive no results.

```kusto
HealthResources
| where type =~ 'microsoft.resourcehealth/availabilitystatuses'
| where tostring(properties.availabilityState) != 'Available'
| summarize by ResourceId = tolower(tostring(properties.targetResourceId)), AvailabilityState = tostring(properties.availabilityState)
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "HealthResources | where type =~ 'microsoft.resourcehealth/availabilitystatuses' | where tostring(properties.availabilityState) != 'Available' | summarize by ResourceId = tolower(tostring(properties.targetResourceId)), AvailabilityState = tostring(properties.availabilityState)"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "HealthResources | where type =~ 'microsoft.resourcehealth/availabilitystatuses' | where tostring(properties.availabilityState) != 'Available' | summarize by ResourceId = tolower(tostring(properties.targetResourceId)), AvailabilityState = tostring(properties.availabilityState)"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/HealthResources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.resourcehealth%2favailabilitystatuses%27%0a%7c%20where%20tostring(properties.availabilityState)%20!%3d%20%27Available%27%0a%7c%20summarize%20by%20ResourceId%20%3d%20tolower(tostring(properties.targetResourceId))%2c%20AvailabilityState%20%3d%20tostring(properties.availabilityState)" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/HealthResources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.resourcehealth%2favailabilitystatuses%27%0a%7c%20where%20tostring(properties.availabilityState)%20!%3d%20%27Available%27%0a%7c%20summarize%20by%20ResourceId%20%3d%20tolower(tostring(properties.targetResourceId))%2c%20AvailabilityState%20%3d%20tostring(properties.availabilityState)" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/HealthResources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.resourcehealth%2favailabilitystatuses%27%0a%7c%20where%20tostring(properties.availabilityState)%20!%3d%20%27Available%27%0a%7c%20summarize%20by%20ResourceId%20%3d%20tolower(tostring(properties.targetResourceId))%2c%20AvailabilityState%20%3d%20tostring(properties.availabilityState)" target="_blank">portal.azure.cn</a>

---

### List of Windows Server OS update installation done

Returns a list of status of Windows Server - OS update installation runs done for your machines in last 7 days.

```kusto
PatchInstallationResources
| where type has 'softwarepatches' and properties !has 'version'
| extend machineName = tostring(split(id, '/', 8)), resourceType = tostring(split(type, '/', 0)), tostring(rgName = split(id, '/', 4)), tostring(RunID = split(id, '/', 10))
| extend prop = parse_json(properties)
| extend lTime = todatetime(prop.lastModifiedDateTime), patchName = tostring(prop.patchName), kbId = tostring(prop.kbId), installationState = tostring(prop.installationState), classifications = tostring(prop.classifications)
| where lTime > ago(7d)
| project lTime, RunID, machineName, rgName, resourceType, patchName, kbId, classifications, installationState
| sort by RunID
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "PatchInstallationResources | where type has 'softwarepatches' and properties !has 'version' | extend machineName = tostring(split(id, '/', 8)), resourceType = tostring(split(type, '/', 0)), tostring(rgName = split(id, '/', 4)), tostring(RunID = split(id, '/', 10)) | extend prop = parse_json(properties) | extend lTime = todatetime(prop.lastModifiedDateTime), patchName = tostring(prop.patchName), kbId = tostring(prop.kbId), installationState = tostring(prop.installationState), classifications = tostring(prop.classifications) | where lTime > ago(7d) | project lTime, RunID, machineName, rgName, resourceType, patchName, kbId, classifications, installationState | sort by RunID"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "PatchInstallationResources | where type has 'softwarepatches' and properties !has 'version' | extend machineName = tostring(split(id, '/', 8)), resourceType = tostring(split(type, '/', 0)), tostring(rgName = split(id, '/', 4)), tostring(RunID = split(id, '/', 10)) | extend prop = parse_json(properties) | extend lTime = todatetime(prop.lastModifiedDateTime), patchName = tostring(prop.patchName), kbId = tostring(prop.kbId), installationState = tostring(prop.installationState), classifications = tostring(prop.classifications) | where lTime > ago(7d) | project lTime, RunID, machineName, rgName, resourceType, patchName, kbId, classifications, installationState | sort by RunID"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/PatchAssessmentResources%0a%7c%20where%20type%20has%20%27softwarepatches%27%20and%20properties%20!has%20%27version%27%0a%7c%20extend%20machineName%20%3d%20tostring(split(id%2c%20%27%2f%27%2c%208))%2c%20resourceType%20%3d%20tostring(split(type%2c%20%27%2f%27%2c%200))%2c%20tostring(rgName%20%3d%20split(id%2c%20%27%2f%27%2c%204))%2c%20tostring(RunID%20%3d%20split(id%2c%20%27%2f%27%2c%2010))%0a%7c%20extend%20prop%20%3d%20parse_json(properties)%0a%7c%20extend%20lTime%20%3d%20todatetime(prop.lastModifiedDateTime)%2c%20patchName%20%3d%20tostring(prop.patchName)%2c%20kbId%20%3d%20tostring(prop.kbId)%2c%20installationState%20%3d%20tostring(prop.installationState)%2c%20classifications%20%3d%20tostring(prop.classifications)%0a%7c%20where%20lTime%20%3e%20ago(7d)%0a%7c%20project%20lTime%2c%20RunID%2c%20machineName%2c%20rgName%2c%20resourceType%2c%20patchName%2c%20kbId%2c%20classifications%2c%20installationState%0a%7c%20sort%20by%20RunID" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/PatchAssessmentResources%0a%7c%20where%20type%20has%20%27softwarepatches%27%20and%20properties%20!has%20%27version%27%0a%7c%20extend%20machineName%20%3d%20tostring(split(id%2c%20%27%2f%27%2c%208))%2c%20resourceType%20%3d%20tostring(split(type%2c%20%27%2f%27%2c%200))%2c%20tostring(rgName%20%3d%20split(id%2c%20%27%2f%27%2c%204))%2c%20tostring(RunID%20%3d%20split(id%2c%20%27%2f%27%2c%2010))%0a%7c%20extend%20prop%20%3d%20parse_json(properties)%0a%7c%20extend%20lTime%20%3d%20todatetime(prop.lastModifiedDateTime)%2c%20patchName%20%3d%20tostring(prop.patchName)%2c%20kbId%20%3d%20tostring(prop.kbId)%2c%20installationState%20%3d%20tostring(prop.installationState)%2c%20classifications%20%3d%20tostring(prop.classifications)%0a%7c%20where%20lTime%20%3e%20ago(7d)%0a%7c%20project%20lTime%2c%20RunID%2c%20machineName%2c%20rgName%2c%20resourceType%2c%20patchName%2c%20kbId%2c%20classifications%2c%20installationState%0a%7c%20sort%20by%20RunID" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/PatchAssessmentResources%0a%7c%20where%20type%20has%20%27softwarepatches%27%20and%20properties%20!has%20%27version%27%0a%7c%20extend%20machineName%20%3d%20tostring(split(id%2c%20%27%2f%27%2c%208))%2c%20resourceType%20%3d%20tostring(split(type%2c%20%27%2f%27%2c%200))%2c%20tostring(rgName%20%3d%20split(id%2c%20%27%2f%27%2c%204))%2c%20tostring(RunID%20%3d%20split(id%2c%20%27%2f%27%2c%2010))%0a%7c%20extend%20prop%20%3d%20parse_json(properties)%0a%7c%20extend%20lTime%20%3d%20todatetime(prop.lastModifiedDateTime)%2c%20patchName%20%3d%20tostring(prop.patchName)%2c%20kbId%20%3d%20tostring(prop.kbId)%2c%20installationState%20%3d%20tostring(prop.installationState)%2c%20classifications%20%3d%20tostring(prop.classifications)%0a%7c%20where%20lTime%20%3e%20ago(7d)%0a%7c%20project%20lTime%2c%20RunID%2c%20machineName%2c%20rgName%2c%20resourceType%2c%20patchName%2c%20kbId%2c%20classifications%2c%20installationState%0a%7c%20sort%20by%20RunID" target="_blank">portal.azure.cn</a>

---

### List virtual machines with their network interface and public IP

This query uses two **leftouter** `join` commands to bring together virtual machines created with the Resource Manager deployment model, their related network interfaces, and any public IP address related to those network interfaces.

```kusto
Resources
| where type =~ 'microsoft.compute/virtualmachines'
| extend nics=array_length(properties.networkProfile.networkInterfaces)
| mv-expand nic=properties.networkProfile.networkInterfaces
| where nics == 1 or nic.properties.primary =~ 'true' or isempty(nic)
| project vmId = id, vmName = name, vmSize=tostring(properties.hardwareProfile.vmSize), nicId = tostring(nic.id)
| join kind=leftouter (
  Resources
  | where type =~ 'microsoft.network/networkinterfaces'
  | extend ipConfigsCount=array_length(properties.ipConfigurations)
  | mv-expand ipconfig=properties.ipConfigurations
  | where ipConfigsCount == 1 or ipconfig.properties.primary =~ 'true'
  | project nicId = id, publicIpId = tostring(ipconfig.properties.publicIPAddress.id))
  on nicId
| project-away nicId1
| summarize by vmId, vmName, vmSize, nicId, publicIpId
| join kind=leftouter (
  Resources
  | where type =~ 'microsoft.network/publicipaddresses'
  | project publicIpId = id, publicIpAddress = properties.ipAddress)
on publicIpId
| project-away publicIpId1
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type =~ 'microsoft.compute/virtualmachines' | extend nics=array_length(properties.networkProfile.networkInterfaces) | mv-expand nic=properties.networkProfile.networkInterfaces | where nics == 1 or nic.properties.primary =~ 'true' or isempty(nic) | project vmId = id, vmName = name, vmSize=tostring(properties.hardwareProfile.vmSize), nicId = tostring(nic.id) | join kind=leftouter ( Resources | where type =~ 'microsoft.network/networkinterfaces' | extend ipConfigsCount=array_length(properties.ipConfigurations) | mv-expand ipconfig=properties.ipConfigurations | where ipConfigsCount == 1 or ipconfig.properties.primary =~ 'true' | project nicId = id, publicIpId = tostring(ipconfig.properties.publicIPAddress.id)) on nicId | project-away nicId1 | summarize by vmId, vmName, vmSize, nicId, publicIpId | join kind=leftouter ( Resources | where type =~ 'microsoft.network/publicipaddresses' | project publicIpId = id, publicIpAddress = properties.ipAddress) on publicIpId | project-away publicIpId1"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type =~ 'microsoft.compute/virtualmachines' | extend nics=array_length(properties.networkProfile.networkInterfaces) | mv-expand nic=properties.networkProfile.networkInterfaces | where nics == 1 or nic.properties.primary =~ 'true' or isempty(nic) | project vmId = id, vmName = name, vmSize=tostring(properties.hardwareProfile.vmSize), nicId = tostring(nic.id) | join kind=leftouter ( Resources | where type =~ 'microsoft.network/networkinterfaces' | extend ipConfigsCount=array_length(properties.ipConfigurations) | mv-expand ipconfig=properties.ipConfigurations | where ipConfigsCount == 1 or ipconfig.properties.primary =~ 'true' | project nicId = id, publicIpId = tostring(ipconfig.properties.publicIPAddress.id)) on nicId | project-away nicId1 | summarize by vmId, vmName, vmSize, nicId, publicIpId | join kind=leftouter ( Resources | where type =~ 'microsoft.network/publicipaddresses' | project publicIpId = id, publicIpAddress = properties.ipAddress) on publicIpId | project-away publicIpId1"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.compute%2fvirtualmachines%27%0a%7c%20extend%20nics%3darray_length(properties.networkProfile.networkInterfaces)%0a%7c%20mv-expand%20nic%3dproperties.networkProfile.networkInterfaces%0a%7c%20where%20nics%20%3d%3d%201%20or%20nic.properties.primary%20%3d%7e%20%27true%27%20or%20isempty(nic)%0a%7c%20project%20vmId%20%3d%20id%2c%20vmName%20%3d%20name%2c%20vmSize%3dtostring(properties.hardwareProfile.vmSize)%2c%20nicId%20%3d%20tostring(nic.id)%0a%7c%20join%20kind%3dleftouter%20(%0a%09Resources%0a%09%7c%20where%20type%20%3d%7e%20%27microsoft.network%2fnetworkinterfaces%27%0a%09%7c%20extend%20ipConfigsCount%3darray_length(properties.ipConfigurations)%0a%09%7c%20mv-expand%20ipconfig%3dproperties.ipConfigurations%0a%09%7c%20where%20ipConfigsCount%20%3d%3d%201%20or%20ipconfig.properties.primary%20%3d%7e%20%27true%27%0a%09%7c%20project%20nicId%20%3d%20id%2c%20publicIpId%20%3d%20tostring(ipconfig.properties.publicIPAddress.id))%0a%09on%20nicId%0a%7c%20project-away%20nicId1%0a%7c%20summarize%20by%20vmId%2c%20vmName%2c%20vmSize%2c%20nicId%2c%20publicIpId%0a%7c%20join%20kind%3dleftouter%20(%0a%09Resources%0a%09%7c%20where%20type%20%3d%7e%20%27microsoft.network%2fpublicipaddresses%27%0a%09%7c%20project%20publicIpId%20%3d%20id%2c%20publicIpAddress%20%3d%20properties.ipAddress)%0aon%20publicIpId%0a%7c%20project-away%20publicIpId1" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.compute%2fvirtualmachines%27%0a%7c%20extend%20nics%3darray_length(properties.networkProfile.networkInterfaces)%0a%7c%20mv-expand%20nic%3dproperties.networkProfile.networkInterfaces%0a%7c%20where%20nics%20%3d%3d%201%20or%20nic.properties.primary%20%3d%7e%20%27true%27%20or%20isempty(nic)%0a%7c%20project%20vmId%20%3d%20id%2c%20vmName%20%3d%20name%2c%20vmSize%3dtostring(properties.hardwareProfile.vmSize)%2c%20nicId%20%3d%20tostring(nic.id)%0a%7c%20join%20kind%3dleftouter%20(%0a%09Resources%0a%09%7c%20where%20type%20%3d%7e%20%27microsoft.network%2fnetworkinterfaces%27%0a%09%7c%20extend%20ipConfigsCount%3darray_length(properties.ipConfigurations)%0a%09%7c%20mv-expand%20ipconfig%3dproperties.ipConfigurations%0a%09%7c%20where%20ipConfigsCount%20%3d%3d%201%20or%20ipconfig.properties.primary%20%3d%7e%20%27true%27%0a%09%7c%20project%20nicId%20%3d%20id%2c%20publicIpId%20%3d%20tostring(ipconfig.properties.publicIPAddress.id))%0a%09on%20nicId%0a%7c%20project-away%20nicId1%0a%7c%20summarize%20by%20vmId%2c%20vmName%2c%20vmSize%2c%20nicId%2c%20publicIpId%0a%7c%20join%20kind%3dleftouter%20(%0a%09Resources%0a%09%7c%20where%20type%20%3d%7e%20%27microsoft.network%2fpublicipaddresses%27%0a%09%7c%20project%20publicIpId%20%3d%20id%2c%20publicIpAddress%20%3d%20properties.ipAddress)%0aon%20publicIpId%0a%7c%20project-away%20publicIpId1" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.compute%2fvirtualmachines%27%0a%7c%20extend%20nics%3darray_length(properties.networkProfile.networkInterfaces)%0a%7c%20mv-expand%20nic%3dproperties.networkProfile.networkInterfaces%0a%7c%20where%20nics%20%3d%3d%201%20or%20nic.properties.primary%20%3d%7e%20%27true%27%20or%20isempty(nic)%0a%7c%20project%20vmId%20%3d%20id%2c%20vmName%20%3d%20name%2c%20vmSize%3dtostring(properties.hardwareProfile.vmSize)%2c%20nicId%20%3d%20tostring(nic.id)%0a%7c%20join%20kind%3dleftouter%20(%0a%09Resources%0a%09%7c%20where%20type%20%3d%7e%20%27microsoft.network%2fnetworkinterfaces%27%0a%09%7c%20extend%20ipConfigsCount%3darray_length(properties.ipConfigurations)%0a%09%7c%20mv-expand%20ipconfig%3dproperties.ipConfigurations%0a%09%7c%20where%20ipConfigsCount%20%3d%3d%201%20or%20ipconfig.properties.primary%20%3d%7e%20%27true%27%0a%09%7c%20project%20nicId%20%3d%20id%2c%20publicIpId%20%3d%20tostring(ipconfig.properties.publicIPAddress.id))%0a%09on%20nicId%0a%7c%20project-away%20nicId1%0a%7c%20summarize%20by%20vmId%2c%20vmName%2c%20vmSize%2c%20nicId%2c%20publicIpId%0a%7c%20join%20kind%3dleftouter%20(%0a%09Resources%0a%09%7c%20where%20type%20%3d%7e%20%27microsoft.network%2fpublicipaddresses%27%0a%09%7c%20project%20publicIpId%20%3d%20id%2c%20publicIpAddress%20%3d%20properties.ipAddress)%0aon%20publicIpId%0a%7c%20project-away%20publicIpId1" target="_blank">portal.azure.cn</a>

---

### Show all virtual machines ordered by name in descending order

To list only virtual machines (which are type `Microsoft.Compute/virtualMachines`), we can match the property **type** in the results. Similar to the previous query, `desc` changes the `order by` to be descending. The `=~` in the type match tells Resource Graph to be case insensitive.

```kusto
Resources
| project name, location, type
| where type =~ 'Microsoft.Compute/virtualMachines'
| order by name desc
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | project name, location, type | where type =~ 'Microsoft.Compute/virtualMachines' | order by name desc"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | project name, location, type | where type =~ 'Microsoft.Compute/virtualMachines' | order by name desc"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20project%20name%2c%20location%2c%20type%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.Compute%2fvirtualMachines%27%0a%7c%20order%20by%20name%20desc" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20project%20name%2c%20location%2c%20type%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.Compute%2fvirtualMachines%27%0a%7c%20order%20by%20name%20desc" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20project%20name%2c%20location%2c%20type%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.Compute%2fvirtualMachines%27%0a%7c%20order%20by%20name%20desc" target="_blank">portal.azure.cn</a>

---

### Show first five virtual machines by name and their OS type

This query uses `top` to only retrieve five matching records that are ordered by name. The type of the Azure resource is `Microsoft.Compute/virtualMachines`. `project` tells Azure Resource Graph which properties to include.

```kusto
Resources
| where type =~ 'Microsoft.Compute/virtualMachines'
| project name, properties.storageProfile.osDisk.osType
| top 5 by name desc
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type =~ 'Microsoft.Compute/virtualMachines' | project name, properties.storageProfile.osDisk.osType | top 5 by name desc"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type =~ 'Microsoft.Compute/virtualMachines' | project name, properties.storageProfile.osDisk.osType | top 5 by name desc"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.Compute%2fvirtualMachines%27%0a%7c%20project%20name%2c%20properties.storageProfile.osDisk.osType%0a%7c%20top%205%20by%20name%20desc" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.Compute%2fvirtualMachines%27%0a%7c%20project%20name%2c%20properties.storageProfile.osDisk.osType%0a%7c%20top%205%20by%20name%20desc" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27Microsoft.Compute%2fvirtualMachines%27%0a%7c%20project%20name%2c%20properties.storageProfile.osDisk.osType%0a%7c%20top%205%20by%20name%20desc" target="_blank">portal.azure.cn</a>

---

### Summarize virtual machine by the power states extended property

This query uses the [extended properties](https://learn.microsoft.com/azure/governance/resource-graph/concepts/query-language#extended-properties) on virtual machines to summarize by power states.

```kusto
Resources
| where type == 'microsoft.compute/virtualmachines'
| summarize count() by tostring(properties.extended.instanceView.powerState.code)
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type == 'microsoft.compute/virtualmachines' | summarize count() by tostring(properties.extended.instanceView.powerState.code)"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type == 'microsoft.compute/virtualmachines' | summarize count() by tostring(properties.extended.instanceView.powerState.code)"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.compute%2fvirtualmachines%27%0a%7c%20summarize%20count()%20by%20tostring(properties.extended.instanceView.powerState.code)" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.compute%2fvirtualmachines%27%0a%7c%20summarize%20count()%20by%20tostring(properties.extended.instanceView.powerState.code)" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.compute%2fvirtualmachines%27%0a%7c%20summarize%20count()%20by%20tostring(properties.extended.instanceView.powerState.code)" target="_blank">portal.azure.cn</a>

---

### Virtual machines matched by regex

This query looks for virtual machines that match a [regular expression](https://learn.microsoft.com/dotnet/standard/base-types/regular-expression-language-quick-reference) (known as _regex_). The **matches regex \@** allows us to define the regex to match, which is `^Contoso(.*)[0-9]+$`. That regex definition is explained as:

- `^` - Match must start at the beginning of the string.
- `Contoso` - The case-sensitive string.
- `(.*)` - A subexpression match:
  - `.` - Matches any single character (except a new line).
  - `*` - Matches previous element zero or more times.
- `[0-9]` - Character group match for numbers 0 through 9.
- `+` - Matches previous element one or more times.
- `$` - Match of the previous element must occur at the end of the string.

After matching by name, the query projects the name and orders by name ascending.

```kusto
Resources
| where type =~ 'microsoft.compute/virtualmachines' and name matches regex @'^Contoso(.*)[0-9]+$'
| project name
| order by name asc
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type =~ 'microsoft.compute/virtualmachines' and name matches regex @'^Contoso(.*)[0-9]+\$' | project name | order by name asc"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type =~ 'microsoft.compute/virtualmachines' and name matches regex @'^Contoso(.*)[0-9]+$' | project name | order by name asc"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.compute%2fvirtualmachines%27%20and%20name%20matches%20regex%20%40%27%5eContoso(.*)%5b0-9%5d%2b%24%27%0a%7c%20project%20name%0a%7c%20order%20by%20name%20asc" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.compute%2fvirtualmachines%27%20and%20name%20matches%20regex%20%40%27%5eContoso(.*)%5b0-9%5d%2b%24%27%0a%7c%20project%20name%0a%7c%20order%20by%20name%20asc" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.compute%2fvirtualmachines%27%20and%20name%20matches%20regex%20%40%27%5eContoso(.*)%5b0-9%5d%2b%24%27%0a%7c%20project%20name%0a%7c%20order%20by%20name%20asc" target="_blank">portal.azure.cn</a>

---


## General


### Count Azure resources

This query returns number of Azure resources that exist in the subscriptions that you have access to. It's also a good query to validate your shell of choice has the appropriate Azure Resource Graph components installed and in working order.

```kusto
Resources
| summarize count()
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | summarize count()"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | summarize count()"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20summarize%20count()" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20summarize%20count()" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20summarize%20count()" target="_blank">portal.azure.cn</a>

---

### List impacted resources when transferring an Azure subscription

Returns some of the Azure resources that are impacted when you transfer a subscription to a different Azure Active Directory (Azure AD) directory. You will need to re-create some of the resources that existed prior to the subscription transfer.

```kusto
Resources
| where type in (
	'microsoft.managedidentity/userassignedidentities',
	'microsoft.keyvault/vaults',
	'microsoft.sql/servers/databases',
	'microsoft.datalakestore/accounts',
	'microsoft.containerservice/managedclusters')
	or identity has 'SystemAssigned'
	or (type =~ 'microsoft.storage/storageaccounts' and properties['isHnsEnabled'] == true)
| summarize count() by type
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type in ( 'microsoft.managedidentity/userassignedidentities', 'microsoft.keyvault/vaults', 'microsoft.sql/servers/databases', 'microsoft.datalakestore/accounts', 'microsoft.containerservice/managedclusters') or identity has 'SystemAssigned' or (type =~ 'microsoft.storage/storageaccounts' and properties['isHnsEnabled'] == true) | summarize count() by type"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type in ( 'microsoft.managedidentity/userassignedidentities', 'microsoft.keyvault/vaults', 'microsoft.sql/servers/databases', 'microsoft.datalakestore/accounts', 'microsoft.containerservice/managedclusters') or identity has 'SystemAssigned' or (type =~ 'microsoft.storage/storageaccounts' and properties['isHnsEnabled'] == true) | summarize count() by type"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20in%20(%0a%09%27microsoft.managedidentity%2fuserassignedidentities%27%2c%0a%09%27microsoft.keyvault%2fvaults%27%2c%0a%09%27microsoft.sql%2fservers%2fdatabases%27%2c%0a%09%27microsoft.datalakestore%2faccounts%27%2c%0a%09%27microsoft.containerservice%2fmanagedclusters%27)%0a%09or%20identity%20has%20%27SystemAssigned%27%0a%09or%20(type%20%3d%7e%20%27microsoft.storage%2fstorageaccounts%27%20and%20properties%5b%27isHnsEnabled%27%5d%20%3d%3d%20true)%0a%7c%20summarize%20count()%20by%20type" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20in%20(%0a%09%27microsoft.managedidentity%2fuserassignedidentities%27%2c%0a%09%27microsoft.keyvault%2fvaults%27%2c%0a%09%27microsoft.sql%2fservers%2fdatabases%27%2c%0a%09%27microsoft.datalakestore%2faccounts%27%2c%0a%09%27microsoft.containerservice%2fmanagedclusters%27)%0a%09or%20identity%20has%20%27SystemAssigned%27%0a%09or%20(type%20%3d%7e%20%27microsoft.storage%2fstorageaccounts%27%20and%20properties%5b%27isHnsEnabled%27%5d%20%3d%3d%20true)%0a%7c%20summarize%20count()%20by%20type" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20in%20(%0a%09%27microsoft.managedidentity%2fuserassignedidentities%27%2c%0a%09%27microsoft.keyvault%2fvaults%27%2c%0a%09%27microsoft.sql%2fservers%2fdatabases%27%2c%0a%09%27microsoft.datalakestore%2faccounts%27%2c%0a%09%27microsoft.containerservice%2fmanagedclusters%27)%0a%09or%20identity%20has%20%27SystemAssigned%27%0a%09or%20(type%20%3d%7e%20%27microsoft.storage%2fstorageaccounts%27%20and%20properties%5b%27isHnsEnabled%27%5d%20%3d%3d%20true)%0a%7c%20summarize%20count()%20by%20type" target="_blank">portal.azure.cn</a>

---

### List resources sorted by name

This query returns any type of resource, but only the **name**, **type**, and **location** properties. It uses `order by` to sort the properties by the **name** property in ascending (`asc`) order.

```kusto
Resources
| project name, type, location
| order by name asc
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | project name, type, location | order by name asc"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | project name, type, location | order by name asc"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20project%20name%2c%20type%2c%20location%0a%7c%20order%20by%20name%20asc" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20project%20name%2c%20type%2c%20location%0a%7c%20order%20by%20name%20asc" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20project%20name%2c%20type%2c%20location%0a%7c%20order%20by%20name%20asc" target="_blank">portal.azure.cn</a>

---

### Remove columns from results

The following query uses `summarize` to count resources by subscription, `join` to combine it with subscription details from _ResourceContainers_ table, then `project-away` to remove some of the columns.

```kusto
Resources
| summarize resourceCount=count() by subscriptionId
| join (ResourceContainers | where type=='microsoft.resources/subscriptions' | project SubName=name, subscriptionId) on subscriptionId
| project-away subscriptionId, subscriptionId1
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | summarize resourceCount=count() by subscriptionId | join (ResourceContainers | where type=='microsoft.resources/subscriptions' | project SubName=name, subscriptionId) on subscriptionId | project-away subscriptionId, subscriptionId1"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | summarize resourceCount=count() by subscriptionId | join (ResourceContainers | where type=='microsoft.resources/subscriptions' | project SubName=name, subscriptionId) on subscriptionId | project-away subscriptionId, subscriptionId1"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20summarize%20resourceCount%3dcount()%20by%20subscriptionId%0a%7c%20join%20(ResourceContainers%20%7c%20where%20type%3d%3d%27microsoft.resources%2fsubscriptions%27%20%7c%20project%20SubName%3dname%2c%20subscriptionId)%20on%20subscriptionId%0a%7c%20project-away%20subscriptionId%2c%20subscriptionId1" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20summarize%20resourceCount%3dcount()%20by%20subscriptionId%0a%7c%20join%20(ResourceContainers%20%7c%20where%20type%3d%3d%27microsoft.resources%2fsubscriptions%27%20%7c%20project%20SubName%3dname%2c%20subscriptionId)%20on%20subscriptionId%0a%7c%20project-away%20subscriptionId%2c%20subscriptionId1" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20summarize%20resourceCount%3dcount()%20by%20subscriptionId%0a%7c%20join%20(ResourceContainers%20%7c%20where%20type%3d%3d%27microsoft.resources%2fsubscriptions%27%20%7c%20project%20SubName%3dname%2c%20subscriptionId)%20on%20subscriptionId%0a%7c%20project-away%20subscriptionId%2c%20subscriptionId1" target="_blank">portal.azure.cn</a>

---

### Show resource types and API versions

Resource Graph primarily uses the most recent non-preview version of a Resource Provider's API to `GET` resource properties during an update. In some cases, the API version used has been overridden to provide more current or widely used properties in the results. The following query details the API version used for gathering properties on each resource type:

```kusto
Resources
| distinct type, apiVersion
| where isnotnull(apiVersion)
| order by type asc
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | distinct type, apiVersion | where isnotnull(apiVersion) | order by type asc"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | distinct type, apiVersion | where isnotnull(apiVersion) | order by type asc"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20distinct%20type%2c%20apiVersion%0a%7c%20where%20isnotnull(apiVersion)%0a%7c%20order%20by%20type%20asc" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20distinct%20type%2c%20apiVersion%0a%7c%20where%20isnotnull(apiVersion)%0a%7c%20order%20by%20type%20asc" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20distinct%20type%2c%20apiVersion%0a%7c%20where%20isnotnull(apiVersion)%0a%7c%20order%20by%20type%20asc" target="_blank">portal.azure.cn</a>

---


## IoT Defender

### Count all sensors by type

This query summarizes all sensors by their type (OT, EIoT).

```kusto
iotsecurityresources
| where type == 'microsoft.iotsecurity/sensors'
| summarize count() by tostring(properties.sensorType)
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "iotsecurityresources | where type == 'microsoft.iotsecurity/sensors' | summarize count() by tostring(properties.sensorType)"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "iotsecurityresources | where type == 'microsoft.iotsecurity/sensors' | summarize count() by tostring(properties.sensorType)"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/iotsecurityresources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.iotsecurity%2fsensors%27%0a%7c%20summarize%20count()%20by%20tostring(properties.sensorType)" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/iotsecurityresources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.iotsecurity%2fsensors%27%0a%7c%20summarize%20count()%20by%20tostring(properties.sensorType)" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/iotsecurityresources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.iotsecurity%2fsensors%27%0a%7c%20summarize%20count()%20by%20tostring(properties.sensorType)" target="_blank">portal.azure.cn</a>

---

### Count how many IoT Devices there are in your network, by operation system

This query summarizes all IoT Devices by their operation system's platform.

```kusto
iotsecurityresources
| where type == 'microsoft.iotsecurity/locations/devicegroups/devices'
| summarize count() by tostring(properties.operatingSystem.platform)
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "iotsecurityresources | where type == 'microsoft.iotsecurity/locations/devicegroups/devices' | summarize count() by tostring(properties.operatingSystem.platform)"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "iotsecurityresources | where type == 'microsoft.iotsecurity/locations/devicegroups/devices' | summarize count() by tostring(properties.operatingSystem.platform)"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/iotsecurityresources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.iotsecurity%2flocations%2fdevicegroups%2fdevices%27%0a%7c%20summarize%20count()%20by%20tostring(properties.operatingSystem.platform)" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/iotsecurityresources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.iotsecurity%2flocations%2fdevicegroups%2fdevices%27%0a%7c%20summarize%20count()%20by%20tostring(properties.operatingSystem.platform)" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/iotsecurityresources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.iotsecurity%2flocations%2fdevicegroups%2fdevices%27%0a%7c%20summarize%20count()%20by%20tostring(properties.operatingSystem.platform)" target="_blank">portal.azure.cn</a>

---

### Get all High severity recommendations

This query provides a list of all the user's High severity recommendations.

```kusto
iotsecurityresources
| where type == 'microsoft.iotsecurity/locations/devicegroups/recommendations'
| where properties.severity == 'High'
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "iotsecurityresources | where type == 'microsoft.iotsecurity/locations/devicegroups/recommendations' | where properties.severity == 'High'"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "iotsecurityresources | where type == 'microsoft.iotsecurity/locations/devicegroups/recommendations' | where properties.severity == 'High'"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/iotsecurityresources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.iotsecurity%2flocations%2fdevicegroups%2frecommendations%27%0a%7c%20where%20properties.severity%20%3d%3d%20%27High%27" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/iotsecurityresources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.iotsecurity%2flocations%2fdevicegroups%2frecommendations%27%0a%7c%20where%20properties.severity%20%3d%3d%20%27High%27" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/iotsecurityresources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.iotsecurity%2flocations%2fdevicegroups%2frecommendations%27%0a%7c%20where%20properties.severity%20%3d%3d%20%27High%27" target="_blank">portal.azure.cn</a>

---

### List sites with a specific tag value

This query provides a list of all sites with specific tag value.

```kusto
iotsecurityresources
| where type == 'microsoft.iotsecurity/sites'
| where properties.tags['key'] =~ 'value1'
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "iotsecurityresources | where type == 'microsoft.iotsecurity/sites' | where properties.tags['key'] =~ 'value1'"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "iotsecurityresources | where type == 'microsoft.iotsecurity/sites' | where properties.tags['key'] =~ 'value1'"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/iotsecurityresources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.iotsecurity%2fsites%27%0a%7c%20where%20properties.tags%5b%27key%27%5d%20%3d%7e%20%27value1%27" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/iotsecurityresources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.iotsecurity%2fsites%27%0a%7c%20where%20properties.tags%5b%27key%27%5d%20%3d%7e%20%27value1%27" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/iotsecurityresources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.iotsecurity%2fsites%27%0a%7c%20where%20properties.tags%5b%27key%27%5d%20%3d%7e%20%27value1%27" target="_blank">portal.azure.cn</a>

---


## Management groups


### Count of subscriptions per management group

Summarizes the count of subscriptions in each management group.

```kusto
ResourceContainers
| where type =~ 'microsoft.management/managementgroups'
| project mgname = name
| join kind=leftouter (resourcecontainers | where type=~ 'microsoft.resources/subscriptions'
| extend  mgParent = properties.managementGroupAncestorsChain | project id, mgname = tostring(mgParent[0].name)) on mgname
| summarize count() by mgname
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "ResourceContainers | where type =~ 'microsoft.management/managementgroups' | project mgname = name | join kind=leftouter (resourcecontainers | where type=~ 'microsoft.resources/subscriptions' | extend mgParent = properties.managementGroupAncestorsChain | project id, mgname = tostring(mgParent[0].name)) on mgname | summarize count() by mgname"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "ResourceContainers | where type =~ 'microsoft.management/managementgroups' | project mgname = name | join kind=leftouter (resourcecontainers | where type=~ 'microsoft.resources/subscriptions' | extend mgParent = properties.managementGroupAncestorsChain | project id, mgname = tostring(mgParent[0].name)) on mgname | summarize count() by mgname" -UseTenantScope
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/ResourceContainers%0a%7c%20where%20type%20%3d%7e%20%27microsoft.management%2fmanagementgroups%27%0a%7c%20project%20mgname%20%3d%20name%0a%7c%20join%20kind%3dleftouter%20(resourcecontainers%20%7c%20where%20type%3d%7e%20%27microsoft.resources%2fsubscriptions%27%0a%7c%20extend%20%20mgParent%20%3d%20properties.managementGroupAncestorsChain%20%7c%20project%20id%2c%20mgname%20%3d%20tostring(mgParent%5b0%5d.name))%20on%20mgname%0a%7c%20summarize%20count()%20by%20mgname" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/ResourceContainers%0a%7c%20where%20type%20%3d%7e%20%27microsoft.management%2fmanagementgroups%27%0a%7c%20project%20mgname%20%3d%20name%0a%7c%20join%20kind%3dleftouter%20(resourcecontainers%20%7c%20where%20type%3d%7e%20%27microsoft.resources%2fsubscriptions%27%0a%7c%20extend%20%20mgParent%20%3d%20properties.managementGroupAncestorsChain%20%7c%20project%20id%2c%20mgname%20%3d%20tostring(mgParent%5b0%5d.name))%20on%20mgname%0a%7c%20summarize%20count()%20by%20mgname" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/ResourceContainers%0a%7c%20where%20type%20%3d%7e%20%27microsoft.management%2fmanagementgroups%27%0a%7c%20project%20mgname%20%3d%20name%0a%7c%20join%20kind%3dleftouter%20(resourcecontainers%20%7c%20where%20type%3d%7e%20%27microsoft.resources%2fsubscriptions%27%0a%7c%20extend%20%20mgParent%20%3d%20properties.managementGroupAncestorsChain%20%7c%20project%20id%2c%20mgname%20%3d%20tostring(mgParent%5b0%5d.name))%20on%20mgname%0a%7c%20summarize%20count()%20by%20mgname" target="_blank">portal.azure.cn</a>

---

### List all management group ancestors for a specified management group

Provides the management group hierarchy details for the management group specified in the [query scope](../concepts/query-language.md#query-scope). In this example, the management group is named **Application**.

```kusto
ResourceContainers
| where type =~ 'microsoft.management/managementgroups'
| extend  mgParent = properties.details.managementGroupAncestorsChain
| mv-expand with_itemindex=MGHierarchy mgParent
| project name, properties.displayName, mgParent, MGHierarchy, mgParent.name
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "ResourceContainers | where type =~ 'microsoft.management/managementgroups' | extend mgParent = properties.details.managementGroupAncestorsChain | mv-expand with_itemindex=MGHierarchy mgParent | project name, properties.displayName, mgParent, MGHierarchy, mgParent.name" --management-groups Application
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "ResourceContainers | where type =~ 'microsoft.management/managementgroups' | extend mgParent = properties.details.managementGroupAncestorsChain | mv-expand with_itemindex=MGHierarchy mgParent | project name, properties.displayName, mgParent, MGHierarchy, mgParent.name" -ManagementGroup Application
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/ResourceContainers%0a%7c%20where%20type%20%3d%7e%20%27microsoft.management%2fmanagementgroups%27%0a%7c%20extend%20%20mgParent%20%3d%20properties.details.managementGroupAncestorsChain%0a%7c%20mv-expand%20with_itemindex%3dMGHierarchy%20mgParent%0a%7c%20project%20name%2c%20properties.displayName%2c%20mgParent%2c%20MGHierarchy%2c%20mgParent.name" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/ResourceContainers%0a%7c%20where%20type%20%3d%7e%20%27microsoft.management%2fmanagementgroups%27%0a%7c%20extend%20%20mgParent%20%3d%20properties.details.managementGroupAncestorsChain%0a%7c%20mv-expand%20with_itemindex%3dMGHierarchy%20mgParent%0a%7c%20project%20name%2c%20properties.displayName%2c%20mgParent%2c%20MGHierarchy%2c%20mgParent.name" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/ResourceContainers%0a%7c%20where%20type%20%3d%7e%20%27microsoft.management%2fmanagementgroups%27%0a%7c%20extend%20%20mgParent%20%3d%20properties.details.managementGroupAncestorsChain%0a%7c%20mv-expand%20with_itemindex%3dMGHierarchy%20mgParent%0a%7c%20project%20name%2c%20properties.displayName%2c%20mgParent%2c%20MGHierarchy%2c%20mgParent.name" target="_blank">portal.azure.cn</a>

---

### List all management group ancestors for a specified subscription

Provides the management group hierarchy details for the subscription specified in the [query scope](../concepts/query-language.md#query-scope). In this example, the subscription GUID is **11111111-1111-1111-1111-111111111111**.

```kusto
ResourceContainers
| where type =~ 'microsoft.resources/subscriptions'
| extend  mgParent = properties.managementGroupAncestorsChain
| mv-expand with_itemindex=MGHierarchy mgParent
| project subscriptionId, name, mgParent, MGHierarchy, mgParent.name
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "ResourceContainers | where type =~ 'microsoft.resources/subscriptions' | extend mgParent = properties.managementGroupAncestorsChain | mv-expand with_itemindex=MGHierarchy mgParent | project subscriptionId, name, mgParent, MGHierarchy, mgParent.name" --subscriptions 11111111-1111-1111-1111-111111111111
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "ResourceContainers | where type =~ 'microsoft.resources/subscriptions' | extend mgParent = properties.managementGroupAncestorsChain | mv-expand with_itemindex=MGHierarchy mgParent | project subscriptionId, name, mgParent, MGHierarchy, mgParent.name" -Subscription 11111111-1111-1111-1111-111111111111
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/ResourceContainers%0a%7c%20where%20type%20%3d%7e%20%27microsoft.resources%2fsubscriptions%27%0a%7c%20extend%20%20mgParent%20%3d%20properties.managementGroupAncestorsChain%0a%7c%20mv-expand%20with_itemindex%3dMGHierarchy%20mgParent%0a%7c%20project%20subscriptionId%2c%20name%2c%20mgParent%2c%20MGHierarchy%2c%20mgParent.name" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/ResourceContainers%0a%7c%20where%20type%20%3d%7e%20%27microsoft.resources%2fsubscriptions%27%0a%7c%20extend%20%20mgParent%20%3d%20properties.managementGroupAncestorsChain%0a%7c%20mv-expand%20with_itemindex%3dMGHierarchy%20mgParent%0a%7c%20project%20subscriptionId%2c%20name%2c%20mgParent%2c%20MGHierarchy%2c%20mgParent.name" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/ResourceContainers%0a%7c%20where%20type%20%3d%7e%20%27microsoft.resources%2fsubscriptions%27%0a%7c%20extend%20%20mgParent%20%3d%20properties.managementGroupAncestorsChain%0a%7c%20mv-expand%20with_itemindex%3dMGHierarchy%20mgParent%0a%7c%20project%20subscriptionId%2c%20name%2c%20mgParent%2c%20MGHierarchy%2c%20mgParent.name" target="_blank">portal.azure.cn</a>

---

### List all subscriptions under a specified management group

Provides the name and subscription ID of all subscriptions under the management group specified in the [query scope](../concepts/query-language.md#query-scope). In this example, the management group is named **Application**.

```kusto
ResourceContainers
| where type =~ 'microsoft.resources/subscriptions'
| project subscriptionId, name
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "ResourceContainers | where type =~ 'microsoft.resources/subscriptions' | project subscriptionId, name" --management-groups Application
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "ResourceContainers | where type =~ 'microsoft.resources/subscriptions' | project subscriptionId, name" -ManagementGroup Application
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/ResourceContainers%0a%7c%20where%20type%20%3d%7e%20%27microsoft.resources%2fsubscriptions%27%0a%7c%20project%20subscriptionId%2c%20name" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/ResourceContainers%0a%7c%20where%20type%20%3d%7e%20%27microsoft.resources%2fsubscriptions%27%0a%7c%20project%20subscriptionId%2c%20name" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/ResourceContainers%0a%7c%20where%20type%20%3d%7e%20%27microsoft.resources%2fsubscriptions%27%0a%7c%20project%20subscriptionId%2c%20name" target="_blank">portal.azure.cn</a>

---

### Secure score per management group

Returns secure score per management group.

```kusto
SecurityResources
| where type == 'microsoft.security/securescores'
| project subscriptionId,
  subscriptionTotal = iff(properties.score.max == 0, 0.00, round(tolong(properties.weight) * todouble(properties.score.current)/tolong(properties.score.max),2)),
  weight = tolong(iff(properties.weight == 0, 1, properties.weight))
| join kind=leftouter (
  ResourceContainers
  | where type == 'microsoft.resources/subscriptions' and properties.state == 'Enabled'
  | project subscriptionId, mgChain=properties.managementGroupAncestorsChain )
  on subscriptionId
| mv-expand mg=mgChain
| summarize sumSubs = sum(subscriptionTotal), sumWeight = sum(weight), resultsNum = count() by tostring(mg.displayName), mgId = tostring(mg.name)
| extend secureScore = iff(tolong(resultsNum) == 0, 404.00, round(sumSubs/sumWeight*100,2))
| project mgName=mg_displayName, mgId, sumSubs, sumWeight, resultsNum, secureScore
| order by mgName asc
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "SecurityResources | where type == 'microsoft.security/securescores' | project subscriptionId, subscriptionTotal = iff(properties.score.max == 0, 0.00, round(tolong(properties.weight) * todouble(properties.score.current)/tolong(properties.score.max),2)), weight = tolong(iff(properties.weight == 0, 1, properties.weight)) | join kind=leftouter ( ResourceContainers | where type == 'microsoft.resources/subscriptions' and properties.state == 'Enabled' | project subscriptionId, mgChain=properties.managementGroupAncestorsChain ) on subscriptionId | mv-expand mg=mgChain | summarize sumSubs = sum(subscriptionTotal), sumWeight = sum(weight), resultsNum = count() by tostring(mg.displayName), mgId = tostring(mg.name) | extend secureScore = iff(tolong(resultsNum) == 0, 404.00, round(sumSubs/sumWeight*100,2)) | project mgName=mg_displayName, mgId, sumSubs, sumWeight, resultsNum, secureScore | order by mgName asc"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "SecurityResources | where type == 'microsoft.security/securescores' | project subscriptionId, subscriptionTotal = iff(properties.score.max == 0, 0.00, round(tolong(properties.weight) * todouble(properties.score.current)/tolong(properties.score.max),2)), weight = tolong(iff(properties.weight == 0, 1, properties.weight)) | join kind=leftouter ( ResourceContainers | where type == 'microsoft.resources/subscriptions' and properties.state == 'Enabled' | project subscriptionId, mgChain=properties.managementGroupAncestorsChain ) on subscriptionId | mv-expand mg=mgChain | summarize sumSubs = sum(subscriptionTotal), sumWeight = sum(weight), resultsNum = count() by tostring(mg.displayName), mgId = tostring(mg.name) | extend secureScore = iff(tolong(resultsNum) == 0, 404.00, round(sumSubs/sumWeight*100,2)) | project mgName=mg_displayName, mgId, sumSubs, sumWeight, resultsNum, secureScore | order by mgName asc"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fsecurescores%27%0a%7c%20project%20subscriptionId%2c%0a%09subscriptionTotal%20%3d%20iff(properties.score.max%20%3d%3d%200%2c%200.00%2c%20round(tolong(properties.weight)%20*%20todouble(properties.score.current)%2ftolong(properties.score.max)%2c2))%2c%0a%09weight%20%3d%20tolong(iff(properties.weight%20%3d%3d%200%2c%201%2c%20properties.weight))%0a%7c%20join%20kind%3dleftouter%20(%0a%09ResourceContainers%0a%09%7c%20where%20type%20%3d%3d%20%27microsoft.resources%2fsubscriptions%27%20and%20properties.state%20%3d%3d%20%27Enabled%27%0a%09%7c%20project%20subscriptionId%2c%20mgChain%3dproperties.managementGroupAncestorsChain%20)%0a%09on%20subscriptionId%0a%7c%20mv-expand%20mg%3dmgChain%0a%7c%20summarize%20sumSubs%20%3d%20sum(subscriptionTotal)%2c%20sumWeight%20%3d%20sum(weight)%2c%20resultsNum%20%3d%20count()%20by%20tostring(mg.displayName)%2c%20mgId%20%3d%20tostring(mg.name)%0a%7c%20extend%20secureScore%20%3d%20iff(tolong(resultsNum)%20%3d%3d%200%2c%20404.00%2c%20round(sumSubs%2fsumWeight*100%2c2))%0a%7c%20project%20mgName%3dmg_displayName%2c%20mgId%2c%20sumSubs%2c%20sumWeight%2c%20resultsNum%2c%20secureScore%0a%7c%20order%20by%20mgName%20asc" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fsecurescores%27%0a%7c%20project%20subscriptionId%2c%0a%09subscriptionTotal%20%3d%20iff(properties.score.max%20%3d%3d%200%2c%200.00%2c%20round(tolong(properties.weight)%20*%20todouble(properties.score.current)%2ftolong(properties.score.max)%2c2))%2c%0a%09weight%20%3d%20tolong(iff(properties.weight%20%3d%3d%200%2c%201%2c%20properties.weight))%0a%7c%20join%20kind%3dleftouter%20(%0a%09ResourceContainers%0a%09%7c%20where%20type%20%3d%3d%20%27microsoft.resources%2fsubscriptions%27%20and%20properties.state%20%3d%3d%20%27Enabled%27%0a%09%7c%20project%20subscriptionId%2c%20mgChain%3dproperties.managementGroupAncestorsChain%20)%0a%09on%20subscriptionId%0a%7c%20mv-expand%20mg%3dmgChain%0a%7c%20summarize%20sumSubs%20%3d%20sum(subscriptionTotal)%2c%20sumWeight%20%3d%20sum(weight)%2c%20resultsNum%20%3d%20count()%20by%20tostring(mg.displayName)%2c%20mgId%20%3d%20tostring(mg.name)%0a%7c%20extend%20secureScore%20%3d%20iff(tolong(resultsNum)%20%3d%3d%200%2c%20404.00%2c%20round(sumSubs%2fsumWeight*100%2c2))%0a%7c%20project%20mgName%3dmg_displayName%2c%20mgId%2c%20sumSubs%2c%20sumWeight%2c%20resultsNum%2c%20secureScore%0a%7c%20order%20by%20mgName%20asc" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fsecurescores%27%0a%7c%20project%20subscriptionId%2c%0a%09subscriptionTotal%20%3d%20iff(properties.score.max%20%3d%3d%200%2c%200.00%2c%20round(tolong(properties.weight)%20*%20todouble(properties.score.current)%2ftolong(properties.score.max)%2c2))%2c%0a%09weight%20%3d%20tolong(iff(properties.weight%20%3d%3d%200%2c%201%2c%20properties.weight))%0a%7c%20join%20kind%3dleftouter%20(%0a%09ResourceContainers%0a%09%7c%20where%20type%20%3d%3d%20%27microsoft.resources%2fsubscriptions%27%20and%20properties.state%20%3d%3d%20%27Enabled%27%0a%09%7c%20project%20subscriptionId%2c%20mgChain%3dproperties.managementGroupAncestorsChain%20)%0a%09on%20subscriptionId%0a%7c%20mv-expand%20mg%3dmgChain%0a%7c%20summarize%20sumSubs%20%3d%20sum(subscriptionTotal)%2c%20sumWeight%20%3d%20sum(weight)%2c%20resultsNum%20%3d%20count()%20by%20tostring(mg.displayName)%2c%20mgId%20%3d%20tostring(mg.name)%0a%7c%20extend%20secureScore%20%3d%20iff(tolong(resultsNum)%20%3d%3d%200%2c%20404.00%2c%20round(sumSubs%2fsumWeight*100%2c2))%0a%7c%20project%20mgName%3dmg_displayName%2c%20mgId%2c%20sumSubs%2c%20sumWeight%2c%20resultsNum%2c%20secureScore%0a%7c%20order%20by%20mgName%20asc" target="_blank">portal.azure.cn</a>

---


## Microsoft Defender


### Display all active Microsoft Defender for Cloud alerts

Returns a list of all active alerts in your Microsoft Defender for Cloud tenant.

```kusto
securityresources
| where type =~ 'microsoft.security/locations/alerts'
| where properties.Status in ('Active')
| where properties.Severity in ('Low', 'Medium', 'High')
| project alert_type = tostring(properties.AlertType), SystemAlertId = tostring(properties.SystemAlertId), ResourceIdentifiers = todynamic(properties.ResourceIdentifiers)
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "securityresources | where type =~ 'microsoft.security/locations/alerts' | where properties.Status in ('Active') | where properties.Severity in ('Low', 'Medium', 'High') | project alert_type = tostring(properties AlertType), SystemAlertId = tostring(properties.SystemAlertId), ResourceIdentifiers = todynamic(properties ResourceIdentifiers)"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "securityresources | where type =~ 'microsoft.security/locations/alerts' | where properties.Status in ('Active') | where properties.Severity in ('Low', 'Medium', 'High') | project alert_type = tostring(properties AlertType), SystemAlertId = tostring(properties.SystemAlertId), ResourceIdentifiers = todynamic(properties ResourceIdentifiers)"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/securityresources%20%7C%20where%20type%20%3D~%20%27microsoft.security%2Flocations%2Falerts%27%20%7C%20where%20properties.Status%20in%20%28%27Active%27%29%20%7C%20where%20properties.Severity%20in%20%28%27Low%27%2C%20%27Medium%27%2C%20%27High%27%29%20%7C%20project%20alert_type%20%3D%20tostring%28properties%20AlertType%29%2C%20SystemAlertId%20%3D%20tostring%28properties.SystemAlertId%29%2C%20ResourceIdentifiers%20%3D%20todynamic%28properties%20ResourceIdentifiers%29" target="_blank">portal.Azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/securityresources%20%7C%20where%20type%20%3D~%20%27microsoft.security%2Flocations%2Falerts%27%20%7C%20where%20properties.Status%20in%20%28%27Active%27%29%20%7C%20where%20properties.Severity%20in%20%28%27Low%27%2C%20%27Medium%27%2C%20%27High%27%29%20%7C%20project%20alert_type%20%3D%20tostring%28properties%20AlertType%29%2C%20SystemAlertId%20%3D%20tostring%28properties.SystemAlertId%29%2C%20ResourceIdentifiers%20%3D%20todynamic%28properties%20ResourceIdentifiers%29" target="_blank">portal.Azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/securityresources%20%7C%20where%20type%20%3D~%20%27microsoft.security%2Flocations%2Falerts%27%20%7C%20where%20properties.Status%20in%20%28%27Active%27%29%20%7C%20where%20properties.Severity%20in%20%28%27Low%27%2C%20%27Medium%27%2C%20%27High%27%29%20%7C%20project%20alert_type%20%3D%20tostring%28properties%20AlertType%29%2C%20SystemAlertId%20%3D%20tostring%28properties.SystemAlertId%29%2C%20ResourceIdentifiers%20%3D%20todynamic%28properties%20ResourceIdentifiers%29" target="_blank">portal.Azure.cn</a>

---

### Controls secure score per subscription

Returns controls secure score per subscription.

```kusto
SecurityResources
| where type == 'microsoft.security/securescores/securescorecontrols'
| extend controlName=properties.displayName,
	controlId=properties.definition.name,
	notApplicableResourceCount=properties.notApplicableResourceCount,
	unhealthyResourceCount=properties.unhealthyResourceCount,
	healthyResourceCount=properties.healthyResourceCount,
	percentageScore=properties.score.percentage,
	currentScore=properties.score.current,
	maxScore=properties.definition.properties.maxScore,
	weight=properties.weight,
	controlType=properties.definition.properties.source.sourceType,
	controlRecommendationIds=properties.definition.properties.assessmentDefinitions
| project tenantId, subscriptionId, controlName, controlId, unhealthyResourceCount, healthyResourceCount, notApplicableResourceCount, percentageScore, currentScore, maxScore, weight, controlType, controlRecommendationIds
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "SecurityResources | where type == 'microsoft.security/securescores/securescorecontrols' | extend controlName=properties.displayName, controlId=properties.definition.name, notApplicableResourceCount=properties.notApplicableResourceCount, unhealthyResourceCount=properties.unhealthyResourceCount, healthyResourceCount=properties.healthyResourceCount, percentageScore=properties.score.percentage, currentScore=properties.score.current, maxScore=properties.definition.properties.maxScore, weight=properties.weight, controlType=properties.definition.properties.source.sourceType, controlRecommendationIds=properties.definition.properties.assessmentDefinitions | project tenantId, subscriptionId, controlName, controlId, unhealthyResourceCount, healthyResourceCount, notApplicableResourceCount, percentageScore, currentScore, maxScore, weight, controlType, controlRecommendationIds"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "SecurityResources | where type == 'microsoft.security/securescores/securescorecontrols' | extend controlName=properties.displayName, controlId=properties.definition.name, notApplicableResourceCount=properties.notApplicableResourceCount, unhealthyResourceCount=properties.unhealthyResourceCount, healthyResourceCount=properties.healthyResourceCount, percentageScore=properties.score.percentage, currentScore=properties.score.current, maxScore=properties.definition.properties.maxScore, weight=properties.weight, controlType=properties.definition.properties.source.sourceType, controlRecommendationIds=properties.definition.properties.assessmentDefinitions | project tenantId, subscriptionId, controlName, controlId, unhealthyResourceCount, healthyResourceCount, notApplicableResourceCount, percentageScore, currentScore, maxScore, weight, controlType, controlRecommendationIds"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fsecurescores%2fsecurescorecontrols%27%0a%7c%20extend%20controlName%3dproperties.displayName%2c%0a%09controlId%3dproperties.definition.name%2c%0a%09notApplicableResourceCount%3dproperties.notApplicableResourceCount%2c%0a%09unhealthyResourceCount%3dproperties.unhealthyResourceCount%2c%0a%09healthyResourceCount%3dproperties.healthyResourceCount%2c%0a%09percentageScore%3dproperties.score.percentage%2c%0a%09currentScore%3dproperties.score.current%2c%0a%09maxScore%3dproperties.definition.properties.maxScore%2c%0a%09weight%3dproperties.weight%2c%0a%09controlType%3dproperties.definition.properties.source.sourceType%2c%0a%09controlRecommendationIds%3dproperties.definition.properties.assessmentDefinitions%0a%7c%20project%20tenantId%2c%20subscriptionId%2c%20controlName%2c%20controlId%2c%20unhealthyResourceCount%2c%20healthyResourceCount%2c%20notApplicableResourceCount%2c%20percentageScore%2c%20currentScore%2c%20maxScore%2c%20weight%2c%20controlType%2c%20controlRecommendationIds" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fsecurescores%2fsecurescorecontrols%27%0a%7c%20extend%20controlName%3dproperties.displayName%2c%0a%09controlId%3dproperties.definition.name%2c%0a%09notApplicableResourceCount%3dproperties.notApplicableResourceCount%2c%0a%09unhealthyResourceCount%3dproperties.unhealthyResourceCount%2c%0a%09healthyResourceCount%3dproperties.healthyResourceCount%2c%0a%09percentageScore%3dproperties.score.percentage%2c%0a%09currentScore%3dproperties.score.current%2c%0a%09maxScore%3dproperties.definition.properties.maxScore%2c%0a%09weight%3dproperties.weight%2c%0a%09controlType%3dproperties.definition.properties.source.sourceType%2c%0a%09controlRecommendationIds%3dproperties.definition.properties.assessmentDefinitions%0a%7c%20project%20tenantId%2c%20subscriptionId%2c%20controlName%2c%20controlId%2c%20unhealthyResourceCount%2c%20healthyResourceCount%2c%20notApplicableResourceCount%2c%20percentageScore%2c%20currentScore%2c%20maxScore%2c%20weight%2c%20controlType%2c%20controlRecommendationIds" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fsecurescores%2fsecurescorecontrols%27%0a%7c%20extend%20controlName%3dproperties.displayName%2c%0a%09controlId%3dproperties.definition.name%2c%0a%09notApplicableResourceCount%3dproperties.notApplicableResourceCount%2c%0a%09unhealthyResourceCount%3dproperties.unhealthyResourceCount%2c%0a%09healthyResourceCount%3dproperties.healthyResourceCount%2c%0a%09percentageScore%3dproperties.score.percentage%2c%0a%09currentScore%3dproperties.score.current%2c%0a%09maxScore%3dproperties.definition.properties.maxScore%2c%0a%09weight%3dproperties.weight%2c%0a%09controlType%3dproperties.definition.properties.source.sourceType%2c%0a%09controlRecommendationIds%3dproperties.definition.properties.assessmentDefinitions%0a%7c%20project%20tenantId%2c%20subscriptionId%2c%20controlName%2c%20controlId%2c%20unhealthyResourceCount%2c%20healthyResourceCount%2c%20notApplicableResourceCount%2c%20percentageScore%2c%20currentScore%2c%20maxScore%2c%20weight%2c%20controlType%2c%20controlRecommendationIds" target="_blank">portal.azure.cn</a>

---

### Count healthy, unhealthy, and not applicable resources per recommendation

Returns count of healthy, unhealthy, and not applicable resources per recommendation. Use `summarize` and `count` to define how to group and aggregate the values by property.

```kusto
SecurityResources
| where type == 'microsoft.security/assessments'
| extend resourceId=id,
	recommendationId=name,
	resourceType=type,
	recommendationName=properties.displayName,
	source=properties.resourceDetails.Source,
	recommendationState=properties.status.code,
	description=properties.metadata.description,
	assessmentType=properties.metadata.assessmentType,
	remediationDescription=properties.metadata.remediationDescription,
	policyDefinitionId=properties.metadata.policyDefinitionId,
	implementationEffort=properties.metadata.implementationEffort,
	recommendationSeverity=properties.metadata.severity,
	category=properties.metadata.categories,
	userImpact=properties.metadata.userImpact,
	threats=properties.metadata.threats,
	portalLink=properties.links.azurePortal
| summarize numberOfResources=count(resourceId) by tostring(recommendationName), tostring(recommendationState)
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "SecurityResources | where type == 'microsoft.security/assessments' | extend resourceId=id, recommendationId=name, resourceType=type, recommendationName=properties.displayName, source=properties.resourceDetails.Source, recommendationState=properties.status.code, description=properties.metadata.description, assessmentType=properties.metadata.assessmentType, remediationDescription=properties.metadata.remediationDescription, policyDefinitionId=properties.metadata.policyDefinitionId, implementationEffort=properties.metadata.implementationEffort, recommendationSeverity=properties.metadata.severity, category=properties.metadata.categories, userImpact=properties.metadata.userImpact, threats=properties.metadata.threats, portalLink=properties.links.azurePortal | summarize numberOfResources=count(resourceId) by tostring(recommendationName), tostring(recommendationState)"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "SecurityResources | where type == 'microsoft.security/assessments' | extend resourceId=id, recommendationId=name, resourceType=type, recommendationName=properties.displayName, source=properties.resourceDetails.Source, recommendationState=properties.status.code, description=properties.metadata.description, assessmentType=properties.metadata.assessmentType, remediationDescription=properties.metadata.remediationDescription, policyDefinitionId=properties.metadata.policyDefinitionId, implementationEffort=properties.metadata.implementationEffort, recommendationSeverity=properties.metadata.severity, category=properties.metadata.categories, userImpact=properties.metadata.userImpact, threats=properties.metadata.threats, portalLink=properties.links.azurePortal | summarize numberOfResources=count(resourceId) by tostring(recommendationName), tostring(recommendationState)"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fassessments%27%0a%7c%20extend%20resourceId%3did%2c%0a%09recommendationId%3dname%2c%0a%09resourceType%3dtype%2c%0a%09recommendationName%3dproperties.displayName%2c%0a%09source%3dproperties.resourceDetails.Source%2c%0a%09recommendationState%3dproperties.status.code%2c%0a%09description%3dproperties.metadata.description%2c%0a%09assessmentType%3dproperties.metadata.assessmentType%2c%0a%09remediationDescription%3dproperties.metadata.remediationDescription%2c%0a%09policyDefinitionId%3dproperties.metadata.policyDefinitionId%2c%0a%09implementationEffort%3dproperties.metadata.implementationEffort%2c%0a%09recommendationSeverity%3dproperties.metadata.severity%2c%0a%09category%3dproperties.metadata.categories%2c%0a%09userImpact%3dproperties.metadata.userImpact%2c%0a%09threats%3dproperties.metadata.threats%2c%0a%09portalLink%3dproperties.links.azurePortal%0a%7c%20summarize%20numberOfResources%3dcount(resourceId)%20by%20tostring(recommendationName)%2c%20tostring(recommendationState)" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fassessments%27%0a%7c%20extend%20resourceId%3did%2c%0a%09recommendationId%3dname%2c%0a%09resourceType%3dtype%2c%0a%09recommendationName%3dproperties.displayName%2c%0a%09source%3dproperties.resourceDetails.Source%2c%0a%09recommendationState%3dproperties.status.code%2c%0a%09description%3dproperties.metadata.description%2c%0a%09assessmentType%3dproperties.metadata.assessmentType%2c%0a%09remediationDescription%3dproperties.metadata.remediationDescription%2c%0a%09policyDefinitionId%3dproperties.metadata.policyDefinitionId%2c%0a%09implementationEffort%3dproperties.metadata.implementationEffort%2c%0a%09recommendationSeverity%3dproperties.metadata.severity%2c%0a%09category%3dproperties.metadata.categories%2c%0a%09userImpact%3dproperties.metadata.userImpact%2c%0a%09threats%3dproperties.metadata.threats%2c%0a%09portalLink%3dproperties.links.azurePortal%0a%7c%20summarize%20numberOfResources%3dcount(resourceId)%20by%20tostring(recommendationName)%2c%20tostring(recommendationState)" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fassessments%27%0a%7c%20extend%20resourceId%3did%2c%0a%09recommendationId%3dname%2c%0a%09resourceType%3dtype%2c%0a%09recommendationName%3dproperties.displayName%2c%0a%09source%3dproperties.resourceDetails.Source%2c%0a%09recommendationState%3dproperties.status.code%2c%0a%09description%3dproperties.metadata.description%2c%0a%09assessmentType%3dproperties.metadata.assessmentType%2c%0a%09remediationDescription%3dproperties.metadata.remediationDescription%2c%0a%09policyDefinitionId%3dproperties.metadata.policyDefinitionId%2c%0a%09implementationEffort%3dproperties.metadata.implementationEffort%2c%0a%09recommendationSeverity%3dproperties.metadata.severity%2c%0a%09category%3dproperties.metadata.categories%2c%0a%09userImpact%3dproperties.metadata.userImpact%2c%0a%09threats%3dproperties.metadata.threats%2c%0a%09portalLink%3dproperties.links.azurePortal%0a%7c%20summarize%20numberOfResources%3dcount(resourceId)%20by%20tostring(recommendationName)%2c%20tostring(recommendationState)" target="_blank">portal.azure.cn</a>

---

### Get all IoT alerts on hub, filtered by type

Returns all IoT alerts for a specific hub (replace placeholder `{hub_id}`) and alert type (replace placeholder `{alert_type}`).

```kusto
SecurityResources
| where type =~ 'microsoft.security/iotalerts' and id contains '{hub_id}' and properties.alertType contains '{alert_type}'
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "SecurityResources | where type =~ 'microsoft.security/iotalerts' and id contains '{hub_id}' and properties.alertType contains '{alert_type}'"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "SecurityResources | where type =~ 'microsoft.security/iotalerts' and id contains '{hub_id}' and properties.alertType contains '{alert_type}'"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.security%2fiotalerts%27%20and%20id%20contains%20%27%7bhub_id%7d%27%20and%20properties.alertType%20contains%20%27%7balert_type%7d%27" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.security%2fiotalerts%27%20and%20id%20contains%20%27%7bhub_id%7d%27%20and%20properties.alertType%20contains%20%27%7balert_type%7d%27" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.security%2fiotalerts%27%20and%20id%20contains%20%27%7bhub_id%7d%27%20and%20properties.alertType%20contains%20%27%7balert_type%7d%27" target="_blank">portal.azure.cn</a>

---

### Get sensitivity insight of a specific resource

Returns sensitivity insight of a specific resource (replace placeholder {resource_id}).

```kusto
SecurityResources
| where type == 'microsoft.security/insights/classification'
| where properties.associatedResource contains '$resource_id'
| project SensitivityInsight = properties.insightProperties.purviewCatalogs[0].sensitivity
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "SecurityResources | where type == 'microsoft.security/insights/classification' | where properties.associatedResource contains '\$resource_id' | project SensitivityInsight = properties.insightProperties.purviewCatalogs[0].sensitivity"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "SecurityResources | where type == 'microsoft.security/insights/classification' | where properties.associatedResource contains '$resource_id' | project SensitivityInsight = properties.insightProperties.purviewCatalogs[0].sensitivity"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2finsights%2fclassification%27%0a%7c%20where%20properties.associatedResource%20contains%20%27%24resource_id%27%0a%7c%20project%20SensitivityInsight%20%3d%20properties.insightProperties.purviewCatalogs%5b0%5d.sensitivity" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2finsights%2fclassification%27%0a%7c%20where%20properties.associatedResource%20contains%20%27%24resource_id%27%0a%7c%20project%20SensitivityInsight%20%3d%20properties.insightProperties.purviewCatalogs%5b0%5d.sensitivity" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2finsights%2fclassification%27%0a%7c%20where%20properties.associatedResource%20contains%20%27%24resource_id%27%0a%7c%20project%20SensitivityInsight%20%3d%20properties.insightProperties.purviewCatalogs%5b0%5d.sensitivity" target="_blank">portal.azure.cn</a>

---

### Get specific IoT alert

Returns specific IoT alert by a provided system alert ID (replace placeholder `{system_Alert_Id}`).

```kusto
SecurityResources
| where type =~ 'microsoft.security/iotalerts' and properties.systemAlertId contains '{system_Alert_Id}'
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "SecurityResources | where type =~ 'microsoft.security/iotalerts' and properties.systemAlertId contains '{system_Alert_Id}'"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "SecurityResources | where type =~ 'microsoft.security/iotalerts' and properties.systemAlertId contains '{system_Alert_Id}'"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.security%2fiotalerts%27%20and%20properties.systemAlertId%20contains%20%27%7bsystem_Alert_Id%7d%27" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.security%2fiotalerts%27%20and%20properties.systemAlertId%20contains%20%27%7bsystem_Alert_Id%7d%27" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.security%2fiotalerts%27%20and%20properties.systemAlertId%20contains%20%27%7bsystem_Alert_Id%7d%27" target="_blank">portal.azure.cn</a>

---

### List Container Registry vulnerability assessment results

Returns all vulnerabilities found on container images. Microsoft Defender for Containers has to be enabled in order to view these security findings.

```kusto
SecurityResources
| where type == 'microsoft.security/assessments'
| where properties.displayName contains 'Container registry images should have vulnerability findings resolved'
| summarize by assessmentKey=name //the ID of the assessment
| join kind=inner (
	securityresources
	| where type == 'microsoft.security/assessments/subassessments'
	| extend assessmentKey = extract('.*assessments/(.+?)/.*',1,  id)
) on assessmentKey
| project assessmentKey, subassessmentKey=name, id, parse_json(properties), resourceGroup, subscriptionId, tenantId
| extend description = properties.description,
	displayName = properties.displayName,
	resourceId = properties.resourceDetails.id,
	resourceSource = properties.resourceDetails.source,
	category = properties.category,
	severity = properties.status.severity,
	code = properties.status.code,
	timeGenerated = properties.timeGenerated,
	remediation = properties.remediation,
	impact = properties.impact,
	vulnId = properties.id,
	additionalData = properties.additionalData
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "SecurityResources | where type == 'microsoft.security/assessments' | where properties.displayName contains 'Container registry images should have vulnerability findings resolved' | summarize by assessmentKey=name //the ID of the assessment | join kind=inner ( securityresources | where type == 'microsoft.security/assessments/subassessments' | extend assessmentKey = extract('.*assessments/(.+?)/.*',1, id) ) on assessmentKey | project assessmentKey, subassessmentKey=name, id, parse_json(properties), resourceGroup, subscriptionId, tenantId | extend description = properties.description, displayName = properties.displayName, resourceId = properties.resourceDetails.id, resourceSource = properties.resourceDetails.source, category = properties.category, severity = properties.status.severity, code = properties.status.code, timeGenerated = properties.timeGenerated, remediation = properties.remediation, impact = properties.impact, vulnId = properties.id, additionalData = properties.additionalData"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "SecurityResources | where type == 'microsoft.security/assessments' | where properties.displayName contains 'Container registry images should have vulnerability findings resolved' | summarize by assessmentKey=name //the ID of the assessment | join kind=inner ( securityresources | where type == 'microsoft.security/assessments/subassessments' | extend assessmentKey = extract('.*assessments/(.+?)/.*',1, id) ) on assessmentKey | project assessmentKey, subassessmentKey=name, id, parse_json(properties), resourceGroup, subscriptionId, tenantId | extend description = properties.description, displayName = properties.displayName, resourceId = properties.resourceDetails.id, resourceSource = properties.resourceDetails.source, category = properties.category, severity = properties.status.severity, code = properties.status.code, timeGenerated = properties.timeGenerated, remediation = properties.remediation, impact = properties.impact, vulnId = properties.id, additionalData = properties.additionalData"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fassessments%27%0a%7c%20where%20properties.displayName%20contains%20%27Container%20registry%20images%20should%20have%20vulnerability%20findings%20resolved%27%0a%7c%20summarize%20by%20assessmentKey%3dname%20%2f%2fthe%20ID%20of%20the%20assessment%0a%7c%20join%20kind%3dinner%20(%0a%09securityresources%0a%09%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fassessments%2fsubassessments%27%0a%09%7c%20extend%20assessmentKey%20%3d%20extract(%27.*assessments%2f(.%2b%3f)%2f.*%27%2c1%2c%20%20id)%0a)%20on%20assessmentKey%0a%7c%20project%20assessmentKey%2c%20subassessmentKey%3dname%2c%20id%2c%20parse_json(properties)%2c%20resourceGroup%2c%20subscriptionId%2c%20tenantId%0a%7c%20extend%20description%20%3d%20properties.description%2c%0a%09displayName%20%3d%20properties.displayName%2c%0a%09resourceId%20%3d%20properties.resourceDetails.id%2c%0a%09resourceSource%20%3d%20properties.resourceDetails.source%2c%0a%09category%20%3d%20properties.category%2c%0a%09severity%20%3d%20properties.status.severity%2c%0a%09code%20%3d%20properties.status.code%2c%0a%09timeGenerated%20%3d%20properties.timeGenerated%2c%0a%09remediation%20%3d%20properties.remediation%2c%0a%09impact%20%3d%20properties.impact%2c%0a%09vulnId%20%3d%20properties.id%2c%0a%09additionalData%20%3d%20properties.additionalData" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fassessments%27%0a%7c%20where%20properties.displayName%20contains%20%27Container%20registry%20images%20should%20have%20vulnerability%20findings%20resolved%27%0a%7c%20summarize%20by%20assessmentKey%3dname%20%2f%2fthe%20ID%20of%20the%20assessment%0a%7c%20join%20kind%3dinner%20(%0a%09securityresources%0a%09%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fassessments%2fsubassessments%27%0a%09%7c%20extend%20assessmentKey%20%3d%20extract(%27.*assessments%2f(.%2b%3f)%2f.*%27%2c1%2c%20%20id)%0a)%20on%20assessmentKey%0a%7c%20project%20assessmentKey%2c%20subassessmentKey%3dname%2c%20id%2c%20parse_json(properties)%2c%20resourceGroup%2c%20subscriptionId%2c%20tenantId%0a%7c%20extend%20description%20%3d%20properties.description%2c%0a%09displayName%20%3d%20properties.displayName%2c%0a%09resourceId%20%3d%20properties.resourceDetails.id%2c%0a%09resourceSource%20%3d%20properties.resourceDetails.source%2c%0a%09category%20%3d%20properties.category%2c%0a%09severity%20%3d%20properties.status.severity%2c%0a%09code%20%3d%20properties.status.code%2c%0a%09timeGenerated%20%3d%20properties.timeGenerated%2c%0a%09remediation%20%3d%20properties.remediation%2c%0a%09impact%20%3d%20properties.impact%2c%0a%09vulnId%20%3d%20properties.id%2c%0a%09additionalData%20%3d%20properties.additionalData" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fassessments%27%0a%7c%20where%20properties.displayName%20contains%20%27Container%20registry%20images%20should%20have%20vulnerability%20findings%20resolved%27%0a%7c%20summarize%20by%20assessmentKey%3dname%20%2f%2fthe%20ID%20of%20the%20assessment%0a%7c%20join%20kind%3dinner%20(%0a%09securityresources%0a%09%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fassessments%2fsubassessments%27%0a%09%7c%20extend%20assessmentKey%20%3d%20extract(%27.*assessments%2f(.%2b%3f)%2f.*%27%2c1%2c%20%20id)%0a)%20on%20assessmentKey%0a%7c%20project%20assessmentKey%2c%20subassessmentKey%3dname%2c%20id%2c%20parse_json(properties)%2c%20resourceGroup%2c%20subscriptionId%2c%20tenantId%0a%7c%20extend%20description%20%3d%20properties.description%2c%0a%09displayName%20%3d%20properties.displayName%2c%0a%09resourceId%20%3d%20properties.resourceDetails.id%2c%0a%09resourceSource%20%3d%20properties.resourceDetails.source%2c%0a%09category%20%3d%20properties.category%2c%0a%09severity%20%3d%20properties.status.severity%2c%0a%09code%20%3d%20properties.status.code%2c%0a%09timeGenerated%20%3d%20properties.timeGenerated%2c%0a%09remediation%20%3d%20properties.remediation%2c%0a%09impact%20%3d%20properties.impact%2c%0a%09vulnId%20%3d%20properties.id%2c%0a%09additionalData%20%3d%20properties.additionalData" target="_blank">portal.azure.cn</a>

---

### List Microsoft Defender recommendations

Returns all Microsoft Defender assessments, organized in tabular manner with field per property.

```kusto
SecurityResources
| where type == 'microsoft.security/assessments'
| extend resourceId=id,
	recommendationId=name,
	recommendationName=properties.displayName,
	source=properties.resourceDetails.Source,
	recommendationState=properties.status.code,
	description=properties.metadata.description,
	assessmentType=properties.metadata.assessmentType,
	remediationDescription=properties.metadata.remediationDescription,
	policyDefinitionId=properties.metadata.policyDefinitionId,
	implementationEffort=properties.metadata.implementationEffort,
	recommendationSeverity=properties.metadata.severity,
	category=properties.metadata.categories,
	userImpact=properties.metadata.userImpact,
	threats=properties.metadata.threats,
	portalLink=properties.links.azurePortal
| project tenantId, subscriptionId, resourceId, recommendationName, recommendationId, recommendationState, recommendationSeverity, description, remediationDescription, assessmentType, policyDefinitionId, implementationEffort, userImpact, category, threats, source, portalLink
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "SecurityResources | where type == 'microsoft.security/assessments' | extend resourceId=id, recommendationId=name, recommendationName=properties.displayName, source=properties.resourceDetails.Source, recommendationState=properties.status.code, description=properties.metadata.description, assessmentType=properties.metadata.assessmentType, remediationDescription=properties.metadata.remediationDescription, policyDefinitionId=properties.metadata.policyDefinitionId, implementationEffort=properties.metadata.implementationEffort, recommendationSeverity=properties.metadata.severity, category=properties.metadata.categories, userImpact=properties.metadata.userImpact, threats=properties.metadata.threats, portalLink=properties.links.azurePortal | project tenantId, subscriptionId, resourceId, recommendationName, recommendationId, recommendationState, recommendationSeverity, description, remediationDescription, assessmentType, policyDefinitionId, implementationEffort, userImpact, category, threats, source, portalLink"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "SecurityResources | where type == 'microsoft.security/assessments' | extend resourceId=id, recommendationId=name, recommendationName=properties.displayName, source=properties.resourceDetails.Source, recommendationState=properties.status.code, description=properties.metadata.description, assessmentType=properties.metadata.assessmentType, remediationDescription=properties.metadata.remediationDescription, policyDefinitionId=properties.metadata.policyDefinitionId, implementationEffort=properties.metadata.implementationEffort, recommendationSeverity=properties.metadata.severity, category=properties.metadata.categories, userImpact=properties.metadata.userImpact, threats=properties.metadata.threats, portalLink=properties.links.azurePortal | project tenantId, subscriptionId, resourceId, recommendationName, recommendationId, recommendationState, recommendationSeverity, description, remediationDescription, assessmentType, policyDefinitionId, implementationEffort, userImpact, category, threats, source, portalLink"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fassessments%27%0a%7c%20extend%20resourceId%3did%2c%0a%09recommendationId%3dname%2c%0a%09recommendationName%3dproperties.displayName%2c%0a%09source%3dproperties.resourceDetails.Source%2c%0a%09recommendationState%3dproperties.status.code%2c%0a%09description%3dproperties.metadata.description%2c%0a%09assessmentType%3dproperties.metadata.assessmentType%2c%0a%09remediationDescription%3dproperties.metadata.remediationDescription%2c%0a%09policyDefinitionId%3dproperties.metadata.policyDefinitionId%2c%0a%09implementationEffort%3dproperties.metadata.implementationEffort%2c%0a%09recommendationSeverity%3dproperties.metadata.severity%2c%0a%09category%3dproperties.metadata.categories%2c%0a%09userImpact%3dproperties.metadata.userImpact%2c%0a%09threats%3dproperties.metadata.threats%2c%0a%09portalLink%3dproperties.links.azurePortal%0a%7c%20project%20tenantId%2c%20subscriptionId%2c%20resourceId%2c%20recommendationName%2c%20recommendationId%2c%20recommendationState%2c%20recommendationSeverity%2c%20description%2c%20remediationDescription%2c%20assessmentType%2c%20policyDefinitionId%2c%20implementationEffort%2c%20userImpact%2c%20category%2c%20threats%2c%20source%2c%20portalLink" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fassessments%27%0a%7c%20extend%20resourceId%3did%2c%0a%09recommendationId%3dname%2c%0a%09recommendationName%3dproperties.displayName%2c%0a%09source%3dproperties.resourceDetails.Source%2c%0a%09recommendationState%3dproperties.status.code%2c%0a%09description%3dproperties.metadata.description%2c%0a%09assessmentType%3dproperties.metadata.assessmentType%2c%0a%09remediationDescription%3dproperties.metadata.remediationDescription%2c%0a%09policyDefinitionId%3dproperties.metadata.policyDefinitionId%2c%0a%09implementationEffort%3dproperties.metadata.implementationEffort%2c%0a%09recommendationSeverity%3dproperties.metadata.severity%2c%0a%09category%3dproperties.metadata.categories%2c%0a%09userImpact%3dproperties.metadata.userImpact%2c%0a%09threats%3dproperties.metadata.threats%2c%0a%09portalLink%3dproperties.links.azurePortal%0a%7c%20project%20tenantId%2c%20subscriptionId%2c%20resourceId%2c%20recommendationName%2c%20recommendationId%2c%20recommendationState%2c%20recommendationSeverity%2c%20description%2c%20remediationDescription%2c%20assessmentType%2c%20policyDefinitionId%2c%20implementationEffort%2c%20userImpact%2c%20category%2c%20threats%2c%20source%2c%20portalLink" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fassessments%27%0a%7c%20extend%20resourceId%3did%2c%0a%09recommendationId%3dname%2c%0a%09recommendationName%3dproperties.displayName%2c%0a%09source%3dproperties.resourceDetails.Source%2c%0a%09recommendationState%3dproperties.status.code%2c%0a%09description%3dproperties.metadata.description%2c%0a%09assessmentType%3dproperties.metadata.assessmentType%2c%0a%09remediationDescription%3dproperties.metadata.remediationDescription%2c%0a%09policyDefinitionId%3dproperties.metadata.policyDefinitionId%2c%0a%09implementationEffort%3dproperties.metadata.implementationEffort%2c%0a%09recommendationSeverity%3dproperties.metadata.severity%2c%0a%09category%3dproperties.metadata.categories%2c%0a%09userImpact%3dproperties.metadata.userImpact%2c%0a%09threats%3dproperties.metadata.threats%2c%0a%09portalLink%3dproperties.links.azurePortal%0a%7c%20project%20tenantId%2c%20subscriptionId%2c%20resourceId%2c%20recommendationName%2c%20recommendationId%2c%20recommendationState%2c%20recommendationSeverity%2c%20description%2c%20remediationDescription%2c%20assessmentType%2c%20policyDefinitionId%2c%20implementationEffort%2c%20userImpact%2c%20category%2c%20threats%2c%20source%2c%20portalLink" target="_blank">portal.azure.cn</a>

---

### List Qualys vulnerability assessment results

Returns all the vulnerabilities found on virtual machines that have a Qualys agent installed.

```kusto
SecurityResources
| where type == 'microsoft.security/assessments'
| where * contains 'vulnerabilities in your virtual machines'
| summarize by assessmentKey=name //the ID of the assessment
| join kind=inner (
	securityresources
	| where type == 'microsoft.security/assessments/subassessments'
	| extend assessmentKey = extract('.*assessments/(.+?)/.*',1,  id)
) on assessmentKey
| project assessmentKey, subassessmentKey=name, id, parse_json(properties), resourceGroup, subscriptionId, tenantId
| extend description = properties.description,
	displayName = properties.displayName,
	resourceId = properties.resourceDetails.id,
	resourceSource = properties.resourceDetails.source,
	category = properties.category,
	severity = properties.status.severity,
	code = properties.status.code,
	timeGenerated = properties.timeGenerated,
	remediation = properties.remediation,
	impact = properties.impact,
	vulnId = properties.id,
	additionalData = properties.additionalData
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "SecurityResources | where type == 'microsoft.security/assessments' | where * contains 'vulnerabilities in your virtual machines' | summarize by assessmentKey=name //the ID of the assessment | join kind=inner ( securityresources | where type == 'microsoft.security/assessments/subassessments' | extend assessmentKey = extract('.*assessments/(.+?)/.*',1, id) ) on assessmentKey | project assessmentKey, subassessmentKey=name, id, parse_json(properties), resourceGroup, subscriptionId, tenantId | extend description = properties.description, displayName = properties.displayName, resourceId = properties.resourceDetails.id, resourceSource = properties.resourceDetails.source, category = properties.category, severity = properties.status.severity, code = properties.status.code, timeGenerated = properties.timeGenerated, remediation = properties.remediation, impact = properties.impact, vulnId = properties.id, additionalData = properties.additionalData"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "SecurityResources | where type == 'microsoft.security/assessments' | where * contains 'vulnerabilities in your virtual machines' | summarize by assessmentKey=name //the ID of the assessment | join kind=inner ( securityresources | where type == 'microsoft.security/assessments/subassessments' | extend assessmentKey = extract('.*assessments/(.+?)/.*',1, id) ) on assessmentKey | project assessmentKey, subassessmentKey=name, id, parse_json(properties), resourceGroup, subscriptionId, tenantId | extend description = properties.description, displayName = properties.displayName, resourceId = properties.resourceDetails.id, resourceSource = properties.resourceDetails.source, category = properties.category, severity = properties.status.severity, code = properties.status.code, timeGenerated = properties.timeGenerated, remediation = properties.remediation, impact = properties.impact, vulnId = properties.id, additionalData = properties.additionalData"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fassessments%27%0a%7c%20where%20*%20contains%20%27vulnerabilities%20in%20your%20virtual%20machines%27%0a%7c%20summarize%20by%20assessmentKey%3dname%20%2f%2fthe%20ID%20of%20the%20assessment%0a%7c%20join%20kind%3dinner%20(%0a%09securityresources%0a%09%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fassessments%2fsubassessments%27%0a%09%7c%20extend%20assessmentKey%20%3d%20extract(%27.*assessments%2f(.%2b%3f)%2f.*%27%2c1%2c%20%20id)%0a)%20on%20assessmentKey%0a%7c%20project%20assessmentKey%2c%20subassessmentKey%3dname%2c%20id%2c%20parse_json(properties)%2c%20resourceGroup%2c%20subscriptionId%2c%20tenantId%0a%7c%20extend%20description%20%3d%20properties.description%2c%0a%09displayName%20%3d%20properties.displayName%2c%0a%09resourceId%20%3d%20properties.resourceDetails.id%2c%0a%09resourceSource%20%3d%20properties.resourceDetails.source%2c%0a%09category%20%3d%20properties.category%2c%0a%09severity%20%3d%20properties.status.severity%2c%0a%09code%20%3d%20properties.status.code%2c%0a%09timeGenerated%20%3d%20properties.timeGenerated%2c%0a%09remediation%20%3d%20properties.remediation%2c%0a%09impact%20%3d%20properties.impact%2c%0a%09vulnId%20%3d%20properties.id%2c%0a%09additionalData%20%3d%20properties.additionalData" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fassessments%27%0a%7c%20where%20*%20contains%20%27vulnerabilities%20in%20your%20virtual%20machines%27%0a%7c%20summarize%20by%20assessmentKey%3dname%20%2f%2fthe%20ID%20of%20the%20assessment%0a%7c%20join%20kind%3dinner%20(%0a%09securityresources%0a%09%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fassessments%2fsubassessments%27%0a%09%7c%20extend%20assessmentKey%20%3d%20extract(%27.*assessments%2f(.%2b%3f)%2f.*%27%2c1%2c%20%20id)%0a)%20on%20assessmentKey%0a%7c%20project%20assessmentKey%2c%20subassessmentKey%3dname%2c%20id%2c%20parse_json(properties)%2c%20resourceGroup%2c%20subscriptionId%2c%20tenantId%0a%7c%20extend%20description%20%3d%20properties.description%2c%0a%09displayName%20%3d%20properties.displayName%2c%0a%09resourceId%20%3d%20properties.resourceDetails.id%2c%0a%09resourceSource%20%3d%20properties.resourceDetails.source%2c%0a%09category%20%3d%20properties.category%2c%0a%09severity%20%3d%20properties.status.severity%2c%0a%09code%20%3d%20properties.status.code%2c%0a%09timeGenerated%20%3d%20properties.timeGenerated%2c%0a%09remediation%20%3d%20properties.remediation%2c%0a%09impact%20%3d%20properties.impact%2c%0a%09vulnId%20%3d%20properties.id%2c%0a%09additionalData%20%3d%20properties.additionalData" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fassessments%27%0a%7c%20where%20*%20contains%20%27vulnerabilities%20in%20your%20virtual%20machines%27%0a%7c%20summarize%20by%20assessmentKey%3dname%20%2f%2fthe%20ID%20of%20the%20assessment%0a%7c%20join%20kind%3dinner%20(%0a%09securityresources%0a%09%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fassessments%2fsubassessments%27%0a%09%7c%20extend%20assessmentKey%20%3d%20extract(%27.*assessments%2f(.%2b%3f)%2f.*%27%2c1%2c%20%20id)%0a)%20on%20assessmentKey%0a%7c%20project%20assessmentKey%2c%20subassessmentKey%3dname%2c%20id%2c%20parse_json(properties)%2c%20resourceGroup%2c%20subscriptionId%2c%20tenantId%0a%7c%20extend%20description%20%3d%20properties.description%2c%0a%09displayName%20%3d%20properties.displayName%2c%0a%09resourceId%20%3d%20properties.resourceDetails.id%2c%0a%09resourceSource%20%3d%20properties.resourceDetails.source%2c%0a%09category%20%3d%20properties.category%2c%0a%09severity%20%3d%20properties.status.severity%2c%0a%09code%20%3d%20properties.status.code%2c%0a%09timeGenerated%20%3d%20properties.timeGenerated%2c%0a%09remediation%20%3d%20properties.remediation%2c%0a%09impact%20%3d%20properties.impact%2c%0a%09vulnId%20%3d%20properties.id%2c%0a%09additionalData%20%3d%20properties.additionalData" target="_blank">portal.azure.cn</a>

---

### Regulatory compliance assessments state

Returns regulatory compliance assessments state per compliance standard and control.

```kusto
SecurityResources
| where type == 'microsoft.security/regulatorycompliancestandards/regulatorycompliancecontrols/regulatorycomplianceassessments'
| extend assessmentName=properties.description,
	complianceStandard=extract(@'/regulatoryComplianceStandards/(.+)/regulatoryComplianceControls',1,id),
	complianceControl=extract(@'/regulatoryComplianceControls/(.+)/regulatoryComplianceAssessments',1,id),
	skippedResources=properties.skippedResources,
	passedResources=properties.passedResources,
	failedResources=properties.failedResources,
	state=properties.state
| project tenantId, subscriptionId, id, complianceStandard, complianceControl, assessmentName, state, skippedResources, passedResources, failedResources
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "SecurityResources | where type == 'microsoft.security/regulatorycompliancestandards/regulatorycompliancecontrols/regulatorycomplianceassessments' | extend assessmentName=properties.description, complianceStandard=extract(@'/regulatoryComplianceStandards/(.+)/regulatoryComplianceControls',1,id), complianceControl=extract(@'/regulatoryComplianceControls/(.+)/regulatoryComplianceAssessments',1,id), skippedResources=properties.skippedResources, passedResources=properties.passedResources, failedResources=properties.failedResources, state=properties.state | project tenantId, subscriptionId, id, complianceStandard, complianceControl, assessmentName, state, skippedResources, passedResources, failedResources"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "SecurityResources | where type == 'microsoft.security/regulatorycompliancestandards/regulatorycompliancecontrols/regulatorycomplianceassessments' | extend assessmentName=properties.description, complianceStandard=extract(@'/regulatoryComplianceStandards/(.+)/regulatoryComplianceControls',1,id), complianceControl=extract(@'/regulatoryComplianceControls/(.+)/regulatoryComplianceAssessments',1,id), skippedResources=properties.skippedResources, passedResources=properties.passedResources, failedResources=properties.failedResources, state=properties.state | project tenantId, subscriptionId, id, complianceStandard, complianceControl, assessmentName, state, skippedResources, passedResources, failedResources"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fregulatorycompliancestandards%2fregulatorycompliancecontrols%2fregulatorycomplianceassessments%27%0a%7c%20extend%20assessmentName%3dproperties.description%2c%0a%09complianceStandard%3dextract(%40%27%2fregulatoryComplianceStandards%2f(.%2b)%2fregulatoryComplianceControls%27%2c1%2cid)%2c%0a%09complianceControl%3dextract(%40%27%2fregulatoryComplianceControls%2f(.%2b)%2fregulatoryComplianceAssessments%27%2c1%2cid)%2c%0a%09skippedResources%3dproperties.skippedResources%2c%0a%09passedResources%3dproperties.passedResources%2c%0a%09failedResources%3dproperties.failedResources%2c%0a%09state%3dproperties.state%0a%7c%20project%20tenantId%2c%20subscriptionId%2c%20id%2c%20complianceStandard%2c%20complianceControl%2c%20assessmentName%2c%20state%2c%20skippedResources%2c%20passedResources%2c%20failedResources" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fregulatorycompliancestandards%2fregulatorycompliancecontrols%2fregulatorycomplianceassessments%27%0a%7c%20extend%20assessmentName%3dproperties.description%2c%0a%09complianceStandard%3dextract(%40%27%2fregulatoryComplianceStandards%2f(.%2b)%2fregulatoryComplianceControls%27%2c1%2cid)%2c%0a%09complianceControl%3dextract(%40%27%2fregulatoryComplianceControls%2f(.%2b)%2fregulatoryComplianceAssessments%27%2c1%2cid)%2c%0a%09skippedResources%3dproperties.skippedResources%2c%0a%09passedResources%3dproperties.passedResources%2c%0a%09failedResources%3dproperties.failedResources%2c%0a%09state%3dproperties.state%0a%7c%20project%20tenantId%2c%20subscriptionId%2c%20id%2c%20complianceStandard%2c%20complianceControl%2c%20assessmentName%2c%20state%2c%20skippedResources%2c%20passedResources%2c%20failedResources" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fregulatorycompliancestandards%2fregulatorycompliancecontrols%2fregulatorycomplianceassessments%27%0a%7c%20extend%20assessmentName%3dproperties.description%2c%0a%09complianceStandard%3dextract(%40%27%2fregulatoryComplianceStandards%2f(.%2b)%2fregulatoryComplianceControls%27%2c1%2cid)%2c%0a%09complianceControl%3dextract(%40%27%2fregulatoryComplianceControls%2f(.%2b)%2fregulatoryComplianceAssessments%27%2c1%2cid)%2c%0a%09skippedResources%3dproperties.skippedResources%2c%0a%09passedResources%3dproperties.passedResources%2c%0a%09failedResources%3dproperties.failedResources%2c%0a%09state%3dproperties.state%0a%7c%20project%20tenantId%2c%20subscriptionId%2c%20id%2c%20complianceStandard%2c%20complianceControl%2c%20assessmentName%2c%20state%2c%20skippedResources%2c%20passedResources%2c%20failedResources" target="_blank">portal.azure.cn</a>

---

### Regulatory compliance state per compliance standard

Returns regulatory compliance state per compliance standard per subscription.

```kusto
SecurityResources
| where type == 'microsoft.security/regulatorycompliancestandards'
| extend complianceStandard=name,
	state=properties.state,
	passedControls=properties.passedControls,
	failedControls=properties.failedControls,
	skippedControls=properties.skippedControls,
	unsupportedControls=properties.unsupportedControls
| project tenantId, subscriptionId, complianceStandard, state, passedControls, failedControls, skippedControls, unsupportedControls
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "SecurityResources | where type == 'microsoft.security/regulatorycompliancestandards' | extend complianceStandard=name, state=properties.state, passedControls=properties.passedControls, failedControls=properties.failedControls, skippedControls=properties.skippedControls, unsupportedControls=properties.unsupportedControls | project tenantId, subscriptionId, complianceStandard, state, passedControls, failedControls, skippedControls, unsupportedControls"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "SecurityResources | where type == 'microsoft.security/regulatorycompliancestandards' | extend complianceStandard=name, state=properties.state, passedControls=properties.passedControls, failedControls=properties.failedControls, skippedControls=properties.skippedControls, unsupportedControls=properties.unsupportedControls | project tenantId, subscriptionId, complianceStandard, state, passedControls, failedControls, skippedControls, unsupportedControls"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fregulatorycompliancestandards%27%0a%7c%20extend%20complianceStandard%3dname%2c%0a%09state%3dproperties.state%2c%0a%09passedControls%3dproperties.passedControls%2c%0a%09failedControls%3dproperties.failedControls%2c%0a%09skippedControls%3dproperties.skippedControls%2c%0a%09unsupportedControls%3dproperties.unsupportedControls%0a%7c%20project%20tenantId%2c%20subscriptionId%2c%20complianceStandard%2c%20state%2c%20passedControls%2c%20failedControls%2c%20skippedControls%2c%20unsupportedControls" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fregulatorycompliancestandards%27%0a%7c%20extend%20complianceStandard%3dname%2c%0a%09state%3dproperties.state%2c%0a%09passedControls%3dproperties.passedControls%2c%0a%09failedControls%3dproperties.failedControls%2c%0a%09skippedControls%3dproperties.skippedControls%2c%0a%09unsupportedControls%3dproperties.unsupportedControls%0a%7c%20project%20tenantId%2c%20subscriptionId%2c%20complianceStandard%2c%20state%2c%20passedControls%2c%20failedControls%2c%20skippedControls%2c%20unsupportedControls" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fregulatorycompliancestandards%27%0a%7c%20extend%20complianceStandard%3dname%2c%0a%09state%3dproperties.state%2c%0a%09passedControls%3dproperties.passedControls%2c%0a%09failedControls%3dproperties.failedControls%2c%0a%09skippedControls%3dproperties.skippedControls%2c%0a%09unsupportedControls%3dproperties.unsupportedControls%0a%7c%20project%20tenantId%2c%20subscriptionId%2c%20complianceStandard%2c%20state%2c%20passedControls%2c%20failedControls%2c%20skippedControls%2c%20unsupportedControls" target="_blank">portal.azure.cn</a>

---

### Secure score per management group

Returns secure score per management group.

```kusto
SecurityResources
| where type == 'microsoft.security/securescores'
| project subscriptionId,
	subscriptionTotal = iff(properties.score.max == 0, 0.00, round(tolong(properties.weight) * todouble(properties.score.current)/tolong(properties.score.max),2)),
	weight = tolong(iff(properties.weight == 0, 1, properties.weight))
| join kind=leftouter (
	ResourceContainers
	| where type == 'microsoft.resources/subscriptions' and properties.state == 'Enabled'
	| project subscriptionId, mgChain=properties.managementGroupAncestorsChain )
	on subscriptionId
| mv-expand mg=mgChain
| summarize sumSubs = sum(subscriptionTotal), sumWeight = sum(weight), resultsNum = count() by tostring(mg.displayName), mgId = tostring(mg.name)
| extend secureScore = iff(tolong(resultsNum) == 0, 404.00, round(sumSubs/sumWeight*100,2))
| project mgName=mg_displayName, mgId, sumSubs, sumWeight, resultsNum, secureScore
| order by mgName asc
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "SecurityResources | where type == 'microsoft.security/securescores' | project subscriptionId, subscriptionTotal = iff(properties.score.max == 0, 0.00, round(tolong(properties.weight) * todouble(properties.score.current)/tolong(properties.score.max),2)), weight = tolong(iff(properties.weight == 0, 1, properties.weight)) | join kind=leftouter ( ResourceContainers | where type == 'microsoft.resources/subscriptions' and properties.state == 'Enabled' | project subscriptionId, mgChain=properties.managementGroupAncestorsChain ) on subscriptionId | mv-expand mg=mgChain | summarize sumSubs = sum(subscriptionTotal), sumWeight = sum(weight), resultsNum = count() by tostring(mg.displayName), mgId = tostring(mg.name) | extend secureScore = iff(tolong(resultsNum) == 0, 404.00, round(sumSubs/sumWeight*100,2)) | project mgName=mg_displayName, mgId, sumSubs, sumWeight, resultsNum, secureScore | order by mgName asc"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "SecurityResources | where type == 'microsoft.security/securescores' | project subscriptionId, subscriptionTotal = iff(properties.score.max == 0, 0.00, round(tolong(properties.weight) * todouble(properties.score.current)/tolong(properties.score.max),2)), weight = tolong(iff(properties.weight == 0, 1, properties.weight)) | join kind=leftouter ( ResourceContainers | where type == 'microsoft.resources/subscriptions' and properties.state == 'Enabled' | project subscriptionId, mgChain=properties.managementGroupAncestorsChain ) on subscriptionId | mv-expand mg=mgChain | summarize sumSubs = sum(subscriptionTotal), sumWeight = sum(weight), resultsNum = count() by tostring(mg.displayName), mgId = tostring(mg.name) | extend secureScore = iff(tolong(resultsNum) == 0, 404.00, round(sumSubs/sumWeight*100,2)) | project mgName=mg_displayName, mgId, sumSubs, sumWeight, resultsNum, secureScore | order by mgName asc"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fsecurescores%27%0a%7c%20project%20subscriptionId%2c%0a%09subscriptionTotal%20%3d%20iff(properties.score.max%20%3d%3d%200%2c%200.00%2c%20round(tolong(properties.weight)%20*%20todouble(properties.score.current)%2ftolong(properties.score.max)%2c2))%2c%0a%09weight%20%3d%20tolong(iff(properties.weight%20%3d%3d%200%2c%201%2c%20properties.weight))%0a%7c%20join%20kind%3dleftouter%20(%0a%09ResourceContainers%0a%09%7c%20where%20type%20%3d%3d%20%27microsoft.resources%2fsubscriptions%27%20and%20properties.state%20%3d%3d%20%27Enabled%27%0a%09%7c%20project%20subscriptionId%2c%20mgChain%3dproperties.managementGroupAncestorsChain%20)%0a%09on%20subscriptionId%0a%7c%20mv-expand%20mg%3dmgChain%0a%7c%20summarize%20sumSubs%20%3d%20sum(subscriptionTotal)%2c%20sumWeight%20%3d%20sum(weight)%2c%20resultsNum%20%3d%20count()%20by%20tostring(mg.displayName)%2c%20mgId%20%3d%20tostring(mg.name)%0a%7c%20extend%20secureScore%20%3d%20iff(tolong(resultsNum)%20%3d%3d%200%2c%20404.00%2c%20round(sumSubs%2fsumWeight*100%2c2))%0a%7c%20project%20mgName%3dmg_displayName%2c%20mgId%2c%20sumSubs%2c%20sumWeight%2c%20resultsNum%2c%20secureScore%0a%7c%20order%20by%20mgName%20asc" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fsecurescores%27%0a%7c%20project%20subscriptionId%2c%0a%09subscriptionTotal%20%3d%20iff(properties.score.max%20%3d%3d%200%2c%200.00%2c%20round(tolong(properties.weight)%20*%20todouble(properties.score.current)%2ftolong(properties.score.max)%2c2))%2c%0a%09weight%20%3d%20tolong(iff(properties.weight%20%3d%3d%200%2c%201%2c%20properties.weight))%0a%7c%20join%20kind%3dleftouter%20(%0a%09ResourceContainers%0a%09%7c%20where%20type%20%3d%3d%20%27microsoft.resources%2fsubscriptions%27%20and%20properties.state%20%3d%3d%20%27Enabled%27%0a%09%7c%20project%20subscriptionId%2c%20mgChain%3dproperties.managementGroupAncestorsChain%20)%0a%09on%20subscriptionId%0a%7c%20mv-expand%20mg%3dmgChain%0a%7c%20summarize%20sumSubs%20%3d%20sum(subscriptionTotal)%2c%20sumWeight%20%3d%20sum(weight)%2c%20resultsNum%20%3d%20count()%20by%20tostring(mg.displayName)%2c%20mgId%20%3d%20tostring(mg.name)%0a%7c%20extend%20secureScore%20%3d%20iff(tolong(resultsNum)%20%3d%3d%200%2c%20404.00%2c%20round(sumSubs%2fsumWeight*100%2c2))%0a%7c%20project%20mgName%3dmg_displayName%2c%20mgId%2c%20sumSubs%2c%20sumWeight%2c%20resultsNum%2c%20secureScore%0a%7c%20order%20by%20mgName%20asc" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fsecurescores%27%0a%7c%20project%20subscriptionId%2c%0a%09subscriptionTotal%20%3d%20iff(properties.score.max%20%3d%3d%200%2c%200.00%2c%20round(tolong(properties.weight)%20*%20todouble(properties.score.current)%2ftolong(properties.score.max)%2c2))%2c%0a%09weight%20%3d%20tolong(iff(properties.weight%20%3d%3d%200%2c%201%2c%20properties.weight))%0a%7c%20join%20kind%3dleftouter%20(%0a%09ResourceContainers%0a%09%7c%20where%20type%20%3d%3d%20%27microsoft.resources%2fsubscriptions%27%20and%20properties.state%20%3d%3d%20%27Enabled%27%0a%09%7c%20project%20subscriptionId%2c%20mgChain%3dproperties.managementGroupAncestorsChain%20)%0a%09on%20subscriptionId%0a%7c%20mv-expand%20mg%3dmgChain%0a%7c%20summarize%20sumSubs%20%3d%20sum(subscriptionTotal)%2c%20sumWeight%20%3d%20sum(weight)%2c%20resultsNum%20%3d%20count()%20by%20tostring(mg.displayName)%2c%20mgId%20%3d%20tostring(mg.name)%0a%7c%20extend%20secureScore%20%3d%20iff(tolong(resultsNum)%20%3d%3d%200%2c%20404.00%2c%20round(sumSubs%2fsumWeight*100%2c2))%0a%7c%20project%20mgName%3dmg_displayName%2c%20mgId%2c%20sumSubs%2c%20sumWeight%2c%20resultsNum%2c%20secureScore%0a%7c%20order%20by%20mgName%20asc" target="_blank">portal.azure.cn</a>

---

### Secure score per subscription

Returns secure score per subscription.

```kusto
SecurityResources
| where type == 'microsoft.security/securescores'
| extend percentageScore=properties.score.percentage,
	currentScore=properties.score.current,
	maxScore=properties.score.max,
	weight=properties.weight
| project tenantId, subscriptionId, percentageScore, currentScore, maxScore, weight
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "SecurityResources | where type == 'microsoft.security/securescores' | extend percentageScore=properties.score.percentage, currentScore=properties.score.current, maxScore=properties.score.max, weight=properties.weight | project tenantId, subscriptionId, percentageScore, currentScore, maxScore, weight"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "SecurityResources | where type == 'microsoft.security/securescores' | extend percentageScore=properties.score.percentage, currentScore=properties.score.current, maxScore=properties.score.max, weight=properties.weight | project tenantId, subscriptionId, percentageScore, currentScore, maxScore, weight"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fsecurescores%27%0a%7c%20extend%20percentageScore%3dproperties.score.percentage%2c%0a%09currentScore%3dproperties.score.current%2c%0a%09maxScore%3dproperties.score.max%2c%0a%09weight%3dproperties.weight%0a%7c%20project%20tenantId%2c%20subscriptionId%2c%20percentageScore%2c%20currentScore%2c%20maxScore%2c%20weight" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fsecurescores%27%0a%7c%20extend%20percentageScore%3dproperties.score.percentage%2c%0a%09currentScore%3dproperties.score.current%2c%0a%09maxScore%3dproperties.score.max%2c%0a%09weight%3dproperties.weight%0a%7c%20project%20tenantId%2c%20subscriptionId%2c%20percentageScore%2c%20currentScore%2c%20maxScore%2c%20weight" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fsecurescores%27%0a%7c%20extend%20percentageScore%3dproperties.score.percentage%2c%0a%09currentScore%3dproperties.score.current%2c%0a%09maxScore%3dproperties.score.max%2c%0a%09weight%3dproperties.weight%0a%7c%20project%20tenantId%2c%20subscriptionId%2c%20percentageScore%2c%20currentScore%2c%20maxScore%2c%20weight" target="_blank">portal.azure.cn</a>

---

### Show Defender for Cloud plan pricing tier per subscription

Returns Defender for Cloud pricing tier plan per subscription.

```kusto
SecurityResources
| where type == 'microsoft.security/pricings'
| project Subscription= subscriptionId, Azure_Defender_plan= name, Status= properties.pricingTier
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "SecurityResources | where type == 'microsoft.security/pricings' | project Subscription= subscriptionId, Azure_Defender_plan= name, Status= properties.pricingTier"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "SecurityResources | where type == 'microsoft.security/pricings' | project Subscription= subscriptionId, Azure_Defender_plan= name, Status= properties.pricingTier"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fpricings%27%0a%7c%20project%20Subscription%3d%20subscriptionId%2c%20Azure_Defender_plan%3d%20name%2c%20Status%3d%20properties.pricingTier" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fpricings%27%0a%7c%20project%20Subscription%3d%20subscriptionId%2c%20Azure_Defender_plan%3d%20name%2c%20Status%3d%20properties.pricingTier" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/SecurityResources%0a%7c%20where%20type%20%3d%3d%20%27microsoft.security%2fpricings%27%0a%7c%20project%20Subscription%3d%20subscriptionId%2c%20Azure_Defender_plan%3d%20name%2c%20Status%3d%20properties.pricingTier" target="_blank">portal.azure.cn</a>

---


## Networking


### Count resources that have IP addresses configured by subscription

Using the 'List all public IP addresses' example query and adding `summarize` and `count()`, we can get a list by subscription of resources with configured IP addresses.

```kusto
Resources
| where type contains 'publicIPAddresses' and isnotempty(properties.ipAddress)
| summarize count () by subscriptionId
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type contains 'publicIPAddresses' and isnotempty(properties.ipAddress) | summarize count () by subscriptionId"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type contains 'publicIPAddresses' and isnotempty(properties.ipAddress) | summarize count () by subscriptionId"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20contains%20%27publicIPAddresses%27%20and%20isnotempty(properties.ipAddress)%0a%7c%20summarize%20count%20()%20by%20subscriptionId" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20contains%20%27publicIPAddresses%27%20and%20isnotempty(properties.ipAddress)%0a%7c%20summarize%20count%20()%20by%20subscriptionId" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20contains%20%27publicIPAddresses%27%20and%20isnotempty(properties.ipAddress)%0a%7c%20summarize%20count%20()%20by%20subscriptionId" target="_blank">portal.azure.cn</a>

---

### Get virtual networks and subnets of network interfaces

Use a regular expression `parse` to get the virtual network and subnet names from the resource ID property. While `parse` enables getting data from a complex field, it's optimal to access properties directly if they exist instead of using `parse`.

```kusto
Resources
| where type =~ 'microsoft.network/networkinterfaces'
| project id, ipConfigurations = properties.ipConfigurations
| mvexpand ipConfigurations
| project id, subnetId = tostring(ipConfigurations.properties.subnet.id)
| parse kind=regex subnetId with '/virtualNetworks/' virtualNetwork '/subnets/' subnet
| project id, virtualNetwork, subnet
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type =~ 'microsoft.network/networkinterfaces' | project id, ipConfigurations = properties.ipConfigurations | mvexpand ipConfigurations | project id, subnetId = tostring(ipConfigurations.properties.subnet.id) | parse kind=regex subnetId with '/virtualNetworks/' virtualNetwork '/subnets/' subnet | project id, virtualNetwork, subnet"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type =~ 'microsoft.network/networkinterfaces' | project id, ipConfigurations = properties.ipConfigurations | mvexpand ipConfigurations | project id, subnetId = tostring(ipConfigurations.properties.subnet.id) | parse kind=regex subnetId with '/virtualNetworks/' virtualNetwork '/subnets/' subnet | project id, virtualNetwork, subnet"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.network%2fnetworkinterfaces%27%0a%7c%20project%20id%2c%20ipConfigurations%20%3d%20properties.ipConfigurations%0a%7c%20mvexpand%20ipConfigurations%0a%7c%20project%20id%2c%20subnetId%20%3d%20tostring(ipConfigurations.properties.subnet.id)%0a%7c%20parse%20kind%3dregex%20subnetId%20with%20%27%2fvirtualNetworks%2f%27%20virtualNetwork%20%27%2fsubnets%2f%27%20subnet%0a%7c%20project%20id%2c%20virtualNetwork%2c%20subnet" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.network%2fnetworkinterfaces%27%0a%7c%20project%20id%2c%20ipConfigurations%20%3d%20properties.ipConfigurations%0a%7c%20mvexpand%20ipConfigurations%0a%7c%20project%20id%2c%20subnetId%20%3d%20tostring(ipConfigurations.properties.subnet.id)%0a%7c%20parse%20kind%3dregex%20subnetId%20with%20%27%2fvirtualNetworks%2f%27%20virtualNetwork%20%27%2fsubnets%2f%27%20subnet%0a%7c%20project%20id%2c%20virtualNetwork%2c%20subnet" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.network%2fnetworkinterfaces%27%0a%7c%20project%20id%2c%20ipConfigurations%20%3d%20properties.ipConfigurations%0a%7c%20mvexpand%20ipConfigurations%0a%7c%20project%20id%2c%20subnetId%20%3d%20tostring(ipConfigurations.properties.subnet.id)%0a%7c%20parse%20kind%3dregex%20subnetId%20with%20%27%2fvirtualNetworks%2f%27%20virtualNetwork%20%27%2fsubnets%2f%27%20subnet%0a%7c%20project%20id%2c%20virtualNetwork%2c%20subnet" target="_blank">portal.azure.cn</a>

---

### List all public IP addresses

Similar to the 'Show resources that contain storage' query, find everything that is a type with the word **publicIPAddresses**. This query expands on that pattern to only include results where **properties.ipAddress** `isnotempty`, to only return the **properties.ipAddress**, and to `limit` the results by the top 100. You may need to escape the quotes depending on your chosen shell.

```kusto
Resources
| where type contains 'publicIPAddresses' and isnotempty(properties.ipAddress)
| project properties.ipAddress
| limit 100
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type contains 'publicIPAddresses' and isnotempty(properties.ipAddress) | project properties.ipAddress | limit 100"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type contains 'publicIPAddresses' and isnotempty(properties.ipAddress) | project properties.ipAddress | limit 100"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20contains%20%27publicIPAddresses%27%20and%20isnotempty(properties.ipAddress)%0a%7c%20project%20properties.ipAddress%0a%7c%20limit%20100" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20contains%20%27publicIPAddresses%27%20and%20isnotempty(properties.ipAddress)%0a%7c%20project%20properties.ipAddress%0a%7c%20limit%20100" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20contains%20%27publicIPAddresses%27%20and%20isnotempty(properties.ipAddress)%0a%7c%20project%20properties.ipAddress%0a%7c%20limit%20100" target="_blank">portal.azure.cn</a>

---

### Show unassociated network security groups

This query returns network security groups (NSGs) that aren't associated to a network interface or subnet.

```kusto
Resources
| where type =~ 'microsoft.network/networksecuritygroups' and isnull(properties.networkInterfaces) and isnull(properties.subnets)
| project name, resourceGroup
| sort by name asc
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type =~ 'microsoft.network/networksecuritygroups' and isnull(properties.networkInterfaces) and isnull(properties.subnets) | project name, resourceGroup | sort by name asc"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type =~ 'microsoft.network/networksecuritygroups' and isnull(properties.networkInterfaces) and isnull(properties.subnets) | project name, resourceGroup | sort by name asc"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.network%2fnetworksecuritygroups%27%20and%20isnull(properties.networkInterfaces)%20and%20isnull(properties.subnets)%0a%7c%20project%20name%2c%20resourceGroup%0a%7c%20sort%20by%20name%20asc" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.network%2fnetworksecuritygroups%27%20and%20isnull(properties.networkInterfaces)%20and%20isnull(properties.subnets)%0a%7c%20project%20name%2c%20resourceGroup%0a%7c%20sort%20by%20name%20asc" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.network%2fnetworksecuritygroups%27%20and%20isnull(properties.networkInterfaces)%20and%20isnull(properties.subnets)%0a%7c%20project%20name%2c%20resourceGroup%0a%7c%20sort%20by%20name%20asc" target="_blank">portal.azure.cn</a>

---



### Show virtual machines with Basic SKU public IP addresses

This query returns a list of virtual machine IDs with Basic SKU public IP addresses attached.

```kusto
Resources
| where type =~ 'microsoft.compute/virtualmachines'
| project vmId = tolower(id), vmNics = properties.networkProfile.networkInterfaces
| join (
  Resources |
  where type =~ 'microsoft.network/networkinterfaces' |
  project nicVMId = tolower(tostring(properties.virtualMachine.id)), allVMNicID = tolower(id), nicIPConfigs = properties.ipConfigurations)
  on $left.vmId == $right.nicVMId
| join (
  Resources
  | where type =~ 'microsoft.network/publicipaddresses' and isnotnull(properties.ipConfiguration.id)
  | where sku.name == 'Basic' // exclude to find all VMs with Public IPs
  | project pipId = id, pipSku = sku.name, pipAssociatedNicId = tolower(tostring(split(properties.ipConfiguration.id, '/ipConfigurations/')[0])))
  on $left.allVMNicID == $right.pipAssociatedNicId
| project vmId, pipId, pipSku
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type =~ 'microsoft.compute/virtualmachines' | project vmId = tolower(id), vmNics = properties.networkProfile.networkInterfaces | join (Resources | where type =~ 'microsoft.network/networkinterfaces' | project nicVMId = tolower(tostring(properties.virtualMachine.id)), allVMNicID = tolower(id), nicIPConfigs = properties.ipConfigurations) on \$left.vmId == \$right.nicVMId | join ( Resources | where type =~ 'microsoft.network/publicipaddresses' and isnotnull(properties.ipConfiguration.id) | where sku.name == 'Basic' | project pipId = id, pipSku = sku.name, pipAssociatedNicId = tolower(tostring(split(properties.ipConfiguration.id, '/ipConfigurations/')[0]))) on \$left.allVMNicID == \$right.pipAssociatedNicId | project vmId, pipId, pipSku"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type =~ 'microsoft.compute/virtualmachines' | project vmId = tolower(id), vmNics = properties.networkProfile.networkInterfaces | join (Resources | where type =~ 'microsoft.network/networkinterfaces' | project nicVMId = tolower(tostring(properties.virtualMachine.id)), allVMNicID = tolower(id), nicIPConfigs = properties.ipConfigurations) on `$left.vmId == `$right.nicVMId | join ( Resources | where type =~ 'microsoft.network/publicipaddresses' and isnotnull(properties.ipConfiguration.id) | where sku.name == 'Basic' | project pipId = id, pipSku = sku.name, pipAssociatedNicId = tolower(tostring(split(properties.ipConfiguration.id, '/ipConfigurations/')[0]))) on `$left.allVMNicID == `$right.pipAssociatedNicId | project vmId, pipId, pipSku"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0A%7C%20where%20type%20%3D~%20%27microsoft.compute%2Fvirtualmachines%27%0A%7C%20project%20vmId%20%3D%20tolower%28id%29%2C%20vmNics%20%3D%20properties.networkProfile.networkInterfaces%0A%7C%20join%20%28%0A%20%20Resources%20%7C%0A%20%20where%20type%20%3D~%20%27microsoft.network%2Fnetworkinterfaces%27%20%7C%0A%20%20project%20nicVMId%20%3D%20tolower%28tostring%28properties.virtualMachine.id%29%29%2C%20allVMNicID%20%3D%20tolower%28id%29%2C%20nicIPConfigs%20%3D%20properties.ipConfigurations%29%0A%20%20on%20%24left.vmId%20%3D%3D%20%24right.nicVMId%0A%7C%20join%20%28%0A%20%20Resources%0A%20%20%7C%20where%20type%20%3D~%20%27microsoft.network%2Fpublicipaddresses%27%20and%20isnotnull%28properties.ipConfiguration.id%29%0A%20%20%7C%20where%20sku.name%20%3D%3D%20%27Basic%27%0A%20%20%7C%20project%20pipId%20%3D%20id%2C%20pipSku%20%3D%20sku.name%2C%20pipAssociatedNicId%20%3D%20tolower%28tostring%28split%28properties.ipConfiguration.id%2C%20%27%2FipConfigurations%2F%27%29%5B0%5D%29%29%29%0A%20%20on%20%24left.allVMNicID%20%3D%3D%20%24right.pipAssociatedNicId%0A%7C%20project%20vmId%2C%20pipId%2C%20pipSku" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0A%7C%20where%20type%20%3D~%20%27microsoft.compute%2Fvirtualmachines%27%0A%7C%20project%20vmId%20%3D%20tolower%28id%29%2C%20vmNics%20%3D%20properties.networkProfile.networkInterfaces%0A%7C%20join%20%28%0A%20%20Resources%20%7C%0A%20%20where%20type%20%3D~%20%27microsoft.network%2Fnetworkinterfaces%27%20%7C%0A%20%20project%20nicVMId%20%3D%20tolower%28tostring%28properties.virtualMachine.id%29%29%2C%20allVMNicID%20%3D%20tolower%28id%29%2C%20nicIPConfigs%20%3D%20properties.ipConfigurations%29%0A%20%20on%20%24left.vmId%20%3D%3D%20%24right.nicVMId%0A%7C%20join%20%28%0A%20%20Resources%0A%20%20%7C%20where%20type%20%3D~%20%27microsoft.network%2Fpublicipaddresses%27%20and%20isnotnull%28properties.ipConfiguration.id%29%0A%20%20%7C%20where%20sku.name%20%3D%3D%20%27Basic%27%0A%20%20%7C%20project%20pipId%20%3D%20id%2C%20pipSku%20%3D%20sku.name%2C%20pipAssociatedNicId%20%3D%20tolower%28tostring%28split%28properties.ipConfiguration.id%2C%20%27%2FipConfigurations%2F%27%29%5B0%5D%29%29%29%0A%20%20on%20%24left.allVMNicID%20%3D%3D%20%24right.pipAssociatedNicId%0A%7C%20project%20vmId%2C%20pipId%2C%20pipSku" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0A%7C%20where%20type%20%3D~%20%27microsoft.compute%2Fvirtualmachines%27%0A%7C%20project%20vmId%20%3D%20tolower%28id%29%2C%20vmNics%20%3D%20properties.networkProfile.networkInterfaces%0A%7C%20join%20%28%0A%20%20Resources%20%7C%0A%20%20where%20type%20%3D~%20%27microsoft.network%2Fnetworkinterfaces%27%20%7C%0A%20%20project%20nicVMId%20%3D%20tolower%28tostring%28properties.virtualMachine.id%29%29%2C%20allVMNicID%20%3D%20tolower%28id%29%2C%20nicIPConfigs%20%3D%20properties.ipConfigurations%29%0A%20%20on%20%24left.vmId%20%3D%3D%20%24right.nicVMId%0A%7C%20join%20%28%0A%20%20Resources%0A%20%20%7C%20where%20type%20%3D~%20%27microsoft.network%2Fpublicipaddresses%27%20and%20isnotnull%28properties.ipConfiguration.id%29%0A%20%20%7C%20where%20sku.name%20%3D%3D%20%27Basic%27%0A%20%20%7C%20project%20pipId%20%3D%20id%2C%20pipSku%20%3D%20sku.name%2C%20pipAssociatedNicId%20%3D%20tolower%28tostring%28split%28properties.ipConfiguration.id%2C%20%27%2FipConfigurations%2F%27%29%5B0%5D%29%29%29%0A%20%20on%20%24left.allVMNicID%20%3D%3D%20%24right.pipAssociatedNicId%0A%7C%20project%20vmId%2C%20pipId%2C%20pipSku" target="_blank">portal.azure.cn</a>

---


## Resource health


### Count of virtual machines by availability state and Subscription Id

Returns the count of virtual machines (type `Microsoft.Compute/virtualMachines`) aggregated by their availability state across each of your subscriptions.

```kusto
HealthResources
| where type =~ 'microsoft.resourcehealth/availabilitystatuses'
| summarize count() by subscriptionId, AvailabilityState = tostring(properties.availabilityState)
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "HealthResources | where type =~ 'microsoft.resourcehealth/availabilitystatuses' | summarize count() by subscriptionId, AvailabilityState = tostring(properties.availabilityState)"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "HealthResources | where type =~ 'microsoft.resourcehealth/availabilitystatuses' | summarize count() by subscriptionId, AvailabilityState = tostring(properties.availabilityState)"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/HealthResources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.resourcehealth%2favailabilitystatuses%27%0a%7c%20summarize%20count()%20by%20subscriptionId%2c%20AvailabilityState%20%3d%20tostring(properties.availabilityState)" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/HealthResources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.resourcehealth%2favailabilitystatuses%27%0a%7c%20summarize%20count()%20by%20subscriptionId%2c%20AvailabilityState%20%3d%20tostring(properties.availabilityState)" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/HealthResources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.resourcehealth%2favailabilitystatuses%27%0a%7c%20summarize%20count()%20by%20subscriptionId%2c%20AvailabilityState%20%3d%20tostring(properties.availabilityState)" target="_blank">portal.azure.cn</a>

---

### List of virtual machines and associated availability states by Resource Ids

Returns the latest list of virtual machines (type `Microsoft.Compute/virtualMachines`) aggregated by availability state. The query also provides the associated Resource Id based on `properties.targetResourceId`, for easy debugging and mitigation. Availability states can be one of four values: Available, Unavailable, Degraded, and Unknown. For more details on what each of the availability states mean, see [Azure Resource Health overview](https://learn.microsoft.com/azure/service-health/resource-health-overview#health-status).

```kusto
HealthResources
| where type =~ 'microsoft.resourcehealth/availabilitystatuses'
| summarize by ResourceId = tolower(tostring(properties.targetResourceId)), AvailabilityState = tostring(properties.availabilityState)
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "HealthResources | where type =~ 'microsoft.resourcehealth/availabilitystatuses' | summarize by ResourceId = tolower(tostring(properties.targetResourceId)), AvailabilityState = tostring(properties.availabilityState)"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "HealthResources | where type =~ 'microsoft.resourcehealth/availabilitystatuses' | summarize by ResourceId = tolower(tostring(properties.targetResourceId)), AvailabilityState = tostring(properties.availabilityState)"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/HealthResources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.resourcehealth%2favailabilitystatuses%27%0a%7c%20summarize%20by%20ResourceId%20%3d%20tolower(tostring(properties.targetResourceId))%2c%20AvailabilityState%20%3d%20tostring(properties.availabilityState)" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/HealthResources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.resourcehealth%2favailabilitystatuses%27%0a%7c%20summarize%20by%20ResourceId%20%3d%20tolower(tostring(properties.targetResourceId))%2c%20AvailabilityState%20%3d%20tostring(properties.availabilityState)" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/HealthResources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.resourcehealth%2favailabilitystatuses%27%0a%7c%20summarize%20by%20ResourceId%20%3d%20tolower(tostring(properties.targetResourceId))%2c%20AvailabilityState%20%3d%20tostring(properties.availabilityState)" target="_blank">portal.azure.cn</a>

---

### List of virtual machines by availability state and power state with Resource Ids and resource Groups

Returns list of virtual machines (type `Microsoft.Compute/virtualMachines`) aggregated on their power state and availability state to provide a cohesive state of health for your virtual machines. The query also provides details on the resource group and resource Id associated with each entry for detailed visibility into your resources.

```kusto
Resources
| where type =~ 'microsoft.compute/virtualmachines'
| project resourceGroup, Id = tolower(id), PowerState = tostring( properties.extended.instanceView.powerState.code)
| join kind=leftouter (
  HealthResources
  | where type =~ 'microsoft.resourcehealth/availabilitystatuses'
  | where tostring(properties.targetResourceType) =~ 'microsoft.compute/virtualmachines'
  | project targetResourceId = tolower(tostring(properties.targetResourceId)), AvailabilityState = tostring(properties.availabilityState))
  on $left.Id == $right.targetResourceId
| project-away targetResourceId
| where PowerState != 'PowerState/deallocated'
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type =~ 'microsoft.compute/virtualmachines' | project resourceGroup, Id = tolower(id), PowerState = tostring( properties.extended.instanceView.powerState.code) | join kind=leftouter ( HealthResources | where type =~ 'microsoft.resourcehealth/availabilitystatuses' | where tostring(properties.targetResourceType) =~ 'microsoft.compute/virtualmachines' | project targetResourceId = tolower(tostring(properties.targetResourceId)), AvailabilityState = tostring(properties.availabilityState)) on \$left.Id == \$right.targetResourceId | project-away targetResourceId | where PowerState != 'PowerState/deallocated'"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type =~ 'microsoft.compute/virtualmachines' | project resourceGroup, Id = tolower(id), PowerState = tostring( properties.extended.instanceView.powerState.code) | join kind=leftouter ( HealthResources | where type =~ 'microsoft.resourcehealth/availabilitystatuses' | where tostring(properties.targetResourceType) =~ 'microsoft.compute/virtualmachines' | project targetResourceId = tolower(tostring(properties.targetResourceId)), AvailabilityState = tostring(properties.availabilityState)) on $left.Id == $right.targetResourceId | project-away targetResourceId | where PowerState != 'PowerState/deallocated'"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.compute%2fvirtualmachines%27%0a%7c%20project%20resourceGroup%2c%20Id%20%3d%20tolower(id)%2c%20PowerState%20%3d%20tostring(%20properties.extended.instanceView.powerState.code)%0a%7c%20join%20kind%3dleftouter%20(%0a%09HealthResources%0a%09%7c%20where%20type%20%3d%7e%20%27microsoft.resourcehealth%2favailabilitystatuses%27%0a%09%7c%20where%20tostring(properties.targetResourceType)%20%3d%7e%20%27microsoft.compute%2fvirtualmachines%27%0a%09%7c%20project%20targetResourceId%20%3d%20tolower(tostring(properties.targetResourceId))%2c%20AvailabilityState%20%3d%20tostring(properties.availabilityState))%0a%09on%20%24left.Id%20%3d%3d%20%24right.targetResourceId%0a%7c%20project-away%20targetResourceId%0a%7c%20where%20PowerState%20!%3d%20%27PowerState%2fdeallocated%27" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.compute%2fvirtualmachines%27%0a%7c%20project%20resourceGroup%2c%20Id%20%3d%20tolower(id)%2c%20PowerState%20%3d%20tostring(%20properties.extended.instanceView.powerState.code)%0a%7c%20join%20kind%3dleftouter%20(%0a%09HealthResources%0a%09%7c%20where%20type%20%3d%7e%20%27microsoft.resourcehealth%2favailabilitystatuses%27%0a%09%7c%20where%20tostring(properties.targetResourceType)%20%3d%7e%20%27microsoft.compute%2fvirtualmachines%27%0a%09%7c%20project%20targetResourceId%20%3d%20tolower(tostring(properties.targetResourceId))%2c%20AvailabilityState%20%3d%20tostring(properties.availabilityState))%0a%09on%20%24left.Id%20%3d%3d%20%24right.targetResourceId%0a%7c%20project-away%20targetResourceId%0a%7c%20where%20PowerState%20!%3d%20%27PowerState%2fdeallocated%27" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.compute%2fvirtualmachines%27%0a%7c%20project%20resourceGroup%2c%20Id%20%3d%20tolower(id)%2c%20PowerState%20%3d%20tostring(%20properties.extended.instanceView.powerState.code)%0a%7c%20join%20kind%3dleftouter%20(%0a%09HealthResources%0a%09%7c%20where%20type%20%3d%7e%20%27microsoft.resourcehealth%2favailabilitystatuses%27%0a%09%7c%20where%20tostring(properties.targetResourceType)%20%3d%7e%20%27microsoft.compute%2fvirtualmachines%27%0a%09%7c%20project%20targetResourceId%20%3d%20tolower(tostring(properties.targetResourceId))%2c%20AvailabilityState%20%3d%20tostring(properties.availabilityState))%0a%09on%20%24left.Id%20%3d%3d%20%24right.targetResourceId%0a%7c%20project-away%20targetResourceId%0a%7c%20where%20PowerState%20!%3d%20%27PowerState%2fdeallocated%27" target="_blank">portal.azure.cn</a>

---

### List of virtual machines not available by Resource Ids

Returns the latest list of virtual machines (type `Microsoft.Compute/virtualMachines`) aggregated by their availability state. The populated list only highlights virtual machines whose availability state isn't "Available" to ensure you're aware of all the concerning states your virtual machines are in. When all your virtual machines are Available, you can expect to receive no results.

```kusto
HealthResources
| where type =~ 'microsoft.resourcehealth/availabilitystatuses'
| where tostring(properties.availabilityState) != 'Available'
| summarize by ResourceId = tolower(tostring(properties.targetResourceId)), AvailabilityState = tostring(properties.availabilityState)
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "HealthResources | where type =~ 'microsoft.resourcehealth/availabilitystatuses' | where tostring(properties.availabilityState) != 'Available' | summarize by ResourceId = tolower(tostring(properties.targetResourceId)), AvailabilityState = tostring(properties.availabilityState)"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "HealthResources | where type =~ 'microsoft.resourcehealth/availabilitystatuses' | where tostring(properties.availabilityState) != 'Available' | summarize by ResourceId = tolower(tostring(properties.targetResourceId)), AvailabilityState = tostring(properties.availabilityState)"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/HealthResources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.resourcehealth%2favailabilitystatuses%27%0a%7c%20where%20tostring(properties.availabilityState)%20!%3d%20%27Available%27%0a%7c%20summarize%20by%20ResourceId%20%3d%20tolower(tostring(properties.targetResourceId))%2c%20AvailabilityState%20%3d%20tostring(properties.availabilityState)" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/HealthResources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.resourcehealth%2favailabilitystatuses%27%0a%7c%20where%20tostring(properties.availabilityState)%20!%3d%20%27Available%27%0a%7c%20summarize%20by%20ResourceId%20%3d%20tolower(tostring(properties.targetResourceId))%2c%20AvailabilityState%20%3d%20tostring(properties.availabilityState)" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/HealthResources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.resourcehealth%2favailabilitystatuses%27%0a%7c%20where%20tostring(properties.availabilityState)%20!%3d%20%27Available%27%0a%7c%20summarize%20by%20ResourceId%20%3d%20tolower(tostring(properties.targetResourceId))%2c%20AvailabilityState%20%3d%20tostring(properties.availabilityState)" target="_blank">portal.azure.cn</a>

---


## Service Groups 


### List of all Service Groups

Outputs a list of Service Groups.

```kusto
resourcecontainers
| where type == "microsoft.management/servicegroups"
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "resourcecontainers | where type == 'microsoft.management/servicegroups'"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "resourcecontainers | where type == 'microsoft.management/servicegroups'" -UseTenantScope
```

# [Portal](#tab/azure-portal)

- Azure portal: <a>[portal.azure.com](https://portal.azure.com/#view/HubsExtension/ArgQueryBlade/query/resourcecontainers%0A%7C%20where%20type%20%3D%3D%20%22microsoft.management%2Fservicegroups%22)</a>

---

### List of all members for a particular Service Group

Outputs a list of resource IDs that are members for a particular Service Groups. In this example, the service group ID is '123'.

```kusto
relationshipresources
    | where type == "microsoft.relationships/servicegroupmember"
    | where properties.TargetId == '/providers/Microsoft.Management/serviceGroups/123'
    | project properties.SourceId
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "relationshipresources| where type == 'microsoft.relationships/servicegroupmember'| where properties.TargetId == '/providers/Microsoft.Management/serviceGroups/123' | project properties.SourceId"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "relationshipresources| where type == 'microsoft.relationships/servicegroupmember'| where properties.TargetId == '/providers/Microsoft.Management/serviceGroups/123' | project properties.SourceId" -UseTenantScope
```

# [Portal](#tab/azure-portal)

- Azure portal: <a>[portal.azure.com](https://portal.azure.com/#view/HubsExtension/ArgQueryBlade/query/relationshipresources%7C%20where%20type%20%3D%3D%20'microsoft.relationships%2Fservicegroupmember'%7C%20where%20properties.TargetId%20%3D%3D%20'%2Fproviders%2FMicrosoft.Management%2FserviceGroups%2F123'%20%7C%20project%20properties.SourceId)</a>

---

### Count of Members for all Service Groups

Provides a count of service group members for a particular service group. In this example, the service group ID is '123'.

```kusto
relationshipresources
    | where type == "microsoft.relationships/servicegroupmember"
    | where properties.TargetId == '/providers/Microsoft.Management/serviceGroups/123'
    | count 
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "relationshipresources| where type == 'microsoft.relationships/servicegroupmember'| where properties.TargetId == '/providers/Microsoft.Management/serviceGroups/123' | count"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "relationshipresources| where type == 'microsoft.relationships/servicegroupmember'| where properties.TargetId == '/providers/Microsoft.Management/serviceGroups/123' | count" -UseTenantScope
```

# [Portal](#tab/azure-portal)

- Azure portal: <a>[portal.azure.com](https://portal.azure.com/#view/HubsExtension/ArgQueryBlade/query/relationshipresources%7C%20where%20type%20%3D%3D%20'microsoft.relationships%2Fservicegroupmember'%7C%20where%20properties.TargetId%20%3D%3D%20'%2Fproviders%2FMicrosoft.Management%2FserviceGroups%2F123'%20%7C%20count)</a>

---


## Tags


### Find storage accounts with a specific case-insensitive tag on the resource group

Similar to the 'Find storage accounts with a specific case-sensitive tag on the resource group' query, but when it's necessary to look for a case insensitive tag name and tag value, use `mv-expand` with the **bagexpansion** parameter. This query uses more quota than the original query, so use `mv-expand` only if necessary.

```kusto
Resources
| where type =~ 'microsoft.storage/storageaccounts'
| join kind=inner (
	ResourceContainers
	| where type =~ 'microsoft.resources/subscriptions/resourcegroups'
	| mv-expand bagexpansion=array tags
	| where isnotempty(tags)
	| where tags[0] =~ 'key1' and tags[1] =~ 'value1'
	| project subscriptionId, resourceGroup)
on subscriptionId, resourceGroup
| project-away subscriptionId1, resourceGroup1
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type =~ 'microsoft.storage/storageaccounts' | join kind=inner ( ResourceContainers | where type =~ 'microsoft.resources/subscriptions/resourcegroups' | mv-expand bagexpansion=array tags | where isnotempty(tags) | where tags[0] =~ 'key1' and tags[1] =~ 'value1' | project subscriptionId, resourceGroup) on subscriptionId, resourceGroup | project-away subscriptionId1, resourceGroup1"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type =~ 'microsoft.storage/storageaccounts' | join kind=inner ( ResourceContainers | where type =~ 'microsoft.resources/subscriptions/resourcegroups' | mv-expand bagexpansion=array tags | where isnotempty(tags) | where tags[0] =~ 'key1' and tags[1] =~ 'value1' | project subscriptionId, resourceGroup) on subscriptionId, resourceGroup | project-away subscriptionId1, resourceGroup1"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.storage%2fstorageaccounts%27%0a%7c%20join%20kind%3dinner%20(%0a%09ResourceContainers%0a%09%7c%20where%20type%20%3d%7e%20%27microsoft.resources%2fsubscriptions%2fresourcegroups%27%0a%09%7c%20mv-expand%20bagexpansion%3darray%20tags%0a%09%7c%20where%20isnotempty(tags)%0a%09%7c%20where%20tags%5b0%5d%20%3d%7e%20%27key1%27%20and%20tags%5b1%5d%20%3d%7e%20%27value1%27%0a%09%7c%20project%20subscriptionId%2c%20resourceGroup)%0aon%20subscriptionId%2c%20resourceGroup%0a%7c%20project-away%20subscriptionId1%2c%20resourceGroup1" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.storage%2fstorageaccounts%27%0a%7c%20join%20kind%3dinner%20(%0a%09ResourceContainers%0a%09%7c%20where%20type%20%3d%7e%20%27microsoft.resources%2fsubscriptions%2fresourcegroups%27%0a%09%7c%20mv-expand%20bagexpansion%3darray%20tags%0a%09%7c%20where%20isnotempty(tags)%0a%09%7c%20where%20tags%5b0%5d%20%3d%7e%20%27key1%27%20and%20tags%5b1%5d%20%3d%7e%20%27value1%27%0a%09%7c%20project%20subscriptionId%2c%20resourceGroup)%0aon%20subscriptionId%2c%20resourceGroup%0a%7c%20project-away%20subscriptionId1%2c%20resourceGroup1" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.storage%2fstorageaccounts%27%0a%7c%20join%20kind%3dinner%20(%0a%09ResourceContainers%0a%09%7c%20where%20type%20%3d%7e%20%27microsoft.resources%2fsubscriptions%2fresourcegroups%27%0a%09%7c%20mv-expand%20bagexpansion%3darray%20tags%0a%09%7c%20where%20isnotempty(tags)%0a%09%7c%20where%20tags%5b0%5d%20%3d%7e%20%27key1%27%20and%20tags%5b1%5d%20%3d%7e%20%27value1%27%0a%09%7c%20project%20subscriptionId%2c%20resourceGroup)%0aon%20subscriptionId%2c%20resourceGroup%0a%7c%20project-away%20subscriptionId1%2c%20resourceGroup1" target="_blank">portal.azure.cn</a>

---

### Find storage accounts with a specific case-sensitive tag on the resource group

The following query uses an **inner** `join` to connect storage accounts with resource groups that have a specified case-sensitive tag name and tag value.

```kusto
Resources
| where type =~ 'microsoft.storage/storageaccounts'
| join kind=inner (
	ResourceContainers
	| where type =~ 'microsoft.resources/subscriptions/resourcegroups'
	| where tags['Key1'] =~ 'Value1'
	| project subscriptionId, resourceGroup)
on subscriptionId, resourceGroup
| project-away subscriptionId1, resourceGroup1
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type =~ 'microsoft.storage/storageaccounts' | join kind=inner ( ResourceContainers | where type =~ 'microsoft.resources/subscriptions/resourcegroups' | where tags['Key1'] =~ 'Value1' | project subscriptionId, resourceGroup) on subscriptionId, resourceGroup | project-away subscriptionId1, resourceGroup1"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type =~ 'microsoft.storage/storageaccounts' | join kind=inner ( ResourceContainers | where type =~ 'microsoft.resources/subscriptions/resourcegroups' | where tags['Key1'] =~ 'Value1' | project subscriptionId, resourceGroup) on subscriptionId, resourceGroup | project-away subscriptionId1, resourceGroup1"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.storage%2fstorageaccounts%27%0a%7c%20join%20kind%3dinner%20(%0a%09ResourceContainers%0a%09%7c%20where%20type%20%3d%7e%20%27microsoft.resources%2fsubscriptions%2fresourcegroups%27%0a%09%7c%20where%20tags%5b%27Key1%27%5d%20%3d%7e%20%27Value1%27%0a%09%7c%20project%20subscriptionId%2c%20resourceGroup)%0aon%20subscriptionId%2c%20resourceGroup%0a%7c%20project-away%20subscriptionId1%2c%20resourceGroup1" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.storage%2fstorageaccounts%27%0a%7c%20join%20kind%3dinner%20(%0a%09ResourceContainers%0a%09%7c%20where%20type%20%3d%7e%20%27microsoft.resources%2fsubscriptions%2fresourcegroups%27%0a%09%7c%20where%20tags%5b%27Key1%27%5d%20%3d%7e%20%27Value1%27%0a%09%7c%20project%20subscriptionId%2c%20resourceGroup)%0aon%20subscriptionId%2c%20resourceGroup%0a%7c%20project-away%20subscriptionId1%2c%20resourceGroup1" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20type%20%3d%7e%20%27microsoft.storage%2fstorageaccounts%27%0a%7c%20join%20kind%3dinner%20(%0a%09ResourceContainers%0a%09%7c%20where%20type%20%3d%7e%20%27microsoft.resources%2fsubscriptions%2fresourcegroups%27%0a%09%7c%20where%20tags%5b%27Key1%27%5d%20%3d%7e%20%27Value1%27%0a%09%7c%20project%20subscriptionId%2c%20resourceGroup)%0aon%20subscriptionId%2c%20resourceGroup%0a%7c%20project-away%20subscriptionId1%2c%20resourceGroup1" target="_blank">portal.azure.cn</a>

---

### List all tag names

This query starts with the tag and builds a JSON object listing all unique tag names and their corresponding types.

```kusto
Resources
| project tags
| summarize buildschema(tags)
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | project tags | summarize buildschema(tags)"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | project tags | summarize buildschema(tags)"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20project%20tags%0a%7c%20summarize%20buildschema(tags)" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20project%20tags%0a%7c%20summarize%20buildschema(tags)" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20project%20tags%0a%7c%20summarize%20buildschema(tags)" target="_blank">portal.azure.cn</a>

---

### List all tags and their values

This query lists tags on management groups, subscriptions, and resources along with their values. The query first limits to resources where tags `isnotempty()`, limits the included fields by only including _tags_ in the `project`, and `mvexpand` and `extend` to get the paired data from the property bag. It then uses `union` to combine the results from _ResourceContainers_ to the same results from _Resources_, giving broad coverage to which tags are fetched. Last, it limits the results to `distinct` paired data and excludes system-hidden tags.

```kusto
ResourceContainers
| where isnotempty(tags)
| project tags
| mvexpand tags
| extend tagKey = tostring(bag_keys(tags)[0])
| extend tagValue = tostring(tags[tagKey])
| union (
	resources
	| where isnotempty(tags)
	| project tags
	| mvexpand tags
	| extend tagKey = tostring(bag_keys(tags)[0])
	| extend tagValue = tostring(tags[tagKey])
)
| distinct tagKey, tagValue
| where tagKey !startswith "hidden-"
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "ResourceContainers | where isnotempty(tags) | project tags | mvexpand tags | extend tagKey = tostring(bag_keys(tags)[0]) | extend tagValue = tostring(tags[tagKey]) | union ( resources | where isnotempty(tags) | project tags | mvexpand tags | extend tagKey = tostring(bag_keys(tags)[0]) | extend tagValue = tostring(tags[tagKey]) ) | distinct tagKey, tagValue | where tagKey !startswith "hidden-""
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "ResourceContainers | where isnotempty(tags) | project tags | mvexpand tags | extend tagKey = tostring(bag_keys(tags)[0]) | extend tagValue = tostring(tags[tagKey]) | union ( resources | where isnotempty(tags) | project tags | mvexpand tags | extend tagKey = tostring(bag_keys(tags)[0]) | extend tagValue = tostring(tags[tagKey]) ) | distinct tagKey, tagValue | where tagKey !startswith "hidden-""
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/ResourceContainers%0a%7c%20where%20isnotempty(tags)%0a%7c%20project%20tags%0a%7c%20mvexpand%20tags%0a%7c%20extend%20tagKey%20%3d%20tostring(bag_keys(tags)%5b0%5d)%0a%7c%20extend%20tagValue%20%3d%20tostring(tags%5btagKey%5d)%0a%7c%20union%20(%0a%09resources%0a%09%7c%20where%20isnotempty(tags)%0a%09%7c%20project%20tags%0a%09%7c%20mvexpand%20tags%0a%09%7c%20extend%20tagKey%20%3d%20tostring(bag_keys(tags)%5b0%5d)%0a%09%7c%20extend%20tagValue%20%3d%20tostring(tags%5btagKey%5d)%0a)%0a%7c%20distinct%20tagKey%2c%20tagValue%0a%7c%20where%20tagKey%20!startswith%20%22hidden-%22" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/ResourceContainers%0a%7c%20where%20isnotempty(tags)%0a%7c%20project%20tags%0a%7c%20mvexpand%20tags%0a%7c%20extend%20tagKey%20%3d%20tostring(bag_keys(tags)%5b0%5d)%0a%7c%20extend%20tagValue%20%3d%20tostring(tags%5btagKey%5d)%0a%7c%20union%20(%0a%09resources%0a%09%7c%20where%20isnotempty(tags)%0a%09%7c%20project%20tags%0a%09%7c%20mvexpand%20tags%0a%09%7c%20extend%20tagKey%20%3d%20tostring(bag_keys(tags)%5b0%5d)%0a%09%7c%20extend%20tagValue%20%3d%20tostring(tags%5btagKey%5d)%0a)%0a%7c%20distinct%20tagKey%2c%20tagValue%0a%7c%20where%20tagKey%20!startswith%20%22hidden-%22" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/ResourceContainers%0a%7c%20where%20isnotempty(tags)%0a%7c%20project%20tags%0a%7c%20mvexpand%20tags%0a%7c%20extend%20tagKey%20%3d%20tostring(bag_keys(tags)%5b0%5d)%0a%7c%20extend%20tagValue%20%3d%20tostring(tags%5btagKey%5d)%0a%7c%20union%20(%0a%09resources%0a%09%7c%20where%20isnotempty(tags)%0a%09%7c%20project%20tags%0a%09%7c%20mvexpand%20tags%0a%09%7c%20extend%20tagKey%20%3d%20tostring(bag_keys(tags)%5b0%5d)%0a%09%7c%20extend%20tagValue%20%3d%20tostring(tags%5btagKey%5d)%0a)%0a%7c%20distinct%20tagKey%2c%20tagValue%0a%7c%20where%20tagKey%20!startswith%20%22hidden-%22" target="_blank">portal.azure.cn</a>

---

### List resources with a specific tag value

We can limit the results by properties other than the Azure resource type, such as a tag. In this example, we're filtering for Azure resources with a tag name of **Environment** that have a value of **Internal**. To also provide what tags the resource has and their values, add the property **tags** to the `project` keyword.

```kusto
Resources
| where tags.environment=~'internal'
| project name, tags
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where tags.environment=~'internal' | project name, tags"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where tags.environment=~'internal' | project name, tags"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20tags.environment%3d%7e%27internal%27%0a%7c%20project%20name%2c%20tags" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20tags.environment%3d%7e%27internal%27%0a%7c%20project%20name%2c%20tags" target="_blank">portal.azure.us</a>
- Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0a%7c%20where%20tags.environment%3d%7e%27internal%27%0a%7c%20project%20name%2c%20tags" target="_blank">portal.azure.cn</a>

---


## Virtual Machine Scale Sets


### Virtual Machine Scale Set Uniform orchestration

Get virtual machines in the Virtual Machine Scale Sets (VMSS) Uniform orchestration mode categorized according to their power state. This table contains the model view and `powerState` in the instance view properties for the virtual machines part of Virtual Machine Scale Set Uniform mode.

The model view and `powerState` in the instance view properties for the virtual machines part of Virtual Machine Scale Set Flexible mode can be queried through `Resources` table.

```kusto
ComputeResources
| where type =~ 'microsoft.compute/virtualmachinescalesets/virtualmachines'
| extend powerState = properties.extended.instanceView.powerState.code
| project name, powerState, id
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "ComputeResources | where type =~ 'microsoft.compute/virtualmachinescalesets/virtualmachines' | extend powerState = properties.extended.instanceView.powerState.code | project name, powerState, id"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "ComputeResources | where type =~ 'microsoft.compute/virtualmachinescalesets/virtualmachines' | extend powerState = properties.extended.instanceView.powerState.code | project name, powerState, id"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/ComputeResources%0D%0A%7C%20where%20type%20%3D~%20%27microsoft.compute%2Fvirtualmachinescalesets%2Fvirtualmachines%27%0D%0A%7C%20extend%20powerState%20%3D%20properties.extended.instanceView.powerState.code%0D%0A%7C%20project%20name%2C%20powerState%2C%20id" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/ComputeResources%0D%0A%7C%20where%20type%20%3D~%20%27microsoft.compute%2Fvirtualmachinescalesets%2Fvirtualmachines%27%0D%0A%7C%20extend%20powerState%20%3D%20properties.extended.instanceView.powerState.code%0D%0A%7C%20project%20name%2C%20powerState%2C%20id" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/ComputeResources%0D%0A%7C%20where%20type%20%3D~%20%27microsoft.compute%2Fvirtualmachinescalesets%2Fvirtualmachines%27%0D%0A%7C%20extend%20powerState%20%3D%20properties.extended.instanceView.powerState.code%0D%0A%7C%20project%20name%2C%20powerState%2C%20id" target="_blank">portal.azure.cn</a>

---



### Virtual Machine Scale Set Flexible orchestration

Get Virtual Machine Scale Sets (VMSS) Flexible orchestration mode VMs categorized according to their power state. This table contains the model view and `powerState` in the instance view properties for the virtual machines part of Virtual Machine Scale Set Flexible mode.

```kusto
Resources
| where type == 'microsoft.compute/virtualmachines'
| extend powerState = tostring(properties.extended.instanceView.powerState.code)
| extend VMSS = tostring(properties.virtualMachineScaleSet.id)
| where isnotempty(VMSS)
| project name, powerState, id
```

# [Azure CLI](#tab/azure-cli)

```azurecli-interactive
az graph query -q "Resources | where type == 'microsoft.compute/virtualmachines' | extend powerState = tostring(properties.extended.instanceView.powerState.code) | extend VMSS = tostring(properties.virtualMachineScaleSet.id) | where isnotempty(VMSS) | project name, powerState, id"
```

# [Azure PowerShell](#tab/azure-powershell)

```azurepowershell-interactive
Search-AzGraph -Query "Resources | where type == 'microsoft.compute/virtualmachines' | extend powerState = tostring(properties.extended.instanceView.powerState.code) | extend VMSS = tostring(properties.virtualMachineScaleSet.id) | where isnotempty(VMSS) | project name, powerState, id"
```

# [Portal](#tab/azure-portal)



- Azure portal: <a href="https://portal.azure.com/#blade/HubsExtension/ArgQueryBlade/query/Resources%0D%0A%7C%20where%20type%20%3D%3D%20%27microsoft.compute%2Fvirtualmachines%27%0D%0A%7C%20extend%20powerState%20%3D%20tostring%28properties.extended.instanceView.powerState.code%29%0D%0A%7C%20extend%20VMSS%20%3D%20tostring%28properties.virtualMachineScaleSet.id%29%0D%0A%7C%20where%20isnotempty%28VMSS%29%0D%0A%7C%20project%20name%2C%20powerState%2C%20id" target="_blank">portal.azure.com</a>
- Azure Government portal: <a href="https://portal.azure.us/#blade/HubsExtension/ArgQueryBlade/query/Resources%0D%0A%7C%20where%20type%20%3D%3D%20%27microsoft.compute%2Fvirtualmachines%27%0D%0A%7C%20extend%20powerState%20%3D%20tostring%28properties.extended.instanceView.powerState.code%29%0D%0A%7C%20extend%20VMSS%20%3D%20tostring%28properties.virtualMachineScaleSet.id%29%0D%0A%7C%20where%20isnotempty%28VMSS%29%0D%0A%7C%20project%20name%2C%20powerState%2C%20id" target="_blank">portal.azure.us</a>
- Microsoft Azure operated by 21Vianet portal: <a href="https://portal.azure.cn/#blade/HubsExtension/ArgQueryBlade/query/Resources%0D%0A%7C%20where%20type%20%3D%3D%20%27microsoft.compute%2Fvirtualmachines%27%0D%0A%7C%20extend%20powerState%20%3D%20tostring%28properties.extended.instanceView.powerState.code%29%0D%0A%7C%20extend%20VMSS%20%3D%20tostring%28properties.virtualMachineScaleSet.id%29%0D%0A%7C%20where%20isnotempty%28VMSS%29%0D%0A%7C%20project%20name%2C%20powerState%2C%20id" target="_blank">portal.azure.cn</a>

---


## Next steps

- Learn more about the [query language](../concepts/query-language.md).
- Learn more about how to [explore resources](../concepts/explore-resources.md).
