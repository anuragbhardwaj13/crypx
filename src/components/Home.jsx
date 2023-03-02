import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';
import homeimg from '../assets/homeimg.png';
import { motion } from 'framer-motion';
const Home = () => {
  return (
    <Box w="full" height="85vh" alignItems={'center'}>
      <Text fontSize={'6xl'} textAlign={'center'} fontWeight={'thin'}>
        crypX
      </Text>
      <motion.div
        style={{
          height: '80vh',
        }}
        animate={{
          translateY: '20px',
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        <Image w="full" h="full" objectFit={'contain'} src={homeimg} />
      </motion.div>
    </Box>
  );
};

export default Home;
