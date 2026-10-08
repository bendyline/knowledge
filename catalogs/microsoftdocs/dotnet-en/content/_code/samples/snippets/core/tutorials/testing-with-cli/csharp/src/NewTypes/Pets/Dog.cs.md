# Source code: samples/snippets/core/tutorials/testing-with-cli/csharp/src/NewTypes/Pets/Dog.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace Pets
{
    public class Dog : IPet
    {
        public string TalkToOwner() => "Woof!";
    }
}

```
