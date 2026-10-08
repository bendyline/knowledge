---
description: Navigation in Windows apps is based on a flexible model of navigation structures, navigation elements, and system-level features.
title: Navigation basics for Windows apps
ms.assetid: B65D33BA-AAFE-434D-B6D5-1A0C49F59664
label: Navigation design basics
template: detail.hbs
op-migration-status: ready
ms.date: 04/03/2025
ms.topic: article
keywords: windows 10, uwp
ms.localizationpriority: medium
ms.custom: RS5
---
# Navigation design basics for Windows apps

Navigation basics header

If you think of an app as a collection of pages, *navigation* describes the act of moving between pages and within a page. It's the starting point of the user experience, and it's how users find the content and features they're interested in. It's very important, and it can be difficult to get right.

You have a huge number of choices to make for navigation. You could:



navigation example 1
Require users to go through a series of pages in order.


navigation example 2
Provide a menu that allows users to jump directly to any page.


navigation example 3
Place everything on a single page and provide filtering mechanisms for viewing content.



While there's no single navigation design that works for every app, there are principles and guidelines to help you decide the right design for your app.

## Principles of good navigation

Let's start with the basic principles of good navigation design:

- **Consistency:** Meet user expectations.
- **Simplicity:** Don't do more than you need to.
- **Clarity:** Provide clear paths and options.

### Consistency

