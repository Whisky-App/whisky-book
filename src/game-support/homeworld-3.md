# Homeworld 3
<!-- script:Aliases [] -->

{{#template ../templates/rating.md status=Platinum installs=Yes opens=Yes}}

## Setup

- Install in Steam as normal.
- In Whisky, find `Homeworld3.exe` in the Installed Programs list and run it.

> [!WARNING]
> The game crashes on start if DXVK enabled. Disable DXVK in the Whisky Bottle Configuration if reusing a DXVK Steam bottle.

## Steam Performance Tweaks

Changing the following Steam settings improved the FPS by 5-10:
- Steam Settings -> Broadcast -> Privacy setting => Broadcasting Disabled.
- Steam Settings -> Remote Play -> Enable Remote Play => False.
- Library -> Homeworld 3 (right click) -> Properties -> Launch Options => `-nojoy`.

## Mac Performance

The below table shows the FPS for the in-game benchmark of an intense battle at varied Overall Video Quality.
FPS varies greatly depending on the number of objects and effects on screen. 
These tests were run on an Apple M3 Max with 128 GB RAM, 16 CPU cores, and 40 GPU cores.
The configuration included Windows 10, DXVK disabled, Retina enabled, MSync enabled, and the previously mentioned Steam tweaks.

| Quality | Resolution | FPS Min | FPS Avg | FPS Max |
|---------|------------|---------|---------|---------|
| Low     | 3840x2160  | 37      | 56      | 92      |
| Low     | 2560x1440  | 41      | 75      | 117     |
| Low     | 1920x1080  | 43      | 76      | 117     |
| Medium  | 3840x2160  | 23      | 37      | 53      |
| Medium  | 2560x1440  | 26      | 58      | 112     |
| Medium  | 1920x1080  | 21      | 59      | 115     |
| High    | 3840x2160  | 14      | 26      | 37      |
| High    | 2560x1440  | 17      | 41      | 79      |
| High    | 1920x1080  | 17      | 46      | 102     |
| Epic    | 3840x2160  | 15      | 20      | 26      |
| Epic    | 2560x1440  | 21      | 36      | 64      |
| Epic    | 1920x1080  | 19      | 41      | 83      |

Other notes:
- To run the benchmark yourself, go to the video settings, apply the desired settings, and hit the `Run Benchmark` button.
- Changing the upscale algorithm in the video settings had no noticeable effect on FPS.
- Epic quality seemed to hurt FPS without much more detail.

{{#template ../templates/steam.md id=1840080}}
