---
title: Use TcpClient and TcpListener
description: Learn how to use the TcpClient class to create a socket to request and receive data using TCP in .NET.
ms.date: 10/20/2025
helpviewer_keywords:
  - "protocols, TCP"
  - "network resources, TCP"
  - "sending data, TCP"
  - "TCP"
  - "TcpClient class, about TcpClient class"
  - "application protocols, TCP"
  - "receiving data, TCP"
  - "TcpListener class, about TcpListener class"
  - "Socket class, about Socket class"
  - "data requests, TCP"
  - "requesting data from Internet, TCP"
  - "Internet, TCP"
---

# TCP overview

> **Important:**
> The [System.Net.Sockets.Socket](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket) class is highly recommended for advanced users, instead of `TcpClient` and `TcpListener`.

To work with Transmission Control Protocol (TCP), you have two options: either use [System.Net.Sockets.Socket](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket) for maximum control and performance, or use the [System.Net.Sockets.TcpClient](https://learn.microsoft.com/search/?terms=System.Net.Sockets.TcpClient) and [System.Net.Sockets.TcpListener](https://learn.microsoft.com/search/?terms=System.Net.Sockets.TcpListener) helper classes. [System.Net.Sockets.TcpClient](https://learn.microsoft.com/search/?terms=System.Net.Sockets.TcpClient) and [System.Net.Sockets.TcpListener](https://learn.microsoft.com/search/?terms=System.Net.Sockets.TcpListener) are built on top of the [System.Net.Sockets.Socket](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket) class and take care of the details of transferring data for ease of use.

The protocol classes use the underlying `Socket` class to provide simple access to network services without the overhead of maintaining state information or knowing the details of setting up protocol-specific sockets. To use asynchronous `Socket` methods, you can use the asynchronous methods supplied by the [System.Net.Sockets.NetworkStream](https://learn.microsoft.com/search/?terms=System.Net.Sockets.NetworkStream) class. To access features of the `Socket` class not exposed by the protocol classes, you must use the `Socket` class.

`TcpClient` and `TcpListener` represent the network using the `NetworkStream` class. You use the [System.Net.Sockets.TcpClient.GetStream*](https://learn.microsoft.com/search/?terms=System.Net.Sockets.TcpClient.GetStream*) method to return the network stream, and then call the stream's [System.Net.Sockets.NetworkStream.ReadAsync*](https://learn.microsoft.com/search/?terms=System.Net.Sockets.NetworkStream.ReadAsync*) and [System.Net.Sockets.NetworkStream.WriteAsync*](https://learn.microsoft.com/search/?terms=System.Net.Sockets.NetworkStream.WriteAsync*) methods. The `NetworkStream` does not own the protocol classes' underlying socket, so closing it does not affect the socket.

## Use `TcpClient` and `TcpListener`

The [System.Net.Sockets.TcpClient](https://learn.microsoft.com/search/?terms=System.Net.Sockets.TcpClient) class requests data from an internet resource using TCP. The methods and properties of `TcpClient` abstract the details for creating a [System.Net.Sockets.Socket](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket) for requesting and receiving data using TCP. Because the connection to the remote device is represented as a stream, data can be read and written with .NET Framework stream-handling techniques.

The TCP protocol establishes a connection with a remote endpoint and then uses that connection to send and receive data packets. TCP is responsible for ensuring that data packets are sent to the endpoint and assembled in the correct order when they arrive.


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


## Create a `TcpClient`

The `TcpClient` class provides TCP services at a higher level of abstraction than the `Socket` class. `TcpClient` is used to create a client connection to a remote host. Knowing how to get an `IPEndPoint`, let's assume you have an `IPAddress` to pair with your desired port number. The following example demonstrates setting up a `TcpClient` to connect to a time server on TCP port 13:

[language="csharp" source="../snippets/tcp/tcp-client/Program.cs" id="tcpclient"::: (complete source file; reference: ../snippets/tcp/tcp-client/Program.cs)](../../../../_code/docs/fundamentals/networking/snippets/tcp/tcp-client/Program.cs.md)

The preceding C# code:

- Creates an `IPEndPoint` from a known `IPAddress` and port.
- Instantiate a new `TcpClient` object.
- Connects the `client` to the remote TCP time server on port 13 using [System.Net.Sockets.TcpClient.ConnectAsync*](https://learn.microsoft.com/search/?terms=System.Net.Sockets.TcpClient.ConnectAsync*).
- Uses a [System.Net.Sockets.NetworkStream](https://learn.microsoft.com/search/?terms=System.Net.Sockets.NetworkStream) to read data from the remote host.
- Declares a read buffer of `1_024` bytes.
- Reads data from the `stream` into the read buffer.
- Writes the results as a string to the console.

Since the client knows that the message is small, the entire message can be read into the read buffer in one operation. With larger messages, or messages with an indeterminate length, the client should use the buffer more appropriately and read in a `while` loop.

> **Important:**
> When sending and receiving messages, the [System.Text.Encoding](https://learn.microsoft.com/search/?terms=System.Text.Encoding) should be known ahead of time to both server and client. For example, if the server communicates using [System.Text.ASCIIEncoding](https://learn.microsoft.com/search/?terms=System.Text.ASCIIEncoding) but the client attempts to use [System.Text.UTF8Encoding](https://learn.microsoft.com/search/?terms=System.Text.UTF8Encoding), the messages will be malformed.

## Create a `TcpListener`

The [System.Net.Sockets.TcpListener](https://learn.microsoft.com/search/?terms=System.Net.Sockets.TcpListener) type is used to monitor a TCP port for incoming requests and then create either a `Socket` or a `TcpClient` that manages the connection to the client. The [System.Net.Sockets.TcpListener.Start*](https://learn.microsoft.com/search/?terms=System.Net.Sockets.TcpListener.Start*) method enables listening, and the [System.Net.Sockets.TcpListener.Stop*](https://learn.microsoft.com/search/?terms=System.Net.Sockets.TcpListener.Stop*) method disables listening on the port. The [System.Net.Sockets.TcpListener.AcceptTcpClientAsync*](https://learn.microsoft.com/search/?terms=System.Net.Sockets.TcpListener.AcceptTcpClientAsync*) method accepts incoming connection requests and creates a `TcpClient` to handle the request, and the [System.Net.Sockets.TcpListener.AcceptSocketAsync*](https://learn.microsoft.com/search/?terms=System.Net.Sockets.TcpListener.AcceptSocketAsync*) method accepts incoming connection requests and creates a `Socket` to handle the request.

The following example demonstrates creating a network time server using a `TcpListener` to monitor TCP port 13. When an incoming connection request is accepted, the time server responds with the current date and time from the host server.

[language="csharp" source="../snippets/tcp/tcp-listener/Program.cs" id="tcplistener"::: (complete source file; reference: ../snippets/tcp/tcp-listener/Program.cs)](../../../../_code/docs/fundamentals/networking/snippets/tcp/tcp-listener/Program.cs.md)

The preceding C# code:

- Creates an `IPEndPoint` with [System.Net.IPAddress.Any](https://learn.microsoft.com/search/?terms=System.Net.IPAddress.Any) and port.
- Instantiate a new `TcpListener` object.
- Calls the [System.Net.Sockets.TcpListener.Start*](https://learn.microsoft.com/search/?terms=System.Net.Sockets.TcpListener.Start*) method to start listening on the port.
- Uses a `TcpClient` from the [System.Net.Sockets.TcpListener.AcceptTcpClientAsync*](https://learn.microsoft.com/search/?terms=System.Net.Sockets.TcpListener.AcceptTcpClientAsync*) method to accept incoming connection requests.
- Encodes the current date and time as a string message.
- Uses a [System.Net.Sockets.NetworkStream](https://learn.microsoft.com/search/?terms=System.Net.Sockets.NetworkStream) to write data to the connected client.
- Writes the sent message to the console.
- Finally, calls the [System.Net.Sockets.TcpListener.Stop*](https://learn.microsoft.com/search/?terms=System.Net.Sockets.TcpListener.Stop*) method to stop listening on the port.

## Finite TCP control with the `Socket` class

Both `TcpClient` and `TcpListener` internally rely on the `Socket` class, meaning anything you can do with these classes can be achieved using sockets directly. This section demonstrates several `TcpClient` and `TcpListener` use cases, along with their `Socket` counterpart that is functionally equivalent.

### Create a client socket

`TcpClient`'s default constructor tries to create a [*dual-stack socket*](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/fundamentals/networking/sockets/\[System.Net.Sockets.Socket.DualMode]\(https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.DualMode\)) via the [Socket(SocketType, ProtocolType)](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.%2523ctor%252A) constructor. This constructor creates a dual-stack socket if [IPv6 is supported](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/fundamentals/networking/sockets/\[System.Net.Sockets.Socket.OSSupportsIPv6]\(https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.OSSupportsIPv6\)), otherwise, it falls back to IPv4.

Consider the following TCP client code:

```csharp
using var client = new TcpClient();
```

The preceding TCP client code is functionally equivalent to the following socket code:

```csharp
using var socket = new Socket(SocketType.Stream, ProtocolType.Tcp);
```

#### The [System.Net.Sockets.TcpClient.%23ctor(System.Net.Sockets.AddressFamily)](https://learn.microsoft.com/search/?terms=System.Net.Sockets.TcpClient.%2523ctor(System.Net.Sockets.AddressFamily)) constructor

This constructor accepts only three `AddressFamily` values, otherwise it will throw a [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException). Valid values are:

- [AddressFamily.InterNetwork](https://learn.microsoft.com/search/?terms=System.Net.Sockets.AddressFamily.InterNetwork): for IPv4 socket.
- [AddressFamily.InterNetworkV6](https://learn.microsoft.com/search/?terms=System.Net.Sockets.AddressFamily.InterNetworkV6): for IPv6 socket.
- [AddressFamily.Unknown](https://learn.microsoft.com/search/?terms=System.Net.Sockets.AddressFamily.Unknown): this will attempt to create a dual-stack socket, similarly to the default constructor.

Consider the following TCP client code:

```csharp
using var client = new TcpClient(AddressFamily.InterNetwork);
```

The preceding TCP client code is functionally equivalent to the following socket code:

```csharp
using var socket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
```

#### The [System.Net.Sockets.TcpClient.%23ctor(System.Net.IPEndPoint)](https://learn.microsoft.com/search/?terms=System.Net.Sockets.TcpClient.%2523ctor(System.Net.IPEndPoint)) constructor

Upon creating the socket, this constructor will also **bind** to the provided **local** `IPEndPoint`. The [System.Net.IPEndPoint.AddressFamily](https://learn.microsoft.com/search/?terms=System.Net.IPEndPoint.AddressFamily) property is used to determine the address family of the socket.

Consider the following TCP client code:

```csharp
var endPoint = new IPEndPoint(IPAddress.Parse("127.0.0.1"), 5001);
using var client = new TcpClient(endPoint);
```

The preceding TCP client code is functionally equivalent to the following socket code:

```csharp
// Example IPEndPoint object
var endPoint = new IPEndPoint(IPAddress.Parse("127.0.0.1"), 5001);
using var socket = new Socket(endPoint.AddressFamily, SocketType.Stream, ProtocolType.Tcp);
socket.Bind(endPoint);
```

#### The [System.Net.Sockets.TcpClient.%23ctor(System.String,System.Int32)](https://learn.microsoft.com/search/?terms=System.Net.Sockets.TcpClient.%2523ctor(System.String%2CSystem.Int32)) constructor

This constructor will attempt to create a dual-stack similar to the default constructor and **connect** it to the **remote** DNS endpoint defined by the `hostname` and `port` pair.

Consider the following TCP client code:

```csharp
using var client = new TcpClient("www.example.com", 80);
```

The preceding TCP client code is functionally equivalent to the following socket code:

```csharp
using var socket = new Socket(SocketType.Stream, ProtocolType.Tcp);
socket.Connect("www.example.com", 80);
```

### Connect to server

All `Connect`, `ConnectAsync`, `BeginConnect` and `EndConnect` overloads in `TcpClient` are functionally equivalent to the corresponding `Socket` methods.

Consider the following TCP client code:

```csharp
using var client = new TcpClient();
client.Connect("www.example.com", 80);
```

The above `TcpClient` code is equivalent to the following socket code:

```csharp
using var socket = new Socket(SocketType.Stream, ProtocolType.Tcp);
socket.Connect("www.example.com", 80);
```

### Create a server socket

Much like `TcpClient` instances having functional equivalency with their raw `Socket` counterparts, this section maps `TcpListener` constructors to their corresponding socket code. The first constructor to consider is the `TcpListener(IPAddress localaddr, int port)`.

```csharp
var listener = new TcpListener(IPAddress.Loopback, 5000);
```

The preceding TCP listener code is functionally equivalent to the following socket code:

```csharp
var ep = new IPEndPoint(IPAddress.Loopback, 5000);
using var socket = new Socket(ep.AddressFamily, SocketType.Stream, ProtocolType.Tcp);
```

### Start listening on the server

The [System.Net.Sockets.TcpListener.Start](https://learn.microsoft.com/search/?terms=System.Net.Sockets.TcpListener.Start) method is a wrapper combining `Socket`'s [System.Net.Sockets.Socket.Bind*](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.Bind*) and [System.Net.Sockets.Socket.Listen](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.Listen) functionality.

Consider the following TCP listener code:

```csharp
var listener = new TcpListener(IPAddress.Loopback, 5000);
listener.Start(10);
```

The preceding TCP listener code is functionally equivalent to the following socket code:

```csharp
var endPoint = new IPEndPoint(IPAddress.Loopback, 5000);
using var socket = new Socket(endPoint.AddressFamily, SocketType.Stream, ProtocolType.Tcp);
socket.Bind(endPoint);
try
{
    socket.Listen(10);
}
catch (SocketException)
{
    socket.Dispose();
}
```

### Accept a server connection

Under the hood, incoming TCP connections are always creating a new socket when accepted. `TcpListener` can accept a [System.Net.Sockets.Socket](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket) instance directly (via [System.Net.Sockets.TcpListener.AcceptSocket](https://learn.microsoft.com/search/?terms=System.Net.Sockets.TcpListener.AcceptSocket) or [System.Net.Sockets.TcpListener.AcceptSocketAsync](https://learn.microsoft.com/search/?terms=System.Net.Sockets.TcpListener.AcceptSocketAsync)) or it can accept a [System.Net.Sockets.TcpClient](https://learn.microsoft.com/search/?terms=System.Net.Sockets.TcpClient) (via [System.Net.Sockets.TcpListener.AcceptTcpClient](https://learn.microsoft.com/search/?terms=System.Net.Sockets.TcpListener.AcceptTcpClient) and [System.Net.Sockets.TcpListener.AcceptTcpClientAsync](https://learn.microsoft.com/search/?terms=System.Net.Sockets.TcpListener.AcceptTcpClientAsync)).

Consider the following `TcpListener` code:

```csharp
var listener = new TcpListener(IPAddress.Loopback, 5000);
using var acceptedSocket = await listener.AcceptSocketAsync();

// Synchronous alternative.
// var acceptedSocket = listener.AcceptSocket();
```

The preceding TCP listener code is functionally equivalent to the following socket code:

```csharp
var endPoint = new IPEndPoint(IPAddress.Loopback, 5000);
using var socket = new Socket(endPoint.AddressFamily, SocketType.Stream, ProtocolType.Tcp);
using var acceptedSocket = await socket.AcceptAsync();

// Synchronous alternative
// var acceptedSocket = socket.Accept();
```

### Create a `NetworkStream` to send and receive data

With `TcpClient` you need to instantiate a [System.Net.Sockets.NetworkStream](https://learn.microsoft.com/search/?terms=System.Net.Sockets.NetworkStream) with the [System.Net.Sockets.TcpClient.GetStream](https://learn.microsoft.com/search/?terms=System.Net.Sockets.TcpClient.GetStream) method to be able to send and receive data . With `Socket`, you have to do the `NetworkStream` creation manually.

Consider the following `TcpClient` code:

```csharp
using var client = new TcpClient();
using NetworkStream stream = client.GetStream();
```

Which is equivalent to the following socket code:

```csharp
using var socket = new Socket(SocketType.Stream, ProtocolType.Tcp);

// Be aware that transferring the ownership means that closing/disposing the stream will also close the underlying socket.
using var stream = new NetworkStream(socket, ownsSocket: true);
```

> **Tip:**
> If your code doesn't need to work with a [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream) instance, you can rely on `Socket`'s Send/Receive methods ([System.Net.Sockets.Socket.Send*](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.Send*), [System.Net.Sockets.Socket.SendAsync*](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.SendAsync*), [System.Net.Sockets.Socket.Receive*](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.Receive*) and [System.Net.Sockets.Socket.ReceiveAsync*](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket.ReceiveAsync*)) directly instead of creating a [System.Net.Sockets.NetworkStream](https://learn.microsoft.com/search/?terms=System.Net.Sockets.NetworkStream).

## See also

- [Use Sockets to send and receive data over TCP](socket-services.md)
- [Networking in .NET](../overview.md)
- [System.Net.Sockets.Socket](https://learn.microsoft.com/search/?terms=System.Net.Sockets.Socket)
- [System.Net.Sockets.TcpClient](https://learn.microsoft.com/search/?terms=System.Net.Sockets.TcpClient)
- [System.Net.Sockets.TcpListener](https://learn.microsoft.com/search/?terms=System.Net.Sockets.TcpListener)
- [System.Net.Sockets.NetworkStream](https://learn.microsoft.com/search/?terms=System.Net.Sockets.NetworkStream)
