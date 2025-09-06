Title: tag-gloss \[Card Game Combat - Documentation\]

Keywords: tag-gloss   

tag-gloss

### Table of Contents

*   User Glossary

*   Commands

*   Core Engine

*   Card Collection

*   Deck Editor

*   Card Shop

*   Card Summons

*   Notetags

*   Core Engine

*   Card Types

*   Equip Cards

*   Block Generate

*   Card Collection

*   Deck Editor

*   Card Shop

*   Card Summons

*   Card Particle FX

*   Turn Start Plus

*   Card Art Layers

*   Script Calls

User Glossary
=============

Commands
--------

### Core Engine

The list of Plugin Commands available in the Core Plugin are as follows:

| Command Syntax | Event Usage | Description |
| --- | --- | --- |
| 
DisableCardBattle

| Map Only | Reverts the Battle System to RPG Maker Defaults. |
| 

EnableCardBattle

| Map Only | Sets the Battle System to Card Game Combat. |
| 

EnableCardLibrary

| Map & Battle | Adds the **Card Library** option to the Menu. |
| 

DisableCardLibrary

| Map & Battle | Removes the **Card Library** option from the Menu. |
| 

OpenCardLibrary

| Map & Battle | Opens the **Card Library** scene directly. This can be done from the map. |
| 

ShowCard \[ID\] \[x\] \[y\] 
\[angle\] \[index\]

| Map & Battle | Replace the brackets with their respective fields. Index works just like the Number when you Show Picture.  

If Index is omitted, it will just find a new index and create a new card.  

If angle is omitted, the angle will be 0. |
| 

HideCardID \[ID\]

| Map & Battle | This un-shows the card with the specified skill ID. If two or more cards have the same ID, it will hide the most recently added card. |
| 

HideCardIndex \[index\]

| Map & Battle | This hides the card at the specified index. |
| 

HideAllCards

| Map & Battle | This will hide all cards. |
| 

MoveCard \[index\] \[x\] \[y\]

| Map & Battle | This moves the card of the specified index to the specified x and y coordinates. |

### Card Collection

The list of Plugin Commands available in the Card Collection are as follows:

| Command Syntax | Event Usage | Description |
| --- | --- | --- |
| 
OpenCardCollection

| Map Only | Opens the **Card Collection** scene directly. This can be done from the map. |

### Deck Editor

The list of Plugin Commands available in the Deck Editor are as follows:

| Command Syntax | Event Usage | Description |
| --- | --- | --- |
| 
IncreaseDP \[ActorID\] \[Amount\]

| Map Only | Will add the specified amount to the actor's max DP, like raising a stat. |
| 

OpenDeckEditor

| Map Only | Will open the Deck Editor Scene during an Event |
| 

EquipDeck \[ActorID\] \[DeckName\]

| Map Only | Equips Actor with matching ID with a Decklist you specify. Actor needs to be in the party. Decklist needs to match the name given. Example: “EquipDeck 1 HeroStarter” will equip the Actor at ID 1 with the Decklist called “HeroStarter” if it is available. |
| 

AddCardToDeck \[ActorID\]
\[DeckName\] \[SkillID\] \[addToLibraryToo\]

| Map Only | Adds the supplied Card to the supplied actor's deck, if such a deck exits.  
In place of a deck name you can use “%current” for the deck the actor currently has equipped.  
AddToLibraryToo - (true/false) determines if the Card is also added to the actor's (or party's) library. It is recommended to keep this as true to prevent making a deck illegal. |
| 

RemoveCardFromDeck \[ActorID\] \[DeckName\]
\[SkillID\] \[RemoveFromLibraryToo\]

| Map Only | Removes the specified Card from the actor's deck, if the card is present. In place of a deck name you can use “%current” for the deck the actor currently has equipped.  
RemoveFromLibraryToo - (true/false) determines if the Card is also removed from the actor's (or party's) library. It is recommended to keep this as false to prevent making other decks illegal. |

### Card Shop

The list of Plugin Commands available in the Card Shop are as follows:

| Command Syntax | Event Usage | Description |
| --- | --- | --- |
| 
OpenCardShop

| Map Event | Functions just as this.cardShopProcessing() to open Card Shop Scene in Event |
| 

ResetCardShop \[ID\]

