# WEB102 Prework - _Sea Monster Crowdfunding_

Submitted by: **Ailsa Wu**

**Sea Monster Crowdfunding** is a website for the company Sea Monster Crowdfunding that displays information about the games they have funded.

Time spent: **12** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] The introduction section explains the background of the company and how many games remain unfunded.
- [x] The Stats section includes information about the total contributions and dollars raised as well as the top two most funded games.
- [x] The Our Games section initially displays all games funded by Sea Monster Crowdfunding
- [x] The Our Games section has three buttons that allow the user to display only unfunded games, only funded games, or all games.

The following **optional** features are implemented:

- [x] Added a navigation bar that includes:
  - [x] A search bar to filter games by title.
  - [x] Shortcuts to jump to the following sections:
    - "Sea Monster Crowdfunding"
    - "Welcome"
    - "Stats"
    - "Our Games"
- [x] Enhanced buttons ("Show Unfunded Only," "Show Funded Only," "Show All Games") with:
  - [x] A hover effect that adds a glow around the button.
  - [x] A slight scaling animation to indicate interactivity and improve user feedback.

## Video Walkthrough

Here's a walkthrough of implemented features:

<img src='https://imgur.com/ThZucpf.gif' title='GIF Walkthrough' width='' alt='GIF Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->

GIF created with LiceCap

<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

### Challenges Encountered

1. **Refreshing DOM Manipulation Techniques**

   - I had to revisit my understanding of DOM functions, particularly `getElementById` and other methods for manipulating the DOM. Revisiting these basics was a helpful reminder of their importance in creating interactive web applications.

2. **Understanding Arrow Functions and Implicit/Explicit Returns**

   - I encountered some confusion when using arrow functions, especially distinguishing between implicit and explicit returns. For example:
     ```javascript
     const totalContributions = GAMES_JSON.reduce(
       (total, game) => total + game.backers,
       0
     );
     ```
     - This is an implicit return because the result of the expression is returned directly without using curly braces (`{}`) or the `return` keyword. Revisiting this concept improved the readability and efficiency of my code.

3. **Resolving Navbar Overlap with Padding and Margins**

   - Initially, my fixed navigation bar overlapped my header sections, obscuring important content. To resolve this, I adjusted the padding and margins for my sections as follows:

     ```css
     #the-start {
       padding-top: 80px;
       margin-top: -60px;
     }

     #welcome,
     #stats,
     #our-games {
       padding-top: 60px;
       margin-top: -30px;
     }
     ```

   - This adjustment ensured that my header content remained visible and aligned properly. Balancing visual design with usability was a key learning experience.

## License

    Copyright 2024 Ailsa Wu

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
