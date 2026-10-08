---
title: Export data to Event Hubs
description: Learn how to use the IoT Central data export capability to continuously export your IoT data to Event Hubs
services: iot-central
author: dominicbetts
ms.author: dobett
ms.date: 08/06/2025
ms.topic: how-to
ms.service: azure-iot-central
ms.custom:
  - devx-track-azurecli
  - sfi-ropc-nochange
---

# Export IoT data to Event Hubs

This article describes how to configure data export to send data to the Event Hubs.


Use this feature to continuously export filtered and enriched IoT data from your IoT Central application. Data export pushes changes in near real time to other parts of your cloud solution for warm-path insights, analytics, and storage.

For example, you can:

- Continuously export telemetry, property changes, device connectivity, device lifecycle, device template lifecycle, and audit log data in JSON format in near real time.
- Filter the data streams to export data that matches custom conditions.
- Enrich the data streams with custom values and property values from the device.
- [Transform the data](howto-transform-data-internally.md) streams to modify their shape and content.

> **Tip:**
> When you turn on data export, you get only the data from that moment onward. To retain more historical data, turn on data export early. To manually export data from times when data export was turned off, see [How to use the IoT Central REST API to query devices](howto-query-with-rest-api.md).

> **Note:**
> In some circumstances, it could take up to 60 seconds for the messages to be exported. This time is measured from when IoT Central receives the message from the underlying IoT hub to when the message is delivered to the destination endpoint.

## Prerequisites

To use data export features, you must have the [Data export](howto-manage-users-roles.md) permission.


## Set up an Event Hubs export destination

IoT Central exports data in near real time. The data is in the message body and is in JSON format encoded as UTF-8.

The annotations or system properties bag of the message contains the `iotcentral-device-id`, `iotcentral-application-id`, `iotcentral-message-source`, and `iotcentral-message-type` fields that have the same values as the corresponding fields in the message body.

## Connection options

Event Hubs destinations let you configure the connection with a *connection string* or a [managed identity](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/overview.md).


Managed identities are more secure because:

- You don't store the credentials for your resource in a connection string in your IoT Central application.
- The credentials are automatically tied to the lifetime of your IoT Central application.
- Managed identities automatically rotate their security keys regularly.

