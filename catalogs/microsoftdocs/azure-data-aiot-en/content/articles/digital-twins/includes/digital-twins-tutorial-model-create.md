---
author: baanders
description: include file for Azure Digital Twins - model instructions for command line tutorial
ms.topic: include
ms.date: 3/5/2021
ms.author: baanders
---

1. Update the version number, to indicate that you are providing a more-updated version of this model. Do this by changing the *1* at the end of the `@id` value to a *2*. Any number greater than the current version number will also work.
1. Edit a property. Change the name of the `Humidity` property to *HumidityLevel* (or something different if you want. If you use something different than *HumidityLevel*, remember what you used and continue using that instead of *HumidityLevel* throughout the tutorial).
1. Add a property. Underneath the `HumidityLevel` property that ends on line 15, paste the following code to add a `RoomName` property to the room:

    [Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/models/Room.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/includes/digital-twins-tutorial-model-create.md)

1. Add a relationship. Underneath the `RoomName` property that you just added, paste the following code to add the ability for this type of twin to form `contains` relationships with other twins:

    [Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/models/Room.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/includes/digital-twins-tutorial-model-create.md)

When you are finished, the updated model should match this:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/models/Room.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/includes/digital-twins-tutorial-model-create.md)

Make sure to save the file before moving on.
