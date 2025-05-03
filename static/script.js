document.addEventListener('DOMContentLoaded', () => {

	// --- Planet Data ---
	const planetData = {
		"Mercury": { name: "Mercury", description: "The smallest and fastest planet, closest to the Sun. It has extreme temperature variations.", temperature: 167, moons: 0 },
		"Venus": { name: "Venus", description: "Earth's 'sister planet' due to similar size, but extremely hot with a thick, toxic atmosphere.", temperature: 464, moons: 0 },
		"Earth": { name: "Earth", description: "Our home! The only known planet to harbor liquid water on its surface and support life.", temperature: 15, moons: 1 },
		"Mars": { name: "Mars", description: "The 'Red Planet', known for its rusty dust, polar ice caps, and the largest volcano in the Solar System.", temperature: -65, moons: 2 },
		"Jupiter": { name: "Jupiter", description: "The largest planet, a gas giant with faint rings and a Great Red Spot (a massive storm).", temperature: -110, moons: 95 },
		"Saturn": { name: "Saturn", description: "Famous for its spectacular and complex ring system, Saturn is another gas giant.", temperature: -140, moons: 146 },
		"Uranus": { name: "Uranus", description: "An ice giant tilted on its side, giving it extreme seasons. It has a blue-green hue.", temperature: -195, moons: 28 },
		"Neptune": { name: "Neptune", description: "The farthest planet, a dark, cold ice giant with the fastest winds in the Solar System.", temperature: -200, moons: 16 }
	};

	// --- DOM Elements ---
	const planetButtons = document.querySelectorAll('.planet-btn');
	const modal = document.getElementById('planet-modal');
	const modalContent = modal.querySelector('.modal-content');
	const closeModalBtn = modal.querySelector('.close-btn');
	const modalPlanetName = document.getElementById('modal-planet-name');
	const modalPlanetDesc = document.getElementById('modal-planet-desc');
	const modalPlanetTemp = document.getElementById('modal-planet-temp-value');
	const modalPlanetTempBar = document.getElementById('modal-planet-temp-bar');
	const modalPlanetMoons = document.getElementById('modal-planet-moons');

	// --- Functions ---

	// Animate counting number
	function animateValue(element, start, end, duration) {
		let startTimestamp = null;
		const step = (timestamp) => {
			if (!startTimestamp) startTimestamp = timestamp;
			const progress = Math.min((timestamp - startTimestamp) / duration, 1);
			element.textContent = Math.floor(progress * (end - start) + start);
			if (progress < 1) {
				window.requestAnimationFrame(step);
			}
		};
		window.requestAnimationFrame(step);
	}

	// Update temperature bar
	function updateTempBar(temp) {
		const minTemp = -220; // Approximate coldest temp
		const maxTemp = 470;  // Approximate hottest temp (Venus)
		const range = maxTemp - minTemp;

		// Normalize temperature to a 0-100 scale
		let percentage = ((temp - minTemp) / range) * 100;
		percentage = Math.max(0, Math.min(100, percentage)); // Clamp between 0 and 100

		modalPlanetTempBar.style.width = `${percentage}%`;

		// Assign color class based on temperature
		modalPlanetTempBar.classList.remove('cold', 'moderate', 'hot');
		if (temp < 0) {
			modalPlanetTempBar.classList.add('cold');
		} else if (temp > 50) {
			modalPlanetTempBar.classList.add('hot');
		} else {
            modalPlanetTempBar.classList.add('moderate');
        }
	}

	// Open Modal Function
	function openModal(planetName) {
		const data = planetData[planetName];
		if (!data) return; // Exit if data not found

		modalPlanetName.textContent = data.name;
		modalPlanetDesc.textContent = data.description;
		modalPlanetTemp.textContent = `${data.temperature}°C`;

		// Reset moon count before animating
		modalPlanetMoons.textContent = '0';
		animateValue(modalPlanetMoons, 0, data.moons, 800); // Animate over 800ms

		// Reset temp bar before updating
		modalPlanetTempBar.style.width = '0%';
        // Use setTimeout to allow the width reset to render before starting transition
        setTimeout(() => {
            updateTempBar(data.temperature);
        }, 50); // Small delay

		modal.classList.add('show'); // Use class to trigger transitions
	}

	// Close Modal Function
	function closeModal() {
        modal.classList.remove('show');
	}

	// --- Event Listeners ---

	// Planet button clicks
	planetButtons.forEach(button => {
		button.addEventListener('click', () => {
			const planetName = button.getAttribute('data-planet');
			openModal(planetName);
		});
	});

	// Close button click
	closeModalBtn.addEventListener('click', closeModal);

	// Click outside the modal content to close
	modal.addEventListener('click', (event) => {
		if (event.target === modal) { // Check if the click is on the modal background itself
			closeModal();
		}
	});

    // Close modal with Escape key
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
});