Title: card-actions \[Card Game Combat - Documentation\]

Keywords: card-actions   

card-actions

### Table of Contents

*   Card Actions

*   Skills/Items

*   Battle Start/Turn Start

*   Card Actions on Empty

*   List of All Card Actions

*   Core Engine

*   Card Types

*   Action Pack 1

*   Action Pack 2

*   Independent Card Variables

*   Card Summons

*   Card Action Modifiers

Card Actions
============

Card Actions are effects that can happen at the start of a battle, at the start of a turn, or when you play a Card or use an Item. These effects can be used in sequence to create more versatile effects.

In place of a number in all Card Actions, you can also use \\V\[x\] to use a Game Variable, just like with message boxes. Example:

Draw \\v\[4\]

Will draw 3 cards if Game Variable 4 is set to 3, 1 card if Game Variable 4 is set to 1, and so on.

Skills/Items
------------

**Card Actions** can be added to a Skill or Item by using the following notetag format:

<Card Actions>
Action
Action
Action
</Card Actions> 

The actions will execute in the order they are listed for the User of the Card.

**Card Target Actions** execute actions for the Target of the skill/item using the following notetag format:

<Card Target Actions>
Action
Action
Action
</Card Target Actions>

These can be used for example to have an ally draw cards as part of a Card effect.

**Note**: Since Enemies do not have Cards or Decks (as of MYTH\_CGC\_CoreEngine v1.6.0), they can't process Card Target Actions. This feature is currently limited to an Actor and their allied Party members.

Battle Start/Turn Start
-----------------------

Using the **Battle Start Actions** parameter, Card Actions can be executed at the start of a battle. Simply input each command on a new line like so:

Shuffle Deck
Draw 5

This example will shuffle the deck at the start of the battle and draw 5 cards to the player.

**Turn Start Actions** works the same way, except that these Card Actions are executed at the beginning of every turn except for the first turn:

Discard Until 0
Draw 5

This example will cause the player to discard their entire hand and draw 5 new cards.

The Battle Start Actions will execute on turn 0, and the Turn Start Actions will execute at the start of every turn after that.

Card Actions on Empty
---------------------

Each Zone has a parameter called Card Actions on Empty which is a list of Card Actions that execute automatically when that zone is made empty.

The default Card Actions on Empty for the Discard zone are as follows:

Move all from discard to deck
shuffle deck

No other zones have default Card Actions on Empty.

These Card Actions are added to the beginning of the current list of Card Actions, effectively interrupting them so that the effect of the zone can be resolved first. For instance, if you play a card with the Draw 4 Card Action while there were 3 cards in the Deck, the game would draw the 3 remaining cards, execute the Deck's Card Actions on Empty, and then attempt to draw 1.

List of All Card Actions
------------------------

Below is a list of every Card Action sorted by which plugin provides it.

### Core Engine

The list of Actions available in the Core Plugin are as follows:

| Card Action Syntax | Description |
| --- | --- |
| 
Draw X

| Where X is a number, playing this card will make the actor draw X cards |
| 

Draw Until X

| Where X is a number, will make the actor draw until their hand is size X |
| 

Discard X

| Will make the actor discard X cards in order to play this |
| 

Discard Until X

| Will make the actor discard until their hand size is X |
| 

Remove X
Remove Until X

| Works just like discarding, but will remove the selected cards from play |
| 

Remove this

| Will remove the card currently being used from play. |
| 

Add \[skillID\] to \[zoneName\]

| Adds a card directly to a zone. For example, ““Add 7 to hand”” will create a card of Skill ID 7 in your Hand. |
| 

Mill X

| Moves X cards from the deck directly to the discard |
| 

Search For X
Search For \[skill name\]

| Draws the Card of the specified Skill ID (x) or name, if it is in the deck. |
| 

Shuffle Deck

| Will shuffle the deck. |
| 

Move X from \[zoneName\] 
to \[zoneName\]

| A generic form of Draw/Discard/Mill where you can specify any zone. For example “Move 3 from Discard to Hand” will return 3 cards to the hand. |
| 

Move this to \[zoneName\]

| Will move the card currently being used to the specified zone. If the zone is absent the card will move to the discard at the end of all Card Actions. |
| 

Move all from \[zoneName\] 
to \[zoneName\]

| This will move all cards from one zone to another. |
| 

Eval \[expression\]

| Will execute anything after the word “eval” as a piece of code. |
| 

If \[expression\]

| This will evaluate the expression, and if it's true, it will execute the next Card Action. If false, it will skip that action. |
| 

Label \[labelName\]

| This will define a label, which is important for the jump to Action. |
| 

Jump to \[labelName\]

| This will search for the label with the same name, and move to that label. If the label is after this Card Action, it will skip all Card Actions between the two. If the label is before this Card Action, it will execute the Card Actions between the two a second time. |
| 

