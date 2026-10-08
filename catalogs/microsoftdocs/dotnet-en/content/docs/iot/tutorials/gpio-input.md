---
title: Use GPIO for binary input
description: Learn how to use GPIO for binary input with the .NET IoT Libraries.
author: camsoper
ms.date: 03/07/2026
ms.topic: tutorial
---

# Use GPIO for binary input

General-purpose I/O (GPIO) pins can be configured to receive electrical signals as input. At its most basic level, this is useful for scenarios that detect the opening/closing of a circuit. Such circuits might include push buttons, toggle switches, reed switches, pressure switches, and other devices that represent binary (on/off) values by completing a circuit.

In this tutorial, you'll use .NET and your Raspberry Pi's GPIO pins to detect the opening and closing of a circuit.

> [!VIDEO https://learn-video.azurefd.net/vod/player?show=dotnet-iot-for-beginners&ep=general-purpose-inputoutput-read-input-with-gpio-and-dotnet-dotnet-iot-for-beginners]

## Prerequisites

- ARM-based (ARMv7 or greater) single-board computer (SBC)

- Jumper wires
- Breadboard (optional)
- Raspberry Pi GPIO breakout board (optional)
- [.NET SDK](https://dotnet.microsoft.com/download) 10 or later


> **Note:**
> This tutorial is written assuming the target device is Raspberry Pi. However, this tutorial can be used for any Linux-based SBC that supports .NET, such as Orange Pi, ODROID, and more.


Ensure SSH is enabled on your device. For Raspberry Pi, [refer to *Setting up an SSH Server* in the Raspberry Pi documentation](https://www.raspberrypi.com/documentation/computers/remote-access.html#ssh).


## Prepare the hardware

Use the hardware components to build the circuit as depicted in the following diagram:

A diagram showing a circuit that connects a ground pin to pin 21.

The image above depicts a direct connection between a ground pin and pin 21.

> **Tip:**
> The diagram depicts a breadboard and GPIO breakout for illustrative purposes, but feel free to just connect a ground pin and pin 21 with a jumper wire on the Raspberry Pi.

<!--markdownlint-disable DOCSMD011 -->
Refer to the following pinout diagram as needed:

A diagram showing the pinout of the Raspberry Pi GPIO header. Image courtesy Raspberry Pi Foundation.


## Create the app

Complete the following steps in your preferred development environment:

1. Create a new .NET Console App using either the [.NET CLI](../../core/tools/dotnet-new.md) or [Visual Studio](../../core/tutorials/create-console-app.md). Name it *InputTutorial*.

    ```dotnetcli
    dotnet new console -o InputTutorial
    cd InputTutorial
    ```

1. Add the [System.Device.Gpio](https://www.nuget.org/packages/System.Device.Gpio/) package to the project. Use either [.NET CLI](../../core/tools/dotnet-package-add.md) from the project directory or [Visual Studio](https://learn.microsoft.com/nuget/consume-packages/install-use-packages-visual-studio).

```dotnetcli
dotnet package add System.Device.Gpio --version 4.0.1
```

1. Replace the contents of *Program.cs* with the following code:

    [Code reference unavailable in this source snapshot: ~/iot-samples/tutorials/InputTutorial/Program.cs](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/iot/tutorials/gpio-input.md)

    In the preceding code:

    - A [using declaration](../../csharp/language-reference/statements/using.md) creates an instance of `GpioController`. The `using` declaration ensures the object is disposed and hardware resources are released properly.
        - `GpioController` is instantiated with no parameters, indicating that it should detect which hardware platform it's running on and use the [logical pin numbering scheme](https://learn.microsoft.com/dotnet/api/system.device.gpio.pinnumberingscheme).
    - GPIO pin 21 is opened with `PinMode.InputPullUp`.
        - This opens the pin with a *PullUp* resistor engaged. In this mode, when the pin is connected to ground, it will return `PinValue.Low`. When the pin is disconnected from ground and the circuit is open, the pin returns `PinValue.High`.
    - The initial status is written to a console using a ternary expression. The pin's current state is read with `Read()`. If it's `PinValue.High`, it writes the `Alert` string to the console. Otherwise, it writes the `Ready` string.
    - `RegisterCallbackForPinValueChangedEvent()` registers a callback function for both the `PinEventTypes.Rising` and `PinEventTypes.Falling` events on the pin. These events correspond to pin states of `PinValue.High` and `PinValue.Low`, respectively.
    - The callback function points to a method called `OnPinEvent()`. `OnPinEvent()` uses another ternary expression that also writes the corresponding `Alert` or `Ready` strings.
    - The main thread sleeps indefinitely while waiting for pin events.

1. Build the app. If using the .NET CLI, run `dotnet build`. To build in Visual Studio, press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>.

1. Deploy the app to the SBC as a self-contained app. For instructions, see [Deploy .NET apps to Raspberry Pi](../deployment.md#deploying-a-self-contained-app). Make sure to give the executable *execute* permission using `chmod +x`.

1. Run the app on the Raspberry Pi by switching to the deployment directory and running the executable.

    ```bash
    ./InputTutorial
    ```

    The console displays text similar to the following:

    ```console
    Initial status (05/10/2022 15:59:25): READY ✅
    ```

1. Disconnect pin 21 from ground. The console displays text similar to the following:

    ```console
    (05/10/2022 15:59:59) ALERT 🚨
    ```

1. Reconnect pin 21 and ground. The console displays text similar to the following:

    ```console
    (05/10/2022 16:00:25) READY ✅
    ```

1. Terminate the program by pressing <kbd>Ctrl</kbd>+<kbd>C</kbd>.

Congratulations! You've used GPIO to detect input using the `System.Device.Gpio` NuGet package! There are many uses for this type of input. This example can be used with any scenario where a switch connects or breaks a circuit. Here's an example using it with a magnetic reed switch, which is often used to detect open doors or windows.

Animated GIF demonstrating a magnetic reed switch opening and closing. The switch is exposed to a magnet, and the app displays READY. The magnet is removed, and the app displays ALERT. The action is then repeated.

## Laser tripwire

Extending the previous example concept a bit further, let's take a look at how this could be applied to creating a laser tripwire. Building a laser tripwire requires the following additional components:

- KY-008 laser transmitter module
- Laser receiver sensor module *(see note below)*
- 2 10K Ω resistors

> **Note:**
> *Laser receiver sensor module* is the generic name applied to a common module found at many internet retailers. The device may vary in name or manufacturer, but should resemble this image.
>
> Image of a Laser Receiver Sensor Module

### Connect laser tripwire hardware

Connect the components as detailed in the following diagram.

A diagram showing a circuit that gets input from a laser receiver sensor module.

Pay close attention to the 10K Ω resistors. These implement a [voltage divider](https://www.seeedstudio.com/blog/2019/10/09/voltage-dividers-everything-you-need-to-know/). This is because the laser receiver module outputs 5V to indicate the beam is broken. Raspberry Pi only supports up to 3.3V for GPIO input. Since sending the full 5V to the pin could damage the Raspberry Pi, the current from the receiver module is passed through a voltage divider to halve the voltage to 2.5V.

### Apply source code updates

You can *almost* use the same code as earlier, with one exception. In the other examples, we used `PinMode.InputPullUp` so that when the pin is disconnected from ground and the circuit is open, the pin returns `PinValue.High`.

However, in the case of the laser receiver module, we're not detecting an open circuit. Instead, we want the pin to act as a sink for current coming from the laser receiver module. In this case, we'll open the pin with `PinMode.InputPullDown`. This way, the pin returns `PinValue.Low` when it's getting no current, and `PinValue.High` when it receives current from the laser receiver module.

```csharp
controller.OpenPin(pin, PinMode.InputPullDown);
```

> **Important:**
> Make sure the code deployed on your Raspberry Pi includes this change before testing a laser tripwire. The program *does* work without it, but using the wrong input mode risks damage to your Raspberry Pi!

Animated GIF showing a demonstration of the laser tripwire. The laser emitter lights the laser sensor module, and the app displays READY. The laser beam is broken, and the app displays ALERT. The action is then repeated.

## Get the source code

The source for this tutorial is [available on GitHub](https://github.com/MicrosoftDocs/dotnet-iot-assets/tree/main/tutorials/InputTutorial).

## Next steps

> 
> [Learn how to read environmental conditions from a sensor](temp-sensor.md)
