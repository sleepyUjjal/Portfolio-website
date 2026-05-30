import './PhotosWidget.css';

function PhotosWidget({ name, photoUrl, imagePosition = "center center" }) {
  return (
    <div className="photos-widget">
      {/* Widget Header */}
      <div className="photos-widget__header">
        <div className="photos-widget__header-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="url(#photosGrad)" />
            <circle cx="12" cy="12" r="5" fill="rgba(255,255,255,0.9)" />
            <defs>
              <linearGradient id="photosGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff6b6b" />
                <stop offset="50%" stopColor="#ffa500" />
                <stop offset="100%" stopColor="#ff4ecb" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span className="photos-widget__header-title">Photos</span>
      </div>

      {/* Photo Area */}
      <div className="photos-widget__photo-area">
        {photoUrl ? (
          <img 
            src={photoUrl} 
            alt={name} 
            className="photos-widget__photo" 
            style={{ objectPosition: imagePosition }} 
          />
        ) : (
          <div className="photos-widget__photo-placeholder">
            <span>{name ? name.charAt(0).toUpperCase() : '?'}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default PhotosWidget;
