Title: plugin-card-types \[Card Game Combat - Documentation\]

Keywords: plugin-card-types   

plugin-card-types

### Table of Contents

*   Parameters

*   Notetags

*   Actions

*   Script Calls

*   Version History

**MYTH\_CGC\_CardTypes** is a plugin allows you to add one or more card types to each Skill.

First, define the Type using the plugin parameter. When defining a type, all parameters other than the Name affect how it's drawn on the card.

Then, use skill notetags to give a skill the Card Type you created. The spelling and capitalization must be exactly the same, so watch out for typos.

**Current Version: 1.2.3**

Parameters
----------

| **Card Types** |
| --- |
| **Name** | Name of the Card Type |
| **Draw on Card?** | If set to ON, this card type will be drawn on the card. If OFF, ignore all below parameters. |
| **Icon** | The icon index that represents the card type, if you are displaying that on the card. |
| **Card Base** | The Card Base to use for all cards of this Type. Set to nothing to ignore this feature. |
| **Show in Library?** | If set to ON, the player will be able to filter by this type in the Card Library |
| **Show in Deck Editor?** | If set to ON, will show Category Icon in Deck Stats Window. |
| **Appearance** |
| **Show Name?** | If set to ON, the name of the Card Type will be shown on all cards with that type. |
| **Name Coordinates** | The X/Y coordinates for the first Card Type Name to be drawn on the card. |
| **Number of Columns** | The number of columns of Types that will display on the Card before moving down to the next row. |
| **Row Width** | The width of each row of Types. The spacing between Types will be calculated based on this plus the Number of Columns. |
| **Row Height** | The height of each row of Types. |
| **Type Icon Size** | Icons may need to be drawn scaled-down on the card. This is the pixel width/height of icons to draw. |
| **Library Settings** |
| **All Text** | The text that represents “all types” when filtering cards by type inside the Card Library, Collection scene, etc. |

Notetags
--------

| Notetag Syntax | Description |
| --- | --- |
| 
<Card Type: type\_name>

| Replace “type\_name” with the name of the Card Type (case sensitive) that you want this skill to have. A Skill/Card can have multiple Card Types, using multiple instances of this notetag. |

Ensure that all Types you plan to use are in the Card Types plugin parameter.

Any skill which contains the <Card Base: file\_name> notetag from **MYTH\_CGC\_CoreEngine** will use that specified Card Base instead of the one specified by this plugin.

Actions
-------

| Card Action Syntax | Description |
| --- | --- |
| 
Draw X Type typeName

| This will draw the first X cards in your deck that are of the Type typeName. |
| 

Discard X Type typeName

| This will require the player to discard X cards from their hand of the Type typeName. |
| 

Remove X Type typeName

| This will require the player to select X cards for removal from their hand of the Type typeName. |
| 

Mill X Type typeName

| The game will move the first X cards in the player's deck of the Type typeName. |
| 

Mill Until Type typeName

| This will Mill cards from the top of the deck until the card at the top is of the specified type. |
| 

Move X Type \[typename\] from 
\[zoneName\] to \[zoneName\]

| This is the generic Move action that accepts all zones. For example, if you wanted to move 1 Spell Card from Deck to Discard, you would use:  

<Card Actions>
Move 1 Type Spell from deck to discard
</Card Actions>

|

Script Calls
------------

| Script Call Syntax | Description |
| --- | --- |
| 
{actor}.cardsInZoneOfType(zone, type)

| This function can be used inside damage formulas, Evals, and Require notetags. It will return the amount of cards of the given type in the given zone. An example of how to format this:  

<Card Passives>
Require user.cardsInZoneOfType("hand", "Fossil")
</Card Passives>

'zone' and 'type' are string parameters, which means they must have quotation marks around them.

|
| 

{actor}.hasCardInZone(zone, skillName)
{actor}.hasCardInZone(zone, skillId)

| This function can be used to quickly check if a specific Card is in a Zone (e.g. Hand or Deck). It returns true if it has found it and false if it hasn't. |
| 

Myth.CGC.getIDsOfType(type)

| This function returns an array containing all the skill IDs of Cards that match the type you have provided. You can use these for Card Rewards/Booster Packs or Random Card Generation. |
| 

MYTH.CGC.getIDsOfTypes(requiresAll, 
type1, type2, etc)

| This function works much like the above function, but you can supply multiple types (as many as you want), and it will return an array containing all IDs of skills that have ALL listed types if requireAll is true, or skills that have at least ONE of the listed types if requireAll is false. |

Version History
---------------

\*\*v1.2.3\*\*
- Moved Myth.Util.tryParse from CardTypes to CoreEngine, genericized it slightly.
- Added parameter to change the text for "All" in the Card Types Window.
- Added utility functions Myth.CGC.getIDsOfTypesOR and Myth.CGC.getIDsOfTypesAND.
- Fixed bug where Move X of Type Action would sometimes grab cards not of that type.
- Added Card Back parameter to Type settings to prepare for MYTH\_CGC\_CardArtLayers

\*\*v1.2.2\*\*
- Changed how Types are drawn on the card to be in line with how items are drawn on a Selectable Window, ie, in a - grid.
- Added Number of Colums, Row Width and Row Height params.
- Removed redundant parameters that are in TextFormatPlus.
- Types are now case-insensitive.
- Changes made to Library Scene continue when Card Types is present.
- New function drawRandomCardsOfType(amount, type). Might be fun.
- More getter functions for cards/zones.

\*\*v1.2.1\*\*
- Fixed Icon Formatting Issues and added new Plugin Parameters
- Fixed TextFormatPlus bug where wrong ResetFontSettings was being used

\*\*v1.2.0\*\*
- Updated for compatibility with v1.6.0
- Changed plugin name
- Increased compatibility with other expansions
- Added new Card Action: Move X Type typeName from zoneName to zoneName.

\*\*v1.1.0\*\* 
- Fixed crash on Mill Until Type Card Action

\*\*v1.0.9\*\*
- Fixed bug that would prevent End Turn Button from being selectable to confirm discard.
- Fixed bug where Discard/Remove X of Type Card Action would softlock if player did not have enough cards of that type.

\*\*v1.0.8\*\* 
- Fixed bug where skills wouldn't show up when card battle was disabled.

\*\*v1.0.7\*\*
- Added error handling to the type struct so undefined values no longer crash MZ and deployed MV games. Now they instead supply default values and warn through the console.

\*\*v1.0.6\*\*
- Cleaned up the loading of the type struct, types with Show in Library set to OFF will not show up in the Card Library. Types with Show in Deck Editor? set to OFF will not show up in the Deck Editor if you are using MYTH\_CGC\_DeckEditorCore.

\*\*v1.0.5\*\* 
- Updated for compatibility with CGC v1.5.1

\*\*v1.0.4\*\* 
- Crash hotfix for when using a card that has a Type that is not defined in the plugin parameters. Fixed error if Type list is empty.

\*\*v1.0.3\*\* - Fixed crash when opening Skills scene.

\*\*v1.0.2\*\* - Fixed MZ Card Library crash.

\*\*v1.0.1\*\* - Released plugin

plugin-card-types.txt · Last modified: 2025/07/03 23:02 by isiahgames