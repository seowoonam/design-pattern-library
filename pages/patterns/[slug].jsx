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

  // Example: Secondary tags are stored in another array or we derive them from the main tag.
  const secondaryTags = pattern.secondaryTags || [];

  // Function to determine the icon for secondary tags based on the parent tag
  const getSecondaryTagIcon = (mainTag) => {
    if (mainTag === 'AI') {
      return '/icons/model-tag.svg';
    } else if (mainTag === 'Data') {
      return '/icons/dataviz-tag.svg';
    } else {
      return '/icons/ui-tag.svg';  // Default for UI or other
    }
  };

  return (
    <div className="pattern-details-container">
      {/* Main Section with Image, Title, and Description */}
      <div className="pattern-main-content">
        <img src={pattern.primaryImage} alt={pattern.title} className="primary-image" />

        <div className="pattern-text">
          {/* Tags section */}
          <div className="pattern-tags">
            {/* Main Tags */}
            {pattern.tags.map((tag, index) => (
              <div key={index} className="pattern-tag">
                <img src={`/icons/${tag.toLowerCase()}-tag.svg`} alt={`${tag} icon`} className="tag-icon" />
                {tag}
              </div>
            ))}

            {/* Secondary Tags */}
            {secondaryTags.length > 0 && secondaryTags.map((secTag, index) => {
              const secIcon = getSecondaryTagIcon(pattern.tags[0]); // Assuming the first tag is the main tag
              return (
                <div key={index} className="pattern-tag">
                  <img src={secIcon} alt={`${secTag} icon`} className="tag-icon" />
                  {secTag}
                </div>
              );
            })}
          </div>

          <h1>{pattern.title}</h1>
          <p>{pattern.description}</p>
        </div>
      </div>

      {/* Optional Secondary Images with Text */}
      {pattern.secondaryImages && pattern.secondaryImages.length > 0 && (
        <div className="secondary-content">
          {pattern.secondaryImages.map((imageData, index) => (
            <div key={index} className="secondary-image-wrapper">
              <img
                src={imageData.src}
                alt={`${pattern.title} secondary ${index + 1}`}
                className="secondary-image"
              />
              {/* Descriptive text, only if present */}
              {imageData.text && <p className="secondary-text">{imageData.text}</p>}
            </div>
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
                  → {relatedPattern}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
