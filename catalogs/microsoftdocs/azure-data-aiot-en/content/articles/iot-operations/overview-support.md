---
title: Azure IoT Operations versions, support, and licensing
description: Explore supported versions, environments, dependencies, and licensing for Azure IoT Operations deployments.
author: dominicbetts
ms.author: dobett
ms.service: azure-iot-operations
ms.topic: overview
ms.date: 02/18/2026
ms.custom: references_regions

# As an IT admin, you want to know the supported environments for Azure IoT Operations to plan your deployment effectively.
---

# Azure IoT Operations versions, support, and licensing

This article explains the supported versions, environments, and regions for Azure IoT Operations, along with its key dependencies and related resources. Use this guide to ensure compatibility and optimize your deployment. The guide also provides information about licensing for Azure IoT Operations.

## Supported versions


Microsoft supports three generally available (GA) versions of Azure IoT Operations at any time: the latest version, and the two previous minor versions. Additionally, preview versions are available for testing new features.

Currently, [Azure support](https://azure.microsoft.com/support/plans) is available for the following versions. For per-patch release notes for any Azure IoT Operations version, see the [Azure IoT Operations releases](https://github.com/Azure/azure-iot-operations/releases) on GitHub:

| Version | Type | Current patch <br/>release (YYMM) | Release notes | Current <br/>CLI version |
| --- | --- | --- | --- | --- |
| 1.4.x | GA | 1.4.112 (2609) | [Release notes](https://github.com/Azure/azure-iot-operations/releases/tag/v1.4.112) | [2.10.0](https://github.com/Azure/azure-iot-ops-cli-extension/releases/tag/v2.10.0) |
| 1.3.x | GA | 1.3.137 (2606) | [Release notes](https://github.com/Azure/azure-iot-operations/releases/tag/v1.3.137) | [2.7.0](https://github.com/Azure/azure-iot-ops-cli-extension/releases/tag/v2.7.0) |
| 1.2.x | GA | 1.2.189 (2602) | [Release notes](https://github.com/Azure/azure-iot-operations/releases/tag/v1.2.189) | [2.3.0](https://github.com/Azure/azure-iot-ops-cli-extension/releases/tag/v2.3.0) |

> **Caution:**
> Previous minor versions don't receive any updates such as security patches and bug fixes. Upgrade to the latest version to get the latest security and feature updates.

> **Note:**
> With the release of 1.4.x, the supported versions become **1.4.x, 1.3.x, and 1.2.x**. The **1.0.x** and **1.1.x** series (versions 2411 through 2506) are no longer within the [supported version window](overview-support.md).

To verify your current version, go to the overview page for your Azure IoT Operations instance in the Azure portal or use the Azure IoT Operations CLI [az iot ops instance show](https://learn.microsoft.com/cli/azure/iot/ops#az-iot-ops-show) command.

For more information about upgrades between versions, see [Upgrade to a new version](manage-iot-ops/howto-upgrade.md).



## Supported environments


### Supported Windows environments

Microsoft supports the following Kubernetes distributions for Azure IoT Operations deployments on Windows. The table below details their support levels and the versions Microsoft uses to validate deployments:

| Kubernetes distribution | Architecture | Support level | *Minimum validated version* |
| --- | --- | --- | --- |
| [AKS Edge Essentials](https://learn.microsoft.com/azure/aks/aksarc/aks-edge-system-requirements) | x86_64 | General availability | *AksEdge-K3s-1.33.5-1.12.269.0* |
| [AKS on Azure Local](https://learn.microsoft.com/azure/aks/aksarc/aks-whats-new-local) | x86_64 | General availability | *Azure Stack HCI OS, Version 24H2, Build 2607* |

* The *minimum validated version* is the lowest version of the Kubernetes distribution that Microsoft uses to validate Azure IoT Operations deployments.

### Supported Linux environments

Microsoft supports the following Kubernetes distributions for Azure IoT Operations deployments in Linux environments. The table below lists their support levels and the versions Microsoft uses to validate deployments:

| Kubernetes distribution | Architecture | Support level | *Minimum validated version* | *Minimum validated OS* |
| --- | --- | --- | --- | --- |
| [K3s](https://www.rancher.com/products/k3s) | x86_64, ARM64 | General availability | *1.33.6* | *Ubuntu 24.04* for ARM64 and x86_64, <br> Red Hat Enterprise Linux (RHEL) 9.x for x86_64 only |
| [vSphere Kubernetes Service (VKS)](https://www.vmware.com/products/cloud-infrastructure/vsphere-kubernetes-service) | x86_64 | General availability | *v1.32.7---vmware.3-fips-vkr.1* | *VKS 3.3.x* |
| [RKE2](https://docs.rke2.io/) | x86_64 | General availability | *v1.35.0+rke2r1* | [Operating systems](https://docs.rke2.io/install/requirements#operating-systems) |
| [K3s on small form factor deployment of Azure Local (preview)](https://learn.microsoft.com/azure/azure-local/small-form-factor/small-form-factor-container-orchestrators#k3s) | x86_64 | Preview | *1.33.6* | *Azure Local 2604* |
| [Red Hat OpenShift](https://docs.openshift.com/container-platform/latest/welcome/index.html) | x86_64 | General availability | *4.20.15* | *Red Hat Enterprise Linux CoreOS* |

* The *minimum validated version* is the lowest version of the Kubernetes distribution that Microsoft uses to validate Azure IoT Operations deployments.
* The *minimum validated OS* is the lowest operating system version that Microsoft uses to validate deployments.
* ARM64 support for K3s on Ubuntu 24.04 is available starting with Azure IoT Operations 2607.
* Currently, support is available for VKS running in [privileged mode](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/organization-management/managing-vks-clusters-with-vks-cluster-management/vks-cluster-management-policies/pod-security-management.html) without WLIF.
* OpenShift requires granting additional security context constraints to the Azure IoT Operations namespace, and requires disabling cert-manager telemetry and the connector security context at deployment time. Deployment under the default `restricted-v2` constraint alone isn't supported.


## Supported regions

Azure IoT Operations supports Arc-enabled clusters in these regions:

| Region | CLI value |
| --- | --- |
| East US | eastus |
| East US 2 | eastus2 |
| West US | westus |
| West US 2 | westus2 |
| West US 3 | westus3 |
| South Central US | southcentralus |
| West Europe | westeurope |
| North Europe | northeurope |
| Germany West Central | germanywestcentral |

This list applies only to the region you use to connect your cluster to Azure Arc. It doesn't limit you from using your preferred Azure region for cloud resources. Azure IoT Operations components and other resources deployed to clusters in these regions connect to cloud resources in different regions.

## Dependencies

Azure IoT Operations depends on these support services and features:

* [Azure Device Registry](discover-manage-assets/overview-manage-assets.md#azure-device-registry)
* [Schema registry](connect-to-cloud/concept-schema-registry.md)
* [Azure Container Storage enabled by Azure Arc (optional)](https://learn.microsoft.com/azure/azure-arc/container-storage/overview)
* [Azure Key Vault Secret Store extension](https://learn.microsoft.com/azure/azure-arc/kubernetes/secret-store-extension)
* [Azure Monitor pipeline](https://learn.microsoft.com/azure/azure-monitor/essentials/edge-pipeline-configure)
* [Workload identity federation in Azure Arc-enabled Kubernetes](https://learn.microsoft.com/azure/azure-arc/kubernetes/conceptual-workload-identity)

> **Note:**
> These features and services, when used as dependencies of or in conjunction with Azure IoT Operations systems, inherit general availability status from the Azure IoT Operations product license.

> **Note:**
> For the *Azure Device Registry* service, Azure IoT Operations and Azure IoT Hub are the only products under which this service is licensed for production use. For the *Schema registry* capability, Azure IoT Operations is the only product under which this service is licensed for production use.

> **Note:**
> *Azure Container Storage enabled by Azure Arc* is an optional dependency that you must [install](https://learn.microsoft.com/azure/azure-arc/container-storage/howto-install-edge-volumes) separately. Connectors like the *media connector* and the data flow endpoint *local storage* can use this option to synchronize captured data to cloud storage.

## Licensing

Azure IoT Operations licensing is covered by the terms stated in the [Microsoft Online Service Agreement (MOSA)](https://www.microsoft.com/licensing/terms/productoffering/MicrosoftAzure/MOSA). Licensing that's specific to Azure IoT Operations can be found in the *Service Specific Terms* section of the MOSA.

If any of the licensing terms found in these documents block your adoption of Azure IoT Operations in trial, non-production, or production scenarios, contact [azureiotoperationslicensinghelp@microsoft.com](mailto:azureiotoperationslicensinghelp@microsoft.com). Depending on your specific circumstances, there might be solutions to unblock your project.

## Related articles

* [Pricing for Azure IoT Operations](https://azure.microsoft.com/pricing/details/iot-operations/)
* [Overview of Azure IoT Operations](overview-iot-operations.md)
* [Deployment details](deploy-iot-ops/overview-deploy.md)
* [Upgrade to a new version](manage-iot-ops/howto-upgrade.md)
