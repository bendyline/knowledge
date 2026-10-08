---
title: Create a JMeter-based load test
titleSuffix: Azure Load Testing
description: 'Learn how to load test a website by using an existing Apache JMeter script and Azure Load Testing.'
services: load-testing
ms.service: azure-app-testing
ms.custom: devx-track-azurecli
ms.topic: how-to
author: nandinimurali
ms.author: nandinim
ms.date: 10/23/2023
adobe-target: true
---

# Load test a website by using a JMeter script in Azure Load Testing

Learn how to use an Apache JMeter script to load test a web application with Azure Load Testing from the Azure portal or by using the Azure CLI. Azure Load Testing enables you to take existing Apache JMeter scripts, and use it to run a load test at cloud scale. Learn more about which [JMeter functionality that Azure Load Testing supports](resource-jmeter-support.md).

Use cases for creating a load test with an existing JMeter script include:

- You want to reuse existing JMeter scripts to test your application.
- You want to test endpoints that aren't HTTP-based, such as databases or message queues. Azure Load Testing supports all communication protocols that JMeter supports.
- To use the CLI commands, Azure CLI version 2.2.0 or later. Run `az --version` to find the version that's installed on your computer. If you need to install or upgrade the Azure CLI, see [How to install the Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli).

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- A JMeter test script (JMX file). If you don't have a test script, get started with the sample script by [cloning or downloading the samples project from GitHub](https://github.com/Azure-Samples/azure-load-testing-samples/tree/main/jmeter-basic-endpoint).

## Create an Azure Load Testing resource

First, you create the top-level resource for Azure Load Testing. It provides a centralized place to view and manage test plans, test results, and related artifacts.

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

Next, you create a load test by uploading Apache JMeter test scripts (JMX files). The test script contains the application requests to simulate traffic to your application endpoints.

# [Azure portal](#tab/portal)

To create a load test using an existing JMeter script in the Azure portal:

1. In the [Azure portal](https://portal.azure.com/), go to your Azure Load Testing resource.

1. In the left navigation, select **Tests**  to view all tests.

1. Select **+ Create**, and then select **Upload a JMeter script**.

    Screenshot that shows the Azure Load Testing page and the button for creating a new test.
    
1. On the **Basics** tab, enter the load test details:

    | Field | Description |
    | --- | --- |
    | **Test name** | Enter a unique test name. |
    | **Test description** | (Optional) Enter a load test description. |
    | **Run test after creation** | Select this setting to automatically start the load test after saving it. |

1. On the **Test plan** tab, select your Apache JMeter scripts, and then select **Upload** to upload the files to Azure. In case you have multiple JMeter scripts, specify the main test script from which the execution should begin in File relevance.

    Screenshot that shows the Test plan tab.
    
    > **Note:**
    > You can upload additional JMeter configuration files or other files that you reference in the JMX file. For example, if your test script uses CSV data sets, you can upload the corresponding *.csv* file(s). See also how to [read data from a CSV file](how-to-read-csv-data.md). For files other than the main test script and user properties, if the size of the file is greater than 50 MB, zip the file. The size of the zip file should be below 50 MB. Azure Load Testing automatically unzips the file during the test run. Only 100 zip artifacts are allowed with a maximum of 10000 files in each zip and an uncompressed total size of 1 GB.

1. Select **Review + create**. Review all settings, and then select **Create** to create the load test.

# [Azure CLI](#tab/azure-cli)

To create a load test using an existing JMeter script with the Azure CLI:

1. Set parameter values.

    Specify a unique test ID for your load test, and the name of the JMeter test script (JMX file). If you use an existing test ID, a test run will be added to the test when you run it.

    ```azurecli
    testId="<test-id>"
    testPlan="<my-jmx-file>"
    ```

1. Use the `azure load create` command to create a load test:

    The following command creates a load test by using uploading the JMeter test script. The test runs on one test engine instance.

    ```azurecli
    az load test create --load-test-resource  $loadTestResource --test-id $testId  --display-name "My CLI Load Test" --description "Created using Az CLI" --test-plan $testPlan --engine-instances 1
    ```

---

You can update the test configuration at any time, for example to upload a different JMX file. Choose your test in the list of tests, and then select **Edit**.

## Run the load test

When Azure Load Testing starts your load test, it first deploys the JMeter script, and any other files onto test engine instances, and then starts the load test.

# [Azure portal](#tab/portal)

If you selected **Run test after creation**, your load test will start automatically. To manually start the load test you created earlier, perform the following steps:

1. Go to your load testing resource, select **Tests** from the left pane, and then select the test that you created earlier.

    Screenshot that shows the list of load tests.

1. On the test details page, select **Run** or **Run test**. Then, select **Run** on the confirmation pane to start the load test. Optionally, provide a test run description.

    Screenshot that shows the run confirmation page.

    > **Tip:**
    > You can stop a load test at any time from the Azure portal.

1. Notice the test run details, statistics, and client metrics in the Azure portal.

    If you have multiple requests in your test script, the charts display all requests, and you can also filter for specific requests.

    Screenshot that shows the test run dashboard.

    Use the run statistics and error information to identify performance and stability issues for your application under load.

# [Azure CLI](#tab/azure-cli)

To run the load test you created previously with the Azure CLI:

1. Set parameter values.

    Specify a test run ID and display name.

    ```azurecli
    testRunId="run_"`date +"%Y%m%d%_H%M%S"`
    displayName="Run"`date +"%Y/%m/%d_%H:%M:%S"`
    ```

1. Use the `azure load test-run create` command to run a load test:

    ```azurecli
    az load test-run create --load-test-resource $loadTestResource --test-id $testId --test-run-id $testRunId --display-name $displayName --description "Test run from CLI"
    ```

1. Retrieve the client-side test metrics with the `az load test-run metrics list` command:

    ```azurecli
    az load test-run metrics list --load-test-resource $loadTestResource --test-run-id $testRunId --metric-namespace LoadTestRunMetrics
    ```

---

## Convert a URL-based load test to a JMeter-based load test

If you created a URL-based load test, you can convert the test into a JMeter-based load test. Azure Load Testing automatically generates a JMeter script when you create a URL-based load test.

To convert a URL-based load test to a JMeter-based load test:

1. Go to your load testing resource, and select **Tests** to view the list of tests.

    Notice the **Test type** column that indicates whether the test is URL-based or JMeter-based.

1. Select the **ellipsis (...)** for a URL-based load test, and then select **Convert to JMeter script**.

    Screenshot that shows the list of tests in the Azure portal, highlighting the menu option to convert the test to a JMeter-based test.

    Alternately, select the test, and then select **Convert to JMeter script** on the test details page.

1. On the **Convert to JMeter script** page, select **Convert** to convert the test to a JMeter-based test.

    Notice that the test type changed to *JMX* in the test list.

    Screenshot that shows the list of tests in the Azure portal, highlighting the test type changed to JMX for the converted test.

## Related content

- Learn how to [configure your test for high-scale load](how-to-high-scale-load.md).
- Learn how to [monitor server-side metrics for your application](how-to-monitor-server-side-metrics.md).
- Learn how to [parameterize a load test with environment variables](how-to-parameterize-load-tests.md).
