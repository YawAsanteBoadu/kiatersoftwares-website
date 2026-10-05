# Testimonials

`testimonials.json` is intentionally empty. Only add **genuine testimonials with
the client's written permission** (Requirements §24). The testimonial section on
the Home and About pages stays hidden until at least one entry exists.

```json
[
  {
    "quote": "What the client said, in their own words.",
    "clientName": "Full Name",
    "position": "Operations Manager",
    "company": "Company Ltd",
    "logo": "/images/testimonials/company.png"
  }
]
```

`logo` is optional. The build fails if a required field is missing.
