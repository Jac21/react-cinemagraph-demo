import React, { useState } from "react";
import { Cinemagraph } from "react-cinemagraph";

import "./App.css";

import holidayLightsJpg from "./assets/HolidayLights/HolidayLights.jpg";
import holidayLightsMp4 from "./assets/HolidayLights/HolidayLights.mp4";
import holidayLightsWebM from "./assets/HolidayLights/HolidayLights.webm";

const packageVersion = "3.0.1";
const defaultHeight = 56.25;
const defaultMaxHeight = 100;

const scene = {
  codeId: "holidayLights",
  fallbackImage: holidayLightsJpg,
  fallbackImageAlt: "Holiday lights at night",
  mp4Source: holidayLightsMp4,
  webmSource: holidayLightsWebM
};

const defaultControls = {
  blur: 0,
  brightness: 1,
  contrast: 1,
  dropShadow: "",
  grayscale: 0,
  hueRotate: 0,
  invert: 0,
  opacity: 1,
  saturate: 1,
  sepia: 0
};

const effectControls = [
  {
    key: "blur",
    label: "Blur",
    min: 0,
    max: 20,
    step: 0.5,
    defaultValue: defaultControls.blur
  },
  {
    key: "brightness",
    label: "Brightness",
    min: 0,
    max: 2,
    step: 0.05,
    defaultValue: defaultControls.brightness
  },
  {
    key: "contrast",
    label: "Contrast",
    min: 0,
    max: 2,
    step: 0.05,
    defaultValue: defaultControls.contrast
  },
  {
    key: "grayscale",
    label: "Grayscale",
    min: 0,
    max: 1,
    step: 0.05,
    defaultValue: defaultControls.grayscale
  },
  {
    key: "hueRotate",
    label: "Hue Rotate",
    min: -180,
    max: 180,
    step: 5,
    defaultValue: defaultControls.hueRotate
  },
  {
    key: "invert",
    label: "Invert",
    min: 0,
    max: 1,
    step: 0.05,
    defaultValue: defaultControls.invert
  },
  {
    key: "opacity",
    label: "Opacity",
    min: 0.1,
    max: 1,
    step: 0.05,
    defaultValue: defaultControls.opacity
  },
  {
    key: "saturate",
    label: "Saturate",
    min: 0,
    max: 2,
    step: 0.05,
    defaultValue: defaultControls.saturate
  },
  {
    key: "sepia",
    label: "Sepia",
    min: 0,
    max: 1,
    step: 0.05,
    defaultValue: defaultControls.sepia
  }
];

const effectRenderOrder = [
  "grayscale",
  "sepia",
  "blur",
  "brightness",
  "contrast",
  "saturate",
  "hueRotate",
  "invert",
  "opacity",
  "dropShadow"
];

const effectLabels = {
  blur: "blur",
  brightness: "brightness",
  contrast: "contrast",
  dropShadow: "drop-shadow",
  grayscale: "grayscale",
  hueRotate: "hue-rotate",
  invert: "invert",
  opacity: "opacity",
  saturate: "saturate",
  sepia: "sepia"
};

const presets = [
  {
    id: "reset",
    label: "Reset",
    description: "Remove every effect.",
    effects: defaultControls
  },
  {
    id: "editorial",
    label: "Editorial",
    description: "Soft monochrome contrast.",
    effects: {
      blur: 0,
      brightness: 1.05,
      contrast: 1.2,
      dropShadow: "0 20px 60px rgba(15, 23, 42, 0.28)",
      grayscale: 0.8,
      hueRotate: 0,
      invert: 0,
      opacity: 1,
      saturate: 0.8,
      sepia: 0.15
    }
  },
  {
    id: "night-glow",
    label: "Night Glow",
    description: "Warm highlights and haze.",
    effects: {
      blur: 1.5,
      brightness: 1.08,
      contrast: 1.18,
      dropShadow: "0 24px 65px rgba(249, 115, 22, 0.22)",
      grayscale: 0,
      hueRotate: 12,
      invert: 0,
      opacity: 1,
      saturate: 1.25,
      sepia: 0.2
    }
  },
  {
    id: "dream-state",
    label: "Dream State",
    description: "Blur with a shifted palette.",
    effects: {
      blur: 2.5,
      brightness: 1.1,
      contrast: 0.95,
      dropShadow: "0 28px 80px rgba(56, 189, 248, 0.25)",
      grayscale: 0,
      hueRotate: 55,
      invert: 0,
      opacity: 0.92,
      saturate: 1.6,
      sepia: 0
    }
  }
];

