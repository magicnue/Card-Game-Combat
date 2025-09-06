Title: plugin-core \[Card Game Combat - Documentation\]

Keywords: plugin-core   

plugin-core

### Table of Contents

*   Parameters

*   Plugin Commands

*   Notetags

*   Actions

*   Passives

*   Version History

**MYTH\_CGC\_CoreEngine** is the Core Engine plugin for RPG Maker MV & MZ that converts Skills into Cards and changes the battle system to utilize them similar to roguelike deckbuilder games.

This plugin is required for all other CGC Plugins to work. It can function standalone but the supporting plugins add features that greatly improve the experience of making and playing card games. You can find this plugin as part of the Main Plugin Suite.

**Current Version: 1.6.2**

Parameters
----------

**Start Actions & Max Hand Size**

These parameters set the Card Actions that actors execute at the start of their turns. See Battle Start/Turn Start for more information.

The Max Hand Size determines how many cards can be in an actor's hand before the game starts ignoring Draw actions. If set to -1, actors will have no max hand size.

**Card Appearance**

This section contains various settings that change cards' appearance, including text component locations. See Card Customization.

**UI Order**

This section contains settings for the appearance and functionality of Card Zones and Buttons. See Card Zones.

**Change Battle Windows**

See ????.

**General Sounds**

This section allows you to specify SEs to play when specific Card Actions are used. Most SE settings are found inside specific Zone settings, but General Sounds play regardless of the zone affected.

**Card Selection Window**

This section contains settings for the appearance of the Card Selection Window, which is the window that appears when you peek at a Zone's cards or when selecting cards through Card Actions. See Action Pack 1 for selection Card Actions.

**Card Library**

This section contains settings for the Card Library scene. See Card Library.

Plugin Commands
---------------

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

Notetags
--------

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

Actions
-------

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

Passives
--------

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

Version History
---------------

Version Changes up to the major update. See _Full History_ here.

\*\*v1.6.4\*\*
- Fixed niche crash involving the lack of Card Target Actions.
- Fixed bug with message warning for moving to an unknown zone.
- Forced actions are now either better or worse.
- Fix for Card Summons that makes Start of Turn Field work for the enemy without taking up their actions.
- Fixed bug that would cause auto battlers to play Start of Battle/Start of Turn Card Actions.
- The Hand Zone's Targeting Offset is now a struct and the X component works regardless of whether Move Card to Target? is ON.

\*\*v1.6.3\*\*
- Added Window Word Wrap parameter.
- Added End Turn/Discard/Remove description parameters instead of using the End Turn Button Skill's description for all 3.
- Fixed crash if MV users are using the old ShowCard plugin.
- Fixed default bitmap loading properly in MZ if Default.png is not present in project.
- Cards now appear properly in the Deck on battle start if the  Deck's "Show cards?" parameter isn't set to "No."
- Cards now properly shuffle while their zones' "Show Cards?" parameter isn't set to "No."
- Added image culling along the edges of Library windows, should be a huge visual improvement for MZ in particular.
- Fixed Deck zone not using the Skew property.
- Fixed typo in MZ plugin command
- Fixed crash if using YEP\_SkillCore but not YEP\_MessageCore Help Window now always displays proper ICV values regardless of scene.
- Fixed bug where actors will execute their start-of-battle Card Actions twice if the actor before them is dead or cannot move.
- The Action Failure message in the Battle Log no longer displays when using a skill that has Card Actions.
- Setting Origin Badges to false now prevents cards being separated by their Origin in Library type scenes.
- Added "None" option to Card Removal Animation.
- Added several Card Library parameters that were previously in Card Library Plus.
- Fixed bug where the If Action wouldn't work inside Empty Zone Actions.
- Fixed bug with Card Target Actions that would cause two actors to swap hands in MZ. This bug would also cause the used card to go to the wrong discard in MV. Same cause, different outcomes!
- Fixed MZ bug where "Move this to Hand" wouldn't allow you to use the card twice in a row.
- Fixed bug where extra zones wouldn't update what cards were visible when it was a different actor's turn.
- Changing classes now replaces learned cards from the previous class with cards belonging to the new class.
- Added compatbility with YEP\_ClassChangeCore.
- Fixed MZ touch input bug that would strangely let you hover over and click cards/buttons/zones when your mouse was at the top of the screen in battle.
- Fixed similar bug for the Library scenes.
- Added Scale parameters to the Hand Zone.
- Added Move Card to Target parameter to the Hand Zone.
- Temp Fix for forced actions that end the turn not properly ending it. The code is bad and will be improved in the future.
- Forced actions are now either better or worse.
- New warning system comes with error codes so that warnings can be translated into multiple languages.

