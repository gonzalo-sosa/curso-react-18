import { Button, Text } from '@chakra-ui/react';
import { useState } from 'react';

interface ExpandableTextProps {
  children: string;
  maxChars?: number;
}

export default function ExpandableText({
  children,
  maxChars = 300,
}: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (children.length <= maxChars) return <p>{children}</p>;

  const text = isExpanded ? children : children.substring(0, maxChars) + '...';

  return (
    <Text>
      {text}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        marginLeft={1}
        size={'xs'}
        fontWeight={'bold'}
        colorScheme="yellow"
      >
        {isExpanded ? 'Show less' : 'Read more'}
      </Button>
    </Text>
  );
}
