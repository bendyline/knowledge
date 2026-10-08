---
title: "Breaking change: Nullable reference type annotations changed"
description: "Learn about the breaking change in ASP.NET Core 6.0 titled Nullable reference type annotations changed"
ms.author: wpickett
ms.date: 02/24/2021
ms.custom: https://github.com/aspnet/Announcements/issues/444
---
# Nullable reference type annotations changed

Starting in ASP.NET Core 5.0, nullability annotations have been applied to parts of the code. From the outset of this effort, [mistakes were expected](https://github.com/dotnet/runtime/blob/main/docs/coding-guidelines/api-guidelines/nullability.md#breaking-change-guidance) in these annotations and fixes would need to be made. In ASP.NET Core 6.0, some previously applied annotations are being updated. Some of these changes are considered source breaking changes. The changes lead to the APIs being incompatible or more restrictive. The updated APIs may result in build-time warnings when used in projects that have nullable reference types enabled.

For discussion, see GitHub issue [dotnet/aspnetcore#27564](https://github.com/dotnet/aspnetcore/issues/27564).

## Version introduced

ASP.NET Core 6.0

## Old behavior

The affected APIs have incorrect nullable reference type annotations. Build warnings are either absent or incorrect.

## New behavior

New build warnings are produced. Incorrect build warnings are no longer produced for the affected APIs.

## Reason for change

Through feedback and further testing, the nullable annotations for the affected APIs were determined to be inaccurate. The updated annotations now correctly represent the nullability contracts for the APIs.

## Recommended action

Update code calling these APIs to reflect the revised nullability contracts.

## Affected APIs

* [Microsoft.AspNetCore.Components.ParameterView.FromDictionary%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.ParameterView.FromDictionary%252A)
* [Microsoft.AspNetCore.Components.RenderTree.Renderer.DispatchEventAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.RenderTree.Renderer.DispatchEventAsync%252A)
* [Microsoft.AspNetCore.Components.RenderTree.RenderTreeEdit.RemovedAttributeName](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.RenderTree.RenderTreeEdit.RemovedAttributeName)
* [Microsoft.AspNetCore.Authentication.AuthenticationSchemeOptions.ForwardDefaultSelector%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationSchemeOptions.ForwardDefaultSelector%252A)
* [Microsoft.Net.Http.Headers.RangeConditionHeaderValue.%23ctor%2A](https://learn.microsoft.com/search/?terms=Microsoft.Net.Http.Headers.RangeConditionHeaderValue.%2523ctor%252A)
* [Microsoft.AspNetCore.Connections.IConnectionListener.AcceptAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Connections.IConnectionListener.AcceptAsync%252A)
* [Microsoft.AspNetCore.DataProtection.Infrastructure.IApplicationDiscriminator.Discriminator%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.Infrastructure.IApplicationDiscriminator.Discriminator%252A)
* [Microsoft.AspNetCore.DataProtection.DataProtectionOptions.ApplicationDiscriminator%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.DataProtectionOptions.ApplicationDiscriminator%252A)
* [Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.AuthenticatedEncryptorFactory.CreateEncryptorInstance%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.AuthenticatedEncryptorFactory.CreateEncryptorInstance%252A)
* [Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.CngCbcAuthenticatedEncryptorFactory.CreateEncryptorInstance%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.CngCbcAuthenticatedEncryptorFactory.CreateEncryptorInstance%252A)
* [Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.CngGcmAuthenticatedEncryptorFactory.CreateEncryptorInstance%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.CngGcmAuthenticatedEncryptorFactory.CreateEncryptorInstance%252A)
* [Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.IAuthenticatedEncryptorFactory.CreateEncryptorInstance%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.IAuthenticatedEncryptorFactory.CreateEncryptorInstance%252A)
* [Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.ManagedAuthenticatedEncryptorFactory.CreateEncryptorInstance%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.ManagedAuthenticatedEncryptorFactory.CreateEncryptorInstance%252A)
* [Microsoft.AspNetCore.DataProtection.KeyManagement.IKey.CreateEncryptor%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.KeyManagement.IKey.CreateEncryptor%252A)
* [Microsoft.AspNetCore.DataProtection.KeyManagement.KeyManagementOptions.AuthenticatedEncryptorConfiguration%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.KeyManagement.KeyManagementOptions.AuthenticatedEncryptorConfiguration%252A)
* [Microsoft.AspNetCore.DataProtection.KeyManagement.KeyManagementOptions.XmlEncryptor%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.KeyManagement.KeyManagementOptions.XmlEncryptor%252A)
* [Microsoft.AspNetCore.DataProtection.KeyManagement.KeyManagementOptions.XmlRepository%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.KeyManagement.KeyManagementOptions.XmlRepository%252A)
* [Microsoft.AspNetCore.DataProtection.XmlEncryption.ICertificateResolver.ResolveCertificate%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.XmlEncryption.ICertificateResolver.ResolveCertificate%252A)
* [Microsoft.AspNetCore.DataProtection.DataProtectionUtilityExtensions.GetApplicationUniqueIdentifier%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.DataProtectionUtilityExtensions.GetApplicationUniqueIdentifier%252A)
* [Microsoft.AspNetCore.DataProtection.Repositories.FileSystemXmlRepository.DefaultKeyStorageDirectory%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.Repositories.FileSystemXmlRepository.DefaultKeyStorageDirectory%252A)
* [Microsoft.AspNetCore.DataProtection.Repositories.RegistryXmlRepository.DefaultRegistryKey%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.Repositories.RegistryXmlRepository.DefaultRegistryKey%252A)
* [Microsoft.AspNetCore.DataProtection.XmlEncryption.CertificateResolver.ResolveCertificate%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.XmlEncryption.CertificateResolver.ResolveCertificate%252A)
* [Microsoft.AspNetCore.Http.Endpoint.%23ctor%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Endpoint.%2523ctor%252A)
* [Microsoft.AspNetCore.Http.Endpoint.RequestDelegate%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Endpoint.RequestDelegate%252A)
* [Microsoft.AspNetCore.Routing.RouteValueDictionary.TryAdd%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Routing.RouteValueDictionary.TryAdd%252A)
* [Microsoft.AspNetCore.Routing.LinkGenerator.GetUriByAddress%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Routing.LinkGenerator.GetUriByAddress%252A)
* [Microsoft.AspNetCore.Http.Features.IFeatureCollection.Set%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IFeatureCollection.Set%252A)
* [Microsoft.AspNetCore.Http.Features.FeatureCollection.Set%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.FeatureCollection.Set%252A)
* [Microsoft.AspNetCore.Http.Features.IFeatureCollection.Get%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IFeatureCollection.Get%252A)
* [Microsoft.AspNetCore.Authentication.Cookies.ITicketStore.RetrieveAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Cookies.ITicketStore.RetrieveAsync%252A)
* [Microsoft.AspNetCore.Http.Features.IFeatureCollection.Get%60%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IFeatureCollection.Get%2560%25601)
* [Microsoft.AspNetCore.Http.Features.IFeatureCollection.Set%60%601(%60%600)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.IFeatureCollection.Set%2560%25601(%2560%25600))
* [Microsoft.AspNetCore.Http.Features.FeatureCollection.Set%60%601(%60%600)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.FeatureCollection.Set%2560%25601(%2560%25600))
* [Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary.SetModelValue(System.String,System.Object,System.String)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary.SetModelValue(System.String%2CSystem.Object%2CSystem.String))
* [Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary.Item(System.String)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary.Item(System.String))
* [Microsoft.AspNetCore.Mvc.ModelBinding.Validation.ClientValidatorItem.%23ctor%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.Validation.ClientValidatorItem.%2523ctor%252A)
* [Microsoft.AspNetCore.Mvc.ModelBinding.Validation.ClientValidatorItem.Validator%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Mvc.ModelBinding.Validation.ClientValidatorItem.Validator%252A)
* [Microsoft.AspNetCore.Http.Endpoint.%23ctor%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Endpoint.%2523ctor%252A)
* [Microsoft.AspNetCore.Routing.RouteValueDictionary.TryAdd(System.String,System.Object)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Routing.RouteValueDictionary.TryAdd(System.String%2CSystem.Object))>
* [Microsoft.AspNetCore.Routing.LinkGenerator.GetUriByAddress%60%601(%60%600,Microsoft.AspNetCore.Routing.RouteValueDictionary,System.String,Microsoft.AspNetCore.Http.HostString,Microsoft.AspNetCore.Http.PathString,Microsoft.AspNetCore.Http.FragmentString,Microsoft.AspNetCore.Routing.LinkOptions)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Routing.LinkGenerator.GetUriByAddress%2560%25601(%2560%25600%2CMicrosoft.AspNetCore.Routing.RouteValueDictionary%2CSystem.String%2CMicrosoft.AspNetCore.Http.HostString%2CMicrosoft.AspNetCore.Http.PathString%2CMicrosoft.AspNetCore.Http.FragmentString%2CMicrosoft.AspNetCore.Routing.LinkOptions))
* [Microsoft.AspNetCore.DataProtection.Infrastructure.IApplicationDiscriminator.Discriminator](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.Infrastructure.IApplicationDiscriminator.Discriminator)
* [Microsoft.AspNetCore.DataProtection.DataProtectionOptions.ApplicationDiscriminator](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.DataProtectionOptions.ApplicationDiscriminator)
* [Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.AuthenticatedEncryptorFactory.CreateEncryptorInstance(Microsoft.AspNetCore.DataProtection.KeyManagement.IKey)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.AuthenticatedEncryptorFactory.CreateEncryptorInstance(Microsoft.AspNetCore.DataProtection.KeyManagement.IKey))
* [Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.CngCbcAuthenticatedEncryptorFactory.CreateEncryptorInstance(Microsoft.AspNetCore.DataProtection.KeyManagement.IKey)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.CngCbcAuthenticatedEncryptorFactory.CreateEncryptorInstance(Microsoft.AspNetCore.DataProtection.KeyManagement.IKey))
* [Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.CngGcmAuthenticatedEncryptorFactory.CreateEncryptorInstance(Microsoft.AspNetCore.DataProtection.KeyManagement.IKey)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.CngGcmAuthenticatedEncryptorFactory.CreateEncryptorInstance(Microsoft.AspNetCore.DataProtection.KeyManagement.IKey))
* [Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.IAuthenticatedEncryptorFactory.CreateEncryptorInstance(Microsoft.AspNetCore.DataProtection.KeyManagement.IKey)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.IAuthenticatedEncryptorFactory.CreateEncryptorInstance(Microsoft.AspNetCore.DataProtection.KeyManagement.IKey))
* [Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.ManagedAuthenticatedEncryptorFactory.CreateEncryptorInstance(Microsoft.AspNetCore.DataProtection.KeyManagement.IKey)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.ManagedAuthenticatedEncryptorFactory.CreateEncryptorInstance(Microsoft.AspNetCore.DataProtection.KeyManagement.IKey))
* [Microsoft.AspNetCore.DataProtection.KeyManagement.IKey.CreateEncryptor](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.KeyManagement.IKey.CreateEncryptor)
* [Microsoft.AspNetCore.DataProtection.KeyManagement.KeyManagementOptions.AuthenticatedEncryptorConfiguration](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.KeyManagement.KeyManagementOptions.AuthenticatedEncryptorConfiguration)
* [Microsoft.AspNetCore.DataProtection.KeyManagement.KeyManagementOptions.XmlEncryptor](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.KeyManagement.KeyManagementOptions.XmlEncryptor)
* [Microsoft.AspNetCore.DataProtection.KeyManagement.KeyManagementOptions.XmlRepository](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.KeyManagement.KeyManagementOptions.XmlRepository)
* [Microsoft.AspNetCore.DataProtection.XmlEncryption.ICertificateResolver.ResolveCertificate(System.String)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.XmlEncryption.ICertificateResolver.ResolveCertificate(System.String))
* [Microsoft.AspNetCore.DataProtection.DataProtectionUtilityExtensions.GetApplicationUniqueIdentifier(System.IServiceProvider)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.DataProtectionUtilityExtensions.GetApplicationUniqueIdentifier(System.IServiceProvider))
* [Microsoft.AspNetCore.DataProtection.Repositories.FileSystemXmlRepository.DefaultKeyStorageDirectory](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.Repositories.FileSystemXmlRepository.DefaultKeyStorageDirectory)
* [Microsoft.AspNetCore.DataProtection.Repositories.RegistryXmlRepository.DefaultRegistryKey](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.Repositories.RegistryXmlRepository.DefaultRegistryKey)
* [Microsoft.AspNetCore.DataProtection.XmlEncryption.CertificateResolver.ResolveCertificate(System.String)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.DataProtection.XmlEncryption.CertificateResolver.ResolveCertificate(System.String))
* [Microsoft.AspNetCore.Connections.IConnectionListener.AcceptAsync(System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Connections.IConnectionListener.AcceptAsync(System.Threading.CancellationToken))
* [Microsoft.AspNetCore.Authentication.AuthenticationSchemeOptions.ForwardDefaultSelector](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationSchemeOptions.ForwardDefaultSelector)
* [Microsoft.Net.Http.Headers.RangeConditionHeaderValue.%23ctor(Microsoft.Net.Http.Headers.EntityTagHeaderValue)](https://learn.microsoft.com/search/?terms=Microsoft.Net.Http.Headers.RangeConditionHeaderValue.%2523ctor(Microsoft.Net.Http.Headers.EntityTagHeaderValue))
* [Microsoft.AspNetCore.Http.Connections.Features.IHttpContextFeature.HttpContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Connections.Features.IHttpContextFeature.HttpContext%252A)
* [Microsoft.AspNetCore.SignalR.Protocol.CompletionMessage.WithError%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Protocol.CompletionMessage.WithError%252A)
* [Microsoft.AspNetCore.SignalR.Protocol.CompletionMessage.WithResult%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Protocol.CompletionMessage.WithResult%252A)
* [Microsoft.AspNetCore.SignalR.Protocol.HubMethodInvocationMessage.Arguments%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Protocol.HubMethodInvocationMessage.Arguments%252A)
* [Microsoft.AspNetCore.SignalR.Protocol.HubMethodInvocationMessage.%23ctor(System.String,System.String,System.Object\[\])](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Protocol.HubMethodInvocationMessage.%2523ctor(System.String%2CSystem.String%2CSystem.Object%5B%5D))
* [Microsoft.AspNetCore.SignalR.Protocol.HubMethodInvocationMessage.%23ctor(System.String,System.String,System.Object\[\],System.String\[\])](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Protocol.HubMethodInvocationMessage.%2523ctor(System.String%2CSystem.String%2CSystem.Object%5B%5D%2CSystem.String%5B%5D))
* [Microsoft.AspNetCore.SignalR.Protocol.InvocationMessage.%23ctor(System.String,System.Object\[\])](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Protocol.InvocationMessage.%2523ctor(System.String%2CSystem.Object%5B%5D))
* [Microsoft.AspNetCore.SignalR.Protocol.InvocationMessage.%23ctor(System.String,System.String,System.Object\[\])](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Protocol.InvocationMessage.%2523ctor(System.String%2CSystem.String%2CSystem.Object%5B%5D))
* [Microsoft.AspNetCore.SignalR.Protocol.InvocationMessage.%23ctor(System.String,System.String,System.Object\[\],System.String\[\])](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Protocol.InvocationMessage.%2523ctor(System.String%2CSystem.String%2CSystem.Object%5B%5D%2CSystem.String%5B%5D))
* [Microsoft.AspNetCore.SignalR.Protocol.StreamInvocationMessage.%23ctor(System.String,System.String,System.Object\[\])](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Protocol.StreamInvocationMessage.%2523ctor(System.String%2CSystem.String%2CSystem.Object%5B%5D))
* [Microsoft.AspNetCore.SignalR.Protocol.StreamInvocationMessage.%23ctor(System.String,System.String,System.Object\[\],System.String\[\])](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Protocol.StreamInvocationMessage.%2523ctor(System.String%2CSystem.String%2CSystem.Object%5B%5D%2CSystem.String%5B%5D))
* [Microsoft.AspNetCore.SignalR.Protocol.IHubProtocol.TryParseMessage(System.Buffers.ReadOnlySequence{System.Byte}@,Microsoft.AspNetCore.SignalR.IInvocationBinder,Microsoft.AspNetCore.SignalR.Protocol.HubMessage@)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.Protocol.IHubProtocol.TryParseMessage(System.Buffers.ReadOnlySequence%7BSystem.Byte%7D%40%2CMicrosoft.AspNetCore.SignalR.IInvocationBinder%2CMicrosoft.AspNetCore.SignalR.Protocol.HubMessage%40))
* [Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendAllAsync(System.String,System.Object\[\],System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%25601.SendAllAsync(System.String%2CSystem.Object%5B%5D%2CSystem.Threading.CancellationToken))
* [Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendAllExceptAsync(System.String,System.Object\[\],System.Collections.Generic.IReadOnlyList{System.String},System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%25601.SendAllExceptAsync(System.String%2CSystem.Object%5B%5D%2CSystem.Collections.Generic.IReadOnlyList%7BSystem.String%7D%2CSystem.Threading.CancellationToken))
* [Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendConnectionAsync(System.String,System.String,System.Object\[\],System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%25601.SendConnectionAsync(System.String%2CSystem.String%2CSystem.Object%5B%5D%2CSystem.Threading.CancellationToken))
* [Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendConnectionsAsync(System.Collections.Generic.IReadOnlyList{System.String},System.String,System.Object\[\],System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%25601.SendConnectionsAsync(System.Collections.Generic.IReadOnlyList%7BSystem.String%7D%2CSystem.String%2CSystem.Object%5B%5D%2CSystem.Threading.CancellationToken))
* [Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendGroupAsync(System.String,System.String,System.Object\[\],System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%25601.SendGroupAsync(System.String%2CSystem.String%2CSystem.Object%5B%5D%2CSystem.Threading.CancellationToken))
* [Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendGroupExceptAsync(System.String,System.String,System.Object\[\],System.Collections.Generic.IReadOnlyList{System.String},System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%25601.SendGroupExceptAsync(System.String%2CSystem.String%2CSystem.Object%5B%5D%2CSystem.Collections.Generic.IReadOnlyList%7BSystem.String%7D%2CSystem.Threading.CancellationToken))
* [Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendGroupsAsync(System.Collections.Generic.IReadOnlyList{System.String},System.String,System.Object\[\],System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%25601.SendGroupsAsync(System.Collections.Generic.IReadOnlyList%7BSystem.String%7D%2CSystem.String%2CSystem.Object%5B%5D%2CSystem.Threading.CancellationToken))
* [Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendUserAsync(System.String,System.String,System.Object\[\],System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%25601.SendUserAsync(System.String%2CSystem.String%2CSystem.Object%5B%5D%2CSystem.Threading.CancellationToken))
* [Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendUsersAsync(System.Collections.Generic.IReadOnlyList{System.String},System.String,System.Object\[\],System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%25601.SendUsersAsync(System.Collections.Generic.IReadOnlyList%7BSystem.String%7D%2CSystem.String%2CSystem.Object%5B%5D%2CSystem.Threading.CancellationToken))
* [Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendAllAsync(System.String,System.Object\[\],System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%25601.SendAllAsync(System.String%2CSystem.Object%5B%5D%2CSystem.Threading.CancellationToken))
* [Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendAllExceptAsync(System.String,System.Object\[\],System.Collections.Generic.IReadOnlyList{System.String},System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%25601.SendAllExceptAsync(System.String%2CSystem.Object%5B%5D%2CSystem.Collections.Generic.IReadOnlyList%7BSystem.String%7D%2CSystem.Threading.CancellationToken))
* [Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendConnectionAsync(System.String,System.String,System.Object\[\],System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%25601.SendConnectionAsync(System.String%2CSystem.String%2CSystem.Object%5B%5D%2CSystem.Threading.CancellationToken))
* [Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendConnectionsAsync(System.Collections.Generic.IReadOnlyList{System.String},System.String,System.Object\[\],System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%25601.SendConnectionsAsync(System.Collections.Generic.IReadOnlyList%7BSystem.String%7D%2CSystem.String%2CSystem.Object%5B%5D%2CSystem.Threading.CancellationToken))
* [Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendGroupAsync(System.String,System.String,System.Object\[\],System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%25601.SendGroupAsync(System.String%2CSystem.String%2CSystem.Object%5B%5D%2CSystem.Threading.CancellationToken))
* [Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendGroupExceptAsync(System.String,System.String,System.Object\[\],System.Collections.Generic.IReadOnlyList{System.String},System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%25601.SendGroupExceptAsync(System.String%2CSystem.String%2CSystem.Object%5B%5D%2CSystem.Collections.Generic.IReadOnlyList%7BSystem.String%7D%2CSystem.Threading.CancellationToken))
* [Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendGroupsAsync(System.Collections.Generic.IReadOnlyList{System.String},System.String,System.Object\[\],System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%25601.SendGroupsAsync(System.Collections.Generic.IReadOnlyList%7BSystem.String%7D%2CSystem.String%2CSystem.Object%5B%5D%2CSystem.Threading.CancellationToken))
* [Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendUserAsync(System.String,System.String,System.Object\[\],System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%25601.SendUserAsync(System.String%2CSystem.String%2CSystem.Object%5B%5D%2CSystem.Threading.CancellationToken))
* [Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendUsersAsync(System.Collections.Generic.IReadOnlyList{System.String},System.String,System.Object\[\],System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%25601.SendUsersAsync(System.Collections.Generic.IReadOnlyList%7BSystem.String%7D%2CSystem.String%2CSystem.Object%5B%5D%2CSystem.Threading.CancellationToken))
* [Microsoft.AspNetCore.SignalR.IClientProxy.SendCoreAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.IClientProxy.SendCoreAsync%252A)
* [Microsoft.AspNetCore.SignalR.HubConnectionContext.User](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.SignalR.HubConnectionContext.User)
* [Microsoft.AspNetCore.WebUtilities.QueryHelpers.ParseNullableQuery(System.String)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.WebUtilities.QueryHelpers.ParseNullableQuery(System.String))
* [Microsoft.AspNetCore.WebUtilities.QueryHelpers.ParseQuery(System.String)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.WebUtilities.QueryHelpers.ParseQuery(System.String))

## See also

- [Nullable reference type annotation changes in core .NET libraries](https://learn.microsoft.com/dotnet/core/compatibility/core-libraries/6.0/nullable-ref-type-annotation-changes)

<!--

## Category

ASP.NET Core

## Affected APIs

- `Overload:Microsoft.AspNetCore.Components.ParameterView.FromDictionary`
- `Overload:Microsoft.AspNetCore.Components.RenderTree.Renderer.DispatchEventAsync`
- `F:Microsoft.AspNetCore.Components.RenderTree.RenderTreeEdit.RemovedAttributeName`
- `Overload:Microsoft.AspNetCore.Authentication.AuthenticationSchemeOptions.ForwardDefaultSelector`
- `Overload:Microsoft.Net.Http.Headers.RangeConditionHeaderValue.#ctor`
- `Overload:Microsoft.AspNetCore.Connections.IConnectionListener.AcceptAsync`
- `Overload:Microsoft.AspNetCore.DataProtection.Infrastructure.IApplicationDiscriminator.Discriminator`
- `Overload:Microsoft.AspNetCore.DataProtection.DataProtectionOptions.ApplicationDiscriminator`
- `Overload:Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.AuthenticatedEncryptorFactory.CreateEncryptorInstance`
- `Overload:Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.CngCbcAuthenticatedEncryptorFactory.CreateEncryptorInstance`
- `Overload:Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.CngGcmAuthenticatedEncryptorFactory.CreateEncryptorInstance`
- `Overload:Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.IAuthenticatedEncryptorFactory.CreateEncryptorInstance`
- `Overload:Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.ManagedAuthenticatedEncryptorFactory.CreateEncryptorInstance`
- `Overload:Microsoft.AspNetCore.DataProtection.KeyManagement.IKey.CreateEncryptor`
- `Overload:Microsoft.AspNetCore.DataProtection.KeyManagement.KeyManagementOptions.AuthenticatedEncryptorConfiguration`
- `Overload:Microsoft.AspNetCore.DataProtection.KeyManagement.KeyManagementOptions.XmlEncryptor`
- `Overload:Microsoft.AspNetCore.DataProtection.KeyManagement.KeyManagementOptions.XmlRepository`
- `Overload:Microsoft.AspNetCore.DataProtection.XmlEncryption.ICertificateResolver.ResolveCertificate`
- `Overload:Microsoft.AspNetCore.DataProtection.DataProtectionUtilityExtensions.GetApplicationUniqueIdentifier`
- `Overload:Microsoft.AspNetCore.DataProtection.Repositories.FileSystemXmlRepository.DefaultKeyStorageDirectory`
- `Overload:Microsoft.AspNetCore.DataProtection.Repositories.RegistryXmlRepository.DefaultRegistryKey`
- `Overload:Microsoft.AspNetCore.DataProtection.XmlEncryption.CertificateResolver.ResolveCertificate`
- `Overload:Microsoft.AspNetCore.Http.Endpoint.#ctor`
- `Overload:Microsoft.AspNetCore.Http.Endpoint.RequestDelegate`
- `Overload:Microsoft.AspNetCore.Routing.RouteValueDictionary.TryAdd`
- `Overload:Microsoft.AspNetCore.Routing.LinkGenerator.GetUriByAddress`
- `Overload:Microsoft.AspNetCore.Http.Features.IFeatureCollection.Set`
- `Overload:Microsoft.AspNetCore.Http.Features.FeatureCollection.Set`
- `Overload:Microsoft.AspNetCore.Http.Features.IFeatureCollection.Get`
- `Overload:Microsoft.AspNetCore.Authentication.Cookies.ITicketStore.RetrieveAsync`
- `M:Microsoft.AspNetCore.Http.Features.IFeatureCollection.Get%60%601`
- `M:Microsoft.AspNetCore.Http.Features.IFeatureCollection.Set%60%601(%60%600)`
- `M:Microsoft.AspNetCore.Http.Features.FeatureCollection.Set%60%601(%60%600)`
- `M:Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary.SetModelValue(System.String,System.Object,System.String)`
- `P:Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary.Item(System.String)`
- `Overload:Microsoft.AspNetCore.Mvc.ModelBinding.Validation.ClientValidatorItem.#ctor`
- `Overload:Microsoft.AspNetCore.Mvc.ModelBinding.Validation.ClientValidatorItem.Validator`
- `Overload:Microsoft.AspNetCore.Http.Endpoint.#ctor`
- `M:Microsoft.AspNetCore.Routing.RouteValueDictionary.TryAdd(System.String,System.Object)`
- `M:Microsoft.AspNetCore.Routing.LinkGenerator.GetUriByAddress%60%601(%60%600,Microsoft.AspNetCore.Routing.RouteValueDictionary,System.String,Microsoft.AspNetCore.Http.HostString,Microsoft.AspNetCore.Http.PathString,Microsoft.AspNetCore.Http.FragmentString,Microsoft.AspNetCore.Routing.LinkOptions)`
- `P:Microsoft.AspNetCore.DataProtection.Infrastructure.IApplicationDiscriminator.Discriminator`
- `P:Microsoft.AspNetCore.DataProtection.DataProtectionOptions.ApplicationDiscriminator`
- `M:Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.AuthenticatedEncryptorFactory.CreateEncryptorInstance(Microsoft.AspNetCore.DataProtection.KeyManagement.IKey)`
- `M:Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.CngCbcAuthenticatedEncryptorFactory.CreateEncryptorInstance(Microsoft.AspNetCore.DataProtection.KeyManagement.IKey)`
- `M:Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.CngGcmAuthenticatedEncryptorFactory.CreateEncryptorInstance(Microsoft.AspNetCore.DataProtection.KeyManagement.IKey)`
- `M:Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.IAuthenticatedEncryptorFactory.CreateEncryptorInstance(Microsoft.AspNetCore.DataProtection.KeyManagement.IKey)`
- `M:Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.ManagedAuthenticatedEncryptorFactory.CreateEncryptorInstance(Microsoft.AspNetCore.DataProtection.KeyManagement.IKey)`
- `M:Microsoft.AspNetCore.DataProtection.KeyManagement.IKey.CreateEncryptor`
- `P:Microsoft.AspNetCore.DataProtection.KeyManagement.KeyManagementOptions.AuthenticatedEncryptorConfiguration`
- `P:Microsoft.AspNetCore.DataProtection.KeyManagement.KeyManagementOptions.XmlEncryptor`
- `P:Microsoft.AspNetCore.DataProtection.KeyManagement.KeyManagementOptions.XmlRepository`
- `M:Microsoft.AspNetCore.DataProtection.XmlEncryption.ICertificateResolver.ResolveCertificate(System.String)`
- `M:Microsoft.AspNetCore.DataProtection.DataProtectionUtilityExtensions.GetApplicationUniqueIdentifier(System.IServiceProvider)`
- `P:Microsoft.AspNetCore.DataProtection.Repositories.FileSystemXmlRepository.DefaultKeyStorageDirectory`
- `P:Microsoft.AspNetCore.DataProtection.Repositories.RegistryXmlRepository.DefaultRegistryKey`
- `M:Microsoft.AspNetCore.DataProtection.XmlEncryption.CertificateResolver.ResolveCertificate(System.String)`
- `M:Microsoft.AspNetCore.Connections.IConnectionListener.AcceptAsync(System.Threading.CancellationToken)`
- `P:Microsoft.AspNetCore.Authentication.AuthenticationSchemeOptions.ForwardDefaultSelector`
- `M:Microsoft.Net.Http.Headers.RangeConditionHeaderValue.#ctor(Microsoft.Net.Http.Headers.EntityTagHeaderValue)`
- `Overload:Microsoft.AspNetCore.Http.Connections.Features.IHttpContextFeature.HttpContext`
- `Overload:Microsoft.AspNetCore.SignalR.Protocol.CompletionMessage.WithError`
- `Overload:Microsoft.AspNetCore.SignalR.Protocol.CompletionMessage.WithResult`
- `Overload:Microsoft.AspNetCore.SignalR.Protocol.HubMethodInvocationMessage.Arguments`
- `M:Microsoft.AspNetCore.SignalR.Protocol.HubMethodInvocationMessage.#ctor(System.String,System.String,System.Object[])`
- `M:Microsoft.AspNetCore.SignalR.Protocol.HubMethodInvocationMessage.#ctor(System.String,System.String,System.Object[],System.String[])`
- `M:Microsoft.AspNetCore.SignalR.Protocol.InvocationMessage.#ctor(System.String,System.Object[])`
- `M:Microsoft.AspNetCore.SignalR.Protocol.InvocationMessage.#ctor(System.String,System.String,System.Object[])`
- `M:Microsoft.AspNetCore.SignalR.Protocol.InvocationMessage.#ctor(System.String,System.String,System.Object[],System.String[])`
- `M:Microsoft.AspNetCore.SignalR.Protocol.StreamInvocationMessage.#ctor(System.String,System.String,System.Object[])`
- `M:Microsoft.AspNetCore.SignalR.Protocol.StreamInvocationMessage.#ctor(System.String,System.String,System.Object[],System.String[])`
- `M:Microsoft.AspNetCore.SignalR.Protocol.IHubProtocol.TryParseMessage(System.Buffers.ReadOnlySequence{System.Byte}@,Microsoft.AspNetCore.SignalR.IInvocationBinder,Microsoft.AspNetCore.SignalR.Protocol.HubMessage@)`
- `M:Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendAllAsync(System.String,System.Object[],System.Threading.CancellationToken)`
- `M:Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendAllExceptAsync(System.String,System.Object[],System.Collections.Generic.IReadOnlyList{System.String},System.Threading.CancellationToken)`
- `M:Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendConnectionAsync(System.String,System.String,System.Object[],System.Threading.CancellationToken)`
- `M:Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendConnectionsAsync(System.Collections.Generic.IReadOnlyList{System.String},System.String,System.Object[],System.Threading.CancellationToken)`
- `M:Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendGroupAsync(System.String,System.String,System.Object[],System.Threading.CancellationToken)`
- `M:Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendGroupExceptAsync(System.String,System.String,System.Object[],System.Collections.Generic.IReadOnlyList{System.String},System.Threading.CancellationToken)`
- `M:Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendGroupsAsync(System.Collections.Generic.IReadOnlyList{System.String},System.String,System.Object[],System.Threading.CancellationToken)`
- `M:Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendUserAsync(System.String,System.String,System.Object[],System.Threading.CancellationToken)`
- `M:Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendUsersAsync(System.Collections.Generic.IReadOnlyList{System.String},System.String,System.Object[],System.Threading.CancellationToken)`
- `M:Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendAllAsync(System.String,System.Object[],System.Threading.CancellationToken)`
- `M:Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendAllExceptAsync(System.String,System.Object[],System.Collections.Generic.IReadOnlyList{System.String},System.Threading.CancellationToken)`
- `M:Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendConnectionAsync(System.String,System.String,System.Object[],System.Threading.CancellationToken)`
- `M:Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendConnectionsAsync(System.Collections.Generic.IReadOnlyList{System.String},System.String,System.Object[],System.Threading.CancellationToken)`
- `M:Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendGroupAsync(System.String,System.String,System.Object[],System.Threading.CancellationToken)`
- `M:Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendGroupExceptAsync(System.String,System.String,System.Object[],System.Collections.Generic.IReadOnlyList{System.String},System.Threading.CancellationToken)`
- `M:Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendGroupsAsync(System.Collections.Generic.IReadOnlyList{System.String},System.String,System.Object[],System.Threading.CancellationToken)`
- `M:Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendUserAsync(System.String,System.String,System.Object[],System.Threading.CancellationToken)`
- `M:Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager%601.SendUsersAsync(System.Collections.Generic.IReadOnlyList{System.String},System.String,System.Object[],System.Threading.CancellationToken)`
- `Overload:Microsoft.AspNetCore.SignalR.IClientProxy.SendCoreAsync`
- `P:Microsoft.AspNetCore.SignalR.HubConnectionContext.User`
- `M:Microsoft.AspNetCore.WebUtilities.QueryHelpers.ParseNullableQuery(System.String)`
- `M:Microsoft.AspNetCore.WebUtilities.QueryHelpers.ParseQuery(System.String)`

-->
