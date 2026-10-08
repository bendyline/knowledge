---
title: Read environmental conditions from a sensor
description: Learn how to read temperature, barometric pressure, and humidity with the .NET IoT Libraries.
author: camsoper
ms.date: 03/07/2026
ms.topic: tutorial
---

# Read environmental conditions from a sensor

One of the most common scenarios for IoT devices is detection of environmental conditions. A variety of sensors are available to monitor temperature, humidity, barometric pressure, and more.

In this topic, you will use .NET to read environmental conditions from a sensor.

> [!VIDEO https://learn-video.azurefd.net/vod/player?show=dotnet-iot-for-beginners&ep=iot-sensors-and-displays-with-i²c-and-dotnet-dotnet-iot-for-beginners]

## Prerequisites

- ARM-based (ARMv7 or greater) single-board computer (SBC)

- [BME280](https://learn.adafruit.com/adafruit-bme280-humidity-barometric-pressure-temperature-sensor-breakout) humidity/barometric pressure/temperature sensor breakout
- Jumper wires
- Breadboard (optional)
- Raspberry Pi GPIO breakout board (optional)
- [.NET SDK](https://dotnet.microsoft.com/download) 10 or later


> **Note:**
> This tutorial is written assuming the target device is Raspberry Pi. However, this tutorial can be used for any Linux-based SBC that supports .NET, such as Orange Pi, ODROID, and more.


> **Important:**
> There are many manufacturers of BME280 breakouts. Most designs are similar, and the manufacturer shouldn't make any difference to the functionality. This tutorial attempts to account for variations. Ensure your BME280 breakout includes an Inter-Integrated Circuit (I<sup>2</sup>C) interface.
>
> Components like BME280 breakouts are often sold with unsoldered pin headers. If you're uncomfortable with soldering, look for a BME280 breakout board with a pre-soldered header or a different connector. If you want, consider learning how to solder! [Here's a good beginner's guide to soldering](https://learn.adafruit.com/adafruit-guide-excellent-soldering).

## Prepare the SBC

Ensure your SBC is configured to support the following services:

- SSH
- I2C

For many devices, no additional configuration is required. For Raspberry Pi, use the `raspi-config` command. For more information on `raspi-config`, refer to the [Raspberry Pi documentation](https://www.raspberrypi.com/documentation/computers/configuration.html).


## Prepare the hardware

Use the hardware components to build the circuit as depicted in the following diagram:

A Fritzing diagram showing the connection from Raspberry Pi to BME280 breakout board

The following are the connections from the Raspberry Pi to the BME280 breakout. Note that pin labels differ on various BME280 breakouts.

| Raspberry Pi | BME280 Breakout | Color |
| --- | --- | --- |
| 3.3V | VIN/3V3 | red |
| Ground | GND | black |
| SDA (GPIO 2) | SDI/SDA | blue |
| SCL (GPIO 3) | SCK/SCL | orange |

<!--markdownlint-disable DOCSMD011 -->
Refer to the following pinout diagram as needed:

A diagram showing the pinout of the Raspberry Pi GPIO header. Image courtesy Raspberry Pi Foundation.


> **Tip:**
> A GPIO breakout board in conjunction with a breadboard is recommended to streamline connections to the GPIO header.


## Create the app

Complete the following steps in your preferred development environment:

1. Create a new .NET Console App using either the [.NET CLI](../../core/tools/dotnet-new.md) or [Visual Studio](../../core/tutorials/create-console-app.md). Name it *SensorTutorial*.

    ```dotnetcli
    dotnet new console -o SensorTutorial
    cd SensorTutorial
    ```

1. Add the [Iot.Device.Bindings](https://www.nuget.org/packages/Iot.Device.Bindings/) package to the project. Use either [.NET CLI](../../core/tools/dotnet-package-add.md) from the project directory or [Visual Studio](https://learn.microsoft.com/nuget/consume-packages/install-use-packages-visual-studio).

```dotnetcli
dotnet package add Iot.Device.Bindings --version 4.1.0
```

1. Replace the contents of *Program.cs* with the following code:

    [Code reference unavailable in this source snapshot: ~/iot-samples/tutorials/SensorTutorial/Program.cs](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/iot/tutorials/temp-sensor.md)

    In the preceding code:

    - `i2cSettings` is set to a new instance of `I2cConnectionSettings`. The constructor sets the `busId` parameter to 1 and the `deviceAddress` parameter to `Bme280.DefaultI2cAddress`.

        > **Important:**
        > Some BME280 breakout manufacturers use the secondary address value. For those devices, use `Bme280.SecondaryI2cAddress`.

    - A [using declaration](../../csharp/language-reference/statements/using.md) creates an instance of `I2cDevice` by calling `I2cDevice.Create` and passing in `i2cSettings`. This `I2cDevice` represents the I<sup>2</sup>C bus. The `using` declaration ensures the object is disposed and hardware resources are released properly.
    - Another `using` declaration creates an instance of `Bme280` to represent the sensor. The `I2cDevice` is passed in the constructor.
    - The time required for the chip to take measurements with the chip's current (default) settings is retrieved by calling `GetMeasurementDuration`.
    - A `while` loop runs indefinitely. Each iteration:
        1. Clears the console.
        1. Sets the power mode to `Bmx280PowerMode.Forced`. This forces the chip to perform one measurement, store the results, and then sleep.
        1. Reads the values for temperature, pressure, humidity, and altitude.

            > **Note:**
            > Altitude is calculated by the device binding. This overload of `TryReadAltitude` uses mean sea level pressure to generate an estimate.

        1. Writes the current environmental conditions to the console.
        1. Sleeps 1000 ms.

1. Build the app. If using the .NET CLI, run `dotnet build`. To build in Visual Studio, press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>.

1. Deploy the app to the SBC as a self-contained app. For instructions, see [Deploy .NET apps to Raspberry Pi](../deployment.md#deploying-a-self-contained-app). Make sure to give the executable *execute* permission using `chmod +x`.

1. Run the app on the Raspberry Pi by switching to the deployment directory and running the executable.

    ```bash
    ./SensorTutorial
    ```

    Observe the sensor output in the console.

1. Terminate the program by pressing <kbd>Ctrl+C</kbd>.

Congratulations! You've used I<sup>2</sup>C to read values from a temperature/humidity/barometric pressure sensor!

## Get the source code

The source for this tutorial is [available on GitHub](https://github.com/MicrosoftDocs/dotnet-iot-assets/tree/main/tutorials/SensorTutorial).

## Next steps

> 
> [Learn how to display text on an LCD](lcd-display.md)