| Map Event | Functions just as this.resetCardShopInventory() to restock shop's original inventory and reset its Remove costs. This also rerolls all randomization for the shop's inventory. If \[EventID\] is not specified will default to resetting the shop for the current Event. |

### Card Summons

The list of Plugin Commands available in the Card Summons are as follows:

| Command Syntax | Event Usage | Description |
| --- | --- | --- |
| 
DisableCardField

| Map Only | Disables the Summons Field and returns to normal CGC battle. |
| 

EnableCardField

| Map Only | Enables the Summons Field if it's been disabled. |

Notetags
--------

This section contains all Notetags other than Card Actions and Card Passives.

### Core Engine

The list of Notetags available in the Core Plugin are as follows:

| Notetag Syntax | Database Usage | Description |
| --- | --- | --- |
| 
<Hide from card library>

| Skills | Makes the card not show up in the Card Library |
| 

<Card Art: file\_name>

| Skills | Makes the card's Card Art the file of the given name.  

Art can be found in the art directory in the plugin parameters. |
| 

<Card Base: file\_name>

| Skills | Replaces the default card Base with the file of the given name.  

Bases can be found in the base directory in the plugin parameters. |
| 

<Card Passives>
action
action
</Card Passives>

| Skills, Items | Used to add Passives to a Skill. See:Card Passives |
| 

<Card Actions>
action
action
</Card Actions>

| Skills, Items | Used to add Actions to a Skill. Actions execute in sequential order. See:Card Actions |
| 

<Card Target Actions>
action
action
</Card Target Actions>

| Skills, Items | Used to add Actions to a Skill that are performed on the Target. Actions execute in sequential order. See:Card Actions |

### Card Types

The list of Notetags available in Card Types are as follows:

| Notetag Syntax | Description |
| --- | --- |
| 
<Card Type: type\_name>

| Replace “type\_name” with the name of the Card Type (case sensitive) that you want this skill to have. A Skill/Card can have multiple Card Types, using multiple instances of this notetag. |

Ensure that all Types you plan to use are in the Card Types plugin parameter.

Any skill which contains the <Card Base: file\_name> notetag from **MYTH\_CGC\_CoreEngine** will use that specified Card Base instead of the one specified by this plugin.

### Equip Cards

The list of Notetags available in Equip Cards are as follows:

| Notetag Syntax | Database Usage | Description |
| --- | --- | --- |
| 
<Add Card X>

| Weapons, Armors, States | When an actor equips a weapon or armor with this tag, this skill will be shuffled into their deck. When they are given a state with this tag, the skill will be added to the top of their deck.  

If an actor loses the state, or changes equipment mid-battle, the card will be removed from their deck. If it's not in their deck, it will be removed from their hand. If it's not in their deck, it will be removed from their discard pile. |
| 

<Add Card \[skill name\]>

| Weapons, Armor, States | Works similarly to the previous notetag. Instead of skill IDs, you can add them by name. Case sensitive. |

### Block Generate

The list of Notetags available in Block Generate are as follows:

| Notetag Syntax | Database Usage | Description |
| --- | --- | --- |
| 
<Init Block \[State ID\]: X>
<Init Block \[State Name\]: X>

| Actors, Enemies | Sets initial Block State of this Actor/Enemy to X at battle start. You may use the name of the Block State instead of the ID (case-insensitive).  
X can be a negative or positive number. You can use a Game Variable in place of a number using \\v\[x\] text code.  

**Usage Examples**  

<Init Block 12: 10> sets the Initial Value of Block State 11 to 10.  

<Init Block Icewall: 10> sets the Initial Value of Block State “Icewall” to 10. |
| 

<Max Block \[State ID\]: X>
<Max Block \[State Name\]: X> 

| Actors, Enemies | Sets maximum Block State this Actor/Enemy can have at any one time.  

**Usage Examples**  

<Max Block 12: 50> sets the Maximum Value of Block State 11 to 50.  

<Init Block Icewall: 50> sets the Maximum Value of Block State “Icewall” to 50. |
| 

<Hide Block \[State ID\]>
<Hide Block \[State Name\]>
<Hide All Block>

| Actors, Enemies | Hides Icon of a Block State on the Battler's Sprite and Windows.  
If an ID is not provided or a matching State is not found, it defaults to the first Block State in the list.  
Hide All Block will hide icons for every ID on the Block State list.  

**Usage Examples**  

<Hide Block 11> will hide Block Icon of State 11 on Battler's Sprite and Windows.  

