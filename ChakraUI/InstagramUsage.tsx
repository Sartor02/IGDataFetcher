import InstagramFeed from './InstagramFeed'
import { Container, Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'

export default function Test() {
    return (
        <Container maxW={'5xl'}>
            <Stack
            textAlign={'center'}
            align={'center'}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 20, md: 28 }}
            >
            {/* Some other code */}
            <InstagramFeed />
            </Stack>
        </Container>
    )
}