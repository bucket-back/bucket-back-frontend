import { useNavigate } from 'react-router-dom';
import { CommonButton, CommonImage, CommonText } from '@/shared/components';
import { FeedItemInfo } from '@/shared/types';
import { ellipsisName, formatNumber } from '@/shared/utils';
import { ButtonBox, Container, ContentsWrapper, PriceBox } from './style';

interface FeedItemsDetailProps {
  items: FeedItemInfo[];
}

const FeedItemsDetail = ({ items }: FeedItemsDetailProps) => {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/item/${id}`);
  };

  return (
    <Container>
      {items &&
        items.map(({ id, name, image, price }) => (
          <ContentsWrapper key={id}>
            <ButtonBox>
              <CommonImage size="xs" src={image} />
              <CommonButton type="xs" onClick={() => handleClick(id)}>
                {ellipsisName(name, 25)}
              </CommonButton>
            </ButtonBox>
            <PriceBox>
              <CommonText type="normalInfo">{formatNumber(price)}</CommonText>
            </PriceBox>
            <CommonImage size="lg" src={image} onClick={() => handleClick(id)} />
          </ContentsWrapper>
        ))}
    </Container>
  );
};

export default FeedItemsDetail;
