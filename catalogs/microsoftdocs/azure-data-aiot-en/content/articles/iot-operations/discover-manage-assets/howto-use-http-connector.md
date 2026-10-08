---
title: How to use the connector for HTTP/REST
description: Use the operations experience web UI or the Azure CLI to configure assets and devices for connections to HTTP endpoints.
author: dominicbetts
ms.author: dobett
ms.service: azure-iot-operations
ms.subservice: azure-akri
ms.topic: how-to
ms.date: 05/28/2026
ai-usage: ai-assisted

#CustomerIntent: As an industrial edge IT or operations user, I want configure my Azure IoT Operations environment so that I can access data from HTTP/REST endpoints.
---

# Configure the connector for HTTP/REST

In Azure IoT Operations, the connector for HTTP/REST enables access to data from REST endpoints exposed by HTTP services.


An _asset_ in Azure IoT Operations is a logical entity that you create to represent a physical asset or device. An Azure IoT Operations asset can have custom properties, data points, streams, and events that describe its behavior and characteristics. An asset is associated with one or more devices. Azure IoT Operations stores asset definitions in the Azure Device Registry.



A _device_ in Azure IoT Operations is a logical entity that defines the connections to physical assets or devices. Without a device, data can't flow from a physical device or asset to the MQTT broker. When you configure a device and asset, a connection is established to the physical asset or device and data point values, events, and streams arrive in Azure IoT Operations instance. A device has one or more inbound endpoints. Azure IoT Operations stores device definitions in the Azure Device Registry.


The following table summarizes the features the connector for HTTP/REST currently supports:

| Feature | Supported | Notes |
| --- | :---: | --- |
| Username/password authentication | Yes | Basic HTTP authentication |
| X.509 user certificates (mTLS) | Yes | Certificates for client authentication and authorization |
| Anonymous access | Yes | For testing purposes |
| Southbound certificate trust list | Yes | For secure TLS connections to the HTTP endpoint |
| OpenTelemetry integration | Yes |  |
| Automatic retries | Yes | Reports failed status for nonretryable errors |
| WASM data transformation | Yes | Optionally transform incoming data |
| Schema generation | Yes | Registers inferred schema with the schema registry |

For each configured dataset, the connector for HTTP/REST:

1. Performs a GET request to the address specified in the device endpoint and appends the dataset's data source from the asset.
1. Generates a message schema for each dataset based on the data it receives, and registers it with the schema registry in Azure Device Registry.
1. Forwards the data to the specified destination.

This article explains how to use the connector for HTTP/REST to perform tasks such as:

- Define the devices that connect HTTP sources to your Azure IoT Operations instance.
- Add assets, and define the data points to enable the data flow from the HTTP source to the MQTT broker or [broker state store](../develop-edge-apps/overview-state-store.md).

## Prerequisites


- An instance of Azure IoT Operations deployed in a Kubernetes cluster. For more information, see [Deploy Azure IoT Operations](../deploy-iot-ops/howto-deploy-iot-operations.md).