Navigation should be consistent with user expectations. Using [standard controls](#use-the-right-controls) that users are familiar with and following standard conventions for icons, location, and styling will make navigation predictable and intuitive for users.

page components image

> *Users expect to find certain UI elements in standard locations.*

### Simplicity

Fewer navigation items simplify decision making for users. Providing easy access to important destinations and hiding less important items will help users get where they want, faster.



First screenshot of a green bar that has a green check mark and the word Do in it.

navview good

Present navigation items in a familiar navigation menu.


don't example

navview bad

Don't overwhelm users with many navigation options.



### Clarity

Clear paths allow for logical navigation for users. Making navigation options obvious and clarifying relationships between pages should prevent users from getting lost.

Screenshot of a mock-up of an application showing clear paths for navigation for a user.

> *Destinations are clearly labeled so users know where they are.*

## General recommendations

Now, let's take our design principles--consistency, simplicity, and clarity--and use them to come up with some general recommendations.

- Think about your users. Trace out typical paths they might take through your app, and for each page, think about why the user is there and where they might want to go.
- Avoid deep navigation hierarchies. If you go beyond two levels of navigation, provide a [breadcrumb bar](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/design/controls/breadcrumbbar.md) that shows the user where they are and lets them quickly get back out. Otherwise, you risk stranding your user in a deep hierarchy that they will have difficulty leaving.
- Avoid "pogo-sticking." Pogo-sticking occurs when there is related content, but navigating to it requires the user to go up a level and then down again.

## Use the right structure

Now that you're familiar with general navigation principles, how should you structure your app? There are two general structures: flat and hierarchal.



Pages arranged in a flat structure


### Flat/lateral

In a flat/lateral structure, pages exist side-by-side. You can go from one page to another in any order.

We recommend using a flat structure when:

- The pages can be viewed in any order.
- The pages are clearly distinct from each other and don't have an obvious parent/child relationship.
- There are less than 8 pages in the group. <br>
(When there are more pages, it might be difficult for users to understand how the pages are unique or to understand their current location within the group. If you don't think that's an issue for your app, go ahead and make the pages peers. Otherwise, consider using a hierarchical structure to break the pages into two or more smaller groups.)






Pages arranged in a hierarchy


### Hierarchical

In a hierarchical structure, pages are organized into a tree-like structure. Each child page has one parent, but a parent can have one or more child pages. To reach a child page, you travel through the parent.

Hierarchical structures are good for organizing complex content that spans lots of pages. The downside is some navigation overhead: the deeper the structure, the more clicks it takes to get from page to page.

We recommend a hierarchical structure when:

- Pages should be traversed in a specific order.
- There is a clear parent-child relationship between pages.
- There are more than 7 pages in the group.






an app with a hybrid structure


### Combining structures

You don't have to choose one structure or the other; many well-designed apps use both. An app can use flat structures for top-level pages that can be viewed in any order, and hierarchical structures for pages that have more complex relationships.

If your navigation structure has multiple levels, we recommend that peer-to-peer navigation elements only link to the peers within their current subtree. Consider the adjacent illustration, which shows a navigation structure that has two levels:

- At level 1, the peer-to-peer navigation element should provide access to pages A, B, and C.
- At level 2, the peer-to-peer navigation elements for the A2 pages should only link to the other A2 pages. They should not link to level 2 pages in the C subtree.



## Use the right controls

Once you've decided on a page structure, you need to decide how users navigate through those pages. XAML provides a variety of navigation controls to help ensure a consistent, reliable navigation experience in your app.



Frame image


[**Frame**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.frame)

With few exceptions, any app that has multiple pages uses a frame. Typically, an app has a main page that contains the frame and a primary navigation element, such as a navigation view control. When the user selects a page, the frame loads and displays it.





tabs and pivot image


[**Top navigation**](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/design/controls/navigationview.md)

Displays a horizontal list of links to pages at the same level. The [NavigationView](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/design/controls/navigationview.md) control implements the top navigation pattern.

Use top navigation when:

- You want to show all navigation options on the screen.
- You desire more space for your app's content.
- Icons cannot clearly describe your navigation categories.





tabs and pivot image


[**Tabs**](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/design/controls/tab-view.md)

Displays a horizontal set of tabs and their respective content. The [TabView](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/design/controls/tab-view.md) control is useful for displaying several pages (or documents) while giving the user the capability to rearrange, open, or close tabs.

Use tabs when:

- You want users to be able to dynamically open, close, or rearrange tabs.
- You expect that there might be a large number of tabs open at once.
- You expect users to be able to easily move tabs between windows in your application that use tabs, similar to web browsers like Microsoft Edge.





tabs and pivot image


[**Breadcrumb**](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/design/controls/breadcrumbbar.md)

Displays a horizontal list of links to pages at each of the higher levels. The [BreadcrumbBar](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/design/controls/breadcrumbbar.md) control implements the breadcrumb navigation pattern.

Use a breadcrumb when:

- You want to show the path to the current location
- You have many levels of navigation
- You expect users to be able to return to any previous level






navview image


[**Left navigation**](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/design/controls/navigationview.md)

Displays a vertical list of links to top-level pages. Use when:

- The pages exist at the top level.
- There are many navigation items (more than 5)
- You don't expect users to switch between pages frequently.




List details image


[**List/details**](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/design/controls/list-details.md)

Displays a list of items. Selecting an item displays its corresponding page in the details section. Use when:

- You expect users to switch between child items frequently.
- You want to enable the user to perform high-level operations, such as deleting or sorting, on individual items or groups of items, and also want to enable the user to view or update the details for each item.

List/details is well suited for email inboxes, contact lists, and data entry.





Hyperlinks and buttons image


[**Hyperlinks**](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/design/controls/hyperlinks.md)

Embedded navigation elements can appear in a page's content. Unlike other navigation elements, which should be consistent across the pages, content-embedded navigation elements are unique from page to page.



## Guidelines for custom back navigation behavior

If you choose to provide your own back stack navigation, the experience should be consistent with other apps. We recommend that you follow the following patterns for navigation actions:

<div class="mx-responsive-img">
<table>
<thead>
<tr class="header">
<th align="left">Navigation action</th>
<th align="left">Add to navigation history?</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Page to page, different peer groups</strong></td>
<td><strong>Yes</strong>
<p>In this illustration, the user navigates from level 1 of the app to level 2, crossing peer groups, so the navigation is added to the navigation history.</p>
<p>Diagram of navigation across peer groups showing the user navigating from group one to group two and the back to group one.</p>
<p>In the next illustration, the user navigates between two peer groups at the same level, again crossing peer groups, so the navigation is added to the navigation history.</p>
<p>Diagram of navigation across peer groups showing the user navigating from group one to group two then on to group three and back to group two.</p></td>
</tr>
<tr class="even">
<td><strong>Page to page, same peer group, no on-screen navigation element</strong>
<p>The user navigates from one page to another with the same peer group. There is no on-screen navigation element (such as <a href="https://learn.microsoft.com/windows/apps/design/controls/navigationview">NavigationView</a>) that provides direct navigation to both pages.</p></td>
<td><strong>Yes</strong>
<p>In the following illustration, the user navigates between two pages in the same peer group, and the navigation should be added to the navigation history.</p>
<p>Navigation within a peer group</p></td>
</tr>
<tr class="odd">
<td><strong>Page to page, same peer group, with an on-screen navigation element</strong>
<p>The user navigates from one page to another in the same peer group. Both pages are shown in the same navigation element, such as <a href="https://learn.microsoft.com/windows/apps/design/controls/navigationview">NavigationView</a>.</p></td>
<td><strong>It depends</strong>
<p>Yes, add to the navigation history, with two notable exceptions. If you expect users of your app to switch between pages in the peer group frequently, or if you wish to preserve the navigational hierarchy, then do not add to the navigation history. In this case, when the user presses back, go back to the last page before the user navigated to the current peer group. </p>
<p>Navigation across peer groups when a navigation element is present</p></td>
</tr>
<tr class="even">
<td><strong>Show a transient UI</strong>
<p>The app displays a pop-up or child window, such as a dialog, splash screen, or on-screen keyboard, or the app enters a special mode, such as multiple selection mode.</p></td>
<td><strong>No</strong>
<p>When the user presses the back button, dismiss the transient UI (hide the on-screen keyboard, cancel the dialog, etc) and return to the page that spawned the transient UI.</p>
<p>Showing a transient UI</p></td>
</tr>
<tr class="odd">
<td><strong>Enumerate items</strong>
<p>The app displays content for an on-screen item, such as the details for the selected item in list/details list.</p></td>
<td><strong>No</strong>
<p>Enumerating items is similar to navigating within a peer group. When the user presses back, navigate to the page that preceded the current page that has the item enumeration.</p>
<p>Item enumeration</p></td>
</tr>
</tbody>
</table>
</div>

## Next: Add navigation code to your app

The next article, [Implement basic navigation](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/design/basics/navigate-between-two-pages.md), shows the code required to use a `Frame` control to enable basic navigation between two pages in your app.
