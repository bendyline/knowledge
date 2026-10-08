---
author: ProfessorKendrick
ms.topic: include
ms.date: 05/25/2026
ms.author: kkendrick
---

### Metrics and logs tab (optional)

Configure which Azure resources send metrics and logs to Datadog. You can change these settings at any time after creation.

For details on what gets forwarded and include/exclude examples, see [tag rules for sending metrics](../metrics-logs.md#tag-rules-for-sending-metrics) and [tag rules for sending logs](../metrics-logs.md#tag-rules-for-sending-logs) in [Monitor & Observe Azure resources with Azure Native Integrations](../metrics-logs.md).

| Setting | What it does |
| --- | --- |
| **Silence monitoring for expected Azure VM Shutdowns** | Suppresses alerts when VMs are stopped intentionally |
| **Collect custom metrics from App Insights** | Forwards Application Insights custom metrics to Datadog |
| **Send subscription activity logs** | Sends Azure subscription activity logs (management plane operations) to Datadog |
| **Send Azure resource logs for all defined sources** | Forwards resource diagnostic logs from all supported Azure resources to Datadog |

After you finish configuring metrics and logs, select **Next**.

### Security tab (optional)

The **Security** tab controls two features:

| Setting | Default | What it does |
| --- | --- | --- |
| **Enable resource collection** | On | Allows Datadog to collect metadata about your Azure resources — types, tags, and configurations — so they appear in the Datadog [Resource Catalog](https://docs.datadoghq.com/infrastructure/resource_catalog/) for search, inventory, and infrastructure context. There's no additional Datadog charge for this. |
| **Enable Datadog Cloud Security Posture Management** | Off | Continuously assesses your Azure configuration against CIS, PCI DSS, SOC 2, HIPAA, and other benchmarks. Learn more about [Cloud Security Posture Management](https://www.datadoghq.com/knowledge-center/cloud-security-posture-management/). |

> **Important:**
> **Resource collection is enabled by default** and we recommend keeping it on — it's what populates the Datadog Resource Catalog and gives every other Datadog product accurate Azure context. **Cloud Security Posture Management (CSPM) is optional and can be enabled only when resource collection is on.** If you turn resource collection off, the CSPM checkbox is disabled.

Select the **Next** button at the bottom of the page.

### Single sign-on tab (optional)


If your organization uses Microsoft Entra ID as its identity provider, you can establish single sign-on from the Azure portal:

1. Select the checkbox.

    The Azure portal retrieves the appropriate application from Microsoft Entra ID.

1. Select the app name.

1. Select **Next**.


### Tags tab (optional)


Optionally, you can create tags for your resource. Then select **Review + create**.

### Review + create tab


If the review finds no errors, the **Create** button becomes active. Select **Create**.

If the review identifies errors, a red dot appears next to each section where errors exist. To fix errors:

1. Open each section that has errors and fix the errors.

    Fields with errors are highlighted in red.

1. Select **Review + create** again.

1. Select **Create**.

The message "Deployment is in progress" appears. When the deployment is complete, the message "Your deployment is complete" appears on the upper-right corner of the Azure portal.

After the resource is created, select **Go to resource** to view your resource.
