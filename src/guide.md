# A Hitchhiker's Guide to Whisky

Glad you're here. Here's how to get up and running in a breeze.

1. [Download Whisky](https://github.com/IsaacMarovitz/Whisky/releases)
2. Move Whisky to your Applications folder
3. Open Whisky
4. Follow on-screen instructions

**Everything is now installed!**

## Making your first bottle

Bottles are the bread and butter of Wine. Bottles are like little Windows filesystems, and they appear on your computer as a normal folder.
In a bottle, you'll find programs, registry files, and everything else you need to install and configure your Windows 'machine'.
Each bottle is self-contained and will only have the programs you installed in that bottle.

1. Press the plus button in the top right-hand corner
2. Give your bottle a name, and select the Windows version you want
3. Hit `Create` and wait a few seconds. When your bottle is ready, it'll appear in the list on the left-hand side

## Installing your first program

Programs are installed much like you would on a regular Windows machine.

1. Download the program you want to run. It should be the *Windows* version (`.exe` or `.msi`);
   > 64-bit programs are preferable.
2. Click on the bottle you want to install your program into
3. Press the `Run...` button in the bottom right
4. Navigate to where you downloaded your `.exe` or `.msi` file in Finder
5. Select the file and press `Open`

Whisky will then open and run the program. It may take a few seconds for the window to appear, so be patient.

## Configuring your bottle

In the `Config` menu of your bottle, you can adjust a number of parameters,
including the Windows version and build the number of your bottle, enable and disable the Metal HUD,
configure ESync, and open Wine's many configuration tools like the Control Panel, Registry Editor, and Wine Configuration dialogues.

## When should I make a new bottle?

The usual convention is to limit a bottle to one game, as dependencies and such can get messy with more installed in one place.
If a game requires more extensive configuration to get working, it's usually a good idea to keep it contained.
Overall, trust your judgment and separate where it feels right.

For Steam games, you can create one shared Windows game library that you use between all of your bottles.
This helps keep your game installations detached from your bottle instances,
so you won't have to re-download everything if your bottle mucks up.