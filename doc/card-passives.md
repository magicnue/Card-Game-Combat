Title: card-passives \[Card Game Combat - Documentation\]

Keywords: card-passives   

card-passives

### Table of Contents

*   Card Passives

*   Core Engine

*   Action Pack 2

*   Independent Card Variables

*   Card Fusion

*   Card Summons

*   Require

Card Passives
=============

Card Passives work similar to Actions, but rather than executing when the card is played, they affect the properties of the card in various other ways.

Just like Card Actions, Card Passives can be added to a Skill notetag in a similar format. Unlike Actions, however, they cannot be added to items.

<Card Passives>
Passive
Passive
Passive
</Card Passives>

Core Engine
-----------

The list of Passives available in MYTH\_CGC\_CoreEngine are as follows:

| Card Passive Syntax | Description |
| --- | --- |
| 
Will End Turn

| This will cause the card to end the turn upon use. |
| 

Discard if unplayed

| Will discard this card if the turn ends while this card is in the hand. |
| 

Remove if unplayed

| Will remove this card from play if the turn ends while this card is in the hand. |
| 

Require \[expression\]

| Cannot be played unless the expression evaluates to true. Multiple requirements can be placed. Use the word 'user' to refer to the user of the card.  

Require user.handSize > 2
Require user.handSize < 10
Require $gameSwitches.value(3)

This will make a card playable only if the user's hand contains more than 2 and less than 10 cards. In addition, can only be played if Game Switch 3 is set to ON.

|
| 

Start in \[zoneName\]

| Will be in the specified zone at start of battle, before start-of-battle actions. |
| 

Start of Turn: Skill X

| At the Start of Turn, if this Card is in Hand, execute Skill ID X. |
| 

End of Turn: Skill X

| At the end of Turn, if this Card is in Hand, execute Skill ID X. |
| 

Enter \[zoneName\]: Skill X

| When this Card enters the specified zone, execute Skill ID X. |
| 

Exit \[zoneName\]: Skill X

| When this Card enters the specified zone, execute Skill ID X. |

Action Pack 2
-------------

The list of Passives available in MYTH\_CGC\_ActionPack2 are as follows:

| Card Passive Syntax | Description |
| --- | --- |
| 
Prevent \[cardAction\]

| This prevents a card from being the target of a given Card Action.  

Prevent Discard

This card cannot be selected for the Discard action

Prevent Move to Discard

This card cannot be moved to the discard zone through any means

Prevent Move

This card cannot be moved from its starting zone.  
Specially implemented is:

Prevent Perma Remove

This card can be removed from play but it will return at end of battle like a normal Remove. See “Perma” Modifier for details below.

|
| 

Transform This into X 
if \[expression\]

| Replace X with a skill ID and expression with code that evaluates to true or false.  

This passive transforms the card into a card of the specified Skill ID if the expression is true.  

The condition works just like the Require passive, but it's evaluated whenever there is a change in game state, as long as this card is in the hand.  

Transform this into 5 if user.handSize > 7

This will transform the card into a card with the Skill ID 5 if the user's hand has more than 7 cards.

|

Independent Card Variables
--------------------------

The list of Passives available in MYTH\_CGC\_IndependentCardVariables are as follows:

| Card Passive Syntax | Description |
| --- | --- |
| 
Var(X) init Y

| This will set the initial value of Var(X) to the number specified in Y.  
All values initialize at 0 by default, and this overrides that behavior for this Var index of all cards belonging to this skill.  

When Var values are reset, either through the “Reset Var after battle?” plugin parameter or through functions listed below, they return to their initial values. |
| 

Var (X) init eval \[formula\]

| This will set the initial value of Var(X) to be evaluated by the formula.\\\\Just like when setting a Var to a formula through Card Actions, this value will update at the end of every Action in battle, until it is overridden by another Set/Mod Card Action. |

Card Fusion
-----------

The list of Passives available in MYTH\_CGC\_Fusion are as follows:

Place the following inside the Card Passives of the Skill you want cards to be fused into - the result of the fusion.

| Card Passive Syntax | Description |
| --- | --- |
| 
\[zoneName\] Fusion Recipe: 
X, Y, Z, A, B...

| Replace \[zoneName\] with the name of a Zone  

Replace X, Y, etc with skill IDs.  

When the specified zone contains cards of the specified IDs, a Card Fusion will take place that removes those cards from the zone and replaces them with this card.  

Hand Fusion Recipe: 4, 4, 4

The above will make the game check if the Hand contains 3 copies of a card with the skill ID 4, and if it does those three cards will be fused into the card that contains this Card Passive.

Discard Fusion Recipe: 5, 7, 9, 10, 11

The above will require that 5 different, specific cards are in the Discard, and if they are, they will fuse into the card that contains this Card Passive.  

Note that a Card can have any number of Fusion Recipes, in any number of zones, including Extra Zones.

|

Card Summons
------------

The list of Passives available in MYTH\_CGC\_CardSummonsCore are as follows:

| Card Passive Syntax | Description |
| --- | --- |
| 
Start of Turn Field: 
Skill X

| Replace X with a Skill ID.\\\\This works just like the Start of Turn Skill X Passive provided in Core Engine, but actives the skill when the card starts the turn in the Field Zone. |
| 

Endof Turn Field: 
Skill X

| Replace X with a Skill ID.\\\\This works just like the End of Turn Skill X Passive provided in Core Engine, but actives the skill when the card ends the turn in the Field Zone. |

Require
-------

Anything after the word “Require” is evaluated as code. It can contain multiple expressions, but it is recommended to separate things into multiple Require passives for better clarity.

The variable ‘user’ can be used to refer to the actor that the card belongs to.

Because it is code, you could do something like:

Require $gameSwitches.value(30)

And require that the 30th Game Switch be set to ON for a card to be playable.

The example image in the Card Passive Skill Notetags section requires that the actor playing the card have more than 2 cards in their hand, and that they’ve removed less than or equal to 7 total over the course of the battle. For more information about the **handSize** and **removedCards** variables, refer to Damage Formula.

card-passives.txt · Last modified: 2025/06/13 20:54 by isiahgames