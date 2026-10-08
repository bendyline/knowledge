---
title: Network availability
description: Learn how to detect changes in network availability and ping a host with .NET.
ms.date: 08/24/2022
---

# Network availability

The [System.Net.NetworkInformation](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation) namespace enables you to gather information about network events, changes, statistics, and properties. In this article, you'll learn how to use the [System.Net.NetworkInformation.NetworkChange](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.NetworkChange) class to determine whether the network address or availability has changed. Additionally, you'll see about the network statistics and properties on an interface or protocol basis. Finally, you'll use the [System.Net.NetworkInformation.Ping](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.Ping) class to determine whether a remote host is reachable.

## Network change events

The [System.Net.NetworkInformation.NetworkChange](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.NetworkChange) class enables you to determine whether the network address or availability has changed. To use this class, create an event handler to process the change, and associate it with a [System.Net.NetworkInformation.NetworkAddressChangedEventHandler](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.NetworkAddressChangedEventHandler) or a [System.Net.NetworkInformation.NetworkAvailabilityChangedEventHandler](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.NetworkAvailabilityChangedEventHandler).

[language="csharp" source="snippets/misc/Program.NetworkChange.cs" id="networkavailabilitychanged"::: (complete source file; reference: snippets/misc/Program.NetworkChange.cs)](../../../_code/docs/fundamentals/networking/snippets/misc/Program.NetworkChange.cs.md)

The preceding C# code:

- Registers an event handler for the [System.Net.NetworkInformation.NetworkChange.NetworkAvailabilityChanged](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.NetworkChange.NetworkAvailabilityChanged) event.
- The event handler simply writes the availability status to the console.
- A message is written to the console letting the user know that the code is listening for changes in network availability and waits for a key press to exit.
- Unregisters the event handler.

[language="csharp" source="snippets/misc/Program.NetworkChange.cs" id="networkaddresschanged"::: (complete source file; reference: snippets/misc/Program.NetworkChange.cs)](../../../_code/docs/fundamentals/networking/snippets/misc/Program.NetworkChange.cs.md)

The preceding C# code:

- Registers an event handler for the [System.Net.NetworkInformation.NetworkChange.NetworkAddressChanged](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.NetworkChange.NetworkAddressChanged) event.
- The event handler iterates over [System.Net.NetworkInformation.NetworkInterface.GetAllNetworkInterfaces](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.NetworkInterface.GetAllNetworkInterfaces), writing their name and operational status to the console.
- A message is written to the console letting the user know that the code is listening for changes in network availability and waits for a key press to exit.
- Unregisters the event handler.

## Network statistics and properties

You can gather network statistics and properties on an interface or protocol basis. The [System.Net.NetworkInformation.NetworkInterface](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.NetworkInterface), [System.Net.NetworkInformation.NetworkInterfaceType](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.NetworkInterfaceType), and [System.Net.NetworkInformation.PhysicalAddress](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.PhysicalAddress) classes give information about a particular network interface, while the [System.Net.NetworkInformation.IPInterfaceProperties](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.IPInterfaceProperties), [System.Net.NetworkInformation.IPGlobalProperties](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.IPGlobalProperties), [System.Net.NetworkInformation.IPGlobalStatistics](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.IPGlobalStatistics), [System.Net.NetworkInformation.TcpStatistics](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.TcpStatistics), and [System.Net.NetworkInformation.UdpStatistics](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.UdpStatistics) classes give information about layer 3 and layer 4 packets.

[language="csharp" source="snippets/misc/Program.IPGlobalProperties.cs" id="ipglobalprops"::: (complete source file; reference: snippets/misc/Program.IPGlobalProperties.cs)](../../../_code/docs/fundamentals/networking/snippets/misc/Program.IPGlobalProperties.cs.md)

The preceding C# code:

- Calls a custom `ShowStatistics` method to display the statistics for each protocol.
- The `ShowStatistics` method calls [System.Net.NetworkInformation.IPGlobalProperties.GetIPGlobalProperties](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.IPGlobalProperties.GetIPGlobalProperties), and depending on the given [System.Net.NetworkInformation.NetworkInterfaceComponent](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.NetworkInterfaceComponent) will either call [System.Net.NetworkInformation.IPGlobalProperties.GetIPv4GlobalStatistics](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.IPGlobalProperties.GetIPv4GlobalStatistics) or [System.Net.NetworkInformation.IPGlobalProperties.GetIPv6GlobalStatistics](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.IPGlobalProperties.GetIPv6GlobalStatistics).
- The [System.Net.NetworkInformation.TcpStatistics](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.TcpStatistics) are written to the console.

## Determine if a remote host is reachable

You can use the [System.Net.NetworkInformation.Ping](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.Ping) class to determine whether a remote host is up, on the network, and reachable.

[language="csharp" source="snippets/misc/Program.Ping.cs" id="ping"::: (complete source file; reference: snippets/misc/Program.Ping.cs)](../../../_code/docs/fundamentals/networking/snippets/misc/Program.Ping.cs.md)

The preceding C# code:

- Instantiate a [System.Net.NetworkInformation.Ping](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.Ping) object.
- Calls [System.Net.NetworkInformation.Ping.SendPingAsync(System.String)](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.Ping.SendPingAsync(System.String)) with the `"stackoverflow.com"` hostname parameter.
- The status of the ping is written to the console.

## See also

- [Network programming in .NET](overview.md)
- [System.Net.NetworkInformation.NetworkInterface](https://learn.microsoft.com/search/?terms=System.Net.NetworkInformation.NetworkInterface)
