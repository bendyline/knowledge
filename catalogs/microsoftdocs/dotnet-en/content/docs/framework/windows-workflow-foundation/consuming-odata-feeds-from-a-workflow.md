---
description: "Learn more about: Consuming OData feeds from a workflow"
title: "Consuming OData feeds from a workflow - WF"
ms.date: "03/30/2017"
ms.assetid: 1b26617c-53e9-476a-81af-675c36d95919
---
# Consuming OData feeds from a workflow

WCF Data Services is a component of the .NET Framework that enables you to create services that use the Open Data Protocol (OData) to expose and consume data over the Web or intranet by using the semantics of representational state transfer (REST). OData exposes data as resources that are addressable by URIs. Any application can interact with an OData-based data service if it can send an HTTP request and process the OData feed that a data service returns. In addition, WCF Data Services includes client libraries that provide a richer programming experience when you consume OData feeds from .NET Framework applications. This topic provides an overview of consuming an OData feed in a workflow with and without using the client libraries.

## Using the sample Northwind OData service

The examples in this topic use the sample Northwind data service located at <https://services.odata.org/Northwind/Northwind.svc/>. This service is provided as part of the [OData SDK](https://www.odata.org/ecosystem/#sdk) and provides read-only access to the sample Northwind database. If write access is desired, or if a local WCF Data Service is desired, you can follow the steps of the [WCF Data Services Quickstart](https://learn.microsoft.com/previous-versions/dotnet/framework/data/wcf/quickstart-wcf-data-services) to create a local OData service that provides access to the Northwind database. If you follow the quickstart, substitute the local URI for the one provided in the example code in this topic.

## Consuming an OData feed using the client libraries