<Hide Block Icewall> will hide Block Icon of State “Icewall” on Battler's Sprite and Windows. |
| 

<Hide Resc \[State ID\]>
<Hide Resc \[State Name\]>
<Hide All Resc>

| Actors, Enemies | Hides Icon of a Resource State on the Battler's Sprite and Windows.  

**Usage Examples**  

<Hide Resc 12> will hide Resource Icon of State 12 on Battler's Sprite and Windows.  

<Hide Resc Mana> will hide Resource Icon of State “Mana” on Battler's Sprite and Windows. |
| 

<Ignore Block \[State ID\]>
<Ignore Block \[State Name\]>

| Skills, Items | Damage Formula of these Skills/Items will ignore target's Block State X value and deal their damage directly to HP instead. Useful for “piercing” type Skills/Items.  

**Usage Examples**  

<Ignore Block 11> will make damage from the Skill ignore Block State 11.  

<Ignore Block Icewall> will make damage from the Skill ignore Block State Icewall. |
| 

<Mod Init Block \[State ID\]: \[+/-\]X>
<Mode Init Block \[State Name\]: \[+/-\]X

| Weapons, Armors | Modifies an Actor's Initial Block amount by adding a positive/negative number. Can stack from multiple sources (like different pieces of equipment).  

**Usage Examples**  

<Mod Init Block 11: +50> will add 50 to the Initial Value of Block State 11 for that Actor.  

<Mod Init Block Icewall: -50> will subtract 50 to the Initial Value of Block State Icewall for that Actor. |
| 

<Mod Max Block \[State ID\]: \[+/-\]X>
<Mod Max Block \[State Name\]: \[+/-\]X>

| Weapons, Armors | Modifies an Actor's Max Block amount by adding a positive/negative number. Can stack from multiple sources (like different pieces of equipment).  

**Usage Examples**  

<Mod Max Block 11: +50> will add 50 to the Maximum Value of Block State 11 for that Actor.  

<Mod Max Block Icewall: -50> will subtract 50 to the Maximum Value of Block State Icewall for that Actor. |
| 

<Change Block \[State ID\]: \[+/-\]X>
<Change Block \[State Name\]: \[+/-\]X>

| States | Determines how much an Actor with the State will gain/lose Block at the end of their turn (during the Regenerate Step). Can stack from multiple sources.  
If there is both Block Gain and Block Loss from multiple States, the values are summed together and applied as a single instance of generation e.g. if State A gains 20 BLOCK each turn and State B loses 40 Block each turn, then an Actor with both State A and B loses 20 Block (+20 - 40 = -20) each turn |
| 

<Fill Block \[State ID\]>
<Fill Block \[State Name\]>

| States | When this State is applied to a Battler, it will set the specified Block State's value to max.  
Maximul will take the Battler's Maxmimum for that Block State set by their Notetags. If no maximum was provided, will default to Maximum set in parameters. |
| 

<Clear Block \[State ID\]>
<Clear Block \[State Name\]>

| States | When this State is applied to a Battler, the Block State value is set to 0. |
| 

<Negate Block \[State ID\]>
<Negate Block \[State Name\]>

| States | When a State with this Notetag is applied to an actor, Block State is removed and it cannot be applied to the Battler until this State elapses or is removed. |

### Card Collection

The list of Notetags available in Card Collection are as follows:

| Notetag Syntax | Database Usage | Description |
| --- | --- | --- |
| 
<Hide from Collection>

| Skills | This prevents this skill from showing up in the Card Collection. |

Additionally, if the Core Engine parameter Show Cards With Blank Names in Library is set to false, any card with an empty name will be hidden from the Collection by default.

### Deck Editor

The list of Notetags available in Deck Editor are as follows:

| Notetag Syntax | Database Usage | Description |
| --- | --- | --- |
| 
<deck restriction>
Min Size: X
Max Size: Y
Max Copies: X
Min Type typeName: X
Max Type typeName: X
Seal Type typeName
Seal Type typeName if \[expression\]
Require \[expression\]
Requirement Message: \[string\]
</deck restriction>

| Actors, Classes | Sets a Deck Restriction on the Actor or Class.  

**Min Size: X** sets the minimum number of Cards required in the deck for it to be valid.  

**Max Size: Y** sets the maximum number of Cards to be in the deck for it to be valid.  

