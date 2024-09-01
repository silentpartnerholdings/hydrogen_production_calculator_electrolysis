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
    const dailyEnergyRequired = 36; // MWh
    const taxCreditPerKg = 3; // $/kg
    const hydrogenEnergyDensity = 33.33; // kWh/kg
    const fuelCellEfficiency = 0.6; // 60% efficiency

    // Calculate hydrogen color and type
    const [hydrogenColor, hydrogenType] = getHydrogenColorAndType(energyType);

    // Calculate hydrogen produced per day
    const dailyEnergyInput = energyProduced * availableHours; // MWh
    const productionFactor = Math.min(dailyEnergyInput / dailyEnergyRequired, 1);
    const hydrogenProduced = dailyProduction * productionFactor;

    // Calculate Hydrogen Energy Cost
    const hydrogenEnergyCost = (costPerKwh * dailyEnergyInput * 1000) / hydrogenProduced;

    // Calculate Fuel Cell Storage
    const fuelCellStorage = (hydrogenProduced * hydrogenEnergyDensity * fuelCellEfficiency) / 1000; // Convert kWh to MWh

    // Calculate Value of Hydrogen (using average of low and high prices)
    const lowPrice = 3; // $/kg
    const highPrice = 6; // $/kg
    const averagePrice = (lowPrice + highPrice) / 2;
    const hydrogenValue = hydrogenProduced * averagePrice;

    // Calculate tax credits
    const taxCredits = hydrogenProduced * taxCreditPerKg;

    // Update output fields
    document.getElementById('hydrogenColor').textContent = hydrogenColor;
    document.getElementById('hydrogenType').textContent = hydrogenType;
    document.getElementById('hydrogenProduced').textContent = `${hydrogenProduced.toFixed(2)} kg`;
    document.getElementById('hydrogenEnergyCost').textContent = `$${hydrogenEnergyCost.toFixed(2)}/kg`;
    document.getElementById('hydrogenValue').textContent = `$${hydrogenValue.toFixed(2)}`;
    document.getElementById('fuelCellStorage').textContent = `${fuelCellStorage.toFixed(2)} MWh`;
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