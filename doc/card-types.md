Title: card-types \[Card Game Combat - Documentation\]

Keywords: card-types   

card-types

### Table of Contents

*   Card Types

*   Defining Types

*   Skills/Items

*   Damage Formula

Card Types
==========

If you add the MYTH\_CGC\_CardTypes plugin to your project, you can specify one or more custom Types to each Card which give you access to a whole host of features that could be useful for a card game.

Defining Types
--------------

You can define Types in the plugin parameters of MYTH\_CGC\_CardTypes. Each Type must at least have a Name. It is optional to draw the Name on the Card, have a default Icon and have a Card Base that corresponds to it.

Once a custom Type has been defined, it can be given to Skills to give their Cards some default properties and be referenced in Card Actions.

Skills/Items
------------

<table><tbody><tr><td><strong>&lt;Card Type: type_name&gt;</strong></td><td>Replace “type_name” with the name of the Card Type (case sensitive) that you want this skill to have. A Skill/Card can have multiple Card Types, using multiple instances of this notetag.</td></tr></tbody></table>

Ensure that all Types you plan to use are in the Card Types plugin parameter.

Any skill which contains the **<Card Base: file\_name>** notetag from MYTH\_CGC\_CoreEngine will use that specified Card Base instead of the one specified by this plugin.

With the MYTH\_CGC\_CardTypes plugin, you also have access to these Card Actions:

| Card Action Syntax | Description |
| --- | --- |
| **Draw X Type typeName** | Where X is a number and typeName is the name of a Card Type, the game will search the player’s deck for cards of type Y and draw the first X amount of them. |
| **Discard X Type typeName** | Where X is a number and typeName is the name of a Card Type, the game will require that the player choose up to X cards from their hand of type typeName and discard them. |
| **Remove X Type typeName** | Where X is a number and typeName is the name of a Card Type, the game will require that the player choose up to X cards from their hand of type typeName and remove them from play. |
| **Mill X Type typeName** | Where X is a number and typeName is the name of a Card Type, the game will search the player's deck for cards of type typeName and discard the first X amount of them. |
| **Mill Until Type typeName** | Where typeName is the name of a Card Type, the game will discard the top card of the player’s deck until a card of the specified Type is on the top of the deck. It will not draw or discard this card - these actions would be a separate notetag. |
| **Move X Type typeName from zoneName1 to zoneName2** | This is a generic Move action that accepts all zones. Will move X cards of Type typeName from zoneName1 to zoneName2. |

**Note**: All spellings of card type names are case sensitive.

Damage Formula
--------------

If you have MYTH\_CGC\_CardTypes, you also have access to this function:

cardsInZoneOfType(zone, type)

**zone** must be replaced with the name of a zone in quotation marks. This includes “Deck”, “Discard”, “Hand”, or any Custom Zone.  

**type** must be replaced with the name of the Card Type you’re checking (with quotation marks).

This function will tell you how many cards of the specified type are in the specified zone. So if your damage formula says:

a.cardsInZoneOfType("Discard", "Zombie") \* 10

Then the damage dealt will be equal to 10 times the amount of Zombie cards currently in the player’s discard.

This function can be used just like the variables in the last section for the **Require** keyword.

card-types.txt · Last modified: 2025/07/10 20:42 by isiahgames