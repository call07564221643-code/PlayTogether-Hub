/* =========================================================
   FILE: js/main.js
   PROJECT: PlayTogether Hub

   PROJECT PURPOSE:
   This JavaScript file turns the website from static HTML into a
   small interactive front-end MVP.

   EDUCATIONAL PURPOSE:
   This file demonstrates:
   - JavaScript arrays and objects
   - Template strings
   - DOM selection
   - Dynamic card rendering
   - Event delegation
   - Bootstrap modal control
   - Filtering with data attributes
   - Simple front-end form handling

   SPECIAL MARKS:
   [DATA]        = Activity content data
   [BOOTSTRAP]   = Bootstrap class/component used in generated HTML
   [FILTER]      = Activity filter system
   [OPEN CARD]   = Open card button system
   [POPUP MODAL] = Bootstrap popup modal system
   [JS HOOK]     = HTML ID/class used by JavaScript
   [SAFEGUARDING]= Uses <i class="bi bi-shield-heart"></i>
   ========================================================= */


/* =========================================================
   [DEBUG CHECK]
   Purpose:
   This message confirms that main.js is loading in the browser.

   How to check:
   1. Open your website.
   2. Press F12.
   3. Open Console.
   4. You should see: MAIN JS LOADED SUCCESSFULLY

   If you do not see it:
   - script path may be wrong
   - browser cache may still show old files
   - you may be editing a different main.js file
   ========================================================= */

console.log("MAIN JS LOADED SUCCESSFULLY");


/* =========================================================
   1. [DATA] ACTIVITY DATA ARRAY

   What this is:
   This array stores all activity cards in one place.

   Why this is used:
   Instead of manually copying the same card HTML many times,
   JavaScript loops through this data and creates the cards.

   SaaS thinking:
   In a real SaaS product, this data could later come from:
   - a database
   - an API
   - a CMS
   - an admin dashboard
   - a paid activity-card library

   Important:
   The category values below must match the filter option values
   in activities.html.

   Example:
   category: ["sensory", "anxiety"]

   must match:

   <option value="sensory">
   <option value="anxiety">
   ========================================================= */

