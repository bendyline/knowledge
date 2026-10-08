---
author: dominicbetts
ms.author: dobett
ms.service: azure-iot
ms.topic: include
ms.date: 06/06/2023
---

[Browse code](https://github.com/Azure/azure-iot-sdk-node/tree/main/device/samples)


>**Important:**
>This article includes steps to connect a device using a shared access signature, also called symmetric key authentication. This authentication method is convenient for testing and evaluation, but authenticating a device using X.509 certificates is a more secure approach. To learn more, see [Security best practices for IoT solutions > Connection security](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot/iot-overview-security.md#connection-security).


## Prerequisites

To complete the steps in this article, you need the following resources:


- An active Azure subscription. If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

- An IoT Central application created from the **Custom application** template. To learn more, see [Create an IoT Central application](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-central/core/howto-create-iot-central-application.md) and [How do I get information about my application?](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-central/core/howto-get-app-info.md)


- A development machine with [Node.js](https://nodejs.org/) version 6 or later installed. You can run `node --version` in the command line to check your version. The instructions in this tutorial assume you're running the **node** command at the Windows command prompt. However, you can use Node.js on many other operating systems.

- A local copy of the [Microsoft Azure IoT SDK for Node.js](https://github.com/Azure/azure-iot-sdk-node) GitHub repository that contains the sample code. Use this link to download a copy of the repository: [Download ZIP](https://github.com/Azure/azure-iot-sdk-node/archive/main.zip). Then unzip the file to a suitable location on your local machine.

## Review the code

In the copy of the Microsoft Azure IoT SDK for Node.js you downloaded previously, open the *azure-iot-sdk-node/device/samples/javascript/pnp_temperature_controller.js* file in a text editor.

The sample implements the multiple-component [Temperature Controller](https://github.com/Azure/opendigitaltwins-dtdl/blob/master/DTDL/v2/samples/TemperatureController.json) Digital Twin Definition Language model.

When you run the sample to connect to IoT Central, it uses the Device Provisioning Service (DPS) to register the device and generate a connection string. The sample retrieves the DPS connection information it needs from the command-line environment.

The `main` method:

* Creates a `client` object and sets the `dtmi:com:example:TemperatureController;2` model ID before it opens the connection. IoT Central uses the model ID to identify or generate the device template for this device. To learn more, see [Assign a device to a device template](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-central/core/concepts-device-templates.md#assign-a-device-to-a-device-template).
* Creates command handlers for three commands.
* Starts a loop for each thermostat component to send temperature telemetry every 5 seconds.
* Starts a loop for the default component to send working set size telemetry every 6 seconds.
* Sends the `maxTempSinceLastReboot` property for each thermostat component.
* Sends the device information properties.
* Creates writable properties handlers for the three components.

```javascript
async function main() {
  // ...

  // fromConnectionString must specify a transport, coming from any transport package.
  const client = Client.fromConnectionString(deviceConnectionString, Protocol);
  console.log('Connecting using connection string: ' + deviceConnectionString);
  let resultTwin;

  try {
    // Add the modelId here
    await client.setOptions(modelIdObject);
    await client.open();
    console.log('Enabling the commands on the client');
    client.onDeviceMethod(commandNameGetMaxMinReport1, commandHandler);
    client.onDeviceMethod(commandNameGetMaxMinReport2, commandHandler);
    client.onDeviceMethod(commandNameReboot, commandHandler);

    // Send Telemetry after some interval
    let index1 = 0;
    let index2 = 0;
    let index3 = 0;
    intervalToken1 = setInterval(() => {
      const data = JSON.stringify(thermostat1.updateSensor().getCurrentTemperatureObject());
      sendTelemetry(client, data, index1, thermostat1ComponentName).catch((err) => console.log('error ', err.toString()));
      index1 += 1;
    }, 5000);

    intervalToken2 = setInterval(() => {
      const data = JSON.stringify(thermostat2.updateSensor().getCurrentTemperatureObject());
      sendTelemetry(client, data, index2, thermostat2ComponentName).catch((err) => console.log('error ', err.toString()));
      index2 += 1;
    }, 5500);


    intervalToken3 = setInterval(() => {
      const data = JSON.stringify({ workingset: 1 + (Math.random() * 90) });
      sendTelemetry(client, data, index3, null).catch((err) => console.log('error ', err.toString()));
      index3 += 1;
    }, 6000);

    // attach a standard input exit listener
    exitListener(client);

    try {
      resultTwin = await client.getTwin();
      // Only report readable properties
      const patchRoot = helperCreateReportedPropertiesPatch({ serialNumber: serialNumber }, null);
      const patchThermostat1Info = helperCreateReportedPropertiesPatch({
        maxTempSinceLastReboot: thermostat1.getMaxTemperatureValue(),
      }, thermostat1ComponentName);

      const patchThermostat2Info = helperCreateReportedPropertiesPatch({
        maxTempSinceLastReboot: thermostat2.getMaxTemperatureValue(),
      }, thermostat2ComponentName);

      const patchDeviceInfo = helperCreateReportedPropertiesPatch({
        manufacturer: 'Contoso Device Corporation',
        model: 'Contoso 47-turbo',
        swVersion: '10.89',
        osName: 'Contoso_OS',
        processorArchitecture: 'Contoso_x86',
        processorManufacturer: 'Contoso Industries',
        totalStorage: 65000,
        totalMemory: 640,
      }, deviceInfoComponentName);

      // the below things can only happen once the twin is there
      updateComponentReportedProperties(resultTwin, patchRoot, null);
      updateComponentReportedProperties(resultTwin, patchThermostat1Info, thermostat1ComponentName);
      updateComponentReportedProperties(resultTwin, patchThermostat2Info, thermostat2ComponentName);
      updateComponentReportedProperties(resultTwin, patchDeviceInfo, deviceInfoComponentName);
      desiredPropertyPatchListener(resultTwin, [thermostat1ComponentName, thermostat2ComponentName, deviceInfoComponentName]);
    } catch (err) {
      console.error('could not retrieve twin or report twin properties\n' + err.toString());
    }
  } catch (err) {
    console.error('could not connect Plug and Play client or could not attach interval function for telemetry\n' + err.toString());
  }
}
```

The `provisionDevice` function shows how the device uses DPS to register and connect to IoT Central. The payload includes the model ID that IoT Central uses to [Assign a device to a device template](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-central/core/concepts-device-templates.md#assign-a-device-to-a-device-template):

```javascript
async function provisionDevice(payload) {
  var provSecurityClient = new SymmetricKeySecurityClient(registrationId, symmetricKey);
  var provisioningClient = ProvisioningDeviceClient.create(provisioningHost, idScope, new ProvProtocol(), provSecurityClient);

  if (payload) {
    provisioningClient.setProvisioningPayload(payload);
  }

  try {
    let result = await provisioningClient.register();
    deviceConnectionString = 'HostName=' + result.assignedHub + ';DeviceId=' + result.deviceId + ';SharedAccessKey=' + symmetricKey;
    console.log('registration succeeded');
    console.log('assigned hub=' + result.assignedHub);
    console.log('deviceId=' + result.deviceId);
    console.log('payload=' + JSON.stringify(result.payload));
  } catch (err) {
    console.error("error registering device: " + err.toString());
  }
}
```

The `sendTelemetry` function shows how the device sends the temperature telemetry to IoT Central. For telemetry from components, it adds a property called `$.sub` with the component name:

```javascript
async function sendTelemetry(deviceClient, data, index, componentName) {
  if componentName) {
    console.log('Sending telemetry message %d from component: %s ', index, componentName);
  } else {
    console.log('Sending telemetry message %d from root interface', index);
  }
  const msg = new Message(data);
  if (componentName) {
    msg.properties.add(messageSubjectProperty, componentName);
  }
  msg.contentType = 'application/json';
  msg.contentEncoding = 'utf-8';
  await deviceClient.sendEvent(msg);
}
```

The `main` method uses a helper method called `helperCreateReportedPropertiesPatch` to create property update messages. This method takes an optional parameter to specify the component sending the property:

```javascript
const helperCreateReportedPropertiesPatch = (propertiesToReport, componentName) => {
  let patch;
  if (!!(componentName)) {
    patch = { };
    propertiesToReport.__t = 'c';
    patch[componentName] = propertiesToReport;
  } else {
    patch = { };
    patch = propertiesToReport;
  }
  if (!!(componentName)) {
    console.log('The following properties will be updated for component: ' + componentName);
  } else {
    console.log('The following properties will be updated for root interface.');
  }
  console.log(patch);
  return patch;
};
```

The `main` method uses the following method to handle updates to writable properties from IoT Central. Notice how the method builds the response with the version and status code:

```javascript
const desiredPropertyPatchListener = (deviceTwin, componentNames) => {
  deviceTwin.on('properties.desired', (delta) => {
    console.log('Received an update for device with value: ' + JSON.stringify(delta));
    Object.entries(delta).forEach(([key, values]) => {
      const version = delta.$version;
      if (!!(componentNames) && componentNames.includes(key)) { // then it is a component we are expecting
        const componentName = key;
        const patchForComponents = { [componentName]: {} };
        Object.entries(values).forEach(([propertyName, propertyValue]) => {
          if (propertyName !== '__t' && propertyName !== '$version') {
            console.log('Will update property: ' + propertyName + ' to value: ' + propertyValue + ' of component: ' + componentName);
            const propertyContent = { value: propertyValue };
            propertyContent.ac = 200;
            propertyContent.ad = 'Successfully executed patch';
            propertyContent.av = version;
            patchForComponents[componentName][propertyName] = propertyContent;
          }
        });
        updateComponentReportedProperties(deviceTwin, patchForComponents, componentName);
      }
      else if  (key !== '$version') { // individual property for root
        const patchForRoot = { };
        console.log('Will update property: ' + key + ' to value: ' + values + ' for root');
        const propertyContent = { value: values };
        propertyContent.ac = 200;
        propertyContent.ad = 'Successfully executed patch';
        propertyContent.av = version;
        patchForRoot[key] = propertyContent;
        updateComponentReportedProperties(deviceTwin, patchForRoot, null);
      }
    });
  });
};
```

The `main` method uses the following methods to handle commands from IoT Central:

```javascript
const commandHandler = async (request, response) => {
  helperLogCommandRequest(request);
  switch (request.methodName) {
  case commandNameGetMaxMinReport1: {
    await sendCommandResponse(request, response, 200, thermostat1.getMaxMinReportObject());
    break;
  }
  case commandNameGetMaxMinReport2: {
    await sendCommandResponse(request, response, 200, thermostat2.getMaxMinReportObject());
    break;
  }
  case commandNameReboot: {
    await sendCommandResponse(request, response, 200, 'reboot response');
    break;
  }
  default:
    await sendCommandResponse(request, response, 404, 'unknown method');
    break;
  }
};

const sendCommandResponse = async (request, response, status, payload) => {
  try {
    await response.send(status, payload);
    console.log('Response to method: ' + request.methodName + ' sent successfully.' );
  } catch (err) {
    console.error('An error occurred when sending a method response:\n' + err.toString());
  }
};
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

To run the sample application, open a command-line environment and navigate to the folder *azure-iot-sdk-node/device/samples/javascript* folder that contains the *pnp_temperature_controller.js* sample file.


Set the environment variables to configure the sample. The following snippet shows how set the environment variables at the Windows command prompt. If you're using a **bash** shell, replace the `set` commands with `export` commands:

```cmd
set IOTHUB_DEVICE_SECURITY_TYPE=DPS
set IOTHUB_DEVICE_DPS_ID_SCOPE=<The ID scope you made a note of previously>
set IOTHUB_DEVICE_DPS_DEVICE_ID=sample-device-01
set IOTHUB_DEVICE_DPS_DEVICE_KEY=<The generated device key you made a note of previously>
set IOTHUB_DEVICE_DPS_ENDPOINT=global.azure-devices-provisioning.net
```


Install the required packages:

```cmd/sh
npm install
```

Run the sample:

```cmd/sh
node pnp_temperature_controller.js
```

The following output shows the device registering and connecting to IoT Central. The sample then sends the `maxTempSinceLastReboot` property from the two thermostat components before it starts sending telemetry:

```output
registration succeeded
assigned hub=iotc-....azure-devices.net
deviceId=sample-device-01
payload=undefined
Connecting using connection string: HostName=iotc-....azure-devices.net;DeviceId=sample-device-01;SharedAccessKey=qdv...IpAo=
Enabling the commands on the client
Please enter q or Q to exit sample.
The following properties will be updated for root interface.
{ serialNumber: 'alwinexlepaho8329' }
The following properties will be updated for component: thermostat1
{ thermostat1: { maxTempSinceLastReboot: 1.5902294191855972, __t: 'c' } }
The following properties will be updated for component: thermostat2
{ thermostat2: { maxTempSinceLastReboot: 16.181771928614545, __t: 'c' } }
The following properties will be updated for component: deviceInformation
{ deviceInformation:
   { manufacturer: 'Contoso Device Corporation',
     model: 'Contoso 47-turbo',
     swVersion: '10.89',
     osName: 'Contoso_OS',
     processorArchitecture: 'Contoso_x86',
     processorManufacturer: 'Contoso Industries',
     totalStorage: 65000,
     totalMemory: 640,
     __t: 'c' } }
executed sample
Received an update for device with value: {"$version":1}
Properties have been reported for component: thermostat1
Properties have been reported for component: thermostat2
Properties have been reported for component: deviceInformation
Properties have been reported for root interface.
Sending telemetry message 0 from component: thermostat1 
Sending telemetry message 0 from component: thermostat2 
Sending telemetry message 0 from root interface
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


You can see how the device responds to commands and property updates. The `getMaxMinReport` command is in the `thermostat2` component, the `reboot` command is in the default component. The `targetTemperature` writable property was set for the `thermostat2` component:

```output
Received command request for command name: thermostat2*getMaxMinReport
The command request payload is:
2021-03-26T06:00:00.000Z
Response to method: thermostat2*getMaxMinReport sent successfully.

...

Received command request for command name: reboot
The command request payload is:
10
Response to method: reboot sent successfully.

...

Received an update for device with value: {"thermostat2":{"targetTemperature":76,"__t":"c"},"$version":2}
Will update property: targetTemperature to value: 76 of component: thermostat2
Properties have been reported for component: thermostat2
```
