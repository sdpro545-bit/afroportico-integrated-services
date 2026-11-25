# Gap List: Afroportico Integrated Services Limited

Identified discrepancies between the reference screenshot, supplied facts, and production readiness requirements.

| # | Item / Component | Reference State | Resolution in Afroportico Build |
|---|---|---|---|
| 1 | Color Scheme | Orange (`#F95C19`) and warm industrial tones | Re-skinned completely to Afroportico Deep Navy (`#04374D`) and Turquoise (`#2BC194`). No orange survives. |
| 2 | Logo Placement on Dark | Not present in reference | Unaltered logo placed on white rounded tile (radius 16, padding 12) to preserve dark navy half on dark backgrounds. |
| 3 | Text Contrast on Light | Orange text used on white | Turquoise `#2BC194` fails AA on light. Mapped to `--teal-ink` (`#087A5E`, contrast 5.1:1) for highlighted text on light surfaces. |
| 4 | Testimonials Section | Present in reference | Marked `PENDING` and hidden from production until client supplies real verified client quotes. |
| 5 | Client Logos Strip | Present in reference | Marked `PENDING` and strictly banned from using template logos. Hidden from production until official client logos are supplied. |
| 6 | Domain / Email | `info@[DOMAIN]` pending domain purchase | Domain pending mode active: email hidden on live production, phone `+234 803 088 5952` prominent as primary contact. |
| 7 | Photography | Western / generic industrial reference imagery | Nigerian engineering professionals in realistic PPE (coveralls, hard hats, reflective vests) in Niger Delta and industrial context. |
| 8 | Mobile Navigation | Single menu toggle in reference | Full-screen navy slide-out drawer with masked stagger animation and focus trap. |
