# Source code: samples/snippets/csharp/VS_Snippets_CLR/conceptual.localizability/cs/ismetric1.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Globalization;

public class Example
{
    public static void Main()
    {
        // <Snippet1>
        string[] cultureNames = { "en-US", "en-GB", "fr-FR",
                                "ne-NP", "es-BO", "ig-NG" };
        foreach (string cultureName in cultureNames)
        {
            RegionInfo region = new(cultureName);
            string usesMetric = region.IsMetric ? "uses" : "does not use";
            Console.WriteLine($"{region.EnglishName} {usesMetric} the metric system.");
        }

        // The example displays the following output:
        //       United States does not use the metric system.
        //       United Kingdom uses the metric system.
        //       France uses the metric system.
        //       Nepal uses the metric system.
        //       Bolivia uses the metric system.
        //       Nigeria uses the metric system.
        // </Snippet1>
    }
}

```
