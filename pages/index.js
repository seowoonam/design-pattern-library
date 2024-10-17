import { useState } from 'react';
import PatternCard from '../components/PatternCard';
import patternsData from '../data/patterns.json';  // Ensure this path is correct

export default function Home() {
  // Step 1: Add state for selected and hovered tags
  const [selectedTags, setSelectedTags] = useState([]);  // State to hold selected tags
  const [hoveredTag, setHoveredTag] = useState(null);    // State to track the hovered tag

  // Step 2: Get all unique tags from the patterns data
  const allTags = [...new Set(patternsData.flatMap((pattern) => pattern.tags))];

  // Step 3: Function to handle tag clicks
  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Step 4: Filter patterns based on selected tags
  const filteredPatterns = selectedTags.length > 0
    ? patternsData.filter((pattern) =>
        selectedTags.every((tag) => pattern.tags.includes(tag))
      )
    : patternsData;

  return (
    <div>
  {/* Tag Filter UI */}
  <div className="tag-filters">
    {allTags.map((tag, index) => (
      <button
        key={index}
        onClick={() => handleTagClick(tag)}
        onMouseEnter={() => setHoveredTag(tag)}
        onMouseLeave={() => setHoveredTag(null)}
        className={selectedTags.includes(tag) ? 'active' : ''}
      >
        {tag}
      </button>
    ))}
    <button onClick={() => setSelectedTags([])} className="reset">Show All</button>
  </div>

  {/* Gallery of Patterns */}
  <div className="gallery">
    {filteredPatterns.map((pattern, index) => (
      <div
        key={index}
        className="pattern-wrapper"
        style={{
          opacity: hoveredTag && !pattern.tags.includes(hoveredTag) ? 0.3 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        <PatternCard pattern={pattern} />
      </div>
    ))}
  </div>
</div>

  );
}
