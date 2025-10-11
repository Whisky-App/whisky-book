# Minecraft Dungeons
<!-- script:Aliases [
    "MCDungeons"
] -->

{{#template ../templates/rating.md status=Garbage installs=Yes opens=Yes}}

> [!WARNING]
> Minecraft Dungeons is currently **Unplayable** on macOS Sequoia 15.5
> Yes it starts, but not the 3D engine (or kinda), also there's a little glitch in the login box. More details:
> - The whole game's textures/shaders/effects won't ever show up, it's full dark.
> - In game cinematic like with the narator doesn't work, because it depends on the in games engine and it's currently Garbage.

> [!NOTE]
> - The whole game features seem to work (when they want).
> - Cloud saving, join/host lobby features work when the game assumes you've logged in properly.
> - Offline game, keybinds, settings, characters & save file editors and many other work.
> - The MP4 for the beginning (Xbox & Mojang video) play just fine whithout any glitches (audio & video).
> - Even if the game won't show the texture/shader/effect of a scene, the audio and the whole part of the engine work, which mean there's somehow a way to fix it by tellings custom arguments on launch or using Winetricks.

## Setup
- Install in Steam as normal.
- Installed, you can connect to your Microsoft account (the keyboard input in login box should work fine) but the whole game is Unplayable even if the game can play sounds and HUD/UI, all 3D just won't work.
- After a minute close the strange white box.
- Environnment variables worth setting up:
  > MESA_GLSL_VERSION_OVERRIDE="450"<br>
  > MESA_GL_VERSION_OVERRIDE="4.5"<br>
  > WINEDLLOVERRIDES="d3d11=n;dxgi=n"<br>
- Executable args:
  > %command% -noshaders -novsync

## Example of the main menu and gameplay :
![Capture d’écran 2025-05-18 à 02 53 28](https://github.com/user-attachments/assets/c5998490-3a91-497d-b8fb-34e852d0018a)

![image](https://github.com/user-attachments/assets/a1aa5eb5-5902-41e0-aaf1-6232d7720754)

![Capture d’écran 2025-05-18 à 02 53 30](https://github.com/user-attachments/assets/f22828b1-d1d2-46c2-9bde-c2c2832bd0b3)

{{#template ../templates/steam.md id=1672970}}
