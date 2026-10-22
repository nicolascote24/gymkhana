import { jsonLd } from "@/lib/site";

// Structured data in the server HTML (see lib/schema.ts).
export default function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />;
}
