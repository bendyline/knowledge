# Source code: samples/snippets/csharp/VS_Snippets_CLR_System/system.threading.tasks.parallel/cs/parallelintro.cs

Complete source file; linked examples may select a region or line range.

```
    //<snippet07>
    using System.Threading.Tasks;
    class Test
    {
        static int N = 1000;

        static void TestMethod()
        {
            // Using a named method.
            Parallel.For(0, N, Method2);

            // Using an anonymous method.
            Parallel.For(0, N, delegate(int i)
            {
                // Do Work.
            });

            // Using a lambda expression.
            Parallel.For(0, N, i =>
            {
                // Do Work.
            });
        }

        static void Method2(int i)
        {
            // Do work.
        }
    }
    //</snippet07>

    namespace LSDemo
    {
        //<snippet08>
        using System;
        using System.Threading.Tasks;

        class Demo
        {
            int N = 1000;

            void TestMethod()
            {
                Parallel.For(0, N, (i, loopState) =>
                {
                    Console.WriteLine(i);
                    if (i == 100)
                    {
                        loopState.Break();
                    }
                });
            }
        }
        //</snippet08>
    }

```
