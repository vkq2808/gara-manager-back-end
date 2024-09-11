const fs = require('fs');

// Read the config.json file
module.exports = function updateConfig(newContext) {

    // Read the config.json file
    fs.readFile(__dirname + 'config.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        // Parse the JSON data
        const config = JSON.parse(data);

        config.development.password = process.env.DB_PASSWORD;

        // Convert the modified config object back to JSON
        const updatedConfig = JSON.stringify(config, null, 2);

        // Save the changes back to the file
        fs.writeFile(__dirname + 'config.json', updatedConfig, 'utf8', (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Config file updated successfully!');
        });
    });
};