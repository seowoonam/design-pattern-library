import { useRouter } from 'next/router';
import patternsData from '../../data/patterns.json';

export default function PatternPage() {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug) return <div>Loading...</div>;

  const pattern = patternsData.find((pattern) =>
    pattern.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') === slug
  );

  if (!pattern) return <div>Pattern not found</div>;

  return (
    <div className="pattern-details-container">
      {/* Main Section with Image, Title, and Description */}
      <div className="pattern-main-content">
        <img src={pattern.mainImage} alt={pattern.title} className="main-image" />

        <div className="pattern-text">
          <h1>{pattern.title}</h1>
          <p>{pattern.description}</p>
        </div>
      </div>

      {/* Optional Secondary Images */}
{pattern.secondaryImage && pattern.secondaryImage.length > 0 && (
  <div className="secondary-images">
    {pattern.secondaryImage.map((image, index) => (
      <img key={index} src={image} alt={`${pattern.title} secondary ${index + 1}`} className="secondary-image" />
    ))}
  </div>
)}


      {/* Related Patterns */}
      {pattern.relatedPatterns.length > 0 && (
        <div className="related-patterns">
          <h3>Related Patterns</h3>
          <ul>
            {pattern.relatedPatterns.map((relatedPattern, index) => (
              <li key={index}>
                <a href={`/patterns/${relatedPattern.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')}`}>
                  {relatedPattern}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
