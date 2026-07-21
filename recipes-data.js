// ─────────────────────────────────────────────────────────────
// recipes.js  —  BOFFO'S INGREDIENT RECIPES
// Edit this file in VS Code to set your real quantities.
// Restart the server after saving changes here.
//
// STRUCTURE PER ITEM:
//   "Exact Item Name": {
//       ingredients: [
//           {
//               name:        "Ingredient",   // display name
//               qtyPerUnit:  0.5,            // amount needed for 1 order of this item
//               unit:        "cans",         // unit of measurement
//               bulkSize:    1,              // how many units in 1 purchase package
//               bulkUnit:    "can"           // name of the purchase package
//           }
//       ]
//   }
//
// BULK CALCULATION EXAMPLE (matches the stuffing example):
//   1 can of stuffing serves 2 turkey dinners
//   → qtyPerUnit: 0.5,  bulkSize: 1,  bulkUnit: "can"
//   → 6 orders × 0.5 = 3 cans needed → Math.ceil(3 / 1) = 3 cans to buy
//
// KEY MUST MATCH THE ITEM NAME EXACTLY AS IT APPEARS ON ORDERS.
// For pot-pie size variants, use the full name including the size:
//   "Chicken Pot Pie (9\")"   and   "Chicken Pot Pie (5\")"
//
// NOTE: All quantities below are PLACEHOLDERS.
//       Replace every number with your real recipe amounts.
// ─────────────────────────────────────────────────────────────

