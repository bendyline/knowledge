---
title: Perform culture-insensitive string operations in collections
description: Learn how to perform culture-insensitive string operations in collections.
ms.date: 03/13/2023
dev_langs:
    - "csharp"
    - "vb"
helpviewer_keywords:
    - "CaseInsensitiveComparer class, using"
    - "CollectionsUtil.CreateCaseInsensitiveHashtable method"
    - "culture-insensitive string operations, collections"
    - "collections [.NET], culture-insensitive string operations"
    - "CaseInsensitiveHashCodeProvider class, using"
    - "ArrayList.Sort method"
    - "SortedList class, culture-insensitive string operations"
    - "culture parameter"
ms.assetid: 5cdc9396-a64b-4615-a1cd-b605db4c5983
---

# Perform culture-insensitive string operations in collections

There are classes and members in the [System.Collections](https://learn.microsoft.com/search/?terms=System.Collections) namespace that provide culture-sensitive behavior by default. The parameterless constructors for the [System.Collections.CaseInsensitiveComparer](https://learn.microsoft.com/search/?terms=System.Collections.CaseInsensitiveComparer) and [System.Collections.CaseInsensitiveHashCodeProvider](https://learn.microsoft.com/search/?terms=System.Collections.CaseInsensitiveHashCodeProvider) classes initialize a new instance using the [System.Threading.Thread.CurrentCulture](https://learn.microsoft.com/search/?terms=System.Threading.Thread.CurrentCulture) property. All overloads of the [System.Collections.Specialized.CollectionsUtil.CreateCaseInsensitiveHashtable*](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.CollectionsUtil.CreateCaseInsensitiveHashtable*) method create a new instance of the [System.Collections.Hashtable](https://learn.microsoft.com/search/?terms=System.Collections.Hashtable) class using the `Thread.CurrentCulture` property by default. Overloads of the [System.Collections.ArrayList.Sort*](https://learn.microsoft.com/search/?terms=System.Collections.ArrayList.Sort*) method perform culture-sensitive sorts by default using `Thread.CurrentCulture`. Sorting and lookup in a [System.Collections.SortedList](https://learn.microsoft.com/search/?terms=System.Collections.SortedList) can be affected by `Thread.CurrentCulture` when strings are used as the keys. Follow the usage recommendations provided in this section to obtain culture-insensitive results from these classes and methods in the `Collections` namespace.

> **Note:**
> Passing [System.Globalization.CultureInfo.InvariantCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.InvariantCulture) to a comparison method does perform a culture-insensitive comparison. However, it does not cause a non-linguistic comparison, for example, for file paths, registry keys, and environment variables. Neither does it support security decisions based on the comparison result. For a non-linguistic comparison or support for result-based security decisions, the application should use a comparison method that accepts a [System.StringComparison](https://learn.microsoft.com/search/?terms=System.StringComparison) value. The application should then pass [System.StringComparison](https://learn.microsoft.com/search/?terms=System.StringComparison).

## Use the `CaseInsensitiveComparer` and `CaseInsensitiveHashCodeProvider` classes

The parameterless constructors for `CaseInsensitiveHashCodeProvider` and `CaseInsensitiveComparer` initialize a new instance of the class using the `Thread.CurrentCulture`, resulting in culture-sensitive behavior. The following code example demonstrates the constructor for a `Hashtable` that is culture-sensitive because it uses the parameterless constructors for `CaseInsensitiveHashCodeProvider` and `CaseInsensitiveComparer`.

```vb
internalHashtable = New Hashtable(CaseInsensitiveHashCodeProvider.Default, CaseInsensitiveComparer.Default)
```

```csharp
internalHashtable = new Hashtable(CaseInsensitiveHashCodeProvider.Default, CaseInsensitiveComparer.Default);
```

If you want to create a culture-insensitive `Hashtable` using the `CaseInsensitiveComparer` and `CaseInsensitiveHashCodeProvider` classes, initialize new instances of these classes using the constructors that accept a `culture` parameter. For the `culture` parameter, specify [System.Globalization.CultureInfo.InvariantCulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.InvariantCulture). The following code example demonstrates the constructor for a culture-insensitive `Hashtable`.

```vb
internalHashtable = New Hashtable(New
    CaseInsensitiveHashCodeProvider(CultureInfo.InvariantCulture),
    New CaseInsensitiveComparer(CultureInfo.InvariantCulture))
```

```csharp
internalHashtable = new Hashtable(new CaseInsensitiveHashCodeProvider
    (CultureInfo.InvariantCulture),
    new CaseInsensitiveComparer(CultureInfo.InvariantCulture));
```

## Use the `CollectionsUtil.CreateCaseInsensitiveHashTable` method

The `CollectionsUtil.CreateCaseInsensitiveHashTable` method is a useful shortcut for creating a new instance of the `Hashtable` class that ignores the case of strings. However, all overloads of the `CollectionsUtil.CreateCaseInsensitiveHashTable` method are culture-sensitive because they use the `Thread.CurrentCulture` property. You cannot create a culture-insensitive `Hashtable` using this method. To create a culture-insensitive `Hashtable`, use the `Hashtable` constructor that accepts a `culture` parameter. For the `culture` parameter, specify `CultureInfo.InvariantCulture`. The following code example demonstrates the constructor for a culture-insensitive `Hashtable`.

```vb
internalHashtable = New Hashtable(New
    CaseInsensitiveHashCodeProvider(CultureInfo.InvariantCulture),
    New CaseInsensitiveComparer(CultureInfo.InvariantCulture))
```

```csharp
internalHashtable = new Hashtable(new CaseInsensitiveHashCodeProvider
    (CultureInfo.InvariantCulture),
    new CaseInsensitiveComparer(CultureInfo.InvariantCulture));
```

<a name="cpconperformingculture-insensitivestringoperationsincollectionsanchor1"></a>

## Use the `SortedList` class

A `SortedList` represents a collection of key-and-value pairs that are sorted by the keys and are accessible by key and by index. When you use a `SortedList` where strings are the keys, the sorting and lookup can be affected by the `Thread.CurrentCulture` property. To obtain culture-insensitive behavior from a `SortedList`, create a `SortedList` using one of the constructors that accepts a `comparer` parameter. The `comparer` parameter specifies the [System.Collections.IComparer](https://learn.microsoft.com/search/?terms=System.Collections.IComparer) implementation to use when comparing keys. For the parameter, specify a custom comparer class that uses `CultureInfo.InvariantCulture` to compare keys. The following example illustrates a custom culture-insensitive comparer class that you can specify as the `comparer` parameter to a `SortedList` constructor.

```vb
Imports System.Collections
Imports System.Globalization

Friend Class InvariantComparer
    Implements IComparer
    Private m_compareInfo As CompareInfo
    Friend Shared [Default] As New InvariantComparer()

    Friend Sub New()
        m_compareInfo = CultureInfo.InvariantCulture.CompareInfo
    End Sub

    Public Function Compare(a As Object, b As Object) As Integer _
            Implements IComparer.Compare
        Dim sa As String = CType(a, String)
        Dim sb As String = CType(b, String)
        If Not (sa Is Nothing) And Not (sb Is Nothing) Then
            Return m_compareInfo.Compare(sa, sb)
        Else
            Return Comparer.Default.Compare(a, b)
        End If
    End Function
End Class
```

```csharp
using System;
using System.Collections;
using System.Globalization;

internal class InvariantComparer : IComparer
{
    private CompareInfo _compareInfo;
    internal static readonly InvariantComparer Default = new
        InvariantComparer();

    internal InvariantComparer()
    {
        _compareInfo = CultureInfo.InvariantCulture.CompareInfo;
    }

    public int Compare(Object a, Object b)
    {
        if (a is string sa && b is string sb)
            return _compareInfo.Compare(sa, sb);
        else
            return Comparer.Default.Compare(a,b);
    }
}
```

In general, if you use a `SortedList` on strings without specifying a custom invariant comparer, a change to `Thread.CurrentCulture` after the list has been populated can invalidate the list.

## Use the `ArrayList.Sort` method

Overloads of the `ArrayList.Sort` method perform culture-sensitive sorts by default using the `Thread.CurrentCulture` property. Results can vary by culture due to different sort orders. To eliminate culture-sensitive behavior, use the overloads of this method that accept an `IComparer` implementation. For the `comparer` parameter, specify a custom invariant comparer class that uses `CultureInfo.InvariantCulture`. An example of a custom invariant comparer class is provided in the [Using the SortedList Class](#cpconperformingculture-insensitivestringoperationsincollectionsanchor1) topic.

## See also

- [System.Collections.CaseInsensitiveComparer](https://learn.microsoft.com/search/?terms=System.Collections.CaseInsensitiveComparer)
- [System.Collections.CaseInsensitiveHashCodeProvider](https://learn.microsoft.com/search/?terms=System.Collections.CaseInsensitiveHashCodeProvider)
- [System.Collections.ArrayList.Sort*](https://learn.microsoft.com/search/?terms=System.Collections.ArrayList.Sort*)
- [System.Collections.SortedList](https://learn.microsoft.com/search/?terms=System.Collections.SortedList)
- [System.Collections.Hashtable](https://learn.microsoft.com/search/?terms=System.Collections.Hashtable)
- [System.Collections.IComparer](https://learn.microsoft.com/search/?terms=System.Collections.IComparer)
- [Perform culture-insensitive string operations](performing-culture-insensitive-string-operations.md)
- [System.Collections.Specialized.CollectionsUtil.CreateCaseInsensitiveHashtable*](https://learn.microsoft.com/search/?terms=System.Collections.Specialized.CollectionsUtil.CreateCaseInsensitiveHashtable*)
