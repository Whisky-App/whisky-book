# Debugging

Debugging in Wine can be difficult, but Whisky comes equipped with some tools and tricks to make the process a bit easier.

## Making Metal GPU Captures

> [!IMPORTANT]
> Debugging GPU issues experienced under Wine on macOS can be an arduous task.
> This guide will assume that you have prior experience with Xcode, LLDB, and Metal GPU tools.

1. In Xcode, create a new empty macOS project. This will be used to attach to the process but the project itself used does not matter. 
2. Enable both `Metal HUD` and `Metal Trace` in your Bottle Configuration 
3. Launch the intended target in Whisky
4. Open `Activity Monitor` and find the `PID` of `wine64-preloader` process that is utilising the GPU
5. In Xcode click on `Debug > Attach to Process by PID or Name...`
6. Type in the `PID` of the target process and press `TAB` so that Xcode recognises that you've changed the value of the field.
7. Leave the rest of the options as their defaults and press `Attach`

> [!WARNING]
> This is the step where things are most likely to go wrong.
> Have patience, it may take several attempts, or it may not work at all for your target program.
> Being stopped at a `SIGUSR1` signal is normal. If you get a `EXC_BAD_ACCESS` or other error the next steps will not work.

8. In the LLDB console run `pro hand -p true -s false SIGUSR1` and then `continue`
9. In the bar above the LLDB console there should be a Metal logo. 

> [!WARNING]
> If it hs not appeared Xcode has not detected the GPU workload for this process, and you will not be able to create a capture.

10. Click on the Metal logo and adjust the scope and count as needed and press `Capture`

> [!WARNING]
> Metal GPU captures can grow very quickly in size for complex titles.
> Captures larger than the amount of RAM available on your system will likely crash and be unusable.

If all has gone to plan, you will now have a full Metal GPU capture of the target Wine process,
allowing you to debug graphics issues with the same tools you would use for a native macOS title.
These same steps should work regardless of graphics API i.e. DX12, DX11, Vulkan, or OpenGL.