window.RECIPES = {

    // ── SIDES ──────────────────────────────────────────────────

    "Scalloped Potatoes": {
        ingredients: [
            { name: "Potatoes",       qtyPerUnit: 2,     unit: "lbs",  bulkSize: 5,  bulkUnit: "5 lb bag" },
            { name: "Heavy Cream",    qtyPerUnit: 0.5,   unit: "L",    bulkSize: 1,  bulkUnit: "1 L carton" },
            { name: "Gruyère Cheese", qtyPerUnit: 0.25,  unit: "lbs",  bulkSize: 1,  bulkUnit: "1 lb block" },
            { name: "Butter",         qtyPerUnit: 0.125, unit: "lbs",  bulkSize: 1,  bulkUnit: "1 lb block" },
        ]
    },

    "Roasted Garlic Mash Potato": {
        ingredients: [
            { name: "Potatoes",     qtyPerUnit: 2,     unit: "lbs", bulkSize: 5,  bulkUnit: "5 lb bag" },
            { name: "Butter",       qtyPerUnit: 0.125, unit: "lbs", bulkSize: 1,  bulkUnit: "1 lb block" },
            { name: "Heavy Cream",  qtyPerUnit: 0.25,  unit: "L",   bulkSize: 1,  bulkUnit: "1 L carton" },
            { name: "Garlic",       qtyPerUnit: 1,     unit: "head",bulkSize: 6,  bulkUnit: "6-pack" },
        ]
    },

    "Herb & Garlic Mini Roasted Potatoes": {
        ingredients: [
            { name: "Baby Potatoes", qtyPerUnit: 2,    unit: "lbs", bulkSize: 5,  bulkUnit: "5 lb bag" },
            { name: "Olive Oil",     qtyPerUnit: 0.05, unit: "L",   bulkSize: 1,  bulkUnit: "1 L bottle" },
            { name: "Garlic",        qtyPerUnit: 0.5,  unit: "head",bulkSize: 6,  bulkUnit: "6-pack" },
            { name: "Fresh Herbs",   qtyPerUnit: 0.25, unit: "bunch",bulkSize: 1, bulkUnit: "bunch" },
        ]
    },

    "Sweet Potato Mash": {
        ingredients: [
            { name: "Sweet Potatoes", qtyPerUnit: 2,     unit: "lbs", bulkSize: 5,  bulkUnit: "5 lb bag" },
            { name: "Butter",         qtyPerUnit: 0.125, unit: "lbs", bulkSize: 1,  bulkUnit: "1 lb block" },
            { name: "Heavy Cream",    qtyPerUnit: 0.25,  unit: "L",   bulkSize: 1,  bulkUnit: "1 L carton" },
            { name: "Brown Sugar",    qtyPerUnit: 2,     unit: "tbsp",bulkSize: 48, bulkUnit: "3 lb bag (48 tbsp)" },
        ]
    },

    "Corn & Bacon Casserole": {
        ingredients: [
            { name: "Corn (canned)",  qtyPerUnit: 0.5,   unit: "cans",bulkSize: 1,  bulkUnit: "14 oz can" },
            { name: "Bacon",          qtyPerUnit: 0.25,  unit: "lbs", bulkSize: 1,  bulkUnit: "1 lb pack" },
            { name: "Cheddar Cheese", qtyPerUnit: 0.125, unit: "lbs", bulkSize: 1,  bulkUnit: "1 lb block" },
            { name: "Heavy Cream",    qtyPerUnit: 0.25,  unit: "L",   bulkSize: 1,  bulkUnit: "1 L carton" },
        ]
    },

    "Honey Roasted Root Vegetable": {
        ingredients: [
            { name: "Root Veg Mix (Carrots/Parsnips/Turnip)", qtyPerUnit: 2,    unit: "lbs",  bulkSize: 5,  bulkUnit: "5 lb bag" },
            { name: "Honey",                                  qtyPerUnit: 2,    unit: "tbsp", bulkSize: 24, bulkUnit: "500 mL jar (~24 tbsp)" },
            { name: "Olive Oil",                              qtyPerUnit: 0.03, unit: "L",    bulkSize: 1,  bulkUnit: "1 L bottle" },
        ]
    },

    "Green Vegetable Tumble": {
        ingredients: [
            { name: "Mixed Green Vegetables (Broccoli/Zucchini/Peas)", qtyPerUnit: 2,    unit: "lbs",  bulkSize: 5, bulkUnit: "5 lb bag" },
            { name: "Butter",                                           qtyPerUnit: 0.06, unit: "lbs",  bulkSize: 1, bulkUnit: "1 lb block" },
            { name: "Lemon",                                            qtyPerUnit: 0.25, unit: "each", bulkSize: 6, bulkUnit: "bag of 6" },
        ]
    },

    "Butternut Squash, Brussels Sprouts, Prosciutto, Parmesan & Shallots": {
        ingredients: [
            { name: "Butternut Squash",   qtyPerUnit: 1,    unit: "lbs",  bulkSize: 3,  bulkUnit: "3 lb squash" },
            { name: "Brussels Sprouts",   qtyPerUnit: 0.5,  unit: "lbs",  bulkSize: 2,  bulkUnit: "2 lb bag" },
            { name: "Prosciutto",         qtyPerUnit: 0.1,  unit: "lbs",  bulkSize: 0.5,bulkUnit: "0.5 lb pack" },
            { name: "Parmesan",           qtyPerUnit: 0.06, unit: "lbs",  bulkSize: 0.5,bulkUnit: "0.5 lb wedge" },
            { name: "Shallots",           qtyPerUnit: 2,    unit: "each", bulkSize: 12, bulkUnit: "bag of 12" },
        ]
    },

    "Garlicky Green Beans": {
        ingredients: [
            { name: "Green Beans", qtyPerUnit: 1.5, unit: "lbs", bulkSize: 2,  bulkUnit: "2 lb bag" },
            { name: "Garlic",      qtyPerUnit: 0.5, unit: "head",bulkSize: 6,  bulkUnit: "6-pack" },
            { name: "Olive Oil",   qtyPerUnit: 0.03,unit: "L",   bulkSize: 1,  bulkUnit: "1 L bottle" },
        ]
    },

    // Example of the stuffing bulk logic: 1 container of stuffing serves 2 orders.
    "Stuffing, Turkey Gravy & Cranberry Sauce": {
        ingredients: [
            { name: "Stuffing Mix",      qtyPerUnit: 0.5, unit: "bags",  bulkSize: 1,   bulkUnit: "bag (serves 2)" },
            { name: "Turkey Gravy",      qtyPerUnit: 0.5, unit: "cans",  bulkSize: 1,   bulkUnit: "can (serves 2)" },
            { name: "Cranberry Sauce",   qtyPerUnit: 0.5, unit: "cans",  bulkSize: 1,   bulkUnit: "can (serves 2)" },
            { name: "Butter",            qtyPerUnit: 0.06,unit: "lbs",   bulkSize: 1,   bulkUnit: "1 lb block" },
            { name: "Celery",            qtyPerUnit: 1,   unit: "stalks",bulkSize: 12,  bulkUnit: "bunch (12 stalks)" },
        ]
    },

    "Gluten Free Stuffing & Turkey Gravy": {
        ingredients: [
            { name: "GF Stuffing Mix", qtyPerUnit: 0.5, unit: "bags", bulkSize: 1,  bulkUnit: "bag (serves 2)" },
            { name: "GF Turkey Gravy", qtyPerUnit: 0.5, unit: "cans", bulkSize: 1,  bulkUnit: "can (serves 2)" },
            { name: "Butter",          qtyPerUnit: 0.06,unit: "lbs",  bulkSize: 1,  bulkUnit: "1 lb block" },
        ]
    },

    "Honey Glazed Spiral Ham": {
        ingredients: [
            { name: "Spiral Ham",  qtyPerUnit: 1,   unit: "each", bulkSize: 1,  bulkUnit: "ham" },
            { name: "Honey",       qtyPerUnit: 4,   unit: "tbsp", bulkSize: 24, bulkUnit: "500 mL jar (~24 tbsp)" },
            { name: "Brown Sugar", qtyPerUnit: 2,   unit: "tbsp", bulkSize: 48, bulkUnit: "3 lb bag (48 tbsp)" },
        ]
    },

    // ── POT PIES ────────────────────────────────────────────────

    "Chicken Pot Pie (9\")": {
        ingredients: [
            { name: "Chicken Breast",    qtyPerUnit: 1.5,  unit: "lbs",  bulkSize: 5,  bulkUnit: "5 lb pack" },
            { name: "Pie Shell (9\")",   qtyPerUnit: 0.5,  unit: "each", bulkSize: 1,  bulkUnit: "pack of 2" },
            { name: "Mixed Vegetables",  qtyPerUnit: 2,    unit: "cups", bulkSize: 8,  bulkUnit: "1 kg bag (8 cups)" },
            { name: "Chicken Broth",     qtyPerUnit: 1,    unit: "cans", bulkSize: 12, bulkUnit: "case of 12" },
            { name: "Heavy Cream",       qtyPerUnit: 0.25, unit: "L",    bulkSize: 1,  bulkUnit: "1 L carton" },
        ]
    },

    "Chicken Pot Pie (5\")": {
        ingredients: [
            { name: "Chicken Breast",    qtyPerUnit: 0.5,  unit: "lbs",  bulkSize: 5,  bulkUnit: "5 lb pack" },
            { name: "Pie Shell (5\")",   qtyPerUnit: 0.5,  unit: "each", bulkSize: 1,  bulkUnit: "pack of 2" },
            { name: "Mixed Vegetables",  qtyPerUnit: 0.75, unit: "cups", bulkSize: 8,  bulkUnit: "1 kg bag (8 cups)" },
            { name: "Chicken Broth",     qtyPerUnit: 0.33, unit: "cans", bulkSize: 12, bulkUnit: "case of 12" },
            { name: "Heavy Cream",       qtyPerUnit: 0.1,  unit: "L",    bulkSize: 1,  bulkUnit: "1 L carton" },
        ]
    },

    "Steak & Mushroom Pot Pie (9\")": {
        ingredients: [
            { name: "Beef (Stewing)",  qtyPerUnit: 1.5,  unit: "lbs",  bulkSize: 5,  bulkUnit: "5 lb pack" },
            { name: "Mushrooms",       qtyPerUnit: 0.5,  unit: "lbs",  bulkSize: 2,  bulkUnit: "2 lb box" },
            { name: "Pie Shell (9\")", qtyPerUnit: 0.5,  unit: "each", bulkSize: 1,  bulkUnit: "pack of 2" },
            { name: "Beef Broth",      qtyPerUnit: 1,    unit: "cans", bulkSize: 12, bulkUnit: "case of 12" },
            { name: "Red Wine",        qtyPerUnit: 0.1,  unit: "L",    bulkSize: 0.75,bulkUnit: "750 mL bottle" },
        ]
    },

    "Steak & Mushroom Pot Pie (5\")": {
        ingredients: [
            { name: "Beef (Stewing)",  qtyPerUnit: 0.5,  unit: "lbs",  bulkSize: 5,   bulkUnit: "5 lb pack" },
            { name: "Mushrooms",       qtyPerUnit: 0.2,  unit: "lbs",  bulkSize: 2,   bulkUnit: "2 lb box" },
            { name: "Pie Shell (5\")", qtyPerUnit: 0.5,  unit: "each", bulkSize: 1,   bulkUnit: "pack of 2" },
            { name: "Beef Broth",      qtyPerUnit: 0.33, unit: "cans", bulkSize: 12,  bulkUnit: "case of 12" },
        ]
    },

    "Tourtiere Pot Pie (9\")": {
        ingredients: [
            { name: "Ground Pork",      qtyPerUnit: 1,    unit: "lbs",  bulkSize: 5,  bulkUnit: "5 lb pack" },
            { name: "Ground Beef",      qtyPerUnit: 0.5,  unit: "lbs",  bulkSize: 5,  bulkUnit: "5 lb pack" },
            { name: "Pie Shell (9\")",  qtyPerUnit: 0.5,  unit: "each", bulkSize: 1,  bulkUnit: "pack of 2" },
            { name: "Potatoes",         qtyPerUnit: 0.5,  unit: "lbs",  bulkSize: 5,  bulkUnit: "5 lb bag" },
            { name: "Onion",            qtyPerUnit: 0.5,  unit: "each", bulkSize: 10, bulkUnit: "5 lb bag (~10 onions)" },
        ]
    },

    "Tourtiere Pot Pie (5\")": {
        ingredients: [
            { name: "Ground Pork",      qtyPerUnit: 0.33, unit: "lbs",  bulkSize: 5,  bulkUnit: "5 lb pack" },
            { name: "Ground Beef",      qtyPerUnit: 0.17, unit: "lbs",  bulkSize: 5,  bulkUnit: "5 lb pack" },
            { name: "Pie Shell (5\")",  qtyPerUnit: 0.5,  unit: "each", bulkSize: 1,  bulkUnit: "pack of 2" },
            { name: "Potatoes",         qtyPerUnit: 0.2,  unit: "lbs",  bulkSize: 5,  bulkUnit: "5 lb bag" },
        ]
    },

    // ── QUICHES ─────────────────────────────────────────────────

    "Quiche Lorraine (9\")": {
        ingredients: [
            { name: "Eggs",           qtyPerUnit: 4,    unit: "each", bulkSize: 12, bulkUnit: "dozen" },
            { name: "Heavy Cream",    qtyPerUnit: 0.5,  unit: "L",    bulkSize: 1,  bulkUnit: "1 L carton" },
            { name: "Bacon",          qtyPerUnit: 0.25, unit: "lbs",  bulkSize: 1,  bulkUnit: "1 lb pack" },
            { name: "Gruyère Cheese", qtyPerUnit: 0.25, unit: "lbs",  bulkSize: 1,  bulkUnit: "1 lb block" },
            { name: "Pie Shell (9\")",qtyPerUnit: 0.5,  unit: "each", bulkSize: 1,  bulkUnit: "pack of 2" },
        ]
    },

    "Roasted Vegetables & Goat Cheese Quiche (9\")": {
        ingredients: [
            { name: "Eggs",              qtyPerUnit: 4,    unit: "each", bulkSize: 12, bulkUnit: "dozen" },
            { name: "Heavy Cream",       qtyPerUnit: 0.5,  unit: "L",    bulkSize: 1,  bulkUnit: "1 L carton" },
            { name: "Goat Cheese",       qtyPerUnit: 0.25, unit: "lbs",  bulkSize: 0.5,bulkUnit: "0.5 lb log" },
            { name: "Seasonal Veg Mix",  qtyPerUnit: 1,    unit: "lbs",  bulkSize: 5,  bulkUnit: "5 lb bag" },
            { name: "Pie Shell (9\")",   qtyPerUnit: 0.5,  unit: "each", bulkSize: 1,  bulkUnit: "pack of 2" },
        ]
    },

    // ── DINNERS FOR ONE ─────────────────────────────────────────

    "Turkey Dinner for One": {
        ingredients: [
            { name: "Turkey Ballotine",  qtyPerUnit: 0.35, unit: "lbs",  bulkSize: 1,  bulkUnit: "lb" },
            { name: "Potatoes",          qtyPerUnit: 0.5,  unit: "lbs",  bulkSize: 5,  bulkUnit: "5 lb bag" },
            { name: "Brussels Sprouts",  qtyPerUnit: 0.25, unit: "lbs",  bulkSize: 2,  bulkUnit: "2 lb bag" },
            { name: "Root Veg Mix (Carrots/Parsnips/Turnip)", qtyPerUnit: 0.25, unit: "lbs", bulkSize: 5, bulkUnit: "5 lb bag" },
            { name: "Rutabaga",          qtyPerUnit: 0.3,  unit: "lbs",  bulkSize: 2,  bulkUnit: "2 lb each" },
            { name: "Prosciutto",        qtyPerUnit: 0.06, unit: "lbs",  bulkSize: 0.5,bulkUnit: "0.5 lb pack" },
            { name: "Cranberry Sauce",   qtyPerUnit: 0.5,  unit: "cans", bulkSize: 1,  bulkUnit: "can (serves 2)" },
            { name: "Turkey Gravy",      qtyPerUnit: 0.25, unit: "cans", bulkSize: 1,  bulkUnit: "can (serves 4)" },
        ]
    },

    "Ham Dinner for One": {
        ingredients: [
            { name: "Honey Glazed Ham",  qtyPerUnit: 0.3,  unit: "lbs",  bulkSize: 1,  bulkUnit: "lb" },
            { name: "Potatoes",          qtyPerUnit: 0.5,  unit: "lbs",  bulkSize: 5,  bulkUnit: "5 lb bag" },
            { name: "Brussels Sprouts",  qtyPerUnit: 0.25, unit: "lbs",  bulkSize: 2,  bulkUnit: "2 lb bag" },
            { name: "Root Veg Mix (Carrots/Parsnips/Turnip)", qtyPerUnit: 0.25, unit: "lbs", bulkSize: 5, bulkUnit: "5 lb bag" },
            { name: "Rutabaga",          qtyPerUnit: 0.3,  unit: "lbs",  bulkSize: 2,  bulkUnit: "2 lb each" },
            { name: "Prosciutto",        qtyPerUnit: 0.06, unit: "lbs",  bulkSize: 0.5,bulkUnit: "0.5 lb pack" },
            { name: "Turkey Gravy",      qtyPerUnit: 0.25, unit: "cans", bulkSize: 1,  bulkUnit: "can (serves 4)" },
            { name: "Grainy Mustard",    qtyPerUnit: 1,    unit: "tbsp", bulkSize: 24, bulkUnit: "jar (~24 tbsp)" },
        ]
    },

    // ── READY TO COOK ───────────────────────────────────────────

    "Fresh Turkeys": {
        ingredients: [
            { name: "Whole Turkey",  qtyPerUnit: 1, unit: "each", bulkSize: 1, bulkUnit: "each" },
        ]
    },

    "Stuffed Turkey Ballotine": {
        ingredients: [
            { name: "Turkey (boneless breast/thigh)", qtyPerUnit: 3,    unit: "lbs",  bulkSize: 1,  bulkUnit: "lb" },
            { name: "Stuffing Mix",                   qtyPerUnit: 0.5,  unit: "bags", bulkSize: 1,  bulkUnit: "bag (serves 2)" },
            { name: "Butter",                         qtyPerUnit: 0.125,unit: "lbs",  bulkSize: 1,  bulkUnit: "1 lb block" },
        ]
    },

    "Boned & Rolled Prime Rib Roast": {
        ingredients: [
            { name: "Prime Rib Roast", qtyPerUnit: 1, unit: "each", bulkSize: 1, bulkUnit: "roast (priced per lb)" },
            { name: "Rosemary",        qtyPerUnit: 2, unit: "sprigs",bulkSize: 10,bulkUnit: "bunch (~10 sprigs)" },
            { name: "Garlic",          qtyPerUnit: 1, unit: "head", bulkSize: 6, bulkUnit: "6-pack" },
        ]
    },

    "Beef Tenderloin": {
        ingredients: [
            { name: "Beef Tenderloin", qtyPerUnit: 1,    unit: "each",  bulkSize: 1,  bulkUnit: "tenderloin" },
            { name: "Olive Oil",       qtyPerUnit: 0.03, unit: "L",     bulkSize: 1,  bulkUnit: "1 L bottle" },
            { name: "Fresh Herbs",     qtyPerUnit: 0.25, unit: "bunch", bulkSize: 1,  bulkUnit: "bunch" },
        ]
    },

    "Rack of Lamb": {
        ingredients: [
            { name: "Rack of Lamb",    qtyPerUnit: 1,    unit: "each",  bulkSize: 1,  bulkUnit: "rack" },
            { name: "Rosemary",        qtyPerUnit: 2,    unit: "sprigs",bulkSize: 10, bulkUnit: "bunch (~10 sprigs)" },
            { name: "Dijon Mustard",   qtyPerUnit: 1,    unit: "tbsp",  bulkSize: 24, bulkUnit: "jar (~24 tbsp)" },
            { name: "Breadcrumbs",     qtyPerUnit: 0.25, unit: "cups",  bulkSize: 8,  bulkUnit: "canister (~8 cups)" },
        ]
    },

    "Leg of Lamb": {
        ingredients: [
            { name: "Leg of Lamb",  qtyPerUnit: 1,    unit: "each",  bulkSize: 1,  bulkUnit: "leg" },
            { name: "Garlic",       qtyPerUnit: 1,    unit: "head",  bulkSize: 6,  bulkUnit: "6-pack" },
            { name: "Rosemary",     qtyPerUnit: 3,    unit: "sprigs",bulkSize: 10, bulkUnit: "bunch (~10 sprigs)" },
            { name: "Olive Oil",    qtyPerUnit: 0.05, unit: "L",     bulkSize: 1,  bulkUnit: "1 L bottle" },
        ]
    },

    // ── THANKSGIVING ────────────────────────────────────────────

    "Mashed Potatoes": {
        ingredients: [
            { name: "Potatoes",    qtyPerUnit: 2,     unit: "lbs", bulkSize: 5,  bulkUnit: "5 lb bag" },
            { name: "Butter",      qtyPerUnit: 0.125, unit: "lbs", bulkSize: 1,  bulkUnit: "1 lb block" },
            { name: "Heavy Cream", qtyPerUnit: 0.25,  unit: "L",   bulkSize: 1,  bulkUnit: "1 L carton" },
        ]
    },

    "Sweet Potato Casserole": {
        ingredients: [
            { name: "Sweet Potatoes", qtyPerUnit: 2,     unit: "lbs", bulkSize: 5, bulkUnit: "5 lb bag" },
            { name: "Butter",         qtyPerUnit: 0.125, unit: "lbs", bulkSize: 1, bulkUnit: "1 lb block" },
            { name: "Brown Sugar",    qtyPerUnit: 2,     unit: "tbsp",bulkSize: 48,bulkUnit: "3 lb bag (48 tbsp)" },
            { name: "Pecans",         qtyPerUnit: 0.25,  unit: "cups",bulkSize: 4, bulkUnit: "1 lb bag (~4 cups)" },
        ]
    },

    "Green Bean Casserole": {
        ingredients: [
            { name: "Green Beans",       qtyPerUnit: 1.5, unit: "lbs",  bulkSize: 2,  bulkUnit: "2 lb bag" },
            { name: "Cream of Mushroom", qtyPerUnit: 0.5, unit: "cans", bulkSize: 1,  bulkUnit: "can (serves 2)" },
            { name: "Crispy Onions",     qtyPerUnit: 0.5, unit: "cups", bulkSize: 6,  bulkUnit: "canister (~6 cups)" },
        ]
    },

    "Cornbread Stuffing": {
        ingredients: [
            { name: "Cornbread Stuffing Mix", qtyPerUnit: 0.5, unit: "bags",  bulkSize: 1,  bulkUnit: "bag (serves 2)" },
            { name: "Chicken Broth",          qtyPerUnit: 0.5, unit: "cans",  bulkSize: 12, bulkUnit: "case of 12" },
            { name: "Butter",                 qtyPerUnit: 0.06,unit: "lbs",   bulkSize: 1,  bulkUnit: "1 lb block" },
            { name: "Celery",                 qtyPerUnit: 1,   unit: "stalks",bulkSize: 12, bulkUnit: "bunch (12 stalks)" },
            { name: "Onion",                  qtyPerUnit: 0.25,unit: "each",  bulkSize: 10, bulkUnit: "5 lb bag (~10 onions)" },
        ]
    },

    "Cranberry Sauce": {
        ingredients: [
            { name: "Cranberries",  qtyPerUnit: 0.5, unit: "lbs",  bulkSize: 1,  bulkUnit: "1 lb bag" },
            { name: "Orange Juice", qtyPerUnit: 0.1, unit: "L",    bulkSize: 1,  bulkUnit: "1 L carton" },
            { name: "Sugar",        qtyPerUnit: 4,   unit: "tbsp", bulkSize: 96, bulkUnit: "5 lb bag (~96 tbsp)" },
        ]
    },

    "Turkey Gravy": {
        ingredients: [
            { name: "Turkey Gravy (prepared)", qtyPerUnit: 0.25, unit: "cans", bulkSize: 1, bulkUnit: "can (serves 4)" },
        ]
    },

    "Pumpkin Pie (9\")": {
        ingredients: [
            { name: "Pumpkin Purée", qtyPerUnit: 0.5,  unit: "cans", bulkSize: 1,  bulkUnit: "can (serves 2 pies)" },
            { name: "Eggs",          qtyPerUnit: 2,    unit: "each", bulkSize: 12, bulkUnit: "dozen" },
            { name: "Heavy Cream",   qtyPerUnit: 0.25, unit: "L",    bulkSize: 1,  bulkUnit: "1 L carton" },
            { name: "Pie Shell (9\")",qtyPerUnit: 0.5, unit: "each", bulkSize: 1,  bulkUnit: "pack of 2" },
            { name: "Pumpkin Spice", qtyPerUnit: 1,   unit: "tsp",  bulkSize: 20, bulkUnit: "jar (~20 tsp)" },
        ]
    },

    "Pecan Pie (9\")": {
        ingredients: [
            { name: "Pecans",         qtyPerUnit: 1,    unit: "cups", bulkSize: 4,  bulkUnit: "1 lb bag (~4 cups)" },
            { name: "Eggs",           qtyPerUnit: 3,    unit: "each", bulkSize: 12, bulkUnit: "dozen" },
            { name: "Corn Syrup",     qtyPerUnit: 0.5,  unit: "cups", bulkSize: 4,  bulkUnit: "bottle (~4 cups)" },
            { name: "Pie Shell (9\")",qtyPerUnit: 0.5,  unit: "each", bulkSize: 1,  bulkUnit: "pack of 2" },
        ]
    },

    // ── EASTER ──────────────────────────────────────────────────

    "Glazed Carrots": {
        ingredients: [
            { name: "Carrots",     qtyPerUnit: 1.5, unit: "lbs",  bulkSize: 2,  bulkUnit: "2 lb bag" },
            { name: "Honey",       qtyPerUnit: 2,   unit: "tbsp", bulkSize: 24, bulkUnit: "500 mL jar (~24 tbsp)" },
            { name: "Butter",      qtyPerUnit: 0.06,unit: "lbs",  bulkSize: 1,  bulkUnit: "1 lb block" },
        ]
    },

    "Asparagus Almondine": {
        ingredients: [
            { name: "Asparagus",   qtyPerUnit: 1,    unit: "lbs",  bulkSize: 2,  bulkUnit: "2 lb bunch" },
            { name: "Slivered Almonds", qtyPerUnit: 0.1, unit: "cups", bulkSize: 4, bulkUnit: "1 lb bag (~4 cups)" },
            { name: "Butter",      qtyPerUnit: 0.06, unit: "lbs",  bulkSize: 1,  bulkUnit: "1 lb block" },
            { name: "Lemon",       qtyPerUnit: 0.5,  unit: "each", bulkSize: 6,  bulkUnit: "bag of 6" },
        ]
    },

    "Deviled Eggs (dozen)": {
        ingredients: [
            { name: "Eggs",        qtyPerUnit: 12,   unit: "each", bulkSize: 12, bulkUnit: "dozen" },
            { name: "Mayonnaise",  qtyPerUnit: 4,    unit: "tbsp", bulkSize: 32, bulkUnit: "jar (~32 tbsp)" },
            { name: "Dijon Mustard", qtyPerUnit: 1,  unit: "tbsp", bulkSize: 24, bulkUnit: "jar (~24 tbsp)" },
            { name: "Paprika",     qtyPerUnit: 0.25, unit: "tsp",  bulkSize: 50, bulkUnit: "jar (~50 tsp)" },
        ]
    },

    "Hot Cross Buns (6-pack)": {
        ingredients: [
            { name: "All-Purpose Flour", qtyPerUnit: 1.5, unit: "cups", bulkSize: 40, bulkUnit: "10 lb bag (~40 cups)" },
            { name: "Instant Yeast",     qtyPerUnit: 0.5, unit: "tsp",  bulkSize: 16, bulkUnit: "jar (~16 tsp)" },
            { name: "Mixed Spice",       qtyPerUnit: 1,   unit: "tsp",  bulkSize: 20, bulkUnit: "jar (~20 tsp)" },
            { name: "Currants/Raisins",  qtyPerUnit: 0.25,unit: "cups", bulkSize: 4,  bulkUnit: "1 lb bag (~4 cups)" },
            { name: "Eggs",              qtyPerUnit: 1,   unit: "each", bulkSize: 12, bulkUnit: "dozen" },
        ]
    },

    "Lamb Dinner for One": {
        ingredients: [
            { name: "Leg of Lamb (sliced)", qtyPerUnit: 0.4,  unit: "lbs",  bulkSize: 1,  bulkUnit: "lb" },
            { name: "Potatoes",             qtyPerUnit: 0.5,  unit: "lbs",  bulkSize: 5,  bulkUnit: "5 lb bag" },
            { name: "Mint Sauce",           qtyPerUnit: 1,    unit: "tbsp", bulkSize: 24, bulkUnit: "jar (~24 tbsp)" },
        ]
    },

};
