---
author: ggailey777
ms.service: azure-functions
ms.topic: include
ms.date: 03/18/2020
ms.author: glenga
---

Because the archetype also creates a set of tests, you need to update these tests to handle the new `msg` parameter in the `run` method signature.  

Browse to the location of your test code under _src/test/java_, open the *Function.java* project file, and replace the line of code under `//Invoke` with the following code.

[Code reference unavailable in this source snapshot: ~/functions-quickstart-java/functions-add-output-binding-storage-queue/src/test/java/com/function/FunctionTest.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/functions-add-output-binding-java-test.md)
