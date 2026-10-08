---
title: 'Quickstart: Create a load test with Locust'
titleSuffix: Azure Load Testing
description: 'This quickstart shows how to create a load test by using a Locust test script and Azure Load Testing. Azure Load Testing is a managed, cloud-based load testing tool.'
services: load-testing
ms.service: azure-app-testing
ms.custom:
  - build-2024
ms.topic: quickstart
author: ntrogh
ms.author: nicktrog
ms.date: 04/04/2024
---

# Quickstart: Create and run a load test by using a Locust script and Azure Load Testing

Learn how to create and run a load test with a Locust test script and Azure Load Testing from the Azure portal. Azure Load Testing is a managed service that lets you run a load test at cloud scale. [Locust](https://locust.io/) is an open source load testing tool that enables you to describe all your test in Python code.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- A Locust test script. If you don't have a test script, get started from the [Locust quickstart](https://docs.locust.io/en/stable/quickstart.html) in the Locust documentation.


Use cases for creating a load test with an existing Locust test script: 

* You want to reuse existing Locust scripts to test your application.
* You want to simulate user traffic to your application and ensure that your application meets your requirements.
* You don't want to set up complex infrastructure for load testing. And, as a developer, you might not be familiar with load testing tools and test script syntax.

In this quickstart, you create a load test for your application endpoint by using Azure Load Testing and the Locust testing framework. You create a load testing resource in the Azure portal, and then create a load test by uploading the Locust test script and configuring the load parameters.

## Create an Azure Load Testing resource

You first need to create the top-level resource for Azure Load Testing. Azure portal provides a centralized place to view and manage test plans, test results, and related artifacts.

If you already have a load testing resource, skip this section and continue to [Create a load test](#create-a-load-test).

To create a load testing resource:


# [Azure portal](#tab/portal)

1. Sign in to the [Azure portal](https://portal.azure.com) by using the credentials for your Azure subscription.

1. From the Azure portal menu or the **Home page**, select **Create a resource**.

1. On the **Marketplace** page, search for and select **Azure App Testing**.

1. On the **Azure App Testing** hub, select **Azure Load Testing** within the workspaces section.

1. On the **Azure Load Testing** pane, select **Create**.

1. On the **Create a load testing resource** page, enter the following information:

    | Field | Description |
    | --- | --- |
    | **Subscription** | Select the Azure subscription that you want to use for this Azure Load Testing resource. |
    | **Resource group** | Select an existing resource group. Or select **Create new**, and then enter a unique name for the new resource group. |
    | **Name** | Enter a unique name to identify your Azure Load Testing resource.<br>The name can't contain special characters, such as \\/""[]:\|<>+=;,?*@&, or whitespace. The name can't begin with an underscore (_), and it can't end with a period (.) or a dash (-). The length must be 1 to 64 characters. |
    | **Location** | Select a geographic location to host your Azure Load Testing resource. <BR>This location also determines where the test engines are hosted and where the test framework requests originate from. |

    > **Note:**
    > Optionally, you can configure more details on the **Tags** tab. Tags are name/value pairs that enable you to categorize resources and view consolidated billing by applying the same tag to multiple resources and resource groups.

1. After you're finished configuring the resource, select **Review + Create**.

1. Review the settings you provide, and then select **Create**. It takes a few minutes to create the account. Wait for the portal page to display **Your deployment is complete** before moving on.

1. To view the new resource, select **Go to resource**.

1. Optionally, [manage access to your Azure Load Testing resource](how-to-assign-roles.md).

    Azure Load Testing uses role-based access control (RBAC) to manage permissions for your resource. If you encounter this message, your account doesn't have the necessary permissions to manage tests.

    Screenshot that shows an error message in the Azure portal that you're not authorized to use the Azure Load Testing resource.

# [Azure CLI](#tab/azure-cli)

1. Sign into Azure:

    ```azurecli
    az login
    ```

1. Set parameter values:

    The following values are used in subsequent commands to create the load testing resource.

    ```azurecli
    loadTestResource="<load-testing-resource-name>"
    resourceGroup="<resource-group-name>"
    location="East US"
    ```

1. Create an Azure load testing resource with the `azure load create` command:

    ```azurecli
    az load create --name $loadTestResource --resource-group $resourceGroup --location $location
    ```

1. After the resource is created, you can view the details with the `azure load show` command:

    ```azurecli
    az load show --name $loadTestResource --resource-group $resourceGroup
    ```

---


## Create a load test

Now that you have a load testing resource, you can create a load test by uploading the Locust test script. Azure Load Testing will manage the infrastructure to run your test script at scale and simulate traffic to your application endpoints.

To create a load test for a Locust-based test in the Azure portal:

1. In the [Azure portal](https://portal.azure.com/), go to your Azure Load Testing resource.

1. In the left navigation, select **Tests**  to view all tests.

1. Select **+ Create**, and then select **Upload a script**.

    Screenshot that shows the Azure Load Testing page and the button for creating a new test.

1. On the **Basics** tab, enter the load test details:

    | Field | Description |
    | --- | --- |
    | **Test name** | Enter a unique test name. |
    | **Test description** | (Optional) Enter a load test description. |
    | **Run test after creation** | Select this setting to automatically start the load test after saving it. |

1. On the **Test plan** tab, select **Locust** as the **Load testing framework**.

    Screenshot that shows the option to select Locust framework.

1. Next, select the Locust test script from your computer, and then select **Upload** to upload the file to Azure.

    Screenshot that shows the button for uploading test artifacts.

1. Upload any other files that you reference in the test script. For example, if your test script uses CSV data sets, you can upload the corresponding *.csv* file(s). To use a configuration file with your Locust script, upload the file and select **Locust configuration** as the **File relevance**

1. To install any dependencies from a 'requirements.txt' file, upload the 'requirements.txt' file along with the other artifacts. 

1. To use supporting Python files along with your Locust script, upload the supporting files along with the other artifacts. Specify the main test script from which the execution should begin in File relevance. 

1. On the **Load** tab, enter the details for the amount of load to generate:

    | Field | Description |
    | --- | --- |
    | **Total number of users** | (Optional) Enter the overall number of users to simulate for the load test, across all engine instances. |
    | **Overall spawn rate** | (Optional) Rate to add users at (users per second), across all engine instances. |
    | **Duration (minutes)** | (Optional) The total duration of the load test in minutes. |
    | **Host endpoint** | (Optional) The HTTP endpoint URL. For example, https://www.contoso.com/products. |
    | **Test engine instances** | Select the number of parallel test engine instances. |

    The optional inputs can be provided in the load configuration, in the Locust test script, or in the Locust configuration file. For more information, see [Configure for high scale loads](how-to-high-scale-load.md)

1. Select **Review + create**. Review all settings, and then select **Create** to create the load test.

You can update the test configuration at any time, for example to upload a different Locust test file, or to modify the load parameters. Choose your test in the list of tests, and then select **Edit**.

> **Note:**
> Azure Load Testing runs your Locust script in *LocalRunner* mode on all the engine instances. 

## Run the load test


If you selected **Run test after creation**, your load test will start automatically. To manually start the load test you created earlier, perform the following steps:

1. Go to your load testing resource, select **Tests** from the left pane, and then select the test that you created earlier.

    Screenshot that shows the list of load tests.

1. On the test details page, select **Run** or **Run test**. Then, select **Run** on the confirmation pane to start the load test. Optionally, provide a test run description.

    Screenshot that shows the run confirmation page.

    > **Tip:**
    > You can stop a load test at any time from the Azure portal.
1. Notice the test run details, statistics, and client metrics in the Azure portal.

    If you have multiple requests in your test script, the charts display all requests, and you can also filter for specific requests. In the **Sampler statistics** section, you can view the statistics per request in a tabular format.

    Screenshot that shows the test run dashboard.

    Use the run statistics and error information to identify performance and stability issues for your application under load.

## Summary

In this quickstart, you created and ran a load test with Azure Load Testing by using a Locust test script. Azure Load Testing abstracts the complexity of setting up the infrastructure for simulating high-scale user load for your application.

You can further expand the load test to also monitor server-side metrics of the application under load, and to specify test fail metrics to get alerted when the application doesn't meet your requirements. To ensure that the application continues to perform well, you can also integrate load testing as part of your continuous integration and continuous deployment (CI/CD) workflow.

## Related content

- Learn how to [monitor server-side metrics for your application](how-to-monitor-server-side-metrics.md).
- Learn how to [parameterize a load test with environment variables](how-to-parameterize-load-tests.md).
