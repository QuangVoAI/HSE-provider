# HSE Provider SEO Operations

Production website: `https://landing.1hse.vn`

## Measurement

GA4 measurement ID is supplied through `NEXT_PUBLIC_GA_ID`. The website emits these events without collecting form values or other personal data:

- `generate_lead`: a consultation form was accepted by the lead API.
- `contact_click`: a visitor selected map, phone, or email contact.
- `portal_click`: a visitor selected the customer portal.
- `video_start`: a visitor started an introduction or tutorial video.

In GA4, mark `generate_lead` as a key event. Use `source` to compare the contact page and CSMS form. Review the remaining events as assisted-conversion signals.

## Search Console

- Property: `https://landing.1hse.vn/`
- Sitemap: `https://landing.1hse.vn/sitemap.xml`
- Submit only the sitemap URL. Individual page URLs belong in URL Inspection, not the Sitemaps form.
- Review Page indexing and Core Web Vitals after Google has collected enough data. A new or recently changed property can take several days to populate.

## Official business information

Use the same details in Google Business Profile, directories, partner pages, and press mentions:

- Name: HSE Provider
- Address: Số 20 Đường ĐX 94, Khu phố 6, phường An Phú, TP Hồ Chí Minh
- Phone: 0917 267 397
- Email: cskh@atld.vn
- Website: https://landing.1hse.vn

Do not create duplicate profiles. Business hours, primary category, ownership, photos, and verification must be confirmed by the business owner before publication.

## Link acquisition

Prioritize relevant, editorial links rather than bulk directory submissions:

1. Ask verified customers and implementation partners to link to the relevant solution page in a case study or partner profile.
2. Publish practical HSE resources worth citing, such as checklists, compliance guides, and implementation templates.
3. Seek listings or contributed articles from occupational-safety associations, training providers, industrial parks, and professional publications.
4. Use descriptive anchor text naturally. Avoid paid link networks, automated comments, and unrelated directories.

Track the referring page, destination page, publication date, owner, and status. Review new links and organic conversions monthly in Search Console and GA4.

## Monthly review

- Confirm sitemap and robots endpoints return `200`.
- Review indexed pages, search queries, click-through rate, and Core Web Vitals.
- Compare `generate_lead` by landing page and source.
- Check broken internal/external links and production error logs.
- Refresh only content that has materially changed; do not alter `lastmod` dates without a real page update.
