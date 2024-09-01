document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate');
    calculateBtn.addEventListener('click', calculateHydrogenProduction);
});

function calculateHydrogenProduction() {
    const costPerKwh = parseFloat(document.getElementById('costPerKwh').value);
    const energyProduced = parseFloat(document.getElementById('energyProduced').value);
    const energyType = document.getElementById('energyType').value;
    const availableHours = parseFloat(document.getElementById('availableHours').value);

    if (isNaN(costPerKwh) || isNaN(energyProduced) || isNaN(availableHours)) {
        alert('Please enter valid numbers for all input fields.');
        return;
    }

    // Constants
    const plantCapacity = 1.5; // MW
    const dailyProduction = 500; // kg/day
    const taxCreditPerKg = 3; // $/kg
    const hydrogenEnergyDensity = 33.33; // kWh/kg
    const electrolysisEfficiency = 0.7; // 70% efficiency
    const fuelCellEfficiency = 0.6; // 60% efficiency

    // Calculate hydrogen color and type
    const [hydrogenColor, hydrogenType] = getHydrogenColorAndType(energyType);

    // Calculate hydrogen produced per day (scaled based on energy input)
    const energyInput = energyProduced * availableHours; // MWh
    const hydrogenProduced = (energyInput / plantCapacity) * dailyProduction;

    // Calculate Hydrogen Energy Cost
    const energyInputKWh = energyInput * 1000; // Convert MWh to kWh
    const hydrogenEnergyCost = (costPerKwh * energyInputKWh) / (hydrogenProduced * electrolysisEfficiency);

    // Calculate Fuel Cell Storage
    const fuelCellStorage = (hydrogenProduced * hydrogenEnergyDensity * fuelCellEfficiency) / 1000; // Convert kWh to MWh

    // Estimate hydrogen value (placeholder values, adjust as needed)
    const lowPrice = 3; // $/kg
    const highPrice = 6; // $/kg
    const valueLow = hydrogenProduced * lowPrice;
    const valueHigh = hydrogenProduced * highPrice;

    // Calculate tax credits
    const taxCredits = hydrogenProduced * taxCreditPerKg;

    // Update output fields
    document.getElementById('hydrogenColor').textContent = hydrogenColor;
    document.getElementById('hydrogenType').textContent = hydrogenType;
    document.getElementById('hydrogenProduced').textContent = `${hydrogenProduced.toFixed(2)} kg`;
    document.getElementById('hydrogenEnergyCost').textContent = `$${hydrogenEnergyCost.toFixed(2)}/kg`;
    document.getElementById('fuelCellStorage').textContent = `${fuelCellStorage.toFixed(2)} MWh`;
    document.getElementById('valueLow').textContent = `$${valueLow.toFixed(2)}`;
    document.getElementById('valueHigh').textContent = `$${valueHigh.toFixed(2)}`;
    document.getElementById('taxCredits').textContent = `$${taxCredits.toFixed(2)}`;
}

function getHydrogenColorAndType(energyType) {
    switch (energyType) {
        case 'solar':
        case 'wind':
        case 'hydro':
            return ['Green', 'Renewable Electrolysis'];
        case 'nuclear':
            return ['Pink', 'Nuclear Electrolysis'];
        case 'fossilFuel':
            return ['Gray', 'Steam Methane Reforming'];
        default:
            return ['Unknown', 'Unknown'];
    }
}