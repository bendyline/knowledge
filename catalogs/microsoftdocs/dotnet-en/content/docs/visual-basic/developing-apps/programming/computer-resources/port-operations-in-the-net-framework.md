---
description: "Learn more about: Port Operations in the .NET Framework with Visual Basic"
title: "Port Operations in the .NET Framework"
ms.date: 07/20/2015
helpviewer_keywords:
  - "ports, Visual Basic"
ms.assetid: 1eba223b-7bd3-401a-b097-982bce96df1b
---
# Port Operations in the .NET Framework with Visual Basic

You can access your computer's serial ports through the .NET Framework classes in the [System.IO.Ports](https://learn.microsoft.com/search/?terms=System.IO.Ports) namespace. The most important class, [System.IO.Ports.SerialPort](https://learn.microsoft.com/search/?terms=System.IO.Ports.SerialPort), provides a framework for synchronous and event-driven I/O, access to pin and break states, and access to serial driver properties. It can be wrapped in a [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream) object, accessible through the [System.IO.Ports.SerialPort.BaseStream](https://learn.microsoft.com/search/?terms=System.IO.Ports.SerialPort.BaseStream) property. Wrapping [System.IO.Ports.SerialPort](https://learn.microsoft.com/search/?terms=System.IO.Ports.SerialPort) in a [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream) object allows the serial port to be accessed by classes that use streams. The namespace includes enumerations that simplify the control of serial ports.

The simplest way to create a [System.IO.Ports.SerialPort](https://learn.microsoft.com/search/?terms=System.IO.Ports.SerialPort) object is through the [Microsoft.VisualBasic.Devices.Ports.OpenSerialPort*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Devices.Ports.OpenSerialPort*) method.

> **Note:**
> You cannot use .NET Framework classes to directly access other types of ports, such as parallel ports, USB ports, and so on.

## Enumerations

This table lists and describes the main enumerations used for accessing a serial port:

| Enumeration | Description |
| --- | --- |
| [System.IO.Ports.Handshake](https://learn.microsoft.com/search/?terms=System.IO.Ports.Handshake) | Specifies the control protocol used in establishing a serial port communication for a [System.IO.Ports.SerialPort](https://learn.microsoft.com/search/?terms=System.IO.Ports.SerialPort) object. |
| [System.IO.Ports.Parity](https://learn.microsoft.com/search/?terms=System.IO.Ports.Parity) | Specifies the parity bit for a [System.IO.Ports.SerialPort](https://learn.microsoft.com/search/?terms=System.IO.Ports.SerialPort) object. |
| [System.IO.Ports.SerialData](https://learn.microsoft.com/search/?terms=System.IO.Ports.SerialData) | Specifies the type of character that was received on the serial port of the [System.IO.Ports.SerialPort](https://learn.microsoft.com/search/?terms=System.IO.Ports.SerialPort) object. |
| [System.IO.Ports.SerialError](https://learn.microsoft.com/search/?terms=System.IO.Ports.SerialError) | Specifies errors that occur on the [System.IO.Ports.SerialPort](https://learn.microsoft.com/search/?terms=System.IO.Ports.SerialPort) object |
| [System.IO.Ports.SerialPinChange](https://learn.microsoft.com/search/?terms=System.IO.Ports.SerialPinChange) | Specifies the type of change that occurred on the [System.IO.Ports.SerialPort](https://learn.microsoft.com/search/?terms=System.IO.Ports.SerialPort) object. |
| [System.IO.Ports.StopBits](https://learn.microsoft.com/search/?terms=System.IO.Ports.StopBits) | Specifies the number of stop bits used on the [System.IO.Ports.SerialPort](https://learn.microsoft.com/search/?terms=System.IO.Ports.SerialPort) object. |

## See also

- [Microsoft.VisualBasic.Devices.Ports](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Devices.Ports)
- [Accessing the Computer's Ports](accessing-the-computer-s-ports.md)