const activities = [
  {
    title: "The Choice Jar",
    image: "assets/images/choice-jar.svg",
    age: "4–10",
    time: "15 minutes",
    group: "3–8 children",
    category: ["non-verbal", "anxiety"],
    summary: "A low-pressure choice game where children can join by speaking, pointing, choosing a card, drawing or passing.",
    steps: [
      "Prepare a jar with simple visual choice cards.",
      "Each child picks, points to or is offered a card.",
      "Children can answer, act, draw or pass.",
      "The adult praises choice-making and safe participation, not speed."
    ],
    safeguarding: "Do not force speech, eye contact or public performance. Watch for freezing, hiding, silence, sudden anger or withdrawal.",
    sensory: "Use a quiet space, soft voice and visual cards. Avoid noisy timers or surprise rules.",
    communication: "Allow pointing, thumbs up/down, object choice, drawing, gesture or pass cards."
  },

  {
    title: "Emotion Colour Match",
    image: "assets/images/emotion-colour.svg",
    age: "5–12",
    time: "20 minutes",
    group: "2–6 children",
    category: ["sensory", "non-verbal", "anxiety"],
    summary: "Children match colours to feelings using cards, symbols or tokens without being forced to discuss personal experiences.",
    steps: [
      "Place colour cards and feeling cards on the table.",
      "Model a safe example, such as: some people choose blue when tired.",
      "Invite children to match a colour to a feeling card.",
      "Let children explain, point or stay silent."
    ],
    safeguarding: "Avoid asking children to disclose trauma, home problems or personal events in front of the group.",
    sensory: "Use matte cards, calm colours and enough table space. Avoid flashing screens.",
    communication: "Children can place a token, point, use symbols or ask an adult to place the card for them."
  },

  {
    title: "Silent Team Build",
    image: "assets/images/silent-team.svg",
    age: "7–12",
    time: "25 minutes",
    group: "4–10 children",
    category: ["non-verbal", "teamwork", "anxiety"],
    summary: "A teamwork challenge where children build together using gesture, role cards and visual instructions instead of relying on speech.",
    steps: [
      "Give children safe building materials such as cups, blocks or paper tubes.",
      "Offer visual role cards: builder, helper, checker, designer and encourager.",
      "Set a simple goal such as building a bridge or tower.",
      "Praise cooperation, turn-taking and kindness."
    ],
    safeguarding: "Stop if children mock silence, dominate roles, exclude a child or blame someone for mistakes.",
    sensory: "Use soft materials and avoid loud collapse sounds where possible.",
    communication: "Children can use role cards, gestures, pointing and demonstration."
  },

  {
    title: "Sensory Safe Stations",
    image: "assets/images/sensory-stations.svg",
    age: "4–12",
    time: "30 minutes",
    group: "2–12 children",
    category: ["sensory", "anxiety"],
    summary: "Children rotate between calm stations with choices for texture, drawing, sorting, movement and quiet regulation.",
    steps: [
      "Create three or four simple activity stations.",
      "Show the route with a visual now/next board.",
      "Let children choose the order when possible.",
      "Keep one quiet station available for regulation."
    ],
    safeguarding: "Do not use food, strong smells, blindfolds or touch-based activities without consent and risk checks.",
    sensory: "Offer gloves, tools, quiet corners and visual countdowns.",
    communication: "Use station cards, now/next boards, pointing and short instructions."
  },

  {
    title: "Bridge Builders",
    image: "assets/images/bridge-builders.svg",
    age: "6–12",
    time: "25 minutes",
    group: "4–8 children",
    category: ["teamwork"],
    summary: "Children build a bridge between two surfaces using shared roles and safe materials.",
    steps: [
      "Explain the aim using a picture or simple example.",
      "Let children choose roles rather than assigning status-based roles.",
      "Give equal materials to the group.",
      "Celebrate cooperation, not the tallest or fastest bridge."
    ],
    safeguarding: "Watch for power imbalance, teasing, blame or exclusion from decision-making.",
    sensory: "Use predictable materials. Avoid messy textures unless children choose them.",
    communication: "Use visual role cards and allow children to contribute by placing, pointing or checking."
  },

  {
    title: "Kindness Map",
    image: "assets/images/hero-diverse-play.svg",
    age: "5–12",
    time: "20 minutes",
    group: "3–10 children",
    category: ["teamwork", "anxiety"],
    summary: "Children place kindness tokens on a simple map of safe actions in home, school and playground settings.",
    steps: [
      "Draw a map with zones such as classroom, playground, home and club.",
      "Offer kindness action cards.",
      "Children place cards on the map.",
      "Adults model safe help-seeking language."
    ],
    safeguarding: "Do not ask children to name unsafe adults publicly. Keep examples general and protective.",
    sensory: "Avoid crowded table layouts and keep materials visually simple.",
    communication: "Children can place tokens silently or work with a trusted adult."
  }
];


/* =========================================================
   2. CREATE ACTIVITY CARD FUNCTION

   Purpose:
   Converts one activity object into one HTML card.

   Parameters:
   activity = the activity object
   index = the activity position in the activities array

   Why index matters:
   The Open card button stores this index.
   When the user clicks the button, the modal knows which activity
   data to display.

   [BOOTSTRAP]
   Generated HTML uses:
   - col-md-6
   - col-lg-4
   - btn
   - btn-outline-primary
   - rounded-pill
   - h4
   - fw-bold

   [FILTER]
   data-category stores searchable category words.

   [OPEN CARD]
   The button gets:
   - class="open-card-btn"
   - data-activity-index="${index}"

   main.js uses this later to open the correct popup.
   ========================================================= */

