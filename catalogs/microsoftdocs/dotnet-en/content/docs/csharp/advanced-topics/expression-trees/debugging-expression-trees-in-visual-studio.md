---
title: "Debug expression trees in Visual Studio"
description: Learn about the DebugView property in Visual Studio. See how to use this property to analyze the structure and content of expression trees.
ms.date: 03/06/2023
---
# Debugging expression trees in Visual Studio

You can analyze the structure and content of expression trees when you debug your applications. To get a quick overview of the expression tree structure, you can use the `DebugView` property, which represents expression trees [using a special syntax](debugview-syntax.md). `DebugView` is available only in debug mode.

Screenshot of the DebugView of an expression tree within VS debugger.

Since `DebugView` is a string, you can use the [built-in Text Visualizer](https://learn.microsoft.com/visualstudio/debugger/view-strings-visualizer#open-a-string-visualizer) to view it across multiple lines, by selecting **Text Visualizer** from the magnifying glass icon next to the `DebugView` label.

Screenshot of the Text Visualizer applied to results of DebugView.

Alternatively, you can install and use [a custom visualizer](https://learn.microsoft.com/visualstudio/debugger/create-custom-visualizers-of-data) for expression trees, such as:

- [Readable Expressions](https://github.com/agileobjects/ReadableExpressions) ([MIT license](https://github.com/agileobjects/ReadableExpressions/blob/master/LICENCE.md), available at the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=vs-publisher-1232914.ReadableExpressionsVisualizers)), renders the expression tree as themeable C# code, with various rendering options:

  Screenshot of the Readable Expressions visualizer.

- [Expression Tree Visualizer](https://github.com/zspitz/ExpressionTreeVisualizer/blob/master/README.md) ([MIT license](https://github.com/zspitz/ExpressionTreeVisualizer/blob/master/LICENSE)) provides a tree view of the expression tree and its individual nodes:

Screenshot of the Expression Tree Visualizer.

## Open a visualizer for an expression tree

Select the magnifying glass icon that appears next to the expression tree in **DataTips**, a **Watch** window, the **Autos** window, or the **Locals** window. A list of available visualizers is displayed:

Screenshot showing the Opening of visualizers from Visual Studio.

Select the visualizer you want to use.

## See also

- [Debugging in Visual Studio](https://learn.microsoft.com/visualstudio/debugger/debugger-feature-tour)
- [Create Custom Visualizers](https://learn.microsoft.com/visualstudio/debugger/create-custom-visualizers-of-data)
- [`DebugView` syntax](debugview-syntax.md)
