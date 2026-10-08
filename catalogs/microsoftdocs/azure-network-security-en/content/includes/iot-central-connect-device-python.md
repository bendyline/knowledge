---
author: dominicbetts
ms.author: dobett
ms.service: azure-iot
ms.topic: include
ms.date: 03/31/2021
---

[Browse code](https://github.com/Azure/azure-iot-sdk-python/tree/v2/samples/pnp)


>**Important:**
>This article includes steps to connect a device using a shared access signature, also called symmetric key authentication. This authentication method is convenient for testing and evaluation, but authenticating a device using X.509 certificates is a more secure approach. To learn more, see [Security best practices for IoT solutions > Connection security](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot/iot-overview-security.md#connection-security).


## Prerequisites

To complete the steps in this article, you need the following resources:


- An active Azure subscription. If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

- An IoT Central application created from the **Custom application** template. To learn more, see [Create an IoT Central application](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-central/core/howto-create-iot-central-application.md) and [How do I get information about my application?](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-central/core/howto-get-app-info.md)


- A development machine with [Python](https://www.python.org/) installed. Check the [Azure IoT Python SDK](https://github.com/Azure/azure-iot-sdk-python/blob/main/README.md) for current Python version requirements. You can run `python --version` at the command line to check your version. Python is available for a wide variety of operating systems. The instructions in this tutorial assume you're running the **python** command at the Windows command prompt.

- A local copy of the [Microsoft Azure IoT SDK for Python](https://github.com/Azure/azure-iot-sdk-python/tree/v2/) GitHub repository that contains the sample code. Use this link to download a copy of the repository: [Download ZIP](https://github.com/Azure/azure-iot-sdk-python/archive/v2.zip). Then unzip the file to a suitable location on your local machine.

## Review the code

In the copy of the Microsoft Azure IoT SDK for Python you downloaded previously, open the *azure-iot-sdk-python/samples/pnp/temp_controller_with_thermostats.py* file in a text editor.

The sample implements the multiple-component [Temperature Controller](https://github.com/Azure/opendigitaltwins-dtdl/blob/master/DTDL/v2/samples/TemperatureController.json) Digital Twin Definition Language model.

When you run the sample to connect to IoT Central, it uses the Device Provisioning Service (DPS) to register the device and generate a connection string. The sample retrieves the DPS connection information it needs from the command-line environment.

The `main` function:

* Uses DPS to provision the device. The provisioning information includes the model ID. IoT Central uses the model ID to identify or generate the device template for this device. To learn more, see [Assign a device to a device template](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-central/core/concepts-device-templates.md#assign-a-device-to-a-device-template).
* Creates a `Device_client` object and sets the `dtmi:com:example:TemperatureController;2` model ID before it opens the connection.
* Sends initial property values to IoT Central. It uses the `pnp_helper` to create the patches.
* Creates listeners for the `getMaxMinReport` and `reboot` commands. Each thermostat component has its own `getMaxMinReport` command.
* Creates property listener, to listen for writable property updates.
* Starts a loop to send temperature telemetry from the two thermostat components and working set telemetry from the default component every 8 seconds.

```python
async def main():
    switch = os.getenv("IOTHUB_DEVICE_SECURITY_TYPE")
    if switch == "DPS":
        provisioning_host = (
            os.getenv("IOTHUB_DEVICE_DPS_ENDPOINT")
            if os.getenv("IOTHUB_DEVICE_DPS_ENDPOINT")
            else "global.azure-devices-provisioning.net"
        )
        id_scope = os.getenv("IOTHUB_DEVICE_DPS_ID_SCOPE")
        registration_id = os.getenv("IOTHUB_DEVICE_DPS_DEVICE_ID")
        symmetric_key = os.getenv("IOTHUB_DEVICE_DPS_DEVICE_KEY")

        registration_result = await provision_device(
            provisioning_host, id_scope, registration_id, symmetric_key, model_id
        )

        if registration_result.status == "assigned":
            print("Device was assigned")
            print(registration_result.registration_state.assigned_hub)
            print(registration_result.registration_state.device_id)
            device_client = IoTHubDeviceClient.create_from_symmetric_key(
                symmetric_key=symmetric_key,
                hostname=registration_result.registration_state.assigned_hub,
                device_id=registration_result.registration_state.device_id,
                product_info=model_id,
            )
        else:
            raise RuntimeError(
                "Could not provision device. Aborting Plug and Play device connection."
            )

    elif switch == "connectionString":
        # ...

    # Connect the client.
    await device_client.connect()

    ################################################
    # Update readable properties from various components

    properties_root = pnp_helper.create_reported_properties(serialNumber=serial_number)
    properties_thermostat1 = pnp_helper.create_reported_properties(
        thermostat_1_component_name, maxTempSinceLastReboot=98.34
    )
    properties_thermostat2 = pnp_helper.create_reported_properties(
        thermostat_2_component_name, maxTempSinceLastReboot=48.92
    )
    properties_device_info = pnp_helper.create_reported_properties(
        device_information_component_name,
        swVersion="5.5",
        manufacturer="Contoso Device Corporation",
        model="Contoso 4762B-turbo",
        osName="Mac Os",
        processorArchitecture="x86-64",
        processorManufacturer="Intel",
        totalStorage=1024,
        totalMemory=32,
    )

    property_updates = asyncio.gather(
        device_client.patch_twin_reported_properties(properties_root),
        device_client.patch_twin_reported_properties(properties_thermostat1),
        device_client.patch_twin_reported_properties(properties_thermostat2),
        device_client.patch_twin_reported_properties(properties_device_info),
    )

    ################################################
    # Get all the listeners running
    print("Listening for command requests and property updates")

    global THERMOSTAT_1
    global THERMOSTAT_2
    THERMOSTAT_1 = Thermostat(thermostat_1_component_name, 10)
    THERMOSTAT_2 = Thermostat(thermostat_2_component_name, 10)

    listeners = asyncio.gather(
        execute_command_listener(
            device_client, method_name="reboot", user_command_handler=reboot_handler
        ),
        execute_command_listener(
            device_client,
            thermostat_1_component_name,
            method_name="getMaxMinReport",
            user_command_handler=max_min_handler,
            create_user_response_handler=create_max_min_report_response,
        ),
        execute_command_listener(
            device_client,
            thermostat_2_component_name,
            method_name="getMaxMinReport",
            user_command_handler=max_min_handler,
            create_user_response_handler=create_max_min_report_response,
        ),
        execute_property_listener(device_client),
    )

    ################################################
    # Function to send telemetry every 8 seconds

    async def send_telemetry():
        print("Sending telemetry from various components")

        while True:
            curr_temp_ext = random.randrange(10, 50)
            THERMOSTAT_1.record(curr_temp_ext)

            temperature_msg1 = {"temperature": curr_temp_ext}
            await send_telemetry_from_temp_controller(
                device_client, temperature_msg1, thermostat_1_component_name
            )

            curr_temp_int = random.randrange(10, 50)  # Current temperature in Celsius
            THERMOSTAT_2.record(curr_temp_int)

            temperature_msg2 = {"temperature": curr_temp_int}

            await send_telemetry_from_temp_controller(
                device_client, temperature_msg2, thermostat_2_component_name
            )

            workingset_msg3 = {"workingSet": random.randrange(1, 100)}
            await send_telemetry_from_temp_controller(device_client, workingset_msg3)

    send_telemetry_task = asyncio.ensure_future(send_telemetry())

    # ...
```

The `provision_device` function uses DPS to provision the device and register it with IoT Central. The function includes the device model ID, which IoT Central uses to [assign a device to a device template](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-central/core/concepts-device-templates.md#assign-a-device-to-a-device-template), in the provisioning payload:

```python
async def provision_device(provisioning_host, id_scope, registration_id, symmetric_key, model_id):
    provisioning_device_client = ProvisioningDeviceClient.create_from_symmetric_key(
        provisioning_host=provisioning_host,
        registration_id=registration_id,
        id_scope=id_scope,
        symmetric_key=symmetric_key,
    )

    provisioning_device_client.provisioning_payload = {"modelId": model_id}
    return await provisioning_device_client.register()
```

The `execute_command_listener` function handles command requests, runs the `max_min_handler` function when the device receives the `getMaxMinReport` command for the thermostat components and the `reboot_handler` function when the device receives the `reboot` command. It uses the `pnp_helper` module to build the response:

```python
async def execute_command_listener(
    device_client,
    component_name=None,
    method_name=None,
    user_command_handler=None,
    create_user_response_handler=None,
):
    while True:
        if component_name and method_name:
            command_name = component_name + "*" + method_name
        elif method_name:
            command_name = method_name
        else:
            command_name = None

        command_request = await device_client.receive_method_request(command_name)
        print("Command request received with payload")
        values = command_request.payload
        print(values)

        if user_command_handler:
            await user_command_handler(values)
        else:
            print("No handler provided to execute")

        (response_status, response_payload) = pnp_helper.create_response_payload_with_status(
            command_request, method_name, create_user_response=create_user_response_handler
        )

        command_response = MethodResponse.create_from_method_request(
            command_request, response_status, response_payload
        )

        try:
            await device_client.send_method_response(command_response)
        except Exception:
            print("responding to the {command} command failed".format(command=method_name))
```

The `async def execute_property_listener` handles writable property updates such as `targetTemperature` for the thermostat components and generates the JSON response. It uses the `pnp_helper` module to build the response:

```python
async def execute_property_listener(device_client):
    while True:
        patch = await device_client.receive_twin_desired_properties_patch()  # blocking call
        print(patch)
        properties_dict = pnp_helper.create_reported_properties_from_desired(patch)

        await device_client.patch_twin_reported_properties(properties_dict)
```

The `send_telemetry_from_temp_controller` function sends the telemetry messages from the thermostat components to IoT Central. It uses the `pnp_helper` module to build the messages:

```python
async def send_telemetry_from_temp_controller(device_client, telemetry_msg, component_name=None):
    msg = pnp_helper.create_telemetry(telemetry_msg, component_name)
    await device_client.send_message(msg)
    print("Sent message")
    print(msg)
    await asyncio.sleep(5)
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

To run the sample application, open a command-line environment and navigate to the folder *azure-iot-sdk-python-2/samples/pnp* folder that contains the *temp_controller_with_thermostats.py* sample file.


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
pip install azure-iot-device
```

Run the sample:

```cmd/sh
python temp_controller_with_thermostats.py
```

The following output shows the device registering and connecting to IoT Central. The sample sends the `maxTempSinceLastReboot` properties from the two thermostat components before it starts sending telemetry:

```cmd/sh
Device was assigned
iotc-60a.....azure-devices.net
sample-device-01
Updating pnp properties for root interface
{'serialNumber': 'alohomora'}
Updating pnp properties for thermostat1
{'thermostat1': {'maxTempSinceLastReboot': 98.34, '__t': 'c'}}
Updating pnp properties for thermostat2
{'thermostat2': {'maxTempSinceLastReboot': 48.92, '__t': 'c'}}
Updating pnp properties for deviceInformation
{'deviceInformation': {'swVersion': '5.5', 'manufacturer': 'Contoso Device Corporation', 'model': 'Contoso 4762B-turbo', 'osName': 'Mac Os', 'processorArchitecture': 'x86-64', 'processorManufacturer': 'Intel', 'totalStorage': 1024, 'totalMemory': 32, '__t': 'c'}}
Listening for command requests and property updates
Press Q to quit
Sending telemetry from various components
Sent message
{"temperature": 27}
Sent message
{"temperature": 17}
Sent message
{"workingSet": 13}
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

```cmd/sh
{'thermostat1': {'targetTemperature': 67, '__t': 'c'}, '$version': 2}
the data in the desired properties patch was: {'thermostat1': {'targetTemperature': 67, '__t': 'c'}, '$version': 2}
Values received are :-
{'targetTemperature': 67, '__t': 'c'}
Sent message

...

Command request received with payload
2021-03-31T05:00:00.000Z
Will return the max, min and average temperature from the specified time 2021-03-31T05:00:00.000Z to the current time
Done generating
{"avgTemp": 4.0, "endTime": "2021-03-31T12:29:48.322427", "maxTemp": 18, "minTemp": null, "startTime": "2021-03-31T12:28:28.322381"}
```