function getActiveEffects(controls) {
  return effectControls.reduce((effects, control) => {
    if (controls[control.key] === control.defaultValue) {
      return effects;
    }

    return {
      ...effects,
      [control.key]: controls[control.key]
    };
  }, controls.dropShadow.trim() ? { dropShadow: controls.dropShadow.trim() } : {});
}

function normalizeEffectValue(effectName, rawValue) {
  if (rawValue === undefined || rawValue === null || rawValue === false || rawValue === "") {
    return null;
  }

  if (rawValue === true) {
    return 1;
  }

  if (effectName === "blur" && typeof rawValue === "number") {
    return `${rawValue}px`;
  }

  if (effectName === "hueRotate" && typeof rawValue === "number") {
    return `${rawValue}deg`;
  }

  return rawValue;
}

function buildFilterValue(effects) {
  return effectRenderOrder
    .map((effectName) => {
      const normalizedValue = normalizeEffectValue(effectName, effects[effectName]);

      if (normalizedValue === null) {
        return null;
      }

      return `${effectLabels[effectName]}(${normalizedValue})`;
    })
    .filter(Boolean)
    .join(" ");
}

function formatCodeValue(value) {
  return typeof value === "string" ? JSON.stringify(value) : value;
}

function formatDisplayNumber(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

function buildCodeSnippet(height, maxHeight, fallbackImageAlt, effects) {
  const effectEntries = Object.entries(effects);
  const effectsBlock = effectEntries.length
    ? `{\n${effectEntries
        .map(([name, value]) => `    ${name}: ${formatCodeValue(value)}`)
        .join(",\n")}\n  }`
    : "{}";

  return [
    "import { Cinemagraph } from 'react-cinemagraph';",
    "",
    "<Cinemagraph",
    `  height={${formatDisplayNumber(height)}}`,
    `  maxHeight={${maxHeight}}`,
    `  fallbackImage={${scene.codeId}Fallback}`,
    `  fallbackImageAlt=${formatCodeValue(fallbackImageAlt)}`,
    `  mp4Source={${scene.codeId}Mp4}`,
    `  webmSource={${scene.codeId}Webm}`,
    `  effects=${effectsBlock}`,
    "/>"
  ].join("\n");
}

function App() {
  const [height, setHeight] = useState(defaultHeight);
  const [maxHeight, setMaxHeight] = useState(defaultMaxHeight);
  const [fallbackImageAlt, setFallbackImageAlt] = useState(scene.fallbackImageAlt);
  const [controls, setControls] = useState(defaultControls);

  const activeEffects = getActiveEffects(controls);
  const filterValue = buildFilterValue(activeEffects);
  const codeSnippet = buildCodeSnippet(height, maxHeight, fallbackImageAlt, activeEffects);

  function updateControl(key, value) {
    setControls((currentControls) => ({
      ...currentControls,
      [key]: value
    }));
  }

  function applyPreset(nextEffects) {
    setControls({
      ...defaultControls,
      ...nextEffects
    });
  }

  return (
    <main className="app-shell">
      <section className="preview-hero">
        <div className="preview-toolbar">
          <div className="preview-copy">
            <p className="eyebrow">v{packageVersion}</p>
            <h1>react-cinemagraph</h1>
          </div>
        </div>

        <div className="preview-stage">
          <Cinemagraph
            height={height}
            maxHeight={maxHeight}
            fallbackImage={scene.fallbackImage}
            fallbackImageAlt={fallbackImageAlt}
            mp4Source={scene.mp4Source}
            webmSource={scene.webmSource}
            effects={activeEffects}
          />
        </div>

        <div className="status-strip">
          <div className="status-card">
            <span className="status-label">Resolved filter</span>
            <strong>{filterValue || "none"}</strong>
          </div>
          <div className="status-card">
            <span className="status-label">Scene sizing</span>
            <strong>
              {formatDisplayNumber(height)}vw / {maxHeight}vh
            </strong>
          </div>
        </div>
      </section>

      <section className="playground-layout">
        <div className="control-panel">
          <div className="panel-section">
            <div className="section-heading">
              <h2>Presets</h2>
              <p>Start here, then adjust.</p>
            </div>
            <div className="preset-list">
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  className="preset-card"
                  onClick={() => applyPreset(preset.effects)}
                >
                  <span>{preset.label}</span>
                  <small>{preset.description}</small>
                </button>
              ))}
            </div>
          </div>

          <div className="panel-section">
            <div className="section-heading">
              <h2>Layout</h2>
              <p>Direct component props.</p>
            </div>
            <label className="control-row" htmlFor="height-control">
              <span>Height</span>
              <strong>{formatDisplayNumber(height)}vw</strong>
            </label>
            <input
              id="height-control"
              type="range"
              min="40"
              max="80"
              step="0.25"
              value={height}
              onChange={(event) => setHeight(Number(event.target.value))}
            />

            <label className="control-row" htmlFor="max-height-control">
              <span>Max Height</span>
              <strong>{maxHeight}vh</strong>
            </label>
            <input
              id="max-height-control"
              type="range"
              min="60"
              max="100"
              step="1"
              value={maxHeight}
              onChange={(event) => setMaxHeight(Number(event.target.value))}
            />

            <label className="text-input-group" htmlFor="fallback-image-alt">
              <span>Fallback Image Alt Text</span>
              <input
                id="fallback-image-alt"
                type="text"
                value={fallbackImageAlt}
                onChange={(event) => setFallbackImageAlt(event.target.value)}
              />
            </label>
          </div>

          <div className="panel-section">
            <div className="section-heading">
              <h2>Effects</h2>
              <p>
                Numeric
                <code> blur </code>
                uses pixels.
                <code> hueRotate </code>
                uses degrees.
              </p>
            </div>

            <div className="slider-grid">
              {effectControls.map((control) => (
                <div key={control.key} className="slider-card">
                  <label className="control-row" htmlFor={`${control.key}-control`}>
                    <span>{control.label}</span>
                    <strong>{controls[control.key]}</strong>
                  </label>
                  <input
                    id={`${control.key}-control`}
                    type="range"
                    min={control.min}
                    max={control.max}
                    step={control.step}
                    value={controls[control.key]}
                    onChange={(event) =>
                      updateControl(control.key, Number(event.target.value))
                    }
                  />
                </div>
              ))}
            </div>

            <label className="text-input-group" htmlFor="drop-shadow-control">
              <span>dropShadow</span>
              <input
                id="drop-shadow-control"
                type="text"
                placeholder="0 18px 48px rgba(15, 23, 42, 0.28)"
                value={controls.dropShadow}
                onChange={(event) => updateControl("dropShadow", event.target.value)}
              />
            </label>
          </div>

          <article className="inspector-card panel-section">
            <p className="eyebrow">Usage</p>
            <h2>Generated snippet</h2>
            <pre>
              <code>{codeSnippet}</code>
            </pre>
          </article>

          <article className="inspector-card panel-section">
            <p className="eyebrow">Effects</p>
            <h2>Active payload</h2>
            <pre>
              <code>{JSON.stringify(activeEffects, null, 2)}</code>
            </pre>
          </article>
        </div>
      </section>
    </main>
  );
}

export default App;
