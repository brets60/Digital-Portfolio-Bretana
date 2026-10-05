"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { techSkills } from "@/lib/data";
import { playClickSound } from "@/lib/audio";
import { Sparkles, RefreshCw, LayoutGrid, Zap } from "lucide-react";

export function PhysicsTechStack() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const containerSectionRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"physics" | "grid">("physics");

  const filteredSkills =
    activeCategory === "all"
      ? techSkills
      : techSkills.filter((s) => s.category === activeCategory);

  // Initialize Matter.js physics engine with performance optimizations
  useEffect(() => {
    if (viewMode !== "physics" || !sceneRef.current) return;

    const container = sceneRef.current;
    const width = container.clientWidth;
    const height = Math.max(container.clientHeight, 480);

    const {
      Engine,
      Render,
      Runner,
      Bodies,
      Composite,
      Mouse,
      MouseConstraint,
      Body,
      Vector,
    } = Matter;

    const engine = Engine.create({
      gravity: { x: 0, y: 0.8, scale: 0.001 },
      positionIterations: 4, // Tuned for high FPS without physics stutter
      velocityIterations: 4,
    });
    engineRef.current = engine;

    const render = Render.create({
      element: container,
      engine: engine,
      options: {
        width: width,
        height: height,
        wireframes: false,
        background: "transparent",
        showVelocity: false,
      },
    });
    renderRef.current = render;

    // Boundaries
    const wallOptions = {
      isStatic: true,
      render: { visible: false },
    };

    const ground = Bodies.rectangle(width / 2, height + 30, width * 2, 60, wallOptions);
    const leftWall = Bodies.rectangle(-30, height / 2, 60, height * 2, wallOptions);
    const rightWall = Bodies.rectangle(width + 30, height / 2, 60, height * 2, wallOptions);
    const ceiling = Bodies.rectangle(width / 2, -150, width * 2, 60, wallOptions);

    Composite.add(engine.world, [ground, leftWall, rightWall, ceiling]);

    // Create Tech Skill Bodies
    const skillBodies = filteredSkills.map((skill, index) => {
      const radius = 36 + Math.random() * 6;
      const startX = Math.random() * (width - 160) + 80;
      const startY = -40 - index * 35;

      const body = Bodies.circle(startX, startY, radius, {
        restitution: 0.7,
        friction: 0.1,
        frictionAir: 0.015,
        density: 0.002,
        render: {
          fillStyle: "#101622",
          strokeStyle: skill.color,
          lineWidth: 2,
        },
      });

      (body as unknown as { skillData: typeof skill; radius: number }).skillData = skill;
      (body as unknown as { skillData: typeof skill; radius: number }).radius = radius;

      return body;
    });

    Composite.add(engine.world, skillBodies);

    // Mouse constraint
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Optimized Canvas Label Renderer (WITHOUT heavy shadowBlur)
    Matter.Events.on(render, "afterRender", () => {
      const context = render.context;
      if (!context) return;

      skillBodies.forEach((body) => {
        const { skillData, radius } = body as unknown as {
          skillData: typeof skillBodies[0] extends infer T ? any : any;
          radius: number;
        };
        if (!skillData) return;

        const { x, y } = body.position;

        context.save();
        context.translate(x, y);
        context.rotate(body.angle);

        // Body circle fill
        context.beginPath();
        context.arc(0, 0, radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(13, 17, 26, 0.92)";
        context.fill();

        // Neon border ring (crisp stroke with zero CPU shadow blur)
        context.strokeStyle = skillData.color;
        context.lineWidth = 2;
        context.stroke();

        // Outer subtle translucent ring for neon effect (100x faster than shadowBlur)
        context.beginPath();
        context.arc(0, 0, radius + 2, 0, Math.PI * 2);
        context.strokeStyle = "rgba(255, 255, 255, 0.1)";
        context.lineWidth = 1;
        context.stroke();

        // Skill Name Text
        context.fillStyle = "#FFFFFF";
        context.font = "bold 12px Space Grotesk, sans-serif";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(skillData.name, 0, -4);

        // Experience Badge
        context.fillStyle = skillData.color;
        context.font = "10px JetBrains Mono, monospace";
        context.fillText(skillData.experience, 0, 11);

        context.restore();
      });
    });

    // Explosive impulse on canvas click
    const handleCanvasClick = (e: MouseEvent) => {
      playClickSound();
      const rect = render.canvas.getBoundingClientRect();
      const clickPos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      skillBodies.forEach((body) => {
        const forceDirection = Vector.sub(body.position, clickPos);
        const distance = Vector.magnitude(forceDirection) || 1;
        const normalized = Vector.normalise(forceDirection);
        const forceMagnitude = Math.min(0.06, 30 / (distance + 50));

        Body.applyForce(body, body.position, {
          x: normalized.x * forceMagnitude,
          y: normalized.y * forceMagnitude - 0.02,
        });
      });
    };

    render.canvas.addEventListener("click", handleCanvasClick);

    // Run Engine & Renderer
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);
    Render.run(render);

    // Pause physics engine when off-screen to preserve 100% CPU/GPU for other sections!
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runner.enabled = true;
          } else {
            runner.enabled = false;
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerSectionRef.current) {
      observer.observe(containerSectionRef.current);
    }

    // Resize Handler
    const handleResize = () => {
      if (!container || !render) return;
      const newWidth = container.clientWidth;
      render.canvas.width = newWidth;
      Matter.Body.setPosition(ground, { x: newWidth / 2, y: height + 30 });
      Matter.Body.setPosition(rightWall, { x: newWidth + 30, y: height / 2 });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      render.canvas.removeEventListener("click", handleCanvasClick);
      Render.stop(render);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
      if (render.canvas && container.contains(render.canvas)) {
        container.removeChild(render.canvas);
      }
    };
  }, [viewMode, activeCategory]);

  const handleResetPhysics = () => {
    playClickSound();
    setActiveCategory((prev) => (prev === "all" ? "frontend" : "all"));
    setTimeout(() => setActiveCategory("all"), 50);
  };

  return (
    <section
      id="skills"
      ref={containerSectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-[2px] bg-amber-400" />
            <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">
              Technical Arsenal
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Interactive <span className="text-gradient-cyan">Tech Physics Arena</span>
          </h2>
        </div>

        {/* View Mode & Reset Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              playClickSound();
              setViewMode(viewMode === "physics" ? "grid" : "physics");
            }}
            className="glass-panel px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-2 text-slate-300 hover:text-white hover:border-cyan-400/40 transition-all"
            data-cursor="pointer"
          >
            {viewMode === "physics" ? (
              <>
                <LayoutGrid className="w-3.5 h-3.5 text-cyan-400" />
                <span>Switch to Grid View</span>
              </>
            ) : (
              <>
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Switch to 2D Physics</span>
              </>
            )}
          </button>

          {viewMode === "physics" && (
            <button
              onClick={handleResetPhysics}
              className="glass-panel px-3 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 hover:border-cyan-400/40 transition-all"
              title="Scatter Badges"
              data-cursor="pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Scatter</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {[
          { id: "all", label: "All Technologies" },
          { id: "frontend", label: "Frontend & UI" },
          { id: "backend", label: "Distributed & Backend" },
          { id: "creative", label: "3D & Creative WebGL" },
          { id: "devops", label: "DevOps & Cloud" },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              playClickSound();
              setActiveCategory(cat.id);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
              activeCategory === cat.id
                ? "bg-cyan-500 text-slate-950 font-semibold shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                : "glass-panel text-slate-400 hover:text-white hover:border-white/20"
            }`}
            data-cursor="pointer"
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Physics Arena Container */}
      {viewMode === "physics" ? (
        <div className="relative w-full h-[520px] rounded-3xl glass-panel border border-white/15 overflow-hidden shadow-2xl">
          {/* Subtle Background Grid & Instruction */}
          <div className="absolute inset-0 cyber-dots opacity-40 pointer-events-none" />

          <div className="absolute top-4 left-6 z-10 pointer-events-none">
            <span className="text-xs font-mono text-cyan-400/90 flex items-center gap-1.5 bg-obsidian-950/70 px-3 py-1 rounded-full border border-cyan-500/20 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Click anywhere to blast badges // Drag & toss with mouse
            </span>
          </div>

          <div
            ref={sceneRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            data-cursor-text="GRAB"
          />
        </div>
      ) : (
        /* Structured Grid Fallback View */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="glass-panel-interactive p-4 rounded-2xl border border-white/10 flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: skill.color, boxShadow: `0 0 10px ${skill.color}` }}
                />
                <span className="text-[10px] font-mono text-slate-500 uppercase">
                  {skill.category}
                </span>
              </div>
              <div>
                <h4 className="font-heading font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                  {skill.name}
                </h4>
                <p className="text-xs font-mono text-cyan-400/80 mt-1">
                  {skill.experience}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