**Max Copies: X** sets the max amount of copies of any given card. This overrides the Max Copies plugin parameter and is overridden by the Max Copies tag inside a skill.  

**Min/Max Type typeName: X** sets the minimum number of Cards of the given Type to be in the deck for it to be valid.  

**Seal Type typeName if \[expression\]** Disables the specified type from being added to the deck if the condition is met or absent.  

**Require \[expression\]/Requirement Message: \[string\]** Makes the deck illegal if the code expression evaluates to false and defines a message that will appear in the Deck Selector Window when a deck is made illegal this way.  

If an Actor has restrictions from both their Actor notetags and their Class notetags, the Actor notetags will always take precedence. |
| 

<Deck Restriction>
Max Copies: 4
Require \[expression\]
</Deck Restriction>

| Skills | Sets a Deck Restriction on a specific card.  
**Max Copies** Specifies the number of copies of this Card that can be allowed in a Deck for it to be valid. Number must be higher than 0.  

**Require \[expression\]** Requires that the expression evaluate to true for the card to be able to be added to a deck. |
| 

<decklist DeckName>
5x Skill Y
3x Skill Z
</decklist>

<decklist DeckName>
5x skillName
3x skillName
1x skillName
</decklist>

| Actors, Classes | This defines a starter Deck for an Actor or Class.  

**deckName** is the name given to the starter Deck and can't have any spaces.  

You can specify the Cards in the Starter Deck as Skill IDs (e.g. 34, 45, 52) or as Names (Punch).  

By default, all Skills that an actors learns at level 1 are put into a Deck which is equipped on initialization.  

You can also put **Immutable** inside this tag to make this starter Deck unable to be edited. |
| 

<Deck Cost: X>

| Skills | Specifies the DP cost of the skill's card. If this notetag isn't present, a card's DP cost defaults to 1 |
| 

<Starting Deck Points: X>

| Actors, Classes | This overrides the value specified in the plugin parameter Default Starting DP for this specific actor/class. |
| 

<Deck Points On Level: X>

| Actors, Classes | This overrides the value specified in the plugin parameter Deck Points on Level Up for this specific actor/class. |
| 

<Bonus Deck Points: X>

| Weapons, Armor | This equipment will add the specified bonus amount to an actor's max DP. |

### Card Shop

The list of Notetags available in Card Shop are as follows:

| Notetag Syntax | Database Usage | Description |
| --- | --- | --- |
| 
<Card Price: X>
<Card Buy Price>

| Skill | This will set the price of that skill's Card to X. You can use \\v\[x\] to substitute the price with a Game Variable. |
| 

<Card Sell Price>

| Skill | This will set the sell price of that skill's Card to X. You can use \\v\[x\] to substitute the price with a Game Variable. |
| 

<Card Remove Price>

| Skill | This will set the removal price of that skill's Card to X. You can use \\v\[x\] to substitute the price with a Game Variable. |
| 

<Prevent Card Buy>

| Skill | This will prevent that skill's Card from being able to be selected for purchase. |
| 

<Prevent Card Sell>

| Skill | This will prevent that skill's Card from being able to be selected for selling. |
| 

<Prevent Card Remove>

| Skill | This will prevent that skill's Card from being able to be selected for removal at a Card Shop. |
| 

<Shop Image: fileName>

| Skill | This will cause that skill's Card to appear using the specified image in the Card Shop. Images should be placed in img/CGC/shop. |
| 

<card shop>
3x Skill Y
5x Skill Z
</card shop>

<card shop>
5x skillName
3x skillName
1x skillName
</card shop>

| Event | Before you can open the Card Shop scene, you need to specify the contents of the shop in Comments. You can space out the info across multiple Comments in the event page.  

In between the opening and closing notetags, you can use the following syntax to populate the card shop. \[N\]x refers to how many copies of those Cards you want in the Shop. |
| 

<card shop>
Skill Y Price Z
skillName Price Z
3x Skill Y Price Z
5x skillName Y Price Z
</card shop>

| Event | If you want a card that has a different price from the default, this format will let you label specific items in the shop at a custom price |
| 

<card shop>
Pack Preset Y
3x Pack Preset Y
</card shop>

| Event | You can add Card Packs that have been set up through the Card Pack Preset parameters. |
| 

<card shop>
Command: buy
Command: buy, sell, remove, cancel
</card shop>

