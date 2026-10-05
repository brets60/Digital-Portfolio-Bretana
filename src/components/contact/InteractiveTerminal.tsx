"use client";

import React, { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import { personalInfo, projects, techSkills } from "@/lib/data";
import { playTerminalKeystroke, playSuccessChime, playClickSound } from "@/lib/audio";
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft } from "lucide-react";

interface TerminalLine {
  type: "input" | "output" | "system";
  text?: string;
  element?: React.ReactNode;
}

export function InteractiveTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      type: "system",
      text: "BRETAÑA-OS v4.0.0 [BSIT-4TH-YEAR-EDITION]",
    },
    {
      type: "system",
      text: "Type 'help' to inspect available system commands or click suggestions below.",
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const newHistory: TerminalLine[] = [
      ...history,
      { type: "input", text: `jmb@engineer:~$ ${cmd}` },
    ];

    switch (trimmed) {
      case "help":
        newHistory.push({
          type: "output",
          element: (
            <div className="space-y-1 text-slate-300 font-mono text-xs">
              <div className="text-cyan-400 font-bold mb-1">Available System Commands:</div>
              <div><span className="text-amber-400 font-bold">about</span>     - Executive summary & engineering background</div>
              <div><span className="text-amber-400 font-bold">skills</span>    - Technical stack & proficiencies</div>
              <div><span className="text-amber-400 font-bold">projects</span>  - Flagship production case studies</div>
              <div><span className="text-amber-400 font-bold">contact</span>   - Direct communications & channels</div>
              <div><span className="text-amber-400 font-bold">sudo hire</span>  - Direct high-priority recruitment hook [EASTER EGG]</div>
              <div><span className="text-amber-400 font-bold">clear</span>     - Clear terminal display buffer</div>
            </div>
          ),
        });
        break;

      case "about":
      case "bio":
        newHistory.push({
          type: "output",
          element: (
            <div className="text-slate-300 font-mono text-xs space-y-1">
              <div className="text-white font-bold">{personalInfo.name}</div>
              <div className="text-cyan-400">{personalInfo.role}</div>
              <p className="text-slate-400 leading-relaxed mt-1">{personalInfo.bio}</p>
              <div className="text-emerald-400 mt-1">Status: {personalInfo.status}</div>
            </div>
          ),
        });
        break;

      case "skills":
        newHistory.push({
          type: "output",
          element: (
            <div className="text-xs font-mono space-y-2">
              <div className="text-cyan-400 font-bold">Engineered Capabilities:</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 text-slate-300">
                {techSkills.map((s, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="text-white">{s.name}</span>
                    <span className="text-slate-500">({s.experience})</span>
                  </div>
                ))}
              </div>
            </div>
          ),
        });
        break;

      case "projects":
        newHistory.push({
          type: "output",
          element: (
            <div className="text-xs font-mono space-y-2">
              <div className="text-cyan-400 font-bold">Featured Production Deployments:</div>
              {projects.map((p, i) => (
                <div key={i} className="border-l-2 border-cyan-500/40 pl-2">
                  <div className="text-white font-semibold">{p.title}</div>
                  <div className="text-slate-400 text-[11px]">{p.subtitle}</div>
                  <div className="text-slate-500 text-[10px]">Stack: {p.tags.slice(0, 4).join(", ")}</div>
                </div>
              ))}
            </div>
          ),
        });
        break;

      case "contact":
      case "email":
        newHistory.push({
          type: "output",
          element: (
            <div className="text-xs font-mono space-y-1">
              <div className="text-emerald-400 font-bold">Communications Handshake:</div>
              <div>Email: <span className="text-white">{personalInfo.email}</span></div>
              <div>GitHub: <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{personalInfo.github}</a></div>
              <div>LinkedIn: <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{personalInfo.linkedin}</a></div>
              <div>Location: <span className="text-slate-300">{personalInfo.location}</span></div>
            </div>
          ),
        });
        break;

      case "sudo hire":
      case "hire":
        playSuccessChime();
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#00F0FF", "#9D4EDD", "#FFB703", "#10B981"],
        });
        newHistory.push({
          type: "output",
          element: (
            <div className="text-xs font-mono p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/30 space-y-1">
              <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                ACCESS GRANTED: Priority Recruitment Handshake Activated!
              </div>
              <p className="text-slate-300">
                Thank you for recognizing top-tier engineering talent. Let&apos;s build transformative products together.
              </p>
              <div className="pt-1">
                Direct dispatch channel:{" "}
                <a
                  href={`mailto:${personalInfo.email}?subject=Opportunity%20for%20John%20Michael`}
                  className="text-cyan-400 underline font-bold"
                >
                  {personalInfo.email}
                </a>
              </div>
            </div>
          ),
        });
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        newHistory.push({
          type: "output",
          element: (
            <div className="text-xs font-mono text-rose-400">
              Command not found: &apos;{trimmed}&apos;. Type &apos;help&apos; for a list of valid commands.
            </div>
          ),
        });
    }

    setHistory(newHistory);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    playTerminalKeystroke();

    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    }
  };

  const quickCommands = ["help", "about", "skills", "projects", "sudo hire", "clear"];

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="glass-panel rounded-3xl border border-white/15 overflow-hidden shadow-2xl flex flex-col h-[520px]"
    >
      {/* Terminal Title Bar */}
      <div className="px-4 py-3 bg-obsidian-900/90 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs font-mono text-slate-400 ml-2 flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
            bash - johnmichael@bsit-dev:~
          </span>
        </div>

        {/* Quick Command Suggestions */}
        <div className="hidden sm:flex items-center gap-1.5">
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={(e) => {
                e.stopPropagation();
                playClickSound();
                handleCommand(cmd);
              }}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-300 border border-white/5 transition-colors"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Output Body */}
      <div className="flex-1 p-5 overflow-y-auto font-mono text-xs space-y-3">
        {history.map((line, i) => (
          <div key={i}>
            {line.type === "system" && (
              <p className="text-slate-500">{line.text}</p>
            )}
            {line.type === "input" && (
              <p className="text-cyan-300 font-semibold">{line.text}</p>
            )}
            {line.type === "output" && (
              <div className="pl-2 mt-1">{line.element || line.text}</div>
            )}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Input Prompt */}
      <div className="p-3 bg-obsidian-950/80 border-t border-white/10 flex items-center gap-2">
        <span className="text-xs font-mono text-cyan-400 shrink-0 font-bold">
          jmb@engineer:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder:text-slate-600 focus:ring-0"
          placeholder="Type command ('help', 'sudo hire')..."
          autoFocus
          spellCheck={false}
        />
        <button
          onClick={() => handleCommand(input)}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-cyan-400 border border-white/10 transition-colors"
          title="Execute"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
