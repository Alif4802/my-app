import React from 'react';

function Logo({ type = 'primary', mode = 'color', width, height }) {
  // Brand colors mapping
  const colors = {
    green: mode === 'monochrome-white' ? '#ffffff' : '#495E57',
    yellow: mode === 'monochrome-white' ? '#ffffff' : mode === 'monochrome-green' ? '#495E57' : '#F4CE14',
    text: mode === 'monochrome-white' ? '#ffffff' : '#495E57'
  };

  // The stylized yellow lemon with a dark green leaf
  const LemonIcon = ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
      {/* Lemon Body */}
      <path
        d="M 50,25 C 75,25 90,45 90,60 C 90,80 70,90 50,90 C 30,90 10,80 10,60 C 10,45 25,25 50,25 Z"
        fill={colors.yellow}
      />
      {/* Lemon Points */}
      <path
        d="M 50,25 C 50,20 48,18 45,18 C 42,18 40,20 40,25 Z"
        fill={colors.yellow}
      />
      {/* Leaf */}
      <path
        d="M 50,25 C 52,10 65,5 75,8 C 70,18 58,23 50,25 Z"
        fill={colors.green}
      />
    </svg>
  );

  if (type === 'secondary') {
    // Horizontal brand logo lockup (Icon + Wordmark)
    const containerStyle = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      userSelect: 'none'
    };

    return (
      <div style={containerStyle}>
        <LemonIcon size={width ? parseInt(width) * 0.4 : 35} />
        <span
          style={{
            fontFamily: "'Markazi Text', serif",
            fontSize: height ? `${parseInt(height) * 0.6}px` : '28px',
            fontWeight: '700',
            color: colors.text,
            letterSpacing: '0.05em',
            lineHeight: 1,
            textTransform: 'uppercase'
          }}
        >
          Little Lemon
        </span>
      </div>
    );
  }

  // Primary Logo (Vertical: Restaurant)
  // Inside a rough dark-green rectangle border, with the word "LITTLE" stacked above and "LEMON" stacked below in a serif font.
  const primaryContainerStyle = {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: `4px solid ${colors.green}`,
    padding: '12px 18px',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    width: width || '140px',
    height: height || '165px',
    userSelect: 'none'
  };

  const textStyle = {
    fontFamily: "'Markazi Text', serif",
    fontSize: '22px',
    fontWeight: '700',
    color: colors.text,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    lineHeight: 1
  };

  return (
    <div style={primaryContainerStyle}>
      <span style={{ ...textStyle, marginBottom: '6px' }}>Little</span>
      <LemonIcon size={48} />
      <span style={{ ...textStyle, marginTop: '6px' }}>Lemon</span>
    </div>
  );
}

export default Logo;
