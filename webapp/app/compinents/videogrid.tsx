import React from 'react';

type VideoGridProps = {
  videoSources: string[];
  videoCount: number;
};

const VideoGrid: React.FC<VideoGridProps> = ({ videoSources, videoCount }) => {
  return (
    <div style={styles.grid}>
      {videoSources.slice(0, videoCount).map((source, index) => (
        <img key={index} style={styles.video}
          src={source}/>
      ))}
    </div>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
  },
  video: {
    width: '75%',
    borderRadius: '8px',
  },
};

export default VideoGrid;



