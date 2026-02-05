export default function JsonLd() {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Festival",
    name: "Axelfest 2026",
    description:
      "De ultieme festival ervaring in het hart van Zeeland. Twee dagen vol muziek, feest en onvergetelijke momenten.",
    image: "https://axelfest.nl/BackgroundMain/Background.jpg",
    url: "https://axelfest.nl",
    startDate: "2026-09-25",
    endDate: "2026-09-26",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Hofplein Axel",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Hofplein",
        addressLocality: "Axel",
        addressRegion: "Zeeland",
        postalCode: "4571",
        addressCountry: "NL",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Axelfest",
      url: "https://axelfest.nl",
      email: "info@axelfest.nl",
      sameAs: [
        "https://www.instagram.com/axelfest/",
        "https://www.facebook.com/profile.php?id=61564200064044",
        "https://www.tiktok.com/@axelfesthofplein",
      ],
    },
    offers: {
      "@type": "Offer",
      url: "https://weeztix.shop/rb45ueqd",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      validFrom: "2025-01-01",
    },
    performer: {
      "@type": "MusicGroup",
      name: "Diverse artiesten",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Axelfest",
    url: "https://axelfest.nl",
    logo: "https://axelfest.nl/favico.png",
    email: "info@axelfest.nl",
    sameAs: [
      "https://www.instagram.com/axelfest/",
      "https://www.facebook.com/profile.php?id=61564200064044",
      "https://www.tiktok.com/@axelfesthofplein",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@axelfest.nl",
      contactType: "customer service",
      availableLanguage: ["Dutch", "English"],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Axelfest",
    url: "https://axelfest.nl",
    description: "Officiële website van Axelfest - Festival in Axel, Zeeland",
    inLanguage: "nl-NL",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
