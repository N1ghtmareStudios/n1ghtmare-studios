# TENDRIL — design notes

*Side project concept, parked while Warpack ships. Captured 2026-08-09.*
*Playable graphics prototype: [n1ghtmarestudios.com/tendril.html](https://n1ghtmarestudios.com/tendril.html)*

## One-liner

An autobattler where the armies are living organisms — GPU slime-mold
colonies that grow, swarm and eat each other's territory. No grids, no
unit sprites: the battlefield looks like a warring nervous system.

## Why it stands out

- **Nothing else looks like this.** Every autobattler is figures on a
  grid with health bars. Tendril screenshots are unmistakable.
- **Readability IS the graphics.** You literally see why you lost: your
  front collapsed there, their vortex swallowed your supply line there.
- **The lab is the demo.** The website prototype already proves the
  visuals and the core toys (war mode, bombs, vortex, collapse,
  magnets, seeding) on a phone at 60 fps.

## Core loop (autobattler)

1. **Draft** — pick a species (= parameter profile: sensor range, turn
   rate, speed, decay, deposit) and buy mutations/abilities with a
   shared resource.
2. **Placement** — starting clusters, permanent magnets, and scripted
   triggers ("bomb the strongest enemy front at 0:30", "collapse center
   when below 40% territory") on maps with terrain: food pockets, dead
   zones.
3. **Battle** — 60–90 s deterministic simulation. Territory = score.
   Player watches; replay is shareable.
4. **Progress** — ladder of ghost opponents (see below), unlock
   mutations, refine builds. Build-sharing is the metagame.

## Species sketches (from the lab presets)

- **Veins** — thick slow mycelium; tanky, holds ground.
- **Weave** — long-range lace; fast expansion, fragile fronts.
- **Storm** — boiling cells; aggressive churn, burns out fast.
- Mutations tweak the same knobs the lab sliders expose today.

## Multiplayer without servers

Same async model as Warpack:

- Simulation is **deterministic**: fixed timestep + hashed RNG (the
  lab's update shader already works this way).
- An opponent is just their **build + input timeline** — a few kB of
  JSON. Battles replay locally, bit-identical.
- Modes: async ladder vs downloaded builds (core), "beat my run" ghost
  challenges (spice). Real-time PvP can come post-1.0 if it earns it.

## Tech port

- Web prototype = WebGL2 transform feedback + RG16F trail field.
- Unity: trail field as RenderTexture, agents in a ComputeBuffer, same
  rules in an HLSL compute shader (~300 lines core). Desktop GPUs run
  millions of agents vs the lab's 10k cap.
- Two-team field (RG channels), forces (bomb/vortex/collapse/magnet),
  chromatic shockwaves and palette LUTs all exist in tendril.html and
  translate 1:1.

## Name candidates

**Tendril** (front-runner — the lab already carries it), Bloodroot,
Hollowroot, Sporebound, Veinfall, The Rot. Check Steam collisions
before committing.

## Priority

**Warpack first.** Tendril is the reward after October's Next Fest.
