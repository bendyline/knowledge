---
author: dominicbetts
ms.author: dobett
ms.service: azure-iot
ms.topic: include
ms.date: 06/06/2023
---

[Browse code](https://github.com/Azure/azure-iot-sdk-csharp/tree/main/iothub/device/samples/solutions/PnpDeviceSamples/Thermostat)


>**Important:**
>This article includes steps to connect a device using a shared access signature, also called symmetric key authentication. This authentication method is convenient for testing and evaluation, but authenticating a device using X.509 certificates is a more secure approach. To learn more, see [Security best practices for IoT solutions > Connection security](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot/iot-overview-security.md#connection-security).


## Prerequisites

To complete the steps in this article, you need the following resources:


- An active Azure subscription. If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

- An IoT Central application created from the **Custom application** template. To learn more, see [Create an IoT Central application](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-central/core/howto-create-iot-central-application.md) and [How do I get information about my application?](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-central/core/howto-get-app-info.md)


- A development machine with [Visual Studio (Community, Professional, or Enterprise)](https://visualstudio.microsoft.com/downloads/).

- A local copy of the [Microsoft Azure IoT SDK for C# (.NET)](https://github.com/Azure/azure-iot-sdk-csharp) GitHub repository that contains the sample code. Use this link to download a copy of the repository: [Download ZIP](https://github.com/Azure/azure-iot-sdk-csharp/archive/main.zip). Then unzip the file to a suitable location on your local machine.

## Review the code

In the copy of the Microsoft Azure IoT SDK for C# repository you downloaded previously, open the *azure-iot-sdk-csharp-main\azureiot.sln* solution file in Visual Studio. In **Solution Explorer**, expand the *PnpDeviceSamples > TemperatureController* folder and open the *Program.cs* and *TemperatureControllerSample.cs* files to view the code for this sample.

The sample implements the multiple-component [Temperature Controller](https://github.com/Azure/opendigitaltwins-dtdl/blob/master/DTDL/v2/samples/TemperatureController.json) Digital Twin Definition Language model.

When you run the sample to connect to IoT Central, it uses the Device Provisioning Service (DPS) to register the device and generate a connection string. The sample retrieves the DPS connection information it needs from the environment.

In *Program.cs*, the `Main` method calls `SetupDeviceClientAsync` to:

* Use the model ID `dtmi:com:example:TemperatureController;2` when it provisions the device with DPS. IoT Central uses the model ID to identify or generate the device template for this device. To learn more, see [Assign a device to a device template](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-central/core/concepts-device-templates.md#assign-a-device-to-a-device-template).
* Create a **DeviceClient** instance to connect to IoT Central.

```csharp
private static async Task<DeviceClient> SetupDeviceClientAsync(Parameters parameters, CancellationToken cancellationToken)
{
  DeviceClient deviceClient;
  switch (parameters.DeviceSecurityType.ToLowerInvariant())
  {
    case "dps":
      DeviceRegistrationResult dpsRegistrationResult = await ProvisionDeviceAsync(parameters, cancellationToken);
      var authMethod = new DeviceAuthenticationWithRegistrySymmetricKey(dpsRegistrationResult.DeviceId, parameters.DeviceSymmetricKey);
      deviceClient = InitializeDeviceClient(dpsRegistrationResult.AssignedHub, authMethod);
      break;

    case "connectionstring":
      // ...

    default:
      // ...
  }
  return deviceClient;
}
```

The main method then creates a **TemperatureControllerSample** instance and calls the `PerformOperationsAsync` method to handle the interactions with IoT Central.

In *TemperatureControllerSample.cs*, the `PerformOperationsAsync` method:

* Sets a handler for the **reboot** command on the default component.
* Sets handlers for the **getMaxMinReport** commands on the two thermostat components.
* Sets handlers to receive target temperature property updates on the two thermostat components.
* Sends initial device information property updates.
* Periodically sends temperature telemetry from the two thermostat components.
* Periodically sends working set telemetry from the default component.
* Sends the maximum temperature since the last reboot whenever a new maximum temperature is reached in the two thermostat components.

```csharp
public async Task PerformOperationsAsync(CancellationToken cancellationToken)
{
  await _deviceClient.SetMethodHandlerAsync("reboot", HandleRebootCommandAsync, _deviceClient, cancellationToken);

  // For a component-level command, the command name is in the format "<component-name>*<command-name>".
  await _deviceClient.SetMethodHandlerAsync("thermostat1*getMaxMinReport", HandleMaxMinReportCommand, Thermostat1, cancellationToken);
  await _deviceClient.SetMethodHandlerAsync("thermostat2*getMaxMinReport", HandleMaxMinReportCommand, Thermostat2, cancellationToken);

  await _deviceClient.SetDesiredPropertyUpdateCallbackAsync(SetDesiredPropertyUpdateCallback, null, cancellationToken);
  _desiredPropertyUpdateCallbacks.Add(Thermostat1, TargetTemperatureUpdateCallbackAsync);
  _desiredPropertyUpdateCallbacks.Add(Thermostat2, TargetTemperatureUpdateCallbackAsync);

  await UpdateDeviceInformationAsync(cancellationToken);
  await SendDeviceSerialNumberAsync(cancellationToken);

  bool temperatureReset = true;
  _maxTemp[Thermostat1] = 0d;
  _maxTemp[Thermostat2] = 0d;

  while (!cancellationToken.IsCancellationRequested)
  {
    if (temperatureReset)
    {
      // Generate a random value between 5.0°C and 45.0°C for the current temperature reading for each "Thermostat" component.
      _temperature[Thermostat1] = Math.Round(s_random.NextDouble() * 40.0 + 5.0, 1);
      _temperature[Thermostat2] = Math.Round(s_random.NextDouble() * 40.0 + 5.0, 1);
    }

    await SendTemperatureAsync(Thermostat1, cancellationToken);
    await SendTemperatureAsync(Thermostat2, cancellationToken);
    await SendDeviceMemoryAsync(cancellationToken);

    temperatureReset = _temperature[Thermostat1] == 0 && _temperature[Thermostat2] == 0;
    await Task.Delay(5 * 1000);
  }
}
```

The `SendTemperatureAsync` method shows how the device sends the temperature telemetry from a component to IoT Central. The `SendTemperatureTelemetryAsync` method uses the `PnpConvention` class to build the message:

```csharp
private async Task SendTemperatureAsync(string componentName, CancellationToken cancellationToken)
{
  await SendTemperatureTelemetryAsync(componentName, cancellationToken);

  double maxTemp = _temperatureReadingsDateTimeOffset[componentName].Values.Max<double>();
  if (maxTemp > _maxTemp[componentName])
  {
    _maxTemp[componentName] = maxTemp;
    await UpdateMaxTemperatureSinceLastRebootAsync(componentName, cancellationToken);
  }
}

private async Task SendTemperatureTelemetryAsync(string componentName, CancellationToken cancellationToken)
{
  const string telemetryName = "temperature";
  double currentTemperature = _temperature[componentName];
  using Message msg = PnpConvention.CreateMessage(telemetryName, currentTemperature, componentName);

  await _deviceClient.SendEventAsync(msg, cancellationToken);

  if (_temperatureReadingsDateTimeOffset.ContainsKey(componentName))
  {
    _temperatureReadingsDateTimeOffset[componentName].TryAdd(DateTimeOffset.UtcNow, currentTemperature);
  }
  else
  {
    _temperatureReadingsDateTimeOffset.TryAdd(
      componentName,
      new Dictionary<DateTimeOffset, double>
      {
        { DateTimeOffset.UtcNow, currentTemperature },
      });
  }
}
```

The `UpdateMaxTemperatureSinceLastRebootAsync` method sends a `maxTempSinceLastReboot` property update to IoT Central. This method uses the `PnpConvention` class to create the patch:

```csharp
private async Task UpdateMaxTemperatureSinceLastRebootAsync(string componentName, CancellationToken cancellationToken)
{
  const string propertyName = "maxTempSinceLastReboot";
  double maxTemp = _maxTemp[componentName];
  TwinCollection reportedProperties = PnpConvention.CreateComponentPropertyPatch(componentName, propertyName, maxTemp);

  await _deviceClient.UpdateReportedPropertiesAsync(reportedProperties, cancellationToken);
}
```

The `TargetTemperatureUpdateCallbackAsync` method handles the writable target temperature property update from IoT Central. This method uses the `PnpConvention` class to read the property update message and construct the response:

```csharp
private async Task TargetTemperatureUpdateCallbackAsync(TwinCollection desiredProperties, object userContext)
{
  const string propertyName = "targetTemperature";
  string componentName = (string)userContext;

  bool targetTempUpdateReceived = PnpConvention.TryGetPropertyFromTwin(
    desiredProperties,
    propertyName,
    out double targetTemperature,
    componentName);
  if (!targetTempUpdateReceived)
  {
      return;
  }

  TwinCollection pendingReportedProperty = PnpConvention.CreateComponentWritablePropertyResponse(
      componentName,
      propertyName,
      targetTemperature,
      (int)StatusCode.InProgress,
      desiredProperties.Version);

  await _deviceClient.UpdateReportedPropertiesAsync(pendingReportedProperty);

  // Update Temperature in 2 steps
  double step = (targetTemperature - _temperature[componentName]) / 2d;
  for (int i = 1; i <= 2; i++)
  {
      _temperature[componentName] = Math.Round(_temperature[componentName] + step, 1);
      await Task.Delay(6 * 1000);
  }

  TwinCollection completedReportedProperty = PnpConvention.CreateComponentWritablePropertyResponse(
      componentName,
      propertyName,
      _temperature[componentName],
      (int)StatusCode.Completed,
      desiredProperties.Version,
      "Successfully updated target temperature");

  await _deviceClient.UpdateReportedPropertiesAsync(completedReportedProperty);
}

```

The `HandleMaxMinReportCommand` method handles the commands for the components called from IoT Central:

```csharp
private Task<MethodResponse> HandleMaxMinReportCommand(MethodRequest request, object userContext)
{
    try
    {
        string componentName = (string)userContext;
        DateTime sinceInUtc = JsonConvert.DeserializeObject<DateTime>(request.DataAsJson);
        var sinceInDateTimeOffset = new DateTimeOffset(sinceInUtc);

        if (_temperatureReadingsDateTimeOffset.ContainsKey(componentName))
        {

            Dictionary<DateTimeOffset, double> allReadings = _temperatureReadingsDateTimeOffset[componentName];
            Dictionary<DateTimeOffset, double> filteredReadings = allReadings.Where(i => i.Key > sinceInDateTimeOffset)
                .ToDictionary(i => i.Key, i => i.Value);

            if (filteredReadings != null && filteredReadings.Any())
            {
                var report = new
                {
                    maxTemp = filteredReadings.Values.Max<double>(),
                    minTemp = filteredReadings.Values.Min<double>(),
                    avgTemp = filteredReadings.Values.Average(),
                    startTime = filteredReadings.Keys.Min(),
                    endTime = filteredReadings.Keys.Max(),
                };

                byte[] responsePayload = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(report));
                return Task.FromResult(new MethodResponse(responsePayload, (int)StatusCode.Completed));
            }

            return Task.FromResult(new MethodResponse((int)StatusCode.NotFound));
        }

        return Task.FromResult(new MethodResponse((int)StatusCode.NotFound));
    }
    catch (JsonReaderException ex)
    {
        // ...
    }
}
```

## Get connection information


When you run the sample device application later in this tutorial, you need the following configuration values:

* ID scope: In your IoT Central application, navigate to **Permissions > Device connection groups**. Make a note of the **ID scope** value.
* Group primary key: In your IoT Central application, navigate to **Permissions > Device connection groups > SAS-IoT-Devices**. Make a note of the shared access signature **Primary key** value.

Use the Azure Cloud Shell to generate a device key from the group primary key you retrieved:

```azurecli-interactive
az extension add --name azure-iot
az iot central device compute-device-key --device-id sample-device-01 --pk <the group primary key value>
```

Make a note of the generated device key, you use it later in this tutorial.

> **Note:**
> To run this sample, you don't need to register the device in advance in your IoT Central application. The sample uses the IoT Central capability to [automatically register devices](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-central/core/concepts-device-authentication.md#automatically-register-devices) when they connect for the first time.


## Run the code

> **Note:**
> Set up **TemperatureController** as startup project before you run the code.

To run the sample application in Visual Studio:

1. In **Solution Explorer**, select the **PnpDeviceSamples > TemperatureController** project file.

1. Navigate to **Project > TemperatureController Properties > Debug**. Then add the following environment variables to the project:

    | Name | Value |
    | --- | --- |
    | IOTHUB_DEVICE_SECURITY_TYPE | DPS |
    | IOTHUB_DEVICE_DPS_ENDPOINT | global.azure-devices-provisioning.net |
    | IOTHUB_DEVICE_DPS_ID_SCOPE | The ID scope value you made a note of previously. |
    | IOTHUB_DEVICE_DPS_DEVICE_ID | sample-device-01 |
    | IOTHUB_DEVICE_DPS_DEVICE_KEY | The generated device key value you made a note of previously. |

You can now run and debug the sample in Visual Studio.

The following output shows the device registering and connecting to IoT Central. The sample starts sending telemetry:

```output
[03/31/2021 14:43:17]info: Microsoft.Azure.Devices.Client.Samples.TemperatureControllerSample[0]
      Press Control+C to quit the sample.
[03/31/2021 14:43:17]dbug: Microsoft.Azure.Devices.Client.Samples.TemperatureControllerSample[0]
      Set up the device client.
[03/31/2021 14:43:18]dbug: Microsoft.Azure.Devices.Client.Samples.TemperatureControllerSample[0]
      Initializing via DPS
[03/31/2021 14:43:27]dbug: Microsoft.Azure.Devices.Client.Samples.TemperatureControllerSample[0]
      Set handler for 'reboot' command.
[03/31/2021 14:43:27]dbug: Microsoft.Azure.Devices.Client.Samples.TemperatureControllerSample[0]
      Connection status change registered - status=Connected, reason=Connection_Ok.
[03/31/2021 14:43:28]dbug: Microsoft.Azure.Devices.Client.Samples.TemperatureControllerSample[0]
      Set handler for "getMaxMinReport" command.
[03/31/2021 14:43:28]dbug: Microsoft.Azure.Devices.Client.Samples.TemperatureControllerSample[0]
      Set handler to receive 'targetTemperature' updates.
[03/31/2021 14:43:28]dbug: Microsoft.Azure.Devices.Client.Samples.TemperatureControllerSample[0]
      Property: Update - component = 'deviceInformation', properties update is complete.
[03/31/2021 14:43:28]dbug: Microsoft.Azure.Devices.Client.Samples.TemperatureControllerSample[0]
      Property: Update - { "serialNumber": "SR-123456" } is complete.
[03/31/2021 14:43:29]dbug: Microsoft.Azure.Devices.Client.Samples.TemperatureControllerSample[0]
      Telemetry: Sent - component="thermostat1", { "temperature": 34.2 } in °C.
[03/31/2021 14:43:29]dbug: Microsoft.Azure.Devices.Client.Samples.TemperatureControllerSample[0]
      Property: Update - component="thermostat1", { "maxTempSinceLastReboot": 34.2 } in °C is complete.
[03/31/2021 14:43:29]dbug: Microsoft.Azure.Devices.Client.Samples.TemperatureControllerSample[0]
      Telemetry: Sent - component="thermostat2", { "temperature": 25.1 } in °C.
[03/31/2021 14:43:29]dbug: Microsoft.Azure.Devices.Client.Samples.TemperatureControllerSample[0]
      Property: Update - component="thermostat2", { "maxTempSinceLastReboot": 25.1 } in °C is complete.
[03/31/2021 14:43:29]dbug: Microsoft.Azure.Devices.Client.Samples.TemperatureControllerSample[0]
      Telemetry: Sent - {"workingSet":31412} in KB.
```


As an operator in your Azure IoT Central application, you can:

* View the telemetry sent by the two thermostat components on the **Overview** page:

    Screenshot that shows the device overview page.

* View the device properties on the **About** page. This page shows the properties from the device information component and the two thermostat components:

    Screenshot that shows the device properties view.

## Customize the device template

As a solution developer, you can customize the device template that IoT Central created automatically when the temperature controller device connected.

To add a cloud property to store the customer name associated with the device:

1. In your IoT Central application, navigate to the **Temperature Controller** device template on the **Device templates** page.

1. In the **Temperature Controller** model, select **+Add capability**.

1. Enter *Customer name* as the **Display name**, select **Cloud property** as the **capability type**, expand the entry and choose **String** as the **Schema**. Then select **Save**.

To customize how the **Get Max-Min report** commands display in your IoT Central application:

1. Navigate to the **Temperature Controller** device template on the **Device templates** page.

1. For **getMaxMinReport (thermostat1)**, replace *Get Max-Min report.* with *Get thermostat1 status report*.

1. For **getMaxMinReport (thermostat2)**, replace *Get Max-Min report.* with *Get thermostat2 status report*.

1. Select **Save**.

To customize how the **Target Temperature** writable properties display in your IoT Central application:

1. Navigate to the **Temperature Controller** device template on the **Device templates** page.

1. For **targetTemperature (thermostat1)**, replace *Target Temperature* with *Target Temperature (1)*.

1. For **targetTemperature (thermostat2)**, replace *Target Temperature* with *Target Temperature (2)*.

1. Select **Save**.

The thermostat components in the **Temperature Controller** model include the **Target Temperature** writable property, the device template includes the **Customer Name** cloud property. Create a view an operator can use to edit these properties:

1. Select **Views** and then select the **Editing device and cloud data** tile.

1. Enter _Properties_ as the form name.

1. Select the **Target Temperature (1)**,  **Target Temperature (2)**, and **Customer Name** properties. Then select **Add section**.

1. Save your changes.

Screenshot that shows a view for updating property values.

## Publish the device template

Before an operator can see and use the customizations you made, you must publish the device template.

From the **Thermostat** device template, select **Publish**. On the **Publish this device template to the application** panel, select **Publish**.

An operator can now use the **Properties** view to update the property values, and call commands called **Get thermostat1 status report** and **Get thermostat2 status report** on the device commands page:

* Update writable property values on the **Properties** page:

    Screenshot that shows updating the device properties.

* Call the commands from the **Commands** page. If you run the status report command, select a date and time for the **Since** parameter before you run it:

    Screenshot that shows calling a command.

    Screenshot that shows a command response.


You can see how the device responds to commands and property updates:

```output
[03/31/2021 14:47:00]dbug: Microsoft.Azure.Devices.Client.Samples.TemperatureControllerSample[0]
      Command: Received - component="thermostat2", generating max, min and avg temperature report since 31/03/2021 06:00:00.
[03/31/2021 14:47:00]dbug: Microsoft.Azure.Devices.Client.Samples.TemperatureControllerSample[0]
      Command: component="thermostat2", MaxMinReport since 31/03/2021 06:00:00: maxTemp=36.4, minTemp=36.4, avgTemp=36.4, startTime=31/03/2021 14:46:33, endTime=31/03/2021 14:46:55

...

[03/31/2021 14:46:36]dbug: Microsoft.Azure.Devices.Client.Samples.TemperatureControllerSample[0]
      Property: Received - component="thermostat1", { "targetTemperature": 67°C }.
[03/31/2021 14:46:36]dbug: Microsoft.Azure.Devices.Client.Samples.TemperatureControllerSample[0]
      Property: Update - component="thermostat1", {"targetTemperature": 67 } in °C is InProgress.
[03/31/2021 14:46:49]dbug: Microsoft.Azure.Devices.Client.Samples.TemperatureControllerSample[0]
      Property: Update - component="thermostat1", {"targetTemperature": 67 } in °C is Completed
[03/31/2021 14:46:49]dbug: Microsoft.Azure.Devices.Client.Samples.TemperatureControllerSample[0]
      Telemetry: Sent - component="thermostat1", { "temperature": 67 } in °C.
```
