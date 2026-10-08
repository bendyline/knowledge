---
title: Remove elements, attributes, and nodes from an XML tree - LINQ to XML
description: Learn how to remove elements, attributes, and other types of nodes from an XML tree.
ms.date: 07/20/2015
dev_langs:
  - "csharp"
  - "vb"
ms.topic: how-to
---

# Remove elements, attributes, and nodes from an XML tree (LINQ to XML)

You can modify an XML tree, removing elements, attributes, and other types of nodes.

Removing a single element or a single attribute from an XML document is straightforward. However, when removing collections of elements or attributes, you should first materialize a collection into a list, and then delete the elements or attributes from the list. The best approach is to use the [System.Xml.Linq.Extensions.Remove*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.Extensions.Remove*) extension method to do this.

The main reason to use this approach is that most of the collections you retrieve from an XML tree are yielded using deferred execution. If you don't first materialize them into a list, or if you don't use the extension methods, you may encounter a certain class of bugs. For more information, see [Mixed declarative/imperative code bugs](mixed-declarative-imperative-code-bugs.md).

The following methods remove nodes and attributes from an XML tree.

| Method | Description |
| --- | --- |
| [System.Xml.Linq.XAttribute.Remove*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XAttribute.Remove*) | Remove an [System.Xml.Linq.XAttribute](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XAttribute) from its parent. |
| [System.Xml.Linq.XContainer.RemoveNodes*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XContainer.RemoveNodes*) | Remove the child nodes from an [System.Xml.Linq.XContainer](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XContainer). |
| [System.Xml.Linq.XElement.RemoveAll*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement.RemoveAll*) | Remove content and attributes from an [System.Xml.Linq.XElement](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement). |
| [System.Xml.Linq.XElement.RemoveAttributes*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement.RemoveAttributes*) | Remove the attributes of an [System.Xml.Linq.XElement](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement). |
| [System.Xml.Linq.XElement.SetAttributeValue*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement.SetAttributeValue*) | Remove the attribute if you pass the value `null`. |
| [System.Xml.Linq.XElement.SetElementValue*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XElement.SetElementValue*) | Remove the child element if you pass the value `null`. |
| [System.Xml.Linq.XNode.Remove*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XNode.Remove*) | Remove an [System.Xml.Linq.XNode](https://learn.microsoft.com/search/?terms=System.Xml.Linq.XNode) from its parent. |
| [System.Xml.Linq.Extensions.Remove*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.Extensions.Remove*) | Remove every attribute or element in the source collection from its parent element. |

## Example: Remove a single element, and remove a collection of elements in two ways

This example demonstrates three approaches to removing elements. First, it removes a single element. Second, it retrieves a collection of elements, materializes them using the [System.Linq.Enumerable.ToList*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToList*) operator, and then removes the collection. Finally, it retrieves a collection of elements and removes them using the [System.Xml.Linq.Extensions.Remove*](https://learn.microsoft.com/search/?terms=System.Xml.Linq.Extensions.Remove*) extension method.

For more information on the [System.Linq.Enumerable.ToList*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToList*) operator, see [Converting Data Types (C#)](../../csharp/linq/standard-query-operators/converting-data-types.md) and [Converting Data Types (Visual Basic)](../../visual-basic/programming-guide/concepts/linq/converting-data-types.md).

```csharp
XElement root = XElement.Parse(@"<Root>
    <Child1>
        <GrandChild1/>
        <GrandChild2/>
        <GrandChild3/>
    </Child1>
    <Child2>
        <GrandChild4/>
        <GrandChild5/>
        <GrandChild6/>
    </Child2>
    <Child3>
        <GrandChild7/>
        <GrandChild8/>
        <GrandChild9/>
    </Child3>
</Root>");
root.Element("Child1").Element("GrandChild1").Remove();
root.Element("Child2").Elements().ToList().Remove();
root.Element("Child3").Elements().Remove();
Console.WriteLine(root);
```

```vb
Dim root As XElement = _
    <Root>
        <Child1>
            <GrandChild1/>
            <GrandChild2/>
            <GrandChild3/>
        </Child1>
        <Child2>
            <GrandChild4/>
            <GrandChild5/>
            <GrandChild6/>
        </Child2>
        <Child3>
            <GrandChild7/>
            <GrandChild8/>
            <GrandChild9/>
        </Child3>
    </Root>
root.<Child1>.<GrandChild1>.Remove()
root.<Child2>.Elements().ToList().Remove()
root.<Child3>.Elements().Remove()
Console.WriteLine(root)
```

This example produces the following output:

```xml
<Root>
  <Child1>
    <GrandChild2 />
    <GrandChild3 />
  </Child1>
  <Child2 />
  <Child3 />
</Root>
```

The first grandchild element was removed from `Child1`, and all grandchildren elements were removed from `Child2` and from `Child3`.
