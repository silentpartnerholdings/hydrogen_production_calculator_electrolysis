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
    const hydrogenProductionRate = 13.8886667; // kg of hydrogen produced per MWh
    const shepCapacity = 1.5; // MW per SHEP
    const taxCreditPerKg = 3; // $/kg
    const hydrogenEnergyDensity = 33.33; // kWh/kg
    const fuelCellEfficiency = 0.6; // 60% efficiency

    // Calculate total energy input per day
    const totalEnergyInput = energyProduced * availableHours; // MWh per day

    // Calculate daily hydrogen production
    const hydrogenProduced = hydrogenProductionRate * totalEnergyInput; // kg per day

    // Calculate total energy cost
    const totalEnergyCost = costPerKwh * totalEnergyInput * 1000; // $ (total cost for the energy produced)

    // Calculate Hydrogen Energy Cost per kg
    const hydrogenEnergyCost = totalEnergyCost / hydrogenProduced;

    // Calculate Value of Hydrogen Low and High
    const lowPrice = 3; // $/kg
    const highPrice = 15; // $/kg
    const hydrogenValueLow = hydrogenProduced * lowPrice;
    const hydrogenValueHigh = hydrogenProduced * highPrice;

    // Calculate Fuel Cell Storage with Efficiency Loss
    const fuelCellStorage = (hydrogenProduced * hydrogenEnergyDensity * fuelCellEfficiency) / 1000; // Convert kWh to MWh

    // Calculate tax credits
    const taxCredits = hydrogenProduced * taxCreditPerKg;

    // Calculate the number of SHEPs required
    const numberOfSheps = energyProduced / shepCapacity;

    // Get hydrogen color and type based on energy type
    const [hydrogenColor, hydrogenType] = getHydrogenColorAndType(energyType);

    // Update output fields
    document.getElementById('hydrogenColor').textContent = hydrogenColor;
    document.getElementById('hydrogenType').textContent = hydrogenType;
    document.getElementById('hydrogenProduced').textContent = `${hydrogenProduced.toFixed(2)} kg`;
    document.getElementById('hydrogenEnergyCost').textContent = `$${hydrogenEnergyCost.toFixed(2)}/kg`;
    document.getElementById('hydrogenValueLow').textContent = `$${hydrogenValueLow.toFixed(2)}`;
    document.getElementById('hydrogenValueHigh').textContent = `$${hydrogenValueHigh.toFixed(2)}`;
    document.getElementById('fuelCellStorage').textContent = `${fuelCellStorage.toFixed(2)} MWh`;
    document.getElementById('taxCredits').textContent = `$${taxCredits.toFixed(2)}`;
    document.getElementById('numberOfSheps').textContent = `${numberOfSheps.toFixed(2)} SHEPs`;
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
