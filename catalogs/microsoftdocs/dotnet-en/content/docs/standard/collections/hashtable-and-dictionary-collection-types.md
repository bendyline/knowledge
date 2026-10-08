---
description: "Learn more about: Hashtable and Dictionary Collection Types"
title: "Hashtable and Dictionary Collection Types"
ms.date: "03/30/2017"
\helpviewer_keywords:
  - "Hashtable class, grouping data in collections"
  - "Hashtable collection type"
  - "hash tables"
  - "grouping data in collections, Hashtable collection type"
  - "hash function"
  - "collections [.NET], Hashtable collection type"
ms.assetid: bfc20837-3d02-4fc7-8a8f-c5215b6b7913
---
# Hashtable and Dictionary Collection Types

The [System.Collections.Hashtable](https://learn.microsoft.com/search/?terms=System.Collections.Hashtable) class, and the [System.Collections.Generic.Dictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602) and [System.Collections.Concurrent.ConcurrentDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentDictionary%602) generic classes, implement the [System.Collections.IDictionary](https://learn.microsoft.com/search/?terms=System.Collections.IDictionary) interface. The [System.Collections.Generic.Dictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602) generic class also implements the [System.Collections.Generic.IDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IDictionary%602) generic interface. Therefore, each element in these collections is a key-and-value pair.

 A [System.Collections.Hashtable](https://learn.microsoft.com/search/?terms=System.Collections.Hashtable) object consists of buckets that contain the elements of the collection. A bucket is a virtual subgroup of elements within the [System.Collections.Hashtable](https://learn.microsoft.com/search/?terms=System.Collections.Hashtable), which makes searching and retrieving easier and faster than in most collections. Each bucket is associated with a hash code, which is generated using a hash function and is based on the key of the element.

 The generic [System.Collections.Generic.HashSet`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.HashSet%601) class is an unordered collection for containing unique elements.

 A hash function is an algorithm that returns a numeric hash code based on a key. The key is the value of some property of the object being stored. A hash function must always return the same hash code for the same key. It is possible for a hash function to generate the same hash code for two different keys, but a hash function that generates a unique hash code for each unique key results in better performance when retrieving elements from the hash table.

 Each object that is used as an element in a [System.Collections.Hashtable](https://learn.microsoft.com/search/?terms=System.Collections.Hashtable) must be able to generate a hash code for itself by using an implementation of the [System.Object.GetHashCode*](https://learn.microsoft.com/search/?terms=System.Object.GetHashCode*) method. However, you can also specify a hash function for all elements in a [System.Collections.Hashtable](https://learn.microsoft.com/search/?terms=System.Collections.Hashtable) by using a [System.Collections.Hashtable](https://learn.microsoft.com/search/?terms=System.Collections.Hashtable) constructor that accepts an [System.Collections.IHashCodeProvider](https://learn.microsoft.com/search/?terms=System.Collections.IHashCodeProvider) implementation as one of its parameters.

 When an object is added to a [System.Collections.Hashtable](https://learn.microsoft.com/search/?terms=System.Collections.Hashtable), it is stored in the bucket that is associated with the hash code that matches the object's hash code. When a value is being searched for in the [System.Collections.Hashtable](https://learn.microsoft.com/search/?terms=System.Collections.Hashtable), the hash code is generated for that value, and the bucket associated with that hash code is searched.

 For example, a hash function for a string might take the ASCII codes of each character in the string and add them together to generate a hash code. The string "picnic" would have a hash code that is different from the hash code for the string "basket"; therefore, the strings "picnic" and "basket" would be in different buckets. In contrast, "stressed" and "desserts" would have the same hash code and would be in the same bucket.

 The [System.Collections.Generic.Dictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602) and [System.Collections.Concurrent.ConcurrentDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentDictionary%602) classes have the same functionality as the [System.Collections.Hashtable](https://learn.microsoft.com/search/?terms=System.Collections.Hashtable) class. A [System.Collections.Generic.Dictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602) of a specific type (other than [System.Object](https://learn.microsoft.com/search/?terms=System.Object)) provides better performance than a [System.Collections.Hashtable](https://learn.microsoft.com/search/?terms=System.Collections.Hashtable) for value types. This is because the elements of [System.Collections.Hashtable](https://learn.microsoft.com/search/?terms=System.Collections.Hashtable) are of type [System.Object](https://learn.microsoft.com/search/?terms=System.Object); therefore, boxing and unboxing typically occur when you store or retrieve a value type. The [System.Collections.Concurrent.ConcurrentDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentDictionary%602) class should be used when multiple threads might be accessing the collection simultaneously.

## See also

- [System.Collections.Hashtable](https://learn.microsoft.com/search/?terms=System.Collections.Hashtable)
- [System.Collections.IDictionary](https://learn.microsoft.com/search/?terms=System.Collections.IDictionary)
- [System.Collections.IHashCodeProvider](https://learn.microsoft.com/search/?terms=System.Collections.IHashCodeProvider)
- [System.Collections.Generic.Dictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602)
- [System.Collections.Generic.IDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IDictionary%602)
- [System.Collections.Concurrent.ConcurrentDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentDictionary%602)
- [Commonly Used Collection Types](commonly-used-collection-types.md)
