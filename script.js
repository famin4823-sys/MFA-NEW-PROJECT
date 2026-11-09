:root {
  font-family: system-ui, -apple-system, "Noto Sans Bengali", sans-serif;
  color: #f5f3ff;
  background: #111827;
  font-synthesis: none;
}

* {
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  margin: 0;
  display: grid;
  place-items: center;
  padding: 20px;
  background:
    radial-gradient(circle at top left, #4338ca55, transparent 35%),
    radial-gradient(circle at bottom right, #0e749055, transparent 35%),
    #111827;
}

.game-card {
  width: min(100%, 430px);
  padding: 28px;
  text-align: center;
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 24px;
  box-shadow: 0 24px 70px #0006;
}

.eyebrow {
  margin: 0 0 6px;
  color: #a5b4fc;
  font-size: 0.9rem;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 8vw, 2.7rem);
}

.instructions {
  margin: 8px 0 22px;
  color: #cbd5e1;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 18px;
}

.stats div {
  padding: 10px 6px;
  background: #111827;
  border-radius: 12px;
}

.stats span,
.stats strong {
  display: block;
}

.stats span {
  color: #9ca3af;
  font-size: 0.8rem;
}

.stats strong {
  margin-top: 3px;
  font-size: 1.15rem;
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 9px;
  width: 100%;
  aspect-ratio: 1;
  padding: 10px;
  background: #111827;
  border-radius: 18px;
}

.tile {
  display: grid;
  place-items: center;
  min-width: 0;
  border: 0;
  border-radius: 13px;
  color: white;
  background: linear-gradient(145deg, #818cf8, #4f46e5);
  box-shadow: 0 4px 10px #0003;
  font: inherit;
  font-size: clamp(1.7rem, 10vw, 2.6rem);
  font-weight: 800;
  cursor: pointer;
  transition: transform 120ms ease, filter 120ms ease;
}

.tile:not(:disabled):hover {
  filter: brightness(1.15);
  transform: translateY(-2px);
}

.tile:focus-visible,
.new-game-button:focus-visible {
  outline: 3px solid #facc15;
  outline-offset: 3px;
}

.tile:disabled {
  cursor: default;
}

.tile.empty {
  background: #263244;
  box-shadow: inset 0 0 0 2px #374151;
}

.message {
  min-height: 1.6em;
  margin: 16px 0;
  color: #c4b5fd;
}

.new-game-button {
  width: 100%;
  padding: 13px 18px;
  border: 0;
  border-radius: 12px;
  color: #111827;
  background: #a5b4fc;
  font: inherit;
  font-size: 1rem;
  font-weight: 750;
  cursor: pointer;
}

.new-game-button:hover {
  background: #c7d2fe;
}

.keyboard-hint {
  margin: 14px 0 0;
  color: #9ca3af;
  font-size: 0.85rem;
}

@media (max-width: 380px) {
  .game-card {
    padding: 20px;
  }

  .board {
    gap: 6px;
    padding: 7px;
  }

  .tile {
    border-radius: 9px;
  }
}
