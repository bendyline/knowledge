---
description: "Learn more about: Flowing Transactions into and out of Workflow Services"
title: "Flowing Transactions into and out of Workflow Services"
ms.date: "03/30/2017"
ms.assetid: 03ced70e-b540-4dd9-86c8-87f7bd61f609
---
# Flowing Transactions into and out of Workflow Services

Workflow services and clients can participate in transactions.  For a service operation to become part of an ambient transaction, place a [System.ServiceModel.Activities.Receive](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Receive) activity within a [System.ServiceModel.Activities.TransactedReceiveScope](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.TransactedReceiveScope) activity. Any calls made by a [System.ServiceModel.Activities.Send](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Send) or a [System.ServiceModel.Activities.SendReply](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.SendReply) activity within the [System.ServiceModel.Activities.TransactedReceiveScope](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.TransactedReceiveScope) will also be made within the ambient transaction. A workflow client application can create an ambient transaction by using the [System.Activities.Statements.TransactionScope](https://learn.microsoft.com/search/?terms=System.Activities.Statements.TransactionScope) activity and call service operations using the ambient transaction. This topic walks you through creating a workflow service and workflow client that participate in transactions.

> **Warning:**
> If a workflow service instance is loaded within a transaction and the workflow contains a [System.Activities.Statements.Persist](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Persist) activity, the workflow instance will block until the transaction times out.

> **Important:**
> Whenever you use a [System.ServiceModel.Activities.TransactedReceiveScope](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.TransactedReceiveScope) it is recommended to place all Receives in the workflow within [System.ServiceModel.Activities.TransactedReceiveScope](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.TransactedReceiveScope) activities.

> **Important:**
> When using [System.ServiceModel.Activities.TransactedReceiveScope](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.TransactedReceiveScope) and messages arrive in the incorrect order, the workflow will be aborted when trying to deliver the first out of order message. You must make sure your workflow is always at a consistent stopping point when the workflow idles. This will allow you to restart the workflow from a previous persistence point should the workflow be aborted.

### Create a shared library

1. Create a new empty Visual Studio Solution.

2. Add a new class library project called `Common`. Add references to the following assemblies:

    - System.Activities.dll

    - System.ServiceModel.dll

    - System.ServiceModel.Activities.dll

    - System.Transactions.dll

3. Add a new class called `PrintTransactionInfo` to the `Common` project. This class is derived from [System.Activities.NativeActivity](https://learn.microsoft.com/search/?terms=System.Activities.NativeActivity) and overloads the [System.Activities.NativeActivity.Execute*](https://learn.microsoft.com/search/?terms=System.Activities.NativeActivity.Execute*) method.

    ```csharp
    using System;
    using System;
    using System.Activities;
    using System.Transactions;

    namespace Common
    {
        public class PrintTransactionInfo : NativeActivity
        {
            protected override void Execute(NativeActivityContext context)
            {
                RuntimeTransactionHandle rth = context.Properties.Find(typeof(RuntimeTransactionHandle).FullName) as RuntimeTransactionHandle;

                if (rth == null)
                {
                    Console.WriteLine("There is no ambient RuntimeTransactionHandle");
                }

                Transaction t = rth.GetCurrentTransaction(context);

                if (t == null)
                {
                    Console.WriteLine("There is no ambient transaction");
                }
                else
                {
                    Console.WriteLine("Transaction: {0} is {1}", t.TransactionInformation.DistributedIdentifier, t.TransactionInformation.Status);
                }
            }
        }

    }
    ```

     This is a native activity that displays information about the ambient transaction and is used in both the service and client workflows used in this topic. Build the solution to make this activity available in the **Common** section of the **Toolbox**.

### Implement the workflow service

1. Add a new WCF Workflow Service, called `WorkflowService` to the `Common` project. To do this right click the `Common` project, select **Add**, **New Item ...**, Select **Workflow** under **Installed Templates** and select **WCF Workflow Service**.

     Adding a Workflow Service

2. Delete the default `ReceiveRequest` and `SendResponse` activities.

3. Drag and drop a [System.Activities.Statements.WriteLine](https://learn.microsoft.com/search/?terms=System.Activities.Statements.WriteLine) activity into the `Sequential Service` activity. Set the text property to `"Workflow Service starting ..."` as shown in the following example.

     ![Adding a WriteLine activity to the Sequential Service activity(./media/flowing-transactions-into-and-out-of-workflow-services/add-writeline-sequential-service.jpg)

4. Drag and drop a [System.ServiceModel.Activities.TransactedReceiveScope](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.TransactedReceiveScope) after the [System.Activities.Statements.WriteLine](https://learn.microsoft.com/search/?terms=System.Activities.Statements.WriteLine) activity. The [System.ServiceModel.Activities.TransactedReceiveScope](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.TransactedReceiveScope) activity can be found in the **Messaging** section of the **Toolbox**. The [System.ServiceModel.Activities.TransactedReceiveScope](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.TransactedReceiveScope) activity is composed of two sections **Request** and **Body**. The **Request** section contains the [System.ServiceModel.Activities.Receive](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Receive) activity. The **Body** section contains the activities to execute within a transaction after a message has been received.

     Adding a TransactedReceiveScope activity

5. Select the [System.ServiceModel.Activities.TransactedReceiveScope](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.TransactedReceiveScope) activity and click the **Variables** button. Add the following variables.

     Adding variables to the TransactedReceiveScope

    > **Note:**
    > You can delete the data variable that is there by default. You can also use the existing handle variable.

6. Drag and drop a [System.ServiceModel.Activities.Receive](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Receive) activity within the **Request** section of the [System.ServiceModel.Activities.TransactedReceiveScope](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.TransactedReceiveScope) activity. Set the following properties:

    | Property | Value |
    | --- | --- |
    | CanCreateInstance | True (check the checkbox) |
    | OperationName | StartSample |
    | ServiceContractName | ITransactionSample |

     The workflow should look like this:

     Adding a Receive activity

7. Click the **Define...** link in the [System.ServiceModel.Activities.Receive](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Receive) activity and make the following settings:

     Setting message settings for the Receive activity

8. Drag and drop a [System.Activities.Statements.Sequence](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Sequence) activity into the Body section of the [System.ServiceModel.Activities.TransactedReceiveScope](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.TransactedReceiveScope). Within the [System.Activities.Statements.Sequence](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Sequence) activity drag and drop two [System.Activities.Statements.WriteLine](https://learn.microsoft.com/search/?terms=System.Activities.Statements.WriteLine) activities and set the [System.Activities.Statements.WriteLine.Text](https://learn.microsoft.com/search/?terms=System.Activities.Statements.WriteLine.Text) properties as shown in the following table.

    | Activity | Value |
    | --- | --- |
    | 1st WriteLine | "Service: Receive Completed" |
    | 2nd WriteLine | "Service: Received = " + requestMessage |

     The workflow should now look like this:

     Sequence after adding WriteLine activities

9. Drag and drop the `PrintTransactionInfo` activity after the second [System.Activities.Statements.WriteLine](https://learn.microsoft.com/search/?terms=System.Activities.Statements.WriteLine) activity in the **Body** in the [System.ServiceModel.Activities.TransactedReceiveScope](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.TransactedReceiveScope) activity.

     Sequence after adding PrintTransactionInfo

10. Drag and drop an [System.Activities.Statements.Assign](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Assign) activity after the `PrintTransactionInfo` activity and set its properties according to the following table.

    | Property | Value |
    | --- | --- |
    | To | replyMessage |
    | Value | "Service: Sending reply." |

11. Drag and drop a [System.Activities.Statements.WriteLine](https://learn.microsoft.com/search/?terms=System.Activities.Statements.WriteLine) activity after the [System.Activities.Statements.Assign](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Assign) activity and set its [System.Activities.Statements.WriteLine.Text](https://learn.microsoft.com/search/?terms=System.Activities.Statements.WriteLine.Text) property to "Service: Begin reply."

     The workflow should now look like this:

     After adding Assign and WriteLine

12. Right click the [System.ServiceModel.Activities.Receive](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Receive) activity and select **Create SendReply** and paste it after the last [System.Activities.Statements.WriteLine](https://learn.microsoft.com/search/?terms=System.Activities.Statements.WriteLine) activity. Click the **Define...** link in the `SendReplyToReceive` activity and make the following settings.

     Reply message settings

13. Drag and drop a [System.Activities.Statements.WriteLine](https://learn.microsoft.com/search/?terms=System.Activities.Statements.WriteLine) activity after the `SendReplyToReceive` activity and set it’s [System.Activities.Statements.WriteLine.Text](https://learn.microsoft.com/search/?terms=System.Activities.Statements.WriteLine.Text) property to "Service: Reply sent."

14. Drag and drop a [System.Activities.Statements.WriteLine](https://learn.microsoft.com/search/?terms=System.Activities.Statements.WriteLine) activity at the bottom of the workflow and set its [System.Activities.Statements.WriteLine.Text](https://learn.microsoft.com/search/?terms=System.Activities.Statements.WriteLine.Text) property to "Service: Workflow ends, press ENTER to exit."

     The completed service workflow should look like this:

     Complete Service Workflow

### Implement the workflow client

1. Add a new WCF Workflow application, called `WorkflowClient` to the `Common` project. To do this right click the `Common` project, select **Add**, **New Item ...**, Select **Workflow** under **Installed Templates** and select **Activity**.

     Add an Activity project

2. Drag and drop a [System.Activities.Statements.Sequence](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Sequence) activity onto the design surface.

3. Within the [System.Activities.Statements.Sequence](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Sequence) activity drag and drop a [System.Activities.Statements.WriteLine](https://learn.microsoft.com/search/?terms=System.Activities.Statements.WriteLine) activity and set its [System.Activities.Statements.WriteLine.Text](https://learn.microsoft.com/search/?terms=System.Activities.Statements.WriteLine.Text) property to `"Client: Workflow starting"`. The workflow should now look like this:

     Add a WriteLine activity

4. Drag and drop a [System.Activities.Statements.TransactionScope](https://learn.microsoft.com/search/?terms=System.Activities.Statements.TransactionScope) activity after the [System.Activities.Statements.WriteLine](https://learn.microsoft.com/search/?terms=System.Activities.Statements.WriteLine) activity.  Select the [System.Activities.Statements.TransactionScope](https://learn.microsoft.com/search/?terms=System.Activities.Statements.TransactionScope) activity, click the Variables button and add the following variables.

     Add variables to the TransactionScope

5. Drag and drop a [System.Activities.Statements.Sequence](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Sequence) activity into the body of the [System.Activities.Statements.TransactionScope](https://learn.microsoft.com/search/?terms=System.Activities.Statements.TransactionScope) activity.

6. Drag and drop a `PrintTransactionInfo` activity within the [System.Activities.Statements.Sequence](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Sequence)

7. Drag and drop a [System.Activities.Statements.WriteLine](https://learn.microsoft.com/search/?terms=System.Activities.Statements.WriteLine) activity after the `PrintTransactionInfo` activity and set its [System.Activities.Statements.WriteLine.Text](https://learn.microsoft.com/search/?terms=System.Activities.Statements.WriteLine.Text) property to "Client: Beginning Send". The workflow should now look like this:

     Adding Client: Beginning Send activities

8. Drag and drop a [System.ServiceModel.Activities.Send](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Send) activity after the [System.Activities.Statements.Assign](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Assign) activity and set the following properties:

    | Property | Value |
    | --- | --- |
    | EndpointConfigurationName | workflowServiceEndpoint |
    | OperationName | StartSample |
    | ServiceContractName | ITransactionSample |

     The workflow should now look like this:

     Setting the Send activity properties

9. Click the **Define...** link and make the following settings:

     Send activity message settings

10. Right click the [System.ServiceModel.Activities.Send](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Send) activity and select **Create ReceiveReply**. The [System.ServiceModel.Activities.ReceiveReply](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.ReceiveReply) activity will be automatically placed after the [System.ServiceModel.Activities.Send](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Send) activity.

11. Click the Define... link on the ReceiveReplyForSend activity and make the following settings:

     Setting the ReceiveForSend message settings

12. Drag and drop a [System.Activities.Statements.WriteLine](https://learn.microsoft.com/search/?terms=System.Activities.Statements.WriteLine) activity between the [System.ServiceModel.Activities.Send](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Send) and [System.ServiceModel.Activities.ReceiveReply](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.ReceiveReply) activities and set its [System.Activities.Statements.WriteLine.Text](https://learn.microsoft.com/search/?terms=System.Activities.Statements.WriteLine.Text) property to "Client: Send complete."

13. Drag and drop a [System.Activities.Statements.WriteLine](https://learn.microsoft.com/search/?terms=System.Activities.Statements.WriteLine) activity after the [System.ServiceModel.Activities.ReceiveReply](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.ReceiveReply) activity and set its [System.Activities.Statements.WriteLine.Text](https://learn.microsoft.com/search/?terms=System.Activities.Statements.WriteLine.Text) property to "Client side: Reply received = " + replyMessage

14. Drag and drop a `PrintTransactionInfo` activity after the [System.Activities.Statements.WriteLine](https://learn.microsoft.com/search/?terms=System.Activities.Statements.WriteLine) activity.

15. Drag and drop a [System.Activities.Statements.WriteLine](https://learn.microsoft.com/search/?terms=System.Activities.Statements.WriteLine) activity at the end of the workflow and set its [System.Activities.Statements.WriteLine.Text](https://learn.microsoft.com/search/?terms=System.Activities.Statements.WriteLine.Text) property to "Client workflow ends." The completed client workflow should look like the following diagram.

     The completed client workflow

16. Build the solution.

### Create the Service application

1. Add a new Console Application project called `Service` to the solution. Add references to the following assemblies:

    1. System.Activities.dll

    2. System.ServiceModel.dll

    3. System.ServiceModel.Activities.dll

2. Open the generated Program.cs file and the following code:

    ```csharp
          static void Main()
          {
              Console.WriteLine("Building the server.");
              using (WorkflowServiceHost host = new WorkflowServiceHost(new DeclarativeServiceWorkflow(), new Uri("net.tcp://localhost:8000/TransactedReceiveService/Declarative")))
              {
                  //Start the server
                  host.Open();
                  Console.WriteLine("Service started.");

                  Console.WriteLine();
                  Console.ReadLine();
                  //Shutdown
                  host.Close();
              };
          }
    ```

3. Add the following app.config file to the project.

    ```xml
    <?xml version="1.0" encoding="utf-8" ?>
    <!-- Copyright © Microsoft Corporation.  All rights reserved. -->
    <configuration>
        <system.serviceModel>
            <bindings>
                <netTcpBinding>
                    <binding transactionFlow="true" />
                </netTcpBinding>
            </bindings>
        </system.serviceModel>
    </configuration>
    ```

### Create the client application

1. Add a new Console Application project called `Client` to the solution. Add a reference to System.Activities.dll.

2. Open the program.cs file and add the following code.

    ```csharp
    class Program
    {

        private static AutoResetEvent syncEvent = new AutoResetEvent(false);

        static void Main(string[] args)
        {
            //Build client
            Console.WriteLine("Building the client.");
            WorkflowApplication client = new WorkflowApplication(new DeclarativeClientWorkflow());
            client.Completed = Program.Completed;
            client.Aborted = Program.Aborted;
            client.OnUnhandledException = Program.OnUnhandledException;
            //Wait for service to start
            Console.WriteLine("Press ENTER once service is started.");
            Console.ReadLine();

            //Start the client
            Console.WriteLine("Starting the client.");
            client.Run();
            syncEvent.WaitOne();

            //Sample complete
            Console.WriteLine();
            Console.WriteLine("Client complete. Press ENTER to exit.");
            Console.ReadLine();
        }

        private static void Completed(WorkflowApplicationCompletedEventArgs e)
        {
            Program.syncEvent.Set();
        }

        private static void Aborted(WorkflowApplicationAbortedEventArgs e)
        {
            Console.WriteLine("Client Aborted: {0}", e.Reason);
            Program.syncEvent.Set();
        }

        private static UnhandledExceptionAction OnUnhandledException(WorkflowApplicationUnhandledExceptionEventArgs e)
        {
            Console.WriteLine("Client had an unhandled exception: {0}", e.UnhandledException);
            return UnhandledExceptionAction.Cancel;
        }
    }
    ```

## See also

- [Workflow Services](workflow-services.md)
- [Windows Communication Foundation Transactions Overview](transactions-overview.md)
