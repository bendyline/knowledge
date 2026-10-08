# Source code: samples/snippets/core/tutorials/testing-with-cli/csharp/src/NewTypes/Program.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using Pets;
using System.Collections.Generic;

namespace ConsoleApplication
{
    public class Program
    {
        public static void Main(string[] args)
        {
            List<IPet> pets = new List<IPet>
            {
                new Dog(),
                new Cat()
            };

            foreach (var pet in pets)
            {
                Console.WriteLine(pet.TalkToOwner());
            }
        }
    }
}

```
