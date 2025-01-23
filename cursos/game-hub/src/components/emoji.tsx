import { Game } from '@/types/games';
import thumbsUp from '@/assets/thumbs-up.webp';
import bullsEye from '@/assets/bulls-eye.webp';
import meh from '@/assets/meh.webp';
import { Image, ImageProps } from '@chakra-ui/react';

interface EmojiProps {
  rating: Game['rating_top'];
}

const emojiMap: { [key: number]: ImageProps } = {
  3: { src: meh, alt: 'meh', boxSize: '25px' },
  4: { src: thumbsUp, alt: 'recommended', boxSize: '25px' },
  5: { src: bullsEye, alt: 'exceptional', boxSize: '35px' },
};

const Emoji = ({ rating }: EmojiProps) => {
  return <Image {...emojiMap[rating]} marginTop={1} />;
};

export default Emoji;
