---
title: Use Sockets to send and receive data over TCP
description: Learn how the Socket class exposes socket network communication functionality in .NET.
ms.date: 10/22/2025
helpviewer_keywords:
  - "application protocols, sockets"
  - "sending data, sockets"
  - "data requests, sockets"
  - "asynchronous client sockets"
  - "Socket class, asynchronous client sockets"
  - "requesting data from Internet, sockets"
  - "sockets, asynchronous client sockets"
  - "receiving data, sockets"
  - "protocols, sockets"
  - "Internet, sockets"
  - "client sockets"
ai-usage: ai-assisted
---

# Use Sockets to send and receive data over TCP

Before you can use a socket to communicate with remote devices, the socket must be initialized with protocol and network address information. The constructor for the [System.Net.Sockets.Socket](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket) class has parameters that specify the address family, socket type, and protocol type that the socket uses to make connections. When connecting a client socket to a server socket, the client uses an `IPEndPoint` object to specify the network address of the server.


## Create an IP endpoint

When working with [System.Net.Sockets](https://learn.microsoft.com/search/?terms=System.Net.Sockets), you represent a network endpoint as an [System.Net.IPEndPoint](https://learn.microsoft.com/search/?terms=System.Net.IPEndPoint) object. The `IPEndPoint` is constructed with an [System.Net.IPAddress](https://learn.microsoft.com/search/?terms=System.Net.IPAddress) and its corresponding port number. Before you can initiate a conversation through a [System.Net.Sockets.Socket](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket), you create a data pipe between your app and the remote destination.

TCP/IP uses a network address and a service port number to uniquely identify a service. The network address identifies a specific network destination; the port number identifies the specific service on that device to connect to. The combination of network address and service port is called an endpoint, which is represented in the .NET by the [System.Net.EndPoint](https://learn.microsoft.com/search/?terms=System.Net.EndPoint) class. A descendant of `EndPoint` is defined for each supported address family; for the IP address family, the class is [System.Net.IPEndPoint](https://learn.microsoft.com/search/?terms=System.Net.IPEndPoint).

The [System.Net.Dns](https://learn.microsoft.com/search/?terms=System.Net.Dns) class provides domain-name services to apps that use TCP/IP internet services. The [System.Net.Dns.GetHostEntryAsync*](https://learn.microsoft.com/search/?terms=System.Net.Dns.GetHostEntryAsync*) method queries a DNS server to map a user-friendly domain name (such as "host.contoso.com") to a numeric Internet address (such as `192.168.1.1`). `GetHostEntryAsync` returns a `Task<IPHostEntry>` that when awaited contains a list of addresses and aliases for the requested name. In most cases, you can use the first address returned in the [System.Net.IPHostEntry.AddressList*](https://learn.microsoft.com/search/?terms=System.Net.IPHostEntry.AddressList*) array. The following code gets an [System.Net.IPAddress](https://learn.microsoft.com/search/?terms=System.Net.IPAddress) containing the IP address for the server `host.contoso.com`.

```csharp
IPHostEntry ipHostInfo = await Dns.GetHostEntryAsync("host.contoso.com");
IPAddress ipAddress = ipHostInfo.AddressList[0];
```

> **Tip:**
> For manual testing and debugging purposes, you can typically use the [System.Net.Dns.GetHostEntryAsync*](https://learn.microsoft.com/search/?terms=System.Net.Dns.GetHostEntryAsync*) method with the resulting host name from the [System.Net.Dns.GetHostName](https://learn.microsoft.com/search/?terms=System.Net.Dns.GetHostName) value to resolve the localhost name to an IP address. Consider the following code snippet:
>
> ```csharp
> var hostName = Dns.GetHostName();
> IPHostEntry localhost = await Dns.GetHostEntryAsync(hostName);
> // This is the IP address of the local machine
> IPAddress localIpAddress = localhost.AddressList[0];
> ```

The Internet Assigned Numbers Authority (IANA) defines port numbers for common services. For more information, see [IANA: Service Name and Transport Protocol Port Number Registry](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml)). Other services can have registered port numbers in the range 1,024 to 65,535. The following code combines the IP address for `host.contoso.com` with a port number to create a remote endpoint for a connection.

```csharp
IPEndPoint ipEndPoint = new(ipAddress, 11_000);
```

After determining the address of the remote device and choosing a port to use for the connection, the app can establish a connection with the remote device.


## Create a `Socket` client

With the `endPoint` object created, create a client socket to connect to the server. Once the socket is connected, it can send and receive data from the server socket connection.

[language="csharp" source="../snippets/socket/socket-client/Program.cs" id="socketclient"::: (complete source file; reference: ../snippets/socket/socket-client/Program.cs)](../../../../_code/docs/fundamentals/networking/snippets/socket/socket-client/Program.cs.md)

The preceding C# code:

- Instantiates a new `Socket` object with a given `endPoint` instances address family, the [System.Net.Sockets.SocketType.Stream](https://learn.microsoft.com/search/?terms=System.Net.Sockets.SocketType.Stream), and [System.Net.Sockets.ProtocolType.Tcp](https://learn.microsoft.com/search/?terms=System.Net.Sockets.ProtocolType.Tcp).
- Calls the [System.Net.Sockets.Socket.ConnectAsync*](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.ConnectAsync*) method with the `endPoint` instance as an argument.
- In a `while` loop:

  - Encodes and sends a message to the server using [System.Net.Sockets.Socket.SendAsync*](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.SendAsync*).
  - Writes the sent message to the console.
  - Initializes a buffer to receive data from the server using [System.Net.Sockets.Socket.ReceiveAsync*](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.ReceiveAsync*).
  - When the `response` is an acknowledgment, it's written to the console and the loop is exited.

- Finally, the `client` socket calls [System.Net.Sockets.Socket.Shutdown*](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.Shutdown*) given [System.Net.Sockets.SocketShutdown.Both](https://learn.microsoft.com/search/?terms=System.Net.Sockets.SocketShutdown.Both), which shuts down both send and receive operations.

## Create a `Socket` server

To create the server socket, the `endPoint` object can listen for incoming connections on any IP address but the port number must be specified. Once the socket is created, the server can accept incoming connections and communicate with clients.

[language="csharp" source="../snippets/socket/socket-server/Program.cs" id="socketserver"::: (complete source file; reference: ../snippets/socket/socket-server/Program.cs)](../../../../_code/docs/fundamentals/networking/snippets/socket/socket-server/Program.cs.md)

The preceding C# code:

- Instantiates a new `Socket` object with a given `endPoint` instances address family, the [System.Net.Sockets.SocketType.Stream](https://learn.microsoft.com/search/?terms=System.Net.Sockets.SocketType.Stream), and [System.Net.Sockets.ProtocolType.Tcp](https://learn.microsoft.com/search/?terms=System.Net.Sockets.ProtocolType.Tcp).
- The `listener` calls the [System.Net.Sockets.Socket.Bind*](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.Bind*) method with the `endPoint` instance as an argument to associate the socket with the network address.
- The [System.Net.Sockets.Socket.Listen](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.Listen) method is called to listen for incoming connections.
- The `listener` calls the [System.Net.Sockets.Socket.AcceptAsync*](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.AcceptAsync*) method to accept an incoming connection on the `handler` socket.
- In a `while` loop:

  - Calls [System.Net.Sockets.Socket.ReceiveAsync*](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.ReceiveAsync*) to receive data from the client.
  - When the data is received, it's decoded and written to the console.
  - If the `response` message ends with `<|EOM|>`, an acknowledgment is sent to the client using the [System.Net.Sockets.Socket.SendAsync*](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.SendAsync*).

## Run the sample client and server

Start the server application first, and then start the client application.

```dotnetcli
dotnet run --project socket-server
Socket server starting...
Found: 172.23.64.1 available on port 9000.
Socket server received message: "Hi friends 👋!"
Socket server sent acknowledgment: "<|ACK|>"
Press ENTER to continue...
```

The client application sends a message to the server, and the server will respond with an acknowledgment.

```dotnetcli
dotnet run --project socket-client
Socket client starting...
Found: 172.23.64.1 available on port 9000.
Socket client sent message: "Hi friends 👋!<|EOM|>"
Socket client received acknowledgment: "<|ACK|>"
Press ENTER to continue...
```

## See also

- [Sockets in .NET](sockets-overview.md)
- [Networking in .NET](../overview.md)
- [System.Net.Sockets](https://learn.microsoft.com/search/?terms=System.Net.Sockets)
- [System.Net.Sockets.Socket](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket)