Wait X

| Causes Card Action execution to wait X frames before continuing, like a Wait command in RPG Maker. Does not work in Start of Turn/Battle params. |
| 

Play SE \[fileName\]
Play SFX \[fileName\]

| Will play the specified sound file located in audio/se folder. |
| 

Force Action X

| Forces the user (in Card Actions) or the target (in Card Target Actions) to execute skill X. |

Example of how these Card Actions can be used:

<Card Actions>
label start
if (user.handSize >= 10)
jump to end
draw 1
wait 5
jump to start
label end
</Card Actions>

These card actions will draw 1 card, wait 5 frames, and then repeat until the player has 10 cards in their hand.

### Card Types

If you’re using Card Types plugin, you also have access to these Card Actions:

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

**Note**: As of 1.6.2, card type names are no longer case-sensitive.

### Action Pack 1

If you are using the plugin Action Pack 1, you also have access to these Card Actions:

**Selection Card Actions**

| Card Action Syntax | Description |
| --- | --- |
| 
Select X from \[zoneName\]

| Replace 'X' with a number or game variable, and replace 'zoneName' with 'deck', 'discard' or 'hand'. This opens the Card Selection Window and makes the player choose X cards from the specified zone. |
| 

Select X of Y from 
\[zoneName\] \[location\]

| Replace 'X' with a number, 'Y' with another number,'zoneName' with a zone, and 'location' with either 'Top', 'Bottom' or 'Random'.  

This makes the player choose X cards from a selection of Y cards from the specified zone. Replace 'location' with 'Top', 'Bottom', 'Random'. If 'Top', The pool of cards will be grabbed from the top Y cards. If 'Bottom', the bottom. If 'random', cards will be grabbed randomly from the zone. |
| 

Select X from skills Y, Z, 
A, B, C

| Replace X, Y, Z, etc with numbers.This makes the player choose X cards from a list of Skill IDs. The list of IDs can be any size. |
| 

Select All from \[zoneName\]

| Selects all Cards in the specified zone. |
| 

Select All type \[typeName\] 
from \[zoneName\]

| Requires CardTypes. Replace typeName with the name of a Card Type, and zoneName with a zone. Selects all Cards of the specified Card Type in the specified zone. |
| 

Select X Type \[typeName\]
from \[zoneName\]

| Requires CardTypes. Replace X with a number, typeName with the name of a Card Type, and zoneName with a zone. This makes the player choose X cards from the specified zone filtered to only include the specified Card Type. |
| 

Select X of Y Type \[typename\]
from \[zoneName\] \[location\]

| Requires CardTypes. This makes the player choose X cards from the specified zone, filtered to only include the specified Card Type, with a pool size of Y grabbed from the top/bottom or grabbed randomly from the zone. |
| 

Select Any from \[zoneName\]

| Allows players to choose any number of cards from a specified zone in a selection, including 0. They can hit cancel to finish their selection. |
| 

Select Upper Text: string

| Changes the Upper Text of the Selection Window to the string provided. |
| 

Select Lower Text: string

| Changes the Lower Text of the Selection Window to the string provided.  
Use the following text codes inside the strings of either of these Card Actions:  
%actor - Actor Name  
%selectNum - Number of cards currently selected  
%unselectNum - Number of cards currently not selected  
%selectReq - Number of cards required to be selected  
%zone - Zone cards are being selected from (if any) |

Note that each Selection CA adds to the list of selected cards, rather than overwriting it.

**Movement Card Actions**

Once the player has selected cards, these Card Actions will do something with them.

| Card Action Syntax | Description |
| --- | --- |
| 
Move Selected to zoneName

| Replace 'zoneName' with a zone. This will move the selected cards from their previous zone to the specified zone. |
| 

Move Unselected to zoneName

| This will move the cards that WEREN'T selected cards from their previous zone to the specified zone. |
| 

Remove Selected

| This will remove the selected cards from play. |
| 

Remove Unselected

| This will remove the cards that WEREN'T selected from play. |
| 

Add Selected to zoneName

| Replace 'zoneName' with a zone. This will add a copy of each selected card to the specified zone.  

Note that the Add action is the only Movement Card Action that works when using the Card Action “Select from Skills” because it's the only one that does not require a zone of origin. |
| 

Add Unselected to zoneName

| Replace 'zoneName' with a zone. This will add a copy of each card that WASN'T selected to the specified zone.  

Note that the Add action is the only Movement Card Action that works when using the Card Action “Select from Skills” because it's the only one that does not require a zone of origin. |

**Clear Card Actions**

Each Selection Card Action adds to the list of selected cards, and that list will not be cleared until you call one of the following:

Clear Selected
Clear Selection

This means that, until you call Clear Selected/Selection, you can perform multiple Selection CAs and one Movement CA which will act on all of them, or call multiple movement CAs with only one selected card.