- The Azure CLI installed on your development machine. Check [Available Azure CLI extensions](https://learn.microsoft.com/cli/azure/azure-cli-extensions-list) for the minimum required version to use the **azure-iot-ops** extension. Use `az --version` to check your version and `az upgrade` to update if necessary. For more information, see [Install the Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli).
- The Azure IoT Operations extension for the Azure CLI. Use the following command to add the extension or update it to the latest version:

  ```azurecli
  az extension add --upgrade --name azure-iot-ops
  ```



To sign in to the operations experience web UI, you need a Microsoft Entra ID account with at least contributor permissions for the resource group that contains your **Kubernetes - Azure Arc** instance. You can't sign in with a Microsoft account (MSA). For more information, see [Troubleshoot access to the operations experience web UI](../troubleshoot/troubleshoot.md#troubleshoot-access-to-the-operations-experience-web-ui).


Your IT administrator must configure the connector for HTTP/REST template for your Azure IoT Operations instance in the Azure portal.

You need any credentials required to access the HTTP source. If the HTTP source requires authentication, you need to create a Kubernetes secret that contains the username and password for the HTTP source.

### HTTP/REST connector template instance

Before an OT user can create a device that uses the connector for HTTP/REST, an IT administrator must add an HTTP/REST connector template instance to your Azure IoT Operations instance. To learn more, see [Create and manage connector template instances](howto-manage-connector-templates.md).

## Configure a certificate trust list for the connector


Each connector has its own *trust list*: the set of certificates the connector uses to validate the TLS certificate that a southbound endpoint presents when the connector establishes a secure connection to it. Add a certificate to the trust list when the southbound endpoint uses a TLS certificate that's signed by a private or enterprise certificate authority (CA), or a self-signed certificate that the connector doesn't already trust. Client certificates that the connector presents to the southbound endpoint for mutual TLS are configured separately as part of the device's user authentication.

> **Note:**
> For the connector for OPC UA, the trust list also handles OPC UA application-instance certificates. To learn more, see [Understand the OPC UA certificates infrastructure](overview-opc-ua-connector-certificates-management.md).

You can add a certificate to a connector's trust list in two ways:

- **Operations experience**. In the operations experience web UI, you can either upload a certificate file directly or pick an existing secret from Azure Key Vault. The operations experience adds the certificate to Azure Key Vault as a secret (if needed), creates the synced secret resource on the cluster, and wires it into the connector's trust list for you. To learn more, see [Manage certificates for external communications](../secure-iot-ops/howto-manage-certificates.md#manage-certificates-for-external-communications).

- **Azure CLI**. The Azure CLI flow assumes the certificate is already stored as a secret in Azure Key Vault. You use `az iot ops secretsync secret set` to create a synced secret on the cluster that references the Key Vault secret, and then `az iot ops connector template update` to add a reference to the synced secret in the connector template's trust list. To learn more, see [Add and use certificates](../secure-iot-ops/howto-manage-certificates.md?tabs=cli#add-and-use-certificates). To learn how to add a certificate to Azure Key Vault, see [Add certificates as secrets to Azure Key Vault](../secure-iot-ops/howto-manage-certificates.md#add-certificates-as-secrets-to-azure-key-vault).

The operations experience and the Azure CLI flows partially overlap. The operations experience can both upload a new certificate to Azure Key Vault and sync it to the cluster in one experience. The Azure CLI flow assumes the certificate is already in Azure Key Vault and only handles the sync and trust-list wiring.

## Create a device

To configure the connector for HTTP/REST, first create a device that defines the connection to the HTTP source. The device includes the URL of the HTTP source and any credentials you need to access the HTTP source:

# [Operations experience](#tab/portal)

1. In the operations experience web UI, select **Devices** in the left navigation pane. Then select **Create new**.

1. Enter a name for your device, such as `http-connector`. To add the endpoint for the connector for HTTP/REST, select **New** on the **Microsoft.Http** tile.

1. Add the details of the endpoint for the connector for HTTP/REST including any authentication credentials:

    Screenshot that shows how to add a connector for HTTP/REST endpoint.

    Select **Apply** to save the endpoint.

1. On the **Device details** page, select **Next** to continue.

1. On the **Add custom property** page, add any other properties you want to associate with the device. For example, you might add a property to indicate the manufacturer of the camera. Then select **Next** to continue.

1. On the **Summary** page, review the details of the device and select **Create** to create the asset.

1. After the device is created, you can view it in the **Devices** list:

    Screenshot that shows the list of devices.

# [Azure CLI](#tab/cli)

Run the following commands:

```azurecli
az iot ops ns device create -n rest-http-connector-cli -g {your resource group name} --instance {your instance name} 

az iot ops ns device endpoint inbound add rest --device rest-http-connector-cli -g {your resource group name} -i {your instance name}  --name rest-http-connector-0 --endpoint-address "https://rest-http-connector-0"
```

To learn more, see [az iot ops ns device](https://learn.microsoft.com/cli/azure/iot/ops/ns/device).

# [Bicep](#tab/bicep)

Deploy the following Bicep template to create a device with an inbound endpoint for the HTTP/REST connector. Replace the placeholders `<AIO_NAMESPACE_NAME>` and `<CUSTOM_LOCATION_NAME>` with your Azure IoT Operations namespace name and custom location name respectively:

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
  name: 'http-connector'
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
        'http-connector-0': {
          endpointType: 'Microsoft.Http'
          address: 'https://rest-http-connector-0'
        }
      }
    }
  }
}
```

This configuration deploys a new `device` resource called `http-connector` to the cluster with an inbound endpoint called `http-connector-0`.

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

### Configure a device to use an X.509 certificate

# [Operations experience](#tab/portal)


In the operations experience, when you add the inbound endpoint and choose the **X509 certificate** authentication mode, select **Add reference** to add the secret reference for the client certificate and private key. The operations experience offers two options:

- **Create a new secret**: uploads the certificate and private key files to Azure Key Vault and synchronizes them to the cluster as a synced secret.
- **Add from Azure Key Vault**: synchronizes existing Key Vault secrets to the cluster.

The operations experience saves the certificate and key references in a single synced secret resource on the cluster, and you give that synced secret a name.

To learn more, see [Sync a client certificate and private key for mutual TLS](../secure-iot-ops/howto-manage-secrets.md#sync-a-client-certificate-and-private-key-for-mutual-tls).


# [Azure CLI](#tab/cli)


1. Make sure the client certificate and private key are stored as secrets in Azure Key Vault. To learn more, see [Sync a client certificate and private key for mutual TLS](../secure-iot-ops/howto-manage-secrets.md#sync-a-client-certificate-and-private-key-for-mutual-tls).

1. Create a single synced secret on the cluster that references both Key Vault secrets. The following example creates a synced secret named `my-endpoint-cert` that maps the Key Vault secrets `my-kv-client-cert` and `my-kv-client-key` to the keys `certificate` and `privateKey`:

    ```azurecli
    az iot ops secretsync secret set \
      --instance <your-instance-name> \
      --resource-group <your-resource-group> \
      --name my-endpoint-cert \
      --secret target=certificate source=my-kv-client-cert \
      --secret target=privateKey source=my-kv-client-key
    ```

    For more information, see [az iot ops secretsync secret set](https://learn.microsoft.com/cli/azure/iot/ops/secretsync/secret#az-iot-ops-secretsync-secret-set).

1. Use the [az iot ops ns device endpoint inbound add](https://learn.microsoft.com/cli/azure/iot/ops/ns/device/endpoint/inbound/add) command with the `--cert-ref` and `--key-ref` parameters to reference the synced secret name and key for the certificate and private key (for example, `my-endpoint-cert/certificate` and `my-endpoint-cert/privateKey`). To include intermediate certificates, add `--icr my-endpoint-cert/intermediateCerts`.

> **Note:**
> This Azure CLI flow partially overlaps with the operations experience. The operations experience can also upload the certificate and private key to Azure Key Vault as part of the same step, while the Azure CLI flow assumes the secrets already exist in Azure Key Vault.


# [Bicep](#tab/bicep)


1. Make sure the client certificate and private key are stored as secrets in Azure Key Vault, and that a synced secret on the cluster references both Key Vault secrets. You can create the synced secret either through the operations experience or by using the Azure CLI. To learn more, see [Sync a client certificate and private key for mutual TLS](../secure-iot-ops/howto-manage-secrets.md#sync-a-client-certificate-and-private-key-for-mutual-tls).

1. Modify the `authentication` block of your Bicep configuration for the device inbound endpoint to reference the synced secret on the cluster. The `certificateSecretName` and `keySecretName` values use the form `<synced-secret-name>/<key>`:

    ```bicep
    authentication: {
        method: 'Certificate'
            x509Credentials: {
                certificateSecretName: 'my-endpoint-cert/certificate'
                keySecretName: 'my-endpoint-cert/privateKey'
            }
    }
    ```


---

## Create an asset

To define an asset that publishes data points from the HTTP endpoint, follow these steps:

# [Operations experience](#tab/portal)

1. In the operations experience web UI, select **Assets** in the left navigation pane. Then select **Create asset**.

1. Select the inbound endpoint for the connector for HTTP/REST that you created in the previous section.

1. Enter a name for your asset, such as `my-http-source`.

1. Add any custom properties you want to associate with the asset. For example, you might add a property to indicate the manufacturer of the camera. Select **Next** to continue.

A dataset defines where the connector sends the data it collects from a collection of data points. An HTTP/REST asset can have multiple datasets. To create a dataset:

1. Select **Create dataset**.

1. Enter the details for the dataset such as its name, data source, sampling interval, and destination. For HTTP/REST assets, the data source is the path on the REST endpoint. For HTTP/REST assets, the destination is either an MQTT topic or a [broker state store](../develop-edge-apps/overview-state-store.md) key. For example:

    Screenshot that shows how to create a dataset in the operations experience.

    To transform the incoming data, add the URL of a WebAssembly (WASM) module in the **Transform** field. To learn more, see [Transform incoming data](#transform-incoming-data).

1. Select **Create and next** to create the dataset.

    > **Tip:**
    > Use the **Manage default settings** option to configure default dataset settings such as the sampling interval.

1. On the **Review** page, review the details of the asset and select **Create** to create the asset. After a few minutes, the asset is listed on the **Assets** page:

    Screenshot that shows the list of assets.

# [Azure CLI](#tab/cli)

Run the following commands:

```azurecli
az iot ops ns asset rest create --name myrestasset --instance {your instance name} -g {your resource group name} --device rest-http-connector-cli --endpoint rest-http-connector-0

