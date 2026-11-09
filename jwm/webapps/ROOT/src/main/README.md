# Professor Jerry RV source cleanup

Copy the contents of webapp/ into src/main/webapp and merge directories. Keep your existing assets/images and assets/documents. Remove the obsolete paths listed in retired-files.txt from src/main/webapp after copying. The existing Maven project, image sync and public page URLs still apply.

## Where to edit

- RV walkthrough and inspection regular prices: WEB-INF/services/rv-prices.jspf
- Other regular prices: the applicable consulting or maintenance fragment
- Price display and discount calculation: WEB-INF/tags/price.tag
- Grand Opening percentage and end-date text: WEB-INF/shared/grand-opening.jspf
- Walkthrough and inspection sale banner: WEB-INF/services/sale-banner.jspf
- Shared interior-page styles: assets/css/styles.css
- Shared Contact Professor Jerry callout: WEB-INF/shared/contact-cta.jspf

The Grand Opening popup artwork still contains its own printed offer. Update that image if the offer changes. The end-date setting controls the displayed date; it does not automatically turn off the promotion.
