
# Code Explanation

## Three-page structure

The project has been reduced to exactly three pages:

- Home: `index.html`
- Activities: `activities.html`
- About, Training, Safeguarding and Contact: `about-training.html`

This keeps the user journey simple.

## Navbar

The navbar uses Bootstrap:

```html
<nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top border-bottom">
```

- `navbar`: Bootstrap navigation component.
- `navbar-expand-lg`: full navigation on large screens.
- `sticky-top`: keeps navbar at the top while scrolling.
- `navbar-toggler`: creates the mobile hamburger menu.

## Card hover movement

Cards move on hover using:

```css
transform: translateY(-8px);
```

This tells users the card is interactive.

## Popup activity cards

Activity popups use Bootstrap Modal.

The button calls:

```js
openActivityModal(index)
```

Then JavaScript fills the modal and opens it:

```js
const modal = new bootstrap.Modal(document.getElementById("activityModal"));
modal.show();
```

## Images

Images are local SVG files inside:

```text
assets/images/
```

They represent diverse children playing and taking part in inclusive activities.

## Favicon

The favicon is:

```text
assets/icons/favicon.svg
```

It is linked in every page head.

## Google Map

The Google Map is embedded on `about-training.html` using:

```html
iframe src="https://www.google.com/maps?q=Amberly%20Rd%2C%20London%2C%20W9%202JH&output=embed"
```

## Fonts

The project uses:

- Nunito for headings: friendly and modern.
- Atkinson Hyperlegible for body text: accessibility and readability.

## Colours

The palette is happier and more child-friendly:

- sky blue
- pink
- yellow
- mint
- green
- orange

## Safeguarding

Safeguarding is included in:

- activity card popups
- the About page
- adult guidance before, during and after activities

## Contact details

The phone number is included as a clickable `tel:` link:

```html
<a href="tel:+447776200064">+44 77762 00064</a>
```
