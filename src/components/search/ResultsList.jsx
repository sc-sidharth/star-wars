import React from 'react';
import CharacterCard from '../character/CharacterCard';

function ResultsList({ 
  characters, 
  onCharacterClick, 
  emptyMessage = "No characters found",
  currentPage = 1,
  itemsPerPage = 12,
  onPageChange
}) {
  if (!characters || characters.length === 0) {
    return (
      <div className="holo-card" style={{ 
        textAlign: 'center', 
        padding: 'var(--spacing-xl)',
        opacity: 0.8
      }}>
        <p className="holo-text">{emptyMessage}</p>
      </div>
    );
  }

  // Calculate pagination
  const totalPages = Math.ceil(characters.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCharacters = characters.slice(startIndex, endIndex);

  return (
    <div className="results-list">
      <p className="holo-text" style={{ 
        marginBottom: 'var(--spacing-lg)',
        fontSize: 'var(--font-size-sm)',
        textAlign: 'center'
      }}>
        Showing {startIndex + 1}-{Math.min(endIndex, characters.length)} of <strong className="holo-accent">{characters.length}</strong> character{characters.length !== 1 ? 's' : ''}
      </p>
      
      <div className="holo-grid">
        {paginatedCharacters.map((character, index) => (
          <CharacterCard
            key={character.url}
            character={character}
            onClick={() => onCharacterClick && onCharacterClick(character)}
            style={{ animationDelay: `${index * 0.05}s` }}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 'var(--spacing-sm)',
          marginTop: 'var(--spacing-xl)',
          flexWrap: 'wrap'
        }}>
          <button
            className="holo-button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              opacity: currentPage === 1 ? 0.5 : 1,
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
            }}
          >
            ← Previous
          </button>

          <div style={{ display: 'flex', gap: 'var(--spacing-xs)', flexWrap: 'wrap' }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
              // Show first page, last page, current page, and pages around current
              const showPage = 
                page === 1 || 
                page === totalPages || 
                (page >= currentPage - 1 && page <= currentPage + 1);
              
              const showEllipsis = 
                (page === currentPage - 2 && currentPage > 3) ||
                (page === currentPage + 2 && currentPage < totalPages - 2);

              if (showEllipsis) {
                return (
                  <span key={page} className="holo-text" style={{ padding: '0.5rem' }}>
                    ...
                  </span>
                );
              }

              if (!showPage) return null;

              return (
                <button
                  key={page}
                  className="holo-button"
                  onClick={() => onPageChange(page)}
                  style={{
                    padding: '0.5rem 1rem',
                    minWidth: '2.5rem',
                    background: page === currentPage ? 'var(--holo-primary)' : 'var(--holo-bg-light)',
                    color: page === currentPage ? 'var(--holo-bg-dark)' : 'var(--holo-primary)',
                    fontWeight: page === currentPage ? 'bold' : 'normal'
                  }}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            className="holo-button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              opacity: currentPage === totalPages ? 0.5 : 1,
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
            }}
          >
            Next →
          </button>
        </div>
      )}

      {/* Page Jump */}
      {totalPages > 5 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 'var(--spacing-sm)',
          marginTop: 'var(--spacing-md)'
        }}>
          <label className="holo-text" style={{ fontSize: 'var(--font-size-sm)' }}>
            Jump to page:
          </label>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={currentPage}
            onChange={(e) => {
              const page = parseInt(e.target.value);
              if (page >= 1 && page <= totalPages) {
                onPageChange(page);
              }
            }}
            className="holo-input"
            style={{
              width: '80px',
              padding: '0.25rem 0.5rem',
              fontSize: 'var(--font-size-sm)',
              textAlign: 'center'
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ResultsList;
