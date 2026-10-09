GFX - free JSFX plug-ins for REAPER
===================================

Designed by JGWizrad.
Website: https://www.gardenfx.uk/

99 plug-ins - instruments, drum machines, amps, dynamics, EQ, modulation,
space, mastering and summing - plus the CC-80 chord script. Every sound is
synthesised: there are no samples. All plug-ins share one look, resizable
S / M / L panels and the same output stage.

GFX is free to use, in commercial music too. It is donationware: if the
plug-ins earn a place in your sessions, you can support them at
https://ko-fi.com/jgwizrad


WHAT'S IN THE ZIP
-----------------

  gfx-*.jsfx        The plug-ins.
  gfx-*.jsfx-inc    Shared parts (the panel look, input and output stages,
                    drift and so on). The plug-ins will not load without them.
  GFX_CC-80.lua     CC-80, a chord-writing ReaScript (needs ReaImGui).
  Scripts/          MIDI export scripts for G Deep 16 and G PCM 12.
  Data/             Pattern files for G Pulse.
  Manuals/          A user manual for every plug-in. Open Manuals/index.html
                    in your web browser. Manuals/all.html has every manual on
                    one page, ready to print or save as a PDF.
  README.txt        This file.


INSTALLING
----------

1. Unpack the ZIP.

2. In REAPER choose Options > Show REAPER resource path in explorer/finder.
   Copy every .jsfx and .jsfx-inc file into the Effects folder there.
   A subfolder such as Effects/GFX is fine, as long as all the .jsfx and
   .jsfx-inc files sit together in the same folder.

3. Open the FX browser, press F5 to rescan, and search for GFX.
   The plug-ins are listed as "GFX" followed by their name (GFX Tandem,
   GFX G Lab80 and so on).

Instruments go on a track and play from MIDI. Effects go on any track, bus
or the master.

Optional extras:

  - G Pulse reads its pattern files from Data/gfx-drum-patterns. Copy that
    folder into the Data folder in REAPER's resource path.

  - For MIDI export from G Deep 16 and G PCM 12, load the scripts in Scripts/
    with Actions > Show action list > New action > Load ReaScript.

  - CC-80 needs the ReaImGui extension. Install it with ReaPack
    (Extensions > ReaPack > Browse packages, search for ReaImGui), restart
    REAPER, then load GFX_CC-80.lua the same way as the scripts above.


USING THE PLUG-INS
------------------

Most panels share a few habits:

  - Double-click a knob to reset it to its default.
  - Hover over a knob to see its current value.
  - S / M / L change the panel size; if the plug-in window is smaller, the
    panel shrinks to fit it.
  - PRESETS (or a click on the preset display) opens the factory presets;
    the < / > buttons beside it step through them.
  - ? shows the design credit and the website address.

Each manual describes its plug-in control by control, with its presets and
a few tips.


THE RANGE
---------

INSTRUMENTS
  G Arp           gfx-g-arpeggiator.jsfx   (MIDI arpeggiator, goes before a synth)
  G Bass 1X       gfx-g-bass-1x.jsfx
  G Chip 48       gfx-g-chip.jsfx
  G Cosmos        gfx-g-cosmos.jsfx
  G Ensemble      gfx-g-ensemble.jsfx
  G Glow          gfx-g-glow.jsfx
  G Harbour Keys  gfx-g-harbour-keys.jsfx
  G Lab80         gfx-g-lab80.jsfx
  G Lead 8        gfx-g-lead-8.jsfx
  G M1K           gfx-g-m1k.jsfx
  G Pocket 70     gfx-g-pocket-70.jsfx
  G Rainbow       gfx-g-rainbow.jsfx
  G Tonewheel     gfx-g-tonewheel.jsfx
  G Voce 90       gfx-g-voce-90.jsfx

DRUM MACHINES
  G Anvil         gfx-g-anvil.jsfx
  G Byte 6        gfx-g-byte-6.jsfx
  G Clockwork     gfx-g-clockwork.jsfx
  G Deep 16       gfx-g-deep.jsfx
  G PCM 12        gfx-g-pcm12.jsfx
  G Pulse         gfx-g-pulse.jsfx

