---
title: 'Quickstart: Azure Queue Storage client library for Java'
description: Learn how to use the Azure Queue Storage client library for Java to create a queue and add messages to it. Then learn how to read and delete messages from the queue. You also learn how to delete a queue.
author: pauljewellmsft
ms.author: pauljewell
ms.date: 06/29/2023
ms.topic: quickstart
ms.service: azure-queue-storage
ms.devlang: java
ms.custom:
  - devx-track-java
  - mode-api
  - passwordless-java
  - devx-track-extended-java
  - sfi-ropc-nochange
# Customer intent: "As a Java developer, I want to utilize the Queue Storage client library to create and manage queues, so that I can efficiently store and process large numbers of messages in my applications."
---

# Quickstart: Azure Queue Storage client library for Java

Get started with the Azure Queue Storage client library for Java. Azure Queue Storage is a service for storing large numbers of messages for later retrieval and processing. Follow these steps to install the package and try out example code for basic tasks.

[API reference documentation](https://learn.microsoft.com/java/api/overview/azure/storage-queue-readme) | [Library source code](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/storage/azure-storage-queue) | [Package (Maven)](https://mvnrepository.com/artifact/com.azure/azure-storage-queue) | [Samples](../common/storage-samples-java.md?toc=/azure/storage/queues/toc.json#queue-samples)

Use the Azure Queue Storage client library for Java to:

- Create a queue
- Add messages to a queue
- Peek at messages in a queue
- Update a message in a queue
- Get the queue length
- Receive messages from a queue
- Delete messages from a queue
- Delete a queue

## Prerequisites

- [Java Development Kit (JDK)](https://learn.microsoft.com/java/azure/jdk/) version 8 or above
- [Apache Maven](https://maven.apache.org/download.cgi)
- Azure subscription - [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- Azure Storage account - [create a storage account](../common/storage-account-create.md)

## Setting up

This section walks you through preparing a project to work with the Azure Queue Storage client library for Java.

### Create the project

Create a Java application named *queues-quickstart*.

1. In a console window (such as cmd, PowerShell, or Bash), use Maven to create a new console app with the name *queues-quickstart*. Type the following `mvn` command to create a "Hello, world!" Java project.

    # [PowerShell](#tab/powershell)

    ```powershell
    mvn archetype:generate `
        --define interactiveMode=n `
        --define groupId=com.queues.quickstart `
        --define artifactId=queues-quickstart `
        --define archetypeArtifactId=maven-archetype-quickstart `
        --define archetypeVersion=1.4
    ```

    # [Bash](#tab/bash)

    ```bash
    mvn archetype:generate \
        --define interactiveMode=n \
        --define groupId=com.queues.quickstart \
        --define artifactId=queues-quickstart \
        --define archetypeArtifactId=maven-archetype-quickstart \
        --define archetypeVersion=1.4
    ```

    ---

1. The output from generating the project should look something like this:

    ```console
    [INFO] Scanning for projects...
    [INFO]
    [INFO] ------------------< org.apache.maven:standalone-pom >-------------------
    [INFO] Building Maven Stub Project (No POM) 1
    [INFO] --------------------------------[ pom ]---------------------------------
    [INFO]
    [INFO] >>> maven-archetype-plugin:3.1.2:generate (default-cli) > generate-sources @ standalone-pom >>>
    [INFO]
    [INFO] <<< maven-archetype-plugin:3.1.2:generate (default-cli) < generate-sources @ standalone-pom <<<
    [INFO]
    [INFO]
    [INFO] --- maven-archetype-plugin:3.1.2:generate (default-cli) @ standalone-pom ---
    [INFO] Generating project in Batch mode
    [INFO] ----------------------------------------------------------------------------
    [INFO] Using following parameters for creating project from Archetype: maven-archetype-quickstart:1.4
    [INFO] ----------------------------------------------------------------------------
    [INFO] Parameter: groupId, Value: com.queues.quickstart
    [INFO] Parameter: artifactId, Value: queues-quickstart
    [INFO] Parameter: version, Value: 1.0-SNAPSHOT
    [INFO] Parameter: package, Value: com.queues.quickstart
    [INFO] Parameter: packageInPathFormat, Value: com/queues/quickstart
    [INFO] Parameter: version, Value: 1.0-SNAPSHOT
    [INFO] Parameter: package, Value: com.queues.quickstart
    [INFO] Parameter: groupId, Value: com.queues.quickstart
    [INFO] Parameter: artifactId, Value: queues-quickstart
    [INFO] Project created from Archetype in dir: C:\quickstarts\queues\queues-quickstart
    [INFO] ------------------------------------------------------------------------
    [INFO] BUILD SUCCESS
    [INFO] ------------------------------------------------------------------------
    [INFO] Total time:  6.394 s
    [INFO] Finished at: 2019-12-03T09:58:35-08:00
    [INFO] ------------------------------------------------------------------------
    ```

1. Switch to the newly created *queues-quickstart* directory.

   ```console
   cd queues-quickstart
   ```

### Install the packages

Open the `pom.xml` file in your text editor. 

Add **azure-sdk-bom** to take a dependency on the latest version of the library. In the following snippet, replace the `{bom_version_to_target}` placeholder with the version number. Using **azure-sdk-bom** keeps you from having to specify the version of each individual dependency. To learn more about the BOM, see the [Azure SDK BOM README](https://github.com/Azure/azure-sdk-for-java/blob/main/sdk/boms/azure-sdk-bom/README.md).

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.azure</groupId>
            <artifactId>azure-sdk-bom</artifactId>
            <version>{bom_version_to_target}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

Then add the following dependency elements to the group of dependencies. The **azure-identity** dependency is needed for passwordless connections to Azure services.

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-storage-queue</artifactId>
</dependency>
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-identity</artifactId>
</dependency>
```

### Set up the app framework

From the project directory:

1. Navigate to the */src/main/java/com/queues/quickstart* directory
1. Open the *App.java* file in your editor
1. Delete the `System.out.println("Hello, world");` statement
1. Add `import` directives

Here's the code:

```java
package com.queues.quickstart;

/**
 * Azure Queue Storage client library quickstart
 */
import com.azure.identity.*;
import com.azure.storage.queue.*;
import com.azure.storage.queue.models.*;
import java.io.*;

public class App
{
    public static void main(String[] args) throws IOException
    {
        // Quickstart code goes here
    }
}
```

## Authenticate to Azure


Application requests to most Azure services must be authorized. Using the `DefaultAzureCredential` class provided by the Azure Identity client library is the recommended approach for implementing passwordless connections to Azure services in your code.

You can also authorize requests to Azure services using passwords, connection strings, or other credentials directly. However, this approach should be used with caution. Developers must be diligent to never expose these secrets in an unsecure location. Anyone who gains access to the password or secret key is able to authenticate. `DefaultAzureCredential` offers improved management and security benefits over the account key to allow passwordless authentication. Both options are demonstrated in the following example.

### [Passwordless (Recommended)](#tab/passwordless)

`DefaultAzureCredential` is a class provided by the Azure Identity client library for Java. To learn more about `DefaultAzureCredential`, see the [DefaultAzureCredential overview](https://learn.microsoft.com/java/api/overview/azure/identity-readme#defaultazurecredential). `DefaultAzureCredential` supports multiple authentication methods and determines which method should be used at runtime. This approach enables your app to use different authentication methods in different environments (local vs. production) without implementing environment-specific code.

For example, your app can authenticate using your Azure CLI sign-in credentials when developing locally, and then use a [managed identity](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/overview.md) once it has been deployed to Azure. No code changes are required for this transition.


When developing locally, make sure that the user account that is accessing the queue data has the correct permissions. You'll need **Storage Queue Data Contributor** to read and write queue data. To assign yourself this role, you'll need to be assigned the **User Access Administrator** role, or another role that includes the **Microsoft.Authorization/roleAssignments/write** action. You can assign Azure RBAC roles to a user using the Azure portal, Azure CLI, or Azure PowerShell. You can learn more about the available scopes for role assignments on the [scope overview](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/scope-overview.md) page.

In this scenario, you'll assign permissions to your user account, scoped to the storage account, to follow the [Principle of Least Privilege](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/develop/secure-least-privileged-access.md). This practice gives users only the minimum permissions needed and creates more secure production environments.

The following example will assign the **Storage Queue Data Contributor** role to your user account, which provides both read and write access to queue data in your storage account.

> **Important:**
> In most cases it will take a minute or two for the role assignment to propagate in Azure, but in rare cases it may take up to eight minutes. If you receive authentication errors when you first run your code, wait a few moments and try again.

### [Azure portal](#tab/roles-azure-portal)

1. In the Azure portal, locate your storage account using the main search bar or left navigation.

2. On the storage account overview page, select **Access control (IAM)** from the left-hand menu.

3. On the **Access control (IAM)** page, select the **Role assignments** tab.

4. Select **+ Add** from the top menu and then **Add role assignment** from the resulting drop-down menu.

A screenshot showing how to assign a role.

5. Use the search box to filter the results to the desired role. For this example, search for *Storage Queue Data Contributor* and select the matching result and then choose **Next**.

6. Under **Assign access to**, select **User, group, or service principal**, and then choose **+ Select members**.

7. In the dialog, search for your Microsoft Entra username (usually your *user@domain* email address) and then choose **Select** at the bottom of the dialog.

8. Select **Review + assign** to go to the final page, and then **Review + assign** again to complete the process.

### [Azure CLI](#tab/roles-azure-cli)

To assign a role at the resource level using the Azure CLI, you first must retrieve the resource id using the `az storage account show` command. You can filter the output properties using the `--query` parameter.

```azurecli
az storage account show --resource-group '<your-resource-group-name>' --name '<your-storage-account-name>' --query id
```

Copy the output `Id` from the preceding command. You can then assign roles using the [az role](https://learn.microsoft.com/cli/azure/role) command of the Azure CLI.

```azurecli
az role assignment create --assignee "<user@domain>" \
    --role "Storage Queue Data Contributor" \
    --scope "<your-resource-id>"
```

### [PowerShell](#tab/roles-powershell)

To assign a role at the resource level using Azure PowerShell, you first must retrieve the resource ID using the `Get-AzResource` command.

```azurepowershell
Get-AzResource -ResourceGroupName "<yourResourceGroupname>" -Name "<yourStorageAccountName>"
```

Copy the `Id` value from the preceding command output. You can then assign roles using the [New-AzRoleAssignment](https://learn.microsoft.com/powershell/module/az.resources/new-azroleassignment) command in PowerShell.

```azurepowershell
New-AzRoleAssignment -SignInName <user@domain> `
    -RoleDefinitionName "Storage Queue Data Contributor" `
    -Scope <yourStorageAccountId>
```

---


### [Connection String](#tab/connection-string)


### Copy your credentials from the Azure portal

When the sample application makes a request to Azure Storage, it must be authorized. To authorize a request, add your storage account credentials to the application as a connection string. To view your storage account credentials, follow these steps:

1. Sign in to the [Azure portal](https://portal.azure.com).
2. Locate your storage account.
3. In the storage account menu pane, under **Security + networking**, select **Access keys**. Here, you can view the account access keys and the complete connection string for each key.

    Screenshot that shows where the access key settings are in the Azure portal
 
1. In the **Access keys** pane, select **Show keys**.
1. In the **key1** section, locate the **Connection string** value. Select the **Copy to clipboard** icon to copy the connection string. You'll add the connection string value to an environment variable in the next section.

    Screenshot showing how to copy a connection string from the Azure portal

### Configure your storage connection string

After you copy the connection string, write it to a new environment variable on the local machine running the application. To set the environment variable, open a console window, and follow the instructions for your operating system. Replace `<yourconnectionstring>` with your actual connection string.

# [Windows](#tab/environment-variable-windows)

```cmd
setx AZURE_STORAGE_CONNECTION_STRING "<yourconnectionstring>"
```

# [Linux and macOS](#tab/environment-variable-linux)

```bash
export AZURE_STORAGE_CONNECTION_STRING="<yourconnectionstring>"
```

---

After you add the environment variable in Windows, you must start a new instance of the command window.

#### Restart programs

After you add the environment variable, restart any running programs that will need to read the environment variable. For example, restart your development environment or editor before you continue.


> **Important:**
> The account access key should be used with caution. If your account access key is lost or accidentally placed in an insecure location, your service may become vulnerable. Anyone who has the access key is able to authorize requests against the storage account, and effectively has access to all the data. `DefaultAzureCredential` provides enhanced security features and benefits and is the recommended approach for managing authorization to Azure services.

---

## Object model

Azure Queue Storage is a service for storing large numbers of messages. A queue message can be up to 64 KB in size. A queue may contain millions of messages, up to the total capacity limit of a storage account. Queues are commonly used to create a backlog of work to process asynchronously. Queue Storage offers three types of resources:

- **Storage account**: All access to Azure Storage is done through a storage account. For more information about storage accounts, see [Storage account overview](../common/storage-account-overview.md)
- **Queue**: A queue contains a set of messages. All messages must be in a queue. Note that the queue name must be all lowercase. For information on naming queues, see [Naming Queues and Metadata](https://learn.microsoft.com/rest/api/storageservices/Naming-Queues-and-Metadata).
- **Message**: A message, in any format, of up to 64 KB. A message can remain in the queue for a maximum of 7 days. For version 2017-07-29 or later, the maximum time-to-live can be any positive number, or -1 indicating that the message doesn't expire. If this parameter is omitted, the default time-to-live is seven days.

The following diagram shows the relationship between these resources.

Diagram of Queue storage architecture

Use the following Java classes to interact with these resources:

- [`QueueClientBuilder`](https://learn.microsoft.com/java/api/com.azure.storage.queue.queueclientbuilder): The `QueueClientBuilder` class configures and instantiates a `QueueClient` object.
- [`QueueServiceClient`](https://learn.microsoft.com/java/api/com.azure.storage.queue.queueserviceclient): The `QueueServiceClient` allows you to manage the all queues in your storage account.
- [`QueueClient`](https://learn.microsoft.com/java/api/com.azure.storage.queue.queueclient): The `QueueClient` class allows you to manage and manipulate an individual queue and its messages.
- [`QueueMessageItem`](https://learn.microsoft.com/java/api/com.azure.storage.queue.models.queuemessageitem): The `QueueMessageItem` class represents the individual objects returned when calling [`ReceiveMessages`](https://learn.microsoft.com/java/api/com.azure.storage.queue.queueclient.receivemessages) on a queue.

## Code examples

These example code snippets show you how to do the following actions with the Azure Queue Storage client library for Java:

- [Authorize access and create a client object](#authorize-access-and-create-a-client-object)
- [Create a queue](#create-a-queue)
- [Add messages to a queue](#add-messages-to-a-queue)
- [Peek at messages in a queue](#peek-at-messages-in-a-queue)
- [Update a message in a queue](#update-a-message-in-a-queue)
- [Get the queue length](#get-the-queue-length)
- [Receive and delete messages from a queue](#receive-and-delete-messages-from-a-queue)
- [Delete a queue](#delete-a-queue)

## [Passwordless (Recommended)](#tab/passwordless)

### Authorize access and create a client object


Make sure you're authenticated with the same Microsoft Entra account you assigned the role to. You can authenticate via Azure CLI, Visual Studio Code, or Azure PowerShell.

### [Azure CLI](#tab/sign-in-azure-cli)

Sign-in to Azure through the Azure CLI using the following command:

```azurecli
az login
```

### [Visual Studio Code](#tab/sign-in-visual-studio-code)

You will need to [install the Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) to work with `DefaultAzureCredential` through Visual Studio code.

On the main menu of Visual Studio Code, navigate to **Terminal > New Terminal**.

Sign-in to Azure through the Azure CLI using the following command:

```azurecli
az login
```

### [PowerShell](#tab/sign-in-powershell)

Sign-in to Azure using PowerShell via the following command:

```azurepowershell
Connect-AzAccount
```

---


Once authenticated, you can create and authorize a `QueueClient` object using `DefaultAzureCredential` to access queue data in the storage account. `DefaultAzureCredential` automatically discovers and uses the account you signed in with in the previous step.

To authorize using `DefaultAzureCredential`, make sure you've added the **azure-identity** dependency in `pom.xml`, as described in [Install the packages](#install-the-packages). Also, be sure to add an import directive for `com.azure.identity` in the *App.java* file:

```java
import com.azure.identity.*;
```

Decide on a name for the queue and create an instance of the [`QueueClient`](https://learn.microsoft.com/java/api/com.azure.storage.queue.queueclient) class, using `DefaultAzureCredential` for authorization. We use this client object to create and interact with the queue resource in the storage account.

> **Important:**
> Queue names may only contain lowercase letters, numbers, and hyphens, and must begin with a letter or a number. Each hyphen must be preceded and followed by a non-hyphen character. The name must also be between 3 and 63 characters long. For more information about naming queues, see [Naming queues and metadata](https://learn.microsoft.com/rest/api/storageservices/naming-queues-and-metadata).

Add this code inside the `main` method, and make sure to replace the `<storage-account-name>` placeholder value:

```java
System.out.println("Azure Queue Storage client library - Java quickstart sample\n");

// Create a unique name for the queue
String queueName = "quickstartqueues-" + java.util.UUID.randomUUID();

// Instantiate a QueueClient
// We'll use this client object to create and interact with the queue
// TODO: replace <storage-account-name> with the actual name
QueueClient queueClient = new QueueClientBuilder()
        .endpoint("https://<storage-account-name>.queue.core.windows.net/")
        .queueName(queueName)
        .credential(new DefaultAzureCredentialBuilder().build())
        .buildClient();
```

## [Connection String](#tab/connection-string)

### Get the connection string and create a client

The following code retrieves the connection string for the storage account. The connection string is stored in the environment variable created in the [Configure your storage connection string](#configure-your-storage-connection-string) section.

Add this code inside the `main` method:

```java
System.out.println("Azure Queue Storage client library - Java quickstart sample\n");

// Retrieve the connection string for use with the application. The storage
// connection string is stored in an environment variable on the machine
// running the application called AZURE_STORAGE_CONNECTION_STRING. If the environment variable
// is created after the application is launched in a console or with
// Visual Studio, the shell or application needs to be closed and reloaded
// to take the environment variable into account.
String connectStr = System.getenv("AZURE_STORAGE_CONNECTION_STRING");
```

Decide on a name for the queue and create an instance of the [`QueueClient`](https://learn.microsoft.com/java/api/com.azure.storage.queue.queueclient) class, using the connection string for authorization. We use this client object to create and interact with the queue resource in the storage account.

> **Important:**
> Queue names may only contain lowercase letters, numbers, and hyphens, and must begin with a letter or a number. Each hyphen must be preceded and followed by a non-hyphen character. The name must also be between 3 and 63 characters long. For more information, see [Naming queues and metadata](https://learn.microsoft.com/rest/api/storageservices/naming-queues-and-metadata).

Add this code to the end of the `main` method:

```java
// Create a unique name for the queue
String queueName = "quickstartqueues-" + java.util.UUID.randomUUID();

System.out.println("Creating queue: " + queueName);

// Instantiate a QueueClient
// We'll use this client object to create and interact with the queue
QueueClient queueClient = new QueueClientBuilder()
        .connectionString(connectStr)
        .queueName(queueName)
        .buildClient();
```

---

> **Note:**
> Messages sent using the [`QueueClient`](https://learn.microsoft.com/java/api/com.azure.storage.queue.queueclient) class must be in a format that can be included in an XML request with UTF-8 encoding. You can optionally set the [QueueMessageEncoding](https://learn.microsoft.com/java/api/com.azure.storage.queue.queuemessageencoding) option to `BASE64` to handle non-compliant messages.

### Create a queue

Using the `QueueClient` object, call the [`create`](https://learn.microsoft.com/java/api/com.azure.storage.queue.queueclient.create) method to create the queue in your storage account.

Add this code to the end of the `main` method:

```java
System.out.println("Creating queue: " + queueName);

// Create the queue
queueClient.create();
```

### Add messages to a queue

The following code snippet adds messages to queue by calling the [`sendMessage`](https://learn.microsoft.com/java/api/com.azure.storage.queue.queueclient.sendmessage) method. It also saves a [`SendMessageResult`](https://learn.microsoft.com/java/api/com.azure.storage.queue.models.sendmessageresult) returned from a `sendMessage` call. The result is used to update the message later in the program.

Add this code to the end of the `main` method:

```java
System.out.println("\nAdding messages to the queue...");

// Send several messages to the queue
queueClient.sendMessage("First message");
queueClient.sendMessage("Second message");

// Save the result so we can update this message later
SendMessageResult result = queueClient.sendMessage("Third message");
```

### Peek at messages in a queue

Peek at the messages in the queue by calling the [`peekMessages`](https://learn.microsoft.com/java/api/com.azure.storage.queue.queueclient.peekmessages) method. This method retrieves one or more messages from the front of the queue but doesn't alter the visibility of the message.

Add this code to the end of the `main` method:

```java
System.out.println("\nPeek at the messages in the queue...");

// Peek at messages in the queue
queueClient.peekMessages(10, null, null).forEach(
    peekedMessage -> System.out.println("Message: " + peekedMessage.getMessageText()));
```

### Update a message in a queue

Update the contents of a message by calling the [`updateMessage`](https://learn.microsoft.com/java/api/com.azure.storage.queue.queueclient.updatemessage) method. This method can change a message's visibility timeout and contents. The message content must be a UTF-8 encoded string that is up to 64 KB in size. Along with new content for the message, pass in the message ID and pop receipt by using the `SendMessageResult` that was saved earlier in the code. The message ID and pop receipt identify which message to update.

```java
System.out.println("\nUpdating the third message in the queue...");

// Update a message using the result that
// was saved when sending the message
queueClient.updateMessage(result.getMessageId(),
                          result.getPopReceipt(),
                          "Third message has been updated",
                          Duration.ofSeconds(1));
```

### Get the queue length

You can get an estimate of the number of messages in a queue.

The `getProperties` method returns several values including the number of messages currently in a queue. The count is only approximate because messages can be added or removed after your request. The `getApproximateMessageCount` method returns the last value retrieved by the call to `getProperties`, without calling Queue Storage.

```java
QueueProperties properties = queueClient.getProperties();
long messageCount = properties.getApproximateMessagesCount();

System.out.println(String.format("Queue length: %d", messageCount));
```

### Receive and delete messages from a queue

Download previously added messages by calling the [`receiveMessages`](https://learn.microsoft.com/java/api/com.azure.storage.queue.queueclient.receivemessages) method. The example code also deletes messages from the queue after they're received and processed. In this case, processing is just displaying the message on the console.

The app pauses for user input by calling `System.console().readLine();` before it receives and deletes the messages. Verify in your [Azure portal](https://portal.azure.com) that the resources were created correctly, before they're deleted. Any messages not explicitly deleted eventually become visible in the queue again for another chance to process them.

Add this code to the end of the `main` method:

```java
System.out.println("\nPress Enter key to receive messages and delete them from the queue...");
System.console().readLine();

// Get messages from the queue
queueClient.receiveMessages(10).forEach(
    // "Process" the message
    receivedMessage -> {
        System.out.println("Message: " + receivedMessage.getMessageText());

        // Let the service know we're finished with
        // the message and it can be safely deleted.
        queueClient.deleteMessage(receivedMessage.getMessageId(), receivedMessage.getPopReceipt());
    }
);
```

When calling the `receiveMessages` method, you can optionally specify a value for `maxMessages`, which is the number of messages to retrieve from the queue. The default is 1 message and the maximum is 32 messages. You can also specify a value for `visibilityTimeout`, which hides the messages from other operations for the timeout period. The default is 30 seconds.

### Delete a queue

The following code cleans up the resources the app created by deleting the queue using the [`Delete`](https://learn.microsoft.com/java/api/com.azure.storage.queue.queueclient.delete) method.

Add this code to the end of the `main` method:

```java
System.out.println("\nPress Enter key to delete the queue...");
System.console().readLine();

// Clean up
System.out.println("Deleting queue: " + queueClient.getQueueName());
queueClient.delete();

System.out.println("Done");
```

## Run the code

This app creates and adds three messages to an Azure queue. The code lists the messages in the queue, then retrieves and deletes them, before finally deleting the queue.

In your console window, navigate to your application directory, then build and run the application.

```console
mvn compile
```

Then, build the package.

```console
mvn package
```

Use the following `mvn` command to run the app.

```console
mvn exec:java -Dexec.mainClass="com.queues.quickstart.App" -Dexec.cleanupDaemonThreads=false
```

The output of the app is similar to the following example:

```output
Azure Queue Storage client library - Java quickstart sample

Adding messages to the queue...

Peek at the messages in the queue...
Message: First message
Message: Second message
Message: Third message

Updating the third message in the queue...

Press Enter key to receive messages and delete them from the queue...

Message: First message
Message: Second message
Message: Third message has been updated

Press Enter key to delete the queue...

Deleting queue: quickstartqueues-fbf58f33-4d5a-41ac-ac0e-1a05d01c7003
Done
```

When the app pauses before receiving messages, check your storage account in the [Azure portal](https://portal.azure.com). Verify the messages are in the queue.

Press the `Enter` key to receive and delete the messages. When prompted, press the `Enter` key again to delete the queue and finish the demo.

## Next steps

In this quickstart, you learned how to create a queue and add messages to it using Java code. Then you learned to peek, retrieve, and delete messages. Finally, you learned how to delete a message queue.

For tutorials, samples, quick starts, and other documentation, visit:

> 
> [Azure for Java cloud developers](https://learn.microsoft.com/azure/developer/java/)

- For related code samples using deprecated Java version 8 SDKs, see [Code samples using Java version 8](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/queues/queues-v8-samples-java.md).
- For more Azure Queue Storage sample apps, see [Azure Queue Storage client library for Java - samples](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/storage/azure-storage-queue/src/samples/java/com/azure/storage/queue).