### Action Pack 2

If you are using the plugin Action Pack 2, you also have access to these Card Actions:

| Card Action Syntax | Description |
| --- | --- |
| 
Shuffle zoneName

| Replace 'zoneName' with a zone. This will shuffle the specified zone. |
| 

Transform X into Y

| Replace X with a number, and Y with a skill ID.  
This will make the player select X cards from their hand, and the selected cards will transform into a card with the specified Skill ID.  
The card will then have all of the Actions and Passives of the new Skill ID.  
If you're using Independent Card Variables, the transformed card will still have access to its old Var values. |
| 

Transform This into X

| Replace X with a skillID.  
This will transform the card currently being used into a card with the specified Skill ID. |
| 

Transform Selected into X

| Replace X with a skillID.  
When used in conjunction with ActionPack1, this will transform cards selected through a Select Card Action into cards with the specified Skill ID. |
| 

Copy X to zoneName

| Replace X with a number and 'zoneName' with a zone.  
This will make the player select X cards from their hand, and the selected cards will be copied into the specified zone.  
This is a duplication effect, which means unlike Add, which creates a whole new card, the new copy has all of the Var values from the original. |
| 

Copy Selected to zoneName

| Replace 'zoneName' with a zone.  
When used in conjunction with ActionPack1, this will copy the cards selected through a Select Card Action into the specified zone. |
| 

Copy This to zoneName

| Replace 'zoneName' with a zone.  
This will copy the card currently being used into the specified zone. |
| 

Draw X from zoneName

| Replace X with a number and 'zoneName' with a zone.  
This will take a card from the top of the specified zone and add it to the Hand. It works just like “Move X from zoneName to Hand” |

In addition, you have access to Card Action Modifiers.

### Independent Card Variables

If you are using the plugin Independent Card Variables, you also have access to these Card Actions:

| Card Action Syntax | Description |
| --- | --- |
| 
Var(X) set Y

| This sets the specified Var of this card to the value supplied in Y.  
Replace X with the Var index  
Replace Y with the value you wish the Var index to contain |
| 

Var(X) mod \[+/-\]Y

| Modifies the specified Var of this card by the value of Y. Adds or subtracts Y to/from Var.  
Replace X with the Var index  
Replace \[+/-\]Y with a positive or negative number |
| 

Var(X) set 
eval \[formula\]

| This sets the specified var of this card to get the value of the formula. The value is re-evaluated at the end of each Action in battle. |
| 

All Skill \[skillID\] Var(X)
set Y
All Skill \[skillID\] Var(X)
mod \[+/-\]Y
All Skill \[skillid\] Var(X)
set eval \[formula\]

| These Card Actions modify the Var of all cards belonging to that actor of the specified Skill ID. |
| 

All Skill \[skillID\] Var(X)
set Y in \[zoneName\]
All Skill \[skillID\] Var(X)
mod \[+/-\]Y in \[zoneName\]
All Skill \[skillId\] Var(X)
set eval \[formula\] 
in \[zoneName\]

| These Card Actions modify the Var of all cards belonging to that actor's specific zone.  

Replace \[zoneName\] with “Deck”, “Discard” or “Hand”. |
| 

Selected Var(X) set Y
Selected Var(X) mod \[+/-\]Y
Selected Var(X) set 
eval \[formula\]

| Requires Card Action Pack 1 plugin to use.  

These Card Actions act on all Selected cards instead of the card containing the Card Actions. |

### Card Summons

If you are using the plugin Card Summons, you also have access to these Card Actions:

| Card Action Syntax | Description |
| --- | --- |
| 
Select X from unitName Field

| Replace 'X' with a number or game variable, and replace 'unitName' with 'Ally', 'Opponent', 'Party', or 'Troop'. This activates the respective Field to select the specified number of Cards. |
| 

Select X Type typeName from unitName Field

| Replace 'X' with a number or game variable, and replace 'unitName' with 'Ally', 'Opponent', 'Party', or 'Troop'. Replace 'typeName' with a Card Type. This activates the respective Field to select the specified number of Cards, only being able to select the specified Type. |
| 

Select All from unitName Field
Select All Type typeName from unitName Field

| Works just like the above two Card Actions, but automatically selects all available Cards on the field. |
| 

Use Skill X on Selected

| Replace 'X' with a number or game variable. This performs a skill matching the ID of X on any Creatures selected using the above Select actions, using the Battler performing this Card Action as the subject for damage calculation. |
| 

Battle Log: message

| Replace 'message' with text. This will push that text to the Battle Log. |

Card Action Modifiers
---------------------

For the time being, Modifiers are only present in Action Pack 2. See its section on Modifiers.

card-actions.txt · Last modified: 2025/06/13 20:32 by isiahgames