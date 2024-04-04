import React, { useState } from 'react';
import { Box, Image, IconButton, useColorModeValue, Tooltip, Button, Flex } from '@chakra-ui/react';
import { FaInstagram, FaTimes } from 'react-icons/fa';

const InstagramClick = ({ isOpen, onClose, media_url, media_type, caption, username, redirectLink }: { isOpen: boolean, onClose: () => void, media_url: string, media_type: string, caption: string, username: string, redirectLink: string }) => {
  if (!isOpen) return null;
  const handleCloseModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Stop the event from propagating to the parent
    e.stopPropagation(); 
    onClose(); // Close the modal
  };

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      bg="rgba(0, 0, 0, 0.8)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex="999"
    >
      <Box
        p="4"
        bg="white"
        borderRadius="md"
        maxWidth="800px"
        overflow="hidden"
        boxShadow="md"
        display="flex"
        // Set the position to relative to position the X inside this box
        position="relative"
      >
        {/* Modal close button */}
        <IconButton
          position="absolute"
          top="0"
          right="0"
          icon={<FaTimes />}
          aria-label="Close"
          onClick={handleCloseModal}
          variant="ghost"
          color="gray.500"
          fontSize="lg"
          _hover={{ color: 'gray.700' }}
        />

        <Box flex="1" mr="4">
          {/* Check if media_url is a video or an image */}
          {media_type === 'VIDEO' ? (
            <video controls width="100%" height="auto" style={{ maxHeight: "500px" }}>
              <source src={media_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image src={media_url} alt={`Instagram post`} width="100%" height="auto" maxHeight="500px" />
          )}
        </Box>

        <Flex flex="1" ml="4" direction={'column'} align={'center'} justifyContent={'center'}>
          <Box mb="4">
            <Tooltip placement="top">
              <Box fontSize="lg" fontWeight="bold" textDecor={'underline'}>
                {username}
              </Box>
            </Tooltip>
            <Box fontSize="md" color="gray.600" mb="2">
              {caption}
            </Box>
          </Box>
          <Button colorScheme="blue" leftIcon={<FaInstagram />} onClick={() => window.open(redirectLink, "_blank")}>Watch on Instagram</Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default InstagramClick;