function createActivityCard(activity, index) {

  /* [FILTER]
     Convert the category array into a text string.

     Example:
     ["non-verbal", "anxiety"]
     becomes:
     "non-verbal anxiety"

     The filter system reads this value later.
  */
  const categories = activity.category.join(" ");

  return `
    <div class="col-md-6 col-lg-4 activity-item" data-category="${categories}">

      <article class="activity-card h-100">

        <img src="${activity.image}" alt="${activity.title} inclusive play illustration">

        <div class="card-body">

          <h3 class="h4 fw-bold">${activity.title}</h3>

          <p>${activity.summary}</p>

          <div class="activity-meta">
            <span><i class="bi bi-person"></i> ${activity.age}</span>
            <span><i class="bi bi-clock"></i> ${activity.time}</span>
            <span><i class="bi bi-people"></i> ${activity.group}</span>
          </div>

          <!-- [OPEN CARD]
               This button opens the popup card.
               It does not use onclick.
               Instead, setupActivityButtons() listens for clicks
               on the class .open-card-btn.

               data-activity-index stores the activity number.
          -->
          <button class="btn btn-outline-primary rounded-pill open-card-btn"
                  type="button"
                  data-activity-index="${index}">
            Open card
          </button>

        </div>
      </article>
    </div>
  `;
}


/* =========================================================
   3. RENDER ACTIVITY CARDS

   Purpose:
   Inserts cards into the correct page.

   [JS HOOK]
   index.html uses:
   id="homeActivityCards"

   activities.html uses:
   id="activityLibrary"

   Why we check if elements exist:
   The same main.js file is used on all pages.
   about.html does not have activity cards, so this function must
   safely skip missing containers.
   ========================================================= */

function renderActivityCards() {

  const activityLibrary = document.getElementById("activityLibrary");

  if (activityLibrary) {
    activityLibrary.innerHTML = activities.map(createActivityCard).join("");
  }

  const homeActivityCards = document.getElementById("homeActivityCards");

  if (homeActivityCards) {
    homeActivityCards.innerHTML = activities.slice(0, 3).map(createActivityCard).join("");
  }
}


/* =========================================================
   4. [OPEN CARD] SETUP ACTIVITY BUTTONS

   Purpose:
   Makes all Open card buttons work.

   Why event delegation is used:
   The cards are created dynamically after the page loads.
   If we attach button listeners before the cards exist, they may fail.

   Event delegation:
   We place one click listener on document.
   Then we check whether the clicked element is inside .open-card-btn.

   Benefit:
   Works on both:
   - homepage preview cards
   - activities page full library
   ========================================================= */

function setupActivityButtons() {

  document.addEventListener("click", function (event) {

    const button = event.target.closest(".open-card-btn");

    if (!button) {
      return;
    }

    const index = Number(button.dataset.activityIndex);

    openActivityModal(index);

  });
}


/* =========================================================
   5. [POPUP MODAL] OPEN ACTIVITY MODAL

   Purpose:
   Opens the Bootstrap modal and inserts selected activity details.

   [JS HOOK]
   HTML pages must include:
   - id="activityModal"
   - id="activityModalTitle"
   - id="activityModalBody"

   [BOOTSTRAP]
   Uses Bootstrap Modal JavaScript API:
   bootstrap.Modal.getOrCreateInstance(modalElement)

   [SAFEGUARDING]
   Uses:
   <i class="bi bi-shield-heart"></i>
   for safeguarding headings and reminders.
   ========================================================= */

function openActivityModal(index) {

  const activity = activities[index];

  const modalElement = document.getElementById("activityModal");
  const title = document.getElementById("activityModalTitle");
  const body = document.getElementById("activityModalBody");

  if (!activity || !modalElement || !title || !body) {
    console.error("Activity modal cannot open. Check activityModal, activityModalTitle and activityModalBody in the HTML.");
    return;
  }

  title.textContent = activity.title;

  body.innerHTML = `
    <img src="${activity.image}"
         class="img-fluid rounded-4 mb-4"
         alt="${activity.title} illustration">

    <p class="lead">
      ${activity.summary}
    </p>

    <div class="activity-meta mb-4 d-flex flex-wrap gap-3">

      <span class="badge bg-primary-subtle text-dark p-2">
        <i class="bi bi-person"></i>
        Age: ${activity.age}
      </span>

      <span class="badge bg-success-subtle text-dark p-2">
        <i class="bi bi-clock"></i>
        ${activity.time}
      </span>

      <span class="badge bg-warning-subtle text-dark p-2">
        <i class="bi bi-people"></i>
        ${activity.group}
      </span>

    </div>

    <h3 class="h5 fw-bold mb-3">
      Implementation steps
    </h3>

    <ol class="mb-4">
      ${activity.steps.map(step => `<li>${step}</li>`).join("")}
    </ol>

    <h3 class="h5 fw-bold mb-2">
      <i class="bi bi-shield-heart"></i>
      Safeguarding applied
    </h3>

    <p class="mb-4">
      ${activity.safeguarding}
    </p>

    <h3 class="h5 fw-bold mb-2">
      Sensory issues to be aware of
    </h3>

    <p class="mb-4">
      ${activity.sensory}
    </p>

    <h3 class="h5 fw-bold mb-2">
      Communication support
    </h3>

    <p>
      ${activity.communication}
    </p>

    <div class="alert alert-info mt-4 rounded-4">
      <strong>
        <i class="bi bi-shield-heart"></i>
        Adult reminder:
      </strong>
      success is safety, confidence and participation —
      not speed, speech or winning.
    </div>
  `;

  const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

  modal.show();
}