WCF Data Services includes client libraries that enable you to more easily consume an OData feed from .NET Framework and client applications. These libraries simplify sending and receiving HTTP messages. They also translate the message payload into CLR objects that represent entity data. The client libraries feature the two core classes [System.Data.Services.Client.DataServiceContext](https://learn.microsoft.com/search/?terms=System.Data.Services.Client.DataServiceContext) and [System.Data.Services.Client.DataServiceQuery`1](https://learn.microsoft.com/search/?terms=System.Data.Services.Client.DataServiceQuery%601). These classes enable you to query a data service and then work with the returned entity data as CLR objects. This section covers two approaches to creating activities that use the client libraries.

### Adding a service reference to the WCF Data service

To generate the Northwind client libraries, you can use the **Add Service Reference** dialog box in Visual Studio 2012 to add a reference to the Northwind OData service.

Screenshot that shows the Add Service Reference dialog.

Note that there are no service operations exposed by the service, and in the **Services** list there are items representing the entities exposed by the Northwind data service. When the service reference is added, classes will be generated for these entities and they can be used in the client code. The examples in this topic use these classes and the `NorthwindEntities` class to perform the queries.

> **Note:**
> For more information, see [Generating the Data Service Client Library (WCF Data Services)](https://learn.microsoft.com/previous-versions/dotnet/framework/data/wcf/generating-the-data-service-client-library-wcf-data-services).

### Using asynchronous methods

To address possible latency issues that may occur when accessing resources over the Web, we recommend accessing WCF Data Services asynchronously. The WCF Data Services client libraries include asynchronous methods for invoking queries, and Windows Workflow Foundation (WF) provides the [System.Activities.AsyncCodeActivity](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivity) class for authoring asynchronous activities. [System.Activities.AsyncCodeActivity](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivity) derived activities can be written to take advantage of .NET Framework classes that have asynchronous methods, or the code to be executed asynchronously can be put into a method and invoked by using a delegate. This section provides two examples of an [System.Activities.AsyncCodeActivity](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivity) derived activity; one that uses the asynchronous methods of the WCF Data Services client libraries and one that uses a delegate.

> **Note:**
> For more information, see [Asynchronous Operations (WCF Data Services)](https://learn.microsoft.com/previous-versions/dotnet/framework/data/wcf/asynchronous-operations-wcf-data-services) and [Creating Asynchronous Activities](creating-asynchronous-activities-in-wf.md).

### Using client library asynchronous methods

The [System.Data.Services.Client.DataServiceQuery`1](https://learn.microsoft.com/search/?terms=System.Data.Services.Client.DataServiceQuery%601) class provides [System.Data.Services.Client.DataServiceQuery`1.BeginExecute*](https://learn.microsoft.com/search/?terms=System.Data.Services.Client.DataServiceQuery%601.BeginExecute*) and [System.Data.Services.Client.DataServiceQuery`1.EndExecute*](https://learn.microsoft.com/search/?terms=System.Data.Services.Client.DataServiceQuery%601.EndExecute*) methods for querying an OData service asynchronously. These methods can be called from the [System.Activities.AsyncCodeActivity.BeginExecute*](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivity.BeginExecute*) and [System.Activities.AsyncCodeActivity.EndExecute*](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivity.EndExecute*) overrides of an [System.Activities.AsyncCodeActivity](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivity) derived class. When the [System.Activities.AsyncCodeActivity](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivity) [System.Activities.AsyncCodeActivity.BeginExecute*](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivity.BeginExecute*) override returns, the workflow can go idle (but not persist), and when the asynchronous work is completed, [System.Activities.AsyncCodeActivity.EndExecute*](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivity.EndExecute*) is invoked by the runtime.

In the following example, an `OrdersByCustomer` activity is defined that has two input arguments. The `CustomerId` argument represents the customer who identifies which orders to return, and the `ServiceUri` argument represents the URI of the OData service to be queried. Because the activity derives from `AsyncCodeActivity<IEnumerable<Order>>` there is also a [System.Activities.Activity`1.Result*](https://learn.microsoft.com/search/?terms=System.Activities.Activity%601.Result*) output argument that is used to return the results of the query. The [System.Activities.AsyncCodeActivity.BeginExecute*](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivity.BeginExecute*) override creates a LINQ query that selects all orders of the specified customer. This query is specified as the [System.Activities.AsyncCodeActivityContext.UserState](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivityContext.UserState) of the passed [System.Activities.AsyncCodeActivityContext](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivityContext), and then the query's [System.Data.Services.Client.DataServiceQuery`1.BeginExecute*](https://learn.microsoft.com/search/?terms=System.Data.Services.Client.DataServiceQuery%601.BeginExecute*) method is called. Note that the callback and state that are passed into the query's [System.Data.Services.Client.DataServiceQuery`1.BeginExecute*](https://learn.microsoft.com/search/?terms=System.Data.Services.Client.DataServiceQuery%601.BeginExecute*) are the ones that are passed in to the activity's [System.Activities.AsyncCodeActivity.BeginExecute*](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivity.BeginExecute*) method. When the query has finished executing, the activity's [System.Activities.AsyncCodeActivity.EndExecute*](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivity.EndExecute*) method is invoked. The query is retrieved from the [System.Activities.AsyncCodeActivityContext.UserState](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivityContext.UserState), and then the query's [System.Data.Services.Client.DataServiceQuery`1.EndExecute*](https://learn.microsoft.com/search/?terms=System.Data.Services.Client.DataServiceQuery%601.EndExecute*) method is called. This method returns an [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) of the specified entity type; in this case `Order`. Since `IEnumerable<Order>` is the generic type of the [System.Activities.AsyncCodeActivity`1](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivity%601), this [System.Collections.IEnumerable](https://learn.microsoft.com/search/?terms=System.Collections.IEnumerable) is set as the [System.Activities.Activity`1.Result*](https://learn.microsoft.com/search/?terms=System.Activities.Activity%601.Result*) [System.Activities.OutArgument`1](https://learn.microsoft.com/search/?terms=System.Activities.OutArgument%601) of the activity.

[CFX_WCFDataServicesActivityExample#100 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CFX/CFX_WCFDataServicesActivityExample/cs/Program.cs#100)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/CFX_WCFDataServicesActivityExample/cs/Program.cs.md)

In the following example, the `OrdersByCustomer` activity retrieves a list of orders for the specified customer, and then a [System.Activities.Statements.ForEach`1](https://learn.microsoft.com/search/?terms=System.Activities.Statements.ForEach%601) activity enumerates the returned orders and writes the date of each order to the console.

[CFX_WCFDataServicesActivityExample#10 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CFX/CFX_WCFDataServicesActivityExample/cs/Program.cs#10)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/CFX_WCFDataServicesActivityExample/cs/Program.cs.md)

When this workflow is invoked, the following data is written to the console:

```console
Calling WCF Data Service...
8/25/1997
10/3/1997
10/13/1997
1/15/1998
3/16/1998
4/9/1998
```

> **Note:**
> If a connection to the OData server cannot be established, you will get an exception similar to the following exception:
>
> Unhandled Exception: System.InvalidOperationException: An error occurred while processing this request. ---> System.Net.WebException: Unable to connect to the remote server ---> System.Net.Sockets.SocketException: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond.

If any additional processing of the data returned by the query is required, it can be done in the activity's [System.Activities.AsyncCodeActivity`1.EndExecute*](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivity%601.EndExecute*) override. Both [System.Activities.AsyncCodeActivity`1.BeginExecute*](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivity%601.BeginExecute*) and [System.Activities.AsyncCodeActivity`1.EndExecute*](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivity%601.EndExecute*) are invoked by using the workflow thread, and any code in these overrides does not run asynchronously. If the additional processing is extensive or long-running, or the query results are paged, you should consider the approach discussed in the next section, which uses a delegate to execute the query and perform additional processing asynchronously.

### Using a delegate

In addition to invoking the asynchronous method of a .NET Framework class, an [System.Activities.AsyncCodeActivity](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivity)-based activity can also define the asynchronous logic in one of its methods. This method is specified by using a delegate in the activity's [System.Activities.AsyncCodeActivity.BeginExecute*](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivity.BeginExecute*) override. When the method returns, the runtime invokes the activity's [System.Activities.AsyncCodeActivity.EndExecute*](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivity.EndExecute*) override. When calling an OData service from a workflow, this method can be used to query the service and provide any additional processing.

In the following example, a `ListCustomers` activity is defined. This activity queries the sample Northwind data service and returns a `List<Customer>` that contains all of the customers in the Northwind database. The asynchronous work is performed by the `GetCustomers` method. This method queries the service for all customers, and then copies them into a `List<Customer>`. It then checks to see if the results are paged. If so, it queries the service for the next page of results, adds them to the list, and continues until all of the customer data has been retrieved.

> **Note:**
> For more information about paging in WCF Data Services, see [How to: Load Paged Results (WCF Data Services)](https://learn.microsoft.com/previous-versions/dotnet/framework/data/wcf/how-to-load-paged-results-wcf-data-services).

Once all customers are added, the list is returned. The `GetCustomers` method is specified in the activity's [System.Activities.AsyncCodeActivity.BeginExecute*](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivity.BeginExecute*) override. Since the method has a return value, a `Func<string, List<Customer>>` is created to specify the method.

> **Note:**
> If the method that performs the asynchronous work does not have a return value, an [System.Action](https://learn.microsoft.com/search/?terms=System.Action) is used instead of a [System.Func`1](https://learn.microsoft.com/search/?terms=System.Func%601). For examples of creating an asynchronous example using both approaches, see [Creating Asynchronous Activities](creating-asynchronous-activities-in-wf.md).

This [System.Func`1](https://learn.microsoft.com/search/?terms=System.Func%601) is assigned to the [System.Activities.AsyncCodeActivityContext.UserState](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivityContext.UserState), and then `BeginInvoke` is called. Since the method to be invoked does not have access to the activity's environment of arguments, the value of the `ServiceUri` argument is passed as the first parameter, together with the callback and state that were passed into [System.Activities.AsyncCodeActivity.BeginExecute*](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivity.BeginExecute*). When `GetCustomers` returns, the runtime invokes [System.Activities.AsyncCodeActivity.EndExecute*](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivity.EndExecute*). The code in [System.Activities.AsyncCodeActivity.EndExecute*](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivity.EndExecute*) retrieves the delegate from the [System.Activities.AsyncCodeActivityContext.UserState](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivityContext.UserState), calls `EndInvoke`, and returns the result, which is the list of customers returned from the `GetCustomers` method.

[CFX_WCFDataServicesActivityExample#200 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CFX/CFX_WCFDataServicesActivityExample/cs/Program.cs#200)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/CFX_WCFDataServicesActivityExample/cs/Program.cs.md)

In the following example, the `ListCustomers` activity retrieves a list of customers, and then a [System.Activities.Statements.ForEach`1](https://learn.microsoft.com/search/?terms=System.Activities.Statements.ForEach%601) activity enumerates them and writes the company name and contact name of each customer to the console.

[CFX_WCFDataServicesActivityExample#20 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CFX/CFX_WCFDataServicesActivityExample/cs/Program.cs#20)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/CFX_WCFDataServicesActivityExample/cs/Program.cs.md)

When this workflow is invoked, the following data is written to the console. Since this query returns many customers, only part of the output is displayed here.

```console
Calling WCF Data Service...
Alfreds Futterkiste, Contact: Maria Anders
Ana Trujillo Emparedados y helados, Contact: Ana Trujillo
Antonio Moreno Taquería, Contact: Antonio Moreno
Around the Horn, Contact: Thomas Hardy
Berglunds snabbköp, Contact: Christina Berglund
...
```

## Consuming an OData feed without using the client libraries

OData exposes data as resources that are addressable by URIs. When you use the client libraries these URIs are created for you, but you do not have to use the client libraries. If desired, OData services can be accessed directly without using the client libraries. When not using the client libraries the location of the service and the desired data are specified by the URI and the results are returned in the response to the HTTP request. This raw data can then be processed or manipulated in the desired manner. One way to retrieve the results of an OData query is by using the [System.Net.WebClient](https://learn.microsoft.com/search/?terms=System.Net.WebClient) class. In this example, the contact name for the customer represented by the key ALFKI is retrieved.

[CFX_WCFDataServicesActivityExample#2 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CFX/CFX_WCFDataServicesActivityExample/cs/Program.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/CFX_WCFDataServicesActivityExample/cs/Program.cs.md)

When this code is run, the following output is displayed to the console:

```console
Raw data returned:
<?xml version="1.0" encoding="utf-8" standalone="yes"?>
<ContactName xmlns="http://schemas.microsoft.com/ado/2007/08/dataservices">Maria Anders</ContactName>
```

In a workflow, the code from this example could be incorporated into the [System.Activities.CodeActivity.Execute*](https://learn.microsoft.com/search/?terms=System.Activities.CodeActivity.Execute*) override of a [System.Activities.CodeActivity](https://learn.microsoft.com/search/?terms=System.Activities.CodeActivity)-based custom activity, but the same functionality can also be accomplished by using the [System.Activities.Expressions.InvokeMethod`1](https://learn.microsoft.com/search/?terms=System.Activities.Expressions.InvokeMethod%601) activity. The [System.Activities.Expressions.InvokeMethod`1](https://learn.microsoft.com/search/?terms=System.Activities.Expressions.InvokeMethod%601) activity enables workflow authors to invoke static and instance methods of a class, and also has an option to invoke the specified method asynchronously. In the following example, an [System.Activities.Expressions.InvokeMethod`1](https://learn.microsoft.com/search/?terms=System.Activities.Expressions.InvokeMethod%601) activity is configured to call the [System.Net.WebClient.DownloadString*](https://learn.microsoft.com/search/?terms=System.Net.WebClient.DownloadString*) method of the [System.Net.WebClient](https://learn.microsoft.com/search/?terms=System.Net.WebClient) class and return a list of customers.

[CFX_WCFDataServicesActivityExample#3 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CFX/CFX_WCFDataServicesActivityExample/cs/Program.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/CFX_WCFDataServicesActivityExample/cs/Program.cs.md)

[System.Activities.Expressions.InvokeMethod`1](https://learn.microsoft.com/search/?terms=System.Activities.Expressions.InvokeMethod%601) can call both static and instance methods of a class. Since [System.Net.WebClient.DownloadString*](https://learn.microsoft.com/search/?terms=System.Net.WebClient.DownloadString*) is an instance method of the [System.Net.WebClient](https://learn.microsoft.com/search/?terms=System.Net.WebClient) class, a new instance of the [System.Net.WebClient](https://learn.microsoft.com/search/?terms=System.Net.WebClient) class is specified for the [System.Activities.Expressions.InvokeMethod`1.TargetObject*](https://learn.microsoft.com/search/?terms=System.Activities.Expressions.InvokeMethod%601.TargetObject*). `DownloadString` is specified as the [System.Activities.Expressions.InvokeMethod`1.MethodName*](https://learn.microsoft.com/search/?terms=System.Activities.Expressions.InvokeMethod%601.MethodName*), the URI that contains the query is specified in the [System.Activities.Expressions.InvokeMethod`1.Parameters*](https://learn.microsoft.com/search/?terms=System.Activities.Expressions.InvokeMethod%601.Parameters*) collection, and the return value is assigned to the [System.Activities.Activity`1.Result*](https://learn.microsoft.com/search/?terms=System.Activities.Activity%601.Result*) value. The [System.Activities.Expressions.InvokeMethod`1.RunAsynchronously](https://learn.microsoft.com/search/?terms=System.Activities.Expressions.InvokeMethod%601.RunAsynchronously) value is set to `true`, which means that the method invocation will run asynchronously with regard to the workflow. In the following example, a workflow is constructed that uses the [System.Activities.Expressions.InvokeMethod`1](https://learn.microsoft.com/search/?terms=System.Activities.Expressions.InvokeMethod%601) activity to query the sample Northwind data service for a list of orders for a specific customer, and then the returned data is written to the console.

[CFX_WCFDataServicesActivityExample#1 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CFX/CFX_WCFDataServicesActivityExample/cs/Program.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/CFX_WCFDataServicesActivityExample/cs/Program.cs.md)

When this workflow is invoked, the following output is displayed to the console. Since this query returns several orders, only part of the output is displayed here.

```console
Calling WCF Data Service...
Raw data returned:

<?xml version="1.0" encoding="utf-8" standalone="yes"?>*
<feed
xml:base="http://services.odata.org/Northwind/Northwind.svc/"
xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices"
xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata"
xmlns="http://www.w3.org/2005/Atom">
<title type="text">Orders\</title>
<id>http://services.odata.org/Northwind/Northwind.svc/Customers('ALFKI')/Orders\</id>
<updated>2010-05-19T19:37:07Z\</updated>
<link rel="self" title="Orders" href="Orders" />
<entry>
<id>http://services.odata.org/Northwind/Northwind.svc/Orders(10643)\</id>
<title type="text">\</title>
<updated>2010-05-19T19:37:07Z\</updated>
<author>
<name />
</author>
<link rel="edit" title="Order" href="Orders(10643)" />
<link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Customer" type="application/atom+xml;type=entry" title="Customer" href="Orders(10643)/Customer" />
...
```

This example provides one method that workflow application authors can use to consume the raw data returned from an OData service. For more information about accessing WCF Data Services using URIs, see [Accessing Data Service Resources (WCF Data Services)](https://learn.microsoft.com/previous-versions/dotnet/framework/data/wcf/accessing-data-service-resources-wcf-data-services) and [OData: URI Conventions](https://www.odata.org/documentation/odata-version-2-0/uri-conventions/).