az iot ops ns asset rest dataset add --asset myrestasset --instance {your instance name} -g {your resource group name} --name weatherdata --data-source "/api/weather" --dest topic="azure-iot-operations/data/erp" retain=Never qos=Qos1 ttl=3600 --sampling-int 30000
```

For more information, see [az iot ops ns asset rest](https://learn.microsoft.com/cli/azure/iot/ops/ns/asset/rest).

# [Bicep](#tab/bicep)

Deploy the following Bicep template to create an asset that publishes messages from the device shown previously to an MQTT topic. The data source of the dataset defines the path on the REST endpoint to query. Replace the placeholders `<AIO_NAMESPACE_NAME>` and `<CUSTOM_LOCATION_NAME>` with your Azure IoT Operations namespace name and custom location name respectively:

```bicep
param adrNamespaceName string = '<AIO_NAMESPACE_NAME>'
param customLocationName string = '<CUSTOM_LOCATION_NAME>'

resource adrNamespace 'Microsoft.DeviceRegistry/namespaces@2026-04-01' existing = {
  name: adrNamespaceName
}

resource customLocation 'Microsoft.ExtendedLocation/customLocations@2021-08-31-preview' existing = {
  name: customLocationName
}

resource asset 'Microsoft.DeviceRegistry/namespaces/assets@2026-04-01' = {
  name: 'myrestasset'
  parent: adrNamespace
  location: resourceGroup().location
  extendedLocation: {
    type: 'CustomLocation'
    name: customLocation.id
  }
  properties: {
    displayName: 'myrestasset'
    description: 'An example HTTP asset'
    enabled: true

    deviceRef: {
      deviceName: 'http-connector'
      endpointName: 'http-connector-0'
    }

    defaultDatasetsConfiguration: '{}'
    defaultEventsConfiguration: '{}'

    datasets: [
      {
        name: 'weatherdata'
        dataSource: '/api/weather'
        datasetConfiguration: '{"samplingIntervalInMilliseconds":20000}'
        destinations: [
          {
            target: 'Mqtt'
            configuration: {
              topic: 'azure-iot-operations/data/erp'
              qos: 'Qos1'
              retain: 'Never'
              ttl: 3600
            }
          }
        ]
      }
    ]
  }
}

```

---

## Transform incoming data


To transform the incoming data by using a WASM module and graph, complete the following steps:

1. Develop a WASM module to perform the custom transformation. For more information, see [Develop WebAssembly (WASM) modules](../develop-edge-apps/howto-build-wasm-modules.md).

1. Configure your transformation graph. For more information, see [Configure WebAssembly (WASM) graph definitions](../develop-edge-apps/howto-configure-wasm-graph-definitions.md).

1. Deploy both the module and graph to your container registry. For more information, see [Deploy WebAssembly (WASM) modules and graph definitions](../develop-edge-apps/howto-deploy-wasm-graph-definitions.md).

1. Set up authentication and connection details so Azure IoT Operations can access the container registry.

1. Configure your asset's dataset with the URL of the deployed WASM graph in the **Transform** field:

    Screenshot that shows how to add a WASM transform to a dataset.

A data transformation in the connector only requires a [single map operator](../develop-edge-apps/howto-build-wasm-modules.md#create-a-new-graph-with-custom-wasm-modules), but WASM graphs are fully supported with the following restrictions:

- The graph must have a single `source` node and a single `sink` node.
- The graph must consume and emit the `DataModel::Message` datatype.
- The graph must be stateless. Currently, this restriction means that accumulate operators aren't supported.
