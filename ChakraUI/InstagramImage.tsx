'use client'
import React, { useState } from 'react';
import { Box, Image, IconButton, useColorModeValue, Tooltip } from '@chakra-ui/react';
import { FaInstagram, FaPlayCircle } from 'react-icons/fa';
import PostModal from './instagramClick';

const InstagramImage = ({ id, media_url, timestamp, username, media_type, caption, permalink, thumbnail_url }: { id: any, media_url: any, timestamp: string, username : any, media_type: string, caption:any, permalink:any, thumbnail_url:any }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State to track mouse hover
    const [isHovering, setIsHovering] = useState(false);

  const handleOpenModal = () => {
    setIsHovering(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  // Calculate how many days ago the image was posted
  const datePosted = new Date(timestamp);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - datePosted.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Overlay color based on light/dark mode
  const overlayColor = useColorModeValue('rgba(0, 0, 0, 0.5)', 'rgba(255, 255, 255, 0.5)');

  return (
    <Box
      position="relative"
      width={{base:"300px", sm:"350px"}}
      height={{base:"300px", sm:"350px"}}
      borderRadius="md"
      overflow="hidden"
      boxShadow="md"
      m="4"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleOpenModal}
    >
      {/* First box (image or video based on media_type) */}
      {media_type === 'VIDEO' ? (
       <>
        <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" zIndex="1">
            <FaPlayCircle color="white" size="50" />
        </Box>
        <Image src={thumbnail_url} alt={`Instagram post ${id}`} width="100%" height="100%" objectFit="cover" />
       </>
      ) : (
        <Image src={media_url} alt={`Instagram post ${id}`} width="100%" height="100%" objectFit="cover" />
      )}

      {/* Second box (info) - only shown when hovering over the image */}
      {isHovering && (
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0, 0, 0, 0.5)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={2}
        >
          <Box color="white" textAlign="center">
            <Tooltip placement="top">
              <Box fontSize="lg" textDecor={'underline'} mb="2">
                {username}
              </Box>
            </Tooltip>
            <Tooltip placement="top">
              <Box fontSize="md" mb="2">
                {diffDays} days ago
              </Box>
            </Tooltip>
            {/* Instagram icon with redirect to your Instagram profile */}
            <a href={permalink} target="_blank" rel="noopener noreferrer">
              <IconButton
                icon={<FaInstagram />}
                aria-label="Instagram"
                variant="ghost"
                color="white"
                fontSize="lg"
                _hover={{ color: 'blue.500' }}
              />
            </a>
          </Box>
        </Box>
      )}
      <PostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        media_type={media_type}
        media_url={media_url}
        caption={caption}
        username={username}
        redirectLink={permalink}
      />
    </Box>
  );
};

export default InstagramImage;

