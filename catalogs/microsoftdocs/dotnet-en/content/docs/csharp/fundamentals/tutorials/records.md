---
title: Use record types tutorial
description: Build a small app that models temperature data with records, compares record behavior, and uses with expressions for nondestructive mutation.
ms.date: 04/14/2026
ms.topic: tutorial
ai-usage: ai-assisted
---

# Use record types

> **Tip:**
> **New to developing software?** Start with the [Get started](../../tour-of-csharp/tutorials/index.md) tutorials first. You get comfortable with classes, methods, and loops there.
>
> **Experienced in another language?** This tutorial focuses on C# record features you use every day: value equality, positional syntax, and `with` expressions.

In this tutorial, you build a console app that models daily temperatures by using records and record structs.

In this tutorial, you learn how to:

- Declare positional records and record structs.
- Build a small record hierarchy.
- Use compiler-generated equality and formatting.
- Use `with` expressions for nondestructive mutation.

## Prerequisites


- The latest [.NET SDK](https://dotnet.microsoft.com/download)
- [Visual Studio Code](https://code.visualstudio.com) editor
- The [C# DevKit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit)

### Installation instructions

On Windows, this [WinGet configuration file](https://builds.dotnet.microsoft.com/dotnet/install/dotnet_basic_config_docs.winget) to install all prerequisites. If you already have something installed, WinGet will skip that step.

1. Download the file and double-click to run it.
1. Read the license agreement, type <kbd>y</kbd>, and select <kbd>Enter</kbd> when prompted to accept.
1. If you get a flashing User Account Control (UAC) prompt in your Taskbar, allow the installation to continue.

On other platforms, you need to install each of these components separately.

1. Download the recommended installer from the [.NET SDK download page](https://dotnet.microsoft.com/download) and double-click to run it. The download page detects your platform and recommends the latest installer for your platform.
1. Download the latest installer from the [Visual Studio Code](https://code.visualstudio.com) home page and double click to run it. That page also detects your platform and the link should be correct for your system.
1. Click the "Install" button on the [C# DevKit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit) extension page. That opens Visual Studio code, and asks if you want to install or enable the extension. Select "install".


## Create the app and your first record

Create a folder for your app, run `dotnet new console`, and open the generated project.

Add a file named `DailyTemperature.cs`, and add a positional `readonly record struct` for temperature values:

[language="csharp" source="./snippets/records/DailyTemperature.cs" ID="TemperatureRecord"::: (complete source file; reference: ./snippets/records/DailyTemperature.cs)](../../../../_code/docs/csharp/fundamentals/tutorials/snippets/records/DailyTemperature.cs.md)

Add a file named `Program.cs`, and create sample temperature data:

[language="csharp" source="./snippets/records/Program.cs" ID="DeclareData"::: (complete source file; reference: ./snippets/records/Program.cs)](../../../../_code/docs/csharp/fundamentals/tutorials/snippets/records/Program.cs.md)

This syntax gives you concise data modeling with immutable value semantics.

## Add behavior to the record struct

In `DailyTemperature.cs`, the record struct already has a computed `Mean` property:

```csharp
public double Mean => (HighTemp + LowTemp) / 2.0;
```

A record struct works well here because each value is small and self-contained.

## Build record types for degree-day calculations

> **Note:**
> **Heating degree-days** and **cooling degree-days** measure how much the daily average temperature deviates from a base temperature (typically 65°F/18°C). Heating degree-days accumulate on cold days when the average is below the base, while cooling degree-days accumulate on warm days when the average is above the base. These calculations help estimate energy consumption for heating or cooling buildings, making them useful for utility companies, building managers, and climate analysis.

Create a file named `DegreeDays.cs` with a hierarchy for heating and cooling degree-day calculations:

[language="csharp" source="./snippets/records/InterimSteps.cs" ID="DegreeDaysRecords"::: (complete source file; reference: ./snippets/records/InterimSteps.cs)](../../../../_code/docs/csharp/fundamentals/tutorials/snippets/records/InterimSteps.cs.md)

Now calculate totals from your `Main` method in `Program.cs`:

[language="csharp" source="./snippets/records/Program.cs" ID="HeatingAndCooling"::: (complete source file; reference: ./snippets/records/Program.cs)](../../../../_code/docs/csharp/fundamentals/tutorials/snippets/records/Program.cs.md)

The generated `ToString` output is useful for quick diagnostics while you iterate.

## Override `PrintMembers` to customize output

When the default output includes too much noise, override `PrintMembers` in the base record:

[language="csharp" source="./snippets/records/DegreeDays.cs" ID="AddPrintMembers"::: (complete source file; reference: ./snippets/records/DegreeDays.cs)](../../../../_code/docs/csharp/fundamentals/tutorials/snippets/records/DegreeDays.cs.md)

The override keeps the output focused on the information you need.

## Use with expressions for nondestructive mutation

Use `with` to create modified copies without mutating the original record:

[language="csharp" source="./snippets/records/Program.cs" ID="GrowingDegreeDays"::: (complete source file; reference: ./snippets/records/Program.cs)](../../../../_code/docs/csharp/fundamentals/tutorials/snippets/records/Program.cs.md)

Extend that idea to compute rolling totals from slices of your input data:

[language="csharp" source="./snippets/records/Program.cs" ID="RunningFiveDayTotal"::: (complete source file; reference: ./snippets/records/Program.cs)](../../../../_code/docs/csharp/fundamentals/tutorials/snippets/records/Program.cs.md)

This approach is useful when you need transformations while you preserve original values.

## Next steps

- Review [C# record types](../types/records.md) for deeper guidance.
- Continue with [Object-oriented C#](oop.md) for broader design patterns.
- Explore [Converting types](safely-cast-using-pattern-matching-is-and-as-operators.md) to combine records with safe conversion patterns.