| Event | This determines which commands will be present in the scene. If only one is present, the Command Window will be invisible and more space will be given to the Card Selection Window. |
| 

<card shop>
Buy Price priceFormula
Sell Price priceFormula
Remove price priceFormula
</card shop>

| Event | These override the default formulas used to determine how much a card is worth when buying, selling or removing. The default formulas are set through plugin parameters. |
| 

<card shop>
Buy Limit X
Sell Limit X
Remove Limit X
</card shop>

| Event | These determine how many cards can be bought, sold, or removed respectively before the option to buy/sell/remove is disabled. |

Lastly, this plugin has tools to allow you to randomize values within these comments, like so:

1x Skill \[1-4\]

Replacing a number with \[min-max\] will make the shop determine a random number between the minimum and the maximum (inclusive). So in the above example Skill 1, Skill 2, Skill 3, or Skill 4 may appear.

You can also put this at the beginning of the notetag, like so:

\[1-3\]x Skill 4

This will cause the Shop to stock between 1 and 3 copies of Skill 4.

Additionally, you can also use the following:

1x Skill \[5, 7, 9\]

Replacing a number with \[x, y, z, etc\] will make the shop choose from the list of numbers inside the brackets. So in the above example Skill 5, Skill 7, or skill 9 may appear.

This works anywhere in the comments to determine the shop inventory. This means you can do this:

<card shop>
\[3-4\]x Skill \[7, 8, 9, 11, 13, 15\]
\[1-2\]x Pack Preset \[1-3\]
\[1-2\]x Pack Preset \[1-3\]
\[1-2\]x Pack Preset \[1-3\]
Buy Price buyPrice \* \[1-2\]
</card shop>

Note that these randomization methods will only produce whole numbers. Also note that any random numbers will retain their values when a shop's inventory is reset through script calls or plugin commands.

### Card Summons

The list of Notetags available in Card Summons are as follows:

This section is temporarily blank.

### Card Particle FX

The list of Notetags available in Card Particle FX are as follows:

| Notetag Syntax | Database Usage | Description |
| --- | --- | --- |
| 
<Card Particle: X>

| Skills | Spawns Particles of X ID when the Card is removed. |

### Turn Start Plus

The list of Notetags available in Turn Start Plus are as follows:

| Notetag Syntax | Database Usage | Description |
| --- | --- | --- |
| 
<Battle Start Actions>
action
action
</Battle Start Actions>

| Actor, Class, Weapons, Armors, States | This will add Card Actions executed at the start of the first turn if the party member is that Actor, that Class, is using that equipment, or is affected by that state. |
| 

<Turn Start Actions>
action
action
</Turn Start Actions>

| Actor, Class, Weapons, Armors, States | This will add Card Actions executed at the start of every turn after the first if the party member is that Actor, that Class, is using that equipment, or is affected by that state. |

### Card Art Layers

The list of Notetags available in Card Art Layers are as follows:

Layers can be added to or changed for a Card using the following Skill Notetag structure:

<Card Art Layers>
Layer1
Layer2
Layer3
</Card Art Layers>

Layer properties can be overridden inside these notetags with the following syntax:

<Card Art Layers>
LayerName (Priority): ImageName | X Y | Condition
</Card Art Layers>

<table><tbody><tr><td><strong>LayerName</strong></td><td>The name of the Layer whose values are being overridden. Can have spaces and is case-insensitive.</td></tr><tr><td><strong>Priority</strong></td><td>A number from 1 to 500 that overrides the default Priority of the layer. Note this will do nothing for Default Layers.</td></tr><tr><td><strong>ImageName</strong></td><td>The name of the image file to use for the Layer. Can have spaces.</td></tr><tr><td><strong>X</strong></td><td>The new X offset</td></tr><tr><td><strong>Y</strong></td><td>The new Y offset</td></tr><tr><td><strong>Condition</strong></td><td>The new condition for the Layer.</td></tr></tbody></table>

Each one of these components are optional. If a component is not present the Layer will use the default values defined through plugin parameters. The | dividers are still neccessary to override a later property if you aren't overriding an early one.

Example:

<Card Art Layers>
Dragon
HidingDragon (110)
AboveText: Red Dragon | | user.level > 5
SideDragon (410): SideDragon | 60 -10 | true
</Card Art Layers>

