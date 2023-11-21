import { CommonImage, CommonText } from '@/shared/components';
import { ItemInfo } from '@/shared/types';
import { Button, ItemWrapper, TextWrapper } from './style';

interface VoteOptionItemProps {
  onClick?: () => void;
  itemInfo?: ItemInfo;
  votes?: number;
}

const VoteOptionItem = ({ onClick, itemInfo, votes }: VoteOptionItemProps) => {
  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <div>
      <ItemWrapper>
        <CommonImage size="lg" src={itemInfo?.image} />
        <Button onClick={handleClick}>{votes}</Button>
      </ItemWrapper>
      <TextWrapper>
        <CommonText type="smallTitle">{itemInfo?.price}</CommonText>
        <CommonText type="smallInfo">{itemInfo?.name}</CommonText>
      </TextWrapper>
    </div>
  );
};

export default VoteOptionItem;
