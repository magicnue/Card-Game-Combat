Title: damage-formula \[Card Game Combat - Documentation\]

Keywords: damage-formula   

damage-formula

Damage Formula
==============

Using MYTH\_CGC\_CoreEngine in your project adds these new variables are available to the damage calculation formula:

<table><tbody><tr><td><strong>handSize</strong></td><td>The amount of cards currently in the hand of the user of the skill/card. That number excludes the card being used.</td></tr><tr><td><strong>discardSize</strong></td><td>The amount of cards currently in the discard pile of the user. As the card is discarded before damage calculation takes place, that includes the card currently being used.</td></tr><tr><td><strong>currentDeckSize</strong></td><td>The amount of cards currently in the deck of the user.</td></tr><tr><td><strong>totalDeckSize</strong></td><td>The amount of cards in the user’s deck at the start of the battle before any cards have been drawn.</td></tr><tr><td><strong>cardsInPlay</strong></td><td>The user’s handSize + discardSize + currentDeckSize</td></tr><tr><td><strong>removedCards</strong></td><td>The amount of cards that the user has removed over the course of battle. This goes up every time the user removes a card.</td></tr></tbody></table>

For example, if the player has 7 cards in their hand and they select this skill, it will take them to 6 cards, and the calculation will deal 60 damage.

**Note**: Enemies do not use cards, and as a result their values for all of these variables will be 0. If an enemy used a skill with the above formula, then, they would deal 0 damage.

Card Types
----------

If you have MYTH\_CGC\_CardTypes, you also have access to this function:

cardsInZoneOfType(zone, type)

**zone** must be replaced with “deck” “discard” or “hand” (with quotation marks) for each respective zone.  

**type** must be replaced with the name of the Card Type you’re checking (with quotation marks).

This function will tell you how many cards of the specified type are in the specified zone. So if your damage formula says:

a.cardsInZoneOfType("discard", "Zombie") \* 10

Then the damage dealt will be equal to 10 times the amount of Zombie cards currently in the player’s discard.

This function can be used just like the variables in the last section for the **Require** keyword.

damage-formula.txt · Last modified: 2025/01/27 23:04 by isiahgames