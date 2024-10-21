import { useState } from 'react';
import PatternCard from '../components/PatternCard';
import patternsData from '../data/patterns.json';  // Ensure this path is correct

export default function Home() {
  const [selectedTags, setSelectedTags] = useState([]);  // State to hold selected tags
  const [expandedTag, setExpandedTag] = useState(null);  // State to track the clicked main tag

  // Define Main and Secondary Tags
  const allTags = [
    { main: 'AI', secondary: ['LLM', 'ML', 'RAG', 'NLP'], icon: 'ai-tag.svg' },
    { main: 'Data', secondary: ['Data Visualization', 'Data Analysis'], icon: 'data-tag.svg' },
    { main: 'UI', secondary: [], icon: 'ui-tag.svg' },  // No secondary tags for UI
  ];

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Toggle the visibility of secondary tags when the main tag is clicked
  const toggleExpandedTag = (mainTag) => {
    if (expandedTag === mainTag) {
      setExpandedTag(null);  // Collapse if the same tag is clicked again
    } else {
      setExpandedTag(mainTag);  // Expand the clicked main tag
    }
  };

  const filteredPatterns = selectedTags.length > 0
    ? patternsData.filter((pattern) =>
        selectedTags.every((tag) => pattern.tags.includes(tag))
      )
    : patternsData;

  return (
    <div>
      {/* Tag Filter UI */}
      <div className="tag-filters">
        {allTags.map(({ main, secondary, icon }, index) => {
          // Calculate if this tag is the currently expanded one
          const isExpanded = expandedTag === main;

          return (
            <div
              key={index}
              className={`tag-wrapper ${isExpanded ? 'expanded' : ''}`}
              style={{
                '--secondary-tags-count': secondary.length,
              }}
            >
              {/* Main Tag */}
              <button
                onClick={() => {
                  handleTagClick(main);
                  toggleExpandedTag(main);  // Toggle secondary tags on main tag click
                }}
                className={`tag-button ${selectedTags.includes(main) ? 'active' : ''}`}
              >
                <img src={`/icons/${icon}`} alt={`${main} icon`} className="tag-icon" />
                {main}
              </button>

              {/* Secondary Tags - Appears to the right of the main tag */}
              {isExpanded && secondary.length > 0 && (
                <div className="secondary-tags">
                  {secondary.map((secTag, secIndex) => {
                    // Use the correct icon based on the tag
                    const secIcon = main === 'AI' ? 'model-tag.svg' : 'dataviz-tag.svg';
                    return (
                      <button
                        key={secIndex}
                        onClick={() => handleTagClick(secTag)}
                        className={`tag-button ${selectedTags.includes(secTag) ? 'active' : ''}`}
                      >
                        <img src={`/icons/${secIcon}`} alt={`${secTag} icon`} className="tag-icon" />
                        {secTag}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
        <button onClick={() => setSelectedTags([])} className="reset">Show All</button>
      </div>

      {/* Gallery of Patterns */}
      <div className="gallery">
        {filteredPatterns.map((pattern, index) => (
          <div
            key={index}
            className="pattern-wrapper"
            style={{
              opacity: expandedTag && !pattern.tags.includes(expandedTag) ? 0.3 : 1,
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
