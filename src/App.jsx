import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import styled from '@emotion/styled';
import useWindowSize from './hooks/useWindowSize';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #ffb6c1 0%, #ffc0cb 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
  width: 90%;
  position: relative;
  z-index: 1;
`;

const Title = styled.h1`
  color: #ff69b4;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
`;

const Image = styled.img`
  width: 500px; // Changed from 200px to 500px (2.5x bigger)
  height: auto;
  margin: 1rem auto;
  border-radius: 10px;
`;

const Button = styled(motion.button)`
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  margin: 10px;
  background-color: #ff69b4;
  color: white;
  &:hover {
    transform: scale(1.05);
  }
`;

const FloatingImage = styled(motion.img)`
  position: absolute;
  width: 100px;
  height: auto;
`;

const NoButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  margin: 10px;
  background-color: #999;
  color: white;
  position: absolute;
`;

function App() {
  const { width, height } = useWindowSize();
  const [accepted, setAccepted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [noButtonPosition, setNoButtonPosition] = useState({
    top: 200,
    left: 200,
  });
  const [yesButtonScale, setYesButtonScale] = useState(1);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const getNoButtonPosition = () => {
    const distance = 100;
    const angle = Math.atan2(
      window.innerHeight / 2 - mousePosition.y,
      window.innerWidth / 2 - mousePosition.x
    );
    return {
      x: Math.cos(angle) * distance * -1,
      y: Math.sin(angle) * distance * -1,
    };
  };

  const handleNoHover = () => {
    // Get button dimensions
    const buttonWidth = 100;  // Approximate button width
    const buttonHeight = 50;  // Approximate button height
    
    // Calculate safe boundaries
    const maxLeft = width - buttonWidth;
    const maxTop = height - buttonHeight;
    
    // Generate random position within viewport
    const newLeft = Math.min(Math.max(0, Math.random() * width), maxLeft);
    const newTop = Math.min(Math.max(0, Math.random() * height), maxTop);

    setNoButtonPosition({
      top: newTop,
      left: newLeft,
    });

    // Increase yes button scale permanently
    setYesButtonScale(prevScale => prevScale * 1.25);
  };

  const cinamorollImages = [
    "https://i.pinimg.com/736x/04/0a/bc/040abc0e3d3ae5790485d5132671c06d.jpg",  // Regular Cinnamoroll
    "https://pbs.twimg.com/media/B_bC8K2UsAATEvD.png"   // Happy Cinnamoroll
  ];

  return (
    <Container onMouseMove={handleMouseMove}>
      {accepted && <Confetti width={width} height={height} />}
      
      {cinamorollImages.map((img, index) => (
        <FloatingImage
          key={index}
          src={img}
          initial={{ x: Math.random() * window.innerWidth, y: -100 }}
          animate={{
            y: [window.innerHeight + 100, -100],
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: index * 2,
          }}
          style={{ left: 0, top: 0 }}
        />
      ))}

      <Card
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        <Title>Hii lovee, will you be my Valentine? 💝</Title>
        <Image
          src="https://media2.giphy.com/media/JmOCq0T5qEJyZ3oQj8/giphy.gif?cid=6c09b952sjylgzwc2yibwkovruxrd7xptnkbioivo918bn18&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
          alt="Cinamoroll"
        />
        
        {accepted ? (
          <>
            <motion.h2
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-2xl text-pink-500 font-bold mb-4"
            >
              AWIEEEE! I'm so happy! MWAAAAH 😍 
            </motion.h2>
            <Image
              src="https://www.icegif.com/wp-content/uploads/2023/10/icegif-771.gif"
              alt="Happy Cinamoroll"
            />
          </>
        ) : (
          <div className="flex justify-center gap-4 flex-wrap">
            <Button
              whileTap={{ scale: yesButtonScale * 0.9 }}
              onClick={() => setAccepted(true)}
              style={{ 
                backgroundColor: '#ff69b4',
                transform: `scale(${yesButtonScale})`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: `scale(${yesButtonScale * 1.1})`
                }
              }}
            >
              Yes! 💖
            </Button>
            
            <NoButton
              style={{
                top: noButtonPosition.top,
                left: noButtonPosition.left,
                position: 'fixed', // Change to fixed positioning
                zIndex: 1000
              }}
              onMouseEnter={handleNoHover}
            >
              No 😢
            </NoButton>
          </div>
        )}
      </Card>
    </Container>
  );
}

export default App;