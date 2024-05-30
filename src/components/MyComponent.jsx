import React from 'react';
import Particles from 'react-particles';

const MyComponent = () => {
  const particlesOptions = {
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: '#ff0000',
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: 3,
        random: true,
      },
      move: {
        direction: 'none',
        speed: 2,
      },
      line_linked: {
        enable: false,
      },
    },
  };

  return (
    <div style={{ height: '400px' }}>
      <Particles params={particlesOptions} />
    </div>
  );
};

export default MyComponent;