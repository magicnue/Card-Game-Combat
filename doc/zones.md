Title: zones \[Card Game Combat - Documentation\]

Keywords: zones   

zones

### Table of Contents

*   Zones Overview

*   Hand

*   Deck

*   Discard

*   Zone Parameters

*   Temp Zone

Zones Overview
==============

This page covers the new UI Elements that are added to the Battle Screen by MYTH\_CGC\_CoreEngine.

A Zone is a place that cards can move to/from during combat. There are 3 default Zones that all projects must have. There is overlap in their behavior, but each one works slightly differently.

1.  Hand

2.  Deck

3.  Discard

Beyond those three, you can add extra Zones through plugin parameters. Note that all Zones use the same parameter structure with the exception of the Hand.

Hand
----

This is the fan of Cards the active Actor has access to. The player can play any Card in the Hand as long as they meet all the necessary requirements.

The Hand behaves differently from every other Zone in that the Cards are spread out so the player can see them all at once. The parameters for the Hand are as follows:

| **Hand Size and Shape** |
| --- |
| **Center Coordinates** | A set of X/Y values that set the center of the hand. Recommend placing this in the center of RPGM's window width and at the bottom of the screen. |
| **Max Hand Width** | The max horizontal space the hand can take up. |
| **Min Card Separation W** | The minimum space in pixels between cards until the max width would otherwise be reached. |
| **Card Rotation Multiplier** | Cards will rotate the farther they are from the hand. This adds a multiplier to that amount to increase or decrease that rotation. |
| **Card Height Multiplier** | Card height changes depending on their distance from the center of the hand. This adds a multiplier to that amount to increase or decrease that height. |
| **Card Appearance** |
| **Card Scale** | The scale cards will become as they move to this zone. |
| **Selected Card Scale** | The scale of the currently selected card. |
| **Selected Card Y Offset** | The number of pixels the currently selected card will raise above the rest of the hand |
| **Targeting Card Offset** | The X/Y Offset of the Card chosen while targeting enemies. Y axis is flipped to match other Hand parameters. |
| **Move Card to Target?** | If true, the card will move to the enemy's X coordinate when targeting. If false, it will stay where it is in the hand. |
| **Discarding Card Y Offset** | The number of pixels a card will be raised if it is chosen to be discarded. |
| **Inactive Hand Y Offset** | The number of pixels all cards will be lowered if the player cannot currently select cards. |
| **Hand Mechanics** |
| **Card Enter SFX** | The SE that will play when a Card enters the Hand. Leave blank for no SE. |
| **Card Enter SFX** | The SE that will play when a Card exits the Hand. Leave blank for no SE. |
| **Card Actions on Empty** | See Card Actions on Empty |

Deck
----

This is where all Cards are at the start of battle by default.

If using the Card Selection Window to view the contents of the Deck, the Cards that appear will be shuffled so that the player can't anticipate what they're going to draw next.

If the player uses the default parameter values for the Deck's Card Actions on Empty, then when the Deck is emptied all of the Cards from the Discard will be moved to the Deck, and then the Deck will be shuffled.

Discard
-------

This is where all Cards will travel to after being played by default.

Zone Parameters
---------------

All Zones except for the Hand use the following parameters:

<table><colgroup><col style="width: 30%"></colgroup><tbody><tr><td><strong>Name</strong></td><td colspan="2">The name of the Zone. Case insensitive. For the Deck and Discard, it is strongly discouraged to change this value.</td></tr><tr><td><strong>Image Sheet</strong></td><td colspan="2">The image sheet for the zone's appearance. This should be a single image file containing two images inside it. The left image should be how the Zone will appear normally. The right image should be how the Zone will appear while the player is highlighting it.</td></tr><tr><td><strong>Zone Coordinates</strong></td><td colspan="2">The X/Y coordinates of the Zone's image, and where all Cards will travel to on screen when they enter that Zone.</td></tr><tr><td><strong>Card Scale</strong></td><td colspan="2">The scale Cards will become as they move to this Zone. Set this to a value less than 1 if you want cards to shrink as they approach the Zone, and greater than 1 if you want them to grow.</td></tr><tr><td><strong>Skew</strong></td><td colspan="2">This parameter contains X/Y values that can be used together to simulate isometric 3D rotation. Like Scale, Cards will change their skew to match this value when they enter this Zone.</td></tr><tr><td><strong>Card Rotation</strong></td><td colspan="2">Card Rotation is measured in degrees between -360 and 360.</td></tr><tr><td><strong>Font Size</strong></td><td colspan="2">The font size for the number representing how many Cards are in this Zone.</td></tr><tr><td><strong>Amount Text Coordinates</strong></td><td colspan="2">The X/Y coordinates for the text showing how many Cards are in the Zone. This number is right-aligned, so 0, 0 represents the top right of the Deck Image.</td></tr><tr><td rowspan="4"><strong>Show Cards?</strong></td><td colspan="2">How Cards will be displayed inside the Zone. The options are:</td></tr><tr><td><strong>No</strong></td><td>Card Sprites will disappear once they reach the location of this Zone, to save computer resources.</td></tr><tr><td><strong>Behind Image</strong></td><td>Card Sprites will be displayed behind the Zone image.</td></tr><tr><td><strong>In Front</strong></td><td>Card Sprites will be placed on top of the Zone image.</td></tr><tr><td><strong>Highlight Description</strong></td><td colspan="2">The text the Help Window will display when this Zone is highlighted in battle.</td></tr><tr><td><strong>Card Enter SFX</strong></td><td colspan="2">The SE that will play when a Card enters this Zone. Leave blank for no SE.</td></tr><tr><td><strong>Card Enter SFX</strong></td><td colspan="2">The SE that will play when a Card exits this Zone. Leave blank for no SE.</td></tr><tr><td><strong>Card Actions on Empty</strong></td><td colspan="2">See <a href="/doku.php?id=card-actions#card_actions_on_empty" class="wikilink1" title="card-actions" data-wiki-id="card-actions">Card Actions on Empty</a></td></tr></tbody></table>

Temp Zone
---------

The Temp Zone is not a Zone - Cards cannot be moved to it or from it manually, and it does not have any of the functionality of a Zone. However, it can be useful to think of it as a stripped-down Zone, since all of its parameters are also present for Zones.

The Temp Zone is where Cards go to while they are in play - when a player uses a Card, it moves to the Temp Zone, its skill executes, its Card Actions execute, and then it moves on to the Discard. In that respect, the Temp Zone is less a Zone and more a physical location for a Card to be held temporarily while it is waiting for its effects to resolve.

Its parameters are as follows:

<table><colgroup><col style="width: 30%"></colgroup><tbody><tr><td><strong>Zone Coordinates</strong></td><td>The X/Y coordinates of the Zone's image, and where all Cards will travel to on screen when they enter that Zone.</td></tr><tr><td><strong>Card Scale</strong></td><td>The scale Cards will become as they move to this Zone. Set this to a value less than 1 if you want cards to shrink as they approach the Zone, and greater than 1 if you want them to grow.</td></tr><tr><td><strong>Skew</strong></td><td>This parameter contains X/Y values that can be used together to simulate isometric 3D rotation. Like Scale, Cards will change their skew to match this value when they enter this Zone.</td></tr><tr><td><strong>Card Rotation</strong></td><td>Card Rotation is measured in degrees between -360 and 360.</td></tr></tbody></table>

zones.txt · Last modified: 2025/07/03 23:05 by isiahgames