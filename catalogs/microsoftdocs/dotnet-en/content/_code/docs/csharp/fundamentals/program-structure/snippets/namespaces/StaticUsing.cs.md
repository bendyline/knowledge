# Source code: docs/csharp/fundamentals/program-structure/snippets/namespaces/StaticUsing.cs

Complete source file; linked examples may select a region or line range.

```
// <StaticUsing>
using static System.Math;

namespace MyApp.Utilities;

class CircleCalculator
{
    public static double CalculateArea(double radius) => PI * Pow(radius, 2);

    public static double CalculateCircumference(double radius) => 2 * PI * radius;
}
// </StaticUsing>

```
