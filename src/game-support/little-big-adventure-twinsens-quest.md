# Little Big Adventure – Twinsen’s Quest
<!-- script:Aliases [] -->

{{#template ../templates/rating.md status=Bronze installs=Yes opens=Yes}}

## Setup

- A patch is required to make the game run. Patching `Rewired_WindowsGamingInput.dll` found under the data directory in `Plugins/x86_64` makes the game run, although some issues surrounding use of controllers remain. The function `Core_IsAPISupported` in the aforementioned DLL needs to be patched to always return false. This prevents calling an API that isn't implemented.

- For the DLL with SHA256 `946478c5e8f61cbe75c6d70e3aabe2766126605cba45ddb579a5ef38fb198e98` three bytes at offset 0x600 need to be changed to `b0 00 c3`. The resulting file should have a SHA256 of `954fa6b2960b2567797f061ec11131d026c1c640e5dfb8e9d4d2bae593151d36`.

> [!WARNING]
> - Game crashes when run without modification.
> - If patched using the steps below the game is playable through the end, with all cutscenes playing correctly and no graphical corruption observed. Playing with a controller sometimes makes Twinsen perform an action continuously. This issue only occurs when loading or starting a game and is resolved by quitting and restarting the game.

{{#template ../templates/steam.md id=2318070}}
