
/* =========================================================
   PlayTogether Hub - main.js
   Purpose:
   This JavaScript makes the website feel like a micro-SaaS MVP:
   1. It stores activity data in one array.
   2. It renders reusable activity cards.
   3. It opens Bootstrap popup modals when users click "Open card".
   4. It filters activities by need.
   5. It validates forms and shows confirmation messages.
   ========================================================= */


/* Activity data:
   Instead of hard-coding every activity card in HTML, the cards are stored here.
   This is closer to how a SaaS product would work, because future cards can be
   added to the array or loaded from a database/API.
*/
const activities = [
  {
    title:"The Choice Jar",
    image:"assets/images/choice-jar.svg",
    age:"4–10",
    time:"15 minutes",
    group:"3–8 children",
    category:["non-verbal","anxiety"],
    summary:"A low-pressure choice game where children can join by speaking, pointing, choosing a card, drawing or passing.",
    steps:[
      "Prepare a jar with simple visual choice cards.",
      "Each child picks, points to or is offered a card.",
      "Children can answer, act, draw or pass.",
      "The adult praises choice-making and safe participation, not speed."
    ],
    safeguarding:"Do not force speech, eye contact or public performance. Watch for freezing, hiding, silence, sudden anger or withdrawal.",
    sensory:"Use a quiet space, soft voice and visual cards. Avoid noisy timers or surprise rules.",
    communication:"Allow pointing, thumbs up/down, object choice, drawing, gesture or pass cards."
  },
  {
    title:"Emotion Colour Match",
    image:"assets/images/emotion-colour.svg",
    age:"5–12",
    time:"20 minutes",
    group:"2–6 children",
    category:["sensory","non-verbal","anxiety"],
    summary:"Children match colours to feelings using cards, symbols or tokens without being forced to discuss personal experiences.",
    steps:[
      "Place colour cards and feeling cards on the table.",
      "Model a safe example, such as: some people choose blue when tired.",
      "Invite children to match a colour to a feeling card.",
      "Let children explain, point or stay silent."
    ],
    safeguarding:"Avoid asking children to disclose trauma, home problems or personal events in front of the group.",
    sensory:"Use matte cards, calm colours and enough table space. Avoid flashing screens.",
    communication:"Children can place a token, point, use symbols or ask an adult to place the card for them."
  },
  {
    title:"Silent Team Build",
    image:"assets/images/silent-team.svg",
    age:"7–12",
    time:"25 minutes",
    group:"4–10 children",
    category:["non-verbal","teamwork","anxiety"],
    summary:"A teamwork challenge where children build together using gesture, role cards and visual instructions instead of relying on speech.",
    steps:[
      "Give children safe building materials such as cups, blocks or paper tubes.",
      "Offer visual role cards: builder, helper, checker, designer and encourager.",
      "Set a simple goal such as building a bridge or tower.",
      "Praise cooperation, turn-taking and kindness."
    ],
    safeguarding:"Stop if children mock silence, dominate roles, exclude a child or blame someone for mistakes.",
    sensory:"Use soft materials and avoid loud collapse sounds where possible.",
    communication:"Children can use role cards, gestures, pointing and demonstration."
  },
  {
    title:"Sensory Safe Stations",
    image:"assets/images/sensory-stations.svg",
    age:"4–12",
    time:"30 minutes",
    group:"2–12 children",
    category:["sensory","anxiety"],
    summary:"Children rotate between calm stations with choices for texture, drawing, sorting, movement and quiet regulation.",
    steps:[
      "Create three or four simple activity stations.",
      "Show the route with a visual now/next board.",
      "Let children choose the order when possible.",
      "Keep one quiet station available for regulation."
    ],
    safeguarding:"Do not use food, strong smells, blindfolds or touch-based activities without consent and risk checks.",
    sensory:"Offer gloves, tools, quiet corners and visual countdowns.",
    communication:"Use station cards, now/next boards, pointing and short instructions."
  },
  {
    title:"Bridge Builders",
    image:"assets/images/bridge-builders.svg",
    age:"6–12",
    time:"25 minutes",
    group:"4–8 children",
    category:["teamwork"],
    summary:"Children build a bridge between two surfaces using shared roles and safe materials.",
    steps:[
      "Explain the aim using a picture or simple example.",
      "Let children choose roles rather than assigning status-based roles.",
      "Give equal materials to the group.",
      "Celebrate cooperation, not the tallest or fastest bridge."
    ],
    safeguarding:"Watch for power imbalance, teasing, blame or exclusion from decision-making.",
    sensory:"Use predictable materials. Avoid messy textures unless children choose them.",
    communication:"Use visual role cards and allow children to contribute by placing, pointing or checking."
  },
  {
    title:"Kindness Map",
    image:"assets/images/hero-diverse-play.svg",
    age:"5–12",
    time:"20 minutes",
    group:"3–10 children",
    category:["teamwork","anxiety"],
    summary:"Children place kindness tokens on a simple map of safe actions in home, school and playground settings.",
    steps:[
      "Draw a map with zones such as classroom, playground, home and club.",
      "Offer kindness action cards.",
      "Children place cards on the map.",
      "Adults model safe help-seeking language."
    ],
    safeguarding:"Do not ask children to name unsafe adults publicly. Keep examples general and protective.",
    sensory:"Avoid crowded table layouts and keep materials visually simple.",
    communication:"Children can place tokens silently or work with a trusted adult."
  }
];


