import React from 'react';

interface JsonLdProps {
  data: Record<string, any>;
}

export default function JsonLd({ data }: JsonLdProps) {
  // Prevenção estrita de XSS em scripts JSON-LD (mitigação contra injeção de </script>)
  const safeJsonLd = JSON.stringify(data).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd }}
    />
  );
}
