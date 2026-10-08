---
title: General guidance
description: .NET Microservices Architecture for Containerized .NET Applications | General guidance
ms.date: 11/19/2021
---
# General guidance


> **Tip:**


> This content is an excerpt from the eBook, .NET Microservices Architecture for Containerized .NET Applications, available on [.NET Docs](https://learn.microsoft.com/dotnet/architecture/microservices) or as a free downloadable PDF that can be read offline.
>
> > [!div class="nextstepaction"]
> > [Download PDF](https://dotnet.microsoft.com/download/e-book/microservices-architecture/pdf)


> .NET Microservices Architecture for Containerized .NET Applications eBook cover thumbnail.




This section provides a summary of when to choose .NET 8 or .NET Framework. We provide more details about these choices in the sections that follow.

Use .NET 8, with Linux or Windows Containers, for your containerized Docker server application when:

- You have cross-platform needs. For example, you want to use both Linux and Windows Containers.

- Your application architecture is based on microservices.

- You need to start containers fast and want a small footprint per container to achieve better density or more containers per hardware unit in order to lower your costs.

In short, when you create new containerized .NET applications, you should consider .NET 8 as the default choice. It has many benefits and fits best with the containers philosophy and style of working.

An extra benefit of using .NET 8 is that you can run side-by-side .NET versions for applications within the same machine. This benefit is more important for servers or VMs that do not use containers, because containers isolate the versions of .NET that the app needs. (As long as they are compatible with the underlying OS.)

Use .NET Framework for your containerized Docker server application when:

- Your application currently uses .NET Framework and has strong dependencies on Windows.

- You need to use Windows APIs that are not supported by .NET 8.

- You need to use third-party .NET libraries or NuGet packages that are not available for .NET 8.

Using .NET Framework on Docker can improve your deployment experiences by minimizing deployment issues. This ["lift and shift" scenario](https://aka.ms/liftandshiftwithcontainersebook) is important for containerizing legacy applications that were originally developed with the traditional .NET Framework, like ASP.NET WebForms, MVC web apps, or WCF (Windows Communication Foundation) services.

### Additional resources

- **E-book: Modernize existing .NET Framework applications with Azure and Windows Containers**  
    <https://aka.ms/liftandshiftwithcontainersebook>

- **Sample apps: Modernization of legacy ASP.NET web apps by using Windows Containers**  
    <https://aka.ms/eshopmodernizing>

>
>[Previous](index.md)
>[Next](net-core-container-scenarios.md)
