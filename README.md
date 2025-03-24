# Hotspot-Aware Cooling Demo

An interactive simulation demonstrating how a hotspot-aware cooling system can dynamically detect and cool high-temperature zones on a chip. This demo uses an 8×8 grid to represent a chip surface where cells randomly spike in temperature. When activated, the hotspot-aware system targets the hottest cells to bring them back to an optimal state.

## Features

- **Dynamic Heat Map Simulation:**  
  An 8×8 grid simulates a chip surface with cells that can randomly increase in temperature (hotspots) and cool down over time.

- **Real-Time Hotspot Detection & Cooling:**  
  When the hotspot-aware cooling mode is active, cells with temperatures above a set threshold receive extra cooling, quickly reducing their temperature.

- **Interactive Controls:**  
  - **Start Simulation:** Begins the dynamic simulation.
  - **Stop Simulation:** Pauses the simulation.
  - **Toggle Hotspot Cooling:** Activates or deactivates extra cooling for hotspots.

- **Visual Feedback:**  
  Each cell displays its current temperature with a color gradient from blue (cool) to red (hot). Additional status indicators show the simulation state, cooling mode, and maximum temperature across the grid.

## Demo Preview

> **Note:** See the live demo by opening the `index.html` file in your browser.

![Hotspot-Aware Cooling Demo Screenshot](path/to/your/screenshot.png)

## Getting Started

### Prerequisites

- A modern web browser (e.g., Chrome, Firefox, Edge, Safari)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/hotspot-aware-cooling-demo.git
   cd hotspot-aware-cooling-demo
   ```

2. **Open the Demo:**

   Open the `index.html` file in your favorite web browser. You can simply double-click the file or use a local server if preferred.

   ```bash
   # Using a simple HTTP server (optional)
   python -m http.server 8000
   # Then navigate to http://localhost:8000 in your browser.
   ```

## How It Works

1. **Grid Initialization:**  
   The grid is initialized with each cell set to a near-ambient temperature (e.g., ~75°C).

2. **Random Heat Generation:**  
   At regular intervals, a random chance causes cells to spike in temperature (simulating hotspots).

3. **Cooling Mechanism:**  
   - **Natural Cooling:** All cells gradually cool toward ambient temperature.
   - **Hotspot Cooling:** When activated, cells above a certain threshold receive additional cooling.

4. **Real-Time Rendering:**  
   The grid updates in real-time, showing temperature changes with corresponding colors and numerical values.

## Customization

You can modify the simulation parameters by editing the constants in the `<script>` section of the `index.html` file:

- **Grid Size:** Adjust `ROWS` and `COLS`.
- **Update Interval:** Change the `UPDATE_INTERVAL` value (in milliseconds).
- **Temperature Settings:** Tweak `AMBIENT_TEMP`, `RANDOM_SPIKE_CHANCE`, `SPIKE_AMOUNT_MIN`, `SPIKE_AMOUNT_MAX`, `COOLING_RATE`, and `NATURAL_COOL_RATE`.

## Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests with improvements or additional features.

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/my-feature`.
3. Commit your changes: `git commit -am 'Add new feature'`.
4. Push to the branch: `git push origin feature/my-feature`.
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Inspired by innovative cooling solutions in modern data centers.
- Built with simple HTML, CSS, and JavaScript for an engaging and educational demo.
