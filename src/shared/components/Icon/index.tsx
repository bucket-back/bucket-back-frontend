import { Icon } from '@chakra-ui/react';
import {
  FaRegTrashCan,
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaHeart,
  FaRegHeart,
  FaMagnifyingGlass,
  FaPen,
  FaCube,
  FaCubes,
  FaBasketShopping,
  FaBagShopping,
  FaRegFaceGrin,
  FaEye,
  FaEyeSlash,
  FaArrowUp,
  FaPlus,
  FaRegStar,
  FaStar,
  FaRegCommentDots,
  FaCircleExclamation,
  FaCircleCheck,
  FaRegCircleXmark,
  FaEllipsisVertical,
  FaCrown,
  FaHouse,
  FaBriefcase,
  FaRegRectangleList,
} from 'react-icons/fa6';

const ICONS = {
  trashcan: FaRegTrashCan,
  chevronLeft: FaChevronLeft,
  chevronRight: FaChevronRight,
  chevronDown: FaChevronDown,
  heart: FaRegHeart,
  fillHeart: FaHeart,
  search: FaMagnifyingGlass,
  pen: FaPen,
  cube: FaCube,
  cubes: FaCubes,
  bucket: FaBasketShopping,
  item: FaBagShopping,
  member: FaRegFaceGrin,
  eye: FaEye,
  eyeSlash: FaEyeSlash,
  arrowUp: FaArrowUp,
  plus: FaPlus,
  star: FaRegStar,
  fillStar: FaStar,
  comment: FaRegCommentDots,
  circleExclamation: FaCircleExclamation,
  circleCheck: FaCircleCheck,
  circleXmark: FaRegCircleXmark,
  ellipsis: FaEllipsisVertical,
  crown: FaCrown,
  home: FaHouse,
  inventory: FaBriefcase,
  feed: FaRegRectangleList,
};

interface CommonIconProps {
  type: keyof typeof ICONS;
  size?: string;
  color?: string;
  onClick?: () => void;
}

const CommonIcon = ({ type, size, color, onClick }: CommonIconProps) => {
  const handleClick = () => {
    onClick && onClick();
  };

  return <Icon as={ICONS[type]} boxSize={size} color={color} height="100%" onClick={handleClick} />;
};

export default CommonIcon;
