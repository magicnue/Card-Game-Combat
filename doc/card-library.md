Title: card-library \[Card Game Combat - Documentation\]

Keywords: card-library   

card-library

### Table of Contents

*   Card Library

*   Parameters

*   Notetags

Card Library
============

The Card Library is alters the Skill Menu to show the Deck of Cards each Actor has. It comes in two modes: **Simple View** and **Regular View**.

<table><tbody><tr><td><a href="/lib/exe/fetch.php?tok=6f000b&amp;media=https%3A%2F%2Fcdn.discordapp.com%2Fattachments%2F235557488794009600%2F1090895416867962911%2Fimage.png" class="media" title="https://cdn.discordapp.com/attachments/235557488794009600/1090895416867962911/image.png"><img src="/lib/exe/fetch.php?w=400&amp;tok=f56fdb&amp;media=https%3A%2F%2Fcdn.discordapp.com%2Fattachments%2F235557488794009600%2F1090895416867962911%2Fimage.png" class="media" loading="lazy" alt="" width="400"></a></td><td><a href="/lib/exe/fetch.php?tok=f970f3&amp;media=https%3A%2F%2Fcdn.discordapp.com%2Fattachments%2F235557488794009600%2F1090895526473510932%2Fimage.png" class="media" title="https://cdn.discordapp.com/attachments/235557488794009600/1090895526473510932/image.png"><img src="/lib/exe/fetch.php?w=400&amp;tok=c29f83&amp;media=https%3A%2F%2Fcdn.discordapp.com%2Fattachments%2F235557488794009600%2F1090895526473510932%2Fimage.png" class="media" loading="lazy" alt="" width="400"></a></td></tr><tr><td><strong>Simple View</strong> shows every card in the actor’s possession one-by-one.</td><td><strong>Regular View</strong> shows only one instance of each card in the library, with a counter underneath for how many of that card the actor possesses.</td></tr></tbody></table>

Parameters
==========

<table><tbody><tr><td><strong>Replace Skill Menu With Library</strong></td><td>If set to ON, the Skill option in the Menu will go to the Card Library scene instead of the Skill scene. This was the behaviour for version 1.2.2 and below.</td></tr><tr><td><strong>Show Card Library in Menu</strong></td><td>If set to ON, the Card Library will be an option in the Menu. This parameter is ignored if Replace Skill Menu With Library is set to ON.<br><br>It is worth noting that this sets the default behaviour of the Menu, which can be changed through Plugin Commands.</td></tr><tr><td><strong>Card Library Menu Text</strong></td><td>This is the text that displays in the Menu which opens the Card Library.</td></tr><tr><td><strong>Simple View</strong></td><td>If set to ON, the scene will be in Simple View mode.</td></tr><tr><td><strong>Show Missing Cards in Library</strong></td><td>If set to ON, will show blacked-out versions of the cards in the game which are not in the actor’s possession. This will only happen in Regular View mode. Any skill whose name is blank will also be hidden from the library.</td></tr></tbody></table>

Notetags
========

You can also use the following notetag to hide specific skills from the library:

<Hide from Card Library>

Place this inside a skill’s notetag and it will not be present in the Skills menu even if the actor has it in their deck. This notetag only works in Regular View mode.

card-library.txt · Last modified: 2023/03/30 09:11 by banerjeesw