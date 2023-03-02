import { Avatar, Box, Button, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const Footer = () => {
  return (
    <Box minH={'48'} px="16" py={['16', '8']} bgColor={'default'}>
      <Stack direction={['column', 'row']} h="full" alignItems={'center'}>
        <VStack w="full" alignItems={['center', 'flex-start']}>
          <Text fontWeight={'bold'}>About This Project</Text>
          <Text
            fontSize={'sm'}
            letterSpacing={'widest'}
            textAlign={['center', 'left']}
          >
            A Web Application Build with React.js and Coingecko API
          </Text>
        </VStack>
        <VStack>
          <Avatar boxSize={'28'} mt={['4', '0']} />
          <Text>anuragbhardwaj13</Text>
          <Button variant="link" colorScheme="white">
            <a href="https://www.github.com/anuragbhardwaj13" target="blank">
              Github
            </a>
          </Button>
          <Button variant="link" colorScheme="white">
            <a
              href="https://www.linkedin.com/in/anuragbhardwaj13"
              target="blank"
            >
              LinkedIn
            </a>
          </Button>
        </VStack>
      </Stack>
    </Box>
  );
};

export default Footer;
