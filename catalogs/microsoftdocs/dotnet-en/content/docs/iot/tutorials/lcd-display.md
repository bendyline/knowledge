---
title: Display text on an LCD
description: Learn how to display characters on a liquid crystal display with the .NET IoT Libraries.
author: camsoper
ms.date: 03/07/2026
ms.topic: tutorial
---
<!--markdownlint-disable DOCSMD011 -->
# Display text on an LCD

LCD character displays are useful for displaying information without the need for an external monitor. Common LCD character displays can be connected directly to the GPIO pins, but such an approach requires the use of up to 10 GPIO pins. For scenarios that require connecting to a combination of devices, devoting so much of the GPIO header to a character display is often impractical.

Many manufacturers sell 20x4 LCD character displays with an integrated GPIO expander. The character display connects directly to the GPIO expander, which then connects to the Raspberry Pi via the Inter-Integrated Circuit (I<sup>2</sup>C) serial protocol.

In this topic, you will use .NET to display text on an LCD character display using an I<sup>2</sup>C GPIO expander.

> [!VIDEO https://learn-video.azurefd.net/vod/player?show=dotnet-iot-for-beginners&ep=iot-sensors-and-displays-with-i²c-and-dotnet-dotnet-iot-for-beginners#time=5m6s]

## Prerequisites

- ARM-based (ARMv7 or greater) single-board computer (SBC)

- [20x4 LCD Character Display with I<sup>2</sup>C interface](https://www.bing.com/images/search?q=20x4+lcd+display+with+i2c)
- Jumper wires
- Breadboard (optional/recommended)
- Raspberry Pi GPIO breakout board (optional/recommended)
- [.NET SDK](https://dotnet.microsoft.com/download) 10 or later


> **Note:**
> This tutorial is written assuming the target device is Raspberry Pi. However, this tutorial can be used for any Linux-based SBC that supports .NET, such as Orange Pi, ODROID, and more.


> **Note:**
> There are many manufacturers of LCD character displays. Most designs are identical, and the manufacturer shouldn't make any difference to the functionality. For reference, this tutorial was developed with the [SunFounder LCD2004](https://www.sunfounder.com/products/i2c-lcd2004-module).

## Prepare the SBC

Ensure your SBC is configured to support the following services:

- SSH
- I2C

For many devices, no additional configuration is required. For Raspberry Pi, use the `raspi-config` command. For more information on `raspi-config`, refer to the [Raspberry Pi documentation](https://www.raspberrypi.com/documentation/computers/configuration.html).


## Prepare the hardware

Use jumper wires to connect the four pins on the I<sup>2</sup>C GPIO expander to the Raspberry Pi as follows:

- GND to ground
- VCC to 5V
- SDA to SDA (GPIO 2)
- SCL to SCL (GPIO 3)

Refer to the following figures as needed:

| I<sup>2</sup>C interface (back of display) | Raspberry Pi GPIO |
| --- | --- |
| An image of the back of the character display showing the I2C GPIO expander. | A diagram showing the pinout of the Raspberry Pi GPIO header. Image courtesy Raspberry Pi Foundation.<br />[Image courtesy Raspberry Pi Foundation](https://www.raspberrypi.com/documentation/computers/os.html#gpio-and-the-40-pin-header). |

> **Tip:**
> A GPIO breakout board in conjunction with a breadboard is recommended to streamline connections to the GPIO header.


## Create the app

Complete the following steps in your preferred development environment:

1. Create a new .NET Console App using either the [.NET CLI](../../core/tools/dotnet-new.md) or [Visual Studio](../../core/tutorials/create-console-app.md). Name it *LcdTutorial*.

    ```dotnetcli
    dotnet new console -o LcdTutorial
    cd LcdTutorial
    ```

1. Add the [Iot.Device.Bindings](https://www.nuget.org/packages/Iot.Device.Bindings/) package to the project. Use either [.NET CLI](../../core/tools/dotnet-package-add.md) from the project directory or [Visual Studio](https://learn.microsoft.com/nuget/consume-packages/install-use-packages-visual-studio).

```dotnetcli
dotnet package add Iot.Device.Bindings --version 4.1.0
```

1. Replace the contents of *Program.cs* with the following code:

    [Code reference unavailable in this source snapshot: ~/iot-samples/tutorials/LcdTutorial/Program.cs](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/iot/tutorials/lcd-display.md)

    In the preceding code:

    - A [using declaration](../../csharp/language-reference/statements/using.md) creates an instance of `I2cDevice` by calling `I2cDevice.Create` and passing in a new `I2cConnectionSettings` with the `busId` and `deviceAddress` parameters. This `I2cDevice` represents the I<sup>2</sup>C bus. The `using` declaration ensures the object is disposed and hardware resources are released properly.

        > **Warning:**
        > The device address for the GPIO expander depends on the chip used by the manufacturer. GPIO expanders equipped with a PCF8574 use the address `0x27`, while those using PCF8574A chips use `0x3F`. Consult your LCD's documentation.

    - Another `using` declaration creates an instance of `Pcf8574` and passes the `I2cDevice` into the constructor. This instance represents the GPIO expander.
    - Another `using` declaration creates an instance of `Lcd2004` to represent the display. Several parameters are passed to the constructor describing the settings to use to communicate with the GPIO expander. The GPIO expander is passed as the `controller` parameter.
    - A `while` loop runs indefinitely. Each iteration:
        1. Clears the display.
        1. Sets the cursor position to the first position on the current line.
        1. Writes the current time to the display at the current cursor position.
        1. Iterates the current line counter.
        1. Sleeps 1000 ms.

1. Build the app. If using the .NET CLI, run `dotnet build`. To build in Visual Studio, press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>.

1. Deploy the app to the SBC as a self-contained app. For instructions, see [Deploy .NET apps to Raspberry Pi](../deployment.md#deploying-a-self-contained-app). Make sure to give the executable *execute* permission using `chmod +x`.

1. Run the app on the Raspberry Pi by switching to the deployment directory and running the executable.

    ```bash
    ./LcdTutorial
    ```

    Observe the LCD character display as the current time displays on each line.

    > **Tip:**
    > If the display is lit but you don't see any text, try adjusting the contrast dial on the back of the display.

1. Terminate the program by pressing <kbd>Ctrl</kbd>+<kbd>C</kbd>.

Congratulations! You've displayed text on an LCD using a I<sup>2</sup>C and a GPIO expander!

## Get the source code

The source for this tutorial is [available on GitHub](https://github.com/MicrosoftDocs/dotnet-iot-assets/tree/main/tutorials/LcdTutorial).

## Next steps

> 
> [Learn to use General Purpose Input/Output to blink an LED](blink-led.md)
