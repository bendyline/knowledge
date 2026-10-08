---
title: .NET Managed languages strategy
description: Each .NET language is unique. C# is the most widely used language and the language most of .NET is written in. F# explores new language possibilities and the community provides a rich experience across platforms. We remain committed to Visual Basic and continue to invest in maintaining C# interop and Visual Studio features for folks that love Visual Basic or want a stable language.
author: billwagner
ms.author: wiwagn
ms.date: 02/06/2023
ms.topic: concept-article
---
# Microsoft .NET language strategy

Microsoft offers 3 languages on the .NET platform – C#, F# and Visual Basic. In this article, you’ll learn about our strategy for each language. Look for links to additional articles on how these strategies guide us and ways to learn more about each language.

## C\#

C# is a cross-platform general purpose language that makes developers productive while writing highly performant code. With millions of developers, C# is the most popular .NET language. C# has broad support in the ecosystem and all .NET [workloads](../standard/glossary.md#workload). Based on object-oriented principles, it incorporates many features from other paradigms, not least functional programming. Low-level features support high-efficiency scenarios without writing unsafe code. Most of the .NET runtime and libraries are written in C#, and advances in C# often benefit all .NET developers.

### Our strategy for C\#

We will keep evolving C# to meet the changing needs of developers and remain a state-of-the-art programming language. We will innovate eagerly and broadly in collaboration with the teams responsible for .NET libraries, developer tools, and workload support, while being careful to stay within the spirit of the language. Recognizing the diversity of domains where C# is being used, we will prefer language and performance improvements that benefit all or most developers and maintain a high commitment to backwards compatibility. We will continue to empower the broader .NET ecosystem and grow its role in C#’s future, while maintaining stewardship of design decisions.


You can read more about how this strategy guides us in the [C# guide](../csharp/tour-of-csharp/strategy.md).

## F\#

F# is a succinct, robust and performant language that is expression-based and immutable by default. It focuses on expressive power, simplicity and elegance and is used by many thousands of developers that appreciate its pragmatic function-first approach to .NET. F# offers the full power of .NET and works well with C# for mixed language solutions. The community makes significant contributions to the compiler and runtime, as well as a broad array of F# tools and frameworks.

### Our strategy for F\#

We will drive F# evolution and support the F# ecosystem with language leadership and governance. We will encourage community contributions to improve the F# language and developer experience. We will continue to rely on the community to provide important libraries, developer tools and [workload](../standard/glossary.md#workload) support. As the language evolves,  F# will support .NET platform improvements and maintain interoperability with new C# features. We will work across language, tooling, and documentation to lower the barrier to entry into F# for new developers and organizations as well as broadening its reach into new domains.


You can read more about how this strategy guides us in the [F# guide](../fsharp/strategy.md).

## Visual Basic

Visual Basic (VB) has a long history as an approachable language favoring clarity over brevity. Its hundreds of thousands of developers are concentrated around the traditional Windows-based client [workloads](../standard/glossary.md#workload) where VB has long pioneered great tooling and ease of use.  Today’s VB developers benefit from a stable and mature object-oriented language paired with a growing .NET ecosystem and ongoing tooling improvements. Some .NET workloads are not supported in VB, and it is common for VB developers to use C# for those scenarios.

### Our strategy for Visual Basic

Visual Basic will remain a straightforward and approachable language with a stable design. The core libraries of .NET will support Visual Basic, and many of the improvements to the .NET Runtime and libraries will automatically benefit Visual Basic. When C# or the .NET Runtime introduce new features that would require language support, Visual Basic will generally adopt a consumption-only approach and avoid new syntax. Visual Basic won't be extended to new workloads. We will continue to invest in the experience in Visual Studio and interop with C#, especially in core Visual Basic scenarios such as Windows Forms and libraries.


You can read more about how this strategy guides us in the [Visual Basic guide](../visual-basic/getting-started/strategy.md).
