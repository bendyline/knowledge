---
description: An overview of common page patterns and UI elements for displaying content in your Windows app.
title: Content layout and spacing
ms.assetid: 3102530A-E0D1-4C55-AEFF-99443D39D567
label: Content design basics
template: detail.hbs
op-migration-status: ready
ms.date: 09/24/2020
ms.topic: article
keywords: windows 10, uwp
ms.localizationpriority: medium
---
# Content layout and spacing

This article provides some practical tips and examples to help you design the content of your app: Windows spacing rationale, using the type ramp to demonstrate hierarchy, lists and grids, and how to group controls.

## Spacing and gutters

The use of consistently sized spacing and gutters semantically groups an experience into separate components. These values map to our rounded corner logic and together help create a cohesive and usable layout.



Two buttons separated by 8 pixels.


**8epx** between buttons





A button and a flyout separated by 8 pixels.


**8epx** between buttons and flyouts





A control and a header separated by 8 pixels.


**8epx** between control and header





A Control and a label separated by 12 pixels


**12epx** between control and label





Two content areas separated by 12 pixels.


**12epx** between content areas





A surface containing text with 12 pixel gutters on both sides.


**16epx** between surface and edge text



## Text + hierarchy

Our type ramp (link) is designed to provide an array of sizes that can help communicate hierarchy within an app.  



An example of text using title, subtitle, and body styles when there is adequate space.


Using Title, Subtitle and Body with 12epx spacing.





An example of using Body Strong instead of Title in a confined space.


When differentiating a title in a confined UI space, use Body Strong for the title without any additional spacing between text blocks.





An example of using the Caption style in a confined space.


Use caption size for very confined spaces where text is needed, such as command buttons.



## Lists and grids

There are a variety of list and grid styles that can be created. Below are a variety of compositions used in Windows.



An example list with multi-element list items.


For multi-line lists, use Body and Caption from the type ramp, and 32epx icons.<br><br>Use Body Strong for section headers.





An example of horizontal lists.


When using icons or person picture elements for grid items, use Caption text that is center-aligned.





An example list containing large list items.


 Use Body style for primary text and left-align to the image if your list contains large graphical elements with text.



## Using controls

Some examples of how controls can relate to each other in common configurations.



An example of an expander with child controls.


Examples showing how to use an expander control (link) with list styles and common controls. Controls should be right-aligned with 16epx between the control and expander button.





An example how controls inside an expander are aligned.


This example shows controls alignment when placed inside the expander. Indent the controls 48epx.
