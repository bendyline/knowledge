---
title: Quickstart - Submit a Job for queuing and routing
titleSuffix: An Azure Communication Services quickstart
description: In this quickstart, you'll learn how to create a Job Router client, Distribution Policy, Queue, and Job within your Azure Communication Services resource.
author: sroons
manager: phans
services: azure-communication-services
ms.author: serooney 
ms.date: 10/18/2021
ms.topic: quickstart
ms.service: azure-communication-services
ms.custom: mode-other, devx-track-extended-java, devx-track-js, devx-track-python
zone_pivot_groups: acs-js-csharp-java-python
---
# Quickstart: Submit a job for queuing and routing


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


Get started with Azure Communication Services Job Router by setting up your client, then configuring core functionality such as queues, policies, workers, and Jobs. To learn more about Job Router concepts, visit [Job Router conceptual documentation](../../concepts/router/concepts.md)

**Applies to: programming-language-csharp**



## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An active Communication Services resource and connection string. [Create a Communication Services resource](../create-communication-resource.md#access-your-connection-strings-and-service-endpoints).
- The latest version [.NET client library](https://dotnet.microsoft.com/download/dotnet) for your operating system.

## Sample code

You can review and download the sample code for this quick start on [GitHub](https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/tree/main/JobRouterQuickStart).

## Setting up

### Create a new C# application

In a console window (such as cmd, PowerShell, or Bash), use the `dotnet new` command to create a new console app with the name `JobRouterQuickstart`. This command creates a simple "Hello World" C# project with a single source file: **Program.cs**.

```console
dotnet new console -o JobRouterQuickstart
```

Change your directory to the newly created app folder and use the `dotnet build` command to compile your application.

```console
cd JobRouterQuickstart
dotnet build
```

### Install the package

Install the Azure Communication Job Router client library for .NET with [NuGet](https://www.nuget.org/):

```console
dotnet add package Azure.Communication.JobRouter
```

You'll need to use the Azure Communication Job Router client library for .NET [version 1.0.0](https://www.nuget.org/packages/Azure.Communication.JobRouter/1.0.0) or above.

Add the following `using` directives to the top of **Program.cs** to include the JobRouter namespaces.

```csharp
using Azure.Communication.JobRouter;
```

## Initialize the Job Router client and administration client

Job Router clients can be authenticated using your connection string acquired from an Azure Communication Services resource in the Azure portal.  We generate both a client and an administration client to interact with the Job Router service.  The admin client is used to provision queues and policies, while the client is used to submit jobs and register workers. For more information on connection strings, see [access-your-connection-strings-and-service-endpoints](../create-communication-resource.md#access-your-connection-strings-and-service-endpoints).

```csharp
// Get a connection string to our Azure Communication Services resource.
var routerAdminClient = new JobRouterAdministrationClient("your_connection_string");
var routerClient = new JobRouterClient("your_connection_string");
```

## Create a distribution policy

Job Router uses a distribution policy to decide how Workers will be notified of available Jobs and the time to live for the notifications, known as **Offers**. Create the policy by specifying the **ID**, a **name**, an **offerExpiresAfter**, and a distribution **mode**.

```csharp
var distributionPolicy = await routerAdminClient.CreateDistributionPolicyAsync(
    new CreateDistributionPolicyOptions(
        distributionPolicyId: "distribution-policy-1",
        offerExpiresAfter: TimeSpan.FromMinutes(1),
        mode: new LongestIdleMode())
    {
        Name = "My distribution policy"
    }
);
```

## Create a queue

Create the Queue by specifying an **ID**, **name**, and provide the **Distribution Policy** object's ID you created above.

```csharp
var queue = await routerAdminClient.CreateQueueAsync(
    new CreateQueueOptions(queueId: "queue-1", distributionPolicyId: distributionPolicy.Value.Id)
    {
        Name = "My Queue" 
    });
```

## Submit a job

Now, we can submit a job directly to that queue, with a worker selector that requires the worker to have the label `Some-Skill` greater than 10.

```csharp
var job = await routerClient.CreateJobAsync(
    new CreateJobOptions(jobId: "job-1", channelId: "voice", queueId: queue.Value.Id)
    {
        Priority = 1,
        RequestedWorkerSelectors =
        {
            new RouterWorkerSelector(key: "Some-Skill", labelOperator: LabelOperator.GreaterThan, value: new RouterValue(10))
        }
    });
```

## Create a worker

Now, we create a worker to receive work from that queue, with a label of `Some-Skill` equal to 11 and capacity on `my-channel`.

```csharp
var worker = await routerClient.CreateWorkerAsync(
    new CreateWorkerOptions(workerId: "worker-1", capacity: 1)
    {
        Queues = { queue.Value.Id },
        Labels = { ["Some-Skill"] = new RouterValue(11) },
        Channels = { new RouterChannel(channelId: "voice", capacityCostPerJob: 1) },
        AvailableForOffers = true
    });
```

## Receive an offer

We should get a [RouterWorkerOfferIssued][offer_issued_event] from our [Event Grid subscription][subscribe_events].
However, we could also wait a few seconds and then query the worker directly against the JobRouter API to see if an offer was issued to it.

```csharp
await Task.Delay(TimeSpan.FromSeconds(10));
worker = await routerClient.GetWorkerAsync(worker.Value.Id);
foreach (var offer in worker.Value.Offers)
{
    Console.WriteLine($"Worker {worker.Value.Id} has an active offer for job {offer.JobId}");
}
```

## Accept the job offer

Then, the worker can accept the job offer by using the SDK, which assigns the job to the worker.

```csharp
var accept = await routerClient.AcceptJobOfferAsync(workerId: worker.Value.Id, offerId: worker.Value.Offers.FirstOrDefault().OfferId);
Console.WriteLine($"Worker {worker.Value.Id} is assigned job {accept.Value.JobId}");
```

## Complete the job

Once the worker has completed the work associated with the job (for example, completed the call), we complete the job.

```csharp
await routerClient.CompleteJobAsync(new CompleteJobOptions(jobId: accept.Value.JobId, assignmentId: accept.Value.AssignmentId));
Console.WriteLine($"Worker {worker.Value.Id} has completed job {accept.Value.JobId}");
```

## Close the job

Once the worker is ready to take on new jobs, the worker should close the job.  Optionally, the worker can provide a disposition code to indicate the outcome of the job.

```csharp
await routerClient.CloseJobAsync(new CloseJobOptions(jobId: accept.Value.JobId, assignmentId: accept.Value.AssignmentId) {
    DispositionCode = "Resolved"
});
Console.WriteLine($"Worker {worker.Value.Id} has closed job {accept.Value.JobId}");
```

## Delete the job

Once the job has been closed, we can delete the job so that we can re-create the job with the same ID if we run this sample again

```csharp
await routerClient.DeleteJobAsync(accept.Value.JobId);
Console.WriteLine($"Deleting job {accept.Value.JobId}");
```

## Run the code

Run the application using `dotnet run` and observe the results.

```console
dotnet run

Azure Communication Services - Job Router Quickstart
Worker worker-1 has an active offer for job job-1
Worker worker-1 is assigned job job-1
Worker worker-1 has completed job job-1
Worker worker-1 has closed job job-1
Deleting job job-1
```

> **Note:**
> Running the application more than once will cause a new Job to be placed in the queue each time. This can cause the Worker to be offered a Job other than the one created when you run the above code. Since this can skew your request, considering deleting Jobs in the queue each time. Refer to the SDK documentation for managing a Queue or a Job.

## Reference documentation

Read about the full set of capabilities of Azure Communication Services Job Router from the [.NET SDK reference](https://learn.microsoft.com/dotnet/api/overview/azure/communication.jobrouter-readme) or [REST API reference](https://learn.microsoft.com/rest/api/communication/jobrouter/operation-groups).

<!-- LINKS -->

[subscribe_events]: ../../how-tos/router-sdk/subscribe-events.md
[offer_issued_event]: ../../how-tos/router-sdk/subscribe-events.md#microsoftcommunicationrouterworkerofferissued




**Applies to: programming-language-javascript**



## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An active Communication Services resource and connection string. [Create a Communication Services resource](../create-communication-resource.md#access-your-connection-strings-and-service-endpoints).
- The latest versions of [Node.js](https://nodejs.org/en/download/package-manager/) Active LTS and Maintenance LTS versions.

## Sample code

You can review and download the sample code for this quick start on [GitHub](https://github.com/Azure-Samples/communication-services-javascript-quickstarts/tree/main/job-router-quickstart).

## Setting up

### Create a new web application

In a terminal or console window, create a new folder for your application and navigate to it.

```console
mkdir acs-router-quickstart && cd acs-router-quickstart
```

Run `npm init` to create a package.json file with default settings.

```console
npm init -y
```

Create a new file `index.js` where you'll add the code for this quickstart.

### Install the packages

You'll need to use the Azure Communication Job Router client library for JavaScript [version 1.0.0](https://www.npmjs.com/package/@azure-rest/communication-job-router) or above.

Use the `npm install` command to install the below Communication Services SDKs for JavaScript.

```console
npm install @azure-rest/communication-job-router --save
```

### Set up the app framework

In the `index.js` file, add the following code. We'll add the code for the quickstart in the `main` function.

``` javascript
const JobRouterClient = require('@azure-rest/communication-job-router').default;

const main = async () => {
  console.log("Azure Communication Services - Job Router Quickstart")

  // Quickstart code goes here

};

main().catch((error) => {
  console.log("Encountered an error");
  console.log(error);
})
```

## Initialize the Job Router client

Job Router clients can be authenticated using your connection string acquired from an Azure Communication Services resource in the Azure portal.  We generate a client to interact with the Job Router service.  For more information on connection strings, see [access-your-connection-strings-and-service-endpoints](../create-communication-resource.md#access-your-connection-strings-and-service-endpoints).

Add the following code in `index.js` inside the `main` function.

```javascript
const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] ||
    "endpoint=https://<resource-name>.communication.azure.com/;<access-key>";
const client = JobRouterClient(connectionString);
```

## Create a distribution policy

Job Router uses a distribution policy to decide how workers are notified of available Jobs and the time to live for the notifications, known as **Offers**. Create the policy by specifying the **Id**, a **name**, an **offerExpiresAfterSeconds**, and a distribution **mode**.

```javascript
const distributionPolicy = await client.path("/routing/distributionPolicies/{distributionPolicyId}", "distribution-policy-1").patch({
    body: {
        offerExpiresAfterSeconds: 60,
        mode: { kind: "longest-idle" },
        name: "My distribution policy"
    },
    contentType: "application/merge-patch+json"
});
```

## Create a queue

Create the Queue by specifying an **ID**, **name**, and provide the **Distribution Policy** object's ID you created above.

```javascript
const queue = await client.path("/routing/queues/{queueId}", "queue-1").patch({
    body: {
        name: "My Queue",
        distributionPolicyId: distributionPolicy.body.id
    },
    contentType: "application/merge-patch+json"
});
```

## Submit a job

Now, we can submit a job directly to that queue, with a worker selector that requires the worker to have the label `Some-Skill` greater than 10.

```javascript
const job = await client.path("/routing/jobs/{jobId}", "job-1").patch({
    body: {
        channelId: "voice",
        queueId: queue.body.id,
        priority: 1,
        requestedWorkerSelectors: [{ key: "Some-Skill", labelOperator: "greaterThan", value: 10 }]
    },
    contentType: "application/merge-patch+json"
});
```

## Create a worker

Now, we create a worker to receive work from that queue, with a label of `Some-Skill` equal to 11 and capacity on `my-channel`.

```javascript
let worker = await client.path("/routing/workers/{workerId}", "worker-1").patch({
    body:  {
        capacity: 1,
        queues: [queue.body.id],
        labels: { "Some-Skill": 11 },
        channels: [{ channelId: "voice", capacityCostPerJob: 1 }],
        availableForOffers: true
    },
    contentType: "application/merge-patch+json"
});
```

## Receive an offer

We should get a [RouterWorkerOfferIssued][offer_issued_event] from our [Event Grid subscription][subscribe_events].
However, we could also wait a few seconds and then query the worker directly against the JobRouter API to see if an offer was issued to it.

```javascript
await new Promise(r => setTimeout(r, 10000));
worker = await client.path("/routing/workers/{workerId}", worker.body.id).get();
for (const offer of worker.body.offers) {
    console.log(`Worker ${worker.body.id} has an active offer for job ${offer.jobId}`);
}
```

## Accept the job offer

Then, the worker can accept the job offer by using the SDK, which assigns the job to the worker.

```javascript
const accept = await client.path("/routing/workers/{workerId}/offers/{offerId}:accept", worker.body.id, worker.body.offers[0].offerId).post();
console.log(`Worker ${worker.body.id} is assigned job ${accept.body.jobId}`);
```

## Complete the job

Once the worker has completed the work associated with the job (for example, completed the call), we complete the job.

```javascript
await client.path("/routing/jobs/{jobId}/assignments/{assignmentId}:complete", accept.body.jobId, accept.body.assignmentId).post();
console.log(`Worker ${worker.body.id} has completed job ${accept.body.jobId}`);
```

## Close the job

Once the worker is ready to take on new jobs, the worker should close the job.  Optionally, the worker can provide a disposition code to indicate the outcome of the job.

```javascript
await client.path("/routing/jobs/{jobId}/assignments/{assignmentId}:close", accept.body.jobId, accept.body.assignmentId).post({
    body: { dispositionCode: "Resolved" }
});
console.log(`Worker ${worker.body.id} has closed job ${accept.body.jobId}`);
```

## Delete the job

Once the job has been closed, we can delete the job so that we can re-create the job with the same ID if we run this sample again

```javascript
await client.path("/routing/jobs/{jobId}", accept.body.jobId).delete();
console.log(`Deleting job ${accept.body.jobId}`);
```

## Run the code

To run the code, make sure you are on the directory where your `index.js` file is.

```console
node index.js

Azure Communication Services - Job Router Quickstart
Worker worker-1 has an active offer for job job-1
Worker worker-1 is assigned job job-1
Worker worker-1 has completed job job-1
Worker worker-1 has closed job job-1
Deleting job job-1
```

> **Note:**
> Running the application more than once will cause a new Job to be placed in the queue each time. This can cause the Worker to be offered a Job other than the one created when you run the above code. Since this can skew your request, considering deleting Jobs in the queue each time. Refer to the SDK documentation for managing a Queue or a Job.

## Reference documentation

Read about the full set of capabilities of Azure Communication Services Job Router from the [JavaScript SDK reference](https://learn.microsoft.com/javascript/api/overview/azure/communication-job-router-rest-readme) or [REST API reference](https://learn.microsoft.com/rest/api/communication/jobrouter/operation-groups).

<!-- LINKS -->

[subscribe_events]: ../../how-tos/router-sdk/subscribe-events.md
[offer_issued_event]: ../../how-tos/router-sdk/subscribe-events.md#microsoftcommunicationrouterworkerofferissued



**Applies to: programming-language-python**



## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An active Communication Services resource and connection string. [Create a Communication Services resource](../create-communication-resource.md).
- [Python](https://www.python.org/downloads/) 3.7+ for your operating system.

## Sample code

You can review and download the sample code for this quick start on [GitHub](https://github.com/Azure-Samples/communication-services-python-quickstarts/tree/main/jobrouter-quickstart).

## Setting up

### Create a new Python application

In a terminal or console window, create a new folder for your application and navigate to it.

```console
mkdir jobrouter-quickstart && cd jobrouter-quickstart
```

### Install the package

You'll need to use the Azure Communication Job Router client library for Python [version 1.0.0](https://pypi.org/project/azure-communication-jobrouter) or above.

From a console prompt, execute the following command:

```console
pip install azure-communication-jobrouter
```

### Set up the app framework

Create a new file called `router-quickstart.py` and add the basic program structure.

```python
import time
from azure.communication.jobrouter import (
    JobRouterClient,
    JobRouterAdministrationClient
)
from azure.communication.jobrouter.models import (
    LongestIdleMode,
    RouterWorkerSelector,
    LabelOperator,
    RouterChannel,
    CloseJobOptions
)

class RouterQuickstart(object):
    print("Azure Communication Services - Job Router Quickstart")
    #Job Router method implementations goes here

if __name__ == '__main__':
    router = RouterQuickstart()
```

## Initialize the Job Router client and administration client

Job Router clients can be authenticated using your connection string acquired from an Azure Communication Services resource in the Azure portal.  We generate both a client and an administration client to interact with the Job Router service.  The admin client is used to provision queues and policies, while the client is used to submit jobs and register workers. For more information on connection strings, see [access-your-connection-strings-and-service-endpoints](../create-communication-resource.md#access-your-connection-strings-and-service-endpoints).

```python
# Get a connection string to our Azure Communication Services resource.
router_admin_client = JobRouterAdministrationClient.from_connection_string(conn_str = "your_connection_string")
router_client = JobRouterClient.from_connection_string(conn_str = "your_connection_string")
```

## Create a distribution policy

Job Router uses a distribution policy to decide how Workers will be notified of available Jobs and the time to live for the notifications, known as **Offers**. Create the policy by specifying the **distribution_policy_id**, a **name**, an **offer_expires_after_seconds** value, and a distribution **mode**.

```python
distribution_policy = router_admin_client.upsert_distribution_policy(
    distribution_policy_id ="distribution-policy-1",
    offer_expires_after_seconds = 60,
    mode = LongestIdleMode(),
    name = "My distribution policy")
```

## Create a queue

Create the Queue by specifying an **ID**, **name**, and provide the **Distribution Policy** object's ID you created above.

```python
queue = router_admin_client.upsert_queue(
    queue_id = "queue-1",
    name = "My Queue",
    distribution_policy_id = distribution_policy.id)
```

## Submit a job

Now, we can submit a job directly to that queue, with a worker selector that requires the worker to have the label `Some-Skill` greater than 10.

```python
job = router_client.upsert_job(
    job_id = "job-1",
    channel_id = "voice",
    queue_id = queue.id,
    priority = 1,
    requested_worker_selectors = [
        RouterWorkerSelector(
            key = "Some-Skill",
            label_operator = LabelOperator.GREATER_THAN,
            value = 10
        )
    ])
```

## Create a worker

Now, we create a worker to receive work from that queue, with a label of `Some-Skill` equal to 11 and capacity on `my-channel`.

```python
worker = router_client.upsert_worker(
    worker_id = "worker-1",
    capacity = 1,
    queues = ["queue-1"],
    labels = {
        "Some-Skill": 11
    },
    channels = [RouterChannel(channel_id = "voice", capacity_cost_per_job = 1)],
    available_for_offers = True
)
```

## Receive an offer

We should get a [RouterWorkerOfferIssued][offer_issued_event] from our [Event Grid subscription][subscribe_events].
However, we could also wait a few seconds and then query the worker directly against the JobRouter API to see if an offer was issued to it.

```python
time.sleep(10)
worker = router_client.get_worker(worker_id = worker.id)
for offer in worker.offers:
    print(f"Worker {worker.id} has an active offer for job {offer.job_id}")
```

## Accept the job offer

Then, the worker can accept the job offer by using the SDK, which assigns the job to the worker.

```python
accept = router_client.accept_job_offer(worker_id = worker.id, offer_id = worker.offers[0].offer_id)
print(f"Worker {worker.id} is assigned job {accept.job_id}")
```

## Complete the job

Once the worker has completed the work associated with the job (for example, completed the call), we complete the job.

```python
router_client.complete_job(job_id = job.id, assignment_id = accept.assignment_id)
print(f"Worker {worker.id} has completed job {accept.job_id}")
```

## Close the job

Once the worker is ready to take on new jobs, the worker should close the job.  Optionally, the worker can provide a disposition code to indicate the outcome of the job.

```python
router_client.close_job(job_id = job.id, assignment_id = accept.assignment_id, options = CloseJobOptions(disposition_code = "Resolved"))
print(f"Worker {worker.id} has closed job {accept.job_id}")
```

## Delete the job

Once the job has been closed, we can delete the job so that we can re-create the job with the same ID if we run this sample again

```python
router_client.delete_job(accept.job_id)
print(f"Deleting {accept.job_id}")
```

## Run the code

To run the code, make sure you are on the directory where your `router-quickstart.py` file is.

```console
python router-quickstart.py

Azure Communication Services - Job Router Quickstart
Worker worker-1 has an active offer for job job-1
Worker worker-1 is assigned job job-1
Worker worker-1 has completed job job-1
Worker worker-1 has closed job job-1
Deleting job job-1
```

> **Note:**
> Running the application more than once will cause a new Job to be placed in the queue each time. This can cause the Worker to be offered a Job other than the one created when you run the above code. Since this can skew your request, considering deleting Jobs in the queue each time. Refer to the SDK documentation for managing a Queue or a Job.

## Reference documentation

Read about the full set of capabilities of Azure Communication Services Job Router from the [Python SDK reference](https://learn.microsoft.com/python/api/overview/azure/communication-jobrouter-readme) or [REST API reference](https://learn.microsoft.com/rest/api/communication/jobrouter/operation-groups).

<!-- LINKS -->

[subscribe_events]: ../../how-tos/router-sdk/subscribe-events.md
[offer_issued_event]: ../../how-tos/router-sdk/subscribe-events.md#microsoftcommunicationrouterworkerofferissued



**Applies to: programming-language-java**



## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An active Communication Services resource and connection string. [Create a Communication Services resource](../create-communication-resource.md#access-your-connection-strings-and-service-endpoints).
- [Java Development Kit (JDK)](https://learn.microsoft.com/java/azure/jdk/?view=azure-java-stable\&preserve-view=true) version 8 or above.
- [Apache Maven](https://maven.apache.org/download.cgi)

## Sample code

You can review and download the sample code for this quick start on [GitHub](https://github.com/Azure-Samples/communication-services-java-quickstarts/tree/main/jobrouter-quickstart-java).

## Setting up

### Create a new Java application

In a console window (such as cmd, PowerShell, or Bash), use the `mvn` command below to create a new console app with the name `router-quickstart`. This command creates a simple "Hello World" Java project with a single source file: **App.java**.

```console
mvn archetype:generate -DgroupId=com.communication.jobrouter.quickstart -DartifactId=jobrouter-quickstart-java -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.4 -DinteractiveMode=false
```

### Include the package

You'll need to use the Azure Communication Job Router client library for Java [version 1.0.0](https://search.maven.org/artifact/com.azure/azure-communication-jobrouter/1.0.0/jar) or above.

#### Include the BOM file

Include the `azure-sdk-bom` to your project to take dependency on the General Availability (GA) version of the library. In the following snippet, replace the {bom_version_to_target} placeholder with the version number.
To learn more about the BOM, see the [Azure SDK BOM readme](https://github.com/Azure/azure-sdk-for-java/blob/main/sdk/boms/azure-sdk-bom/README.md).

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

and then include the direct dependency in the dependencies section without the version tag.

```xml
<dependencies>
  <dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-communication-jobrouter</artifactId>
  </dependency>
</dependencies>
```

#### Include direct dependency
If you want to take dependency on a particular version of the library that isn't present in the BOM, add the direct dependency to your project as follows.

```xml
<dependency>
  <groupId>com.azure</groupId>
  <artifactId>azure-communication-jobrouter</artifactId>
  <version>1.0.0</version>
</dependency>
```

### Set up app framework

Go to the /src/main/java/com/communication/quickstart directory and open the `App.java` file. Add the following code:

```java
package com.communication.quickstart;

import com.azure.communication.jobrouter.JobRouterAdministrationClient;
import com.azure.communication.jobrouter.JobRouterAdministrationClientBuilder;
import com.azure.communication.jobrouter.JobRouterClient;
import com.azure.communication.jobrouter.JobRouterClientBuilder;
import com.azure.communication.jobrouter.*;
import com.azure.communication.jobrouter.models.*;

import java.time.Duration;
import java.util.List;
import java.util.Map;

public class App
{
    public static void main(String[] args) throws IOException
    {
        System.out.println("Azure Communication Services - Job Router Quickstart");
        // Quickstart code goes here
    }
}
```

## Initialize the Job Router client and administration client

Job Router clients can be authenticated using your connection string acquired from an Azure Communication Services resource in the Azure portal.  We generate both a client and an administration client to interact with the Job Router service.  The admin client is used to provision queues and policies, while the client is used to submit jobs and register workers. For more information on connection strings, see [access-your-connection-strings-and-service-endpoints](../create-communication-resource.md#access-your-connection-strings-and-service-endpoints).

```java
// Get a connection string to our Azure Communication Services resource.
JobRouterAdministrationClient routerAdminClient = new JobRouterAdministrationClientBuilder().connectionString("your_connection_string").buildClient();
JobRouterClient routerClient = new JobRouterClientBuilder().connectionString("your_connection_string").buildClient();
```

## Create a distribution policy

Job Router uses a distribution policy to decide how Workers will be notified of available Jobs and the time to live for the notifications, known as **Offers**. Create the policy by specifying the **ID**, a **name**, an **offerExpiresAfter**, and a distribution **mode**.

```java
DistributionPolicy distributionPolicy = routerAdminClient.createDistributionPolicy(
    new CreateDistributionPolicyOptions("distribution-policy-1", Duration.ofMinutes(1), new LongestIdleMode())
        .setName("My distribution policy"));
```

## Create a queue

Create the Queue by specifying an **ID**, **name**, and provide the **Distribution Policy** object's ID you created above.

```java
RouterQueue queue = routerAdminClient.createQueue(
    new CreateQueueOptions("queue-1", distributionPolicy.getId()).setName("My queue")
);
```

## Submit a job

Now, we can submit a job directly to that queue, with a worker selector that requires the worker to have the label `Some-Skill` greater than 10.

```java
RouterJob job = routerClient.createJob(new CreateJobOptions("job-1", "voice", queue.getId())
    .setPriority(1)
    .setRequestedWorkerSelectors(List.of(
        new RouterWorkerSelector("Some-Skill", LabelOperator.GREATER_THAN, new RouterValue(10)))));
```

## Create a worker

Now, we create a worker to receive work from that queue, with a label of `Some-Skill` equal to 11 and capacity on `my-channel`.

```java
RouterWorker worker = routerClient.createWorker(
    new CreateWorkerOptions("worker-1", 1)
        .setQueues(List.of(queue.getId()))
        .setLabels(Map.of("Some-Skill", new RouterValue(11)))
        .setChannels(List.of(new RouterChannel("voice", 1))));
```

## Receive an offer

We should get a [RouterWorkerOfferIssued][offer_issued_event] from our [Event Grid subscription][subscribe_events].
However, we could also wait a few seconds and then query the worker directly against the JobRouter API to see if an offer was issued to it.

```java
Thread.sleep(10000);
worker = routerClient.getWorker(worker.getId());
for (RouterJobOffer offer : worker.getOffers()) {
    System.out.printf("Worker %s has an active offer for job %s\n", worker.getId(), offer.getJobId());
}
```

## Accept the job offer

Then, the worker can accept the job offer by using the SDK, which assigns the job to the worker.

```java
AcceptJobOfferResult accept = routerClient.acceptJobOffer(worker.getId(), worker.getOffers().get(0).getOfferId());
System.out.printf("Worker %s is assigned job %s\n", worker.getId(), accept.getJobId());
```

## Complete the job

Once the worker has completed the work associated with the job (for example, completed the call), we complete the job.

```java
routerClient.completeJobWithResponse(accept.getJobId(), accept.getAssignmentId(), null);
System.out.printf("Worker %s has completed job %s\n", worker.getId(), accept.getJobId());
```

## Close the job

Once the worker is ready to take on new jobs, the worker should close the job.

```java
routerClient.closeJobWithResponse(accept.getJobId(), accept.getAssignmentId(), null);
System.out.printf("Worker %s has closed job %s\n", worker.getId(), accept.getJobId());
```

## Delete the job

Once the job has been closed, we can delete the job so that we can re-create the job with the same ID if we run this sample again

```java
routerClient.deleteJob(accept.getJobId());
System.out.printf("Deleting job %s\n", accept.getJobId());
```

## Run the code

To run the code, go to the directory that contains the `pom.xml` file and compile the program.

```console
mvn compile
```

Then, build the package:

```console
mvn package
```

Execute the app

```console
mvn exec:java -Dexec.mainClass="com.communication.jobrouter.quickstart.App" -Dexec.cleanupDaemonThreads=false
```

The expected output describes each completed action:

```console
Azure Communication Services - Job Router Quickstart
Worker worker-1 has an active offer for job job-1
Worker worker-1 is assigned job job-1
Worker worker-1 has completed job job-1
Worker worker-1 has closed job job-1
Deleting job job-1
```

> **Note:**
> Running the application more than once will cause a new Job to be placed in the queue each time. This can cause the Worker to be offered a Job other than the one created when you run the above code. Since this can skew your request, considering deleting Jobs in the queue each time. Refer to the SDK documentation for managing a Queue or a Job.

## Reference documentation

Read about the full set of capabilities of Azure Communication Services Job Router from the [Java SDK reference](https://learn.microsoft.com/java/api/overview/azure/communication-jobrouter) or [REST API reference](https://learn.microsoft.com/rest/api/communication/jobrouter/job-router-operations).

<!-- LINKS -->

[subscribe_events]: ../../how-tos/router-sdk/subscribe-events.md
[offer_issued_event]: ../../how-tos/router-sdk/subscribe-events.md#microsoftcommunicationrouterworkerofferissued



## Next Steps
Explore Job Router How-To's [tutorials](https://learn.microsoft.com/azure/communication-services/concepts/router/concepts#check-out-our-how-to-guides)

<!-- LINKS -->
[subscribe_events]: ../../how-tos/router-sdk/subscribe-events.md
[worker_registered_event]: ../../how-tos/router-sdk/subscribe-events.md#microsoftcommunicationrouterworkerregistered
[job_classified_event]: ../../how-tos/router-sdk/subscribe-events.md#microsoftcommunicationrouterjobclassified
[offer_issued_event]: ../../how-tos/router-sdk/subscribe-events.md#microsoftcommunicationrouterworkerofferissued
[offer_accepted_event]: ../../how-tos/router-sdk/subscribe-events.md#microsoftcommunicationrouterworkerofferaccepted
