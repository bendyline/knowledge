---
title: Deploy IoT Hub with Device Registry Integration and Certificate Management (Preview)
titleSuffix: Azure IoT Hub
description: Learn how to create an IoT Hub with Azure Device Registry integration and Microsoft-backed X.509 certificate management.
author: sethmanheim
ms.author: sethm
ms.service: azure-iot-hub
services: iot-hub
ms.topic: how-to
ms.date: 08/04/2026
zone_pivot_groups: iot-hub-deployment-methods
#Customer intent: As a developer new to IoT, I want to understand what Azure Device Registry is and how it can help me manage my IoT devices.
---

# Deploy Azure IoT Hub with Device Registry integration and certificate management (preview)

This article explains how to deploy Azure IoT Hub with [Azure Device Registry](iot-hub-device-registry-overview.md) integration and [Microsoft-backed X.509 certificate management](../iot/iot-certificate-management-overview.md).


> **Important:**
> Azure IoT Hub with Azure Device Registry integration and Microsoft-backed X.509 certificate management is in *public preview* and isn't recommended for production workloads. For more information, see [FAQ: What is new in IoT Hub?](iot-hub-faq.md).


## Prerequisites

- An active Azure subscription. If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The privilege to perform role assignments within your target scope. Performing role assignments in Azure requires a [privileged role](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#privileged), such as Owner or User Access Administrator at the appropriate scope.
- A [supported region](iot-hub-what-is-new.md#supported-regions) to deploy instances of IoT Hub, Azure Device Registry, and Device Provisioning Service (DPS).

## Choose a deployment method

To use certificate management, you must also set up IoT Hub, Device Registry, and [DPS](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-dps/index.yml). If you prefer, you can choose not to enable certificate management and configure only IoT Hub with Device Registry.

To set up your IoT Hub instance with Device Registry integration and certificate management, you can use the Azure portal, the Azure CLI, or a script that automates the setup process.

| Deployment method | Description |
| --- | --- |
| Select the **Azure portal** tab at the top of the page. | Use the Azure portal to create a new IoT hub, a DPS instance, and a Device Registry namespace and to configure all necessary settings. |
| Select the **Azure CLI** tab at the top of the page. | Use the Azure CLI to create a new IoT hub, a DPS instance, and a Device Registry namespace and to configure all necessary settings. |
| Select the **PowerShell script** tab at the top of the page. | Use a PowerShell script (Windows only) to automate the creation of a new IoT hub, a DPS instance, and a Device Registry namespace and to configure all necessary settings. |

**Applies to: portal**



## More prerequisites for Azure portal

Before you begin, make sure that you have:

- An Azure resource group to organize your IoT hub and related resources. Create the resource group and resources in a [supported region](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/iot-hub-what-is-new.md#supported-regions). For more information, see [Create a resource group](https://learn.microsoft.com/azure/azure-resource-manager/management/manage-resource-groups-portal).
- The [Contributor](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/privileged#contributor) role assigned to Azure IoT Hub at the resource group level. When you select members during the role assignment, search for and select **Azure IoT Hub** from the list of service principals. For more information, see [Assign Azure roles by using the Azure portal](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal).

## Overview

> **Note:**
> To create an IoT Hub that is linked to an ADR namespace, you must [use the Azure CLI](https://learn.microsoft.com/azure/iot-hub/iot-hub-device-registry-setup?pivots=azure-cli#create-an-iot-hub-with-device-registry-integration).

Use the Azure portal to create an IoT hub with Device Registry and certificate management integration.

The setup process in this article includes the following steps:

1. Set up your Device Registry namespace with certificate management enabled and assign necessary roles.
1. Create a custom credential policy for your namespace.
1. Create an IoT hub linked to your Device Registry namespace with a user-assigned managed identity.
1. Create a DPS instance and link it to your Device Registry namespace.
1. Link your IoT hub to the DPS instance.
1. Sync credential policies from your namespace to your IoT hubs.
1. Create an enrollment group and assign a policy to enable device onboarding.

> **Important:**
> During the preview period, IoT Hub with Device Registry integration and certificate management features enabled on top of IoT Hub are available free of charge. DPS is billed separately and isn't included in the preview offer. For details on DPS pricing, see [Azure IoT Hub pricing](https://azure.microsoft.com/pricing/details/iot-hub/).

## Set up your Device Registry namespace

In this section, you set up your Device Registry namespace, enable certificate management, assign the necessary Contributor role, and create a custom certificate policy. These steps prepare your environment to securely manage device identities and certificates and ensure that your IoT hub can use Device Registry for device onboarding and certificate management.

### Create a Device Registry namespace with certificate management enabled

When you create a namespace with certificate management enabled, the process creates a credential known as root certificate authority (CA) and a default policy known as intermediate CA. [Certificate management](../iot/iot-certificate-management-overview.md) uses these credentials and policies to onboard devices to the namespace.

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Search for and select **Azure Device Registry**.
1. Select **Namespaces** > **Create**.
1. On the **Basics** tab, fill in the following fields:

    | Property | Value |
    | --- | --- |
    | **Subscription** | Select the subscription to use for your Device Registry namespace. |
    | **Resource group** | Select or create the resource group that you want to use for your IoT hub. |
    | **Name** | Enter a name for your Device Registry namespace. Your namespace name can contain only lowercase letters and hyphens (`-`) in the middle of the name, but not at the beginning or end. For example, the name `msft-namespace` is valid. |
    | **Region** | Device Registry integration and certificate management functionalities are in preview and available only in certain regions. See the [supported regions](iot-hub-what-is-new.md#supported-regions). Select the region closest to you where you want your hub to be located. |

    Screenshot that shows how to fill in the Basics tab for a Device Registry namespace in the Azure portal.

1. Select **Next**.
1. On the **Certificate management** tab, select **Enabled**.

    Certificate management securely stores and manages device authentication credentials, such as API keys or certificates, for devices connecting to your namespace. When you enable this feature, you can set policies to control how certificates are issued and managed for your devices.

    Screenshot that shows how to enable certificate management for a Device Registry namespace in the Azure portal.

1. Select **Next**.
1. On the **Tags** tab, you can optionally add tags to organize your Device Registry namespace. Tags are key/value pairs that help you manage and identify your resources. Use tags to filter and group your resources in the Azure portal.

1. Select **Next**.
1. Review your settings, and then select **Create** to create your Device Registry namespace.

   The namespace creation process might take up to five minutes.

### Get the principal ID for your namespace

To complete some configuration steps after you create the IoT hub, you need the principal ID for your Device Registry namespace. This value is used to grant permissions and link resources securely.

1. In the Azure portal, go to the Device Registry namespace that you created.
1. On the **Overview** page, at the upper-right side, select **JSON view**.
1. Locate the identity section and find the value for `principalId`.
1. Copy the principal ID value to use with role assignments for your IoT hub instance.

### Assign roles to your managed identity

After you create your Device Registry namespace, grant the required permissions to your user-assigned managed identity. The user-assigned managed identity is used to securely access other Azure resources, such as a Device Registry namespace and DPS. If you don't have a user-assigned managed identity, create one in the Azure portal. For more information, see [Create a user-assigned managed identity in the Azure portal](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/manage-user-assigned-managed-identities-azure-portal).

First, grant your user-managed identity the Azure Device Registry Onboarding role:

1. In the Device Registry namespace that you created, select **Access control (IAM)** on the sidebar menu.
1. Select **+ Add** > **Add role assignment**.
1. In the **Role** field, search for and select **Azure Device Registry Onboarding**. This role allows your managed identity to onboard devices by using Device Registry credential policies.
1. Select **Next**.
1. In **Assign access to**, select **Managed identity**.
1. Choose **Select members**, and then select **User-assigned managed identity**. Search for your identity and select it.
1. Select **Review + assign** to finish. After the assignment propagates, your managed identity has the necessary onboarding permissions.

Repeat these steps to assign the Azure Device Registry Contributor role:

1. In the same **Access control (IAM)** pane for your Device Registry namespace, select **+ Add** > **Add role assignment** again.
1. In the **Role** field, search for and select **Azure Device Registry Contributor**. This role gives your managed identity the permissions that Device Registry needs for setup and operation.
1. Select **Next**.
1. In **Assign access to**, select **Managed identity**.
1. Choose **Select members**, and then select **User-assigned managed identity**. Search for your identity and select it.
1. Select **Review + assign** to finish. After the assignment propagates, you can select the user-assigned managed identity when you create your IoT hub.

### Create a custom policy for your namespace

Create custom policies within your Device Registry namespace to define how certificates are issued and managed for your devices. Policies allow you to set parameters such as certificate validity periods and subjects. Editing or disabling a policy isn't supported in preview.

1. In the Device Registry namespace that you created, under **Namespace resources**, select **Credential policies (Preview)**.

    In the **Enable certificate management** dialog, select **Enable**.

    Screenshot that shows the Device Registry custom policy page in the Azure portal.

1. On the **Credential policies** page, select **+ Create Policy**.
1. A pane appears where you can configure the policy settings. On the **Basics** tab, fill in the following fields:
    
    | Property | Value |
    | --- | --- |
    | **Name** | Enter a unique name for your policy. The name must be between 3 and 50 alphanumeric characters and can include hyphens (`-`). |
    | **Validity period (days)** | Enter the number of days that the issued certificates are valid. |
    | **Select a Root CA for certificates in this policy** | Accept the default value, **Use this namespace's Microsoft-issued Root CA (Default)**. |

1. Select **Next**, and then select **Review + create**.
1. To review the policy, select **Credential policies** to see the policy name and validity period.

### Create an IoT hub in the Azure portal

To create an IoT Hub that is linked to an ADR namespace, you must [use the Azure CLI](https://learn.microsoft.com/azure/iot-hub/iot-hub-device-registry-setup?pivots=azure-cli#create-an-iot-hub-with-device-registry-integration).

### Assign roles to the Device Registry namespace principal ID on your IoT hub

To enable secure integration between your IoT hub and Device Registry namespace, assign roles to the Device Registry namespace principal ID on your IoT hub instance. This step ensures that the Device Registry namespace can manage device identities and registry operations in your hub.

1. In the [Azure portal](https://portal.azure.com), go to your IoT hub resource.
1. On the sidebar menu, select **Access control (IAM)**.
1. Select **+ Add** > **Add role assignment**.
1. In the **Role** field, select the **Privileged administrator roles** tab.
1. Search for and select **Contributor**.
1. Select **Next**.
1. In **Assign access to**, select **User, group, or service principal**.
1. Choose **Select members**, and then paste in the Device Registry namespace principal ID that you copied in a previous step. Select the matching identity.
1. Select **Review + assign** to finish.

Repeat these steps to assign the **IoT Hub Registry Contributor** role:

1. Select **+ Add** > **Add role assignment** again.
1. In the **Role** field, search for and select **IoT Hub Registry Contributor**.
1. Select **Next**.
1. In **Assign access to**, select **User, group, or service principal**.
1. Choose **Select members**, and then paste in the Device Registry namespace principal ID that you copied in a previous step. Select the matching identity.
1. Select **Review + assign** to finish.

## Create a DPS instance

After you create your IoT hub and your namespace, create a new DPS instance.

1. In the [Azure portal](https://portal.azure.com), search for and select **Device Provisioning Service**.
1. In **Device Provisioning Services**, select **+ Create** to create a new DPS instance.
1. On the **Basics** tab, fill in the following fields:

    | Property | Value |
    | --- | --- |
    | **Subscription** | Select the subscription to use for your DPS instance. |
    | **Resource group** | Select the same resource group that contains the IoT hub that you created in the previous steps. By putting all related resources in a group together, you can manage them together. |
    | **Name** | Provide a unique name for your new DPS instance. If the name that you enter is available, a green check mark appears. |
    | **Region** | Select the same region where you created your IoT hub and Device Registry namespace in the previous steps. |

    Screenshot that shows the Basics tab for a new DPS instance with the Azure Device Registry namespace selected.

1. Select **Review + create** to validate your provisioning service.
1. Select **Create** to start the deployment of your DPS instance.
1. After the deployment finishes, select **Go to resource** to view your DPS instance.

### Add your namespace to DPS

After you create your DPS instance, link it to your Device Registry namespace so that devices can be provisioned by using Device Registry credential policies.

1. In the [Azure portal](https://portal.azure.com), go to the DPS instance that you created.
1. On the **Overview** page, find the **ADR namespace** section.
1. Select the link to add the namespace.

   Screenshot that shows the IoT hub Overview page with the ADR namespace section selected.

1. Select your Device Registry namespace and the user-assigned managed identity.
1. Select **Save**.

After the link is established, your DPS instance can use the Device Registry namespace for device provisioning and certificate management.

## Link the IoT hub and your DPS instance

Add a configuration to the DPS instance that sets the IoT hub to which the instance provisions IoT devices.

1. Under **Settings** on the sidebar menu of your DPS instance, select **Linked IoT hubs**.
1. Select **Add**.
1. On the **Add link to IoT hub** pane, provide the following information:

    | Property | Value |
    | --- | --- |
    | **Subscription** | Select the subscription that contains the IoT hub that you want to link with your new DPS instance. |
    | **IoT hub** | Select the IoT hub to link with your new DPS instance. |
    | **Access Policy** | Select **iothubowner (RegistryWrite, ServiceConnect, DeviceConnect)** as the credentials for establishing the link with the IoT hub. |

    Screenshot that shows how to link an IoT hub to the DPS instance in the portal.

1. Select **Save**.
1. Select **Refresh**. You should now see the selected hub under the list of **Linked IoT hubs**.

## Sync policies to IoT hubs

Synchronize a policy that you created within your Device Registry namespace to the IoT hub linked to that namespace. This synchronization enables IoT Hub to trust any devices authenticating with a leaf certificate issued by the policy's issuing CA.

1. In the [Azure portal](https://portal.azure.com), go to the Device Registry namespace resource that you created earlier.
1. On the sidebar menu, select **Namespace resources** > **Credential policies (Preview)**.
1. In the list, select the credential policy that you want to synchronize.
1. At the top, select **Sync all**.
1. Wait for the confirmation message that indicates the synchronization succeeded.

If you select to sync more than one policy, the process syncs policies to their respective IoT hubs. You can't undo a sync operation.

## Create an enrollment group and assign a policy

To provision devices with leaf certificates, you need to create an enrollment group and assign the policy that you created within your Device Registry namespace. The allocation-policy defines the onboarding authentication mechanism that DPS uses before issuing a leaf certificate. The default attestation mechanism is a symmetric key.

1. In the [Azure portal](https://portal.azure.com), search for and select **Device Provisioning Services**.
1. Search for and select the DPS instance that you created previously.
1. Under **Settings** on the sidebar menu of your DPS instance, select **Manage enrollments**.
1. On the **Manage enrollments** page, select either the **Enrollment groups** or **Individual enrollments** tab based on your provisioning needs.
1. Select **+ Add enrollment group** or **+ Add individual enrollment** to create a new enrollment.
1. On the **Registration + provisioning** page, fill in the following fields:

    | Property | Value |
    | --- | --- |
    | **Attestation mechanism** | Select any supported attestation method, such as symmetric key, X.509, TPM, and more. For more information, see [Attestation mechanism](../iot-dps/concepts-service.md#attestation-mechanism). |
    | **Group name** | Enter a name for your enrollment group. Skip this field if you're creating an individual enrollment. |
    | **Provisioning status** | Select **Enabled** to enable the enrollment from provisioning. |
    | **Reprovision policy** | Specify the reprovisioning policy for the enrollment. This policy determines how the enrollment behaves during device reprovisioning. |

1. Select and fill in the **IoT hubs** and **Device settings** tabs as appropriate for your environment.
1. Select the **Credential policies (Preview)** tab, and select the policy that you want to assign to the enrollment group or individual enrollment.

    Screenshot that shows Device Registry assigning a policy to an enrollment group in the Azure portal.

1. Select **Review + create**, and then select **Create** to finalize the enrollment.




**Applies to: azure-cli**



## More prerequisites for the Azure CLI

Before you begin, make sure that you have:

- The Azure CLI installed. Follow the steps to [install the Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli).
- The Azure IoT CLI extension with previews enabled installed to access the Azure Device Registry integration and certificate management functionalities for Azure IoT Hub:

    1. Check for existing Azure CLI extension installations.
    
        ```azurecli-interactive
        az extension list
        ```
    
    1. Remove any existing `azure-iot` installations.
    
        ```azurecli-interactive
        az extension remove --name azure-iot
        ```
        
    1. Install the `azure-iot` extension from the index with previews enabled.
    
        ```azurecli-interactive
        az extension add --name azure-iot --allow-preview
        ```

        Or you can download the .whl file from the GitHub releases page to install the extension manually.

        ```azurecli-interactive
        az extension add --upgrade --source https://github.com/Azure/azure-iot-cli-extension/releases/tag/v0.30.0b2
        ```
    
    1. After the installation, validate that your `azure-iot` extension version is at least 0.30.0b2.
    
        ```azurecli-interactive
        az extension list
        ``` 

## Overview

Use the Azure CLI commands to create an IoT hub with Device Registry integration and certificate management.

The setup process in this article includes the following steps:

1. Create a resource group.
1. Configure the necessary app privileges.
1. Create a user-assigned managed identity.
1. Create a Device Registry namespace with system-assigned managed identity.
1. Create a credential certificate authority (root CA) and policy (issuing CA) scoped to that namespace.
1. Create an IoT hub (preview) with a linked namespace and managed identity.
1. Create a DPS instance with a linked IoT hub and namespace.
1. Sync your credential and policies (CA certificates) to IoT Hub.
1. Create an enrollment group and link to your policy to enable certificate provisioning.

> **Important:**
> During the preview period, IoT Hub with Device Registry integration and certificate management features enabled on top of IoT Hub are available free of charge. Device provisioning service is billed separately and isn't included in the preview offer. For information on DPS pricing, see [Azure IoT Hub pricing](https://azure.microsoft.com/pricing/details/iot-hub/).

## Prepare your environment

To prepare your environment to use Device Registry, follow these steps:

1. Open a terminal window.
1. To sign in to your Azure account, run `az login`.
1. To list all subscriptions and tenants to which you have access, run `az account list`.
1. If you have access to multiple Azure subscriptions, set your active subscription where your IoT devices are created by running the following command:

    ```azurecli-interactive
    az account set --subscription "<your subscription name or ID>"
    ```

1. To display your current account details, run `az account show`. Copy both of the following values from the output of the command, and save them to a safe location, such as:

    - The `id` GUID. You use this value to provide your subscription ID.
    - The `tenantId` GUID. You use this value to update your permissions by using the tenant ID.

## Configure your resource group, permissions, and managed identity

To create a resource group, role, and permissions for your IoT solution, follow these steps:

1. Create a resource group for your environment.

    ```azurecli-interactive
    az group create --name <RESOURCE_GROUP_NAME> --location <REGION>
    ```

1. Assign a Contributor role to IoT Hub on the resource group level. The `AppId` value, which is the principal ID for IoT Hub, is `89d10474-74af-4874-99a7-c23c2f643083`, and it's the same for all IoT Hub apps.

    ```azurecli-interactive
    az role assignment create --assignee "89d10474-74af-4874-99a7-c23c2f643083" --role "Contributor" --scope "/subscriptions/<SUBSCRIPTION_ID>/resourceGroups/<RESOURCE_GROUP_NAME>"
    ```

1. Create a new user-assigned managed identity.

    ```azurecli-interactive
    az identity create --name <USER_IDENTITY> --resource-group <RESOURCE_GROUP_NAME> --location <REGION>
    ```

1. Retrieve the resource ID of the managed identity. You need the resource ID to assign roles, configure access policies, or link the identity to other resources.

    ```azurecli-interactive
    UAMI_RESOURCE_ID=$(az identity show --name <USER_IDENTITY> --resource-group <RESOURCE_GROUP_NAME> --query id -o tsv)
    ```

## Create a new Device Registry namespace

In this section, you create a new Device Registry namespace with a system-assigned managed identity. This process automatically generates a root CA credential and an issuing CA policy for the namespace. For more information on how credentials and policies are used to sign device leaf certificates during provisioning, see [Certificate management](../iot/iot-certificate-management-overview.md).

Credentials are optional. You can also create a namespace without a managed identity by omitting the `--enable-certificate-management` and `--policy-name` flags.

1. Create a new Device Registry namespace. Your namespace `name` can contain only lowercase letters and hyphens (`-`) in the middle of the name, but not at the beginning or end. For example, the name `msft-namespace` is valid. The `--enable-certificate-management` command creates credential (root CA) and default policy (issuing CA) for this namespace. You can configure the name for this policy by using the `--policy-name` command. By default, a policy can issue certificates with a validity of 30 days.

    ```azurecli-interactive
    az iot adr ns create --name <NAMESPACE_NAME> --resource-group <RESOURCE_GROUP_NAME> --location <REGION> --enable-certificate-management true --policy-name <POLICY_NAME>
    ```

    You can optionally create a custom policy by adding the `--cert-subject` and `--cert-validity-days` parameters. For more information, see [Create a custom policy](#create-a-custom-policy).

    The creation of the Device Registry namespace with system-assigned managed identity might take up to five minutes.

1. Verify that the namespace with a system-assigned managed identity, or principal ID, is created.

    ```azurecli-interactive
    az iot adr ns show --name <NAMESPACE_NAME> --resource-group <RESOURCE_GROUP_NAME>
    ```

1. Verify that a credential and policy named are created.

    ```azurecli-interactive
    az iot adr ns credential show --namespace <NAMESPACE_NAME> --resource-group <RESOURCE_GROUP_NAME>
    az iot adr ns policy show --namespace <NAMESPACE_NAME> --resource-group <RESOURCE_GROUP_NAME> --name <POLICY_NAME>
    ```

    If you didn't assign a policy name, the policy is created with the name `default`.

## Assign a user-assigned managed identity role to access the Device Registry namespace

In this section, you assign the [Azure Device Registry Contributor](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles/internet-of-things.md#azure-device-registry-contributor) role to the managed identity and scope it to the namespace. This custom role allows for full access to IoT devices within the Device Registry namespace.

1. Retrieve the principal ID of the user-assigned managed identity. This ID is needed to assign roles to the identity.

    ```azurecli-interactive
    UAMI_PRINCIPAL_ID=$(az identity show --name <USER_IDENTITY> --resource-group <RESOURCE_GROUP> --query principalId -o tsv)
    ```

1. Retrieve the resource ID of the Device Registry namespace. This ID is used as the scope for the role assignment.

    ```azurecli-interactive
    NAMESPACE_RESOURCE_ID=$(az iot adr ns show --name <NAMESPACE_NAME> --resource-group <RESOURCE_GROUP> --query id -o tsv)
    ```

1. Assign the [Azure Device Registry Contributor](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles/internet-of-things.md#azure-device-registry-contributor) role to the managed identity. This role grants the managed identity the necessary permissions that are scoped to the namespace.

    ```azurecli-interactive
    az role assignment create --assignee $UAMI_PRINCIPAL_ID --role "a5c3590a-3a1a-4cd4-9648-ea0a32b15137" --scope $NAMESPACE_RESOURCE_ID
    ```

1. Assign the [Azure Device Registry Onboarding](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles/internet-of-things.md#azure-device-registry-onboarding) role to the managed identity:

    ```azurecli-interactive
    az role assignment create --assignee "$UAMI_PRINCIPAL_ID" --role "547f7f0a-69c0-4807-bd9e-0321dfb66a84" --scope "$NAMESPACE_RESOURCE_ID"
    ```

## Create an IoT hub with Device Registry integration

1. Create a new IoT hub that's linked to the Device Registry namespace and with the user-assigned managed identity that you created earlier.

    ```azurecli-interactive
    az iot hub create --name <HUB_NAME> --resource-group <RESOURCE_GROUP> --location <HUB_LOCATION> --sku GEN2 --mi-user-assigned $UAMI_RESOURCE_ID --ns-resource-id $NAMESPACE_RESOURCE_ID --ns-identity-id $UAMI_RESOURCE_ID
    ```

    This command creates an IoT hub with SKU = GEN2 and links a user-assigned managed identity to the IoT hub.

    > **Important:**
> Because the IoT hub will be publicly discoverable as a DNS endpoint, be sure to avoid entering any sensitive or personally identifiable information when you name it.
>


1. Verify that the IoT hub has correct identity and Device Registry properties configured.

    ```azurecli-interactive
    az iot hub show --name <HUB_NAME> --resource-group <RESOURCE_GROUP> --query identity --output json
    ```

## Assign IoT Hub roles to access the Device Registry namespace

1. Retrieve the principal ID of the Device Registry namespace's managed identity. This identity needs permissions to interact with the IoT hub.

    ```azurecli-interactive
    ADR_PRINCIPAL_ID=$(az iot adr ns show --name <NAMESPACE_NAME> --resource-group <RESOURCE_GROUP> --query identity.principalId -o tsv)
    ```

1. Retrieve the resource ID of the IoT hub. This ID is used as the scope for role assignments.

    ```azurecli-interactive
    HUB_RESOURCE_ID=$(az iot hub show --name <HUB_NAME> --resource-group <RESOURCE_GROUP> --query id -o tsv)
    ```

1. Assign the Contributor role to the Device Registry identity. This role grants the Device Registry namespace's managed identity Contributor access to the IoT hub. The role allows broad access, including managing resources, but not assigning roles.

    ```azurecli-interactive
    az role assignment create --assignee $ADR_PRINCIPAL_ID --role "Contributor" --scope $HUB_RESOURCE_ID
    ```

1. Assign the IoT Hub Registry Contributor role to the Device Registry identity. This role grants more specific permissions to manage device identities in the IoT hub. These permissions are essential for Device Registry to register and manage devices in the hub.

    ```azurecli-interactive
    az role assignment create --assignee $ADR_PRINCIPAL_ID --role "IoT Hub Registry Contributor" --scope $HUB_RESOURCE_ID
    ```

## Create a DPS instance with Device Registry integration

1. Create a new DPS instance linked to your Device Registry namespace that you created in the previous sections. Your DPS instance must be located in the same region as your Device Registry namespace.

    ```azurecli-interactive
    az iot dps create --name <DPS_NAME> --resource-group <RESOURCE_GROUP> --location <LOCATION> --mi-user-assigned $UAMI_RESOURCE_ID --ns-resource-id $NAMESPACE_RESOURCE_ID --ns-identity-id $UAMI_RESOURCE_ID
    ```

1. Verify that DPS has the correct identity and Device Registry properties configured.

    ```azurecli-interactive
    az iot dps show --name <DPS_NAME> --resource-group <RESOURCE_GROUP> --query identity --output json
    ```

## Link your IoT hub to the DPS instance

1. Link the IoT hub to your DPS instance.

    ```azurecli-interactive
    az iot dps linked-hub create --dps-name <DPS_NAME> --resource-group <RESOURCE_GROUP> --hub-name <HUB_NAME>
    ```

1. Verify that the IoT hub appears in the list of linked hubs for the DPS instance.

    ```azurecli-interactive
    az iot dps linked-hub list --dps-name <DPS_NAME> --resource-group <RESOURCE_GROUP>
    ```

## Run Device Registry credential synchronization

Synchronize your credential and policies to the IoT hub. This step ensures that the IoT hub registers the CA certificates and trusts any leaf certificates issued by your configured policies.

```azurecli-interactive
az iot adr ns credential sync --namespace <NAMESPACE_NAME> --resource-group <RESOURCE_GROUP>
```

## Validate the hub CA certificate

Validate that your IoT hub registered its CA certificate.

```azurecli-interactive
az iot hub certificate list --hub-name <HUB_NAME> --resource-group <RESOURCE_GROUP>
```

## Create an enrollment in DPS

To provision devices by using leaf certificates, create an enrollment group in DPS and assign it to the appropriate credential policy with the `--credential-policy` parameter.

The following command creates an enrollment group that uses symmetric key attestation by default:

> **Note:**
> If you create a policy with a different name from `default`, ensure that you use the policy name after the `--credential-policy` parameter.

```azurecli-interactive
az iot dps enrollment-group create --dps-name <DPS_NAME> --resource-group <RESOURCE_GROUP> --enrollment-id <ENROLLMENT_ID> --credential-policy <POLICY_NAME>
```

Your IoT hub with Device Registry integration and certificate management is now set up and ready to use.

## Optional commands

The following commands help you manage your Device Registry namespaces, disable devices, create custom policies, and delete resources when they're no longer needed.

### Manage your namespaces

1. List all the namespaces in your resource group.

    ```azurecli-interactive
    az iot adr ns list --resource-group <RESOURCE_GROUP_NAME>
    ```

1. Show the details of a specific namespace.

    ```azurecli-interactive
    az iot adr ns show --name <NAMESPACE_NAME> --resource-group <RESOURCE_GROUP_NAME>
    ```

1. List all the policies in your namespace.

    ```azurecli-interactive
    az iot adr ns policy list --namespace <NAMESPACE_NAME> --resource-group <RESOURCE_GROUP_NAME>
    ```

1. Show the details of a specific policy.

    ```azurecli-interactive
    az iot adr ns policy show --namespace <NAMESPACE_NAME> --resource-group <RESOURCE_GROUP_NAME> --name <POLICY_NAME>
    ```

1. List all the credentials in your namespace.

    ```azurecli-interactive
    az iot adr ns credential list --namespace <NAMESPACE_NAME> --resource-group <RESOURCE_GROUP_NAME>
    ```

### Disable devices

1. List all the devices in your IoT hub.

    ```azurecli-interactive
    az iot hub device-identity list --hub-name <HUB_NAME> --resource-group <RESOURCE_GROUP_NAME>
    ```

1. Disable a device by updating its status to `disabled`. Make sure to replace `<MY_DEVICE_ID>` with the device ID that you want to disable.

    ```azurecli-interactive
    az iot hub device-identity update --hub-name <HUB_NAME> --resource-group <RESOURCE_GROUP_NAME> -d <MY_DEVICE_ID> --status disabled
    ```

1. Run the device again and verify that it's unable to connect to an IoT hub.

### Create a custom policy

Create a custom policy by using the `az iot adr ns policy create` command. Set the name, certificate subject, and validity period for the policy by following these rules:

- The policy `name` value must be unique within the namespace. If you try to create a policy with a name that already exists, you receive an error message.
- The certificate subject `cert-subject` value must be unique across all policies in the namespace. If you try to create a policy with a subject that already exists, you receive an error message.
- The validity period `cert-validity-days` value must be between 1 and 30 days. If you try to create a policy with a validity period outside this range, you receive an error message.

The following example creates a policy named `custom-policy` with a subject of `CN=TestDevice` and a validity period of 30 days.

```azurecli-interactive
az iot adr ns policy create --name "custom-policy" --namespace <NAMESPACE_NAME> --resource-group <RESOURCE_GROUP_NAME> --cert-subject "CN=TestDevice" --cert-validity-days "30"
```

### Delete resources

To delete your Device Registry namespace, you must first delete any IoT hubs that are linked to the namespace.

```azurecli-interactive
az iot hub delete --name <HUB_NAME> --resource-group <RESOURCE_GROUP_NAME>
az iot adr ns delete --name <NAMESPACE_NAME> --resource-group <RESOURCE_GROUP_NAME>
az iot dps delete --name <DPS_NAME> --resource-group <RESOURCE_GROUP_NAME> 
az identity delete --name <USER_IDENTITY> --resource-group <RESOURCE_GROUP_NAME>
```



**Applies to: script**



## Overview

Use the provided PowerShell script to automate the setup of your IoT hub with Azure Device Registry integration. The script performs all the necessary steps to create the required resources and link them together, including steps to:

1. Create a resource group.
1. Configure the necessary app privileges.
1. Create a user-assigned managed identity.
1. Create a Device Registry namespace with system-assigned managed identity.
1. Create a credential root certificate authority (root CA) and policy (issuing CA) scoped to that namespace.
1. Create an IoT hub (preview) with a linked namespace and managed identity.
1. Create a DPS instance with a linked IoT hub and namespace.
1. Sync your credential and policies (CA certificates) to IoT Hub.
1. Create an enrollment group, and link to your policy to enable certificate provisioning.

> **Important:**
> During the preview period, IoT Hub with Device Registry integration and certificate management features enabled on top of IoT Hub are available free of charge. Device provisioning service is billed separately and isn't included in the preview offer. For more information on DPS pricing, see [Azure IoT Hub pricing](https://azure.microsoft.com/pricing/details/iot-hub/).

## Prepare your environment

1. Download [PowerShell 7](https://learn.microsoft.com/powershell/scripting/install/installing-powershell-on-windows) for Windows.

1. Go to the [GitHub repository](https://github.com/Azure-Samples/iot-hub-adr-cert-mgmt-preview/tree/main/scripts) and download the **Scripts** folder, which contains the script file, `iothub-adr-certs-setup-preview.ps1`.

## Customize the script variables

Open the script file in a text editor and modify the following variables to match the configuration that you want:

- `TenantId`: Your tenant ID. To find this value, run `az account show` in your terminal.
- `SubscriptionId`: Your subscription ID. To find this value, run `az account show` in your terminal.
- `ResourceGroup`: The name of your new resource group.
- `Location`: The Azure region where you want to create your resources. Check out the available locations for preview features in the [Supported regions](iot-hub-what-is-new.md#supported-regions) section.
- `NamespaceName`: Your namespace name can contain only lowercase letters and hyphens (`-`) in the middle of the name, but not at the beginning or end. For example, *msft-namespace* is a valid name.
- `HubName`: Your hub name can contain only lowercase letters and numerals.
- `DpsName`: The name of your new DPS instance.
- `UserIdentity`: The new user-assigned managed identity for your resources.
- `WorkingFolder`: The local folder where your script is located.

> **Important:**
> Because the IoT hub will be publicly discoverable as a DNS endpoint, be sure to avoid entering any sensitive or personally identifiable information when you name it.
>


## Run the script interactively

1. Open the script and run in PowerShell 7+ as an administrator. Go to the folder that contains your script and run `.\iothub-adr-certs-setup-preview.ps1`.

1. If you run into an execution policy issue, try running `powershell -ExecutionPolicy Bypass -File .\iothub-adr-certs-setup-preview.ps1`.

1. If you get a message that the namespace `Microsoft.DeviceRegistry` isn't registered, try running `az provider register --namespace Microsoft.DeviceRegistry`.

1. Follow the guided prompts:

    - Select **Enter** to proceed with a step.
    - Select **s** or **S** to skip a step.
    - Select **Ctrl** + **C** to abort.

The creation of your Device Registry namespace, IoT Hub, DPS instance, and other resources might take up to five minutes each.

## Monitor execution and validate the resources

1. The script continues execution when warnings are encountered and only stops if a command returns a nonzero exit code. Monitor the console for red **ERROR** messages, which indicate issues that require attention.

1. After the script finishes, validate the creation of your resources by visiting your new resource group on the [Azure portal](https://portal.azure.com). You should see the following resources created:

    - IoT Hub instance
    - DPS instance
    - Azure Device Registry namespace
    - User-assigned managed identity



## Next steps

1. Your IoT hub with Device Registry integration and certificate management is set up and ready to use. You can now start onboarding your IoT devices to the hub by using a DPS instance. You can use your Device Registry policies to issue certificates to your devices:

   - [Certificate issuance in Azure IoT Hub certificate management](../iot/concept-certificate-issuance.md)
   - [Certificate renewal in Azure IoT Hub certificate management](../iot/concept-certificate-renewal.md)

1. To onboard devices and manage certificates by using the supported SDK path, see [Unified Azure IoT SDKs (preview) for IoT Hub and Azure Device Registry](../iot/device-registry/concept-unified-iot-sdks.md).
