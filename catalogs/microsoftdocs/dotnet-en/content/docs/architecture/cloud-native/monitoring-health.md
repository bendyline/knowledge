---
title: Monitoring and health
description: Monitoring and Health
ms.date: 04/06/2022
---

# Monitoring and health


> **Tip:**


> This content is an excerpt from the eBook, Architecting Cloud Native .NET Applications for Azure, available on [.NET Docs](https://learn.microsoft.com/dotnet/architecture/cloud-native) or as a free downloadable PDF that can be read offline.
>
> > [!div class="nextstepaction"]
> > [Download PDF](https://dotnet.microsoft.com/download/e-book/cloud-native-azure/pdf)


> Cloud Native .NET apps for Azure eBook cover thumbnail.




Microservices and cloud-native applications go hand in hand with good DevOps practices. DevOps is many things to many people but perhaps one of the better definitions comes from cloud advocate and DevOps evangelist Donovan Brown:

"DevOps is the union of people, process, and products to enable continuous delivery of value to our end users."

Unfortunately, with terse definitions, there's always room to say more things. One of the key components of DevOps is ensuring that the applications running in production are functioning properly and efficiently. To gauge the health of the application in production, it's necessary to monitor the various logs and metrics being produced from the servers, hosts, and the application proper. The number of different services running in support of a cloud-native application makes monitoring the health of individual components and the application as a whole a critical challenge.

>
>[Previous](resilient-communications.md)
>[Next](observability-patterns.md)
