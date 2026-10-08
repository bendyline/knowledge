---
title: How to use the connector for ONVIF
description: Use the operations experience web UI to discover and configure assets and devices to use media streams from ONVIF compliant cameras.
author: dominicbetts
ms.author: dobett
ms.service: azure-iot-operations
ms.subservice: azure-akri
ms.topic: how-to
ms.date: 05/28/2026
ai-usage: ai-assisted

#CustomerIntent: As an industrial edge IT or operations user, I want configure my Azure IoT Operations environment so that I can discover and use media streams from an ONVIF compliant camera.
---

# Configure the connector for ONVIF

In Azure IoT Operations, the connector for ONVIF enables you to discover media profiles and capabilities from a known [ONVIF conformant](https://www.onvif.org/profiles-add-ons-specifications/) camera connected to your Azure IoT Operations cluster.

> **Note:**
> The connector for ONVIF doesn't support network-level discovery of ONVIF cameras. You must manually add a device with the camera's ONVIF endpoint before the connector can discover the camera's media profiles and capabilities.


An _asset_ in Azure IoT Operations is a logical entity that you create to represent a physical asset or device. An Azure IoT Operations asset can have custom properties, data points, streams, and events that describe its behavior and characteristics. An asset is associated with one or more devices. Azure IoT Operations stores asset definitions in the Azure Device Registry.



A _device_ in Azure IoT Operations is a logical entity that defines the connections to physical assets or devices. Without a device, data can't flow from a physical device or asset to the MQTT broker. When you configure a device and asset, a connection is established to the physical asset or device and data point values, events, and streams arrive in Azure IoT Operations instance. A device has one or more inbound endpoints. Azure IoT Operations stores device definitions in the Azure Device Registry.


The following table summarizes the features the connector for ONVIF supports:

| Feature | Supported | Notes |
| --- | :---: | --- |
| Username/password authentication | Yes |  |
| X.509 user certificates | No |  |
| Anonymous access | Yes | For testing purposes |
| Southbound certificate trust list | Yes | For secure TLS connections to ONVIF cameras |
| OpenTelemetry integration | Yes |  |
| Network discovery | No | Discovering ONVIF cameras on the network isn't currently supported |
| Media profile discovery | Yes | Discovers media profiles within a known camera |
| Capability discovery | Yes | Discovers PTZ and other device capabilities |
| Media endpoint discovery | Yes | Discovers media streams, framerate, resolution, encoding |
| Camera configuration | Yes | Retrieve and update camera settings |
| PTZ control | Yes | Control pan, tilt, and zoom |

The connector connects ONVIF cameras to your Azure IoT Operations instance and registers them in the Azure Device Registry. After you add a known camera, the connector automatically discovers the following information from that camera:

- The capabilities, such as pan-tilt-zoom (PTZ), of the ONVIF device.
- The media endpoints exposed by the ONVIF device.
- Details of the media streams such as framerate, resolution, and encoding.

After the camera is registered, examples of management operations include:

- Retrieving and updating the configuration of the camera to adjust the output image configuration.
- Controlling the camera pan, tilt, and zoom (PTZ).

The [media connector](howto-use-media-connector.md) can access the media sources exposed by these cameras.

Together, the media connector, connector for ONVIF, Azure IoT Operations, and companion services enable you to use Azure IoT Operations to implement use cases such as:

- Wait and dwell time tracking to track the time spent in line by customers.
- Order accuracy to track that the correct orders are packed by comparing items to POS receipt.
- Defect detection and quality assurance by cameras to detect any defects in products on the assembly line.
- Safety monitoring such as collision detection, safety zone detection, and personal safety equipment detection.

This article describes how to use the operations experience web UI and Azure CLI to:

- Add a device that has an ONVIF endpoint for a compliant camera.
- View the assets and devices discovered at the ONVIF endpoint.
- Create a device that represents the media endpoints exposed by the ONVIF camera.
- Create an asset that captures snapshots from the media endpoint and publishes them to the MQTT broker.

## Prerequisites


The Azure CLI examples in this article use environment variables so that you can set each value once and then copy and paste the commands as-is. If you're using the Azure IoT Operations Codespaces environment from the [quickstart](../get-started-end-to-end-sample/quickstart-deploy.md), these variables are already set for you and you can skip this step. Otherwise, set the following environment variables in your shell before you run the commands.

The following scripts set the most commonly used environment variables:

| Environment variable | Description |
| --- | --- |
| `SUBSCRIPTION_ID` | The ID of the subscription that contains your Azure IoT Operations instance. |
| `RESOURCE_GROUP` | The name of the resource group that contains your Azure IoT Operations instance. |
| `AIO_INSTANCE_NAME` | The name of your Azure IoT Operations instance. To list your instances, run `az iot ops list -o table`. |
| `CLUSTER_NAME` | The name of the Azure Arc-enabled Kubernetes cluster that hosts your instance. |
| `LOCATION` | The Azure region to use for new resources, for example `eastus`. |

# [Bash](#tab/bash)

```bash
SUBSCRIPTION_ID=<subscription-id>
RESOURCE_GROUP=<resource-group-name>
AIO_INSTANCE_NAME=<instance-name>
CLUSTER_NAME=<cluster-name>
LOCATION=<region>
```

# [PowerShell](#tab/powershell)

```powershell
$SUBSCRIPTION_ID = "<subscription-id>"
$RESOURCE_GROUP = "<resource-group-name>"
$AIO_INSTANCE_NAME = "<instance-name>"
$CLUSTER_NAME = "<cluster-name>"
$LOCATION = "<region>"
```

---

You only need to set the variables that this article uses. This article might use additional environment variables for resource names that you choose. The article explains how to set them where they're introduced.



A deployed instance of Azure IoT Operations with resource sync rules enabled. To enable resource sync rules run the following command on your Azure IoT Operations instance. This command also sets the required permissions on the custom location:

```bash
az iot ops enable-rsync -n $AIO_INSTANCE_NAME -g $RESOURCE_GROUP
```



- The Azure CLI installed on your development machine. Check [Available Azure CLI extensions](https://learn.microsoft.com/cli/azure/azure-cli-extensions-list) for the minimum required version to use the **azure-iot-ops** extension. Use `az --version` to check your version and `az upgrade` to update if necessary. For more information, see [Install the Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli).
- The Azure IoT Operations extension for the Azure CLI. Use the following command to add the extension or update it to the latest version:

  ```azurecli
  az extension add --upgrade --name azure-iot-ops
  ```



To sign in to the operations experience web UI, you need a Microsoft Entra ID account with at least contributor permissions for the resource group that contains your **Kubernetes - Azure Arc** instance. You can't sign in with a Microsoft account (MSA). For more information, see [Troubleshoot access to the operations experience web UI](../troubleshoot/troubleshoot.md#troubleshoot-access-to-the-operations-experience-web-ui).


An ONVIF compliant camera that you can reach from your Azure IoT Operations cluster.

## ONVIF compliance

ONVIF has several categories for compliance, such as discovery, device, media, imaging, analytics, events, and pan-tilt-zoom (PTZ) services. To learn more, see [ONVIF - Profiles, Add-ons, and Specifications](https://www.onvif.org/profiles-add-ons-specifications/).

The connector for ONVIF in Azure IoT Operations focuses on support for camera devices that implement the following profiles:

- [Profile S for basic video streaming](https://www.onvif.org/profiles/profile-s/)
- [Profile T for advanced video streaming](https://www.onvif.org/profiles/profile-t/)

The connector enables support for the following capabilities:

- Discovery of device information and capabilities from a known camera.
- Monitoring events from devices.
- Discovery of the media URIs exposed by a device. The connector for ONVIF makes these URIs available to the media connector.
- Imaging control such as filters and receiving motion and tampering events.
- Controlling device PTZ.

### ONVIF connector template instance

Before an OT user can create a device that uses the connector for ONVIF, an IT administrator must add an ONVIF connector template instance to your Azure IoT Operations instance. To learn more, see [Create and manage connector template instances](howto-manage-connector-templates.md).

## Configure a certificate trust list for the connector


Each connector has its own *trust list*: the set of certificates the connector uses to validate the TLS certificate that a southbound endpoint presents when the connector establishes a secure connection to it. Add a certificate to the trust list when the southbound endpoint uses a TLS certificate that's signed by a private or enterprise certificate authority (CA), or a self-signed certificate that the connector doesn't already trust. Client certificates that the connector presents to the southbound endpoint for mutual TLS are configured separately as part of the device's user authentication.

> **Note:**
> For the connector for OPC UA, the trust list also handles OPC UA application-instance certificates. To learn more, see [Understand the OPC UA certificates infrastructure](overview-opc-ua-connector-certificates-management.md).

You can add a certificate to a connector's trust list in two ways:

- **Operations experience**. In the operations experience web UI, you can either upload a certificate file directly or pick an existing secret from Azure Key Vault. The operations experience adds the certificate to Azure Key Vault as a secret (if needed), creates the synced secret resource on the cluster, and wires it into the connector's trust list for you. To learn more, see [Manage certificates for external communications](../secure-iot-ops/howto-manage-certificates.md#manage-certificates-for-external-communications).

- **Azure CLI**. The Azure CLI flow assumes the certificate is already stored as a secret in Azure Key Vault. You use `az iot ops secretsync secret set` to create a synced secret on the cluster that references the Key Vault secret, and then `az iot ops connector template update` to add a reference to the synced secret in the connector template's trust list. To learn more, see [Add and use certificates](../secure-iot-ops/howto-manage-certificates.md?tabs=cli#add-and-use-certificates). To learn how to add a certificate to Azure Key Vault, see [Add certificates as secrets to Azure Key Vault](../secure-iot-ops/howto-manage-certificates.md#add-certificates-as-secrets-to-azure-key-vault).

The operations experience and the Azure CLI flows partially overlap. The operations experience can both upload a new certificate to Azure Key Vault and sync it to the cluster in one experience. The Azure CLI flow assumes the certificate is already in Azure Key Vault and only handles the sync and trust-list wiring.

## Create a device with an ONVIF endpoint

To add a device that includes an ONVIF endpoint for a compliant camera:

# [Operations experience](#tab/portal)

1. In the operations experience web UI, select **Devices** from the left navigation pane:

    Screenshot that shows the list of devices in the operations experience.

1. Select **Create new**. On the **Device details** page, enter a name for the device such as `my-onvif-camera`. To define the inbound endpoint, select **New** on the **Microsoft.Onvif** tile. Enter the details for your ONVIF camera, such as:

    Screenshot that shows how to add an ONVIF endpoint to a device.

    Select **Save** to add the endpoint to the device. The **Device details** page now shows the ONVIF endpoint.

1. On the **Device details** page, select **Next**.

1. On the **Add custom property** page, you can optionally update or add custom properties to the device. Select **Next** when you're done.

1. The **Summary** page shows the details of the device. Review the details, and then select **Create** to create the device. After a few minutes, the **Devices** page shows the new device.

    Screenshot that shows the device created in the operations experience.

# [Azure CLI](#tab/cli)

Run the following commands:

```azurecli
az iot ops ns device create -n onvif-connector-cli -g {your resource group name} --instance {your instance name}

az iot ops ns device endpoint inbound add onvif --device onvif-connector-cli -g {your resource group name} -i {your instance name}  --name onvif-connector-cli-0 --endpoint-address http://myonvifcam:2020/onvif/device_service
```

To learn more, see [az iot ops ns device](https://learn.microsoft.com/cli/azure/iot/ops/ns/device).

# [Bicep](#tab/bicep)

Deploy the following Bicep template to create a device with an inbound endpoint for the connector for ONVIF. Replace the placeholders `<AIO_NAMESPACE_NAME>` and `<CUSTOM_LOCATION_NAME>` with your Azure IoT Operations namespace name and custom location name respectively:

```bicep
param adrNamespaceName string = '<AIO_NAMESPACE_NAME>'
param customLocationName string = '<CUSTOM_LOCATION_NAME>'

resource adrNamespace 'Microsoft.DeviceRegistry/namespaces@2026-04-01' existing = {
  name: adrNamespaceName
}

resource customLocation 'Microsoft.ExtendedLocation/customLocations@2021-08-31-preview' existing = {
  name: customLocationName
}

resource device 'Microsoft.DeviceRegistry/namespaces/devices@2026-04-01' = {
  name: 'onvif-connector'
  parent: adrNamespace
  location: resourceGroup().location
  extendedLocation: {
    type: 'CustomLocation'
    name: customLocation.id
  }
  properties: {
    endpoints: {
      outbound: {
        assigned: {}
      }
      inbound: {
        'onvif-connector-0': {
          endpointType: 'Microsoft.Onvif'
          address: 'http://myonvifcam:2020/onvif/device_service'
        }
      }
    }
  }
}
```

---

### Configure a device to use a username and password

The previous example uses the `Anonymous` authentication mode. This mode doesn't require a username or password.

To use the `Username password` authentication mode, complete the following steps:

# [Operations experience](#tab/portal)


In the operations experience, when you add the inbound endpoint and choose the **Username password** authentication mode, select **Add reference** to add the secret references for the username and password. The operations experience offers two options:

- **Create a new secret**: uploads the value to Azure Key Vault and synchronizes it to the cluster as a synced secret.
- **Add from Azure Key Vault**: synchronizes an existing Key Vault secret to the cluster.

The operations experience saves both the username and password references in a single synced secret resource on the cluster, and you give that synced secret a name.

To learn more, see [Add and use secrets](../secure-iot-ops/howto-manage-secrets.md?tabs=portal#add-and-use-secrets).

# [Azure CLI](#tab/cli)


1. Make sure the username and password are stored as secrets in Azure Key Vault. To learn more, see [Add secrets to Azure Key Vault](../secure-iot-ops/howto-manage-secrets.md#add-secrets-to-azure-key-vault).

1. Create a single synced secret on the cluster that references both Key Vault secrets. The following example creates a synced secret named `my-endpoint-creds` that maps the Key Vault secrets `my-kv-username` and `my-kv-password` to the keys `username` and `password`:

    ```azurecli
    az iot ops secretsync secret set \
      --instance <your-instance-name> \
      --resource-group <your-resource-group> \
      --name my-endpoint-creds \
      --secret target=username source=my-kv-username \
      --secret target=password source=my-kv-password
    ```

    For more information, see [az iot ops secretsync secret set](https://learn.microsoft.com/cli/azure/iot/ops/secretsync/secret#az-iot-ops-secretsync-secret-set).

1. Use the [az iot ops ns device endpoint inbound add](https://learn.microsoft.com/cli/azure/iot/ops/ns/device/endpoint/inbound/add) command with the `--user-ref` and `--pass-ref` parameters to reference the synced secret name and key for the username and password (for example, `my-endpoint-creds/username` and `my-endpoint-creds/password`).

> **Note:**
> This Azure CLI flow partially overlaps with the operations experience. The operations experience can also upload the secret to Azure Key Vault as part of the same step, while the Azure CLI flow assumes the secret already exists in Azure Key Vault.

# [Bicep](#tab/bicep)


1. Make sure the username and password are stored as secrets in Azure Key Vault, and that a synced secret on the cluster references both Key Vault secrets. You can create the synced secret either through the operations experience or by using the Azure CLI. To learn more, see [Manage secrets for your Azure IoT Operations deployment](../secure-iot-ops/howto-manage-secrets.md#add-and-use-secrets).

1. Modify the `authentication` block of your Bicep configuration for the connector to reference the synced secret on the cluster. The `usernameSecretName` and `passwordSecretName` values use the form `<synced-secret-name>/<key>`:

    ```bicep
    authentication: {
        method: 'UsernamePassword'
            usernamePasswordCredentials: {
                usernameSecretName: 'my-endpoint-creds/username'
                passwordSecretName: 'my-endpoint-creds/password'
            }
    }
    ```

> **Note:**
> The Azure CLI flow for creating the synced secret partially overlaps with the operations experience. The operations experience can also upload the secret to Azure Key Vault as part of the same step, while the Azure CLI flow assumes the secret already exists in Azure Key Vault.


---

### Other security options

When you create the inbound endpoint in the operations experience, you can also select the following options on the **Advanced** tab:

| Option | Type | Description |
| --- | --- | --- |
| **Accept invalid hostnames** | Yes/No | Accept invalid hostnames in certificates for the ONVIF connection, defaults to **No** |
| **Accept invalid certificates** | Yes/No | Accept invalid certificates for the ONVIF connection, defaults to **No** |
| **Fallback to username token auth** | Yes/No | Fall back to **UsernameToken** authentication if digest authentication fails for the ONVIF connection, defaults to **No** |

> **Tip:**
> For more information about how to use the Azure CLI to configure these settings, see the [az iot ops ns device endpoint inbound add](https://learn.microsoft.com/cli/azure/iot/ops/ns/device/endpoint/inbound/add) command reference.

## View the discovered assets and devices

After you create a device with an ONVIF endpoint, the connector for ONVIF automatically discovers the ONVIF assets and media devices that are available at the endpoint. To view the discovered assets and devices in the operations experience web UI, select **Discovery** from the left navigation pane:

Screenshot that shows the list of discovered devices and assets in the operations experience.

- Choose **Import and create asset** from the discovered ONVIF asset to create an asset that represents the capabilities of the ONVIF compliant camera. For example, you can create an asset that captures events from the ONVIF camera or enables you to control the ONVIF camera. For more information, see the section [Create an ONVIF asset for event management and control](#create-an-onvif-asset-for-event-management-and-control).

- Choose **Import and create device** from the discovered ONVIF device to create a device that connects to the media endpoints exposed by the ONVIF compliant camera. After you create the media device, you can create media assets that capture snapshots or video streams from the media endpoints. For more information, see the section [Create a device with media endpoints](#create-a-device-with-media-endpoints).

## Create a device with media endpoints

To create a device with media endpoints from the discovered device, follow these steps:

1. In the operations experience web UI, select **Discovery** from the left navigation pane. Then select **Discovered devices**.

1. Select the discovered media device, such as `my-onvif-camera`. Then select **Import and create device**.

1. The **Device details** page shows all the discovered media inbound endpoints. Enter a name for the device, such as `my-onvif-camera-media`, and select an **Authentication method** for each endpoint:

    Screenshot that shows how to create a media device from the discovered ONVIF device.

    > **Tip:**
    > You can remove an inbound endpoint that you don't need by selecting it and then selecting **Remove inbound endpoint**.

    Then select **Next**.

1. On the **Add custom property** page, you can see the discovered properties. You can optionally update, remove, or add custom properties to the device. Select **Next** when you're done.

1. On the **Summary** page, review the details of the device. Select **Create** to create the device. After a few minutes, the **Devices** page shows the new media device.

    Screenshot that shows the media device created in the operations experience.

## Create a media asset to capture snapshots

You can now use the discovered media device to create an asset that captures snapshots from the camera and publishes them to the MQTT broker. To create the media asset, follow these steps:

1. In the operations experience web UI, select **Assets** from the left navigation pane. Then select **Create asset**.

1. On the **Asset details page**, enter a name for the asset, such as `my-onvif-camera-media-asset`. Then select the discovered endpoint you want to use to capture snapshots.

    Screenshot that shows how to create a media asset from the media device.

    Update any custom properties for the media asset and then select **Next**.

1. On the **Streams** page, select **Add stream**. Use the following settings to configure an example stream that publishes snapshots to the MQTT broker:

    - **Stream name**: `myassetvideo`
    - **Destination**: `MQTT`
    - **Topic**: `myassetvideo`
    - **Task type**: `snapshot-to-mqtt`
    
    > **Tip:**
    > The topic you choose here is automatically nested under `azure-iot-operations/data/<asset-name>/` when the connector for ONVIF publishes the snapshots to the MQTT broker.

    Leave the other settings as default. Then select **Add**. The stream is added to the asset configuration:

    Screenshot that shows how to add a stream to the media asset.

1. Select **Next** to go to the **Review** page. Review the details of the asset, and then select **Create** to create the asset. After a few minutes, the **Assets** page shows the new asset.

    Screenshot that shows the media asset created in the operations experience.

The media asset is now configured to capture snapshots from the ONVIF compliant camera and publish them to the MQTT broker.

## Create an ONVIF asset for event management and control

ONVIF compliant cameras can generate events such as motion detection and respond to control commands such as pan, tilt, and zoom. You can create an ONVIF asset from the discovered ONVIF device that captures these events and enables you to control the camera.

After you add an ONVIF device in the operations experience, a discovered ONVIF asset is created automatically:

Screenshot that shows the ONVIF asset discovered from the ONVIF device.

To create an ONVIF asset for event management and control:

1. Select the discovered asset and then select **Import and create asset**.

1. On the **Asset details** page, enter a name and description for the asset. The device inbound endpoint is already selected for you and the custom properties are prepopulated from the discovered asset:

    Screenshot that shows the detailed ONVIF asset discovered from the ONVIF device.

    Select **Next** to continue.

1. On the **Event groups** page, select the event group to review the discovered events. You can remove any events that you don't want to use:

    Screenshot that shows the manage event groups page for the ONVIF asset.

1. For each event you keep, configure the MQTT topic it publishes to:

    Screenshot that shows how to configure an event group.

    Select **Next** to continue.

1. On the **Management groups** page, configure the actions, such as pan, tilt, and zoom, that you want to use to control the ONVIF camera.

    Screenshot that shows the manage management groups page for the ONVIF asset.

    For more information about configuring management groups, see [Manage and control the camera](#manage-and-control-the-camera).

    Select **Next** to continue.

1. Review the summary of the ONVIF asset configuration and then select **Create** to create the asset. After a few minutes, the **Assets** page shows the new asset.

## Manage and control the camera

To interact with the ONVIF camera, you can publish MQTT messages that the connector for ONVIF subscribes to. The message format is based on the [ONVIF network interface specifications](https://www.onvif.org/profiles/specifications/).

To publish MQTT messages to interact with the camera, options include:

- Management actions CLI commands. To learn more, see[Enable and run management actions](howto-use-management-actions.md).

- Programmatically. The [Azure IoT Operations connector for ONVIF PTZ Demo](https://github.com/Azure-Samples/explore-iot-operations/tree/main/samples/aio-onvif-connector-ptz-demo) sample application shows how to use the connector for ONVIF to:

    - Use the media asset definition to retrieve a profile token from the camera's media service.
    - Use the profile token when you use the camera's PTZ capabilities control its position and orientation.

    The sample application uses the Azure IoT Operations MQTT broker to send commands to interact with the connector for ONVIF. To learn more about using the MQTT broker, see [Azure IoT Operations built-in local MQTT broker](../manage-mqtt-broker/overview-broker.md).
