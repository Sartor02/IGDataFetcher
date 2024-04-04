import React, { useState, useEffect } from 'react';
import { Grid, Flex, Button, Center, useBreakpointValue } from '@chakra-ui/react';
import InstagramImage from './InstagramImage';
import jsonData from './media_info.json';

const InstagramFeed = () => {
  // Initially assume it's not a phone
  const isPhone = useBreakpointValue({ base: true, sm: false });
  const [images, setImages] = useState(Object.values(jsonData).slice(0, isPhone ? 3 : 6));
  
  // Number of images per row
  const [itemsPerRow, setItemsPerRow] = useState(3);
  
  // Index of the next batch of images to load
  const [startIndex, setStartIndex] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      if (isPhone) {
        setItemsPerRow(1);
      } else {
        // Show at most 3 images per row
        setItemsPerRow(Math.min(3, images.length));
      }
    };

    // Execute the initial window size check
    handleResize();

    // Add a listener for window resize
    window.addEventListener('resize', handleResize);

    return () => {
      // Clean up the listener when the component is unmounted
      window.removeEventListener('resize', handleResize); 
    };
  }, [images.length]);

  useEffect(() => {
    // Initialize the images with the appropriate number based on the device type
    setImages(Object.values(jsonData).slice(0, isPhone ? 3 : 6));
    setStartIndex(isPhone ? 3 : 6);
  }, [isPhone]);

  const loadMore = () => {
    const newStartIndex = startIndex + (isPhone ? 3 : 6);
    setImages([...images, ...Object.values(jsonData).slice(newStartIndex, newStartIndex + (isPhone ? 3 : 6))]);
    setStartIndex(newStartIndex);
  };
    
    return (
    <Center>
        <Flex direction={'column'} border="4px solid white" p={4} borderRadius="20px" align="center">
            <Grid
            minW={{ base: '85%', sm: '100%' }}
            gap={4}
            templateColumns={{ base: `repeat(${itemsPerRow}, 1fr)`, sm: 'repeat(3, 1fr)' }}
            justifyContent="center"
            >
            {images.map((item:any) => (
            <InstagramImage
                key={item.id}
                id={item.id}
                timestamp={item.timestamp}
                media_url={item.media_url}
                username={item.username}
                media_type={item.media_type}
                caption={item.caption}
                permalink={item.permalink}
                thumbnail_url={item.thumbnail_url}
            />
            ))}
            </Grid>
            <Button width="fit-content" 
            mt="10px" 
            color="#fff" 
            bg="#517899" 
            onClick={loadMore}
            _hover={{background: "#3e638b", color: "#fff"}}
            >Load More</Button>
        </Flex>
    </Center>
  );
};

export default InstagramFeed;
