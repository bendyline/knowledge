---
title: Blink an LED
description: Learn how to blink an LED with the .NET IoT Libraries.
author: camsoper
ms.date: 03/07/2026
ms.topic: tutorial
---

# Blink an LED

General-purpose I/O (GPIO) pins can be controlled individually. This is useful for controlling LEDs, relays, and other stateful devices. In this topic, you will use .NET and your Raspberry Pi's GPIO pins to power an LED and blink it repeatedly.

> [!VIDEO https://learn-video.azurefd.net/vod/player?show=dotnet-iot-for-beginners&ep=general-purpose-inputoutput-use-gpio-output-to-control-devices-with-dotnet-dotnet-iot-for-beginners]

## Prerequisites

- ARM-based (ARMv7 or greater) single-board computer (SBC)

- 5 mm LED
- 330 Ω resistor
- Breadboard
- Jumper wires
- Raspberry Pi GPIO breakout board (optional/recommended)
- [.NET SDK](https://dotnet.microsoft.com/download) 10 or later


> **Note:**
> This tutorial is written assuming the target device is Raspberry Pi. However, this tutorial can be used for any Linux-based SBC that supports .NET, such as Orange Pi, ODROID, and more.


Ensure SSH is enabled on your device. For Raspberry Pi, [refer to *Setting up an SSH Server* in the Raspberry Pi documentation](https://www.raspberrypi.com/documentation/computers/remote-access.html#ssh).


## Prepare the hardware

Use the hardware components to build the circuit as depicted in the following diagram:

A Fritzing diagram showing a circuit with an LED and a resistor

The image above depicts the following connections:

- GPIO 18 to LED anode (longer, positive lead)
- LED cathode (shorter, negative lead) to 330 Ω resistor (either end)
- 330 Ω resistor (other end) to ground

<!--markdownlint-disable DOCSMD011 -->
Refer to the following pinout diagram as needed:

A diagram showing the pinout of the Raspberry Pi GPIO header. Image courtesy Raspberry Pi Foundation.


> **Tip:**
> A GPIO breakout board in conjunction with a breadboard is recommended to streamline connections to the GPIO header.


## Create the app

Complete the following steps in your preferred development environment:

1. Create a new .NET Console App using either the [.NET CLI](../../core/tools/dotnet-new.md) or [Visual Studio](../../core/tutorials/create-console-app.md). Name it *BlinkTutorial*.

    ```dotnetcli
    dotnet new console -o BlinkTutorial
    cd BlinkTutorial
    ```

1. Add the [System.Device.Gpio](https://www.nuget.org/packages/System.Device.Gpio/) package to the project. Use either [.NET CLI](../../core/tools/dotnet-package-add.md) from the project directory or [Visual Studio](https://learn.microsoft.com/nuget/consume-packages/install-use-packages-visual-studio).

```dotnetcli
dotnet package add System.Device.Gpio --version 4.0.1
```

1. Replace the contents of *Program.cs* with the following code:

    [Code reference unavailable in this source snapshot: ~/iot-samples/tutorials/BlinkTutorial/Program.cs](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/iot/tutorials/blink-led.md)

    In the preceding code:

    - A [using declaration](../../csharp/language-reference/statements/using.md) creates an instance of `GpioController`. The `using` declaration ensures the object is disposed and hardware resources are released properly.
    - GPIO pin 18 is opened for output
    - A `while` loop runs indefinitely. Each iteration:
        1. Writes a value to GPIO pin 18. If `ledOn` is true, it writes `PinValue.High` (on). Otherwise, it writes `PinValue.Low`.
        1. Sleeps 1000 ms.
        1. Toggles the value of `ledOn`.

1. Build the app. If using the .NET CLI, run `dotnet build`. To build in Visual Studio, press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>.

1. Deploy the app to the SBC as a self-contained app. For instructions, see [Deploy .NET apps to Raspberry Pi](../deployment.md#deploying-a-self-contained-app). Make sure to give the executable *execute* permission using `chmod +x`.

1. Run the app on the Raspberry Pi by switching to the deployment directory and running the executable.

    ```bash
    ./BlinkTutorial
    ```

    The LED blinks off and on every second.

1. Terminate the program by pressing <kbd>Ctrl</kbd>+<kbd>C</kbd>.

Congratulations! You've used GPIO to blink an LED.

## Get the source code

The source for this tutorial is [available on GitHub](https://github.com/MicrosoftDocs/dotnet-iot-assets/tree/main/tutorials/BlinkTutorial).

## Next steps

> 
> [Learn how to read binary input using GPIO](gpio-input.md)
