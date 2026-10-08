# Source code: uwp/dotnet-native/code/compat3.cs

Complete source file; linked examples may select a region or line range.

```
// <Snippet10>
using System;

public class InnerType{}

public class X
{
   public InnerType instance { get; set; }
}

public class Y : X {}
// </Snippet10>

```
