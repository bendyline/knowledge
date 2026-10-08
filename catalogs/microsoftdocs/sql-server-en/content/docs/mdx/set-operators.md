---
title: "Set Operators"
description: "Set Operators"
ms.date: 02/17/2022
ms.service: sql
ms.subservice: analysis-services
ms.topic: reference
ms.custom: mdx
---
# Set Operators


  In Multidimensional Expressions (MDX), set operators perform operations on members or sets, and return a set. You often use set operators as an alternate to several set functions in MDX expressions.  
  
 MDX supports the set operators listed in the following table.  
  
| Operator | Description |
| --- | --- |
| [- (Except)](except-mdx-operator.md) | Returns the difference between two sets, removing duplicate members.<br /><br /> This operator is functionally equivalent to the [Except](except-mdx-function.md) function. |
| [\* (Crossjoin)](crossjoin-mdx-operator-reference.md) | Returns the cross product of two sets.<br /><br /> This operator is functionally equivalent to the [Crossjoin](crossjoin-mdx.md) function. |
| [: (Range)](range-mdx.md) | Returns a naturally ordered set, with the two specified members as endpoints and all members between the two specified members included as members of the set. |
| [+ (Union)](union-mdx-operator-reference.md) | Returns a union of two sets, excluding duplicate members.<br /><br /> This operator is functionally equivalent to the [Union  (MDX)](union-mdx.md) function. |
  
## Related content

- [MDX Function Reference (MDX)](mdx-function-reference-mdx.md)
- [MDX Operator Reference (MDX)](mdx-operator-reference-mdx.md)
- [Operators (MDX Syntax)](operators-mdx-syntax.md)
