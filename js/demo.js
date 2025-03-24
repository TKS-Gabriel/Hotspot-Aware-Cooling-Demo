  // ------------------------------------------------
  // 1) CONFIGURABLE PARAMETERS
  // ------------------------------------------------
  const ROWS = 8;                // Grid rows
  const COLS = 8;                // Grid columns
  const UPDATE_INTERVAL = 800;   // ms between each update
  const AMBIENT_TEMP = 75;       // Base temperature that cells return to
  const RANDOM_SPIKE_CHANCE = 0.1; // Probability that a cell spikes each cycle
  const SPIKE_AMOUNT_MIN = 10;   // Min extra degrees added by spike
  const SPIKE_AMOUNT_MAX = 25;   // Max extra degrees added by spike
  const COOLING_RATE = 5;        // Degrees cooled per cycle if hotspot cooling is active
  const NATURAL_COOL_RATE = 1;   // Natural cooling (even without hotspot-aware system)

  // ------------------------------------------------
  // 2) STATE VARIABLES
  // ------------------------------------------------
  let temperatureGrid = [];
  let simulationRunning = false;
  let hotspotCoolingActive = false;
  let simulationInterval = null;

  // DOM elements
  const gridEl = document.getElementById('grid');
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  const toggleCoolingBtn = document.getElementById('toggleCoolingBtn');
  const simStatusEl = document.getElementById('simStatus');
  const coolingModeEl = document.getElementById('coolingMode');
  const maxTempEl = document.getElementById('maxTemp');

  // ------------------------------------------------
  // 3) INITIAL SETUP
  // ------------------------------------------------
  function initGrid() {
    temperatureGrid = [];
    gridEl.innerHTML = '';
    for (let r = 0; r < ROWS; r++) {
      temperatureGrid[r] = [];
      for (let c = 0; c < COLS; c++) {
        // Initialize all cells at near-ambient temperature
        temperatureGrid[r][c] = AMBIENT_TEMP + Math.floor(Math.random() * 5);
        
        // Create the cell element
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = `cell-${r}-${c}`;
        gridEl.appendChild(cell);
      }
    }
    renderGrid();
  }

  // ------------------------------------------------
  // 4) MAIN SIMULATION LOOP
  // ------------------------------------------------
  function runSimulation() {
    simulationInterval = setInterval(() => {
      // Step 1: Randomly spike some cells
      randomlySpikeCells();

      // Step 2: Cool down cells (natural + hotspot cooling if active)
      coolCells();

      // Step 3: Render the updated grid
      renderGrid();

    }, UPDATE_INTERVAL);
  }

  // Randomly choose some cells to "spike" in temperature
  function randomlySpikeCells() {
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (Math.random() < RANDOM_SPIKE_CHANCE) {
          const spike = randomInt(SPIKE_AMOUNT_MIN, SPIKE_AMOUNT_MAX);
          temperatureGrid[r][c] += spike;
        }
      }
    }
  }

  // Cool down cells
  // If hotspot cooling is active, reduce the temperature of the "hottest" cells more aggressively
  function coolCells() {
    // Determine the average or top temperature to define "hotspots"
    // For simplicity, let's define "hotspot" as cells above (AMBIENT_TEMP + 15).
    const HOTSPOT_THRESHOLD = AMBIENT_TEMP + 15;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        let currentTemp = temperatureGrid[r][c];
        
        // Natural cooling
        if (currentTemp > AMBIENT_TEMP) {
          currentTemp -= NATURAL_COOL_RATE;
        }

        // Additional hotspot cooling
        if (hotspotCoolingActive && currentTemp >= HOTSPOT_THRESHOLD) {
          currentTemp -= COOLING_RATE;
        }

        // Keep from dropping below ambient
        temperatureGrid[r][c] = Math.max(currentTemp, AMBIENT_TEMP);
      }
    }
  }

  // ------------------------------------------------
  // 5) RENDERING
  // ------------------------------------------------
  function renderGrid() {
    let maxTemp = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cellTemp = temperatureGrid[r][c];
        if (cellTemp > maxTemp) {
          maxTemp = cellTemp;
        }
        const cellEl = document.getElementById(`cell-${r}-${c}`);
        cellEl.textContent = Math.round(cellTemp); // Show integer temperature
        cellEl.style.backgroundColor = getColorForTemperature(cellTemp);
      }
    }
    maxTempEl.textContent = Math.round(maxTemp);
  }

  // Map temperature to a color (80°C to 120°C for more dramatic color range)
  function getColorForTemperature(temp) {
    const minT = 80;
    const maxT = 120;
    // Keep temperature within min/max to avoid negative or >100% ratio
    const t = Math.min(Math.max(temp, minT), maxT);
    const ratio = (t - minT) / (maxT - minT); // 0 to 1
    // Convert ratio to hue (0 = red, 240 = blue in HSL)
    const hue = 240 - Math.round(240 * ratio);
    return `hsl(${hue}, 80%, 50%)`;
  }

  // ------------------------------------------------
  // 6) UTILITY FUNCTIONS
  // ------------------------------------------------
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // ------------------------------------------------
  // 7) EVENT HANDLERS
  // ------------------------------------------------
  startBtn.addEventListener('click', () => {
    if (!simulationRunning) {
      simulationRunning = true;
      simStatusEl.textContent = 'Running';
      startBtn.disabled = true;
      stopBtn.disabled = false;
      runSimulation();
    }
  });

  stopBtn.addEventListener('click', () => {
    if (simulationRunning) {
      simulationRunning = false;
      simStatusEl.textContent = 'Stopped';
      startBtn.disabled = false;
      stopBtn.disabled = true;
      clearInterval(simulationInterval);
    }
  });

  toggleCoolingBtn.addEventListener('click', () => {
    hotspotCoolingActive = !hotspotCoolingActive;
    coolingModeEl.textContent = hotspotCoolingActive ? 'Active' : 'Inactive';
    toggleCoolingBtn.textContent = hotspotCoolingActive 
      ? 'Deactivate Hotspot Cooling' 
      : 'Activate Hotspot Cooling';
  });

  // ------------------------------------------------
  // 8) ON LOAD: Initialize the grid
  // ------------------------------------------------
  initGrid();