IoT Central currently uses [system-assigned managed identities](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/overview.md#managed-identity-types).

When you configure a managed identity, the configuration includes a *scope* and a *role*:

- The scope defines where you can use the managed identity. For example, you can use an Azure resource group as the scope. In this case, both the IoT Central application and the destination must be in the same resource group.
- The role defines what permissions the IoT Central application is granted in the destination service. For example, for an IoT Central application to send data to an event hub, the managed identity needs the **Azure Event Hubs Data Sender** role assignment.

The following video provides more information about system assigned managed identities:

> [!VIDEO https://aka.ms/docs/player?id=f095aa41-1f78-4807-807d-baf5555365eb]

> **Caution:**
> To export to blob storage, don't use the **Storage Account Contributor** as shown in the video. Use the **Storage Blob Data Contributor** role instead.


### Create an Event Hubs destination

# [Managed identity](#tab/managed-identity)

This article shows how to create a managed identity using the Azure CLI. You can also use the Azure portal to create a managed identity.

If you don't have an existing Event Hubs namespace to export to, run the following script in the Azure Cloud Shell bash environment. The script creates a resource group, Event Hubs namespace, and event hub. The script then enables the managed identity for your IoT Central application and assigns the role it needs to access your event hub:

```azurecli-interactive
# Replace the Event Hubs namespace name with your own unique value
EHNS=your-event-hubs-namespace-$RANDOM

# Replace the IoT Central app name with the name of your
# IoT Central application.
CA=your-iot-central-app

EH=exportdata
RG=centralexportresources
LOCATION=eastus

RGID=$(az group create -n $RG --location $LOCATION --query "id" --output tsv)
az eventhubs namespace create --name $EHNS --resource-group $RG -l $LOCATION
az eventhubs eventhub create --name $EH --resource-group $RG --namespace-name $EHNS

# This assumes your IoT Central application is in the 
# default `IOTC` resource group.
az iot central app identity assign --name $CA --resource-group IOTC --system-assigned
PI=$(az iot central app identity show --name $CA --resource-group IOTC --query "principalId" --output tsv)

az role assignment create --assignee $PI --role "Azure Event Hubs Data Sender" --scope $RGID

az role assignment list --assignee $PI --all -o table

echo "Host name: $EHNS.servicebus.windows.net"
echo "Event Hub: $EH"
```

To further secure your event hub and only allow access from trusted services with managed identities, see [Export data to a secure destination on an Azure Virtual Network](howto-connect-secure-vnet.md).

To create the Event Hubs destination in IoT Central on the **Data export** page:

1. Select **+ New destination**.

1. Select **Azure Event Hubs** as the destination type.

1. Select **System-assigned managed identity** as the authorization type.

1. Enter the host name of your Event Hubs resource. Then enter the case-sensitive event hub name. A host name looks like: `contoso-waste.servicebus.windows.net`.

1. Select **Save**.

If you don't see data arriving in your destination service, see [Troubleshoot issues with data exports from your Azure IoT Central application](troubleshooting.md).

# [Connection string](#tab/connection-string)

If you don't have an existing Event Hubs namespace to export to, run the following script in the Azure Cloud Shell bash environment. The script creates a resource group, Event Hubs namespace, and event hub. It then prints the connection string to use when you configure the data export in IoT Central:

```azurecli-interactive
# Replace the Event Hubs namespace name with your own unique value
EHNS=your-event-hubs-namespace-$RANDOM
EH=exportdata
RG=centralexportresources
LOCATION=eastus

az group create -n $RG --location $LOCATION
az eventhubs namespace create --name $EHNS --resource-group $RG -l $LOCATION
az eventhubs eventhub create --name $EH --resource-group $RG --namespace-name $EHNS
az eventhubs eventhub authorization-rule create --eventhub-name $EH --resource-group $RG --namespace-name $EHNS --name SendRule --rights Send

CS=$(az eventhubs eventhub authorization-rule keys list --eventhub-name $EH --resource-group $RG --namespace-name $EHNS --name SendRule --query "primaryConnectionString" -o tsv)

echo "Event hub connection string: $CS"
```

To create the Event Hubs destination in IoT Central on the **Data export** page:

1. Select **+ New destination**.

1. Select **Azure Event Hubs** as the destination type.

1. Select **Connection string** as the authorization type.

1. Paste in the connection string for your Event Hubs resource, and enter the case-sensitive event hub name if necessary.

1. Select **Save**.

---


## Set up a data export

Now that you have a destination to export your data to, set up data export in your IoT Central application:

1. Sign in to your IoT Central application.

1. In the left pane, select **Data export**.

    > **Tip:**
    > If you don't see **Data export** in the left pane, then you don't have permissions to configure data export in your app. Talk to an administrator to set up data export.

1. Select **+ New export**.

1. Enter a display name for your new export, and make sure the data export is **Enabled**.

1. Choose the type of data to export. The following table lists the supported data export types:

    | Data type | Description | Data format |
    | :--- | :--- | :--- |
    | Telemetry | Export telemetry messages from devices in near-real time. Each exported message contains the full contents of the original device message, normalized. | [Telemetry format](#telemetry-format) |
    | Property changes | Export changes to device and cloud properties in near-real time. For read-only device properties, changes to the reported values are exported. For read-write properties, both reported and desired values are exported. | [Property changes format](#property-changes-format) |
    | Device connectivity | Export device connected and disconnected events. | [Device connectivity changes format](#device-connectivity-changes-format) |
    | Device lifecycle | Export device registered, deleted, provisioned, enabled, disabled, displayNameChanged, and deviceTemplateChanged events. | [Device lifecycle changes format](#device-lifecycle-changes-format) |
    | Device template lifecycle | Export published device template changes including created, updated, and deleted. | [Device template lifecycle changes format](#device-template-lifecycle-changes-format) |
    | Audit logs | Logs of user-initiated updates to entities in the application. To learn more, see [Use audit logs to track activity in your IoT Central application](howto-use-audit-logs.md) | [Audit log format](#audit-log-format) |

1. Optionally, add filters to reduce the amount of data exported. There are different types of filter available for each data export type:
    <a name="DataExportFilters"></a>

    | Type of data | Available filters |
    | --- | --- |
    | Telemetry | <ul><li>Filter by device name, device ID, device template, and if the device is simulated</li><li>Filter stream to only contain telemetry that meets the filter conditions</li><li>Filter stream to only contain telemetry from devices with properties matching the filter conditions</li><li>Filter stream to only contain telemetry that has *message properties* meeting the filter condition. *Message properties* (also known as *application properties*) are sent in a bag of key-value pairs on each telemetry message. To create a message property filter, enter the message property key you're looking for, and specify a condition. Only telemetry messages with properties that match the specified filter condition are exported. To learn more about application properties, see [IoT Hub documentation](../../iot-hub/iot-hub-devguide-messages-construct.md). </li></ul> |
    | Property changes | <ul><li>Filter by device name, device ID, device template, and if the device is simulated</li><li>Filter stream to only contain property changes that meet the filter conditions</li></ul> |
    | Device connectivity | <ul><li>Filter by device name, device ID, device template, organizations, and if the device is simulated</li><li>Filter stream to only contain changes from devices with properties matching the filter conditions</li></ul> |
    | Device lifecycle | <ul><li>Filter by device name, device ID, device template, and if the device is provisioned, enabled, or simulated</li><li>Filter stream to only contain changes from devices with properties matching the filter conditions</li></ul> |
    | Device template lifecycle | <ul><li>Filter by device template</li></ul> |
    | Audit logs | N/A |

1. Optionally, enrich exported messages with extra key-value pair metadata. The following enrichments are available for the telemetry, property changes, device connectivity, and device lifecycle data export types:
<a name="DataExportEnrichments"></a>
    - **Custom string**: Adds a custom static string to each message. Enter any key, and enter any string value.
    - **Property**, which adds to each message:
       - Device metadata such as device name, device template name, enabled, organizations, provisioned, and simulated.
       - The current device reported property or cloud property value to each message. If the exported message is from a device that doesn't have the specified property, the exported message doesn't get the enrichment.

Configure the export destination:

1. Select **+ Destination** to add a destination that you've already created or select **Create a new one**.

1. To transform your data before it's exported, select **+ Transform**. To learn more, see [Transform data inside your IoT Central application for export](howto-transform-data-internally.md).

1. Select **+ Destination** to add up to five destinations to a single export.

1. When you've finished setting up your export, select **Save**. After a few minutes, your data appears in your destinations.

## Monitor your export

In IoT Central, the **Data export** page lets you check the status of your exports. You can also use [Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/overview) to see how much data you're exporting and any export errors. You can access export and device health metrics in charts in the Azure portal by using, the REST API, queries in PowerShell, or the Azure CLI. Currently, you can monitor the following data export metrics in Azure Monitor:

- Number of messages incoming to export before filters are applied.
- Number of messages that pass through filters.
- Number of messages successfully exported to destinations.
- Number of errors found.

To learn more, see [Monitor application health](howto-manage-and-monitor-iot-central.md#monitor-application-health).

## Data formats

The following sections describe the formats of the exported data:

### Telemetry format

Each exported message contains a normalized form of the full message the device sent in the message body. The message is in JSON format and encoded as UTF-8. Information in each message includes:

- `applicationId`: The ID of the IoT Central application.
- `messageSource`: The source for the message - `telemetry`.
- `deviceId`:  The ID of the device that sent the telemetry message.
- `schema`: The name and version of the payload schema.
- `templateId`: The ID of the device template assigned to the device.
- `enqueuedTime`: The time at which IoT Central received this message.
- `enrichments`: Any enrichments set up on the export.
- `module`: The IoT Edge module that sent this message. This field only appears if the message came from an IoT Edge module.
- `component`: The component that sent this message. This field only appears if the capabilities sent in the message were modeled as a component in the device template
- `messageProperties`: Other properties that the device sent with the message. These properties are sometimes referred to as *application properties*. To learn more, see [IoT Hub documentation](../../iot-hub/iot-hub-devguide-messages-construct.md).


#### Message properties

Telemetry messages have properties for metadata and the telemetry payload. The previous snippet shows examples of system messages such as `deviceId` and `enqueuedTime`. To learn more about the system message properties, see [System properties of device-to-cloud messages](../../iot-hub/iot-hub-devguide-messages-construct.md#system-properties-of-device-to-cloud-messages).

You can add properties to telemetry messages if you need to add custom metadata to your telemetry messages. For example, you need to add a timestamp when the device creates the message.

The following code snippet shows how to add the `iothub-creation-time-utc` property to the message when you create it on the device:

> **Important:**
> The format of this timestamp must be UTC with no timezone information. For example, `2021-04-21T11:30:16Z` is valid, while `2021-04-21T11:30:16-07:00` is invalid.

# [JavaScript](#tab/javascript)

```javascript
async function sendTelemetry(deviceClient, index) {
  console.log('Sending telemetry message %d...', index);
  const msg = new Message(
    JSON.stringify(
      deviceTemperatureSensor.updateSensor().getCurrentTemperatureObject()
    )
  );
  msg.properties.add("iothub-creation-time-utc", new Date().toISOString());
  msg.contentType = 'application/json';
  msg.contentEncoding = 'utf-8';
  await deviceClient.sendEvent(msg);
}
```

# [Java](#tab/java)

```java
private static void sendTemperatureTelemetry() {
  String telemetryName = "temperature";
  String telemetryPayload = String.format("{\"%s\": %f}", telemetryName, temperature);

  Message message = new Message(telemetryPayload);
  message.setContentEncoding(StandardCharsets.UTF_8.name());
  message.setContentTypeFinal("application/json");
  message.setProperty("iothub-creation-time-utc", Instant.now().toString());

  deviceClient.sendEventAsync(message, new MessageIotHubEventCallback(), message);
  log.debug("My Telemetry: Sent - {\"{}\": {}°C} with message Id {}.", telemetryName, temperature, message.getMessageId());
  temperatureReadings.put(new Date(), temperature);
}
```

# [C#](#tab/csharp)

```csharp
private async Task SendTemperatureTelemetryAsync()
{
  const string telemetryName = "temperature";

  string telemetryPayload = $"{{ \"{telemetryName}\": {_temperature} }}";
  using var message = new Message(Encoding.UTF8.GetBytes(telemetryPayload))
  {
      ContentEncoding = "utf-8",
      ContentType = "application/json",
  };
  message.Properties.Add("iothub-creation-time-utc", DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ"));
  await _deviceClient.SendEventAsync(message);
  _logger.LogDebug($"Telemetry: Sent - {{ \"{telemetryName}\": {_temperature}°C }}.");
}
```

# [Python](#tab/python)

```python
async def send_telemetry_from_thermostat(device_client, telemetry_msg):
    msg = Message(json.dumps(telemetry_msg))
    msg.custom_properties["iothub-creation-time-utc"] = datetime.now(timezone.utc).isoformat()
    msg.content_encoding = "utf-8"
    msg.content_type = "application/json"
    print("Sent message")
    await device_client.send_message(msg)
```

---

### Property changes format

Each message or record represents changes to device and cloud properties. Information in the exported message includes:

- `applicationId`: The ID of the IoT Central application.
- `messageSource`: The source for the message - `properties`.
- `messageType`: Either `cloudPropertyChange`, `devicePropertyDesiredChange`,  or `devicePropertyReportedChange`.
- `deviceId`:  The ID of the device that sent the telemetry message.
- `schema`: The name and version of the payload schema.
- `enqueuedTime`: The time at which IoT Central detected this change.
- `templateId`: The ID of the device template assigned to the device.
- `properties`: An array of properties that changed, including the names of the properties and values that changed. The component and module information is included if the property is modeled within a component or an IoT Edge module.
- `enrichments`: Any enrichments set up on the export.



### Device connectivity changes format

Each message or record represents a connectivity event from a single device. Information in the exported message includes:

- `applicationId`: The ID of the IoT Central application.
- `messageSource`: The source for the message - `deviceConnectivity`.
- `messageType`: Either `connected` or `disconnected`.
- `deviceId`:  The ID of the device that was changed.
- `schema`: The name and version of the payload schema.
- `templateId`: The ID of the device template assigned to the device.
- `enqueuedTime`: The time at which this change occurred in IoT Central.
- `enrichments`: Any enrichments set up on the export.



### Device lifecycle changes format

Each message or record represents one change to a single device. Information in the exported message includes:

- `applicationId`: The ID of the IoT Central application.
- `messageSource`: The source for the message - `deviceLifecycle`.
- `messageType`: The type of change that occurred. One of: `registered`, `deleted`, `provisioned`, `enabled`, `disabled`, `displayNameChanged`, and `deviceTemplateChanged`.
- `deviceId`:  The ID of the device that was changed.
- `schema`: The name and version of the payload schema.
- `templateId`: The ID of the device template assigned to the device.
- `enqueuedTime`: The time at which this change occurred in IoT Central.
- `enrichments`: Any enrichments set up on the export.



### Device template lifecycle changes format

Each message or record represents one change to a single published device template. Information in the exported message includes:

- `applicationId`: The ID of the IoT Central application.
- `messageSource`: The source for the message - `deviceTemplateLifecycle`.
- `messageType`: Either `created`, `updated`, or `deleted`.
- `schema`: The name and version of the payload schema.
- `templateId`: The ID of the device template assigned to the device.
- `enqueuedTime`: The time at which this change occurred in IoT Central.
- `enrichments`: Any enrichments set up on the export.


### Audit log format

Each audit log message represents a user-initiated change to an auditable entity inside the IoT Central application. Information in the exported message includes:

- `actor`: Information about the user who modified the entity.
- `applicationId`: The ID of the IoT Central application.
- `messageSource`: The source for the message - `audit`.
- `messageType`: The type of change that occurred. One of: `updated`, `created`, `deleted`.
- `updated`: Only present if `messageType` is `updated`. Provides more detail about the update.
- `resource`: Details of the modified entity.
- `schema`: The name and version of the payload schema.
- `deviceId`:  The ID of the device that was changed.
- `enqueuedTime`: The time at which this change occurred in IoT Central.
- `enrichments`: Any enrichments set up on the export.


For Event Hubs, IoT Central exports new messages data to your event hub in near real time. In the user properties (also referred to as application properties) of each message, the `iotcentral-device-id`, `iotcentral-application-id`, `iotcentral-message-source`, and `iotcentral-message-type` are included automatically.

## Next steps

Now that you know how to export to Event Hubs, a suggested next step is to learn how to [export IoT data to Azure Data Explorer](howto-export-to-azure-data-explorer.md).