\*\*v1.6.2\*\*
- Consolidated ShowCard into the Core Engine.
- Removed several duplicate parameters that are present in Text Format Plus.
- Cost X coordinate is now left-aligned. Added Cost Width param to compensate.
- Replaced Highlight Sprite with Highlight Sheet, which now includes a Remove variant.
- Added Remove variant of the End Turn Button
- Moved button images to img/CGC/buttons
- Moved highlight images to img/CGC/highlights
- Added Origin Badges to the Card Library which display where a Card came from.
- Added a few other parameters to determine which Cards are shown in the Library.
- Cards of different Origins now appear separately in the Library
- Default Card is now preloaded on boot, almost all card-based calculations are now based on this image.
- Amount Text in Libraries is now handled by a new class Window\_CardAmount, which offers more flexibility.
- Card Sprite hitboxes have been fixed and now scale with the image's scale.
- Zone Sprites no longer create Card Highlights that go unused.
- Fixed math error in Hand positioning that makes cards improperly centered.
- New parameter Skip Party Command allows you to skip the Party Command Window
- Fixed bug where End of Turn: Skill X triggers twice
- Fixed bug where Start of Turn: Skill X wouldn't trigger properly.
- Skills Learned during battle now stay in the Actor's Library.
- Fixed bug where Actor could "forget" Cards gained through equipment or states.
- Library Scene has been revamped entirely. Lots of UI improvements.
- The Scrollbar is now in every Library-type scene.
- Fixed bug where Card Sprites wouldn't spawn in Library if Card Battle was disabled.
- Fixed crash when failing to flee from a battle using the Party Window before the opening hand has been drawn.
- Lots of backend refactoring.
- Better error handling and conveyance to the user.
- Behavior specific to Window\_BattleSkill has been removed from Window\_SkillList
- Cards are now added to a CardLayer object which inherits behavior from WindowLayer.
- Card Highlight sprites are now a new class Sprite\_CardHighlight instead of just basic Sprite objects. Trust me, the code is cleaner now.
- CoreEngine is now over 10,000 lines. 

\*\*v1.6.1\*\*
- Added Skip Party Command Menu plugin parameter.
- Simple View in the Card Library will now show Var values when using MYTH\_CGC\_IndependentCardVariables.
- Fixed bug where Zone names weren't properly case-sensitive.
- Fixed bug with YEP\_BattleEngineCore that would break card forced actions.
- Fixed bug with card forced actions that would sometimes discard a card on execution.
- Fixed bug where card forced actions would interrupt empty zone actions.
- Fixed Jump Card Action not working within Card Target Actions
- Fixed MZ touch input crash when hovering over zone sprites.
- Fixed MZ plugin commands not working.
- Fixed crash if skills force actions when no target is available.
- Fixed MZ bug where status windows would fail to appear/disappear when navigating item selection in battle.
- Fixed MV touch input bug where zone images' hitboxes would be based on the entire sheet instead of just the visible sprite.
- Added MV compatibility with SDJB\_MouseHover and TDDP\_MouseSystemEx
- Fixed bug with YEP\_X\_BattleSysSTB that would cause actors to repeat their Start of Turn Card Actions.
- Extra error handling for improved compatibility with other plugins

\*\*v1.6.0\*\*
- Zone params are now structs.
- Added custom zones.
- Will End Turn is now a Card Passive
- Remove this is now a Card Action
- New Card Action: Move this to \[zoneName\], moves the currently used card to the specified zone.
- Resolving used cards has been changed. Card is now removed from hand, its effects play, and then it is moved to the discard. Use
- "Move this" CA to move the card early.
- Deck and Discard sprites now take sheets instead of individual images. Custom zones as well.
- Cards getting put into the discard from the hand and then reshuffled into the deck will now travel directly to the deck from the hand instead of appearing as duplicates.
- New CAs parameter for when a zone is empty, replacing the automatic reshuffle. These CAs are executed when the zone is emptied, and again at the end of the action if the zone is still empty.
- End Turn Button and Item Button params are now structs.
-  IsiahCGCCardSelection and IsiahCGCConditionalCardActions have been consolidated into the main plugin. Parameters have been moved and added as necessary.
- IsiahCGCExtraButtons has been consolidated into the main plugin.
- Lots and lots of parameter changes.
- New Card Action: Play SE \[soundName\]
- Zones have Sound Effects parameters for when a card enters/exits.
- New parameters for several other SEs.
- New parameter for smooth scaling.
- Skip Actor Command Menu parameter now plays nice with PartyUI\_TypeA
- Removed a lot of case sensitivity for various things
- Fixed touch input bug in MZ when scrolling through the library where the vertical scrolling way too sensitive.
- Fixed bug that prevented turn from ending properly after forced actions.
- Fixed bug that would break text color changing on cards in MZ.
- Fixed touch input bug in MZ with extra buttons.
- Backend Refactoring.
- Removed legacy functions
- Renamed from IsiahCardGameCombat to MYTH\_CGC\_CoreEngine

plugin-core.txt · Last modified: 2025/07/03 23:00 by isiahgames