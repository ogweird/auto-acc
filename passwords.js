const fs = require("fs/promises");

const CHARS = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890!@#$%^&*";

const LEN_EACH = 10;
const MAX_AMOUNT = Math.pow(CHARS.length, LEN_EACH);
const AMOUNT = 5;

var generated = new Set();

function get_password() {
    let result = "";

    for (var i = 0; i < LEN_EACH; i++) {
        result += CHARS[Math.floor(Math.random() * CHARS.length)];
    }

    return result;
}

async function generate() {
    console.log("Max amount: " + MAX_AMOUNT);
    console.log("Amount chosen: " + AMOUNT)

    if (AMOUNT > MAX_AMOUNT) {
        return;
    }

    while (generated.size < AMOUNT) {
        generated.add(get_password());
    }

    await fs.mkdir("generated", { recursive: true }, (err) => {
        if (err) {
            throw err;
        }
    });

    await fs.writeFile(
        "generated/passwords.json",
        JSON.stringify([...generated], null, 2)
    );
}

generate().catch(console.error);;