AMPS & DRIVE
  Bass Head       gfx-bass-head.jsfx
  Desert Ten      gfx-desert-ten.jsfx
  Grunt           gfx-grunt.jsfx
  Guitar Head     gfx-guitar-head.jsfx
  Head            gfx-head.jsfx
  Model 15        gfx-model-15.jsfx
  Model 44        gfx-model-44.jsfx
  PenguinDrive    gfx-penguindrive.jsfx
  Preamp          gfx-preamp.jsfx
  Preamp Q        gfx-preamp-q.jsfx
  Ten Rack        gfx-ten-rack.jsfx
  TS-7            gfx-ts7.jsfx

DYNAMICS
  Compressor      gfx-compressor.jsfx
  Compressor Q    gfx-compressor-q.jsfx
  Console         gfx-console.jsfx
  Console Q       gfx-console-q.jsfx
  De-Ess          gfx-de-ess.jsfx
  Duplex          gfx-duplex.jsfx
  Duplex Q        gfx-duplex-q.jsfx
  Gate            gfx-gate.jsfx
  Headsmoother    gfx-headsmoother.jsfx
  MK3             gfx-mk3.jsfx
  Quad11          gfx-quad11.jsfx
  RND             gfx-rnd.jsfx
  Smooth          gfx-smooth.jsfx
  Squish          gfx-squish.jsfx
  Strip 102       gfx-strip-102.jsfx
  Tandem          gfx-tandem.jsfx
  Tandem Q        gfx-tandem-q.jsfx
  Thrust          gfx-thrust.jsfx
  Transient       gfx-transient.jsfx
  Twin Comp       gfx-twin-comp.jsfx
  VB30            gfx-vb30.jsfx
  Wingspan        gfx-wingspan.jsfx

EQ & FILTERS
  Baxendale       gfx-baxendale.jsfx
  Bern EQ         gfx-bern-eq.jsfx
  Board EQ        gfx-board-q.jsfx
  Contour         gfx-contour.jsfx
  Equaliser       gfx-equaliser.jsfx
  Graphic EQ      gfx-graphic-eq.jsfx
  Skye            gfx-skye.jsfx
  Surgical EQ     gfx-surgical-eq.jsfx
  Tilt EQ         gfx-tilt-eq.jsfx
  TransEQ         gfx-transeq.jsfx

MODULATION & SPACE
  ADPMod          gfx-adpmod.jsfx
  Autopan         gfx-autopan.jsfx
  Chopper         gfx-chopper.jsfx
  Chorus          gfx-chorus.jsfx
  Dynatron        gfx-dynatron.jsfx
  E-Delay         gfx-e-delay.jsfx
  E-Verb          gfx-e-verb.jsfx
  Echo 34         gfx-echo-34.jsfx
  Echofish        gfx-echofish.jsfx
  Echomax         gfx-echomax.jsfx
  Flanger         gfx-flanger.jsfx
  Haas Doubler    gfx-haas-doubler.jsfx
  Ivans Echo      gfx-ivans-echo.jsfx
  J-Delay         gfx-j-delay.jsfx
  J-Verb          gfx-j-verb.jsfx
  Mid/Side        gfx-midside.jsfx
  Mod Rack        gfx-modrack.jsfx
  Oontecho        gfx-oontecho.jsfx
  Phaser          gfx-phaser.jsfx
  Polyvibe        gfx-polyvibe.jsfx
  Rotary          gfx-rotary.jsfx
  Space           gfx-space.jsfx
  Squashball      gfx-squashball.jsfx

MASTERING
  Aureus          gfx-aureus.jsfx
  Benthick 3B     gfx-benthick-3b.jsfx
  Master EQ       gfx-master-eq.jsfx
  MasterSuite     gfx-mastersuite.jsfx
  Optimiser       gfx-optimiser.jsfx
  Quad22          gfx-quad22.jsfx

SUMMING
  Bern 16         gfx-bern-16.jsfx
  Cassette 4      gfx-cassette-4.jsfx
  Compact 12      gfx-compact-12.jsfx
  Lustre          gfx-lustre.jsfx
  M-Sum           gfx-m-sum.jsfx
  Stage 8         gfx-stage-8.jsfx

MIDI TOOLS
  CC-80           GFX_CC-80.lua            (ReaScript, needs ReaImGui)


TROUBLESHOOTING
---------------

  - A plug-in shows an error about a missing file: the .jsfx-inc files are
    not in the same folder as the .jsfx files. Copy them all together.
  - The plug-ins don't appear in the FX browser: press F5 in the FX browser
    to rescan, or restart REAPER.
  - The text is too small: click L for the large panel, and make the
    plug-in window big enough to show it at full size.


Thanks for using GFX.
JGWizrad
