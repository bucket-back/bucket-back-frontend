import { MouseEvent } from 'react';
import { CommonImage, CommonText } from '@/shared/components';
import { ItemInfo } from '@/shared/types';
import { formatNumber } from '@/shared/utils';
import { Button, ItemWrapper, TextWrapper } from './style';

interface VoteOptionItemProps {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  itemInfo?: ItemInfo;
  votes?: number;
}

const VoteOptionItem = ({ onClick, itemInfo, votes }: VoteOptionItemProps) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick && onClick(e);
  };

  return (
    <div>
      <ItemWrapper>
        <CommonImage size="lg" src={itemInfo?.image} />
        <Button value={itemInfo?.id} type="button" onClick={(e) => handleClick(e)}>
          {votes}
        </Button>
      </ItemWrapper>
      <TextWrapper>
        <CommonText type="smallTitle">{formatNumber(itemInfo?.price || 0)}</CommonText>
        <CommonText type="smallInfo">{itemInfo?.name}</CommonText>
      </TextWrapper>
    </div>
  );
};

export default VoteOptionItem;