In the above example, the layer “Dragon” is using all of the values defined through the Custom Layers plugin parameter, so no other components need to be written out.

The “HidingDragon” layer has its Priority set to 110, which is above the Base Layer but below the Art Layer, overriding whatever previous values were set in plugin parameters.

The “AboveText” layer is overriding the Image and Condition components but leaving the Offset component to its default values.

The SideDragon layer is defining each individual component. In this case, SideDragon does not need to be defined through plugin parameters.

Now, in this above example, the Default Layers are not present in the list of Layers. They do not need to be as they are always present on the Card. However, you can include them in the notetags to override default values.

Example:

<Card Art Layers>
Base: DragonBase
Art: Dragon | 40 40
Highlight: | | false
</Card Art Layers>

In this example, we are overriding the images for both the Base and the Art Layers. We are also moving the Art Layer 40 pixels down and to the right. Finally, we are making the Highlight layer invisible. These changes apply only to the Skill in which these notetags are present.

Script Calls
------------

This table has a list of every Script Call from every plugin and what syntax and input is used.

| Script Call Syntax | Plugin Required | Project Usage | Description |
| --- | --- | --- | --- |
| 
\[Actor\].drawCards(x)

| Core Plugin | Skill, Item, Troop Event, Common Event | Will draw X cards from the Deck |
| 

\[Actor\].drawUntil(x)

| Core Plugin | Skill, Item, Troop Event, Common Event | Will draw cards from the Deck until there are X cards in Hand |
| 

\[Actor\].drawCardsOfSkillId(x)

| Core Plugin | Skill, Item, Troop Event, Common Event | Draws Card with Skill ID Y from Deck to Hand |
| 

\[Actor\].drawCardsOfSkillName(y)

| Core Plugin | Skill, Item, Troop Event, Common Event | Draw Card with Skill Name Y from Deck to Hand (e.g. “Punch”) |
| 

\[Actor\].discardCards(x)

| Core Plugin | Skill, Item, Troop Event, Common Event | Will prompt to Discard X Cards from Hand |
| 

\[Actor\].discardUntil(x)

| Core Plugin | Skill, Item, Troop Event, Common Event | Will prompt to Discard cards from Hand until X cards are left. If X is 0, will automatically discard all cards in Hand. |
| 

\[Actor\].removeCards(x)

| Core Plugin | Skill, Item, Troop Event, Common Event | Will prompt to Remove X Cards from Hand |
| 

\[Actor\].removeCardsUntil(x)

| Core Plugin | Skill, Item, Troop Event, Common Event | Will prompt to Remove Cards until X cards are left. If X is 0, will automatically remove all cards in Hand. |
| 

\[Actor\].millCards(x)

| Core Plugin | Skill, Item, Troop Event, Common Event | Puts the top X cards from Deck into their Discard. |
| 

\[Actor\].shuffleDeck()

| Core Plugin | Skill, Item, Troop Event, Common Event | Shuffles the user's Deck. |
| 

\[Actor\].addCardToZone(x, zone)

| Core Plugin | Skill, Item, Troop Event, Common Event | Adds Card with Skill ID X to target Zone (“hand”, “deck”, “discard”) |
| 

\[Actor\].moveCards(x, zone1, zone2)

| Core Plugin | Skill, Item, Troop Event, Common Event | Will move X cards from one Zone to another such as “hand”, “deck”, “discard” |
| 

\[Actor\].cardsInZoneOfType(zone, type)

| Card Types (Plugin) | Skill, Item, Troop Event, Common Event | This function can be used inside damage formulas, Evals, and Require notetags. It will return the amount of cards of the given type in the given zone. |

Depending on where the Script Call is being called, the variable for \[Actor\] will be different based on the context. When you are using these Script Calls in Skills & Items (either as a Card Action Eval or YEP Action Sequence Eval), \[Actor\] can be **user** (if referring to the User) or **target** (if referring to Allies). When using these Script Calls in Troop & Common Events, you will need to grab a direct reference to the \[Actor\] such as **$gameParty.leader()** or **$gameParty.members()\[1\]** in order to make these Script Calls.

**Note**: Trying to do Card Action Script Calls on Enemies will at the best of times have no effect and other times crash the game. This is because Enemies don't use Cards or have Decks (as of v1.6.0 of MYTH\_CGC\_CoreEngine)

tag-gloss.txt · Last modified: 2025/06/17 03:28 by isiahgames