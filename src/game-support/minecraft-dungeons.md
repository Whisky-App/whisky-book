# Minecraft Dungeons
<!-- script:Aliases [
    "MCDungeons"
] -->

{{#template ../templates/rating.md status=Borked installs=Yes opens=Yes}}

> [!WARNING]
> Minecraft Dungeons is currently **Unplayable** on macOS Sequoia 15.5
> Yes it start, but not the 3D engine (or kinda), also there's a little glitch in the login box (more details below)

## Setup
 - Install in Steam as normal.
 - Press anything and connect to your Microsoft account (the keyboard input in login box should work fine)
 - After a minute close the strange white box
 - Select a character do whatever you want

## What does work ? 
 - The whole games features seems to work (when it want)
 - Cloud saving, login, join/host lobby features works when the game assumes you've login properly
 - Offline game, keybinds, settings, characters & save file editors and many other work.
 - The mp4 for the beginning (Xbox x mojang video) play just fine whithout any glitches (audio & video)

## What doesn't work ?
 - The whole game's textures/shaders/effects won't ever show up, it's full dark.
 - In game cinematic like with the narator doesn't work, because it depends on the in games engine and it's currently Borked

## Example of the main menu and gameplay :
 - ![Capture d’écran 2025-05-18 à 02 53 28](https://github.com/user-attachments/assets/c5998490-3a91-497d-b8fb-34e852d0018a)
 - ![image](https://github.com/user-attachments/assets/a1aa5eb5-5902-41e0-aaf1-6232d7720754)
 - ![Capture d’écran 2025-05-18 à 02 53 30](https://github.com/user-attachments/assets/f22828b1-d1d2-46c2-9bde-c2c2832bd0b3)




> [!NOTE]
> - Set graphics to low or huge doesn't change anything to the bug, it just wont work at all
> - If someone found a fix to it, please share it and/or edit the doc, thanks in advance.
> - Installed, you can connect to your Microsoft account but the whole game is Unplayable even if the game can play sounds and HUD/UI, all 3D just won't work
> - Even if the game won't show the texture/shader/effect of a scene, the audio and the whole part of the engine work, which mean there's somehow a way to fix it by tellings custom arguments on launch or using winetricks but I'll test this out later.
> - Adding vcruntimes in different versions from 2008 to 2022 does nothing
> - Adding VKD3D or WineD3D or DXVK or use specific version doesn't seems to change something
> - Disabling DXVK in Whisky or use Asynx ON/OFF in DXVK settings in Whisky does nothing
> - Adding env variables to the steam.exe won't doesn't fix the issue
> - More En varriables below :


> Environnment variables :
> - MESA_GLSL_VERSION_OVERRIDE="450"
> - MESA_GL_VERSION_OVERRIDE="4.5"
> - WINEDLLOVERRIDES="d3d11=n;dxgi=n"

> Executable args :
> - %command% -noshaders -novsync

{{#template ../templates/steam.md id=1672970}}
