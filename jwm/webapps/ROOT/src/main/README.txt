Terms and Conditions update - November 11, 2026

Public URL after deployment:
https://ProfessorJerryRV.com/termsandconditions.html

Copy the CONTENTS of webapp into:
S:\Repositories\ProfessorJerryRV\jwm\webapps\ROOT\src\main\webapp

Merge/replace the supplied files, then build and deploy to staging normally.
This package contains only new/changed files. The source files on S: have not
been modified. Shared footer, web.xml and topics.json were copied from the
current S: source and updated; preserve any edits made after this package.

The .html public URL maps to a JSP, matching the rest of the site. The body is
split into small fragments under WEB-INF/termsandconditions. Existing shared
header, footer, styles, scripts, and contact CTA are reused.

New page: WEB-INF/pages/termsandconditions.jsp
New head: WEB-INF/heads/termsandconditions.jspf
New content wrapper: WEB-INF/pages/content/termsandconditions.jspf
Five new content fragments: WEB-INF/termsandconditions/*.jspf
Changed: WEB-INF/web.xml, WEB-INF/shared/footer.jspf, assets/topics.json

POLICY TO REVIEW BEFORE PRODUCTION
The cancellation/refund wording is a proposed business policy:
refund unperformed services, less completed work and costs specifically
authorized in advance; no undisclosed cancellation fee. If Jerry cannot
perform the service, offer rescheduling or refund for the portion unperformed.
No fixed cancellation window or new penalty was invented.

The page requires prepayment unless otherwise agreed in writing, uses the
existing discount rules, describes the limits of inspections/consulting/
concierge checks, and defers to an accepted service-specific agreement.
It does not add an arbitration clause, liability cap, or waiver of legal rights.
This is a practical draft, not legal advice; attorney review is recommended
before adopting it as binding terms.

Verify on staging:
1. Open /termsandconditions.html and check header, body, and footer on mobile
   and desktop.
2. Test the shared footer link and Find a Topic search for refund or terms.
3. Review the cancellation/refund policy.
4. Deploy to production and confirm the public URL opens without logging in.
5. Enter that production URL in Stripe's Terms of service URL field.

For live invoices, make the terms available before payment, for example by
adding the URL to your invoice memo. A footer link alone is not proof that a
customer accepted the terms. Continue using a separate inspection/service
agreement where appropriate.
