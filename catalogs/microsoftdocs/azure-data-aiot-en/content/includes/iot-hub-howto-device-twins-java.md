---
title: Get started with Azure IoT Hub device twins (Java)
titleSuffix: Azure IoT Hub
description: How to use the Azure IoT SDK for Java to create device and backend service application code for device twins.
author: sethmanheim
ms.author: sethm
ms.service: azure-iot-hub
ms.devlang: java
ms.topic: include
ms.date: 07/20/2024
ms.custom:
  - mqtt
  - devx-track-java
  - devx-track-extended-java
  - sfi-ropc-nochange
---

  * Requires [Java SE Development Kit 8](https://learn.microsoft.com/azure/developer/java/fundamentals/). Make sure you select **Java 8** under **Long-term support** to navigate to downloads for JDK 8.

## Overview

This article describes how to use the [Azure IoT SDK for Java](https://github.com/Azure/azure-iot-sdk-java) to create device and backend service application code for device twins.

## Create a device application

Device applications can read and write twin reported properties, and be notified of desired twin property changes that are set by a backend application or IoT Hub.

This section describes how to create device application code to:

* Retrieve and view a device twin
* Update reported device twin properties
* Subscribe to desired property changes

The [DeviceClient](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.device.deviceclient) class exposes all the methods you require to interact with device twins from the device.


>**Important:**
>This article includes steps to connect a device using a shared access signature, also called symmetric key authentication. This authentication method is convenient for testing and evaluation, but authenticating a device using X.509 certificates is a more secure approach. To learn more, see [Security best practices for IoT solutions > Connection security](../articles/iot/iot-overview-security.md#connection-security).


### Device import statements

Use the following device import statements to access the Azure IoT SDK for Java.

```java
import com.microsoft.azure.sdk.iot.device.*;
import com.microsoft.azure.sdk.iot.device.DeviceTwin.*;
```

### Connect a device to IoT Hub

A device app can authenticate with IoT Hub using the following methods:

* Shared access key
* X.509 certificate


>**Important:**
>This article includes steps to connect a device using a shared access signature, also called symmetric key authentication. This authentication method is convenient for testing and evaluation, but authenticating a device using X.509 certificates is a more secure approach. To learn more, see [Security best practices for IoT solutions > Connection security](../articles/iot/iot-overview-security.md#connection-security).


#### Authenticate using a shared access key

To connect a device to IoT Hub:

1. Use [IotHubClientProtocol](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.device.iothubclientprotocol) to choose a transport protocol. For example:

    ```java
    IotHubClientProtocol protocol = IotHubClientProtocol.MQTT;
    ```

1. Use the `DeviceClient` constructor to add the device primary connection string and protocol.

    ```java
    String connString = "{IoT hub device connection string}";
    DeviceClient client = new DeviceClient(connString, protocol);
    ```

1. Use [open](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.device.deviceclient?#com-microsoft-azure-sdk-iot-device-deviceclient-open\(\)) to connect the device to IoT hub. If the client is already open, the method does nothing.

    ```java
    client.open(true);
    ```

#### Authenticate using an X.509 certificate


To connect a device to IoT Hub using an X.509 certificate:

1. Build the [SSLContext](https://docs.oracle.com/javase/8/docs/api/javax/net/ssl/SSLContext.html) object using [buildSSLContext](https://hc.apache.org/httpcomponents-core-4.4.x/current/httpcore/apidocs/org/apache/http/ssl/SSLContextBuilder.html).
1. Add the `SSLContext` information to a [ClientOptions](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.device.clientoptions) object.
1. Call [DeviceClient](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.device.deviceclient?#com-microsoft-azure-sdk-iot-device-deviceclient-deviceclient\(java-lang-string-com-microsoft-azure-sdk-iot-device-iothubclientprotocol-com-microsoft-azure-sdk-iot-device-clientoptions\)) using the `ClientOptions` information to create the device-to-IoT Hub connection.

This example shows certificate input parameter values as local variables for clarity. In a production system, store sensitive input parameters in environment variables or another more secure storage location. For example, use `Environment.GetEnvironmentVariable("PUBLICKEY")` to read a public key certificate string environment variable.

```java
private static final String publicKeyCertificateString =
        "-----BEGIN CERTIFICATE-----\n" +
        "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\n" +
        "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\n" +
        "-----END CERTIFICATE-----\n";

//PEM encoded representation of the private key
private static final String privateKeyString =
        "-----BEGIN EC PRIVATE KEY-----\n" +
        "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\n" +
        "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\n" +
        "-----END EC PRIVATE KEY-----\n";

SSLContext sslContext = SSLContextBuilder.buildSSLContext(publicKeyCertificateString, privateKeyString);
ClientOptions clientOptions = ClientOptions.builder().sslContext(sslContext).build();
DeviceClient client = new DeviceClient(connString, protocol, clientOptions);
```

For more information about certificate authentication, see:

* [Authenticate identities with X.509 certificates](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-x509)
* [Tutorial: Create and upload certificates for testing](https://learn.microsoft.com/azure/iot-hub/tutorial-x509-test-certs)

##### Code samples

For working samples of device X.509 certificate authentication, see:

* [Send-receive x509 sample](https://github.com/Azure/azure-iot-sdk-java/tree/main/iothub/device/iot-device-samples/send-receive-x509-sample)
* [Send event x509](https://github.com/Azure/azure-iot-sdk-java/blob/main/iothub/device/iot-device-samples/send-event-x509/src/main/java/samples/com/microsoft/azure/sdk/iot/SendEventX509.java)


### Retrieve and view a device twin

After opening the client connection, call [getTwin](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.devicetwin.devicetwin?#com-microsoft-azure-sdk-iot-service-devicetwin-devicetwin-gettwin\(com-microsoft-azure-sdk-iot-service-devicetwin-devicetwindevice\)) to retrieve the current twin properties into a `Twin` object.

For example:

```java
private static Twin twin;
System.out.println("Getting current twin");
twin = client.getTwin();
System.out.println("Received current twin:");
System.out.println(twin);
```

### Update device twin reported properties

After retrieving the current twin, you can begin making reported property updates. You can also make reported property updates without getting the current twin as long as you have the correct reported properties version. If you send reported properties and receive a "precondition failed" error, then your reported properties version is out of date. In that case, get the latest version by calling `getTwin` again.

To update reported properties:

1. Call [getReportedProperties](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.devicetwin.devicetwindevice?#com-microsoft-azure-sdk-iot-service-devicetwin-devicetwindevice-getreportedproperties\(\)) to fetch the twin reported properties into a [TwinCollection](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.deps.twin.twincollection) object.

1. Use [put](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.deps.twin.twincollection?#com-microsoft-azure-sdk-iot-deps-twin-twincollection-put\(java-lang-string-java-lang-object\)) to update a reported property within the `TwinCollection` object. Call `put` for each reported property update.

1. Use [updateReportedProperties](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.device.devicetwin.devicetwin?#com-microsoft-azure-sdk-iot-device-devicetwin-devicetwin-updatereportedproperties\(java-util-set\(com-microsoft-azure-sdk-iot-device-devicetwin-property\)\)) to apply the group of reported properties that were updated using the `put` method.

For example:

```java
TwinCollection reportedProperties = twin.getReportedProperties();

int newTemperature = new Random().nextInt(80);
reportedProperties.put("HomeTemp(F)", newTemperature);
System.out.println("Updating reported property \"HomeTemp(F)\" to value " + newTemperature);

ReportedPropertiesUpdateResponse response = client.updateReportedProperties(reportedProperties);
System.out.println("Successfully set property \"HomeTemp(F)\" to value " + newTemperature);
```

### Subscribe to desired property changes

Call [subscribeToDesiredProperties](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.device.internalclient?#com-microsoft-azure-sdk-iot-device-internalclient-subscribetodesiredproperties\(java-util-map\(com-microsoft-azure-sdk-iot-device-devicetwin-property-com-microsoft-azure-sdk-iot-device-devicetwin-pair\(com-microsoft-azure-sdk-iot-device-devicetwin-propertycallback\(java-lang-string-java-lang-object\)-java-lang-object\)\)\)) to subscribe to desired property changes. This client receives a callback with a `Twin` object each time a desired property is updated. That callback either contains the full desired properties set, or only the updated desired property depending on how the desired property was changed.

This example subscribes to desired property changes. Any desired property changes are passed to a handler named `DesiredPropertiesUpdatedHandler`.

```java
client.subscribeToDesiredProperties(new DesiredPropertiesUpdatedHandler(), null);
```

In this example, the `DesiredPropertiesUpdatedHandler` desired property change callback handler calls [getDesiredProperties](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.devicetwin.devicetwindevice?#com-microsoft-azure-sdk-iot-service-devicetwin-devicetwindevice-getdesiredproperties\(\)) to retrieve the property changes, then prints the updated twin properties.

```java
  private static class DesiredPropertiesUpdatedHandler implements DesiredPropertiesCallback
  {
      @Override
      public void onDesiredPropertiesUpdated(Twin desiredPropertyUpdateTwin, Object context)
      {
          if (twin == null)
          {
              // No need to care about this update because these properties will be present in the twin retrieved by getTwin.
              System.out.println("Received desired properties update before getting current twin. Ignoring this update.");
              return;
          }

          // desiredPropertyUpdateTwin.getDesiredProperties() contains all the newly updated desired properties as well as the new version of the desired properties
          twin.getDesiredProperties().putAll(desiredPropertyUpdateTwin.getDesiredProperties());
          twin.getDesiredProperties().setVersion(desiredPropertyUpdateTwin.getDesiredProperties().getVersion());
          System.out.println("Received desired property update. Current twin:");
          System.out.println(twin);
      }
  }
```

### SDK device sample

The Azure IoT SDK for Java includes a working sample to test the device app concepts described in this article. For more information, see  [Device twin sample](https://github.com/Azure/azure-iot-sdk-java/tree/main/iothub/device/iot-device-samples/device-twin-sample).

## Create a backend application

This section describes how to create a backend application that:

* Updates device twin tags
* Queries devices using filters on the tags and properties

The `ServiceClient` [DeviceTwin](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.devicetwin.devicetwin) class contains methods that services can use to access device twins.

### Service import statements

Use the following service import statements to access the Azure IoT SDK for Java.

```java
import com.microsoft.azure.sdk.iot.service.devicetwin.*;
import com.microsoft.azure.sdk.iot.service.exceptions.IotHubException;
```

### Connect to the IoT Hub

You can connect a backend service to IoT Hub using the following methods:

* Shared access policy
* Microsoft Entra


>**Important:**
>This article includes steps to connect to a service using a shared access signature. This authentication method is convenient for testing and evaluation, but authenticating to a service with Microsoft Entra ID or managed identities is a more secure approach. To learn more, see [Security best practices for IoT solutions > Cloud security](../articles/iot/iot-overview-security.md#cloud-security).


#### Connect using a shared access policy

Use a [DeviceTwin](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.devicetwin.devicetwin?#com-microsoft-azure-sdk-iot-service-devicetwin-devicetwin-devicetwin\(java-lang-string\)) constructor to create the connection to IoT hub. The `DeviceTwin` object handles the communication with your IoT hub.

Your application needs the **service connect** permission to modify desired properties of a device twin, and it needs **registry read** permission to query the identity registry. There is no default shared access policy that contains only these two permissions, so you need to create one if a one does not already exist. Supply this shared access policy connection string as a parameter to `fromConnectionString`. For more information about shared access policies, see [Control access to IoT Hub with shared access signatures](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-sas).

The [DeviceTwinDevice](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.devicetwin.devicetwindevice) object represents the device twin with its properties and tags.

For example:

```java
public static final String iotHubConnectionString = "{Shared access policy connection string}";
public static final String deviceId = "myDeviceId";
public static final String region = "US";
public static final String plant = "Redmond43";

// Get the DeviceTwin and DeviceTwinDevice objects
DeviceTwin twinClient = new DeviceTwin(iotHubConnectionString);
DeviceTwinDevice device = new DeviceTwinDevice(deviceId);
```

#### Connect using Microsoft Entra


A backend app that uses Microsoft Entra must successfully authenticate and obtain a security token credential before connecting to IoT Hub. This token is passed to a IoT Hub connection method. For general information about setting up and using Microsoft Entra for IoT Hub, see [Control access to IoT Hub by using Microsoft Entra ID](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-azure-ad).

For an overview of Java SDK authentication, see [Azure authentication with Java and Azure Identity](https://learn.microsoft.com/azure/developer/java/sdk/authentication/overview).

For simplicity, this section focuses on describing authentication using client secret.

##### Configure Microsoft Entra app

You must set up a Microsoft Entra app that is configured for your preferred authentication credential. The app contains parameters such as client secret that are used by the backend application to authenticate. The available app authentication configurations are:

* Client secret
* Certificate
* Federated identity credential

Microsoft Entra apps may require specific role permissions depending on operations being performed. For example, [IoT Hub Twin Contributor](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/internet-of-things#iot-hub-twin-contributor) is required to enable read and write access to a IoT Hub device and module twins. For more information, see [Manage access to IoT Hub by using Azure RBAC role assignment](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-azure-ad?#manage-access-to-iot-hub-by-using-azure-rbac-role-assignment).

For more information about setting up a Microsoft Entra app, see [Quickstart: Register an application with the Microsoft identity platform](https://learn.microsoft.com/entra/identity-platform/quickstart-register-app).

##### Authenticate using DefaultAzureCredential

The easiest way to use Microsoft Entra to authenticate a backend application is to use [DefaultAzureCredential](https://learn.microsoft.com/azure/developer/java/sdk/authentication/credential-chains#defaultazurecredential-overview), but it's recommended to use a different method in a production environment including a specific `TokenCredential` or pared-down `ChainedTokenCredential`.
For more information about the pros and cons of using `DefaultAzureCredential`, see
[Credential chains in the Azure Identity client library for Java](https://learn.microsoft.com/azure/developer/java/sdk/authentication/credential-chains).

[DefaultAzureCredential](https://learn.microsoft.com/java/api/com.azure.identity.defaultazurecredential) supports different authentication mechanisms and determines the appropriate credential type based on the environment it's executing in. It attempts to use multiple credential types in an order until it finds a working credential.

You can authenticate Microsoft Entra app credentials using [DefaultAzureCredentialBuilder](https://learn.microsoft.com/java/api/com.azure.identity.defaultazurecredentialbuilder). Save connection parameters such as client secret tenantID, clientID, and client secret values as environmental variables. Once the `TokenCredential` is created, pass it to [ServiceClient](https://learn.microsoft.com/java/api/com.azure.core.annotation.serviceclient) or other builder as the 'credential' parameter.

In this example, `DefaultAzureCredentialBuilder` attempts to authenticate a connection from the list described in [DefaultAzureCredential](https://learn.microsoft.com/java/api/com.azure.identity.defaultazurecredential). The result of a successful Microsoft Entra authentication is a security token credential that is passed to a constructor such as [ServiceClient](https://learn.microsoft.com/java/api/com.azure.core.annotation.serviceclient).

```java
TokenCredential defaultAzureCredential = new DefaultAzureCredentialBuilder().build();
```

##### Authenticate using ClientSecretCredentialBuilder

You can use [ClientSecretCredentialBuilder](https://learn.microsoft.com/java/api/com.azure.identity.clientsecretcredentialbuilder) to create a credential using client secret information. If successful, this method returns a [TokenCredential](https://learn.microsoft.com/java/api/com.azure.core.credential.tokencredential) that can be passed to [ServiceClient](https://learn.microsoft.com/java/api/com.azure.core.annotation.serviceclient) or other builder as the 'credential' parameter.

In this example, Microsoft Entra app registration client secret, client ID, and tenant ID values have been added to environment variables. These environment variables are used by `ClientSecretCredentialBuilder` to build the credential.

```java
string clientSecretValue = System.getenv("AZURE_CLIENT_SECRET");
string clientID = System.getenv("AZURE_CLIENT_ID");
string tenantID = System.getenv("AZURE_TENANT_ID");

TokenCredential credential =
     new ClientSecretCredentialBuilder()
          .tenantId(tenantID)
          .clientId(clientID)
          .clientSecret(clientSecretValue)
          .build();
```

##### Other authentication classes

The Java SDK also includes these classes that authenticate a backend app with Microsoft Entra:

* [AuthorizationCodeCredential](https://learn.microsoft.com/java/api/com.azure.identity.authorizationcodecredential)
* [AzureCliCredential](https://learn.microsoft.com/java/api/com.azure.identity.azureclicredential)
* [AzureDeveloperCliCredential](https://learn.microsoft.com/java/api/com.azure.identity.azuredeveloperclicredential)
* [AzurePipelinesCredential](https://learn.microsoft.com/java/api/com.azure.identity.azurepipelinescredential)
* [ChainedTokenCredential](https://learn.microsoft.com/java/api/com.azure.identity.chainedtokencredential)
* [ClientAssertionCredential](https://learn.microsoft.com/java/api/com.azure.identity.clientassertioncredential)
* [ClientCertificateCredential](https://learn.microsoft.com/java/api/com.azure.identity.clientcertificatecredential)
* [DeviceCodeCredential](https://learn.microsoft.com/java/api/com.azure.identity.devicecodecredential)
* [EnvironmentCredential](https://learn.microsoft.com/java/api/com.azure.identity.environmentcredential)
* [InteractiveBrowserCredential](https://learn.microsoft.com/java/api/com.azure.identity.interactivebrowsercredential)
* [ManagedIdentityCredential](https://learn.microsoft.com/java/api/com.azure.identity.managedidentitycredential)
* [OnBehalfOfCredential](https://learn.microsoft.com/java/api/com.azure.identity.onbehalfofcredential)

##### Code samples

For working samples of Microsoft Entra service authentication, see [Role based authentication sample](https://github.com/Azure/azure-iot-service-sdk-java/tree/main/service/iot-service-samples/role-based-authorization-sample).


### Update device twin fields

To update device twin fields:

1. Use [getTwin](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.devicetwin.devicetwin?#com-microsoft-azure-sdk-iot-service-devicetwin-devicetwin-gettwin\(com-microsoft-azure-sdk-iot-service-devicetwin-devicetwindevice\)) to retrieve the current device twin fields

   This example retrieves and prints the device twin fields:

    ```java
    // Get the device twin from IoT Hub
    System.out.println("Device twin before update:");
    twinClient.getTwin(device);
    System.out.println(device);
    ```

1. Use a `HashSet` object to `add` a group of twin tag pairs

1. Use [setTags](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.devicetwin.devicetwindevice?#com-microsoft-azure-sdk-iot-service-devicetwin-devicetwindevice-settags\(java-util-set\(com-microsoft-azure-sdk-iot-service-devicetwin-pair\)\)) to add a group of tag pairs from a `tags` object to a `DeviceTwinDevice` object

1. Use [updateTwin](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.devicetwin.devicetwin?#com-microsoft-azure-sdk-iot-service-devicetwin-devicetwin-updatetwin\(com-microsoft-azure-sdk-iot-service-devicetwin-devicetwindevice\)) to update the twin in the IoT hub

    This example updates the region and plant device twin tags for a device twin:

    ```java
    // Update device twin tags if they are different
    // from the existing values
    String currentTags = device.tagsToString();
    if ((!currentTags.contains("region=" + region) && !currentTags.contains("plant=" + plant))) {

    // Create the tags and attach them to the DeviceTwinDevice object
    Set<Pair> tags = new HashSet<Pair>();
    tags.add(new Pair("region", region));
    tags.add(new Pair("plant", plant));
    device.setTags(tags);

    // Update the device twin in IoT Hub
    System.out.println("Updating device twin");
    twinClient.updateTwin(device);
    }

    // Retrieve and display the device twin with the tag values from IoT Hub
    System.out.println("Device twin after update:");
    twinClient.getTwin(device);
    System.out.println(device);
    ```

### Create a device twin query

This section demonstrates two device twin queries. Device twin queries are SQL-like queries that return a result set of device twins.

The [Query](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.devicetwin.query) class contains methods that can be used to create SQL-style queries to IoT Hub for twins, jobs, device jobs, or raw data.

To create a device query:

1. Use [createSqlQuery](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.devicetwin.sqlquery?#com-microsoft-azure-sdk-iot-service-devicetwin-sqlquery-createsqlquery\(java-lang-string-com-microsoft-azure-sdk-iot-service-devicetwin-sqlquery-fromtype-java-lang-string-java-lang-string\)) to build the twins SQL query

1. Use [queryTwin](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.devicetwin.devicetwin?#com-microsoft-azure-sdk-iot-service-devicetwin-devicetwin-querytwin\(java-lang-string-java-lang-integer\)) to execute the query

1. Use [hasNextDeviceTwin](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.devicetwin.devicetwin?#com-microsoft-azure-sdk-iot-service-devicetwin-devicetwin-hasnextdevicetwin\(com-microsoft-azure-sdk-iot-service-devicetwin-query\)) to check if there's another device twin in the result set

1. Use [getNextDeviceTwin](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.devicetwin.devicetwin?#com-microsoft-azure-sdk-iot-service-devicetwin-devicetwin-getnextdevicetwin\(com-microsoft-azure-sdk-iot-service-devicetwin-query\)) to retrieve the next device twin from the result set

The following example queries return a maximum of 100 devices.

This example query selects only the device twins of devices located in the **Redmond43** plant.

```java
// Query the device twins in IoT Hub
System.out.println("Devices in Redmond:");

// Construct the query
SqlQuery sqlQuery = SqlQuery.createSqlQuery("*", SqlQuery.FromType.DEVICES, "tags.plant='Redmond43'", null);

// Run the query, returning a maximum of 100 devices
Query twinQuery = twinClient.queryTwin(sqlQuery.getQuery(), 100);
while (twinClient.hasNextDeviceTwin(twinQuery)) {
  DeviceTwinDevice d = twinClient.getNextDeviceTwin(twinQuery);
  System.out.println(d.getDeviceId());
}
```

This example query refines the first query to select only the devices that are also connected through a cellular network.

```java
System.out.println("Devices in Redmond using a cellular network:");

// Construct the query
sqlQuery = SqlQuery.createSqlQuery("*", SqlQuery.FromType.DEVICES, "tags.plant='Redmond43' AND properties.reported.connectivityType = 'cellular'", null);

// Run the query, returning a maximum of 100 devices
twinQuery = twinClient.queryTwin(sqlQuery.getQuery(), 3);
while (twinClient.hasNextDeviceTwin(twinQuery)) {
  DeviceTwinDevice d = twinClient.getNextDeviceTwin(twinQuery);
  System.out.println(d.getDeviceId());
}
```

### SDK service sample

The Azure IoT SDK for Java provides a working sample of a service app that handles device twin tasks. For more information, see  [Device twin sample](https://github.com/Azure/azure-iot-service-sdk-java/blob/main/service/iot-service-samples/device-twin-sample/src/main/java/samples/com/microsoft/azure/sdk/iot/DeviceTwinSample.java).
