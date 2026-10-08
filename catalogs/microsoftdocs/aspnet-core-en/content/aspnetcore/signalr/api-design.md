---
title: SignalR API design considerations
author: wadepickett
description: Learn how to design SignalR APIs for compatibility across versions of your app.
monikerRange: '>= aspnetcore-2.1'
ms.author: wpickett
ms.date: 07/06/2026
uid: signalr/api-design
---
# SignalR API design considerations

By [Ashley Stanton-Nurse](https://github.com/analogrelay)

This article provides guidance for building SignalR-based APIs.

## Use custom object parameters to ensure backwards-compatibility

Adding parameters to a SignalR hub method (on either the client or the server) is a *breaking change*. This means older clients/servers will get errors when they try to invoke the method without the appropriate number of parameters. However, adding properties to a custom object parameter is **not** a breaking change. This can be used to design compatible APIs that are resilient to changes on the client or the server.

For example, consider a server-side API like the following:

[ParameterBasedOldVersion (complete source file; reference: api-design/sample/Samples.cs?name=ParameterBasedOldVersion)](../../_code/aspnetcore/signalr/api-design/sample/Samples.cs.md)

The JavaScript client calls this method using `invoke` as follows:

[CallWithOneParameter (complete source file; reference: api-design/sample/Samples.ts?name=CallWithOneParameter)](../../_code/aspnetcore/signalr/api-design/sample/Samples.ts.md)

If you later add a second parameter to the server method, older clients won't provide this parameter value. For example:

[ParameterBasedNewVersion (complete source file; reference: api-design/sample/Samples.cs?name=ParameterBasedNewVersion)](../../_code/aspnetcore/signalr/api-design/sample/Samples.cs.md)

When the old client tries to invoke this method, it will get an error like this:

```
Microsoft.AspNetCore.SignalR.HubException: Failed to invoke 'GetTotalLength' due to an error on the server.
```

On the server, you'll see a log message like this:

```
System.IO.InvalidDataException: Invocation provides 1 argument(s) but target expects 2.
```

The old client only sent one parameter, but the newer server API required two parameters. Using custom objects as parameters gives you more flexibility. Let's redesign the original API to use a custom object:

[ObjectBasedOldVersion (complete source file; reference: api-design/sample/Samples.cs?name=ObjectBasedOldVersion)](../../_code/aspnetcore/signalr/api-design/sample/Samples.cs.md)

Now, the client uses an object to call the method:

[CallWithObject (complete source file; reference: api-design/sample/Samples.ts?name=CallWithObject)](../../_code/aspnetcore/signalr/api-design/sample/Samples.ts.md)

Instead of adding a parameter, add a property to the `TotalLengthRequest` object:

[ObjectBasedNewVersion (complete source file; reference: api-design/sample/Samples.cs?name=ObjectBasedNewVersion\&highlight=4,9-13)](../../_code/aspnetcore/signalr/api-design/sample/Samples.cs.md)

When the old client sends a single parameter, the extra `Param2` property will be left `null`. You can detect a message sent by an older client by checking the `Param2` for `null` and apply a default value. A new client can send both parameters.

[CallWithObjectNew (complete source file; reference: api-design/sample/Samples.ts?name=CallWithObjectNew)](../../_code/aspnetcore/signalr/api-design/sample/Samples.ts.md)

The same technique works for methods defined on the client. You can send a custom object from the server side:

[ClientSideObjectBasedOld (complete source file; reference: api-design/sample/Samples.cs?name=ClientSideObjectBasedOld)](../../_code/aspnetcore/signalr/api-design/sample/Samples.cs.md)

On the client side, you access the `Message` property rather than using a parameter:

[OnWithObjectOld (complete source file; reference: api-design/sample/Samples.ts?name=OnWithObjectOld)](../../_code/aspnetcore/signalr/api-design/sample/Samples.ts.md)

If you later decide to add the sender of the message to the payload, add a property to the object:

[ClientSideObjectBasedNew (complete source file; reference: api-design/sample/Samples.cs?name=ClientSideObjectBasedNew\&highlight=5)](../../_code/aspnetcore/signalr/api-design/sample/Samples.cs.md)

The older clients won't be expecting the `Sender` value, so they'll ignore it. A new client can accept it by updating to read the new property:

[OnWithObjectNew (complete source file; reference: api-design/sample/Samples.ts?name=OnWithObjectNew\&highlight=2-5)](../../_code/aspnetcore/signalr/api-design/sample/Samples.ts.md)

In this case, the new client is also tolerant of an old server that doesn't provide the `Sender` value. Since the old server won't provide the `Sender` value, the client checks to see if it exists before accessing it.

## Additional resources

* [SignalR assemblies in shared framework](https://learn.microsoft.com/search/?terms=migration%2F22-to-30%23signalr-assemblies-in-shared-framework)