/* createActivityCard:
   Builds one Bootstrap-style card as an HTML string.
   The card uses col-md-6 and col-lg-4 so Bootstrap creates:
   - 1 column on mobile
   - 2 columns on tablet
   - 3 columns on desktop
*/
function createActivityCard(activity, index){
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

          <button class="btn btn-outline-primary rounded-pill" type="button" onclick="openActivityModal(${index})">
            Open card
          </button>
        </div>
      </article>
    </div>
  `;
}


/* renderActivityCards:
   Looks for empty containers in the HTML and fills them with activity cards.
   This avoids repeating the same card code on different pages.
*/
function renderActivityCards(){
  const activityLibrary = document.getElementById("activityLibrary");
  if(activityLibrary){
    activityLibrary.innerHTML = activities.map(createActivityCard).join("");
  }

  const homeActivityCards = document.getElementById("homeActivityCards");
  if(homeActivityCards){
    homeActivityCards.innerHTML = activities.slice(0,3).map(createActivityCard).join("");
  }
}


/* openActivityModal:
   This is the popup logic.
   When the user clicks "Open card", the button sends the card index.
   JavaScript finds the right activity, inserts details into the modal,
   then Bootstrap opens the popup using modal.show().
*/
function openActivityModal(index){
  const activity = activities[index];
  const title = document.getElementById("activityModalTitle");
  const body = document.getElementById("activityModalBody");

  if(!title || !body) return;

  title.textContent = activity.title;

  body.innerHTML = `
    <p class="lead">${activity.summary}</p>

    <div class="activity-meta">
      <span>Age: ${activity.age}</span>
      <span>Implementation time: ${activity.time}</span>
      <span>Group size: ${activity.group}</span>
    </div>

    <h3>Implementation steps</h3>
    <ol>${activity.steps.map(step => `<li>${step}</li>`).join("")}</ol>

    <h3>Safeguarding applied</h3>
    <p>${activity.safeguarding}</p>

    <h3>Sensory issues to be aware of</h3>
    <p>${activity.sensory}</p>

    <h3>Communication support</h3>
    <p>${activity.communication}</p>

    <div class="alert alert-info mt-4">
      Adult reminder: success is safety, confidence and participation — not speed, speech or winning.
    </div>
  `;

  const modal = new bootstrap.Modal(document.getElementById("activityModal"));
  modal.show();
}


/* setupActivityFilter:
   Adds a change event to the dropdown.
   It checks each card's data-category value and hides cards that do not match.
*/
function setupActivityFilter(){
  const filter = document.getElementById("activityFilter");
  if(!filter) return;

  filter.addEventListener("change", function(){
    const selected = filter.value;

    document.querySelectorAll(".activity-item").forEach(function(card){
      const categories = card.dataset.category;
      const shouldShow = selected === "all" || categories.includes(selected);
      card.style.display = shouldShow ? "" : "none";
    });
  });
}


/* setupContactForm:
   Uses HTML required fields plus Bootstrap validation classes.
   If the form is valid, a success message appears and the form resets.
*/
function setupContactForm(){
  const contactForm = document.getElementById("contactForm");
  if(!contactForm) return;

  contactForm.addEventListener("submit", function(event){
    event.preventDefault();

    if(!contactForm.checkValidity()){
      event.stopPropagation();
      contactForm.classList.add("was-validated");
      return;
    }

    document.getElementById("contactSuccess")?.classList.remove("d-none");
    contactForm.reset();
    contactForm.classList.remove("was-validated");
  });
}


/* setupNewsletterForm:
   Simple front-end confirmation for the footer newsletter form.
*/
function setupNewsletterForm(){
  const newsletterForm = document.getElementById("newsletterForm");
  if(!newsletterForm) return;

  newsletterForm.addEventListener("submit", function(event){
    event.preventDefault();
    document.getElementById("newsletterMsg")?.classList.remove("d-none");
    newsletterForm.reset();
  });
}


/* DOMContentLoaded:
   Runs all setup functions only after the HTML has loaded.
*/
document.addEventListener("DOMContentLoaded", function(){
  renderActivityCards();
  setupActivityFilter();
  setupContactForm();
  setupNewsletterForm();
});
