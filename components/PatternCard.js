// components/PatternCard.js
import Link from 'next/link';

export default function PatternCard({ pattern }) {
  const slug = pattern.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

  return (
    <div className="pattern-card">
      <Link href={`/patterns/${slug}`}>
        <img src={pattern.mainImage} alt={pattern.title} />
        <h2>{pattern.title}</h2>
        <p>{pattern.oneLiner}</p>
      </Link>
    </div>
  );
}
