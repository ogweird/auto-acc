const fs = require("fs/promises");

const NAMES = new Array(
    "olivia",
    "emma",
    "charlotte",
    "amelia",
    "sophia",
    "isabella",
    "ava",
    "mia",
    "evelyn",
    "luna",
    "harper",
    "ella",
    "scarlett",
    "grace",
    "chloe",
    "victoria",
    "penelope",
    "aria",
    "layla",
    "nora",
    "zoey",
    "lily",
    "hannah",
    "eleanor",
    "hazel",
    "violet",
    "aurora",
    "stella",
    "lucy",
    "anna",
    "alice",
    "claire",
    "ruby",
    "sarah",
    "julia",
    "madison",
    "naomi",
    "elena",
    "leah",
    "audrey",
    "liam",
    "noah",
    "oliver",
    "elijah",
    "james",
    "william",
    "benjamin",
    "lucas",
    "henry",
    "alexander",
    "jack",
    "daniel",
    "michael",
    "mason",
    "sebastian",
    "ethan",
    "logan",
    "jacob",
    "jackson",
    "levi",
    "owen",
    "samuel",
    "david",
    "joseph",
    "john",
    "wyatt",
    "matthew",
    "luke",
    "asher",
    "carter",
    "julian",
    "grayson",
    "leo",
    "jayden",
    "gabriel",
    "isaac",
    "lincoln",
    "anthony",
    "andrew",
    "christopher",
    "joshua",
    "ezra",
    "nathan",
    "thomas",
    "charles",
    "caleb",
    "ryan",
    "adrian",
    "isaiah",
    "adam",
    "elliot",
    "aaron",
    "ian",
    "jonathan",
    "connor",
    "jeremiah"
);

const SURNAMES = new Array(
    "smith",
    "johnson",
    "williams",
    "brown",
    "jones",
    "garcia",
    "miller",
    "davis",
    "rodriguez",
    "martinez",
    "hernandez",
    "lopez",
    "gonzalez",
    "wilson",
    "anderson",
    "thomas",
    "taylor",
    "moore",
    "jackson",
    "martin",
    "lee",
    "perez",
    "thompson",
    "white",
    "harris",
    "sanchez",
    "clark",
    "ramirez",
    "lewis",
    "robinson",
    "walker",
    "young",
    "allen",
    "king",
    "wright",
    "scott",
    "torres",
    "nguyen",
    "hill",
    "flores",
    "green",
    "adams",
    "nelson",
    "baker",
    "hall",
    "rivera",
    "campbell",
    "mitchell",
    "carter",
    "roberts",
    "gomez",
    "phillips",
    "evans",
    "turner",
    "diaz",
    "parker",
    "cruz",
    "edwards",
    "collins",
    "reyes",
    "stewart",
    "morris",
    "morales",
    "murphy",
    "cook",
    "rogers",
    "gutierrez",
    "ortiz",
    "morgan",
    "cooper",
    "peterson",
    "bailey",
    "reed",
    "kelly",
    "howard",
    "ramos",
    "kim",
    "cox",
    "ward",
    "richardson",
    "watson",
    "brooks",
    "chavez",
    "wood",
    "james",
    "bennett",
    "gray",
    "mendoza",
    "ruiz",
    "hughes",
    "price",
    "alvarez",
    "castillo",
    "sanders",
    "patel",
    "myers",
    "long",
    "ross",
    "foster"
);

const MAX_AMOUNT = NAMES.length * SURNAMES.length * 1000;
const AMOUNT = 5;

var generated = new Set();

function get_random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function get_email() {
    let name = get_random(NAMES);
    let surname = get_random(SURNAMES);

    if (!name || !surname) {
        throw new Error("Ran out of names!");
    }

    return name + surname + Math.floor(Math.random() * 1000).toString().padStart(3, "0") + "@gmail.com";
}

async function generate() {
    console.log("Max amount: " + MAX_AMOUNT);
    console.log("Amount chosen: " + AMOUNT)

    if (AMOUNT > MAX_AMOUNT) {
        return;
    }

    while (generated.size < AMOUNT) {
        generated.add(get_email());
    }

    await fs.mkdir("generated", { recursive: true }, (err) => {
        if (err) {
            throw err;
        }
    });

    await fs.writeFile(
        "generated/emails.json",
        JSON.stringify([...generated], null, 2)
    );
}

generate().catch(console.error);;