/* =========================================================
   6. [FILTER] SETUP ACTIVITY FILTER

   Purpose:
   Filters activity cards on activities.html.

   HTML connection:
   activities.html has:
   id="activityFilter"

   JavaScript structure:
   1. Read selected dropdown value.
   2. Find all .activity-item cards.
   3. Read each card's data-category.
   4. Show card if category matches.
   5. Hide card if category does not match.

   Example:
   Dropdown selected = "sensory"
   Card data-category = "sensory anxiety"
   Result = visible
   ========================================================= */

function setupActivityFilter() {

  const filter = document.getElementById("activityFilter");

  if (!filter) {
    return;
  }

  filter.addEventListener("change", function () {

    const selected = filter.value;

    document.querySelectorAll(".activity-item").forEach(function (card) {

      const categories = card.dataset.category;

      const shouldShow = selected === "all" || categories.includes(selected);

      card.style.display = shouldShow ? "" : "none";

    });

  });
}


/* =========================================================
   7. CONTACT FORM HANDLER

   Purpose:
   Handles the about.html contact form.

   [JS HOOK]
   about.html uses:
   - id="contactForm"
   - id="contactSuccess"

   Current MVP behaviour:
   - stops page reload
   - checks required fields
   - shows success message
   - resets the form

   Future SaaS version:
   Could connect to:
   - CRM
   - email API
   - Make.com
   - HubSpot
   - database
   ========================================================= */

function setupContactForm() {

  const contactForm = document.getElementById("contactForm");

  if (!contactForm) {
    return;
  }

  contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    if (!contactForm.checkValidity()) {
      event.stopPropagation();
      contactForm.classList.add("was-validated");
      return;
    }

    document.getElementById("contactSuccess")?.classList.remove("d-none");

    contactForm.reset();

    contactForm.classList.remove("was-validated");

  });
}


/* =========================================================
   8. NEWSLETTER FORM HANDLER

   Purpose:
   Handles the footer newsletter form on every page.

   [JS HOOK]
   All pages use:
   - id="newsletterForm"
   - id="newsletterMsg"

   Current MVP behaviour:
   - stops page reload
   - shows thank-you message
   - clears form fields
   ========================================================= */

function setupNewsletterForm() {

  const newsletterForm = document.getElementById("newsletterForm");

  if (!newsletterForm) {
    return;
  }

  newsletterForm.addEventListener("submit", function (event) {

    event.preventDefault();

    document.getElementById("newsletterMsg")?.classList.remove("d-none");

    newsletterForm.reset();

  });
}


/* =========================================================
   9. DOMCONTENTLOADED STARTER

   Purpose:
   Runs JavaScript only after the HTML has loaded.

   Why order matters:
   1. renderActivityCards() creates activity buttons.
   2. setupActivityButtons() activates Open card clicks.
   3. setupActivityFilter() activates dropdown filter.
   4. setupContactForm() activates contact form.
   5. setupNewsletterForm() activates newsletter form.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  renderActivityCards();

  setupActivityButtons();

  setupActivityFilter();

  setupContactForm();

  setupNewsletterForm();

});