# Source code: samples/snippets/csharp/VS_Snippets_Data/DP ObjectServices Concepts/CS/Program.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Data.Common;
using System.Data.Objects;
using System.Data.Objects.DataClasses;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;
using System.IO;
using System.Xml.Serialization;
using System.Data.Common.CommandTrees;
using System.Data.Metadata.Edm;
using System.Data.EntityClient;
using System.ComponentModel;
using System.Data.SqlClient;

namespace ObjectServicesConceptsCS
{
    class Program
    {
        static void Main(string[] args)
        {
            Source.ObjectQueryTablePerType();
        }
    }
}

```
