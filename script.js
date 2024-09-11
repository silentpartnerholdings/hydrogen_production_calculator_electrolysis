document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate');
    calculateBtn.addEventListener('click', calculateHydrogenProduction);
});

function calculateHydrogenProduction() {
    const costPerKwh = parseFloat(document.getElementById('costPerKwh').value);
    const energyProduced = parseFloat(document.getElementById('energyProduced').value);
    const availableHours = parseFloat(document.getElementById('availableHours').value);
    const hydrogenSalePrice = parseFloat(document.getElementById('hydrogenSalePrice').value);

    if (isNaN(costPerKwh) || isNaN(energyProduced) || isNaN(availableHours)) {
        alert('Please enter valid numbers for all required input fields.');
        return;
    }

    // Constants
    const hydrogenProductionRate = 20.833 / 1.5; // kg of hydrogen produced per MWh (20.833 kg per 1.5 MW)
    const taxCreditPerKg = 3; // $/kg
    const lowPrice = 4; // $/kg
    const highPrice = 35; // $/kg

    // Calculate total energy input per day
    const totalEnergyInput = energyProduced * availableHours; // MWh per day

    // Calculate daily hydrogen production
    const hydrogenProduced = hydrogenProductionRate * totalEnergyInput; // kg per day

    // Calculate total energy cost
    const totalEnergyCost = costPerKwh * totalEnergyInput * 1000; // $ (total cost for the energy produced)

    // Calculate Hydrogen Energy Cost per kg
    const hydrogenEnergyCost = totalEnergyCost / hydrogenProduced;

    // Calculate Value of Hydrogen Low and High
    const hydrogenValueLow = hydrogenProduced * lowPrice;
    const hydrogenValueHigh = hydrogenProduced * highPrice;

    // Calculate Expected Hydrogen Revenue
    const expectedRevenue = isNaN(hydrogenSalePrice) ? "N/A" : hydrogenProduced * hydrogenSalePrice;

    // Calculate MW of Electrolyzers (90% of input MW)
    const electrolyzersMW = energyProduced * 0.9;

    // Calculate Estimated Facility Cost
    const facilityCost = electrolyzersMW * 2.5 * 1000000; // $2.5 million per MW

    // Calculate tax credits
    const taxCredits = hydrogenProduced * taxCreditPerKg;

    // Update output fields
    document.getElementById('hydrogenProduced').textContent = `${hydrogenProduced.toFixed(2)} kg`;
    document.getElementById('hydrogenEnergyCost').textContent = `$${hydrogenEnergyCost.toFixed(2)}/kg`;
    document.getElementById('hydrogenValueLow').textContent = `$${hydrogenValueLow.toFixed(2)} per day`;
    document.getElementById('hydrogenValueHigh').textContent = `$${hydrogenValueHigh.toFixed(2)} per day`;
    document.getElementById('expectedRevenue').textContent = expectedRevenue === "N/A" ? "N/A" : `$${expectedRevenue.toFixed(2)} per day`;
    document.getElementById('electrolyzersMW').textContent = `${electrolyzersMW.toFixed(2)} MW`;
    document.getElementById('facilityCost').textContent = `$${facilityCost.toFixed(2)}`;
    document.getElementById('taxCredits').textContent = `$${taxCredits.toFixed(2)} per day`;
}
