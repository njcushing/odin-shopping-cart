-- THE ODIN PROJECT: SHOPPING CART --

This project was an exercise to explore some new techniques learned as part of
The Odin Project's 'React' course, including: unit testing React components
using Vitest, mocking child components, type checking component props with
PropTypes, routing, fetching data within components and using CSS modules.

The application itself is a shopping cart. On the homepage, there is a button
for each category that takes the user to the main shop. The items displayed will
be those corresponding to the category selected.

A navigation bar at the top of the page allows the user to return to the Home
page and switch between item categories to display new items. The items
themselves have an input element that can be typed in and the buttons used to
adjust the number of items to add to the cart. Each item has a maximum quantity;
the input will cap at that number minus the number already in the cart. Pressing
the 'Add To Cart' button will add that number of that specific item to the cart.

Any items in the cart will be displayed in the sidebar when in the /shop route
and the total cost for all items in the cart is displayed at the bottom. The
number of each item in the cart can be fine-tuned using the quantity input and
items can be removed from the cart with the 'Remove From Cart' button. Clicking
the 'Go To Cart' button will take the user to the /cart route.

The cart screen has a 'Return To Shop' button which takes the user back to the
/shop route, a total cost of the items in the cart and a list of the items in
the cart similar to those in the sidebar (the items' quantities can be adjusted
and they can be removed). There is also a 'Purchase Items' button. Since the
project did not require a fully-fledged purchasing method, the button simply
empties the cart.