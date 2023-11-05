import {
  Box,
  Flex,
  Stack,
  VStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Center,
  SimpleGrid,
} from '@chakra-ui/react';

interface CommonSkeletonProps {
  type: 'feed' | 'item' | 'bucket' | 'inProgressVote' | 'endVote';
  isLoaded?: boolean;
}

const CommonSkeleton = ({ type, isLoaded = false }: CommonSkeletonProps) => {
  const skeletons = {
    feed: (
      <Stack>
        <Flex>
          <SkeletonCircle size="2.5rem" isLoaded={isLoaded} />
          <SkeletonText
            mt="0.4rem"
            ml="0.8rem"
            noOfLines={2}
            spacing="1"
            skeletonHeight="0.8rem"
            w="6rem"
            isLoaded={isLoaded}
          />
        </Flex>
        <SkeletonText
          mt="0.4rem"
          ml="0.8rem"
          noOfLines={2}
          spacing="1"
          skeletonHeight="0.8rem"
          w="15rem"
          isLoaded={isLoaded}
        />
        <SimpleGrid columns={3} spacing="0.25rem" w="19rem">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton
              key={idx}
              w="6.125rem"
              h="5.625rem"
              borderRadius="0.625rem"
              isLoaded={isLoaded}
            />
          ))}
        </SimpleGrid>
      </Stack>
    ),
    item: (
      <Box>
        <Skeleton w="6.125rem" h="5.625rem" borderRadius="0.625rem" isLoaded={isLoaded} />
        <Stack mt="0.3rem" ml="0.5rem" spacing="0.3rem">
          <Skeleton w="2.5rem" h="0.8rem" isLoaded={isLoaded} />
          <Skeleton w="4.5rem" h="0.8rem" isLoaded={isLoaded} />
        </Stack>
      </Box>
    ),
    bucket: (
      <Box>
        <Skeleton w="6.125rem" h="5.625rem" borderRadius="0.625rem" isLoaded={isLoaded} />
        <VStack mt="0.3rem" spacing="0.3rem">
          <Skeleton w="2rem" h="0.8rem" isLoaded={isLoaded} />
          <Skeleton w="3rem" h="0.8rem" isLoaded={isLoaded} />
        </VStack>
      </Box>
    ),
    inProgressVote: (
      <Box>
        <SkeletonCircle size="5.625rem" isLoaded={isLoaded} />
        <Center mt="0.3rem">
          <Skeleton w="3rem" h="0.8rem" isLoaded={isLoaded} />
        </Center>
      </Box>
    ),
    endVote: (
      <Stack>
        <Skeleton w="18rem" h="0.8rem" isLoaded={isLoaded} />
        <Flex gap="3.31rem">
          <Stack>
            <Skeleton w="9.0625rem" h="6.5rem" borderRadius="0.625rem" isLoaded={isLoaded} />
            <Stack ml="0.5rem" spacing="0.3rem">
              <Skeleton w="2.5rem" h="0.8rem" isLoaded={isLoaded} />
              <Skeleton w="4.5rem" h="0.8rem" isLoaded={isLoaded} />
            </Stack>
          </Stack>
          <Stack>
            <Skeleton w="9.0625rem" h="6.5rem" borderRadius="0.625rem" isLoaded={isLoaded} />
            <Stack ml="0.5rem" spacing="0.3rem">
              <Skeleton w="2.5rem" h="0.8rem" isLoaded={isLoaded} />
              <Skeleton w="4.5rem" h="0.8rem" isLoaded={isLoaded} />
            </Stack>
          </Stack>
        </Flex>
      </Stack>
    ),
  };

  return <>{skeletons[type]}</>;
};

export default CommonSkeleton;
