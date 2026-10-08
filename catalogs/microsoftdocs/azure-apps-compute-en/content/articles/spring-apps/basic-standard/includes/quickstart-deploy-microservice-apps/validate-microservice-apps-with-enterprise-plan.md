---
author: karlerickson
ms.author: v-shilichen
ms.service: azure-spring-apps
ms.topic: include
ms.date: 08/19/2025
ms.update-cycle: 1095-days
---

<!--
To reuse the Spring Apps validation steps in other articles, a separate markdown file is used to describe how to validate enterprise Spring Apps instance.

[!INCLUDE [validate-microservice-apps-with-enterprise-plan](validate-microservice-apps-with-enterprise-plan)]

-->

The application should look similar to the following screenshot:

Screenshot of the PetClinic application running on Azure Spring Apps Enterprise plan.

### 5.2. Query the application logs

After you browse each function of the Pet Clinic, the Log Analytics workspace collects logs of each application. You can check the logs by using custom queries, as shown in the following screenshot:

Screenshot of the Azure portal that shows the Logs page of the query on PetClinic application and the results for the Enterprise plan.

### 5.3. Monitor the applications

Application Insights monitors the application dependencies, as shown by the following application tracing map:

Screenshot of the Azure portal that shows the Application map page for Azure Spring Apps Enterprise plan.

Open the Application Live View URL exposed by the Developer Tools to monitor application runtimes, as shown in the following screenshot:

Screenshot of the Application Live View for the PetClinic application.
